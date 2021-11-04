import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from "../screens/WelcomeScreen";

const AppRootNavigator = createNativeStackNavigator();

export function AppRootNavigation () {
    return (
        <NavigationContainer>
            <AppRootNavigator.Navigator>
                <AppRootNavigator.Screen 
                    name = "WelcomeScreen"
                    component = { WelcomeScreen }
                />
            </AppRootNavigator.Navigator>
        </NavigationContainer>
    )
}