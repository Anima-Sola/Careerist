import React, { Component, useEffect } from 'react';
import { StyleSheet, View, Text, Image, StatusBar, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import { THEME } from '../../styles/theme';
//import { connect } from 'react-redux';
import { saveGameSettingsInitialState, saveAppSettingsInitialState, loadAppSettings, loadGameSettings } from '../../store/actions/actions';

const slides = [
    {
        key: 'one',
        title: 'ДОБРО\nПОЖАЛОВАТЬ',
        text: 'в нашу страну, где каждый может стать президентом',
        image: require('../../assets/images/jentleman.png'),
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        color: THEME.TEXT_COLOR
    },
    {
        key: 'two',
        title: 'Представьте, \n что вы имеете:',
        text: 'Квартиру, машину, виллу, яхту, самолет',
        image: require('../../assets/images/jentleman.png'),
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
    },
    {
        key: 'three',
        title: 'Вы оплачиваете \n услуги:',
        text: 'Маклера, врача, адвоката, \n детектива, личной охраны',
        image: require('../../assets/images/jentleman.png'),
        backgroundColor: THEME.THIRD_BACKGROUND_COLOR,
    },
    {
        key: 'four',
        title: 'В вашем владении \n находятся:',
        text: 'Бар, ресторан, магазин, \n отель, завод',
        image: require('../../assets/images/jentleman.png'),
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
    },
    {
        key: 'five',
        title: 'И cчет в банке',
        text: '$1.000.000.000',
        image: require('../../assets/images/jentleman.png'),
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
    },
    {
        key: 'six',
        title: '...но пока это мечты.',
        text: 'Реализуйте их!!!',
        image: require('../../assets/images/jentleman.png'),
        backgroundColor: THEME.THIRD_BACKGROUND_COLOR,
    }
];

class Intro extends Component {
    /*componentDidMount() {
        this.props.saveAppSettingsInitialState();
        this.props.saveGameSettingsInitialState();
        this.props.loadAppSettings();
        this.props.loadGameSettings();
        this.props.navigation.addListener('beforeRemove', (e) => e.preventDefault() )
    }*/

    _renderItem = ({ item }) => {
        return (
            <View style={{ ...styles.container, backgroundColor: item.backgroundColor }}>
                <Image style={ styles.image } resizeMode='center' source={ item.image } />
                <View style={ styles.titleContainer }>
                    <Text style={ styles.title }>{ item.title }</Text>
                </View>
                <View style={ styles.textContainer }>
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
                    name="md-checkmark"
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

    _navToSetGameDifficultyScreen = () => {
        this.props.navigation.navigate('SetGameDifficultyScreen');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor="transparent" />
                <AppIntroSlider
                    data={slides}
                    renderItem={this._renderItem}
                    showSkipButton={true}
                    renderDoneButton={this._renderDoneButton}
                    renderNextButton={this._renderNextButton}
                    renderSkipButton={this._renderSkipButton}
                    onDone={this._navToSetGameDifficultyScreen}
                    onSkip={this._navToSetGameDifficultyScreen}
                />
            </View>
        );
    }
}

/*const mapDispatchToProps = ( dispatch ) => {
    return {
        saveAppSettingsInitialState: () => dispatch( saveGameSettingsInitialState() ),
        saveGameSettingsInitialState: () => dispatch( saveAppSettingsInitialState() ),
        loadAppSettings: () => dispatch( loadAppSettings() ),
        loadGameSettings: () => dispatch( loadGameSettings() )
    }
};

export default connect(null, mapDispatchToProps)(IntroScreen)*/

const IntroScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        /*const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            const navState = navigation.getState();
            const currentScreenName = navState.routes[ navState.index ].name;
            if( currentScreenName === 'IntroScreen' ) return true;
            return false;
        })
        return () => backHandler.remove();*/
    })

    useFocusEffect(() => {
        dispatch( saveAppSettingsInitialState() );
        dispatch( saveGameSettingsInitialState() );
        dispatch( loadAppSettings() );
        dispatch( loadGameSettings() );
        
        navigation.addListener('beforeRemove', (e) => e.preventDefault() )
    })

    return <Intro navigation={ navigation } />;
}

export default IntroScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: THEME.STATUSBAR_HEIGHT,
        paddingLeft: 20,
        paddingRight: 20
    },
    titleContainer: {
        flex: 0.15,
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT40,
        textAlign: 'center',
        lineHeight: 40,
        paddingTop: 10
    },
    textContainer: {
        flex: 0.15,
        justifyContent: 'center',
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT30,
        textAlign: 'center',
        lineHeight: 40
    },  
    image: {
        flex: 0.55,
        width: wp('40%'),
        height: wp('40%')
    },
    buttonCircle: {
        width: 80,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skipButton: {
        width: 80,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center'
    },
    skipButtonText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT25,
        textAlign: 'center',
        paddingBottom: 4
    },
});

/*import PagerView from 'react-native-pager-view';
import { IntroPage1 } from './IntroPage1';
import { IntroPage2 } from './IntroPage2';
import { IntroPage3 } from './IntroPage3';
import { IntroPage4 } from './IntroPage4';
import { THEME } from '../../styles/theme';

export const IntroMainPage = () => {
    return (
        <PagerView style={styles.wrapper} initialPage={0}>
            <View key="1">
                <IntroPage1 />
            </View>
            <View key="2">
                <IntroPage2 />
            </View>
            <View key="3">
                <IntroPage3 />
            </View>
            <View key="4">
                <IntroPage4 />
            </View>
        </PagerView>
    );
};

/*const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
    }
});*/