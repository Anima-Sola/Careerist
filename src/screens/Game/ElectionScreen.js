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
import { SOCIAL_STATUSES } from "../../store/constants";
import { setCashAmountAction, setElectionStatus, setSocialStatus, setYearExpenseAction } from "../../store/actions/actions";
import CustomAlert from '../../components/CustomAlert';
import { 
    ELECTION_SCREEN_SKIP_ELECTION, 
    ELECTION_SCREEN_LOSE_ELECTION, 
    ELECTION_SCREEN_WIN_ELECTION,
    ELECTION_SCREEN_NO_MONEY_CHEATING
} from '../../store/constants';

export const ElectionScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Election navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings } />
    )
};

const Election = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const { cash, year, currentSocialStatus, yearsPassed, yearExpense } = commonSettings;
    const { possessionList } = useSelector( getPossessionSettings );
    const { businessList } = useSelector( getBusinessSettings );
    const { employeesList } = useSelector( getEmployeesSettings );
    const { depositAmount } = useSelector( getBankSettings );
    const [ alert, setAlert ] = useState({ isVisible: false, data:  ELECTION_SCREEN_SKIP_ELECTION })

    const calcElectionCost = () => {
        const rnd = Math.random();
        const nextSocialStatus = currentSocialStatus + 1;
        return Math.round( 5 ** nextSocialStatus * ( 2 + 5 * rnd ) * 20 );
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

    const setCashAmountMinusFine = ( fineAmount ) => {
        let updatedCash = cash - fineAmount;
        if( updatedCash < 0 ) {
            dispatch(setYearExpenseAction( yearExpense - updatedCash ));
            updatedCash = 0;
        }
        dispatch(setCashAmountAction( updatedCash ));
        forceUpdate();
    }

    const getFineAmount = () => {
        const value = ( Math.random() < 0.5 ) ? -Math.random() : Math.random();
        return 1500 + 50 * Math.round( 10 * value );
    }

    const electionCost = useRef( calcElectionCost() );
    const chanceToElect = useRef(  calcChanceToElect() );
    
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

    useEffect(() => {
        const backHandler = BackHandler.addEventListener( 'hardwareBackPress', () => showSkipElectionAlert() );
        return () => backHandler.remove();
    })

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

    const showWinElectionAlert = () => {
        setAlert({  
            isVisible: true, 
            data: { 
                ...ELECTION_SCREEN_WIN_ELECTION, 
                message: `Теперь вы  ${ SOCIAL_STATUSES[ currentSocialStatus + 1 ]}. Следующие выборы через 2 года.` 
            },
            buttonsCallbacks: [
                () => {
                    //Здесь обработка, если стал президентом.
                    dispatch(setElectionStatus( false, true ));
                    navigation.navigate('GameMainScreen');
                }
            ]
         });
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

    const standForElection = () => {

        if( electionCost.current > ( cash + depositAmount )) {
            const fineAmount = getFineAmount();
            showCheatingAlert( fineAmount );
            return;
        }

        const electionResult = Math.random();
        const updatedCash = cash - electionCost.current;
        if( updatedCash < 0 ) {
            dispatch(setYearExpenseAction( yearExpense - updatedCash ));
            updatedCash = 0;
        }

        dispatch(setCashAmountAction( updatedCash ));

        if( electionResult > chanceToElect.current ) {
            const numOfVoices = Math.round(50 * ( 1 - electionResult ));
            showLoseElectionAlert( numOfVoices );
            return;
        }
       
        showWinElectionAlert();
    }

    const election = (
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

    const noElection = (
        <View style={ styles.container }>
            <View style={{ ...styles.dataContainer, justifyContent: 'center' }}>
                <Text style={ styles.electionNotHeldText }>Год { year }.</Text>
                <Text style={ styles.electionNotHeldText }>В этом году выборы не проводятся!!!</Text>
                <View style={{ height: hp('5%') }}></View>
                <Text style={ styles.electionNotHeldText }>Усвоили?</Text>    
            </View>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={{ ...styles.takePartButton, width: wp('96%'), marginLeft: wp('2%') }} 
                    titleStyle={ styles.nextButtonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => navigation.navigate('GameMainScreen') }  
                />
            </View>
        </View>
    )

    return (( yearsPassed % 2 ) === 0) ? election : noElection;
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


/*const Election = ({ navigation }) => {
    const dispatch = useDispatch();
    const year = useSelector( getYear );
    const currentSocialStatus = useSelector( getCurrentSocialStatus );
    const [ alert, setAlert ] = useState({
        isVisible: false,
        data:  ELECTION_SCREEN_SKIP_ELECTION,
        buttonsCallbacks: [
            () => {
                dispatch(setIsElectionOverOrNotHeld( true ));
                setAlert({ ...alert, isVisible: false });
                navigation.navigate('GameMainScreen');
            }
        ]
    })
    
    const skipElection = () => {
        setAlert({ ...alert, isVisible: true  });
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener( 'hardwareBackPress', skipElection );
        return () => backHandler.remove();
    })

    const participateElection = () => {
        const result = Math.random();
        if( result < 0.5 ) {
            dispatch(setSocialStatus( currentSocialStatus + 1 ));
            setAlert({ ...alert, 
                       isVisible: true, 
                       data: { ...ELECTION_SCREEN_WIN_ELECTION, message: 'Теперь вы ' + SOCIAL_STATUSES[ currentSocialStatus + 1 ] + '. Следующие выборы через 2 года.' }
                    });
        } else {
            setAlert({ ...alert, 
                        isVisible: true, 
                        data: { ...ELECTION_SCREEN_LOSE_ELECTION, message: 'Вы набрали только 40% голосов. Следующие выборы через 2 года.' }
                    });
        }
    }

    const isElectionHeld = (
        <View style={ styles.container }>
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <View style={ styles.dataContainer }>              
                <View style= {styles.upTextContainer }>
                    <Text style={ styles.text }>В настоящее время вы</Text>
                </View>
                <View style={ styles.electionInfoContainer }>    
                    <View style={ styles.socialStatusContainer }>
                        <Text style={ styles.socialStatusText }>{ SOCIAL_STATUSES[ currentSocialStatus ] }</Text>
                    </View>
                    <View>
                        <Text style={ styles.text }>Примите участие в выборах.</Text>
                    </View>
                    <View style={ styles.socialStatusContainer }>
                        <Text style={ styles.socialStatusText }>Избирается</Text>
                        <Text style={ styles.socialStatusText }>{ SOCIAL_STATUSES[ currentSocialStatus + 1 ] }</Text>
                    </View>
                    <View>
                        <Text style={ styles.text }>Кампания обойдется в 1500$, вероятность успеха 0%.</Text>
                    </View>
                </View> 
                <View style={ styles.downTextContainer }>
                    <Text style={{ ...styles.text, fontSize: THEME.FONT25 }}>Участвуете?</Text>
                </View>
            </View>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.takePartButton } 
                    titleStyle={ styles.nextButtonTitle }
                    type="outline" 
                    title="Да"
                    onPress={ participateElection }  
                />
                <Button
                    buttonStyle={ styles.nextButton } 
                    titleStyle={ styles.nextButtonTitle }
                    type="outline" 
                    title="Нет"
                    onPress={ skipElection }  
                />
            </View>
        </View>
    )

    const isElectionNotHeld = (
        <View style={ styles.container }>
            <View style={{ ...styles.dataContainer, justifyContent: 'center' }}>
                <Text style={ styles.electionNotHeldText }>Год { year }.</Text>
                <Text style={ styles.electionNotHeldText }>В этом году выборы не проводятся!!!</Text>   
            </View>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={{ ...styles.takePartButton, width: THEME.SCREEN_WIDTH - 40 }} 
                    titleStyle={ styles.nextButtonTitle }
                    type="outline" 
                    title="Продолжить"
                    onPress={ () => navigation.navigate('GameMainScreen') }  
                />
            </View>
        </View>
    )

    return (Number.isInteger( year / 2 )) ? isElectionHeld : isElectionNotHeld;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    dataContainer: {
        flex: 1,
        marginTop: 10,
    },
    upTextContainer: {
        flex: 0.08,
    },
    electionInfoContainer: {
        flex: 0.72,
        justifyContent: 'space-between'
    },
    socialStatusContainer: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, .2)',
        justifyContent: 'center',
        height: THEME.SCREEN_HEIGHT * 0.18
    },
    downTextContainer: {
        flex: 0.18,
        justifyContent: 'center'
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT20,
        textAlign: 'center',
    },
    socialStatusText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibolditalic',
        fontSize: THEME.FONT25,
        textAlign: 'center',
        lineHeight: 33
    },
    electionNotHeldText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibolditalic',
        fontSize: THEME.FONT30,
        textAlign: 'center',
    },
    buttonsContainer: {
        flex: 0.1,
        alignItems: 'center',
        width:'100%',
        flexDirection: 'row'
    },
    takePartButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        height: 50,
        borderRadius: 25,
        width: THEME.SCREEN_WIDTH / 2 - 25,
        marginRight: 5
    },  
    nextButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: THEME.SCREEN_WIDTH / 2 - 25,
        height: 50,
        borderRadius: 25,
        marginLeft: 5
    },
    nextButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT17,
    }
});*/