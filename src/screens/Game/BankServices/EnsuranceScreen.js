import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME } from '../../../styles/theme';
import GameWrapper from '../../../components/GameWrapper';
import { getPossessionList, getPossessionCostList } from '../../../store/selectors';
import { POSSESSION_LIST } from '../../../store/constants';
import { setPossessionList, setPossessionCostList } from '../../../store/actions/actions';

import Flat from "../../../assets/images/possession/flat.png";
import Car from "../../../assets/images/possession/car.png";
import Villa from "../../../assets/images/possession/villa.png";
import Yacht from "../../../assets/images/possession/yacht.png";
import Plane from "../../../assets/images/possession/plane.png";

export const EnsuranceScreen = ({ navigation }) => {
    const wrappedComponent = <Ensurance navigation={ navigation } />

    return (
        <GameWrapper wrappedComponent={ wrappedComponent } />
    )
};

const Ensurance = ({ navigation }) => {
    const dispatch = useDispatch();
    const possessionList = useSelector( getPossessionList );
    const possessionCostList = useSelector( getPossessionCostList );
    const [ activeItem, setActiveItem ] = useState( 0 );

    const getListForEnsurance = () => {
        let i = -1;
        const possessionImageFiles = [ Flat, Car, Villa, Yacht, Plane ];

        const items = possessionList.map( element => {
            if( element === true ) {
                i++;
                const activeItemBackgroudColor = ( i === activeItem ) ? THEME.THIRD_BACKGROUND_COLOR : 'rgba(0, 0, 0, .2)';
                return (
                    <Pressable style={ styles.itemContainer } key={ i } onPress={eval( '() => setActiveItem(' + i + ')' )}>
                        <View style={{ ...styles.itemImage, backgroundColor: activeItemBackgroudColor }}>
                            <Image style={ styles.image } resizeMode='center' source={ possessionImageFiles[ i ] } />
                        </View>
                        <View style={{ ...styles.itemName, backgroundColor: activeItemBackgroudColor }}>
                            <Text style={ styles.itemText }>{ POSSESSION_LIST[ i ] }</Text>
                            <View style={{ height: hp('1%') }}></View>
                            <Text style={{ ...styles.itemText, fontSize: THEME.FONT22 }}>Цена { possessionCostList[ i ] }$</Text>
                        </View>
                    </Pressable>
                )
            }
        });

        return (
            <>
                <Text style={ styles.text }>Вы можете застраховать:</Text>
                { items }
                <Text style={ styles.expensesText }>При годовых взносах 5%</Text>
            </>
        )
    }

    const somethingToEnsure = () => {
        return (
                <ScrollView style={ styles.container }>
                    { listForEnsurance() }
                    <View style={ styles.buttonsContainer }>
                        <Button
                            buttonStyle={ styles.ensureButton } 
                            titleStyle={ styles.buttonTitle }
                            type="outline" 
                            title="Страховать"
                            onPress={ () => { 
                                /*dispatch( setPossessionList([true, true, false, true, false]) );
                                dispatch( setPossessionCostList([ 0, 2000, 10000, 100000, 0 ]) );*/
                                navigation.navigate('BankScreen');
                            }}    
                        />
                        <Button
                            buttonStyle={ styles.exitButton } 
                            titleStyle={ styles.buttonTitle }
                            type="outline" 
                            title="Уйти"
                            onPress={ () => { 
                                navigation.navigate('BankScreen');
                            }}   
                        />
                    </View>
                </ScrollView>
            )
    }

    const nothingToEnsure = () => {
        return (
            <View style={ styles.container }>
                <View style={ styles.dataContainer }>
                    <Text style={{ ...styles.text, fontFamily: 'nunito-semibold' }}>Вам нечего страховать!</Text>
                    <View style={{ height: hp('1%') }}></View>
                    <Text style={ styles.text }>Просим вас немедленно покинуть банк!</Text>
                    <View style={{ height: hp('1%') }}></View>
                    <Text style={ styles.text }>Усвоили?</Text>
                </View>
                <View style={ styles.nothingEnsureContainer }>
                    <Button
                        buttonStyle={ styles.nothingEnsureButton } 
                        titleStyle={ styles.buttonTitle }
                        type="outline" 
                        title="Ой, уже ухожу"
                        onPress={ () => navigation.navigate('GameMainScreen') }  
                    />
                </View>
            </View>
        )
    }

    if( possessionList.indexOf(true) !== -1 ) return getListForEnsurance();
    else return nothingToEnsure();

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: hp('1%'),
        marginBottom: hp('1%')
    },
    dataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('2%'),
    },
    itemContainer: {
        flexDirection: 'row',
        height: hp('15%'),
        marginBottom: hp('1%')
    },
    itemImage: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        width: '36%',
    },  
    itemName: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        width: '64%',
    },  
    itemText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT30,
    },
    image: {
        height: hp('14%'),
        width: hp('14%')
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1.5%')
    },
    expensesText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT35,
        textAlign: 'center',
        marginBottom: hp('1.7%')
    },
    buttonsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ensureButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        height: hp('7%'),
        borderRadius: wp('10%'),
        width: wp('46%'),
        marginRight: 5
    },  
    exitButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: wp('46%'),
        height: hp('7%'),
        borderRadius: wp('10%'),
        marginLeft: 5,
    },
    nothingEnsureButtonContainer: {
        justifyContent: 'center',
        width: '100%',
        marginBottom: hp('1%'),
    },
    nothingEnsureButton: {
        backgroundColor: THEME.SECOND_BACKGROUND_COLOR,
        width: '100%',
        height: hp('7%'),
        borderRadius: wp('10%'),
    },
    buttonTitle: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT28
    }
})