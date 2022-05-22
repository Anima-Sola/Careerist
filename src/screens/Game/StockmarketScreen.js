import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { STOCKS_LIST } from '../../store/constants';
import { setStocksQuantityList, setStocksCostList } from '../../store/actions/actions';
import { getStocksQuantityList, getStocksCostList } from '../../store/selectors';

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

const Stockmarket = ({ navigation }) => {
    const stocksQuantityList = useSelector( getStocksQuantityList );
    const stocksCostList = useSelector( getStocksCostList );
    const [ stocksBuySellQuantity, setStocksBuySellQuantity ] = useState([ 0, 0, 0, 0, 0 ]);

    const updateStocksBuySellQuantity = ( companyId, value ) => {
        let newQty = stocksBuySellQuantity;
        const minQty = 0;
        const maxQty = 100;
        
        if(( newQty[ companyId ] + value ) <= minQty ) { 
            newQty[ companyId ] = minQty;
        } else if(( newQty[ companyId ] + value ) >= maxQty) {
            newQty[ companyId ] = maxQty;
        } else {
            newQty[ companyId ] += value;
        }
        setStocksBuySellQuantity( newQty );
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
                            <Text style={{ ...styles.text, fontFamily: 'nunito-semibold' }}>{ stocksCostList[ i ] }$</Text>
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
                                type="outline" 
                                title="Купить"
                            />
                            <Button
                                buttonStyle={ styles.buySellButton } 
                                titleStyle={ styles.buySellButtonTitle }
                                type="outline" 
                                title="Продать"
                            />
                        </View>
                    </View>
                </View>
            )
        });

        return (
            <>
                <Text style={{ ...styles.text, marginBottom: hp('1.5%') }}>Купить/продать акции:</Text>
                { items }
            </>
        )
    }

    return (
        <ScrollView style={ styles.container }>
            { stocksList() }
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Продолжить"
                    onPress={ () => navigation.navigate('GameMainScreen') }  
                />
            </View>
        </ScrollView>
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
        marginBottom: hp('1%'),
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 10,
    },
    stockInfo: {
        height: hp('7%'),
        flexDirection: 'row',
        marginTop: hp('1%'),
        marginBottom: hp('1%'),     
        /*borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 1*/
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
    buttonContainer: {
        flex: 0.1,
        justifyContent: 'center',
        width: '100%',
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


/*<View style={{ ...styles.itemImage, backgroundColor: activeItemBackgroudColor }}>
                        <Image style={ styles.image } resizeMode='center' source={ logosImageFiles[ i ] } />
                    </View>
                    <View style={{ ...styles.itemData, backgroundColor: activeItemBackgroudColor }}>
                        <View style={ styles.headers }>
                            <Text style={{ ...styles.itemText, fontFamily: 'nunito-light' }}>{ STOCKS_LIST[ i ] }</Text>
                            <View style={{ height: hp('1%') }}></View>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>Имеете:</Text>
                            <View style={{ height: hp('1%') }}></View>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>Дивиденды:</Text>
                        </View>
                        <View style={ styles.data }>
                            <Text style={ styles.itemPrice }>6$</Text>
                            <View style={{ height: hp('1%') }}></View>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>{ stocksQuantity[ i ] }</Text>
                            <View style={{ height: hp('1%') }}></View>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>10%</Text>
                        </View>
                    </View>
                    <View style={ styles.sellBuy }>
                        <Pressable style={{ ...styles.plusMinus, backgroundColor: activeItemBackgroudColor }}>
                            <Text style={ styles.itemText }>+</Text>
                        </Pressable>
                        <Pressable style={ styles.input }>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT35 }}>1000</Text>
                        </Pressable>
                        <Pressable style={{ ...styles.plusMinus, backgroundColor: activeItemBackgroudColor }}>
                            <Text style={ styles.itemText }>-</Text>
                        </Pressable>
                    </View>*/



/*

            const activeItemBackgroudColor = ( i === activeItem ) ? THEME.THIRD_BACKGROUND_COLOR : 'rgba(0, 0, 0, .2)';
            return (
                <Pressable style={ styles.itemContainer } key={ i } onPress={eval( '() => setActiveItem(' + i + ')' )} >
                
                </Pressable>
            )
*/            