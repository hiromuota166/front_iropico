import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  onPress: () => void;
  text: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  text,
  ...rest
}) => (
  <TouchableOpacity
    {...rest}
    style={styles.container}
    onPress={onPress}
  >
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.button,
    backgroundColor: Colors.button,
    borderRadius: 6.75,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.textWhite,
    fontSize: 16,
  }
})