import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from "../../styles/theme";
import { getCash } from "../../store/selectors";

export const MainScreen = ({ navigation }) => {
    const cash = useSelector( getCash );
    const animSideMenu = useRef(new Animated.Value(0)).current;
    const animOverlayOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => { e.preventDefault() })
    })
    
    const showSideMenu = () => {
        Animated.parallel([
            Animated.timing(
                animSideMenu,
                {
                    toValue: THEME.SCREEN_WIDTH,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                animOverlayOpacity,
                {
                    toValue: 0.6,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
        ]).start();
    }

    const hideSideMenu = () => {
        Animated.timing(
            animSideMenu,
            {
                toValue: 0,
                duration: 200,
           
                useNativeDriver: true
            }
        ).start();
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.menuContainer } >
                <View style={ styles.header }>
                    <TouchableOpacity onPress={ showSideMenu }>  
                        <Ionicons name="ios-menu" size={32} color="white"/>
                    </TouchableOpacity> 
                    <View style={ styles.walletContainer }>
                        <Ionicons name="wallet-outline" size={32} color="white" />
                        <Text style={ styles.wallet }>{ cash + '$' }</Text>
                    </View>
                </View>
                <Text style={ styles.title }>Что вас интересует?</Text>
                <View style={ styles.menu }>
                    <View style={ styles.menuRow }>
                        <TouchableOpacity style={ styles.menuItem } >
                            <Text style={ styles.menuItemText }>Финансовое</Text>
                            <Text style={ styles.menuItemText }>положение</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.menuItem } >
                            <Text style={ styles.menuItemText }>Общественное</Text>
                            <Text style={ styles.menuItemText }>положение</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.menuRow }>
                        <TouchableOpacity style={ styles.menuItem } >
                            <Text style={ styles.menuItemText }>Личное</Text>
                            <Text style={ styles.menuItemText }>имущество</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.menuItem } >
                            <Text style={ styles.menuItemText }>Подчиненные</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.menuRow }>
                        <TouchableOpacity style={ styles.menuItem } >
                            <Text style={ styles.menuItemText }>Биржа</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.menuItem } >
                            <Text style={ styles.menuItemText }>Бизнес</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.menuRow }>
                        <TouchableOpacity style={ styles.menuItem } >
                            <Text style={ styles.menuItemText }>Банк</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.menuItem } >
                            <Text style={ styles.menuItemText }>Развлечения</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Animated.View style={{ ...styles.sideMenuContainer, transform: [{ translateX: animSideMenu }] }}>
                <View style={ styles.sideMenu }>

                </View>
                <TouchableOpacity style={{ ...styles.sideMenuOverlay, opacity: animOverlayOpacity }} onPress={ hideSideMenu }>

                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    sideMenuContainer: {
        flex: 1,
        flexDirection: 'row',
        position: "absolute",
        top: 0,
        left: - THEME.SCREEN_WIDTH,
        width: THEME.SCREEN_WIDTH,
        height: THEME.SCREEN_HEIGHT * 2,
    },
    sideMenu: {
        height: THEME.SCREEN_HEIGHT * 2,
        width: THEME.SCREEN_WIDTH * 0.7,
        backgroundColor: '#fff',
    },
    sideMenuOverlay: {
        height: THEME.SCREEN_HEIGHT * 2,
        width: THEME.SCREEN_WIDTH * 0.3,
        backgroundColor: '#000',
        opacity: 0
    },  
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: THEME.STATUSBAR_HEIGHT + 10,
    },
    menuContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    walletContainer: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    wallet: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT25,
        paddingLeft: 10  
    },
    title: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT20,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 15
    },
    menu: {
        flex: 1,
        alignItems: 'center'
    },
    menuRow: {
        flexDirection: 'row',
        flex: 0.25
    },  
    menuItem: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        margin: 5,
        width: '50%',
        borderRadius: 10,
        justifyContent: 'center'
    },
    menuItemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT17,
        textAlign: 'center',
    },

})


/*const AppHeaderIcon = props => (
    <HeaderButton
        {...props}
        iconSize={ 30 } 
        IconComponent={ Ionicons }
        color={ Platform.OS === 'android' ? '#fff' : THEME.MAIN_BACKGROUND_COLOR } 
    />
)


    useEffect(() => {
        navigation.setOptions({
        
           title: '',
            headerShown: true,
            headerStyle: {
                backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
                borderColor: "#fff",
                borderStyle: "solid",
                borderBottomWidth: 2
            },
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={ AppHeaderIcon }>
                    <Item 
                        title='Toggle Drawer'
                        iconName='wallet-outline'
                        onPress={() => navigation.toggleDrawer()}
                    />
                    <Text style={ styles.wallet }>{ cash + '$' }</Text>
                </HeaderButtons>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={ AppHeaderIcon }>
                    <Item 
                        title='Toggle Drawer'
                        iconName='ios-menu'
                        onPress={() => navigation.toggleDrawer()}
                    />
                </HeaderButtons>
            )
        });
    })*/