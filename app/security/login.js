import React from 'react';
import { Stack } from 'expo-router';
import { Text, SafeAreaView, View } from 'react-native';
import { COLORS, icons } from '../../constants';
import { ScreenHeaderBtn } from '../../components';

const Login = () => {
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

      <View>
        <Text>Login page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
