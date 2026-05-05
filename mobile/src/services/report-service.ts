/**
 * Servicio de reportes.
 */

import { apiClient } from '@/lib/api-client';
import type {
  Report,
  CreateReportPayload,
  UpdateReportPayload,
  ReportListResponse,
  ReportDetailResponse,
} from '@/types/report-types';

export const reportService = {
  getMyReports: async (page: number = 1): Promise<ReportListResponse> => {
    const { data } = await apiClient.get('/reports/me', { params: { page } });
    return data;
  },

  getNearbyReports: async (
    latitude: number,
    longitude: number,
    radiusKm: number = 5,
  ): Promise<Report[]> => {
    const { data } = await apiClient.get('/reports/nearby', {
      params: { latitude, longitude, radiusKm },
    });
    return data;
  },

  getReportById: async (id: string): Promise<ReportDetailResponse> => {
    const { data } = await apiClient.get(`/reports/${id}`);
    return data;
  },

  createReport: async (payload: CreateReportPayload): Promise<Report> => {
    const { data } = await apiClient.post('/reports', payload);
    return data;
  },

  updateReport: async (
    id: string,
    payload: UpdateReportPayload,
  ): Promise<Report> => {
    const { data } = await apiClient.patch(`/reports/${id}`, payload);
    return data;
  },
};