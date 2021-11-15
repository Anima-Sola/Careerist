import React, { useRef, useEeffect, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import PagerView from 'react-native-pager-view';
import { THEME } from '../styles/theme';

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true
        }
      ).start();
    }, [fadeAnim])
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }

const PageOne = () => {
    return (
        <View style={ styles.page } key="1">
            <FadeInView>
                <Image resizeMode='center' style={ styles.image } source={ require('../assets/images/jentleman.png') } />
            </FadeInView>
            <FadeInView>
                <Text style={ styles.header }>ДОБРО</Text>
                <Text style={ styles.header }>ПОЖАЛОВАТЬ</Text>
                <Text style={ styles.text }>в нашу страну, где каждый может стать президентом!!!</Text>
            </FadeInView>
            <Button buttonStyle={ styles.nextButton } titleStyle={ styles.nextTitleButton } type="outline" title="Дальше ➞" />
            <Image resizeMode='center' style={ styles.dots }  source={ require('../assets/images/dotspage1.png') } />
            <Button buttonStyle={ styles.missButton } titleStyle={ styles.missTitleButton } type="outline" title="Пропустить заставку" />
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
        margin: 10,
        marginBottom: 30
    },
    image: {
        width: THEME.SCREEN_WIDTH / 4,
        height: THEME.SCREEN_HEIGHT / 4,
        marginTop: 20
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
    nextTitleButton: {
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
    missTitleButton: {
        fontFamily: 'nunito-extralight',
        color: "#fff",
    }
  });
  