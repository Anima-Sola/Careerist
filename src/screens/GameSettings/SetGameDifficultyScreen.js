import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { THEME } from '../../styles/theme';
import { setGameDifficultyLevelAction } from   '../../store/actions/actions';

export const SetGameDifficultyScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [ diffLevel, setDiffLevel ] = useState( 3 );

    const navToInputAgeScreen = () => {
        dispatch(setGameDifficultyLevelAction( diffLevel, true ));
        navigation.navigate('InputAgeScreen');
    }

    const items = () => {
        let i = 4;
        const diffTitles = [ 'Легко', 'Средне', 'Хардкор' ];

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
            <StatusBar translucent backgroundColor="transparent" />
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
        width:'100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR
    },
    headerContainer: {
        marginTop: THEME.STATUSBAR_HEIGHT
    },
    header: {
        color: '#fff',
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT40,
        textAlign: 'center',
        paddingTop: hp('1%')
    },
    difficultyLevelsContainer: {
        justifyContent: 'center',
        width:'100%',
        paddingLeft: '2%',
        paddingRight: '2%',
    },
    difficultyLevelItem: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: hp('15%'),
        marginTop: '1%',
        marginBottom: '1%',
    },
    difficultyLevelItemDigit: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT40,
    },
    difficultyLevelItemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT25,
    },
    nextButtonContainer: {
        justifyContent: 'center',
        width: '100%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: hp('1%')
    },
    nextButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '100%',
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    nextButtonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,
    } 
})