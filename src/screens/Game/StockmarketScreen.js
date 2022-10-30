import React, { useState, useReducer, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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
    setCommonBusinessIncomeAction
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
    STOCKMARKET_SCREEN_STOLE_STOCKS_PROBLEM
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
    const { cash, currentSocialStatus, yearExpense } = commonSettings;
    const { stocksQuantityList, stocksCostList, dividendsIncome } = useSelector( getStockSettings );
    const { commonBusinessIncome } = useSelector( getBusinessSettings );
    const { employeesList } = useSelector( getEmployeesSettings );
    const [ activeItem, setActiveItem ] = useState( 0 );
    const [ currentStocksQuantityList, setCurrentStocksQuantityList ] = useState([ 0, 0, 0, 0, 0 ]);
    const [ isProblem, setIsProblem ] = useState( true );
    const [ prompt, setPrompt ] = useState({
        isVisible: false,
        data: STOCKMARKET_SCREEN_INPUT_STOCKS_QUANTITY,
        value: ''
    });
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: STOCKMARKET_SCREEN_PROBLEM
    })

    const calcstocksCurrentPriceList = () => {
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

    const stocksCurrentPriceList = useRef( calcstocksCurrentPriceList() );
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
                message: message + 'Еще одна сделка?'
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
        let message = '';
        const maxStocksQuantity = stocksCurrentPriceList.current[ activeItem ] * 5 * ( currentSocialStatus + 2 * employeesList[ 0 ] );
        if(( currentStocksQuantityList[ activeItem ] + stocksQuantity - 0.01 ) > maxStocksQuantity ) {
            stocksQuantity = maxStocksQuantity - currentStocksQuantityList[ activeItem ];
            message = `Удалость скупить ${stocksQuantity}.\n`;
            if( stocksQuantity <= 0 ) message = message + 'У нас дураков нет!\n'; 
        }
        stocksQuantityList[ activeItem ] = Math.round( stocksQuantityList[ activeItem ] + 0.01 + stocksQuantity );
        currentStocksQuantityList[ activeItem ] =  currentStocksQuantityList[ activeItem ] + stocksQuantity;
        setCurrentStocksQuantityList( currentStocksQuantityList );
        const updatedCash = cash - stocksCurrentPriceList.current[ activeItem ] * stocksQuantity;
        dispatch(setStocksQuantityListAction( stocksQuantityList ) );
        dispatch(setStocksCostListAction( stocksCurrentPriceList.current ));
        dispatch(setDividendsListAction( stocksDividendsList.current ));
        dispatch(setCashAmountAction( updatedCash ), true );
        forceUpdate();

        //Проверка конец года
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
        stocksQuantityList[ activeItem ] = Math.round( stocksQuantityList[ activeItem ] + 0.01 - stocksQuantity );
        currentStocksQuantityList[ activeItem ] = currentStocksQuantityList[ activeItem ] - stocksQuantity;
        const updatedCash = cash + stocksCurrentPriceList.current[ activeItem ] * stocksQuantity;
        dispatch(setStocksQuantityListAction( stocksQuantityList ) );
        dispatch(setStocksCostListAction( stocksCurrentPriceList.current ));
        dispatch(setDividendsListAction( stocksDividendsList.current ));
        dispatch(setCashAmountAction( updatedCash ), true );
        forceUpdate();

        //Проверка конец года
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
                    setCashAmountMinusFine( loss );
                    dispatch(setStocksCostListAction( stocksCurrentPriceList.current ));
                    setAlert({ ...alert, isVisible: false });
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
                    const chanceToWinClaim = ( Math.random() < 0.5 ) ? -Math.random() : Math.random();
                    if( chanceToWinClaim < 0.65 ) {
                        message = `Сбер выплачивает неустойку ${ 2 * lawyerServiceCost }$.\n` +
                        `Имейте своего адвоката!`;
                        const income = commonBusinessIncome + lawyerServiceCost;
                        dispatch(setCommonBusinessIncomeAction( income ));
                        setTimeout( () => showProblemAlert( message, 0, 'Процесс выигран!', 'hand-peace', 'green' ), 300 );
                        return;
                    }
                    message = `Увы, дело проиграно. Убыток ${ loss }$.\n` +
                    `Имейте своего адвоката!`;
                    dispatch(setYearExpenseAction( yearExpense + loss ));
                    setTimeout(() => showProblemAlert( message, lawyerServiceCost, 'Процесс проигран!', 'sad-cry' ));
                },
                () => {
                    setAlert({ ...alert, isVisible: false });
                    message = `Иск Сбера удовлетворен. Вы потеряли ${ loss }$.`;
                    setTimeout( () => showProblemAlert( message, loss, 'Процесс проигран!', 'sad-cry' ), 300 );
                }
            ]
        })
    }

    const showStoleStocksProblemAlert = ( message, loss, searchServiceCost ) => {
        setAlert({
            isVisible: true, 
            data: { 
                ...STOCKMARKET_SCREEN_STOLE_STOCKS_PROBLEM,
                message
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    
                },
                () => {
                    setAlert({ ...alert, isVisible: false });
                    
                }
            ]
        })
    }

    const createProblem = () => {
        setIsProblem( false );
        let problemIndex = Math.round( 10 * Math.random() );
        let loss = 0;
        let message = '';
        
        problemIndex = 5;

        if( problemIndex === 5 ) {
            for( let i = 0; i < 5; i++ ) loss = loss + stocksCostList[ i ] * stocksQuantityList[ i ];
        } else {
            loss = Math.round(( cash + 200 ) * Math.random() );
        }

        switch ( problemIndex ) {
            case 1:
                if( employeesList[ 0 ] ) return;
                if( dividendsIncome > 0 ) {
                    message = `Вы неправильно оформляли сделки. Убыток ${ loss }$. \n Заведите маклера!`;
                    showProblemAlert( message, loss );
                }
                return;
            case 2:
                if( employeesList[ 1 ] ) return;
                loss = loss + 400;
                message = `Вы забываете о здоровье. Пребывание в больнице обошлось вам в ${ loss }$.`;
                showProblemAlert( message, loss );
                return;
            case 3:
                if( employeesList[ 2 ] ) return;
                const lawyerServiceCost = Math.round( 15 * loss * 0.02 );
                message = `Компания Сбер предъявила иск в ${ loss }$.\n` + 
                `Услуги адвоката \nобойдутся в ${ lawyerServiceCost }$.\n` +
                `Вероятность успеха 65%.\nНанимаете?`;
                showClaimProblemAlert( message, loss, lawyerServiceCost );
                return;
            case 4:
                if( employeesList[ 3 ] ) return;
                message = `Ваш шантажируют, вымогая ${ loss }.\n ` +
                `Придется платить!`;
                showProblemAlert( message, loss );
                return;
            case 5:
                if( employeesList[ 4 ] ) return;
                const rnd = Math.random();
                const searchServiceCost = 10 * ( Math.round( 45 * rnd + 80 + 0.03 * loss ));
                message = `У вас украли все акции.\n` +
                `Убыток ${ loss }$.\n` + 
                `Сыскное бюро предлагает свои услуги за ${ searchServiceCost }$.\n` + 
                `Шанс поимки воров ${ Math.round( 100 * rnd ) }%.\n` + 
                `Договорились?`;
                showStoleStocksProblemAlert( message, loss, searchServiceCost )
                return;
            default:
                return;
        }

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

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            dispatch(setStocksCostListAction( stocksCurrentPriceList.current ));
        })
        return () => backHandler.remove();
    })

    useFocusEffect(() => {
        //Проверка конец года

        if(( stocksQuantityList.indexOf( 0 ) !== -1 ) && isProblem ) createProblem();
    })

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