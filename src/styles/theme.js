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
    TEXT_COLOR: '#fff',
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    ASPECT_RATIO: SCREEN_HEIGHT/SCREEN_WIDTH,
    STATUSBAR_HEIGHT: StatusBar.currentHeight,
    FONT_MINI: normalize(12),
    FONT_SMALL: normalize(17),
    FONT_MEDIUM: normalize(20),
    FONT_LARGE: normalize(30),
    FONT_XLARGE: normalize(40),
    V_MARGIN10: SCREEN_HEIGHT / 74,
    H_MARGIN10: SCREEN_WIDTH / 39
}