import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const BASE_URL = 'https://answers-ccff058443b8.herokuapp.com/api/v1/auth';

  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (
    email,
    fullName,
    username,
    phoneNumber,
    password,
    repeatPassword
  ) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/registration`, {
        email,
        fullName,
        username,
        phoneNumber,
        password,
        repeatPassword,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = async (username, password) => {
    setIsLoading(true);

    let userInfo = await AsyncStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);

    console.log(
      'Request Payload:',
      username,
      password,
      userInfo,
      typeof userInfo.jwt_token
    );

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
        router.replace('chat');
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

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.access_token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      //check if token expired
      if (userInfo) {
        await axios
          .get('https://answers-ccff058443b8.herokuapp.com/api/v1', {
            headers: {
              Authorization: 'Bearer ' + userInfo.jwt_token,
            },
          })
          .then((response) => {
            // Handle success
            console.log(response.data);
          })
          .catch((error) => {
            // Handle error
            if (userInfo) {
              Alert.alert('Your session expired, please sign in.');
              router.replace('/(drawer)/security/login');
            }
            console.error(error.response.data);
          });

        setUserInfo(userInfo);
      }

      await new Promise((r) => setTimeout(r, 5000));

      setSplashLoading(false);
      console.log('in isLoggedIn method, userInfo: ' + userInfo.jwt_token);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
