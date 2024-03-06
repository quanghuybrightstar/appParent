import React, {Component} from 'react';
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
import ItemEditUnit from '../../../component/ItemEditUnit/index';
import API from '../../../API/APIConstant';
import axios from 'axios';
import ModalCalendars from '../../../component/modalCalendars';
import ItemReadingD8 from '../../../component/learn/Lesson/Reading/Component/ItemReadingD8';
import {normalizeUnits} from 'moment';

const {width, height} = Dimensions.get('window');
SmartScreenBase.baseSetup();

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            // DataVocab: [],
            // DataChild: [],
            id: this.props.navigation.getParam('id'),
            DataPush: [],
            dataGrammar: [],
            detailsUnit: {},
            dataDelete: [],
            dataAdd: [],
            visible: false,
            day: '',
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

            ]
        };
    }

    async componentDidMount() {
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this._convertNewData()
            }
        );
        const Data = this.props.navigation.getParam('DataPush');
        await this._convertData(Data)
        this.setState({detailsUnit: this.props.navigation.getParam('item')})
    }

    _convertNewData = () => {
        let dataL = [...this.state.dataLesson];
        let dataN = this.props.navigation.getParam('dataNew');
        let dataA = [...this.state.dataAdd];
        let dataD = [...this.state.dataDelete]
        let itemData = []
        if (this.props.navigation.getParam('dataNew')) {
            dataL.forEach((item, index) => {
                if (dataN.lesson_type == item.lesson_type) {
                    itemData = item.data
                    dataN.data.forEach((itm, ind) => {
                        let number = itemData.findIndex(e => {
                            return e.lesson_id == itm.lesson_id
                        });
                        let number2 = dataD.findIndex(e => {
                            return e == itm.lesson_id
                        })
                        if (number2 > -1) {
                            dataD.splice(number2, 1)
                        }
                        if (number < 0) {
                            item.data.push(itm);
                            dataA.push(itm.lesson_id)
                        }
                    })
                }
            })
        }
        this.setState({dataLesson: dataL, dataAdd: dataA, dataDelete: dataD});
    };

    _convertData = (data) => {
        let dataL = [...this.state.dataLesson];
        let pops = this.props.navigation.getParam('item')
        data.forEach((item, index) => {
            if (item.unit_id == pops.unit_id) {
                dataL.forEach((string, number) => {
                    if (item.lesson_type == string.lesson_type) {
                        string.data.push(item);
                    }
                })
            }

        })
        this.setState({dataLesson: dataL})
    }
    _deleteItem = (index, ind) => {
        let dataL = [...this.state.dataLesson];
        let dataD = [...this.state.dataDelete];
        let dataA = [...this.state.dataAdd]
        let number = dataA.findIndex(e => {
            return e == dataL[index].data[ind].lesson_id
        });
        dataA.splice(number, 1);
        let numberD = dataD.findIndex(e => {
            return e == dataL[index].data[ind].lesson_id
        });
        if (numberD == -1) {
            dataD.push(dataL[index].data[ind].lesson_id);
        }
        dataL[index].data.splice(ind, 1);
        this.setState({
            dataLesson: dataL,
            dataDelete: dataD,
            dataAdd: dataA
        })
    };

    _renderItem = ({item, index}) => {
        return (
            <View>
                <Text style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: SmartScreenBase.smPercenWidth * 4,
                    textTransform: 'capitalize'
                }}>{item.lesson_type}</Text>
                <View style={{marginTop: 10, width: '100%', paddingHorizontal: 5}}>
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
                                    <Text style={{width: '70%'}}>{itm.lesson_name}</Text>
                                    <TouchableOpacity style={{height: 50, justifyContent: 'center'}} onPress={() => {
                                        this._deleteItem(index, ind)
                                    }}>
                                        <Image source={{uri: 'gv_108'}}
                                               style={{resizeMode: 'contain', width: width / 18, height: width / 18}}/>
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
                    onPress={() => {
                        this.props.navigation.navigate('LibraryScreen', {
                            lesson_type: item.lesson_type,
                            Type: 'Edit Unit'
                        })
                    }}>
                    <Image
                        source={{uri: 'gv_109'}}
                        style={{
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    };
    _goBack = () => {
        this.props.navigation.goBack();
    };
    _changeName = (Text) => {
        const {detailsUnit} = this.state;
        this.setState({
            detailsUnit: {
                ...detailsUnit,
                unit_name: Text
            }
        })

    };

    _handleDateStart = (start_date) => {
        const {detailsUnit} = this.state;
        this.setState({
            day: start_date,
            visible: true,
            status: 'start'
        })
    }

    _handleDateEnd = (end_date) => {
        const {detailsUnit} = this.state;
        this.setState({
            day: end_date,
            visible: true,
            status: 'end'
        })
    }
    _saveDayStart = (start_date) => {
        const {detailsUnit} = this.state;
        this.setState({
            detailsUnit: {
                ...detailsUnit,
                start_date,
            },
            visible: false
        });

    }
    _saveDayEnd = (end_date) => {
        const {detailsUnit} = this.state;
        this.setState({
            detailsUnit: {
                ...detailsUnit,
                end_date,
            },
            visible: false
        });
    }
    _onClose = () => {
        this.setState({visible: !this.state.visible})
    }
    _saveData = async () => {
        const url = API.baseurl+"api_class/edit_unit";
        let data = {
            list_delete: this.state.dataDelete,
            list_new: this.state.dataAdd,
            unit_id: this.props.navigation.getParam('item').unit_id,
            unit_name: this.state.detailsUnit.unit_name,
            curriculum_id: this.props.navigation.getParam('class_curriculum_id'),
            start_date: this.state.detailsUnit.start_date,
            end_date: this.state.detailsUnit.end_date,
            class_id: this.props.navigation.getParam('class_id')
        }
        console.log(data)
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': this.props.navigation.getParam('jwt_token'),
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        console.log(headers)
        try {
            const ressponse = await axios({method: 'put', data, headers, url});
            if (ressponse.data.status) {
                this.props.navigation.navigate('EditCourseScreen')
            }
            Alert.alert('Thông báo', ressponse.data.msg, [
                {text: 'Đồng ý', style: "cancel"}
            ])
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: height / 15,
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
                                   source={{uri: 'imageback'}}/>
                        </TouchableOpacity>
                        <Text style={{
                            color: 'white',
                            marginLeft: SmartScreenBase.smPercenWidth * 5,
                            fontWeight: '800',
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                        }}>Edit Unit</Text>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <View style={{
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                        flexDirection: 'row',
                        borderRadius: SmartScreenBase.smPercenWidth * 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ItemEditUnit Data={this.state.detailsUnit}
                                      changeName={this._changeName}
                                      changDateStart={this._handleDateStart}
                                      changDateEnd={this._handleDateEnd}
                        />
                    </View>
                    <View style={{
                        marginTop: 20,
                        ...Platform.select({
                            ios: {height: height / 1.7},
                            android: {
                                height: height / 1.9
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
                    <ModalCalendars
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
