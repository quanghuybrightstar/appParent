import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    ImageBackground,
} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import axios from 'axios';
import Header from '../../../component/Header/';
import LoadingScreen from '../../LoadingScreen';
import {connect} from 'react-redux'
import APIBase from '../../../base/APIBase';
SmartScreenBase.baseSetup();

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            // id: 139,
        };
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this._getExercises()
            }
        );
        // this._getExercises();
    }

    _getExercises = () => {
        const url = API.baseurl+'api_curriculum/curriculum_name?user_id=' + this.props.dataLogin.id;
        const header = {
            'Content-Type': 'application/json',
            jwt_token: APIBase.jwt_token,
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
        };
        axios({ method: 'get', url: url, headers: header })
            .then((response) => {
                this.setState({ Data: response.data.data_curriculum });
            })
            .catch((error) => {
                console.log(error.response.data);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
                this.setState({ isLoading: false });
            });
    };
    _renderItem = ({ item, index }) => {
        return (
            <View style={{
                flex: 1,
                height: SmartScreenBase.smPercenWidth * 28,
                padding: SmartScreenBase.smPercenWidth * 2,
                paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                backgroundColor: 'white',
                borderRadius: SmartScreenBase.smPercenWidth * 3,
                marginTop: SmartScreenBase.smPercenHeight,
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                }}
                    onPress={() => {
                        this.props.navigation.navigate('EditCourseScreen', {
                            item: item,
                            title:item.curriculum_name,
                            class_curriculum_id: item.class_curriculum_id
                        });
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{
                            fontWeight: '600',
                            color: 'black',
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                        }}>{item.curriculum_name}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,
                        }}
                            resizeMode={'contain'}
                            source={{ uri: 'student_managerfile_image1' }} />
                        <Text style={{
                            fontWeight: '400',
                            color: 'black',
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>Ngày tạo : {item.created_at}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,
                        }}
                            resizeMode={'contain'}
                            source={{ uri: 'gv_102' }} />
                        <Text style={{
                            fontWeight: '400',
                            color: 'black',
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>Số lượng unit : {item.json_data_curriculum ? item.json_data_curriculum : 0}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <ImageBackground source={{ uri: 'imagebackground' }} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                <Header showBack={true} title={'Quản lý khóa học'} goBack={() => this.props.navigation.goBack()}/>
                {/*<Header navigation={this.props.navigation} title={'Quản lý khóa học'} />*/}
                <View style={{
                    flex: 12,
                    paddingTop: SmartScreenBase.smPercenWidth * 5,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                }}>
                    {this.state.Data.length !== 0 ?
                        <FlatList data={this.state.Data} renderItem={this._renderItem}
                            keyExtractor={(item, index) => {
                                return item.toString() + index.toString();
                            }}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state} />
                        :
                        <LoadingScreen />
                    }
                </View>
            </ImageBackground>
        );
    }
}
function mapStateToProps(state) {
    return {
        dataLogin: state.AuthStackReducer.dataLogin,
    }
}
export default connect(mapStateToProps)(index);
