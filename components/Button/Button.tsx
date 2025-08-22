import { Colors } from '@/constants/Colors';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle,} from 'react-native';

type ButtonProps = {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const Button: React.FC<ButtonProps> = ({
  onPress,
  text,
  disabled = false,
  style,
  textStyle,
  ...rest
}) => (
  <TouchableOpacity
    {...rest}
    onPress={onPress}
    disabled={disabled}
    accessibilityRole="button"
    accessibilityState={{ disabled }}
    activeOpacity={0.8}
    style={[
      styles.container,
      disabled && styles.containerDisabled,
      style,
    ]}
  >
    <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>
      {text}
    </Text>
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
  containerDisabled: {
    backgroundColor: Colors.border,
    borderColor: Colors.border,
  },
  text: {
    color: Colors.textWhite,
    fontSize: 16,
  },
  textDisabled: {
    color: Colors.textWhite,
  },
});
