import { Slot } from 'expo-router';
import { AuthProvider } from './(drawer)/context/AuthContext';
import { Drawer } from 'expo-router/drawer';

const Layout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default Layout;
