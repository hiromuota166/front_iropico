import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import Svg, { Circle, Line, Rect } from 'react-native-svg';
import RoundIcon from './RoundIcon';

function ClockIcon() {
  return (
    <RoundIcon>
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Rect
          x={9} y={1.0} width={6} height={2.2} rx={1.1}
          fill={Colors.textWhite}
        />
        <Circle
          cx={12} cy={13} r={7.5}
          stroke={Colors.textWhite}
          strokeWidth={2.5}
          fill="none"
        />
        <Line
          x1={12} y1={13} x2={15.5} y2={10.2}
          stroke={Colors.textWhite}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </Svg>
    </RoundIcon>
  );
}

function ClockIconWithSize({ size = 35 }: { size: number }) {
  return (
    <RoundIcon>
      <MaterialIcons name="timer" size={size} color={Colors.textWhite} />
    </RoundIcon>
  );
}

export { ClockIcon, ClockIconWithSize };

