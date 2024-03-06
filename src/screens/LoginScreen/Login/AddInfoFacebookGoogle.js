import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Alert,
    Animated, FlatList,
    Image,
    ImageBackground, Keyboard,
    SafeAreaView,
    Text, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import LoadingScreen from "../../LoadingScreen";
import SmartScreenBase from "../../../base/SmartScreenBase";
import styles from "./styles";
import API from "../../../API/APIConstant";
import axios from "axios";
import {ActionLogin} from "../../../redux/actions/ActionLogin";
import {ActionDataClass} from "../../../redux/actions/ActionDataClass";
import MyData from "../../../component/MyData";

const AddInfoFacebookGoogle = (props) => {
    const {params} = props.navigation.state;
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('male');
    const [fullName, setFullName] = useState('');
    const [school, setSchool] = useState('');
    const [grade, setGrade] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalGender, setModalGender] = useState(false);
    const [dataRole, setDataRole] = useState([
        {role: 'Học sinh', value: 'student', choose: true},
        {role: 'Giáo viên', value: 'teacher', choose: false},
        {role: 'Phụ huynh', value: 'parent', choose: false},
    ]);
    const fadeAnim = useRef(new Animated.Value(SmartScreenBase.smPercenHeight * 24)).current;

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        }
    }, []);

    useEffect(() => {
        params.email && setEmail(params.email);
    }, []);


    const _keyboardDidShow = (e) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 10
        }).start();
    };

    const _keyboardDidHide = () => {
        Animated.timing(fadeAnim, {
            toValue: SmartScreenBase.smPercenHeight * 24,
            duration: 10
        }).start();
    };

    const _handleTextInput = (icon, placeholder, value, _onPress) => {
        return (
            <TouchableWithoutFeedback onPress={_onPress}>
                <View style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: '#88b3bb',
                    paddingVertical: SmartScreenBase.smPercenHeight,
                    flexDirection: 'row',
                    marginBottom: SmartScreenBase.smPercenHeight * 2,
                    alignItems: 'center'
                }}>
                    <Image
                        source={{uri: icon}}
                        style={{
                            width: SmartScreenBase.smPercenWidth * 4.5, height: SmartScreenBase.smPercenWidth * 4.5,
                            tintColor: '#e6edf0'
                        }}
                        resizeMode={'contain'}
                    />
                    <TextInput
                        placeholder={placeholder}
                        style={{
                            padding: 0,
                            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                            color: '#e6edf0',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                            width: '100%'
                        }}
                        placeholderTextColor={'#b6cbd3'}
                        selectionColor={'#fff'}
                        value={value}
                        keyboardType={placeholder === 'Khối' ? 'number-pad' : 'default'}
                        onChangeText={(text) => _onPress(text)}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    };

    const _setGrade = (text) => {
        if (!text || (parseInt(text) <= 12 && parseInt(text) >= 1)) {
            setGrade(text);
        }
    };

    const _handleButtonRadio = useCallback((value, _setGender) => {
        return (
            <TouchableWithoutFeedback onPress={_setGender}>
                <View style={{
                    width: '47%', flexDirection: 'row', borderColor: '#88b3bb', borderBottomWidth: 1,
                    alignItems: 'center', paddingBottom: SmartScreenBase.smPercenHeight
                }}>
                    <Image
                        source={{uri: value === gender ? 'mhchung_icon_10' : 'mhchung_icon_08'}}
                        style={{
                            width: SmartScreenBase.smPercenWidth * 5, height: SmartScreenBase.smPercenWidth * 5,
                            tintColor: '#e6edf0'
                        }}
                        resizeMode={'contain'}
                    />
                    <Text style={{
                        color: '#e6edf0', fontSize: SmartScreenBase.smPercenWidth * 4,
                        marginLeft: SmartScreenBase.smPercenWidth * 3
                    }}>{value === 'male' ? 'Nam' : 'Nữ'}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }, [gender]);

    const _handleModalSelect = () => {
        return (
            <TouchableWithoutFeedback onPress={() => setModalGender(false)}>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    alignItems: 'flex-end',
                    width: '100%',
                    zIndex: 1,
                }}>
                    <View style={{
                        backgroundColor: styles.btnBgColor2,
                        minWidth: SmartScreenBase.smPercenWidth * 25,
                        borderRadius: SmartScreenBase.smPercenWidth * 2,
                        marginTop: SmartScreenBase.smPercenHeight,
                        maxHeight: SmartScreenBase.smPercenHeight * 12.5
                    }}>
                        <FlatList
                            data={dataRole}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={_renderItem}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    };

    const _renderItem = ({item, index}) => {
        return (
            <TouchableWithoutFeedback onPress={() => _selectRole(index)}>
                <View style={{alignItems: 'center', paddingVertical: SmartScreenBase.smPercenHeight * 0.5}}>
                    <Text style={{fontSize: styles.textSSize, color: styles.textColorGray}}>{item.role}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    };

    const _selectRole = (index) => {
        const data = [...dataRole];
        data.map(item => item.choose = false);
        data[index].choose = true;
        setDataRole(data);
        setModalGender(false);
    };

    const _renderSchool = () => {
        const role = dataRole.find(item => item.choose).value;
        switch (role) {
            case "student":
                return <View style={{
                    width: '100%', marginTop: SmartScreenBase.smPercenHeight * 2,
                    height: SmartScreenBase.smPercenHeight * 5.5, flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <View style={{width: '47%'}}>
                        {_handleTextInput('mhchung_icon_06', 'Khối', grade, _setGrade)}
                    </View>
                    <View style={{width: '47%'}}>
                        {_handleTextInput('mhchung_icon_05', 'Trường', school, setSchool)}
                    </View>
                </View>;
            case "teacher":
                return <View style={{
                    width: '100%', marginTop: SmartScreenBase.smPercenHeight * 2,
                    height: SmartScreenBase.smPercenHeight * 5.5,
                }}>
                    {_handleTextInput('mhchung_icon_05', 'Trường', school, setSchool)}
                </View>;
            case "parent":
                return null;
            default:
                return null;
        }
    };

    const _goBack = () => {
        props.navigation.goBack();
    };

    const _loginFacebook = async (role) => {
        const url = API.baseurl + API.loginFacebook;
        const headers = {...API.header, 'Content-Type': 'application/json'};
        const data = {
            access_token: params.accessToken,
            fullname: fullName,
            email,
            gender,
            user_role: role,
            class: grade,
            school
        };
        try {
            await axios({method: 'post', url, headers, data});
            Alert.alert('Thông báo', 'Bạn vui lòng vào email kích hoạt tài khoản để sử dụng app',
                [{text: "Đã hiểu", onPress: _goBack}],
                {cancelable: false}
            );
            setLoading(false);
        } catch (e) {
            console.log('login facebook', e);
            Alert.alert('Thông báo', 'Đăng ký tài khoản không thành công. Xin hãy thử lại.',
                [{text: "Đồng ý", onPress: () => console.log("OK Pressed")}],
                {cancelable: false}
            );
            setLoading(false);
        }
    };

    const _loginGoogle = async (role) => {
        const url = API.baseurl + API.loginGoogle;
        const headers = {...API.header, 'Content-Type': 'application/json'};
        const data = {
            access_token: params.accessToken,
            id_token: params.idToken,
            fullname: fullName,
            email,
            gender,
            user_role: role,
            class: grade,
            school
        };
        try {
            const res = await axios({method: 'post', url, headers, data});
            if(res.data.status){
                if (email !== params.email) {
                    Alert.alert('Thông báo', 'Bạn vui lòng vào email kích hoạt tài khoản để sử dụng app',
                        [{text: "Đã hiểu", onPress: _goBack}],
                        {cancelable: false}
                    );
                } else {
                    if (res.data.data_user.role === 'teacher') {
                        await this.props.dispatch(ActionLogin(res.data.data_user));
                        await this.props.dispatch(ActionDataClass({jwt_token: res.data.jwt_token}));
                        await this.props.navigation.navigate('App');
                    } else if (res.data.data_user.role === 'parent') {
                        await this.props.dispatch(ActionLogin(res.data.data_user));
                        await this.props.dispatch(ActionDataClass({jwt_token: res.data.jwt_token}));
                        await this.props.navigation.navigate('ListenParentchild');
                    } else if (res.data.data_user.role === 'student') {
                        MyData.TokenUser.id = res.data.data_user.id;
                        MyData.UserLogin = res.data.data_user;
                        let dataRedux = res.data.data_user;
                        dataRedux['jwt_token'] = res.data.jwt_token;
                        await this.props.dispatch(ActionLogin(dataRedux));
                        await this.props.dispatch(ActionDataClass({jwt_token: res.data.jwt_token}));
                        this.props.navigation.navigate('StudentApp');
                    }
                }
            }
            setLoading(false);
        } catch (e) {
            console.log('login google', e);
            Alert.alert('Thông báo', 'Đăng ký tài khoản không thành công. Xin hãy thử lại.',
                [{text: "Đồng ý", onPress: () => console.log("OK Pressed")}],
                {cancelable: false}
            );
            setLoading(false);
        }
    };

    const _loginApple = async (role) => {
        const url = API.baseurl + API.loginApple;
        const headers = {...API.header, 'Content-Type': 'application/json'};
        const data = {
            identityToken: params.identityToken,
            fullname: fullName,
            email,
            gender,
            user_role: role,
            class: grade,
            school
        };
        try {
            const res = await axios({method: 'post', url, headers, data});
            if(res.data.status){
                if (email !== params.email) {
                    Alert.alert('Thông báo', 'Bạn vui lòng vào email kích hoạt tài khoản để sử dụng app',
                        [{text: "Đã hiểu", onPress: _goBack}],
                        {cancelable: false}
                    );
                } else {
                    if (res.data.data_user.role === 'teacher') {
                        await this.props.dispatch(ActionLogin(res.data.data_user));
                        await this.props.dispatch(ActionDataClass({jwt_token: res.data.jwt_token}));
                        await this.props.navigation.navigate('App');
                    } else if (res.data.data_user.role === 'parent') {
                        await this.props.dispatch(ActionLogin(res.data.data_user));
                        await this.props.dispatch(ActionDataClass({jwt_token: res.data.jwt_token}));
                        await this.props.navigation.navigate('ListenParentchild');
                    } else if (res.data.data_user.role === 'student') {
                        MyData.TokenUser.id = res.data.data_user.id;
                        MyData.UserLogin = res.data.data_user;
                        let dataRedux = res.data.data_user;
                        dataRedux['jwt_token'] = res.data.jwt_token;
                        await this.props.dispatch(ActionLogin(dataRedux));
                        await this.props.dispatch(ActionDataClass({jwt_token: res.data.jwt_token}));
                        this.props.navigation.navigate('StudentApp');
                    }
                }
            }
            setLoading(false);
        } catch (e) {
            console.log('login apple', e);
            Alert.alert('Thông báo', 'Đăng ký tài khoản không thành công. Xin hãy thử lại.',
                [{text: "Đồng ý", onPress: () => console.log("OK Pressed")}],
                {cancelable: false}
            );
            setLoading(false);
        }
    };

    

    const _onSubmit = async () => {
        const role = dataRole.find(item => item.choose).value;
        if (!fullName || !email || (role === 'student' && !grade && !school) || (role === 'teacher' && !school)) {
            Alert.alert('Thông báo', 'Bạn cần điền đầy đủ thông tin',
                [{text: "Đồng ý", onPress: () => console.log("OK Pressed")}],
                {cancelable: false}
            )
        } else {
            Keyboard.dismiss();
            setLoading(true);
            if(!!params.identityToken){
                _loginApple(role);
                return;
            }
            if (!params.email) {
                _loginFacebook(role);
            } else {
                _loginGoogle(role);
            }
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground style={{flex: 1}} source={{uri: 'base_bg'}}>
                {loading ? <LoadingScreen/> :
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 85,
                            height: SmartScreenBase.smPercenWidth * 11,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: styles.btnBgColor2,
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                            marginTop: SmartScreenBase.smPercenHeight * 5,
                            paddingLeft: SmartScreenBase.smPercenWidth * 3
                        }}>
                            <Text style={{
                                fontSize: styles.textSSize,
                                marginRight: SmartScreenBase.smPercenWidth * 10,
                                color: '#01283a',
                                fontWeight: '700'
                            }}>Chọn loại tài khoản :</Text>
                            <TouchableWithoutFeedback onPress={() => setModalGender(!modalGender)}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{
                                        fontSize: styles.textSSize,
                                        color: '#01283a'
                                    }}>{dataRole.find(item => item.choose).role}</Text>
                                    <Image style={{
                                        width: SmartScreenBase.smPercenWidth * 10,
                                        height: SmartScreenBase.smPercenWidth * 10,
                                        tintColor: '#01283a',
                                        resizeMode: 'contain',
                                        transform: [{rotate: modalGender ? '180deg' : '0deg'}]
                                    }} source={{uri: 'dropdown'}}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.formChungSty, {
                            width: SmartScreenBase.smPercenWidth * 85, alignItems: 'center',
                            padding: SmartScreenBase.smPercenWidth * 5, minHeight: SmartScreenBase.smPercenHeight * 30,
                            paddingTop: SmartScreenBase.smPercenHeight * 5.5
                        }]}>
                            {modalGender ? _handleModalSelect() : null}
                            <View style={{
                                width: '100%',
                                height: SmartScreenBase.smPercenHeight * 5.5
                            }}>
                                {_handleTextInput('mhchung_icon_01', 'Họ và tên', fullName, setFullName)}
                            </View>

                            <View style={{
                                width: '100%', marginTop: SmartScreenBase.smPercenHeight * 2,
                                height: SmartScreenBase.smPercenHeight * 5.5,
                            }}>
                                {_handleTextInput('mhchung_icon_03', 'Email', email, setEmail)}
                            </View>

                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between', width: '100%',
                                marginTop: SmartScreenBase.smPercenHeight * 2
                            }}>
                                {_handleButtonRadio('male', () => setGender('male'))}
                                {_handleButtonRadio('female', () => setGender('female'))}
                            </View>

                            {_renderSchool()}
                        </View>

                        <TouchableOpacity
                            style={{
                                width: SmartScreenBase.smPercenWidth * 68, alignItems: 'center',
                                paddingVertical: SmartScreenBase.smPercenHeight * 2,
                                backgroundColor: '#01283a', marginTop: SmartScreenBase.smPercenHeight * 3,
                                borderRadius: SmartScreenBase.smPercenWidth * 4,
                            }}
                            onPress={_onSubmit}
                        >
                            <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4.5, color: '#fff'}}>Hoàn tất</Text>
                        </TouchableOpacity>

                        <Animated.View
                            style={{
                                marginTop: SmartScreenBase.smPercenHeight * 2,
                                borderBottomWidth: 1, borderColor: '#fff',
                                marginBottom: fadeAnim
                            }}
                        >
                            <TouchableOpacity
                                onPress={_goBack}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                        fontStyle: 'italic'
                                    }}
                                >Quay lại</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                }
            </ImageBackground>
        </SafeAreaView>
    )
};

export default AddInfoFacebookGoogle
