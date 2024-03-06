import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    Dimensions,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform, ImageBackground, Alert,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import timePicker from '../../../src/screens/Parent/ConnectedAccount/TimePicker/timePicker';
import SmartScreenBase from '../../base/SmartScreenBase';
import API from '../../API/APIConstant';
import axios from 'axios';
import {connect} from 'react-redux';
import StyleTeacher from '../ModalAlam/StyleTeacher';
import IconNext from 'react-native-vector-icons/Foundation';
import IconNext1 from 'react-native-vector-icons/Foundation';
import {hoanthanh} from '../../redux/actions/hoanthanh';

SmartScreenBase.baseSetup();
let lenght = 0;

class lishAttach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            day: {},
            showCalander: false,
            time: '',
            checkday: 'from',
            markedDates: {},
            dateSelectFrom: 'Bắt đầu',
            dateSelectTo: 'Kết thúc',
            isCalendaTo: false,
            corlorTextfrom: '#fff',
            corlorTextTo: '#a5a5a5ff',
            ShowAlert: false,
            Message: '',
            ShowCheck: false,
            indexne: '',
            typeScreen: 'PH',
            data_answer: [],
            idQues: null,
            fileDinhkem: null,
        };
    }

    componentDidMount(): void {
        const {data_answer, time, navigation} = this.props;
        this.setState({data_answer: data_answer});
        this.setState({idQues: navigation.getParam('id')});
        let arr = [data_answer];
        this.setState({checkType: this.props.checkType});
        const url =
            API.baseurl+'api_resources/my_resources';
        const header = {
            'Content-Type': 'application/json',
            jwt_token:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMiLCJ1c2VybmFtZSI6ImFkdXltbiIsInRpbWVfbG9naW4iOjE1OTQxNzA5NjJ9.fx3lGCIg40KcgafiIGzFzSBf1Iv_dqjAYyuYr73lqZE',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        axios({method: 'get', url: url, headers: header})
            .then((response) => {
                console.log(response.data.resources);
                this.setState({Data: response.data.resources});
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
                }
            });

    }

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    let copi = this.state.data_answer.slice('');
                    copi[this.state.idQues].file = item;
                    this.props.dispatch(hoanthanh(copi));
                    this.setState({fileDinhkem: item});
                    this.props.navigation.goBack();
                }}
                style={{
                    width: '100%',
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    marginTop: 10,
                    height: height * 0.15,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                }}>
                <View style={{width: '100%', height: '30%', justifyContent: 'center', flexDirection: 'row'}}>
                    <View style={{width: '85%', height: '100%'}}>
                        <Text style={{fontColor: '#000', fontWeight: 'bold'}}>
                            {item.title.length < 30 ? item.title : item.title.slice(0,30) + '...'}
                        </Text>
                    </View>
                    <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        {
                            item.type === 'audio' ?
                                <IconNext name="volume" color="#FF9900" size={22}/>
                                :
                                item.type === 'writing' ?
                                    <Image
                                        style={{
                                            width: '80%',
                                            height: '80%',
                                        }}
                                        resizeMode={'contain'}
                                        source={{uri: 'gv_33'}}
                                    />
                                    :
                                    <IconNext1 name="video" color="#CC0000" size={22}/>
                        }
                    </View>
                </View>
                <View style={{width: '100%', height: '30%', flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{width: '10%', height: '100%'}}>
                        <Image
                            style={{
                                width: '80%',
                                height: '80%',
                            }}
                            resizeMode={'contain'}
                            source={{uri: 'gv_29'}}
                        />
                    </View>
                    <View style={{width: '90%', height: '100%', justifyContent: 'center'}}>
                        <Text> Ngày tạo: {item.created_at}</Text>
                    </View>
                </View>
                {
                    item.id === this.state.data_answer[this.state.idQues].file.id ?
                        <View style={{width: '100%', height: '40%', flexDirection: 'row', justifyContent: 'center'}}>
                            <View
                                style={{width: '60%', height: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    let copi = this.state.data_answer.slice('');
                                    copi[this.state.idQues].file = '';
                                    this.props.dispatch(hoanthanh(copi));
                                    this.props.navigation.goBack();
                                }}
                                style={{
                                    width: '40%',
                                    height: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    backgroundColor: '#FF9933',
                                    borderRadius: 5,
                                    alignItems: 'center',
                                }}>
                                <Text style={{color: '#FFF', fontWeight: 'bold'}}>Bỏ đính kèm</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                }

            </TouchableOpacity>
        );

    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                <View
                    style={[
                        StyleTeacher.ViewHeader,
                        {justifyContent: 'space-between', alignItems: 'center'},
                    ]}>
                    <View
                        style={{
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{
                                width: SmartScreenBase.smPercenWidth * 5,
                                height: SmartScreenBase.smPercenWidth * 5,
                            }}
                        >
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                resizeMode={'contain'}
                                source={{uri: 'imageback'}}
                            />
                        </TouchableOpacity>
                        <Text
                            style={[
                                StyleTeacher.txt_Title,
                                {color: 'white', marginLeft: SmartScreenBase.smPercenWidth * 5},
                            ]}>
                            Đính kèm nội dung
                        </Text>
                    </View>
                </View>
                <View style={{
                    width: '100%',
                    height: '80%',
                    justifyContent: 'center',
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                }}>
                    <FlatList
                        data={this.state.Data}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => {
                            return item.toString() + index.toString();
                        }}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                    />
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.hoanthanhReducer.data_answer,
        time: state.timegiaobai.data_answer,
    };
}

export default connect(mapStateToProps)(lishAttach);

