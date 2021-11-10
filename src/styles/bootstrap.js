import * as Font from 'expo-font';

export async function bootstrap() {
    try {
        await Font.loadAsync({
            'roboto-light': require('../assets/fonts/Roboto-Light.ttf'),
            'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf')
        }) 
    } catch (e) {
        console.log('Error: ', e);
    }
}