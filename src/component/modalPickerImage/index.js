import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import styles from './style'
// import { ScrollView } from 'react-native-gesture-handler';
import { TextBox } from '../../componentBase/TextBox';
const modalPickerImage = (props) => {
    const _close = () => {
        props.close()
    }
    const _openCamera = () => {
        props.openCamera()
    }
    const _openLibrary = () => {
        props.openLibrary()
    }
    return (
        <Modal visible={props.visible} animationType={'slide'} transparent={true}>
            <View style={styles.container}>
                <View style={styles.viewScript}>
                    {!!props.takePhoto && <TouchableOpacity style={styles.buttonCamera} onPress={props.takePhoto}>
                        <TextBox style={styles.title}>{'Chụp ảnh'}</TextBox>
                    </TouchableOpacity>}
                    <TouchableOpacity style={styles.buttonCamera} onPress={_openCamera}>
                        <TextBox style={styles.title}>{props.status == 'video' ? 'Quay video' : 'Chụp ảnh'}</TextBox>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCamera} onPress={_openLibrary}>
                        <TextBox style={styles.title}>{props.status == 'video' ? 'Tải tệp ở máy' : 'Tải ảnh lên'}</TextBox>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancel} onPress={_close}>
                        <TextBox style={styles.title}>Hủy</TextBox>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    )
}
export default modalPickerImage