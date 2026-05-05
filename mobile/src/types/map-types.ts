/**
 * Tipos relacionados con mapas.
 */

import type { Coordinates } from './common-types';
import type { ReportStatus } from './report-types';

export interface MapMarker {
  id: string;
  coordinates: Coordinates;
  title: string;
  severity: 'low' | 'medium' | 'high';
  reportId: string;
  isOwn: boolean;
  status: ReportStatus;
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const COCHABAMBA_CENTER: Coordinates = {
  latitude: -17.3895,
  longitude: -66.1568,
};

export const DEFAULT_MAP_REGION: MapRegion = {
  latitude: COCHABAMBA_CENTER.latitude,
  longitude: COCHABAMBA_CENTER.longitude,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};