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
                <Image style={ styles.image } resizeMode='center' source={ require('../../assets/images/swipe.gif') } />
            </View>
            <View style={ styles.dotsContainer }>
                <Image style={ styles.image } resizeMode='center' source={ require('../../assets/images/dotspage1.png') } />
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
        flex: 0.45,
        justifyContent: 'center',
        /*borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 1*/
    },
    image: {
        width: 0.40 * THEME.SCREEN_WIDTH,
        height: 0.40 * THEME.SCREEN_WIDTH * THEME.SCREEN_ASPECT_RATIO,
    },
    headerContainer: {
        flex: 0.27,
        justifyContent: 'center',
    },
    header: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontStyle: 'normal',
        fontWeight: "100",
        fontSize: THEME.FONT30,
        textAlign: 'center',
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT20,
        textAlign: 'center',
        marginTop: THEME.V_MARGIN10,
    },
    swipeContainer: {
        flex: 0.12,
        justifyContent: "center",
    },
    dotsContainer: {
        flex: 0.06,
        justifyContent: "center",
    },
    missButtonContainer: {
        flex: 0.10,
        justifyContent: "center",
        width: '70%',
        margin: 1
    },
    missButton: {
        borderRadius: 40,
        backgroundColor: "#940068",
        borderColor: "#fff",
        borderWidth: 1,
        paddingTop: THEME.V_MARGIN10,
        paddingBottom: THEME.V_MARGIN10,
        width: '100%'
    },
    missButtonTitle: {
        fontFamily: 'nunito-extralight',
        color: "#fff",
    }
});