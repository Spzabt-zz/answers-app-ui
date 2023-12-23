import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { SIZES, COLORS, icons } from '../../../constants';
import { ScreenHeaderBtn } from '../../../components';

const AdminPanelScreen = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState([]);

  // Placeholder data
  const initialUserData = [
    {
      id: 1,
      email: 'user1@example.com',
      name: 'User 1',
      phoneNumber: '123-456-7890',
      registrationDate: '2022-01-01',
      lastLoginDate: '2022-01-10',
      online: true,
    },
    // Add more user data as needed
  ];

  useEffect(() => {
    // Fetch user data from your backend or storage
    setUserData(initialUserData);
  }, []);

  const handleResetPassword = (userId) => {
    // Implement password reset functionality here
    console.log(`Reset password for user with id ${userId}`);
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text>Email: {item.email}</Text>
      <Text>Name: {item.name}</Text>
      <Text>Phone: {item.phoneNumber}</Text>
      <Text>Registration Date: {item.registrationDate}</Text>
      <Text>Last Login Date: {item.lastLoginDate}</Text>
      <Text>{item.online ? 'Online' : 'Offline'}</Text>
      <TouchableOpacity onPress={() => handleResetPassword(item.id)}>
        <Text style={styles.resetPasswordButton}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
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
        keyExtractor={(item) => item.id.toString()}
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
