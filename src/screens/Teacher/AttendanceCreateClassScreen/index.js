import * as React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Text,
    ImageBackground,
    FlatList,
    TextInput,
    Modal, Alert,
} from 'react-native';
import Styles from '../workDeliveredTeacherScreen/workDeliveredTeacherScreenStyles';
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import axios from 'axios';
import ModalAddStudent from '../../../component/ModalAddStudent/index'
import base64 from 'react-native-base64';
import Header from '../../../component/Header/Header';

const {width, height} = Dimensions.get('window');

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            StudentName:'',
            ParentEmail:'',
            DataParent:[],
            ClassName:''
        };
    }

    _renderItem = ({item, index}) => {
        return (
            <View style={{
                flex: 1,
                height: width / 5,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                flexDirection:'row'
            }}>
                <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{
                        width: width / 7,
                        height: width / 7,
                    }}
                           resizeMode={'contain'}
                           source={{uri: 'gv_liststudent_07'}}/>
                    <Text style={{
                        fontWeight: '800',
                        color: 'gray',
                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                        fontSize: SmartScreenBase.smPercenWidth * 5,
                    }}>{item.fullname}</Text>
                </View>
                <TouchableOpacity style={{
                    flex: 1,
                    alignItems:'center',
                    justifyContent:'center'
                }}
                                  onPress={()=>{this.handleDeleteStudent(index)}}
                >
                    <Image
                        source={{uri: 'gv_108'}}
                        style={{
                            width: width/15,
                            height: width/15,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    };
    handleDeleteStudent = (index) =>{
        let copied = [...this.state.Data];
        Alert.alert(
            'Thông báo',
            'Bạn có chắc chắn muốn xóa không?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý', onPress: () => {
                        copied.splice(index,1);
                        this.setState({Data:copied});
                    },
                },
            ],
            {cancelable: false},
        );

    };
    _onShowAlert = () => {
        this.ModalAddStudent.onShowAlert();
    };
    _onShowModal =() =>{
        this._onShowAlert();
    };
    AddNewStudent = (StudentName,ParentEmail) =>{
        let NewData =
            {
                "fullname":StudentName,
                "parent_email":ParentEmail
            };
        this.state.DataParent.push(ParentEmail);
        this.state.Data.push(NewData);
        this.setState({Data:[...this.state.Data]});
        console.log(this.state.DataParent)
    }
    _onSubmit = () => {
        const {ClassName,DataParent,Data} = this.state;
        if (ClassName == '' || Data.length == 0){
            Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin', [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
        }else {
            const url = API.baseurl+'api_class_offline/class';
            const header =  {
                "jwt_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA",
                "X-API-KEY": "8c3a30506d9633a8b202cb5a91873efa",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=="
            };
            var details = {
                'class_name': ClassName,
                'list_email_parent': JSON.stringify(DataParent),
                'list_student': JSON.stringify(Data)
            };
            let formBody = [];
            for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            console.log(JSON.stringify(details));
            fetch(url, {
                method: "POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
                    'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
                },
                body: formBody
            }).then((response) => response.json()).then((responseJson) => {
                if (responseJson.status == true){
                    Alert.alert('Thông báo', 'Tạo lớp thành công', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }else {
                    Alert.alert('Thông báo', 'Tạo lớp thất bại', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
            }).catch((e)=>{
                console.log(e)
            })
        }

    };
    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={Styles.container}>
                <View style={{
                    justifyContent: "space-between",
                    alignItems: "center" ,
                    width:width,
                    height:height/13,
                    backgroundColor:"rgba(0,0,0,0.3)",
                    flexDirection:"row"
                }}>
                    <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 2 ,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,}}
                                          onPress={()=>this.props.navigation.goBack()}
                        >
                            <Image style={{
                                width: SmartScreenBase.smPercenWidth * 5,
                                height: SmartScreenBase.smPercenWidth * 5,}}
                                   resizeMode={'contain'}
                                   source={{uri:"imageback"}}/>
                        </TouchableOpacity>
                        <Text style={{
                            color: 'white' ,
                            marginLeft: SmartScreenBase.smPercenWidth * 5,
                            fontWeight:"800",
                            fontSize:SmartScreenBase.smPercenWidth*5
                        }}>Quản lý điểm danh</Text>
                    </View>
                </View>
                <View style={{
                    flex: 1.3,
                    paddingHorizontal: width / 20,
                    justifyContent: 'center',
                }}>
                    <View style={{
                        width: '100%',
                        height: '70%',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#fff',
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            flex: 1.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image style={{
                                width: width / 12,
                                height: width / 12,
                            }}
                                   resizeMode={'contain'}
                                   source={{uri: 'ngv_118'}}/>
                        </View>
                        <View style={{
                            flex: 5,
                        }}>
                            <TextInput style={{
                                flex: 1,
                                width: '95%',
                                fontWeight: '400',
                                fontSize: SmartScreenBase.smPercenWidth * 5,
                                color: '#fff',
                                padding: 0,
                            }}
                                       placeholder="Tên lớp"
                                       underlineColorAndroid='transparent'
                                       placeholderTextColor="#ffffff"
                                       onChangeText={(ClassName)=>{this.setState({ClassName})}}
                            />
                        </View>
                    </View>

                </View>
                <Text style={{
                    flex: 1,
                    color: 'white',
                    marginLeft: SmartScreenBase.smPercenWidth * 3,
                    fontWeight: '800',
                    fontSize: SmartScreenBase.smPercenWidth * 5,
                    textAlignVertical: 'center',
                }}>Danh sách lớp</Text>
                <View style={{
                    flex: 7.5,
                    marginHorizontal: SmartScreenBase.smPercenWidth * 3,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    borderRadius: 20,
                    backgroundColor: '#fff',
                }}>
                    <FlatList data={this.state.Data} renderItem={this._renderItem}
                              keyExtractor={(item, index) => {
                                  return item.toString() + index.toString();
                              }}
                              showsVerticalScrollIndicator={false}
                              extraData={this.state}/>
                    <TouchableOpacity style={{
                        width:'100%',
                        height:width/10,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                                      onPress={()=>{this._onShowModal()}}
                    >
                        <Image
                            source={{uri: 'gv_109'}}
                            style={{
                                width: width/15,
                                height: width/15,
                            }}
                        />
                    </TouchableOpacity>
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
                                      onPress={()=>{this._onSubmit()}}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: '800',
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                        }}>Xong</Text>
                    </TouchableOpacity>
                </View>
                <ModalAddStudent ref={refs => (this.ModalAddStudent = refs)} AddNewStudent={(StudentName,ParentEmail)=>{this.AddNewStudent(StudentName,ParentEmail)}}/>
            </ImageBackground>

        );
    }

}

