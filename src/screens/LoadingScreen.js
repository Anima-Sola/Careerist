import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from 'expo-app-loading';
import { Text, View, StyleSheet } from 'react-native';
import { THEME } from '../styles/theme';
import { loadFonts } from '../styles/bootstrap';
import { loadAppSettings } from "../store/actions/actions";
import { loadGameSettings } from "../store/actions/actions";
import { getIsIntroShown } from "../store/selectors";
import { getIsGameStarted } from "../store/selectors";

export const LoadingScreen = ({ navigation }) => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( loadAppSettings() );
        dispatch( loadGameSettings() );
    })

    const isGameStarted = useSelector( getIsGameStarted );
    const isIntroShown = useSelector( getIsIntroShown );

    const navToIntro = () => {
        navigation.navigate('IntroScreen');
    }

    const navToGame = () => {
        navigation.navigate('MainScreenNavigation');
    }

    const navToGameSettings = () => {
        navigation.navigate('SetGameDifficultyScreen');
    }

    const navToApp = () => {
        setIsLoaded( true );
        if( isGameStarted ) setTimeout( navToGame, 2000 );
        if( isIntroShown ) setTimeout( navToGameSettings, 2000 );
        setTimeout( navToIntro, 2000 );
    }

    if (!isLoaded) {
        return (
            <AppLoading
                startAsync = { loadFonts }
                onFinish = { navToApp }
                onError = { err => console.log(err) }
            />
        )
    }

    return (
        <View style={ styles.container }>
            <Text style={ styles.header }>Digital sweets</Text>
            <Text style={ styles.header }>software</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        color: '#fff',
        fontFamily: 'nunito-extralightitalic',
        fontSize: THEME.FONT30,
        textAlign: 'center',
    }
});
