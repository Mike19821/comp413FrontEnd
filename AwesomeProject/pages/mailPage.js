import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MailboxScreen = () => {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');

  // Simulate fetching messages from a backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Specify the URL of your backend endpoint
        const url = 'http://127.0.0.1:5000/messages';
        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const fetchedMessages = await response.json();

        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = () => {
    // Here you would integrate with your backend to send the message
    console.log('Sending message:', textInput);
    // Clear input after sending
    setTextInput('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.sender}>{item.sender}:</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message here..."
          value={textInput}
          onChangeText={setTextInput}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  sender: {
    fontWeight: 'bold',
  },
  content: {
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default MailboxScreen;
