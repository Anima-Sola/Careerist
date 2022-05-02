import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { getPossessionList, getPossessionCostList } from '../../store/selectors';
import { POSSESSION_LIST } from '../../store/constants';
import { setPossessionList, setPossessionCostList } from '../../store/actions/actions';

export const PossessionScreen = ({ navigation }) => {
    const wrappedComponent = <Possession navigation={ navigation } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const Possession = ({ navigation }) => {
    const dispatch = useDispatch();
    const possessionList = useSelector( getPossessionList );
    const possessionCostList = useSelector( getPossessionCostList );
    const [ activeItem, setActiveItem ] = useState( 0 );

    const getListBuyOrSale = ( typeOfDeal = false ) => {
        let i = -1;
        const typeOfDealName = ( typeOfDeal ) ? 'продать' : 'купить';

        const items = possessionList.map( element => {
            i++;
            if( element === typeOfDeal ) {
                const activeItemBackgroudColor = ( i === activeItem ) ? THEME.THIRD_BACKGROUND_COLOR : 'rgba(0, 0, 0, .2)';
                return (
                    <Pressable style={ styles.itemContainer } key={ i } onPress={eval( '() => setActiveItem(' + i + ')' )}>
                        <View style={{ ...styles.itemTitle, backgroundColor: activeItemBackgroudColor }}>
                            <Text style={ styles.itemText }>{ POSSESSION_LIST[ i ] }</Text>
                        </View>
                        <View style={{ ...styles.itemCost, backgroundColor: activeItemBackgroudColor }}>
                            <Text style={ styles.itemText }>{ possessionCostList[ i ] }$</Text>
                        </View>
                    </Pressable>
                )
            }
        });

        return (
            <>
                <View style={{ height: hp('7%'), justifyContent: 'center' }}>
                    <Text style={ styles.text }>Вы можете { typeOfDealName }:</Text>
                </View>
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
        <View style={ styles.container }>
            <View style={ styles.dataContainer }>
               { listForSale() }
               { listToBuy() }
               <View style={{ height: hp('10%'), justifyContent: 'center' }}>
                    <Text style={ styles.text }>Расходы на содержание 45% стоимости в год</Text>
               </View>
            </View>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.buyButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Купить"
                    onPress={ () => { 
                        dispatch( setPossessionList([true, true, false, true, false]) );
                        dispatch( setPossessionCostList([ 0, 2000, 10000, 100000, 0 ]) );
                        navigation.navigate('GameMainScreen');
                    }}    
                />
                <Button
                    buttonStyle={ styles.sellButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Продать"
                    onPress={ () => { 
                        dispatch( setPossessionList([false, false, false, false, false]) );
                        dispatch( setPossessionCostList([ 0, 2000, 0, 100000, 0 ]) );
                        navigation.navigate('GameMainScreen');
                    }}   
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    dataContainer: {
        flex: 0.9,
        alignItems: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        height: hp('10%'),
    },
    itemTitle: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        width: '60%',
        marginBottom: hp('1.5%')
    },  
    itemCost: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        width: '40%',
        marginBottom: hp('1.5%')
    },  
    itemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: hp('3%'),
        paddingLeft: 15
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: hp('3.5%'),
        textAlign: 'center',
    },
    buttonsContainer: {
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buyButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        height: 50,
        borderRadius: 25,
        width: wp('43%'),
        marginRight: 5
    },  
    sellButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: wp('43%'),
        height: 50,
        borderRadius: 25,
        marginLeft: 5
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: hp('2.5%'),
    }
})