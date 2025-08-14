import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type YouBadgeProps = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  bgColor?: string;
  color?: string;
  compact?: boolean;
};

export default function YouBadge({
  style,
  textStyle,
  bgColor = '#B8E6FE',
  color = '#00598A',
  compact = false,
}: YouBadgeProps) {
  const vPad = compact ? 4 : 6;
  const hPad = compact ? 10 : 12;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bgColor, paddingVertical: vPad, paddingHorizontal: hPad },
        style,
      ]}
    >
      <Text style={[styles.text, { color }, textStyle]}>あなた</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  },
});
