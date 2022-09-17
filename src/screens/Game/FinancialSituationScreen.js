import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getCommonSettings } from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';

export const FinancialSituationScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <FinancialSituation navigation={ navigation } commonSettings={ commonSettings }/>

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const FinancialSituation = ({ navigation, commonSettings }) => {
    const { year, cash } = commonSettings;

    return (
        <View style={ styles.container }>
            <View style={ styles.dataContainer }>
                <Text style={{ ...styles.text, marginBottom: hp('1%') }}>Год { year }</Text>
                <Text style={{ ...styles.text, marginBottom: hp('3%') }}>Наличные средства { cash }$</Text>
                <View style={ styles.table }>
                    <View style={ styles.row }>
                        <View style={ styles.column }>
                            <Text style={ styles.cellText }>В акциях</Text>
                        </View>
                        <View style={{ ...styles.column, paddingLeft: 50 }}>
                            <Text style={ styles.cellText }>0</Text>
                        </View>
                    </View>
                    <View style={ styles.row }>
                        <View style={ styles.column }>
                            <Text style={ styles.cellText }>Счет в банке</Text>
                        </View>
                        <View style={{ ...styles.column, paddingLeft: 50 }}>
                            <Text style={ styles.cellText }>0</Text>
                        </View>
                    </View>
                    <View style={ styles.row }>
                        <View style={ styles.column }>
                            <Text style={ styles.cellText }>Недвижимость</Text>
                        </View>
                        <View style={{ ...styles.column, paddingLeft: 50 }}>
                            <Text style={ styles.cellText }>0</Text>
                        </View>
                    </View>
                    <View style={ styles.row }>
                        <View style={ styles.column }>
                            <Text style={ styles.cellText }>Доходы</Text>
                        </View>
                        <View style={{ ...styles.column, paddingLeft: 50 }}>
                            <Text style={ styles.cellText }>0</Text>
                        </View>
                    </View>
                    <View style={ styles.row }>
                        <View style={ styles.column }>
                            <Text style={ styles.cellText }>Расходы</Text>
                        </View>
                        <View style={{ ...styles.column, paddingLeft: 50 }}>
                            <Text style={ styles.cellText }>0</Text>
                        </View>
                    </View>
                </View>
                <View style={{ ...styles.table, borderTopWidth: 0 }}>
                    <View style={ styles.row }>
                        <View style={ styles.column }>
                            <Text style={ styles.cellText }>Весь капитал</Text>
                        </View>
                        <View style={{ ...styles.column, paddingLeft: 50 }}>
                            <Text style={ styles.cellText }>{ cash }$</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => navigation.navigate('GameMainScreen') }  
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
        marginRight: '2%'
    },
    dataContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
    },
    table: {
        borderWidth: 1, 
        borderColor: '#fff',
        width: '100%',
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        padding: 10,
        width: '50%'
    },
    cellText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT28,
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