import React, { } from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './style'
const ComponentSetting = (props) => {
    const _checkTrue = (type) => {
        props.checkTrue(type)
    }
    return (
        <View style={styles.viewSetting}>
            <View style={styles.viewTitleSetting}>
                <Image source={{ uri: props.image }} style={styles.iconNotification} />
                <Text style={styles.titleSetting}>{props.title}</Text>
            </View>
            {
                props.status == '1' ?
                    <TouchableOpacity style={styles.buttonCheckSetting} onPress={() => { _checkTrue(props.type) }}>
                        <Image source={{ uri: 'student_setting_image2' }} style={styles.iconSetting} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.buttonCheckSetting} onPress={() => { _checkTrue(props.type)}}>
                        <Image source={{ uri: 'student_setting_image1' }} style={styles.iconSetting} />
                    </TouchableOpacity>
            }
        </View>
    )
};
export default ComponentSetting