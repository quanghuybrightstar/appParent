import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle, TextInputProps, ImageSourcePropType, KeyboardTypeOptions } from 'react-native';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import { HEIGHT_DESIGN, WIDTH_DESIGN } from '../../utils/configs';
import LogBase from '../../base/LogBase';

/**
 * @summary The border input component
 *
 * @param {object} props
 * @property {containerStyle} props.containerStyle: containerStyle of the input
 * @property {isError} props.isError: define is has error
 * @property {errorText} props.errorText: errorText when has error
 * @property {leftIcon} props.leftIcon: leftIcon
 * @property {value} props.value: value of text input
 * @property {onChangeText} props.onChangeText: function onChangeText of text input
 * @property {keyboardType} props.keyboardType: type of keyboard of text input
 * @property {textInputProps} props.textInputProps: other props of text input
 * @property {isMiniInput} props.isMiniInput: is mini input
 * @property {rightIcon} props.rightIcon: rightIcon
 * @property {onPressRightIcon} props.onPressRightIcon: onPressRightIcon
 * @property {onPress} props.onPress: onPress to components
 *
 * @returns {Component}
 */

interface Props {
	containerStyle: ViewStyle,
	isError: Boolean,
	errorText: String,
	leftIcon: ImageSourcePropType,
	rightIcon: ImageSourcePropType,
	value: String,
	onChangeText: (text: string) => void,
	keyboardType: KeyboardTypeOptions,
	textInputProps: TextInputProps,
	isMiniInput: Boolean,
	onPressRightIcon: () => void,
    onPress: () => void
}

export default function BorderTextInput(props: Props) {
    const { containerStyle, isError, errorText, leftIcon, value, onChangeText, keyboardType, textInputProps, isMiniInput, rightIcon, onPressRightIcon, onPress } = props;
    let refTextInput;

    const ComponentRightIcon = (onPressRightIcon instanceof Function) ? TouchableOpacity : View;
    return (
        <TouchableOpacity
            activeOpacity={onPress ? 0.5 : 1}
            onPress={()=> {
                if (onPress instanceof Function){
                    onPress();
                } else {
                    refTextInput && refTextInput.focus();
                }
            }}
            style={[styles.container, containerStyle]}>
            { isError &&  <Text style={[styles.errorText, {marginBottom: isError ? 2 : 0}]}>{isError ? errorText : ''}</Text>}
            <View
                style={
                    [
                        styles.viewInputContainer,
                        { borderColor: isError ? '#CC0000' : '#000'},
                        { width: isMiniInput ?  SmartScreenBase.smPercenWidth * (500 / WIDTH_DESIGN) * 100 : SmartScreenBase.smPercenWidth * (925 / WIDTH_DESIGN) * 100},
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
                    pointerEvents={onPress && 'none'}
                >
                    <TextInput
                        {...textInputProps}
                        style={styles.textInput}
                        value={value}
                        onChangeText={(text) => {
                            if (onChangeText instanceof Function){
                                onChangeText(text);
                            }
                        }}
                        keyboardType={keyboardType}
                        placeholderTextColor="#A8A6A6"
                        ref={(ref) => refTextInput = ref}
                    />
                </View>
                {
                    rightIcon && (
                        <ComponentRightIcon
                            style={{padding: SmartScreenBase.smPercenWidth * (40 / WIDTH_DESIGN) * 100}}
                            onPress={()=>{
                                if (onPressRightIcon instanceof Function){
                                    onPressRightIcon();
                                }
                            }}
                        >
                            <Image
                                source={rightIcon}
                                style={styles.rightIcon}
                                resizeMode="contain"
                            />
                        </ComponentRightIcon>
                    )
                }
            </View>
        </TouchableOpacity>
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
        fontFamily:FontBase.MyriadPro_Bold_It,
        color: '#CC0000',
        width: SmartScreenBase.smPercenWidth * (925 / WIDTH_DESIGN) * 100,
        textAlign: 'center',
        //marginLeft: SmartScreenBase.smPercenWidth * (40 / WIDTH_DESIGN) * 100,
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
});
