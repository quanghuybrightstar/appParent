import React, {Component} from 'react';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {
    Text,
    View,
    FlatList,
    Dimensions,
    Button,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image, Modal, ImageBackground, Alert,
} from 'react-native';
import axios from 'axios';
import API from '../../../API/APIConstant';
import Header from '../../../component/Header/Header';

SmartScreenBase.baseSetup();
export default class Check extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            isCheckAll: false,
            item: this.props.navigation.getParam('item'),
        };
    }

    async componentDidMount(): void {
        await this._getHW();
    }

    _getHW = async () => {
        const url = API.baseurl + API.getHW + this.state.item.exercise_id;
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
                        obj => (Object.assign(obj, {isChecked: false})),
                    ),
                }));
                console.log(this.state.Data);
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
    _renderItem = ({item, index}) => {
        return (
            <View style={{
                flex: 1,
                width: '100%',
                height: SmartScreenBase.smPercenHeight * 12,
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: SmartScreenBase.smPercenWidth * 4,
                    paddingRight: 10,
                }}>{index + 1}</Text>
                <View style={{
                    flex: 1,
                    alignItems: 'flex-end',
                }}>
                    <View style={{
                        width: '20%',
                        height: '100%',
                        position: 'absolute',
                        zIndex: 10,
                        left: 0,
                    }}>
                        <Image source={{uri: 'gv_liststudent_08'}} style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}>
                        </Image>
                    </View>
                    <View style={{
                        width: '90%',
                        height: '100%',
                        backgroundColor: '#fff',
                        zIndex: 1,
                        alignItems: 'flex-end',
                        borderRadius: 10,
                    }}>
                        <View style={{
                            width: '90%',
                            height: '100%',
                            zIndex: 1,
                            justifyContent: 'center',
                            paddingHorizontal: 10,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontWeight: '400',
                                    color: '#000',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                    paddingVertical: 5,
                                }}>{item.to_username}</Text>
                                <TouchableOpacity style={{
                                    width: SmartScreenBase.smPercenWidth * 6,
                                    height: SmartScreenBase.smPercenWidth * 6,
                                }}
                                                  onPress={() => {
                                                      this._onChoiceStudent(index);
                                                  }}
                                >
                                    <Image source={{uri: 'gv_55'}} style={{
                                        width: SmartScreenBase.smPercenWidth * 6,
                                        height: SmartScreenBase.smPercenWidth * 6,
                                        resizeMode: 'contain',
                                    }}/>
                                    {item.isChecked && (
                                        <Image source={{uri: 'gv_56'}} style={{
                                            width: SmartScreenBase.smPercenWidth * 6,
                                            height: SmartScreenBase.smPercenWidth * 6,
                                            position: 'absolute',
                                            right: 0,
                                            bottom: 3,
                                            resizeMode: 'contain',
                                        }}/>
                                    )}
                                </TouchableOpacity>


                            </View>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Image source={{uri: 'student_managerfile_image2'}} style={{
                                    width: SmartScreenBase.smPercenWidth * 7,
                                    height: SmartScreenBase.smPercenWidth * 7,
                                    resizeMode: 'contain',
                                }}/>
                                <Text style={{
                                    fontWeight: '400',
                                    color: '#000',
                                    fontSize: SmartScreenBase.smPercenWidth * 4,
                                    marginLeft: 10,
                                }}>Nộp vào {item.deadline}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    };

    _onChoiceAll = () => {
        const copied = [...this.state.Data];
        copied.map((e) => {
            e.isChecked = !this.state.isCheckAll;
        });
        this.setState({Data: copied, isCheckAll: !this.state.isCheckAll});
    };
    _onChoiceStudent = (index) => {
        const copied = [...this.state.Data];
        copied[index].isChecked = !copied[index].isChecked;
        this.setState({Data: copied});
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                <Header navigation={this.props.navigation} title={'Chưa chấm'}/>
                <View style={{flex: 10, paddingHorizontal: 10}}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: SmartScreenBase.smPercenWidth * 5,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                    }}>{this.state.item.exercise_name}</Text>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: SmartScreenBase.smPercenWidth * 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>Các bài chưa chấm()</Text>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                        }}
                                          onPress={() => {
                                              this._onChoiceAll();
                                          }}
                        >
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                                marginHorizontal: 10,
                            }}>All</Text>
                            <Image source={{uri: 'gv_55'}} style={{
                                width: SmartScreenBase.smPercenWidth * 6,
                                height: SmartScreenBase.smPercenWidth * 6,
                                resizeMode: 'contain',
                            }}/>
                            {this.state.isCheckAll && (
                                <Image source={{uri: 'gv_56'}} style={{
                                    width: SmartScreenBase.smPercenWidth * 6,
                                    height: SmartScreenBase.smPercenWidth * 6,
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 3,
                                    resizeMode: 'contain',
                                }}/>
                            )}
                        </TouchableOpacity>
                    </View>

                    <FlatList data={this.state.Data} renderItem={this._renderItem}
                              keyExtractor={(item, index) => {
                                  return item.toString() + index.toString();
                              }}
                              showsVerticalScrollIndicator={false}
                              extraData={this.state}/>
                </View>
                <View style={{flex: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={{
                        width: '60%',
                        height: SmartScreenBase.smPercenWidth * 12,
                        backgroundColor: '#00283A',
                        borderRadius: SmartScreenBase.smPercenWidth * 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                        }}>Nhờ Sunday chấm</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        );

    }

}
