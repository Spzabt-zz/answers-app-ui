import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const App = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <View style={styles.container}>
//       <Text>You clicked {count} times</Text>
//       <Button
//         onPress={() => setCount(count + 1)}
//         title="Click me!"
//       />
//     </View>
//   );
// };

const Home = () => {
  // let myState =
  //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit, used do eiusmod' +
  //     'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis' +
  //     'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' +
  //     'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu' +
  //     'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in' +
  //     'culpa qui officia deserunt mollit anim id est laborum.';

  let initialState =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, used do eiusmod' +
    'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis' +
    'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' +
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu' +
    'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in' +
    'culpa qui officia deserunt mollit anim id est laborum.';

  let newState = 'new state';

  const [myState, updateText] = useState(initialState);

  const handlePress = () => {
    updateText((prevState) => {
      console.log(prevState);
      return prevState === initialState ? newState : initialState;
    });
  };

  return (
    <View>
      <Text
        onPress={handlePress}
        // onPress={() => {
        //   prevState = myState;
        //   updateText(newState);
        //   newState = prevState;
        //   //newState = initialState;
        // }}
      >
        {myState}
      </Text>
    </View>
  );
};

export default Home;
