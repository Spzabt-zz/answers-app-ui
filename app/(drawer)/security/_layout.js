import { Stack } from 'expo-router';

const StackNavigator = () => (
  <Stack>
    <Stack.Screen name="logreg" />
    <Stack.Screen name="login" />
    <Stack.Screen name="registration" />
  </Stack>
);

export default StackNavigator;
