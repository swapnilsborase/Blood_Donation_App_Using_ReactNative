import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const showStoredData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        console.log('📦 AsyncStorage Data:', result);
      } catch (e) {
        console.log('❌ Error fetching AsyncStorage data:', e);
      }
    };

    showStoredData();
  }, []);

  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /\S+@\S+\.\S+/;
    setEmailError(emailRegex.test(text) ? '' : 'Please enter a valid email');
  };

  const handleLogin = async () => {
    const storedEmail = await AsyncStorage.getItem('userEmail');
    const storedPassword = await AsyncStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
      // Remove old profile image on new login
      await AsyncStorage.removeItem('userProfileImage');

      Alert.alert('Login Successful!', `Welcome ${email}`, [
        {
          text: 'Continue',
          onPress: () => navigation.navigate('MainTabs'),
        },
      ]);
    } else {
      Alert.alert('Invalid Credentials', 'Please check your email and password.');
    }
  };

  const handleGoogleSignIn = () => {
    Linking.openURL('https://accounts.google.com/signin');
  };

  const handleFacebookSignIn = () => {
    Linking.openURL('https://www.facebook.com/login/');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="#555"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <View style={styles.iconBackground}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
              style={styles.socialIcon}
            />
          </View>
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookButton} onPress={handleFacebookSignIn}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png' }}
            style={styles.facebookIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.createAccountText}>Create an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#FF0000',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  passwordWrapper: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    paddingVertical: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#888',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
    flex: 1,
  },
  iconBackground: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8,
  },
  googleButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    padding: 12,
    borderRadius: 8,
  },
  facebookIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  createAccountText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#FF0000',
  },
});
