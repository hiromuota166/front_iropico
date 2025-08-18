import { Button } from "@/components/Button/Button";
import ScreenContainer from "@/components/ScreenContainer";
import { Stack, useRouter } from "expo-router";
import { Text } from "react-native";

export default function Countdown() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/(game)/1/capture");
  };
  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>カウント画面。多分ここでユーザーに写真撮ってもらうイメージになるのかな？</Text>
      <Button onPress={handlePress} text='次へ' />
    </ScreenContainer>
  )
}
