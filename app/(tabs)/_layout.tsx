import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.button,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopColor: Colors.border,
            borderTopWidth: 1,
          },
          default: {
            backgroundColor: 'transparent',
            borderTopColor: Colors.button,
            borderTopWidth: 1,
          },
        }),
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: '対戦',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="sword-cross" color={color} />,
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: '履歴',
          tabBarIcon: ({ color }) => (<FontAwesome5 name="history" size={22} color={color} />),
        }}
      />
    </Tabs>
  );
}