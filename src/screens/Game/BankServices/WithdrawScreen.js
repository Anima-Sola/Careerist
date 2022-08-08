import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { THEME } from '../../../styles/theme';
import GameWrapper from '../../../components/GameWrapper';

export const WithdrawScreen = ({ navigation }) => {
    const wrappedComponent = <Withdraw navigation={ navigation } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const Withdraw = ({ navigation }) => {
    return (
        <ScrollView style={ styles.container }>
            <Text style = { styles.text } >Снять со счета</Text>
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
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1.5%')
    },
   
})