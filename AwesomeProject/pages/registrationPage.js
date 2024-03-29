import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [hospital, setHospital] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async() => {
    // Here, you would typically validate the inputs and then make an API call to your backend to register the user
    console.log('Registration details', { username, email, password, confirmPassword });
    // After successful registration, navigate to login screen or elsewhere as needed
    try {
      const response = await fetch('https://yourapi.domain.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          role,
          hospitial,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const data = await response.json();
      console.log('Registration successful', data);
      navigation.navigate('LoginPage');
      
    } catch (error) {
      console.error('Registration error', error);
      // Handle registration error (e.g., show a message to the user)
    }
    
  };

  return (
    <ImageBackground 
    // source={require('../images/LOGO2.png')} 
    style={styles.backgroundImage}
    resizeMode="cover" // Cover the entire screen without stretching the image
  >
      <View style={styles.container}>
      <Image style={styles.image} source={require('../images/LOGO2.png')} />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />
      <TextInput
        style={styles.input}
        placeholder="Hospital"
        value={hospital}
        onChangeText={setHospital}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
    
    
  </ImageBackground>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Register</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Username"
    //     value={username}
    //     onChangeText={setUsername}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Email"
    //     keyboardType="email-address"
    //     value={email}
    //     onChangeText={setEmail}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Role"
    //     value={role}
    //     onChangeText={setRole}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Hospital"
    //     value={hospital}
    //     onChangeText={setHospital}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Password"
    //     secureTextEntry
    //     value={password}
    //     onChangeText={setPassword}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Confirm Password"
    //     secureTextEntry
    //     value={confirmPassword}
    //     onChangeText={setConfirmPassword}
    //   />
    //   <Button title="Register" onPress={handleRegister} />
    // </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Fill the screen
    width: '100%', // Ensure full width
    height: '100%', // Ensure full height
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EAF4F1',
  },
  image: {
    width: 250, // Set your desired width
    height: 250, // Set your desired height
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default RegistrationPage;
