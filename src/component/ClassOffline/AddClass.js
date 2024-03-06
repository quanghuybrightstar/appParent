import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, Animated, TouchableOpacity, Image, FlatList, Alert} from 'react-native';
// import StyleLesson from '../StyleLesson';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../../base/SmartScreenBase';
import Header from './Header';
import API from '../../API/APIConstant';
import axios from "axios";
import LoadingScreen from '../../screens/LoadingScreen';
import {TextInput} from 'react-native';
import AddStudent from './AddStudent';
import {useSelector} from 'react-redux';
import APIBase from '../../base/APIBase';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

const AddClass = ({navigation, route}) => {

    // const { itemClass, list_student } = route.params;
    const itemClass = navigation.getParam('itemClass');
    const list_student = navigation.getParam('list_student');
    // const { title } = route.params;

    const [listStudent, setListStudent] = useState([]);
    const [showAddStudent, setShowAddStudent] = useState(false);
    const [listEmail, setListEmail] = useState([])
    const [className, setClassName] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (itemClass) {
            setClassName(itemClass.class_name);
        }
        if (list_student) {
            setListStudent(list_student);
        }
    }, [])

    const _addStudent = (fullname, parent_email) => {
        if (fullname && parent_email) {
            if (itemClass.id) {
                _addNew(fullname, parent_email);
            } else {
                let dataAdd = {};
                dataAdd['user_name'] = fullname;
                dataAdd['parent_email'] = parent_email;
                let list = [...listStudent];
                let listE = [...listEmail];
                listE.unshift(parent_email);
                list.unshift(dataAdd);
                setListEmail(listE);
                setListStudent(list);
            }
        }
        setShowAddStudent(false);
    }

    const _addNew = async (fullname, parent_email) => {
        setIsLoading(true);
        const url = API.baseurl + API.addNewStudent;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        let data = {};
        data['fullname'] = fullname;
        data['class_id'] = itemClass.id;
        data['email_parent'] = parent_email;
        try {
            const res = await axios({method: 'post', url, headers, data});
            _getListClass();
            // setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const _onDelete = async (index) => {
        if (!listStudent[index].id) {
            let list = [...listStudent];
            list.splice(index, 1);
            setListStudent(list);
            Alert.alert('Thông báo', 'Xoá học sinh thành công!', [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
        } else {
            setIsLoading(true);
            const url = API.baseurl + API.addNewStudent;
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'jwt_token': APIBase.jwt_token,
                'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
                'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
            };
            let qs = require('qs');
            let data = qs.stringify({
                'class_id': itemClass.id,
                'student_id': listStudent[index].id
            });
            try {
                const res = await axios({method: 'delete', url, headers, data});
                let dataReturn = res.data;
                Alert.alert('Thông báo', dataReturn.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
                if (dataReturn.status) {
                    let list = [...listStudent];
                    list.splice(index, 1);
                    setListStudent(list);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                Alert.alert('Thông báo', error.response.data.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
                console.log(error);
            }
        }
    };

    const _renderItem = ({item, index}) => {
        return (
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: '#c1c3c4',
                flexDirection: 'row',
                paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            }}>
                <View style={{flex: 4, flexDirection: 'row', alignItems: 'center', margin: smartScreenHeight * 2.5,}}>
                    <Image style={{
                        width: smartScreenWidth * 20,
                        height: smartScreenWidth * 20,
                    }}
                           resizeMode={'contain'}
                           source={{uri: 'gv_liststudent_07'}}/>
                    <Text style={{
                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                        fontSize: SmartScreenBase.smPercenWidth * 5,
                    }}>{item.user_name}</Text>
                </View>
                <TouchableOpacity style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                }}
                                  onPress={() => {
                                      _onDelete(index);
                                  }}
                >
                    <Image
                        source={{uri: 'gv_108'}}
                        style={{
                            width: smartScreenWidth * 5,
                            height: smartScreenWidth * 5,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const _updateClass = async () => {
        if (itemClass && itemClass !== className) {
            await _updateNameClass();
        } else if (itemClass) {

        }
        if (!itemClass.id) {
            await _addNewStudents();
        }
    }

    const _addNewStudents = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.createClass;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        let data = {};
        data['class_name'] = className;
        data['list_email_parent'] = listEmail;
        let list = [];
        listStudent.forEach((item) => {
            let dataP = {};
            dataP['fullname'] = item.user_name;
            dataP['parent_email'] = item.parent_email;
        });
        data['list_student'] = JSON.stringify(list);
        console.log('data', data);
        try {
            const res = await axios({method: 'post', url, headers, data});
            let dataReturn = res.data;
            console.log('dataReturn', dataReturn);
            setIsLoading(false);
            if (dataReturn.status) {
                Alert.alert('Thông báo', dataReturn.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
                navigation.navigate('ManageClassOffline')
            }
        } catch (error) {
			Alert.alert('Thông báo', 'Thêm lớp không thành công', [
				{text: 'Đồng ý', style: 'cancel'}
			]);
            setIsLoading(false);
            console.log(error);
        }
    };

    const _getListClass = async () => {
        const url = API.baseurl + API.listStudentByClassId + itemClass.id;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        try {
            const res = await axios({method: 'get', url: url, headers: header});
            let data = res.data;
            if (data.status) {
                let list = [...listStudent];
                list = data.class_info.list_student;
                setListStudent(list);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const _updateNameClass = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.updateClassName;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        let data = {};
        data['class_name'] = className;
        data['id'] = itemClass.id;
        try {
            const res = await axios({method: 'put', url, headers, data});

        } catch (error) {
			Alert.alert('Thông báo', 'Thêm lớp không thành công', [
				{text: 'Đồng ý', style: 'cancel'}
			]);
            setIsLoading(false);
            console.log(error);
        }
    }

    return (
        <ImageBackground
            source={{uri: 'imagebackground'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            <View style={{height: smartScreenHeight * 8}}>
                {
                    showAddStudent
                        ?
                        <View style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.3)",
                            flexDirection: "row"
                        }}>
                            <View style={{
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: smartScreenHeight * 2
                            }}>
                                <TouchableOpacity
                                    onPress={() => setShowAddStudent(false)}
                                >
                                    <Image style={{
                                        width: SmartScreenBase.smPercenWidth * 5,
                                        height: SmartScreenBase.smPercenWidth * 5,
                                    }}
                                           resizeMode={'contain'}
                                           source={{uri: "imageback"}}/>
                                </TouchableOpacity>

                                <Text style={{
                                    color: 'white',
                                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                                    fontSize: SmartScreenBase.smPercenWidth * 5
                                }}>Thêm học viên</Text>
                            </View>
                        </View>
                        :
                        <Header goBack={() => navigation.goBack()} title={'Tạo lớp'}/>
                }
            </View>
            {
                isLoading
                    ?
                    <LoadingScreen/>
                    :
                    showAddStudent
                        ?
                        <AddStudent addStudent={(fullname, parentEmail) => _addStudent(fullname, parentEmail)}/>
                        :
                        <View style={{flex: 1}}>
                            <View style={{
                                paddingHorizontal: smartScreenWidth * 2.5,
                                marginTop: smartScreenHeight * 3
                            }}>
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    borderRadius: smartScreenWidth * 4,
                                    flexDirection: 'row',
                                    height: smartScreenHeight * 7,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Image
                                        source={{uri: 'ngv_118'}}
                                        style={{
                                            width: smartScreenWidth * 5,
                                            height: smartScreenWidth * 6,
                                        }}
                                    />
                                    <TextInput
                                        style={{
                                            width: smartScreenWidth * 80,
                                            marginLeft: smartScreenWidth * 2,
                                            color: '#fff',
                                            fontWeight: 'bold'
                                        }}
                                        placeholder='Tên lớp'
                                        placeholderTextColor='#fff'
                                        onChangeText={(text) => setClassName(text)}
                                        value={className}
                                    />
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: SmartScreenBase.smPercenWidth * 7,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: smartScreenHeight * 10
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontWeight: '800',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                }}>
                                    Danh sách lớp
                                </Text>
                            </View>
                            <View style={{
                                paddingHorizontal: smartScreenWidth * 2.5,
                                // marginBottom: smartScreenHeight * 5,
                                height: smartScreenHeight * 45,
                            }}>
                                <View style={{
                                    backgroundColor: '#fff',
                                    borderRadius: smartScreenWidth * 5,
                                }}>
                                    <FlatList
                                        data={listStudent}
                                        renderItem={_renderItem}
                                        keyExtractor={(index) => index.toString()}
                                        scrollEnabled={true}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#fff',
                                            margin: smartScreenHeight * 2.5,

                                        }}
                                        onPress={() => setShowAddStudent(true)}
                                    >
                                        <Image
                                            source={{uri: 'gv_109'}}
                                            style={{
                                                width: smartScreenWidth * 5,
                                                height: smartScreenWidth * 5,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={{
                                    marginTop: smartScreenHeight * 13,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: smartScreenWidth * 100
                                    // marginTop: smartScreenHeight * 10
                                }}>
                                <TouchableOpacity
                                    style={{
                                        padding: smartScreenWidth * 2.5,
                                        backgroundColor: '#00283A',
                                        width: smartScreenWidth * 50,
                                        borderRadius: smartScreenWidth * 25,
                                    }}
                                    onPress={() => _updateClass()}
                                >
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: 'bold', textAlign: 'center'
                                    }}>
                                        Xong
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
            }
        </ImageBackground>
    );
};

export default AddClass;
