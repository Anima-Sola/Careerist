import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';
import { setPlayerAgeAction } from   '../../store/actions/actions';

export const InputAgeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [ isButtonDisabled, setIsButtonDisabled ] = useState( true );
    const [ age, setAge ] = useState( '' );
    const textInput = useRef( null );

    useEffect(() => {
        textInput.current.focus();
    });

    const filterData = ( text ) => {
        const result = text.replace( /\D/g, '' );
        ( result !== '' ) ? setIsButtonDisabled( false ) : setIsButtonDisabled( true );
        setAge( result );
    }

    const checkAgeAndNavToInputCashAmountScreen = () => {
        if( ( age < 18 ) || ( age > 60 ) ) {
            let msg = ( age < 18 ) ? 'Младенцам у нас делать нечего!!!' : 'В мумиях не нуждаемся!!!';
            Alert.alert(
                "О, нет...",
                msg,
                [
                    {
                        text: 'ОК',
                        onPress: () => {},
                        style: "cancel"
                    }
                ]
            );
            return;
        }
        dispatch(setPlayerAgeAction( age ));
        navigation.navigate('InputСashAmountScreen');
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.headerContainer }>
                <Text style={ styles.header }>Ваш возраст?</Text>
            </View>
            <View style={ styles.inputContainer }>
                <TextInput
                    ref={ textInput }
                    style={ styles.input } 
                    keyboardType='numeric'
                    maxLength={ 2 }
                    onChangeText={( text ) => filterData( text )}
                    value={ age }
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
                    onPress={ checkAgeAndNavToInputCashAmountScreen } 
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
    },
    inputContainer: {
        flex: 0.5,
        justifyContent: 'center',
        width: '40%'
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