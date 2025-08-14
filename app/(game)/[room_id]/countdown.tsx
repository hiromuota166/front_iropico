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
      <Button onPress={handlePress}>
        <Text>本来は勝手に数秒後に結果待ち画面に遷移する</Text>
        <Text>テストなので今はこのボタンを押して次に移動</Text>
      </Button>
    </ScreenContainer>
  )
}
