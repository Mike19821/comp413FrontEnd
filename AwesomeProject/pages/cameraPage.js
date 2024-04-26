// This is the camera page where doctors or nurses can choose the
// side of pictures they want to take and will direct to the website
// with our AR guided camera to take TBP.
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, Image, Linking, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import Button from './Button.js';
import { Picker } from '@react-native-picker/picker';
import PoseEstimationView from './webview.js';

export default function ARimageTaken({route, navigation}) {
  const username = route.params.username;
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [selection, setSelection] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [userInput, setUserInput] = useState('');
  const cameraRef = useRef(null);

  const options = [
    { label: "back", value: "back" },
    { label: "front", value: "front" }
  ];

  useEffect(() => {
    (async () => {
      console.log("asfd");
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  url = "https://10.0.0.107:8080/cap.html"
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        let formData = new FormData();
        formData.append('file', {
          uri: image,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${day}/${month}`;

        formData.append('patientID', username);
        formData.append('date', formattedDate);
        formData.append('side', selection);

        let response = await fetch('http://10.0.0.107:5001/uploadImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
  
        let responseJson = await response.json();

        console.log(responseJson);

        if (response.ok) {
          alert('Picture uploaded! 🎉');
          setImage(null);
        } else {
          alert('Upload failed!');
        }
      } catch (error) {
        console.log(error);
        alert('An error occurred while uploading the picture.');
      }
    }
  };


  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your side</Text>  
      <TouchableOpacity
          style={styles.selectionBox}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectionText}>{selection || "Side"}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Enter the patient's ID</Text>
      <View style={{ width: '100%', alignItems: 'left', justifyContent: 'center' }}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter the patients' id"
          onChangeText={text => setUserInput(text)} 
        />
      </View>

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
              color="#000" textStyle={{ color: '#000' }} 
            />
            <Button title="Save" onPress={savePicture} icon="check" color="#000" textStyle={{ color: '#000' }} />
          </View>
        ) : (
          <Button title="Take a picture" onPress={handlePress} icon="camera" color="#000" textStyle={{ color: '#000' }} />
        )}
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
    </View>

    
  );
}

const styles = StyleSheet.create({

  selectionBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
  },
  selectionText: {
    fontSize: 16,
    color: '#0D0D0D',
    textShadowColor: '#0D0D0D',
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
    color: '#0D0D0D',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#B4B4B4",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#D4DEE6',
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    height: 400, 
    width: '100%', 
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 20, 
  },
  topControls: {
    flex: 1,
  },
    textInput: {
    height: 40,
    margin: 4,
    borderWidth: 1,
    padding: 10,
    width: '100%', 
    borderColor: '#000', 
    backgroundColor: '#D4DEE6' 
  },
});

