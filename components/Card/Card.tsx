import { Colors } from '@/constants/Colors';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type CardProps = {
  children?: ReactNode;
};

export const Card: React.FC<CardProps> = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 9,
    overflow: 'hidden',
    backgroundColor: Colors.textWhite,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
