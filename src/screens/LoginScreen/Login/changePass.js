import React, {useEffect, useRef, useState} from "react";
import {
    Text, View, ImageBackground, TouchableOpacity, Image, SafeAreaView, TextInput, Keyboard, Animated, Alert
} from "react-native";
import styles from "./styles";
import SmartScreenBase from "../../../base/SmartScreenBase";
import API from "../../../API/APIConstant";
import axios from 'axios';
import {useSelector} from "react-redux";
import LoadingScreen from "../../LoadingScreen";
import APIBase from "../../../base/APIBase";

const ChangePassScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const fadeAnim = useRef(new Animated.Value(SmartScreenBase.smPercenHeight * 22)).current;

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        }
    }, []);


    const _keyboardDidShow = (e) => {
        Animated.timing(fadeAnim, {
			...Platform.select({
				ios: {
					toValue: e.endCoordinates.height
				},
				android: {
					toValue: -SmartScreenBase.smPercenHeight * 2 - SmartScreenBase.smPercenWidth * 4.5,
				}
			}),
        
            duration: 10
        }).start();
    };

    const _keyboardDidHide = () => {
        Animated.timing(fadeAnim, {
            toValue: SmartScreenBase.smPercenHeight * 22,
            duration: 10
        }).start();
    };

    const _handleTextInput = (id, placeholder, value, _onChangeText) => {
        return (
            <View style={{
                width: SmartScreenBase.smPercenWidth * 65,
                borderBottomWidth: 1,
                borderColor: '#88b3bb',
                paddingVertical: SmartScreenBase.smPercenHeight,
                flexDirection: 'row',
                marginBottom: SmartScreenBase.smPercenHeight * 2,
                alignItems: 'center'
            }}>
                <Image
                    source={{uri: 'mhchung_icon_02'}}
                    style={{width: SmartScreenBase.smPercenWidth * 4.5, height: SmartScreenBase.smPercenWidth * 4.5}}
                    resizeMode={'contain'}
                />
                <TextInput
                    placeholder={placeholder}
                    style={{
                        padding: 0,
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                        color: '#fff',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                        width: '100%'
                    }}
                    placeholderTextColor={'#b6cbd3'}
                    selectionColor={'#fff'}
                    value={value}
                    onChangeText={(text) => _onChangeText(text)}
                    secureTextEntry={true}
                />
            </View>
        )
    };

    const _goBack = () => {
        props.navigation.goBack();
    };

    const _onSubmit = async () => {
        if (!currentPassword || !newPassword || !rePassword) {
            Alert.alert('Thông báo', 'Bạn cần điền đầy đủ thông tin',
                [{text: "Đồng ý", onPress: () => console.log("OK Pressed")}],
                {cancelable: false}
            )
        } else if (newPassword !== rePassword) {
            Alert.alert('Thông báo', 'Mật khẩu nhập lại chưa đúng',
                [{text: "Đồng ý", onPress: () => console.log("OK Pressed")}],
                {cancelable: false}
            )
        } else {
            Keyboard.dismiss();
            setLoading(true);
            const url = API.baseurl + API.addInfo;
       //     const headers = {...API.header, 'Content-Type': 'application/x-www-form-urlencoded', jwt_token};
            const qs = require('qs');
            const data = qs.stringify({
                old_password: currentPassword, password: newPassword, re_password: rePassword
            });
            try {
                const res = await APIBase.tokenAPI('put', url, data)
          //      await axios({method: 'put', url, headers, data});
                Alert.alert('Thông báo', res.data.status ? 'Đổi mật khẩu thành công' : res.data.msg,
                    [{text: "Đồng ý", onPress: () => _onConfirm(res.data.status)}],
                    {cancelable: false}
                );
                setLoading(false);
            } catch (e) {
                console.log('update password', e);
                Alert.alert('Thông báo', 'Gửi yêu cầu không thành công',
                    [{text: "Đồng ý", onPress: () => console.log('ok')}],
                    {cancelable: false}
                );
                setLoading(false);
            }
        }
    };

    const _onConfirm = (status) => {
        if (status) {
            props.navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground style={{flex: 1}} source={{uri: 'base_bg'}}>
                {
                    loading ? <LoadingScreen/> :
                        <Animated.View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: fadeAnim}}>
                            <View style={[styles.formChungSty, {
                                paddingHorizontal: SmartScreenBase.smPercenWidth * 6,
                                justifyContent: 'space-around',
                                paddingVertical: SmartScreenBase.smPercenHeight * 7
                            }]}>
                                {_handleTextInput(1, 'Mật khẩu hiện tại', currentPassword, setCurrentPassword)}
                                {_handleTextInput(2, 'Mật khẩu mới', newPassword, setNewPassword)}
                                {_handleTextInput(3, 'Nhập lại mật khẩu', rePassword, setRePassword)}
                            </View>
                            <TouchableOpacity style={{
                                width: SmartScreenBase.smPercenWidth * 68, backgroundColor: '#01283a',
                                marginTop: SmartScreenBase.smPercenWidth * 10,
                                borderRadius: SmartScreenBase.smPercenWidth * 4,
                                alignItems: 'center', paddingVertical: SmartScreenBase.smPercenHeight * 2,
                            }}
                                              onPress={_onSubmit}
                            >
                                <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4.5, color: '#fff'}}>Gửi yêu
                                    cầu</Text>
                            </TouchableOpacity>

                            <View style={{
                                width: SmartScreenBase.smPercenWidth * 68,
                                marginTop: SmartScreenBase.smPercenWidth * 3,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        width: '100%', alignItems: 'center',
                                        paddingVertical: SmartScreenBase.smPercenHeight * 2,
                                        backgroundColor: '#f8fff7',
                                        borderRadius: SmartScreenBase.smPercenWidth * 4
                                    }}
                                    onPress={_goBack}
                                >
                                    <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4.5}}>Quay lại</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                }
            </ImageBackground>
        </SafeAreaView>
    )
};

export default ChangePassScreen
