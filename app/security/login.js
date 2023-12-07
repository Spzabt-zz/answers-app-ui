// import React, { useState } from 'react';
// import { Stack, router } from 'expo-router';
// import {
//   Text,
//   SafeAreaView,
//   View,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import {
//   CountryButton,
//   CountryPicker,
// } from 'react-native-country-codes-picker';

// import { COLORS, SIZES, icons } from '../../constants';
// import { ScreenHeaderBtn } from '../../components';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     padding: SIZES.xxLarge,
//   },
// });

// const ListHeaderComponent = ({ countries, lang, onPress }) => {
//   return (
//     <View
//       style={{
//         paddingBottom: 20,
//       }}
//     >
//       <Text>Popular countries</Text>
//       {countries?.map((country, index) => {
//         return (
//           <CountryButton
//             key={index}
//             item={country}
//             name={country?.name?.[lang || 'en']}
//             onPress={() => onPress(country)}
//           />
//         );
//       })}
//     </View>
//   );
// };

// const Login = () => {
//   const [show, setShow] = useState(false);
//   const [countryCode, setCountryCode] = useState('');

//   const handleBackPress = () => {
//     router.replace('../');
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
//       <Stack.Screen
//         options={{
//           headerStyle: { backgroundColor: COLORS.red2 },
//           headerShadowVisible: false,
//           statusBarColor: COLORS.darkBlue,
//           headerLeft: () => (
//             <ScreenHeaderBtn
//               iconUrl={icons.left}
//               dimension="60%"
//               handlePress={handleBackPress}
//             />
//           ),
//           headerRight: () => (
//             <ScreenHeaderBtn iconUrl={icons.menu} dimension="100%" />
//           ),
//           headerTitle: '',
//         }}
//       />

//       <View style={styles.container}>
//         <TouchableOpacity
//           onPress={() => setShow(true)}
//           style={{
//             width: '80%',
//             height: 60,
//             backgroundColor: 'black',
//             padding: 10,
//           }}
//         >
//           <Text
//             style={{
//               color: 'white',
//               fontSize: 20,
//             }}
//           >
//             {countryCode}
//           </Text>
//         </TouchableOpacity>
//         <CountryPicker
//           show={show}
//           // when picker button press you will get the country object with dial code
//           pickerButtonOnPress={(item) => {
//             setCountryCode(item.dial_code);
//             setShow(false);
//           }}
//           ListHeaderComponent={ListHeaderComponent}
//           popularCountries={['en', 'ua', 'pl']}
//         />
//       </View>
//     </View>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { View, Text, StyleSheet, PixelRatio, Switch } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

const styles = StyleSheet.create({
  // ...
});

const Login = () => {
  const [countryCode, setCountryCode] = useState('FR');
  const [country, setCountry] = useState(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);
  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Country Picker !</Text>

      <Switch
        value={withCountryNameButton}
        onValueChange={setWithCountryNameButton}
      />

      <Switch title="With flag" value={withFlag} onValueChange={setWithFlag} />
      <Switch
        title="With emoji"
        value={withEmoji}
        onValueChange={setWithEmoji}
      />
      <Switch
        title="With filter"
        value={withFilter}
        onValueChange={setWithFilter}
      />
      <Switch
        title="With calling code"
        value={withCallingCode}
        onValueChange={setWithCallingCode}
      />
      <Switch
        title="With alpha filter code"
        value={withAlphaFilter}
        onValueChange={setWithAlphaFilter}
      />
      <CountryPicker
        {...{
          countryCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}
        visible={false}
        translation="common"
      />
      <Text style={styles.instructions}>Press on the flag to open modal</Text>
      {country !== null && (
        <Text style={styles.data}>{JSON.stringify(country, null, 2)}</Text>
      )}
    </View>
  );
};

export default Login;
