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
    message: 'Выборы больше не проводятся.',
    header: 'У вас склероз?!',
    iconName: 'grin-tongue-wink',
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: true,
    buttons: [
        {   
            key: 0,
            hint: 'Ой',
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

export const ELECTION_SCREEN_NO_MONEY_CHEATING = {
    message: '',
    header: 'Вы не имеете требуемой суммы!',
    iconName: 'angry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Ой, уже ухожу',
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

export const POSSESSION_SCREEN_NO_MONEY_CHEATING = ELECTION_SCREEN_NO_MONEY_CHEATING;

export const POSSESSION_SCREEN_NOTHING_TO_SALE_CHEATING = {
    message: '',
    header: 'Вам нечего продавать!',
    iconName: 'angry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Ой, уже ухожу',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const POSSESSION_SCREEN_DONT_BE_FOOL_WARNING = {
    message: 'Усвоили?',
    header: '',
    iconName: 'angry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Ой, уже ухожу',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const POSSESSION_SCREEN_ANOTHER_DEAL = {
    message: 'Еще одна сделка?',
    header: 'СДЕЛКА СОСТОЯЛАСЬ!!!',
    iconName: 'handshake', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Да',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            hint: 'Нет',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const EMPLOYEES_SCREEN_TO_HIRE = {
    message: 'Выплачивате?',
    header: '',
    iconName: 'question', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Да',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            hint: 'Нет',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const EMPLOYEES_SCREEN_CONTRACT_IS_CONCLUDED = {
    message: 'Еще одна сделка?',
    header: 'Договор оформлен.',
    iconName: 'handshake', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Да',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            hint: 'Нет',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const EMPLOYEES_SCREEN_NOT_AGREE_TO_PREPAY = {
    message: 'Дело ваше.',
    header: 'Как хотите!',
    iconName: 'handshake-alt-slash', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Уйти',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const EMPLOYEES_SCREEN_CONTRACT_TERMINATED = {
    message: 'Еще одна сделка?',
    header: 'Договор расторгнут.',
    iconName: 'handshake-alt-slash', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Да',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            hint: 'Нет',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const EMPLOYEES_SCREEN_CONTRACT_TERMINATED_NO_MONEY = {
    message: '',
    header: 'Договор расторгнут.',
    iconName: 'handshake-alt-slash', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Уйти',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const EMPLOYEES_SCREEN_NO_MONEY_CHEATING = POSSESSION_SCREEN_NO_MONEY_CHEATING;
export const EMPLOYEES_SCREEN_DONT_BE_FOOL_WARNING = POSSESSION_SCREEN_DONT_BE_FOOL_WARNING;

export const BUSINESS_SCREEN_NO_MONEY_CHEATING = POSSESSION_SCREEN_NO_MONEY_CHEATING;
export const BUSINESS_SCREEN_NOTHING_TO_SALE_CHEATING = POSSESSION_SCREEN_NOTHING_TO_SALE_CHEATING;
export const BUSINESS_SCREEN_DONT_BE_FOOL_WARNING = POSSESSION_SCREEN_DONT_BE_FOOL_WARNING;
export const BUSINESS_SCREEN_ANOTHER_DEAL = POSSESSION_SCREEN_ANOTHER_DEAL;

export const STOCKMARKET_SCREEN_INPUT_STOCKS_QUANTITY = {
    message: 'Введите количество акций',
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
            hint: 'Подтвердить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            disabledIfEmpty: false,
            hint: 'Отмена',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const STOCKMARKET_SCREEN_NO_MONEY_CHEATING = POSSESSION_SCREEN_NO_MONEY_CHEATING;
export const STOCKMARKET_SCREEN_NOTHING_TO_SALE_CHEATING = POSSESSION_SCREEN_NOTHING_TO_SALE_CHEATING;
export const STOCKMARKET_SCREEN_ANOTHER_DEAL = POSSESSION_SCREEN_ANOTHER_DEAL;

export const STOCKMARKET_IS_CLOSED = {
    message: 'Биржа закрыта',
    header: 'Конец года!',
    iconName: 'lock', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Понял, ухожу',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const STOCKMARKET_SCREEN_PROBLEM = {
    message: '',
    header: '',
    iconName: 'exclamation', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Понял, принял',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const STOCKMARKET_SCREEN_CLAIM_PROBLEM = {
    message: '',
    header: 'На вас подали в суд!',
    iconName: 'exclamation', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Да',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            hint: 'Нет',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const STOCKMARKET_SCREEN_STOLE_STOCKS_PROBLEM = {
    message: '',
    header: 'Кража!',
    iconName: 'exclamation', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Да',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            hint: 'Нет',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const INSURANCE_SCREEN_MAX_AMOUNT_WARNING = {
    message: 'Больше чем на максимальную сумму не страхуем. Усвоили?',
    header: 'Внимание!',
    iconName: 'exclamation', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Понял, принял',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const INSURANCE_SCREEN_ANOTHER_INSURANCE = {
    message: 'Еще одна страховка?',
    header: 'Имущество застраховано!',
    iconName: 'handshake', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Да',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            hint: 'Нет',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const INSURANCE_SCREEN_INPUT_TERM = {
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
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            disabledIfEmpty: false,
            hint: 'Отмена',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const INSURANCE_SCREEN_INPUT_AMOUNT = {
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
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            disabledIfEmpty: false,
            hint: 'Отмена',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const DEPOSIT_SCREEN_NO_MONEY_CHEATING = POSSESSION_SCREEN_NO_MONEY_CHEATING;

export const DEPOSIT_SCREEN_DEPOSIT_PLACED = {
    message: 'Депозит размещен.',
    header: 'Успех!',
    iconName: 'handshake', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Отлично',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const DEPOSIT_SCREEN_INPUT_AMOUNT = {
    message: 'Сколько помещаете?',
    header: 'Рамещаем депозит.',
    iconName: 'keyboard', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    onlyDigits: true,
    buttons: [
        {   
            key: 0,
            disabledIfEmpty: true,
            hint: 'Сделать вклад',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            disabledIfEmpty: false,
            hint: 'Отмена',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const WITHDRAW_SCREEN_WITHDRAW_SUCCESSFUL = {
    message: 'Денежные средства сняты.',
    header: 'Успех!',
    iconName: 'handshake', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Уйти',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const WITHDRAW_SCREEN_BE_ATTENTIVE = {
    message: 'Внимательнее надо.',
    header: 'Снять не удалось!',
    iconName: 'exclamation', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Ой, исправлюсь',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const WITHDRAW_SCREEN_INPUT_AMOUNT = {
    message: 'Сколько берете?',
    header: 'Снимаем деньги.',
    iconName: 'keyboard', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    onlyDigits: true,
    buttons: [
        {   
            key: 0,
            disabledIfEmpty: true,
            hint: 'Снять деньги',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            disabledIfEmpty: false,
            hint: 'Отмена',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const LEND_SCREEN_NO_MONEY = {
    message: 'Вы не имеете требуемой суммы наличными!',
    header: 'Сделка отменяется!',
    iconName: 'angry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Понял, ухожу',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const LEND_SCREEN_INPUT_AMOUNT = {
    message: 'Сколько даете?',
    header: 'Ссужаем деньги.',
    iconName: 'keyboard', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    onlyDigits: true,
    buttons: [
        {   
            key: 0,
            disabledIfEmpty: true,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            disabledIfEmpty: false,
            hint: 'Отмена',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const LEND_SCREEN_TERM_TOO_LONG = {
    message: 'Слишком долго!',
    header: 'Эк загнули!',
    iconName: 'ban', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Понял',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const LEND_SCREEN_INPUT_TERM = {
    message: 'На сколько лет?',
    header: 'Ссужаем деньги.',
    iconName: 'keyboard', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    onlyDigits: true,
    buttons: [
        {   
            key: 0,
            disabledIfEmpty: true,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            disabledIfEmpty: false,
            hint: 'Отмена',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const LEND_SCREEN_INPUT_PERSENTAGES = {
    message: 'Под какие проценты?',
    header: 'Ссужаем деньги.',
    iconName: 'keyboard', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    onlyDigits: true,
    buttons: [
        {   
            key: 0,
            disabledIfEmpty: true,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            disabledIfEmpty: false,
            hint: 'Отмена',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const LEND_SCREEN_LEND_MONEY = {
    message: '',
    header: 'Ссужаем деньги.',
    iconName: 'question', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Да',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            hint: 'Нет',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const LEND_SCREEN_NOT_ARGEE_TO_LEND = EMPLOYEES_SCREEN_NOT_AGREE_TO_PREPAY;

export const BORROW_SCREEN_INPUT_AMOUNT = {
    message: 'Сколько берете?',
    header: 'Получаем кредит.',
    iconName: 'keyboard', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    onlyDigits: true,
    buttons: [
        {   
            key: 0,
            disabledIfEmpty: true,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            disabledIfEmpty: false,
            hint: 'Отмена',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
}

export const BORROW_SCREEN_INPUT_TERM = {
    message: 'На какой срок?',
    header: 'Получаем кредит.',
    iconName: 'keyboard', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    onlyDigits: true,
    buttons: [
        {   
            key: 0,
            disabledIfEmpty: true,
            hint: 'Продолжить',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            disabledIfEmpty: false,
            hint: 'Отмена',
            backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
            textColor: THEME.TEXT_COLOR,
        }
    ]
};

export const BORROW_SCREEN_CANT_READ = {
    message: 'Читать не умеете?',
    header: 'Внимательно!',
    iconName: 'angry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Понял',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const BORROW_SCREEN_BORROW_MONEY = {
    message: '',
    header: 'Получаем кредит.',
    iconName: 'question', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Да',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
        {   
            key: 1,
            hint: 'Нет',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}

export const BORROW_SCREEN_TIME_TO_PAY = {
    message: '',
    header: 'Запомните!',
    iconName: 'handshake', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        {   
            key: 0,
            hint: 'Понял',
            //backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
            textColor: THEME.TEXT_COLOR,
        },
    ]
}