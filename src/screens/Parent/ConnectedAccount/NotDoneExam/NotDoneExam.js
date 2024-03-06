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
} from 'react-native';

const {width, height} = Dimensions.get('screen');
import SmartScreenBase from '../../../../base/SmartScreenBase';

SmartScreenBase.baseSetup();

class NotDoneExam extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _renderStartTime = (startTime) => {
        if (startTime) {
            let sl = startTime.split(' ');
            sl = sl[0].split('-');
            return `Ngày nộp ${sl[2]}/${sl[1]}/${sl[0]}`;
        }
        return 'Ngày nộp';
    };

    _renderScore = (item) => {
        return (
            <View
                style={{
                    top: -SmartScreenBase.smPercenHeight * 1.7,
                    position: 'absolute',
                    right: SmartScreenBase.smPercenWidth * 3,
                    zIndex: 100,
                    width: SmartScreenBase.smPercenWidth * 20,
                    height: SmartScreenBase.smPercenHeight * 3.5,
                    backgroundColor: '#ed8a22',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    justifyContent: 'center',
                    borderRadius: 5,
                    elevation: 6,
                    flexDirection: 'row',
                }}>
                <Text
                    style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                    }}>
                    {item.score ?? 0}
                </Text>
                <Text
                    style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: SmartScreenBase.smPercenWidth * 2,
                    }}> ĐIỂM</Text>
            </View>
        );
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
                    marginTop: SmartScreenBase.smPercenHeight * 2
                }}>
                {this._renderScore(item)}
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
                            height: '60%',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: SmartScreenBase.smFontSize * 50,
                            }}>
                            {item.exercise_type ? item.exercise_type.length < 10 ? item.exercise_type : item.exercise_type.slice(0, 10) : ''}
                        </Text>
                        <Text
                            style={{
                                fontSize: SmartScreenBase.smFontSize * 40,
                                paddingTop: SmartScreenBase.smPercenHeight / 2,
                            }}>
                            {item.exercise_name ? item.exercise_name.length < 25 ? item.exercise_name : item.exercise_name.slice(0, 25) + '...' : ''}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: '40%',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                color: '#113254',
                                fontWeight: 'bold',
                                fontSize: SmartScreenBase.smFontSize * 40,
                            }}>
                            {this._renderStartTime(item.start_time)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View
                style={{flex: 1, paddingHorizontal: SmartScreenBase.smPercenWidth * 5}}>
                <FlatList
                    data={this.props.Data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => {
                        return item.toString() + index.toString();
                    }}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                />
            </View>
        );
    }
}

export default NotDoneExam;
