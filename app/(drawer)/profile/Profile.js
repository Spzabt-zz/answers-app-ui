import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Drawer } from 'expo-router/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { SIZES, COLORS, icons } from '../../../constants';
import { ScreenHeaderBtn } from '../../../components';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const { userInfo, changePassword } = useContext(AuthContext);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = 'https://answers-ccff058443b8.herokuapp.com/api/v1/user';

  const handleChangePassword = () => {
    // Call the changePassword function with the old and new passwords
    //changePassword(userInfo.email, oldPassword, newPassword);

    // Optionally, you can clear the password fields after the change
    setOldPassword('');
    setNewPassword('');
    Alert.alert('Not implemented yet!');
  };

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      setIsLoading(true);

      const loadUserInfo = () => {
        axios
          .get(BASE_URL + '?user_id=' + userInfo.id, {
            headers: {
              Authorization: 'Bearer ' + userInfo.jwt_token,
            },
          })
          .then((res) => {
            let userInfo = res.data;

            setEmail(userInfo.email);
            setFullName(userInfo.fullName);
            setUsername(userInfo.username);
            setPhoneNumber(userInfo.phoneNumber);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(`register error ${error}`);
            setIsLoading(false);
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              const { data } = error.response;

              if (data && data.field_errors) {
                // Handle validation errors
                // You can display these errors to the user
                Alert.alert('Validation Error', data.field_errors.join('\n'));
              } else {
                // Handle other types of errors
                Alert.alert('Error', 'An error occurred during fetching data.');
              }
            } else if (error.request) {
              // The request was made but no response was received
              Alert.alert(
                'Network Error',
                'No response received from the server.'
              );
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error', error.message);
            }
          });
      };
      loadUserInfo();
    }
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Drawer.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.red2 },
          headerShadowVisible: false,
          statusBarColor: COLORS.darkBlue,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.moderator}
              dimension="60%"
              activeOpacity={1}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
              handlePress={() =>
                navigation.dispatch(DrawerActions.toggleDrawer())
              }
              activeOpacity={0.7}
            />
          ),
          headerTitle: 'Profile',
        }}
      />

      <Text style={styles.header}>User Profile</Text>
      <Text>Email: {email}</Text>
      <Text>Name: {username}</Text>
      <Text>Fullname: {fullName}</Text>
      <Text>Phone number: {phoneNumber}</Text>
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
