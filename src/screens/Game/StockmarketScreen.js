import React, { useState, useReducer } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { STOCKS_LIST } from '../../store/constants';
import { setStocksQuantityList, setAvgStocksCostList } from '../../store/actions/actions';
import { getStocksQuantityList, getAvgStocksCostList } from '../../store/selectors';

import Gazprom from "../../assets/images/logos/gazprom.png";
import Rosneft from "../../assets/images/logos/rosneft.png";
import Lukoil from "../../assets/images/logos/lukoil.png";
import Magnit from "../../assets/images/logos/magnit.png";
import Sber from "../../assets/images/logos/sber.png";

export const StockmarketScreen = ({ navigation }) => {
    const wrappedComponent = <Stockmarket navigation={ navigation } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const setStockPriceList = () => {
    const priceList = [];
    for( let i = 0; i < 5; i++ ) priceList.push( Math.round( 100 * Math.random() ));
    return priceList;
}

const Stockmarket = ({ navigation }) => {
    const dispatch = useDispatch();
    const stocksQuantityList = useSelector( getStocksQuantityList );
    const stocksAvgCostList = useSelector( getAvgStocksCostList );
    const [ currentStocksCostList, ] = useState( setStockPriceList() );
    const [ , forceUpdate ] = useReducer(x => x + 1, 0);
    const [ stocksBuySellQuantity, setStocksBuySellQuantity ] = useState([ 0, 0, 0, 0, 0 ]);
    const [ isButtonsDisabled, setIsButtonsDisabled ] = useState([ true, true, true, true, true ]);

    const updateStocksBuySellQuantity = ( id, value ) => {        
        const buttonsDisabled = isButtonsDisabled;
        let newQty = stocksBuySellQuantity;
        const minQty = 0;
        const maxQty = 100;

        if(( newQty[ id ] + value ) <= minQty ) { 
            newQty[ id ] = minQty;
        } else if(( newQty[ id ] + value ) >= maxQty) {
            newQty[ id ] = maxQty;
        } else {
            newQty[ id ] += value;
        }

        buttonsDisabled[ id ] = ( newQty[ id ] > 0 ) ? false : true;

        setStocksBuySellQuantity( newQty );
        setIsButtonsDisabled( buttonsDisabled );
        forceUpdate();
    }

    const buyStocks = ( id ) => {
        const qty = stocksQuantityList[ id ] + stocksBuySellQuantity[ id ];
        const price = Math.round(( stocksQuantityList[ id ] * stocksAvgCostList[ id ] + stocksBuySellQuantity[ id ] * currentStocksCostList[ id ] ) / qty );
        stocksQuantityList[ id ] = qty;
        stocksAvgCostList[ id ] = price;
        dispatch(setStocksQuantityList( stocksQuantityList ));
        dispatch(setAvgStocksCostList( stocksAvgCostList ));
        navigation.navigate('GameMainScreen');
    }

    const sellStocks = ( id ) => {
        const qty = stocksQuantityList[ id ] - stocksBuySellQuantity[ id ];
        stocksQuantityList[ id ] = qty;
        if( qty === 0 ) stocksAvgCostList[ id ] = 0;
        dispatch(setStocksQuantityList( stocksQuantityList ));
        dispatch(setAvgStocksCostList( stocksAvgCostList ));
        navigation.navigate('GameMainScreen');
    }

    const stocksList = () => {
        let i = -1;
        const logosImageFiles = [ Gazprom, Rosneft, Lukoil, Magnit, Sber ];

        const items = STOCKS_LIST.map( element => {
            i++;
            return (
                <View style={ styles.stockItem } key={ i }>
                    <View style={ styles.stockInfo }>
                        <View style={ styles.stockLogo }>
                            <Image style={ styles.logoImage } resizeMode='center' source={ logosImageFiles[ i ] } />
                        </View>
                        <View style={ styles.stockName }>
                            <Text style={ styles.text }>{ element }</Text>
                        </View>
                        <View style={ styles.stockPrice }>
                            <Text style={{ ...styles.text, fontFamily: 'nunito-semibold' }}>{ currentStocksCostList[ i ] }$</Text>
                        </View>
                    </View>
                    <View style={ styles.stockData }>
                        <View style={ styles.stockQuantity }>
                            <Text style={{ ...styles.text, fontSize: THEME.FONT22 }}>Имеете: { stocksQuantityList[ i ] }</Text>
                        </View>
                        <View style={ styles.stockDividents }>
                            <Text style={{ ...styles.text, fontSize: THEME.FONT22 }}>Дивиденты: 10%</Text>
                        </View>
                    </View>
                    <View style={ styles.stockDeals }>
                        <View style={ styles.incDecButtons }>
                            <Button
                                buttonStyle={ styles.incDecButton } 
                                titleStyle={ styles.incDecButtonTitle }
                                type="outline" 
                                title="-10"
                                onPress={ eval('() => updateStocksBuySellQuantity(' + i + ', -10 )') }
                            />
                            <Button
                                buttonStyle={ styles.incDecButton } 
                                titleStyle={ styles.incDecButtonTitle }
                                type="outline" 
                                title="-1"
                                onPress={ eval('() => updateStocksBuySellQuantity(' + i + ', -1 )') }
                            />
                            <View style={ styles.stocksAmount }>
                                <Text style={ styles.text }>{ stocksBuySellQuantity[ i ] }</Text>
                            </View>
                            <Button
                                buttonStyle={ styles.incDecButton } 
                                titleStyle={ styles.incDecButtonTitle }
                                type="outline" 
                                title="+1"
                                onPress={ eval('() => updateStocksBuySellQuantity(' + i + ', 1 )') }
                            />
                            <Button
                                buttonStyle={ styles.incDecButton } 
                                titleStyle={ styles.incDecButtonTitle }
                                type="outline" 
                                title="+10"
                                onPress={ eval('() => updateStocksBuySellQuantity(' + i + ', 10 )') }
                            />
                        </View>
                        <View style={ styles.buySellButtons }>
                            <Button
                                buttonStyle={ styles.buySellButton } 
                                titleStyle={ styles.buySellButtonTitle }
                                disabledStyle={ styles.buySellButtonDisabledStyle }
                                disabled={ isButtonsDisabled[ i ] }
                                type="outline" 
                                title="Продать"
                                onPress={ eval('() => sellStocks(' + i + ')') }
                            />
                            <Button
                                buttonStyle={ styles.buySellButton } 
                                titleStyle={ styles.buySellButtonTitle }
                                disabledStyle={ styles.buySellButtonDisabledStyle }
                                disabled={ isButtonsDisabled[ i ] }
                                type="outline" 
                                title="Купить"
                                onPress={ eval('() => buyStocks(' + i + ')') }
                            />
                        </View>
                    </View>
                </View>
            )
        });

        return (
            <>
                <Text style={{ ...styles.text, marginBottom: hp('0.5%') }}>Купить/продать акции:</Text>
                { items }
            </>
        )
    }

    return (
        <>
            <ScrollView style={ styles.container }>
                { stocksList() }
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
    stockItem: {
        marginTop: hp('1%'),
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 10,
    },
    stockInfo: {
        height: hp('7%'),
        flexDirection: 'row',
        marginTop: hp('1%'),
        marginBottom: hp('1%'),     
    },
    stockLogo: {
        paddingLeft: 10,
        justifyContent: 'center',
        width: '20%',
    },
    logoImage: {
        height: hp('6%'),
        width: hp('6%')
    },
    stockName: {
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '60%',
    },
    stockPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%',
    },
    stockData: {
        height: hp('5%'),
        flexDirection: 'row',
    },
    stockQuantity: {
        paddingLeft: 10,
    },
    stockDividents: {
        paddingLeft: 20,
    },
    text: {
        color: THEME.TEXT_COLOR,
        textAlign: 'center',
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
    },
    stockDeals: {
        alignItems: 'center',
        marginBottom: hp('1%'), 
    },
    incDecButtons: {
        flexDirection: 'row',
        marginBottom: hp('2%')
    },
    stocksAmount: {
        justifyContent: 'center',
        width: wp('20%'),
    },
    incDecButton: {
        backgroundColor: THEME.FORTH_BACKGROUND_COLOR,
        borderRadius: 5,
        marginLeft: wp('0.5%'),
        marginRight: wp('0.5%'),
        width: wp('17%')
    },
    incDecButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,
    },
    buySellButtons: {
        flexDirection: 'row',
        marginBottom: hp('0.5%')
    },
    buySellButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        borderRadius: wp('10%'),
        marginLeft: wp('1%'),
        marginRight: wp('1%'),
        width: wp('44.5%')
    },
    buySellButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,
    },
    buySellButtonDisabledStyle: {
        backgroundColor: THEME.DISABLED_BUTTON_COLOR,
    },
    buttonContainer: {
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%',
        justifyContent: 'center',
        marginBottom: hp('1%')
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
})