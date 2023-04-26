import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from '@rneui/themed';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCommonSettings } from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { playButtonClick } from '../../components/Sounds';

export const AboutScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <About navigation={ navigation } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const About = ({ navigation }) => {
    return (
        <View style={ styles.wrapper }>
            <ScrollView style={ styles.container }>
                <Text style={ styles.headerText }>Об игре</Text>
                <Text style={ styles.text }>
                    Игра представляет собой сюрреалистический, антинаучно - фантастический симулятор бизнесмена с
                    политическими амбициями. Победой в игре считается избрание президентом.
                    Для достижения цели необходимо зарабатывать деньги покупая бизнес, играя на бирже и немного развлекаясь.
                    На пути к желанной цели вас будут подстерегать различные неприятности, болезни, аварии и даже смерть.
                    Поэтому мужайтесь и вперед.
                </Text>
                <Text style={ styles.headerText }>Игровой процесс</Text>
                <Text style={ styles.text }>
                    На первый взгляд игровой процесс может показаться сложным, но на самом деле это не так. Все становится просто, как только
                    узнаешь, как избегать те или иные подводные камни. Намеренно не оставлено никаких подсказок, чтобы растянуть познание,
                    но все становится понятно во время игры.
                    Просьба не относиться к процессу предвзято, не было цели сделать его близким к реальности. Надо относится к нему,
                    как к развлечению.
                </Text>
                <Text style={ styles.headerText }>Предыстория</Text>
                <Text style={ styles.text }>
                    За основу взята текстовая игра, написанная для платформы ZX-Spectrum, в 80-х или 90-х годах. Когда именно, история умалчивает.
                    Игра написана максимально близко к оригиналу, но с исправлением существенно меняющих игровой процесс ошибок, допущенных
                    автором.
                </Text>
                <Text style={ styles.headerText }>Связь с разработчиком</Text>
                <Text style={{ ...styles.text, paddingBottom: hp('4%') }}>
                    Связаться с разработчиком можно по электронной почте - animasola@yandex.ru
                </Text>

            </ScrollView>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => {
                        playButtonClick();
                        navigation.navigate('GameMainScreen');
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
        paddingTop: hp('3%'),
        marginBottom: hp('1%')
    },
    headerText: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('3%'),
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT28,
        textAlign: 'center',
        marginBottom: hp('2%'),
        lineHeight: hp('3.5%') / THEME.FONT_SCALE,
        textAlign: 'justify',
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
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