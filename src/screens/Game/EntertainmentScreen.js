import React, { useState, useEffect, useReducer, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, BackHandler } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import GameWrapper from "../../components/GameWrapper";
import { 
    getCommonSettings,
    getBankSettings
} from '../../store/selectors';
import { 
    setCashAmountAction,
    setYearExpenseAction  
} from '../../store/actions/actions';
import {
    ENTERTAINMENT_LIST,
    ENTERTAINMENT_SCREEN_YOU_ARE_MISER,
    ENTERTAINMENT_SCREEN_NO_MONEY_CHEATING,
    ENTERTAINMENT_SCREEN_YOU_WIN,
    ENTERTAINMENT_SCREEN_YOU_LOSE_NO_MORE_MONEY,
    ENTERTAINMENT_SCREEN_YOU_LOSE
} from '../../store/constants';
import CustomAlert from '../../components/CustomAlert';
import random, { rndBetweenMinusOneAndOne } from '../../components/Random';

import Preference from "../../assets/images/entertainment/preference.png";
import MonteCarlo from "../../assets/images/entertainment/monte-carlo.png";
import Lover from "../../assets/images/entertainment/lover.png";
import Banquet from "../../assets/images/entertainment/banquet.png";
import Cruise from "../../assets/images/entertainment/cruise.png";

export const EntertainmentScreen = ({ navigation, route }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Entertainment navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings }/>

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Entertainment = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const [ isRun, setIsRun ] = useState( false );
    const entertainmentData = useRef();
    const { cash, yearExpense } = commonSettings;
    const { depositAmount } = useSelector( getBankSettings );
    const [ activeItem, setActiveItem ] = useState( 0 );
    const [ alert, setAlert ] = useState({ isVisible: false, data: ENTERTAINMENT_SCREEN_YOU_ARE_MISER });

    const setCashAmountMinusFine = ( fineAmount ) => {
        let updatedCash = cash - fineAmount;
        if( updatedCash < 0 ) {
            dispatch(setYearExpenseAction( yearExpense - updatedCash ));
            updatedCash = 0;
        }
        dispatch(setCashAmountAction( updatedCash, true ));
        forceUpdate();
    }

    const getFineAmount = () => {
        const value = rndBetweenMinusOneAndOne();
        return 1500 + 50 * Math.floor( 10 * value );
    }

    const showYouAreMiserAlert = () => {
        setAlert({
            ...alert,
            isVisible: true,
            buttonsCallbacks: [
                () => {
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    //Calc const, income and chance to win
    const calcEntertainmentData = () => {
        let entertainmentData = [];
        for( let i = 1; i <= 5; i++ ) {
            let rnd = random();
            let value = Math.floor( ( 2 + 5 * rnd ) * 20 * 5 ** i );
            let item = {
                expenses: value,
                income: value * ( 2 - rnd ),
                chanceToEarnMoney: 100 * rnd
            }
            entertainmentData.push( item );
        }
        return entertainmentData;
    }

    //Run only one time
    if( !isRun ) {
        setIsRun( true );
        entertainmentData.current = calcEntertainmentData();
    }

    const getEntertainList = () => {
        let i = -1;
        const entertainmentImageFiles = [ Preference, MonteCarlo, Lover, Banquet, Cruise ];

        const items = ENTERTAINMENT_LIST.map( element => {
            i++;
            const activeItemBackgroudColor = ( i === activeItem ) ? THEME.THIRD_BACKGROUND_COLOR : 'rgba(0, 0, 0, .2)';
            return (
                <Pressable style={{ ...styles.itemContainer, backgroundColor: activeItemBackgroudColor }} key={ i } onPress={ eval( '() => setActiveItem(' + i + ')' ) }>
                    <View style={ styles.itemImage }>
                        <Image style={ styles.image } resizeMode='center' source={ entertainmentImageFiles[ i ] } />
                    </View>
                    <View style={ styles.itemData }>
                        <Text style={ styles.textHeader }>{ element }</Text>
                        <Text style={ styles.text }>Затраты { entertainmentData.current[ i ].expenses }$</Text>
                        <Text style={ styles.text }>Доход { Math.floor( entertainmentData.current[ i ].income ) }$</Text>
                        <Text style={ styles.text }>Шанс успеха { Math.floor( entertainmentData.current[ i ].chanceToEarnMoney ) }%</Text>
                    </View>
                </Pressable>
            )
        });

        return (
            <>
                <Text style={{ ...styles.text, marginBottom: hp('0.5%'), fontSize: THEME.FONT35, fontFamily: THEME.FONT_SEMIBOLD }}>
                    Развлекаясь с умом можно получить и барыш.
                </Text>
                <Text style={{ ...styles.text, marginBottom: hp('1%'), fontSize: THEME.FONT35 }}>Чего изволите-с?:</Text>
                { items }
            </>
        )
    }

    const showCheatingAlert = ( fineAmount ) => {
        setAlert({ 
            isVisible: true, 
            data: { 
                ...ENTERTAINMENT_SCREEN_NO_MONEY_CHEATING, 
                message: `За мошенничество штраф ${ fineAmount }$` 
            },
            buttonsCallbacks: [
                () => {
                    setCashAmountMinusFine( fineAmount );
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showWinAlert = () => {
        setAlert({ 
            isVisible: true, 
            data: ENTERTAINMENT_SCREEN_YOU_WIN,
            buttonsCallbacks: [
                () => {
                    dispatch(setCashAmountAction( cash - entertainmentData.current[ activeItem ].expenses + entertainmentData.current[ activeItem ].income ));
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showLoseAlertNoMoreMoney = () => {
        setAlert({ 
            isVisible: true, 
            data: ENTERTAINMENT_SCREEN_YOU_LOSE_NO_MORE_MONEY,
            buttonsCallbacks: [
                () => {
                    setCashAmountMinusFine( entertainmentData.current[ activeItem ].expenses );
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showLoseAlert = () => {
        setAlert({ 
            isVisible: true, 
            data: ENTERTAINMENT_SCREEN_YOU_LOSE,
            buttonsCallbacks: [
                () => {
                    dispatch(setCashAmountAction( cash - entertainmentData.current[ activeItem ].expenses ));
                    setAlert({ ...alert, isVisible: false });
                    forceUpdate();
                },
                () => {
                    dispatch(setCashAmountAction( cash - entertainmentData.current[ activeItem ].expenses ));
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const entertain = () => {
        //You don't have enough money
        if( ( cash + depositAmount ) <= entertainmentData.current[ activeItem ].expenses ) {
            const fineAmount = getFineAmount();
            showCheatingAlert( fineAmount );
            return;
        }

        //You win
        if( ( 100 * random() ) <= entertainmentData.current[ activeItem ].chanceToEarnMoney ) {
            showWinAlert();
            return;
        }

       //You lose all money
        if( cash - entertainmentData.current[ activeItem ].expenses <= 0 ) {
            showLoseAlertNoMoreMoney();
            return;
        }

        //You lose
        showLoseAlert();

    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener( 'hardwareBackPress', () => showYouAreMiserAlert() );
        return () => backHandler.remove();
    }, [])

    return (
        <View style={ styles.wrapper }>  
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <ScrollView style={ styles.container }>
                { getEntertainList() }
            </ScrollView>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Развлечься"
                    onPress={ () => entertain() }    
                />
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => showYouAreMiserAlert() }   
                />
            </View>
        </View>
    )
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
        marginTop: hp('1.5%'),
        marginBottom: hp('1%')
    },
    itemContainer: {
        marginTop: hp('1%'),
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 10,
        height: hp('15%'),
    },
    itemImage: {
        width: wp('36%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: hp('12%'),
        width: hp('12%')
    },
    itemData: {
        width: wp('60%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: hp('0.5%')
    },
    textHeader: {
        color: THEME.TEXT_COLOR,
        textAlign: 'center',
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT30,
    },
    text: {
        color: THEME.TEXT_COLOR,
        textAlign: 'center',
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT22,
    },
    buttonsContainer: {
        width: '96%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('1%')
    },
    button: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: wp('46%'),
        marginLeft: wp('1%'),
        marginRight: wp('1%'),
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    button2x: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: wp('96%'),
        marginLeft: wp('1%'),
        marginRight: wp('1%'),
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_LIGHT,
        fontSize: THEME.FONT28,
    }
})