import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Slider,
    Modal,
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
    Platform,
    Alert
} from 'react-native';
// import StyleLesson from '../StyleLesson';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../../base/SmartScreenBase';
import Header from './Header';
import API from '../../API/APIConstant';
import axios from "axios";
import LoadingScreen from '../../screens/LoadingScreen';
import ItemAttendance from './ItemAttendance';
import DateTimePicker from '@react-native-community/datetimepicker';
import APIBase from "../../base/APIBase";

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;
//const {width, height} = Dimensions.get('window');

const ManageAttendance = ({navigation, route}) => {
    // const { class_id, list_student, attendance_id, item_class } = route.params;
    const class_id = navigation.getParam('class_id');
    const list_student = navigation.getParam('list_student');
    const attendance_id = navigation.getParam('attendance_id');
    const item_class = navigation.getParam('item_class');

    const [showBg, setShowBg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [listParentEmail, setListParentEmail] = useState([]);
    const [selected, setSelected] = useState(false);
    const [listStudent, setListStudent] = useState([]);
    const [date, setDate] = useState('');
    const [dateData, setDateData] = useState(new Date());
    const [numberAbsence, setNumberAbsence] = useState(0);
    const [total, setTotal] = useState(0);
    const [showDateTime, setShowDateTime] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [changeDate, setChangeDate] = useState(new Date());
    const [heightItem, setHeightItem] = useState([]);

    useEffect(() => {
        if (attendance_id) {
            _getDetailsAttendance();
        } else if (list_student) {
            list_student.forEach((element, index) => {
                list_student[index]['fullname'] = element.user_name;
            });
            setListStudent(list_student)
            let datee = new Date();
            let dateF = `${datee.getDate()}-${datee.getMonth() + 1}-${datee.getFullYear()}`;
            setDate(dateF);
        }
    }, [])

    const _setShowBg = (stt) => {
        setShowBg(stt);
    }

    const _changeInfo = (index, item) => {
        let list = [...listStudent];
        list[index] = item;
        setListStudent(list);
    }

    const _changeStatus = (index, item) => {
        let list = [...listStudent];
        list[index] = item;
        setListStudent(list);
    }

    const _pushEmail = (index, ac) => {
        let listEmail = [...listParentEmail];
        let list = [...listStudent];
        if (ac === 0) {
            listEmail.splice(index, 1);
            delete list[index].send_to_parent;
            delete list[index].present;
        } else {
            listEmail.push(listStudent[index].parent_id);
            list[index].send_to_parent = 1;
            list[index].present = 1;
        }
        setListStudent(list);
        setListParentEmail(listEmail);
    }

    const _heightItem = (index, height) => {
        let heightI = [...heightItem];
        heightI[index] = height;
        setHeightItem(heightI);
    }

    const _renderItem = ({item, index}) => {
        return (
            <ItemAttendance
                item={item}
                index={index}
                showBg={(stt) => _setShowBg(stt)}
                changeInfo={(index, item) => _changeInfo(index, item)}
                pushEmail={(index, ac) => _pushEmail(index, ac)}
                selected={selected}
                changeStatus={(index, item) => _changeStatus(index, item)}
                changeHeight={(index, height) => _heightItem(index, height)}
                dataHeight={heightItem}
            />
        )
    }

    const _getDetailsAttendance = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.detailsAttendance + attendance_id;
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
                list_student.forEach((element, index) => {
                    list_student[index]['fullname'] = element.user_name;
                });
                list = data.data.data_detail.length ? data.data.data_detail : list_student;
                if (data.data.send_to_parent === '1') {
                    setSelected(true);
                }
                let dateN = data.data.date_roll_up;
                // dateN = dateN.split("/");
                // dateN = `${dateN[1]}-${dateN[0]}-${dateN[2]}`;
                setTotal(data.data.total_student);
                setNumberAbsence(data.data.number_absence);
                setDate(dateN);
                let newDate = dateN;
                newDate = newDate.split("-");
                let newDate2 = new Date();
                newDate2.setDate(newDate[0]);
                newDate2.setMonth(newDate[1]);
                newDate2.setFullYear(newDate[2]);
                newDate2 = newDate2.getTime();
                setDateData(new Date(newDate2));
                setChangeDate(new Date(newDate2));
                setListStudent(list);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const _attendance = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.attendance;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        let data = {};
        data['class_id'] = class_id;
        data['send_to_parent'] = selected ? 1 : 0;
        let list = [];
        let numberAbsence = 0;
        listStudent.forEach(element => {
            let dataS = {};
            dataS['id'] = element.id;
            dataS['fullname'] = element.user_name;
            dataS['parent_id'] = element.parent_id;
            dataS['status'] = element.status ?? 'intime';
            if (element.present) {
                dataS['send_to_parent'] = element.send_to_parent;
            }
            if (element.present) {
                dataS['present'] = element.present;
            }
            if (element.comment) {
                dataS['comment'] = element.comment;
            }
            if (dataS['status'] === 'absence_not_allowed' || dataS['status'] === 'absence_allowed') {
                numberAbsence++;
            }
            list.push(dataS);
        });
        data['list_student'] = JSON.stringify(list);
        data['number_absence'] = numberAbsence;
        data['total_student'] = listStudent.length;
        if (attendance_id) {
            data['roll_up_id'] = attendance_id;
        }
        try {
            const res = attendance_id ? await axios({method: 'put', url, headers, data}) :
				await axios({method: 'post', url, headers, data});
            let dataReturn = res.data;
            Alert.alert('Thông báo', dataReturn.msg, [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
            if (dataReturn.status) {
                navigation.goBack();
            }
            setIsLoading(false);
        } catch (error) {
            let res = error.response.data;
			Alert.alert('Thông báo', res.msg, [
				{text: 'Đồng ý', style: 'cancel'}
			]);
            setIsLoading(false);
            console.log(error);
        }
    }

    const _selectAll = () => {
        let listEmail = [...listParentEmail];
        let list = [...listStudent];
        if (selected) {
            listEmail = [];
            list.forEach((element, index) => {
                delete list[index].send_to_parent;
                delete list[index].present;
            });
        } else {
            listStudent.forEach((element, index) => {
                if (!listEmail[index]) {
                    listEmail.push(element.parent_id);
                }
            });
            list.forEach((element, index) => {
                list[index].send_to_parent = 1;
                list[index].present = 1;
            });
        }
        setListStudent(list);
        setListParentEmail(listEmail);
        setSelected(!selected)
    }

    const _showDateTimePicker = () => {
        if (Platform.OS === 'ios') {
            setShowModal(true);
        } else {
            setShowDateTime(true);
        }
    }

    const _onChangeAndroid = (event, selectedDate) => {
        setShowDateTime(!showDateTime);
        let currentDate = selectedDate ?? dateData;
        let dateD = new Date(currentDate);
        let newDate2 = `${dateD.getDate()}-${dateD.getMonth() + 1}-${dateD.getFullYear()}`;
        let newDate = dateD.getTime();
        setDateData(new Date(newDate));
        setDate(newDate2);
    }

    const _onChangeIos = (event, selectedDate) => {
        let dateD = new Date(selectedDate);
        setChangeDate(dateD);
    }

    const _cancelDate = () => {
        setChangeDate(new Date(dateData));
        setShowModal(false);
    }

    const _confirmDate = () => {
        let newDate2 = `${changeDate.getDate() > 9 ? changeDate.getDate() : '0' + changeDate.getDate()}-${changeDate.getMonth() > 8 ? (changeDate.getMonth() + 1) : '0' + (changeDate.getMonth() + 1)}-${changeDate.getFullYear()}`;
        setDateData(new Date(changeDate));
        setDate(newDate2);
        setShowModal(false);
    }

    return (
        <ImageBackground
            source={{uri: 'imagebackground'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            <View style={{height: smartScreenHeight * 8}}>
                <Header goBack={() => navigation.goBack()} title={attendance_id ? 'Phiếu điểm danh' : 'Điểm danh'}/>
            </View>
            {
                showBg || (showModal && Platform.OS === 'ios')
                    ?
                    <View style={{
                        flex: 1,
                        backgroundColor: '#00000060',
                        position: 'absolute',
                        zIndex: 11,
                        height: smartScreenHeight * 100,
                        width: smartScreenWidth * 100
                    }}></View>
                    :
                    null
            }
            {
                isLoading
                    ?
                    <LoadingScreen/>
                    :
                    <View style={{flex: 1}}>
                        <View style={{
                            flex: 2.5,
                            paddingHorizontal: (SmartScreenBase.smPercenWidth*100) / 30,
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                width: '100%',
                                height: '90%',
                                borderRadius: 10,
                                flexDirection: 'row',
                                backgroundColor: '#fff',

                            }}>
                                <View style={{
                                    flex: 1.3,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image style={{
                                        width: '90%',
                                        height: '90%',
                                        borderRadius: 10,
                                    }}
                                           resizeMode={'stretch'}
                                           source={{uri: 'student_profile_image4'}}/>
                                </View>
                                <View style={{
                                    flex: 2,
                                    paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                                }}>
                                    <Text style={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                        flex: 1,
                                        marginTop: smartScreenHeight * 3,
                                        textAlignVertical: 'center',
                                    }}>{item_class.class_name}</Text>
                                    <View style={{
                                        flex: 3,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Image style={{
                                            width: SmartScreenBase.smPercenWidth * 7,
                                            height: SmartScreenBase.smPercenWidth * 7,
                                        }}
                                               resizeMode={'contain'}
                                               source={{uri: 'student_managerfile_image1'}}/>
                                        <Text

                                            style={{
                                                paddingLeft: smartScreenWidth * 5,
                                                color: 'black',
                                                fontWeight: '400',
                                                fontSize: SmartScreenBase.smPercenWidth * 3.5,
                                                textAlignVertical: 'top',
                                            }}
                                        >{date}
                                        </Text>
                                        {
                                            !attendance_id
                                                ?
                                                <TouchableOpacity style={{
                                                    width: SmartScreenBase.smPercenWidth * 7,
                                                    height: SmartScreenBase.smPercenWidth * 7,
                                                    position: 'absolute',
                                                    right: 0,
                                                }}
                                                                  onPress={() => _showDateTimePicker()}
                                                >
                                                    <Image style={{
                                                        width: SmartScreenBase.smPercenWidth * 7,
                                                        height: SmartScreenBase.smPercenWidth * 7,
                                                    }}
                                                           resizeMode={'contain'}
                                                           source={{uri: 'gv_110'}}/>
                                                </TouchableOpacity>
                                                :
                                                null
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: SmartScreenBase.smPercenWidth * 4
                        }}>
                            <View style={{flex: 1}}>
                                {
                                    attendance_id
                                        ?
                                        <Text style={{
                                            color: '#fff',
                                            fontSize: SmartScreenBase.smPercenWidth * 5
                                        }}>{`Sĩ số : ${total - numberAbsence}/${total}`}</Text>
                                        :
                                        null
                                }
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}>
                                <TouchableWithoutFeedback onPress={() => _selectAll()}>
                                    <View style={{
                                        width: SmartScreenBase.smPercenWidth * 6,
                                        height: SmartScreenBase.smPercenWidth * 6,
                                        marginRight: SmartScreenBase.smPercenWidth * 3,
                                    }}>
                                        <Image style={{
                                            width: SmartScreenBase.smPercenWidth * 6,
                                            height: SmartScreenBase.smPercenWidth * 6,
                                        }}
                                               resizeMode={'contain'}
                                               source={{uri: 'gv_55'}}/>
                                        {
                                            selected
                                                ?
                                                <Image
                                                    style={{
                                                        width: SmartScreenBase.smPercenWidth * 6,
                                                        height: SmartScreenBase.smPercenWidth * 6,
                                                        position: 'absolute',
                                                        bottom: 3,
                                                    }}
                                                    resizeMode={'contain'}
                                                    source={{uri: 'gv_56'}}
                                                />
                                                :
                                                null
                                        }
                                    </View>
                                </TouchableWithoutFeedback>

                                <Text style={{
                                    color: 'white',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                }}>{attendance_id && selected ? 'Đã gửi phụ huynh' : 'Gửi tất cả'}</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 6.5,
                            paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                        }}>
                            <FlatList
                                data={listStudent}
                                renderItem={_renderItem}
                                keyExtractor={(index) => index.toString()}
                                scrollEnabled={true}
                            />
                        </View>
                        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={{
                                width: '50%',
                                height: 40,
                                backgroundColor: '#00283A',
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                                              onPress={() => {
                                                  _attendance()
                                              }}
                            >
                                <Text style={{
                                    color: 'white',
                                    fontWeight: '800',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                }}>Xong</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            showDateTime && Platform.OS !== 'ios'
                                ?
                                <View style={{flex: 1}}>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateData}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        style={{backgroundColor: '#fff'}}
                                        onChange={_onChangeAndroid}
                                        // onChange={onChange}
                                    />
                                </View>
                                : null
                        }
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showModal}
                        >
                            <View style={styles.centeredView}>
                                <View
                                    style={{backgroundColor: '#008577'}}
                                >
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: smartFont * 80,
                                        fontWeight: 'bold',
                                        padding: smartScreenWidth * 10
                                    }}>
                                        {`${changeDate.getDate() > 9 ? changeDate.getDate() : '0' + changeDate.getDate()} - ${changeDate.getMonth() > 8 ? (changeDate.getMonth() + 1) : '0' + (changeDate.getMonth() + 1)} - ${changeDate.getFullYear()}`}
                                    </Text>
                                </View>
                                <View style={styles.modalView}>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={changeDate}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={_onChangeIos}
                                    />
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        paddingHorizontal: smartScreenWidth * 5,
                                        marginTop: smartScreenHeight * 3
                                    }}>
                                        <TouchableOpacity
                                            style={{marginRight: smartScreenWidth * 5}}
                                            onPress={() => _cancelDate()}
                                        >
                                            <Text>CANCEL</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => _confirmDate()}
                                        >
                                            <Text>OK</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
            }
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginTop: smartScreenHeight * 20,
        padding: smartScreenWidth * 5,
    },
    modalView: {
        borderRadius: smartScreenWidth,
        padding: smartScreenWidth * 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff'
    }
});

export default ManageAttendance;
