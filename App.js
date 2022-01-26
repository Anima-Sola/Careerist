import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { AppRootNavigation } from './src/navigation/AppRootNavigator';
import { bootstrap } from './src/styles/bootstrap';
import store from './src/store';

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
        <Provider store={store}>
            <AppRootNavigation />
        </Provider>
    )
}