import {Dimensions, FlatList, Image, ImageBackground, Text, TouchableOpacity, View, Linking} from 'react-native';
import React, {useState} from 'react';
import SmartScreenBase from '../../../base/SmartScreenBase';
import stylesApp from '../../../component/styleApp/stylesApp';
import Header from './Header';
import API from '../../../API/APIConstant';
import axios from 'axios';
import {useSelector} from 'react-redux';
import MyData from '../../../component/MyData';
import StyleLesson from '../../../component/learn/Lesson/StyleLesson';
import LogBase from '../../../base/LogBase';
import APIBase from '../../../base/APIBase';

const {width, height} = Dimensions.get('screen');

const ModalBy = (props) => {

    const {dataProps} = props;

    const _byNow = async () => {
        props.loading();
        props.hideModal();
        const url = API.baseurl_2 + API.addOrderLicense;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        let qs = require('qs');
        let dataP = {};
        dataP['package_id'] = dataProps.package_id;
        dataP['number'] = 1;
        dataP['price'] = dataProps.price;
        let data = qs.stringify({
            'customer_id': MyData.UserLogin.id,
            'student_id': MyData.UserLogin.id,
            'order_detail': JSON.stringify([dataP]),
            'total_price': dataProps.price
        });
        try {
            LogBase.log("=====API",url)
            const res = await axios({method: 'post', url, headers, data});
            let dataReturn = res.data;
            if (dataReturn.status) {
                props.byNow();
            }
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000070'}}>
            <View style={{
                height: SmartScreenBase.smPercenHeight * 30,
                width: SmartScreenBase.smPercenWidth * 90,
                borderRadius: SmartScreenBase.smPercenWidth * 5,
                backgroundColor: '#fff',
                alignItems: 'center'
            }}>
                <View style={{
                    height: SmartScreenBase.smPercenHeight * 5,
                    width: SmartScreenBase.smPercenWidth * 90,
                    borderTopLeftRadius: SmartScreenBase.smPercenWidth * 5,
                    borderTopRightRadius: SmartScreenBase.smPercenWidth * 5,
                    backgroundColor: '#ed8a22',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{position: 'absolute', top: SmartScreenBase.smPercenWidth*1.8, right: SmartScreenBase.smPercenWidth*3}}>
                        <TouchableOpacity onPress={() => props.hideModal()}>
                            <Image source={{ uri: 'lesson_image3' }} style={StyleLesson.ImageExit}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: SmartScreenBase.smFontSize * 50, color: '#fff', fontWeight: 'bold'}}>Tiếng Anh lớp 8 - PRO 1</Text>
                </View>
                <View style={{
                    height: SmartScreenBase.smPercenHeight * 15,
                    width: SmartScreenBase.smPercenWidth * 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: SmartScreenBase.smFontSize * 40, textAlign: 'center'}}>5 tháng sử dụng toàn bộ giáo trình lớp 8</Text>
                </View>
                <View style={{
                    width: SmartScreenBase.smPercenWidth * 70,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    <TouchableOpacity style={{
                        width: SmartScreenBase.smPercenWidth * 30,
                        height: SmartScreenBase.smPercenHeight * 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: SmartScreenBase.smPercenWidth * 30,
                        backgroundColor: '#ed8a22'
                    }}
                        onPress={() => _byNow()}
                    >
                        <Text style={{color: '#fff', fontSize: SmartScreenBase.smFontSize * 45, fontWeight: 'bold'}}>Mua ngay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: SmartScreenBase.smPercenWidth * 30,
                        height: SmartScreenBase.smPercenHeight * 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: SmartScreenBase.smPercenWidth * 30,
                        backgroundColor: '#00283a'
                    }} onPress={() => {Linking.openURL("http://gkcorp.com.vn/")}}>
                        <Text style={{color: '#fff', fontSize: SmartScreenBase.smFontSize * 45, fontWeight: 'bold'}}>Lấy mã</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ModalBy;
