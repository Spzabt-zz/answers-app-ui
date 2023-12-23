import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Redirect, router } from 'expo-router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const BASE_URL = 'https://answers-ccff058443b8.herokuapp.com/api/v1/auth';

  const [userInfo, setUserInfo] = useState({});
  const [isJwtExpired, setIsJwtExpired] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
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
        setIsUserLoggedIn(false);
        Alert.alert(
          'Activate your account! Please open the link we sent to your email.'
        );
        router.push('(drawer)/security/login');
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

    userInfo
      ? console.log(
          'Request Payload:',
          username,
          password,
          userInfo,
          typeof userInfo.jwt_token
        )
      : console.log(userInfo);

    axios
      .post(
        `${BASE_URL}/login`,
        {
          username,
          password,
        },
        {
          headers: {
            headers: userInfo
              ? { Authorization: 'Bearer ' + userInfo.jwt_token }
              : {},
          },
        }
      )
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        setIsJwtExpired(false);
        setIsUserLoggedIn(true);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        router.push('(drawer)/chat');
        // <Redirect href={'(drawe)/chat'} />;
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
          headers: { Authorization: `Bearer ${userInfo.jwt_token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsJwtExpired(true);
        setIsUserLoggedIn(false);
        setIsLoading(false);
        router.push('(drawer)/security/logreg');
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        console.log(e.response.data);
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
        // await axios
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
        //     if (userInfo) {
        //       Alert.alert('Your session expired, please sign in.');
        //       router.replace('/(drawer)/security/login');
        //     }
        //     console.error(error.response.data);
        //   });
        try {
          let isJwtExpiredResponse = await axios.get(
            'https://answers-ccff058443b8.herokuapp.com/api/v1/auth/check-token',
            {
              headers: {
                Authorization: 'Bearer ' + userInfo.jwt_token,
              },
            }
          );
          let isTokenExpired = isJwtExpiredResponse.data.is_jwt_token_expired;
          setIsJwtExpired(isTokenExpired);

          let isUserActivatedResponse = await axios.get(
            'https://answers-ccff058443b8.herokuapp.com/api/v1/auth/check-user-activation?user_id=' +
              userInfo.id,
            {
              headers: {
                Authorization: 'Bearer ' + userInfo.jwt_token,
              },
            }
          );
          let isUserActivated = isUserActivatedResponse.data.activation_status;

          if (isUserActivated) {
            setIsUserLoggedIn(true);
          } else {
            setIsUserLoggedIn(false);
          }

          console.log(isJwtExpiredResponse.data);
        } catch (error) {
          Alert.alert('Something went wrong. Check your internet connection!');
          console.error(error.response.data);
        }

        setUserInfo(userInfo);
        console.log('in isLoggedIn method, userInfo: ' + userInfo.jwt_token);
      }

      // await new Promise((r) => setTimeout(r, 5000));

      setSplashLoading(false);
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
        isJwtExpired,
        isUserLoggedIn,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
