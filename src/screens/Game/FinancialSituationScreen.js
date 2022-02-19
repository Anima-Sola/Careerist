import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { getYear, getCash } from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';

export const FinancialSituationScreen = ({ navigation }) => {
    const wrappedComponent = <FinancialSituation navigation={ navigation } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const FinancialSituation = ({ navigation }) => {
    const year = useSelector( getYear );
    const cash = useSelector( getCash );

    return (
        <View style={ styles.main }>
            <Text style={ styles.title }>Финансовое положение</Text>
            <View style={ styles.container }>
                <View style={ styles.dataContainer }>
                    <Text>Год { year }</Text>
                    <Text>Наличные { cash }</Text>
                </View>
            </View>
            <View style={ styles.nextButtonContainer }>
                    <Button
                        buttonStyle={ styles.nextButton } 
                        titleStyle={ styles.nextButtonTitle }
                        disabledStyle={ styles.nextButtonDisabledStyle }
                        type="outline" 
                        title="Продолжить"
                        onPress={ () => navigation.navigate('GameMainScreen') }  
                    />
                </View>
        </View>
    )
}
    
const styles = StyleSheet.create({
    title: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT20,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 15
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 1
    },
    dataContainer: {
        flex: 0.75
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
    },
    nextButtonDisabledStyle: {
        backgroundColor: THEME.DISABLED_BUTTON_COLOR,
    },
});