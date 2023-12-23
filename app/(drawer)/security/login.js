import React, { useState, useContext } from 'react';
import { Link, Stack, router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
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

import { COLORS, SIZES, icons } from '../../../constants';
import { ScreenHeaderBtn } from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

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
  link: {
    color: 'blue',
  },
});

const Login = () => {
  const heightOfLoginContainer = 250;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleBackPress = () => {
    router.replace('security/logreg');
    //<Link href={'../screens/logreg'} />;
  };

  const BASE_URL = 'https://answers-ccff058443b8.herokuapp.com/api/v1/auth';

  // const [userInfo, setUserInfo] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const { isLoading, login } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => router.replace('security/registration')}
              >
                <Text style={styles.link}>Create an account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
