import { THEME } from "../styles/theme";

export const SOCIAL_STATUSES = [ 'Бизнесмен', 'Лидер профсоюза мусорщиков', 'Шериф', 'Сенатор', 'Президент' ];


//AlertWindows constants
/*export const LOADING_SCREEN_ALERT = {
    alertVisible: false,
    setAlertVisible: () => setAlertVisible(),
    message: 'Желаете продолжить?',
    header: 'Обнаружена незаконченная игра',
    iconName: 'question',
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    button: [
        {   
            key: 0,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
            onPressCallback: () => navToMainScreen()
        },
        {   
            key: 1,
            hint: 'Начать заново',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
            onPressCallback: () => navToIntro()
        }
    ]
}*/

export const INPUT_AGE_SCREEN_BABY_ALERT = {
    message: 'Младенцам у нас делать нечего!', 
    header: 'Ой!',
    iconName: 'baby',
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: true,
    buttons: [
        {   
            key: 0,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const INPUT_AGE_SCREEN_OLD_ALERT = {
    message: 'В мумиях не нуждаемся!', 
    header: 'Ой!',
    iconName: 'blind',
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: true,
    buttons: [
        {   
            key: 0,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const INPUT_CASH_AMOUNT_SCREEN_ALERT = {
    message: '', 
    header: 'Откуда?!',
    iconName: 'ban',
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const GAME_MAIN_SCREEN_QUIT_GAME_ALERT = {
    message: 'Вы действительно желаете выйти из игры?',
    header: 'Выход',
    iconName: 'question',
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    buttons: [
        {   
            key: 0,
            hint: 'Остаться',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            hint: 'Выйти',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const GAME_MAIN_SCREEN_SCLEROSIS_WARNING = {
    message: 'У вас склероз?!',
    header: 'Выборов нет!!!',
    iconName: 'grin-tongue-wink',
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: true,
    buttons: [
        {   
            key: 0,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        } 
    ]
}

export const ELECTION_SCREEN_SKIP_ELECTION = {
    message: 'Следующие выборы через 2 года.',
    header: 'Выборы завершены!',
    iconName: 'sad-cry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const ELECTION_SCREEN_LOSE_ELECTION = {
    message: '',
    header: 'Выборы завершены!',
    iconName: 'sad-cry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const ELECTION_SCREEN_WIN_ELECTION = {
    message: '',
    header: 'ПОЗДРАВЛЯЕМ!!!',
    iconName: 'hand-peace', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}