import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from "../screens/Intro/IntroScreen";
import { SetGameDifficultyScreen } from "../screens/GameSettings/SetGameDifficultyScreen";
import { InputAgeScreen } from '../screens/GameSettings/InputAgeScreen';
import { InputСashAmountScreen } from "../screens/GameSettings/InputCashAmountScreen";
import { GameMainScreen } from "../screens/Game/GameMainScreen";
import { LoadingScreen } from "../screens/LoadingScreen";
import { FinancialSituationScreen } from "../screens/Game/FinancialSituationScreen";
import { ElectionScreen } from "../screens/Game/ElectionScreen";
import { PossessionScreen } from '../screens/Game/PossessionScreen';
import { EmployeesScreen } from '../screens/Game/EmployeesScreen';
import { BusinessScreen } from '../screens/Game/BusinessScreen';
import { StockmarketScreen } from '../screens/Game/StockmarketScreen';
import { BankScreen } from '../screens/Game/BankScreen';
import { InsuranceScreen } from "../screens/Game/BankServices/InsuranceScreen";
import { DepositScreen } from "../screens/Game/BankServices/DepositScreen";
import { WithdrawScreen } from "../screens/Game/BankServices/WithdrawScreen";
import { LendScreen } from "../screens/Game/BankServices/LendScreen";
import { BorrowScreen } from "../screens/Game/BankServices/BorrowScreen";
import { EntertainmentScreen } from "../screens/Game/EntertainmentScreen"; 
import { TotalScreen } from "../screens/Game/TotalScreen";
import { DeathScreen } from "../screens/Game/DeathScreen";
import { BankruptScreen } from "../screens/Game/BankruptScreen";
import { JailScreen } from "../screens/Game/JailScreen";
import { WinScreen } from "../screens/Game/WinScreen";
import { SettingsScreen } from "../screens/App/SettingsScreen";
import { AboutScreen } from "../screens/App/AboutScreen";

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
                    name = "GameMainScreen"
                    component = { GameMainScreen }
                />
                <AppRootNavigator.Screen
                    name = "FinancialSituationScreen"
                    component = { FinancialSituationScreen }
                />
                <AppRootNavigator.Screen
                    name = "ElectionScreen"
                    component = { ElectionScreen }
                />
                <AppRootNavigator.Screen
                    name = "PossessionScreen"
                    component = { PossessionScreen }
                />
                <AppRootNavigator.Screen
                    name = "EmployeesScreen"
                    component = { EmployeesScreen }
                />
                <AppRootNavigator.Screen
                    name = "BusinessScreen"
                    component = { BusinessScreen }
                />
                <AppRootNavigator.Screen
                    name = "StockmarketScreen"
                    component = { StockmarketScreen }
                />
                <AppRootNavigator.Screen
                    name = "BankScreen"
                    component = { BankScreen }
                />
                <AppRootNavigator.Screen
                    name = "InsuranceScreen"
                    component = { InsuranceScreen }
                />
                <AppRootNavigator.Screen
                    name = "DepositScreen"
                    component = { DepositScreen }
                />
                <AppRootNavigator.Screen
                    name = "WithdrawScreen"
                    component = { WithdrawScreen }
                />
                <AppRootNavigator.Screen
                    name = "LendScreen"
                    component = { LendScreen }
                />
                <AppRootNavigator.Screen
                    name = "BorrowScreen"
                    component = { BorrowScreen }
                />
                <AppRootNavigator.Screen
                    name = "EntertainmentScreen"
                    component = { EntertainmentScreen }
                />
                <AppRootNavigator.Screen
                    name = "TotalScreen"
                    component = { TotalScreen }
                />
                <AppRootNavigator.Screen
                    name = "DeathScreen"
                    component = { DeathScreen }
                />
                <AppRootNavigator.Screen
                    name = "BankruptScreen"
                    component = { BankruptScreen }
                />
                <AppRootNavigator.Screen
                    name = "JailScreen"
                    component = { JailScreen }
                />
                <AppRootNavigator.Screen
                    name = "WinScreen"
                    component = { WinScreen }
                />
                <AppRootNavigator.Screen
                    name = "SettingsScreen"
                    component = { SettingsScreen }
                />
                <AppRootNavigator.Screen
                    name = "AboutScreen"
                    component = { AboutScreen }
                />
            </AppRootNavigator.Navigator>
        </NavigationContainer>
    )
}

