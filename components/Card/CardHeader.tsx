import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CardHeaderProps = {
  title: string;
  subTitle?: string;
  loginHeader?: boolean;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subTitle, loginHeader }) => (
  <View
    style={[
      styles.header,
      loginHeader && styles.headerCenter,
    ]}
  >
    <Text
      style={[
        styles.title,
        loginHeader && styles.headerCenter,
      ]}
    >
      {title}
    </Text>
    {subTitle && (
      <Text
        style={[
          styles.subTitle,
          loginHeader && styles.headerCenter,
        ]}
      >
        {subTitle}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.border,
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  headerCenter: {
    alignItems: 'center',
  },
  title: {
    paddingTop: 10,
    color: Colors.textTitle,
    fontSize: 16,
  },
  subTitle: {
    color: Colors.textContent,
    fontSize: 14,
    marginTop: 4,
  },
});
