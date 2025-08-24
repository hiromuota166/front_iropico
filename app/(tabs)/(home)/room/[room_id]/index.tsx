import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { CardHeader } from "@/components/Card/CardHeader";
import UserGroupIcon from "@/components/Icon/UserGroupIcon";
import ScreenContainer from "@/components/ScreenContainer";
import { TitleIconAndText } from "@/components/TitleIconAndText";
import { UserList } from "@/components/UserList";
import { startRoom } from "@/lib/api";
import { useGroupCodeStore } from "@/store/useStore";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function RoomTop() {
  const router = useRouter();
  // const { goGame } = useWebSocket();
  const groupCode = useGroupCodeStore((state) => state.code);

  const handlePress = async () => {
    console.log("RoomTop groupCode:", groupCode);
    const data = await startRoom(groupCode);
    console.log("startRoom data:", data);
    router.push(`/(game)/${groupCode}`);
  };

  const roomOut = () => {
    router.push("/room_select");
  };

  const groupMemberNum = 3;

  return (
    <ScreenContainer>
      <TitleIconAndText title="ロビー" subTitle={`グループコード : ${groupCode}`}>
        <UserGroupIcon />
      </TitleIconAndText>
      <View style={styles.container}>
        <View>
          <Card>
            <CardHeader title={`参加者：${groupMemberNum}人`} />
            <View style={styles.cardChildren}>
              <UserList userName="ユーザー名" youBadge={true} />
              <UserList userName="ユーザー名" />
              <UserList userName="ユーザー名" />
            </View>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={handlePress} text='ゲーム開始' />
          <Button onPress={roomOut} text='ルームから出る' />
        </View>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  cardChildren: {
    margin: 16,
    gap: 10,
  },
  container: {
    gap: 20,
  },
  buttonContainer: {
    gap: 10,
  },
});
