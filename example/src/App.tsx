import React, { useEffect, useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { SkeletonContainer } from 'react-native-dynamic-skeletons';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <SkeletonContainer isLoading={isLoading}>
        {[{ width: 100 }, { width: 200 }].map((style, index) => (
          <View
            style={[styles.box, { width: style.width }]}
            key={`box-${index}`}
          />
        ))}
      </SkeletonContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: 'red',
    marginVertical: 20,
  },
});
