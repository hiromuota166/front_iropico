import { CameraCapture, CameraCaptureHandle } from '@/components/Camera/CameraCapture';
import { fetchScore } from '@/lib/scoreApi';
import { useImageStore, useScoreStore } from '@/store/useStore';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";

export type PhotoTakerHandle = {
  shoot: () => Promise<void>;
};

type PhotoTakerProps = {
  themeHex: string;
};

export const PhotoTaker = React.forwardRef<PhotoTakerHandle, PhotoTakerProps>(
  ({ themeHex }, ref) => {
    const router = useRouter();
    const [previewUri, setPreviewUri] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const cameraRef = React.useRef<CameraCaptureHandle>(null);
    const setScore = useScoreStore((state) => state.setScore);
    const setAvgHex = useScoreStore((state) => state.setAvgHex);
    const setPhoto = useImageStore((state) => state.setPhotoUrl);

    const shoot = React.useCallback(async () => {
      const result = await cameraRef.current?.shoot();
      if (result && result.previewUri && result.base64) {
        setPreviewUri(result.previewUri);
        setImageBase64(result.base64);
      }
    }, []);

    React.useImperativeHandle(ref, () => ({ shoot }), [shoot]);

    async function handleCalc() {
      if (!imageBase64) return;

      setLoading(true);
      try {
        console.log('imageBase64:', imageBase64);
        const res = await fetchScore({ imageBase64, themeHex });
        setScore(res.score);
        setAvgHex(res.avgColorHex);
        setPhoto(previewUri || "");
      } catch (e) {
        console.log('score error', e);
        setScore(null);
        setAvgHex('');
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      if (previewUri) {
        handleCalc();
        router.push(`/(game)/1/capture?uri=${encodeURIComponent(previewUri)}`);
      }
    }, [previewUri, router]);

    return (
      <View style={styles.container}>
        {previewUri ? (
          <View />
        ) : (
          <CameraCapture ref={cameraRef} />
        )}
      </View>
    );
  }
);

PhotoTaker.displayName = 'PhotoTaker';

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: { alignSelf: 'center', alignItems: 'center', width: '90%' },
  buttonText: { fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' },
});
