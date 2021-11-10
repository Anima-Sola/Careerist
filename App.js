import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { AppRootNavigation } from './src/navigation/AppRootNavigator';
import { bootstrap } from './src/styles/bootstrap';

export default function App() {
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
    <AppRootNavigation />
  )
}