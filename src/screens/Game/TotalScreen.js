import React, { useState, useRef, useReducer } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from "@react-navigation/native";
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { 
    getCommonSettings,
    getPossessionSettings,
    getEmployeesSettings,
    getBusinessSettings,
    getBankSettings,
    getStockSettings
} from '../../store/selectors';
import { THEME } from '../../styles/theme';
import { 
    SOCIAL_STATUSES,
    POSSESSION_LIST,
    EMPLOYEES_LIST,
    BUSINESS_LIST,
    TOTAL_SCREEN_VARGANCY,
    TOTAL_SCREEN_GREED
} from "../../store/constants";
import { 
    setCommonBusinessIncomeAction,
    setYearExpenseAction,
    setPlayerAgeAction,
    setYearsPassedAction,
    setCashAmountAction
} from '../../store/actions/actions';
import GameWrapper from '../../components/GameWrapper';
import CustomAlert from '../../components/CustomAlert';
import TotalTable from '../../components/TotalTable';
import random from '../../components/Random';

export const TotalScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Total navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings }/>

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Total = ({ navigation, forceUpdate }) => {
    const dispatch = useDispatch();
    const { cash, year, currentSocialStatus, yearExpense, playerAge, yearsPassed } = useSelector( getCommonSettings );
    const { possessionList } = useSelector( getPossessionSettings );
    const { commonBusinessIncome, businessList } = useSelector( getBusinessSettings );
    const { employeesList } = useSelector( getEmployeesSettings );
    const { insuredPossessionList, insurancePossessionCostList, insurancePossessionTermList } = useSelector( getBankSettings );
    const { dividendsList, stocksCostList } = useSelector( getStockSettings );
    const [ alert, setAlert ] = useState({ isVisible: false, data: TOTAL_SCREEN_VARGANCY });
    const totalCash = useRef( cash );

    const calcVargancyFine = () => {
        const vargancyFine = 1000 + 20 * Math.floor( random() * totalCash.current / 19 );
        totalCash.current = totalCash.current - vargancyFine;
        return vargancyFine;
    }

    const calcGreedFine = () => {
        const greenFine = 1000 + 25 * Math.floor( random()  * totalCash.current / 23 );
        totalCash.current = totalCash.current - greenFine;
        return greenFine;
    }

    useFocusEffect(() => {
        let insuranseExpense = 0;
        let dividendsIncome = 0;
        for( let i = 0; i < 5; i++ ) {
            if( insuredPossessionList[ i ] ) insuranseExpense = insuranseExpense  + 0.5 * insurancePossessionCostList[ i ];
            if( insurancePossessionTermList[ i ] <= 0 ) insuredPossessionList[ i ] = false;
            dividendsIncome = dividendsIncome + dividendsList[ i ] * stocksCostList[ i ];
        }
        dispatch(setCommonBusinessIncomeAction( commonBusinessIncome + dividendsIncome ));
        dispatch(setYearExpenseAction( yearExpense + insuranseExpense ), true);
    })

    const showCurrentSocialStatus = () => {
        return (
            <View style={ styles.dataContainer }>
                <Text style={{ ...styles.text, marginBottom: hp('1%') }}>
                    В настоящее время вы { SOCIAL_STATUSES[ currentSocialStatus - 1 ].toLowerCase() }
                </Text>
            </View> 
        )
    }

    const showAsset = ( list, listNames, text ) => {
        if( list.indexOf( true ) === -1 ) return;

        let i = -1;

        const items = list.map( element => {
            i++;
            if( element ) {
                return (
                    <Text key={ i } style={{ ...styles.text, marginBottom: hp('1%') }}>{ listNames[ i ] }</Text>
                )
            }
        })

        return (
            <>
                <Text style={{ ...styles.fatText, marginBottom: hp('2%') }}>{ text }</Text>
                <View style={ styles.dataContainer }>
                    { items }
                </View>
            </>
        )
    }

    const checkDeficitOfMoney = () => {
        forceUpdate();
        totalCash.current = totalCash.current + commonBusinessIncome - yearExpense;
        
        if( totalCash.current < 0 ) {
            console.log('У Вас дефицит средств ' + totalCash.current);
        } else {
            console.log('123');
            dispatch(setCashAmountAction( totalCash.current ));
            dispatch(setPlayerAgeAction( playerAge + 1 ));
            dispatch(setYearsPassedAction( yearsPassed + 1 ), true );
            navigation.navigate('GameMainScreen');
        }

    }

    const showGreedAlert = ( greenFine ) => {
        setAlert({
            ...alert,
            isVisible: true,
            data: {
                ...TOTAL_SCREEN_GREED,
                message: `Штраф налогового управления ${ greenFine }$ за жмотничество`
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    checkDeficitOfMoney();
                }
            ]
        })
    }

    const showVargancyAlert = ( toPayOrNotToPay, vargancyFine ) => {
        setAlert({
            ...alert,
            isVisible: true,
            data: {
                ...TOTAL_SCREEN_VARGANCY,
                message: `За бродяжничество штраф ${ vargancyFine }$.\nВам все ясно?`
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    if( !toPayOrNotToPay ) {
                        setTimeout(() => showGreedAlert( calcGreedFine(), 300 ));
                        return;
                    }
                    checkDeficitOfMoney();
                }
            ]
        })
    }

    const payExpenses = ( toPayOrNotToPay ) => {
        
        if( !possessionList[ 0 ] && !possessionList[ 2 ]) {
            showVargancyAlert( toPayOrNotToPay, calcVargancyFine() );
            return;
        }

        if( !toPayOrNotToPay ) {
            showGreedAlert( calcGreedFine() );
            return;
        }

        checkDeficitOfMoney();

    }

    return (
        <>
            <ScrollView style={ styles.container }>
                <CustomAlert alert={ alert } setAlert={ setAlert } />
                <Text style={ styles.fatText }>Закончился { year + yearsPassed } год.</Text>
                <Text style={{ ...styles.fatText, marginBottom: hp('2%') }}>Подведем итоги:</Text>
                { showCurrentSocialStatus() }
                { showAsset( possessionList, POSSESSION_LIST, 'Вы имеете:' ) }
                { showAsset( employeesList, EMPLOYEES_LIST, 'Вы оплачиваете:'  ) }
                { showAsset( businessList, BUSINESS_LIST, 'В вашем владении:'  ) }
                <Text style={{ ...styles.text, marginBottom: hp('1%') }}>Наличные средства { Math.floor( 0.01 + cash ) }$</Text>
                <TotalTable />
                <Text style={{ ...styles.text, marginBottom: hp('2%'), marginTop: hp('2%') }}>Оплачиваем расходы?</Text>
            </ScrollView>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.payButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Да"
                    onPress={ () => payExpenses( true ) }    
                />
                <Button
                    buttonStyle={ styles.notPayButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Нет"
                    onPress={ () => payExpenses( false ) }   
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
    dataContainer: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        paddingTop: hp('1%'),
        paddingBottom: hp('1%'),
        marginBottom: hp('1%')
    },  
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
    },
    fatText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
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
    buttonsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('1%')
    },
    payButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        height: hp('7%'),
        borderRadius: wp('10%'),
        width: wp('46%'),
        marginRight: 5
    },  
    notPayButton: {
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
});