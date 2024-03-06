import React, { Component } from 'react';
import { Image, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';
import { FontSize } from '../../styleApp/font';
import { TextBox } from '../TextBox';

/**
 * @summary The header component of the app
 *
 * @param {object} props
 * @property {boolean} props.showLeftIcon: Check if you want to show the left button
 * @property {ImageProps} props.rightIcon: Right icon of the header
 * @property {string} props.title: Title of the header
 * @property {function} props.rightIconOnPress: Action when click on right icon
 * @property {function} props.leftIconOnPress: Action when click on left icon
 * @property {function} props.rightComponent: Custom right component
 * @property {ViewStyle} props.containerStyle: Container style of the header
 *
 * @returns {Component}
 */
export const AppHeader = React.memo((props) => {
    let {
        showLeftIcon = true,
        leftIconOnPress = () => { },
        rightIcon,
        title = "",
        rightIconOnPress = () => { },
        rightComponent,
        containerStyle,
        rightImage,
        colorLeft = Colors.BaseGreen,
        colorRight = Colors.LightGreen,
        styleTitle,
        styleHeaderRight
    } = props
    return (
        <>
            <StatusBar barStyle='light-content' translucent={Platform.OS === 'android'} backgroundColor='transparent' />
            <LinearGradient
                colors={[colorLeft, colorRight]}
                start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                style={[styles.container, containerStyle]}>
                {showLeftIcon && <TouchableOpacity
                    style={styles.leftButton}
                    onPress={leftIconOnPress}>
                    <Image source={{ uri: 'iconleft' }} style={styles.leftIcon} />
                </TouchableOpacity>}
                <View
                    style={styles.centerBox}>
                    <TextBox style={[styles.titleText, styleTitle]}>
                        {title}
                    </TextBox>
                </View>
                {rightIcon && <TouchableOpacity
                    style={styles.rightButton}
                    onPress={rightIconOnPress}>
                    <Image source={{ uri: rightIcon }} style={[styles.rightIcon, styleHeaderRight]} />
                </TouchableOpacity>}
                {rightImage && <TouchableOpacity
                    style={styles.rightButton}
                    onPress={rightIconOnPress}>
                    {/* <IconBack name={rightIcon} size={SmartScreenBase.smPercenHeight * 3} color="#a5a5a5ff" /> */}
                    <Image source={rightImage} resizeMode="contain" style={styles.rightImage} />
                </TouchableOpacity>}
                {!!rightComponent && rightComponent()}
            </LinearGradient>
        </>
    )
})

const styles = StyleSheet.create({
    container: {
        paddingTop: SmartScreenBase.smPercenHeight * 5,
        paddingBottom: SmartScreenBase.smPercenWidth * 1,
        width: '100%',
        backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: "center",
        paddingRight: SmartScreenBase.smBaseWidth * 20,
    },
    leftButton: {
        width: SmartScreenBase.smPercenWidth * 11,
        height: SmartScreenBase.smPercenHeight * 5.5,
        paddingLeft: SmartScreenBase.smPercenWidth * 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftIcon: { width: SmartScreenBase.smBaseWidth * 30, height: SmartScreenBase.smBaseWidth * 53 },
    centerBox: {
        flex: 1,
        justifyContent: 'center',
    },
    titleText: {
        color: Colors.White,
        fontSize: FontSize.size60Font,
        lineHeight: FontSize.size60Font + 4,
        fontFamily: FontBase.MyriadPro_Regular,
    },
    rightButton: {
        marginLeft: SmartScreenBase.smPercenHeight,
        width: SmartScreenBase.smPercenHeight * 3,
        height: SmartScreenBase.smPercenHeight * 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightIcon: {
        width: SmartScreenBase.smPercenHeight * 3,
        height: SmartScreenBase.smPercenHeight * 3,
        tintColor: Colors._A5A5A5
    },
    rightImage: { width: SmartScreenBase.smPercenHeight * 3, height: SmartScreenBase.smPercenHeight * 3 }
})
