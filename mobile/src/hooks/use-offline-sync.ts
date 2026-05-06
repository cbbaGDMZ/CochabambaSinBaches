/**
 * Hook de sincronización offline.
 * Envía reportes pendientes cuando se recupera la conexión.
 * Usa offline-db para leer reportes pendientes y report-service para enviarlos.
 */

import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useConnectivity } from '@/hooks/use-connectivity';
import { useOfflineStore } from '@/stores/offline-store';
import { reportService } from '@/services/report-service';
import {
  getUnsyncedReports,
  getUnsyncedReportCount,
  markAsSynced,
  deleteOfflineReport,
} from '@/lib/offline-db';
import type { OfflineReport } from '@/lib/offline-db';

interface UseOfflineSyncResult {
  pendingCount: number;
  isSyncing: boolean;
  syncNow: () => Promise<void>;
}

export function useOfflineSync(): UseOfflineSyncResult {
  const { isOnline } = useConnectivity();
  const { isSyncing, setIsSyncing } = useOfflineStore();

  // Mutation para sincronizar reportes
  const syncMutation = useMutation({
    mutationFn: async (reports: OfflineReport[]) => {
      const results = [];

      for (const report of reports) {
        // TODO: Implementar envío a servidor y manejo de fotos
        // Por ahora solo marcamos como sincronizados
        await markAsSynced(report.local_id, `server_${report.local_id}`);
        results.push(report.local_id);
      }

      return results;
    },
    onSuccess: async () => {
      // Actualizar conteo de pendientes
      const count = await getUnsyncedReportCount();
      // TODO: Actualizar store con nuevo conteo
    },
  });

  // Sincronizar cuando se recupera la conexión
  useEffect(() => {
    if (!isOnline || isSyncing) {
      return;
    }

    const performSync = async () => {
      setIsSyncing(true);

      try {
        const unsyncedReports = await getUnsyncedReports();

        if (unsyncedReports.length === 0) {
          setIsSyncing(false);
          return;
        }

        await syncMutation.mutateAsync(unsyncedReports);
      } catch (error) {
        console.error('Error sincronizando reportes:', error);
      } finally {
        setIsSyncing(false);
      }
    };

    performSync();
  }, [isOnline, isSyncing, setIsSyncing, syncMutation]);

  const syncNow = async () => {
    setIsSyncing(true);

    try {
      const unsyncedReports = await getUnsyncedReports();

      if (unsyncedReports.length === 0) {
        setIsSyncing(false);
        return;
      }

      await syncMutation.mutateAsync(unsyncedReports);
    } catch (error) {
      console.error('Error sincronizando reportes:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    pendingCount: useOfflineStore((state) => state.pendingReports.length),
    isSyncing,
    syncNow,
  };
}