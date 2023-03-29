import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCommonSettings } from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { getPrisonTerm } from '../../components/CommonFunctions';
import CustomAlert from '../../components/CustomAlert';
import { JAIL_SCREEN_GREED_GET_OUT_OF_JAIL } from '../../store/constants';
import Counter from '../../components/Counter';
import random from '../../components/Random';
import { 
    setCashAmountAction,
    setPosWithinYear,
    setPlayerAgeAction,
    setYearsPassedAction,
    setIsNewYearBegun
} from '../../store/actions/actions';
import { calcSubtotals, setInitialGameData } from '../../components/CommonFunctions';

import JailImage from "../../assets/images/jail.png";

export const JailScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Jail navigation={ navigation } commonSettings={ commonSettings } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};


const Jail = ({ navigation, commonSettings }) => {
    const dispatch = useDispatch();
    const { prisonTerm, endOfYear, gameDifficultyLevel, playerAge, yearsPassed, deathAge } = commonSettings;
    const [ alert, setAlert ] = useState({ isVisible: false, data: JAIL_SCREEN_GREED_GET_OUT_OF_JAIL });
    const [ isBtnDisabled, setIsBtnDisabled ] = useState( true );

    const showOutOfJailAlert = ( benefit) => {
        setAlert({
            isVisible: true,
            data: {
                ...JAIL_SCREEN_GREED_GET_OUT_OF_JAIL,
                message: `Вам выдали подъемные ${ Math.floor( benefit ) }$.\nПолучили урок?`
            },
            buttonsCallbacks: [
                () => {
                    dispatch(setCashAmountAction( benefit ));
                    dispatch(setPlayerAgeAction( playerAge + prisonTerm ));
                    dispatch(setYearsPassedAction( yearsPassed + prisonTerm ), true );
                    dispatch(setIsNewYearBegun( false, true ));
                    setInitialGameData();
                    navigation.navigate('GameMainScreen');
                }
            ]
        }) 
    }

    const getOutOfJail = () => {
        //Bug in original game - impossible to die in prison
        if( deathAge <= ( playerAge + prisonTerm ) ) {
            dispatch(setPlayerAgeAction( playerAge + prisonTerm ));
            dispatch(setYearsPassedAction( yearsPassed + prisonTerm ), true );
            dispatch(setIsNewYearBegun( false, true ));
            navigation.navigate('DeathScreen');
            return;
        }

        for( let i = 1; i <= prisonTerm ; i++ ) {
            dispatch(setPosWithinYear( 0 ));
            calcSubtotals( endOfYear );
        }
        
        const benefit = 1000 * gameDifficultyLevel * ( 1 + random() );
        showOutOfJailAlert( benefit );
    }

    return (
        <View style={ styles.wrapper }>  
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <ScrollView style={ styles.container }>
                <Image style={ styles.image } resizeMode='center' source={ JailImage } />
                <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Мотаем срок { getPrisonTerm( prisonTerm ) }:</Text>
                <Counter enableBtn = { () => setIsBtnDisabled( false ) } />
            </ScrollView>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button }
                    disabledStyle={{ backgroundColor: THEME.DISABLED_BUTTON_COLOR }} 
                    titleStyle={ styles.buttonTitle }
                    disabled={ isBtnDisabled }
                    type="outline" 
                    title="Продолжить"
                    onPress={ () => getOutOfJail() }  
                />
            </View>
        </View>
    )
}
    
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        marginBottom: hp('1%'),
        marginTop: hp('1%'),
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR
    },
    container: {
        flex: 1,
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: hp('4%')
    },
    image: {
        height: hp('35%'),
        width: hp('35%'),
        alignSelf: 'center',
        marginBottom: hp('4%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT35,
        textAlign: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '100%',
        marginBottom: hp('1%'),
    },
    button: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '96%',
        height: hp('7%'),
        borderRadius: wp('10%'),
        alignSelf: 'center'
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28,
    }
});