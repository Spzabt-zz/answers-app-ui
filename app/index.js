import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { View, ScrollView, SafeAreaView, Text, StyleSheet } from 'react-native';

import { COLORS, icons, images, SIZES } from '../constants';
import { ScreenHeaderBtn, LoginRegisterBtn } from '../components';

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

const Home = () => {
  let initialState = 'НАШЕ ПРИЛОЖЕНИЕ ОТВЕТИТ НА ЛЮБОЙ ТВОЙ ВОПРОС';

  let newState = 'new state';

  const [myState, updateText] = useState(initialState);

  const handlePress = () => {
    updateText((prevState) => {
      return prevState === initialState ? newState : initialState;
    });
  };

  const registerPress = () => {
    console.log('Registration stuff');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.moderator} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="100%" />
          ),
          headerTitle: '',
        }}
      />

      <ScrollView>
        <Text style={styles.homeText} onPress={handlePress}>
          {myState}
        </Text>

        <View style={styles.container}>
          <LoginRegisterBtn text="РЕГИСТРАЦИЯ" onPress={registerPress} />
          <LoginRegisterBtn text="АВТОРИЗАЦИЯ" />

          <Text style={styles.homeText}>
            Detailed information how everything works
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
