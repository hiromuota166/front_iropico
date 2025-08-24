import ClockAnimation from "@/components/Animation/ClockAnimation";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import ExplainCard from "@/components/Card/ExplainCard";
import ScreenContainer from "@/components/ScreenContainer";
import { Colors } from "@/constants/Colors";
import { useScoreStore } from "@/store/useStore";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";

const text: string[] = [
  "写真全体の色を取得します",
  "画像の平均色を計算します",
  "お題の色との近さを計算しスコア化"
];

const title: string = "スコアの計算方法について";

export default function Capture() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/room/1/result");
  };
  const score = useScoreStore((state) => state.score);
  const avgHex = useScoreStore((state) => state.avgHex);
  console.log(score, avgHex);

  useEffect(() => {
    if (score !== null && avgHex !== null) {
      router.push(`/room/1/result`);
    }
  }, [score, avgHex]);

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Card>
        <View style={styles.cardContainer}>
          <ClockAnimation />
          <Text style={styles.completedText}>撮影完了！</Text>
          <Text style={styles.calculatingText}>スコア計算中...</Text>
          <ExplainCard title={title} text={text} />
        </View>
      </Card>
      <Button onPress={handlePress} text='次へ' />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  completedText: {
    fontSize: 18,
    color: Colors.textTitle,
  },
  calculatingText: {
    fontSize: 14,
    color: Colors.textContent,
  },
});