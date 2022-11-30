import React, { useState, useReducer, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '../../../styles/theme';
import GameWrapper from '../../../components/GameWrapper';
import { 
    LEND_SCREEN_NO_MONEY, 
    LEND_SCREEN_INPUT_AMOUNT,
    LEND_SCREEN_TERM_TOO_LONG,
    LEND_SCREEN_INPUT_TERM,
    LEND_SCREEN_INPUT_PERSENTAGES,
    LEND_SCREEN_LEND_MONEY,
    LEND_SCREEN_NOT_ARGEE_TO_LEND
 } from '../../../store/constants';
import CustomAlert from '../../../components/CustomAlert';
import CustomPrompt from '../../../components/CustomPrompt';
import { getCommonSettings } from '../../../store/selectors';
import { 
    setCashAmountAction, 
    setLendAmountAction, 
    setLendTermAction, 
    setLendPersentagesAction 
} from '../../../store/actions/actions';
import random from '../../../components/Random';

import LendImage from "../../../assets/images/bankservices/lend.png";

export const LendScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Lend navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings } />
    )
};

const Lend = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const { cash } = commonSettings;
    const lendAmount = useRef( 0 );
    const lendTerm = useRef( 0 );
    const lendPersentage = useRef( 0 );
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data: LEND_SCREEN_NO_MONEY
    });
    const [ prompt, setPrompt ] = useState({
        isVisible: false,
        data: LEND_SCREEN_INPUT_AMOUNT,
        value: ''
    });

    const showNoMoneyAlert = () => {
        setAlert({ 
            ...alert,
            isVisible: true,
            buttonsCallbacks: [
                () => {
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showTermTooLongAlert = () => {
        setAlert({ 
            ...alert,
            isVisible: true,
            data: LEND_SCREEN_TERM_TOO_LONG,
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    setTimeout( () => showInputLendTermPrompt(), 300 );
                }
            ]
        })
    }

    const showNotAgreeToLendAlert = () => {
        setAlert({ 
            ...alert,
            isVisible: true,
            data: LEND_SCREEN_NOT_ARGEE_TO_LEND,
            buttonsCallbacks: [
                () => {
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showTermLendMoneyAlert = ( chanceToEarnMoney ) => {
        setAlert({ 
            ...alert,
            isVisible: true,
            data: { 
                ...LEND_SCREEN_LEND_MONEY,
                message: `Шанс заработать ${ chanceToEarnMoney }%.\n По рукам?`
            },
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    dispatch(setCashAmountAction( cash - lendAmount.current ));

                    // Обманули или нет считаем сразу.
                    if( ( chanceToEarnMoney / 100 ) < random() ) lendAmount.current = -lendAmount.current;

                    dispatch(setLendAmountAction( lendAmount.current ));
                    dispatch(setLendTermAction( lendTerm.current ));
                    dispatch(setLendPersentagesAction( lendPersentage.current ), true);
                    forceUpdate();
                    navigation.navigate('BankScreen');
                },
                () => {
                    setAlert({ ...alert, isVisible: false });
                    setTimeout( () => showNotAgreeToLendAlert(), 300 );
                },
            ]
        })
    }

    const showInputLendPersentagesPrompt = ( term ) => {
        setPrompt({
            ...prompt, 
            isVisible: true,
            data: LEND_SCREEN_INPUT_PERSENTAGES,
            buttonsCallbacks: [
                ( persentages ) => {
                    setPrompt({ ...prompt, isVisible: false, value: '' });
                    lendPersentage.current = persentages;
                    const value = Math.sqrt(Math.sqrt( term ));
                    const chanceToEarnMoney = Math.floor( 32.94 * value / ( 0.6 + 0.01 * persentages ) );
                    setTimeout( () => showTermLendMoneyAlert( chanceToEarnMoney ), 300 );
                },
                () => setPrompt({ ...prompt, isVisible: false, value: '' })
            ]
        });
    }

    const showInputLendTermPrompt = () => {
        setPrompt({
            ...prompt, 
            isVisible: true,
            data: LEND_SCREEN_INPUT_TERM,
            buttonsCallbacks: [
                ( term ) => {
                    setPrompt({ ...prompt, isVisible: false, value: '' });
                    if( term > 11 ) {
                        setTimeout( () => showTermTooLongAlert(), 300 );
                        return;
                    }
                    lendTerm.current = term;
                    setTimeout( () => showInputLendPersentagesPrompt( term ), 300 );
                },
                () => setPrompt({ ...prompt, isVisible: false, value: '' })
            ]
        });
    }
    
    const showInputLendAmountPrompt = () => {
        setPrompt({
            ...prompt, 
            isVisible: true,
            buttonsCallbacks: [
                ( amount ) => {
                    setPrompt({ ...prompt, isVisible: false, value: '' });
                    if( cash < amount ) {
                        setTimeout( () => showNoMoneyAlert(), 300 );
                        return;
                    }
                    lendAmount.current = amount;
                    setTimeout( () => showInputLendTermPrompt(), 300 );
                },
                () => setPrompt({ ...prompt, isVisible: false, value: '' })
            ]
        });
    }

    return (
        <>
            <CustomPrompt prompt={ prompt } setPrompt={ setPrompt }/>
            <CustomAlert alert={ alert } setAlert={ setAlert }/>
            <View style={ styles.container }>
                <View style={ styles.dataContainer }>
                    <Image style={ styles.image } resizeMode='center' source={ LendImage } />
                    <Text style={ styles.text }>Наличные средства { cash }$.</Text>
                    <Text style={ styles.text }>Договоримся об условиях.</Text>
                    <Text style={ styles.text }>Сколько дадите?</Text>
                </View>
            </View>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.lendButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Дать ссуду"
                    onPress={ () => showInputLendAmountPrompt() }    
                />
                <Button
                    buttonStyle={ styles.exitButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => navigation.navigate('BankScreen') }   
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
        marginBottom: hp('1%'),
    },
    dataContainer: {
        flex: 1,
        marginTop: hp('5%'),
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1.5%')
    },
    image: {
        height: hp('25%'),
        width: hp('25%'),
        alignSelf: 'center',
        marginBottom: hp('5%')
    },
    buttonsContainer: {
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('1%')
    },
    lendButton: {
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
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28
    }
})