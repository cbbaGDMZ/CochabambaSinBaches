/**
 * Tipos relacionados con reportes de baches.
 */

import type { Coordinates, Timestamps } from './common-types';

export const REPORT_STATUS = {
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  REPAIRED: 'repaired',
} as const;

export type ReportStatus = typeof REPORT_STATUS[keyof typeof REPORT_STATUS];

export const DAMAGE_TYPE = {
  POTHOLE: 'pothole',
  SINKHOLE: 'sinkhole',
  CRACK: 'crack',
  NO_PAVEMENT: 'no_pavement',
} as const;

export type DamageType = typeof DAMAGE_TYPE[keyof typeof DAMAGE_TYPE];

export const DAMAGE_TYPE_LABELS: Record<DamageType, string> = {
  pothole: 'Bache',
  sinkhole: 'Hundimiento',
  crack: 'Grieta',
  no_pavement: 'Sin pavimento',
};

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  pending: 'Pendiente',
  in_review: 'En revisión',
  assigned: 'Asignado',
  in_progress: 'En progreso',
  repaired: 'Reparado',
};

export interface Report {
  id: string;
  userId: string;
  damageType: DamageType;
  description: string | null;
  coordinates: Coordinates;
  address: string | null;
  photos: string[];
  status: ReportStatus;
  ipbScore: number | null;
  statusHistory: StatusHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface StatusHistoryEntry {
  status: ReportStatus;
  changedAt: string;
  changedBy: string | null;
}

export interface CreateReportPayload {
  damageType: DamageType;
  description?: string;
  latitude: number;
  longitude: number;
  photos: string[];
}

export interface UpdateReportPayload {
  description?: string;
}

export interface ReportListResponse {
  reports: Report[];
  pagination: {
    page: number;
    total: number;
    limit: number;
  };
}

export interface ReportDetailResponse extends Report {}