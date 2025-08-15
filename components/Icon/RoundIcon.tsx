import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type RoundIconProps = {
  children: React.ReactNode;
};

export default function RoundIcon({ children }: RoundIconProps) {
  return <View style={styles.circle}>{children}</View>;
}

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 9999,
    backgroundColor: Colors.iconBackground,
  }
})