import React, { useState, useReducer } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME } from '../../styles/theme';
import GameWrapper from "../../components/GameWrapper";
import { getCommonSettings } from '../../store/selectors'; 


export const EntertainmentScreen = ({ navigation, route }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Entertainment navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings }/>

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Entertainment = ({ navigation, forceUpdate, commonSettings }) => {
    const dispatch = useDispatch();
    const { cash } = commonSettings;

    const entertain = () => {
        console.log('123');
    }

    return (
        <>
            <View style={ styles.container }>
                <View style={ styles.dataContainer }>
                    <Text style={ styles.text }>Наличные средства { cash }$.</Text>
                    <Text style={ styles.text }>Договоримся об условиях.</Text>
                    <Text style={ styles.text }>Сколько дадите?</Text>
                </View>
            </View>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.entertainButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Развлечься"
                    onPress={ () => entertain() }    
                />
                <Button
                    buttonStyle={ styles.exitButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => navigation.navigate('GameMainScreen') }   
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
    entertainButton: {
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