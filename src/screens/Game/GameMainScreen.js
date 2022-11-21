import React, { useState, useEffect, useReducer } from "react";
import { View, Text, StyleSheet, Pressable, BackHandler, ScrollView } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { useStore, useSelector } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME } from "../../styles/theme";
import GameWrapper from "../../components/GameWrapper";
import { getCommonSettings, getPossessionSettings } from "../../store/selectors";
import CustomAlert from '../../components/CustomAlert';
import { GAME_MAIN_SCREEN_QUIT_GAME_ALERT, GAME_MAIN_SCREEN_SCLEROSIS_WARNING } from "../../store/constants";
import calcSubtotals from "../../components/CalcSubtotals";

export const GameMainScreen = ({ navigation }) => {
    const [, forceUpdate ] = useReducer(x => x + 1, 0);
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <MainMenu navigation={ navigation } forceUpdate={ forceUpdate } commonSettings={ commonSettings }/>

    return(
        <GameWrapper navigation={ navigation } wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
}

const MainMenu = ({ navigation, forceUpdate, commonSettings }) => {
    const store = useStore();
    const { cash, electionStatus, yearsPassed } = commonSettings;
    const { possessionList } = useSelector( getPossessionSettings );
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

    useFocusEffect(() => {
        const commonSettings = store.getState().gameSettingsReducer.commonSettings;
        const currentElectionStatus = commonSettings.electionStatus;
        const currentCash = commonSettings.cash;
        if(( currentElectionStatus !== electionStatus ) || ( currentCash != cash )) forceUpdate(); 
    })

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            const navState = navigation.getState();
            const currentScreenName = navState.routes[ navState.index ].name;
            switch( currentScreenName ) {
                case 'GameMainScreen':
                    setAlert({ ...alert, isVisible: true, data: GAME_MAIN_SCREEN_QUIT_GAME_ALERT });
                    return true;
                case 'ElectionScreen':
                    return (( yearsPassed % 2 ) === 0) ? true : false;
                case 'InsuranceScreen':
                    if( possessionList.indexOf( true ) === -1 ) navigation.navigate('GameMainScreen');
                    else navigation.navigate('BankScreen');
                    return true;
                default:
                    return false;
            }

        })
        return () => backHandler.remove();
    })

    const navToGameScreens = ( screen, timeStep = 0, params = {} ) => {
        calcSubtotals( timeStep );
        navigation.navigate( screen, params ); 
    }

    const navToElectionScreen = ( timeStep = 0 ) => {
        calcSubtotals( timeStep );
        if( !electionStatus ) {
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
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToElectionScreen( 0.3 ) }>
                        <Text style={ styles.menuItemText }>Общественное</Text>
                        <Text style={ styles.menuItemText }>положение</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'PossessionScreen', 1 ) }>
                        <Text style={ styles.menuItemText }>Личное</Text>
                        <Text style={ styles.menuItemText }>имущество</Text>
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'EmployeesScreen', 1 ) }>
                        <Text style={ styles.menuItemText }>Подчиненные</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'BusinessScreen', 1 ) }>
                        <Text style={ styles.menuItemText }>Бизнес</Text>
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens( 'StockmarketScreen', 0.4 ) }>
                        <Text style={ styles.menuItemText }>Биржа</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ 
                        () => navToGameScreens( 'BankScreen', { 
                            navigateFromMainScreen: true
                        })}>
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