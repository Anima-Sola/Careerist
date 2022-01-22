import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntroScreen } from "../screens/Intro/IntroScreen";
import { SetGameDifficultyScreen } from "../screens/InitialData/SetGameDifficultyScreen";
import { InputAgeScreen } from '../screens/InitialData/InputAgeScreen';
import { InputСashAmountScreen } from "../screens/InitialData/InputCashAmountScreen";

const AppRootNavigator = createNativeStackNavigator();

export function AppRootNavigation () {
    return (
        <NavigationContainer>
            <AppRootNavigator.Navigator
                screenOptions = {{
                    headerShown: false,
                }} >
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
            </AppRootNavigator.Navigator>
        </NavigationContainer>
    )
}