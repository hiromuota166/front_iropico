import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

type ButtonProps = {
  onPress: () => void;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  ...rest
}) => (
  <TouchableOpacity
    {...rest}
    style={styles.container}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.button,
    backgroundColor: Colors.button,
    borderRadius: 6.75,
  }
})