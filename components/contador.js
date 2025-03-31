import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Text, PanResponder } from 'react-native';

function Contador() {
  const [count, setCount] = useState(0);
  const animationValue = useRef(new Animated.Value(1)).current;
  const touchTimer = useRef(null);
  const resetTimer = useRef(null);
  const touchStartTime = useRef(0);

  useEffect(() => {
    resetTimer.current = setTimeout(() => {
      setCount(0);
    }, 3000);

    return () => clearTimeout(resetTimer.current);
  }, [count]);

  const handleTouchStart = () => {
    clearTimeout(resetTimer.current);
    touchStartTime.current = Date.now();
    Animated.spring(animationValue, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();

    touchTimer.current = setTimeout(() => {
      if (Date.now() - touchStartTime.current >= 1000) {
        Animated.timing(animationValue, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setCount((prevCount) => prevCount + 1);
          Animated.spring(animationValue, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        });
      }
    }, 1000);
  };

  const handleTouchEnd = () => {
    clearTimeout(touchTimer.current);
    if (Date.now() - touchStartTime.current < 1000) {
      setCount((prevCount) => prevCount + 1);
      Animated.spring(animationValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: handleTouchStart,
      onPanResponderRelease: handleTouchEnd,
      onPanResponderTerminate: () => {
        clearTimeout(touchTimer.current);
        Animated.spring(animationValue, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const animatedStyle = {
    transform: [{ scale: animationValue }],
  };

  return (
    <Animated.View style={[styles.box, animatedStyle]} {...panResponder.panHandlers}>
      <Text style={styles.text}>{count}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Contador;