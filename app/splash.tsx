import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Easing, Text } from "react-native";
import ColorPaletteIcon from "@/components/Icon/ColorPaletteIcon";

export default function IconOnlyScreen() {
  // --- アイコンの跳ねアニメ ---
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const amplitude = 18; // 跳ね幅(px)
    const period = 950;   // 往復時間(ms)

    const up = Animated.parallel([
      Animated.timing(translateY, {
        toValue: -amplitude,
        duration: Math.round(period * 0.45),
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.03,
        duration: Math.round(period * 0.45),
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    const down = Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: Math.round(period * 0.55),
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.97,
        duration: Math.round(period * 0.55),
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    const loop = Animated.loop(Animated.sequence([up, down]));
    loop.start();
    return () => loop.stop();
  }, [translateY, scale]);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s === 3 ? 1 : (s + 1) as 1 | 2 | 3));
    }, 350); // 0.5秒ごとに切替
    return () => clearInterval(id);
  }, []);
  const DOTS = ["", " .", " . .", " . . ."];

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY }, { scale }] }}>
        <ColorPaletteIcon />
      </Animated.View>

      <Text style={styles.loadingText}>
        ロード中{DOTS[step]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loadingText: {
    marginTop: 14,
    fontSize: 16,
    color: "#374151",
  },
});
