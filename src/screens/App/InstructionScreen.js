import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from '@rneui/themed';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getCommonSettings } from '../../store/selectors';
import { THEME } from '../../styles/theme';
import GameWrapper from '../../components/GameWrapper';
import { playButtonClick } from '../../components/Sounds';

export const InstructionScreen = ({ navigation }) => {
    const commonSettings = useSelector( getCommonSettings );
    const wrappedComponent = <Instruction navigation={ navigation } />

    return(
        <GameWrapper wrappedComponent={ wrappedComponent } commonSettings={ commonSettings }/>
    )
};

const Instruction = ({ navigation }) => {
    return (
        <View style={ styles.wrapper }>
            <ScrollView style={ styles.container }>
                <Text style={ styles.headerText }>С чего начать</Text>
                <Text style={ styles.text }>
                    Первым делом в разделе "Личное имущество" необходимо приобрести квартиру, иначе будут постоянно в конце года штрафовать за бродяжничество.
                </Text>
                <Text style={ styles.headerText }>Трейдинг</Text>
                <Text style={ styles.text }>
                    Основным способом заработка являются спекуляции на бирже. А именно покупка акций по более низкой цене с целью продать по более высокой.
                </Text>
                <Text style={ styles.text }>
                    При посещении биржи вас будут подстерегать различные внештатные ситуации, которые будут отнимать честно заработанные спекуляциями деньги.
                    Для того, чтобы они не возникали, необходимо нанимать подчиненных. Но тут есть одно но - им нужно платить зарплату, что в начале игры может быть 
                    непосильной задачей.
                </Text>
                <Text style={ styles.text }>
                    Поэтому в начале игры рекомендуется перед посещением биржи часть денег класть на депозит. Банк конечно тоже может обанкротиться, но вероятность этого 
                    довольно низка.
                </Text>
                <Text style={ styles.text }>
                    Самим первым нанимайте маклера. Таким образом вы сможете продавать и покупать больше акций, тем самым зарабатывая больше.
                </Text>
                <Text style={ styles.text }>
                    Также ежегодно вы будете получать доход от дивидентов с акций.
                </Text>
                <Text style={ styles.headerText }>Покупка бизнеса</Text>
                <Text style={ styles.text }>
                    Приобретаемый бизнес может приносить как доход, так и убыток. В год, когда бизнес убыточный, он стоит дешево и если позволяют средства, лучше всего 
                    приобретать его в такой момент, т.к. на следующий год он уже может принести прибыль.
                </Text>
                <Text style={ styles.headerText }>Выборы</Text>
                <Text style={ styles.text }>
                    Для победы в игре необходимо участвовать в выборах. Чтобы увеличить свой шанс быть избранным на какой либо пост, надо иметь как можно больше имущества, 
                    бизнесов и подчиненных. Чем выше ваш статус, тем больше плюшек в игре. Например, вы сможете продавать и покупать больше акций.
                </Text>
                <Text style={ styles.headerText }>Расходы</Text>
                <Text style={ styles.text }>
                    Имейте в виду, что все требует денег. Посещение разделов (личное имущество, биржа и т.д.), содержание имущества, зарплаты подчиненных, внештатные 
                    ситуации и прочее записываются в годовые расходы и предъявляются к оплате в конце года. В случае дефицита средств все ваши акции и имущество
                    распродаются, а вы можете попасть в тюрьму или даже на гильотину.
                </Text>
                <Text style={ styles.headerText }>Прочее</Text>
                <Text style={ styles.text }>
                    В разделе "Банк" вы можете застраховать имущество (а оно может быть потеряно в результате различных инцидентов) и вам возместят часть стоимости. 
                    Вы можете брать кредит, давать в долг под проценты, а также ложить деньги на вклад и выводить их с вклада.
                </Text>
                <Text style={{ ...styles.text, paddingBottom: hp('4%') }}>
                    Немного денег можно заработать в разделе "Развлечения", но имейте в виду, что развлечения требуют много времени и год заказчивается очень быстро.
                </Text>

            </ScrollView>
            <View style={ styles.buttonContainer }>
                <Button
                    buttonStyle={ styles.button } 
                    titleStyle={ styles.buttonTitle }
                    type="outline" 
                    title="Уйти"
                    onPress={ () => {
                        playButtonClick();
                        navigation.navigate('GameMainScreen');
                    }}  
                />
            </View>
        </View>
    )
}
    
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        marginBottom: hp('1%'),
        marginTop: hp('1%'),
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR
    },
    container: {
        flex: 1,
        width: '96%',
        alignSelf: 'center',
        paddingTop: hp('3%'),
        marginBottom: hp('1%')
    },
    headerText: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('3%'),
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_EXTRALIGHT,
        fontSize: THEME.FONT28,
        textAlign: 'center',
        marginBottom: hp('2%'),
        lineHeight: hp('3.5%') / THEME.FONT_SCALE,
        textAlign: 'justify',
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '100%',
        marginBottom: hp('1%'),
    },
    button: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '96%',
        alignSelf: 'center',
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: THEME.FONT_SEMIBOLD,
        fontSize: THEME.FONT28,
    }
});