import { ClockIconWithSize } from '@/components/Icon/ClockIcon';
import React from 'react';
import { Animated, Easing } from 'react-native';

export const ClockAnimation = () => {
  const rotate = new Animated.Value(0);

  const rotateData = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  Animated.loop(
    Animated.timing(rotate, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  return (
    <Animated.View
      style={[{ transform: [{ rotate: rotateData }] }]}
    >
      <ClockIconWithSize size={35} />
    </Animated.View>
  );
};
