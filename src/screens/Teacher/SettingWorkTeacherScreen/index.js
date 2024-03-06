import React, {Component} from 'react';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {
    Text,
    View,
    FlatList,
    Alert,
    TouchableOpacity,
    Image, Modal, ImageBackground,
    TouchableWithoutFeedback,
} from 'react-native';

SmartScreenBase.baseSetup();
// import ItemListStudents from '../../../component/ItemListStudents/index';
import axios from 'axios';
import API from '../../../API/APIConstant';
import {connect} from 'react-redux';
import Header from '../../../component/Header/Header';
import PickTime from '../../../component/PickTime';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            isChoiceAll: false,
            isAccept: false,
            DataStudents: [],
            timeStart: null,
            timeEnd: null,
        };
    }

    componentDidMount() {
        this._getListStudents();
    }

    _getListStudents = () => {
        const url = API.baseurl + API.getListStudents;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        axios({method: 'get', url: url, headers: header})
            .then((response) => {
                console.log(response.data.data);
                this.setState({Data: response.data.data});
                this.setState(prevState => ({
                    Data: prevState.Data.map(
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
            }).finally(() => {
            this.setState({isLoading: false});
        });
    };
    _choiceAll = () => {
        this.setState(prevState => ({
            Data: prevState.Data.map(
                obj => (Object.assign(obj, {isChecked: !this.state.isChoiceAll})),
            ),
            isChoiceAll: !this.state.isChoiceAll,
        }));
    };
    _onChoiceStudent = (index) => {
        const copied = [...this.state.Data];
        copied[index].isChecked = !copied[index].isChecked;
        this.setState({Data: copied});
    };
    // _renderItem = ({item, index}) => {
    //     return (
    //         <ItemListStudents Data={item} _onChoiceStudent={() => this._onChoiceStudent(index)} index={index}/>
    //     );
    // };
    _onSubmit = () => {
        const DataStudents = this.state.Data.filter((t) => {
            if (t.isChecked == true) {
                return t.id;
            }
        });
        console.log(DataStudents.map((e) => (e.id)));
        this.setState({DataStudents});
        // this.props.dispatch({type: 'ADDSTUDENT', Student: DataStudents.map((e) => (e.id))});
    };

    setTime = (timeStart, timeEnd) => {
        this.setState({timeStart, timeEnd});
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}}>
                <Header navigation={this.props.navigation} title={'Giao bài'}/>
                <View style={{flex: 12}}>
                    <View>
                        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 5}}>
                            <View>
                                <View>
                                    <Text>Chọn học viên</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                                    <Text>All</Text>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            this._choiceAll();
                                        }}
                                    >
                                        <View>
                                            {this.state.isChoiceAll ?
                                                <Image source={{uri: 'gv_56'}}/>
                                                :
                                                null}

                                            <Image style={{
                                                zIndex: 1,
                                                width: SmartScreenBase.smPercenWidth * 6,
                                                height: SmartScreenBase.smPercenWidth * 6,
                                            }}
                                                   resizeMode={'contain'}
                                                   source={{uri: 'gv_55'}}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={{
                                flex: 7,
                                paddingVertical: SmartScreenBase.smPercenWidth * 5,
                            }}>
                                <FlatList data={this.state.Data} renderItem={this._renderItem}
                                          keyExtractor={(item, index) => {
                                              return item.toString() + index.toString();
                                          }}
                                          showsVerticalScrollIndicator={false}
                                          extraData={this.state}/>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, paddingHorizontal: SmartScreenBase.smPercenWidth * 7}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <TouchableWithoutFeedback
                                              onPress={() => {
                                                  this.setState({isAccept: !this.state.isAccept});
                                              }}
                            >
                                <View style={{flex: 1}}>
                                    {this.state.isAccept ? <Image source={{uri: 'gv_56'}}/>
                                        :
                                        null}
                                    <Image style={{
                                        zIndex: 1,
                                        width: SmartScreenBase.smPercenWidth * 6,
                                        height: SmartScreenBase.smPercenWidth * 6,
                                        tintColor: '#fff',
                                    }}
                                           resizeMode={'contain'}
                                           source={{uri: 'gv_55'}}/>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={{flex: 8}}>
                                <Text>Cho phép học viên làm trước ngày bắt đầu</Text>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            <Text>Đặt ngày bắt đầu, ngày kết thúc cho cả nhóm bài tập (tùy
                                chọn):</Text>
                        </View>
                        <View style={{flex: 3}}>
                            {/* <PickTime
                                onPress={() => {
                                    this.props.navigation.navigate('PickDateTimeScreen', {setTime: (timeStart, timeEnd) => this.setTime(timeStart, timeEnd)});
                                }}
                                // timeStart={this.state.timeStart}
                                // timeEnd={this.state.timeEnd}
                            /> */}
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
                                        this._onSubmit();
                                    }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                    }}>Tiếp tục</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );

    }

}

export default index;
