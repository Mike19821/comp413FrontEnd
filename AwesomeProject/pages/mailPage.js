// This page is the mail page for patients where they can see the
// announcement of transfer doctors. Patients will have the option to
// decide accept or reject the transfer request.

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const sendResponseToBackend = async (patientId, doctorId, response) => {
  console.log(`Sending response to backend: ${response}`);
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

// Style for mail page.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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