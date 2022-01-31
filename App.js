import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { AppRootNavigation } from './src/navigation/AppRootNavigator';
import { loadFonts } from './src/styles/bootstrap';
import { loadInitialState } from './src/store/reducers/loadInitialState';
import store from './src/store';

export default function App() {
    const [ isLoaded, setIsLoaded ] = useState(false);

    const loadState = async () => {
        try {
            await loadInitialState();
        } catch(e) {
            console.log('Something goes wrong');
        }
        () => setIsLoaded(true);
    }

    if (!isLoaded) {
        return (
            <AppLoading
                startAsync = { loadFonts }
                onFinish = { loadState }
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