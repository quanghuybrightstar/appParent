import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {stylesHeader} from './styles';

const styles = stylesHeader;

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const Header = (props) => {

    const {title, showBack, icon} = props;

    return (
        <View style={styles.view_header}>
            <View style={styles.view_content}>
                {
                    showBack
                        ?
                        <TouchableOpacity
                            style={{
                                padding: 10, 
                                justifyContent: 'center', 
                                alignSelf: 'center'
                            }}
                            onPress={() => props.goBack()}
                        >
                            <Image
                                style={styles.img_back}
                                resizeMode={'contain'}
                                source={{uri: 'imageback'}}/>
                        </TouchableOpacity>
                        :
                        null
                }
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
            </View>
            {
                icon
                    ?
                    <TouchableOpacity
                        style={styles.btn_his}
                        onPress={() => {props.navigation.navigate('PracticeHistoryExam')}}
                    >
                        <Image source={{uri: 'lichsuluyenthi'}} resizeMode={'contain'}
                               style={styles.img_history}
                        />
                    </TouchableOpacity> :
                    null
            }

        </View>
    );
};

export default Header;
