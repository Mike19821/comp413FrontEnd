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
import MailboxScreen from './pages/mailPage';
import UserInfoPage from './pages/profile';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Home"
    //       component={LoginPage}
    //       options={{title: 'Welcome'}}
    //     />
    //     <Stack.Screen
    //       name="registration"
    //       component={RegistrationPage}
    //       options={{title: 'registration'}}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="SignUp" component={RegistrationPage} />
      <Stack.Screen name="BrowseTBPs" component={BrowseTBPsScreen} />
      <Stack.Screen name="CameraPage" component={CameraPageScreen} />
      <Stack.Screen name="MailPage" component={MailboxScreen} />
      <Stack.Screen name="ProfilePage" component={UserInfoPage} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
