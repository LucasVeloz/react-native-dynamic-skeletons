# react-native-dynamic-skeletons

Simple way to implements skeleton/shimmer loader

## Installation

```sh
npm install react-native-dynamic-skeletons
```

## Usage

```tsx
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
      <SkeletonContainer
        isLoading={isLoading}
        style={{
          backgroundColor: '#e1e1e1',
        }}
        colors={['#e1e1e1', '#f5f5f5', '#e1e1e1']}
      >
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

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
