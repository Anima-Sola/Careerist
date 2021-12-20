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
        <View style={ styles.container } key="1">
            <View>
                <Image resizeMode='center' style={ styles.image } source={ require('../../assets/images/jentleman.png') } />
            </View>
            <View>
                <Animated.View style={{ transform: [{ scale: animHeaderSpring }] }}>
                    <Text style={ styles.header }>ДОБРО</Text>
                    <Text style={ styles.header }>ПОЖАЛОВАТЬ</Text> 
                </Animated.View>
                <Animated.View style={{ transform: [{ scale: animHeaderSpring }] }}>
                    <Text style={ styles.text }>в нашу страну, где каждый может стать президентом!!!</Text>
                </Animated.View>
            </View>
            <View>
                <Image resizeMode='center' style={ styles.dots }  source={ require('../../assets/images/dotspage1.png') } />
            </View>
            <Button buttonStyle={ styles.missButton } titleStyle={ styles.missButtonTitle } type="outline" title="К игре" />
        </View>
    )
}
  
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR
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
        marginRight: THEME.H_MARGIN10,
        marginLeft: THEME.H_MARGIN10,
    },
    image: {
        width: THEME.SCREEN_WIDTH / 3,
        height: THEME.SCREEN_HEIGHT / 3,
        marginTop: 2 * THEME.V_MARGIN10
    },
    dots: {
        width: THEME.SCREEN_WIDTH / 5,
    },
    nextButton: {
        borderRadius: 40,
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        borderColor: THEME.TEXT_COLOR,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 40,
        paddingRight: 40,
        fontFamily: 'nunito-extralight',
        color: "#fff"
    },
    nextButtonTitle: {
        fontFamily: 'nunito-extralight',
        color: "#fff",
        fontSize: THEME.FONT_SMALL
    },
    missButton: {
        borderRadius: 40,
        backgroundColor: "#940068",
        borderColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 40,
        paddingRight: 40
    },
    missButtonTitle: {
        fontFamily: 'nunito-extralight',
        color: "#fff",
    }
});