import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RoundIcon from './RoundIcon';
import { Colors } from '@/constants/Colors';

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
