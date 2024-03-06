import React, {Component} from 'react';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity, ImageBackground,
    Alert,
} from 'react-native';

SmartScreenBase.baseSetup();
import API from '../../../API/APIConstant';
import axios from 'axios';
import ItemDeleteStudents from '../../../component/ItemDeleteStudents';
import ItemFilter from '../../../component/ItemFilter';
import base64 from 'react-native-base64';
import Header from '../../../component/Header/Header';
import LoadingScreen from '../../../component/Loading';

export default class DeleteStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            isChoiceAll: false,
            isAccept: false,
            visible: false,
            Change: false,
            DataPush: [],
            isLoading:true

        };
    }

    async componentDidMount() {
        this.props.navigation.addListener('willFocus', payload => {
            this._getLitStudents();
        });
    }

    _getLitStudents = async () => {
        const url = API.baseurl + API.getListStudents;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        await axios({method: 'get', url: url, headers: header})
            .then((response) => {
                this.setState({Data: response.data.data});
                this.setState(prevState => ({
                    Data: prevState.Data.map(
                        obj => (Object.assign(obj, {Change: this.state.Change})),
                    ),
                }));
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
                this.setState({isLoading: false});
            }).finally((f)=>{
                this.setState({isLoading:false})
            });
    };
    _onChangeRadioButton = (id, index) => {
        const copied = [...this.state.Data];
        copied[index].Change = !copied[index].Change;
        this.setState({Data: copied});
        if (copied[index].Change == true) {
            this.state.DataPush.push(id);
        } else {
            var deleteElement = id;
            var i = this.state.DataPush.indexOf(deleteElement);
            if (i != -1) {
                this.state.DataPush.splice(i, 1);
            }
        }
    };
    _renderItem = ({item, index}) => {
        return (
            <ItemDeleteStudents indexSelected={this.state.indexSelected} Data={item}
                                _onChangeRadioButton={() => this._onChangeRadioButton(item.id, index)} index={index}/>
        );
    };
    _onDelete = async () => {
        let details = {
            'id': 1,
            'students': JSON.stringify(this.state.DataPush),
        };
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        const url = API.baseurl + API.deleteStudents;
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
                'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            },
            body: formBody,
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.status == true) {
                Alert.alert('Thông báo', 'Xóa học viên thành công', [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
                this.props.navigation.goBack();
            } else {
                Alert.alert('Thông báo', 'Xóa học viên thất bại', [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                {
                    this.state.isLoading == true ?
                        <LoadingScreen/>
                        :
                        <View style={{flex: 1}}>
                            <Header navigation={this.props.navigation} title={'Xóa học viên'}/>
                            <View style={{flex: 12}}>
                                <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'space-around'}}>
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{
                                            color: '#000',
                                            marginLeft: SmartScreenBase.smPercenWidth * 5,
                                            fontWeight: '700',
                                            fontSize: SmartScreenBase.smPercenWidth * 5,
                                        }}>Chọn các học viên cần xóa</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                                        justifyContent: 'space-around',
                                    }}>
                                        <TouchableOpacity style={{
                                            width: '35%',
                                            paddingVertical: SmartScreenBase.smPercenWidth,
                                            borderRadius: SmartScreenBase.smPercenHeight * 2,
                                            backgroundColor: '#F08B01',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                                          onPress={() => {
                                                              this._onDelete();
                                                          }}
                                        >
                                            <Text style={{
                                                color: '#fff',
                                                fontWeight: '800',
                                                fontSize: SmartScreenBase.smPercenWidth * 5,
                                            }}>Xóa{this.state.DataPush.length !== 0 && ` (${this.state.DataPush.length}) `}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            width: '35%',
                                            paddingVertical: SmartScreenBase.smPercenWidth,
                                            borderRadius: SmartScreenBase.smPercenHeight * 2,
                                            backgroundColor: '#F08B01',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                                          onPress={() => {
                                                              this.props.navigation.goBack();
                                                          }}
                                        >
                                            <Text style={{
                                                color: '#fff',
                                                fontWeight: '800',
                                                fontSize: SmartScreenBase.smPercenWidth * 5,
                                            }}>Hủy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 5,
                                    padding: SmartScreenBase.smPercenWidth * 6,
                                }}>
                                    <View style={{
                                        flex: 1,
                                        backgroundColor: '#fff',
                                        borderRadius: SmartScreenBase.smPercenWidth * 4,
                                        paddingTop: SmartScreenBase.smPercenWidth * 6,
                                        paddingHorizontal: SmartScreenBase.smPercenWidth * 4,

                                    }}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            color: 'black',
                                            fontSize: SmartScreenBase.smPercenWidth * 5,
                                        }}>Danh sách lớp</Text>
                                        <FlatList data={this.state.Data} renderItem={this._renderItem}
                                                  keyExtractor={(item, index) => {
                                                      return item.toString() + index.toString();
                                                  }}
                                                  showsVerticalScrollIndicator={false}
                                                  extraData={this.state}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                }
            </ImageBackground>
        );

    }

}
