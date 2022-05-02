import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { THEME } from "../styles/theme";
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomAlert = ({ alert, setAlert }) => {
    const {
        message, 
        header, 
        iconName, 
        iconBackgroundColor, 
        iconColor,
        isOverlayPressable,
        buttons,
    } = alert.data;
 
    const buttonsList = () => {
        let i = 0;
        const list = buttons.map(({ key, hint, backgroundColor, textColor }) => {
            return (
                <Pressable key={ key } style={{ ...styles.button, backgroundColor }} onPress={ alert.buttonsCallbacks[ i++ ] }>
                    <Text style={{ ...styles.buttonTitle, color: textColor }}>{ hint }</Text>
                </Pressable>
            )
        })
        return list;
    }

    return (
        <Modal
            animationType="fade"
            transparent={ true }
            statusBarTranslucent={ true }
            visible={ alert.isVisible }
            onRequestClose={ () => { if( isOverlayPressable ) setAlert({ isVisible: false, data: alert.data, buttonsCallbacks: alert.buttonsCallbacks }) }} 
        >   
            <Pressable 
                style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} 
                onPress={ () => { if( isOverlayPressable ) setAlert({ isVisible: false, data: alert.data,  buttonsCallbacks: alert.buttonsCallbacks }) }} 
            />
            <View style={ styles.container }>
                <View style={{ ...styles.iconContainer, backgroundColor: iconBackgroundColor }}>
                    <Icon style={ styles.icon } name={ iconName } color={ iconColor } size={ 50 }/>
                </View>
                <View style={ styles.window }>
                    <Text style={ styles.header }>{ header }</Text>
                    <Text style={ styles.text }>{ message }</Text>
                    { buttonsList() }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.3
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.32
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    window: {
        backgroundColor: THEME.SIDE_MENU_BACKGROUND_COLOR,
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
        width: '80%'
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 5,
        borderColor: THEME.SIDE_MENU_BACKGROUND_COLOR,
        backgroundColor: 'red',
        padding: 5,
        marginBottom: -40,
        zIndex: 1, // works on ios
        elevation: 0, // works on android
    },
    icon: {
        paddingTop: 2,
        alignSelf: 'center'
    },
    header: {
        color: THEME.SIDE_MENU_ITEMS_TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT40,
        textAlign: 'center',
        paddingTop: 35
    },
    text: {
        color: THEME.SIDE_MENU_ITEMS_TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT30,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 20
    },
    button: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '100%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,        
    },
})

export default CustomAlert;