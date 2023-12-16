import { Stack, Slot } from 'expo-router';
import { AuthProvider } from './context/AuthContext';

const Layout = () => {
  return (
    <AuthProvider>
      <Stack />
      {/* <Slot /> */}
    </AuthProvider>
  );
};

export default Layout;
