import React, { useState, useEffect } from 'react';
import { StatusBar, Platform, NativeModules } from 'react-native';
import AppLoading from 'expo-app-loading';
import { NativeBaseProvider } from 'native-base';
import { AppRootNavigation } from './src/navigation/AppRootNavigator';
import { bootstrap } from './src/styles/bootstrap';
import { THEME } from './src/styles/theme';

export default function App() {
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
      StatusBar.setBackgroundColor(THEME.MAIN_BACKGROUND_COLOR);
      //StatusBar.setHidden(true);
  })

  if (!isLoaded) {
    return (
      <AppLoading
        startAsync = { bootstrap }
        onFinish = { () => setIsLoaded(true) }
        onError = { err => console.log(err) }
      />
    )
  }

  return (
    <NativeBaseProvider>
        <AppRootNavigation />
    </NativeBaseProvider>
  )
}