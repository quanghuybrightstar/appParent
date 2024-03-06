/**
 * Sử dụng làm header màn hình login
 */

import * as React from 'react';
import { Image, ImageBackground, StyleSheet, View, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-navigation';
import images from '../../assets/images';
import SmartScreenBase, { STATUSBAR_HEIGHT } from '../../base/SmartScreenBase';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import LogBase from '../../base/LogBase';
import { ShortMainButton } from '../ShortMainButton';
import MyData from '../../component/MyData';
import API from '../../API/APIConstant';
import DataAPI from '../../component/DataAPI';

function HeaderLogin(props) {
    return (
        <SafeAreaView>
            <ImageBackground
                source={images.CITY_BACKGROUND1}
                style={{width: SmartScreenBase.screenWidth }}
                imageStyle={{opacity: 0.2, width: SmartScreenBase.screenWidth, tintColor:'#777777'}}
                resizeMode="contain"
            >
                <ShortMainButton
                    onPress={() => {
                        MyData.testSVCount = MyData.testSVCount + 1
                        console.log("isTestSV",MyData.testSVCount)
                        if(MyData.testSVCount == 3){
                            LogBase.isDebug = true
                            Alert.alert('Bật log')
                        }
                        if(MyData.testSVCount >= 5){
                            API.baseurl = MyData.ipTest+'/api/'
                            API.domain = MyData.ipTest+'/'
                            API.image_base_url = MyData.ipTest
                            Alert.alert('Đã truy cập server test')
                        }
                    }}
                    style={{opacity: 0}}
                    text={'test'}
                    type={1} />
                <Image
                    source={images.LOGO_WHITE}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={{height:70}} />
                <Image
                    source={images.PATH_LOGIN}
                    style={{tintColor: '#F3FFFF', width: SmartScreenBase.screenWidth, height: SmartScreenBase.smBaseHeight * 150}}
                    resizeMode="stretch"
                />
            </ImageBackground>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    linearGradient:{
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    logo: {
        width: SmartScreenBase.smBaseHeight * 200,
        height: SmartScreenBase.smBaseHeight * 130,
        position: 'absolute',
        left: -SmartScreenBase.smBaseHeight * 10
    },
});

export default HeaderLogin;
