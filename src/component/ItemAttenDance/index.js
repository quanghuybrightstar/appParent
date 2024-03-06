import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';

const {width, height} = Dimensions.get('window');

class ItemAttenDance extends PureComponent {

    render() {
        const item = this.props.Data;
        const index = this.props.index;
        return (
            <View style={{
                flex: 1,
                height: width / 4,
                flexDirection: 'row',
                marginBottom: SmartScreenBase.smPercenWidth * 3,
                backgroundColor: item.send_to_parent === 1 ? '#ffffff80' : '#fff',
                borderRadius: SmartScreenBase.smPercenWidth * 3,
                paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                alignItems: 'center',
            }}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Image style={{
                        width: width / 6,
                        height: width / 6,
                    }}
                           resizeMode={'contain'}
                           source={{uri: 'gv_liststudent_07'}}/>

                </View>
                <View style={{
                    flex: 5,
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontWeight: '700',
                            color: '#000000',
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                        }}>{item.fullname}</Text>
                        <TouchableWithoutFeedback onPress={() => {
                            this.props._onChooseStudent(index);
                        }}>
                            <View style={{
                                width: SmartScreenBase.smPercenWidth * 6,
                                height: SmartScreenBase.smPercenWidth * 6,
                            }}>
                                <Image style={{
                                    width: SmartScreenBase.smPercenWidth * 6,
                                    height: SmartScreenBase.smPercenWidth * 6,
                                    // zIndex: 1,
                                }}
                                       resizeMode={'contain'}
                                       source={{uri: 'gv_55'}}
                                />
                                {item.present &&
                                <Image style={{
                                    width: SmartScreenBase.smPercenWidth * 6,
                                    height: SmartScreenBase.smPercenWidth * 6,
                                    position: 'absolute',
                                    bottom: 3,
                                    // zIndex:1000
                                }}
                                       resizeMode={'contain'}
                                       source={{uri: 'gv_56'}}
                                />
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                        alignItems: 'center',
                    }}>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'gv_117'}}/>
                        <TouchableOpacity style={{
                            width: '39%',
                            height: '50%',
                            backgroundColor: '#32b69e',
                            borderRadius: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: SmartScreenBase.smPercenWidth * 2,
                        }}
                                          onPress={() => {
                                              this.props._onWriteComments(index,item.fullname);
                                          }}
                        >
                            <Text style={{
                                fontWeight: '800',
                                color: 'white',
                                fontSize: SmartScreenBase.smPercenWidth * 3,
                            }}>Nhận xét</Text>
                        </TouchableOpacity>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                            marginHorizontal: 5,
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'student_inbox_image1'}}/>
                        <TouchableOpacity
                            style={{
                            width: '39%',
                            height: '50%',
                            backgroundColor: '#00283A',
                            borderRadius: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                                          onPress={() => {
                                              this.props._onSendToParent(index);
                                          }}
                                          disabled={item.send_to_parent === 1}
                        >
                            <Text style={{
                                fontWeight: '800',
                                color: 'white',
                                fontSize: SmartScreenBase.smPercenWidth * 3,
                            }}>{item.send_to_parent === 1 ? 'Đã gửi' : 'Gửi phụ huynh'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default ItemAttenDance;
