// This is the profile page that displays the user User profile, showing
// their ID, hospital, doctor, name, age, and sex.
// User can also update their password in this page.

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UserInfoPage = ({route, navigation}) => {

  const username = route.params.username;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://10.0.0.107:5001/doctorInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            docID: username
          }),
        });
        if (!response.ok) {
          console.log(response);
          throw new Error('Profile fetch failed');
        }
        const data = await response.json();
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [username]); 

  const [newPassword, setNewPassword] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const updatePassword = () => {
    console.log('Password updated to:', newPassword);
    setNewPassword('');
    setPasswordUpdated(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Information</Text>
      <View style={styles.infoContainer}>
      <Text style={styles.infoText}>Name: {profile.Name}</Text>
        <Text style={styles.infoText}>Age: {profile.Age}</Text>
        <Text style={styles.infoText}>Sex: {profile.Sex}</Text>
        <Text style={styles.infoText}>Current Hospital: {profile.Hospital}</Text>
        <Text style={styles.infoText}>Patient ID: {profile.Pid}</Text>
        <Text style={styles.infoText}>Doctor ID: {profile.DoctorID}</Text>
      </View>
      
      <Text style={[styles.subHeader, {marginTop: 20}]}>Update Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="New password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={updatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
      {passwordUpdated && <Text style={styles.successMessage}>Password successfully updated!</Text>}
    </View>
  );
};

// Style for the Profile
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D4DEE6',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  button: {
    backgroundColor: '#4e9af1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  successMessage: {
    color: '#28a745',
    fontSize: 16,
    marginTop: 10,
  },
});

export default UserInfoPage;

