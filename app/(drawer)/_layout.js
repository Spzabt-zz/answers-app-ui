import { Stack } from 'expo-router';

const StackNavigator = () => (
  <Stack>
    <Stack.Screen name="screens/logreg" />
    <Stack.Screen name="security/login" />
    <Stack.Screen name="security/registration" />
  </Stack>
);

export default StackNavigator;
