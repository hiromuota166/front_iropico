import React from 'react';
import { Platform, ScrollView } from 'react-native';

type CustomScrollViewProps = {
  children: React.ReactNode;
};

const TAB_BAR_HEIGHT = 48;

export default function CustomScrollView({ children }: CustomScrollViewProps) {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: Platform.select({
          ios: TAB_BAR_HEIGHT,
          web: 0,
          default: TAB_BAR_HEIGHT,
        }),
      }}>
      {children}
    </ScrollView>
  );
}