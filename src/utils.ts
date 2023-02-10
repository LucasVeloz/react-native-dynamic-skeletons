import { Animated, Dimensions, ViewStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

const ANIMATION_OUTPUT = {
  leftRight: [-width, width],
  rightLeft: [width, -width],
  topBottom: [-height, height],
  bottomTop: [height, -height],
};

const animationStyle = (
  animation: keyof typeof ANIMATION_OUTPUT,
  cb: (
    outputRange: number[] | string[]
  ) => Animated.AnimatedInterpolation<string | number>
): Animated.WithAnimatedObject<ViewStyle> => {
  if (animation === 'topBottom' || animation === 'bottomTop') {
    return {
      transform: [
        {
          translateY: cb(ANIMATION_OUTPUT[animation]),
        },
      ],
    };
  }

  return {
    transform: [
      {
        translateX: cb(ANIMATION_OUTPUT[animation]),
      },
    ],
  };
};

const linearGradientPositions = (animation: keyof typeof ANIMATION_OUTPUT) => {
  if (animation === 'topBottom' || animation === 'bottomTop') {
    return {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    };
  }

  return {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  };
};

export { ANIMATION_OUTPUT, animationStyle, linearGradientPositions };
