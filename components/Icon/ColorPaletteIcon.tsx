import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import RoundIcon from './RoundIcon';

export default function ColorPaletteIcon() {
  return (
    <RoundIcon>
      <MaterialCommunityIcons
        name="palette-outline"
        size={24}
        color={Colors.textWhite}
      />
    </RoundIcon>
  );
}
