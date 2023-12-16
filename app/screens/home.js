import React, { useState, useContext } from 'react';
import { Stack, Redirect, Slot } from 'expo-router';
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { COLORS, icons, images, SIZES } from '../../constants';
import { ScreenHeaderBtn, LoginRegisterBtn } from '../../components';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from './SplashScreen';
import Chat from './chat';
import Logreg from './logreg';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { router } from 'expo-router';

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
  const { userInfo, splashLoading } = useContext(AuthContext);

  return (
    <>
      {splashLoading ? (
        // <Redirect href={'screens/SplashScreen'} />
        <SplashScreen />
      ) : userInfo.jwt_token ? (
        <Redirect href={'screens/chat'} />
      ) : (
        // <Slot router={} />
        <Redirect href={'screens/logreg'} />
      )}
    </>
  );

  // return (
  //   <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
  //     <Stack.Screen
  //       options={{
  //         headerStyle: { backgroundColor: COLORS.lightWhite },
  //         headerShadowVisible: false,
  //         statusBarColor: COLORS.darkBlue,
  //         headerLeft: () => (
  //           <ScreenHeaderBtn
  //             iconUrl={icons.moderator}
  //             dimension="60%"
  //             activeOpacity={1}
  //           />
  //         ),
  //         headerRight: () => (
  //           <ScreenHeaderBtn iconUrl={icons.menu} dimension="100%" />
  //         ),
  //         headerTitle: '',
  //       }}
  //     />

  //     <ScrollView>
  //       {splashLoading ? (
  //         <View
  //           style={{
  //             flex: 1,
  //             justifyContent: 'center',
  //             backgroundColor: '#06bcee',
  //           }}
  //         >
  //           <ActivityIndicator size="large" color="#ffffff" />
  //         </View>
  //       ) : userInfo.jwt_toen ? (
  //         <>
  //           <Text>Username:</Text>
  //         </>
  //       ) : (
  //         <>
  //           <Text style={styles.homeText}>
  //             НАШЕ ПРИЛОЖЕНИЕ ОТВЕТИТ НА ЛЮБОЙ ТВОЙ ВОПРОС
  //           </Text>

  //           <View style={styles.container}>
  //             <LoginRegisterBtn
  //               text="РЕГИСТРАЦИЯ"
  //               path="security/registration"
  //             />
  //             <LoginRegisterBtn text="АВТОРИЗАЦИЯ" path="security/login" />

  //             <Text style={styles.homeText}>
  //               Detailed information how everything works
  //             </Text>
  //           </View>
  //         </>
  //       )}
  //       {/* <LogReg /> */}
  //     </ScrollView>
  //   </SafeAreaView>
};

export default Home;

// import React, { useState, useContext } from 'react';
// import { Stack } from 'expo-router';
// import {
//   View,
//   ScrollView,
//   SafeAreaView,
//   Text,
//   StyleSheet,
//   Alert,
// } from 'react-native';

// import { COLORS, icons, images, SIZES } from '../../constants';
// import { ScreenHeaderBtn, LoginRegisterBtn } from '../../components';
// import { AuthContext } from '../context/AuthContext';
// import SplashScreen from './SplashScreen';
// import Chat from './chat';
// import LogReg from './LogReg';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';

// import { router } from 'expo-router';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     padding: SIZES.medium,
//   },
//   homeText: {
//     textAlign: 'center',
//     marginTop: '20%',
//     marginLeft: 15,
//     marginRight: 15,
//     fontSize: 34,
//     fontWeight: 'bold',
//   },
// });

// const Stack2 = createNativeStackNavigator();

// const Home = () => {
//   const { userInfo, splashLoading } = useContext(AuthContext);

//   return (
//     // <NavigationContainer>
//     <Stack2.Navigator>
//       {/* <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}> */}
//       {/* <Stack.Screen
//         options={{
//           headerStyle: { backgroundColor: COLORS.lightWhite },
//           headerShadowVisible: false,
//           statusBarColor: COLORS.darkBlue,
//           headerLeft: () => (
//             <ScreenHeaderBtn
//               iconUrl={icons.moderator}
//               dimension="60%"
//               activeOpacity={1}
//             />
//           ),
//           headerRight: () => (
//             <ScreenHeaderBtn iconUrl={icons.menu} dimension="100%" />
//           ),
//           headerTitle: '',
//         }}
//       /> */}

//       {/* <ScrollView> */}
//       {splashLoading ? (
//         <Stack2.Screen
//           name="Splash Screen"
//           component={SplashScreen}
//           options={{ headerShown: false }}
//         />
//       ) : userInfo.jwt_token ? (
//         <Stack2.Screen name="Chat" component={Chat} />
//       ) : (
//         <>
//           <Stack2.Screen name="LogReg" component={LogReg} />
//         </>
//       )}
//       {/* </ScrollView> */}
//       {/* </SafeAreaView> */}
//     </Stack2.Navigator>
//     // </NavigationContainer>
//   );
// };

// export default Home;
