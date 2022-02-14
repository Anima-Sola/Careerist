import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { THEME } from '../styles/theme';

const SideMenu = ( props, ref ) => {
    const animSideMenu = useRef(new Animated.Value(0)).current;
    const animOverlayOpacity = useRef(new Animated.Value(0)).current;

    useImperativeHandle( ref, () => ({
        showSideMenu: () => { showSideMenu() }
    }))

    const showSideMenu = () => {
        Animated.sequence([
            Animated.timing(
                animSideMenu,
                {
                    toValue: THEME.SCREEN_WIDTH,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                animOverlayOpacity,
                {
                    toValue: 0.2,
                    duration: 1,
                    useNativeDriver: true
                }
            ),
        ]).start();
    }

    const hideSideMenu = () => {
        Animated.sequence([
            Animated.timing(
                animOverlayOpacity,
                {
                    toValue: 0,
                    duration: 1,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                animSideMenu,
                {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
        ]).start();
    }

    return (
        <Animated.View style={{ ...styles.sideMenuContainer, transform: [{ translateX: animSideMenu }] }}>
            <TouchableOpacity style={ styles.sideMenu }>

            </TouchableOpacity>
            <TouchableOpacity  onPress={ hideSideMenu }>
                <Animated.View style={{ ...styles.sideMenuOverlay, opacity: animOverlayOpacity }}>

                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    sideMenuContainer: {
        flex: 1,
        flexDirection: 'row',
        position: "absolute",
        top: 0,
        left: - THEME.SCREEN_WIDTH,
        width: THEME.SCREEN_WIDTH,
        height: THEME.SCREEN_HEIGHT * 2,
    },
    sideMenu: {
        height: THEME.SCREEN_HEIGHT * 2,
        width: THEME.SCREEN_WIDTH * 0.7,
        backgroundColor: '#fff',
    },
    sideMenuOverlay: {
        height: THEME.SCREEN_HEIGHT * 2,
        width: THEME.SCREEN_WIDTH * 0.3,
        backgroundColor: '#000',
        opacity: 0
    }
})

export default forwardRef(SideMenu);