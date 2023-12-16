import React, { useState, useContext } from 'react';
import { Stack } from 'expo-router';
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import { COLORS, icons, images, SIZES } from '../../constants';
import { ScreenHeaderBtn, LoginRegisterBtn } from '../../components';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from './SplashScreen';
import Chat from './chat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: SIZES.medium,
  },
  homeText: {
    textAlign: 'center',
    marginTop: '20%',
    marginLeft: 15,
    marginRight: 15,
    fontSize: 34,
    fontWeight: 'bold',
  },
});

const Logreg = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
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
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="100%" />
          ),
          headerTitle: '',
        }}
      />

      <ScrollView>
        <Text style={styles.homeText}>
          НАШЕ ПРИЛОЖЕНИЕ ОТВЕТИТ НА ЛЮБОЙ ТВОЙ ВОПРОС
        </Text>

        <View style={styles.container}>
          <LoginRegisterBtn text="РЕГИСТРАЦИЯ" path="security/registration" />
          <LoginRegisterBtn text="АВТОРИЗАЦИЯ" path="security/login" />

          <Text style={styles.homeText}>
            Detailed information how everything works
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Logreg;
