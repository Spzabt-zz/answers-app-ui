import { AuthProvider } from './(drawer)/context/AuthContext';

import * as React from 'react';
import { Drawer } from 'expo-router/drawer';

const Layout = () => {
  return (
    <AuthProvider>
      <Drawer
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="(drawer)"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
          }}
        />
      </Drawer>
      {/* <Slot /> */}
    </AuthProvider>
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
