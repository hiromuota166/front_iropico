import React, { useState } from "react";
import {StyleSheet, View, Keyboard, Pressable, Platform, KeyboardAvoidingView,} from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import ScreenContainer from "@/components/ScreenContainer";
import { TitleIconAndText } from "@/components/TitleIconAndText";
import UserGroupIcon from "@/components/Icon/UserGroupIcon";
import SegmentedTabs from "@/components/RoomJoin/SegmentedTabs";
import CreateGroupCard from "@/components/RoomJoin/CreateGroupCard";
import JoinGroupCard from "@/components/RoomJoin/JoinGroupCard";
import { handleSignOut } from "@/lib/auth";

export default function RoomTop() {
  const router = useRouter();
  const [tab, setTab] = useState<"create" | "join">("create");
  const [joinCode, setJoinCode] = useState("");

  const goRoom = () => router.push("/room/1");
  const logout = () => {
    handleSignOut();
    router.replace("/(auth)/sign_in");
  };
  const goCreateGroup = () => router.push("/group/create");
  const joinGroup = () => joinCode.trim() && router.push(`/room/${joinCode.trim()}`);

  const onBackgroundPress = (e: any) => {
    if (Platform.OS === "web") {
      const t = (e?.target as HTMLElement) ?? null;
      if (t && t.closest('input, textarea, [contenteditable="true"], [role="textbox"]')) {
        return;
      }
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
                <CreateGroupCard onCreate={goCreateGroup} />
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
