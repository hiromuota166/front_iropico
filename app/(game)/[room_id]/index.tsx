import ColorCardAnimation from "@/components/Animation/ColorCardAnimation";
import { Card } from "@/components/Card/Card";
import ScreenContainer from "@/components/ScreenContainer";
import { Colors } from "@/constants/Colors";
import { useGroupCodeStore } from "@/store/useStore";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function GameTop() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/(game)/${useGroupCodeStore.getState().code}/countdown`);
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  const testColorCode = "#45B7D1";
  const testColorName = "スカイブルー";
  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Card>
        <View style={styles.container}>
          <Text className="text-2xl font-bold mb-4" style={styles.title}>ラウンド１</Text>
          <Text className="text-2xl font-bold mb-4" style={styles.search}>探す色は...</Text>
          <ColorCardAnimation colorCode={testColorCode} />
          <Text className="text-2xl font-bold mb-4" style={styles.title}>{testColorName}</Text>
          <Text className="text-2xl font-bold mb-4" style={styles.search}>{testColorCode}</Text>
        </View>
      </Card>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    margin: 16,
  },
  title: {
    fontSize: 24,
    color: Colors.textTitle,
  },
  search: {
    fontSize: 18,
    color: Colors.activeTabIcon,
  },

});