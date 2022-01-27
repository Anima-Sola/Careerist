import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from "../../styles/theme";

export const MainScreen = () => {
    return (
        <View style={ styles.container }>
            <Text>Это главный экран!!!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        paddingTop: THEME.STATUSBAR_HEIGHT,
        paddingLeft: 20,
        paddingRight: 20
    },
})