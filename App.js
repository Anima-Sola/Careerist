if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { AppRootNavigation } from './src/navigation/AppRootNavigator';
import store from './src/store';

export default function App() {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={ styles.container }>
                <AppRootNavigation />
            </GestureHandlerRootView>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
