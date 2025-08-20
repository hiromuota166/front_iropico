import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { CardOnHeader } from "@/components/Card/CardOnHeader";
import { ColorResultCard } from "@/components/Card/ColorResultCard";
import TrophyIcon from "@/components/Icon/TrophyIcon";
import ScreenContainer from "@/components/ScreenContainer";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

export default function Result() {
  const winner = 'john doe';
  const score = 100;
  const colorName = 'ライトブルー';
  const colorCode = '#ADD8E6';
  const router = useRouter();
  const handlePress = () => {
    router.push("/(game)/1");
  };
  const roomOut = () => {
    router.push("/room_select");
  };

  const rankingData = [
    { userId: 101, name: "Alice", score: 95.5, photoURL: "https://example.com/photos/alice_round1.jpg" },
    { userId: 102, name: "Bob", score: 92.0, photoURL: "https://example.com/photos/bob_round1.jpg" },
    { userId: 103, name: "Carol", score: 88.7, photoURL: "https://example.com/photos/carol_round1.jpg" },
  ];

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <ScreenContainer>
        <View style={styles.container}>
          <Card>
            <LinearGradient
              colors={["#FEFCE8", "#FFF7ED"]}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 1 }}
              style={styles.cardContainer}
            >
              <TrophyIcon />
              <Text>{winner}</Text>
              <Text>⭐️⭐️⭐️⭐️⭐️</Text>
              <Text>スコア：{score}</Text>
            </LinearGradient>
          </Card>
          <ColorResultCard
            title='今回の色'
            colorName={colorName}
            colorCode={colorCode}
          />
          <CardOnHeader title='みんなの撮影結果'>
            <></>
          </CardOnHeader>
          <Button text="ゲームスタート" onPress={handlePress} />
          <Button text="ゲーム終了" onPress={roomOut} />
        </View>
      </ScreenContainer>
    </ScrollView>

  )
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.winnerCard,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    gap: 20,
  },
});
