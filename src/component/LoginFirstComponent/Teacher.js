import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../base/SmartScreenBase';
import {styles} from './styles';

const Teacher = ({navigation}) => {

    return (
        <ImageBackground
            source={{uri: 'imagebackgroundhome'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            <Image source={{uri: 'logo_gv'}} resizeMode={'contain'} style={styles.logo}/>
            <View style={styles.content}>
                <Image source={{uri: 'anh23'}} resizeMode={'contain'} style={styles.anh22}/>
                <View style={styles.viewTxt}>
                    <Text style={styles.txt}>
                        Thầy/Cô chưa có lớp học nào. Hãy liên hệ <Text style={{fontWeight: 'bold'}}>Sunday
                        English</Text> để được hỗ trợ tạo lớp
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.btnContact}
                >
                    <Text style={styles.txt}>Liên hệ</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default Teacher;
