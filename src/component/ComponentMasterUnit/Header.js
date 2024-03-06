import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from "./styles";

const Header = (props) => {
    const {navigation, title, icon, _onPress} = props;
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
                <Image style={styles.iconBack} source={{uri: 'imageback'}}/>
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.buttonRight} onPress={_onPress}>
                <Image style={styles.iconRight} source={{uri: icon}}/>
            </TouchableOpacity>
        </View>
    )
};

export default Header;
