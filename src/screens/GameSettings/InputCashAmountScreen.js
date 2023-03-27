import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';
import { setCashAmountAction } from   '../../store/actions/actions';
import { getCommonSettings } from '../../store/selectors';
import CustomAlert from '../../components/CustomAlert';
import { INPUT_CASH_AMOUNT_SCREEN_ALERT } from '../../store/constants';
import { setInitialGameData } from '../../components/CommonFunctions';
import random from '../../components/Random';

export const InputСashAmountScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { gameDifficultyLevel } = useSelector( getCommonSettings );
    const [ isButtonDisabled, setIsButtonDisabled ] = useState( true );
    const [ cashAmount, setCashAmount ] = useState( '' );
    const maxCashAmount = useRef( '' );
    const [ alert, setAlert ] = useState({ 
        isVisible: false, 
        data: INPUT_CASH_AMOUNT_SCREEN_ALERT,
        buttonsCallbacks: [
            () => {
                setAlert({ ...alert, isVisible: false });
                navToGame( maxCashAmount.current );
            }
        ]
    })
    
    const filterData = ( text ) => {
        const result = text.replace( /\D/g, '' );
        ( result !== '' ) ? setIsButtonDisabled( false ) : setIsButtonDisabled( true );
        setCashAmount( +result );
    }

    const navToGame = ( cash ) => {
        dispatch(setCashAmountAction( cash, true ));
        setInitialGameData();
        navigation.navigate('GameMainScreen');
    }

    const checkCashAmount = () => {
        let maxCash = 1500 * gameDifficultyLevel * ( 1 + random() );
        if( cashAmount > maxCash ) {
            maxCash = Math.floor( maxCash * 2 / 3 );
            setAlert({ ...alert, isVisible: true, data: { ...INPUT_CASH_AMOUNT_SCREEN_ALERT, message: 'По нашим данным у вас ' + maxCash + '$' }});
            maxCashAmount.current = maxCash;
            return;
        }
        navToGame( cashAmount );
    }

    return (
        <View style={ styles.container }>
            <StatusBar translucent backgroundColor="transparent" />
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <View style={ styles.headerContainer }>
                <Text style={ styles.header }>Стартовый капитал?</Text>
            </View>
            <View style={ styles.inputContainer }>
                <TextInput
                    style={ styles.input } 
                    keyboardType='numeric'
                    maxLength={ 12 }
                    autoFocus={ true }
                    onChangeText={( text ) => filterData( text )}
                    value={ cashAmount.toString() }
                />
            </View>
            <View style={ styles.nextButtonContainer }>
                <Button
                    buttonStyle={ styles.nextButton } 
                    titleStyle={ styles.nextButtonTitle }
                    disabledStyle={ styles.nextButtonDisabledStyle }
                    type="outline" 
                    title="Продолжить" 
                    disabled={ isButtonDisabled }
                    onPress={ checkCashAmount } 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR
    },
    headerContainer: {
        marginTop: THEME.STATUSBAR_HEIGHT
    },
    header: {
        color: '#fff',
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT40,
        textAlign: 'center',
        paddingTop: hp('1%')
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        color: '#fff',
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        paddingBottom: 5,
        borderColor: "#fff",
        borderStyle: "solid",
        borderBottomWidth: 3
    },
    nextButtonContainer: {
        justifyContent: 'center',
        width: '100%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: hp('1%')
    },
    nextButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '100%',
        height: hp('7%'),
        borderRadius: wp('10%')
    },
    nextButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28
    },
    nextButtonDisabledStyle: {
        backgroundColor: THEME.DISABLED_BUTTON_COLOR
    },
});