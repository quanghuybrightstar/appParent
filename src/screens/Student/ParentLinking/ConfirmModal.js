import React from 'react'
// import Modal from "react-native-modal";
import { View, Modal, Text, Alert, StyleSheet, Image } from "react-native";
import SmartScreenBase from '../../../base/SmartScreenBase';
import { CommonJson, ProfileJson } from '../../../stringJSON';
import { TextBox } from '../../../componentBase/TextBox';
import { MyButton } from '../../../componentBase/Button';
import { FontSize } from '../../../styleApp/font';
import { Colors } from '../../../styleApp/color';
import API from '../../../API/APIConstant';
import { ShortMainButton } from "../../../componentBase/ShortMainButton";
import { useSelector } from 'react-redux';
import { ParentText } from '../../../stringJSON/ParentTextJson';
import { FontWeight } from '../../../styleApp/font';

/**
 *  Confirm linking modal
 * @param {object} props 
 * @property {object} parent parent info
 * @returns Component
 */
export const ConfirmModal = (props) => {
    let { parent } = props

    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    return (
        <Modal {...props} transparent animationType='fade'>
            <View style={styles.container}>
                <View style={styles.modalBox}>
                    <View style={styles.infoBox}>
                        <View style={styles.avatarWrapper}>
                            <Image
                                onError={(err) => {
                                    console.log("----err", err);
                                }}
                                source={{
                                    uri: !!parent?.avatar ? (API.image_base_url + parent.avatar) : ""
                                }}
                                style={[styles.avatar]}
                                resizeMode="cover"
                            />
                        </View>
                        <TextBox text={parent.fullname || parent.full_name || "..."} style={styles.nameText} />
                        {dataLogin.role != 'parent' ? <TextBox text={parent.email || "..."} style={styles.emailText} />
                        : 
                        <View style = {styles.inforStudent}>
                           <View  style={styles.inforDetailStudent}>
                                <Text style={styles.inforDetailTitle}>Email: </Text>
                                <Text style={styles.inforDetailStudent}> { parent.email || "..."}</Text>
                            </View>
                            <View  style={styles.inforDetailStudent}>
                                <Text style={styles.inforDetailTitle}>Lớp: </Text>
                                <Text style={styles.inforDetailStudent}> { parent.class || "..."}</Text>
                            </View>
                            <View  style={styles.inforDetailStudent}>
                                <Text style={styles.inforDetailTitle}>Trường: </Text>
                                <Text style={styles.inforDetailStudent}> { parent.school || "..."}</Text>
                            </View>
                        </View>    
                        }
                    </View>
                    <View style={styles.buttonBox}>
                        <ShortMainButton
                            onPress={() => props.requestClose()}
                            text={CommonJson.Cancel}
                            style={styles.btnStyle}
                        />
                        <ShortMainButton
                            type={1}
                            hasBackground
                            onPress={props.onSendRequest}
                            text={dataLogin.role != 'parent' ? ProfileJson.Linking : ParentText.AssociateStudent.BtnAssociate}
                            style={styles.btnStyle}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors._00000080,
        justifyContent: "center",
        paddingHorizontal: SmartScreenBase.smBaseWidth * 80,
    },
    modalBox: {
        backgroundColor: 'white', borderRadius: SmartScreenBase.smBaseWidth * 25,
        paddingBottom: SmartScreenBase.smPercenHeight * 2,
        paddingHorizontal: SmartScreenBase.smPercenHeight
    },
    infoBox: { alignItems: 'center', marginBottom: SmartScreenBase.smBaseHeight * 30 },
    buttonBox: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: SmartScreenBase.smBaseHeight * 10 },
    btnStyle: {
        width: SmartScreenBase.smPercenWidth * 30,
        height: 'auto',
        paddingVertical: SmartScreenBase.smBaseHeight * 8,
        borderRadius: 500
    },
    avatarWrapper: {
        width: SmartScreenBase.smPercenWidth * 25,
        height: SmartScreenBase.smPercenWidth * 25,
        borderRadius: SmartScreenBase.smPercenWidth * 500,
        borderWidth: 2,
        padding: 2,
        borderColor: Colors._E9AF38,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: -SmartScreenBase.smPercenWidth * 25 / 2,
        marginBottom: SmartScreenBase.smBaseHeight * 20,
    },
    avatar: {
        width: SmartScreenBase.smPercenWidth * 30,
        height: SmartScreenBase.smPercenWidth * 30,
        // borderRadius: SmartScreenBase.smPercenWidth * 500,
    },
    nameText: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold
    },
    emailText: {
        fontSize: FontSize.size45Font,
        fontWeight: '400'
    },
    inforStudent: {
        paddingTop: 15 * SmartScreenBase.smBaseHeight,
    },
    inforDetailStudent: {
        fontSize: FontSize.size40Font,
        fontWeight: '300',
        color: Colors.Black,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    inforDetailTitle: {
        fontSize: FontSize.size40Font,
        fontWeight: '300',
        color: Colors.Black,
        width: SmartScreenBase.smBaseWidth * 180,
    }
})