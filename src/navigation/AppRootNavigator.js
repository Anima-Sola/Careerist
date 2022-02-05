import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { IntroScreen } from "../screens/Intro/IntroScreen";
import { SetGameDifficultyScreen } from "../screens/GameSettings/SetGameDifficultyScreen";
import { InputAgeScreen } from '../screens/GameSettings/InputAgeScreen';
import { InputСashAmountScreen } from "../screens/GameSettings/InputCashAmountScreen";
import { MainScreen } from "../screens/MainScreen/MainScreen";
import { LoadingScreen } from "../screens/LoadingScreen";

const DrawerNavigator = createDrawerNavigator();

const MainScreenNavigation = () => {
    return (
        <DrawerNavigator.Navigator
            screenOptions = {{
                 headerShown: false,
            }} >
            <DrawerNavigator.Screen
                name="MainScreen"
                component={ MainScreen }
            />
        </DrawerNavigator.Navigator>
    )
}

const AppRootNavigator = createNativeStackNavigator();

export function AppRootNavigation () {
    return (
        <NavigationContainer>
            <AppRootNavigator.Navigator
                screenOptions = {{
                    headerShown: false,
                }} >
                <AppRootNavigator.Screen 
                    name = "LoadingScreen"
                    component = { LoadingScreen }
                />
                <AppRootNavigator.Screen 
                    name = "IntroScreen"
                    component = { IntroScreen }
                />
                <AppRootNavigator.Screen
                    name = "SetGameDifficultyScreen"
                    component = { SetGameDifficultyScreen }
                />
                <AppRootNavigator.Screen
                    name = "InputAgeScreen"
                    component = { InputAgeScreen }
                />
                <AppRootNavigator.Screen
                    name = "InputСashAmountScreen"
                    component = { InputСashAmountScreen }
                />
                <AppRootNavigator.Screen
                    name = "MainScreenNavigation"
                    component = { MainScreenNavigation }
                />
            </AppRootNavigator.Navigator>
        </NavigationContainer>
    )
}