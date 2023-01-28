import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '../../../styles/theme';
import GameWrapper from '../../../components/GameWrapper';
import { getCommonSettings, getBankSettings } from '../../../store/selectors';
import { 
    WITHDRAW_SCREEN_BE_ATTENTIVE, 
    WITHDRAW_SCREEN_WITHDRAW_SUCCESSFUL,
    WITHDRAW_SCREEN_INPUT_AMOUNT
 } from '../../../store/constants';
 import { 
    setCashAmountAction, 
    setDepositAmountAction 
} from '../../../store/actions/actions';
 import CustomAlert from '../../../components/CustomAlert';
 import CustomPrompt from '../../../components/CustomPrompt';

import WithdrawImage from "../../../assets/images/bankservices/withdraw.png";

export const WithdrawScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Withdraw navigation={ navigation } commonSettings={ commonSettings } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings } />
    )
};

const Withdraw = ({ navigation, commonSettings }) => {
    const dispatch = useDispatch();
    const { cash } = commonSettings;
    const { depositAmount } = useSelector( getBankSettings );
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: WITHDRAW_SCREEN_BE_ATTENTIVE
    });
    const [ prompt, setPrompt ] = useState({
        isVisible: false,
        data: WITHDRAW_SCREEN_INPUT_AMOUNT,
        value: ''
    });

    const showBeAttentiveAlert = () => {
        setAlert({ 
            isVisible: true,
            data: WITHDRAW_SCREEN_BE_ATTENTIVE,
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                }
            ]
        })
    }

    const showWithdrawSuccesfulAlert = () => {
        setAlert({ 
            isVisible: true,
            data: WITHDRAW_SCREEN_WITHDRAW_SUCCESSFUL,
            buttonsCallbacks: [
                () => {
                    navigation.navigate('BankScreen', { previousScreen: 'AnyScreen' });
                }
            ]
        })
    }

    const showInputWithdrawAmountPrompt = () => {
        setPrompt({
            ...prompt, 
            isVisible: true,
            buttonsCallbacks: [
                ( amount ) => {
                    setPrompt({ ...prompt, isVisible: false, value: '' });
                    if( depositAmount < amount ) {
                        setTimeout( () => showBeAttentiveAlert(), 300 );
                        return;
                    }
                    dispatch(setDepositAmountAction( depositAmount - amount ));
                    dispatch(setCashAmountAction( cash + 0.95 * amount ), true);
                    setTimeout( () => showWithdrawSuccesfulAlert(), 300 );
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
                    <Image style={ styles.image } resizeMode='center' source={ WithdrawImage } />
                    <Text style={ styles.text }>Счет в банке { Math.floor( 0.5 + depositAmount ) }$.</Text>
                    <Text style={ styles.text }>Стоимость операции 5%.</Text>
                </View>
            </View>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.withdrawButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Снять деньги"
                    onPress={ () => showInputWithdrawAmountPrompt() }    
                />
                <Button
                    buttonStyle={ styles.exitButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => navigation.navigate('BankScreen', { previousScreen: 'AnyScreen' }) }   
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
        alignItems: 'center',
        justifyContent: 'center',
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
        height: hp('30%'),
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
    withdrawButton: {
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