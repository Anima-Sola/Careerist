import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME } from '../../../styles/theme';
import GameWrapper from '../../../components/GameWrapper';
import { getCommonSettings, getPossessionSettings, getBankSettings } from '../../../store/selectors';
import { POSSESSION_LIST } from '../../../store/constants';
import CustomPrompt from '../../../components/CustomPrompt';
import CustomAlert from '../../../components/CustomAlert';
import {
    INSURANCE_SCREEN_MAX_AMOUNT_WARNING, 
    INSURANCE_SCREEN_ANOTHER_INSURANCE,
    INSURANCE_SCREEN_INPUT_TERM,
    INSURANCE_SCREEN_INPUT_AMOUNT,
} from '../../../store/constants';
import { 
    setInsuredPossessionListAction, 
    setInsurancePossessionCostListAction, 
    setInsurancePossessionTermListAction
} from '../../../store/actions/actions';

import Flat from "../../../assets/images/possession/flat.png";
import Car from "../../../assets/images/possession/car.png";
import Villa from "../../../assets/images/possession/villa.png";
import Yacht from "../../../assets/images/possession/yacht.png";
import Plane from "../../../assets/images/possession/plane.png";

export const InsuranceScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Insurance navigation={ navigation } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Insurance = ({ navigation }) => {
    const dispatch = useDispatch();
    const { possessionList, possessionSellCostList } = useSelector( getPossessionSettings );
    const { insuredPossessionList, insurancePossessionCostList, insurancePossessionTermList } = useSelector( getBankSettings );
    const [ activeItem, setActiveItem ] = useState( 0 );
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: INSURANCE_SCREEN_MAX_AMOUNT_WARNING
    });
    const [ prompt, setPrompt ] = useState({ 
        isVisible: false, 
        data: INSURANCE_SCREEN_INPUT_TERM,
        value: '',
    });

    //Shows a list of possession you own
    const getListForInsurance = () => {
        let i = -1;
        const possessionImageFiles = [ Flat, Car, Villa, Yacht, Plane ];

        const items = possessionList.map( () => {
            i++;
            if( possessionList[ i ] ) {
                const activeItemBackgroudColor = ( i === activeItem ) ? THEME.THIRD_BACKGROUND_COLOR : 'rgba(0, 0, 0, .2)';
                return (
                    <Pressable style={ styles.itemContainer } key={ i } onPress={eval( `() => setActiveItem(${ i })` )}>
                        <View style={{ ...styles.itemImage, backgroundColor: activeItemBackgroudColor }}>
                            <Image style={ styles.image } resizeMode='center' source={ possessionImageFiles[ i ] } />
                        </View>
                        <View style={{ ...styles.itemName, backgroundColor: activeItemBackgroudColor }}>
                            <Text style={ styles.itemText }>{ POSSESSION_LIST[ i ] }</Text>
                            <View style={{ height: hp('1%') }}></View>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>Максимальная сумма</Text>
                            <View style={{ height: hp('1%') }}></View>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>{ possessionSellCostList[ i ] }$</Text>
                        </View>
                    </Pressable>
                )
            }
        });

        return (
            <View style={ styles.dataContainer }>
                <Text style={ styles.text }>Вы можете застраховать:</Text>
                { items }
                <Text style={ styles.expensesText }>При годовых взносах 5%</Text>
            </View>
        )
    }

    const showMaxInsuranceAmountWarningAlert = () => {
        setAlert({
            ...alert,
            isVisible: true,
            data: INSURANCE_SCREEN_MAX_AMOUNT_WARNING,
            buttonsCallbacks: [
                () => {
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showAnotherInsuranceAlert = () => {
        setAlert({
            ...alert,
            isVisible: true,
            data: INSURANCE_SCREEN_ANOTHER_INSURANCE,
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                },
                () => {
                    navigation.navigate('BankScreen', { previousScreen: 'AnyScreen' });
                }
            ]
        })
    }
    
    const showInputInsuranceAmountPrompt = ( insuranceTerm ) => {
        setPrompt({
            ...prompt, 
            isVisible: true,
            data: { 
                ...INSURANCE_SCREEN_INPUT_AMOUNT,
                header: `Страхуем ${ POSSESSION_LIST[ activeItem ].toLowerCase() }.`,
                message: `На какую сумму? Максимум ${ possessionSellCostList[ activeItem ] }$.`
            },
            buttonsCallbacks: [
                ( insuranceAmount ) => {
                    setPrompt({ ...prompt, isVisible: false, value: '' });
                    if( insuranceAmount > possessionSellCostList[ activeItem ] ) {
                        setTimeout( () => showMaxInsuranceAmountWarningAlert(), 300);
                        return;
                    }
                    insuredPossessionList[ activeItem ] = true;
                    insurancePossessionTermList [ activeItem ] = insuranceTerm;
                    insurancePossessionCostList[ activeItem ] = insuranceAmount;
                    dispatch(setInsuredPossessionListAction( insuredPossessionList ));
                    dispatch(setInsurancePossessionTermListAction( insurancePossessionTermList ));
                    dispatch(setInsurancePossessionCostListAction( insurancePossessionCostList ), true);

                    setTimeout( () => showAnotherInsuranceAlert(), 300);
                },
                () => setPrompt({ ...prompt, isVisible: false, value: '' })
            ]
        });
    }

    const showInputInsuranceTermPrompt = () => {
        setPrompt({
            ...prompt, 
            isVisible: true,
            data: { 
                ...INSURANCE_SCREEN_INPUT_TERM,
                header: `Страхуем ${ POSSESSION_LIST[ activeItem ].toLowerCase() }.`,
                message: `На какой срок?`
            },
            buttonsCallbacks: [
                ( insuranceTerm ) => {
                    setPrompt({ ...prompt, isVisible: false, value: '' });
                    setTimeout( () => showInputInsuranceAmountPrompt( insuranceTerm ), 300 );
                },
                () => setPrompt({ ...prompt, isVisible: false, value: '' })
            ]
        });
    }

    const somethingToEnsure = () => {
        return (
                <View style={ styles.wrapper }>
                    <CustomPrompt prompt={ prompt } setPrompt={ setPrompt }/>
                    <CustomAlert alert={ alert } setAlert={ setAlert }/>
                    <ScrollView style={ styles.container }>
                        { getListForInsurance() }
                    </ScrollView>
                    <View style={ styles.buttonsContainer }>
                        <Button
                            buttonStyle={ styles.ensureButton } 
                            titleStyle={ styles.buttonTitle }
                            type="outline" 
                            title="Страховать"
                            onPress={ () => showInputInsuranceTermPrompt() }    
                        />
                        <Button
                            buttonStyle={ styles.exitButton } 
                            titleStyle={ styles.buttonTitle }
                            type="outline" 
                            title="Уйти"
                            onPress={ () => navigation.navigate('BankScreen', { previousScreen: 'AnyScreen' }) }   
                        />
                    </View>
                </View>
            )
    }

    const nothingToEnsure = () => {
        return (
            <View style={ styles.wrapper }>
                <View style={{ ...styles.container, justifyContent: 'center' }}>
                    <Text style={{ ...styles.text, fontFamily: THEME.FONT_SEMIBOLD }}>Вам нечего страховать!</Text>
                    <View style={{ height: hp('1%') }}></View>
                    <Text style={ styles.text }>Просим вас немедленно покинуть банк!</Text>
                    <View style={{ height: hp('1%') }}></View>
                    <Text style={ styles.text }>Усвоили?</Text>
                </View>
                <View style={ styles.buttonContainer }>
                    <Button
                        buttonStyle={ styles.nothingToEnsureButton } 
                        titleStyle={ styles.buttonTitle }
                        type="outline" 
                        title="Ой, уже ухожу"
                        onPress={ () => navigation.navigate('GameMainScreen') }  
                    />
                </View>
            </View>
        )
    }

    if( possessionList.indexOf( true ) !== -1 ) return somethingToEnsure();
    else return nothingToEnsure();

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
        paddingTop: hp('1%')
    },
    dataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT30,
    },
    image: {
        height: hp('14%'),
        width: hp('14%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1.5%')
    },
    expensesText: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_LIGHT,
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('2.5%')
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '100%',
        marginBottom: hp('1%'),  
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        width: '100%',
        marginBottom: hp('1%')
    },
    ensureButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        height: hp('7%'),
        borderRadius: wp('10%'),
        width: wp('46%'),
        marginRight: 5
    },  
    exitButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: wp('46%'),
        height: hp('7%'),
        borderRadius: wp('10%'),
        marginLeft: 5,
    },
    nothingToEnsureButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '96%',
        alignSelf: 'center',
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28
    }
})