import React, { useRef, useEffect, useState, } from 'react';
import { Image, Platform, StyleSheet, View, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';
import { FontSize, FontWeight } from '../../styleApp/font';
import stylesApp from '../../styleApp/stylesApp';
import { TextBox } from '../TextBox';

let { width, height } = Dimensions.get('screen')


const checkDevicesType = () => {
    return height * 9 / width === 19.5 && Platform.OS === 'android'
}

/**
 * @summary The Dropdown component 
 * 
 * @param {object} props 
 * @property {Array} props.item: list of value
 * @property {function} props.onChange: Action when onchange value
 * @property {boolean} selected: selected value
 * 
 * @returns {Component}
 */
export const CommonDropdown = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language);
    const { item, onChange, selected, dropStyle } = props
    const selectRef = useRef();
    const [value, setValue] = useState(null)
    const [isShow, setShow] = useState(false)

    useEffect(() => {
        if (!!item && !value) {
            setValue(item[0])
        }
    }, [item])

    useEffect(() => {
        console.log('selected', selected)
        if (!!item) {
            setValue(item.find(a => a.value === selected))
        }
    }, [selected])

    const onSelect = (index, item) => {
        setValue(item)
        onChange(item.value)
    }

    const displayDataList = [''].concat(item || [])

    const dropdownHeight = SmartScreenBase.smPercenHeight * 7 + SmartScreenBase.smBaseHeight * 70 * (item.length)

    return (
        <View style={styles.container}>
            <ModalDropdown
                ref={selectRef}
                // defaultIndex={value.label}
                renderSeparator={() => (<View />)}
                options={displayDataList}
                showsVerticalScrollIndicator={false}
                onDropdownWillShow={() => setShow(true)}
                onDropdownWillHide={() => setShow(false)}
                onSelect={(index, item) => {
                    console.log("-----item", item);
                    !!item && onSelect(index, item)
                }}
                dropdownTextStyle={{ backgroundColor: 'transparent' }}
                dropdownTextHighlightStyle={{ backgroundColor: 'transparent' }}
                scrollEnabled={false}
                textStyle={styles.textStyle}
                dropdownStyle={[styles.dropdown, dropStyle, { height: dropdownHeight }]}
                renderRow={(option, index, isSelected) => {
                    if (index === 0) {
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
                                    {!!value && <TextBox style={styles.valueText}>
                                        {value.label}
                                    </TextBox>}
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
                            onSelect(index, option)
                            selectRef.current.hide()
                            setShow(false)
                        }}>
                            <View style={styles.dropdownItemContainer}>
                                {/* <View style={[styles.status, {
                                backgroundColor: option.color
                            }]} /> */}
                                <TextBox style={styles.itemText}>
                                    {option.label}
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
                        {!!value && <TextBox style={styles.valueText}>
                            {value.label}
                        </TextBox>}
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
}


const styles = StyleSheet.create({
    outerBtn: {
        backgroundColor: Colors.TransparentWhite,
        width: SmartScreenBase.smPercenWidth * 70 + (Platform.OS === 'android' ? 2 : 2),
    },
    arrowImg: {
        position: 'absolute',
        right: SmartScreenBase.smBaseWidth * 15,
        width: SmartScreenBase.smBaseWidth * 80,
        height: SmartScreenBase.smBaseWidth * 80,
        borderRadius: SmartScreenBase.smBaseWidth * 70,
        borderWidth: SmartScreenBase.smBaseWidth * 6,
        borderColor: Colors.White,
        alignItems: "center",
        justifyContent: 'center'
    },
    container: {
        marginVertical: SmartScreenBase.smBaseWidth * 30,
        alignSelf: 'center',
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenHeight * 5,
        // borderWidth: 1,
        borderTopWidth: 0,
        borderColor: Colors._DEDEDE,
    },
    linearContainer: {
        width: SmartScreenBase.smPercenWidth * 70,
        height: SmartScreenBase.smBaseHeight * 72,
        borderRadius: SmartScreenBase.smPercenHeight * 5,
        // alignItems: 'center',
        // paddingLeft: SmartScreenBase.smBaseWidth * 40,
        justifyContent: 'center',
        paddingHorizontal: SmartScreenBase.smBaseWidth * 80,
    },
    valueText: {
        ...FontWeight.Bold,
        fontSize: FontSize.size50Font,
        color: Colors.White,
        width: '100%',
        textAlign: 'center',
    },
    dropdown: {
        ...stylesApp.shadow,
        borderTopRightRadius: SmartScreenBase.smPercenHeight * 4,
        borderTopLeftRadius: SmartScreenBase.smPercenHeight * 4,
        borderBottomRightRadius: SmartScreenBase.smBaseWidth * 30,
        borderBottomLeftRadius: SmartScreenBase.smBaseWidth * 30,
        borderTopWidth: 0,
        borderColor: Colors._DEDEDE,
        width: SmartScreenBase.smPercenWidth * 70 + (Platform.OS === 'android' ? 2 : 2),
        // paddingTop: SmartScreenBase.smPercenHeight * 3.5,
        // marginTop: Platform.OS === 'android' ? -28 : -1,
        // height: SmartScreenBase.smBaseHeight * 500,
        marginTop: -SmartScreenBase.smBaseHeight * 72
    },
    dropdownItemContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        // marginRight: SmartScreenBase.smBaseWidth * 100,
        height: SmartScreenBase.smBaseHeight * 70
    },
    itemText: {
        ...FontWeight.Bold,
        fontSize: FontSize.size50Font,
        textAlign: 'center',
    },
    arrowImage: {
        width: SmartScreenBase.smBaseWidth * 40, height: SmartScreenBase.smBaseWidth * 40,
    },
    textStyle: {
        borderWidth: 0,
        borderColor: 'transparent'
    },
    status: {
        width: SmartScreenBase.smBaseWidth * 40,
        height: SmartScreenBase.smBaseWidth * 40,
        marginRight: SmartScreenBase.smBaseWidth * 30,
        borderRadius: SmartScreenBase.smBaseWidth * 60,
        overflow: 'hidden'
    },
})