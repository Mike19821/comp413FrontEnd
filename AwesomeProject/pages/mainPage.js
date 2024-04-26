// This is the main page that is loaded after user login. 
// Doctor & Nurse and Patients will have different pages with different
// functionality, where only doctors & nurses can take picture. Also, doctors 
// will have a mail page to send transfer doctor information to patients while
// Patients have a page to view this info and will have the chance to accept
// or reject.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');
const buttonSize = width / 2 - 50; 

const MainPage = ({ route, navigation }) => {
  const username = route.params.username;
  const startsWithP = username.toLowerCase().startsWith('p');
  const startsWithD = username.toLowerCase().startsWith('d');
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome, {username}!</Text>
      
      <Text style={styles.menuTitle}>Main Menu</Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={[styles.button, { width: buttonSize, height: buttonSize }]}
          onPress={() => navigation.navigate('BrowseTBPs', { username: username })}
        >
          <Image source={require('../images/button1.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>View TBP</Text>
        </TouchableOpacity>

        { <TouchableOpacity
          style={[styles.button, { width: buttonSize, height: buttonSize }]}
          onPress={() => navigation.navigate('CameraPage', { username: username })}
        >
          <Image source={require('../images/button2.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>New TBP</Text>
        </TouchableOpacity>
        }

        {startsWithP && <TouchableOpacity
          style={[styles.button, { width: buttonSize, height: buttonSize }]}
          onPress={() => navigation.navigate('MailPage')}
        >
          <Image source={require('../images/button3.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Mail Box</Text>
        </TouchableOpacity>
        }
        {!startsWithP && <TouchableOpacity
          style={[styles.button, { width: buttonSize, height: buttonSize }]}
          onPress={() => navigation.navigate('DocPage')}
        >
          <Image source={require('../images/button3.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Doc Box</Text>
        </TouchableOpacity>
        }

        <TouchableOpacity
          style={[styles.button, { width: buttonSize, height: buttonSize }]}
          onPress={() => navigation.navigate('ProfilePage', { username: username })}
        >
          <Image source={require('../images/button4.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton, { marginTop: 20 }]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    padding: 20,
    paddingTop: 40, 
    backgroundColor: '#D4DEE6',
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20, 
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 20, 
  },
  buttonGrid: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 20, 
  },

  button: {
    marginTop: 10,
    paddingVertical: 12, 
    paddingHorizontal: 25,
    borderRadius: 25, 
    borderWidth: 0, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, 
    width: 280, 
    alignItems: 'bottom', 
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', 
    paddingHorizontal: 10, 
  },
  buttonImage: {
    width: 150, 
    height: 120,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    width: 250, 
    height: 50, 
    alignItems: 'center',
  },
});

export default MainPage;