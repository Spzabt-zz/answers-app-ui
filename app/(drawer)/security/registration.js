import React, { useState, useContext } from 'react';
import { Stack, Link, router } from 'expo-router';
import CountryPicker from 'react-native-country-picker-modal';
import axios, { HttpStatusCode } from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drawer } from 'expo-router/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SIZES, COLORS, icons } from '../../../constants';
import { ScreenHeaderBtn } from '../../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: SIZES.xxLarge,
  },
  showHideButton: {
    alignSelf: 'flex-start',
    paddingStart: SIZES.xLarge,
  },
  textInputStyle: {
    height: 40,
    width: '100%',
    backgroundColor: COLORS.white2,
    borderRadius: 20,
    paddingStart: SIZES.xLarge,
    paddingEnd: SIZES.xLarge,
    margin: 10,
  },
  btnContainer: {
    height: 40,
    width: '100%',
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
  link: {
    color: 'blue',
  },
});

const Registration = () => {
  const baseUrl = 'https://answers-ccff058443b8.herokuapp.com/api/v1/auth';
  const REGISTRATION = '/registration';

  const [countryCode, setCountryCode] = useState('UA');
  const [country, setCountry] = useState({
    cca2: 'UA',
    callingCode: ['380'],
    flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeBAMAAACs80HuAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABtQTFRFJoz/J43+Ior/NZTu8Pcc//8H/v4M//8L////WTbNKwAAAAFiS0dECIbelXoAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAoSURBVCjPY2AYwUAQC2BQwgIYjLEABhcsgCEUC2BIwwIYyrGAESIIAFnli3Xgo9d8AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEzLTEwLTA3VDEzOjE0OjU2KzAyOjAwsgYwawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0xMC0wN1QxMzoxNDo1NiswMjowMMNbiNcAAAAASUVORK5CYII=',
  });
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(false);
  const [withEmoji, setWithEmoji] = useState(false);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
  const [flag, setFlag] = useState(country.flag);

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+' + country.callingCode[0]);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const { isLoading, register } = useContext(AuthContext);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setFlag(country.flag);

    country.callingCode[0] !== undefined
      ? setPhoneNumber(`+${country.callingCode[0]}`)
      : setPhoneNumber('');

    setCountryPickerVisible(false);
  };

  const onClose = () => {
    setCountryPickerVisible(false);
  };

  const handleBackPress = () => {
    router.replace('security/logreg');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray3 }}>
      <Spinner visible={isLoading} />
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

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: COLORS.red2,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 34,
              fontWeight: 'bold',
              color: COLORS.white,
              paddingBottom: 5,
            }}
          >
            CREATE YOUR ACCOUNT
          </Text>
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="example@gmail.com"
            onChangeText={(newEmail) => setEmail(newEmail)}
            defaultValue={email}
            keyboardType={'email-address'}
            textContentType="emailAddress"
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Full Name"
            onChangeText={(fullName) => setFullName(fullName)}
            defaultValue={fullName}
            textContentType="name"
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Username"
            onChangeText={(username) => setUsername(username)}
            defaultValue={username}
            textContentType="nickname"
          />

          <View style={{ position: 'relative', marginVertical: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
              }}
            >
              <TextInput
                style={{
                  // flex: 1,
                  // marginLeft: 0,
                  height: 40,
                  width: '100%',
                  borderRadius: 20,
                  paddingHorizontal: SIZES.xxLarge,
                  backgroundColor: COLORS.white2,
                }}
                placeholder="Phone Number"
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                defaultValue={phoneNumber}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 10,
                  top: 13,
                  zIndex: 1,
                }}
                onPress={() => setCountryPickerVisible(true)}
              >
                <Image
                  style={{ height: 15, width: 20 }}
                  source={{
                    uri: flag,
                  }}
                />
              </TouchableOpacity>
            </View>

            {isCountryPickerVisible && (
              <CountryPicker
                {...{
                  countryCode,
                  withFilter,
                  withFlag,
                  withCountryNameButton,
                  withAlphaFilter,
                  withCallingCode,
                  withEmoji,
                  onSelect,
                  onClose,
                }}
                visible={isCountryPickerVisible}
                translation="common"
              />
            )}
          </View>

          <TextInput
            style={styles.textInputStyle}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Repeat Password"
            onChangeText={(text) => setRepeatPassword(text)}
            value={repeatPassword}
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
            onPress={() => {
              register(
                email,
                fullName,
                username,
                phoneNumber,
                password,
                repeatPassword
              );
            }}
          >
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('security/login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registration;
