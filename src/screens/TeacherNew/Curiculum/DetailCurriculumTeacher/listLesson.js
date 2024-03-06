import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ImageBackground, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { TextBox } from '../../../../componentBase/TextBox';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';

const { width, height } = Dimensions.get('window');

/**
 * 
 * @param {object} props 
 * @property {object} data Data of Map List
 * @property {object} navigation navigation props
 * @returns {Component}
 */
const ListLesson = (props) => {

    /**
     * Function return distance depends on index
    */
    const _checkTop = (index) => {
        switch (index) {
            case 0:
                return SmartScreenBase.smPercenHeight * 30;
            case 1:
                return SmartScreenBase.smPercenHeight * 2;
            case 2:
                return SmartScreenBase.smPercenHeight * 44;
        }
    };

    /**
     * Function return distance depends on index
    */
    const _checkRigth = (index) => {
        switch (index) {
            case 0:
                return SmartScreenBase.smPercenWidth * 100 / 2;
            default:
                return 0;
        }
    };

    /**
     * Function return image depends on index
    */
    const _checkImage = (data) => {
        switch (data) {
            case 1:
                return 'map1';
            case 2:
                return 'map2';
            default:
                return 'khongco';
        }
    };

    /**
     * Function return distance depends on index
    */
    const _checkLeft = (index) => {
        switch (index) {
            case 1:
                return -SmartScreenBase.smPercenWidth * 100 / 9;
            case 2:
                return '85%';
            default:
                return 0;
        }
    };

    /**
     * Function return number of unit
    */
    const numberUnit = (index) => {
        if (props.index === 0) {
            return index + 1
        } else {
            return props.index * 3 + 1 + index
        }
    }
    return (
        <View style={styles.container}>
            {
                props.dataLesson[props.index].map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[{
                                top: _checkTop(index),
                                right: _checkRigth(index),
                            }, styles.btn]} onPress={() => {
                                props.navigation(item);
                            }}>
                            <TextBox style={styles.txtUnit} numberOfLines={2}>{item.stt || ""}</TextBox>
                            <TextBox numberOfLines={null} style={styles.txtName}>{item.unit_name}</TextBox>
                            <ImageBackground source={{ uri: 'anhunit' }} style={styles.imgUnit}>
                                {
                                    index == 1 ?
                                        <Image source={{ uri: _checkImage(index) }} style={[styles.imgIndex1, { left: _checkLeft(index), top: index == 1 ? '60%' : '30%', }]} />
                                        :
                                        <View style={styles.viewOther}>
                                            {
                                                props.index != props.dataLesson.length - 1 &&
                                                <Image source={{ uri: _checkImage(index) }} style={[styles.otherIndex, { left: _checkLeft(index), top: index == 1 ? '60%' : '14%', }]} />
                                            }
                                        </View>
                                }
                                {
                                    index == 1 && index != props.dataLesson[props.index].length - 1 &&
                                    <Image source={{ uri: 'map3' }}
                                        style={styles.imgIndex3} />
                                }
                            </ImageBackground>
                        </TouchableOpacity>
                    );
                })
            }
        </View>
    );
};
const styles = StyleSheet.create({
    txtName: { flex: 1, width: SmartScreenBase.smPercenWidth * 50, textAlign: 'center', marginTop: SmartScreenBase.smBaseHeight * 10 },
    container: { flexDirection: 'row', width, height: SmartScreenBase.smPercenHeight * 100 },
    btn: {
        position: 'absolute',
        alignItems: 'center',
    },
    txtUnit: {
        fontSize: FontSize.size65Font,
        ...FontWeight.Regular,
        width: SmartScreenBase.smPercenWidth * 100 / 3.2,
        textAlign: 'center',
        fontFamily: FontBase.UTM_AVO,
    },
    imgUnit: {
        width: SmartScreenBase.smPercenHeight * 25,
        height: SmartScreenBase.smPercenHeight * 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgIndex1: {
        position: 'absolute',
        width: '54%',
        height: '50%',
        resizeMode: 'contain',

    },
    otherIndex: {
        zIndex: 30,
        elevation: 1,
        position: 'absolute',
        width: '55%',
        height: '50%',
    },
    imgIndex3: { position: 'absolute', width: '5%', height: '32%', top: '100%' },
    imaDone: {
        width: SmartScreenBase.smBaseWidth * 100,
        height: SmartScreenBase.smBaseWidth * 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '10%',
        right: '13%',
    },
    viewOther: { width: '100%', height: '100%' }
})
export default ListLesson;
