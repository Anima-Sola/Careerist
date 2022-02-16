import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Directions, GestureDetector, Gesture } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
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

    const flingLeftGesture = Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => {
            hideSideMenu();
        });

    return (
        <GestureDetector gesture={ flingLeftGesture }>
            <Animated.View style={{ ...styles.sideMenuContainer, transform: [{ translateX: animSideMenu }] }}>
                <View style={ styles.sideMenu }>
                    <TouchableOpacity onPress={ hideSideMenu } style={ styles.closeMenuCross }>
                        <Ionicons name="close-outline" size={ 40 } color= { "black" } />
                    </TouchableOpacity>
                    <View style={ styles.sideMenuItems }>
                        <TouchableOpacity style={ styles.sideMenuItem }>
                            <Ionicons name="home-outline" size={ 28 } color= { "black" } />
                            <Text style={ styles.sideMenuItemText }>
                                Начать новую игру
                            </Text>
                        </TouchableOpacity>
                        <View style={ styles.separator }></View>
                        <TouchableOpacity style={ styles.sideMenuItem }>
                            <Ionicons name="settings-outline" size={ 28 } color= { "black" } />
                            <Text style={ styles.sideMenuItemText }>
                                Настройки
                            </Text>
                        </TouchableOpacity>
                        <View style={ styles.separator }></View>
                        <TouchableOpacity style={ styles.sideMenuItem }>
                            <Ionicons name="help-circle-outline" size={ 28 } color= { "black" } />
                            <Text style={ styles.sideMenuItemText }>
                                Об игре
                            </Text>
                        </TouchableOpacity>
                        <View style={ styles.separator }></View>
                        <TouchableOpacity style={ styles.sideMenuItem }>
                            <Ionicons name="logo-github" size={ 28 } color= { "black" } />
                            <Text style={ styles.sideMenuItemText }>
                                GitHub
                            </Text>
                        </TouchableOpacity>
                        <View style={ styles.separator }></View>
                        <TouchableOpacity style={ styles.sideMenuItem }>
                            <Ionicons name="exit-outline" size={ 28 } color= { "black" } />
                            <Text style={ styles.sideMenuItemText }>
                                Выход
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity  onPress={ hideSideMenu }>
                    <Animated.View style={{ ...styles.sideMenuOverlay, opacity: animOverlayOpacity }}>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </GestureDetector>
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
        backgroundColor: THEME.SIDE_MENU_BACKGROUND_COLOR,
        paddingTop: THEME.STATUSBAR_HEIGHT,
    },
    closeMenuCross: {
        alignItems: 'flex-end',
        marginRight: 5,
        marginTop: 5 
    },
    sideMenuItems: {
        marginTop: 15,
    },
    sideMenuItem: {
        paddingTop: 8,
        paddingLeft: 15, 
        flexDirection: 'row',
        alignItems: 'center'
    },
    sideMenuItemText: {
        color: THEME.SIDE_MENU_ITEMS_TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT17,
        marginLeft: 10
    },
    separator: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 5
    },
    sideMenuOverlay: {
        height: THEME.SCREEN_HEIGHT * 2,
        width: THEME.SCREEN_WIDTH * 0.3,
        backgroundColor: '#000',
        opacity: 0
    }
})

export default forwardRef(SideMenu);