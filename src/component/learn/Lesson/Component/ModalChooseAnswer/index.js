import React from 'react';
import {Modal, TouchableOpacity, Text, View, TouchableWithoutFeedback} from 'react-native';
import styles from "./styles";

const ModalChooseAnswer = (props) => {
    const {data, _cancelChooseAnswer, _onSelect, indexChooseAnswer} = props;
    const _renderItem = (item, index) => {
        return (
            <TouchableOpacity 
            key={index}
            style={{...styles.buttonAnswer, borderBottomWidth: index === data.length - 1 ? 0 : 0.5}}
            onPress={() => _onSelect(index, indexChooseAnswer)}
            >
                <Text style={styles.textItem}>{item}</Text>
            </TouchableOpacity>
        )
    };

    return (
        <Modal position={true} animationType={'slide'} transparent={true}>
            <TouchableWithoutFeedback onPress={_cancelChooseAnswer}>
                <View style={styles.container}>
                    <View style={styles.containerContent}>
                        {data.map((item, index) => _renderItem(item, index))}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
};

export default ModalChooseAnswer;
