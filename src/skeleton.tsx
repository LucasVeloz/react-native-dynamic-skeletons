import React, { useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Animated, StyleSheet, View } from 'react-native';
import type { SkeletonProps } from './types';
import { animationStyle, linearGradientPositions } from './utils';

export const Skeleton = ({
  colors,
  style,
  animationType = 'leftRight',
  duration,
}: SkeletonProps) => {
  const COLORS = colors || ['#e1e1e1', '#f5f5f5', '#e1e1e1'];
  const animationValue = useRef(new Animated.Value(0)).current;

  const getOutput = (output: string[] | number[]) => {
    return animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: output,
    });
  };

  const { start, end } = linearGradientPositions(animationType);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: duration || 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [animationValue, duration]);

  return (
    <View style={[styles.overlay, style]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          animationStyle(animationType, getOutput),
        ]}
      >
        <LinearGradient
          start={start}
          end={end}
          colors={COLORS}
          style={styles.container}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    overflow: 'hidden',
  },
});
