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

class ApprovedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _renderItem = ({item, index}) => {
        console.log(item);
        return (
            <View
                style={{
                    flex: 1,
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                }}>
                <View
                    style={{
                        position: 'absolute',
                        right: 10,
                        zIndex: 100,
                        width: SmartScreenBase.smPercenWidth * 22,
                        height: SmartScreenBase.smPercenHeight * 4,
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                    <Image source={{uri: 'gvn_119'}} style={{
                        width: SmartScreenBase.smPercenWidth * 20,
                        height: SmartScreenBase.smPercenWidth * 10,
                        resizeMode: 'contain',
                        // zIndex:1,
                        position: 'absolute',
                    }}/>
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>
                        {item.number}/{item.total}
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
                style={{flex: 1, marginBottom: SmartScreenBase.smPercenHeight * 12}}>
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

export default ApprovedScreen;
