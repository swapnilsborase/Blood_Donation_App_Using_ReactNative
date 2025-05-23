import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';

const FindHospitalScreen = ({ navigation }) => {
  const handleBookAppointment = () => {
    navigation.navigate('Appointments');
  };

  const handleCheckEligibility = () => {
    Linking.openURL('https://my.blood.co.uk/your-account/eligibility/check');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header styled like AppointmentScreen */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <Text style={styles.headerSubtitle}>
          Book, View & Manage your Appointments
        </Text>
      </View>

      {/* Action Cards */}
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={styles.card} onPress={handleBookAppointment}>
          <Text style={styles.cardText}>Book an Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleCheckEligibility}>
          <Text style={styles.cardText}>Check you can donate</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FindHospitalScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#FF3737',
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 70,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cardWrapper: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FF3737',
    width: '100%',
    paddingVertical: 28,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
