import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import UserGroupIcon from "@/components/Icon/UserGroupIcon";
import CreateGroupCard from "@/components/RoomJoin/CreateGroupCard";
import JoinGroupCard from "@/components/RoomJoin/JoinGroupCard";
import SegmentedTabs from "@/components/RoomJoin/SegmentedTabs";
import ScreenContainer from "@/components/ScreenContainer";
import { TitleIconAndText } from "@/components/TitleIconAndText";
import { useWebSocket } from "@/hooks/useWebSocket";
import { createRoom, joinRoom } from "@/lib/api";
import { handleSignOut } from "@/lib/auth";
import { useGroupCodeStore } from "@/store/useStore";
import { getAuth } from "@firebase/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View, } from "react-native";

export default function RoomTop() {
  const router = useRouter();
  const [tab, setTab] = useState<"create" | "join">("create");
  const [joinCode, setJoinCode] = useState("");
  const [roomCreationLoading, setRoomCreationLoading] = useState(false);
  const { isConnected, connect, disconnect } = useWebSocket();
  const auth = getAuth();

  const goRoom = () => router.push("/room/1");
  const logout = () => {
    handleSignOut();
    router.replace("/(auth)/sign_in");
  };

  const getUserId = () => {
    const user = auth.currentUser;
    return user ? user.uid : null;
  };

  const goCreateGroup = async () => {
    const userId: string = getUserId() || "";
    if (!userId || roomCreationLoading) {
      Alert.alert("エラー", "ユーザー情報が取得できません。ログイン状態を確認してください。");
      return;
    }

    setRoomCreationLoading(true);
    const roomData: { room_id: string } | null = await createRoom(userId);
    useGroupCodeStore.setState({ code: joinCode.trim() });
    if (roomData) {
      // 接続
      const endpoint = `/ws/rooms/${roomData.room_id}?user_id=${userId}&uuid=a`;
      connect(endpoint);

      router.push(`/room/${roomData.room_id}`);
    } else {
      Alert.alert("エラー", "ルーム作成に失敗しました。");
    }
    setRoomCreationLoading(false);
  };

  const joinGroup = async () => {
    setRoomCreationLoading(true);
    const userId: string = getUserId() || "";
    if (!userId || !joinCode.trim()) {
      Alert.alert("エラー", "ユーザー情報またはルームコードが不足しています。");
      setRoomCreationLoading(false);
      return;
    }

    try {
      const result = await joinRoom(joinCode.trim(), userId);
      useGroupCodeStore.setState({ code: joinCode.trim() });
      if (result) {
        // 接続
        const endpoint = `/ws/rooms/${result.room_id}?user_id=${userId}&uuid=${userId}`;
        connect(endpoint);

        router.push(`/room/${joinCode.trim()}`);
      } else {
        Alert.alert("エラー", "ルーム参加に失敗しました。");
      }
    } catch (error) {
      console.error("Failed to join room:", error);
      Alert.alert("エラー", "ネットワークエラーによりルーム参加に失敗しました。");
    } finally {
      setRoomCreationLoading(false);
    }
  };

  const onBackgroundPress = () => {
    if (Platform.OS === "web") {
      return;
    }
    Keyboard.dismiss();
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable onPress={onBackgroundPress} style={{ flex: 1 }}>
          <TitleIconAndText
            title="ようこそ、aさん！"
            subTitle="グループを作成するか参加してください"
          >
            <UserGroupIcon />
          </TitleIconAndText>

          <View style={styles.container}>
            <Card>
              <SegmentedTabs value={tab} onChange={setTab} />

              {tab === "create" ? (
                <CreateGroupCard onCreate={goCreateGroup} disabled={false} />
              ) : (
                <JoinGroupCard
                  code={joinCode}
                  onChangeCode={setJoinCode}
                  onJoin={joinGroup}
                />
              )}
            </Card>

            <View style={styles.buttonRow}>
              <Button onPress={goRoom} text="ルーム画面に遷移する" />
              <Button onPress={logout} text="ログアウトする" />
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20 },
  buttonRow: { gap: 10, marginTop: 4 },
});
