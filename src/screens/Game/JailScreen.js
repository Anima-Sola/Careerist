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
    const { year, prisonTerm, endOfYear, gameDifficultyLevel, playerAge, yearsPassed } = commonSettings;
    const [ alert, setAlert ] = useState({ isVisible: false, data: JAIL_SCREEN_GREED_GET_OUT_OF_JAIL })

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
                    dispatch(setPlayerAgeAction( playerAge + 1 + prisonTerm ));
                    dispatch(setYearsPassedAction( yearsPassed + 1 + prisonTerm ), true );
                    dispatch(setIsNewYearBegun( false, true ));
                    setInitialGameData();
                    navigation.navigate('GameMainScreen');
                }
            ]
        }) 
    }

    const getOutOfJail = () => {
        for( let i = 1; i <= prisonTerm ; i++ ) {
            dispatch(setPosWithinYear( 0 ));
            calcSubtotals( endOfYear );
        }
        
        const benefit = 1000 * gameDifficultyLevel * ( 1 + random() );
        showOutOfJailAlert( benefit );
    }

    return (
        <>  
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <ScrollView style={ styles.container }>
                <Image style={ styles.image } resizeMode='center' source={ JailImage } />
                <Text style={{ ...styles.text, marginBottom: hp('1%') }}>Год { year }</Text>
                <Text style={{ ...styles.text, marginBottom: hp('1%') }}>Мотаем срок { getPrisonTerm( prisonTerm ) }.</Text>
            </ScrollView>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Продолжить"
                    onPress={ () => getOutOfJail() }  
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
        marginTop: hp('4%')
    },
    image: {
        height: hp('25%'),
        width: hp('25%'),
        alignSelf: 'center',
        marginBottom: hp('4%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
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
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,
    }
});