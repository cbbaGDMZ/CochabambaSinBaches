/**
 * Configuración de la base de datos SQLite para modo offline.
 * Almacena reportes pendientes de sincronización.
 */

import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';
import type { DamageType } from '@/types/report-types';

const DB_NAME = 'cochabamba_sin_baches.db';

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Estructura de un reporte offline almacenado en la BD
 */
export interface OfflineReport {
  local_id: string;
  damage_type: DamageType;
  description: string | null;
  latitude: number;
  longitude: number;
  photo_local_paths: string; // JSON array stringified
  created_at: string; // ISO timestamp
  synced: 0 | 1; // 0 = no sincronizado, 1 = sincronizado
  server_id?: string; // ID asignado por el servidor después de sincronizar
}

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DB_NAME);
    await initializeDatabase(db);
  }
  return db;
}

async function initializeDatabase(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS offline_reports (
      local_id TEXT PRIMARY KEY,
      damage_type TEXT NOT NULL,
      description TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      photo_local_paths TEXT NOT NULL,
      created_at TEXT NOT NULL,
      synced INTEGER DEFAULT 0,
      server_id TEXT
    );
  `);
}

/**
 * Guarda un reporte offline en la BD local
 */
export async function saveOfflineReport(
  damageType: DamageType,
  description: string | null,
  latitude: number,
  longitude: number,
  photoLocalPaths: string[],
): Promise<OfflineReport> {
  const database = await getDatabase();
  const localId = uuidv4();
  const now = new Date().toISOString();

  const report: OfflineReport = {
    local_id: localId,
    damage_type: damageType,
    description,
    latitude,
    longitude,
    photo_local_paths: JSON.stringify(photoLocalPaths),
    created_at: now,
    synced: 0,
  };

  await database.runAsync(
    `INSERT INTO offline_reports (
      local_id,
      damage_type,
      description,
      latitude,
      longitude,
      photo_local_paths,
      created_at,
      synced
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      report.local_id,
      report.damage_type,
      report.description,
      report.latitude,
      report.longitude,
      report.photo_local_paths,
      report.created_at,
      report.synced,
    ],
  );

  return report;
}

/**
 * Obtiene todos los reportes no sincronizados
 */
export async function getUnsyncedReports(): Promise<OfflineReport[]> {
  const database = await getDatabase();

  const result = await database.getAllAsync<OfflineReport>(
    'SELECT * FROM offline_reports WHERE synced = 0 ORDER BY created_at DESC',
  );

  return result.map((row) => ({
    ...row,
    photo_local_paths:
      typeof row.photo_local_paths === 'string'
        ? row.photo_local_paths
        : JSON.stringify(row.photo_local_paths),
  }));
}

/**
 * Obtiene un reporte específico por local_id
 */
export async function getOfflineReportById(localId: string): Promise<OfflineReport | null> {
  const database = await getDatabase();

  const result = await database.getFirstAsync<OfflineReport>(
    'SELECT * FROM offline_reports WHERE local_id = ?',
    [localId],
  );

  return result || null;
}

/**
 * Marca un reporte como sincronizado y guarda el server_id
 */
export async function markAsSynced(localId: string, serverId: string): Promise<void> {
  const database = await getDatabase();

  await database.runAsync(
    'UPDATE offline_reports SET synced = 1, server_id = ? WHERE local_id = ?',
    [serverId, localId],
  );
}

/**
 * Elimina un reporte offline
 */
export async function deleteOfflineReport(localId: string): Promise<void> {
  const database = await getDatabase();

  await database.runAsync('DELETE FROM offline_reports WHERE local_id = ?', [localId]);
}

/**
 * Obtiene el conteo de reportes no sincronizados
 */
export async function getUnsyncedReportCount(): Promise<number> {
  const database = await getDatabase();

  const result = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM offline_reports WHERE synced = 0',
  );

  return result?.count ?? 0;
}

/**
 * Limpia todos los reportes sincronizados (limpieza periódica)
 */
export async function cleanupSyncedReports(): Promise<void> {
  const database = await getDatabase();

  await database.runAsync('DELETE FROM offline_reports WHERE synced = 1');
}
