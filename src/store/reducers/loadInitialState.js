import { getDataFromStore } from "../../components/FileSystem";

export const appSettingsInitialState = {
    isIntroShown: false,
    isGameStarted: false
}

export const gameSettingsInitialState = {
    gameDifficultyLevel: 3,
    playerAge: 18,
    
    //Player wealth
    cash: 1500
}

export const loadInitialState = async () => {
    try {
        const loadedAppSettings = await getDataFromStore('APP_SETTINGS');
        if( loadedAppSettings ) appSettingsInitialState = loadedAppSettings;
        const loadedGameSettings = await getDataFromStore('GAME_SETTINGS');
        if( loadedGameSettings ) gameSettingsInitialState = loadedGameSettings;
    } catch(e) {
        console.log('Something goes wrong');
    }
}

