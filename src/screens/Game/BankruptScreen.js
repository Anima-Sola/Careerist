import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { 
    getCommonSettings,
    getBankSettings
} from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import CustomPrompt from '../../components/CustomPrompt';
import CustomAlert from '../../components/CustomAlert';
import {
    BANKRUPT_SCREEN_BE_ATTENTIVE,
    BANKRUPT_SCREEN_INPUT_AMOUNT,
    BANKRUPT_SCREEN_WITHDRAW_SUCCESSFUL
} from '../../store/constants';

export const BankruptScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Bankrupt navigation={ navigation } commonSettings={ commonSettings } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Bankrupt = ({ navigation, commonSettings }) => {
    const { cash } = commonSettings;
    const { depositAmount } = useSelector( getBankSettings );
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: BANKRUPT_SCREEN_BE_ATTENTIVE
    });
    const [ prompt, setPrompt ] = useState({
        isVisible: false,
        data: BANKRUPT_SCREEN_INPUT_AMOUNT,
        value: ''
    });

    const showBeAttentiveAlert = () => {
        setAlert({ 
            isVisible: true,
            data: BANKRUPT_SCREEN_BE_ATTENTIVE,
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
            data: BANKRUPT_SCREEN_WITHDRAW_SUCCESSFUL,
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

    const withdrawCashFromBank = () => {
        return (
            <>
                <CustomPrompt prompt={ prompt } setPrompt={ setPrompt }/>
                <CustomAlert alert={ alert } setAlert={ setAlert }/>
                <View style={ styles.container }>
                    <View style={ styles.dataContainer }>
                        <Text style={{ ...styles.text, marginBottom: hp('2%') }}>У Вас дефицит средств</Text>
                        <Text style={{ ...styles.bigText, marginBottom: hp('6%') }}>{ -Math.floor( cash ) }$</Text>
                        <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Счет в банке { Math.floor( 0.5 + depositAmount ) }$</Text>
                        <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Стоимость операции 5%.</Text>
                        <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Сколько берете?</Text>
                    </View>
                    <View style={ styles.buttonContainer }>
                        <Button
                            buttonStyle={ styles.button } 
                            titleStyle={ styles.buttonTitle }
                            type="outline" 
                            title="Снять деньги"
                            onPress={ () => showInputWithdrawAmountPrompt() }  
                        />
                    </View>
                </View>
            </>
        )
    }

    if( depositAmount > 0 ) return withdrawCashFromBank();
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: hp('2%')
    },
    dataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%'),
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
    },
    bigText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT40,
        textAlign: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '100%',
        marginBottom: hp('1%'),
    },
    button: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '100%',
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,
    }
});