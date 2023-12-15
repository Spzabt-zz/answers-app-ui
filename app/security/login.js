import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';

import { COLORS, SIZES, icons } from '../../constants';
import { ScreenHeaderBtn } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: SIZES.xxLarge,
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
  }),
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
});

const Login = () => {
  const heightOfLoginContainer = 250;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleBackPress = () => {
    router.replace('../');
  };

  const BASE_URL = 'https://answers-ccff058443b8.herokuapp.com/api/v1/auth';

  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username, password) => {
    // setIsLoading(true);

    let userInfo = await AsyncStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);

    console.log(
      'Request Payload:',
      username,
      password,
      userInfo,
      typeof userInfo.jwt_token
    );

    // axios
    //   .get('https://answers-ccff058443b8.herokuapp.com/api/v1', {
    //     headers: {
    //       Authorization: 'Bearer ' + userInfo.jwt_token,
    //     },
    //   })
    //   .then((response) => {
    //     // Handle success
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error(error.response.data);
    //   });
    axios
      .post(
        `${BASE_URL}/login`,
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.jwt_token,
          },
        }
      )
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`Login error: ${e.response.data}`);

        console.log('Login error:', e);

        // Log specific properties of the error object
        console.log('Error status:', e.response.status);
        console.log('Error data:', e.response.data);
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner visible={isLoading} />
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

      <ScrollView
        contentContainerStyle={{ flex: 1, backgroundColor: COLORS.red2 }}
      >
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: COLORS.gray3,
            borderBottomRightRadius: 10, // Rounded top corners
            borderBottomLeftRadius: 10, // Rounded top corners
          }}
        >
          <View
            style={{
              width: 200,
              height: 200,
              borderRadius: SIZES.small / 1.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={icons.moderator} style={styles.btnImg('70%')} />
            <Text
              style={{
                fontSize: 34,
                fontWeight: 'bold',
                color: COLORS.red2,
              }}
            >
              ОТВЕТЫ
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.red2,
            borderTopRightRadius: 10, // Rounded top corners
            borderTopLeftRadius: 10, // Rounded top corners
            // position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              width: '100%',
              height: heightOfLoginContainer,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              // top: -10,
              marginBottom: heightOfLoginContainer / 2,
              // position: 'absolute',

              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: SIZES.medium,
            }}
          >
            <TextInput
              style={styles.textInputStyle}
              placeholder="Username"
              onChangeText={(username) => setUsername(username)}
              defaultValue={username}
              textContentType="nickname"
            />

            <TextInput
              style={styles.textInputStyle}
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
              defaultValue={password}
              textContentType="password"
              passwordRules="required: upper; required: lower; required: digit; minlength: 8;"
              secureTextEntry={true}
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                login(username, password);
              }}
            >
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
