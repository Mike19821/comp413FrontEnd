import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Placeholder function simulating backend communication
const sendResponseToBackend = async (patientId, doctorId, response) => {
  console.log(`Sending response to backend: ${response}`);
  // Simulate a backend call
  return new Promise(resolve => setTimeout(() => resolve({ status: 'success', message: 'Response recorded' }), 1000));
};

const PatientAssignment = ({ patientId, doctorId }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleResponse = async (accept) => {
    setLoading(true);
    try {
      const result = await sendResponseToBackend(patientId, doctorId, accept ? 'accept' : 'reject');
      if (result.status === 'success') {
        setResponse(accept ? 'Accepted' : 'Rejected');
        Alert.alert("Response Recorded", result.message);
      } else {
        Alert.alert("Error", "Failed to record your response. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {response === null ? (
        <>
          <Text style={styles.message}>You have been assigned to Doctor ID: {doctorId}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => handleResponse(true)} disabled={loading}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleResponse(false)} disabled={loading}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.response}>{`You have ${response} the assignment.`}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#f5f5f5',
    backgroundColor: '#D4DEE6',
  },
  message: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  response: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PatientAssignment;


// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

// const MailboxScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [textInput, setTextInput] = useState('');

//   // Simulate fetching messages from a backend
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         // Specify the URL of your backend endpoint
//         const url = 'http://127.0.0.1:5000/messages';
//         const response = await fetch(url);

//         // Check if the request was successful
//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }

//         const fetchedMessages = await response.json();

//         setMessages(fetchedMessages);
//       } catch (error) {
//         console.error('Failed to fetch messages:', error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   const sendMessage = () => {
//     // Here you would integrate with your backend to send the message
//     console.log('Sending message:', textInput);
//     // Clear input after sending
//     setTextInput('');
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.messageContainer}>
//       <Text style={styles.sender}>{item.sender}:</Text>
//       <Text style={styles.content}>{item.content}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Type your message here..."
//           value={textInput}
//           onChangeText={setTextInput}
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//   },
//   messageContainer: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#cccccc',
//   },
//   sender: {
//     fontWeight: 'bold',
//   },
//   content: {
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     padding: 10,
//     alignItems: 'center',
//   },
//   textInput: {
//     flex: 1,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     padding: 10,
//     borderRadius: 5,
//   },
// });

// export default MailboxScreen;
