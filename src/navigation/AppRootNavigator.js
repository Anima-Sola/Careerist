import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntroPage1 } from "../screens/Intro/IntroPage1";
import { IntroPage2 } from "../screens/Intro/IntroPage2";
import { IntroPage3 } from "../screens/Intro/IntroPage3";

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
                <AppRootNavigator.Screen 
                    name = "IntroPage3"
                    component = { IntroPage3 }
                />
            </AppRootNavigator.Navigator>
        </NavigationContainer>
    )
}