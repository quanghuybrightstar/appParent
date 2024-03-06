import React, {useState} from 'react';
import {SafeAreaView, Modal, View, TouchableWithoutFeedback, TouchableOpacity, Text, Image} from 'react-native';
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";

const ModalFilter = (props) => {
    const {_showModalFilter} = props;
    const [dataLevel, setDataLevel] = useState([
        {name: 'Easy', choose: false},
        {name: 'normal', choose: false},
        {name: 'Hard', choose: false},
    ]);

    const [dataSkill, setDataSkill] = useState([
        {name: 'Pronunciation', choose: false},
        {name: 'Vocabulary', choose: false},
        {name: 'Grammar', choose: false},
        {name: 'Reading', choose: false},
        {name: 'Listening', choose: false},
        {name: 'Speaking', choose: false},
        {name: 'Writing', choose: false},
        {name: 'Test', choose: false},
    ]);

    const _handleItem = (index, data) => {
        const copy = [...data];
        copy[index]['choose'] = !copy[index]['choose'];
        if (data === dataLevel) {
            setDataLevel(copy);
        } else if (data === dataSkill) {
            setDataSkill(copy);
        }
    };

    const _deleteFilter = () => {
        const level = [...dataLevel];
        level.map(ele => {
            ele.choose = false;
            return ele;
        });
        setDataLevel(level);
        const skill = [...dataSkill];
        skill.map(ele => {
            ele.choose = false;
            return ele;
        });
        setDataSkill(skill);
    };

    const _renderItem = (item, index, data) => {
        return (
            <TouchableWithoutFeedback onPress={() => _handleItem(index, data)}>
                <View style={styles.viewItemModalFilter}>
                    <View style={styles.viewIconBoxModalFilter}>
                        <Image source={{uri: 'teacher_huongdanbaigiang_btn_box'}}
                               style={styles.iconBoxModalFilter}
                        />
                        {item.choose &&
                        <Image source={{uri: 'teacher_huongdanbaigiang_icon_tick'}}
                               style={styles.iconTickModalFilter}
                        />
                        }
                    </View>
                    <Text style={styles.textItemModalFilter}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    };

    return (
        <Modal visible={true} animationType={'slide'} transparent={true}>
            <SafeAreaView style={styles.container}>
                <View style={styles.containerContent}>
                    <View style={styles.viewButtonCancel}>
                        <TouchableOpacity style={styles.buttonCancel} onPress={_showModalFilter}>
                            <Text style={styles.textCancel}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewContent}>
                        <View style={styles.viewLeftContentModalFilter}>
                            <Text style={styles.texTitleModalFilter}>Độ khó</Text>
                            {
                                dataLevel.map((item, index) => _renderItem(item, index, dataLevel))
                            }
                        </View>
                        <View style={styles.viewLeftContentModalFilter}>
                            <Text style={styles.texTitleModalFilter}>Kỹ năng</Text>
                            {
                                dataSkill.map((item, index) => _renderItem(item, index, dataSkill))
                            }
                        </View>
                    </View>
                    <View style={styles.viewButton}>
                        <TouchableOpacity style={styles.buttonDeleteFilter} onPress={_deleteFilter}>
                            <Text style={{...styles.textButton, color: '#00b9b6'}}>Xóa bộ lọc</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonConfirm} onPress={_showModalFilter}>
                            <LinearGradient
                                colors={['#00e1a0', '#00b9b7']}
                                start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                                style={styles.gradientButtonConfirm}
                            >
                                <Text style={{...styles.textButton, color: '#fff'}}>Áp dụng</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
};

export default ModalFilter;
