// // BrowseTBPsScreen.js
// import React from 'react';
// import { View, Text } from 'react-native';

// const BrowseTBPsScreen = () => {
//   // This page would list all the TBPs
//   return (
//     <View>
//       <Text>List of TBPs</Text>
//       {/* Render your TBP images here */}
//     </View>
//   );
// };

// export default BrowseTBPsScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const BrowseTBPsScreen = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('photo API');
        const data = await response.json();
        setPhotos(data.photos); 
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <View style={styles.container}>
      <Text>List of TBPs</Text>
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
});

export default BrowseTBPsScreen;
