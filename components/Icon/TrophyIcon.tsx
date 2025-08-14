import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function TrophyIcon() {
  return (
    <View style={styles.circle}>
      <MaterialCommunityIcons
        name="trophy-outline"
        size={24}
        color={Colors.textWhite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.winnerIcon,
  },
});

