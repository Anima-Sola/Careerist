import React, { useEffect } from "react";
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { Button } from 'react-native-elements';
import GameWrapper from "../../components/GameWrapper";
import { THEME } from "../../styles/theme";
import { getCurrentSocialStatus } from "../../store/selectors";
import { SOCIAL_STATUSES } from "../../store/constants";

export const ElectionScreen = ({ navigation }) => {
    const wrappedComponent = <Election navigation={ navigation } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const Election = ({ navigation }) => {
    const currentSocialStatus = useSelector( getCurrentSocialStatus );
    
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => { generateGameEvent() })
    })

    const generateGameEvent = () => {
        //console.log('Something Happened');
    }

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Общественное положение</Text>
            <View style={ styles.dataContainer }>
                <Text style={{ ...styles.text, marginBottom: 20 }}>В настоящее время вы</Text>
                <Text style={ styles.socialStatusText }>{ SOCIAL_STATUSES[ currentSocialStatus ] }</Text>
                <Text style={ styles.text }>Примите участие в выборах.</Text>
                <Text style={ styles.socialStatusText }>Избирается { SOCIAL_STATUSES[ currentSocialStatus + 1 ] }</Text>
            </View>
            <View style={ styles.nextButtonContainer }>
                <Button
                    buttonStyle={ styles.nextButton } 
                    titleStyle={ styles.nextButtonTitle }
                    type="outline" 
                    title="Продолжить"
                    onPress={ () => navigation.navigate('GameMainScreen') }  
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    title: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-lightitalic',
        fontSize: THEME.FONT20,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 25
    },
    dataContainer: {
        flex: 0.9,
        alignItems: 'center',
        //justifyContent: 'center'
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT20,
        textAlign: 'center',
    },
    socialStatusText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT30,
        textAlign: 'center',
    },
    nextButtonContainer: {
        flex: 0.1,
        justifyContent: 'flex-end',
        width:'100%',
    },
    nextButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '100%',
        height: 50,
        borderRadius: 25,
    },
    nextButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT17,
    }
});