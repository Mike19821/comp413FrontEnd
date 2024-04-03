import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    // Here, you would typically make an API call to your backend to verify the user credentials
    console.log('Login credentials', { username, password });
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
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
      // Here you can handle navigation or other actions after a successful login
      navigation.navigate('MainPage', { username: username });
    } catch (error) {
      console.error('Login error', error);
      // Handle login error (e.g., show a message to the user)
    }
  };

  const handleSignUp = () => {
    // Here, you would typically make an API call to your backend to verify the user credentials
    console.log('Login credentials', { username, password });
    // If login is successful, you can navigate to another screen or perform other actions
    // navigation.navigate('YourNextScreenName');
    navigation.navigate('SignUp')
  };

  return (
    <ImageBackground 
      // source={require('../images/background2.png')} 
      style={styles.backgroundImage}
      resizeMode="cover" // Cover the entire screen without stretching the image
    >
      <View style={styles.container}>
      {/* <Image style={styles.image} source={require('../heart.webp')} /> */}
      <Image style={styles.image} source={require('../images/LOGO2.png')} />
      {/* <Text style={styles.title}>Welcome to </Text> */}
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
      {/* <Button title="Login" onPress={handleLogin} />
      <Button title="SignUp" onPress={handleSignUp} /> */}
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        <View style={styles.buttonSpacer} />
        <Button title="SignUp" onPress={handleSignUp} />
      </View>
    </View>
      
    </ImageBackground>

    // <View style={styles.container}>
    //   <Image style={styles.image} source={require('../heart.webp')} />
    //   <Text style={styles.title}>Welcome to APP</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Username"
    //     value={username}
    //     onChangeText={setUsername}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Password"
    //     value={password}
    //     onChangeText={setPassword}
    //     secureTextEntry
    //   />
    //   {/* <Button title="Login" onPress={handleLogin} />
    //   <Button title="SignUp" onPress={handleSignUp} /> */}
    //   <View style={styles.buttonContainer}>
    //     <Button title="Login" onPress={handleLogin} />
    //     <View style={styles.buttonSpacer} />
    //     <Button title="SignUp" onPress={handleSignUp} />
    //   </View>
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
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 20,
  //   backgroundColor: '#F8F9F2',
  // },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300, // Set your desired width
    height: 300, // Set your desired height
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
