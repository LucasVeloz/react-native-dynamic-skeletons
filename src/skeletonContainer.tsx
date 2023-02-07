import React, { Children } from 'react';
import { Skeleton } from './skeleton';
import type { SkeletonContainerProps } from './types';

export const SkeletonContainer = ({
  children,
  isLoading,
  style,
  ...rest
}: SkeletonContainerProps) => {
  const styles = Children.map(children, (child) => {
    const innerStyle = child.props?.style;
    const defaultBackgroundColor = {
      backgroundColor: '#e1e1e1',
    };
    return {
      current: Array.isArray(style)
        ? [...innerStyle, defaultBackgroundColor, style]
        : [innerStyle, defaultBackgroundColor, style],
    };
  });

  return (
    <>
      {isLoading
        ? styles.map((itemStyle, index) => (
            <Skeleton
              style={itemStyle.current}
              key={`skeleton-${index}`}
              {...rest}
            />
          ))
        : children}
    </>
  );
};
