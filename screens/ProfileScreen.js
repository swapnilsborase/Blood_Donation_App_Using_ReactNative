import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handlePress = (title) => {
    switch (title) {
      case 'View Profile':
        navigation.navigate('UserProfile');
        break;
      case 'Contact Us':
        Linking.openURL('mailto:support@blooddonorapp.com');
        break;
      case 'Privacy Policy':
        Linking.openURL('https://www.nhsbt.nhs.uk/privacy/');
        break;
      case 'Terms & Condition':
        Linking.openURL('https://www.blood.co.uk/terms-and-conditions/');
        break;
      case 'Logout':
        Alert.alert('Logged Out', 'You have been logged out.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'), // 🚀 Just navigate back
          },
        ]);
        break;
      default:
        break;
    }
  };

  const menuItems = [
    'View Profile',
    'Contact Us',
    'Privacy Policy',
    'Terms & Condition',
    'Logout', // ✅ Added
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Details</Text>
        <Text style={styles.headerSubtitle}>View Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.cardText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#FF3737',
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    marginBottom: 40,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 18,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: '#fcfcfc',
    borderColor: '#FF3737',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
  },
  cardText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF3737',
  },
});
