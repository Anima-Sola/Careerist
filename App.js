import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { AppRootNavigation } from './src/navigation/AppRootNavigator';
import store from './src/store';

//export default function App() {
const App = () => {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <GestureHandlerRootView style={ styles.container }>
                    <AppRootNavigation />
                </GestureHandlerRootView>
            </Provider>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default App;