import React, { Component, useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, StatusBar, BackHandler, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationBar } from "expo-navigation-bar";
import * as SystemUI from 'expo-system-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import CustomAlert from '../../components/CustomAlert';
import { GAME_MAIN_SCREEN_QUIT_GAME_ALERT } from '../../store/constants';
import { THEME } from '../../styles/theme';
import { saveGameSettingsInitialState, loadAppSettings, loadGameSettings } from '../../store/actions/actions';
import { playSlideChange } from '../../components/Sounds';

const slides = [
    {
        key: 'one',
        title: 'ДОБРО \n ПОЖАЛОВАТЬ',
        text: 'в нашу страну, где каждый \nможет стать президентом.',
        image: require('../../assets/images/intro/welcome.png'),
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        color: THEME.TEXT_COLOR
    },
    {
        key: 'two',
        title: 'Представьте, что вы \nимеете:',
        text: 'Квартиру, машину, виллу, \nяхту, самолет.',
        image: require('../../assets/images/intro/possession.png'),
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
    },
    {
        key: 'three',
        title: 'У вас в подчинении \nнаходятся:',
        text: 'Маклер, врач, адвокат, \nдетектив, личная охрана.',
        image: require('../../assets/images/intro/employees.png'),
        backgroundColor: THEME.THIRD_BACKGROUND_COLOR,
    },
    {
        key: 'four',
        title: 'В вашем владении \nимеются:',
        text: 'Бар, ресторан, магазин, \nотель, завод.',
        image: require('../../assets/images/intro/business.png'),
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
    },
    {
        key: 'five',
        title: 'А на счету в банке \nлежит',
        text: '1.000.000$\n',
        image: require('../../assets/images/intro/money.png'),
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
    },
    {
        key: 'six',
        title: '...но пока это мечты.\n',
        text: 'Реализуйте их!!!\n',
        image: require('../../assets/images/intro/dream.png'),
        backgroundColor: THEME.THIRD_BACKGROUND_COLOR,
    }
];

//Slider component
class Intro extends Component {

    _renderItem = ({ item }) => {
        return (
            <View style={{ ...styles.container, backgroundColor: item.backgroundColor }}>
                <Image style={ styles.image } resizeMode='center' source={ item.image } />
                <View style={ styles.textContainer }>
                    <Text style={ styles.title }>{ item.title }</Text>
                    <Text style={ styles.text }>{ item.text }</Text>
                </View>
            </View>
        );
    }

    _renderNextButton = () => {
        return (
            <View style={ styles.buttonCircle }>
                <Icon
                    name="arrow-forward-outline"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };

    _renderDoneButton = () => {
        return (
            <View style={ styles.buttonCircle }>
                <Icon
                    name="checkmark"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };

    _renderSkipButton = () => {
        return (
            <View style={ styles.skipButton }>
                <Text style={ styles.skipButtonText }>К игре</Text>
            </View>
        );
    }

    _renderPagination = (activeIndex) => {
        const isLastSlide = activeIndex === slides.length - 1;

        return (
            <View style={[ styles.paginationContainer, { bottom: this.props.insets.bottom + 16 } ]}>
                <View style={ styles.paginationDots }>
                    {slides.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[ styles.dot, index === activeIndex ? styles.activeDot : styles.dotInactive ]}
                            onPress={() => this.slider.goToSlide(index, true)}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.rightButtonContainer}
                    onPress={() => isLastSlide
                        ? this._navToSetGameDifficultyScreen()
                        : this.slider.goToSlide(activeIndex + 1, true)}
                >
                    {isLastSlide ? this._renderDoneButton() : this._renderNextButton()}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.leftButtonContainer}
                    onPress={this._navToSetGameDifficultyScreen}
                >
                    {this._renderSkipButton()}
                </TouchableOpacity>
            </View>
        );
    }

    _navToSetGameDifficultyScreen = () => {
        playSlideChange();
        this.props.navigation.navigate('SetGameDifficultyScreen');
    }

    _setSlideBackground = (index) => {
        SystemUI.setBackgroundColorAsync(slides[index].backgroundColor);
    }

    componentDidMount() {
        this._setSlideBackground(0);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor="transparent" />
                <AppIntroSlider
                    data={ slides }
                    renderItem={ this._renderItem }
                    showSkipButton={ true }
                    renderDoneButton={ this._renderDoneButton }
                    renderNextButton={ this._renderNextButton }
                    renderSkipButton={ this._renderSkipButton }
                    renderPagination={ this._renderPagination }
                    onSlideChange={ (index) => {
                        playSlideChange();
                        this._setSlideBackground(index);
                    } }
                    onDone={ this._navToSetGameDifficultyScreen }
                    onSkip={ this._navToSetGameDifficultyScreen }
                    ref={( ref ) => ( this.slider = ref )}
                />
                <NavigationBar hidden={false} />
            </View>
        );
    }
}

const IntroScreen = ({ navigation }) => {
    const ref = useRef();
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const [ alert, setAlert ] = useState({ 
        isVisible: false, 
        data: GAME_MAIN_SCREEN_QUIT_GAME_ALERT,
        buttonsCallbacks: [
            () => setAlert({ ...alert, isVisible: false }),
            () => { 
                setAlert({ ...alert, isVisible: false }); 
                setTimeout( () => BackHandler.exitApp(), 500 ); 
            }
        ]
    });

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            const navState = navigation.getState();
            const currentScreenName = navState.routes[ navState.index ].name;
            if( currentScreenName !== 'IntroScreen' ) return;
                
            setAlert({ ...alert, isVisible: true });
            return true;
        })
        return () => backHandler.remove();
    })

    //Set initial state then focus screen
    useFocusEffect(() => {
        dispatch( saveGameSettingsInitialState() );
        dispatch( loadAppSettings() );
        dispatch( loadGameSettings() );
        ref.current.slider.goToSlide( 0 );
    })

    return (
        <View style={ styles.wrapper }>
            <CustomAlert alert={ alert } setAlert={ setAlert } />
            <Intro navigation={ navigation } ref={ ref } insets={insets}/>
        </View>
    )
}

export default IntroScreen;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: THEME.STATUSBAR_HEIGHT,
    },
    title: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_LIGHT,
        fontSize: THEME.FONT35,
        textAlign: 'center',
        lineHeight: hp('5%') / THEME.FONT_SCALE
    },
    textContainer: {
        flex: 0.30,
        width: wp('80%'),
        justifyContent: 'center',
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT25,
        textAlign: 'center',
        lineHeight: hp('4%') / THEME.FONT_SCALE,
        marginTop: hp('3%')
    },  
    image: {
        flex: 0.55,
        width: wp('200%'),
        height: wp('200%')
    },
    buttonCircle: {
        width: 80,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationContainer: {
        position: 'absolute',
        left: 16,
        right: 16,
        justifyContent: 'center',
    },
    paginationDots: {
        height: 16,
        margin: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: 'rgba(255, 255, 255, .9)',
    },
    dotInactive: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
    },
    leftButtonContainer: {
        position: 'absolute',
        left: 0,
    },
    rightButtonContainer: {
        position: 'absolute',
        right: 0,
    },
    skipButton: {
        width: 80,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
    },
    skipButtonText: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT22,
        textAlign: 'center',
        paddingBottom: 4,
    }
});