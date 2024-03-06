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
    NativeModules,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    Platform,
} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';

class ExerciseNotDoneYet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.Data,
        };
    }

    // componentDidMount(): void {
    //     let data = [...this.state.data];
    //     data = this.props.Data
    //     this.setState({data: data});
    // }

    _renderColor = (deadline) => {
        if (deadline) {
            let splits = deadline.split(' ');
            let time = splits[0].split('-');
            let hour = splits[0].split(':');
            let dataTime = new Date();
            dataTime.setDate(time[2]);
            dataTime.setMonth(time[1] - 1);
            dataTime.setFullYear(time[0]);
            dataTime.setHours(hour[0]);
            dataTime.setMinutes(time[1]);
            dataTime.setMilliseconds(time[2]);
            let dateNow = new Date();
            if (dataTime.getTime() > dateNow.getTime()) {
                return '#dc4630'
            }
        }
        return '#113254';
    };

    _renderDeadline = (deadline) => {
        if (deadline) {
            let splits = deadline.split(' ');
            let time = splits[0].split('-');
            let hour = splits[0].split(':');
            let dataTime = new Date();
            dataTime.setDate(time[2]);
            dataTime.setMonth(time[1] - 1);
            dataTime.setFullYear(time[0]);
            dataTime.setHours(hour[0]);
            dataTime.setMinutes(time[1]);
            dataTime.setMilliseconds(time[2]);
            let dateNow = new Date();
            if (dataTime.getTime() > dateNow.getTime()) {
                return `Quá hạn từ${time[2]}/${time[1]}/${time[0]}`
            } else {
                return `Ngày nộp ${time[2]}/${time[1]}/${time[0]}`
            }
        }
        return 'Ngày nộp';
    };

    _renderItem = ({item, index}) => {
        return (
            <View
                style={{
                    width: '100%',
                    zIndex: 1,
                    height: SmartScreenBase.smPercenHeight * 15,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: SmartScreenBase.smPercenWidth * 2,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                }}>
                <View
                    style={{
                        width: '40%',
                        height: '100%',
                        alignItems: 'center',
                        paddingVertical: SmartScreenBase.smPercenWidth * 2,
                    }}>
                    <Image
                        source={{uri: 'gv_50'}}
                        style={{
                            width: '50%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View
                    style={{
                        width: '60%',
                        height: '100%',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            height: '40%',
                            justifyContent: 'space-around',
                            //backgroundColor: 'red',
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: SmartScreenBase.smFontSize * 50,
                            }}>
                            {item.exercise_type ? item.exercise_type.length < 10 ? item.exercise_type : item.exercise_type.slice(0, 10) + '...' : ''}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: '60%',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: SmartScreenBase.smFontSize * 40,
                                paddingBottom: SmartScreenBase.smPercenHeight
                            }}>
                            {item.exercise_name ? item.exercise_name.length < 25 ? item.exercise_name : item.exercise_name.slice(0, 25) + '...' : ''}
                        </Text>
                        <Text
                            style={{
                                color: this._renderColor(item.deadline),
                                fontWeight: 'bold',
                                fontSize: SmartScreenBase.smFontSize * 40,
                            }}>
                            {this._renderDeadline(item.deadline)}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        top: SmartScreenBase.smPercenHeight,
                        right: SmartScreenBase.smPercenWidth * 4,
                    }}>
                    {item.remind === '0' ? (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.Alam(item.id);
                            }}>
                            <View
                                style={{
                                    width: SmartScreenBase.smPercenWidth * 20,
                                    padding: SmartScreenBase.smPercenWidth * 1.5,
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    marginTop: 5,
                                    backgroundColor: 'rgb(238,55,33)',
                                }}>
                                <Text
                                    style={{
                                        fontSize: SmartScreenBase.smPercenWidth * 2.8,
                                        fontWeight: '500',
                                        color: 'white',
                                    }}>
                                    Nhắc nhở
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={{flex: 1, position:'absolute', right: - SmartScreenBase.smPercenWidth * 2, top: - SmartScreenBase.smPercenHeight * 5}}>
                            <Image source={{uri: 'nhacnho'}}
                                   resizeMode={'contain'}
                                   style={{width: SmartScreenBase.smPercenHeight * 15, height: SmartScreenBase.smPercenHeight * 15}}
                            />
                        </View>
                    )}
                </View>
            </View>
        );
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                }}>
                <FlatList
                    data={this.props.Data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => {
                        return item.toString() + index.toString();
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                />
            </View>
        );
    }
}

export default ExerciseNotDoneYet;
