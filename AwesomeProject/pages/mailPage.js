import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MailboxScreen = () => {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');

  // Simulate fetching messages from a backend
  useEffect(() => {
    const fetchMessages = async () => {
      // Here you would fetch messages from your backend
      // For demonstration, we're using static data
      const fetchedMessages = [
        { id: '1', sender: 'User1', content: 'Hello!' },
        { id: '2', sender: 'User2', content: 'How are you?' },
      ];
      setMessages(fetchedMessages);
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
