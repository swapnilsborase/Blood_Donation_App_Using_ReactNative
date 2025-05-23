import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Linking,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const AppointmentScreen = () => {
  const [pinCode, setPinCode] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  const [markerCoord, setMarkerCoord] = useState(null);

  const searchHospitalsByPin = async () => {
    if (pinCode.length !== 6) {
      Alert.alert('Invalid PIN', 'Please enter a valid 6-digit PIN code.');
      return;
    }

    setLoading(true);
    try {
      // Hospital data from RapidAPI
      const hospitalResponse = await fetch(
        `https://indian-hospitals.p.rapidapi.com/hospitals/pin/${pinCode}`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Host': 'indian-hospitals.p.rapidapi.com',
            'X-RapidAPI-Key': 'f0dbca479amsh4e5c4a71796f2c1p1982a7jsn09714abab4ca',
          },
        }
      );
      const hospitalData = await hospitalResponse.json();

      if (Array.isArray(hospitalData) && hospitalData.length > 0) {
        setHospitals(hospitalData);
      } else {
        setHospitals([]);
        Alert.alert('No hospitals found', 'Try a different pin code.');
      }

      // Geolocation from OpenCage
      const geoResponse = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${pinCode}&key=6238a801c0454ec890c7999f38203364`
      );
      const geoData = await geoResponse.json();

      if (geoData.results.length > 0) {
        const { lat, lng } = geoData.results[0].geometry;
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
        setMarkerCoord({ latitude: lat, longitude: lng });
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', 'Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewHospital = (name, city) => {
    const query = encodeURIComponent(`${name} ${city}`);
    Linking.openURL(`https://www.google.com/search?q=${query}`);
  };

  const handleBookAppointment = () => {
    Alert.alert('Success', 'Your appointment has been booked successfully!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find a Blood Donation Center</Text>
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <Text style={styles.searchLabel}>Enter a PIN code to find hospitals</Text>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter PIN code"
            value={pinCode}
            onChangeText={setPinCode}
            keyboardType="numeric"
            maxLength={6}
          />
          <TouchableOpacity style={styles.searchButton} onPress={searchHospitalsByPin}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapSection}>
        <MapView style={styles.map} region={region}>
          {markerCoord && <Marker coordinate={markerCoord} />}
        </MapView>
        <Text style={styles.mapLabel}>Hospital Location</Text>
      </View>

      {/* Hospital List */}
      <ScrollView contentContainerStyle={styles.hospitalList}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF3737" />
        ) : (
          hospitals.map((hospital, index) => (
            <View key={index} style={styles.hospitalCard}>
              <Text style={styles.hospitalName}>{hospital.name}</Text>
              <Text style={styles.hospitalAddress}>{hospital.address}</Text>
              <Text style={styles.hospitalCity}>
                {hospital.city}, {hospital.state}
              </Text>
              <Text style={styles.hospitalPhone}>
                Phone: {hospital.phone || 'N/A'}
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleViewHospital(hospital.name, hospital.city)}
                >
                  <Text style={styles.actionButtonText}>View Hospital</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleBookAppointment}
                >
                  <Text style={styles.actionButtonText}>Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#FF3737',
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  searchLabel: {
    color: '#FF0000',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: '#eee',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  searchButton: {
    backgroundColor: '#00ff65',
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  searchButtonText: {
    fontSize: 20,
  },
  mapSection: {
    marginTop: 20,
    alignItems: 'center',
    height: 250,
  },
  map: {
    width: '90%',
    height: '100%',
    borderRadius: 10,
  },
  mapLabel: {
    color: '#FF0000',
    fontSize: 18,
    marginTop: 5,
  },
  hospitalList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  hospitalCard: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 3,
  },
  hospitalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3737',
  },
  hospitalAddress: {
    fontSize: 16,
    color: '#444',
  },
  hospitalCity: {
    fontSize: 16,
    color: '#555',
  },
  hospitalPhone: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#FF3737',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
