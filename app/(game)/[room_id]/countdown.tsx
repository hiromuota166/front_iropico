import { Button } from "@/components/Button/Button";
import { PhotoTaker, PhotoTakerHandle } from "@/components/Camera/PhotoTaker";
import ShutterButton from "@/components/Camera/ShutterButton";
import ScreenContainer from "@/components/ScreenContainer";
import { useGroupCodeStore } from "@/store/useStore";
import { Stack, useRouter, useFocusEffect } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Countdown() {
  const router = useRouter();
  const photoRef = React.useRef<PhotoTakerHandle>(null);
  const groupCode = useGroupCodeStore((state) => state.code);

  // 10秒カウント表示用（任意）
  const [remaining, setRemaining] = React.useState<number | null>(null);

  const isShotRef = React.useRef(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const triggerShoot = React.useCallback(async () => {
    if (isShotRef.current) return;
    isShotRef.current = true;
    clearTimers();
    setRemaining(null);
    await photoRef.current?.shoot();
  }, [clearTimers]);

  useFocusEffect(
    React.useCallback(() => {
      isShotRef.current = false;
      setRemaining(10);
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev === null) return prev;
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timeoutRef.current = setTimeout(() => {
        triggerShoot();
      }, 10_000);

      return () => {
        clearTimers();
        setRemaining(null);
      };
    }, [triggerShoot, clearTimers])
  );

  const handlePress = () => {
    router.push(`/(game)/${groupCode}/capture`);
  };

  async function handleShutter() {
    await triggerShoot();
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />

      <Button onPress={handlePress} text="この色を探してください" />

      <View style={styles.cameraArea}>
        <PhotoTaker ref={photoRef} themeHex="#bce2e8" />
      </View>

      <View style={styles.bottomBar}>
        {/* 任意：カウント表示 */}
        {typeof remaining === "number" && (
          <Text style={styles.countText}>
            自動撮影まで {remaining} 秒
          </Text>
        )}
        <ShutterButton onPress={handleShutter} />
      </View>
    </ScreenContainer>
  );
}

const BAR_HEIGHT = 110;

const styles = StyleSheet.create({
  cameraArea: {
    flex: 2,
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 30,
  },
  bottomBar: {
    height: BAR_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 12,
    gap: 8,
  },
  countText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
