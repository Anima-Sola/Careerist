import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';

export const IntroPage4 = ({ navigate }) => {
    const currentEstateListIndex = useRef(0);                           
    const [, updateState] = useState();                                 //Just for rerendering
    const forceUpdate = useCallback(() => updateState({}), []);
    const animHeader = useRef(new Animated.Value(0)).current;
    const animEstateList = useRef(new Animated.Value(0)).current;
    const animNextButton = useRef(new Animated.Value(0)).current;

    const EstateList = ['БАР', 'РЕСТОРАН', 'МАГАЗИН', 'ОТЕЛЬ', 'ЗАВОД'];
    const EstateListPictures = [
        require('../../assets/images/EstateList/bar.png'), 
        require('../../assets/images/EstateList/restraunt.png'),
        require('../../assets/images/EstateList/shop.png'),
        require('../../assets/images/EstateList/hotel.png'),
        require('../../assets/images/EstateList/plant.png'),
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

    const hideEstateListItem = () => {
        Animated.spring(
            animEstateList,
            {
                toValue: 0,
                delay: 1200,
                tension: 2,
                useNativeDriver: true
            }
        ).start(() => {
            currentEstateListIndex.current++;
            forceUpdate();
            showEstateListItem();
        });
    }

    const showEstateListItem = () => {
        Animated.spring(
            animEstateList,
            {
                toValue: 1,
                tension: 2,
                useNativeDriver: true
            }).start(() => {
                (currentEstateListIndex.current < EstateList.length - 1) ? hideEstateListItem() : animateNextButton();
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
            showEstateListItem();
        });
    }, [animHeader]);

    return (
        <View style={ styles.container } >
            <Animated.View style={{ transform: [{ scale: animHeader }] }}>
                <Text style={ styles.header }>В ВАШЕМ ВЛАДЕНИИ:</Text>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: animEstateList }] }}>
                <Image resizeMode='contain' style={ styles.image }  source={ EstateListPictures[currentEstateListIndex.current] } />
                <Text style={ styles.header }>{ EstateList[currentEstateListIndex.current] }</Text>
            </Animated.View>
            <Animated.View style={{ opacity: animNextButton }}>
                <Button buttonStyle={ styles.nextButton } titleStyle={ styles.nextButtonTitle } type="outline" title="Дальше ➞" />
            </Animated.View>
            <View>
                <Image resizeMode='center' style={ styles.dots }  source={ require('../../assets/images/dotspage4.png') } />
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
        marginLeft: THEME.H_MARGIN10,
        marginRight: THEME.H_MARGIN10,
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
  