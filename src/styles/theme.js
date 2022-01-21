import { StatusBar, Dimensions, Platform, PixelRatio } from 'react-native';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}

export const THEME = {
    MAIN_BACKGROUND_COLOR: '#385C74',
    SECOND_BACKGROUND_COLOR: '#B59B52',
    THIRD_BACKGROUND_COLOR: '#B56B52',
    DISABLED_BUTTON_COLOR: '#2d4a5d',
    TEXT_COLOR: '#fff',
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    SCREEN_ASPECT_RATIO: SCREEN_HEIGHT/SCREEN_WIDTH,
    STATUSBAR_HEIGHT: StatusBar.currentHeight,
    FONT12: normalize(12),
    FONT17: normalize(17),
    FONT20: normalize(20),
    FONT25: normalize(25),
    FONT30: normalize(30),
    FONT40: normalize(40),
    V_MARGIN10: SCREEN_HEIGHT / 74,
    H_MARGIN10: SCREEN_WIDTH / 39
}