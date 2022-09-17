import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCommonSettings } from '../../store/selectors'; 
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { BANKING_SERVICES } from '../../store/constants';

import Ensurance from "../../assets/images/bankservices/ensurance.png";
import Deposit from "../../assets/images/bankservices/deposit.png";
import Withdraw from "../../assets/images/bankservices/withdraw.png";
import Lend from "../../assets/images/bankservices/lend.png";
import Borrow from "../../assets/images/bankservices/borrow.png";

export const BankScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Bank navigation={ navigation } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Bank = ({ navigation }) => {
    const dispatch = useDispatch();
    const services = [ Ensurance, Deposit, Withdraw, Lend, Borrow ];
    const servicesScreens = [ 'InsuranceScreen', 'DepositScreen', 'WithdrawScreen', 'LendScreen', 'BorrowScreen' ]; 

    const showBankingServices = () => {
        let i = -1;

        const items = BANKING_SERVICES.map( element => {
            i++;
            return (
                <Pressable style={ THEME.PRESSABLE_STYLES(styles.itemContainer) } key={ i } onPress={ eval('() => navigation.navigate("' + servicesScreens [ i ] + '")' )}>
                    <View style={ styles.itemImage }>
                        <Image style={ styles.image } resizeMode='center' source={ services [ i ] } />
                    </View>
                    <View style={ styles.itemName }>
                        <Text style={ styles.itemText }>{ element }</Text>
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

    return (
        <>
            <ScrollView style={ styles.container }>
                { showBankingServices() }
            </ScrollView>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => navigation.navigate('GameMainScreen') }  
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
        paddingLeft: 10
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
        flex: 0.1,
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: hp('1%'),
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,
    }
})