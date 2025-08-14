import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type BackgroundBlueProps = {
  children?: React.ReactNode;
  style?: object;
};

export default function BackgroundBlue({ children, style }: BackgroundBlueProps) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orderCardBackground,
    borderRadius: 12,
    padding: 12,
  },
});
