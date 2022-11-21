import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';
import { setPlayerAgeAction, setDeathAge } from   '../../store/actions/actions';
import CustomAlert from '../../components/CustomAlert';
import { INPUT_AGE_SCREEN_BABY_ALERT, INPUT_AGE_SCREEN_OLD_ALERT } from '../../store/constants';
import random from '../../components/Random';

export const InputAgeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [ isButtonDisabled, setIsButtonDisabled ] = useState( true );
    const [ age, setAge ] = useState( '' );
    const [ alert, setAlert ] = useState({ 
        isVisible: false, 
        data: INPUT_AGE_SCREEN_BABY_ALERT, 
        buttonsCallbacks: [ 
            () => setAlert({ ...alert, isVisible: false })
        ] 
    });

    const filterData = ( text ) => {
        const result = text.replace( /\D/g, '' );
        ( result !== '' ) ? setIsButtonDisabled( false ) : setIsButtonDisabled( true );
        setAge( result );
    }

    const checkAgeAndNavToInputCashAmountScreen = () => {
        if( ( age < 18 ) || ( age > 60 ) ) {
            ( age < 18 ) ? setAlert({ ...alert, isVisible: true }) 
                         : setAlert({ ...alert, isVisible: true, data: INPUT_AGE_SCREEN_OLD_ALERT });
            return;
        }
        const deathAge = 60 + 20 * random();
        dispatch(setDeathAge( deathAge ));
        dispatch(setPlayerAgeAction( age, true ));
        navigation.navigate('InputСashAmountScreen');
    }

    return (
        <View style={ styles.container }>
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <View style={ styles.headerContainer }>
                <Text style={ styles.header }>Ваш возраст?</Text>
            </View>
            <View style={ styles.inputContainer }>
                <TextInput
                    style={ styles.input } 
                    keyboardType='numeric'
                    autoFocus={ true }
                    maxLength={ 2 }
                    onChangeText={( text ) => filterData( text )}
                    value={ age }
                />
                <Text style={ styles.hint }>18 - 60</Text>
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
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        paddingLeft: '2%',
        paddingRight: '2%'
    },
    headerContainer: {
        flex: 0.1,
        justifyContent: 'center',
        width:'100%',
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
        flex: 0.8,
        justifyContent: 'center',
        width: '40%'
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
    hint: {
        textAlign: 'center',
        marginTop: 7,
        fontSize: THEME.FONT22,
        color: THEME.TEXT_COLOR
    },
    nextButtonContainer: {
        flex: 0.1,
        justifyContent: 'center',
        width: '100%',
    },
    nextButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '100%',
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    nextButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,
    },
    nextButtonDisabledStyle: {
        backgroundColor: THEME.DISABLED_BUTTON_COLOR,
    },
});