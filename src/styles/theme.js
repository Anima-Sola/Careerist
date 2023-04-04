//The theme file in which colors, fonts, etc. are set.
import { StatusBar, Dimensions, PixelRatio } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const fontScale = PixelRatio.getFontScale();

export const THEME = {
    MAIN_BACKGROUND_COLOR: '#385C74',
    SECOND_BACKGROUND_COLOR: '#B59B52',
    THIRD_BACKGROUND_COLOR: '#B56B52',
    FORTH_BACKGROUND_COLOR: '#12354B',
    DISABLED_BUTTON_COLOR: '#2d4a5d',
    DISABLED_BUTTON_PROMPT_COLOR: '#D3D3D3',
    SIDE_MENU_ITEMS_TEXT_COLOR: '#000',
    SIDE_MENU_BACKGROUND_COLOR: '#F5F5F5',
    TEXT_COLOR: '#fff',
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    FONT_SCALE: fontScale,
    STATUSBAR_HEIGHT: StatusBar.currentHeight,
    FONT22: hp('2.2%') / fontScale,
    FONT25: hp('2.5%') / fontScale,
    FONT28: hp('2.8%') / fontScale,
    FONT30: hp('3%') / fontScale,
    FONT35: hp('3.5%') / fontScale,
    FONT40: hp('4%') / fontScale,
    FONT45: hp('4.5%') / fontScale,
    FONT50: hp('5%') / fontScale,
    FONT_LIGHT: 'nunito-light',
    FONT_EXTRALIGHT: 'nunito-extralight',
    FONT_SEMIBOLD: 'nunito-semibold',
    FONT_SEMIBOLD_ITALIC: 'nunito-semibolditalic',
    PRESSABLE_STYLES: ( itemStyles ) => {
        return (({ pressed }) => 
            [
                { 
                    backgroundColor: pressed ? THEME.THIRD_BACKGROUND_COLOR : THEME.SECOND_BACKGROUND_COLOR
                },
                itemStyles
            ]
        )
    },
    SIDE_MENU_PRESSABLE_STYLE: ( itemStyles ) => {
        return (({ pressed }) => 
            [
                { 
                    backgroundColor: pressed ? 'rgb(210, 230, 255)': THEME.SIDE_MENU_BACKGROUND_COLOR 
                },
                itemStyles
            ]
        )
    }
}