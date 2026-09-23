//A component that displays a window with input field instead of the standard Alert
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable, TextInput, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '@rneui/themed';
import { THEME } from "../styles/theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { playSlideChange, playDing } from "./Sounds";

const CustomPrompt = ({ prompt, setPrompt, argsForButtonCallbacks }) => {
    const textInput = useRef( null );
    const keyboardInput = useRef( null );
    const [ isPromptReady, setIsPromptReady ] = useState( false );
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
        if (!prompt.isVisible) {
            setIsPromptReady( false );
            return;
        }

        setIsPromptReady( false );
        const keyboardDidShow = Keyboard.addListener( 'keyboardDidShow', () => {
            setIsPromptReady( true );
        });

        const timer = setTimeout(() => {
            keyboardInput.current?.focus();
        }, 100);

        return () => {
            clearTimeout( timer );
            keyboardDidShow.remove();
        };
    }, [prompt.isVisible]);

    useEffect(() => {
        if (isPromptReady) {
            textInput.current?.focus();
        }
    }, [isPromptReady]);

    //Function filters symbols. Only digits valid if parameter "onlyDigits" = true
    const filterDigits = ( text ) => {
        if( onlyDigits === true ) {
            const result = text.replace( /\D/g, '' );
            ( result !== '' ) ? setPrompt({ ...prompt, value: +result }) : setPrompt({ ...prompt, value: '' });
            return false;
        }
        setPrompt({ ...prompt, value: +text })
    }
    
    //Display buttons
    const buttonsList = () => {
        const list = buttons.map(({ key, hint, disabledIfEmpty, disabledBackgroundColor, textColor }) => {
            const isButtonDisabled = ( prompt.value === ''  ) ? disabledIfEmpty : false ;
            return (
                <Button
                    key={ key } 
                    buttonStyle={ styles.button } 
                    titleStyle={{ ...styles.buttonTitle, color: textColor }}
                    disabledStyle={{ backgroundColor: disabledBackgroundColor }}
                    type="outline" 
                    title={ hint } 
                    disabled={ isButtonDisabled } 
                    onPress={ () => {
                        playSlideChange();
                        prompt.buttonsCallbacks[ key ]( prompt.value, { ...argsForButtonCallbacks }) 
                    }}    
                />
            )
        })
        return list;
    }

    return (
        <Modal
            animationType="none"
            transparent={ true }
            statusBarTranslucent={ true }
            visible={ prompt.isVisible }
            onShow={ () => playDing() }
            onRequestClose={ () => {
                if( isOverlayPressable ) setPrompt({ ...prompt, isVisible: false, value: '' });
            }} 
        >
            {!isPromptReady && (
                <TextInput
                    ref={ keyboardInput }
                    style={ styles.keyboardInput }
                    keyboardType='numeric'
                    autoFocus={ false }
                />
            )}
            {isPromptReady && <>
            <Pressable 
                style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} 
                onPressIn={ () => playSlideChange() }  
                onPress={ () => {
                    if( isOverlayPressable ) setPrompt({ ...prompt, isVisible: false, value: '' });
                }} 
            />
            <KeyboardAvoidingView 
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
                style={ styles.container }>
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
                        onChangeText={ ( prompt ) =>  filterDigits( prompt ) }
                        value={ prompt.value.toString() }
                    />
                    { buttonsList() }
                </View>
            </KeyboardAvoidingView>
            </>}
        </Modal>
    )
}

const styles = StyleSheet.create({
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.5
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.52
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
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
        justifyContent: 'center',
        zIndex: 1, // works on ios
        elevation: 0, // works on android
    },
    icon: {
        alignSelf: 'center'
    },
    header: {
        color: THEME.SIDE_MENU_ITEMS_TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT35,
        textAlign: 'center',
        paddingTop: 35
    },
    text: {
        color: THEME.SIDE_MENU_ITEMS_TEXT_COLOR,
        fontFamily: THEME.FONT_LIGHT,
        fontSize: THEME.FONT30,
        textAlign: 'center',
        marginBottom: 10
    },
    input: {
        width: '100%',
        minHeight: 52,
        height: 52,
        fontSize: THEME.FONT30,
        lineHeight: 34,
        color: '#000',
        marginBottom: 24,
        paddingVertical: 0,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: "#000",
        borderStyle: "solid",
        borderBottomWidth: 3
    },
    keyboardInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0
    },
    button: {
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR
    },
    buttonTitle: {
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT25
    }
})

export default CustomPrompt;