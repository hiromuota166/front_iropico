import { Button } from "@/components/Button/Button";
import ScreenContainer from "@/components/ScreenContainer";
import { Stack, useRouter } from "expo-router";
import { Text } from "react-native";

export default function Result() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/(game)/1");
  };
  const roomOut = () => {
    router.push("/room_select");
  };
  return (
    <ScreenContainer>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <Text>結果画面</Text>
      <Button onPress={handlePress}>
        <Text>ゲームスタート</Text>
      </Button>
      <Button onPress={roomOut}>
        <Text>ルームから出る</Text>
      </Button>
    </ScreenContainer>
  )
}
