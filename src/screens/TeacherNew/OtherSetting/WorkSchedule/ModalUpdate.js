import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { TextBox } from '../../../../componentBase/TextBox';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';

/**
 * 
 * @param {Object} props 
 * @property {boolean} visible visible of modal
 * @property {function} hideModal hide modal function
 * @property {number} id id of the work schedule
 * @property {string} content content of work schedule
 * @property {string} month 
 * @property {string} year 
 * @property {function} reloadData reload data
 * @returns 
 */
export const ModalUpdate = (props) => {
    let { visible, hideModal, id, content, month, year, reloadData } = props
    const language = useSelector(state => state.LanguageStackReducer.language)
    const [contentSchedule, setContentSchedule] = useState(content)

    /**
     * update schedule function
     */
    const UpdateSchedule = () => {
        if (!!id && !!content) {
            var qs = require('qs');
            const form = qs.stringify({
                'content': contentSchedule,
                'id': id,
            })

            APIBase.tokenAPI('PUT', API.baseurl + API.UpdateSchedule, form).then((res) => {
                console.log('res', res)
                hideModal()
                reloadData()
            }).catch(() => {

            })
        } else {
            var qs = require('qs');
            const form = qs.stringify({
                'content': contentSchedule,
                'month': month,
                'year': year
            })

            // console.log('form', form)
            APIBase.tokenAPI('POST', API.baseurl + API.CreateSchedule, form).then((res) => {
                console.log('res1', res)
                hideModal()
                reloadData()
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    //When click cancel
    const onCancel = () => {
        hideModal()
    }

    return (
        <Modal isVisible={visible} onShow={()=>{setContentSchedule(content)}}
            style={styles.viewModal}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.keyboard}>
                <View style={styles.container}>
                    <TextBox style={styles.txtTitle}>{language.YearCalendarScreen.TittleModal}</TextBox>
                    <View style={styles.viewIp}>
                        <TextInput
                            multiline={true}
                            placeholder={language.YearCalendarScreen.TextHoderModal}
                            textAlignVertical={'top'}
                            placeholderTextColor={Colors._BBBDBF}
                            value={contentSchedule}
                            onChangeText={setContentSchedule}
                            fontStyle={'normal'}
                            style={styles.ip}
                        />
                    </View>
                    <View style={styles.row}>
                        <ShortMainButton
                            type={2}
                            style={styles.btnCancel}
                            textStyles={styles.txtCancel}
                            onPress={onCancel}
                            text={language.YearCalendarScreen.RejectBtModal}
                            widthType={'popup'}
                        />
                        <ShortMainButton
                            type={1}
                            style={styles.btnConfirm}
                            textStyles={styles.txtConfirm}
                            onPress={UpdateSchedule}
                            text={language.YearCalendarScreen.ComfirmBtModal}
                            widthType={'popup'}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Modal>
    )
}
export const styles = StyleSheet.create({
    keyboard: { flexGrow: 1, justifyContent: 'center' },
    ip: {
        lineHeight: FontSize.size45Font,
        fontSize: FontSize.size45Font,
        color: Colors.Black,
        height: SmartScreenBase.smPercenHeight * 20,
        ...FontWeight.LightItalic,
        fontStyle: "normal"
    },
    viewModal: { margin: 0, backgroundColor: Colors._00000070 },
    container: {
        // flex: 0.1,
        backgroundColor: Colors.White,
        marginHorizontal: SmartScreenBase.smBaseWidth * 40,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 40,
        borderRadius: SmartScreenBase.smBaseWidth * 20,
        paddingVertical: SmartScreenBase.smBaseWidth * 50,

    },
    txtTitle: {
        alignSelf: 'center',
        fontSize: FontSize.size60Font,
        ...FontWeight.SemiBold
    },
    viewIp: {
        borderWidth: 1,
        borderColor: Colors._7F7F7F,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    btnCancel: {
        width: SmartScreenBase.smPercenWidth * 40,
        borderWidth: 1,
        borderColor: Colors._00B9B6,
        borderRadius: SmartScreenBase.smBaseWidth * 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnConfirm: {
        width: SmartScreenBase.smPercenWidth * 40,
        borderRadius: SmartScreenBase.smBaseWidth * 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtCancel: {
        fontSize: FontSize.size55Font,
        color: Colors._00B9B6,
    },
    txtConfirm: {
        fontSize: FontSize.size55Font,
        color: Colors.White
    }
})