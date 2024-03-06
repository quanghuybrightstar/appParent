import React, {useRef, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    SafeAreaView,
    Animated,
    Keyboard, TouchableWithoutFeedback, Alert
} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import HeaderOnlyBack from '../../../../Header/HeaderOnlyBack';
import API from "../../../../API/APIConstant";
import axios from 'axios';
import LoadingScreen from "../../../LoadingScreen";

const ListUnit = (props) => {
    const [code, setCode] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const scrollUp = useRef(new Animated.Value(SmartScreenBase.smPercenHeight * 20)).current;

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => {
        Animated.spring(scrollUp, {
            toValue: SmartScreenBase.smPercenHeight * 4,
            duration: 100
        }).start();
    };

    const _keyboardDidHide = () => {
        Animated.spring(scrollUp, {
            toValue: SmartScreenBase.smPercenHeight * 20,
            duration: 100
        }).start();
    };

    const _handleCode = (text) => {
        setCode(text);
    };

    const _submit = async () => {
        setLoading(true);
        Keyboard.dismiss();
        const url = API.baseurl + API.confirmRelationship;
        const headers = {...API.header, 'Content-Type': 'application/x-www-form-urlencoded'};
        const qs = require('qs');
        const data = qs.stringify({code});
        try {
            const res = await axios({method: 'post', data, url, headers});
            setLoading(false);
            Alert.alert('Thông báo', res.data.msg,
                [
                    {text: "Đồng ý", onPress: () => console.log("OK Pressed")}
                ],
                {cancelable: false})
        } catch (e) {
            setLoading(false);
            Alert.alert('Thông báo', 'Mã liên kết gửi lên không chính xác.',
                [
                    {text: "Đồng ý", onPress: () => console.log("OK Pressed")}
                ],
                {cancelable: false})
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground source={{uri: 'imagebackground'}} style={{flex: 1}}>
                {
                    loading ? <LoadingScreen/> :
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <HeaderOnlyBack
                                    title={'Liên kết tài khoản'}
                                    navigation={props.navigation}
                                />
                                <Animated.View style={{flex: 1, alignItems: 'center', paddingTop: scrollUp}}>
                                    <Text style={{
                                        paddingHorizontal: SmartScreenBase.smPercenWidth * 12,
                                        color: '#f6f7f7',
                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                        textAlign: 'center',
                                        fontWeight: '700'
                                    }}>
                                        Nếu bạn được người khác gửi mã liên kết, hãy nhập vào đây để liên kết tài khoản
                                    </Text>

                                    <View style={{
                                        width: SmartScreenBase.smPercenWidth * 80,
                                        height: SmartScreenBase.smPercenHeight * 8.5,
                                        backgroundColor: '#bfe8ed',
                                        marginTop: SmartScreenBase.smPercenHeight * 5,
                                        borderRadius: SmartScreenBase.smPercenWidth * 10,
                                        alignItems: 'center', flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            width: SmartScreenBase.smPercenHeight * 7,
                                            height: SmartScreenBase.smPercenHeight * 7,
                                            marginLeft: SmartScreenBase.smPercenHeight * 0.75,
                                            alignItems: 'center', justifyContent: 'center',
                                            backgroundColor: '#f2fafd', borderRadius: SmartScreenBase.smPercenWidth * 10
                                        }}>
                                            <Image
                                                source={{uri: 'layers'}}
                                                style={{width: '50%', height: '50%'}}
                                                resizeMode={'contain'}
                                            />
                                        </View>
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                padding: 0,
                                                marginHorizontal: SmartScreenBase.smPercenWidth * 3,
                                                fontSize: SmartScreenBase.smPercenWidth * 4
                                            }}
                                            placeholder={'Mã liên kết'}
                                            placeholderTextColor={'#7b90a6'}
                                            value={code}
                                            onChangeText={_handleCode}
                                        />
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            width: SmartScreenBase.smPercenWidth * 80,
                                            height: SmartScreenBase.smPercenHeight * 8.5,
                                            backgroundColor: '#fff',
                                            marginTop: SmartScreenBase.smPercenHeight * 4,
                                            borderRadius: SmartScreenBase.smPercenWidth * 10,
                                            alignItems: 'center', justifyContent: 'center'
                                        }}
                                        disabled={!code}
                                        onPress={_submit}
                                    >
                                        <Text style={{color: '#707171', fontSize: SmartScreenBase.smPercenWidth * 5}}>Xác
                                            nhận</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                        </TouchableWithoutFeedback>
                }
            </ImageBackground>
        </SafeAreaView>
    );
};

export default ListUnit;
