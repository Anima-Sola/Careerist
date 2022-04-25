import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { THEME } from '../../styles/theme';
import { setGameDifficultyLevelAction } from   '../../store/actions/actions';

export const SetGameDifficultyScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [ diffLevel, setDiffLevel ] = useState( 3 );

    const navToInputAgeScreen = () => {
        dispatch(setGameDifficultyLevelAction( diffLevel ));
        navigation.navigate('InputAgeScreen');
    }

    const items = () => {
        let i = 4;
        const diffTitles = [ 'Хардкор', 'Средне', 'Легко' ];

        const items = diffTitles.map( element => {
            i--;
            const activeItemBackgroudColor = (i === diffLevel ) ? THEME.THIRD_BACKGROUND_COLOR : 'rgba(0, 0, 0, .2)';
            return ( 
                <Pressable style={{ ...styles.difficultyLevelItem, backgroundColor: activeItemBackgroudColor }} key={ i } onPress={ eval( '() => setDiffLevel(' + i + ')' )}>
                    <Text style={ styles.difficultyLevelItemDigit }>{ i }</Text>
                    <Text style={ styles.difficultyLevelItemText }>{ element }</Text>
                </Pressable>
            )
        })
        return ( <>{ items }</> )
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.headerContainer }>
                <Text style={ styles.header }>Ваш класс?</Text>
            </View>
            <View style={ styles.difficultyLevelsContainer }>
                { items() }
            </View>
            <View style={ styles.nextButtonContainer }>
                <Button buttonStyle={ styles.nextButton } titleStyle={ styles.nextButtonTitle } type="outline" title="Продолжить" onPress={ navToInputAgeScreen }/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        paddingTop: THEME.STATUSBAR_HEIGHT,
        paddingLeft: 20,
        paddingRight: 20
    },
    headerContainer: {
        flex: 0.25,
        justifyContent: 'flex-start',
        width:'100%',
    },
    header: {
        color: '#fff',
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT30,
        textAlign: 'center',
        paddingTop: 20
    },
    difficultyLevelsContainer: {
        flex: 0.50,
        justifyContent: 'space-around',
        width:'100%',
    },
    difficultyLevelItem: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: THEME.SCREEN_HEIGHT / 7,
    },
    difficultyLevelItemDigit: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT30,
    },
    difficultyLevelItemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT12,
    },
    nextButtonContainer: {
        flex: 0.25,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        width:'100%',
    },
    nextButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '100%',
        height: 50,
        borderRadius: 25,
    },
    nextButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT17,
    } 
})