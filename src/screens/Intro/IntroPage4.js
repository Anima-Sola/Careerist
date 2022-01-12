import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { THEME } from '../../styles/theme';
import Carousel from 'react-native-snap-carousel';

import BarImage from "../../assets/images/EstateList/bar.png";
import RestrauntImage from "../../assets/images/EstateList/restraunt.png";
import ShopImage from "../../assets/images/EstateList/shop.png";
import HotelImage from "../../assets/images/EstateList/hotel.png";
import PlantImage from "../../assets/images/EstateList/plant.png";

class MyCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
        activeIndex:0,
        carouselItems: [
        {
            image: BarImage,
            text: "Бар",
        },
        {
            image: RestrauntImage,
            text: "Ресторан",
        },
        {
            image: ShopImage,
            text: "Магазин",
        },
        {
            image: HotelImage,
            text: "Отель",
        },
        {
            image: PlantImage,
            text: "Завод",
        },
        ]
    }
    }

    _renderItem({item,index}){
        return (            
            <View style={ styles.carouselItem }>
                <View style={ styles.carouselItemImageContainer }>
                    <Image style={ styles.itemImage } resizeMode='contain' source={ item.image } />
                </View>
                <View style={ styles.carouselItemTextContainer }>
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
                //loop={true}
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

export const IntroPage4 = () => {
    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Text style={ styles.headerText }>В вашем владении:</Text>
            </View>
            <View style={ styles.carousel }>
                <MyCarousel />
            </View>
            <View style={ styles.swipeContainer }>
                <Image style={ styles.image } resizeMode='center' source={ require('../../assets/images/swipe.gif') } />
            </View>
            <View style={ styles.dotsContainer }>
                <Image style={ styles.image } resizeMode='center' source={ require('../../assets/images/dotspage2.png') } />
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
        flex: 1,
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
    },
    carouselItemImageContainer: {
        flex: 0.80,
        alignItems:'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#5794C2'
    },
    itemImage: {
        width: 0.65 * THEME.SCREEN_WIDTH,
        height: 0.55 * THEME.SCREEN_WIDTH * THEME.SCREEN_ASPECT_RATIO,
    },
    carouselItemTextContainer: {
        flex: 0.20,
        backgroundColor: '#004B85',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    itemText: {
        color: '#fff',
        fontFamily: 'nunito-semibold',
        fontSize: THEME.FONT20,
        textAlign: 'center'
    },
    image: {
        width: 0.40 * THEME.SCREEN_WIDTH,
        height: 0.40 * THEME.SCREEN_WIDTH * THEME.SCREEN_ASPECT_RATIO,
    },
    swipeContainer: {
        flex: 0.12,
        justifyContent: "center",
    },
    dotsContainer: {
        flex: 0.06,
        justifyContent: "center",
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
        borderWidth: 1,
        paddingTop: THEME.V_MARGIN10,
        paddingBottom: THEME.V_MARGIN10,
        width: '100%'
    },
    missButtonTitle: {
        fontFamily: 'nunito-extralight',
        color: "#fff",
    }
});