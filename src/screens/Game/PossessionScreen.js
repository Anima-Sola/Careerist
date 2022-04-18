import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { getPossessionList, getPossessionPriceList } from '../../store/selectors';
import { POSSESSION_LIST } from '../../store/constants';
import { setPossessionList, setPossessionPriceList } from '../../store/actions/actions';

export const PossessionScreen = ({ navigation }) => {
    const wrappedComponent = <Possession navigation={ navigation } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const Possession = ({ navigation }) => {
    const dispatch = useDispatch();
    const possessionList = useSelector( getPossessionList );
    const possessionPriceList = useSelector( getPossessionPriceList );
    const [ activeItem, setActiveItem ] = useState( 0 );

    const getListBuyOrSale = ( typeOfDeal = false ) => {
        let i = -1;
        const typeOfDealName = ( typeOfDeal ) ? 'продать' : 'купить';

        const items = possessionList.map( element => {
            i++;
            if( element === typeOfDeal ) {
                return (
                    <View style={ styles.itemContainer } key={ i } >
                        <View style={ styles.itemTitle }>
                            <Text style={ styles.itemText }>{ POSSESSION_LIST[ i ] }</Text>
                        </View>
                        <View style={ styles.itemCost }>
                            <Text style={ styles.itemText }>{ possessionPriceList[ i ] }$</Text>
                        </View>
                    </View>
                )
            }
        });

        return (
            <View style={ styles.itemsListContainer }>
                <Text style={ styles.text }>Вы можете { typeOfDealName }:</Text>
                { items }
            </View>
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
               <Text style={ styles.text }>Расходы на содержание 45% стоимости в год</Text>
            </View>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.buyButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Купить"
                    onPress={ () => { 
                        dispatch( setPossessionList([true, true, false, true, false]) );
                        dispatch( setPossessionPriceList([ 0, 2000, 10000, 100000, 0 ]) );
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
                        dispatch( setPossessionPriceList([ 0, 2000, 0, 100000, 0 ]) );
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
        marginTop: 10,
    },
    itemsListContainer: {
        width:'100%'
    },
    itemContainer: {
        width:'100%',
        flexDirection: 'row',
        height: THEME.SCREEN_HEIGHT / 10,
        marginBottom: 15
    },
    itemTitle: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        width: '60%'
    },  
    itemCost: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        width: '40%'
    },  
    itemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT20,
        paddingLeft: 15
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT20,
        textAlign: 'center',
        marginBottom: 20
    },
    buttonContainer: {
        flex: 0.1,
        alignItems: 'center',
        width:'100%',
        flexDirection: 'row'
    },
    buyButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        height: 50,
        borderRadius: 25,
        width: THEME.SCREEN_WIDTH / 2 - 25,
        marginRight: 5
    },  
    sellButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: THEME.SCREEN_WIDTH / 2 - 25,
        height: 50,
        borderRadius: 25,
        marginLeft: 5
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT17,
    }
})