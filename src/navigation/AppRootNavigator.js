import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntroScreen } from "../screens/Intro/IntroScreen";
import { inputInitialDataScreen } from "../screens/InitialData/InputInitialDataScreen";

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
                    name = "InputInitialDataScreen"
                    component = { inputInitialDataScreen }
                />
            </AppRootNavigator.Navigator>
        </NavigationContainer>
    )
}