import { ReactElement, Children } from 'react';
import { Animated, Dimensions, StyleProp, ViewStyle } from 'react-native';

const DEFAULT_BACKGROUND_COLOR = { backgroundColor: '#e1e1e1' } as const;

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

function convertingChildren(children: ReactElement | ReactElement[]) {
  return Children.toArray(children) as ReactElement[];
}

function createChildrensWithStyles(
  children: ReactElement | ReactElement[],
  defaultStyle: StyleProp<ViewStyle>
) {
  const childrenArray = convertingChildren(children);

  return childrenArray.map((child) => {
    const defaultArray = [DEFAULT_BACKGROUND_COLOR, defaultStyle];
    const style = child.props?.style;

    if (style) {
      if (Array.isArray(style)) {
        defaultArray.unshift(...style);
      }
      defaultArray.unshift(style);
      return defaultArray;
    }

    const inner = child.type as Record<string, any>;
    if (inner?.styledComponentId) {
      const cssStyles = inner?.inlineStyle.rules[0].split(';') as string[];

      // convert css styles into react native styles
      const reactNativeStyle = cssStyles.reduce((acc, curr) => {
        const [key, value] = curr.split(':');
        if (!key || !value) return acc;
        const newKey = key
          .replace(/-./g, (x) => (x[1] ? x[1].toUpperCase() : x))
          .trim();
        const newValue = value?.replace(/px/g, '').trim();
        const isNumber = Number(newValue);
        return {
          ...acc,
          [newKey]: isNaN(isNumber) ? newValue : isNumber,
        };
      }, {});

      defaultArray.unshift(reactNativeStyle);
      return defaultArray;
    }

    return defaultArray;
  });
}

export {
  ANIMATION_OUTPUT,
  animationStyle,
  linearGradientPositions,
  createChildrensWithStyles,
};
