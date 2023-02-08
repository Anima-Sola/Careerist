import React, { useState, useReducer, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, BackHandler } from 'react-native';
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
    setDividendsListAction,
    setCommonBusinessIncomeAction,

} from '../../store/actions/actions';
import { 
    getCommonSettings, 
    getEmployeesSettings, 
    getStockSettings,
    getBusinessSettings 
} from '../../store/selectors';
import CustomPrompt from '../../components/CustomPrompt';
import CustomAlert from '../../components/CustomAlert';
import { 
    STOCKMARKET_SCREEN_INPUT_STOCKS_QUANTITY,
    STOCKMARKET_SCREEN_NO_MONEY_CHEATING,
    STOCKMARKET_SCREEN_NOTHING_TO_SALE_CHEATING,
    STOCKMARKET_SCREEN_ANOTHER_DEAL,
    STOCKMARKET_SCREEN_PROBLEM,
    STOCKMARKET_SCREEN_CLAIM_PROBLEM,
    STOCKMARKET_SCREEN_STOLE_STOCKS_PROBLEM,
    STOCKMARKET_IS_CLOSED
} from '../../store/constants';
import random, { rndBetweenMinusOneAndOne } from '../../components/Random';
import { INT } from '../../components/CommonFunctions';
import { getFineAmount, setCashAmountMinusFine } from '../../components/CommonFunctions';

import Gazprom from "../../assets/images/logos/gazprom.png";
import Rosneft from "../../assets/images/logos/rosneft.png";
import Lukoil from "../../assets/images/logos/lukoil.png";
import Magnit from "../../assets/images/logos/magnit.png";
import Sber from "../../assets/images/logos/sber.png";
import StockmarketClosedImage from '../../assets/images/stockclosed.png';


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
    const [ isRun, setIsRun ] = useState( false );
    const stocksCurrentPriceList = useRef([]);
    const stocksDividendsList = useRef([]);
    const { cash, currentSocialStatus, yearExpense, posWithinYear, endOfYear } = commonSettings;
    const { stocksQuantityList, stocksCostList } = useSelector( getStockSettings );
    const { commonBusinessIncome } = useSelector( getBusinessSettings );
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
        data: STOCKMARKET_SCREEN_PROBLEM
    })

    useEffect(() => { 
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            dispatch(setDividendsListAction( stocksDividendsList.current ));
            dispatch(setStocksCostListAction( stocksCurrentPriceList.current ), true);
        })
        return () => backHandler.remove();
    })

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
                message: message + 'Еще одна сделка?'
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                },
                () => {
                    dispatch(setDividendsListAction( stocksDividendsList.current ));
                    dispatch(setStocksCostListAction( stocksCurrentPriceList.current ), true);
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showStockmarketIsClosedAlert = () => {
        setAlert({
            isVisible: true, 
            data: STOCKMARKET_IS_CLOSED,
            buttonsCallbacks: [
                () => {
                    dispatch(setDividendsListAction( stocksDividendsList.current ));
                    dispatch(setStocksCostListAction( stocksCurrentPriceList.current ), true);
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const calcStocksData = () => {
        let stocksPrices = [];
        let stocksDividends = [];
        for( let i = 0; i < 5; i++ ) {
            stocksPrices[ i ] = Math.round( 100 * random() );
            stocksDividends[ i ] = ( 20 * random() ).toFixed( 1 );
        }
        return { stocksPrices, stocksDividends }
    }
 
    const setStocksData = () => {
        const stocksData = calcStocksData();
        stocksCurrentPriceList.current = stocksData.stocksPrices;
        stocksDividendsList.current = stocksData.stocksDividends;
    }

    const showProblemAlert = ( message, loss, header = 'Внештатная ситуация!', iconName = "exclamation", iconBackgroundColor = 'red' ) => {
        setAlert({
            isVisible: true, 
            data: { 
                ...STOCKMARKET_SCREEN_PROBLEM,
                message,
                header,
                iconName,
                iconBackgroundColor
            },
            buttonsCallbacks: [
                () => {
                    setStocksData();
                    setCashAmountMinusFine( loss );
                    setAlert({ ...alert, isVisible: false });
                    forceUpdate();
                },
            ]
        })
    }

    const showClaimProblemAlert = ( message, loss, lawyerServiceCost ) => {
        setAlert({
            isVisible: true, 
            data: { 
                ...STOCKMARKET_SCREEN_CLAIM_PROBLEM,
                message
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    const chanceToWinClaim = rndBetweenMinusOneAndOne();
                    if( 0.65 - chanceToWinClaim < 0 ) {
                        message = `Увы, дело проиграно. Убыток ${ loss }$.\n` +
                        `Имейте своего адвоката!`;
                        dispatch(setYearExpenseAction( yearExpense + loss ), true );
                        setTimeout(() => showProblemAlert( message, lawyerServiceCost, 'Процесс проигран!', 'sad-cry' ));
                        return;
                    }
                    message = `Сбер выплачивает неустойку ${ 2 * lawyerServiceCost }$.\n` +
                    `Имейте своего адвоката!`;
                    const income = commonBusinessIncome + lawyerServiceCost;
                    dispatch(setCommonBusinessIncomeAction( income ), true );
                    setTimeout( () => showProblemAlert( message, 0, 'Процесс выигран!', 'hand-peace', 'green' ), 300 );
                },
                () => {
                    setAlert({ ...alert, isVisible: false });
                    message = `Иск Сбера удовлетворен. Вы потеряли ${ loss }$.`;
                    setTimeout( () => showProblemAlert( message, loss, 'Процесс проигран!', 'sad-cry' ), 300 );
                }
            ]
        })
    }

    const showStoleStocksProblemAlert = ( message, searchServiceCost, rnd ) => {
        setAlert({
            isVisible: true, 
            data: { 
                ...STOCKMARKET_SCREEN_STOLE_STOCKS_PROBLEM,
                message
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    const chanceToCatchThieves = rndBetweenMinusOneAndOne();
                    if( chanceToCatchThieves - rnd < 0 ) {
                        dispatch(setYearExpenseAction( yearExpense + searchServiceCost ), true );
                        message = 'Воры пойманы!';
                        setTimeout( () => showProblemAlert( message, 0, 'Успех!', 'hand-peace', 'green' ), 300 );
                        return;
                    }
                    const overheads = Math.floor( 450 * rnd + 800 );
                    message = `Воры покинули нашу страну. Взыскиваем только накладные расходы ${ overheads }$.\n` +
                    `Учтите на будущее!`;
                    dispatch(setYearExpenseAction(yearExpense + overheads));
                    dispatch(setStocksQuantityListAction([ 0, 0, 0, 0, 0 ]), true);
                    setTimeout(() => showProblemAlert(message, 0, 'Провал!'));
                },
                () => {
                    setStocksData();
                    setAlert({ ...alert, isVisible: false });
                    dispatch( setStocksQuantityListAction([ 0, 0, 0, 0, 0 ]), true );
                }
            ]
        })
    }

    const createProblem = ( loss ) => {
        let message = '';

        let problemIndex = INT( 10 * random() );

        if( 5 - problemIndex < 0 ) return;
        if( employeesList[ problemIndex - 1 ] ) return;
        if( problemIndex !== 5 ) loss = Math.floor( ( cash + 200 ) * random() );

        switch ( problemIndex ) {
            case 1:
                message = `Вы неправильно оформляли сделки. Убыток ${ loss }$. \n Заведите маклера!`;
                showProblemAlert( message, loss );
                return;
            case 2:
                loss = loss + 400;
                message = `Вы забываете о здоровье. Пребывание в больнице обошлось вам в ${ loss }$.`;
                showProblemAlert( message, loss );
                return;
            case 3:
                const lawyerServiceCost = 15 * Math.floor( loss * 0.02 );
                message = `Компания Сбер предъявила иск в ${ loss }$.\n` + 
                `Услуги адвоката \nобойдутся в ${ lawyerServiceCost }$.\n` +
                `Вероятность успеха 65%.\nНанимаете?`;
                showClaimProblemAlert( message, loss, lawyerServiceCost );
                return;
            case 4:
                message = `Ваш шантажируют, вымогая ${ loss }.\n ` +
                `Придется платить!`;
                showProblemAlert( message, loss );
                return;
            case 5:
                const rnd = random();
                const searchServiceCost = 10 * ( Math.floor( 45 * rnd + 80 + 0.03 * loss ) );
                message = `У вас украли все акции.\n` +
                `Убыток ${ loss }$.\n` + 
                `Сыскное бюро предлагает свои услуги за ${ searchServiceCost }$.\n` + 
                `Шанс поимки воров ${ Math.floor( 100 * rnd ) }%.\n` + 
                `Договорились?`;
                showStoleStocksProblemAlert( message, searchServiceCost, rnd )
            default:
                return;
        }

    }

    if( !isRun ) {

        setIsRun( true );

        if( posWithinYear < endOfYear ) {
            //calcSubtotals( 0.6 ); Bug in the original game
            let possibleLoss = 0;
            for( let i = 0; i < 5; i++ ) possibleLoss = possibleLoss + stocksCostList[ i ] * stocksQuantityList[ i ];
            ( possibleLoss > 0 ) ? createProblem( possibleLoss ) : setStocksData();
        }
        
    }

    const buyStocks = ( stocksQuantity ) => {
        let message = '';
        const maxStocksQuantity = stocksCurrentPriceList.current[ activeItem ] * 5 * ( currentSocialStatus + 2 * employeesList[ 0 ] );
        if(( currentStocksQuantityList[ activeItem ] + stocksQuantity - 0.01 ) > maxStocksQuantity ) {
            stocksQuantity = maxStocksQuantity - currentStocksQuantityList[ activeItem ];
            message = `Удалость скупить ${stocksQuantity}.\n`;
            if( stocksQuantity <= 0 ) message = message + 'У нас дураков нет!\n'; 
        }
        stocksQuantityList[ activeItem ] = Math.floor( stocksQuantityList[ activeItem ] + 0.01 + stocksQuantity );
        currentStocksQuantityList[ activeItem ] =  currentStocksQuantityList[ activeItem ] + stocksQuantity;
        setCurrentStocksQuantityList( currentStocksQuantityList );
        const updatedCash = cash - stocksCurrentPriceList.current[ activeItem ] * stocksQuantity;
        dispatch(setStocksQuantityListAction( stocksQuantityList ) );
        dispatch(setCashAmountAction( updatedCash ), true );
        forceUpdate();

        if( endOfYear - posWithinYear - 0.1 < 0 ) {
            showStockmarketIsClosedAlert();
            return;
        }

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
                    if( cash < ( stocksQuantity * stocksCurrentPriceList.current[ activeItem ] - 0.01 ) ) {
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

    const sellStocks = ( stocksQuantity ) => {
        let message = '';
        const maxStocksQuantity = ( 105 - stocksCurrentPriceList.current[ activeItem ]) * 5 * ( currentSocialStatus + 2 * employeesList[ 0 ] );
        if(( stocksQuantity - currentStocksQuantityList[ activeItem ] - 0.01 ) > maxStocksQuantity ) {
            stocksQuantity = maxStocksQuantity + currentStocksQuantityList[ activeItem ];
            message = `Удалость реализовать ${stocksQuantity}.\n`;
            if( stocksQuantity <= 0 ) message = message + 'У нас дураков нет!\n';
        }
        stocksQuantityList[ activeItem ] = Math.floor( stocksQuantityList[ activeItem ] + 0.01 - stocksQuantity );
        currentStocksQuantityList[ activeItem ] = currentStocksQuantityList[ activeItem ] - stocksQuantity;
        const updatedCash = cash + stocksCurrentPriceList.current[ activeItem ] * stocksQuantity;
        dispatch(setStocksQuantityListAction( stocksQuantityList ) );
        dispatch(setCashAmountAction( updatedCash ), true );
        forceUpdate();

        if( endOfYear - posWithinYear - 0.1 < 0 ) {
            showStockmarketIsClosedAlert();
            return;
        }

        setTimeout( () => showAnotherDealAlert( message ), 300 );
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
                    setPrompt({ ...prompt, isVisible: false });
                    sellStocks( stocksQuantity );
                },
                () => {
                    setPrompt({ ...prompt, isVisible: false });
                }
            ]
        })
    }

    const trade = ( buyOrSellStocks ) => {
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
                        <Text style={ styles.text }>Цена: { stocksCurrentPriceList.current[ i ] }$</Text>
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

    const stockmarketOpened = () => {
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

    const stockmarketClosed = () => {
        return (
            <>
                <View style={{ ...styles.container, textAlign: 'center', justifyContent: 'center' }} >
                    <Image style={ styles.image } resizeMode='center' source={ StockmarketClosedImage } />
                    <Text style={{ ...styles.text, marginBottom: hp('0.5%'), fontSize: THEME.FONT35 }}>
                        Конец года, биржа закрыта!!!
                    </Text>
                </View>
                <View style={ styles.buttonContainer }>
                    <Button
                        buttonStyle={ styles.button2x } 
                        titleStyle={ styles.buttonTitle }
                        type="outline" 
                        title="Уйти"
                        onPress={ () => navigation.navigate('GameMainScreen') }  
                    />
                </View>
            </>
        )
    }

    return ( posWithinYear < endOfYear ) ? stockmarketOpened() : stockmarketClosed();
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
    image: {
        height: hp('30%'),
        width: hp('30%'),
        alignSelf: 'center',
        marginBottom: hp('4%')
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
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,
    }
})