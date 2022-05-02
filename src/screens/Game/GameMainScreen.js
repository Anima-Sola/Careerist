import React, { useState, useEffect, useReducer } from "react";
import { View, Text, StyleSheet, Pressable, BackHandler, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { THEME } from "../../styles/theme";
import GameWrapper from "../../components/GameWrapper";
import { getYear, getIsElectionOverOrNotHeld } from "../../store/selectors";
import CustomAlert from '../../components/CustomAlert';
import { GAME_MAIN_SCREEN_QUIT_GAME_ALERT, GAME_MAIN_SCREEN_SCLEROSIS_WARNING } from "../../store/constants";

export const GameMainScreen = ({ navigation }) => {
    const wrappedComponent = <MainMenu navigation={ navigation }/>

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
}

const MainMenu = ({ navigation }) => {
    const dispatch = useDispatch();
    const canNavToElectionScreen = useSelector( getIsElectionOverOrNotHeld );
    const year = useSelector( getYear );
    const [ alert, setAlert ] = useState({ 
        isVisible: false, 
        data: GAME_MAIN_SCREEN_QUIT_GAME_ALERT,
        buttonsCallbacks: [
            () => setAlert({ ...alert, isVisible: false }),
            () => { 
                setAlert({ ...alert, isVisible: false }); 
                BackHandler.exitApp(); 
            }
        ]
    });

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            const navState = navigation.getState();
            const currentScreenName = navState.routes[ navState.index ].name;
            switch( currentScreenName ) {
                case 'GameMainScreen':
                    setAlert({ ...alert, isVisible: true, data: GAME_MAIN_SCREEN_QUIT_GAME_ALERT });
                    return true;
                case 'ElectionScreen':
                    return (Number.isInteger( year / 2 )) ? true : false;
                    //return true;
                default:
                    return false;
            }

        })
        return () => backHandler.remove();
    })

    const navToGameScreens = ( screen, params = {} ) => {
        navigation.navigate( screen, params ); 
    }

    const navToElectionScreen = () => {
        if( canNavToElectionScreen ) {
            setAlert({ ...alert, isVisible: true, data: GAME_MAIN_SCREEN_SCLEROSIS_WARNING })
            return;
        }
        navToGameScreens( 'ElectionScreen' );
    }

    return (
        <ScrollView style={ styles.container }>
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <Text style={ styles.title }>Что вас интересует?</Text>
            <View style={ styles.menu }>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'FinancialSituationScreen' ) }>
                        <Text style={ styles.menuItemText }>Финансовое</Text>
                        <Text style={ styles.menuItemText }>положение</Text>
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ navToElectionScreen }>
                        <Text style={ styles.menuItemText }>Общественное</Text>
                        <Text style={ styles.menuItemText }>положение</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'PossessionScreen' ) } >
                        <Text style={ styles.menuItemText }>Личное</Text>
                        <Text style={ styles.menuItemText }>имущество</Text>
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } >
                        <Text style={ styles.menuItemText }>Подчиненные</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } >
                        <Text style={ styles.menuItemText }>Биржа</Text>
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } >
                        <Text style={ styles.menuItemText }>Бизнес</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } >
                        <Text style={ styles.menuItemText }>Банк</Text>
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } >
                        <Text style={ styles.menuItemText }>Развлечения</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginBottom: hp('1%'),
        marginTop: hp('1%'),
    },
    title: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1%')
    },
    menu: {
        flex: 1,
        alignItems: 'center',
    },
    menuRow: {
        flexDirection: 'row',
        height: THEME.SCREEN_WIDTH * 0.5 - wp('4%')
    },  
    menuItem: {
        margin: 5,
        width: THEME.SCREEN_WIDTH * 0.5 - wp('4%'),
        borderRadius: wp('3%'),
        justifyContent: 'center'
    },
    menuItemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT30,
        textAlign: 'center',
    }
})