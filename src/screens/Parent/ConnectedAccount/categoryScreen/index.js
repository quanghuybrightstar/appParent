import React, { useSSpeakingtate, useEffect, useState } from 'react';
import {
    View,
    Text,
    Alert,
    Dimensions,
    FlatList,
    ImageBackground,
    Image,
    Platform,
    ActivityIndicator,
    ImagePropTypes,
} from 'react-native';
import style from './style';
import axios from "axios";
import { TouchableOpacity } from 'react-native';
import Header from '../../../../component/Header/Header';
import MyData from '../../../../component/MyData';
import { loadProcessTeacher } from '../../../../ReduxStudent/actions/Student/index';
import { useSelector, useDispatch } from 'react-redux'
import workDeliveredTeacherScreen from "../../workDeliveredTeacherScreen";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import ChooseStudentAction from "../../../../redux/actions/ChooseStudentAction";
import { LoadRank } from '../../../../ReduxStudent/actions/Student/index';
import API from '../../../../API/APIConstant';
import LoadingScreen from '../../../LoadingScreen';
import APIBase from '../../../../base/APIBase';

const { width, height } = Dimensions.get('window');
const categoryScreen = ({ navigation }) => {
    const [inforParent, setInforParent] = useState({})
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    console.log(dataLogin)
    useEffect(() => {
        let oj = {
            id: navigation.getParam('item').id
        }
        MyData.UserLogin = oj;
        _callData();
        _getDataParent()
    }, [])
    navigation.getParam('item')
    const _getDataParent = async () => {
        const url = API.baseurl + API.api_profile + navigation.getParam('item').id;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };

        try {
            const respone = await axios({ method: 'get', url, headers })
            // console.log(respone.data.parent_info)
            setInforParent(respone.data.parent_info)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('errCallInforParent', error.respone.data)
        }
    }
    const _callData = async () => {
        await dispatch(LoadRank())
    }
    const _onMarkScreen = () => {
        navigation.navigate('MarkExamStack');
    }

    const _onGiaoBaiscreen = () => {

    }
    const _onDiaryScreens = async (item) => {
        console.log('43211234', item);
        await dispatch(ChooseStudentAction(item));
        navigation.navigate('DiaryScreen', {
            fullName: item.fullname,
        });
    };

    const _moveProcess = () => {
        navigation.navigate('ProcessScreen')
    };

    const _moveChat = () => {
    };

    const _moveChatParent = () =>{
        if(inforParent){
        }else{
            Alert.alert('Thông báo', 'Chưa có phụ huynh nào', [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
        }
    }
    return (
        <ImageBackground
            style={style.container}
            source={{ uri: 'imagebackgroundlesson' }}>
            <Header title="Chi tiết học viên" navigation={navigation} />
            <View style={style.container}>
                <View style={style.hearder}>
                    <View style={style.Image_hearder}>
                        <ImageBackground source={{
                            uri: navigation.getParam('item').avatar == '' ? 'gv_liststudent_11' : navigation.getParam('item').avatar
                        }}
                            imageStyle={{ borderRadius: SmartScreenBase.smPercenWidth * 140 / 2, borderWidth: 1, borderColor: '#E5B007', resizeMode: 'cover' }}
                            style={{
                                height: SmartScreenBase.smBaseHeight * 140,
                                width: SmartScreenBase.smBaseHeight * 140,
                            }}
                        />
                    </View>
                    <View style={style.Information_hearder}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                            {navigation.getParam('item').fullname}
                        </Text>
                        <View style={{ marginTop: height / 50, }}>
                            <Text style={{ color: '#fff' }}>
                                {navigation.getParam('item').email}
                            </Text>
                        </View>
                        <View style={style.style_phoneNumber}>
                            <View>
                                <Image source={{ uri: 'student_profile_image3' }}
                                    style={style.Image_phoneNumber}
                                />
                            </View>
                            <Text style={{ color: '#fff' }}>
                                +84  {navigation.getParam('item').phone}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={style.body}>
                    <View style={style.listCategory}>
                        <TouchableOpacity onPress={_onGiaoBaiscreen}>
                            <Image source={{ uri: 'chitiet1' }}
                                style={style.Image_categore}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={_onMarkScreen}>
                            <Image source={{ uri: 'chitiet2' }}
                                style={style.Image_categore}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={style.listCategory}>
                        <TouchableOpacity onPress={() => _onDiaryScreens(navigation.getParam('item'))}>
                            <Image source={{ uri: 'chitiet3' }}
                                style={style.Image_categore}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => _moveProcess()}>
                            <Image source={{ uri: 'chitiet4' }}
                                style={style.Image_categore}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={style.listCategorybottom}>
                        <TouchableOpacity onPress={_moveChat}>
                            <Image source={{ uri: 'chitiet5' }}
                                style={style.Image_categore}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={_moveChatParent}>
                            <Image source={{ uri: 'nhanphhs' }}
                                style={style.Image_categore}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                loading &&
                <LoadingScreen />
            }
        </ImageBackground>
    );
}
export default categoryScreen;
