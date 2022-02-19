import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { THEME } from "../../styles/theme";
import GameWrapper from "../../components/GameWrapper";

export const GameMainScreen = ({ navigation }) => {
    const wrappedComponent = <MainMenu navigation={ navigation } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const MainMenu = ({ navigation }) => {
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => { e.preventDefault() })
    })

    const pressableStyles = () => {
        return (({ pressed }) => 
            [
                { 
                    backgroundColor: pressed ? THEME.THIRD_BACKGROUND_COLOR : THEME.SECOND_BACKGROUND_COLOR
                },
                styles.menuItem
            ]
        )
    }

    const navToGameScreens = ( screen ) => {
        navigation.navigate( screen ); 
    }

    return (
        <View>
            <Text style={ styles.title }>Что вас интересует?</Text>
            <View style={ styles.menu }>
                <View style={ styles.menuRow }>
                    <Pressable style={ pressableStyles() } onPress={ () => navToGameScreens('FinancialSituationScreen') }>
                        <Text style={ styles.menuItemText }>Финансовое</Text>
                        <Text style={ styles.menuItemText }>положение</Text>
                    </Pressable>
                    <Pressable style={ pressableStyles() } >
                        <Text style={ styles.menuItemText }>Общественное</Text>
                        <Text style={ styles.menuItemText }>положение</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ pressableStyles() } >
                        <Text style={ styles.menuItemText }>Личное</Text>
                        <Text style={ styles.menuItemText }>имущество</Text>
                    </Pressable>
                    <Pressable style={ pressableStyles() } >
                        <Text style={ styles.menuItemText }>Подчиненные</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ pressableStyles() } >
                        <Text style={ styles.menuItemText }>Биржа</Text>
                    </Pressable>
                    <Pressable style={ pressableStyles() } >
                        <Text style={ styles.menuItemText }>Бизнес</Text>
                    </Pressable>
                </View>
                <View style={ styles.menuRow }>
                    <Pressable style={ pressableStyles() } >
                        <Text style={ styles.menuItemText }>Банк</Text>
                    </Pressable>
                    <Pressable style={ pressableStyles() } >
                        <Text style={ styles.menuItemText }>Развлечения</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    menuRow: {
        flexDirection: 'row',
        flex: 0.25
    },  
    menuItem: {
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
    }
})

/*export const GameMainScreen = ({ navigation }) => {
    const cash = useSelector( getCash );
    const childRef = useRef();

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => { e.preventDefault() })
    })

    const flingRightGesture = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => {
            childRef.current.showSideMenu();
        });

    const pressableStyles = () => {
        return (({ pressed }) => 
            [
                { 
                    backgroundColor: pressed ? THEME.THIRD_BACKGROUND_COLOR : THEME.SECOND_BACKGROUND_COLOR
                },
                styles.menuItem
            ]
        )
    }

    const navToGameScreens = ( screen ) => {
        navigation.navigate( screen ); 
    }

    return (
        <GestureDetector gesture={ flingRightGesture }>
            <View style={ styles.container }>
                <View style={ styles.menuContainer } >
                    <View style={ styles.header }>
                        <Pressable onPress={() => { childRef.current.showSideMenu() }}>  
                            <Ionicons name="ios-menu" size={32} color="white"/>
                        </Pressable> 
                        <View style={ styles.walletContainer }>
                            <Ionicons name="wallet-outline" size={32} color="white" />
                            <Text style={ styles.wallet }>{ cash + '$' }</Text>
                        </View>
                    </View>
                    <Text style={ styles.title }>Что вас интересует?</Text>
                    <View style={ styles.menu }>
                        <View style={ styles.menuRow }>
                            <Pressable style={ pressableStyles() } onPress={ () => navToGameScreens('FinancialSituationScreen') }>
                                <Text style={ styles.menuItemText }>Финансовое</Text>
                                <Text style={ styles.menuItemText }>положение</Text>
                            </Pressable>
                            <Pressable style={ pressableStyles() } >
                                <Text style={ styles.menuItemText }>Общественное</Text>
                                <Text style={ styles.menuItemText }>положение</Text>
                            </Pressable>
                        </View>
                        <View style={ styles.menuRow }>
                            <Pressable style={ pressableStyles() } >
                                <Text style={ styles.menuItemText }>Личное</Text>
                                <Text style={ styles.menuItemText }>имущество</Text>
                            </Pressable>
                            <Pressable style={ pressableStyles() } >
                                <Text style={ styles.menuItemText }>Подчиненные</Text>
                            </Pressable>
                        </View>
                        <View style={ styles.menuRow }>
                            <Pressable style={ pressableStyles() } >
                                <Text style={ styles.menuItemText }>Биржа</Text>
                            </Pressable>
                            <Pressable style={ pressableStyles() } >
                                <Text style={ styles.menuItemText }>Бизнес</Text>
                            </Pressable>
                        </View>
                        <View style={ styles.menuRow }>
                            <Pressable style={ pressableStyles() } >
                                <Text style={ styles.menuItemText }>Банк</Text>
                            </Pressable>
                            <Pressable style={ pressableStyles() } >
                                <Text style={ styles.menuItemText }>Развлечения</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <SideMenu ref={ childRef }/>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
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
    }
})*/


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