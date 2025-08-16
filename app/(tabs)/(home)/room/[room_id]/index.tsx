import { Button } from "@/components/Button/Button";
import UserGroupIcon from "@/components/Icon/UserGroupIcon";
import ScreenContainer from "@/components/ScreenContainer";
import { TitleIconAndText } from "@/components/TitleIconAndText";
import { useRouter } from "expo-router";
import { Text } from "react-native";

export default function RoomTop() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/(game)/1");
  };
  const roomOut = () => {
    router.push("/room_select");
  };

  const groupCode = "1234-5678";

  return (
    <ScreenContainer>
      <TitleIconAndText title="ロビー" subTitle={`グループコード : ${groupCode}`}>
        <UserGroupIcon />
      </TitleIconAndText>
      <Button onPress={handlePress}>
        <Text>ゲームスタート画面に遷移する</Text>
      </Button>
      <Button onPress={roomOut}>
        <Text>ルームから出る</Text>
      </Button>
    </ScreenContainer>
  )
}
