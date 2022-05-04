import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { getEmployeesList, getEmployeesSalaryList } from '../../store/selectors';
import { EMPLOYEES_LIST } from '../../store/constants';
import { setEmployeesList, setEmployeesSalaryList } from '../../store/actions/actions';

import Makler from "../../assets/images/employees/makler.png";
import Doctor from "../../assets/images/employees/doctor.png";
import Lawyer from "../../assets/images/employees/lawyer.png";
import Detective from "../../assets/images/employees/detective.png";
import Security from "../../assets/images/employees/security.png";

export const EmployeesScreen = ({ navigation }) => {
    const wrappedComponent = <Employees navigation={ navigation } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const Employees = ({ navigation }) => {
    const dispatch = useDispatch();
    const employeesList = useSelector( getEmployeesList );
    const employeesSalaryList = useSelector( getEmployeesSalaryList );
    const [ activeItem, setActiveItem ] = useState( 0 );

    const getListHireOrFire = ( typeOfDeal = false ) => {
        let i = -1;
        const typeOfDealName = ( typeOfDeal ) ? 'уволить' : 'нанять';
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
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>Зарплата { employeesSalaryList[ i ] }$ в год</Text>
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
        <ScrollView style={ styles.container }>
            { listToFire() }
            { listToHire() }
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.hireButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Нанять"
                    onPress={ () => { 
                        dispatch( setEmployeesList([true, true, false, true, false]) );
                        dispatch( setEmployeesSalaryList([ 0, 2000, 10000, 100000, 0 ]) );
                        navigation.navigate('GameMainScreen');
                    }}    
                />
                <Button
                    buttonStyle={ styles.fireButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уволить"
                    onPress={ () => { 
                        dispatch( setEmployeesList([false, false, false, false, false]) );
                        dispatch( setEmployeesSalaryList([ 0, 2000, 0, 100000, 0 ]) );
                        navigation.navigate('GameMainScreen');
                    }}   
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