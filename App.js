import React from 'react';
import { Provider } from 'react-redux';
import { AppRootNavigation } from './src/navigation/AppRootNavigator';
import store from './src/store';

export default function App() {
    return (
        <Provider store={store}>
            <AppRootNavigation />
        </Provider>
    )
}