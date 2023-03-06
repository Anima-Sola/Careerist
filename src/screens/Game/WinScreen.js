import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, BackHandler } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCommonSettings } from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { WIN_SCREEN_GREED_EXIT_GAME } from '../../store/constants';
import CustomAlert from '../../components/CustomAlert';
import { setIsNewYearBegun } from '../../store/actions/actions';

import FireworkImage from "../../assets/images/firework.png";

export const WinScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Win navigation={ navigation } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Win = ({ navigation }) => {
    const dispatch = useDispatch();
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: WIN_SCREEN_GREED_EXIT_GAME
    })

    const showExitGameAlert = () => {
        setAlert({
            ...alert,
            isVisible: true, 
            buttonsCallbacks: [
                () => {
                    dispatch(setIsNewYearBegun( false, true ));
                    BackHandler.exitApp();
                }
            ]
         });
    }

    return (
        <>
            <ScrollView style={ styles.container }>
                <CustomAlert alert={ alert } setAlert={ setAlert } />  
                <View style={ styles.dataContainer }>
                    <Image style={ styles.image } resizeMode='center' source={ FireworkImage } />
                    <Text style={{ ...styles.text, marginBottom: hp('4%'), fontFamily: 'nunito-semibold' }}>ПОЗДРАВЛЯЕМ!</Text>
                    <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Вы достигли невозможного!</Text>
                    <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Желаете еще раз попробовать свои силы?</Text>
                </View>
            </ScrollView>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.startNewGameButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Начать заново"
                    onPress={ () => navigation.navigate('IntroScreen') }  
                />
                <Button
                    buttonStyle={ styles.exitButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => showExitGameAlert() }   
                />
            </View>
        </>
    )
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: hp('2%')
    },
    dataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%'),
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
    },
    image: {
        height: hp('35%'),
        width: hp('35%'),
        alignSelf: 'center',
        marginBottom: hp('4%')
    },
    buttonsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('1%')
    },
    startNewGameButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        height: hp('7%'),
        borderRadius: wp('10%'),
        width: wp('46%'),
        marginRight: 5
    },  
    exitButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: wp('46%'),
        height: hp('7%'),
        borderRadius: wp('10%'),
        marginLeft: 5,
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28
    }
});