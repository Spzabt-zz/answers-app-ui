import { AuthContext } from './context/AuthContext';

import { useContext } from 'react';
import { Drawer } from 'expo-router/drawer';
import { Button, View } from 'react-native';
import {
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  const { userInfo, isJwtExpired, isUserLoggedIn, logout } =
    useContext(AuthContext);

  // <DrawerContentScrollView>
  /* {userInfo && !isJwtExpired && isUserLoggedIn && (
        <Button title="Logout" color="red" onPress={logout} />
      )} */

  /* </DrawerContentScrollView> */

  return (
    <DrawerContentScrollView {...props}>
      {userInfo && !isJwtExpired && isUserLoggedIn && (
        <View>
          <Button title="Logout" color="red" onPress={logout} />
        </View>
      )}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const Layout = () => {
  const { userInfo, isJwtExpired, isUserLoggedIn } = useContext(AuthContext);

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="security"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />

      {userInfo && !isJwtExpired && isUserLoggedIn ? (
        <Drawer.Screen
          name="chat"
          options={{
            drawerLabel: 'Chat',
            title: 'Chat',
          }}
        />
      ) : (
        <Drawer.Screen
          name="chat"
          options={{
            drawerItemStyle: { height: 0 },
          }}
        />
      )}

      {userInfo && !isJwtExpired && isUserLoggedIn ? (
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
          }}
        />
      ) : (
        <Drawer.Screen
          name="profile"
          options={{
            drawerItemStyle: { height: 0 },
          }}
        />
      )}

      {userInfo &&
      userInfo.role === 'ROLE_ADMIN' &&
      !isJwtExpired &&
      isUserLoggedIn ? (
        <Drawer.Screen
          name="admin"
          options={{
            drawerLabel: 'Admin panel',
            title: 'Admin panel',
          }}
        />
      ) : (
        <Drawer.Screen
          name="admin"
          options={{
            drawerItemStyle: { height: 0 },
          }}
        />
      )}
    </Drawer>
  );
};

export default Layout;

{
  /* <Drawer
        drawerType="front"
        initialRouteName="Profile"
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10 },
        }}
      >
        {DrawerItems.map((drawer) => (
          <Drawer
            key={drawer.name}
            name={drawer.name}
            options={{
              drawerIcon: ({ focused }) =>
                drawer.iconType === 'Material' ? (
                  <MaterialCommunityIcons
                    name={drawer.iconName}
                    size={24}
                    color={focused ? '#e91e63' : 'black'}
                  />
                ) : drawer.iconType === 'Feather' ? (
                  <Feather
                    name={drawer.iconName}
                    size={24}
                    color={focused ? '#e91e63' : 'black'}
                  />
                ) : (
                  <FontAwesome5
                    name={drawer.iconName}
                    size={24}
                    color={focused ? '#e91e63' : 'black'}
                  />
                ),
            }}
            component={
              drawer.name === 'Profile'
                ? ProfileScreen
                : drawer.name === 'Settings'
                ? AdminPanel
                : ReferScreen
            }
          />
        ))}
      </Drawer> */
}
