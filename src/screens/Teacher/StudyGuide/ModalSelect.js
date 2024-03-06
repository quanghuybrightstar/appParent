import React from 'react';
import {Modal,Text, TouchableOpacity, View, SafeAreaView, FlatList} from "react-native";

import SmartScreenBase from "../../../base/SmartScreenBase";
import styles from "./styles";

const ModalSelect = (props) => {
    const {_cancelModalSelect, _recodeVideo, _handleRecordAudio, _handleTextDocument, _handleFileLocal, _takePhoto} = props;
    const dataList = [
        { title: 'Quay video', action: _recodeVideo},
        { title: 'Chụp ảnh', action: _takePhoto},
        { title: 'Thu âm', action: _handleRecordAudio},
        { title: 'Soạn văn bản', action: _handleTextDocument},
        { title: 'Tải tệp từ máy', action: _handleFileLocal},
        { title: 'Hủy', action: _cancelModalSelect},
    ];
    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.itemModalSelect} onPress={item.action}>
                <Text style={styles.textItemModalSelect}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    const _itemSeparatorComponent = () => {
        return <View style={styles.borderModalSelect}/>
    };

    return (
        <Modal animationType="none" transparent={true} visible={true}>
            <SafeAreaView style={styles.containerModalSelect}>
                <View style={styles.containerContentModalSelect}>
                    <FlatList
                        data={dataList}
                        renderItem={_renderItem}
                        ItemSeparatorComponent={_itemSeparatorComponent}
                        keyExtractor={(item,index) => index.toString()}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    )
};

export default ModalSelect;
