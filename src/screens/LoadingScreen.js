import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from 'expo-app-loading';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { THEME } from '../styles/theme';
import { loadFonts } from '../styles/bootstrap';
import { loadAppSettings } from "../store/actions/actions";
import { loadGameSettings } from "../store/actions/actions";
import { getIsGameStarted } from "../store/selectors";

export const LoadingScreen = ({ navigation }) => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAppSettings());
        dispatch(loadGameSettings()) ;
    })

    const isGameStarted = useSelector( getIsGameStarted );

    const navToIntro = () => {
        navigation.navigate('IntroScreen');
    }

    const navToGame = () => {
        Alert.alert(
            "Обнаружена не законченная игра!!!",
            "Желаете продолжить?",
            [
                {
                    text: "Продолжить",
                    onPress: () => navigation.navigate('MainScreenNavigation')
                },
                { 
                    text: "Начать заново", 
                    onPress: () => navigation.navigate('IntroScreen') 
                }
            ]
        );
        
    }

    const navToApp = () => {
        setIsLoaded( true );
        ( isGameStarted ) ? setTimeout( navToGame, 2000 ) : setTimeout( navToIntro, 2000 );
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
