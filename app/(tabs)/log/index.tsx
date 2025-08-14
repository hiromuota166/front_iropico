import ScreenContainer from "@/components/ScreenContainer";
import { Stack } from "expo-router";
import { Text } from "react-native";

export default function GameLog() {
  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>ここは履歴ページ</Text>
    </ScreenContainer>
  )
}
