import React, { PureComponent } from 'react';
import { View, ImageBackground, Text, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import axios from 'axios';
import LoadingScreen from '../../LoadingScreen';
import API from '../../../API/APIConstant';

class ChooseExCourseTeacher extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            unit_name: null,
            dataNew: {
                lesson_type: this.props.navigation.getParam('lesson_type'),
                data: []
            }
        };
    }

    componentDidMount() {
        this._getExercisesDelivered();
    }

    _getExercisesDelivered = () => {
        const url = API.baseurl+'api_curriculum/course?id=' + this.props.navigation.getParam('item').id;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        axios({ method: 'get', url: url, headers: header })
            .then((response) => {
                this.setState({
                    data: response.data.data_lesson.data,
                    unit_name: response.data.data_lesson.unit_name,
                });
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
            });
    };


    _chooseUnit = (unit) => {
        const { data, dataNew } = this.state;
        let dataN = { ...dataNew };
        this.setState({
            data: data.map(item => {
                if (unit === item) {
                    if (unit.choose) {
                        let index = dataN.data.findIndex((e) => { return e == unit })
                        dataN.data.splice(index, 1)
                        delete unit.choose;
                    } else {
                        unit.choose = true;
                        dataN.data.push(unit)
                    }
                }
                return item;
            },
            ),
            dataNew: dataN
        });
    };

    _renderVocabulary = (unit) => {
        const id_unit = unit.lesson_id;
        return (
            unit.lesson_type == this.props.navigation.getParam('lesson_type') &&
            <TouchableWithoutFeedback
                key={id_unit}
                onPress={() => this._chooseUnit(unit)}
            >
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 15,
                        backgroundColor: '#ffffff',
                        borderRadius: 8,
                        margin: 5,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}
                >
                    <Text
                        style={{ fontSize: 15, fontWeight: 'bold', color: '#343434', width: '90%' }}
                    >
                        {unit.lesson_name}
                    </Text>
                    <View>
                        <ImageBackground
                            source={{ uri: 'gv_55' }}
                            style={{ width: 20, height: 20 }}
                        >
                            {
                                unit.choose &&
                                <Image
                                    source={{ uri: 'gv_56' }}
                                    style={{ width: 20, height: 20, position: 'absolute', bottom: 5 }}
                                />
                            }
                        </ImageBackground>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    _renderUnit = ({ item }) => {
        const { data } = this.state;
        // console.log(item.lesson_type)
        return (

            <View>
                <Text style={{
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    paddingVertical: SmartScreenBase.smPercenHeight,
                    color: '#ffffff',
                    fontWeight: '700',
                }}>{item.unit_name}</Text>
                {
                    data.filter(dataUnit => {
                        return dataUnit.unit_id === item.unit_id;
                    }).map((unit) => {
                        let number = 0;
                        return (
                            this._renderVocabulary(unit, item.unit_id)
                        );
                    })

                }

            </View>
        );
    };

    _goBack = () => {
        this.props.navigation.goBack();
    };

    onSubmit = () => {
        if (this.props.navigation.getParam('Type') == 'Edit Unit') {
            this.props.navigation.navigate('EditUnitScreen', { dataNew: this.state.dataNew, })
        } else {
            this.props.navigation.navigate('AddUnitScreen', { dataNew: this.state.dataNew, })

        }
    };

    render() {
        const { params } = this.props.navigation.state;
        const { unit_name } = this.state;
        return (
            <ImageBackground
                source={{ uri: 'imagebackground' }}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 7 }}>
                    <View style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        flexDirection: 'row',
                        paddingVertical: 10,
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
                                <Image
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 5,
                                        height: SmartScreenBase.smPercenWidth * 5,
                                    }}
                                    resizeMode={'contain'}
                                    source={{ uri: 'imageback' }}
                                />
                            </TouchableOpacity>

                            <Text style={{
                                color: 'white',
                                marginLeft: SmartScreenBase.smPercenWidth * 5,
                                fontWeight: '800',
                                fontSize: SmartScreenBase.smPercenWidth * 5,
                            }}>Chọn<Text style={{ textTransform: 'capitalize' }}> {this.props.navigation.getParam('lesson_type')}</Text></Text>
                        </View>
                    </View>
                    <View
                        style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#ffffff25' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#ffffff' }}>Tiếng Anh lớp 12</Text>
                    </View>

                    {
                        this.state.data ?
                            <FlatList
                                style={{ flex: 1 }}
                                data={unit_name}
                                renderItem={this._renderUnit}
                                keyExtractor={(item, index) => {
                                    return item.toString() + index.toString();
                                }}
                            />
                            :
                            <LoadingScreen />
                    }

                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{ paddingVertical: 10, backgroundColor: '#050326', width: '45%', borderRadius: 20 }}
                        onPress={this.onSubmit}
                    >
                        <Text
                            style={{
                                color: '#ffffff',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        >
                            Giao bài tập
                        </Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        );
    }
}

export default ChooseExCourseTeacher;

