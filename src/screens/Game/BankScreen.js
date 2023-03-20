import React, { useState, useReducer, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCommonSettings, getBankSettings } from '../../store/selectors'; 
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { BANKING_SERVICES } from '../../store/constants';
import { 
    setIsBankBankruptAction, 
    setDepositAmountAction,
    setBorrowTermAction,
    setCashAmountAction,
} from '../../store/actions/actions';
import { rndBetweenMinusOneAndOne } from '../../components/Random';
import { calcSubtotals } from '../../components/CommonFunctions';

import Ensurance from "../../assets/images/bankservices/ensurance_icon.png";
import Deposit from "../../assets/images/bankservices/deposit_icon.png";
import Withdraw from "../../assets/images/bankservices/withdraw_icon.png";
import Lend from "../../assets/images/bankservices/lend_icon.png";
import Borrow from "../../assets/images/bankservices/borrow_icon.png";

export const BankScreen = ({ navigation, route }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Bank navigation={ navigation } route={ route } forceUpdate={ forceUpdate } commonSettings={ commonSettings }/>

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Bank = ({ navigation, route, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const { cash, posWithinYear, endOfYear } = commonSettings;
    const { isBankBankrupt, depositAmount, lendAmount, borrowAmount } = useSelector( getBankSettings );
    const [ bankruptMessage, setBankruptMessage ] = useState(
        <Text style={{ ...styles.text, fontFamily: 'nunito-semibold' }}>НАЦИОНАЛЬНЫЙ БАНК банкрот!</Text>
    );
    const services = [ Ensurance, Deposit, Withdraw, Lend, Borrow ];
    const servicesScreens = [ 'InsuranceScreen', 'DepositScreen', 'WithdrawScreen', 'LendScreen', 'BorrowScreen' ]; 

    const showBankingServices = () => {
        let i = -1;

        const items = services.map( element => {
            i++;
            if(( i === 3 ) && ( lendAmount != 0 )) return;
            if(( i === 4 ) && ( borrowAmount > 0 )) return;
            return (
                <Pressable style={ THEME.PRESSABLE_STYLES(styles.itemContainer) } key={ i } onPress={ eval('() => navigation.navigate("' + servicesScreens [ i ] + '")' )}>
                    <View style={ styles.itemImage }>
                        <Image style={ styles.image } resizeMode='center' source={ element } />
                    </View>
                    <View style={ styles.itemName }>
                        <Text style={ styles.itemText }>{ BANKING_SERVICES[ i ] }</Text>
                    </View>
                </Pressable>
            )
        });

        return (
            <>
                <View style={{ height: hp('1.5%') }}></View>
                <Text style={{ ...styles.text, fontFamily: 'nunito-semibold' }}>НАЦИОНАЛЬНЫЙ БАНК приветствует клиента!</Text>
                <Text style={ styles.text }>Что желаете?</Text>
                <View style={{ height: hp('1.5%') }}></View>
                { items }
            </>
        )
    }

    const bankNotBankrupt = (
        <View style={ styles.wrapper }>
            <ScrollView style={ styles.container }>
                { showBankingServices() }
            </ScrollView>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => navigation.navigate('GameMainScreen', { previousScreen: 'AnyScreen' }) }  
                />
            </View>
        </View>
    )

    const bankBankrupt = (
        <View style={ styles.wrapper }>
            <View style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
                { bankruptMessage }
            </View>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => navigation.navigate('GameMainScreen', { previousScreen: 'AnyScreen' }) }  
                />
            </View>
        </View>
    )

    const onScreenFocus = () => {
        
        if( route.params?.previousScreen === 'lendOrBorrowScreen' ) forceUpdate();
        
        if( !isBankBankrupt && route.params?.previousScreen === 'GameMainScreen' ) {
            const value = rndBetweenMinusOneAndOne();
            if( value > 0.97 ) {
                if( depositAmount > 0) {
                    const compensation = Math.floor( 0.1 * depositAmount);
                    setBankruptMessage(
                        <>
                            <Text style={{ ...styles.text, fontFamily: 'nunito-semibold' }}>НАЦИОНАЛЬНЫЙ БАНК банкрот!</Text>
                            <Text style={ styles.text }>Вам выплачена компенсация { compensation }$</Text>
                        </>
                    );
                    dispatch(setCashAmountAction( cash + compensation ));
                    dispatch(setDepositAmountAction( 0 ));
                }
                dispatch(setIsBankBankruptAction( true ));
                dispatch(setBorrowTermAction( endOfYear - posWithinYear ), true);
                return;
            }
            calcSubtotals( 1 );
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => onScreenFocus() );
        return unsubscribe;
    }, [ route.params?.previousScreen ] )

    return ( isBankBankrupt ) ? bankBankrupt : bankNotBankrupt;
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
        alignSelf: 'center',
        marginTop: hp('1%'),
        marginBottom: hp('1%')
    },
    itemContainer: {
        flexDirection: 'row',
        height: hp('15%'),
        marginBottom: hp('1%'),
        borderRadius: 10
    },
    itemImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '36%',
    },  
    itemName: {
        justifyContent: 'center',
        width: '64%',
        paddingLeft: wp('3%')
    },  
    itemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT30,
    },
    image: {
        height: hp('12%'),
        width: hp('12%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1%')
    },
    expensesText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1.7%')
    },
    buttonContainer: {
        width: '100%',
        alignSelf: 'center',
        marginBottom: hp('1%'),
    },
    button: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '96%',
        alignSelf: 'center',
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,
    }
})