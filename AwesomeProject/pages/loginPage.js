// This is the page where all users log in their account.
// Patients will have their account starts with P and doctors
// will have their account starts with D.

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    console.log('Login credentials', { username, password });
    try {
        const response = await fetch('http://10.0.0.107:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (!response.ok) {
        console.log(response);
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      console.log('Login successful', data);
      navigation.navigate('MainPage', { username: username });
    } catch (error) {
      console.error('Login error', error);
      navigation.navigate('MainPage', { username: username });
    }
  };

  const handleSignUp = () => {
    console.log('Login credentials', { username, password });
    navigation.navigate('SignUp')
  };

  return (
    <ImageBackground 
      style={styles.backgroundImage}
      resizeMode="cover" 
    >
      <View style={styles.container}>
      <Image style={styles.image} source={require('../images/LOGO2.png')} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        <View style={styles.buttonSpacer} />
        <Button title="SignUp" onPress={handleSignUp} />
      </View>
    </View>
      
    </ImageBackground>
  );
};

// Style for the login page
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, 
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EAF4F1',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300, 
    height: 300, 
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row', 
    paddingTop: 10,
  },
  buttonSpacer: {
    width: 10, 
  },
});

export default LoginPage;
