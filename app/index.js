import { AuthProvider } from './context/AuthContext';
import Home from './screens/home';

const Main = () => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
};

export default Main;
