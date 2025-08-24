import { Button } from "@/components/Button/Button";
import { PhotoTaker, PhotoTakerHandle } from "@/components/Camera/PhotoTaker";
import ShutterButton from "@/components/Camera/ShutterButton";
import ScreenContainer from "@/components/ScreenContainer";
import { useGroupCodeStore } from "@/store/useStore";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Countdown() {
  const router = useRouter();
  const photoRef = React.useRef<PhotoTakerHandle>(null);
  const groupCode = useGroupCodeStore((state) => state.code);

  const handlePress = () => {
    router.push(`/(game)/${groupCode}/capture`);
  };

  async function handleShutter() {
    await photoRef.current?.shoot();
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />

      <Button onPress={handlePress} text="この色を探してください" />

      <View style={styles.cameraArea}>
        <PhotoTaker ref={photoRef} themeHex="#bce2e8" />
      </View>

      <View style={styles.bottomBar}>
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
  },
});
