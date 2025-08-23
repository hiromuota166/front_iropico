import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import ScreenContainer from "@/components/ScreenContainer";
import { Button } from "@/components/Button/Button";
import ShutterButton from "@/components/Camera/ShutterButton";
import { PhotoTaker, PhotoTakerHandle } from "@/components/Camera/PhotoTaker";

export default function Countdown() {
  const router = useRouter();
  const photoRef = React.useRef<PhotoTakerHandle>(null);

  const handlePress = () => {
    router.push("/(game)/1/capture");
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
