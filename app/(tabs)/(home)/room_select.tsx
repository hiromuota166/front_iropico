import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import UserGroupIcon from "@/components/Icon/UserGroupIcon";
import CreateGroupCard from "@/components/RoomJoin/CreateGroupCard";
import JoinGroupCard from "@/components/RoomJoin/JoinGroupCard";
import SegmentedTabs from "@/components/RoomJoin/SegmentedTabs";
import ScreenContainer from "@/components/ScreenContainer";
import { TitleIconAndText } from "@/components/TitleIconAndText";
import { createRoom } from "@/lib/api";
import { handleSignOut } from "@/lib/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View, } from "react-native";

export default function RoomTop() {
  const router = useRouter();
  const [tab, setTab] = useState<"create" | "join">("create");
  const [joinCode, setJoinCode] = useState("");
  const [roomCreationLoading, setRoomCreationLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const goRoom = () => router.push("/room/1");
  const logout = () => {
    handleSignOut();
    router.replace("/(auth)/sign_in");
  };

  const goCreateGroup = async () => {
    if (!user || authLoading) {
      Alert.alert("エラー", "ユーザー情報が取得できません。ログイン状態を確認してください。");
      return;
    }

    setRoomCreationLoading(true);
    const roomData = await createRoom(user.uid);
    if (roomData) {
      console.log("Room created successfully:", roomData);
      router.push(`/room/${roomData.room_id}`);
    } else {
      Alert.alert("エラー", "ルーム作成に失敗しました。");
    }
    setRoomCreationLoading(false);
  };

  const joinGroup = () => joinCode.trim() && router.push(`/room/${joinCode.trim()}`);

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
function useAuth(): { user: any; loading: any; } {
  throw new Error("Function not implemented.");
}

