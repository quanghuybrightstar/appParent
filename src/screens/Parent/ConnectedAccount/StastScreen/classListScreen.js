import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Alert,
    Dimensions,
    FlatList,
    ImageBackground,
    Image,
    Platform,
    ActivityIndicator
} from 'react-native';
import style from './style';
import axios from "axios";
import {TouchableOpacity} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {ActionDataClass} from '../../../../redux/actions/ActionDataClass';
import {ActionItemClass} from '../../../../redux/actions/ActionItemClass'
import {useSelector, useDispatch} from 'react-redux'
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';

const {width, height} = Dimensions.get('window');
let dataNew = [];
const classListScreen = ({navigation}) => {
    const [loading, setloading] = useState(true);
    const [indexdata, setindexdata] = useState(0);
    const [dataClass, setdataClass] = useState([]);
    const [jwt_Token, setjwt_Token] = useState('');
    const dispatch = useDispatch()
    useEffect(() => {
        _getDataQuestion();
    }, []);
    const _getDataQuestion = async () => {
        const url = API.baseurl+'api_class/my_classes?limit=10&offset=0';
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        try {
            setloading(false);
            const res = await axios({method: 'get', url: url, headers: header});
            let data = res.data;
            if (data.status) {
                dataNew = data.data,
                    dataNew.map((item, index) => {
                        item.checIdclass = false;
                        return dataNew;
                    });
                setdataClass(dataNew);
                await dispatch(ActionItemClass(dataNew));
                if (!dataNew.length) {
                    navigation.replace('BottomParents');
                }
            }
        } catch (error) {
            setloading(false);
            console.log(error.message);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
    };

    const _onClass = async (item, index) => {
        const dataClass_id = [...dataClass];
        let oj = {
            id_Class: dataClass_id[index].id,
            jwt_token: APIBase.jwt_token,
            className: item.class_name,
        }
        await dispatch(ActionDataClass(oj))
        navigation.navigate('BottomParents');
    }

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={style.StyleclassData} onPress={() => _onClass(item, index)}>
                <View style={style.Imageclass}>
                    <ImageBackground source={{uri: 'asset2'}}
                                     resizeMode='cover'
                                     imageStyle={{borderRadius: SmartScreenBase.smBaseWidth * 25}}
                                     style={style.styleImage}
                    />
                </View>
                <View style={style.title}>
                    <View style={style.classname}>
                        <Text numberOfLines={2}
                              style={{
                                  fontSize: 16,
                                  color: '#D71921',
                                  fontWeight:'bold',
                                  width: '80%',
                                  textAlign: 'center',
                              }}>
                            {item.class_name}
                        </Text>
                    </View>
                    <View style={style.titledate}>
                        <Text
                            style={style.txt1}>{item.start_time.split(" ").shift().split("-").reverse().join().replace(/,/gi, '/')}</Text>
                        <Text
                            style={style.txt1}> - {item.end_time.split(" ").shift().split("-").reverse().join().replace(/,/gi, '/')}</Text>
                    </View>
                    <View>
                        <Text numberOfLines={2} style={{color: '#FFF', fontWeight: 'bold', textAlign: 'center'}}>
                            {item.curriculum_name?item.curriculum_name.replace(/'/gi, ''):"Chưa có"}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <ImageBackground
            source={{uri: 'imagebackgroundhome'}}
            style={{flex: 1}}>
            <View
                style={{
                    width: '40%',
                    height: '13%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: SmartScreenBase.smPercenHeight * 3
                }}>
                <Image
                    resizeMode="contain"
                    source={{uri: 'logo'}}
                    style={{width: '80%', height: '80%'}}
                />
            </View>
            <Text style={{fontWeight: "bold", fontSize: 14, marginLeft: '5%', color: '#01DFD7'}}>
                DANH SÁCH LỚP HỌC
            </Text>
            {
                loading == false ?
                    <View
                        style={{
                            width: width,
                            height: height / 1.4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5,
                        }}>
                        <FlatList
                            data={dataClass}
                            width='90%'
                            renderItem={_renderItem}
                            keyExtractor={(index) => index.toString()}
                            scrollEnabled={true}
                        />
                    </View>
                    :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 2}}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                        <Text style={{color: '#fff'}}>Vui lòng chờ trong giây lát...</Text>
                    </View>
            }
        </ImageBackground>
    );
}
export default classListScreen;
