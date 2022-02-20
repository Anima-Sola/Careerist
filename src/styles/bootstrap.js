import * as Font from 'expo-font';

export async function loadFonts() {
    try {
        await Font.loadAsync({
            'nunito-extralight': require('../assets/fonts/Nunito-ExtraLight.ttf'),
            'nunito-light': require('../assets/fonts/Nunito-Light.ttf'),
            'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
            'nunito-semibold': require('../assets/fonts/Nunito-SemiBold.ttf'),
            'nunito-lightitalic': require('../assets/fonts/Nunito-LightItalic.ttf'),
            'nunito-extralightitalic': require('../assets/fonts/Nunito-ExtraLightItalic.ttf'),
            'nunito-semibolditalic': require('../assets/fonts/Nunito-SemiBoldItalic.ttf'),
        }) 
    } catch (e) {
        console.log('Error: ', e);
    }
}