// import React, { useState, useContext } from 'react';
// import { Stack, Redirect, Slot } from 'expo-router';
// import {
//   View,
//   ScrollView,
//   SafeAreaView,
//   Text,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';

// import { COLORS, icons, images, SIZES } from '../../../constants';
// import { ScreenHeaderBtn, LoginRegisterBtn } from '../../../components';
// import { AuthContext } from '../context/AuthContext';
// import SplashScreen from './SplashScreen';
// import Chat from './chat';
// import Logreg from './logreg';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

// const Home = () => {
//   const { userInfo, splashLoading } = useContext(AuthContext);

//   return (
//     <>
//       {splashLoading ? (
//         // <Redirect href={'screens/SplashScreen'} />
//         <SplashScreen />
//       ) : userInfo.jwt_token ? (
//         <Redirect href={'screens/chat'} />
//       ) : (
//         // <Slot router={} />
//         <Redirect href={'screens/logreg'} />
//       )}
//     </>
//   );
// };

// export default Home;
