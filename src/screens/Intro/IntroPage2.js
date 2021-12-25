import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';

export const IntroPage2 = () => {
    return (
        <View style={ styles.container }>
            <View style={ styles.listContainer }>
                <View style={ styles.items }>
                    <View style={ styles.header }>
                        <Text style={ styles.headerText }>Можете даже представить, что вы имеете:</Text>
                    </View>
                    <View style={ styles.item }>
                        <View>
                            <Text style={ styles.text }>Квартиру -</Text>
                        </View>
                        <View>
                            <Image style={ styles.image } resizeMode='center' source={ require('../../assets/images/PosessionList/flat.png') } />
                        </View>
                    </View>
                    <View style={ styles.item }>
                        <View>
                            <Image style={ styles.image } resizeMode='center' source={ require('../../assets/images/PosessionList/car.png') } />
                        </View>
                        <View>
                            <Text style={ styles.text }>- Машину</Text>
                        </View>
                    </View>
                    <View style={ styles.item }>
                        <View>
                            <Text style={ styles.text }>Виллу -</Text>
                        </View>
                        <View>
                            <Image style={ styles.image } resizeMode='center' source={ require('../../assets/images/PosessionList/villa.png') } />
                        </View>
                    </View>
                    <View style={ styles.item }>
                        <View>
                            <Image style={ styles.image } resizeMode='center' source={ require('../../assets/images/PosessionList/yacht.png') } />
                        </View>
                        <View>
                            <Text style={ styles.text }>- Яхту</Text>
                        </View>
                    </View>
                    <View style={ styles.item }>
                        <View>
                            <Text style={ styles.text }>Самолет -</Text>
                        </View>
                        <View>
                            <Image style={ styles.image } resizeMode='center' source={ require('../../assets/images/PosessionList/plane.png') } />
                        </View>
                    </View>
                </View>
            </View>
            <View style={ styles.swipeContainer }>
                <Image resizeMode='center' source={ require('../../assets/images/swipe.gif') } />
            </View>
            <View style={ styles.dotsContainer }>
                <Image resizeMode='center' source={ require('../../assets/images/dotspage2.png') } />
            </View>
            <View style={ styles.missButtonContainer }>
                <Button buttonStyle={ styles.missButton } titleStyle={ styles.missButtonTitle } type="outline" title="К игре" />
            </View>
        </View>
    )
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: THEME.STATUSBAR_HEIGHT,
    },
    listContainer: {
        flex: 0.72,
        /*borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 1*/
    },
    items: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    header: {
        flex: 0.16
    },
    item: {
        flexDirection: 'row',
        flex: 0.16,
        alignItems: 'center',
        justifyContent:'space-around'
    },
    headerText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT25,
        textAlign: 'center',
        justifyContent: "center",
    },
    text: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-extralight',
        fontSize: THEME.FONT25,
        textAlign: 'center',
        justifyContent: "center",
    },
    image: {
        flex: 1,
        width: 0.35 * THEME.SCREEN_WIDTH,
        height: 0.35 * THEME.SCREEN_WIDTH * THEME.SCREEN_ASPECT_RATIO,
        justifyContent: 'center',
        //borderColor: "#fff",
        //borderStyle: "solid",
        //borderWidth: 1
    },
    swipeContainer: {
        flex: 0.10,
        justifyContent: "center",
    },
    dotsContainer: {
        flex: 0.08,
        justifyContent: "flex-end",
    },
    missButtonContainer: {
        flex: 0.10,
        justifyContent: "center",
        width: '70%',
        margin: 1
    },
    missButton: {
        borderRadius: 40,
        backgroundColor: "#940068",
        borderColor: "#fff",
        paddingTop: THEME.V_MARGIN10,
        paddingBottom: THEME.V_MARGIN10,
        width: '100%'
    },
    missButtonTitle: {
        fontFamily: 'nunito-extralight',
        color: "#fff",
    }
});