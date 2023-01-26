import type { ReactElement } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface SkeletonContainerProps extends SkeletonProps {
  children: ReactElement | ReactElement[];
  isLoading: boolean;
}

export interface SkeletonProps {
  colors?: string[];
  style?: StyleProp<ViewStyle>;
}
