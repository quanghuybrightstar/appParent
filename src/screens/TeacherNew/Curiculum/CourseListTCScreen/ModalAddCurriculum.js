import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { TextBox } from '../../../../componentBase/TextBox';
import { CurriculumTeacherJson } from '../../../../stringJSON';
import { Colors } from '../../../../styleApp/color';
import { FontSize } from '../../../../styleApp/font';
import { IC_COPY } from '../../../../assets/icon'
import Clipboard from '@react-native-community/clipboard';
/**
 * 
 * @param {object} props 
 * @property {boolean} visible Visible of modal
 * @property {function} hideModal Action when Pressing backdrop
 * @returns {Component}
 */
export const ModalAddCurriculum = (props) => {
    let { visible, hideModal } = props
    return (
        <Modal isVisible={visible}
            onBackdropPress={() => hideModal()}
            style={styles.viewModal}
        >
            <View style={styles.modal}>
                <TextBox style={styles.txtAddCurriculum}>{CurriculumTeacherJson.addCurriculum}</TextBox>
                <TextBox style={styles.txtContent} numberOfLines={null}>{CurriculumTeacherJson.contentModalAdd}</TextBox>
                <TouchableOpacity onPress={()=>{Clipboard.setString(CurriculumTeacherJson.linkAddCurriculum)}} style={styles.footerModal}>
                    <TextBox style={styles.txtLink}>{CurriculumTeacherJson.linkAddCurriculum}</TextBox>
                    <Image resizeMode={"contain"} source={IC_COPY} style={styles.copy_icon}/>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
export const styles = StyleSheet.create({
    copy_icon: {
        marginLeft: SmartScreenBase.smPercenWidth*1.5,
        width: SmartScreenBase.smPercenWidth*7,
        height: SmartScreenBase.smPercenWidth*7,
    },
    footerModal: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    viewModal: {
        margin: 0,
        // backgroundColor: Colors._707070
    },
    modal: {
        height: SmartScreenBase.smPercenHeight * 30,
        backgroundColor: Colors.White,
        marginHorizontal: SmartScreenBase.smPercenWidth * 5,
        borderRadius: SmartScreenBase.smBaseWidth * 35,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SmartScreenBase.smBaseWidth * 10
    },
    txtAddCurriculum: {
        fontSize: FontSize.size65Font
    },
    txtContent: {
        textAlign: 'center',
        fontSize: FontSize.size55Font,
        width: SmartScreenBase.smPercenWidth * 90,
        marginVertical: SmartScreenBase.smPercenHeight * 2
    },
    txtLink: {
        textDecorationLine: 'underline',
        fontSize: FontSize.size55Font,
    }
})