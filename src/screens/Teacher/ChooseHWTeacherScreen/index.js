import React, {Component} from 'react';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {
    Text,
    View,
    FlatList,
    Alert,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image, Modal, ImageBackground,
} from 'react-native';
import axios from 'axios';
import API from '../../../API/APIConstant';
import Header from '../../../component/Header';

SmartScreenBase.baseSetup();
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            DataLesson: [],
            DataUnit: [],
            indexSelected: -1,
            isShow: false,
            isLoading: true,
            id: this.props.navigation.getParam('id'),
        };
    }

    async componentDidMount(): void {
        await this._getExercises();
    }

    _getExercises = async () => {
        const url = API.baseurl + API.detailCurrilum(this.state.id);
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        await axios({method: 'get', url: url, headers: header})
            .then((response) => {
                console.log(response.data);
                let Data = [];
                Data.push(response.data.course);
                this.setState({
                    Data: Data,
                    isLoading: false,
                    DataLesson: response.data.data_lesson.unit_name,
                    DataUnit: response.data.data_lesson.data,
                });
                this.setState(prevState => ({
                    DataUnit: prevState.DataUnit.map(
                        obj => (Object.assign(obj, {isChecked: false})),
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
            });
    };
    _onChoiceUnit = (i) => {
        const {DataUnit} = this.state;
        this.setState({
            DataUnit: DataUnit.map(item => {
                if(item === i){
                    if(item.isChecked){
                        delete item.isChecked;
                    }else{
                        item.isChecked = true;
                    }
                }
                return item;
            })
        })
    };
    _renderItemItems = ({item, index}) => {
        return (
            <View>
                <View style={{
                    width: '100%',
                    height: SmartScreenBase.smPercenWidth * 12,
                    backgroundColor: '#00000030',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
                }}>
                    <Text style={{
                        color: '#fff',
                        fontWeight: '400',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                    }}>{item.unit_name}</Text>
                    <TouchableOpacity
                        style={{
                            width: SmartScreenBase.smPercenWidth * 8,
                            height: SmartScreenBase.smPercenWidth * 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                DataLesson: this.state.DataLesson.map(e => {
                                    if (e.unit_id !== item.unit_id) {
                                        return e;
                                    }
                                    return {...e, Change: !e.Change};
                                }),
                            });
                        }}
                    >
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 4,
                            height: SmartScreenBase.smPercenWidth * 5,
                            tintColor: '#fff',
                            transform: [{rotate: item.Change ? '180deg' : '0deg'}],
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'student_inbox_image11'}}/>

                    </TouchableOpacity>
                </View>
                {item.Change ? <View>
                        {this.state.DataUnit.filter(data => {
                            return data.unit_id === item.unit_id;
                        }).map((i, index) => (
                            <View style={{
                                width: '100%',
                                height: SmartScreenBase.smPercenWidth * 12,
                                backgroundColor: '#00000020',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
                                borderBottomWidth: 1,
                                borderColor: '#ffffff30'
                            }}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    marginLeft: SmartScreenBase.smPercenWidth * 10,
                                }}>
                                    <Text style={{
                                        color: '#ffffff70',
                                        fontWeight: '400',
                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                    }}>{i.unit_name}</Text>
                                </View>

                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this._onChoiceUnit(i);
                                    }}
                                >
                                    <View
                                        style={{
                                            width: SmartScreenBase.smPercenWidth * 8,
                                            height: SmartScreenBase.smPercenWidth * 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}

                                    >
                                        <Image style={{
                                            width: SmartScreenBase.smPercenWidth * 5,
                                            height: SmartScreenBase.smPercenWidth * 5,
                                        }}
                                               resizeMode={'contain'}
                                               source={{uri: 'mhchung_icon_08'}}/>
                                        {i.isChecked ? <Image style={{
                                                width: SmartScreenBase.smPercenWidth * 3,
                                                height: SmartScreenBase.smPercenWidth * 3,
                                                position: 'absolute',
                                            }}
                                                              resizeMode={'contain'}
                                                              source={{uri: 'lesson_speaking_image1'}}/>
                                            :
                                            null}

                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                        ))}
                    </View>
                    :
                    null}

            </View>
        );

    };
    _renderItem = ({item, index}) => {
        return (
            <View style={{
                flex: 1,
                width: '100%',
                paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            }}>
                <View style={{
                    width: '100%',
                    height: SmartScreenBase.smPercenWidth * 12,
                    backgroundColor: '#00000030',
                    marginTop: SmartScreenBase.smPercenWidth * 2,
                    borderTopRightRadius: SmartScreenBase.smPercenWidth * 2,
                    borderTopLeftRadius: SmartScreenBase.smPercenWidth * 2,
                    borderBottomRightRadius: !item.Change ? SmartScreenBase.smPercenWidth * 2 : 0,
                    borderBottomLeftRadius: !item.Change ? SmartScreenBase.smPercenWidth * 2 : 0,
                }}>
                    <View style={{
                        width: '100%',
                        height: SmartScreenBase.smPercenWidth * 12,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                        borderRadius: SmartScreenBase.smPercenWidth * 2,
                    }}>
                        <Text style={{
                            color: '#000',
                            fontWeight: '400',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>{item.name}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    ...this.state,
                                    Data: this.state.Data.map(e => {
                                        if (e.unit_id !== item.unit_id) {
                                            return e;
                                        }
                                        return {...e, Change: !e.Change};
                                    }),
                                });
                            }}
                        >
                            <Image style={{
                                width: SmartScreenBase.smPercenWidth * 8,
                                height: SmartScreenBase.smPercenWidth * 8,
                            }}
                                   resizeMode={'contain'}
                                   source={{uri: 'student_inbox_image6'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {item.Change &&
                <View style={{backgroundColor: '#00000030'}}>
                    <FlatList data={this.state.DataLesson} renderItem={this._renderItemItems}
                              keyExtractor={(item, index) => {
                                  return item.toString() + index.toString();
                              }}
                              showsVerticalScrollIndicator={false}
                              extraData={this.state}/>
                </View>
                }
            </View>
        );
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                <Header showBack={true} title={'Chọn bài tập'} goBack={() => this.props.navigation.goBack()}/>
                <View style={{flex: 10}}>
                    <FlatList data={this.state.Data} renderItem={this._renderItem}
                              keyExtractor={(item, index) => {
                                  return item.toString() + index.toString();
                              }}
                              showsVerticalScrollIndicator={false}
                              extraData={this.state}/>
                </View>
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#00283A',
                            width: SmartScreenBase.smPercenWidth * 50,
                            height: SmartScreenBase.smPercenWidth * 10,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('FinishSendWorkTeacherScreen');
                        }}>
                        <Text style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                        }}>Chấp nhận</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );

    }

}
