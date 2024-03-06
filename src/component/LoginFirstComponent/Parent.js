import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../base/SmartScreenBase';
import {styles} from './styles';

const Parent = ({navigation}) => {

    return (
        <ImageBackground
            source={{uri: 'imagebackgroundhome'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            <Image source={{uri: 'logo_gv'}} resizeMode={'contain'} style={styles.logo}/>
            <View style={styles.content}>
                <Image source={{uri: 'anh22'}} resizeMode={'contain'} style={styles.anh222}/>
                <View style={styles.viewTxt}>
                    <Text style={styles.txt}>
                        Bố/Mẹ hãy liên kết với tài khoản của con để bắt đầu nhận được báo cáo học tập và các thông tin
                        từ <Text style={{fontWeight: 'bold'}}>Sunday English</Text>
                    </Text>
                </View>
                <TouchableOpacity
                    style={{...styles.btnContact, position: 'absolute', bottom: SmartScreenBase.smPercenHeight * 17}}
                >
                    <Text style={styles.txt}>Liên kết tài khoản</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default Parent;
