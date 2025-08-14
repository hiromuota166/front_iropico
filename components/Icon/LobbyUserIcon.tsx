import React from 'react';
import { Feather } from '@expo/vector-icons';
import RoundIcon from './RoundIcon';
import { Colors } from '@/constants/Colors';

export default function LobbyUserIcon() {
  return (
    <RoundIcon>
      <Feather name="user" size={28} color={Colors.textContent} />
    </RoundIcon>
  );
}