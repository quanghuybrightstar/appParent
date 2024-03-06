// import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Alert,
    Dimensions,
    FlatList,
    ImageBackground,
    Image, ScrollView,
    Platform, Modal,
    ActivityIndicator, TextInput,
} from 'react-native';
import style from './style';
import AddStudentScreen from './AddStudentScreen';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ClassDetailScreen from './ClassDetailScreen';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import MyData from '../../../../component/MyData';
import LoginFirstComponentTeacher from '../../../../component/LoginFirstComponent/Teacher';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';

const {width, height} = Dimensions.get('window');
let dataNew = [];
const listStudenScreen = (props) => {
    const {navigation} = props;
    const [jwtToken, setjwtToken] = useState(navigation.getParam('jwt_Token'));
    const [loading, setloading] = useState(true);
    const [listStuden, setlistStuden] = useState([]);
    const [show, setshow] = useState(false);
    const [className, setclassName] = useState('');
    const [deletestudent, setdeletestudent] = useState(false);
    const [dataStudent, setdataStudent] = useState(true);
    const [Numberdeletet, setNumberdeletet] = useState(0);
    const [dataDelete, setdataDelete] = useState([]);
    const [distSible, setdistSible] = useState(false);
    const [class_id, setclass_id] = useState(navigation.getParam('id_Class'));
    const storeRedux = useSelector(state => state.AuthStackReducer.dataClass);
    const itemClass = useSelector(state => state.AuthStackReducer.itemClass);
    const [ID] = useState(storeRedux.id_Class);
    // useEffect(() => {
    //     _getDataQuestion()

    // }, [])
    useEffect(() => {
        _getDataQuestions();
    }, [storeRedux.id_Class]);

    const _getDataQuestions = async () => {
        const url = API.baseurl+'api_class/students?limit=10&offset=0&class_id=' + storeRedux.id_Class;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {

            setloading(false);
            const res = await axios({method: 'get', url: url, headers: header});
            let data = res.data;
            if (data.status) {
                dataNew = data.data,
                    dataNew.map((item, index) => {
                        item.checkBox = false;
                        return dataNew;
                    });
                setlistStuden(dataNew);
            }
        } catch (error) {
            setloading(false);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
    };
    const _onChitietHS = (item) => {
        console.log(item);
        navigation.navigate('Category', {item: item});
    };
    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => _onChitietHS(item)} style={style.renderItemstuden}>
                <View>
                    <Text style={style.styleclassSTT}>
                        {index + 1}
                    </Text>
                </View>
                <View style={{marginHorizontal: '1.5%'}}>
                    <ImageBackground source={{uri: item.avatar == '' ? 'gv_liststudent_11' : item.avatar}}
                                     imageStyle={{
                                         borderRadius: SmartScreenBase.smPercenWidth * 20 / 2,
                                         borderWidth: 1,
                                         borderColor: '#E5B007',
                                         resizeMode: 'cover',
                                     }}
                                     style={style.styleAvatar}
                    />
                </View>
                <View style={{width: '55%'}}>
                    <Text numberOfLines={1}
                          style={{
                              fontSize: 16,
                              color: '#000000',
                              width: '95%',
                              textAlign: 'center',
                          }}>
                        {item.fullname}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const _renderDelete = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => _onCheckbox(index)} style={style.renderItemstuden}>
                <TouchableOpacity onPress={() => _onCheckbox(index)} style={style.CheckBoxs}>
                    <View style={{
                        height: 10,
                        width: 10,
                        borderRadius: 10,
                        backgroundColor: item.checkBox == false ? '#fff' : '#000',
                    }}/>
                </TouchableOpacity>

                <View style={{marginHorizontal: '5%'}}>
                    <ImageBackground source={{uri: item.avatar == '' ? 'gv_liststudent_08' : item.avatar}}
                                     imageStyle={{borderRadius: 30, borderWidth: 1, borderColor: '#E5B007'}}
                                     style={{height: 50, width: 50}}
                    />
                </View>
                <View style={style.fullname}>
                    <Text style={style.txtName}>
                        {item.fullname}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    const _onEditstudentlist = () => {
        setshow(true);
    };

    const _onDeletescreen = () => {
        setshow(false);
        setdataStudent(false);
        setdeletestudent(true);
    };
    const _onAddcreen = () => {
        setshow(false);
        navigation.navigate('AddStudentScreen', {
            questionData: _getDataQuestions,
        });
    };
    const _onapplyFor_class = () => {
        setshow(false);
        navigation.navigate('applyFor_class');
    };
    const _onCheckbox = (index) => {
        const copy = [...listStuden];
        copy[index].checkBox = !copy[index].checkBox;
        if (copy[index].checkBox == true) {
            setNumberdeletet(Numberdeletet + 1);
        } else {
            setNumberdeletet(Numberdeletet - 1);
        }
        setlistStuden(copy);
        listStuden.map((item) => {
            if (item.checkBox == true) {
                let datacopy = {};
                datacopy = item.id;
                dataDelete.push(datacopy);
            }
        });
        if (dataDelete.length == 0) {
            setdistSible(false);
        } else {
            setdistSible(true);
        }
    };

    const _onDeleteStudent = async () => {
        listStuden.map((item) => {
            if (item.checkBox == true) {
                let datacopy = {};
                datacopy = item.id;
                dataDelete.push(datacopy);
            }
        });
        let url = API.baseurl+'api_class/students';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            jwt_token: APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        let qs = require('qs');
        let data = qs.stringify({
            'id': storeRedux.id_Class,
            'students': JSON.stringify(dataDelete),
        });
        console.log('data: ', data);
        try {
            const res = await axios({method: 'delete', url, headers, data});
            console.log('res: ', res);
            if (res.data.status) {
                console.log('Thông báo');
                Alert.alert('Thông báo', 'Xóa học viên thành công');
                let list = [...listStuden];
                listStuden.forEach((element, index) => {
                    if (element.checkBox) {
                        list.splice(index, 1);
                    }
                });
                setlistStuden(list);
                setNumberdeletet(0);
                setdataStudent(true);
                listStuden.map((item) => {
                    item.checkBox = false;
                }),
                    setdistSible(false);
            } else {
                Alert.alert('Thông báo', 'Xóa học viên không thành công');
                console.log('errr');
            }
        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
    };

    const DatalistStuden = () => {
        return (
            <View>
                <View style={style.header}>
                    <View style={style.headertitle}>
                        <Text style={style.styleclassname}>
                            {storeRedux.className}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => _onEditstudentlist()} style={style.headerRight}>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 8,
                            height: SmartScreenBase.smPercenWidth * 8,
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'addstuden2'}}/>
                    </TouchableOpacity>
                </View>
                <View style={style.body}>
                    <View style={{top: '3%'}}>
                        <Text style={style.styleclasslist}>
                            Danh sách lớp
                        </Text>
                    </View>
                    {
                        loading == false ?
                            <View style={{
                                height: '90%',
                                alignItems: 'center',
                                marginTop: '6%',
                                paddingBottom: '3%',
                            }}>
                                <FlatList
                                    data={listStuden}
                                    width='95%'
                                    renderItem={_renderItem}
                                    keyExtractor={(index) => index.toString()}
                                    scrollEnabled={true}
                                    extraData={listStuden}
                                />
                            </View>
                            :
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 2}}>
                                <ActivityIndicator size="large" color="#0000ff"/>
                                <Text style={{color: '#0000ff'}}>Vui lòng chờ trong giây lát...</Text>
                            </View>
                    }
                </View>
            </View>
        );
    };

    const _onClassDetail = (ID) => {
        console.log('class_id: ', ID);
        setshow(false);
        navigation.navigate('ClassDetailScreen', {
            id_Class: ID,
        });
    };
    const _onCenter = () => {
        listStuden.map((item) => {
            if (item.checkBox == true) {
                item.checkBox = false;
            }
        });
        setNumberdeletet(0);
        setdistSible(false);
    };
    const _onHiddenshow = () => {
        setshow(false);
    };
    return (
        !itemClass.length
            ?
            <LoginFirstComponentTeacher/>
            :
            <ImageBackground
                source={{uri: 'imagebackgroundlesson'}}
                style={{flex: 1, marginTop: Platform.OS === 'ios' ? 35 : 0, resizeMode: 'stretch'}}>
                {
                    dataStudent
                        ?
                        DatalistStuden()
                        :
                        <View>
                            <View>
                                <View style={style.header}>
                                    <View style={{
                                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: width - width * 0.15,
                                    }}>
                                        <TouchableOpacity style={{
                                            width: SmartScreenBase.smPercenWidth * 5,
                                            height: SmartScreenBase.smPercenWidth * 5,
                                        }}
                                                          onPress={() => setdataStudent(true)}
                                        >
                                            <Image style={{
                                                width: SmartScreenBase.smPercenWidth * 5,
                                                height: SmartScreenBase.smPercenWidth * 5,
                                            }}
                                                   resizeMode={'contain'}
                                                   source={{uri: 'imageback'}}/>
                                        </TouchableOpacity>

                                        <Text style={{
                                            color: 'white',
                                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                                            fontWeight: '800',
                                            fontSize: SmartScreenBase.smPercenWidth * 5,
                                        }}>{storeRedux.className}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => _onEditstudentlist()} style={style.headerRight}>
                                        <Image style={{
                                            width: SmartScreenBase.smPercenWidth * 8,
                                            height: SmartScreenBase.smPercenWidth * 8,
                                        }}
                                               resizeMode={'contain'}
                                               source={{uri: 'addstuden2'}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.bodyheard}>
                                    <Text style={{fontWeight: 'bold'}}>Chọn các học viên cần xóa</Text>
                                    <View style={style.Itembodyheard}>
                                        <TouchableOpacity disabled={!distSible} onPress={() => _onDeleteStudent()}
                                                          style={style.deleteStudent}>
                                            <Text
                                                style={{fontWeight: 'bold', color: '#fff'}}>XÓA({Numberdeletet})</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.deleteStudent} onPress={() => _onCenter()}>
                                            <Text style={{fontWeight: 'bold', color: '#fff'}}>HỦY</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={style.body}>
                                    <View style={{
                                        height: '70%',
                                        alignItems: 'center',
                                        marginTop: '6%',
                                        paddingBottom: '3%',
                                    }}>
                                        <FlatList
                                            data={listStuden}
                                            width='95%'
                                            renderItem={_renderDelete}
                                            keyExtractor={(index) => index.toString()}
                                            scrollEnabled={true}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                }
                <Modal
                    // onPress={() => _onbackshow()}
                    animationType="slide"
                    transparent={true}
                    visible={show}
                >
                    <TouchableOpacity style={style.styleshow} onPress={() => _onHiddenshow()}>
                    </TouchableOpacity>
                    <View style={style.styleViewshow}>
                        <TouchableOpacity style={style.editstudent}>
                            <View style={style.style_itemEdit}>
                                <ImageBackground source={{uri: 'gv_liststudent_13'}}
                                                 style={style.icon_style}
                                />
                            </View>
                            <View style={style.txttitle}>
                                <Text style={{fontSize: 16}}>Tạo thông báo</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.editstudent}>
                            <View style={style.style_itemEdit}>
                                <ImageBackground source={{uri: 'gv_liststudent_13'}}
                                                 style={style.icon_style}
                                />
                            </View>
                            <View style={style.txttitle}>
                                <Text style={{fontSize: 16}}>Nhật ký học tập</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => _onClassDetail(ID)} style={style.editstudent}>
                            <View style={style.style_itemEdit}>
                                <ImageBackground source={{uri: 'gv_liststudent_13'}}
                                                 style={style.icon_style}
                                />
                            </View>
                            <View style={style.txttitle}>
                                <Text style={{fontSize: 16}}>Chi tiết thông tin lớp</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => _onapplyFor_class()} style={style.editstudent}>
                            <View style={style.style_itemEdit}>
                                <ImageBackground source={{uri: 'gv_liststudent_14'}}
                                                 style={style.icon_style_edit}
                                />
                            </View>
                            <View style={style.txttitle}>
                                <Text style={{fontSize: 16}}>Yêu cầu vào lớp</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => _onAddcreen()} style={style.editstudent}>
                            <View style={style.style_itemEdit}>
                                <ImageBackground source={{uri: 'gv_liststudent_14'}}
                                                 style={style.icon_style_edit}
                                />
                            </View>
                            <View style={style.txttitle}>
                                <Text style={{fontSize: 16}}>Thêm học viên</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => _onDeletescreen()} style={style.editstudent}>
                            <View style={style.style_itemEdit}>
                                <ImageBackground source={{uri: 'gv_liststudent_15'}}
                                                 style={style.icon_style_delete}
                                />
                            </View>
                            <View style={style.txttitle}>
                                <Text style={{fontSize: 16}}>Xóa học viên</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </ImageBackground>
    );
};
export default listStudenScreen;
