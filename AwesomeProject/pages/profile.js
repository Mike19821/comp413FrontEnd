// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const UserInfoPage = () => {
//   // Mocked user data
//   const user = {
//     name: 'John Doe',
//     age: 30,
//     sex: 'Male',
//     currentHospital: 'General Hospital',
//     patientId: '123456789',
//     doctorId: '987654321',
//     password: 'password123' // In a real app, the password wouldn't be handled like this.
//   };

//   const [newPassword, setNewPassword] = useState('');
//   const [passwordUpdated, setPasswordUpdated] = useState(false);

//   // Function to call when updating password, here you should add your logic to update the password securely
//   const updatePassword = () => {
//     console.log('Password updated to:', newPassword);
//     // Reset input
//     setNewPassword('');
//     setPasswordUpdated(true);
//     // You should replace the above logic with the actual password update process.
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>User Information</Text>
//       <Text>Name: {user.name}</Text>
//       <Text>Age: {user.age}</Text>
//       <Text>Sex: {user.sex}</Text>
//       <Text>Current Hospital: {user.currentHospital}</Text>
//       <Text>Patient ID: {user.patientId}</Text>
//       <Text>Doctor ID: {user.doctorId}</Text>
//       <Text>Password: {'*'.repeat(user.password.length)}</Text>
      
//       <Text style={styles.subHeader}>Update Password</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={setNewPassword}
//         value={newPassword}
//         placeholder="Enter new password"
//         secureTextEntry={true}
//       />
//       <Button title="Update Password" onPress={updatePassword} />
//       {passwordUpdated && <Text>Password successfully updated!</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   subHeader: {
//     fontSize: 20,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     width: '100%',
//   },
// });

// export default UserInfoPage;

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UserInfoPage = ({route, navigation}) => {

  const username = route.params.username;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/patientInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patientID: username
          }),
        });
        if (!response.ok) {
          throw new Error('Profile fetch failed');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [username]); 
  // Mocked user data

  const [newPassword, setNewPassword] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  // Function to call when updating password, here you should add your logic to update the password securely
  const updatePassword = () => {
    console.log('Password updated to:', newPassword);
    // Reset input
    setNewPassword('');
    setPasswordUpdated(true);
    // You should replace the above logic with the actual password update process.
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
        <Text style={styles.infoText}>Doctor ID: {profile.doctorId}</Text>
        {/* <Text style={styles.infoText}>Password: {'*'.repeat(profile.password.length)}</Text> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#f5f5f5',
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

