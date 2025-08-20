import { Colors } from '@/constants/Colors';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

type RankingProps = {
  userId: number;
  name: string;
  score: number;
  photoURL: string;
};

const { width: screenWidth } = Dimensions.get('window');

export const Ranking: React.FC<RankingProps> = ({ userId, name, score, photoURL }) => (
  <View style={styles.cardChildren}>
    <View style={styles.photoContainer}>
      <Image source={{ uri: photoURL }} style={styles.photo} resizeMode="cover" />
    </View>
    <Text>{name}</Text>
    <Text>{score}</Text>
  </View>
);

const styles = StyleSheet.create({
  cardChildren: {
    width: "100%",
    backgroundColor: Colors.button,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  photoContainer: {
    width: screenWidth - (66),
    aspectRatio: 16 / 9,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.inputPlaceholder,
  },
  photo: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'black',
  },
  scoreText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
});