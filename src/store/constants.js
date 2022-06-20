import { THEME } from "../styles/theme";

export const SOCIAL_STATUSES = [ 'Бизнесмен', 'Лидер профсоюза мусорщиков', 'Шериф', 'Сенатор', 'Президент' ];
export const POSSESSION_LIST = [ 'Квартиру', 'Машину', 'Виллу', 'Яхту', 'Самолет'];
export const EMPLOYEES_LIST = [ 'Маклера', 'Врача', 'Адвоката', 'Детектива', 'Личную охрану' ];
export const BUSINESS_LIST = [ 'Бар', 'Ресторан', 'Магазин', 'Отель', 'Завод' ];
export const STOCKS_LIST = [ 'Газпром', 'Роснефть', 'Лукойл', 'Магнит', 'Сбер' ];
export const BANKING_SERVICES = [ 'Застраховать имущество', 'Сделать вклад', 'Снять со счета', 'Дать ссуду', 'Получить кредит' ];

//AlertWindows constants
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
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
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
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const INPUT_CASH_AMOUNT_SCREEN_ALERT = {
    message: '', 
    header: 'Откуда?!',
    iconName: 'question',
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Продолжить',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
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
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            hint: 'Выйти',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
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
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
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
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
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
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
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
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const ENSURANCE_SCREEN_INPUT_AMOUNT = {
    message: '',
    header: '',
    iconName: 'keyboard', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    onlyDigits: true,
    buttons: [
        {   
            key: 0,
            disabledIfEmpty: true,
            hint: 'Страховать',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            disabledIfEmpty: false,
            hint: 'Отмена',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}