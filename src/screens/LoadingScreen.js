import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from 'expo-app-loading';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { THEME } from '../styles/theme';
import { loadFonts } from '../styles/bootstrap';
import { loadAppSettings } from "../store/actions/actions";
import { loadGameSettings } from "../store/actions/actions";
import { getIsGameStarted } from "../store/selectors";

export const LoadingScreen = ({ navigation }) => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( loadAppSettings() );
    }, [])

    const isGameStarted = useSelector( getIsGameStarted );

    const navToIntro = () => {
       navigation.navigate('IntroScreen');
    }

    const navToMainScreen = () => {
        dispatch( loadGameSettings() );
        setTimeout(() => navigation.navigate('GameMainScreen'), 2000); 
    }

    const startGame = () => {
        setIsLoaded( true );
        ( isGameStarted ) ? navToMainScreen() : setTimeout( navToIntro, 2000 );
    }

    if (!isLoaded) {
        return (
            <AppLoading
                startAsync = { loadFonts }
                onFinish = { startGame }
                onError = { err => console.log(err) }
            />
        )
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.indicator }>
                <MaterialIndicator color="white" size={ 40 }/>
                <Text style={ styles.header }>Загрузка...</Text>
            </View>
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
    indicator: {
        flex: 0.3
    },
    header: {
        color: '#fff',
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT40,
        textAlign: 'center',
    }
});
