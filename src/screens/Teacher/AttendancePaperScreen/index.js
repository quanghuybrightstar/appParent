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
    Alert,
} from 'react-native';
import Styles from '../workDeliveredTeacherScreen/workDeliveredTeacherScreenStyles';
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import axios from 'axios';
import  ItemAttenDance from '../../../component/ItemAttenDance/index';
import ModalSendComments from '../../../component/ModalSendComments/index'
import ModalAlam from '../../../component/ModalAlam';
import Header from '../../../component/Header/Header';

const {width, height} = Dimensions.get('window');

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            DataFake:[],
            isChooseAll:false,
            title:'',
            item:this.props.navigation.getParam('item'),
            DataPresent:[]
        };
    }

    async componentDidMount(): void {
        await this._getExercisesDelivered();
    }

    _getExercisesDelivered = async () => {
        const url = API.baseurl + API.AttendanceDetail + this.state.item.id;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        axios({method: 'get', url: url, headers: header})
            .then((response) => {
                const DataPresent = response.data.data.list_present;
                const DataAbsence = response.data.data.list_absence;
                DataPresent.map((e)=>(Object.assign(e,{present:true})));
                this.setState({Data: DataAbsence.concat(DataPresent)})
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
                height: width / 4,
                flexDirection:'row',
                marginBottom:SmartScreenBase.smPercenWidth * 3,
                backgroundColor:'#fff',
                borderRadius:SmartScreenBase.smPercenWidth * 3,
                paddingHorizontal:SmartScreenBase.smPercenWidth * 3,
                alignItems:'center'
            }}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Image style={{
                        width: width / 6,
                        height: width / 6,
                    }}
                           resizeMode={'contain'}
                           source={{uri: 'gv_liststudent_07'}}/>

                </View>
                <View style={{
                    flex:5
                }}>
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        paddingHorizontal:SmartScreenBase.smPercenWidth * 3,
                        alignItems:'center'
                    }}>
                        <Text style={{
                            fontWeight: '800',
                            color: 'gray',
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                        }}>{item.user_name}</Text>
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,
                        }}
                        >
                            <Image style={{
                                width: SmartScreenBase.smPercenWidth * 6,
                                height: SmartScreenBase.smPercenWidth * 6,
                                zIndex:1
                            }}
                                   resizeMode={'contain'}
                                   source={{uri: 'gv_55'}}/>
                            {item.present?<Image style={{
                                    width: SmartScreenBase.smPercenWidth * 6,
                                    height: SmartScreenBase.smPercenWidth * 6,
                                    position:'absolute',
                                    right:0,
                                    zIndex:1000
                                }}
                                                   resizeMode={'contain'}
                                                   source={{uri: 'gv_56'}}/>
                                :
                                null}
                        </View>
                    </View>
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingHorizontal:SmartScreenBase.smPercenWidth * 3,
                        alignItems:'center'
                    }}>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'gv_117'}}/>
                        <TouchableOpacity style={{
                            width:'39%',
                            height:'50%',
                            backgroundColor:'#32b69e',
                            borderRadius:12,
                            alignItems:'center',
                            justifyContent:'center',
                            marginHorizontal:SmartScreenBase.smPercenWidth * 2,
                        }}
                        >
                            <Text style={{
                                fontWeight: '800',
                                color: 'white',
                                fontSize: SmartScreenBase.smPercenWidth * 3,
                            }}>Nhận xét</Text>
                        </TouchableOpacity>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                            marginHorizontal:5
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'student_inbox_image1'}}/>
                        <TouchableOpacity style={{
                            width:'39%',
                            height:'50%',
                            backgroundColor:'#00283A',
                            borderRadius:12,
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                            <Text style={{
                                fontWeight: '800',
                                color: 'white',
                                fontSize: SmartScreenBase.smPercenWidth * 3,
                            }}>Gửi phụ huynh</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={Styles.container}>
                <Header navigation={this.props.navigation} title={'Quản lý điểm danh'}/>
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
                        backgroundColor:'#fff'

                    }}>
                        <View style={{
                            flex:1.3,
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                            <Image style={{
                                width:'90%',
                                height:'90%',
                                borderRadius:10,
                            }}
                                   resizeMode={'stretch'}
                                   source={{uri: 'student_profile_image4'}}/>
                        </View>
                        <View style={{
                            flex:2,
                            paddingHorizontal:SmartScreenBase.smPercenWidth * 3,
                        }}>
                            <Text style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: SmartScreenBase.smPercenWidth * 5,
                                flex:1,
                                textAlignVertical:'center'
                            }}>{this.state.item.class_name}</Text>
                            <View style={{
                                flex:1,
                                flexDirection:'row',

                            }}>
                                <Image style={{
                                    width: SmartScreenBase.smPercenWidth * 7,
                                    height: SmartScreenBase.smPercenWidth * 7,
                                }}
                                       resizeMode={'contain'}
                                       source={{uri: 'student_managerfile_image1'}}/>
                                <Text style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: SmartScreenBase.smPercenWidth * 3.5,
                                    marginLeft:SmartScreenBase.smPercenWidth * 3,
                                }}>27/07/2019</Text>
                                <TouchableOpacity style={{
                                    width: SmartScreenBase.smPercenWidth * 7,
                                    height: SmartScreenBase.smPercenWidth * 7,
                                    position:'absolute',
                                    right:0
                                }}>
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
                    flex: 9.5,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                }}>
                    <FlatList data={this.state.Data} renderItem={this._renderItem}
                              keyExtractor={(item, index) => {
                                  return item.toString() + index.toString();
                              }}
                              showsVerticalScrollIndicator={false}
                              extraData={this.state}/>
                </View>

            </ImageBackground>

        );
    }

}

