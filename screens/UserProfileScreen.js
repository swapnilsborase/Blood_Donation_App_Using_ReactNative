import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const UserProfileScreen = () => {
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [dob, setDob] = useState('');
  const [location, setLocation] = useState('');
  const [weight, setWeight] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const name = await AsyncStorage.getItem('userFullName');
      const mail = await AsyncStorage.getItem('userEmail');
      const pass = await AsyncStorage.getItem('userPassword');
      const img = await AsyncStorage.getItem('userProfileImage');
      const bg = await AsyncStorage.getItem('userBloodGroup');
      const db = await AsyncStorage.getItem('userDOB');
      const loc = await AsyncStorage.getItem('userLocation');
      const wt = await AsyncStorage.getItem('userWeight');

      if (name) setFullName(name);
      if (mail) setEmail(mail);
      if (pass) setPassword(pass);
      if (img) setImageUri(img);
      if (bg) setBloodGroup(bg);
      if (db) setDob(db);
      if (loc) setLocation(loc);
      if (wt) setWeight(wt);
    };
    loadData();
  }, []);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Camera access is required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await AsyncStorage.setItem('userProfileImage', uri);
    }
  };

  const handleSave = async () => {
    await AsyncStorage.setItem('userFullName', fullName);
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userPassword', password);

    Alert.alert('Saved', 'Profile updated successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('MainTabs', { screen: 'Profile' }),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <Text style={styles.headerSubtitle}>View, Edit Profile & Image</Text>
      </View>

      <TouchableOpacity onPress={openCamera}>
        <View style={styles.imageWrapper}>
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : {
                    uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                  }
            }
            style={styles.profileImage}
          />
          <Text style={styles.cameraIcon}>📷</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.form}>
        <View style={styles.innerForm}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.inputFlex}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Blood Group</Text>
          <TextInput style={styles.input} value={bloodGroup} editable={false} />

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput style={styles.input} value={dob} editable={false} />

          <Text style={styles.label}>Location</Text>
          <TextInput style={styles.input} value={location} editable={false} />

          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput style={styles.input} value={weight} editable={false} />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 100,
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
  headerTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 30,
    alignItems: 'center',
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#FF3737',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    fontSize: 20,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  innerForm: {
    width: '90%',
    maxWidth: 400,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#FF0000',
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  inputFlex: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#FF3737',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
