import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
        <View style={ styles.container }>
            <View style={ styles.dataContainer }>
                <Text style={{ ...styles.text, marginBottom: 10 }}>Год { year }</Text>
                <Text style={{ ...styles.text, marginBottom: 20 }}>Наличные средства { cash }$</Text>
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
            <View style={ styles.nextButtonContainer }>
                <Button
                    buttonStyle={ styles.nextButton } 
                    titleStyle={ styles.nextButtonTitle }
                    type="outline" 
                    title="Продолжить"
                    onPress={ () => navigation.navigate('GameMainScreen') }  
                />
            </View>
        </View>
    )
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    dataContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT20,
        textAlign: 'center',
    },
    table: {
        borderWidth: 1, 
        borderColor: '#fff',
        width: '100%'
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
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT17,
    },  
    nextButtonContainer: {
        flex: 0.1,
        justifyContent: 'flex-end',
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
});