
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import { TextBox } from '../../../../componentBase/TextBox';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import FontBase from '../../../../base/FontBase';
const width = Dimensions.get('window').width;

/**
 * 
 * @param {object} props 
 * @property {boolean} sendParent Send to parent flag
 * @property {object} language Text of button 
 * @property {function} onChange Action when pressing checkbox
 * @returns {Component}
 */
const ViewCheckBox = (props) => {
    const [check, setCheck] = useState();
    useEffect(() => {
        setCheck(props.sendParent ? props.sendParent : false)
    }, [props.sendParent])
    const onPressCheckBox = () => {
        setCheck(!check)
        props.onChange(!check)
    }
    return (
        <View style={styles.container}>
            {/* <View style={styles.viewCheckBox}>
                <Text style={styles.txtButton}>{props.language.ScoreCardScreen.SendAllText}</Text>
                <SmallCheckBox
                    onPress={onPressCheckBox}
                    isNotify={check}
                />
            </View> */}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: width - 20,
        alignItems: 'flex-end',
        marginVertical: SmartScreenBase.smBaseHeight * 20
    },
    viewCheckBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    txtButton: {
        marginRight: 10,
        fontSize: FontSize.size50Font,
        fontFamily: FontBase.MyriadPro_Regular
    }
})
export default ViewCheckBox;