import React, { useState, useReducer } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '../../../styles/theme';
import GameWrapper from '../../../components/GameWrapper';
import { 
    WITHDRAW_SCREEN_BE_ATTENTIVE, 
    WITHDRAW_SCREEN_WITHDRAW_SUCCESSFUL,
    WITHDRAW_SCREEN_INPUT_AMOUNT
 } from '../../../store/constants';
import CustomAlert from '../../../components/CustomAlert';
import CustomPrompt from '../../../components/CustomPrompt';
import { getCommonSettings } from '../../../store/selectors';

import LendImage from "../../../assets/images/bankservices/lend.png";

export const LendScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Lend navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings } />
    )
};

const Lend = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const { cash } = commonSettings;
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: WITHDRAW_SCREEN_BE_ATTENTIVE
    });
    const [ prompt, setPrompt ] = useState({
        isVisible: false,
        data: WITHDRAW_SCREEN_INPUT_AMOUNT,
        value: ''
    });

    const showInputLendAmountPrompt = () => {
        console.log('123');
    }

    return (
        <>
            <CustomPrompt prompt={ prompt } setPrompt={ setPrompt }/>
            <CustomAlert alert={ alert } setAlert={ setAlert }/>
            <View style={ styles.container }>
                <View style={ styles.dataContainer }>
                    <Image style={ styles.image } resizeMode='center' source={ LendImage } />
                    <Text style={ styles.text }>Наличные средства { cash }$.</Text>
                    <Text style={ styles.text }>Договоримся об условииях.</Text>
                    <Text style={ styles.text }>Сколько дадите?</Text>
                </View>
            </View>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.lendButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Дать ссуду"
                    onPress={ () => showInputLendAmountPrompt() }    
                />
                <Button
                    buttonStyle={ styles.exitButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => navigation.navigate('BankScreen') }   
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
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
    },
    dataContainer: {
        flex: 1,
        marginTop: hp('5%'),
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1.5%')
    },
    image: {
        height: hp('25%'),
        width: hp('25%'),
        alignSelf: 'center',
        marginBottom: hp('5%')
    },
    buttonsContainer: {
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('1%')
    },
    lendButton: {
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
})