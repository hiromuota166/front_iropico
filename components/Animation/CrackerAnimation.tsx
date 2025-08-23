// components/ConfettiCelebration.tsx
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export default function ConfettiCelebration() {
  // 画面サイズ
  const { width, height } = useWindowDimensions();

  const leftRef = useRef<unknown>(null);
  const rightRef = useRef<unknown>(null);

  // 固定値（必要ならここを書き換える）
  const COUNT = 60;          // 紙ふぶき枚数
  const ORIGIN_Y_OFFSET = 20; // 画面下から少し持ち上げる
  const FALL_SPEED = 2500;    // 落下スピード
  const EXPLOSION_SPEED = 450;// 初速

  useEffect(() => {
    // 画面表示後に自動で左右同時発射
    const t = setTimeout(() => {
      leftRef.current?.start?.();
      rightRef.current?.start?.();
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* 左下 → 右上 */}
      <ConfettiCannon
        ref={leftRef}
        count={COUNT}
        fallSpeed={FALL_SPEED}
        explosionSpeed={EXPLOSION_SPEED}
        origin={{ x: 0, y: height - ORIGIN_Y_OFFSET }}
        fadeOut
        autoStart={false}
      />

      {/* 右下 → 左上 */}
      <ConfettiCannon
        ref={rightRef}
        count={COUNT}
        fallSpeed={FALL_SPEED}
        explosionSpeed={EXPLOSION_SPEED}
        origin={{ x: width, y: height - ORIGIN_Y_OFFSET }}
        fadeOut
        autoStart={false}
      />
    </View>
  );
}
