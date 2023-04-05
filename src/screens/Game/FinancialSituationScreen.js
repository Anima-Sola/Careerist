import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCommonSettings } from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import TotalTable from '../../components/TotalTable';
import { playButtonClick } from '../../components/Sounds';

export const FinancialSituationScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <FinancialSituation navigation={ navigation } commonSettings={ commonSettings } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const FinancialSituation = ({ navigation, commonSettings }) => {
    const { cash, year, yearsPassed } = commonSettings;

    return (
        <View style={ styles.wrapper }>
            <ScrollView style={ styles.container }>
                <Text style={{ ...styles.text, marginBottom: hp('1%') }}>Год { year + yearsPassed }</Text>
                <Text style={{ ...styles.text, marginBottom: hp('1%') }}>Наличные средства { Math.floor( cash ) }$</Text>
                <TotalTable />
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
        paddingTop: hp('1.5%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT35,
        textAlign: 'center',
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