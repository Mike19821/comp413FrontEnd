import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MainPage = ({ route, navigation }) => {
  const username = route.params.username;
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello {username}!</Text>
      
      <Text style={styles.menuTitle}>Menu</Text>

      <Button
        title="Browse TBPs"
        onPress={() => navigation.navigate('BrowseTBPs', { username: username })}
      />
      
      <Button
        title="Take a new TBP"
        onPress={() => navigation.navigate('CameraPage', { username: username })}
      />
      <Button
        title="Mail Box"
        onPress={() => navigation.navigate('MailPage')}
      />
      <Button
        title="Profile"
        onPress={() => navigation.navigate('ProfilePage')}
      />

      <Button
        title="Log out"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#F0F8FF', // Light background color for better readability
    },
    greeting: {
      marginBottom: 20,
      fontSize: 24,
      fontWeight: 'bold', // Make the greeting stand out
      color: '#333', // Dark color for text for better contrast
    },
    menuTitle: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: '600', // Slightly bolder than normal text
      color: '#444', // Slightly lighter than the greeting for hierarchy
    },
    button: {
      marginTop: 10, // Add space between buttons
      backgroundColor: '#007AFF', // Button background color
      paddingVertical: 10, // Vertical padding for taller buttons
      paddingHorizontal: 20, // Horizontal padding for wider buttons
      borderRadius: 5, // Rounded corners for the buttons
      borderWidth: 1, // Button border
      borderColor: '#007AFF', // Border color that matches the background
    },
    buttonText: {
      color: '#FFFFFF', // Text color for buttons
      fontSize: 16, // Button text size
      fontWeight: 'bold', // Bold text for button labels
    },
    // If you're using TouchableOpacity for buttons, apply the button and buttonText styles
  });

export default MainPage;
