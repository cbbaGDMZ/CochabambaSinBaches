/**
 * Hook para queries y mutations de reportes.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reportService } from '@/services/report-service';
import { useReportStore } from '@/stores/report-store';
import { useOfflineStore } from '@/stores/offline-store';
import type { CreateReportPayload, Report } from '@/types/report-types';

export const REPORT_QUERY_KEYS = {
  all: ['reports'] as const,
  myReports: (page: number) =>
    [...REPORT_QUERY_KEYS.all, 'mine', page] as const,
  nearbyReports: (lat: number, lng: number) =>
    [...REPORT_QUERY_KEYS.all, 'nearby', lat, lng] as const,
  detail: (id: string) => [...REPORT_QUERY_KEYS.all, 'detail', id] as const,
};

export const useMyReports = (page: number = 1) => {
  const { setMyReports } = useReportStore();

  return useQuery({
    queryKey: REPORT_QUERY_KEYS.myReports(page),
    queryFn: () => reportService.getMyReports(page),
    onSuccess: (data) => {
      setMyReports(data.reports);
    },
  });
};

export const useNearbyReports = (
  latitude: number,
  longitude: number,
  radiusKm?: number,
) => {
  const { setNearbyReports } = useReportStore();

  return useQuery({
    queryKey: REPORT_QUERY_KEYS.nearbyReports(latitude, longitude),
    queryFn: () =>
      reportService.getNearbyReports(latitude, longitude, radiusKm),
    onSuccess: (data) => {
      setNearbyReports(data);
    },
  });
};

export const useReportDetail = (id: string) => {
  return useQuery({
    queryKey: REPORT_QUERY_KEYS.detail(id),
    queryFn: () => reportService.getReportById(id),
  });
};

export const useCreateReport = () => {
  const queryClient = useQueryClient();
  const { addMyReport } = useReportStore();
  const { addPendingReport } = useOfflineStore();

  return useMutation({
    mutationFn: (payload: CreateReportPayload) =>
      reportService.createReport(payload),
    onSuccess: (report) => {
      addMyReport(report);
      queryClient.invalidateQueries({ queryKey: REPORT_QUERY_KEYS.all });
    },
    onError: (error, payload) => {
      // Si falla, agregar a pendientes para sincronizar después
      addPendingReport(`pending-${Date.now()}`);
    },
  });
};