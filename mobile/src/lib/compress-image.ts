/**
 * Utilidad para comprimir imágenes antes de subirlas al servidor.
 * Según 02_DESIGN_SYSTEM.md: JPEG, 70% calidad, max 1200px ancho.
 */

import * as ImageManipulator from 'expo-image-manipulator';

const MAX_WIDTH = 1200;
const COMPRESS_QUALITY = 0.7;

export async function compressImage(uri: string): Promise<string> {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: MAX_WIDTH } }],
    {
      compress: COMPRESS_QUALITY,
      format: ImageManipulator.SaveFormat.JPEG,
    },
  );

  return result.uri;
}
