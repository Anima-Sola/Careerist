import { THEME } from "../styles/theme";

export const SOCIAL_STATUSES = [ 'Бизнесмен', 'Лидер профсоюза мусорщиков', 'Шериф', 'Сенатор', 'Президент' ];
export const POSSESSION_LIST = [ 'Квартиру', 'Машину', 'Виллу', 'Яхту', 'Самолет'];
export const EMPLOYEES_LIST = [ 'Маклера', 'Врача', 'Адвоката', 'Детектива', 'Личную охрану' ];
export const BUSINESS_LIST = [ 'Бар', 'Ресторан', 'Магазин', 'Отель', 'Завод' ];
export const STOCKS_LIST = [ 'Skynet', 'Trolling', 'Nomoney', 'Needles', 'Pear' ];
export const BANKING_SERVICES = [ 'Застраховать имущество', 'Сделать вклад', 'Снять со счета', 'Дать ссуду', 'Получить кредит' ];
export const ENTERTAINMENT_LIST = [ 'Преферанс', 'Монте-Карло', 'Любовница', 'Банкет', 'Круиз' ];

const alertBtn1 = {
    key: 0,
    hint: '',
    textColor: THEME.TEXT_COLOR
}

const promptBtn1 = {   
    key: 0,
    disabledIfEmpty: true,
    hint: '',
    backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
    disabledBackgroundColor: THEME.DISABLED_BUTTON_PROMPT_COLOR,
    textColor: THEME.TEXT_COLOR,
}

const alertBtn2 = { ...alertBtn1, key: 1 }
const promptBtn2 = { ...promptBtn1, key: 1 }

//Alerts and Prompts constants
export const INPUT_AGE_SCREEN_BABY_ALERT = {
    message: 'Младенцам у нас делать нечего!', 
    header: 'Ой!',
    iconName: 'baby',
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: true,
    buttons: [ { ...alertBtn1, hint: 'Продолжить' } ]
}

export const INPUT_AGE_SCREEN_OLD_ALERT = {
    message: 'В мумиях не нуждаемся!', 
    header: 'Ой!',
    iconName: 'blind',
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: true,
    buttons: [ { ...alertBtn1, hint: 'Продолжить' } ]
}

export const INPUT_CASH_AMOUNT_SCREEN_ALERT = {
    message: '', 
    header: 'Откуда?!',
    iconName: 'question',
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Продолжить' } ]
}

export const GAME_MAIN_SCREEN_QUIT_GAME_ALERT = {
    message: 'Вы действительно желаете выйти из игры?',
    header: 'Выход',
    iconName: 'question',
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    buttons: [
        { ...alertBtn1, hint: 'Остаться' },
        { ...alertBtn2, hint: 'Выйти' }
    ]
}

export const GAME_MAIN_SCREEN_LEND_NOT_REFUND = {
    message: '',
    header: 'Вас надули со ссудой!',
    iconName: 'sad-cry',
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: true,
    paddingTop: 2,
    buttons: [ { ...alertBtn1, hint: 'Вот мерзавцы!' } ]
}

export const GAME_MAIN_SCREEN_LEND_REFUND = {
    message: '',
    header: 'Вы удачно ссудили деньги!',
    iconName: 'smile',
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    buttons: [ { ...alertBtn1, hint: 'Отлично' } ]
}

export const GAME_MAIN_SCREEN_BORROW_REFUND = {
    message: '',
    header: 'Возврат кредита!',
    iconName: 'dollar-sign',
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: true,
    buttons: [ { ...alertBtn1, hint: 'Продолжить' } ]
}

export const GAME_MAIN_SCREEN_DISASTER = {
    message: '',
    header: 'Беда!',
    iconName: 'sad-cry',
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: true,
    buttons: [ { ...alertBtn1, hint: 'Очень жаль' } ]
}

export const ELECTION_SCREEN_SKIP_ELECTION = {
    message: 'Следующие выборы через 2 года.',
    header: 'Выборы завершены!',
    iconName: 'sad-cry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Продолжить' } ]
}

export const ELECTION_SCREEN_NO_MONEY_CHEATING = {
    message: '',
    header: 'Вы не имеете требуемой суммы!',
    iconName: 'angry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Ой, уже ухожу' } ]
}

export const ELECTION_SCREEN_LOSE_ELECTION = {
    message: '',
    header: 'Выборы завершены!',
    iconName: 'sad-cry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Продолжить' } ]
}

export const ELECTION_SCREEN_WIN_ELECTION = {
    message: '',
    header: 'ПОЗДРАВЛЯЕМ!!!',
    iconName: 'hand-peace', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Продолжить' } ]
}

export const ELECTION_SCREEN_WIN_PRESIDENT_ELECTION = {
    message: 'Теперь вы президент.',
    header: 'ПОЗДРАВЛЯЕМ!!!',
    iconName: 'hand-peace', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'УРА!!!' } ]
}

export const POSSESSION_SCREEN_NO_MONEY_CHEATING = ELECTION_SCREEN_NO_MONEY_CHEATING;

export const POSSESSION_SCREEN_NOTHING_TO_SALE_CHEATING = {
    message: '',
    header: 'Вам нечего продавать!',
    iconName: 'angry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Ой, уже ухожу' } ]
}

export const POSSESSION_SCREEN_DONT_BE_FOOL_WARNING = {
    message: 'Усвоили?',
    header: '',
    iconName: 'angry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Ой, уже ухожу' } ]
}

export const POSSESSION_SCREEN_ANOTHER_DEAL = {
    message: 'Еще одна сделка?',
    header: 'СДЕЛКА СОСТОЯЛАСЬ!!!',
    iconName: 'handshake', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        { ...alertBtn1, hint: 'Да' },
        { ...alertBtn2, hint: 'Нет' }
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
        { ...alertBtn1, hint: 'Да' },
        { ...alertBtn2, hint: 'Нет' }
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
        { ...alertBtn1, hint: 'Да' },
        { ...alertBtn2, hint: 'Нет' }
    ]
}

export const EMPLOYEES_SCREEN_NOT_AGREE_TO_PREPAY = {
    message: 'Дело ваше.',
    header: 'Как хотите!',
    iconName: 'handshake-alt-slash', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Уйти' } ]
}

export const EMPLOYEES_SCREEN_CONTRACT_TERMINATED = {
    message: 'Еще одна сделка?',
    header: 'Договор расторгнут.',
    iconName: 'handshake-alt-slash', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        { ...alertBtn1, hint: 'Да' },
        { ...alertBtn2, hint: 'Нет' }
    ]
}

export const EMPLOYEES_SCREEN_CONTRACT_TERMINATED_NO_MONEY = {
    message: '',
    header: 'Договор расторгнут.',
    iconName: 'handshake-alt-slash', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Уйти' } ]
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
        { ...promptBtn1, hint: 'Подтвердить' },
        { ...promptBtn2, hint: 'Отмена' },
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
    buttons: [ { ...alertBtn1, hint: 'Уйти' } ]
}

export const STOCKMARKET_SCREEN_PROBLEM = {
    message: '',
    header: '',
    iconName: 'exclamation', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Жаль :(' } ]
}

export const STOCKMARKET_SCREEN_CLAIM_PROBLEM = {
    message: '',
    header: 'На вас подали в суд!',
    iconName: 'exclamation', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        { ...alertBtn1, hint: 'Да' },
        { ...alertBtn2, hint: 'Нет' }
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
        { ...alertBtn1, hint: 'Да' },
        { ...alertBtn2, hint: 'Нет' }
    ]
}

export const INSURANCE_SCREEN_MAX_AMOUNT_WARNING = {
    message: 'Больше чем на максимальную сумму не страхуем. Усвоили?',
    header: 'Внимание!',
    iconName: 'exclamation', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Принято' } ]
}

export const INSURANCE_SCREEN_ANOTHER_INSURANCE = {
    message: 'Еще одна страховка?',
    header: 'Имущество застраховано!',
    iconName: 'handshake', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        { ...alertBtn1, hint: 'Да' },
        { ...alertBtn2, hint: 'Нет' }
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
        { ...promptBtn1, hint: 'Продолжить' },
        { ...promptBtn2, hint: 'Отмена' },
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
        { ...promptBtn1, hint: 'Cтраховать' },
        { ...promptBtn2, hint: 'Отмена' },
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
    buttons: [ { ...alertBtn1, hint: 'Отлично' } ]
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
        { ...promptBtn1, hint: 'Cделать вклад' },
        { ...promptBtn2, hint: 'Отмена' },
    ]
}

export const WITHDRAW_SCREEN_WITHDRAW_SUCCESSFUL = {
    message: 'Денежные средства сняты.',
    header: 'Успех!',
    iconName: 'handshake', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Отлично' } ]
}

export const WITHDRAW_SCREEN_BE_ATTENTIVE = {
    message: 'Внимательнее надо.',
    header: 'Снять не удалось!',
    iconName: 'exclamation', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Ой, исправлюсь' } ]
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
        { ...promptBtn1, hint: 'Cнять деньги' },
        { ...promptBtn2, hint: 'Отмена' },
    ]
}

export const LEND_SCREEN_NO_MONEY = {
    message: 'Вы не имеете требуемой суммы наличными!',
    header: 'Сделка отменяется!',
    iconName: 'angry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Ой, ухожу' } ]
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
        { ...promptBtn1, hint: 'Продолжить' },
        { ...promptBtn2, hint: 'Отмена' },
    ]
}

export const LEND_SCREEN_TERM_TOO_LONG = {
    message: 'Слишком долго!',
    header: 'Эк загнули!',
    iconName: 'ban', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Принято' } ]
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
        { ...promptBtn1, hint: 'Продолжить' },
        { ...promptBtn2, hint: 'Отмена' },
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
        { ...promptBtn1, hint: 'Продолжить' },
        { ...promptBtn2, hint: 'Отмена' },
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
        { ...alertBtn1, hint: 'Да' },
        { ...alertBtn2, hint: 'Нет' }
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
        { ...promptBtn1, hint: 'Продолжить' },
        { ...promptBtn2, hint: 'Отмена' },
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
        { ...promptBtn1, hint: 'Продолжить' },
        { ...promptBtn2, hint: 'Отмена' },
    ]
};

export const BORROW_SCREEN_CANT_READ = {
    message: 'Читать не умеете?',
    header: 'Внимательно!',
    iconName: 'angry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Принято' } ]
}

export const BORROW_SCREEN_BORROW_MONEY = {
    message: '',
    header: 'Получаем кредит.',
    iconName: 'question', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        { ...alertBtn1, hint: 'Да' },
        { ...alertBtn2, hint: 'Нет' }
    ]
}

export const BORROW_SCREEN_TIME_TO_PAY = {
    message: '',
    header: 'Запомните!',
    iconName: 'handshake', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Принято' } ]
}

export const ENTERTAINMENT_SCREEN_YOU_ARE_MISER = {
    message: 'С вами неприятно иметь дело.',
    header: 'Вы жадина!',
    iconName: 'meh-rolling-eyes', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Ухожу' } ]
}

export const ENTERTAINMENT_SCREEN_NO_MONEY_CHEATING = POSSESSION_SCREEN_NO_MONEY_CHEATING;

export const ENTERTAINMENT_SCREEN_YOU_WIN = {
    message: 'Довольны?',
    header: 'Вам подфартило!',
    iconName: 'smile', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Очень :)' } ]
}

export const ENTERTAINMENT_SCREEN_YOU_LOSE_NO_MORE_MONEY = {
    message: 'Одни расходы!',
    header: 'Не везет!',
    iconName: 'sad-cry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Ухожу' } ]
}

export const ENTERTAINMENT_SCREEN_YOU_LOSE = {
    message: 'Одни расходы!\nЕще подравлечемся?',
    header: 'Не везет!',
    iconName: 'sad-cry', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [
        { ...alertBtn1, hint: 'Да' },
        { ...alertBtn2, hint: 'Нет' }
    ]
}


export const TOTAL_SCREEN_VARGANCY = {
    message: '',
    header: 'Вы бездомный!',
    iconName: 'house-damage', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Принято' } ]
}

export const TOTAL_SCREEN_GREED = {
    message: '',
    header: 'Жадина!',
    iconName: 'search-dollar', 
    iconBackgroundColor: 'red',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Принято' } ]
}

export const BANKRUPT_SCREEN_WITHDRAW_SUCCESSFUL = WITHDRAW_SCREEN_WITHDRAW_SUCCESSFUL;
export const BANKRUPT_SCREEN_BE_ATTENTIVE = WITHDRAW_SCREEN_BE_ATTENTIVE;
export const BANKRUPT_SCREEN_INPUT_AMOUNT = WITHDRAW_SCREEN_INPUT_AMOUNT;

export const JAIL_SCREEN_GREED_GET_OUT_OF_JAIL = {
    message: '',
    header: 'Вас выпустили!',
    iconName: 'child', 
    iconBackgroundColor: 'green',
    iconColor: 'white',
    isOverlayPressable: false,
    buttons: [ { ...alertBtn1, hint: 'Наконец-то' } ]
}