import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './pages/loginPage';
import RegistrationPage from './pages/registrationPage';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>OK</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Home"
          component={LoginPage}
          options={{title: 'Welcome'}}
        /> */}
        <Stack.Screen
          name="registration"
          component={RegistrationPage}
          options={{title: 'registration'}}
        />
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
