import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WelcomeScreen = () => {
    return (
            <View style={ styles.center }>
                <Text>Добро пожаловать в нашу страну, где каждый может стать президентом.</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})