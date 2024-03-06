import React from 'react';
import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';
import styles from "./styles";

const ModalExitLesson = (props) => {
    const {_cancelModalExitLesson, _confirmModalExitLesson} = props;
    return (
        <Modal position={true} animationType={'slide'} transparent={true}>
            <View style={styles.container}>
                <View style={styles.containerContent}>
                    <Image source={{uri: 'image_exit_lesson'}} style={styles.image}/>
                    <Text style={styles.text1}>Bạn có chắc chắn muốn thoát?</Text>
                    {!props.isTeacher ? <Text style={styles.text2}>Kết quả học tập sẽ không được ghi nhận!</Text> : null}
                    <View style={styles.viewButton}>
                        <TouchableOpacity style={{...styles.button, backgroundColor: '#01283A'}}
                                          onPress={_confirmModalExitLesson}>
                            <Text style={styles.textButton}>Thoát</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.button, backgroundColor: '#F08B01'}}
                                          onPress={_cancelModalExitLesson}>
                            <Text style={styles.textButton}>Học tiếp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

export default ModalExitLesson;
