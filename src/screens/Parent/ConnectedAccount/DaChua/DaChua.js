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

    _renderItem = ({item, index}) => {
        return (
            <View
                style={{
                    flex: 1,
                }}>
                <View
                    style={{
                        position: 'absolute',
                        right: 10,
                        zIndex: 100,
                        width: SmartScreenBase.smPercenWidth * 18,
                        height: SmartScreenBase.smPercenHeight * 3,
                        backgroundColor: '#ED8A22',
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
                        {item.number}
                    </Text>

                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: SmartScreenBase.smPercenWidth * 2,
                        }}>
                        {' '}
                        ĐIỂM
                    </Text>
                </View>
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
                                height: '50%',
                                justifyContent: 'space-around',
                            }}>
                            <Text
                                style={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                }}>
                                {item.lesson}
                            </Text>
                            <Text
                                style={{
                                    color: '#000',
                                    fontWeight: '400',
                                    fontSize: SmartScreenBase.smPercenWidth * 4,
                                }}>
                                {item.class}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                height: '50%',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <Text
                                style={{
                                    color: '#113254',
                                    fontWeight: 'bold',
                                    fontSize: SmartScreenBase.smPercenWidth * 3.5,
                                }}>
                                Ngày nộp {item.start_time}
                            </Text>
                        </View>
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
