import React, { useState, useEffect, useReducer } from "react";
import { View, Text, StyleSheet, Pressable, BackHandler } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { THEME } from "../../styles/theme";
import GameWrapper from "../../components/GameWrapper";
import { getIsElectionOverOrNotHeld } from "../../store/selectors";
import CustomAlert from '../../components/CustomAlert';
import { GAME_MAIN_SCREEN_QUIT_GAME_ALERT, GAME_MAIN_SCREEN_SCLEROSIS_WARNING } from "../../store/constants";

export const GameMainScreen = ({ navigation, route }) => {
    const wrappedComponent = <MainMenu navigation={ navigation } route={ route } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
}

const MainMenu = ({ navigation }) => {
    const dispatch = useDispatch();
    //const isElectionOverOrNotHeld  = useSelector( getIsElectionOverOrNotHeld );
    //const canNavToElectionScreen = route.params ? true : isElectionOverOrNotHeld;
    const canNavToElectionScreen = useSelector( getIsElectionOverOrNotHeld );
    //console.log( canNavToElectionScreen );
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
                    return true;
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
        <View style={ styles.container }>
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
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } >
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
        marginBottom: 15
    },
    menu: {
        flex: 1,
        alignItems: 'center',
    },
    menuRow: {
        flexDirection: 'row',
        flex: 0.25,
    },  
    menuItem: {
        margin: 5,
        width: '50%',
        borderRadius: 10,
        justifyContent: 'center'
    },
    menuItemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT17,
        textAlign: 'center',
    }
})