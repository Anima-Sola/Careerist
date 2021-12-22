import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import { IntroPage1 } from './IntroPage1';
import { IntroPage2 } from './IntroPage2';
import { IntroPage3 } from './IntroPage3';
import { IntroPage4 } from './IntroPage4';
import { THEME } from '../../styles/theme';

export const IntroMainPage = () => {
    return (
        <PagerView style={styles.wrapper} initialPage={0}>
            <View key="1">
                <IntroPage1 />
            </View>
            <View key="2">
                <IntroPage2 />
            </View>
            <View key="3">
                <IntroPage3 />
            </View>
            <View key="4">
                <IntroPage4 />
            </View>
        </PagerView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: THEME.MAIN_BACKGROUND_COLOR,
    }
});