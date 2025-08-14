import React from 'react';
import { Feather } from '@expo/vector-icons';
import RoundIcon from '../Icon/RoundIcon';
import { Colors } from '@/constants/Colors';

export default function UserGroupIcon() {
  return (
    <RoundIcon>
      <Feather name="users" size={28} color={Colors.textContent} />
    </RoundIcon>
  );
}