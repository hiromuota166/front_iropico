import { useRef } from 'react';
import { CameraView } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

export type PreparedPhoto = {
  previewUri: string;
  base64: string;
  base64Length: number;
};

export function useTakePhoto() {
  const camRef = useRef<CameraView>(null);

  async function takeAndPrepare(): Promise<PreparedPhoto | null> {
    const cam = camRef.current;
    if (!cam) return null;

    const shot = await cam.takePictureAsync({ quality: 0.9 });

    const m = await ImageManipulator.manipulateAsync(
      shot.uri,
      [{ resize: { width: 1280 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );

    if (!m.base64) return null;

    return {
      previewUri: m.uri,
      base64: m.base64,
      base64Length: m.base64.length,
    };
  }

  return { camRef, takeAndPrepare };
}
