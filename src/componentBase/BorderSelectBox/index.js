import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, TouchableOpacity, Platform, StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../base/SmartScreenBase';
import { FontSize, FontWeight } from '../../styleApp/font';
import { TextBox } from '../TextBox';
import Icon from 'react-native-vector-icons/Feather'
import { Colors } from '../../styleApp/color';


/**
 * @summary The BorderSelectBox component
 * 
 * @param {object} props 
 * @property {Array} item: item of the box
 * @property {function} onChange: function on change
 * @property {any} selected: selected item
 * @property {string} borderColor: color of border
 * @property {ViewStyle} containerStyles
 * @property {ViewStyle} dropdownStyle
 * @property {ViewStyle} dropdownItemStyles
 * @property {ViewStyle} buttonStyles
 * @property {TextStyle} valueTextStyles
 * @property {ViewStyle} dropdownItemTextStyles
 * 
 * @returns {Component}
 */

export const BorderSelectBox = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language);
    const { item, onChange, selected, borderColor, containerStyles, dropdownStyle, dropdownItemStyles, buttonStyles, valueTextStyles, dropdownItemTextStyles } = props
    const selectRef = useRef();
    const [value, setValue] = useState(null)
    const [isShow, setShow] = useState(false)

    const [dropdownWidth, setDropdownWidth] = useState(SmartScreenBase.smPercenWidth * 60 + (Platform.OS === 'android' ? 2 : 1))

    useEffect(() => {
        if (!!item && !value) {
            setValue(item[0])
        }
    }, [item])

    useEffect(() => {
        if (!!item) {
            setValue(item.find(a => a.value === selected))
        }
    }, [selected])

    const onSelect = (index, item) => {
        //showRefPosition()
        setValue(item)
        onChange && onChange(item.value)
    }

    const _dropdown_3_adjustFrame = (style) => {
        console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}, right:${style.right}}`);
        style.top = 200;
        style.left = 200;
        style.left = 200
        return style;
      }

      const onLayout = useCallback(event => {
        const { width, height } = event.nativeEvent.layout;
        console.log("=====,",width,height)
        // setSize({ width, height });
      }, []);

      const showRefPosition = () => {
        console.log("button clicked, set focus and log position");
        // this works and shows that i am using the ref correctly
        this.ref.measure( (fx, fy, width, height, px, py) => {
            console.log('Component width is: ' + width)
            console.log('Component height is: ' + height)
            console.log('X offset to frame: ' + fx)
            console.log('Y offset to frame: ' + fy)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)
        })
      };

    return (
        <View
            onLayout={e => setDropdownWidth(e.nativeEvent.layout.width)}
            style={[styles.container, { borderColor: borderColor }, containerStyles]}
            ref={(ref) => { this.ref = ref; }}>
            <ModalDropdown
                //onLayout={onLayout}
                //ref={selectRef}
                // style={{backgroundColor: '#ff0'}}
                //adjustFrame={style => {}}
                // defaultIndex={value.label}
                renderSeparator={() => (<View />)}
                scrollEnabled={false}
                options={item || []}
                showsVerticalScrollIndicator={false}
                onDropdownWillShow={() => {setShow(true), showRefPosition()}}
                onDropdownWillHide={() => setShow(false)}
                onSelect={onSelect}
                textStyle={{
                    borderWidth: 0,
                    borderColor: 'transparent'
                }}
                dropdownStyle={[styles.dropdown, { width: dropdownWidth }, dropdownStyle]}
                renderRow={(option, index, isSelected) => {
                    // if (index == 0) {
                    //     return (
                    //         <TouchableOpacity activeOpacity={1} onPress={() => {
                    //             selectRef.current.hide()
                    //             setShow(false)
                    //         }}
                    //             style={[styles.btnWrapper, { borderColor: color }]}
                    //         >
                    //             <View
                    //                 style={[styles.linearContainer, buttonStyles]}
                    //             >
                    //                 {!!value && <TextBox style={[styles.valueText, valueTextStyles]} color={color}>
                    //                     {value.label}
                    //                 </TextBox>}
                    //                 <View style={[styles.arrowImg, , { borderColor: color }]}>
                    //                     <Icon name={isShow ? "chevron-up" : "chevron-down"} color={color} size={20} />
                    //                 </View>
                    //             </View>
                    //         </TouchableOpacity>
                    //     )
                    // }

                    const smColor = option.hasOwnProperty('color') ? option.color : Colors.Black

                    if (index == 0) {
                        return (
                            <View>
                                <View style={[styles.linearContainer, buttonStyles, {borderColor: borderColor, borderWidth: 1}]}>
                                    {!!value && <TextBox style={[styles.valueText, valueTextStyles]} color={borderColor}>
                                        {value.label}
                                    </TextBox>}
                                    <View style={[styles.arrowImg, , { borderColor: borderColor }]}>
                                        <Icon name={isShow ? "chevron-up" : "chevron-down"} color={borderColor} size={20} />
                                    </View>
                                </View>
                                <View style={[styles.dropdownItemContainer, dropdownItemStyles]}>
                                    <TextBox color={smColor} style={[styles.itemText, dropdownItemTextStyles]}>
                                        {option.label}
                                    </TextBox>
                                </View>
                            </View>
                        )
                    }

                    return (
                        <View style={[styles.dropdownItemContainer, dropdownItemStyles]}>
                            {/* <View style={[styles.status, {
                                backgroundColor: option.color
                            }]} /> */}
                            <TextBox color={smColor} style={[styles.itemText, dropdownItemTextStyles]}>
                                {option.label}
                            </TextBox>
                        </View>
                    )
                }}
            >
                <View style={{
                    borderBottomRightRadius: isShow ? 0 : SmartScreenBase.smPercenHeight * 5,
                    borderBottomLeftRadius: isShow ? 0 : SmartScreenBase.smPercenHeight * 5,
                }}>
                    <View
                        style={[styles.linearContainer, buttonStyles]}
                    >
                        {!!value && <TextBox style={[styles.valueText, valueTextStyles]} color={borderColor}>
                            {value.label}
                        </TextBox>}
                        <View style={[styles.arrowImg, , { borderColor: borderColor }]}>
                            <Icon name={isShow ? "chevron-up" : "chevron-down"} color={borderColor} size={20} />
                        </View>
                    </View>
                </View>
            </ModalDropdown>
        </View >
    )
}


const styles = StyleSheet.create({
    arrowImg: {
        position: 'absolute',
        right: 5,
        width: SmartScreenBase.smBaseWidth * 90,
        height: SmartScreenBase.smBaseWidth * 60,
        borderLeftWidth: 1,
        borderColor: 'white',
        alignItems: "center",
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        flexGrow: 1,
        alignSelf: 'center',
        backgroundColor: "white",
        borderRadius: SmartScreenBase.smPercenHeight * 5,
        borderWidth: 1,
        borderColor: Colors._DDDDDD
    },
    linearContainer: {
        height: SmartScreenBase.smBaseHeight * 60,
        borderRadius: SmartScreenBase.smPercenHeight * 5,
        paddingLeft: 15,
        justifyContent: 'center',
    },
    valueText: {
        fontSize: FontSize.size40Font,
        // width: '100%',
        textAlign: 'center',
        marginRight: SmartScreenBase.smBaseWidth * 100
    },
    dropdown: {
        maxHeight: SmartScreenBase.smBaseHeight * 380,
        minHeight: SmartScreenBase.smBaseHeight * 330,
        borderRadius: SmartScreenBase.smBaseHeight * 30,
        marginTop: -(SmartScreenBase.smBaseHeight * 60 + 1),
        marginRight: -1
    },
    dropdownItemContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: "center",
        justifyContent: 'center',
        // marginRight: 35,
        height: SmartScreenBase.smBaseHeight * 70
    },
    status: {
        width: 15,
        height: 15,
        marginRight: 10,
        borderRadius: 50,
        overflow: 'hidden'
    },
    itemText: {
        // ...FontWeight.Bold,
        fontSize: FontSize.size40Font,
        textAlign: 'center',
    }
})