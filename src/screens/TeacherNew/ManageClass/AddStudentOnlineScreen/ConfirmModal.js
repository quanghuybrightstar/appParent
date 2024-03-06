import React from 'react'
// import Modal from "react-native-modal";
import { View, Modal, Text, Alert, StyleSheet, Image } from "react-native";
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { CommonJson, ProfileJson } from '../../../../stringJSON';
import { TextBox } from '../../../../componentBase/TextBox';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import { useSelector } from 'react-redux';
import { Colors } from '../../../../styleApp/color';
import API from '../../../../API/APIConstant';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';

/**
 * 
 * @param {object} props 
 * @property {boolean} visible Visible of modal
 * @property {object} parent Data of specific student
 * @property {function} requestClose Action when closing modal
 * @property {function} onSendRequest Action when pressing submit button
 * @returns {Component}
 */
export const ConfirmModal = (props) => {
    let { parent } = props
    const language = useSelector(state => state.LanguageStackReducer.language)
    const { AddStudentOfflineScreen, SmPopup } = language
    return (
        <Modal {...props} transparent animationType='fade'>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <View style={styles.viewHeader}>
                        <View style={styles.avatarBox}>
                            <Image source={{ uri: API.image_base_url + parent.avatar || "" }} style={styles.avatar} resizeMode="cover" />
                        </View>
                        <TextBox numberOfLines={null} textBreakStrategy="simple" text={parent.fullname || "..."} style={styles.nameText} />
                        <TextBox numberOfLines={null} textBreakStrategy="simple" text={parent.email || "..."} style={styles.emailText} />
                    </View>
                    <View style={styles.viewbtn}>
                        <ShortMainButton
                            onPress={() => props.requestClose()}
                            text={CommonJson.Cancel}
                            style={styles.btn}
                            widthType={'popup'}
                        />
                        <ShortMainButton
                            type={1}
                            onPress={props.onSendRequest}
                            text={AddStudentOfflineScreen.AddPopupBt}
                            style={styles.btn}
                            widthType={'popup'}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    btn: { width: SmartScreenBase.smPercenWidth * 30, borderRadius: SmartScreenBase.smBaseWidth * 500 },
    viewbtn: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: SmartScreenBase.smBaseHeight * 10, },
    modal: {
        flex: 1,
        backgroundColor: Colors._00000090,
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    container: {
        backgroundColor: 'white', borderRadius: 10,
        paddingBottom: SmartScreenBase.smPercenHeight * 2,
        // paddingHorizontal: SmartScreenBase.smPercenHeight
    },
    viewHeader: { alignItems: 'center', marginBottom: SmartScreenBase.smBaseHeight * 30, paddingHorizontal: SmartScreenBase.smBaseWidth * 20 },
    avatarBox: {
        width: SmartScreenBase.smPercenWidth * 25,
        height: SmartScreenBase.smPercenWidth * 25,
        backgroundColor: Colors.White,
        alignItems: "center",
        justifyContent: "center",
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: Colors._E9AF38,
        marginTop: -SmartScreenBase.smPercenWidth * 25 / 2,
        marginBottom: SmartScreenBase.smBaseHeight * 20,
        borderRadius: SmartScreenBase.smPercenWidth * 25,
    },
    avatar: {
        width: SmartScreenBase.smPercenWidth * 25,
        height: SmartScreenBase.smPercenWidth * 25,
        borderRadius: SmartScreenBase.smPercenWidth * 25,
    },
    nameText: {
        fontSize: FontSize.size55Font,
        textAlign: 'center',
        ...FontWeight.Bold
    },
    emailText: {
        fontSize: FontSize.size45Font,
        fontWeight: '400',
        textAlign: 'center'
    }
})