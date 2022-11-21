import React, { useState, useReducer } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { getCommonSettings, getPossessionSettings } from '../../store/selectors';
import {
    SOCIAL_STATUSES, 
    POSSESSION_LIST,
    POSSESSION_SCREEN_NO_MONEY_CHEATING,
    POSSESSION_SCREEN_NOTHING_TO_SALE_CHEATING,
    POSSESSION_SCREEN_DONT_BE_FOOL_WARNING,
    POSSESSION_SCREEN_ANOTHER_DEAL,
} from '../../store/constants';
import { setCashAmountAction, setPossessionList, setYearExpenseAction } from '../../store/actions/actions';
import CustomAlert from '../../components/CustomAlert';
import { rndBetweenMinusOneAndOne } from '../../components/Random';

import Flat from "../../assets/images/possession/flat.png";
import Car from "../../assets/images/possession/car.png";
import Villa from "../../assets/images/possession/villa.png";
import Yacht from "../../assets/images/possession/yacht.png";
import Plane from "../../assets/images/possession/plane.png";

export const PossessionScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Possession navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings }/>

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Possession = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const { cash, currentSocialStatus, yearOutcome } = commonSettings;
    const { possessionList, possessionBuyCostList, possessionSellCostList } = useSelector( getPossessionSettings );
    const [ activeItem, setActiveItem ] = useState( 0 );
    const [ alert, setAlert ] = useState({ isVisible: false, data: POSSESSION_SCREEN_ANOTHER_DEAL });

    const buyOrSellPossession = ( buyOrSell ) => {
        possessionList[ activeItem ] = buyOrSell;
        const updatedCash = ( buyOrSell ) ? cash - possessionBuyCostList[ activeItem ] : cash + possessionSellCostList[ activeItem ];
        dispatch(setCashAmountAction( updatedCash ));
        dispatch(setPossessionList( possessionList, true ));
        forceUpdate();
    }

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
    
    const showDontBeFoolAlert = () => {
        setAlert({ 
            isVisible: true, 
            data: { 
                ...POSSESSION_SCREEN_DONT_BE_FOOL_WARNING, 
                header: `Не глупите ${ SOCIAL_STATUSES[ currentSocialStatus ].toLowerCase() }!` 
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showCheatingAlert = ( alertData, fineAmount ) => {
        setAlert({ 
            isVisible: true, 
            data: { 
                ...alertData, 
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

    const showAnotherDealAlert = ( buyOrSell ) => {
        setAlert({
            isVisible: true, 
            data: POSSESSION_SCREEN_ANOTHER_DEAL,
            buttonsCallbacks: [
                () => {
                    buyOrSellPossession( buyOrSell );
                    setAlert({ ...alert, isVisible: false });
                },
                () => {
                    buyOrSellPossession( buyOrSell );
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const deal = ( buyOrSell ) => {
        
        if( possessionList[ activeItem ] && buyOrSell ) {
            showDontBeFoolAlert();
            return;
        }

        if( !possessionList[ activeItem ] && !buyOrSell ) {
            const fineAmount = getFineAmount();
            showCheatingAlert( POSSESSION_SCREEN_NOTHING_TO_SALE_CHEATING, fineAmount );
            return;
        }

        if(( cash < possessionBuyCostList[ activeItem ] ) && buyOrSell ) {
            const fineAmount = getFineAmount();
            showCheatingAlert( POSSESSION_SCREEN_NO_MONEY_CHEATING, fineAmount );
            return;
        }

        showAnotherDealAlert( buyOrSell );
    }

    const getListBuyOrSale = ( typeOfDeal = false ) => {
        let i = -1;
        const typeOfDealName = ( typeOfDeal ) ? 'продать' : 'купить';
        const possessionCostList = ( typeOfDeal ) ? possessionSellCostList : possessionBuyCostList;
        const possessionImageFiles = [ Flat, Car, Villa, Yacht, Plane ];

        const items = possessionList.map( element => {
            i++;
            if( element === typeOfDeal ) {
                const activeItemBackgroudColor = ( i === activeItem ) ? THEME.THIRD_BACKGROUND_COLOR : 'rgba(0, 0, 0, .2)';
                return (
                    <Pressable style={ styles.itemContainer } key={ i } onPress={eval( '() => setActiveItem(' + i + ')' )}>
                        <View style={{ ...styles.itemImage, backgroundColor: activeItemBackgroudColor }}>
                            <Image style={ styles.image } resizeMode='center' source={ possessionImageFiles[ i ] } />
                        </View>
                        <View style={{ ...styles.itemName, backgroundColor: activeItemBackgroudColor }}>
                            <Text style={ styles.itemText }>{ POSSESSION_LIST[ i ] }</Text>
                            <View style={{ height: hp('1%') }}></View>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>Цена { possessionCostList[ i ] }$</Text>
                        </View>
                    </Pressable>
                )
            }
        });

        return (
            <>
                <Text style={ styles.text }>Вы можете { typeOfDealName }:</Text>
                { items }
            </>
        )
    }

    const listForSale = () => {
        const isSomethingToSale = possessionList.indexOf( true );
        if( isSomethingToSale !== -1 ) return getListBuyOrSale( true );
    }

    const listToBuy = () => {
        const isSomethingToBuy = possessionList.indexOf( false );
        if( isSomethingToBuy !== -1 ) return getListBuyOrSale();
    }

    return (
        <>  
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <ScrollView style={ styles.container }>
                { listForSale() }
                { listToBuy() }
                <Text style={ styles.expensesText }>Расходы на содержание 45% стоимости в год</Text>
            </ScrollView>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.buyButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Купить"
                    onPress={ () => deal( true ) }    
                />
                <Button
                    buttonStyle={ styles.sellButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Продать"
                    onPress={ () => deal( false ) }   
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
        marginBottom: hp('1%')
    },
    itemImage: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        width: '36%',
    },  
    itemName: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        width: '64%',
    },  
    itemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT30,
    },
    image: {
        height: hp('14%'),
        width: hp('14%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1.5%')
    },
    expensesText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('0.5%')
    },
    buttonsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('1%')
    },
    buyButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        height: hp('7%'),
        borderRadius: wp('10%'),
        width: wp('46%'),
        marginRight: 5
    },  
    sellButton: {
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