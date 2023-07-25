import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {
  SkeletonContainer,
  type GradientProps,
} from 'react-native-dynamic-skeletons';

const Gradient = (props: GradientProps) => <LinearGradient {...props} />;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, []);

  return (
    <View style={styles.container}>
      <SkeletonContainer
        isLoading={isLoading}
        animationType="leftRight"
        duration={1000}
        Gradient={Gradient}
      >
        {new Array(5).fill('').map((_, index) => (
          <View style={styles.box} key={index}>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            </Text>
          </View>
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
    width: '80%',
    height: 120,
    backgroundColor: 'red',
    marginVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
