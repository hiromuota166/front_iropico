import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TrophyIcon() {
  return (
    <View style={styles.circle}>
      <MaterialCommunityIcons
        name="trophy-outline"
        size={35}
        color={Colors.textWhite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 9999,
    backgroundColor: Colors.winnerIcon,
  },
});

