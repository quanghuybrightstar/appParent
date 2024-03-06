import React, {useState} from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList
} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
import {styles} from './styles';

const Student = (props) => {

    const [dataUnit, setDataUnit] = useState([
        {
            name: 'giáo trình sunday english khối 6'
        },
        {
            name: 'giáo trình mất gốc khối 6'
        }
    ]);

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.btnUnit}>
                    <Text style={styles.txtUnit}>{item.name}</Text>
            </TouchableOpacity>
        )
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.titleStudent}>Bạn hãy chọn giáo trình ưu tiên</Text>
                    <View style={styles.viewFlat}>
                        <FlatList data={dataUnit} renderItem={_renderItem} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default Student;
