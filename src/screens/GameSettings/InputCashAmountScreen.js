import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';
import { setCashAmountAction } from   '../../store/actions/actions';
import { setIsGameStarted } from '../../store/actions/actions';
import { getGameDifficultyLevel } from '../../store/selectors';
import CustomAlert from '../../components/CustomAlert';

export const InputСashAmountScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const gameDifficultyLevel = useSelector( getGameDifficultyLevel );
    const [ isButtonDisabled, setIsButtonDisabled ] = useState( true );
    const [ alertVisible, setAlertVisible ] = useState( false );
    const [ cashAmount, setCashAmount ] = useState( '' );
    const textInput = useRef( null );

    useEffect(() => {
        textInput.current.focus();
    });

    const filterData = ( text ) => {
        const result = text.replace( /\D/g, '' );
        ( result !== '' ) ? setIsButtonDisabled( false ) : setIsButtonDisabled( true );
        setCashAmount( +result );
    }

    const navToGame = ( cash ) => {
        dispatch(setCashAmountAction( cash ));
        dispatch(setIsGameStarted( true ));
        navigation.navigate('GameMainScreen');
    }

    const checkCashAmount = () => {
        let maxCash = Math.round( 1500 * gameDifficultyLevel * ( 1 + Math.random() ));
        if( cashAmount > maxCash ) {
            maxCash = Math.round( maxCash * 2 / 3 );
            setAlertVisible( true );
            setCashAmount( maxCash );
            return;
        }
        navToGame( cashAmount );
    }

    return (
        <View style={ styles.container }>
            <CustomAlert 
                alertVisible={ alertVisible } 
                setAlertVisible={ setAlertVisible } 
                message={ 'По нашим данным у вас ' + cashAmount + '$'} 
                header={ 'Откуда?!' }
                iconName='cash-outline'
                iconBackgroundColor='red'
                iconColor='white'
                isOverlayPressable={ false }
                buttons = {[
                    {   
                        key: 0,
                        hint: 'Продолжить',
                        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
                        textColor: THEME.TEXT_COLOR,
                        onPressCallback: () => navToGame( cashAmount )
                    }
                ]}
            />
            <View style={ styles.headerContainer }>
                <Text style={ styles.header }>Сколько имеете наличными?</Text>
            </View>
            <View style={ styles.inputContainer }>
                <TextInput
                    ref={ textInput }
                    style={ styles.input } 
                    keyboardType='numeric'
                    maxLength={ 12 }
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        paddingTop: THEME.STATUSBAR_HEIGHT,
        paddingLeft: 20,
        paddingRight: 20
    },
    headerContainer: {
        flex: 0.25,
        justifyContent: 'flex-start',
        width:'100%',
    },
    header: {
        color: '#fff',
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT30,
        textAlign: 'center',
        paddingTop: 20,
        lineHeight: 35
    },
    inputContainer: {
        flex: 0.5,
        justifyContent: 'center',
        width: '80%'
    },
    input: {
        color: '#fff',
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT25,
        textAlign: 'center',
        paddingBottom: 5,
        borderColor: "#fff",
        borderStyle: "solid",
        borderBottomWidth: 3
    },
    nextButtonContainer: {
        flex: 0.25,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        width:'100%',
    },
    nextButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '100%',
        height: 50,
        borderRadius: 25,
    },
    nextButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT17,
    },
    nextButtonDisabledStyle: {
        backgroundColor: THEME.DISABLED_BUTTON_COLOR,
    },
});