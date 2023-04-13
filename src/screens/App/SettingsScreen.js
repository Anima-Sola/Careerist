import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Switch } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Slider, CheckBox } from '@rneui/themed';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCommonSettings, getSoundSettings } from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { 
    setGameDifficultyLevelAction,
    setCurrentBackgroundTrackAction,
    setIsMusicEnabledAction,
    setBackgroundTrackVolumeAction,
    setIsSoundsEnabledAction,
    setSoundsVolumeAction
} from '../../store/actions/actions';
import { playButtonClick, playDing, playBackgroundTrack, setBackgroundTrackVolume, stopBackgroundTrack } from '../../components/Sounds';

export const SettingsScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Settings navigation={ navigation } commonSettings={ commonSettings }/>

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Settings = ({ navigation, commonSettings }) => {
    const dispatch = useDispatch();
    const { currentBackgroundTrack, isMusicEnabled, backgroundTrackVolume, isSoundsEnabled, soundsVolume } = useSelector( getSoundSettings );
    const { gameDifficultyLevel } = commonSettings;

    const [ diffLevel, setDiffLevel ] = useState( 3 - gameDifficultyLevel );
    const [ isSndEnabled, setIsSndEnabled ] = useState( isSoundsEnabled );
    const [ sndVolume, setSndVolume ] = useState( soundsVolume * 100 );
    const [ isMscEnabled, setIsMscEnabled ] = useState( isMusicEnabled );
    const [ mscVolume, setMscVolume ] = useState( backgroundTrackVolume * 100 );
    const [ currBackTrack, setCurrBackTrack ] = useState( currentBackgroundTrack );

    const changeBackgroundTrack = ( num ) => {
        stopBackgroundTrack()
        dispatch(setCurrentBackgroundTrackAction( num ));
        setCurrBackTrack( num );
        setTimeout( () => playBackgroundTrack(), 300 );
    }

    const onOffSounds = ( onOff ) => {
        setIsSndEnabled( onOff );
        dispatch(setIsSoundsEnabledAction( onOff ));
        playDing();
    }

    const onOffMusic = ( onOff ) => {
        stopBackgroundTrack();
        dispatch(setIsMusicEnabledAction( onOff ));
        setTimeout( () => playBackgroundTrack(), 300 );
        setIsMscEnabled( onOff );
    }

    const setSoundsVolume = ( value ) => {
        dispatch(setSoundsVolumeAction( value / 100 ));
        playDing();
    }

    const setMusicVolume = ( value ) => {
        dispatch(setBackgroundTrackVolumeAction( value / 100 ));
        setBackgroundTrackVolume();
    }

    return (
        <View style={ styles.wrapper }>
            <ScrollView style={ styles.container }>
                <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Сложность игры</Text>
                <ButtonGroup
                    buttons={[ 'Легко', 'Средне', 'Хардкор']}
                    selectedIndex={ diffLevel }
                    containerStyle={ styles.btgContainerStyle }
                    textStyle={ styles.btgTextStyle }
                    selectedButtonStyle={ styles.btgSelectedButtonStyle }
                    onPress={ ( value ) => {
                        setDiffLevel( value );
                        dispatch(setGameDifficultyLevelAction( 3 - value ));
                    }}
                />
                <Text style={{ ...styles.text, marginBottom: hp('1%') }}>Настройка звука</Text>
                <View style={ styles.soundsOnOffContainer }>
                    <View style={{ justifyContent: 'center', paddingBottom: hp('0.6%') }}>
                        <Text style={ styles.subText }>Вкл/выкл звуки</Text>
                    </View>
                    <Switch 
                        value={ isSndEnabled } 
                        thumbColor={ isSndEnabled ? THEME.TEXT_COLOR : THEME.DISABLED_SWITCHER_COLOR }
                        onValueChange={ () => onOffSounds( !isSndEnabled ) } 
                    />
                </View>
                <View style={ styles.soundsOnOffContainer }>
                    <View style={{ justifyContent: 'center', paddingBottom: hp('0.6%') }}>
                        <Text style={ styles.subText }>Вкл/выкл музыку</Text>
                    </View>
                    <Switch 
                        value={ isMscEnabled } 
                        thumbColor={ isMscEnabled ? THEME.TEXT_COLOR : THEME.DISABLED_SWITCHER_COLOR }
                        onValueChange={ () => onOffMusic( !isMscEnabled ) } 
                    />
                </View>
                <View style={ styles.soundVolumeSliderContainer } >
                    <Text style={{ ...styles.subText, marginBottom: hp('1%') }}>Громкость звуков</Text>
                    <Slider
                        value={ sndVolume }
                        onValueChange={ setSndVolume }
                        onSlidingComplete={ ()=> setSoundsVolume( sndVolume ) }
                        maximumValue={ 100 }
                        minimumValue={ 0 }
                        step={ 1 }
                        allowTouchTrack
                        trackStyle={{ height: 5 }}
                        maximumTrackTintColor={ THEME.TEXT_COLOR }
                        minimumTrackTintColor={ THEME.TEXT_COLOR }
                        thumbStyle={ styles.thumbStyle }
                        thumbProps={{
                            children: ( <Text style={ styles.sliderThumbText }>{ sndVolume }%</Text> ),
                        }}
                    />
                </View>
                <View style={ styles.soundVolumeSliderContainer } >
                    <Text style={{ ...styles.subText, marginBottom: hp('0.8%') }}>Громкость музыки</Text>
                    <Slider
                        value={ mscVolume }
                        onValueChange={ setMscVolume }
                        onSlidingComplete={ ()=> setMusicVolume( mscVolume ) }
                        maximumValue={ 100 }
                        minimumValue={ 0 }
                        step={ 1 }
                        allowTouchTrack
                        trackStyle={{ height: 5 }}
                        maximumTrackTintColor={ THEME.TEXT_COLOR }
                        minimumTrackTintColor={ THEME.TEXT_COLOR }
                        thumbStyle={ styles.thumbStyle }
                        thumbProps={{
                            children: ( <Text style={ styles.sliderThumbText }>{ mscVolume }%</Text> ),
                        }}
                    />
                </View>
                <Text style={ styles.text }>Выбор трека</Text>
                    <View style={ styles.checkBoxRow }>
                        <CheckBox
                            checked={ currBackTrack === 0 }
                            title={'Jazz'}
                            onPress={ () => {
                                if( currBackTrack !== 0 ) changeBackgroundTrack( 0 );
                            }}
                            containerStyle={ styles.checkBoxContainerStyle }
                            textStyle={ styles.checkBoxTextStyle }
                            checkedColor={ THEME.TEXT_COLOR }
                        />
                        <CheckBox
                            checked={ currBackTrack === 1 }
                            title={'Relax'}
                            onPress={ () => {
                                if( currBackTrack !== 1 ) changeBackgroundTrack( 1 );
                            }}
                            containerStyle={ styles.checkBoxContainerStyle }
                            textStyle={ styles.checkBoxTextStyle }
                            checkedColor={ THEME.TEXT_COLOR }
                        />
                    </View>
                    <View style={ styles.checkBoxRow }>
                        <CheckBox
                            checked={ currBackTrack === 2 }
                            title={'Positive'}
                            onPress={ () => {
                                if( currBackTrack !== 2 ) changeBackgroundTrack( 2 );
                            }}
                            containerStyle={ styles.checkBoxContainerStyle }
                            textStyle={ styles.checkBoxTextStyle }
                            checkedColor={ THEME.TEXT_COLOR }
                        />
                        <CheckBox
                            checked={ currBackTrack === 3 }
                            title={'Funk'}
                            onPress={ () => {
                                if( currBackTrack !== 3 ) changeBackgroundTrack( 3 );
                            }}
                            containerStyle={ styles.checkBoxContainerStyle }
                            textStyle={ styles.checkBoxTextStyle }
                            checkedColor={ THEME.TEXT_COLOR }
                        />
                    </View>
                    <View style={ styles.checkBoxRow }>
                        <CheckBox
                            checked={ currBackTrack === 4 }
                            title={'Funny'}
                            onPress={ () => {
                                if( currBackTrack !== 4 ) changeBackgroundTrack( 4 );
                            }}
                            containerStyle={ styles.checkBoxContainerStyle }
                            textStyle={ styles.checkBoxTextStyle }
                            checkedColor={ THEME.TEXT_COLOR }
                        />
                    </View>
                    <View style={{ marginBottom: hp('5%') }}></View>
            </ScrollView>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => {
                        playButtonClick();
                        navigation.goBack();
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
        alignSelf: 'center',
        paddingTop: hp('1.5%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_LIGHT,
        fontSize: THEME.FONT35,
        textAlign: 'center',
    },
    subText: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT30,
    },
    btgContainerStyle: {
        height: 50,
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        borderRadius: wp('10%'),
        marginBottom: hp('2%')
    },
    btgTextStyle: {
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT30,
        color: THEME.TEXT_COLOR,
        paddingBottom: hp('0.5%')
    },
    btgSelectedButtonStyle: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR
    },
    soundsOnOffContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: '2%',
        paddingRight: '2%',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    soundVolumeSliderContainer: {
        width: '96%',
        alignSelf: 'center',
        marginTop: hp('1%'),
    },
    thumbStyle: {
        width: wp('12%'), 
        height: hp('3%'), 
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 1,
    },
    sliderThumbText: {
        fontFamily: THEME.FONT_LIGHT,
        fontSize: THEME.FONT18,
        color: THEME.TEXT_COLOR
    },
    checkBoxRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('-3%')
    },
    checkBoxTextStyle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontWeight: '100',
        fontSize: THEME.FONT30,
        paddingBottom: 2
    },
    checkBoxContainerStyle: {
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '100%',
        marginBottom: hp('1%'),
    },
    button: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '96%',
        alignSelf: 'center',
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28,
    }
});