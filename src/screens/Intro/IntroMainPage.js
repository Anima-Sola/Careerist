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
        <PagerView style={styles.container} initialPage={0}>
            <IntroPage1 />
            <IntroPage2 />
            <IntroPage3 />
            <IntroPage4 />
        </PagerView>
      );
    };

const styles = StyleSheet.create({
    container: {
       
    },
});