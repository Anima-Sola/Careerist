import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '../../../styles/theme';
import GameWrapper from '../../../components/GameWrapper';
import { 
    BORROW_SCREEN_INPUT_AMOUNT,
    BORROW_SCREEN_INPUT_TERM,
    BORROW_SCREEN_CANT_READ,
    BORROW_SCREEN_BORROW_MONEY,
    BORROW_SCREEN_TIME_TO_PAY
 } from '../../../store/constants';
import { 
    getCommonSettings,
    getBankSettings,
    getBusinessSettings,
} from '../../../store/selectors';
import { 
    setCashAmountAction,
    setBorrowAmountAction,
    setBorrowTermAction,
    setBorrowPersentagesAction,
} from '../../../store/actions/actions';
import CustomAlert from '../../../components/CustomAlert';
import CustomPrompt from '../../../components/CustomPrompt';
import { rndBetweenMinusOneAndOne } from '../../../components/Random';
import { calcInEstateAmount, calcInStocksAmount } from '../../../components/CommonFunctions';

import BorrowImage from "../../../assets/images/bankservices/borrow.png";

export const BorrowScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Borrow navigation={ navigation } commonSettings={ commonSettings } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings } />
    )
};

const Borrow = ({ navigation, commonSettings }) => {
    const dispatch = useDispatch();
    const [ isRun, setIsRun ] = useState( false );
    const wealth = useRef( 0 );
    const { cash, year, yearsPassed, yearExpense, gameDifficultyLevel } = commonSettings;
    const { depositAmount } = useSelector( getBankSettings );
    const { commonBusinessIncome } = useSelector( getBusinessSettings );
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: BORROW_SCREEN_CANT_READ
    });
    const [ prompt, setPrompt ] = useState({
        isVisible: false,
        data: BORROW_SCREEN_INPUT_AMOUNT,
        value: ''
    });

    const calcWealth = () => {
        // I don't agree with original game - stock amount calcs in the of the year or then you see
        // financial sutuation. Not then you buy them.
        const wealth = cash + depositAmount + calcInStocksAmount() + calcInEstateAmount() - yearExpense + commonBusinessIncome;
        return wealth;
    }

    if( !isRun ) {
        wealth.current = calcWealth();
        setIsRun( true );
    }

    const showCantReadAlert = ( amount ) => {
        setAlert({ 
            ...alert,
            isVisible: true,
            buttonsCallbacks: [
                () => {
                    setTimeout( () => showInputBorrowTermPrompt( amount ), 300 );
                }
            ]
        })
    }

    const showTimeToPayAlert = ( persentages, amount, term ) => {
        setAlert({ 
            ...alert,
            data: {
                ...BORROW_SCREEN_TIME_TO_PAY,
                message: `Время расплаты в ${ year + yearsPassed + term } году.`
            },
            isVisible: true,
            buttonsCallbacks: [
                () => {
                    () => setAlert({ ...alert, isVisible: false });
                    dispatch(setCashAmountAction( cash + amount ));
                    dispatch(setBorrowAmountAction( amount ));
                    dispatch(setBorrowTermAction( term ));
                    dispatch(setBorrowPersentagesAction( persentages ), true );
                    navigation.navigate('BankScreen', { previousScreen: 'lendOrBorrowScreen' });
                }
            ]
        })
    }

    const showBorrowMoneyAlert = ( persentages, amount, term ) => {
        setAlert({
            ...alert,
            isVisible: true,
            data: {
                ...BORROW_SCREEN_BORROW_MONEY,
                message: `Даем под ${ Math.floor( 100 * persentages ) }%.\nБерете?`
            },
            buttonsCallbacks: [
                () => {
                    () => setAlert({ ...alert, isVisible: false });
                    setTimeout( () => showTimeToPayAlert( persentages, amount, term ), 300 );
                },
                () => setAlert({ ...alert, isVisible: false })
            ]
        })
    }

    const showInputBorrowTermPrompt = ( amount ) => {
        setPrompt({
            ...prompt,
            isVisible: true,
            data: BORROW_SCREEN_INPUT_TERM,
            buttonsCallbacks: [
                ( term ) => {
                    setPrompt({ ...prompt, isVisible: false, value: '' });
                    if( term > 5 ) {
                        setTimeout( () => showCantReadAlert( amount ), 300 );
                        return;
                    }
                    const persentages = 0.01 + ( 3 + rndBetweenMinusOneAndOne() ) * amount * term / wealth.current / ( 2 + gameDifficultyLevel ) / 5;
                    setTimeout( () => showBorrowMoneyAlert( persentages, amount, term ), 300 );
                },
                () => setPrompt({ ...prompt, isVisible: false, value: '' })
            ]
        })
    }

    const showInputBorrowAmountPrompt = () => {
        setPrompt({
            ...prompt,
            isVisible: true,
            buttonsCallbacks: [
                ( amount ) => {
                    setPrompt({ ...prompt, isVisible: false, value: '' });
                    setTimeout( () => showInputBorrowTermPrompt( amount ), 300 );
                },
                () => setPrompt({ ...prompt, isVisible: false, value: '' })
            ]
        })
    }
    
    const notBankrupt = () => {
        return (
            <>
                <CustomPrompt prompt={ prompt } setPrompt={ setPrompt }/>
                <CustomAlert alert={ alert } setAlert={ setAlert }/>
                <View style={ styles.container }>
                    <View style={ styles.dataContainer }>
                        <Image style={ styles.image } resizeMode='center' source={ BorrowImage } />
                        <Text style={ styles.text }>Наличные средства { Math.floor( cash ) }$.</Text>
                        <Text style={ styles.text }>Со всеми потрохами</Text>
                        <Text style={ styles.text }>вы стоите: { Math.floor( wealth.current ) }$.</Text>
                        <Text style={ styles.text }>Даем на срок не более 5 лет.</Text>
                    </View>
                </View>
                <View style={ styles.buttonsContainer }>
                    <Button
                        buttonStyle={ styles.borrowButton } 
                        titleStyle={ styles.buttonTitle }
                        type="outline" 
                        title="Взять кредит"
                        onPress={ () => showInputBorrowAmountPrompt() }    
                    />
                    <Button
                        buttonStyle={ styles.exitButton } 
                        titleStyle={ styles.buttonTitle }
                        type="outline" 
                        title="Уйти"
                        onPress={ () => navigation.navigate('BankScreen', { previousScreen: 'lendOrBorrowScreen' }) }   
                    />
                </View>
            </>
        )
    }

    const bankrupt = () => {
        return (
            <>
                <View style={ styles.container }>
                    <View style={ styles.dataContainer }>
                        <Image style={ styles.image } resizeMode='center' source={ BorrowImage } />
                        <Text style={ styles.text }>Наличные средства { cash }$.</Text>
                        <Text style={ styles.text }>Банкротам не даем!</Text>
                    </View>
                </View>
                <View style={ styles.buttonsContainer }>
                    <Button
                        buttonStyle={{ ...styles.exitButton, width: wp('96%') }} 
                        titleStyle={ styles.buttonTitle }
                        type="outline" 
                        title="Уйти"
                        onPress={ () => navigation.navigate('BankScreen', { previousScreen: 'lendOrBorrowScreen' }) }   
                    />
                </View>
            </>
        )
    }
    
    return ( wealth.current > 0 ) ? notBankrupt() : bankrupt();
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
        height: hp('30%'),
        width: hp('30%'),
        alignSelf: 'center',
        marginBottom: hp('5%')
    },
    buttonsContainer: {
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('1%'),
    },
    borrowButton: {
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