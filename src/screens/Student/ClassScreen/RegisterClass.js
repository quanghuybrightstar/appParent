import React from 'react';
import {ImageBackground, Image, Text, TouchableOpacity} from 'react-native';
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from 'react-redux';

const RegisterClass = (props) => {
    const {navigation} = props;

    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    const _handleRegister = () => {
        navigation.navigate('registrationClassScreen');
    };

    return (
        <ImageBackground source={{uri: 'bgtuvung'}} style={styles.containerRegisterScreen}>
            <Image source={{uri: 'anhddht'}} style={styles.imageDDHTRegisterScreen}/>
            {dataLogin.role != 'parent' ?
            <Text style={styles.textContentRegisterScreen}>{`Bạn chưa tham gia lớp học nào\nHãy ấn `}<Text style={{fontWeight: '700'}}>Đăng ký lớp học</Text>{` để thêm lớp học`}</Text>
            :  <Text style={styles.textContentRegisterScreen}>{`Con chưa tham gia lớp học nào`}</Text> }
            {dataLogin.role != 'parent' && 
            <TouchableOpacity onPress={_handleRegister}>
                <LinearGradient colors={['#00E2A0', '#00B9B7']}
                                start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                                style={styles.buttonRegister}
                >
                    <Text style={styles.textButtonRegister}>Đăng ký lớp học</Text>
                </LinearGradient>
            </TouchableOpacity>
            }
        </ImageBackground>
    )
};

export default RegisterClass;
