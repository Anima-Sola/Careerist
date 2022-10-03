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
    EMPLOYEES_SCREEN_NOT_AGREED,
    EMPLOYEES_SCREEN_TERMINATE_CONTRACT
} from '../../store/constants';
import { setCashAmountAction, setEmployeesList, setEmployeesSalaryList /*, setEmployeesFirePenaltyList*/ } from '../../store/actions/actions';
import CustomAlert from '../../components/CustomAlert';

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
    const { cash, posWithinYear, endOfYear, currentSocialStatus } = commonSettings;
    const { employeesList, employeesSalaryList /*, employeesFirePenaltyList*/ } = useSelector( getEmployeesSettings );
    const [ activeItem, setActiveItem ] = useState( 0 );
    const [ hireOrFireFlag, setHireOrFireFlag ] = useState( true );
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: EMPLOYEES_SCREEN_TO_HIRE,
    })

    const foolishness = () => {
        setAlert({ 
            isVisible: true, 
            data: { ...EMPLOYEES_SCREEN_DONT_BE_FOOL_WARNING, header: `Не глупите ${ SOCIAL_STATUSES[ currentSocialStatus ].toLowerCase() }!` },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const notAgreed = () => {
        setAlert({ 
            isVisible: true, 
            data: EMPLOYEES_SCREEN_NOT_AGREED,
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const penalty = ( penaltyAmount ) => {
        let updatedCash = cash - penaltyAmount;
        if( updatedCash < 0 ) updatedCash = 0;
        dispatch(setCashAmountAction( updatedCash, true ));
        forceUpdate();
    }

    const cheating = ( alertData ) => {
        const value = ( Math.random() < 0.5 ) ? -Math.random() : Math.random();
        const penaltyAmount = 1500 + 50 * Math.round( 10 * value );

        setAlert({ 
            isVisible: true, 
            data: { ...alertData, message: `За мошенничество штраф ${ penaltyAmount }$` },
            buttonsCallbacks: [
                () => {
                    penalty( penaltyAmount );
                    setAlert({ ...alert, isVisible: false });
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const hireEmployee = ( isPrepayment, prepayment = 0 ) => {
        employeesList[ activeItem ] = hireOrFireFlag;
        if( isPrepayment ) {
            const updatedCash = cash - prepayment;    
            dispatch(setCashAmountAction( updatedCash ));
        }
        employeesSalaryList[ activeItem ] = 2 * ( employeesSalaryList[ activeItem ] - prepayment );
        dispatch(setEmployeesSalaryList( employeesSalaryList ));
        dispatch(setEmployeesList( employeesList, true ));
        forceUpdate();
    }

    const concludeContractWithoutPrepayment = () => {
        setAlert({
            ...alert,
            isVisible: true,
            data: EMPLOYEES_SCREEN_CONTRACT_IS_CONCLUDED,
            buttonsCallbacks: [
                () => {
                    hireEmployee( false );
                    setAlert({ ...alert, isVisible: false });
                },
                () => {
                    hireEmployee( false );
                    setAlert({ ...alert, isVisible: false });
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const concludeContractWithPrepayment = ( prepayment ) => {
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
                            cheating( EMPLOYEES_SCREEN_NO_MONEY_CHEATING );
                            return;
                        }
                        //Еще одна сделка
                        hireEmployee( true, prepayment );
                    },
                    () => {
                        setAlert({ ...alert, isVisible: false });
                        notAgreed();
                    }
                ]
        })
    }

    const terminateContract = () => {
        console.log('123');
    }

    const HR = ( hireOrFireFlag ) => {

        if( employeesList[ activeItem ] && hireOrFireFlag ) {
            foolishness();
            return;
        }

        if( !employeesList[ activeItem ] && !hireOrFireFlag ) {
            foolishness();
            return;
        }
        
        if( hireOrFireFlag ) {
            const testPos = 1;
            const restOfTheYear = Math.round( ( 1 - /*posWithinYear*/testPos / endOfYear ) * employeesSalaryList[ activeItem ] * 0.01 );
            
            if( restOfTheYear <= 0 ) {
                concludeContractWithoutPrepayment();
            } else {
                const prepayment = 50 * restOfTheYear;
                concludeContractWithPrepayment( prepayment );
            }
            return;
        }

        terminateContract();

    }

    const getListHireOrFire = ( typeOfDeal = false ) => {
        let i = -1;
        const typeOfDealName = ( typeOfDeal ) ? 'уволить' : 'нанять';
        const hireOrFire = ( typeOfDeal ) ? 'Сумма неустойки' : 'Зарплата в год';
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
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>{ hireOrFire } { employeesSalaryList[ i ] }$</Text>
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
        <>
            <CustomAlert alert={ alert } setAlert={ setAlert } argsForButtonCallbacks={{ activeItem, hireOrFireFlag, cash }}/>
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
                    onPress={ () => { 
                        setHireOrFireFlag( true );
                        HR( true );
                    }}    
                />
                <Button
                    buttonStyle={ styles.fireButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уволить"
                    onPress={ () => { 
                        setHireOrFireFlag( false );
                        HR( false );
                    }}   
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