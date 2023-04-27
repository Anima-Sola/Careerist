import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import * as NavigationBar from 'expo-navigation-bar';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import { setIsNewYearBegun } from '../../store/actions/actions';
import { playButtonClick, stopBackgroundTrack, playBackgroundTrack, playTushTrack } from '../../components/Sounds';

import Firework from "../../assets/images/firework.gif";

export const WinScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    useFocusEffect(() => {
        NavigationBar.setBackgroundColorAsync( '#000' );
        stopBackgroundTrack();
        setTimeout( () => playTushTrack(), 300 );
    })

    const startNewGame = () => {
        dispatch(setIsNewYearBegun( false, true ));
        playButtonClick();
        stopBackgroundTrack();
        setTimeout( () => playBackgroundTrack(), 300 );
        navigation.navigate('IntroScreen');
    }

    return (
        <ImageBackground style={ styles.wrapper } source={ Firework } resizeMode="cover">
            <View style={ styles.container }>
                <Text style={{ ...styles.text, marginBottom: hp('2%') }}>ВЫ ДОСТИГЛИ НЕВОЗМОЖНОГО!</Text>
                <Text style={ styles.text }>Поздравляем, теперь вы ПРЕЗИДЕНТ!</Text>
            </View>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Начать заново"
                    onPress={ () => startNewGame() }  
                />
            </View>
        </ImageBackground>
    )
}
    
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT35,
        textAlign: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '96%',
        marginBottom: hp('1%'),
        alignSelf: 'center'
    },
    button: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '100%',
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28,
    }
});