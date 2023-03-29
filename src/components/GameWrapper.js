import React, { useRef, useReducer } from "react";
import { View, Text, StyleSheet, Pressable, StatusBar } from 'react-native';
import { useStore } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Directions, GestureDetector, Gesture } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from "../styles/theme";
import SideMenu from "./SideMenu";

const GameWrapper = ({ wrappedComponent, commonSettings }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const { year, cash, playerAge, yearsPassed } = commonSettings;
    const store = useStore();
    const childRef = useRef();

    useFocusEffect(() => {
        const commonSettings = store.getState().gameSettingsReducer.commonSettings;
        if( ( commonSettings.cash !== cash) || 
            ( commonSettings.yearsPassed !== yearsPassed ) || 
            ( commonSettings.playerAge !== playerAge )) 
        forceUpdate(); 
    })

    const flingRightGesture = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => {
            childRef.current.showSideMenu();
        });

    return (
        <GestureDetector gesture={ flingRightGesture }>
            <View style={ styles.container }>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={ styles.paddingStatusBar }></View>
                <View style={ styles.header }>
                    <Pressable onPress={() => { childRef.current.showSideMenu() }}>  
                        <Ionicons name="ios-menu" size={32} color="white"/>
                    </Pressable> 
                    <View style={ styles.walletContainer }>
                        <Ionicons name="wallet-outline" size={32} color="white" />
                        <Text style={ styles.wallet }>{ Math.floor( cash ) }$</Text>
                    </View>
                </View>
                { wrappedComponent }
                <View style={ styles.footer }>
                    <Text style={ styles.footerText }>Год: { year + yearsPassed }</Text>
                    <Text style={ styles.footerText }>Ваш возраст: { playerAge }</Text>
                </View>
                <SideMenu ref={ childRef } navigation={ wrappedComponent.props.navigation }/>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.FORTH_BACKGROUND_COLOR,
        paddingBottom: -500,
    },
    paddingStatusBar: {
        paddingTop: THEME.STATUSBAR_HEIGHT,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        paddingTop: hp('1%'),
        height: hp('8%'),
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    wallet: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT35,
        paddingLeft: 10  
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        height: hp('6%'),
        borderBottomWidth: 1,
        borderBottomColor: THEME.MAIN_BACKGROUND_COLOR,
    }, 
    footerText: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT30,
        paddingBottom: hp('1.2%')
    },
})

export default GameWrapper;