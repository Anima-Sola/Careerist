import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Directions, GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from "../styles/theme";
import { getCash } from "../store/selectors";
import SideMenu from "./SideMenu";

const GameWrapper = ({ wrappedComponent }) => {
    const cash = useSelector( getCash );
    const childRef = useRef();

    const flingRightGesture = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => {
            childRef.current.showSideMenu();
        });

    return (
        <GestureDetector gesture={ flingRightGesture }>
            <View style={ styles.container }>
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
            <SideMenu ref={ childRef }/>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: THEME.STATUSBAR_HEIGHT + 10,
        width: '100%',
        borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 1
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    walletContainer: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    wallet: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT25,
        paddingLeft: 10  
    }
})

export default GameWrapper;