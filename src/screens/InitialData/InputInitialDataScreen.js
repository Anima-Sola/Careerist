import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';

export const inputInitialDataScreen = () => {
    return (
        <View style={ styles.container }>
            <View style={ styles.headerContainer }>
                <Text style={ styles.header }>Ваш класс?</Text>
            </View>
            <View style={ styles.difficultyLevelsContainer }>
                <View style={ styles.selectedDifficultyLevelItem }>
                    <Text style={ styles.difficultyLevelItemDigit }>3</Text>
                    <Text style={ styles.difficultyLevelItemText }>Легко</Text>
                </View>
                <View style={ styles.difficultyLevelItem }>
                    <Text style={ styles.difficultyLevelItemDigit }>2</Text>
                    <Text style={ styles.difficultyLevelItemText }>Средне</Text>
                </View>
                <View style={ styles.difficultyLevelItem }>
                    <Text style={ styles.difficultyLevelItemDigit }>1</Text>
                    <Text style={ styles.difficultyLevelItemText }>Хардкор</Text>
                </View>
            </View>
            <View style={ styles.nextButtonContainer }>
                <Button buttonStyle={ styles.nextButton } titleStyle={ styles.nextButtonTitle } type="outline" title="Продолжить" />
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
    selectedDifficultyLevelItem: {
        backgroundColor: THEME.THIRD_BACKGROUND_COLOR,
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