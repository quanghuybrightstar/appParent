import React, { useEffect, useRef } from 'react';
import { SafeAreaView, ImageBackground, View, Image, Animated, Text } from 'react-native';
import MyData from "../../component/MyData";
import styles from "./styles";
import { connect, useSelector } from "react-redux";
import SmartScreenBase from "../../base/SmartScreenBase";
import APIBase from "../../base/APIBase";
import API from '../../API/APIConstant';
import * as actions from "../../redux/actions/ActionAppLang";
import images from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import LogBase from '../../base/LogBase';
import device from '../../utils/device';
import FontBase from '../../base/FontBase';
const SplashScreen = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    useEffect(() => {
        SmartScreenBase.baseSetup();
        props.getAppLanguage(() => {
            Animated.timing(fadeAnim, {
                toValue: SmartScreenBase.smPercenWidth * 50,
                duration: 1000
            }).start();
        });

        setTimeout(() => {
            _checkLogin();
        }, 2000);
    }, []);

    const _checkLogin = async () => {
        if (dataLogin.jwt_token) {
            APIBase.updateJWT(dataLogin.jwt_token);
            APIBase.updateAccess_token(dataLogin.access_token);
            LogBase.log("====dataToLogin",dataLogin.dataToLogin)
            APIBase.dataLogin = dataLogin.dataToLogin
        }
        if (dataLogin.role === 'teacher') {
            props.navigation.navigate('TeacherApp');
            MyData.TokenUser.id = dataLogin.id;
            MyData.UserLogin = dataLogin;
        } else if (dataLogin.role === 'parent') {
            props.navigation.navigate(dataLogin.last_login ? 'ParentApp' : 'IntroScreen');
        } else if (dataLogin.role === 'student') {
            MyData.TokenUser.id = dataLogin.id;
            MyData.UserLogin = dataLogin;
            props.navigation.navigate('StudentApp');
        } else {
            props.navigation.navigate('LoginApp');
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={images.BACKGROUND_SPLASH}
                style={styles.container}
            >
                <View style={styles.viewLogo}>
                    <ImageBackground
                        source={images.LOGO}
                        style={styles.imgLogo}
                        resizeMode={'contain'}
                    />
                    <Image
                        source={{ uri: 'splash_dot_light' }}
                        style={styles.imgDotLight}
                        resizeMode={'contain'}
                    />
                </View>

                <View style={styles.viewLoading}>
                    <Animated.View style={{ ...styles.viewLoading, width: fadeAnim, overflow: 'hidden' }} >
                        <LinearGradient
                            colors={['#00E2A0','#F45FA4']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={{flex:1}}
                        />
                    </Animated.View>
                </View>
                <View style={{ position: 'absolute', bottom: SmartScreenBase.smPercenHeight*33 }}>
                    <Text style={{ color: '#000', fontFamily: FontBase.MyriadPro_Regular, fontSize: SmartScreenBase.smFontSize*45 }}>{"Version "+device.getVersion()+" - p"+MyData.buildPart}</Text>
                </View>
                {/*<Image*/}
                {/*    source={{uri: 'splash_line_light'}}*/}
                {/*    style={styles.imgLineLight}*/}
                {/*    resizeMode={'cover'}*/}
                {/*/>*/}
            </ImageBackground>
        </SafeAreaView>
    )
};
const mapStateToProps = state => ({
    userInfo: state.AuthStackReducer.dataLogin,
});

export default connect(mapStateToProps, actions)(SplashScreen)
