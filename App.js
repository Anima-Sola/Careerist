import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { NativeBaseProvider } from 'native-base';
import { AppRootNavigation } from './src/navigation/AppRootNavigator';
import { bootstrap } from './src/styles/bootstrap';

export default function App() {
  StatusBar.setHidden(true);
  const [ isLoaded, setIsLoaded ] = useState(false);

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