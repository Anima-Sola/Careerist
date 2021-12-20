import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';

export const IntroPage2 = ({ navigation }) => {
    const currentPosessionListIndex = useRef(0);                           
    const [, updateState] = useState();                                 //Just for rerendering
    const forceUpdate = useCallback(() => updateState({}), []);
    const animHeader = useRef(new Animated.Value(0)).current;
    const animPosessionList = useRef(new Animated.Value(0)).current;
    const animNextButton = useRef(new Animated.Value(0)).current;

    
    const posessionList = ['КВАРТИРУ', 'МАШИНУ', 'ВИЛЛУ', 'ЯХТУ', 'САМОЛЕТ'];
    const posessionListPictures = [
        require('../../assets/images/PosessionList/flat.png'), 
        require('../../assets/images/PosessionList/car.png'),
        require('../../assets/images/PosessionList/villa.png'),
        require('../../assets/images/PosessionList/yacht.png'),
        require('../../assets/images/PosessionList/plane.png'),
    ];

    const animateNextButton = () => {
        Animated.timing(
            animNextButton,
            {
                toValue: 1,
                useNativeDriver: true
            }
        ).start();
    }

    const hidePosessionListItem = () => {
        Animated.spring(
            animPosessionList,
            {
                toValue: 0,
                delay: 500,
                tension: 2,
                useNativeDriver: true
            }
        ).start(() => {
            currentPosessionListIndex.current++;
            forceUpdate();
            showPosessionListItem();
        });
    }

    const showPosessionListItem = () => {
        Animated.spring(
            animPosessionList,
            {
                toValue: 1,
                tension: 2,
                useNativeDriver: true
            }).start(() => {
                (currentPosessionListIndex.current < posessionList.length - 1) ? hidePosessionListItem() : animateNextButton();
            }
        )
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
            showPosessionListItem();
        });
    }, [animHeader]);

    const moveToNextIntroPage = () => {
        navigation.navigate('IntroPage3');
    }

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
                <Button buttonStyle={ styles.nextButton } titleStyle={ styles.nextButtonTitle } type="outline" title="Дальше ➞" onPress={ moveToNextIntroPage } />
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
        marginTop: THEME.V_MARGIN10,
    },
    image: {
        width: THEME.SCREEN_WIDTH / 1.4,
        height: THEME.SCREEN_HEIGHT / 1.4,
        marginTop: - 17 * THEME.V_MARGIN10,
        marginBottom: - 14 * THEME.V_MARGIN10
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
  