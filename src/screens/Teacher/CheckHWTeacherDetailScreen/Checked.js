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
export default class Checked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            item:this.props.navigation.getParam('item')
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
                marginTop:10,
                alignItems:'center'
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: SmartScreenBase.smPercenWidth * 4,
                    paddingRight:10
                }}>{index + 1}</Text>
                <View style={{
                    flex: 1,
                    alignItems: 'flex-end',
                }}>
                    <View style={{
                        width:SmartScreenBase.smPercenWidth * 20,
                        height:SmartScreenBase.smPercenWidth * 7,
                        position:'absolute',
                        right:10,
                        top:-5,
                        zIndex:10,
                        alignItems:'center'
                    }}>
                        <View style={{
                            flexDirection:'row',
                            position:'absolute',
                            top:0,
                            zIndex:10,
                            alignItems:'flex-end'
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: SmartScreenBase.smPercenWidth * 5,
                            }}>{item.score}</Text>
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: SmartScreenBase.smPercenWidth * 2.5,
                                paddingVertical:2
                            }}>ĐIỂM</Text>
                        </View>
                        <Image source={{ uri: "gvn_40" }} style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }} >
                        </Image>
                    </View>
                    <View style={{
                        width: '20%',
                        height: '100%',
                        position: 'absolute',
                        zIndex: 10,
                        left:0,
                    }}>
                        <Image source={{ uri: "gv_liststudent_08" }} style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }} >
                        </Image>
                    </View>
                    <View style={{
                        width: '90%',
                        height: '100%',
                        backgroundColor: '#fff',
                        zIndex:1,
                        alignItems:'flex-end',
                        borderRadius:10
                    }}>
                        <View style={{
                            width: '90%',
                            height: '100%',
                            zIndex:1,
                            justifyContent:'center',
                            paddingHorizontal:15
                        }}>
                            <Text style={{
                                fontWeight: '400',
                                color: '#000',
                                fontSize: SmartScreenBase.smPercenWidth * 5,
                                paddingVertical:5
                            }}>{item.to_username}</Text>
                            <View style={{
                                flexDirection:'row'
                            }}>
                                <Image source={{ uri: "student_managerfile_image2" }} style={{
                                    width:SmartScreenBase.smPercenWidth * 7,
                                    height:SmartScreenBase.smPercenWidth * 7,
                                    resizeMode: 'contain',
                                }} />
                                <Text style={{
                                    fontWeight: '400',
                                    color: '#000',
                                    fontSize: SmartScreenBase.smPercenWidth * 4,
                                    marginLeft:10
                                }}>Nộp vào {item.deadline}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                <Header navigation={this.props.navigation} title={'Đã chấm'}/>
                <View style={{flex: 10, paddingHorizontal: 10, marginBottom: SmartScreenBase.smPercenHeight * 4}}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: SmartScreenBase.smPercenWidth * 5,
                        paddingVertical: 10,
                    }}>{this.state.item.exercise_name}</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                    }}>Các bài đã chấm </Text>
                    <FlatList data={this.state.Data} renderItem={this._renderItem}
                              keyExtractor={(item, index) => {
                                  return item.toString() + index.toString();
                              }}
                              showsVerticalScrollIndicator={false}
                              extraData={this.state}/>
                </View>
                <View style={{flex: 1.5,flexDirection:'row',alignItems:'center'}}>
                    <View style={{
                        flex:1/3,
                        alignItems:'center',
                    }}>
                        <Text style={{
                            fontWeight: '400',
                            color: '#fff',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>Điểm trung bình:</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: SmartScreenBase.smPercenWidth * 10,
                        }}>5.6</Text>
                    </View>
                    <View style={{
                        width:1,
                        height:'80%',
                        backgroundColor:'#FFFFFF30'
                    }}/>
                    <View style={{
                        flex:1/3,
                        alignItems:'center'
                    }}>
                        <Text style={{
                            fontWeight: '400',
                            color: '#fff',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>Điểm cao nhất:</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: SmartScreenBase.smPercenWidth * 10,
                        }}>5.6</Text>
                    </View>
                    <View style={{
                        width:1,
                        height:'80%',
                        backgroundColor:'#FFFFFF30'
                    }}/>
                    <View style={{
                        flex:1/3,
                        alignItems:'center'
                    }}>
                        <Text style={{
                            fontWeight: '400',
                            color: '#fff',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>Điểm thấp nhất:</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: SmartScreenBase.smPercenWidth * 10,
                        }}>5.6</Text>
                    </View>

                </View>
            </ImageBackground>
        );

    }

}
