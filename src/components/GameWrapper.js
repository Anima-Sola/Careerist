import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { Directions, GestureDetector, Gesture } from "react-native-gesture-handler";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from "../styles/theme";
import { getCash, getYear, getPlayerAge } from "../store/selectors";
import SideMenu from "./SideMenu";

const GameWrapper = ({ wrappedComponent }) => {
    const cash = useSelector( getCash );
    const year = useSelector( getYear );
    const playerAge = useSelector( getPlayerAge ); 
    const childRef = useRef();

    const flingRightGesture = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => {
            childRef.current.showSideMenu();
        });

    return (
        <GestureDetector gesture={ flingRightGesture }>
            <View style={ styles.container }>
                <View style={ styles.paddingStatusBar }></View>
                <View style={ styles.header }>
                    <Pressable onPress={() => { childRef.current.showSideMenu() }}>  
                        <Ionicons name="ios-menu" size={32} color="white"/>
                    </Pressable> 
                    <View style={ styles.walletContainer }>
                        <Ionicons name="wallet-outline" size={32} color="white" />
                        <Text style={ styles.wallet }>{ cash + '$' }</Text>
                    </View>
                </View>
                { wrappedComponent }
                <View style={ styles.footer }>
                    <Text style={ styles.footerText }>Год: { year }</Text>
                    <Text style={ styles.footerText }>Возраст: { playerAge }</Text>
                </View>
            <SideMenu ref={ childRef } navigation={ wrappedComponent.props.navigation }/>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
    },
    paddingStatusBar: {
        paddingTop: THEME.STATUSBAR_HEIGHT,
        backgroundColor: THEME.FORTH_BACKGROUND_COLOR, 
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        height: hp('8%'),
        backgroundColor: THEME.FORTH_BACKGROUND_COLOR,
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    wallet: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT35,
        paddingLeft: 10  
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: hp('8%'),
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        backgroundColor: THEME.FORTH_BACKGROUND_COLOR,
    }, 
    footerText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT30,
        
    }
})

export default GameWrapper;