import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Switch } from 'react-native';
import { Stack } from 'react-native-flex-layout';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Slider, CheckBox } from '@rneui/themed';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCommonSettings, getSoundSettings } from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { playButtonClick } from '../../components/Sounds';

export const SettingsScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const soundSettings = useSelector( getSoundSettings );
    const wrappedComponent = <Settings navigation={ navigation } commonSettings={ commonSettings } soundSettings={ soundSettings }/>

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Settings = ({ navigation, commonSettings, soundSettings }) => {
    const { currentBackgroundTrack, isMusicEnabled, backgroundTrackVolume, isSoundsEnabled, soundsVolume } = soundSettings;
    const { gameDifficultyLevel } = commonSettings;

    const [ diffLevel, setDiffLevel ] = useState( 3 - gameDifficultyLevel );
    const [ isSndEnabled, setIsSndEnabled ] = useState( isSoundsEnabled );
    const [ sndVolume, setSndVolume ] = useState( soundsVolume * 100 );
    const [ isMscEnabled, setIsMscEnabled ] = useState( isMusicEnabled );
    const [ mscVolume, setMscVolume ] = useState( backgroundTrackVolume * 100 );
    const [ currBackTrack, setCurrBackTrack] = useState( currentBackgroundTrack );

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
                    onPress={ ( value ) => setDiffLevel( value ) }
                />
                <Text style={{ ...styles.text, marginBottom: hp('1%') }}>Настройка звука</Text>
                <View style={ styles.soundsOnOffContainer }>
                    <View style={{ justifyContent: 'center', paddingBottom: hp('0.6%') }}>
                        <Text style={ styles.subText }>Вкл/выкл звуки</Text>
                    </View>
                    <Switch 
                        value={ isSndEnabled } 
                        thumbColor={ isSndEnabled ? THEME.TEXT_COLOR : THEME.DISABLED_SWITCHER_COLOR }
                        onValueChange={ () => setIsSndEnabled( !isSndEnabled ) } 
                    />
                </View>
                <View style={ styles.soundsOnOffContainer }>
                    <View style={{ justifyContent: 'center', paddingBottom: hp('0.6%') }}>
                        <Text style={ styles.subText }>Вкл/выкл музыку</Text>
                    </View>
                    <Switch 
                        value={ isMscEnabled } 
                        thumbColor={ isMscEnabled ? THEME.TEXT_COLOR : THEME.DISABLED_SWITCHER_COLOR }
                        onValueChange={ () => setIsMscEnabled( !isMscEnabled ) } 
                    />
                </View>
                <View style={ styles.soundVolumeSliderContainer } >
                    <Text style={{ ...styles.subText, marginBottom: hp('1%') }}>Громкость звуков</Text>
                    <Slider
                        value={ sndVolume }
                        onValueChange={ setSndVolume }
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
                <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Выбор трека</Text>
                    <View style={ styles.checkBoxRow }>
                        <CheckBox
                            checked={ currBackTrack === 0 }
                            title={'Jazz'}
                            onPress={ () => setCurrBackTrack( 0 ) }
                            containerStyle={ styles.checkBoxContainerStyle }
                            wrapperStyle={ styles.checkBoxWrapStyle }
                            textStyle={ styles.checkBoxTextStyle }
                            checkedColor={ THEME.TEXT_COLOR }
                        />
                        <CheckBox
                            checked={ currBackTrack === 1 }
                            title={'Relax'}
                            onPress={() => setCurrBackTrack( 1 )}
                            containerStyle={ styles.checkBoxContainerStyle }
                            textStyle={ styles.checkBoxTextStyle }
                            checkedColor={ THEME.TEXT_COLOR }
                        />
                    </View>
                    <View style={ styles.checkBoxRow }>
                        <CheckBox
                            checked={ currBackTrack === 2 }
                            title={'Positive'}
                            onPress={() => setCurrBackTrack( 2 )}
                            containerStyle={ styles.checkBoxContainerStyle }
                            textStyle={ styles.checkBoxTextStyle }
                            checkedColor={ THEME.TEXT_COLOR }
                        />
                        <CheckBox
                            checked={ currBackTrack === 3 }
                            title={'Funk'}
                            onPress={() => setCurrBackTrack( 3 )}
                            containerStyle={ styles.checkBoxContainerStyle }
                            textStyle={ styles.checkBoxTextStyle }
                            checkedColor={ THEME.TEXT_COLOR }
                        />
                    </View>
                    <View style={ styles.checkBoxRow }>
                        <CheckBox
                            checked={ currBackTrack === 4 }
                            title={'Funny'}
                            onPress={() => setCurrBackTrack( 4 )}
                            containerStyle={ styles.checkBoxContainerStyle }
                            textStyle={ styles.checkBoxTextStyle }
                            checkedColor={ THEME.TEXT_COLOR }
                        />
                    </View>
            </ScrollView>
            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={ styles.applyButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Применить"
                    onPress={ () => {
                        playButtonClick();
                        
                    }}    
                />
                <Button
                    buttonStyle={ styles.cancelButton } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Отмена"
                    onPress={ () => {
                        playButtonClick();
                        navigation.navigate('GameMainScreen') 
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
        fontSize: THEME.FONT28,
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
        marginBottom: hp('2%')
    },
    checkBoxTextStyle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT30,
        //paddingBottom: 1
    },
    checkBoxContainerStyle: {
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        borderColor: '#fff',
        borderWidth: 1
    },
    checkBoxWrapStyle: {
        borderColor: '#fff',
        borderWidth: 1
    },
    buttonsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('1%')
    },
    applyButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        height: hp('7%'),
        borderRadius: wp('10%'),
        width: wp('46%'),
        marginRight: 5
    },  
    cancelButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: wp('46%'),
        height: hp('7%'),
        borderRadius: wp('10%'),
        marginLeft: 5,
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28
    }
});