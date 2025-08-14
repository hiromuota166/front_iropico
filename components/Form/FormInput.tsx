import { Colors } from '@/constants/Colors';
import React, { forwardRef } from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { inputStyles } from './InputStyle';

type Props = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  helperText?: string;
  errorText?: string;
  error?: boolean;
};

export const FormInput = forwardRef<TextInput, Props>(
  ({ containerStyle, helperText, errorText, error, style, ...rest }, ref) => {
    return (
      <View style={containerStyle}>
        <TextInput
          ref={ref}
          style={[
            inputStyles.base,
            error && inputStyles.error,
            style,
          ]}
          placeholderTextColor={Colors.inputPlaceholder}
          {...rest}
        />
        {errorText ? (
          <Text style={inputStyles.errorText}>{errorText}</Text>
        ) : helperText ? (
          <Text style={inputStyles.helper}>{helperText}</Text>
        ) : null}
      </View>
    );
  }
);

FormInput.displayName = 'FormInput';
