import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { SIZES, COLORS, icons } from '../../../constants';
import { ScreenHeaderBtn } from '../../../components';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const AdminPanelScreen = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = 'https://answers-ccff058443b8.herokuapp.com/api/v1/users';

  // Placeholder data
  const initialUserData = [
    {
      id: 1,
      email: 'user1@example.com',
      name: 'User 1',
      phoneNumber: '123-456-7890',
      registrationDate: '2022-01-01',
      lastLoginDate: '2022-01-10',
      online: false,
    },
    // Add more user data as needed
  ];

  const fetchUsers = () => {
    setIsLoading(true);

    axios
      .get(BASE_URL, {
        headers: {
          Authorization: 'Bearer ' + userInfo.jwt_token,
        },
      })
      .then((res) => {
        let userData = res.data;

        setUserData(userData.users);
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
          Alert.alert('Network Error', 'No response received from the server.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
      });
  };

  useEffect(() => {
    // Fetch user data from your backend or storage
    //setUserData(initialUserData);
    if (
      userInfo &&
      Object.keys(userInfo).length !== 0 &&
      userInfo.role === 'ROLE_ADMIN'
    ) {
      fetchUsers();
    }
  }, [userInfo]);

  const handleResetPassword = (userId) => {
    // Implement password reset functionality here
    console.log(`Reset password for user with id ${userId}`);
    Alert.alert('Not implemnted yet.');
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text>Email: {item.email}</Text>
      <Text>Name: {item.username}</Text>
      <Text>Fullname: {item.fullName}</Text>
      <Text>Phone: {item.phoneNumber}</Text>
      <Text>Registration Date: {item.createdAt}</Text>
      <Text>role: {item.role}</Text>
      {/* <Text>Last Login Date: {item.lastLoginDate}</Text> */}
      <Text>{item.online ? 'Online' : 'Offline'}</Text>
      <TouchableOpacity onPress={() => handleResetPassword(item.id)}>
        <Text style={styles.resetPasswordButton}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );

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
          headerTitle: 'Admin Panel',
        }}
      />

      <FlatList
        data={userData}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingBottom: 16,
  },
  resetPasswordButton: {
    color: 'blue',
    marginTop: 8,
  },
});

export default AdminPanelScreen;
