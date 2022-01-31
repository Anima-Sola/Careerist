import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, HeaderButton, Item } from "react-navigation-header-buttons";
import { menu } from 'react-native-vector-icons';
import { THEME } from "../../styles/theme";
import { getCash } from "../../store/selectors";

const AppHeaderIcon = props => (
    <HeaderButton
        {...props}
        iconSize={24} 
        IconComponent={menu}
        color={Platform.OS === 'android' ? '#fff' : THEME.THIRD_BACKGROUND_COLOR} 
    />
)

export const MainScreen = ({ navigation }) => {
    const cash = useSelector( getCash );

    useEffect(() => {
        navigation.setOptions({
            title: 'Что интересует?',
            headerShown: true,
            backgroundColor: THEME.THIRD_BACKGROUND_COLOR,
            headerRight: () => (
                <Text>{cash + '$'}</Text>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                  <Item
                    title='Toggle Drawer'
                    iconName='menu'
                    onPress={() => navigation.toggleDrawer()}
                  />
                </HeaderButtons>
            )
        });
    })

    return (
        <View style={ styles.container }>
            <View style={ styles.menuContainer } >
                <View style={ styles.menuRow }>
                    <TouchableOpacity style={ styles.menuItem } >
                        <Text style={ styles.menuItemText }>Финансовое положение</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.menuItem } >
                        <Text style={ styles.menuItemText }>Общественное положение</Text>
                    </TouchableOpacity>
                </View>
                <View style={ styles.menuRow }>
                    <TouchableOpacity style={ styles.menuItem } >
                        <Text style={ styles.menuItemText }>Личное имущество</Text>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        padding: 20
    },
    menuContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuRow: {
        flexDirection: 'row',
        flex: 0.25
    },  
    menuItem: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        margin: 2,
        width: '50%',
        borderRadius: 25,
        justifyContent: 'center'
    },
    menuItemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT17,
        textAlign: 'center'
    }
})