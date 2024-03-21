import React, { useState } from 'react';
import { Modal, View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';

const BrowseTBPsScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [selection, setSelection] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const options = [
    { label: "Back", value: "back" },
    { label: "Front", value: "front" },
    { label: "Both", value: "both" },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectionBox}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectionText}>{selection || "Choose the side of patient"}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {options.map((option) => (
              <Button
                key={option.value}
                onPress={() => {
                  setSelection(option.label);
                  setModalVisible(!modalVisible);
                }}
                title={option.label}
              />
            ))}
          </View>
        </View>
      </Modal>

      <FlatList
        data={photos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
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
  selectionBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
  },
  selectionText: {
    fontSize: 16,
  },
  photo: {
    width: 300,
    height: 200,
    marginVertical: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default BrowseTBPsScreen;
