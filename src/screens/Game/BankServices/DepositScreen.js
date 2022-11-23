import React, { useState, useReducer } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import { THEME } from '../../../styles/theme';
import GameWrapper from '../../../components/GameWrapper';
import CustomPrompt from '../../../components/CustomPrompt';
import CustomAlert from '../../../components/CustomAlert';
import { getBankSettings, getCommonSettings } from '../../../store/selectors';
import {
    DEPOSIT_SCREEN_INPUT_AMOUNT,
    DEPOSIT_SCREEN_DEPOSIT_PLACED,
    DEPOSIT_SCREEN_NO_MONEY_CHEATING,
} from '../../../store/constants';

import {
    setCashAmountAction,
    setYearExpenseAction,
    setDepositAmountAction
} from '../../../store/actions/actions';
import { rndBetweenMinusOneAndOne } from '../../../components/Random';

import DepositImage from "../../../assets/images/bankservices/deposit.png";

export const DepositScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Deposit navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings } />
    )
};

const Deposit = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const { cash, currentSocialStatus, yearOutcome } = commonSettings;
    const { depositAmount } = useSelector( getBankSettings );
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: DEPOSIT_SCREEN_NO_MONEY_CHEATING
    });
    const [ prompt, setPrompt ] = useState({
        isVisible: false,
        data: DEPOSIT_SCREEN_INPUT_AMOUNT,
        value: ''
    });

    const setCashAmountMinusFine = ( fineAmount ) => {
        let updatedCash = cash - fineAmount;
        if( updatedCash < 0 ) {
            dispatch(setYearExpenseAction( yearOutcome - updatedCash ));
            updatedCash = 0;
        }
        dispatch(setCashAmountAction( updatedCash, true ));
        forceUpdate();
    }

    const getFineAmount = () => {
        const value = rndBetweenMinusOneAndOne();
        return 1500 + 50 * Math.floor( 10 * value );
    }

    const showCheatingAlert = ( fineAmount ) => {
        setAlert({ 
            isVisible: true, 
            data: { 
                ...DEPOSIT_SCREEN_NO_MONEY_CHEATING, 
                message: `За мошенничество штраф ${ fineAmount }$.\nУсвоили?` 
            },
            buttonsCallbacks: [
                () => {
                    setCashAmountMinusFine( fineAmount );
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showDepositPlacedAlert = () => {
        setAlert({ 
            isVisible: true,
            data: DEPOSIT_SCREEN_DEPOSIT_PLACED,
            buttonsCallbacks: [
                () => {
                    navigation.navigate('BankScreen');
                }
            ]
        })
    }

    const showInputDepositAmountPrompt = () => {
        setPrompt({
            ...prompt, 
            isVisible: true,
            buttonsCallbacks: [
                ( amount ) => {
                    setPrompt({ ...prompt, isVisible: false, value: '' });
                    if( cash < amount ) {
                        const fineAmount = getFineAmount();
                        setTimeout( () => showCheatingAlert( fineAmount ), 300 );
                        return;
                    }
                    dispatch(setCashAmountAction( cash - amount ));
                    dispatch(setDepositAmountAction( depositAmount + 0.95 * amount ), true );
                    forceUpdate();
                    setTimeout( () => showDepositPlacedAlert(), 300 );
                },
                () => setPrompt({ ...prompt, isVisible: false, value: '' })
            ]
        });
    }

    return (
        <>
            <CustomPrompt prompt={ prompt } setPrompt={ setPrompt }/>
            <CustomAlert alert={ alert } setAlert={ setAlert }/>
            <View style={ styles.container }>
                <View style={ styles.dataContainer }>
                    <Image style={ styles.image } resizeMode='center' source={ DepositImage } />
                    <Text style={ styles.text }>Наличные средства { cash }$</Text>
                    <Text style={ styles.text }>Гарантируем доход { 2 * currentSocialStatus }% в год.</Text>
                    <Text style={ styles.text }>Стоимость операции 5%.</Text>
                </View>
            </View>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.depositButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Сделать вклад"
                    onPress={ () => showInputDepositAmountPrompt() }    
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
    depositButton: {
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