//Side menu that opens by swipe right gesture
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, StyleSheet, Animated, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { Directions, GestureDetector, Gesture } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../styles/theme';
import { SIDE_MENU_START_NEW_GAME } from '../store/constants';
import CustomAlert from '../components/CustomAlert';
import { playSwoosh } from './Sounds';
import { setNavFromGameMainScreenAction } from '../store/actions/actions';

const SideMenu = ( props, ref ) => {
    const dispatch = useDispatch();
    const [ alert, setAlert ] = useState({ isVisible: false, data: SIDE_MENU_START_NEW_GAME });
    const animSideMenu = useRef(new Animated.Value( - THEME.SCREEN_WIDTH )).current;
    const animOverlayOpacity = useRef(new Animated.Value(0)).current;

    useFocusEffect(() => {
        Animated.timing(
            animSideMenu,
            {
                toValue: - THEME.SCREEN_WIDTH,
                duration: 0,
                useNativeDriver: true
            }
        ).start();
    })
    
    useImperativeHandle( ref, () => ({
        showSideMenu: () => { showSideMenu() }
    }))

    const showSideMenu = () => {
        playSwoosh();
        Animated.sequence([
            Animated.timing(
                animSideMenu,
                {
                    toValue: 0,
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
                    toValue: - THEME.SCREEN_WIDTH,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
        ]).start();
    }

    const flingLeftGesture = Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => {
            playSwoosh();
            hideSideMenu();
        });

    const startNewGameAlert = () => {
        hideSideMenu();
        setAlert({
            ...alert,
            isVisible: true,
            buttonsCallbacks: [
                () => {
                    setAlert({ ...alert, isVisible: false });
                    props.navigation.navigate('IntroScreen');
                },
                () => { 
                    setAlert({ ...alert, isVisible: false });
                }
            ]
        })
    }

    return (
        <GestureDetector gesture={ flingLeftGesture }>
            <Animated.View style={{ ...styles.sideMenuContainer, transform: [{ translateX: animSideMenu }] }}>
                <CustomAlert alert={ alert } setAlert={ setAlert } />
                <View style={ styles.sideMenu }>
                    <Pressable 
                        onPress={ () => {
                            playSwoosh();
                            hideSideMenu();
                        }} 
                        style={ styles.closeMenuCross }
                    >
                        <Ionicons name="close-outline" size={ 40 } color= { "black" } />
                    </Pressable>
                    <View style={ styles.sideMenuItems }>
                        <Pressable style={ THEME.SIDE_MENU_PRESSABLE_STYLE( styles.sideMenuItem ) } onPress={ () => startNewGameAlert() }>
                            <Ionicons name="home-outline" size={ 28 } color= { "black" } />
                            <Text style={ styles.sideMenuItemText }>
                                Новая игра
                            </Text>
                        </Pressable>
                        <Pressable style={ THEME.SIDE_MENU_PRESSABLE_STYLE( styles.sideMenuItem ) } onPress={ () => {
                            const navState = props.navigation.getState();
                            const currentScreenName = navState.routes[ navState.index ].name;
                            //Passing the current screen is necessary to set the isNewYearBegun flag in SettingsScreen
                            //Where it doesn't calculate disaster, etc., when you go back to GameMainScreen
                            if( currentScreenName === 'GameMainScreen' ) dispatch(setNavFromGameMainScreenAction( true, true ));
                            props.navigation.navigate( 'SettingsScreen' );
                        }}>
                            <Ionicons name="settings-outline" size={ 28 } color= { "black" } />
                            <Text style={ styles.sideMenuItemText }>
                                Настройки
                            </Text>
                        </Pressable>
                        <Pressable style={ THEME.SIDE_MENU_PRESSABLE_STYLE( styles.sideMenuItem ) }>
                            <Ionicons name="help-circle-outline" size={ 28 } color= { "black" } />
                            <Text style={ styles.sideMenuItemText }>
                                Об игре
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <Pressable onPress={ hideSideMenu }>
                    <Animated.View style={{ ...styles.sideMenuOverlay, opacity: animOverlayOpacity }}>
                    </Animated.View>
                </Pressable>
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
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    sideMenuItemText: {
        color: THEME.SIDE_MENU_ITEMS_TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28,
        marginLeft: 10
    },
    sideMenuOverlay: {
        height: THEME.SCREEN_HEIGHT * 2,
        width: THEME.SCREEN_WIDTH * 0.3,
        backgroundColor: '#000',
        opacity: 0
    }
})

export default forwardRef(SideMenu);