import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'react-native-elements';
import GameWrapper from "../../components/GameWrapper";
import { THEME } from "../../styles/theme";
import { getCurrentSocialStatus, getYear } from "../../store/selectors";
import { SOCIAL_STATUSES } from "../../store/constants";
import { setIsElectionOverOrNotHeld } from "../../store/actions/actions";

export const ElectionScreen = ({ navigation }) => {
    const wrappedComponent = <Election navigation={ navigation } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const Election = ({ navigation }) => {
    const dispatch = useDispatch();
    const electionResult = useRef( 'Следующие выборы через 2 года...' );
    const year = useSelector( getYear );
    const currentSocialStatus = useSelector( getCurrentSocialStatus );
    
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => { generateGameEvent() })
    })

    const generateGameEvent = () => {
        //dispatch(setIsElectionOverOrNotHeld( true ));
        if(Number.isInteger( year / 2 )) {
            Alert.alert(
                "Выборы завершены!!!",
                electionResult.current,
                [
                    {
                        text: 'ОК',
                        onPress: () => {},
                        style: "cancel"
                    }
                ]
            );
        }
    }

    const participationInElection = () => {
        electionResult.current = 'Вы набрали только 40% голосов. Следующие выборы через 2 года...';
        navigation.navigate('GameMainScreen');
    }

    const isElectionHeld = (
        <View style={ styles.container }>
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
                    onPress={ participationInElection }  
                />
                <Button
                    buttonStyle={ styles.nextButton } 
                    titleStyle={ styles.nextButtonTitle }
                    type="outline" 
                    title="Нет"
                    onPress={ () => navigation.navigate('GameMainScreen') }  
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
                    onPress={ participationInElection }  
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
        lineHeight: 30
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