import React, { useState, useEffect, useReducer } from "react";
import { View, Text, StyleSheet, Pressable, BackHandler, ScrollView, Image } from 'react-native';
import { useStore, useSelector, useDispatch } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as NavigationBar from 'expo-navigation-bar';
import { THEME } from "../../styles/theme";
import GameWrapper from "../../components/GameWrapper";
import { getCommonSettings } from "../../store/selectors";
import CustomAlert from '../../components/CustomAlert';
import { 
    GAME_MAIN_SCREEN_QUIT_GAME_ALERT,
    GAME_MAIN_SCREEN_LEND_REFUND,
    GAME_MAIN_SCREEN_LEND_NOT_REFUND,
    GAME_MAIN_SCREEN_BORROW_REFUND,
    GAME_MAIN_SCREEN_DISASTER
 } from "../../store/constants";
import {
    setIsNewYearBegun, 
    setCashAmountAction, 
    setLendAmountAction,
    setBorrowAmountAction,
    setPossessionListAction,
    setInsuredPossessionListAction,
    setInsurancePossessionCostListAction,
    setInsurancePossessionTermListAction,
    setCommonBusinessIncomeAction,
} from "../../store/actions/actions";
import { calcSubtotals, setCashAmountMinusFine } from "../../components/CommonFunctions";
import random from "../../components/Random";
import { INT } from "../../components/CommonFunctions";

import FinancialSituationIcon from '../../assets/images/mainscreenicons/financialsituation.png';
import SocialSituationIcon from '../../assets/images/mainscreenicons/socialsituation.png';
import PossessionIcon from '../../assets/images/mainscreenicons/possession.png';
import EmployeesIcon from '../../assets/images/mainscreenicons/employees.png';
import BusinessIcon from '../../assets/images/mainscreenicons/business.png';
import StockmarketIcon from '../../assets/images/mainscreenicons/stockmarket.png';
import BankIcon from '../../assets/images/mainscreenicons/bank.png';
import EntertainmentIcon from '../../assets/images/mainscreenicons/entertainment.png';

export const GameMainScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <MainMenu navigation={ navigation } forceUpdate={ forceUpdate } />

    return(
        <GameWrapper navigation={ navigation } wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
}

const MainMenu = ({ navigation, forceUpdate }) => {
    const dispatch = useDispatch();
    const store = useStore();
    const [ alert, setAlert ] = useState({ isVisible: false, data: GAME_MAIN_SCREEN_QUIT_GAME_ALERT });

    const navToTotalScreenIfYearIsOver = () => {
        const { posWithinYear, endOfYear } = store.getState().gameSettingsReducer.commonSettings;
        if( endOfYear <= posWithinYear ) navigation.navigate('TotalScreen');
    }

    const showDisasterAlert = ( message, numOfDisaster = 0 ) => {
        setAlert({
            ...alert,
            isVisible: true,
            data: {
                ...GAME_MAIN_SCREEN_DISASTER,
                message
            },
            buttonsCallbacks: [
                () => {
                    if( numOfDisaster === 5 ) navigation.navigate('DeathScreen');
                    setAlert({ ...alert, isVisible: false });
                    navToTotalScreenIfYearIsOver();
                }  
            ]
        })
    }

    const createDisaster = () => {
        //Bug in original game - impossible to crash on plain
        //I think the author implied that the character would die
        if( random() > 0.2 ) {
            navToTotalScreenIfYearIsOver();
            return;
        }

        const numOfDisaster = INT( 10 * random() );
        if( ( numOfDisaster < 1 ) || ( numOfDisaster > 5 ) ) {
            navToTotalScreenIfYearIsOver();
            return;
        }

        let { possessionList, possessionSellCostList } = store.getState().gameSettingsReducer.possessionSettings;
        const { insuredPossessionList, insurancePossessionCostList, insurancePossessionTermList } = store.getState().gameSettingsReducer.bankSettings;
        const { commonBusinessIncome } = store.getState().gameSettingsReducer.businessSettings;

        if( !possessionList[ numOfDisaster - 1 ] ) {
            navToTotalScreenIfYearIsOver();
            return;
        }

        let message = '';
        const damage = possessionSellCostList[ numOfDisaster - 1 ];

        switch( numOfDisaster ) {
            case 1: 
                message = `Ваша квартира сгорела.\nНанесен ущерб ${ damage }$.`;
                break;
            case 2:
                message = `Вы попали в автокатастрофу.\nВыбросьте остатки своего автомобиля.\nНанесен ущерб ${ damage }$.`;
                break;
            case 3:
                message = `Сионисты взорвали вашу виллу.\nНанесен ущерб ${ damage }$.`;
                break;
            case 4:
                message = `Экстремисты затопили вашу яхту.\nНанесен ущерб ${ damage }$.`;
                break;
            case 5:
                message = `Вы разбились на своем самолете.\nЛетайте самолетами Аэрофлота.`;
                setTimeout( () => showDisasterAlert( message, numOfDisaster ), 300 );
                return;
        }

        possessionList[ numOfDisaster - 1 ] = false;
        dispatch(setPossessionListAction( possessionList ));

        //Bug in original game - there is no insurance expiration check
        if( insuredPossessionList[ numOfDisaster - 1 ] && ( insurancePossessionTermList[ numOfDisaster - 1 ] > 0 )) {
            message = message + `\nВам выплачивается страховка ${ insurancePossessionCostList[ numOfDisaster - 1 ] }$.`;
            dispatch(setCommonBusinessIncomeAction( commonBusinessIncome + insurancePossessionCostList[ numOfDisaster - 1 ] ));
            insuredPossessionList[ numOfDisaster - 1 ] = false;
            insurancePossessionCostList[ numOfDisaster - 1 ] = 0;
            insurancePossessionTermList[ numOfDisaster - 1 ] = 0;
            dispatch(setInsurancePossessionTermListAction( insurancePossessionTermList ));
            dispatch(setInsuredPossessionListAction( insuredPossessionList ));
            dispatch(setInsurancePossessionCostListAction( insurancePossessionCostList, true ));
        }

        setTimeout( () => showDisasterAlert( message ), 300 );
    }

    const showBorrowRefundAlert = ( refundedAmount ) => {
        setAlert({
            ...alert,
            isVisible: true,
            data: {
                ...GAME_MAIN_SCREEN_BORROW_REFUND,
                message: `С вас удержали кредит с процентами ${ Math.floor( refundedAmount ) }.`,
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    dispatch(setBorrowAmountAction( 0 ));
                    setCashAmountMinusFine( refundedAmount );
                    forceUpdate();
                    createDisaster();
                }  
            ]
        })
    }

    const borrowRefund = () => {
        const { borrowAmount, borrowTerm, borrowPersentages } = store.getState().gameSettingsReducer.bankSettings;
        if( ( borrowAmount > 0 ) && ( borrowTerm <= 0 ) ) {
            const refundedAmount = borrowAmount + borrowAmount * borrowPersentages;
            setTimeout( () => showBorrowRefundAlert( refundedAmount ), 300 );
            return;
        }
        createDisaster();
    }

    const showLendRefundAlert = ( isMoneyNotRefunded, lendAmount, lendPersentages, message ) => {
        const data = ( isMoneyNotRefunded ) ? GAME_MAIN_SCREEN_LEND_NOT_REFUND : GAME_MAIN_SCREEN_LEND_REFUND;
        setAlert({
            ...alert,
            isVisible: true,
            data: {
                ...data,
                message
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    const { cash } = store.getState().gameSettingsReducer.commonSettings;
                    if( !isMoneyNotRefunded ) dispatch(setCashAmountAction( cash + lendAmount * ( 1 + lendPersentages ) ));
                    dispatch(setLendAmountAction( 0, true ));
                    forceUpdate();
                    borrowRefund();
                }  
            ]
        })
    }

    const lendRefund = () => { 
        const { lendAmount, lendTerm, lendPersentages } = store.getState().gameSettingsReducer.bankSettings;
        if( ( lendAmount != 0 ) && ( lendTerm <= 0 ) ) {
            const message = ( lendAmount < 0 ) ? (
                `Потеряно ${ lendAmount }$.`) : (
                `Получите свои ${ lendAmount } и барыш ${ Math.floor( lendAmount + lendAmount * lendPersentages ) }$.` );
            showLendRefundAlert( lendAmount < 0, lendAmount, lendPersentages, message );
            return;
        }
        borrowRefund();
    }

    const onScreenFocus = () => {
        NavigationBar.setBackgroundColorAsync( THEME.FORTH_BACKGROUND_COLOR );
        if( store.getState().appSettingsReducer.isNewYearBegun ) {
            const { cash } = store.getState().gameSettingsReducer.commonSettings;
            if( cash <= 0 ) calcSubtotals( 0.3 );
            lendRefund();
            return;
        }

        store.dispatch(setIsNewYearBegun( true, true ));
    }

    const showQuitGameAlert = () => {
        setAlert({
            ...alert,
            isVisible: true,
            buttonsCallbacks: [
                () => setAlert({ ...alert, isVisible: false }),
                () => { 
                    setAlert({ ...alert, isVisible: false });
                    setTimeout( () => BackHandler.exitApp(), 500 ); 
                }
            ]
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => onScreenFocus() );
        BackHandler.addEventListener('hardwareBackPress', () => {
            const navState = navigation.getState();
            const currentScreenName = navState.routes[ navState.index ].name;
            switch( currentScreenName ) {
                case 'GameMainScreen':
                    showQuitGameAlert();
                    return true;
                case 'ElectionScreen':
                    const { yearsPassed } = store.getState().gameSettingsReducer.commonSettings;
                    return (( yearsPassed % 2 ) === 0) ? true : false;
                case 'InsuranceScreen':
                    const { possessionList } = store.getState().gameSettingsReducer.possessionSettings;
                    if( possessionList.indexOf( true ) === -1 ) navigation.navigate('GameMainScreen');
                    else navigation.navigate('BankScreen');
                    return true;
                case 'EntertainmentScreen':
                case 'TotalScreen':
                case 'BankruptScreen':
                case 'DeathScreen':
                case 'JailScreen':
                case 'WinScreen':
                    return true;
                default:
                    return false;
            }
        })
        return unsubscribe;
    });

    const navToGameScreens = ( screen, timeStep = 0, params = {} ) => {
        if( timeStep > 0 ) calcSubtotals( timeStep );
        navigation.navigate( screen, params ); 
    }

    const navToElectionScreen = ( timeStep = 0 ) => {
        const { yearsPassed, electionStatus } = store.getState().gameSettingsReducer.commonSettings;
        calcSubtotals( timeStep );
        if( ( ( yearsPassed % 2 ) === 0 ) && electionStatus ) calcSubtotals( 0.7 );
        navigation.navigate( 'ElectionScreen' );
    }

    return (
        <ScrollView style={ styles.wrapper }>
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <Text style={ styles.title }>Что вас интересует?</Text>
            <View style={ styles.menu }>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'FinancialSituationScreen', 0.1 ) }>
                        <Image style={ styles.image } resizeMode='center' source={ FinancialSituationIcon } />
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToElectionScreen( 0.3 ) }>
                        <Image style={ styles.image } resizeMode='center' source={ SocialSituationIcon } />
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'PossessionScreen', 1 ) }>
                        <Image style={ styles.image } resizeMode='center' source={ PossessionIcon } />
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'EmployeesScreen', 1 ) }>
                        <Image style={ styles.image } resizeMode='center' source={ EmployeesIcon } />  
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'BusinessScreen', 1 ) }>
                        <Image style={ styles.image } resizeMode='center' source={ BusinessIcon } />
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'StockmarketScreen', 0.4 ) }>
                        <Image style={ styles.image } resizeMode='center' source={ StockmarketIcon } />
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ 
                        () => navToGameScreens( 'BankScreen', 0, { 
                            previousScreen: 'GameMainScreen'
                        })}>
                        <Image style={ styles.image } resizeMode='center' source={ BankIcon } />
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'EntertainmentScreen', 2.5 ) }>
                        <Image style={ styles.image } resizeMode='center' source={ EntertainmentIcon } />
                    </Pressable>
                </View>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        marginBottom: hp('1%'),
        marginTop: hp('1%'),
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
    },
    title: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginTop: hp('1%'),
        marginBottom: hp('1%')
    },
    menu: {
        flex: 1,
        alignItems: 'center',
        marginBottom: hp('0.5%')
    },
    menuRow: {
        flexDirection: 'row',
        height: THEME.SCREEN_WIDTH * 0.5 - wp('4%')
    },  
    menuItem: {
        margin: 5,
        width: THEME.SCREEN_WIDTH * 0.5 - wp('4%'),
        borderRadius: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuItemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT30,
        textAlign: 'center',
    },
    image: {
        height: hp('20%'),
        width: hp('20%'),
    }
})