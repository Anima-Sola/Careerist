import React, { useState, useReducer, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { STOCKS_LIST } from '../../store/constants';
import { 
    setCashAmountAction,
    setYearExpenseAction,
    setStocksQuantityListAction, 
    setStocksCostListAction,
    setDividendsListAction 
} from '../../store/actions/actions';
import { 
    getCommonSettings, 
    getEmployeesSettings, 
    getStockSettings 
} from '../../store/selectors';
import CustomPrompt from '../../components/CustomPrompt';
import CustomAlert from '../../components/CustomAlert';
import { 
    STOCKMARKET_SCREEN_INPUT_STOCKS_QUANTITY,
    STOCKMARKET_SCREEN_NO_MONEY_CHEATING,
    STOCKMARKET_SCREEN_NOTHING_TO_SALE_CHEATING,
    STOCKMARKET_SCREEN_ANOTHER_DEAL 
} from '../../store/constants';

import Gazprom from "../../assets/images/logos/gazprom.png";
import Rosneft from "../../assets/images/logos/rosneft.png";
import Lukoil from "../../assets/images/logos/lukoil.png";
import Magnit from "../../assets/images/logos/magnit.png";
import Sber from "../../assets/images/logos/sber.png";

export const StockmarketScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Stockmarket navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Stockmarket = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const { cash, currentSocialStatus, yearOutcome } = commonSettings;
    const { stocksQuantityList } = useSelector( getStockSettings );
    const { employeesList } = useSelector( getEmployeesSettings );
    const [ activeItem, setActiveItem ] = useState( 0 );
    const [ currentStocksQuantityList, setCurrentStocksQuantityList ] = useState([ 0, 0, 0, 0, 0 ]);
    const [ prompt, setPrompt ] = useState({
        isVisible: false,
        data: STOCKMARKET_SCREEN_INPUT_STOCKS_QUANTITY,
        value: ''
    });
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: STOCKMARKET_SCREEN_NO_MONEY_CHEATING
    })

    const calcStocksPriceList = () => {
        const list = [];
        for( let i = 0; i < 5; i++ ) {
            const rnd = Math.random();
            list[ i ] = Math.round( 100 * rnd );            
        }
        return list;
    }

    const calcStocksDividendsList = () => {
        const list = [];
        for( let i = 0; i < 5; i++ ) {
            const rnd = Math.random();
            list[ i ] = +(20 * rnd).toFixed(1);            
        }
        return list;
    }

    const stocksPriceList = useRef( calcStocksPriceList() );
    const stocksDividendsList = useRef( calcStocksDividendsList() );

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
        const value = ( Math.random() < 0.5 ) ? -Math.random() : Math.random();
        return 1500 + 50 * Math.round( 10 * value );
    }

    const showCheatingAlert = ( alertData, fineAmount ) => {
        setAlert({ 
            isVisible: true, 
            data: { 
                ...alertData, 
                message: `За мошенничество штраф ${ fineAmount }$. \n Учтите на будущее!` 
            },
            buttonsCallbacks: [
                () => {
                    setCashAmountMinusFine( fineAmount );
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showAnotherDealAlert = ( message ) => {
        setAlert({
            isVisible: true, 
            data: { 
                ...STOCKMARKET_SCREEN_ANOTHER_DEAL,
                message: message + ' \n Еще одна сделка?'
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                },
                () => {
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const buyStocks = ( stocksQuantity ) => {
        const maxStocksQuantity = stocksPriceList.current[ activeItem ] * 5 * ( currentSocialStatus + 2 * employeesList[ 0 ] );
        console.log(stocksQuantity, currentStocksQuantityList[ activeItem ]);
        if(( currentStocksQuantityList[ activeItem ] + stocksQuantity - 0.01 ) > maxStocksQuantity ) {
            stocksQuantity = maxStocksQuantity - currentStocksQuantityList[ activeItem ]; 
        }
        stocksQuantityList[ activeItem ] = Math.round( stocksQuantityList[ activeItem ] + 0.01 + stocksQuantity );
        currentStocksQuantityList[ activeItem ] =  currentStocksQuantityList[ activeItem ] + stocksQuantity;
        setCurrentStocksQuantityList( currentStocksQuantityList );
        const updatedCash = cash - stocksPriceList.current[ activeItem ] * stocksQuantity;
        dispatch(setStocksQuantityListAction( stocksQuantityList ) );
        dispatch(setStocksCostListAction( stocksPriceList.current ));
        dispatch(setDividendsListAction( stocksDividendsList.current ));
        dispatch(setCashAmountAction( updatedCash ), true );
        forceUpdate();

        let message = `Удалость скупить ${stocksQuantity}.`;
        if( stocksQuantity === 0 ) message = message + ' \n У нас дураков нет!';

        setTimeout( () => showAnotherDealAlert( message ), 300 );
    }

    const showInputStocksBuyQuantityPrompt = () => {
        setPrompt({
            ...prompt,
            isVisible: true,
            data: {
                ...STOCKMARKET_SCREEN_INPUT_STOCKS_QUANTITY,
                header: 'Покупка акций'
            },
            value: '',
            buttonsCallbacks: [
                ( stocksQuantity ) => {
                    if( cash < ( stocksQuantity * stocksPriceList.current[ activeItem ] - 0.01 ) ) {
                        const fineAmount = getFineAmount();
                        setPrompt({ ...prompt, isVisible: false })
                        setTimeout( () => showCheatingAlert( STOCKMARKET_SCREEN_NO_MONEY_CHEATING, fineAmount ), 300);
                        return;
                    }
                    setPrompt({ ...prompt, isVisible: false });
                    buyStocks( stocksQuantity );
                },
                () => {
                    setPrompt({ ...prompt, isVisible: false })
                }
            ]
        })
    }

    const showInputStocksSellQuantityPrompt = () => {
        setPrompt({
            ...prompt,
            isVisible: true,
            data: {
                ...STOCKMARKET_SCREEN_INPUT_STOCKS_QUANTITY,
                header: 'Продажа акций'
            },
            value: '',
            buttonsCallbacks: [
                ( stocksQuantity ) => {
                    if(( stocksQuantityList[ activeItem] + 0.01 ) < stocksQuantity) {
                        const fineAmount = getFineAmount();
                        setPrompt({ ...prompt, isVisible: false })
                        setTimeout( () => showCheatingAlert( STOCKMARKET_SCREEN_NOTHING_TO_SALE_CHEATING, fineAmount ), 300 );
                        return;
                    }
                    setPrompt({ ...prompt, isVisible: false })
                },
                () => {
                    setPrompt({ ...prompt, isVisible: false })
                }
            ]
        })
    }

    const trade = ( buyOrSellStocks ) => {
        //todo Создание проблем 
        

        if( buyOrSellStocks ) {
            showInputStocksBuyQuantityPrompt();
            return;
        }

        showInputStocksSellQuantityPrompt();
    }

    const stocksList = () => {
        let i = -1;
        const logosImageFiles = [ Gazprom, Rosneft, Lukoil, Magnit, Sber ];

        const items = STOCKS_LIST.map( element => {
            i++;
            const activeItemBackgroudColor = ( i === activeItem ) ? THEME.THIRD_BACKGROUND_COLOR : 'rgba(0, 0, 0, .2)';
            return (
                <Pressable style={{ ...styles.stockItem, backgroundColor: activeItemBackgroudColor }} key={ i } onPress={ eval( '() => setActiveItem(' + i + ')' ) }>
                    <View style={ styles.stockInfo }>
                        <Image style={ styles.logoImage } resizeMode='center' source={ logosImageFiles[ i ] } />
                        <Text style={{ ...styles.text, fontSize: THEME.FONT35 }}>{ element }</Text>
                    </View>
                    <View style={ styles.stockData }>
                        <Text style={ styles.text }>Имеете: { stocksQuantityList[ i ] }</Text>
                        <Text style={ styles.text }>Цена: { stocksPriceList.current[ i ] }$</Text>
                        <Text style={ styles.text }>Дивиденды: { stocksDividendsList.current[ i ] }%</Text>
                    </View>
                </Pressable>
            )
        });

        return (
            <>
                <Text style={{ ...styles.text, marginBottom: hp('0.5%'), fontSize: THEME.FONT35 }}>Купить/продать акции:</Text>
                { items }
            </>
        )
    }

    return (
        <>
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <CustomPrompt prompt={ prompt } setPrompt={ setPrompt }/>
            <ScrollView style={ styles.container }>
                { stocksList() }
            </ScrollView>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Купить"
                    onPress={ () => trade( true ) }  
                />
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Продать"
                    onPress={ () => trade( false ) }  
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
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 10,
        height: hp('15%'),
    },
    stockInfo: {
        width: wp('40%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp('1%')
    },
    logoImage: {
        height: hp('7%'),
        width: hp('7%')
    },
    stockData: {
        width: wp('56%'),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    text: {
        color: THEME.TEXT_COLOR,
        textAlign: 'center',
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT30,
    },
    buttonContainer: {
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%',
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
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,
    }
})


/*

import React, { useState, useReducer } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { STOCKS_LIST } from '../../store/constants';
import { setStocksQuantityListAction, setAvgStocksCostListAction } from '../../store/actions/actions';
import { getCommonSettings, getStockSettings } from '../../store/selectors';

import Gazprom from "../../assets/images/logos/gazprom.png";
import Rosneft from "../../assets/images/logos/rosneft.png";
import Lukoil from "../../assets/images/logos/lukoil.png";
import Magnit from "../../assets/images/logos/magnit.png";
import Sber from "../../assets/images/logos/sber.png";

export const StockmarketScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Stockmarket navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const setStockPriceList = () => {
    const priceList = [];
    for( let i = 0; i < 5; i++ ) priceList.push( Math.round( 100 * Math.random() ));
    return priceList;
}

const Stockmarket = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const { stocksQuantityList, avgStocksCostList } = useSelector( getStockSettings );
    const [ currentStocksCostList, ] = useState( setStockPriceList() );
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
        avgStocksCostList[ id ] = price;
        dispatch(setStocksQuantityListAction( stocksQuantityList ));
        dispatch(setAvgStocksCostListAction( stocksAvgCostList, true ));
        navigation.navigate('GameMainScreen');
    }

    const sellStocks = ( id ) => {
        const qty = stocksQuantityList[ id ] - stocksBuySellQuantity[ id ];
        stocksQuantityList[ id ] = qty;
        if( qty === 0 ) avgStocksCostList[ id ] = 0;
        dispatch(setStocksQuantityListAction( stocksQuantityList ));
        dispatch(setAvgStocksCostListAction( avgStocksCostList, true ));
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
                                title="Купить"
                                onPress={ eval('() => buyStocks(' + i + ')') }
                            />
                            <Button
                                buttonStyle={ styles.buySellButton } 
                                titleStyle={ styles.buySellButtonTitle }
                                disabledStyle={ styles.buySellButtonDisabledStyle }
                                disabled={ isButtonsDisabled[ i ] }
                                type="outline" 
                                title="Продать"
                                onPress={ eval('() => sellStocks(' + i + ')') }
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

*/