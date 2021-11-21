import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';

export const IntroPage2 = () => {
    const animSpring = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.spring(
                animSpring,
                {
                    toValue: 1,
                    tension: 2,
                    useNativeDriver: true
                }
            ),
            ]).start();
    }, [animSpring]);

    return (
        <View style={ styles.container } >
            <Animated.View style={{ transform: [{ scale: animSpring }] }}>
                <Text style={ styles.header }>ПРЕДСТАВЬТЕ, ЧТО ВЫ ИМЕЕТЕ:</Text>
            </Animated.View>
            <View>
                <Image resizeMode='contain' style={ styles.image }  source={ require('../../assets/images/flat.png') } />
                <Text style={ styles.header }>КВАРТИРУ</Text>
            </View>
            <View>
                <Button buttonStyle={ styles.nextButton } titleStyle={ styles.nextButtonTitle } type="outline" title="Дальше ➞" />
            </View>
            <View>
                <Image resizeMode='center' style={ styles.dots }  source={ require('../../assets/images/dotspage2.png') } />
            </View>
            <Button buttonStyle={ styles.missButton } titleStyle={ styles.missButtonTitle } type="outline" title="Пропустить заставку" />
        </View>
    )
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: THEME.V_MARGIN10
    },
    image: {
        width: THEME.SCREEN_WIDTH / 1.8, 
        height: THEME.SCREEN_HEIGHT / 1.8,
        marginTop: - 8 * THEME.V_MARGIN10,
        marginBottom: - 11 * THEME.V_MARGIN10
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
        color: "#fff",
        marginTop: 2 * THEME.V_MARGIN10
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
  