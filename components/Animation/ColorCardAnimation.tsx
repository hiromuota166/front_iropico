import { Colors } from '@/constants/Colors';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

export const ColorCardAnimation = () => {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const jumpUp = Animated.timing(y, {
      toValue: -24,
      duration: 450,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    });

    const fallDown = Animated.timing(y, {
      toValue: 0,
      duration: 450,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    });

    const loop = Animated.loop(
      Animated.sequence([jumpUp, Animated.delay(20), fallDown])
    );

    loop.start();
    return () => loop.stop();
  }, [y]);

  return (
    <Animated.View
      style={[styles.pop, { transform: [{ translateY: y }] }]}
    />
  );
};

const styles = StyleSheet.create({
  pop: {
    backgroundColor: Colors.textContent,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: Colors.textWhite,
    borderWidth: 4,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
