import React, {} from 'react';
import {View, Text, Image, TouchableOpacity, Share} from 'react-native';
import styles from "./style";
import SmartScreenBase from "../../../component/base/SmartScreenBase";

const HeaderLecture = (props) => {
    const _goBack = () => {
        props.navigation.goBack();
    };

    return (
        <View style={styles.header}>
                <TouchableOpacity style={styles.buttonBack} onPress={_goBack}>
                    <Image
                        source={{uri: 'imageback'}}
                        style={styles.iconBack}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
        </View>
    )
};

export default HeaderLecture
