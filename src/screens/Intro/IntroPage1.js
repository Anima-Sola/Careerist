import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';

export const IntroPage1 = () => {
    const animHeaderSpring = useRef(new Animated.Value(5)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.spring(
                animHeaderSpring,
                {
                    toValue: 1,
                    tension: 2,
                    useNativeDriver: true
                }
            )]).start();
    }, [animHeaderSpring]);

    return (
        <View style={ styles.container }>
            <View style={ styles.imageContainer }>
                <Image resizeMode='center' style={ styles.image } source={ require('../../assets/images/jentleman.png') } />
            </View>
            <View style={ styles.headerContainer }>
                <Animated.View style={{ transform: [{ scale: animHeaderSpring }] }}>
                    <Text style={ styles.header }>ДОБРО</Text>
                    <Text style={ styles.header }>ПОЖАЛОВАТЬ</Text> 
                </Animated.View>
                <Animated.View style={{ transform: [{ scale: animHeaderSpring }] }}>
                    <Text style={ styles.text }>в нашу страну, где каждый может стать президентом!!!</Text>
                </Animated.View>
            </View>
            <View style={ styles.swipeContainer }>
                <Image resizeMode='center' source={ require('../../assets/images/swipe.gif') } />
            </View>
            <View style={ styles.dotsContainer }>
                <Image resizeMode='center' source={ require('../../assets/images/dotspage1.png') } />
            </View>
            <View style={ styles.missButtonContainer }>
                <Button buttonStyle={ styles.missButton } titleStyle={ styles.missButtonTitle } type="outline" title="К игре" />
            </View>
        </View>
    )
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: THEME.STATUSBAR_HEIGHT,
    },
    imageContainer: {
        flex: 0.50,
        /*borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 1*/
    },
    image: {
        width: 0.5 * THEME.SCREEN_WIDTH,
        height: 0.5 * THEME.SCREEN_WIDTH * THEME.ASPECT_RATIO,
    },
    headerContainer: {
        flex: 0.22,
        justifyContent: 'flex-start',
        /*borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 1*/
    },
    header: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontStyle: 'normal',
        fontWeight: "100",
        fontSize: THEME.FONT_LARGE,
        textAlign: 'center',
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT_MEDIUM,
        textAlign: 'center',
        marginTop: THEME.V_MARGIN10,
    },
    swipeContainer: {
        flex: 0.13,
        justifyContent: "center",
        /*borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 1*/
    },
    dotsContainer: {
        flex: 0.05,
        justifyContent: "center",
        /*borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 1*/
    },
    missButtonContainer: {
        flex: 0.10,
        justifyContent: "center",
        width: '70%'
    },
    missButton: {
        borderRadius: 40,
        backgroundColor: "#940068",
        borderColor: "#fff",
        paddingTop: THEME.V_MARGIN10,
        paddingBottom: THEME.V_MARGIN10,
        width: '100%'
    },
    missButtonTitle: {
        fontFamily: 'nunito-extralight',
        color: "#fff",
    }
});