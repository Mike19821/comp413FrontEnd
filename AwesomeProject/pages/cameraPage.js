import React, { useState, useEffect, useRef } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import Button from './Button.js';

export default function ARimageTaken({route, navigation}) {
  const username = route.params.username;
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [selection, setSelection] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const options = [
    { label: "back", value: "back" },
    { label: "front", value: "front" }
  ];

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

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
        print(formattedDate);

        formData.append('patientID', username);
        formData.append('date', formattedDate);
        formData.append('side', selection);

        let response = await fetch('http://127.0.0.1:5000/uploadImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
  
        let responseJson = await response.json();

        console.log(responseJson); // Log the response from the server

        if (response.ok) {
          alert('Picture uploaded! 🎉');
          setImage(null); // Clear the image state if upload is successful
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
      <Text style={styles.title}>Take a new TBP</Text>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <TouchableOpacity
          style={styles.selectionBox}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectionText}>{selection || "Side"}</Text>
      </TouchableOpacity>

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
          <Button title="Take a picture" onPress={takePicture} icon="camera" color="#000" textStyle={{ color: '#000' }} />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#000',
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
  // camera: {
  //   flex: 5,
  //   borderRadius: 20,
  // },
  camera: {
    height: 400, // Set a fixed height
    width: '100%', // Set width to take up 100% of the container width
    borderRadius: 20,
    alignSelf: 'center', // This centers the camera view horizontally
    marginVertical: 20, // Adds some vertical space above and below the camera view
  },
  topControls: {
    flex: 1,
  },
});
