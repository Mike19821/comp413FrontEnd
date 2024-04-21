import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Placeholder for backend interaction
const assignPatientToDoctor = async (patientId, doctorId) => {
  // Simulate sending data to the backend
  console.log(`Assigning patient ${patientId} to doctor ${doctorId}`);
  // Replace this with actual API call
  return new Promise(resolve => setTimeout(() => resolve({ status: 'success', message: 'Patient assigned successfully' }), 1000));
};

const DoctorAssignmentForm = () => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!patientId || !doctorId) {
      Alert.alert('Error', 'Please enter both patient and doctor IDs.');
      return;
    }

    setLoading(true);
    try {
      const result = await assignPatientToDoctor(patientId, doctorId);
      if (result.status === 'success') {
        Alert.alert('Success', result.message);
        // Optionally reset the form here
        setPatientId('');
        setDoctorId('');
      } else {
        Alert.alert('Error', 'Failed to assign patient.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Assign Patient to New Doctor</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Patient ID"
        value={patientId}
        onChangeText={setPatientId}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter New Doctor ID"
        value={doctorId}
        onChangeText={setDoctorId}
        editable={!loading}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>Assign Patient</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D4DEE6',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DoctorAssignmentForm;
