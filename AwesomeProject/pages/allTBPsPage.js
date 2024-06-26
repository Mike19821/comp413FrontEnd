// This is the page to browse all TBP pictures. Users can choose the date
// and side of the picture and view their TBP.

import React, { useState } from 'react';
import { Modal, View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button, Platform, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BrowseTBPsScreen = ({route, navigation}) => {
  const username = route.params.username;
  const [photos, setPhotos] = useState([]);
  const [selection, setSelection] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userInput, setUserInput] = useState(''); 

  const options = [
    { label: "back", value: "back" },
    { label: "front", value: "front" },
    { label: "both", value: "both" },
  ];

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };



  const onPressButton = async() => {
    try {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const formattedDate = `${year}/${day}/${month}`;

      console.log(formattedDate);
      const response = await fetch('http://10.0.0.107:5001/getImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          side: selection,
          date: formattedDate,
          patientID: userInput,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Images fetch failed');
      }
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setPhotos(prevPhotos => [{ id: Date.now().toString(), url: imageUrl }]);

      
    } catch (error) {
      console.error('Images fetch failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
        <TouchableOpacity
          style={styles.selectionBox}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectionText}>{selection || "Side"}</Text>
        </TouchableOpacity>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
        <Button
          title="Search TBPs"
          onPress={onPressButton}
        />
      </View>

      <View style={{ width: '100%', alignItems: 'left', justifyContent: 'center' }}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter the patients' id"
          onChangeText={text => setUserInput(text)} 
        />
      </View>

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
    backgroundColor: '#D4DEE6',
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

  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '70%', 
    borderColor: '#000', 
    backgroundColor: '#D4DEE6'
  },
});

export default BrowseTBPsScreen;
