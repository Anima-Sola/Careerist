//Enter your start age
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { Button } from '@rneui/themed';
import { THEME } from '../../styles/theme';
import { setPlayerAgeAction, setDeathAge } from   '../../store/actions/actions';
import CustomAlert from '../../components/CustomAlert';
import { INPUT_AGE_SCREEN_BABY_ALERT, INPUT_AGE_SCREEN_OLD_ALERT } from '../../store/constants';
import random from '../../components/Random';
import { playButtonClick } from '../../components/Sounds';

import BackgroundImage from '../../assets/images/background/background.png';

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

    //Valid only digits
    const filterData = ( text ) => {
        const result = text.replace( /\D/g, '' );
        ( result !== '' ) ? setIsButtonDisabled( false ) : setIsButtonDisabled( true );
        setAge( result );
    }

    //Check of yu yanger then 18 and older then 60
    const checkAgeAndNavToInputCashAmountScreen = () => {
        playButtonClick();
        if( ( age < 18 ) || ( age > 60 ) ) {
            ( age < 18 ) ? setAlert({ ...alert, isVisible: true }) 
                         : setAlert({ ...alert, isVisible: true, data: INPUT_AGE_SCREEN_OLD_ALERT });
            return;
        }
        const deathAge = 60 + 20 * random();
        dispatch(setDeathAge( deathAge ));
        dispatch(setPlayerAgeAction( +age, true ));
        navigation.navigate('InputСashAmountScreen');
    }

    return (
        <ImageBackground style={ styles.background } source={ BackgroundImage } resizeMode='cover'>
            <View style={ styles.container }>
                <StatusBar translucent backgroundColor="transparent" />
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
                    <Text style={ styles.hint }>от 18 до 60 лет</Text>
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
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: wp('100%'),
        height: hp('120%'),
    },
    container: {
        flex: 1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerContainer: {
        marginTop: THEME.STATUSBAR_HEIGHT
    },
    header: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_LIGHT,
        fontSize: THEME.FONT40,
        textAlign: 'center',
        paddingTop: hp('1%')
    },
    inputContainer: {
        width: '40%'
    },
    input: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_LIGHT,
        fontSize: THEME.FONT35,
        textAlign: 'center',
        paddingBottom: 5,
        borderColor: THEME.TEXT_COLOR,
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
        borderRadius: wp('10%'),
    },
    nextButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28,
    },
    nextButtonDisabledStyle: {
        backgroundColor: THEME.DISABLED_BUTTON_COLOR,
    },
});