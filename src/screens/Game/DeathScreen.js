import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCommonSettings } from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';

export const DeathScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Death navigation={ navigation } commonSettings={ commonSettings } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Death = ({ navigation, commonSettings }) => {
    const { playerAge } = commonSettings;

    return (
        <View style={ styles.container }>
            <View style={ styles.dataContainer }>
                <Text style={{ ...styles.text, marginBottom: hp('4%'), fontFamily: 'nunito-semibold' }}>ГОСПОДА!</Text>
                <Text style={{ ...styles.text, marginBottom: hp('2%') }}>Бизнес понес невосполнимую утрату.</Text>
                <Text style={{ ...styles.text, marginBottom: hp('2%') }}>На { playerAge } году оборвалась жизнь нашего коллеги.</Text>
                <Text style={{ ...styles.text }}>Примите соболезнования :(</Text>
            </View>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Начать заново"
                    onPress={ () => navigation.navigate('IntroScreen') }  
                />
            </View>
        </View>
    )
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: hp('2%')
    },
    dataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%'),
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
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
        width: '100%',
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,
    }
});