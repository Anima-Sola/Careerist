import React, { useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { 
    getCommonSettings,
    getBusinessSettings,
    getBankSettings,
} from '../store/selectors';
import { THEME } from '../styles/theme';
import { calcInEstateAmount, calcInStocksAmount } from './CommonFunctions';

const TotalTable = () => {
    const { cash, yearExpense } = useSelector( getCommonSettings );
    const { depositAmount, borrowAmount, borrowPersentages } = useSelector( getBankSettings );
    const { commonBusinessIncome } = useSelector( getBusinessSettings );

    const inStocksAmount = useRef( calcInStocksAmount() );
    const inEstateAmount = useRef( calcInEstateAmount() );

    const showBorrow = () => {
        if( borrowAmount <= 0 ) return;

        return(
            <View style={ styles.row }>
                <View style={ styles.column }>
                    <Text style={ styles.cellText }>Кредит</Text>
                </View>
                <View style={{ ...styles.column, paddingLeft: 50 }}>
                    <Text style={ styles.cellText }>{ Math.floor( borrowAmount + borrowAmount * borrowPersentages )}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={ styles.dataContainer }>
            <View style={ styles.table }>
                <View style={ styles.row }>
                    <View style={ styles.column }>
                        <Text style={ styles.cellText }>В акциях</Text>
                    </View>
                    <View style={{ ...styles.column, paddingLeft: 50 }}>
                        <Text style={ styles.cellText }>{ Math.floor( inStocksAmount.current )}</Text>
                    </View>
                </View>
                <View style={ styles.row }>
                    <View style={ styles.column }>
                        <Text style={ styles.cellText }>Счет в банке</Text>
                    </View>
                    <View style={{ ...styles.column, paddingLeft: 50 }}>
                        <Text style={ styles.cellText }>{ Math.floor( depositAmount )}</Text>
                    </View>
                </View>
                <View style={ styles.row }>
                    <View style={ styles.column }>
                        <Text style={ styles.cellText }>Недвижимость</Text>
                    </View>
                    <View style={{ ...styles.column, paddingLeft: 50 }}>
                        <Text style={ styles.cellText }>{ Math.floor( inEstateAmount.current )}</Text>
                    </View>
                </View>
                <View style={ styles.row }>
                    <View style={ styles.column }>
                        <Text style={ styles.cellText }>Доходы</Text>
                    </View>
                    <View style={{ ...styles.column, paddingLeft: 50 }}>
                        <Text style={ styles.cellText }>{ Math.floor( commonBusinessIncome )}</Text>
                    </View>
                </View>
                <View style={ styles.row }>
                    <View style={ styles.column }>
                        <Text style={ styles.cellText }>Расходы</Text>
                    </View>
                    <View style={{ ...styles.column, paddingLeft: 50 }}>
                        <Text style={ styles.cellText }>{ Math.floor( yearExpense )}</Text>
                    </View>
                </View>
                { showBorrow() }
            </View>
            <View style={{ ...styles.table, borderTopWidth: 0 }}>
                <View style={ styles.row }>
                    <View style={ styles.column }>
                        <Text style={ styles.cellText }>Весь капитал</Text>
                    </View>
                    <View style={{ ...styles.column, paddingLeft: 50 }}>
                        <Text style={ styles.cellText }>
                            { Math.floor( cash + inStocksAmount.current + depositAmount + inEstateAmount.current + commonBusinessIncome - yearExpense )}$
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
    
const styles = StyleSheet.create({
    dataContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: hp('1%'),
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
    },
    table: {
        borderWidth: 1, 
        borderColor: '#fff',
        width: '100%',
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        padding: 10,
        width: '50%'
    },
    cellText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT28,
    },  
});

export default TotalTable;