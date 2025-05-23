import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const HomeScreen = ({ navigation }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.9); // Shrink a little when pressed
  };

  const handlePressOut = () => {
    scale.value = withSpring(1); // Go back to normal
    navigation.navigate('Login'); // Navigate after pressing
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image3.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Blood Donor</Text>
      <Text style={styles.subtitle}>- Save a Life -</Text>

      {/* Animated Get Started Button */}
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={[styles.button, animatedStyle]}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  buttonText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
