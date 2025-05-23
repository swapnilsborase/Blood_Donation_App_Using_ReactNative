import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const BloodDetailsScreen = ({ route, navigation }) => {
  const { fullName, email, password } = route.params;

  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [weight, setWeight] = useState('');
  const [dob, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [age, setAge] = useState(null);

  const calculateAge = (selectedDate) => {
    const today = new Date();
    const birthDate = new Date(selectedDate);
    let years = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      years--;
    }
    return years;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDob(selectedDate);
      const calculatedAge = calculateAge(selectedDate);
      setAge(calculatedAge);
    }
  };

  const handleSubmit = async () => {
    if (!bloodGroup || !location || !weight || !dob) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    if (age < 18) {
      Alert.alert('Ineligible', 'You must be at least 18 years old to donate blood.');
      return;
    }

    const userData = {
      fullName,
      email,
      password,
      bloodGroup,
      location,
      weight,
      dob: dob.toISOString().split('T')[0],
      age,
    };

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      await fetch('https://blooddonationappsnackexpo-default-rtdb.firebaseio.com/users.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const message = `Name: ${fullName}\nEmail: ${email}\nBlood Group: ${bloodGroup}\nDOB: ${userData.dob}\nLocation: ${location}\nWeight: ${weight} kg`;

      Alert.alert('Details Saved!', message, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (err) {
      console.log('Error saving blood info:', err);
      Alert.alert('Error', 'Something went wrong while saving.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTextTop}>Enter additional details</Text>
        <Text style={styles.headerTextMain}>Blood Information</Text>
        <Text style={styles.headerSubText}>Provide the info below</Text>
      </View>

      <Text style={styles.label}>Blood Group</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. A+, O-, B+"
        value={bloodGroup}
        onChangeText={setBloodGroup}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{dob ? dob.toDateString() : 'Select your DOB'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob || new Date(2000, 0, 1)}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
      {age !== null && (
        <Text style={{ color: age >= 18 ? 'green' : 'red', marginBottom: 10 }}>
          Age: {age} {age >= 18 ? '- Eligible to donate' : '- Not eligible'}
        </Text>
      )}

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Pune"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Weight (in kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 70"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BloodDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#FF3737',
    width: Dimensions.get('window').width,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 30,
  },
  headerTextTop: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
  },
  headerTextMain: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  headerSubText: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#FF0000',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: '#444',
    shadowColor: '#9A9A9A',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 4, height: 4 },
    elevation: 3,
  },
  button: {
    backgroundColor: '#FF1313',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
