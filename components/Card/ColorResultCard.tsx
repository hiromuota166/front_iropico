import { CardOnHeader } from '@/components/Card/CardOnHeader';
import { Colors } from "@/constants/Colors";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';

type ColorResultCardProps = {
  title: string;
  colorName: string;
  colorCode: string;
};

export const ColorResultCard: React.FC<ColorResultCardProps> = ({ title, colorName, colorCode }) => (
  <Card>
    <CardOnHeader title={title}>
      <View style={styles.colorContainer}>
        <View style={[styles.colorCard, { backgroundColor: colorCode }]} />
        <View style={styles.textColorContainer}>
          <Text style={styles.colorNameText}>{colorName}</Text>
          <Text style={styles.colorCodeText}>{colorCode}</Text>
        </View>
      </View>
    </CardOnHeader>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  colorCard: {
    height: 48,
    width: 48,
    borderRadius: 8,
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  textColorContainer: {
    justifyContent: "center",
  },
  colorNameText: {
    color: Colors.textTitle,
  },
  colorCodeText: {
    color: Colors.textContent,
  }
});
