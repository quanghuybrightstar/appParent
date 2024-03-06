import {Dimensions, FlatList, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SmartScreenBase from '../../../base/SmartScreenBase';
import stylesApp from '../../../component/styleApp/stylesApp';
import Header from './Header';

const {width, height} = Dimensions.get('screen');

const BySuccess = (props) => {

    const {data} = props;

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000070'}}>
            <View style={{
                height: SmartScreenBase.smPercenHeight * 25,
                width: SmartScreenBase.smPercenWidth * 90,
                borderRadius: SmartScreenBase.smPercenWidth * 5,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: SmartScreenBase.smFontSize * 40}}>Bạn đã mua thành công</Text>
                    <Text style={{
                        fontSize: SmartScreenBase.smFontSize * 40,
                        fontWeight: 'bold',
                        paddingTop: SmartScreenBase.smPercenHeight,
                    }}>{data?data.package_name:"Không có dữ liệu"}</Text>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity
                        style={{
                            width: SmartScreenBase.smPercenWidth * 35,
                            backgroundColor: '#00283a',
                            height: SmartScreenBase.smPercenHeight * 6,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: SmartScreenBase.smPercenWidth * 40,
                        }}
                        onPress={() => props.hideModal()}
                    >
                        <Text style={{
                            fontSize: SmartScreenBase.smFontSize * 50,
                            fontWeight: 'bold',
                            color: '#fff',
                        }}>Xong</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default BySuccess;
