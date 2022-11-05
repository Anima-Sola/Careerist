import React, { useState, useReducer } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { getCommonSettings, getBusinessSettings } from '../../store/selectors';
import { 
    SOCIAL_STATUSES,
    BUSINESS_LIST,
    BUSINESS_SCREEN_NO_MONEY_CHEATING,
    BUSINESS_SCREEN_NOTHING_TO_SALE_CHEATING,
    BUSINESS_SCREEN_DONT_BE_FOOL_WARNING,
    BUSINESS_SCREEN_ANOTHER_DEAL, 
} from '../../store/constants';
import { setCashAmountAction, setBusinessList, setYearExpenseAction } from '../../store/actions/actions';
import CustomAlert from '../../components/CustomAlert';

import Bar from "../../assets/images/business/bar.png";
import Restraunt from "../../assets/images/business/restraunt.png";
import Shop from "../../assets/images/business/shop.png";
import Hotel from "../../assets/images/business/hotel.png";
import Plant from "../../assets/images/business/plant.png";

export const BusinessScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Business navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings }/>

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Business = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const { cash, currentSocialStatus, yearExpense } = commonSettings;
    const { businessList, businessBuyCostList, businessSellCostList, businessYearIncome } = useSelector( getBusinessSettings );
    const [ activeItem, setActiveItem ] = useState( 0 );
    const [ alert, setAlert ] = useState({ isVisible: false, data: BUSINESS_SCREEN_ANOTHER_DEAL });

    const buyOrSellBusiness = ( buyOrSell ) => {
        businessList[ activeItem ] = buyOrSell;
        const updatedCash = ( buyOrSell ) ? cash - businessBuyCostList[ activeItem ] : cash + businessSellCostList[ activeItem ];
        dispatch(setCashAmountAction( updatedCash ));
        dispatch(setBusinessList( businessList, true ));
        forceUpdate();
    }

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
        const value = ( Math.random() < 0.5 ) ? -Math.random() : Math.random();
        return 1500 + 50 * Math.floor( 10 * value );
    }
    
    const showDontBeFoolAlert = () => {
        setAlert({ 
            isVisible: true, 
            data: { 
                ...BUSINESS_SCREEN_DONT_BE_FOOL_WARNING, 
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
            data: BUSINESS_SCREEN_ANOTHER_DEAL,
            buttonsCallbacks: [
                () => {
                    buyOrSellBusiness( buyOrSell );
                    setAlert({ ...alert, isVisible: false });
                },
                () => {
                    buyOrSellBusiness( buyOrSell );
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const deal = ( buyOrSell ) => {
        
        if( businessList[ activeItem ] && buyOrSell ) {
            showDontBeFoolAlert();
            return;
        }

        if( !businessList[ activeItem ] && !buyOrSell ) {
            const fineAmount = getFineAmount();
            showCheatingAlert( BUSINESS_SCREEN_NOTHING_TO_SALE_CHEATING, fineAmount );
            return;
        }

        if(( cash < businessBuyCostList[ activeItem ] ) && buyOrSell ) {
            const fineAmount = getFineAmount();
            showCheatingAlert( BUSINESS_SCREEN_NO_MONEY_CHEATING, fineAmount );
            return;
        }

        showAnotherDealAlert( buyOrSell );
    }

    const getListBuyOrSale = ( typeOfDeal = false ) => {
        let i = -1;
        const typeOfDealName = ( typeOfDeal ) ? 'продать' : 'купить';
        const businessCostList = ( typeOfDeal ) ? businessSellCostList : businessBuyCostList;
        const businessImageFiles = [ Bar, Restraunt, Shop, Hotel, Plant ];

        const items = businessList.map( element => {
            i++;
            if( element === typeOfDeal ) {
                const activeItemBackgroudColor = ( i === activeItem ) ? THEME.THIRD_BACKGROUND_COLOR : 'rgba(0, 0, 0, .2)';
                return (
                    <Pressable style={ styles.itemContainer } key={ i } onPress={eval( '() => setActiveItem(' + i + ')' )}>
                        <View style={{ ...styles.itemImage, backgroundColor: activeItemBackgroudColor }}>
                            <Image style={ styles.image } resizeMode='center' source={ businessImageFiles[ i ] } />
                        </View>
                        <View style={{ ...styles.itemName, backgroundColor: activeItemBackgroudColor }}>
                            <Text style={ styles.itemText }>{ BUSINESS_LIST[ i ] }</Text>
                            <View style={{ height: hp('1%') }}></View>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>Цена { businessCostList[ i ] }$</Text>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>Годовой доход { businessYearIncome[ i ] }$</Text>
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
        const isSomethingToSale = businessList.indexOf( true );
        if( isSomethingToSale !== -1 ) return getListBuyOrSale( true );
    }

    const listToBuy = () => {
        const isSomethingToBuy = businessList.indexOf( false );
        if( isSomethingToBuy !== -1 ) return getListBuyOrSale();
    }

    return (
        <>  
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <ScrollView style={ styles.container }>
                { listForSale() }
                { listToBuy() }
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