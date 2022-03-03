import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { THEME } from "../../styles/theme";
import GameWrapper from "../../components/GameWrapper";

export const GameMainScreen = ({ navigation }) => {
    const wrappedComponent = <MainMenu navigation={ navigation } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const MainMenu = ({ navigation }) => {
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => { e.preventDefault() })
    })

    const navToGameScreens = ( screen ) => {
        navigation.navigate( screen ); 
    }

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Что вас интересует?</Text>
            <View style={ styles.menu }>
                <View style={ styles.menuRow }>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens('FinancialSituationScreen') }>
                        <Text style={ styles.menuItemText }>Финансовое</Text>
                        <Text style={ styles.menuItemText }>положение</Text>
                    </Pressable>
                    <Pressable style={ THEME.PRESSABLE_STYLES(styles.menuItem) } onPress={ () => navToGameScreens('ElectionScreen') }>
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