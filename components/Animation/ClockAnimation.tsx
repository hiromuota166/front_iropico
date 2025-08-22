import { ClockIconWithSize } from '@/components/Icon/ClockIcon';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const ClockAnimation = () => {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateToHalf = Animated.timing(rotate, {
      toValue: 0.5,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const rotateToFull = Animated.timing(rotate, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const animationSequence = Animated.sequence([
      rotateToHalf,
      rotateToFull,
    ]);

    const animationLoop = Animated.loop(animationSequence);

    animationLoop.start();

    return () => {
      animationLoop.stop();
    };
  }, [rotate]);

  const rotateData = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[{ transform: [{ rotate: rotateData }] }]}
    >
      <ClockIconWithSize size={35} />
    </Animated.View>
  );
};