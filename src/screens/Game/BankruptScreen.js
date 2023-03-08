import React, { useState, useReducer, useRef } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { 
    getCommonSettings,
    getBankSettings,
} from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import CustomPrompt from '../../components/CustomPrompt';
import CustomAlert from '../../components/CustomAlert';
import { 
    setCashAmountAction, 
    setDepositAmountAction,
    setStocksQuantityListAction,
    setPossessionListAction,
    setBusinessListAction,
    setEmployeesList,
    setSocialStatusAction,
    setPrisonTermAction,
    setIsNewYearBegun,
    setPlayerAgeAction,
    setYearsPassedAction
} from '../../store/actions/actions';
import {
    BANKRUPT_SCREEN_BE_ATTENTIVE,
    BANKRUPT_SCREEN_INPUT_AMOUNT,
    BANKRUPT_SCREEN_WITHDRAW_SUCCESSFUL
} from '../../store/constants';
import { calcInStocksAmount, calcInEstateAmount, isEmployeesHired, setInitialGameData, getPrisonTerm } from '../../components/CommonFunctions';
import random from '../../components/Random';

import WithdrawImage from "../../assets/images/bankservices/withdraw.png";
import SaleImage from "../../assets/images/sale.png";

export const BankruptScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Bankrupt navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Bankrupt = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    let { cash, playerAge, yearsPassed } = commonSettings;
    const panishmentScreen = useRef( 'GameMainScreen' );
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
                    setAlert({ ...alert, isVisible: false });                    
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
                    if( Math.floor( depositAmount ) < amount ) {
                        setTimeout( () => showBeAttentiveAlert(), 300 );
                        return;
                    }
                    dispatch(setDepositAmountAction( depositAmount - amount ));
                    dispatch(setCashAmountAction( cash + 0.95 * amount ), true);
                    if( ( cash + 0.95 * amount ) > 0 ) {
                        setInitialGameData();
                        dispatch(setPlayerAgeAction( playerAge + 1 ));
                        dispatch(setYearsPassedAction( yearsPassed + 1 ));
                        dispatch(setIsNewYearBegun( false, true ));
                        navigation.navigate('GameMainScreen');
                        return;
                    }
                    if( ( Math.floor( depositAmount ) - amount ) > 0 ) setTimeout( () => showWithdrawSuccesfulAlert(), 300 );
                    forceUpdate();
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
                <ScrollView style={ styles.container }>
                    <View style={ styles.dataContainer }>
                        <Image style={ styles.image } resizeMode='center' source={ WithdrawImage } />
                        <Text style={{ ...styles.text, marginBottom: hp('2%') }}>У Вас дефицит средств</Text>
                        <Text style={{ ...styles.bigText, marginBottom: hp('1.5%') }}>{ -Math.floor( cash ) }$.</Text>
                        <Text style={{ ...styles.text, marginBottom: hp('1.5%') }}>Счет в банке { Math.floor( depositAmount ) }$.</Text>
                        <Text style={{ ...styles.text, marginBottom: hp('1.5%') }}>Стоимость операции 5%.</Text>
                        <Text style={{ ...styles.text, marginBottom: hp('1.5%') }}>Сколько берете?</Text>
                    </View>
                </ScrollView>
                <View style={ styles.buttonContainer }>
                    <Button
                        buttonStyle={ styles.button } 
                        titleStyle={ styles.buttonTitle }
                        type="outline" 
                        title="Снять деньги"
                        onPress={ () => showInputWithdrawAmountPrompt() }  
                    />
                </View>
            </>
        )
    }

    const sellStocks = () => {
        const inStocksAmount = calcInStocksAmount();

        if( ( inStocksAmount > 0 ) ) {
            const soldStocksAmount = Math.floor( inStocksAmount * random() );
            dispatch(setStocksQuantityListAction([ 0, 0, 0, 0, 0 ], true ));
            cash = cash + soldStocksAmount;
            return (
                <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Ваши акции распроданы на сумму { soldStocksAmount }$.</Text>
            )
        }

        return (<></>);
    }

    const employeesFired = () => {      
        if( ( cash < 0 ) && isEmployeesHired() ) {
            dispatch(setEmployeesList([ false, false, false, false, false ], true ));
            return (
                <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Подчиненные вас бросили!</Text>
            )
        }

        return (<></>);
    }

    const sellEstate = () => {
        const inEstateAmount = calcInEstateAmount();

        if( ( cash < 0 ) && ( inEstateAmount > 0 ) ) {
            const soldEstateAmount = Math.floor( inEstateAmount * random() );
            dispatch(setPossessionListAction([ false, false, false, false, false ]));
            dispatch(setBusinessListAction([ false, false, false, false, false ], true ));
            cash = cash + soldEstateAmount;
            return (
                <>
                    <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Имущество пошло с молотка. Выручено { soldEstateAmount }$.</Text>
                    { employeesFired() }
                </>
            )
        }

        return (<></>);
    }

    const assignPanishment = () => {
        if( cash < 0 ) {

            const prisonTerm = 1 + Math.floor( -0.002 * cash );
            
            dispatch(setPrisonTermAction( prisonTerm ));
            dispatch(setSocialStatusAction( 1, true ));

            if( prisonTerm < 15 ) {
                panishmentScreen.current = 'JailScreen';
                dispatch(setCashAmountAction( cash, true ));
                return (
                    <>
                        <Text style={{ ...styles.text, marginBottom: hp('2%') }}>
                            За долги вы переезжаете в казенную квартиру сроком на { getPrisonTerm( prisonTerm ) }.
                        </Text>
                        <Text style={{ ...styles.text, marginBottom: hp('2%') }}>
                            Посидим?
                        </Text>
                    </>
                )
            } else {
                panishmentScreen.current = 'DeathScreen';
                return (
                    <Text style={{ ...styles.text, marginBottom: hp('2%') }}>За огромные долги вы приговорены к высшей мере наказания.</Text>
                )
            }

        } else {
            setInitialGameData();
            dispatch(setPlayerAgeAction( playerAge + 1 ));
            dispatch(setYearsPassedAction( yearsPassed + 1 ));
            dispatch(setIsNewYearBegun( false, true ));
            dispatch(setCashAmountAction( cash, true ));
        }

        return (<></>);
    }

    const assetSale = () => {
        return (
            <>
                <CustomPrompt prompt={ prompt } setPrompt={ setPrompt }/>
                <CustomAlert alert={ alert } setAlert={ setAlert }/>
                <ScrollView style={ styles.container }>
                    <View style={ styles.dataContainer }>
                        <Image style={ styles.image } resizeMode='center' source={ SaleImage } />
                        <Text style={ styles.text }>У Вас дефицит средств</Text>
                        <Text style={{ ...styles.bigText, marginBottom: hp('2%') }}>{ -Math.floor( cash ) }$.</Text>
                        { sellStocks() }
                        { sellEstate() }
                        { employeesFired() }
                        { assignPanishment() }
                    </View>
                </ScrollView>
                <View style={ styles.buttonContainer }>
                    <Button
                        buttonStyle={ styles.button } 
                        titleStyle={ styles.buttonTitle }
                        type="outline" 
                        title="Продолжить"
                        onPress={ () => navigation.navigate( panishmentScreen.current ) }  
                    />
                </View>
            </>
        )
    }

    if( Math.floor( depositAmount ) > 0 ) return withdrawCashFromBank(); 
    else return assetSale();
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%'
    },
    dataContainer: {
        flex: 1,
        marginBottom: hp('2%')
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
    image: {
        marginTop: hp('6%'),
        marginBottom: hp('5%'),
        height: hp('30%'),
        width: hp('30%'),
        alignSelf: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '96%',
        marginBottom: hp('1%'),
        alignSelf: 'center',
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
        fontSize: THEME.FONT28
    }
});