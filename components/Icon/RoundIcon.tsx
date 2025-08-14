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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.iconBackground,
  }
})