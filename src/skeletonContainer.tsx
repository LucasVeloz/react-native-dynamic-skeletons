import React from 'react';
import { Skeleton } from './skeleton';
import type { SkeletonContainerProps } from './types';
import { createChildrensWithStyles } from './utils';

export const SkeletonContainer = ({
  children,
  isLoading,
  style,
  ...rest
}: SkeletonContainerProps) => {
  const formattedStyles = createChildrensWithStyles(children, style);

  return (
    <>
      {isLoading
        ? formattedStyles.map((itemStyle, index) => (
            <Skeleton style={itemStyle} key={`skeleton-${index}`} {...rest} />
          ))
        : children}
    </>
  );
};
