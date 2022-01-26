import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';
import { setGameDifficultyLevelAction } from   '../../store/actions/actions';

export const SetGameDifficultyScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [ gameDifficultyLevel, setGameDifficultyLevel ] = useState(3);
    const [ difficultyItems, setActiveDifficultyItem ] = useState([ null, 'rgba(0, 0, 0, .2)', 'rgba(0, 0, 0, .2)', THEME.THIRD_BACKGROUND_COLOR ]);

    const setDifficultyLevel = (level) => {
        const newDifficultyItems = [ null, 'rgba(0, 0, 0, .2)', 'rgba(0, 0, 0, .2)', 'rgba(0, 0, 0, .2)' ];
        newDifficultyItems[level] = THEME.THIRD_BACKGROUND_COLOR;
        setGameDifficultyLevel(level);
        setActiveDifficultyItem(newDifficultyItems);
    }

    const navToInputAgeScreen = () => {
        dispatch(setGameDifficultyLevelAction( gameDifficultyLevel ));
        navigation.navigate('InputAgeScreen');
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.headerContainer }>
                <Text style={ styles.header }>Ваш класс?</Text>
            </View>
            <View style={ styles.difficultyLevelsContainer }>
                <TouchableOpacity style={{ ...styles.difficultyLevelItem, backgroundColor: difficultyItems[3] }} onPress={ () => setDifficultyLevel(3) } >
                    <Text style={ styles.difficultyLevelItemDigit }>3</Text>
                    <Text style={ styles.difficultyLevelItemText }>Легко</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.difficultyLevelItem, backgroundColor: difficultyItems[2] }} onPress={ () => setDifficultyLevel(2)} >
                    <Text style={ styles.difficultyLevelItemDigit }>2</Text>
                    <Text style={ styles.difficultyLevelItemText }>Средне</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.difficultyLevelItem, backgroundColor: difficultyItems[1] }} onPress={ () => setDifficultyLevel(1) } >
                    <Text style={ styles.difficultyLevelItemDigit }>1</Text>
                    <Text style={ styles.difficultyLevelItemText }>Хардкор</Text>
                </TouchableOpacity>
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
        borderRadius: 25,
        height: THEME.SCREEN_HEIGHT / 7,
    },
    difficultyLevelItemDigit: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT30,
    },
    difficultyLevelItemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-lightitalic',
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