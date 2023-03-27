import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch, useStore } from "react-redux";
import { loadFonts } from '../styles/bootstrap';
import { loadAppSettings } from "../store/actions/actions";
import { loadGameSettings } from "../store/actions/actions";

SplashScreen.preventAutoHideAsync();

export const LoadingScreen =({ navigation }) => {
    const store = useStore();
    const dispatch = useDispatch();
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await loadFonts();
                dispatch( loadAppSettings() );
                await new Promise(resolve => setTimeout(resolve, 3000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            const isNewYearBegun = store.getState().appSettingsReducer.isNewYearBegun;
            if( isNewYearBegun ) {
                dispatch( loadGameSettings() );
                navigation.navigate('GameMainScreen');
            } else {
                navigation.navigate('IntroScreen');
            }
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return ( <><View onLayout={onLayoutRootView} /></> );
}