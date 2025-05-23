import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import BloodInfoScreen from './screens/BloodDetailsScreen';
import FindHospitalScreen from './screens/FindHospitalScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import GuidenceScreen from './screens/GuidenceScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserProfileScreen from './screens/UserProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: 'https://img.icons8.com/ios-filled/50/home.png',
  Appointments: 'https://img.icons8.com/ios-filled/50/calendar--v1.png',
  Guidence: 'https://img.icons8.com/ios-filled/50/info.png',
  Profile: 'https://img.icons8.com/ios-filled/50/user.png',
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={{ uri: tabIcons[route.name] }}
            style={{
              width: 24,
              height: 24,
              tintColor: focused ? '#fff' : '#f5bdbd',
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: '#FF3737',
          borderTopColor: '#d20000',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#f5bdbd',
      })}
    >
      <Tab.Screen name="Home" component={FindHospitalScreen} />
      <Tab.Screen name="Appointments" component={AppointmentScreen} />
      <Tab.Screen name="Guidence" component={GuidenceScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // 🔍 Debug: Log AsyncStorage content on load
  useEffect(() => {
    const showAllStoredData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const entries = await AsyncStorage.multiGet(keys);
        console.log('📦 All AsyncStorage Data:', entries);
      } catch (error) {
        console.error('AsyncStorage read error:', error);
      }
    };
    showAllStoredData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="BloodDetails" component={BloodInfoScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
