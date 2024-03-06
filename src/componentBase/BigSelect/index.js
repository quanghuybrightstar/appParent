import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle, TextInputProps, ImageSourcePropType, KeyboardTypeOptions, FlatList } from 'react-native';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import { HEIGHT_DESIGN, WIDTH_DESIGN } from '../../utils/configs';
import Modal from 'react-native-modal';
import images from '../../assets/images';

/**
 * @summary The big select component
 *
 * @param {object} props
 * @property {containerStyle} props.containerStyle: containerStyle of the select
 * @property {isError} props.isError: define is has error
 * @property {errorText} props.errorText: errorText when has error
 * @property {leftIcon} props.leftIcon: leftIcon
 * @property {value} props.value: value of text select
 * @property {onChangeText} props.onChangeText: function onChangeText of text select
 * @property {keyboardType} props.keyboardType: type of keyboard of text select
 * @property {textInputProps} props.textInputProps: other props of text select
 * @property {isMini} props.isMini: is mini select
 * @property {rightIcon} props.rightIcon: rightIcon
 *
 * @returns {Component}
 */

interface ItemData {
  label: String,
  value: any
}

interface Props {
	containerStyle: ViewStyle,
	isError: Boolean,
	errorText: String,
	leftIcon: ImageSourcePropType,
	rightIcon: ImageSourcePropType,
	value: String,
	textInputProps: TextInputProps,
	isMini: Boolean,
	onPressRightIcon: () => void,
  title: String,
  dataList: Array<ItemData>,
  onSelectItem: (item: ItemData) =>  void,
  isDisable: Boolean
}

export default function BigSelect(props: Props) {
    const { containerStyle, isError, errorText, leftIcon, value, textInputProps, isMini, rightIcon, title, dataList = [], onSelectItem, isDisable} = props;
    const [isModalVisible, setModalVisible ] = useState(false);
    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={{marginBottom:SmartScreenBase.smPercenHeight * (30 / HEIGHT_DESIGN) * 100}}
                onPress={()=> {
                    if (onSelectItem instanceof Function){
                        onSelectItem(item);
                    }
                    setModalVisible(false);
                }}
            >
                <Text style={styles.itemText}>{item.label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <TouchableOpacity
                disabled={isDisable}
                onPress={()=> {
                    setModalVisible(true);
                }}
                style={[styles.container, containerStyle]}>
                { isError &&  <Text style={[styles.errorText, {marginBottom: isError ? 2 : 0}]}>{isError ? errorText : ''}</Text>}
                <View
                    style={
                        [
                            styles.viewInputContainer,
                            { borderColor: isError ? '#CC0000' : '#000'},
                            { width: isMini ?  SmartScreenBase.smPercenWidth * (500 / WIDTH_DESIGN) * 100 : SmartScreenBase.smPercenWidth * (925 / WIDTH_DESIGN) * 100},
                        ]
                    }
                >
                    {
                        leftIcon && (
                            <Image
                                source={leftIcon}
                                style={styles.leftIcon}
                                resizeMode="contain"
                            />
                        )
                    }
                    <View
                        style={{justifyContent: 'center', flex: 1}}
                        pointerEvents="none"
                    >
                        <TextInput
                            {...textInputProps}
                            style={styles.textInput}
                            editable={false}
                            value={value}
                            placeholderTextColor="#A8A6A6"
                        />
                    </View>
                    {
                        rightIcon && (
                            <View
                                style={{padding: SmartScreenBase.smPercenWidth * (40 / WIDTH_DESIGN) * 100}}
                            >
                                <Image
                                    source={rightIcon}
                                    style={styles.rightIcon}
                                    resizeMode="contain"
                                />
                            </View>
                        )
                    }
                </View>
            </TouchableOpacity>
            <Modal
                style={{
                    flex: 1,
                    paddingTop: SmartScreenBase.smPercenHeight * 5,
                    paddingBottom: SmartScreenBase.smPercenHeight * 1,
                }}
                isVisible={isModalVisible}
                backdropOpacity={0.40}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.containerViewInside}>
                    <View
                        style={styles.titleContainer}
                    >
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity
                            style={{padding: 4}}
                            onPress={()=>{
                                setModalVisible(false);
                            }}
                        >
                            <Image
                                source={images.ICON_CLOSE}
                                style={styles.iconClose}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={dataList}
                        keyExtractor={(item, index) => String(item.value) + index}
                        renderItem={_renderItem}
                    />
                </View>

            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    viewInputContainer: {
        width: SmartScreenBase.smPercenWidth * (925 / WIDTH_DESIGN) * 100,
        height: SmartScreenBase.smPercenHeight * (135 / HEIGHT_DESIGN) * 100,
        borderRadius: 15,
        borderWidth: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        fontSize: SmartScreenBase.smFontSize * 45,
        fontFamily:FontBase.MyriadPro_Bold,
        fontWeight: 'bold',
        color: '#CC0000',
        marginLeft: SmartScreenBase.smPercenWidth * (40 / WIDTH_DESIGN) * 100,
    },
    leftIcon: {
        width: SmartScreenBase.smPercenWidth * (50 / WIDTH_DESIGN) * 100,
        height: SmartScreenBase.smPercenHeight * (45 / HEIGHT_DESIGN) * 100,
        marginHorizontal: SmartScreenBase.smPercenWidth * (40 / WIDTH_DESIGN) * 100,
    },
    textInput: {
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 45,
        flex: 1,
        color: '#000',
    },
    rightIcon: {
        width: SmartScreenBase.smPercenWidth * (65 / WIDTH_DESIGN) * 100,
        height: SmartScreenBase.smPercenHeight * (45 / HEIGHT_DESIGN) * 100,
    },

    containerViewInside: {
        width: SmartScreenBase.smPercenWidth * (952 / WIDTH_DESIGN) * 100,
        height: SmartScreenBase.smPercenHeight * (1700 / HEIGHT_DESIGN) * 100,
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingHorizontal: SmartScreenBase.smPercenWidth * (50 / WIDTH_DESIGN) * 100,
        paddingVertical: SmartScreenBase.smPercenHeight * (42 / HEIGHT_DESIGN) * 100,
    },
    title: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily:FontBase.MyriadPro_Bold,
        color: '#707070',
        flex: 1,
    },
    itemText :{
        fontSize: SmartScreenBase.smFontSize * 45,
        fontFamily:FontBase.MyriadPro_Regular,
        color: '#707070',
    },
    titleContainer: {
        marginBottom:SmartScreenBase.smPercenHeight * (42 / HEIGHT_DESIGN) * 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconClose: {
        width: SmartScreenBase.smBaseWidth * 56,
        height:SmartScreenBase.smBaseWidth * 56,
    },
});
