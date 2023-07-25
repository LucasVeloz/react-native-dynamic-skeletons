import type { ReactElement } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ANIMATION_OUTPUT } from './utils';

export interface SkeletonContainerProps extends SkeletonProps {
  children: ReactElement | ReactElement[];
  /**
   *Make the skeleton visible or not
   **/
  isLoading: boolean;
}

export interface GradientProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  colors: string[];
  style: StyleProp<ViewStyle>;
}

export interface SkeletonProps {
  /**
   * Array of colors to be used in the gradient
   */
  colors?: string[];
  /**
   * Style of the gradient
   */
  style?: StyleProp<ViewStyle>;
  /**
    Type of animation to be used
   */
  animationType?: keyof typeof ANIMATION_OUTPUT;
  /**
   * Duration of the animation in milliseconds
   */
  duration?: number;
  /**
   * Gradient component to be used
   */
  Gradient: (props: GradientProps) => ReactElement;
}
