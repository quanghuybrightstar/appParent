import React, {useState, useEffect} from 'react';
import { Modal, ActivityIndicator, View, StyleSheet, TouchableOpacity} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';
import { TextBox } from '../TextBox';
import SelectModal from './SelectModal';
import Icon from 'react-native-vector-icons/Feather'


/**
 * @summary Select modal
 * 
 * @param {object} props
 * @property {boolean} visible: visible of the Loading
 * 
 * @returns {Component}
 */
export default SelectByModal = (
  props
) => {

    const { item, selected, borderColor, buttonStyles, valueTextStyles, onShowSelect } = props
    const [value, setValue] = useState(item)
    const [showModal, setshowModal] = useState(false)

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

  return (
    <View>
        <TouchableOpacity onPress={()=>onShowSelect()} 
            style={[styles.linearContainer, buttonStyles, {borderColor: borderColor, borderWidth: 1}]}>
            {!!value && <TextBox style={[styles.valueText, valueTextStyles]} color={borderColor}>
                {value.label}
            </TextBox>}
            <View style={[styles.arrowImg, , { borderColor: borderColor }]}>
                <Icon name={"chevron-down"} color={borderColor} size={20} />
            </View>
        </TouchableOpacity>
    </View>
  );
};

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
        height: SmartScreenBase.smPercenWidth * 9,
        borderRadius: SmartScreenBase.smPercenHeight * 5,
        paddingLeft: 15,
        justifyContent: 'center',
    },
    valueText: {
        fontSize: SmartScreenBase.smFontSize*40,
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
        fontSize: SmartScreenBase.smFontSize*40,
        textAlign: 'center',
    }
});

