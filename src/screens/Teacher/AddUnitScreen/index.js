import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    ScrollView,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image, Alert, ImageBackground,
    Platform
} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import PickTime from '../../../component/PickTime';
import API from '../../../API/APIConstant';
import axios from 'axios';
import ModalTimePicker from '../../../component/modalTimePicker/index';
const { width, height } = Dimensions.get('window')
SmartScreenBase.baseSetup();
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataVocabulary: [],
            dataGrammar: [],
            timeStart: null,
            timeEnd: null,
            dataAdd: [],
            nameUnit: '',
            day: '',
            visible: false,
            dayStart: new Date(),
            dayEnd: new Date(),
            status: 'start',
            dataLesson: [
                {
                    lesson_type: 'pronunciation',
                    data: []

                },
                {
                    lesson_type: 'vocabulary',
                    data: []
                },
                {
                    lesson_type: 'grammar',
                    data: []
                },
                {
                    lesson_type: 'reading',
                    data: []
                },
                {
                    lesson_type: 'listening',
                    data: []
                },
                {
                    lesson_type: 'speaking',
                    data: []
                },
                {
                    lesson_type: 'writing',
                    data: []
                },

            ],

        };

    }
    componentDidMount() {
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this._convertNewData()
            }
        );
    }
    _convertNewData = () => {
        let dataL = [...this.state.dataLesson];
        let dataN = this.props.navigation.getParam('dataNew');
        let dataA = [...this.state.dataAdd];
        let itemData = []
        if (this.props.navigation.getParam('dataNew')) {
            dataL.forEach((item, index) => {
                if (dataN.lesson_type == item.lesson_type) {
                    itemData = item.data
                    dataN.data.forEach((itm, ind) => {
                        let number = itemData.findIndex(e => { return e.lesson_id == itm.lesson_id });
                        if (number < 0) {
                            item.data.push(itm);
                            dataA.push(itm.lesson_id)
                        }
                    })
                }
            })
        }
        this.setState({ dataLesson: dataL, dataAdd: dataA, });
    };
    _deleteItem = (index, ind) => {
        let dataL = [...this.state.dataLesson];
        let dataA = [...this.state.dataAdd]
        let number = dataA.findIndex(e => { return e == dataL[index].data[ind].lesson_id });
        dataA.splice(number, 1);
        dataL[index].data.splice(ind, 1);
        this.setState({
            dataLesson: dataL,
            dataAdd: dataA
        })
    };

    _goBack = () => {
        this.props.navigation.goBack();
    };

    _changeText = (text) => {
        this.setState({ nameUnit: text })
    }
    _saveData = async () => {
        const url = API.baseurl+"api_class/add_new_unit";
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'jwt_token': this.props.navigation.getParam('jwt_token'),
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        var qs = require('qs');
        let data = qs.stringify({
            list_lesson: JSON.stringify(this.state.dataAdd),
            unit_name: this.state.nameUnit,
            id_curriculum: this.props.navigation.getParam('curriculum_id'),
            id_class: this.props.navigation.getParam('class_id'),
            start_date: this.state.dayStart.getFullYear() + '-' + this.state.dayStart.getMonth() + '-' + this.state.dayStart.getDay(),
            end_date: this.state.dayEnd.getFullYear() + '-' + this.state.dayEnd.getMonth() + '-' + this.state.dayEnd.getDay(),
        });
        if (this.state.nameUnit.length) {
            try {
                const resspronse = await axios({ method: 'post', data, headers, url })
                console.log(resspronse.data)
                if (resspronse.data.status) {
                    this.props.navigation.goBack();
                }
                Alert.alert('Thông báo', resspronse.data.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ])

            }
            catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert('Thông báo', 'Vui lòng nhập tên Unit', [
                {text: 'Đồng ý', style: 'cancel'}
            ])
        }
    };
    _renderItem = ({ item, index }) => {
        return (
            <View style={{

            }} >
                <Text style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: SmartScreenBase.smPercenWidth * 4,
                    textTransform: 'capitalize',
                    marginLeft: 15
                }}>{item.lesson_type}</Text>
                <View style={{ marginTop: 10, width: '100%', paddingHorizontal: 5 }}>
                    {
                        item.data.map((itm, ind) => {
                            return (
                                <View style={{
                                    width: '100%',
                                    minHeight: 50,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#fff',
                                    alignItems: 'center',
                                    borderRadius: 7,
                                    paddingHorizontal: 20,
                                    marginVertical: 5
                                }}>
                                    <Text style={{ width: '70%' }}>{itm.lesson_name}</Text>
                                    <TouchableOpacity style={{ height: 50, justifyContent: 'center' }} onPress={() => { this._deleteItem(index, ind) }}>
                                        <Image source={{ uri: 'gv_108' }} style={{ resizeMode: 'contain', width: width / 18, height: width / 18 }} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FFFFFF60',
                        borderRadius: 8,
                        paddingVertical: SmartScreenBase.smPercenWidth * 4,
                        marginBottom: SmartScreenBase.smPercenWidth * 4,
                    }}
                    onPress={() => { this.props.navigation.navigate('LibraryScreen', { lesson_type: item.lesson_type, Type: 'add Unit' }) }}>
                    <Image
                        source={{ uri: 'gv_109' }}
                        style={{
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    _openTimeStart = () => {
        this.setState({ visible: true, status: 'start' });
    }
    _openTimeEnd = () => {
        this.setState({ visible: true, status: 'end' });
    }
    _onClose = (value) => {
        this.setState({ visible: value })
    }
    _saveDayStart = async (timeStart) => {
        console.log('timeStart', timeStart)
        // if(timeStart.length){

        // }
        if (timeStart) {
            await this.setState({
                dayStart: timeStart
            })
            this.PickTime._Load()
        }
    }
    _saveDayEnd = (timeEnd) => {
        // if(timeStart.length){
        if (timeEnd) {
            this.setState({
                dayEnd: new Date(timeEnd)
            });
            this.PickTime._Load()
        }

    }
    render() {
        return (
            <ImageBackground source={{ uri: 'imagebackground' }} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: height / 9,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    flexDirection: 'row',
                }}>
                    <View style={{
                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            onPress={this._goBack}
                        >
                            <Image style={{
                                width: SmartScreenBase.smPercenWidth * 5,
                                height: SmartScreenBase.smPercenWidth * 5,
                            }}
                                resizeMode={'contain'}
                                source={{ uri: 'imageback' }} />
                        </TouchableOpacity>

                        <Text style={{
                            color: 'white',
                            marginLeft: SmartScreenBase.smPercenWidth * 5,
                            fontWeight: '800',
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                        }}>Thêm Unit</Text>
                    </View>
                </View>
                <View style={{
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        height: height / 3,
                        justifyContent: 'space-around',
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    }}>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            backgroundColor: '#ffffff25',
                            borderRadius: 5,
                            height: height / 15
                        }}>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Image style={{
                                    width: SmartScreenBase.smPercenWidth * 10,
                                    height: SmartScreenBase.smPercenWidth * 10,
                                }}
                                    resizeMode={'contain'}
                                    source={{ uri: 'imagefooter1' }} />
                            </View>
                            <View style={{
                                justifyContent: 'center',
                            }}>
                                <TextInput style={{
                                    width: width / 1.4,
                                    fontWeight: '400',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                    color: '#fff',
                                    paddingLeft: '5%',
                                }}
                                    placeholder="Tên Unit"
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor="#ffffff"
                                    onChangeText={(text) => {
                                        this._changeText(text)
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{
                            width: '100%',
                            height: height / 6,
                            paddingBottom: SmartScreenBase.smPercenWidth * 4,
                        }}>
                            <PickTime
                                ref={refs => { this.PickTime = refs }}
                                dayStart={this.state.dayStart}
                                dayEnd={this.state.dayEnd}
                                modalTimeStart={this._openTimeStart}
                                modalTimeEnd={this._openTimeEnd}
                            />
                        </View>
                    </View>
                    <View style={{
                        ...Platform.select({
                            ios:{height: height / 2.3,},
                            android:{
                                height: height / 2.5,
                            }
                        }),
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,

                    }}>
                        <FlatList
                            data={this.state.dataLesson}
                            renderItem={this._renderItem}
                            extraData={this.state}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity style={{
                            width: '45%',
                            backgroundColor: '#00283A',
                            borderRadius: SmartScreenBase.smPercenWidth * 5,
                            paddingVertical: SmartScreenBase.smPercenWidth * 2,
                            marginVertical: SmartScreenBase.smPercenWidth * 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            onPress={this._saveData}
                        >
                            <Text style={{
                                color: 'white',
                                fontWeight: '800',
                                fontSize: SmartScreenBase.smPercenWidth * 5,
                            }}>Xong</Text>
                        </TouchableOpacity>
                    </View>
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
export default index;
