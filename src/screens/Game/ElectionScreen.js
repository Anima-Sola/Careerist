import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, BackHandler } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'react-native-elements';
import GameWrapper from "../../components/GameWrapper";
import { THEME } from "../../styles/theme";
import { getCurrentSocialStatus, getYear } from "../../store/selectors";
import { SOCIAL_STATUSES } from "../../store/constants";
import { setIsElectionOverOrNotHeld, setSocialStatus } from "../../store/actions/actions";
import CustomAlert from '../../components/CustomAlert';
import { ELECTION_SCREEN_SKIP_ELECTION, ELECTION_SCREEN_LOSE_ELECTION, ELECTION_SCREEN_WIN_ELECTION } from '../../store/constants';

export const ElectionScreen = ({ navigation }) => {
    const wrappedComponent = <Election navigation={ navigation } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const Election = ({ navigation }) => {
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
        dispatch(setIsElectionOverOrNotHeld( true ));
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
            <View style={ styles.nextButtonContainer }>
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
            <View style={ styles.nextButtonContainer }>
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
    nextButtonContainer: {
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
});