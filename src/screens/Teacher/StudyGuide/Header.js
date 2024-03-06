import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

const Header = (props) => {
    const {goBack, _handleModalFilter, isHasFilter} = props;
    return (
        <LinearGradient
            colors={['#00e1a0', '#00b9b7']}
            start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
            style={styles.header}>
            <View style={styles.headerLeft}>
                <TouchableOpacity style={styles.buttonBack}
                                  onPress={goBack}
                >
                    <Image style={styles.iconBack}
                           source={{uri: 'imageback'}}/>
                </TouchableOpacity>

                <Text style={styles.title}>Hướng dẫn giảng dạy</Text>
            </View>
            {isHasFilter && <TouchableOpacity style={styles.buttonFilter} onPress={_handleModalFilter}>
                <Image source={{uri: 'loctopick'}}
                       style={styles.iconFilter}
                />
            </TouchableOpacity>}
        </LinearGradient>
    );
};

export default Header;
