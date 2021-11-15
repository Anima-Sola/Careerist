import * as Font from 'expo-font';

export async function bootstrap() {
    try {
        await Font.loadAsync({
            'nunito-extralight': require('../assets/fonts/Nunito-ExtraLight.ttf'),
            'nunito-light': require('../assets/fonts/Nunito-Light.ttf'),
            'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
            'nunito-semibold': require('../assets/fonts/Nunito-SemiBold.ttf'),
        }) 
    } catch (e) {
        console.log('Error: ', e);
    }
}