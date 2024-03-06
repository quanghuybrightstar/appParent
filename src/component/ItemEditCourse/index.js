import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { remoteConfig } from 'firebase';
class ItemEditCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeName: false,
            changeDate: false,
        };
    }

    _enableChangeName = () => {
        this.setState({
            changeName: true,
        });
        // this.TextInputChangeName.focus();
    };

    _enableChangeDate = () => {
        this.setState({
            changeDate: true,
        });
        // this.TextInputChangeDate.focus();
    };
    _convertDay = (value) => {
        if (value) {
            if (value.length > 10) {
                let a = value.slice(0, 10).split('-').reverse()
                return a[0]+'/'+a[1]+'/'+a[2]
            } else {
                return value
            }
        }else{
            return ''
        }
    }
    render() {
        const { changeName, changeDate } = this.state;
        const item = this.props.Data;
        return (
            <View style={{
                flex: 1,
                height: SmartScreenBase.smPercenWidth * 28,
                padding: SmartScreenBase.smPercenWidth * 3,
                backgroundColor: 'white',
                flexDirection: 'row',
                borderRadius: SmartScreenBase.smPercenWidth * 3,
            }}>
                <View style={{
                    width: '75%',
                    height: '100%',
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,
                        }}
                            resizeMode={'contain'}
                            source={{ uri: 'gv_102' }} />
                        <TextInput
                            multiline={true}
                            value={item.name}
                            style={{
                                fontWeight: 'bold',
                                color: '#000',
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                                textAlignVertical: 'top',
                                paddingTop: 0,
                                paddingBottom: 0,
                                width: '75%',
                            }}
                            onChangeText={this.props.handleChangeName}
                        />
                        <TouchableOpacity
                            onPress={this._enableChangeName}
                            style={{
                                position: 'absolute',
                                right: 0,
                                width: SmartScreenBase.smPercenWidth * 6,
                                height: SmartScreenBase.smPercenWidth * 6,
                            }}>
                            <Image style={{
                                position: 'absolute',
                                right: 0,
                                width: SmartScreenBase.smPercenWidth * 6,
                                height: SmartScreenBase.smPercenWidth * 6,
                            }}
                                resizeMode={'contain'}
                                source={{ uri: 'gv_110' }} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,
                        }}
                            resizeMode={'contain'}
                            source={{ uri: 'student_managerfile_image1' }} />
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center', height: '100%', marginLeft: 5 }}
                            onPress={() => this.props.handleChangeDateStart(this.props.Time.start_time)}
                        >
                            <Text>{this._convertDay(this.props.Time.start_time)}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: SmartScreenBase.smPercenWidth * 3.5, }}> - </Text>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center', height: '100%', }}
                            onPress={() => this.props.handleChangeDateEnd(this.props.Time.end_time)}
                        >
                            <Text>{this._convertDay(this.props.Time.end_time)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this._enableChangeDate}
                            style={{
                                position: 'absolute',
                                right: 0,
                                width: SmartScreenBase.smPercenWidth * 6,
                                height: SmartScreenBase.smPercenWidth * 6,
                            }}>
                            <Image style={{
                                position: 'absolute',
                                right: 0,
                                width: SmartScreenBase.smPercenWidth * 6,
                                height: SmartScreenBase.smPercenWidth * 6,
                            }}
                                resizeMode={'contain'}
                                source={{ uri: 'gv_110' }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    width: '25%',
                    height: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                }}>
                    <TouchableOpacity style={{
                        width: '80%',
                        height: '30%',
                        backgroundColor: 'orange',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginBottom: SmartScreenBase.smPercenWidth * 3,
                    }}
                        onPress={this.props._onSetting}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: '800',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>Cài đặt</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default ItemEditCourse;
