import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Modal, Pressable, TextInput  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { THEME } from "../styles/theme";
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomPrompt = ({ prompt, setPrompt }) => {
    const textInput = useRef( null );
    const [ data, setData ] = useState( 0 );
    const {
        message, 
        header, 
        iconName, 
        iconBackgroundColor, 
        iconColor,
        isOverlayPressable,
        onlyDigits,
        buttons,
    } = prompt.data;

    useEffect(() => {
        //textInput.current.focus();
    });

    const filterDigits = ( text ) => {
        if( onlyDigits === true ) {
            const result = text.replace( /\D/g, '' );
            ( result !== '' ) ? setData( +result ) : setData( 0 );
        }
    }
 
    const buttonsList = () => {
        let i = 0;
        const list = buttons.map(({ key, hint, textColor }) => {
            return (
                <Pressable key={ key } style={ THEME.PRESSABLE_STYLES(styles.button) } onPress={ prompt.buttonsCallbacks[ i++ ] }>
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
            visible={ prompt.isVisible }
            onRequestClose={ () => { if( isOverlayPressable ) setPrompt({ isVisible: false, data: prompt.data, buttonsCallbacks: prompt.buttonsCallbacks }) }} 
        >   
            <Pressable 
                style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} 
                onPress={ () => { if( isOverlayPressable ) setPrompt({ isVisible: false, data: prompt.data,  buttonsCallbacks: prompt.buttonsCallbacks }) }} 
            />
            <View style={ styles.container }>
                <View style={{ ...styles.iconContainer, backgroundColor: iconBackgroundColor }}>
                    <Icon style={ styles.icon } name={ iconName } color={ iconColor } size={ 50 }/>
                </View>
                <View style={ styles.window }>
                    <Text style={ styles.header }>{ header }</Text>
                    <Text style={ styles.text }>{ message }</Text>
                    <TextInput
                        ref={ textInput }
                        style={ styles.input }
                        selectionColor={ 'black' }
                        keyboardType='numeric'
                        maxLength={ 12 }
                        onChangeText={( data ) => filterDigits( data )}
                        value={ data.toString() }
                    />
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
        fontSize: THEME.FONT35,
        textAlign: 'center',
        paddingTop: 35
    },
    text: {
        color: THEME.SIDE_MENU_ITEMS_TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT30,
        textAlign: 'center',
        marginBottom: 10
    },
    input: {
        width: '100%',
        height: hp('5%'),
        fontSize: THEME.FONT30,
        color: '#000',
        marginBottom: 30,
        textAlign: 'center',
        borderColor: "#000",
        borderStyle: "solid",
        borderBottomWidth: 3
    },
    button: {
        width: '100%',
        height: hp('5%'),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonTitle: {
        paddingBottom: 3,
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28,        
    },
})

export default CustomPrompt;