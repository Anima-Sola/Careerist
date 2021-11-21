import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntroPage1 } from "../screens/Intro/IntroPage1";
import { IntroPage2 } from "../screens/Intro/IntroPage2";

const AppRootNavigator = createNativeStackNavigator();

export function AppRootNavigation () {
    return (
        <NavigationContainer>
            <AppRootNavigator.Navigator
                screenOptions = {{
                    headerShown: false,
                }} >
                <AppRootNavigator.Screen 
                    name = "IntroPage1"
                    component = { IntroPage1 }
                />
                <AppRootNavigator.Screen 
                    name = "IntroPage2"
                    component = { IntroPage2 }
                />
            </AppRootNavigator.Navigator>
        </NavigationContainer>
    )
}