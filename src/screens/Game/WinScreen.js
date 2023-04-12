import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@rneui/themed';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCommonSettings } from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { setIsNewYearBegun } from '../../store/actions/actions';
import { playButtonClick } from '../../components/Sounds';

import FireworkImage from "../../assets/images/firework.png";

export const WinScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Win navigation={ navigation } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Win = ({ navigation }) => {
    const dispatch = useDispatch();

    const startNewGame = () => {
        dispatch(setIsNewYearBegun( false, true ));
        navigation.navigate('IntroScreen');
    }

    return (
        <View style={ styles.wrapper }>
            <ScrollView style={ styles.container }>
                <View style={ styles.dataContainer }>
                    <Image style={ styles.image } resizeMode='center' source={ FireworkImage } />
                    <Text style={{ ...styles.text, marginBottom: hp('2%'), fontFamily: THEME.FONT_SEMIBOLD }}>ВЫ ДОСТИГЛИ НЕВОЗМОЖНОГО!</Text>
                    <Text style={{ ...styles.text, marginBottom: hp('2%'), fontFamily: THEME.FONT_SEMIBOLD }}>Поздравляем, теперь вы ПРЕЗИДЕНТ!</Text>
                </View>
            </ScrollView>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Начать заново"
                    onPress={ () => {
                      playButtonClick(); 
                      startNewGame();
                    }}  
                />
            </View>
        </View>
    )
}
    
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        marginBottom: hp('1%'),
        marginTop: hp('1%'),
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR
    },
    container: {
        flex: 1,
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: hp('2%')
    },
    dataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%'),
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT35,
        textAlign: 'center',
    },
    image: {
        height: hp('35%'),
        width: hp('35%'),
        alignSelf: 'center',
        marginBottom: hp('4%')
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '96%',
        marginBottom: hp('1%'),
        alignSelf: 'center'
    },
    button: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '100%',
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28,
    }
});


/*import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const Fireworks = () => {
  const circleRefs = useRef([]);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateFireworks();
  }, []);

  const animateFireworks = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start(() => {
        resetAnimation();
    });
  }

  const resetAnimation = () => {
    animation.setValue(0);
    circleRefs.current.forEach(circle => {
        circle.setNativeProps({ style: { backgroundColor: getRandomColor(), transform: [{ scale: 0 }] } });
    });
    animateFireworks();
  }

  const getRandomColor = () => {
      const colors = ['#FF6B6B', '#FFE66D', '#8BC34A', '#00BCD4', '#9C27B0', '#3F51B5'];
      return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <View style={styles.container}>
      {[1,2,3,4,5,6,7,8,9,10].map((i) => (
        <View
          key={i}
          ref={ref => circleRefs.current[i] = ref}
          style={[styles.circle, { backgroundColor: getRandomColor() }]}
        />
      ))}
      <View style={styles.circle}>
        <Animated.View
          style={[styles.core, {
              transform: [{
                  scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.01, 1],
                  }),
              }]
          }]}
        />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: 'red',\n    position: 'absolute'
  },
  core: {
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    backgroundColor: 'orange',
    position: 'absolute',
  },
});

export default Fireworks;*/