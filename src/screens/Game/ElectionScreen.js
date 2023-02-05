import React, { useState, useEffect, useRef, useReducer } from "react";
import { Text, View, StyleSheet, BackHandler, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import GameWrapper from "../../components/GameWrapper";
import { THEME } from "../../styles/theme";
import { 
    getCommonSettings, 
    getPossessionSettings, 
    getBusinessSettings, 
    getEmployeesSettings,
    getBankSettings 
} from "../../store/selectors";
import { setCashAmountAction, setElectionStatus, setSocialStatusAction, setYearExpenseAction } from "../../store/actions/actions";
import CustomAlert from '../../components/CustomAlert';
import {
    SOCIAL_STATUSES, 
    ELECTION_SCREEN_SKIP_ELECTION, 
    ELECTION_SCREEN_LOSE_ELECTION, 
    ELECTION_SCREEN_WIN_ELECTION,
    ELECTION_SCREEN_NO_MONEY_CHEATING
} from '../../store/constants';
import random from '../../components/Random';
import { setCashAmountMinusFine, getFineAmount } from "../../components/CommonFunctions";

export const ElectionScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Election navigation={ navigation } commonSettings={ commonSettings } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings } />
    )
};

const Election = ({ navigation, commonSettings }) => {
    const dispatch = useDispatch();
    const [ isRun, setIsRun ] = useState( false );
    const electionCost = useRef();
    const chanceToElect = useRef();
    const { cash, year, currentSocialStatus, yearExpense, electionStatus, yearsPassed } = commonSettings;
    const { possessionList } = useSelector( getPossessionSettings );
    const { businessList } = useSelector( getBusinessSettings );
    const { employeesList } = useSelector( getEmployeesSettings );
    const { depositAmount } = useSelector( getBankSettings );
    const [ alert, setAlert ] = useState({ isVisible: false, data:  ELECTION_SCREEN_SKIP_ELECTION })

    const calcElectionCost = () => {
        const nextSocialStatus = currentSocialStatus + 1;
        return Math.floor( 5 ** nextSocialStatus * ( 2 + 5 * random() ) * 20 );
    }

    const calcChanceToElect = () => {
        let temp = 0;
        let chanceToElect;
        const nextSocialStatus = currentSocialStatus + 1;
        for( let i = 1; i <= 5; i++ ) {
            temp = temp + 0.5 * ( possessionList[ i - 1 ] + businessList[ i - 1 ] ) + 2 * employeesList[ i - 1];
        }
        chanceToElect = temp / ( 5 * nextSocialStatus );
        if( chanceToElect > 1 ) chanceToElect = 1;
        return chanceToElect;
    }

    if( !isRun ) {
        electionCost.current = calcElectionCost();
        chanceToElect.current = calcChanceToElect();
        setIsRun( true );
    }
    
    const showSkipElectionAlert = () => {
        setAlert({
            isVisible: true,
            data:  ELECTION_SCREEN_SKIP_ELECTION,
            buttonsCallbacks: [
                () => {
                    dispatch(setElectionStatus( false, true ));
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showCheatingAlert = ( fineAmount ) => {
        setAlert({ 
            isVisible: true, 
            data: { 
                ...ELECTION_SCREEN_NO_MONEY_CHEATING, 
                message: `За мошенничество штраф ${ fineAmount }$` 
            },
            buttonsCallbacks: [
                () => {
                    setCashAmountMinusFine( fineAmount );
                    dispatch(setElectionStatus( false, true ));
                    navigation.navigate('GameMainScreen');
                }
            ]
        })
    }

    const showLoseElectionAlert = ( numOfVoices ) => {
        setAlert({  
            isVisible: true, 
            data: { 
                ...ELECTION_SCREEN_LOSE_ELECTION, 
                message: `Вы набрали только ${ numOfVoices }% голосов. Следующие выборы через 2 года.`
            },
            buttonsCallbacks: [
                () => {
                    dispatch(setElectionStatus( false, true ));
                    navigation.navigate('GameMainScreen');
                }
            ]
         });
    }

    const showWinElectionAlert = () => {
        setAlert({  
            isVisible: true, 
            data: { 
                ...ELECTION_SCREEN_WIN_ELECTION, 
                message: `Теперь вы  ${ SOCIAL_STATUSES[ currentSocialStatus + 1 ]}. Следующие выборы через 2 года.` 
            },
            buttonsCallbacks: [
                () => {
                    dispatch(setSocialStatusAction( currentSocialStatus + 1 ));
                    //Здесь обработка, если стал президентом.
                    dispatch(setElectionStatus( false, true ));
                    navigation.navigate('GameMainScreen');
                }
            ]
         });
    }

    const standForElection = () => {
        
        const electionResult = random();

        if( electionCost.current > ( cash + depositAmount )) {
            const fineAmount = getFineAmount();
            showCheatingAlert( fineAmount );
            return;
        }

        const updatedCash = cash - electionCost.current;
        if( updatedCash < 0 ) {
            dispatch(setYearExpenseAction( yearExpense - updatedCash ));
            updatedCash = 0;
        }

        dispatch(setCashAmountAction( updatedCash ));

        if( electionResult > chanceToElect.current ) {
            const numOfVoices = Math.floor(50 * ( 1 - electionResult ));
            showLoseElectionAlert( numOfVoices );
            return;
        }
       
        showWinElectionAlert();
        
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener( 'hardwareBackPress', () => showSkipElectionAlert() );
        return () => backHandler.remove();
    })

    const election = () => {
        return (
            <ScrollView style={ styles.container }>
                <CustomAlert alert={ alert } setAlert={ setAlert } />          
                <View>
                    <Text style={ styles.text }>В настоящее время вы</Text>
                </View> 
                <View style={ styles.socialStatusContainer }>
                    <Image style={ styles.image } resizeMode='center' source={ require('../../assets/images/jentleman.png') } />
                    <Text style={ styles.socialStatusText }>{ SOCIAL_STATUSES[ currentSocialStatus - 1 ] }</Text>
                </View>
                <View>
                    <Text style={ styles.text }>Примите участие в выборах.</Text>
                </View>
                <View style={ styles.socialStatusContainer }>
                    <Text style={{ ...styles.socialStatusText, marginBottom: 0, marginTop: hp('1%') }}>Избирается:</Text>
                    <Image style={ styles.image } resizeMode='center' source={ require('../../assets/images/jentleman.png') } />
                    <Text style={ styles.socialStatusText }>{ SOCIAL_STATUSES[ currentSocialStatus ] }</Text>
                </View>
                <View>
                    <Text style={ styles.text }>Кампания обойдется в { electionCost.current }, вероятность успеха { 100 * chanceToElect.current }%.</Text>
                </View>
                <View style={ styles.downTextContainer }>
                    <Text style={{ ...styles.text, fontSize: THEME.FONT45 }}>Участвуете?</Text>
                </View>
                <View style={ styles.buttonsContainer }>
                    <Button
                        buttonStyle={ styles.takePartButton } 
                        titleStyle={ styles.nextButtonTitle }
                        type="outline" 
                        title="Да"
                        onPress={ () => standForElection() }  
                    />
                    <Button
                        buttonStyle={ styles.nextButton } 
                        titleStyle={ styles.nextButtonTitle }
                        type="outline" 
                        title="Нет"
                        onPress={ () => showSkipElectionAlert() }  
                    />
                </View>
            </ScrollView>
        )
    }

    const noElection = ( message ) => {
        return (
            <View style={ styles.container }>
                <View style={{ ...styles.dataContainer, justifyContent: 'center' }}>
                    <Text style={ styles.electionNotHeldText }>Год { year }.</Text>
                    <Text style={ styles.electionNotHeldText }>{ message }</Text>
                </View>
                <View style={ styles.buttonsContainer }>
                    <Button
                        buttonStyle={{ ...styles.takePartButton, width: wp('96%'), marginLeft: wp('2%') }} 
                        titleStyle={ styles.nextButtonTitle }
                        type="outline" 
                        title="Уйти"
                        onPress={ () => {
                            if( electionStatus ) dispatch(setElectionStatus( false, true ));
                            navigation.navigate('GameMainScreen');
                        }}  
                    />
                </View>
            </View>
        )
    }

    if( !electionStatus ) return noElection('У вас склероз?!');
    return (( yearsPassed % 2 ) === 0) ? election() : noElection('В этом году выборы не проводятся!!!\n\nУсвоили?');
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '96%',
        marginBottom: hp('1%'),
        marginTop: hp('1%'),
        marginLeft: '2%',
        marginRight: '2%',
    },
    dataContainer: {
       flex: 1,
    },
    socialStatusContainer: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        marginBottom: hp('1%')
    },
    image: {
        marginTop: hp('2%'),
        alignSelf: 'center',
        height: hp('40%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1.5%'),
    },
    socialStatusText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibolditalic',
        fontSize: THEME.FONT40,
        textAlign: 'center',
        marginBottom: hp('2%')
    },
    electionNotHeldText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibolditalic',
        fontSize: THEME.FONT40,
        textAlign: 'center',
    },
    downTextContainer: {
        marginTop: hp('1%'),
        marginBottom: hp('3%'),
        justifyContent: 'center',
    },
    buttonsContainer: {
        justifyContent: 'center',
        width:'100%',
        flexDirection: 'row',
    },
    takePartButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        height: hp('7%'),
        borderRadius: wp('10%'),
        width: wp('46%'),
        marginRight: 5
    },  
    nextButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: wp('46%'),
        height: hp('7%'),
        borderRadius: wp('10%'),
        marginLeft: 5,
    },
    nextButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28
    }
});