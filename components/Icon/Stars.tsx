import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { StyleSheet, View } from 'react-native';


type StarsProps = {
  size?: number;
};

export default function Stars({ size = 18 }: StarsProps) {
  return (
    <View style={styles.starsContainer}>
      <AntDesign name="star" size={size} style={styles.star} />
      <AntDesign name="star" size={size} style={styles.star} />
      <AntDesign name="star" size={size} style={styles.star} />
      <AntDesign name="star" size={size} style={styles.star} />
      <AntDesign name="star" size={size} style={styles.star} />
    </View>
  );
}

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  star: {
    color: Colors.star,
  },
})