/**
 * Hook de cámara y galería.
 * Maneja captura de fotos y selección desde galería.
 * Usa expo-camera para captura e expo-image-picker para galería.
 */

import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

interface UseCameraResult {
  takePhoto: () => Promise<string | null>;
  pickFromGallery: (maxCount?: number) => Promise<string[]>;
  isLoading: boolean;
  error: string | null;
}

export function useCamera(): UseCameraResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const takePhoto = async (): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        setError('Permiso de cámara denegado');
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        return null;
      }

      const uri = (result.assets?.[0]?.uri as string) || '';

      if (!uri) {
        throw new Error('No se pudo capturar la foto');
      }

      return uri;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al capturar foto';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const pickFromGallery = async (maxCount = 3): Promise<string[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        setError('Permiso de galería denegado');
        return [];
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        selectionLimit: maxCount,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        return [];
      }

      const assets = (result.assets as Array<{ uri: string }>) || [];
      const uris = assets.slice(0, maxCount).map((asset) => asset.uri);

      return uris;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al seleccionar fotos';
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    takePhoto,
    pickFromGallery,
    isLoading,
    error,
  };
}