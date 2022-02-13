import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, createSwitchNavigator, createAppContainer } from '@react-navigation/native-stack';
import { IntroScreen } from "../screens/Intro/IntroScreen";
import { SetGameDifficultyScreen } from "../screens/GameSettings/SetGameDifficultyScreen";
import { InputAgeScreen } from '../screens/GameSettings/InputAgeScreen';
import { InputСashAmountScreen } from "../screens/GameSettings/InputCashAmountScreen";
import { MainScreen } from "../screens/MainScreen/MainScreen";
import { LoadingScreen } from "../screens/LoadingScreen";

/*const IntroNavigator = createNativeStackNavigator();

const IntroNavigation = () => {
    return (
        <IntroNavigator.Navigator
            screenOptions = {{
                headerShown: false,
            }}>
            <IntroNavigator.Screen 
                name = "IntroScreen"
                component = { IntroScreen }
            />
        </IntroNavigator.Navigator>
    )
}

const InputGameSettingsNavigator = createNativeStackNavigator();
    
const InputGameSettingsNavigation = () => {
    return (
        <InputGameSettingsNavigator.Navigator
            screenOptions = {{
                headerShown: false,
            }}>
            <InputGameSettingsNavigator.Screen
                name = "SetGameDifficultyScreen"
                component = { SetGameDifficultyScreen }
            />
            <InputGameSettingsNavigator.Screen
                name = "InputAgeScreen"
                component = { InputAgeScreen }
            />
            <InputGameSettingsNavigator.Screen
                name = "InputСashAmountScreen"
                component = { InputСashAmountScreen }
            />
        </InputGameSettingsNavigator.Navigator>
    )
}

const GameNavigator = createNativeStackNavigator();

const GameNavigation = () => {
    return (
        <GameNavigator.Navigator
            screenOptions = {{
                headerShown: false,
            }}>
            <GameNavigator.Screen
                name = "MainScreen"
                component = { MainScreen }
            />
        </GameNavigator.Navigator>
    )
}

const AppRootNavigator = createNativeStackNavigator();

export const AppRootNavigation = () => {
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
                    name = "IntroNavigation"
                    component = { IntroNavigation }
                />
                <AppRootNavigator.Screen
                    name = "InputGameSettingsNavigation"
                    component = { InputGameSettingsNavigation }
                />
                 <AppRootNavigator.Screen
                    name = "GameNavigation"
                    component = { GameNavigation }
                />
            </AppRootNavigator.Navigator>
        </NavigationContainer>
    )
}*/

const AppRootNavigator = createNativeStackNavigator();

export function AppRootNavigation () {
    return (
        <NavigationContainer>
            <AppRootNavigator.Navigator
                screenOptions = {{
                    headerShown: false,
                }}>
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
                    name = "MainScreen"
                    component = { MainScreen }
                />
            </AppRootNavigator.Navigator>
        </NavigationContainer>
    )
}