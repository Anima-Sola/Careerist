import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';

export const IntroPage2 = () => {
    const currentPosessionListIndex = useRef(0);
    const [index, setIndex] = useState(0);
    const animHeader = useRef(new Animated.Value(0)).current;
    const animPosessionList = useRef(new Animated.Value(0)).current;
    const animNextButton = useRef(new Animated.Value(0)).current;

    const posessionList = ['КВАРТИРУ', 'МАШИНУ'];
    const posessionListPictures = [
        require('../../assets/images/flat.png'), 
        require('../../assets/images/car.png')
    ];

    const animateNextButton = () => {
        Animated.timing(
            animNextButton,
            {
                toValue: 1,
                delay: 1200,
                useNativeDriver: true
            }
        ).start();
    }

    const animatePosessionList = () => {
        Animated.sequence([
            Animated.spring(
                animPosessionList,
                {
                    toValue: 1,
                    tension: 2,
                    useNativeDriver: true
                }
            ),
            Animated.spring(
                animPosessionList,
                {
                    toValue: 0,
                    delay: 1200,
                    tension: 2,
                    useNativeDriver: true
                }
        )]).start((finish) => {
            if(currentPosessionListIndex.current < posessionList.length - 1) {
                currentPosessionListIndex.current++;
                setIndex(index + 1);
                animatePosessionList();
            }
            if(finish) animateNextButton();
        });
    }

    useEffect(() => {
        Animated.spring(
            animHeader,
            {
                toValue: 1,
                tension: 2,
                useNativeDriver: true
            }
        ).start(() => {
            animatePosessionList();
        });
    }, [animHeader]);

    return (
        <View style={ styles.container } >
            <Animated.View style={{ transform: [{ scale: animHeader }] }}>
                <Text style={ styles.header }>ПРЕДСТАВЬТЕ, ЧТО ВЫ ИМЕЕТЕ:</Text>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: animPosessionList }] }}>
                <Image resizeMode='contain' style={ styles.image }  source={ posessionListPictures[currentPosessionListIndex.current] } />
                <Text style={ styles.header }>{ posessionList[currentPosessionListIndex.current] }</Text>
            </Animated.View>
            <Animated.View style={{ opacity: animNextButton }}>
                <Button buttonStyle={ styles.nextButton } titleStyle={ styles.nextButtonTitle } type="outline" title="Дальше ➞" />
            </Animated.View>
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
        width: THEME.SCREEN_WIDTH / 1.8,  //1.8
        height: THEME.SCREEN_HEIGHT / 1.8, // 1.8
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
  