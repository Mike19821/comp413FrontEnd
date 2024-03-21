import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BrowseTBPsScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [selection, setSelection] = useState('back');

  useEffect(() => {
    // const fetchPhotos = async () => {
    //   try {
    //     const response = await fetch('https://yourapi.domain.com/photos', {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
            
    //       }),
    //     });
    //     const data = await response.json();
    //     setPhotos(data.photos); 
    //   } catch (error) {
    //     console.error('Error fetching photos:', error);
    //   }
    // };

    // fetchPhotos();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <View style={styles.container}>
      <Text>List of TBPs</Text>
      <Picker
        selectedValue={selection}
        onValueChange={(itemValue, itemIndex) => setSelection(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Back" value="back" />
        <Picker.Item label="Front" value="front" />
        <Picker.Item label="Both" value="both" />
      </Picker>
      <FlatList
        data={photos}
        keyExtractor={item => item.id.toString()} // Assuming each photo has a unique 'id'
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }} // Assuming each photo has a 'url'
            style={styles.photo}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: 300, // Adjust size as needed
    height: 200, // Adjust size as needed
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: 150,
    marginVertical: 10,
  },
});

export default BrowseTBPsScreen;
