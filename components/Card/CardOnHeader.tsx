import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from './Card';
import { CardHeader } from './CardHeader';

type CardOnHeaderProps = {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
  loginHeader?: boolean;
};

export const CardOnHeader: React.FC<CardOnHeaderProps> = ({ children, title, subTitle, loginHeader }) => (
  <Card>
    <CardHeader
      title={title}
      subTitle={subTitle}
      loginHeader={loginHeader}
    />
    <View style={styles.cardChildren}>
      {children}
    </View>
  </Card>
);

const styles = StyleSheet.create({
  cardChildren: {
    margin: 16,
  }
});
