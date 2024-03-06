import React from 'react';
import {Modal, SafeAreaView, View, Text, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import { ShortMainButton } from '../../../componentBase/ShortMainButton';

const ModalDelete = (props) => {
    const {_handleDeleteItem, _deleteResource} = props;
    return (
        <Modal animationType="slide" transparent={true} visible={true}>
            <SafeAreaView style={styles.containerModalDelete}>
                <View style={styles.containerContentModalDelete}>
                    <Text style={styles.textContentModalDelete}>
                        {`Bạn có chắc chắn muốn xóa\n Hướng dẫn học tập này\n ra khỏi Danh sách?`}
                    </Text>
                    <View style={styles.viewButtonModalDelete}>
                        {/* <TouchableOpacity style={styles.buttonModalDelete} onPress={() => _handleDeleteItem(-1)}>
                            <LinearGradient colors={['#00e1a0', '#00b9b7']}
                                            start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                                            style={styles.gradientButtonModalDelete}
                            >
                                <Text style={styles.textButtonModalDelete}>Không</Text>
                            </LinearGradient>
                        </TouchableOpacity> */}
                        <ShortMainButton text={"Không"} widthType={'mini'}
                            onPress={()=>{_handleDeleteItem(-1)}}/>
                        <ShortMainButton text={"Có"} widthType={'mini'} type={1}
                            onPress={()=>{_deleteResource()}}/>
                        {/* <TouchableOpacity style={styles.buttonModalDelete} onPress={_deleteResource}>
                            <LinearGradient colors={['#00e1a0', '#00b9b7']}
                                            start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                                            style={styles.gradientButtonModalDelete}
                            >
                                <Text style={styles.textButtonModalDelete}>Có</Text>
                            </LinearGradient>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
};

export default ModalDelete;
