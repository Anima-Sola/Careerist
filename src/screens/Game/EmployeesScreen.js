import React, { useState, useReducer } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { getCommonSettings, getEmployeesSettings } from '../../store/selectors';
import {
    SOCIAL_STATUSES,
    EMPLOYEES_LIST, 
    EMPLOYEES_SCREEN_TO_HIRE, 
    EMPLOYEES_SCREEN_CONTRACT_IS_CONCLUDED,
    EMPLOYEES_SCREEN_NO_MONEY_CHEATING,
    EMPLOYEES_SCREEN_DONT_BE_FOOL_WARNING,
    EMPLOYEES_SCREEN_NOT_AGREE_TO_PREPAY,
    EMPLOYEES_SCREEN_CONTRACT_TERMINATED,
    EMPLOYEES_SCREEN_CONTRACT_TERMINATED_NO_MONEY
} from '../../store/constants';
import { setCashAmountAction, setEmployeesList, setEmployeesSalaryList, setYearExpenseAction  } from '../../store/actions/actions';
import CustomAlert from '../../components/CustomAlert';
import { rndBetweenMinusOneAndOne } from '../../components/Random';

import Makler from "../../assets/images/employees/makler.png";
import Doctor from "../../assets/images/employees/doctor.png";
import Lawyer from "../../assets/images/employees/lawyer.png";
import Detective from "../../assets/images/employees/detective.png";
import Security from "../../assets/images/employees/security.png";

export const EmployeesScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Employees navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Employees = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const { cash, posWithinYear, endOfYear, currentSocialStatus, yearExpense } = commonSettings;
    const { employeesList, employeesSalaryList } = useSelector( getEmployeesSettings );
    const [ activeItem, setActiveItem ] = useState( 0 );
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: EMPLOYEES_SCREEN_TO_HIRE
    })

    const hireEmployee = ( isPrepayment, prepayment = 0 ) => {
        employeesList[ activeItem ] = true;
        if( isPrepayment ) {
            const updatedCash = cash - prepayment;    
            dispatch(setCashAmountAction( updatedCash ));
        }
        employeesSalaryList[ activeItem ] = employeesSalaryList[ activeItem ] - prepayment;
        dispatch(setEmployeesSalaryList( employeesSalaryList ));
        dispatch(setEmployeesList( employeesList, true ));
        forceUpdate();
    }

    const fireEmployee = () => {
        employeesList[ activeItem ] = false;
        let updatedCash = cash - 2 * employeesSalaryList[ activeItem ];
        if( updatedCash < 0 ) {
            dispatch(setYearExpenseAction( yearExpense - updatedCash ));
            updatedCash = 0;
        }
        dispatch(setCashAmountAction( updatedCash ));
        dispatch(setEmployeesList( employeesList, true ));
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
        const value = rndBetweenMinusOneAndOne();
        return 1500 + 50 * Math.floor( 10 * value );
    }

    const showDontBeFoolAlert = () => {
        setAlert({ 
            isVisible: true, 
            data: { 
                ...EMPLOYEES_SCREEN_DONT_BE_FOOL_WARNING, 
                header: `Не глупите ${ SOCIAL_STATUSES[ currentSocialStatus ].toLowerCase() }!` 
            },
            buttonsCallbacks: [
                () => {
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showNotAgreeToPrepayAlert = () => {
        setAlert({ 
            isVisible: true, 
            data: EMPLOYEES_SCREEN_NOT_AGREE_TO_PREPAY,
            buttonsCallbacks: [
                () => {
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showCheatingAlert = ( fineAmount ) => {
        setAlert({ 
            isVisible: true, 
            data: { ...EMPLOYEES_SCREEN_NO_MONEY_CHEATING, message: `За мошенничество штраф ${ fineAmount }$` },
            buttonsCallbacks: [
                () => {
                    setCashAmountMinusFine( fineAmount );
                    setAlert({ ...alert, isVisible: false });
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showContractIsConcludedAlert = () => {
        setAlert({
            ...alert,
            isVisible: true,
            data: EMPLOYEES_SCREEN_CONTRACT_IS_CONCLUDED,
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                },
                () => {
                    setAlert({ ...alert, isVisible: false });
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showHireEmployeeWithPrepaymentAlert = ( prepayment ) => {
        setAlert({
            ...alert,
            isVisible: true,
            data: { 
                ...EMPLOYEES_SCREEN_TO_HIRE, 
                header: `Наем ${ EMPLOYEES_LIST[ activeItem ].toLowerCase() }. Аванс ${ prepayment }.` },
                buttonsCallbacks: [
                    () => {
                        setAlert({ ...alert, isVisible: false });
                        if( cash < prepayment) {
                            const fineAmount = getFineAmount();
                            setTimeout(() => showCheatingAlert( fineAmount ), 300);
                            return;
                        }
                        hireEmployee( true, prepayment );
                        setTimeout(() => showContractIsConcludedAlert(), 300);
                    },
                    () => {
                        setAlert({ ...alert, isVisible: false });
                        setTimeout(() => showNotAgreeToPrepayAlert(), 300);
                    }
                ]
        })
    }

    const showContractTerminatedAlertNoMoney = () => {
        setAlert({
            ...alert,
            isVisible: true,
            data: EMPLOYEES_SCREEN_CONTRACT_TERMINATED_NO_MONEY,
            buttonsCallbacks: [
                () => {
                    navigation.navigate('GameMainScreen');
                },
            ]
        })
    }

    const showContractTerminatedAlert = () => {
        setAlert({
            ...alert,
            isVisible: true,
            data: EMPLOYEES_SCREEN_CONTRACT_TERMINATED,
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

    const HR = ( hireOrFire ) => {

        if( employeesList[ activeItem ] && hireOrFire ) {
            showDontBeFoolAlert();
            return;
        }

        if( !employeesList[ activeItem ] && !hireOrFire ) {
            showDontBeFoolAlert();
            return;
        }
        
        if( hireOrFire ) {
            const restOfTheYear = Math.floor( ( 1 - posWithinYear / endOfYear ) * employeesSalaryList[ activeItem ] * 0.01 );
            
            if( restOfTheYear <= 0 ) {
                hireEmployee( false );
                showContractIsConcludedAlert( false );
            } else {
                const prepayment = 50 * restOfTheYear;
                showHireEmployeeWithPrepaymentAlert( prepayment );
            }
            return;
        }

        const penaltyAmount = 2 * employeesSalaryList[ activeItem ];
        if(( cash - penaltyAmount ) <= 0 ) {
            fireEmployee();
            showContractTerminatedAlertNoMoney();
            return;
        }

        fireEmployee();  
        showContractTerminatedAlert();
    }

    const getListHireOrFire = ( typeOfDeal = false ) => {
        let i = -1;
        const typeOfDealName = ( typeOfDeal ) ? 'уволить' : 'нанять';
        const hireOrFire = ( typeOfDeal ) ? 'Неустойка за увольнение' : 'Зарплата в год';
        const penaltyMultiplier = ( typeOfDeal ) ? 2 : 1;
        const employeesImageFiles = [ Makler, Doctor, Lawyer, Detective, Security ];

        const items = employeesList.map( element => {
            i++;
            if( element === typeOfDeal ) {
                const activeItemBackgroudColor = ( i === activeItem ) ? THEME.THIRD_BACKGROUND_COLOR : 'rgba(0, 0, 0, .2)';
                return (
                    <Pressable style={ styles.itemContainer } key={ i } onPress={eval( '() => setActiveItem(' + i + ')' )}>
                        <View style={{ ...styles.itemImage, backgroundColor: activeItemBackgroudColor }}>
                            <Image style={ styles.image } resizeMode='center' source={ employeesImageFiles[ i ] } />
                        </View>
                        <View style={{ ...styles.itemName, backgroundColor: activeItemBackgroudColor }}>
                            <Text style={ styles.itemText }>{ EMPLOYEES_LIST[ i ] }</Text>
                            <View style={{ height: hp('1%') }}></View>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>{ hireOrFire } { penaltyMultiplier * employeesSalaryList[ i ] }$</Text>
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

    const listToFire = () => {
        const isSomethingToFire = employeesList.indexOf( true );
        if( isSomethingToFire !== -1 ) return getListHireOrFire( true );
    }

    const listToHire = () => {
        const isSomethingToHire = employeesList.indexOf( false );
        if( isSomethingToHire !== -1 ) return getListHireOrFire();
    }

    return (
        <View style={ styles.wrapper }>
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <ScrollView style={ styles.container }>
                { listToFire() }
                { listToHire() }
            </ScrollView>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.hireButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Нанять"
                    onPress={ () => HR( true ) }
                />
                <Button
                    buttonStyle={ styles.fireButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уволить"
                    onPress={ () => HR( false ) }  
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        marginBottom: hp('1%'),
        marginTop: hp('1%'),
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR
    },
    container: {
        flex: 1,
        width: '96%',
        alignSelf: 'center',
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
        textAlign: 'center'
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
    hireButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        height: hp('7%'),
        borderRadius: wp('10%'),
        width: wp('46%'),
        marginRight: 5
    },  
    fireButton: {
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