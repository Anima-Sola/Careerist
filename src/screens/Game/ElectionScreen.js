import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, BackHandler, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '@rneui/themed';
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
    ELECTION_SCREEN_NO_MONEY_CHEATING,
    ELECTION_SCREEN_WIN_PRESIDENT_ELECTION
} from '../../store/constants';
import random from '../../components/Random';
import { setCashAmountMinusFine, getFineAmount } from "../../components/CommonFunctions";
import { playButtonClick } from "../../components/Sounds";

import SclerosisImage from '../../assets/images/election/sclerosis.png';
import NoElectionImage from '../../assets/images/election/noelection.png';
import BusinessmanImage from '../../assets/images/election/businessman.png';
import GarbagemanImage from '../../assets/images/election/garbageman.png';
import SheriffImage from '../../assets/images/election/sheriff.png';
import SenatorImage from '../../assets/images/election/senator.png';
import PresidentImage from '../../assets/images/election/president.png';

const electionImages = [ BusinessmanImage, GarbagemanImage, SheriffImage, SenatorImage, PresidentImage ]; 

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
    let { cash, currentSocialStatus, yearExpense, electionStatus, yearsPassed } = commonSettings;
    const { possessionList } = useSelector( getPossessionSettings );
    const { businessList } = useSelector( getBusinessSettings );
    const { employeesList } = useSelector( getEmployeesSettings );
    const { depositAmount } = useSelector( getBankSettings );
    const [ alert, setAlert ] = useState({ isVisible: false, data:  ELECTION_SCREEN_SKIP_ELECTION })

    const calcElectionCost = () => {
        const nextSocialStatus = currentSocialStatus + 1;
        return Math.floor( ( 2 + 5 * random() ) * 20 * 5 ** nextSocialStatus );
    }

    //Calc chance to win election
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

    //Run only one times
    if( !isRun ) {

        if( electionStatus && (( yearsPassed % 2 ) === 0 )) {
            electionCost.current = calcElectionCost();
            chanceToElect.current = calcChanceToElect();
        }

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

    const showLoseElectionAlert = ( numOfVotes ) => {
        setAlert({  
            isVisible: true, 
            data: { 
                ...ELECTION_SCREEN_LOSE_ELECTION, 
                message: `Вы набрали только ${ numOfVotes }% голосов. Следующие выборы через 2 года.`
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
                message: `Теперь вы ${ SOCIAL_STATUSES[ currentSocialStatus - 1 ]}. Следующие выборы через 2 года.` 
            },
            buttonsCallbacks: [
                () => {
                    dispatch(setElectionStatus( false, true ));
                    navigation.navigate('GameMainScreen');
                }
            ]
         });
    }

    const showWinPresidentElectionAlert = () => {
        setAlert({  
            isVisible: true, 
            data: ELECTION_SCREEN_WIN_PRESIDENT_ELECTION,
            buttonsCallbacks: [
                () => {
                    navigation.navigate('WinScreen');
                }
            ]
         });
    }

    //To take part in election
    const standForElection = () => {
        
        const electionResult = random();

        //If you don't have enough money
        if( electionCost.current > ( cash + depositAmount )) {
            const fineAmount = getFineAmount();
            showCheatingAlert( fineAmount );
            return;
        }

        //Election costs and you pay
        let updatedCash = cash - electionCost.current;
        if( updatedCash < 0 ) {
            dispatch(setYearExpenseAction( yearExpense - updatedCash ));
            updatedCash = 0;
        }

        dispatch(setCashAmountAction( updatedCash ));

        //If you lose election
        if( electionResult > chanceToElect.current ) {
            //Calc of the number of votes
            const numOfVotes = Math.floor( 50 * ( 1 - electionResult ) );
            showLoseElectionAlert( numOfVotes );
            return;
        }
       
        //If you win election
        currentSocialStatus++;
        dispatch(setSocialStatusAction( currentSocialStatus ));

        if( currentSocialStatus === 5 ) {
            //You are President. The game is over.
            showWinPresidentElectionAlert();
        } else {
            showWinElectionAlert();
        }
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener( 'hardwareBackPress', () => showSkipElectionAlert() );
        return () => backHandler.remove();
    })

    const election = () => {
        return (
            <View style={ styles.wrapper }>
                <ScrollView style={ styles.container }>
                    <CustomAlert alert={ alert } setAlert={ setAlert } />          
                    <View>
                        <Text style={ styles.text }>В настоящее время вы - </Text>
                    </View> 
                    <View style={ styles.socialStatusContainer }>
                        <Image style={ styles.image } resizeMode='center' source={ electionImages[ currentSocialStatus - 1 ] } />
                        <Text style={ styles.socialStatusText }>{ SOCIAL_STATUSES[ currentSocialStatus - 1 ] }</Text>
                    </View>
                    <View>
                        <Text style={{ ...styles.text, marginBottom: 0 }}>Примите участие в выборах.</Text>
                        <Text style={ styles.text }>Избирается - </Text>
                    </View>
                    <View style={ styles.socialStatusContainer }>
                        <Image style={ styles.image } resizeMode='center' source={ electionImages[ currentSocialStatus ] } />
                        <Text style={ styles.socialStatusText }>{ SOCIAL_STATUSES[ currentSocialStatus ] }</Text>
                    </View>
                    <View>
                        <Text style={ styles.text }>Кампания обойдется в { electionCost.current }$, вероятность успеха { Math.floor( 100 * chanceToElect.current ) }%.</Text>
                    </View>
                    <View style={ styles.downTextContainer }>
                        <Text style={{ ...styles.text, fontSize: THEME.FONT45 }}>Участвуете?</Text>
                    </View>
                    <View style={{ ...styles.buttonsContainer, marginBottom: hp('2%') }}>
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
            </View>
        )
    }

    const noElection = ( message, image ) => {
        return (
            <View style={ styles.wrapper }>
                <ScrollView style={ styles.container }>
                    <Image style={ styles.sclerosisImage } resizeMode='center' source={ image } />
                    <Text style={ styles.electionNotHeldText }>{ message }</Text>
                </ScrollView>
                <View style={ styles.buttonsContainer }>
                    <Button
                        buttonStyle={{ ...styles.takePartButton, width: wp('96%'), marginLeft: wp('2%') }} 
                        titleStyle={ styles.nextButtonTitle }
                        type="outline" 
                        title="Уйти"
                        onPress={ () => {
                            playButtonClick();
                            if( electionStatus ) dispatch(setElectionStatus( false, true ));
                            navigation.navigate('GameMainScreen');
                        }}  
                    />
                </View>
            </View>
        )
    }

    //If an election has already been in election screeen
    if( !electionStatus ) return noElection( '\nУ вас склероз?!', SclerosisImage );
    //Elections are held every two years
    return (( yearsPassed % 2 ) === 0) ? election() : noElection( 'В этом году выборы не проводятся!!!\n\nУсвоили?', NoElectionImage );
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
    socialStatusContainer: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        marginBottom: hp('1%')
    },
    image: {
        marginTop: hp('2%'),
        alignSelf: 'center',
        height: hp('40%')
    },
    sclerosisImage: {
        marginTop: hp('2%'),
        height: hp('40%'),
        alignSelf: 'center',
        marginBottom: hp('2%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1.5%')
    },
    socialStatusText: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD_ITALIC,
        fontSize: THEME.FONT40,
        textAlign: 'center',
        marginBottom: hp('2%'),
        marginTop: hp('1%')
    },
    electionNotHeldText: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD_ITALIC,
        fontSize: THEME.FONT40,
        textAlign: 'center'
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
        marginBottom: hp('1%')
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
        marginLeft: 5
    },
    nextButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28
    }
});