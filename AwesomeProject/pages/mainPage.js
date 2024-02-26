import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MainPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello Patient Name!</Text>
      
      <Text style={styles.menuTitle}>Menu</Text>

      <Button
        title="Browse TBPs"
        onPress={() => navigation.navigate('BrowseTBPs')}
      />
      
      <Button
        title="Take a new TBP"
        onPress={() => navigation.navigate('CameraPage')}
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
  },
  greeting: {
    marginBottom: 20,
    fontSize: 24,
  },
  menuTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  // Add more styles if you need
});

export default MainPage;
