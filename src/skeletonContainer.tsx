import React, { Children } from 'react';
import { Skeleton } from './skeleton';
import type { SkeletonContainerProps } from './types';

export const SkeletonContainer = ({
  children,
  isLoading,
  colors,
  style,
}: SkeletonContainerProps) => {
  const styles = Children.map(children, (child) => {
    const innerStyle = child.props?.style;
    return {
      current: Array.isArray(style)
        ? [...innerStyle, style]
        : [innerStyle, style],
    };
  });

  return (
    <>
      {isLoading
        ? styles.map((itemStyle, index) => (
            <Skeleton
              style={itemStyle.current}
              key={`skeleton-${index}`}
              colors={colors}
            />
          ))
        : children}
    </>
  );
};
