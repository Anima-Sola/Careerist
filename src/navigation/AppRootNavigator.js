import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntroMainPage } from "../screens/Intro/IntroMainPage";

const AppRootNavigator = createNativeStackNavigator();

export function AppRootNavigation () {
    return (
        <NavigationContainer>
            <AppRootNavigator.Navigator
                screenOptions = {{
                    headerShown: false,
                }} >
                <AppRootNavigator.Screen 
                    name = "IntroMainPage"
                    component = { IntroMainPage }
                />
            </AppRootNavigator.Navigator>
        </NavigationContainer>
    )
}