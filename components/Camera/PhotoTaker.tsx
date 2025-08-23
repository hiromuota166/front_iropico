import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraCapture, CameraCaptureHandle } from '@/components/Camera/CameraCapture';
import { ImagePreview } from '@/components/Camera/ImagePreview';
import { Card } from '@/components/Card/Card';
import { fetchScore } from '@/lib/scoreApi';

export type PhotoTakerHandle = {

  shoot: () => Promise<void>;
};

type PhotoTakerProps = {
  themeHex: string;
};

export const PhotoTaker = React.forwardRef<PhotoTakerHandle, PhotoTakerProps>(
  ({ themeHex }, ref) => {
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

    return (
      <View style={styles.container}>
        {previewUri ? (
          <ImagePreview uri={previewUri}>
            <TouchableOpacity style={styles.button} onPress={handleCalc} disabled={loading || !imageBase64}>
              <Card>
                <Text style={styles.buttonText}>{loading ? '計算中…' : '計算する'}</Text>
              </Card>
            </TouchableOpacity>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <Text>点数：{score ?? '-'}</Text>
                {!!avgHex && <Text>平均色：{avgHex}</Text>}
              </>
            )}
          </ImagePreview>
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
