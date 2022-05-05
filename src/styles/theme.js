import { StatusBar, Dimensions, Platform, PixelRatio } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

/*const scale = SCREEN_WIDTH / 320;

function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}*/

export const THEME = {
    MAIN_BACKGROUND_COLOR: '#385C74',
    SECOND_BACKGROUND_COLOR: '#B59B52',
    THIRD_BACKGROUND_COLOR: '#B56B52',
    FORTH_BACKGROUND_COLOR: '#12354B',
    DISABLED_BUTTON_COLOR: '#2d4a5d',
    SIDE_MENU_ITEMS_TEXT_COLOR: '#000',
    SIDE_MENU_BACKGROUND_COLOR: '#F5F5F5',
    TEXT_COLOR: '#fff',
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    SCREEN_ASPECT_RATIO: SCREEN_HEIGHT/SCREEN_WIDTH,
    STATUSBAR_HEIGHT: StatusBar.currentHeight,
    FONT22: hp('2.2%'),
    FONT25: hp('2.5%'),
    FONT28: hp('2.8%'),
    FONT30: hp('3%'),
    FONT35: hp('3.5%'),
    FONT40: hp('4%'),
    FONT45: hp('4.5%'),
    V_MARGIN10: SCREEN_HEIGHT / 74,
    H_MARGIN10: SCREEN_WIDTH / 39,
    PRESSABLE_STYLES: (itemStyles) => {
        return (({ pressed }) => 
            [
                { 
                    backgroundColor: pressed ? THEME.THIRD_BACKGROUND_COLOR : THEME.SECOND_BACKGROUND_COLOR
                },
                itemStyles
            ]
        )
    }
}