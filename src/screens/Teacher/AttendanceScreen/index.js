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
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import Styles from '../workDeliveredTeacherScreen/workDeliveredTeacherScreenStyles';
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import axios from 'axios';
import ItemAttenDance from '../../../component/ItemAttenDance/index';
import ModalSendComments from '../../../component/ModalSendComments/index';
import ModalAlam from '../../../component/ModalAlam';
import Header from '../../../component/Header/Header';
import base64 from 'react-native-base64';

const {width, height} = Dimensions.get('window');

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            DataFake: [],
            isChooseAll: false,
            title: '',
            item: this.props.navigation.getParam('item'),
            DataPush: this.props.navigation.getParam('DataPush'),
            visible: false,
            comments: '',
            index: '',
            changeDate:false,
            Date:''
        };
    }

    componentDidMount(): void {
        this.setState(prevState => ({
            DataPush: prevState.DataPush.map(e => (Object.assign(e, {present: false}))),
        }));
    }

    _onChooseStudent = (index) => {
        const copied = [...this.state.DataPush];
        copied[index].present = !copied[index].present;
        this.setState({DataPush: copied});
    };
    _renderItem = ({item, index}) => {
        return (
            <ItemAttenDance Data={item}
                            _onChooseStudent={(index) => this._onChooseStudent(index)}
                            _onWriteComments={(index,name) => {
                                this._onWriteComments(index,name);
                            }}
                            _onSendToParent={(index) => {
                                this._onSendToParent(index);
                            }}
                            index={index}/>
        );
    };
    _onSendToParent = (index) => {
        const copied = [...this.state.DataPush];
        let Sum = Object.assign(copied[index], {send_to_parent: 1});
        copied[index] = Sum;
        this.setState({DataPush: copied});
        Alert.alert(
            "Thông báo",
            "Đã gửi cho phụ huynh",
            [
                {
                    text: "Đồng ý",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );
    };
    _onWriteComments = (index,name) => {
        this._onShowAlert();
        this.setState({index});
        this.setState({title:name})
    };
    _onShowAlert = () => {
        this.setState({visible: true});
    };
    _onCloseAlert = (comments) => {
        this.setState({visible: false});
        const copied = [...this.state.DataPush];
        let Sum = Object.assign(copied[this.state.index], {comments: comments});
        copied[this.state.index] = Sum;
        this.setState({DataPush: copied});

    };
    _onCheckAll = () => {
        this.setState(prevState => ({
            DataPush: prevState.DataPush.map(e => (Object.assign(e, {present: !this.state.isChooseAll}))),
            isChooseAll: !this.state.isChooseAll,
        }));
        console.log(this.state.DataPush);
    };
    _onSubmit = () => {
        const DataP = this.state.DataPush.map((e) => {
            if (e.send_to_parent == 1) {
                return e.id;
            }
        });
        let DataParent = DataP.filter(Boolean);
        const Data = [...this.state.DataPush];
        Data.map((e) => {
            if (e.present == false) {
                delete e.present;
            } else {
                e.present = 1;
            }
        });

        let details = {
            'list_parent_send_mail': JSON.stringify(DataParent),
            'list_student': JSON.stringify(Data),
            'class_id': this.state.item.id,
        };
        console.log(details);
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        console.log(formBody);
        formBody = formBody.join('&');
        const url = API.baseurl+'api_class_offline/roll_up';

        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
                'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            },
            body: formBody,
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
            if (responseJson.status == true) {
                Alert.alert('Thông báo', 'Điểm danh thành công', [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
                this.props.navigation.goBack();
            } else {
                Alert.alert('Thông báo', responseJson.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            }
        }).catch((e) => {
            console.log(e);
        });
    };
    _onChangeDate = () =>{
        this.setState({
            changeDate: true,
        });
        this.TextInputChangeDate.focus();
    }
    _handleChangeText = (created_at) =>{
        const {item} = this.state;
        this.setState({item:{...item,created_at}})
    }
    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={Styles.container}>
                <Header navigation={this.props.navigation} title={'Điểm danh'}/>
                <View style={{
                    flex: 2.5,
                    paddingHorizontal: width / 30,
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
                                textAlignVertical: 'center',
                            }}>{this.state.item.class_name}</Text>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',

                            }}>
                                <Image style={{
                                    width: SmartScreenBase.smPercenWidth * 7,
                                    height: SmartScreenBase.smPercenWidth * 7,
                                }}
                                       resizeMode={'contain'}
                                       source={{uri: 'student_managerfile_image1'}}/>
                                <TextInput
                                    multiline={true}
                                    value={this.state.item.created_at}
                                    style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: SmartScreenBase.smPercenWidth * 3.5,
                                        textAlignVertical: 'top',
                                    }}
                                    editable={this.state.changeDate}
                                    ref={refs => this.TextInputChangeDate = refs}
                                    onChangeText={(text)=>{this._handleChangeText(text)}}
                                    // onEndEditing={() => {
                                    //     this.setState({changeDate: false});
                                    // }}
                                />
                                <TouchableOpacity style={{
                                    width: SmartScreenBase.smPercenWidth * 7,
                                    height: SmartScreenBase.smPercenWidth * 7,
                                    position: 'absolute',
                                    right: 0,
                                }}
                                                  onPress={()=>{this._onChangeDate()}}
                                >
                                    <Image style={{
                                        width: SmartScreenBase.smPercenWidth * 7,
                                        height: SmartScreenBase.smPercenWidth * 7,
                                    }}
                                           resizeMode={'contain'}
                                           source={{uri: 'gv_110'}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>
                    <TouchableWithoutFeedback onPress={this._onCheckAll}>
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
                                this.state.isChooseAll &&
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
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={{
                        color: 'white',
                        fontWeight: '800',
                        fontSize: SmartScreenBase.smPercenWidth * 5,
                    }}>Gửi tất cả</Text>
                </View>
                <View style={{
                    flex: 6.5,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                }}>
                    <FlatList data={this.state.DataPush} renderItem={this._renderItem}
                              keyExtractor={(item, index) => {
                                  return item.toString() + index.toString();
                              }}
                              showsVerticalScrollIndicator={false}
                              extraData={this.state}/>
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
                                          this._onSubmit();
                                      }}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: '800',
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                        }}>Xong</Text>
                    </TouchableOpacity>
                </View>
                <ModalSendComments ref={refs => (this.ModalSendComments = refs)}
                                   title={this.state.title} visible={this.state.visible}
                                   _onCloseAlert={(comments) => this._onCloseAlert(comments)}
                />
            </ImageBackground>

        );
    }

}

