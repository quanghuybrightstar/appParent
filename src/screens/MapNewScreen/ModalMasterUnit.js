import React from 'react';
import {Modal, Text, TouchableOpacity, View} from "react-native";
import styles from "./style";
import LinearGradient from "react-native-linear-gradient";

const ModalMasterUnit = (props) => {
    const {_cancelModalMasterUnit, _confirmModalMasterUnit} = props;

    return (
        <Modal visible={props.visible}>
            <View style={styles.containerModalMasterUnit}>
                <View style={styles.containerContentModalMU}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text
                            style={styles.textContentModalMU}>{`Bạn hãy hoàn thành\nbài tập trong Master Unit\nđể tiếp tục!`}</Text>
                    </View>
                    <View style={styles.viewButtonModalMU}>
                        <TouchableOpacity style={styles.buttonCancelModalMU} onPress={_cancelModalMasterUnit}>
                            <Text style={{...styles.textButtonModalMU, color: '#00b9b6'}}>Đóng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonConfirmModalMU} onPress={_confirmModalMasterUnit}>
                            <LinearGradient
                                colors={['#00e1a0', '#00b9b7']}
                                start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                                style={styles.gradientButtonConfirmModalMU}
                            >
                                <Text style={{...styles.textButtonModalMU, color: '#fff'}}>Đồng ý</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

export default ModalMasterUnit;
