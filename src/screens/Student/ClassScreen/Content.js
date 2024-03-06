import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import styles from "./styles";

const Content = (props) => {
    const {navigation, id} = props;
    const [onPressAct, setOnPress] = React.useState(-1)

    const _renderItem = (index, uri, text, screen) => {
        return (
            <TouchableOpacity style={styles.viewItemContent} 
            onPress={() => _handleItem(screen)}
            onPressIn={()=>{setOnPress(index)}}
            onPressOut={()=>{setOnPress(-1)}}>
                <Image
                    source={{uri}}
                    style={styles.iconItemContent}
                />
                <View style={[styles.viewTextItemContent, onPressAct != index && styles.shawdow]}>
                    <Text style={styles.textItemContent}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    const _handleItem = (screen) => {
        navigation.navigate(screen, {id});
    };

    return (
        <View style={styles.containerContent}>
            {_renderItem(0 ,'hocvien_class_new2', 'Thành viên', 'ListStudentClass')}
            {_renderItem(1 ,'hocvien_class_new1', 'Bài tập', 'ExerciseStudent')}
            {_renderItem(2 ,'hocvien_class_new3', 'Bảng vàng', 'GoldBoard')}
            {_renderItem(3 ,'hocvien_class_new4', 'Vinh danh', 'Vinhdanh')}
            {_renderItem(4 ,'hocvien_class_new5', 'Chi tiết lớp học', 'ClassDetail')}
        </View>
    )
};

export default Content;
