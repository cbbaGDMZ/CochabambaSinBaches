/**
 * Zustand store para estado de reportes.
 */

import { create } from 'zustand';
import type { Report } from '@/types/report-types';

interface ReportState {
  myReports: Report[];
  nearbyReports: Report[];
  selectedReport: Report | null;
}

interface ReportActions {
  setMyReports: (reports: Report[]) => void;
  setNearbyReports: (reports: Report[]) => void;
  setSelectedReport: (report: Report | null) => void;
  addMyReport: (report: Report) => void;
  updateMyReport: (report: Report) => void;
}

const INITIAL_STATE: ReportState = {
  myReports: [],
  nearbyReports: [],
  selectedReport: null,
};

export const useReportStore = create<ReportState & ReportActions>((set) => ({
  ...INITIAL_STATE,

  setMyReports: (myReports) => set({ myReports }),
  setNearbyReports: (nearbyReports) => set({ nearbyReports }),
  setSelectedReport: (selectedReport) => set({ selectedReport }),
  addMyReport: (report) =>
    set((state) => ({
      myReports: [report, ...state.myReports],
    })),
  updateMyReport: (report) =>
    set((state) => ({
      myReports: state.myReports.map((r) => (r.id === report.id ? report : r)),
    })),
}));