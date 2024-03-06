import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import {connect} from 'react-redux';

class ItemListWorkDelivered extends PureComponent {

    _renderStatus = (item) => {
        if (item.status === 0) {
            if (item.score === null) {
                return 'Chưa chấm';
            } else {
                return <Text style={{fontWeight: 'bold', fontSize: SmartScreenBase.smFontSize * 40}}>{`10/10 `}<Text style={{fontWeight: 'normal', fontSize: SmartScreenBase.smFontSize * 25}}>ĐIỂM</Text></Text>;
            }
        } else {
            return 'Chưa làm';
        }
    };

    _renderColor = (item) => {
        if (this.props.dataLogin.role === 'parent') {
            if (item.status === 0) {
                if (item.score === null) {
                    return '#de4530';
                } else {
                    return '#f08b01';
                }
            } else {
                return '#de4530';
            }
        } else {
            return '#f08b01';
        }
    };

    render() {
        const item = this.props.Data;
        let day;
        let showDay;
        if (!item.end_time) {
            showDay = '__/__/____';
        } else {
            day = item.end_time.slice(0, 10).split('-');
            showDay = day[2] + '/' + day[1] + '/' + day[0];
        }

        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('DetailsWorkDelivered', {exercise_id: item.exercise_id, exercise_name: item.exercise_name})}
                style={{flex: 1}}>
                <View
                    style={{
                        position: 'absolute',
                        right: 10,
                        zIndex: 100,
                        width: SmartScreenBase.smPercenWidth * 25,
                        height: SmartScreenBase.smPercenHeight * 8,
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        top: -SmartScreenBase.smPercenHeight * 2.5
                    }}>
                    <View  style={{
                        width: SmartScreenBase.smPercenWidth * 23,
                        height: SmartScreenBase.smPercenWidth * 7,
                        zIndex:10,
                        position: 'absolute',
                        backgroundColor: this._renderColor(item),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SmartScreenBase.smPercenWidth,
                    }}>
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                            }}>
                            {
                                this.props.dataLogin.role === 'parent'
                                    ?
                                    this._renderStatus(item)
                                    :
                                    `${item.count_done ?? 0}/${item.count_user ?? 0}`
                            }
                        </Text>
                    </View>
                    <View  style={{
                        width: SmartScreenBase.smPercenWidth * 24,
                        height: SmartScreenBase.smPercenWidth * 7,
                        zIndex: 9,
                        position: 'absolute',
                        borderRadius: SmartScreenBase.smPercenWidth,
                        backgroundColor: '#00000070',
                        top: SmartScreenBase.smPercenHeight * 2.3,
                    }}></View>
                </View>
                <View
                    style={{
                        width: '100%',
                        zIndex: 1,
                        height: SmartScreenBase.smPercenHeight * 20,
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
                                height: '70%',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: '#000',
                                    fontWeight: '600',
                                    fontSize: SmartScreenBase.smFontSize * 50,
                                    paddingTop: SmartScreenBase.smBaseWidth * 30,
                                }}>
                                {item.exercise_name ? item.exercise_name.length < 35 ? item.exercise_name : item.exercise_name.slice(0, 35) + '...' : null}
                            </Text>
                            <Text
                                style={{
                                    color: '#000',
                                    fontWeight: '400',
                                    paddingTop: SmartScreenBase.smBaseWidth * 15,
                                    fontSize: SmartScreenBase.smFontSize * 40,
                                }}>
                                {item.exercise_type}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                height: '30%',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                            <Text
                                style={{
                                    color: '#113254',
                                    fontWeight: 'bold',
                                    fontSize: SmartScreenBase.smFontSize * 40,
                                }}>
                                {!item.start_time
                                    ? '__/__/____'
                                    : item.start_time.slice(0, 10).split('-')[2] + '/' + item.start_time.slice(0, 10).split('-')[1] + '/' + item.start_time.slice(0, 10).split('-')[0]}
                            </Text>
                            <Image
                                source={{uri: 'gv_51'}}
                                style={{
                                    width: SmartScreenBase.smBaseWidth * 38,
                                    height: SmartScreenBase.smBaseWidth * 40,
                                    resizeMode: 'contain',
                                    marginHorizontal: SmartScreenBase.smPercenWidth * 2,
                                }}
                            />
                            <Text
                                style={{
                                    color: '#113254',
                                    fontWeight: 'bold',
                                    fontSize: SmartScreenBase.smFontSize * 40,
                                }}>
                                {showDay}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

function mapStateToProps(state) {
    return {
        dataLogin: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(ItemListWorkDelivered);
