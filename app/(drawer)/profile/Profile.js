import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { userInfo, changePassword } = useContext(AuthContext);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    // Call the changePassword function with the old and new passwords
    changePassword(userInfo.email, oldPassword, newPassword);

    // Optionally, you can clear the password fields after the change
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <Text>Email: {userInfo.email}</Text>
      <Text>Name: {userInfo.name}</Text>
      {/* Add more user information as needed */}

      <View style={styles.passwordChangeContainer}>
        <Text style={styles.subheader}>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  passwordChangeContainer: {
    marginTop: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
