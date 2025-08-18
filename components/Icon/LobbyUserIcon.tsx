import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import RoundIcon from './RoundIcon';

export default function LobbyUserIcon() {
  return (
    <RoundIcon size={36}>
      <Feather name="user" size={18} color={Colors.textContent} />
    </RoundIcon>
  );
}