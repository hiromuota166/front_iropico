import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type RoundIconProps = {
  children: React.ReactNode;
  size?: number;
};

export default function RoundIcon({ children, size = 70 }: RoundIconProps) {
  return <View style={[styles.circle, { width: size, height: size }]}>{children}</View>;
}

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    backgroundColor: Colors.iconBackground,
  }
})