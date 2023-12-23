// import { Redirect } from 'expo-router';

// const App = () => {
//   return <Redirect href={'/(drawer)/home'} />;
// };

// export default App;

import React, { useContext } from 'react';
import { Redirect } from 'expo-router';
import { StyleSheet } from 'react-native';

import { SIZES } from '../constants';
import { AuthContext } from './(drawer)/context/AuthContext';
import { SplashScreen } from '../components';

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

const App = () => {
  const { userInfo, splashLoading, isJwtExpired, isUserLoggedIn } =
    useContext(AuthContext);

  return (
    <>
      {splashLoading ? (
        // <Redirect href={'screens/SplashScreen'} />
        <SplashScreen />
      ) : userInfo.jwt_token && !isJwtExpired && isUserLoggedIn ? (
        <Redirect href={'/(drawer)/chat'} />
      ) : (
        // <Slot router={} />
        <Redirect href={'/(drawer)/security'} />
      )}
    </>
  );
};

export default App;
