import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from "react-native";
import { CameraCapture, CameraCaptureHandle } from '@/components/Camera/CameraCapture';
import { useRouter } from "expo-router";
import { fetchScore } from '@/lib/scoreApi';

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
    const [score, setScore] = useState<number | null>(null);
    const [avgHex, setAvgHex] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const cameraRef = React.useRef<CameraCaptureHandle>(null);

    const shoot = React.useCallback(async () => {
      const result = await cameraRef.current?.shoot();
      if (result && result.previewUri && result.base64) {
        setPreviewUri(result.previewUri);
        setImageBase64(result.base64);
        setScore(null);
        setAvgHex('');
      }
    }, []);

    React.useImperativeHandle(ref, () => ({ shoot }), [shoot]);

    async function handleCalc() {
      if (!imageBase64) return;
      setLoading(true);
      try {
        const res = await fetchScore({ imageBase64, themeHex });
        setScore(res.score);
        setAvgHex(res.avgColorHex);
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
