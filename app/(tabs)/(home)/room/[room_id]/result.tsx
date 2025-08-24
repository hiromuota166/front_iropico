import CrackerAnimation from "@/components/Animation/CrackerAnimation";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { CardOnHeader } from "@/components/Card/CardOnHeader";
import { ColorResultCard } from "@/components/Card/ColorResultCard";
import CustomScrollView from "@/components/CustomScrollView";
import Stars from "@/components/Icon/Stars";
import TrophyIcon from "@/components/Icon/TrophyIcon";
import ScreenContainer from "@/components/ScreenContainer";
import { Colors } from "@/constants/Colors";
import { useImageStore, useNameStore, useScoreStore } from "@/store/useStore";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";


const { width: screenWidth } = Dimensions.get('window');
const CONTAINER_PADDING = 66;

export default function Result() {
  const round = 1;
  const userName = useNameStore((state) => state.userName);
  const colorName = 'ライトブルー';
  const colorCode = '#ADD8E6';
  const router = useRouter();
  const handlePress = () => {
    router.push("/(game)/1");
  };
  const roomOut = () => {
    router.push("/room_select");
  };
  const score = useScoreStore((state) => state.score);
  const photoUrl = useImageStore((state) => state.photoUrl);

  const rankingData = [
    { userId: 101, name: userName, score: score, photoURL: photoUrl },
  ];

  const [fire, setFire] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setFire(true);
      const t = setTimeout(() => setFire(false), 3000);
      return () => clearTimeout(t);
    }, [])
  );

  return (
    <CustomScrollView>
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
              <View style={styles.winnerInfo}>
                <Text style={styles.roundText}>ラウンド{round}優勝！</Text>
                <Text style={styles.winnerText}>{userName}</Text>
                <Stars />
                <Text style={styles.winnerScoreText}>スコア：{score}</Text>
              </View>
            </LinearGradient>
          </Card>
          <ColorResultCard
            title='今回の色'
            colorName={colorName}
            colorCode={colorCode}
          />
          <CardOnHeader title='みんなの撮影結果'>
            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={rankingData}
              renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.photoURL }} style={styles.image} />
                  <View style={styles.scoreBadge}>
                    <Text style={styles.scoreText}>{item.score}</Text>
                  </View>
                  <View style={styles.rankingContainer}>
                    {item === rankingData[0] && <Text style={styles.winnerTrophy}>🏆</Text>}
                    <Text style={styles.nameText}>{item.name}</Text>
                    {item === rankingData[0] && <Text style={styles.winnerTag}>winner!</Text>}
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.userId.toString()}
            />
          </CardOnHeader>
          <Button text="ゲームスタート" onPress={handlePress} />
          <Button text="ゲーム終了" onPress={roomOut} />
        </View>
        {fire && <CrackerAnimation />}
      </ScreenContainer>
    </CustomScrollView>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.winnerCard,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  container: {
    gap: 20,
  },
  imageContainer: {
    width: screenWidth - CONTAINER_PADDING, // padding(16) * 4 + border(1) * 4だけどこの実装はパチモンかもしれない⭐️
    height: screenWidth,
    padding: 16,
    gap: 12,
  },
  image: {
    flex: 1,
    borderRadius: 14,
    resizeMode: "cover",
    backgroundColor: Colors.inputPlaceholder,
  },
  rankingContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    width: '100%',
    gap: 12,
  },
  scoreBadge: {
    position: 'absolute',
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.textWhite,
    top: 24,
    right: 24,
  },
  scoreText: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.textContent,
  },
  nameText: {
    textAlign: 'center',
    fontSize: 24,
    color: Colors.textTitle,
  },
  winnerTag: {
    backgroundColor: Colors.winnerTag,
    padding: 2,
    borderRadius: 8,
  },
  winnerTrophy: {
    fontSize: 24,
  },
  winnerInfo: {
    gap: 10,
    alignItems: "center",
  },
  roundText: {
    color: Colors.roundText,
    fontSize: 26,
  },
  winnerText: {
    color: Colors.winnerText,
    fontSize: 22,
  },
  winnerScoreText: {
    color: Colors.winnerPlayerScore,
    fontSize: 16,
  }
});
