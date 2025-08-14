import { Button } from "@/components/Button/Button";
import ScreenContainer from "@/components/ScreenContainer";
import { handleSignOut } from "@/lib/auth";
import { useRouter } from "expo-router";
import { Text } from "react-native";

export default function RoomSelect() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/room/1");
  };
  const handlePressLogout = () => {
    handleSignOut();
    router.replace("/(auth)/sign_in");
  };
  return (
    <ScreenContainer>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <Text>ルーム作成or参加ページ</Text>
      <Button onPress={handlePress}>
        <Text>ルーム画面に遷移する</Text>
      </Button>
      <Button onPress={handlePressLogout}>
        <Text>ログアウトする</Text>
      </Button>
    </ScreenContainer>
  )
}
