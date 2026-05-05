/**
 * Zustand store para estado offline y sincronización.
 */

import { create } from 'zustand';

interface OfflineState {
  isOnline: boolean;
  pendingReports: string[];
  isSyncing: boolean;
}

interface OfflineActions {
  setIsOnline: (online: boolean) => void;
  addPendingReport: (reportId: string) => void;
  removePendingReport: (reportId: string) => void;
  setIsSyncing: (syncing: boolean) => void;
  clearPendingReports: () => void;
}

const INITIAL_STATE: OfflineState = {
  isOnline: true,
  pendingReports: [],
  isSyncing: false,
};

export const useOfflineStore = create<OfflineState & OfflineActions>((set) => ({
  ...INITIAL_STATE,

  setIsOnline: (isOnline) => set({ isOnline }),
  addPendingReport: (reportId) =>
    set((state) => ({
      pendingReports: [...state.pendingReports, reportId],
    })),
  removePendingReport: (reportId) =>
    set((state) => ({
      pendingReports: state.pendingReports.filter((id) => id !== reportId),
    })),
  setIsSyncing: (isSyncing) => set({ isSyncing }),
  clearPendingReports: () => set({ pendingReports: [] }),
}));