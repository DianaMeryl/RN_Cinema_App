import { Pressable, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Platform } from 'react-native';

const GlowButton = ({ text, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    const scaleVal = scale.value;
  
    return {
      transform: [{ scale: scaleVal }],
      ...(Platform.OS === 'ios'
        ? {
            shadowColor: '#522d80',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: interpolate(scaleVal, [1, 1.1], [0.3, 0.7]),
            shadowRadius: interpolate(scaleVal, [1, 1.1], [0, 20]),
          }
        : {
            elevation: interpolate(scaleVal, [1, 1.1], [2, 10]),
          }),
    };
  });

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.1, { duration: 1000 }), -1, true);
  }, []);

  return (
    <Pressable
      onPress={onPress}
      className="items-center justify-center mt-4"
    >
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text className="text-white text-lg font-semibold text-center">
          {text}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default GlowButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#966fd6',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 50,
  },
});
