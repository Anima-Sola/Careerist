import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';

export const IntroPage3 = ({ navigation }) => {
    const currentEmployeesListIndex = useRef(0);                           
    const [, updateState] = useState();                                 //Just for rerendering
    const forceUpdate = useCallback(() => updateState({}), []);
    const animHeader = useRef(new Animated.Value(0)).current;
    const animEmployeesList = useRef(new Animated.Value(0)).current;

    const employeesList = ['МАКЛЕР', 'ВРАЧ', 'АДВОКАТ', 'ДЕТЕКТИВ', 'ЛИЧНАЯ ОХРАНА'];
    const employeesListPictures = [
        require('../../assets/images/EmployeesList/makler.png'), 
        require('../../assets/images/EmployeesList/doctor.png'),
        require('../../assets/images/EmployeesList/lawyer.png'),
        require('../../assets/images/EmployeesList/detective.png'),
        require('../../assets/images/EmployeesList/security.png'),
    ];

    const hideEmployeesListItem = () => {
        Animated.spring(
            animEmployeesList,
            {
                toValue: 0,
                delay: 500,
                tension: 2,
                useNativeDriver: true
            }
        ).start(() => {
            currentEmployeesListIndex.current++;
            forceUpdate();
            showEmployeesListItem();
        });
    }

    const showEmployeesListItem = () => {
        Animated.spring(
            animEmployeesList,
            {
                toValue: 1,
                tension: 2,
                useNativeDriver: true
            }).start(() => {
                if(currentEmployeesListIndex.current < employeesList.length - 1) hideEmployeesListItem();
            }
        )
    }

    useEffect(() => {
        Animated.spring(
            animHeader,
            {
                toValue: 1,
                tension: 2,
                useNativeDriver: true
            }
        ).start(() => {
            showEmployeesListItem();
        });
    }, [animHeader]);

    const moveToNextIntroPage = () => {
        navigation.navigate('IntroPage4');
    }

    return (
        <View style={ styles.container }>
            <Animated.View style={{ transform: [{ scale: animHeader }] }}>
                <Text style={ styles.header }>У ВАС В ПОДЧИНЕНИИ:</Text>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: animEmployeesList }] }}>
                <Image resizeMode='contain' style={ styles.image }  source={ employeesListPictures[currentEmployeesListIndex.current] } />
                <Text style={ styles.header }>{ employeesList[currentEmployeesListIndex.current] }</Text>
            </Animated.View>
            <View>
                <Image resizeMode='center' style={ styles.dots }  source={ require('../../assets/images/dotspage3.png') } />
            </View>
            <Button buttonStyle={ styles.missButton } titleStyle={ styles.missButtonTitle } type="outline" title="К игре" />
        </View>
    )
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    header: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontStyle: 'normal',
        fontWeight: "100",
        fontSize: THEME.FONT_LARGE,
        textAlign: 'center',
        marginTop: THEME.V_MARGIN10,
    },
    image: {
        width: THEME.SCREEN_WIDTH / 1.4,
        height: THEME.SCREEN_HEIGHT / 1.4,
        marginTop: - 17 * THEME.V_MARGIN10,
        marginBottom: - 14 * THEME.V_MARGIN10
    },
    dots: {
        width: THEME.SCREEN_WIDTH / 5,
    },
    missButton: {
        borderRadius: 40,
        backgroundColor: "#940068",
        borderColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 40,
        paddingRight: 40
    },
    missButtonTitle: {
        fontFamily: 'nunito-extralight',
        color: "#fff",
    }
});
  