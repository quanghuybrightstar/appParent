import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import moment from 'moment';

const nameOfDay = ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'];
let date = moment();
let convertHour = date.hour() % 12 === 0 ? 12 : date.hour() % 12;
let timeNow = {
    day: nameOfDay[date.day()],
    date: date.date().toString().length === 1 ? '0' + date.date() : date.date(),
    month: date.month() + 1,
    year: date.year(),
    hours: convertHour.toString().length === 1 ? '0' + convertHour : convertHour,
    minutes: date.minute().toString().length === 1 ? '0' + date.minute() : date.minute(),
    timeOfDay: date.hour() >= 12 ? 'PM' : 'AM',
};

export default class PickTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadd: false
        }
    }
    _Load = () => {
        this.setState({ load: !this.state.loadd });
    }
    _convert = (dayStart) =>{
        if(dayStart.getDay()>0){
           return <Text>T.{dayStart.getDay() + 1},{dayStart.getDate()} TH{dayStart.getMonth()+1} {dayStart.getFullYear()}</Text>
        }else{
            return <Text>CN,{dayStart.getDate()} TH{dayStart.getMonth()+1} {dayStart.getFullYear()}</Text>
        }
    }
    render() {
        // console.log(dayStart)
        const { dayStart, dayEnd } = this.props
        // console.log(dayStart)
        return (
            <TouchableWithoutFeedback
                onPress={this.props.onPress}
            >
                <View style={{ flex: 1, flexDirection: 'row', borderRadius: 10, backgroundColor: '#ffffff25' }}>
                    <View style={{
                        width: '50%',
                        backgroundColor: '#ffffff20',
                        borderRadius: 10,
                        paddingVertical: SmartScreenBase.smPercenWidth * 2,
                        justifyContent: 'space-around',
                        paddingHorizontal: 10
                    }}
                        onStartShouldSetResponder={() => this.props.modalTimeStart()}
                    >
                        <Text style={{
                            color: 'white',
                            // fontSize: SmartScreenBase.smPercenHeight * 2,
                            fontSize: SmartScreenBase.smPercenWidth * 4.6,
                        }}>{this._convert(dayStart)}</Text>
                    </View>
                    <View style={{
                        width: '50%',
                        borderRadius: 10,
                        paddingVertical: SmartScreenBase.smPercenWidth * 2,
                        flexDirection: 'row',
                    }}
                    onStartShouldSetResponder={() => this.props.modalTimeEnd()}
                    >
                        <View style={{
                            height: '100%',
                            justifyContent: 'center',
                            width: SmartScreenBase.smPercenWidth * 2,
                        }}
                        >
                            <Image
                                source={{ uri: 'imageback' }}
                                style={{
                                    width: '100%',
                                    height: SmartScreenBase.smPercenWidth * 5,
                                    transform: [{ rotate: '180deg' }],
                                    tintColor: '#ffffff50',
                                    position: 'absolute',
                                    left: SmartScreenBase.smPercenWidth,
                                }}
                            />
                        </View>
                        <View style={{
                            justifyContent: 'space-around',
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: SmartScreenBase.smPercenWidth * 4.6,
                                marginLeft: SmartScreenBase.smPercenWidth * 4,
                            }}>
                               {this._convert(dayEnd)}
                            </Text>

                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
