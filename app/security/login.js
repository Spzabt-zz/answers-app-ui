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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBackPress = () => {
    router.replace('../');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              placeholder="example@gmail.com"
              onChangeText={(newEmail) => setEmail(newEmail)}
              defaultValue={email}
              keyboardType={'email-address'}
              textContentType="emailAddress"
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
            <TouchableOpacity style={styles.btnContainer}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
