/**
 * Tipos comunes compartidos en todo el proyecto.
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}