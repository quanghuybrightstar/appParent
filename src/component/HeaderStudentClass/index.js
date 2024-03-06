import React from 'react';
import {View, TouchableOpacity, Text, Image} from "react-native";
import styles from "./styles";
import styleApp from '../../styleApp/stylesApp';

const HeaderStudentClass = (props) => {
    const {navigation, title} = props;

    const _handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonBack} onPress={_handleGoBack}>
                <Image source={{uri: 'imageback'}} style={styles.iconBack}/>
            </TouchableOpacity>
            <Text style={[styleApp.txt_Title,{color:'#fff'}]} numberOfLines={1}>{title}</Text>
        </View>
    )
};

export default HeaderStudentClass;
