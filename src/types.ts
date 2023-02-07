import type { ReactElement } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ANIMATION_OUTPUT } from './utils';

export interface SkeletonContainerProps extends SkeletonProps {
  children: ReactElement | ReactElement[];
  isLoading: boolean;
}

export interface SkeletonProps {
  colors?: string[];
  style?: StyleProp<ViewStyle>;
  animationType?: keyof typeof ANIMATION_OUTPUT;
  duration?: number;
}
