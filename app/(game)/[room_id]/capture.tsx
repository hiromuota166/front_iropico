import { Button } from "@/components/Button/Button";
import { CameraCapture } from '@/components/Camera/CameraCapture';
import { ImagePreview } from '@/components/Camera/ImagePreview';
import { Card } from '@/components/Card/Card';
import ScreenContainer from "@/components/ScreenContainer";
import { fetchScore } from '@/lib/scoreApi';
import { Stack, useRouter } from "expo-router";
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Capture() {
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [avgHex, setAvgHex] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handlePress = () => {
    router.push("/room/1/result");
  };
  async function handleCalc() {
    if (!imageBase64) return;
    setLoading(true);
    try {
      const res = await fetchScore({ imageBase64, themeHex: '#bce2e8' });
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

  function handleCaptured(args: { previewUri: string; base64: string }) {
    setPreviewUri(args.previewUri);
    setImageBase64(args.base64);
    setScore(null);
    setAvgHex('');
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>結果待ち画面</Text>
      <Button onPress={handlePress} text='次へ' />
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
          <CameraCapture onCaptured={handleCaptured} />
        )}
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: { alignSelf: 'center', alignItems: 'center', width: '90%' },
  buttonText: { fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' },
});