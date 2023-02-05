import React, { useState, useEffect, useReducer } from "react";
import { View, Text, StyleSheet, Pressable, BackHandler, ScrollView } from 'react-native';
import { useStore, useSelector, useDispatch } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME } from "../../styles/theme";
import GameWrapper from "../../components/GameWrapper";
import {
    getCommonSettings, 
    getBankSettings,
    getBusinessSettings,
} from "../../store/selectors";
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
    setCommonBusinessIncomeAction,
} from "../../store/actions/actions";
import { calcSubtotals, setCashAmountMinusFine } from "../../components/CommonFunctions";
import random from "../../components/Random";
import { INT } from "../../components/CommonFunctions";


export const GameMainScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <MainMenu navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings }/>

    return(
        <GameWrapper navigation={ navigation } wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
}

const MainMenu = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const store = useStore();
    const { cash, electionStatus, yearsPassed, yearOfFirstElection } = commonSettings;
    const { lendAmount, lendTerm, lendPersentages, borrowAmount, borrowTerm, borrowPersentage, insuredPossessionList, insurancePossessionCostList } = useSelector( getBankSettings );
    const { commonBusinessIncome } = useSelector( getBusinessSettings );
    const [ alert, setAlert ] = useState({ isVisible: false, data: GAME_MAIN_SCREEN_QUIT_GAME_ALERT });

    const navToTotalScreenIfYearIsOver = () => {
        const { posWithinYear, endOfYear } = store.getState().gameSettingsReducer.commonSettings;
        if( endOfYear <= posWithinYear ) navigation.navigate('TotalScreen');
    }

    const showDisasterAlert = ( message ) => {
        setAlert({
            ...alert,
            isVisible: true,
            data: {
                ...GAME_MAIN_SCREEN_DISASTER,
                message
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    navToTotalScreenIfYearIsOver();
                }  
            ]
        })
    }

    const createDisaster = () => {
        if( random() > 0.2 ) {
            navToTotalScreenIfYearIsOver();
            return;
        }

        const numOfDisaster = INT( 10 * random() );
        if( ( numOfDisaster <= 0 ) || ( numOfDisaster > 5 ) ) {
            navToTotalScreenIfYearIsOver();
            return;
        }

        let { possessionList, possessionSellCostList } = store.getState().gameSettingsReducer.possessionSettings;

        if( !possessionList[ numOfDisaster - 1 ] ) {
            navToTotalScreenIfYearIsOver();
            return;
        }

        let message = '';
        const damage = possessionSellCostList[  numOfDisaster - 1 ];

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
                message = `Вы разбились на своем самолете.\nЛетайте самолетами Аэрофлота.\nНанесен ущерб ${ damage }$.`;                
        }

        possessionList[ numOfDisaster - 1 ] = false;
        dispatch(setPossessionListAction( possessionList ));

        if(insuredPossessionList[ numOfDisaster - 1 ]) {
            message = message + `\nВам выплачивается страховка ${ insurancePossessionCostList[ numOfDisaster - 1 ] }`;
            dispatch(setCommonBusinessIncomeAction( commonBusinessIncome + insurancePossessionCostList[ numOfDisaster - 1 ] ));
            insuredPossessionList[ numOfDisaster - 1 ] = false;
            insurancePossessionCostList[ numOfDisaster - 1 ] = 0;
            dispatch(setInsuredPossessionListAction( insuredPossessionList ));
            dispatch(setInsurancePossessionCostListAction( insurancePossessionCostList, true ));
        }

        setTimeout( () => showDisasterAlert( message ), 300 );
    }

    const showBorrowRefundAlert = ( refundedAmount ) => {
        setAlert({
            ...alert,
            isVisible: true,
            message: `С вас удержали кредит с процентами ${ refundedAmount }`,
            data: GAME_MAIN_SCREEN_BORROW_REFUND,
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
        if( ( borrowAmount > 0 ) && ( borrowTerm <= 0 ) ) {
            const refundedAmount = borrowAmount + borrowAmount * borrowPersentage;
            setTimeout( () => showBorrowRefundAlert( refundedAmount ), 300 );
            return;
        }
        createDisaster();
    }

    const showLendRefundAlert = ( isMoneyNotRefunded, message ) => {
        const data = ( isMoneyNotRefunded ) ? GAME_MAIN_SCREEN_LEND_NOT_REFUND : GAME_MAIN_SCREEN_LEND_REFUND;
        setAlert({
            ...alert,
            isVisible: true,
            message,
            data,
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    if( isMoneyNotRefunded ) {
                        dispatch(setCashAmountAction( cash + lendAmount * ( 1 + lendPersentages ) ));
                        forceUpdate();
                    }
                    dispatch(setLendAmountAction( 0, true ));
                    borrowRefund();
                }  
            ]
        })

    }

    const lendRefund = () => { 
        if( ( lendAmount != 0 ) && ( lendTerm <= 0 ) ) {
            const message = ( lendAmount < 0 ) ? (
                `Потеряно ${ lendAmount }$`) : (
                `Получите свои ${ lendAmount } и барыш ${ Math.floor( lendAmount + lendAmount * lendPersentages ) }$` );
            showLendRefundAlert( lendAmount < 0, message );
            return;
        }
        borrowRefund();
    }

    const onScreenFocus = () => {
        if( store.getState().appSettingsReducer.isNewYearBegun ) {
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
                    BackHandler.exitApp(); 
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
                    return (( yearsPassed % 2 ) === 0) ? true : false;
                case 'InsuranceScreen':
                    if( possessionList.indexOf( true ) === -1 ) navigation.navigate('GameMainScreen');
                    else navigation.navigate('BankScreen');
                    return true;
                case 'EntertainmentScreen':
                case 'TotalScreen':
                case 'BankruptScreen':
                case 'DeathScreen':
                case 'JailScreen':
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
        calcSubtotals( timeStep );
        if( ( ( yearsPassed % 2 ) === 0 ) && electionStatus ) calcSubtotals( 0.7 );
        navigation.navigate( 'ElectionScreen' );
    }

    return (
        <ScrollView style={ styles.container }>
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <Text style={ styles.title }>Что вас интересует?</Text>
            <View style={ styles.menu }>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'FinancialSituationScreen', 0.1 ) }>
                        <Text style={ styles.menuItemText }>Финансовое</Text>
                        <Text style={ styles.menuItemText }>положение</Text>
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToElectionScreen( 0.3 ) }>
                        <Text style={ styles.menuItemText }>Общественное</Text>
                        <Text style={ styles.menuItemText }>положение</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'PossessionScreen', 1 ) }>
                        <Text style={ styles.menuItemText }>Личное</Text>
                        <Text style={ styles.menuItemText }>имущество</Text>
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'EmployeesScreen', 1 ) }>
                        <Text style={ styles.menuItemText }>Подчиненные</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'BusinessScreen', 1 ) }>
                        <Text style={ styles.menuItemText }>Бизнес</Text>
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'StockmarketScreen', 0.4 ) }>
                        <Text style={ styles.menuItemText }>Биржа</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ 
                        () => navToGameScreens( 'BankScreen', 0, { 
                            previousScreen: 'GameMainScreen'
                        })}>
                        <Text style={ styles.menuItemText }>Банк</Text>
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'EntertainmentScreen', 2.5 ) }>
                        <Text style={ styles.menuItemText }>Развлечения</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginBottom: hp('1%'),
        marginTop: hp('1%'),
    },
    title: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1%')
    },
    menu: {
        flex: 1,
        alignItems: 'center',
    },
    menuRow: {
        flexDirection: 'row',
        height: THEME.SCREEN_WIDTH * 0.5 - wp('4%')
    },  
    menuItem: {
        margin: 5,
        width: THEME.SCREEN_WIDTH * 0.5 - wp('4%'),
        borderRadius: wp('3%'),
        justifyContent: 'center'
    },
    menuItemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT30,
        textAlign: 'center',
    }
})