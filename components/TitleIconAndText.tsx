import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type TitleIconAndTextProps = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
};

export const TitleIconAndText: React.FC<TitleIconAndTextProps> = ({ title, subTitle, children }) => {
  return (
    <View style={styles.titleView}>
      {children}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: Colors.textContent,
  },
});