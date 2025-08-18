import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { CardHeader } from "@/components/Card/CardHeader";
import UserGroupIcon from "@/components/Icon/UserGroupIcon";
import ScreenContainer from "@/components/ScreenContainer";
import { TitleIconAndText } from "@/components/TitleIconAndText";
import { UserList } from "@/components/UserList";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function RoomTop() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/(game)/1");
  };
  const roomOut = () => {
    router.push("/room_select");
  };

  const groupCode = "1234-5678";
  const groupMemberNum = 3;

  return (
    <ScreenContainer>
      <TitleIconAndText title="ロビー" subTitle={`グループコード : ${groupCode}`}>
        <UserGroupIcon />
      </TitleIconAndText>
      <Card>
        <CardHeader title={`参加者：${groupMemberNum}人`} />
        <View style={styles.cardChildren}>
          <UserList userName="ユーザー名" youBadge={true} />
          <UserList userName="ユーザー名" />
          <UserList userName="ユーザー名" />
        </View>
      </Card>
      <Button onPress={handlePress}>
        <Text>ゲームスタート画面に遷移する</Text>
      </Button>
      <Button onPress={roomOut}>
        <Text>ルームから出る</Text>
      </Button>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  cardChildren: {
    margin: 16,
    gap: 10,
  }
});
