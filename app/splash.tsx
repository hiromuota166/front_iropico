import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import ColorPaletteIcon from "@/components/Icon/ColorPaletteIcon";

export default function IconOnlyScreen() {
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
        toValue: 1.03, // ちょい伸びる
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
        toValue: 0.97, // 着地でちょい潰れる
        duration: Math.round(period * 0.55),
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    const loop = Animated.loop(Animated.sequence([up, down]));
    loop.start();
    return () => loop.stop();
  }, [translateY, scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY }, { scale }] }}>
        <ColorPaletteIcon />
      </Animated.View>
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
});
