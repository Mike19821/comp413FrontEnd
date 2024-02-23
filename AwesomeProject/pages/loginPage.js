import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Here, you would typically make an API call to your backend to verify the user credentials
    console.log('Login credentials', { username, password });
    // If login is successful, you can navigate to another screen or perform other actions
    // navigation.navigate('YourNextScreenName');
    navigation.navigate('MainPage')
  };

  const handleSignUp = () => {
    // Here, you would typically make an API call to your backend to verify the user credentials
    console.log('Login credentials', { username, password });
    // If login is successful, you can navigate to another screen or perform other actions
    // navigation.navigate('YourNextScreenName');
    navigation.navigate('SignUp')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to APP</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  buttonContainer: {
    flexDirection: 'row', 
    paddingTop: 10,
  },
  buttonSpacer: {
    width: 10, 
  },
});

export default LoginPage;
