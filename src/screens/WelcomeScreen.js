import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import PagerView from 'react-native-pager-view';
import { THEME } from '../styles/theme';


const PageOne = () => {
    return (
        <View style={ styles.page } key="1">
            <Text style = { styles.H1 }>Добро пожаловать</Text>
            <Text style = { styles.H2 }>в нашу страну,</Text>
            <Image resizeMode = 'center' style = { styles.imageSize } source = { require('../assets/images/jentleman.png') } />
            <Text style = { styles.H2 }>где каждый может стать президентом!!!</Text>
            <Image resizeMode = 'center' style = { styles.dots }  source = { require('../assets/images/dotspage1.png') } />
            <Button style = { styles.missButton } color={THEME.MAIN_BACKGROUND_COLOR} title="Пропустить" />
        </View>
    )
}

const PageTwo =() => {
    return (
        <View style={ styles.page } key="2">
            <Image resizeMode = 'center' style = { styles.dots } source = { require('../assets/images/dotspage2.png') } />
        </View>
    )
}

const PageThree =() => {
    return (
        <View style={ styles.page } key="3">
            <Image resizeMode = 'center' style = { styles.dots } source = { require('../assets/images/dotspage3.png') } />
        </View>
    )
}

const PageFour =() => {
    return (
        <View style={ styles.page } key="4">
            <Image resizeMode = 'center' style = { styles.dots } source = { require('../assets/images/dotspage4.png') } />
        </View>
    )
}

const PageFive =() => {
    return (
        <View style={ styles.page } key="5">
            <Image resizeMode = 'center' style = { styles.dots } source = { require('../assets/images/dotspage5.png') } />
        </View>
    )
}

export const WelcomeScreen = () => {
    return (
        <PagerView style={ styles.container } initialPage={0}>
            {PageOne()}
            {PageTwo()}
            {PageThree()}
            {PageFour()}
            {PageFive()}
        </PagerView>
    );
}
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR
    },
    H1: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'roboto-light',
        fontSize: THEME.FONT_XLARGE,
        textAlign: 'center'
    },
    H2: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'roboto-light',
        fontSize: THEME.FONT_LARGE,
        textAlign: 'center'
    },
    imageSize: {
        width: THEME.SCREEN_WIDTH / 2.2,
        height: THEME.SCREEN_HEIGHT / 2.2,
        marginTop: 10,
        marginBottom: 10
    },
    dots: {
        margin: 20,
        width: THEME.SCREEN_WIDTH / 5,
    },
    missButton: {
        borderColor: '#000',
    }
  });
  