import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import ScreenContainer from "@/components/ScreenContainer";
import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function GameTop() {
  const router = useRouter();
  const handlePress = () => {
    router.push("/(game)/1/countdown");
  };
  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Card>
        <View style={styles.container}>
          <Text className="text-2xl font-bold mb-4" style={styles.title}>ラウンド１</Text>
          <Text className="text-2xl font-bold mb-4" style={styles.search}>探す色は...</Text>
          <Text className="text-2xl font-bold mb-4" style={styles.title}>スカイブルー</Text>
          <Text className="text-2xl font-bold mb-4" style={styles.search}>#45B7D1</Text>
        </View>
      </Card>
      <Button onPress={handlePress}>
        <Text className="text-lg font-bold">デバッグ用の次へボタン</Text>
      </Button>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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