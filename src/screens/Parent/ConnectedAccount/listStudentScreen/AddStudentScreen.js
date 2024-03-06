import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Animated, Keyboard,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Image, Alert,
    ScrollView, Modal,
} from 'react-native';

const { width, height } = Dimensions.get('window');
import SmartScreenBase from '../../../../base/SmartScreenBase';
import style from './style';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import registrationClassScreen from '../../../Student/registrationClassScreen';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';

const AddStudentScreen = ({ navigation}) => {
    const [Studentkey, setStudentkey] = useState('');
    const [questionData, setquestionData] = useState(navigation.getParam('questionData'));
    const [visible, setvisible] = useState(false);
    const [error, seterror] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
    const [studentInformation, setstudentInformation] = useState(false);
    const [addInformation, setaddInformation] = useState({});
    const storeRedux = useSelector(state => state.AuthStackReducer.dataClass);

    useEffect(() => {
        console.log('storeRedux',storeRedux);
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    }, []);
    const _keyboardDidShow = () => {
        Animated.timing(fadeAnim, {
            toValue: height / 4.5,
            duration: 500,
        }).start();

    };

    const _keyboardDidHide = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
        }).start();
    };
    const _onSubmit = async () => {
        let url = API.baseurl + 'api_user/code?user_code=' + Studentkey;
        // const headers = {
        //     'Content-Type': 'application/json',
        //     jwt_token: storeRedux.jwt_token,
        //     'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
        //     Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        // };
        try {
            const res = await APIBase.postDataJson('get', url);
            if (res.data.status) {
                console.log('res.data',res.data.user_data);
                setaddInformation(res.data.user_data);
                setstudentInformation(true);
            } else {
                console.log('err');
                seterror(res.data.msg);
            }
        } catch (error) {
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }else{
                seterror("Thêm học sinh không thành công, lỗi "+error.message);
            }
        }
    };
    const _Addstudent = async () =>{
        let url = API.baseurl + 'api_class/add_student';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            jwt_token: APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        let data = {
            'user_code': Studentkey,
            'class_id': storeRedux.id_Class,
        };

        try {
            const res = await axios({ method: 'post', url, headers, data });
            if (res.data.status) {
                Alert.alert('Thông báo', 'Thêm học viên thành công');
                console.log('res.data',res.data);
                setstudentInformation(false);
            } else {
                console.log('Thông báo: ',res.data.status);
                setstudentInformation(false);
            }
        } catch (error) {
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }else{
                seterror("Thêm học sinh không thành công, lỗi "+error.message);
            }
        }
    };

    const _onGoBack = () => {
        console.log('12345', navigation.state.params);
        navigation.state.params.questionData();
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '8%',
                width: width,
                backgroundColor: '#0B0B6195',
                flexDirection: 'row',
            }}>
                <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{
                        width: SmartScreenBase.smPercenWidth * 5,
                        height: SmartScreenBase.smPercenWidth * 5,
                    }}
                    onPress={_onGoBack}
                    >
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                        }}
                        resizeMode={'contain'}
                        source={{ uri: 'imageback' }} />
                    </TouchableOpacity>

                    <Text style={{
                        color: 'white',
                        marginLeft: SmartScreenBase.smPercenWidth * 3,
                        fontWeight: '800',
                        fontSize: SmartScreenBase.smPercenWidth * 5,
                    }}>Thêm Học Viên</Text>
                </View>
            </View>
            <Animated.View style={{ bottom: fadeAnim }}>
                <ImageBackground style={{
                    width: '100%',
                    height: height / 2.5,
                }}
                resizeMode={'stretch'}
                source={{ uri: 'addstudent1' }}>
                    <LinearGradient colors={['#ffffff10', '#ffffff50', '#FFFFFF']}
                        style={{
                            marginTop: height / 2.5 - (height / 2.5) / 3 + 2,
                            height: (height / 2.5) / 3,
                            width: width,
                        }} />
                </ImageBackground>
                <View style={{
                    height: height / 3,
                    backgroundColor: '#ffffff',
                }}>

                    <View style={{
                        marginTop: SmartScreenBase.smPercenHeight * 3,
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 20,
                        alignItems: 'center',
                    }}>
                        <Text style={{ textAlign: 'center' }}>
                            Nhập mã học viên muốn thêm
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 80,
                            height: SmartScreenBase.smBaseHeight * 60,
                            borderRadius: SmartScreenBase.smPercenWidth * 7,
                            borderWidth: 1,
                            flexDirection: 'row',
                            borderColor: '#4bf7ff',
                            marginTop: SmartScreenBase.smBaseHeight * 30,
                        }}>
                            <View style={{
                                width: SmartScreenBase.smBaseHeight * 80,
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Image style={{
                                    width: SmartScreenBase.smBaseHeight * 40,
                                    height: SmartScreenBase.smBaseHeight * 40,
                                }}
                                resizeMode={'contain'}
                                source={{ uri: 'gv_93' }}/>
                            </View>

                            <TextInput style={{
                                height: '100%',
                                width: '60%',
                                fontWeight: '400',
                                fontSize: 16,
                                color: '#000',
                                padding: 0,
                            }}
                            onSubmitEditing={Keyboard.dismiss}
                            placeholder="Nhập mã học viên..."
                            underlineColorAndroid="transparent"
                            placeholderTextColor="gray"
                            onChangeText={(Studentkey) => {
                                setStudentkey(Studentkey);
                            }}
                            onFocus={() => {
                                seterror("");
                            }}
                            />
                            <View style={{
                                width: 70,
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {error != "" &&
                                <Image style={{
                                    width: SmartScreenBase.smBaseHeight * 40,
                                    height: SmartScreenBase.smBaseHeight * 40,
                                    tintColor: 'red',
                                }}
                                resizeMode={'contain'}
                                source={{ uri: 'mhchung_icon_11' }}
                                />
                                }
                            </View>
                        </View>
                        {
                            error != "" && <View style={{ alignItems: 'center', marginTop: SmartScreenBase.smBaseHeight * 30 }}>
                                <Text style={{
                                    color: 'red',
                                    fontWeight: '400',
                                    fontSize: 14,
                                    marginLeft: 20,
                                    textAlign: 'center',
                                }}>{error}</Text>
                            </View>
                        }
                    </View>
                </View >
            </Animated.View>
            <View style={{
                bottom: SmartScreenBase.smBaseHeight * 60,
                height: SmartScreenBase.smBaseHeight * 60,
                width: width,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TouchableOpacity style={{
                    backgroundColor: '#00283A',
                    height: SmartScreenBase.smBaseHeight * 60,
                    width: SmartScreenBase.smPercenWidth * 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                }}
                onPress={() => {
                    _onSubmit();
                }}
                >
                    <Text style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}>KIỂM TRA</Text>
                </TouchableOpacity>
            </View>
            <Modal
                // onPress={() => _onbackshow()}
                animationType="slide"
                transparent={true}
                visible={studentInformation}
            >
                <View style={{
                    height: height,
                    width: width,
                    backgroundColor: '#00000065',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <View style={style.stylemodal}>
                        <ImageBackground source={{ uri: addInformation.avatar === null ? 'gv_liststudent_11' : addInformation.avatar}}
                            imageStyle={{ borderRadius: SmartScreenBase.smPercenWidth * 20 / 2, borderWidth: 1, borderColor: '#E5B007', resizeMode:'cover'}}
                            style={style.styleAvataradd}
                        />
                        <View style={style.txtinfornatin}>
                            <Text style={style.txtfullname}>
                                {addInformation.fullname}
                            </Text>
                            <Text style={style.txtegmail}>
                                {addInformation.email}
                            </Text>
                            <View style={style.viewphone}>
                                <View>
                                    <Image source={{ uri: 'student_profile_image3' }}
                                        style={style.Image_phoneNumber}
                                    />
                                </View>
                                <Text style={style.txtphone}>
                                    {addInformation.phone}
                                </Text>
                            </View>
                        </View>
                        <View style={style.styleTouchableOpacity}>
                            <TouchableOpacity style={{
                                backgroundColor: '#00283A',
                                height: SmartScreenBase.smBaseHeight * 45,
                                width: SmartScreenBase.smPercenWidth * 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 20,
                            }}
                            onPress={() => {
                                setstudentInformation(false);
                            }}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: '#00283A',
                                height: SmartScreenBase.smBaseHeight * 45,
                                width: SmartScreenBase.smPercenWidth * 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 20,
                            }}
                            onPress={() => {
                                _Addstudent();
                            }}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>Thêm vào lớp</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
};

export default registrationClassScreen;
