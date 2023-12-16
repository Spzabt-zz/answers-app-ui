import React, { useContext, useState, useEffect } from 'react';
import { Stack, router } from 'expo-router';

import {
  ActivityIndicator,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { COLORS, SIZES, icons } from '../../constants';
import { ScreenHeaderBtn } from '../../components';
import { styles } from '../../components/common/header/screenheader.style';

const Chat = () => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  // console.log({ userInfo });
  const [username, setUsername] = useState('');

  const getUserInfo = () => {
    axios
      .get('https://answers-ccff058443b8.herokuapp.com/api/v1', {
        headers: {
          Authorization: 'Bearer ' + userInfo.jwt_token,
        },
      })
      .then((response) => {
        // Handle success
        setUsername(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error.response.data);
      });
  };

  useEffect(() => {
    console.log('in chat');
    getUserInfo();
  }, []);

  return (
    <View
      style={{ flex: 1, justifyContent: 'center', backgroundColor: '#06bcee' }}
    >
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
              handlePress={() => {
                router.replace('./logreg');
              }}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="100%" />
          ),
          headerTitle: '',
        }}
      />

      <Text>Username: {username}</Text>
    </View>
  );
};

export default Chat;
