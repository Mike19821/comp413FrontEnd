// This is the main page to display and navigate all components of the APP.

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './pages/loginPage';
import RegistrationPage from './pages/registrationPage';
import MainPage from './pages/mainPage';
import CameraPageScreen from './pages/cameraPage';
import BrowseTBPsScreen from './pages/allTBPsPage';
import PatientAssignment from './pages/mailPage';
import UserInfoPage from './pages/profile';
import DoctorAssignmentForm from './pages/docMail';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    // Set the navigations.
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="SignUp" component={RegistrationPage} />
      <Stack.Screen name="BrowseTBPs" component={BrowseTBPsScreen} />
      <Stack.Screen name="CameraPage" component={CameraPageScreen} />
      <Stack.Screen name="MailPage" component={PatientAssignment} />
      <Stack.Screen name="ProfilePage" component={UserInfoPage} />
      <Stack.Screen name="DocPage" component={DoctorAssignmentForm} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

// Style of the page.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
