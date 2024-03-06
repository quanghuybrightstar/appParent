import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity, Alert
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import API from '../../API/APIConstant';
import axios from 'axios';
import {connect} from 'react-redux';
import APIBase from "../../base/APIBase";

SmartScreenBase.baseSetup();
let lenght = 0;

class Sunday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
        };
    }

    componentDidMount() {
        // const { data_answer } = this.props;
        // console.log('ahihi',data_answer);
        this._getCourse();
    }

    _getCourse = async () => {
        const url = API.baseurl + API.getCourse;
        const header = {
            'Content-Type': 'application/json',
            jwt_token: APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        await APIBase.postDataJson('get', url)
            .then(response => {
                // console.log(response.data.courses);
                this.setState({Data: response.data.courses});
            })
            .catch(error => {
                console.log(error);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet' , [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
                this.setState({isLoading: false});
            });
    };
    _renderItem = ({item, index}) => {
        lenght = this.state.Data.length;
        return (
            <TouchableOpacity
                onPress={() => this.props.hidePopup(item.id)}
                style={{
                    width: '100%',
                    height: SmartScreenBase.smPercenWidth * 18,
                    padding: SmartScreenBase.smPercenWidth * 2,
                    backgroundColor: '#00000030',
                    flexDirection: 'row',
                    borderBottomWidth: index === lenght - 1 ? 0 : 1,
                    borderTopRightRadius: index === 0 ? 5 : 0,
                    borderTopLeftRadius: index === 0 ? 5 : 0,
                    borderBottomRightRadius: index === lenght - 1 ? 5 : 0,
                    borderBottomLeftRadius: index === lenght - 1 ? 5 : 0,
                    borderBottomColor: '#FFF',
                }}>
                <Text
                    style={{
                        color: 'white',
                        fontWeight: '400',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                    }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    paddingTop: SmartScreenBase.smPercenWidth * 10,
                }}>
                <View style={{flex: 10}}>
                    <FlatList
                        Style={{borderRadius: 10}}
                        data={this.state.Data}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => {
                            return item.toString() + index.toString();
                        }}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                    />
                </View>
                <View
                    style={{
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: SmartScreenBase.smPercenWidth * 60,
                            height: SmartScreenBase.smPercenHeight * 7,
                            justifyContent: 'center', alignItems: 'center',
                            backgroundColor: '#01283A',
                            borderRadius: SmartScreenBase.smPercenHeight * 3,
                            paddingHorizontal: 3,
                        }}
                        onPress={() => this.props.navigation.navigate('ChooseFromSaveScreen')}
                    >
                        <Text style={{color: '#FFFFFF', fontSize: SmartScreenBase.smFontSize * 42, fontWeight: 'bold'}}>Chọn từ</Text>
                        <Text style={{color: '#FFFFFF', fontSize: SmartScreenBase.smFontSize * 42, fontWeight: 'bold'}}>danh sách yêu thích</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.timegiaobai.data_answer,
    };
}

export default connect(mapStateToProps)(Sunday);
