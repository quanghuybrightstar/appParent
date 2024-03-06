import * as React from 'react'
import { Modal, StyleSheet, Text, TextProps, TouchableOpacity, View } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { CommonJson, StudyPlanJson } from '../../stringJSON'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import { MyButton } from '../Button'
import { TextBox } from '../TextBox'

/**
 * @summary The text component with app's font family and default font size.
 * 
 * @param {object} props 
 * @property {boolean} visible
 * @property {array} dataList
 * @returns {Component}
 */

export const ChooseValueModal = (props) => {
    const {
        visible = false,
        dataList = [{tittle: "Khối 6", value: 6}, {tittle: "Khối 7", value: 7}, {tittle: "Khối 8", value: 8}, {tittle: "Khối 9", value: 9}]
    } = props

    const clickC = (index) => {
        props.choose && props.choose(index)
    }

    return (
        <Modal visible={visible} transparent animationType='fade'>
            <View style={styles.container}>
                <View style={styles.content}>
                    {dataList.map((mono,key) => {
                        return(
                            <View>
                                <TouchableOpacity onPress={()=>clickC(mono.value)} style={styles.monoSt}>
                                    <TextBox style={styles.textSt} text={mono.tittle}/>
                                </TouchableOpacity>
                                {<View style={{...styles.gachSt, borderBottomWidth: key == (dataList.length-1) ? 0 : 1}}/>}
                            </View>
                        );
                    })}
                </View>
            </View>
        </Modal>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors._00000090,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5
    },
    content: {
        backgroundColor: Colors.White,
        width: SmartScreenBase.smPercenWidth*50,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        // paddingVertical: SmartScreenBase.smPercenHeight * 2,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 10,
        alignItems: "center",
        justifyContent: 'space-evenly'
    },
    monoSt: {
        textAlign: 'center',
        width: SmartScreenBase.smPercenWidth*30,
        color: Colors.Black,
        fontSize: FontSize.size55Font,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 1.5,
    },
    textSt: {
        fontSize: SmartScreenBase.smFontSize*50
    },
    gachSt: {
        width: SmartScreenBase.smPercenWidth * 30,
        borderColor: Colors.DarkGray
    },
    cancelText: { color: Colors.BaseGreen }
});