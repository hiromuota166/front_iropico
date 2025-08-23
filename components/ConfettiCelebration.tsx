// src/components/ConfettiCelebration.tsx
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export default function ConfettiCelebration() {
  const { width, height } = useWindowDimensions();
  const leftRef = useRef<any>(null);
  const rightRef = useRef<any>(null);

  const COUNT = 100;
  const ORIGIN_Y_OFFSET = 50;
  const FALL_SPEED = 2500;
  const EXPLOSION_SPEED = 300;

  useEffect(() => {
    const t = setTimeout(() => {
      leftRef.current?.start?.();
      rightRef.current?.start?.();
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <ConfettiCannon
        ref={leftRef}
        count={COUNT}
        fallSpeed={FALL_SPEED}
        explosionSpeed={EXPLOSION_SPEED}
        origin={{ x: 0, y: height - ORIGIN_Y_OFFSET }}
        fadeOut
        autoStart={false}
      />
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
