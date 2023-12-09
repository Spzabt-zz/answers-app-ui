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
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBackPress = () => {
    router.replace('../');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
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

      <ScrollView style={{ flex: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              width: 200,
              height: 200,
              borderRadius: SIZES.small / 1.25,
              justifyContent: 'center',
              alignItems: 'center',
              // margin: 40,
            }}
          >
            <Image source={icons.moderator} style={styles.btnImg('70%')} />
            <Text
              style={{
                fontSize: 34,
                fontWeight: 'bold',
                color: COLORS.red2,
                // paddingTop: 15,
              }}
            >
              ОТВЕТЫ
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: COLORS.red2,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
