//Years in prison counter
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME } from "../styles/theme";
import { getCommonSettings } from "../store/selectors";

const Counter = ({ enableBtn }) => {
    const commonSettings = useSelector( getCommonSettings );
    const { year, prisonTerm, yearsPassed } = commonSettings;
    let [ counter, setCounter ] = useState( year + yearsPassed );

    const incrementCounter = () => {
        setCounter( counter++ );
    }

    const stopCounter = ( timerId ) => {
        clearInterval( timerId );
        enableBtn();
    }

    useEffect(() => {
        let timerId = setInterval( incrementCounter, 1500 );
        setTimeout( () => stopCounter( timerId ), 1500 * ( prisonTerm + 1 ) + 100 );
    }, [])

    return (
        <View style={ styles.container }>  
            <Text style={ styles.text }>Год { counter  }</Text>
        </View>
    )
}

export default Counter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '96%',
        marginTop: hp('3%'),
        alignSelf: 'center'
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD_ITALIC,
        fontSize: THEME.FONT50,
        textAlign: 'center',
    },
});