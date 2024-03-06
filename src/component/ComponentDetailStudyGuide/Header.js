import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from "./styles";

const Header = (props) => {
    const {navigation, title, type, _handleRotateImage} = props;
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
                <Image style={styles.iconBack}
                       source={{uri: 'imageback'}}/>
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            {type === 'img' &&
            <TouchableOpacity style={styles.buttonRotate} onPress={_handleRotateImage}>
                <Image style={styles.iconRotate}
                       source={{uri: 'rotate_image_study_guide'}}/>
            </TouchableOpacity>
            }
        </View>
    )
};

export default Header;
