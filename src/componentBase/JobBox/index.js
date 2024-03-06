import React, { Component, useRef, forwardRef, useImperativeHandle, Children } from 'react';
import { Dimensions, Image, Platform, StatusBar, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';
import { FontSize, FontWeight } from '../../styleApp/font';
import { TextBox } from '../TextBox';
import DeviceInfo from 'react-native-device-info'
let { width, height } = Dimensions.get('screen')


const checkDevicesType = () => {
    return height * 9 / width === 19.5 && Platform.OS === 'android'
}

/**
 * @summary The JobBox component 
 * 
 * @param {object} props
 * @property {boolean} disableColor: disable the color of value
 * @property {array} listData: list of item
 * @property {style} dropdownStyles: style of dropdown
 * 
 * @returns {Component}
 */
export const JobBox = forwardRef((props, ref) => {
    let { listData, disableColor, dropdownStyles } = props
    let selectRef = useRef();
    let [value, setValue] = useState(listData[0])
    let [defIndex, setDefIndex] = useState(0)
    let [isShow, setShow] = useState(false)

    React.useImperativeHandle(ref, () => ({
        getValue: () => value,
        setValue: (type) => {
            let index = listData.findIndex((item) => item.type === type)
            if (index !== -1) {
                setValue(listData[index])
                setDefIndex(index)
            }
        }
    }));

    const displayDataList = [""].concat(listData)

    const dropdownHeight = SmartScreenBase.smPercenHeight * 7 + SmartScreenBase.smBaseHeight * 70 * (displayDataList.length - 1)
    return (
        <View style={styles.container}>
            <ModalDropdown
                adjustFrame={style => {
                    style.top = (Platform.OS === 'ios' ? style.top : style.top - StatusBar.currentHeight);
                    return style;
                }}
                ref={selectRef}
                defaultIndex={defIndex}
                renderSeparator={() => (<View />)}
                options={displayDataList}
                showsVerticalScrollIndicator={false}
                onDropdownWillShow={() => setShow(true)}
                onDropdownWillHide={() => setShow(false)}
                onSelect={(index, item) => {
                    !!item && setValue(item)
                }}
                scrollEnabled={false}
                textStyle={styles.textStyle}
                dropdownStyle={{ ...styles.dropdown, ...dropdownStyles, height: dropdownHeight }}
                renderRow={(option, index, isSelected) => {
                    if (index == 0) {
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                selectRef.current.hide()
                                setShow(false)
                            }}>
                                <LinearGradient
                                    colors={[Colors.LightGreen, Colors.BaseGreen]}
                                    start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                                    style={styles.linearContainer}
                                >
                                    <TextBox style={styles.valueText}>
                                        {value.name}
                                    </TextBox>
                                    <View style={styles.arrowImg}>
                                        <Image
                                            source={{ uri: 'arrow_up' }}
                                            style={[styles.arrowImage, {
                                                transform: [{
                                                    rotate: isShow ? '0deg' : '180deg'
                                                }]
                                            }]}
                                            resizeMode='contain'
                                        />
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    }
                    
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            props.onChange && props.onChange(option)
                            setValue(option)
                            selectRef.current.hide()
                            setShow(false)
                        }}>
                            <View style={styles.dropdownItemContainer}>
                                {disableColor || <View style={[styles.status, {
                                    backgroundColor: option.color
                                }]} />}
                                <TextBox style={styles.itemText}>
                                    {option.name}
                                </TextBox>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            >
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    selectRef.current.show()
                    setShow(true)
                }} style={{
                    ...styles.outerBtn,
                }}>
                    <LinearGradient
                        colors={[Colors.LightGreen, Colors.BaseGreen]}
                        start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                        style={styles.linearContainer}
                    >
                        <TextBox style={styles.valueText}>
                            {value.name}
                        </TextBox>
                        <View style={styles.arrowImg}>
                            <Image
                                source={{ uri: 'arrow_up' }}
                                style={[styles.arrowImage, {
                                    transform: [{
                                        rotate: isShow ? '0deg' : '180deg'
                                    }]
                                }]}
                                resizeMode='contain'
                            />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </ModalDropdown>

        </View >
    )
})


const styles = StyleSheet.create({
    outerBtn: {
        backgroundColor: Colors.TransparentWhite,
    },
    arrowImg: {
        position: 'absolute',
        right: SmartScreenBase.smBaseWidth * 15,
        width: SmartScreenBase.smBaseWidth * 80,
        height: SmartScreenBase.smBaseWidth * 80,
        borderRadius: SmartScreenBase.smBaseWidth * 80,
        borderWidth: SmartScreenBase.smBaseWidth * 6,
        borderColor: Colors.White,
        alignItems: "center",
        justifyContent: 'center'
    },
    container: {
        marginTop: SmartScreenBase.smPercenHeight * 2,
        alignSelf: 'center',
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenHeight * 5,
        borderWidth: 0,
        borderTopWidth: 0,
        borderColor: Colors._DEDEDE,
    },
    linearContainer: {
        width: SmartScreenBase.smPercenWidth * 70,
        height: SmartScreenBase.smPercenHeight * 7,
        borderRadius: SmartScreenBase.smPercenHeight * 5,
        // alignItems: 'center',
        // paddingLeft: 15,
        justifyContent: 'center',
    },
    valueText: {
        ...FontWeight.SemiBold,
        fontSize: FontSize.size50Font,
        color: 'white',
        textAlign: 'center',
    },
    dropdown: {
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        borderTopRightRadius: SmartScreenBase.smPercenHeight * 4,
        borderTopLeftRadius: SmartScreenBase.smPercenHeight * 4,
        borderBottomRightRadius: SmartScreenBase.smBaseWidth * 30,
        borderBottomLeftRadius: SmartScreenBase.smBaseWidth * 30,
        borderTopWidth: 0,
        borderColor: Colors._DEDEDE,
        margin: 0,
        width: SmartScreenBase.smPercenWidth * 70 + (Platform.OS === 'android' ? 2 : 2),
        marginTop: -SmartScreenBase.smPercenHeight * 7
        // - (Platform.OS === 'android' ? 25 : 0)
    },
    dropdownItemContainer: {
        flexDirection: 'row',
        padding: SmartScreenBase.smBaseHeight * 14,
        alignItems: "center",
        height: SmartScreenBase.smBaseHeight * 70,
    },
    status: {
        width: SmartScreenBase.smBaseWidth * 40,
        height: SmartScreenBase.smBaseWidth * 40,
        marginRight: SmartScreenBase.smBaseWidth * 30,
        borderRadius: SmartScreenBase.smBaseWidth * 60,
        overflow: 'hidden'
    },
    itemText: {
        ...FontWeight.Regular,
        fontSize: FontSize.size50Font,
    },
    arrowImage: {
        width: SmartScreenBase.smBaseWidth * 40, height: SmartScreenBase.smBaseWidth * 40,
    },
    textStyle: {
        borderWidth: 0,
        borderColor: 'transparent'
    }
})