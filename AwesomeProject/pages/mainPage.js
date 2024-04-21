import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

// Get screen width to calculate button size dynamically
const { width } = Dimensions.get('window');
const buttonSize = width / 2 - 50; // Adjust the 60 to account for padding/margins

const MainPage = ({ route, navigation }) => {
  const username = route.params.username;
  const startsWithP = username.toLowerCase().startsWith('p');
  const startsWithD = username.toLowerCase().startsWith('d');
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome, {username}!</Text>
      
      <Text style={styles.menuTitle}>Main Menu</Text>
      
      {/* Grid Layout for 2x2 buttons */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={[styles.button, { width: buttonSize, height: buttonSize }]}
          onPress={() => navigation.navigate('BrowseTBPs', { username: username })}
        >
          <Image source={require('../images/button1.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>View TBP</Text>
        </TouchableOpacity>

        {/* {!startsWithP &&  <TouchableOpacity */}
        { <TouchableOpacity
          style={[styles.button, { width: buttonSize, height: buttonSize }]}
          onPress={() => navigation.navigate('CameraPage', { username: username })}
        >
          <Image source={require('../images/button2.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>New TBP</Text>
        </TouchableOpacity>
        }

        {!startsWithD && <TouchableOpacity
          style={[styles.button, { width: buttonSize, height: buttonSize }]}
          onPress={() => navigation.navigate('MailPage')}
        >
          <Image source={require('../images/button3.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Mail Box</Text>
        </TouchableOpacity>
        }
{/* {!startsWithD && <TouchableOpacity */}
        {startsWithD && <TouchableOpacity
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

      {/* Logout Button */}
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
    justifyContent: 'flex-start', // Adjusted to flex-start to accommodate grid layout
    padding: 20,
    paddingTop: 40, // Increased padding top for better spacing from the top
    backgroundColor: '#D4DEE6',
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20, // Adjusted spacing
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 20, // Adjusted spacing
  },
  buttonGrid: {
    flexDirection: 'row', // Align buttons in a row
    flexWrap: 'wrap', // Allow wrapping
    justifyContent: 'space-between', // Space buttons evenly
    width: '100%', // Use the full width of the container
    marginBottom: 20, // Space before the logout button
  },
  // button: {
  //   backgroundColor: '#3498DB',
  //   alignItems: 'center',
  //   justifyContent: 'center', // Center content vertically and horizontally
  //   marginBottom: 20, // Space between rows
  // },
  button: {
    marginTop: 10,
    // backgroundColor: '#3498DB', // A lively, engaging blue
    paddingVertical: 12, // Slightly increased for better touch area
    paddingHorizontal: 25,
    borderRadius: 25, // More pronounced rounded corners
    borderWidth: 0, // Removed border for a cleaner look
    // shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Elevation for shadow on Android
    width: 280, // Fixed width for uniform button sizes
    alignItems: 'bottom', // Center text in button
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Ensure text is centered
    paddingHorizontal: 10, // Added to prevent text cutting off in small buttons
  },
  buttonImage: {
    width: 150, // Specify your image size
    height: 120, // Specify your image size
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    width: 250, // Standard width for logout button
    height: 50, // Standard height for logout button
    alignItems: 'center',
  },
});

export default MainPage;


// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const MainPage = ({ route, navigation }) => {
//   const username = route.params.username;
//   return (
//     <View style={styles.container}>
//       <Text style={styles.greeting}>Hello Patient Name!</Text>
      
//       <Text style={styles.menuTitle}>Menu</Text>

//       <Button
//         title="Browse TBPs"
//         onPress={() => navigation.navigate('BrowseTBPs', { username: username })}
//       />
      
//       <Button
//         title="Take a new TBP"
//         onPress={() => navigation.navigate('CameraPage', { username: username })}
//       />
//       <Button
//         title="Mail Box"
//         onPress={() => navigation.navigate('MailPage')}
//       />
//       <Button
//         title="Profile"
//         onPress={() => navigation.navigate('ProfilePage')}
//       />

//       <Button
//         title="Log out"
//         onPress={() => navigation.navigate('Login')}
//       />
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: 20,
//       backgroundColor: '#F0F8FF', // Light background color for better readability
//     },
//     greeting: {
//       marginBottom: 20,
//       fontSize: 24,
//       fontWeight: 'bold', // Make the greeting stand out
//       color: '#333', // Dark color for text for better contrast
//     },
//     menuTitle: {
//       fontSize: 20,
//       marginBottom: 10,
//       fontWeight: '600', // Slightly bolder than normal text
//       color: '#444', // Slightly lighter than the greeting for hierarchy
//     },
//     button: {
//       marginTop: 10, // Add space between buttons
//       backgroundColor: '#007AFF', // Button background color
//       paddingVertical: 10, // Vertical padding for taller buttons
//       paddingHorizontal: 20, // Horizontal padding for wider buttons
//       borderRadius: 5, // Rounded corners for the buttons
//       borderWidth: 1, // Button border
//       borderColor: '#007AFF', // Border color that matches the background
//     },
//     buttonText: {
//       color: '#FFFFFF', // Text color for buttons
//       fontSize: 16, // Button text size
//       fontWeight: 'bold', // Bold text for button labels
//     },
//     // If you're using TouchableOpacity for buttons, apply the button and buttonText styles
//   });

// export default MainPage;
