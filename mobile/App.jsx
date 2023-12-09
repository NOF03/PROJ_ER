import React from 'react';

import { useColorScheme } from 'react-native';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import MainNavigator from './src/components/MainNavigator';

function App() {

  const MyDarkTheme = {
    ...DarkTheme,
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: '#44cc77',
      background: '#1e1e1e',
      text: '#ebf1f1',
      inactive: '#bec3c7',
      hardBackground: '#000',
      inverthard: '#fff'
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
      hardBackground: '#fff',
      inverthard: '#000'
    },
  };

  const navigationTheme = useColorScheme() === "dark" ? MyDarkTheme : MyDefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <MainNavigator />
    </NavigationContainer>
  );
}

export default App;
