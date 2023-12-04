import React from 'react';

import { useColorScheme } from 'react-native';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import { MyTabs } from './BottomNavigator';

function App() {

  const MyDarkTheme = {
    ...DarkTheme,
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: '#44cc77',
      background: '#1e1e1e',
      text: '#ebf1f1'
    },
  };
  const MyDefaultTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: '#309054',
      text: '#1e1e1e',
      inactive: '#bec3c7',
    },
  };

  const navigationTheme = useColorScheme() === "dark" ? MyDarkTheme : MyDefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;
