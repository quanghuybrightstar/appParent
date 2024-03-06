import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image, Alert, ImageBackground,
    TouchableWithoutFeedback,
    Dimensions,
    Keyboard,
} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import axios from 'axios';
import ItemEditCourse from '../../../component/ItemEditCourse/index';
import base64 from 'react-native-base64';
import Header from '../../../component/Header/Header';
import LoadingScreen from '../../LoadingScreen';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const {width, height} = Dimensions.get('window');
import ModalTimePicker from '../../../component/modalTimePicker/index'

SmartScreenBase.baseSetup();
import {connect} from 'react-redux'
import APIBase from '../../../base/APIBase';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            DataEx: [],
            DataPush: [],
            id: this.props.navigation.getParam('item'),
            dataCancel: [],
            day: '',
            isLoading: true,
            visible: false,
            status: 'start',
            dataTime: {},
            dataSetting: {}
        };
    }

    async componentDidMount() {
        this.props.navigation.addListener(
            'willFocus',
            async () => {
                if (this.props.navigation.getParam('config')) {
                    await this._onSave();
                    this._getExercises()
                } else {
                    this._getExercises()
                }
            }
        );
    }

    _getExercises = async () => {
        const url = API.baseurl + API.CourseManager + parseInt(this.props.navigation.getParam('class_curriculum_id'));
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        console.log(url)
        await axios({method: 'get', url: url, headers: header})
            .then((response) => {
                this.setState({
                    Data: response.data.data.curriculum_data,
                    DataEx: response.data.data.lesson_data.unit_name,
                    DataPush: response.data.data.lesson_data.data,
                    dataTime: response.data.data.class_data,
                    dataSetting: JSON.parse(response.data.data.class_data.class_config)
                });
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
                this.setState({isLoading: false});
            }).finally((f) => {
                this.setState({isLoading: false})
            });
    };
    _renderItemEx = ({item, index}) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.props.navigation.navigate('EditUnitScreen', {
                        id: item.unit_id,
                        DataPush: this.state.DataPush, item,
                        class_curriculum_id: this.props.navigation.getParam('class_curriculum_id'),
                        jwt_token: APIBase.jwt_token,
                        class_id: this.props.navigation.getParam('item').class_id,
                    });
                }}
            >
                <View style={{
                    flex: 1,
                    height: SmartScreenBase.smPercenWidth * 15,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ffffff30',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 10,
                }}>
                    <View style={{
                        width: '80%',
                        height: '100%',
                        justifyContent: 'space-around',
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#fff',
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>{item.unit_name}</Text>
                        <Text style={{
                            fontWeight: '400',
                            color: '#fff',
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize: SmartScreenBase.smPercenWidth * 3.5,
                        }}>{item.start_date} - {item.end_date}</Text>
                    </View>
                    <TouchableOpacity style={{
                        width: SmartScreenBase.smPercenWidth * 6,
                        height: SmartScreenBase.smPercenWidth * 6,
                    }}
                                      onPress={() => {
                                          this.deleteItemById(item.unit_id);
                                      }}
                    >
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'gv_40'}}/>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    deleteItemById = async (id) => {
        const {dataCancel, DataEx} = this.state;
        Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xoá Unit này không?',
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Đồng ý", onPress: () => {
                        this._DeleteDAta(id)
                    }
                }
            ])
    };
    _DeleteDAta = async (id) => {
        this.setState({isLoading: true})
        const {dataCancel, DataEx} = this.state;
        const url = API.baseurl + API.Classcurriculum
        var qs = require('qs');
        let body = qs.stringify({
            'unit_id': id.toString(),
            'class_id': this.props.navigation.getParam('item').class_id,
            'curriculum_id': parseInt(this.props.navigation.getParam('class_curriculum_id')),
        });
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const response = await axios({method: 'put', data: body, headers, url});
            this.setState({
                DataEx: DataEx.filter(item => item.unit_id !== id),
                dataCancel: dataCancel.concat(id),
                isLoading: false
            });

        } catch (error) {
            console.log(error);
            this.setState({isLoading: false});
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            }
        }
    }
    _onSetting = () => {
        this.props.navigation.navigate('SettingCourseScreen', {itemSetting: this.state.dataSetting});
    };

    handleChangeName = (name) => {
        const {Data} = this.state;
        this.setState({
            Data: {
                ...Data,
                name,
            },
        });
    };

    handleChangeDate = async (created_at) => {
        await this.setState({
            day: created_at,
            status: 'start'
        })
        this.setState({visible: true,})
    };
    handleChangeDateEnd = (updated_at) => {
        this.setState({
            day: updated_at,
            visible: true,
            status: 'end'
        })
    };
    _saveDayStart = (created_at) => {
        const {dataTime} = this.state;
        let date = new Date(created_at)
        let dateCut = date.toString().split(' ')
        let month = date.getMonth() + 1;
        let timeFinal = dateCut[3] + '-' + month + '-' + dateCut[2] + ' ' + dateCut[4]
        this.setState({
            dataTime: {
                ...dataTime,
                start_time: timeFinal,
            },
            visible: false
        });
    }
    _saveDayEnd = (updated_at) => {
        const {dataTime} = this.state;
        let date = new Date(updated_at)
        let dateCut = date.toString().split(' ')
        let month = date.getMonth() + 1;
        let timeFinal = dateCut[3] + '-' + month + '-' + dateCut[2] + ' ' + dateCut[4]
        this.setState({
            dataTime: {
                ...dataTime,
                end_time: timeFinal,
            },
            visible: false
        });
    }


    _onSave = async () => {
        this.setState({isLoading: true});
        const {Data, dataCancel, dataTime} = this.state;
        const url = API.baseurl + API.Classcurriculum
        let classConfig;
        if (this.props.navigation.getParam('config')) {
            classConfig = this.props.navigation.getParam('config');
        } else {
            classConfig = {'score': '0', 'config_theory': 'free', 'config_test': 'free'}
        }
        var qs = require('qs');
        let body = qs.stringify({
            'class_config': JSON.stringify(classConfig),
            'start_time': dataTime.start_time && dataTime.start_time.length <= 10 ? dataTime.start_time + ' ' + '00:00:00' : dataTime.start_time,
            'end_time': dataTime.end_time && dataTime.end_time.length <= 10 ? dataTime.end_time + ' ' + '00:00:00' : dataTime.end_time,
            'class_id': this.props.navigation.getParam('item').class_id,
            'name': Data.name,
            'curriculum_id': parseInt(this.props.navigation.getParam('class_curriculum_id')),
        });
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const response = await axios({method: 'put', url, data: body, headers});
            if (response.data.status) {
                if (!this.props.navigation.getParam('config')) {
                    Alert.alert('Thông Báo', response.data.msg, [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
            } else {
                Alert.alert('Thông Báo', response.data.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            }
            this.setState({isLoading: false});
        } catch (error) {
            this.setState({isLoading: false});
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
    };

    _onClose = (value) => {
        this.setState({visible: value})
    }

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                <Header navigation={this.props.navigation} title={this.state.Data.name}/>
                <View style={{
                    flex: 12,
                    paddingTop: SmartScreenBase.smPercenWidth * 5,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                }} onStartShouldSetResponder={() => Keyboard.dismiss()}>
                    {this.state.isLoading ?
                        <LoadingScreen/>
                        :
                        <View style={{flex: 1, height,}}>
                            <View style={{
                                height: height / 7
                            }}>
                                <ItemEditCourse indexSelected={this.state.indexSelected} Data={this.state.Data}
                                                _onSetting={this._onSetting}
                                                Time={this.state.dataTime}
                                                index={index} isAccept={this.state.isAccept}
                                                handleChangeName={(text) => this.handleChangeName(text)}
                                                handleChangeDateStart={(text) => this.handleChangeDate(text)}
                                                handleChangeDateEnd={(text) => this.handleChangeDateEnd(text)}
                                />
                            </View>
                            <View style={{
                                // flex: 3,
                                backgroundColor: '#00000030',
                                borderRadius: 10,
                                marginTop: 10,
                                height: height / 2
                            }}>
                                <FlatList data={this.state.DataEx} renderItem={this._renderItemEx}
                                          keyExtractor={(item, index) => {
                                              return item.toString() + index.toString();
                                          }}
                                          showsVerticalScrollIndicator={false}
                                          extraData={this.state}/>
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <TouchableOpacity style={{
                                    width: '45%',
                                    height: SmartScreenBase.smPercenWidth * 10,
                                    backgroundColor: '#00283A',
                                    borderRadius: SmartScreenBase.smPercenWidth * 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                                  onPress={() => {
                                                      this.props.navigation.navigate('AddUnitScreen', {
                                                          curriculum_id: this.props.navigation.getParam('class_curriculum_id'),
                                                          jwt_token: APIBase.jwt_token,
                                                          class_id: this.props.navigation.getParam('item').class_id,
                                                      });
                                                  }}
                                >
                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                    }}>Thêm Unit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: '45%',
                                    height: SmartScreenBase.smPercenWidth * 10,
                                    backgroundColor: '#00283A',
                                    borderRadius: SmartScreenBase.smPercenWidth * 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                                  onPress={this._onSave}
                                >
                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                    }}>Lưu thay đổi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    <ModalTimePicker
                        day={this.state.day}
                        visible={this.state.visible}
                        onClose={this._onClose}
                        status={this.state.status}
                        saveDayStart={this._saveDayStart}
                        saveDayEnd={this._saveDayEnd}
                    />
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        dataClass: state.AuthStackReducer.dataClass,
    }
}

export default connect(mapStateToProps)(index);
