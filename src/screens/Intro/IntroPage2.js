import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';
import Carousel from 'react-native-snap-carousel';

import FlatImage from "../../assets/images/PosessionList/flat.png";
import CarImage from "../../assets/images/PosessionList/car.png";
import VillaImage from "../../assets/images/PosessionList/villa.png";
import YachtImage from "../../assets/images/PosessionList/yacht.png";
import PlaneImage from "../../assets/images/PosessionList/plane.png";

class MyCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
        activeIndex:0,
        carouselItems: [
        {
            image: FlatImage,
            text: "КВАРТИРУ",
        },
        {
            image: CarImage,
            text: "МАШИНУ",
        },
        {
            image: VillaImage,
            text: "ВИЛЛУ",
        },
        {
            image: YachtImage,
            text: "ЯХТУ",
        },
        {
            image: PlaneImage,
            text: "САМОЛЕТ",
        },
        ]
    }
    }

    _renderItem({item,index}){
        return (
            <View style={ styles.carouselItem }>
                <View style={ styles.carouselItemImage }>
                    <Image style={ styles.itemImage } resizeMode='center' source={ item.image } />
                </View>
                <View style={ styles.carouselItemText }>
                    <Text style={ styles.itemText }>{item.text}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <Carousel
                autoplay={true}
                autoplayInterval={3000}
                autoplayDelay={100}
                scrollEnabled={false}
                loop={true}
                layout={"default"}
                ref={ref => this.carousel = ref}
                data={this.state.carouselItems}
                sliderWidth={350}
                itemWidth={350}
                renderItem={this._renderItem}
                onSnapToItem = { index => this.setState({activeIndex:index}) } 
            />
        );
    }
}

export const IntroPage2 = () => {
    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Text style={ styles.headerText }>Представьте, что вы имеете:</Text>
            </View>
            <View style={ styles.carousel }>
                <MyCarousel />
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
    header: {
        flex: 0.10,
        /*borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 1,*/
        justifyContent: "center"
    },
    headerText: {
        color: THEME.TEXT_COLOR,
        fontFamily: 'nunito-light',
        fontSize: THEME.FONT20,
        textAlign: 'center'
    },
    carousel: {
        flex: 0.62,
    },
    carouselItem: {
        borderRadius: 5,
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
        borderColor: "#000",
        borderStyle: "solid",
        borderWidth: 1,
    },
    carouselItemImage: {
        alignItems:'center',
        /*borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 1*/
    },
    itemImage: {
        width: 0.8 * THEME.SCREEN_WIDTH,
        height: 0.55 * THEME.SCREEN_WIDTH * THEME.SCREEN_ASPECT_RATIO,
        justifyContent: 'center',
    },
    carouselItemText: {
        backgroundColor: '#000',
        padding: 10
    },
    itemText: {
        color: '#fff',
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT20,
        textAlign: 'center'
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