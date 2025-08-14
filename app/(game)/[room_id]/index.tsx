import { Button } from "@/components/Button/Button";
import ScreenContainer from "@/components/ScreenContainer";
import { Stack, useRouter } from "expo-router";
import { Text } from "react-native";

export default function GameTop() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/(game)/1/countdown");
  };
  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>探す色発表画面</Text>
      <Button onPress={handlePress}>
        <Text>本来は勝手に数秒後にカウント画面に遷移する</Text>
        <Text>テストなので今はこのボタンを押して次に移動</Text>
      </Button>
    </ScreenContainer>
  )
}
