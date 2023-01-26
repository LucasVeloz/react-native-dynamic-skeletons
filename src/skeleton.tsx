import React, { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import type { SkeletonProps } from './types';

const { width } = Dimensions.get('window');

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
export const Skeleton = ({ colors, style }: SkeletonProps) => {
  const animationValue = useRef(new Animated.Value(0)).current;

  const skeletonXStyle = {
    transform: [
      {
        translateX: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-width, width],
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [animationValue]);

  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <AnimatedLinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors || ['#e1e1e1', '#f5f5f5', '#e1e1e1']}
        style={[{ ...StyleSheet.absoluteFillObject }, skeletonXStyle]}
      />
    </View>
  );
};
