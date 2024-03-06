import React, {useEffect, useState} from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import {ShortMainButton} from '../../componentBase/ShortMainButton'

const ModalCheck = (props) => {
    const _close = () => {
        props.close();
    };
    const _yes = () => {
        props.yes();
    };
    return (
        <Modal visible={props.visible} animationType={'slide'} transparent={true}>
            <View style={{
                flex: 1,
                backgroundColor: '#22222280',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
            }}>
                <View style={{
                    borderRadius: 25,
                    height: '40%',
                    backgroundColor: '#fff',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flex: 3, justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: SmartScreenBase.smFontSize * 60,
                            marginTop: SmartScreenBase.smPercenHeight,
                            fontFamily: 'MyriadPro-Light',
                        }}>Bạn có chắc chắn muốn chuyển </Text>
                        <Text style={{
                            fontSize: SmartScreenBase.smFontSize * 60,
                            marginTop: SmartScreenBase.smPercenHeight,
                            fontFamily: 'MyriadPro-Light',
                        }}>giáo trình này </Text>
                        <Text style={{
                            fontSize: SmartScreenBase.smFontSize * 60,
                            marginTop: SmartScreenBase.smPercenHeight,
                            fontFamily: 'MyriadPro-Light',
                        }}>thành giáo trình ưu tiên?</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '100%',
                        flex: 1
                    }}>
                        <ShortMainButton text={"Không"} widthType={'mini'} onPress={() => _close()}/>
                        <ShortMainButton text={"Có"} widthType={'mini'} type={1} onPress={() => _yes()}/>
                        {/* <TouchableOpacity style={{
                            width: '40%',
                            height: SmartScreenBase.smPercenHeight * 7,
                            borderRadius: 15,
                            backgroundColor: '#01283a',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }} onPress={() => _close()}>
                            <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>Không</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: '40%',
                            height: SmartScreenBase.smPercenHeight * 7,
                            borderRadius: 15,
                            backgroundColor: '#e2913d',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }} onPress={() => _yes()}>
                            <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>Có</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default ModalCheck;
