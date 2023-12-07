import React, { useState } from 'react';
import { Stack, Link, router } from 'expo-router';
import CountryPicker from 'react-native-country-picker-modal';

import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SIZES, COLORS, icons } from '../../constants';
import { ScreenHeaderBtn } from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: SIZES.xxLarge,
  },
  textInputStyle: {
    height: 40,
    width: '95%',
    backgroundColor: COLORS.white2,
    borderRadius: 20,
    paddingStart: SIZES.xLarge,
    paddingEnd: SIZES.xLarge,
    margin: 10,
  },
  btnContainer: {
    height: 40,
    width: '95%',
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

const Registration = () => {
  const [countryCode, setCountryCode] = useState('UA');
  const [country, setCountry] = useState({
    cca2: 'UA',
    callingCode: ['380'],
  });
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(false);
  const [withEmoji, setWithEmoji] = useState(false);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(true);

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+' + country.callingCode[0]);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);

    country.callingCode[0] !== undefined
      ? setPhoneNumber(`+${country.callingCode[0]}`)
      : setPhoneNumber('');
  };

  const handleBackPress = () => {
    router.replace('../');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray3 }}>
      <Stack.Screen
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
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="100%" />
          ),
          headerTitle: '',
        }}
      />

      <View style={{ flex: 1 }}>
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
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Full Name"
            onChangeText={(fullName) => setFullName(fullName)}
            defaultValue={fullName}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Username"
            onChangeText={(username) => setUsername(username)}
            defaultValue={username}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
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
              }}
              visible={false}
              translation="common"
            />
            <TextInput
              style={{
                flex: 1, // Take up remaining space in the row
                marginLeft: 0, // Add some space between CountryPicker and TextInput
                height: 40, // Set the desired height
                borderRadius: 20,
                paddingHorizontal: SIZES.xLarge,
                backgroundColor: COLORS.white2,
                marginVertical: 10,
                // height: 40,
                // width: '95%',
                // backgroundColor: COLORS.white2,
                // borderRadius: 20,
                // paddingStart: SIZES.xLarge,
                // paddingEnd: SIZES.xLarge,
                // margin: 10,
              }}
              placeholder="Phone Number"
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              defaultValue={phoneNumber}
            />
          </View>

          <TextInput
            style={styles.textInputStyle}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            defaultValue={password}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Repeat Password"
            onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
            defaultValue={repeatPassword}
          />
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Registration;
