import { Button } from "@/components/Button/Button";
import ScreenContainer from "@/components/ScreenContainer";
import { Stack, useRouter } from "expo-router";
import React from 'react';
import { Text } from "react-native";

export default function Capture() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/room/1/result");
  };

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>結果待ち画面</Text>
      <Button onPress={handlePress} text='次へ' />
    </ScreenContainer>
  )
}