import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { COLORS, SIZES, icons } from '../../../constants';
import { Drawer } from 'expo-router/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { ScreenHeaderBtn } from '../../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray3,
  },
  textInputStyle: {
    height: 40,
    width: '80%',
    backgroundColor: COLORS.white2,
    borderRadius: 20,
    paddingStart: SIZES.xLarge,
    paddingEnd: SIZES.xLarge,
    margin: 10,
  },
  // showHideButton: {
  //   alignSelf: 'flex-start',
  //   paddingStart: SIZES.xLarge,
  // },
  btnContainer: {
    height: 40,
    width: '80%',
    backgroundColor: COLORS.red2,
    borderRadius: SIZES.small / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 15,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },
});

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  // const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleBackPress = () => {
    router.replace('security/login');
  };

  const handleResetPassword = () => {
    // Implement logic to send a oldPassword reset email
    Alert.alert('Not implemented yet!');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Drawer.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.red2 },
          headerShadowVisible: false,
          statusBarColor: COLORS.darkBlue,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={handleBackPress}
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
          headerTitle: '',
        }}
      />

      <Text style={{ fontSize: 24, marginBottom: 20 }}>Forgot Password</Text>

      <TextInput
        style={styles.textInputStyle}
        placeholder="Enter your email"
        onChangeText={(email) => setEmail(email)}
        defaultValue={email}
        keyboardType="email-address"
      />

      {/* <TextInput
        style={styles.textInputStyle}
        placeholder="Old password"
        onChangeText={(text) => setOldPassword(text)}
        value={oldPassword}
        secureTextEntry={!showPassword}
        autoCorrect={false}
      /> */}
      <TextInput
        style={styles.textInputStyle}
        placeholder="password"
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
        secureTextEntry={!showPassword}
        autoCorrect={false}
      />
      <TouchableOpacity
        style={styles.showHideButton}
        onPress={toggleShowPassword}
      >
        <Text>{showPassword ? 'Hide password' : 'Show password'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => handleResetPassword()}
      >
        <Text style={styles.btnText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleBackPress}>
        <Text style={{ color: 'blue', marginTop: 20 }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
