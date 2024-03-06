import React, {useState, useEffect} from 'react';
import { Alert, ImageBackground, FlatList, Text, TouchableOpacity, View} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import Header from '../../../component/Header';
import stylesApp from '../../../styleApp/stylesApp';
import API from '../../../API/APIConstant';
import MyData from '../../../component/MyData';
import axios from 'axios';
import LoadingScreen from '../../LoadingScreen';
import HeaderGradient from '../../../commons/HeaderGradient';
import FontBase from '../../../base/FontBase';
import { AppHeader } from '../../../componentBase/AppHeader';

const OverView = (props) => {

    const length = props.navigation.getParam('length');
    const data_answer = props.navigation.getParam('data_answer');
    const checkBox = props.navigation.getParam('checkBox');
    const id = props.navigation.getParam('id');
    const name = props.navigation.getParam('name');
    const purpose = props.navigation.getParam('purpose');
    const isTeacher = props.navigation.getParam('isTeacher');
    const [listOption, setListOption] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // console.log('data_answer',data_answer)
    useEffect(() => {
        let dataL = [];
        for (let i = 0; i < length; i++) {
            dataL.push(i);
        }
        setListOption(dataL);
        setIsLoading(false);
    }, []);

    const _renderBg = (index) => {
        if (checkBox.indexOf(index) !== -1) {
            return '#EBD6D5';
        } else if (
            data_answer[index]?.final_user_choice != ''
            ||
            !!data_answer[index]?.detail_user_turn[0]?.user_choice
        ) {
            return '#fff';
        } else {
            return '#E6E7E8';
        }
    };

    const _renderBorder = (index) => {
        if (checkBox.indexOf(index) !== -1) {
            return '#CF636C';
        } else if (
            data_answer[index]?.final_user_choice != ''
            ||
            !!data_answer[index]?.detail_user_turn[0]?.user_choice
        ) {
            return '#337FC1';
        } else {
            return '#AFB2B5';
        }
    };

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={{
                    width: SmartScreenBase.smPercenWidth * 15,
                    height: SmartScreenBase.smPercenHeight * 6,
                    backgroundColor: _renderBg(index),
                    borderWidth: 1,
                    borderColor: _renderBorder(index),
                    borderRadius: SmartScreenBase.smPercenWidth * 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: SmartScreenBase.smPercenWidth * 5,
                }}
                onPress={() => {
                    console.log('it',index);
                    props.navigation.navigate(isTeacher ? 'ExamStudyTeach' : 'ExamStudyForTest', {
                        id,name,purpose,checkBox,data_answer,indexChoose: index,
                    });
                }}
            >
                <Text style={{fontSize: SmartScreenBase.smFontSize * 50, fontFamily: FontBase.MyriadPro_Bold}}>{index + 1}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            {isLoading ? <LoadingScreen/> : null}
            <AppHeader  title={'Mục lục'} leftIconOnPress={() => props.navigation.goBack()} />
            <View style={{
                flex: 8,
                backgroundColor: '#fff',
                // borderTopLeftRadius: SmartScreenBase.smPercenWidth * 5,
                // borderTopRightRadius: SmartScreenBase.smPercenWidth * 5,
            }}>
                <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 12,
                            height: SmartScreenBase.smPercenHeight * 5,
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#337FC1',
                            borderRadius: SmartScreenBase.smPercenWidth * 2,
                        }} />
                        <Text style={{
                            fontSize: SmartScreenBase.smFontSize * 40,
                            paddingVertical: SmartScreenBase.smPercenHeight,
                            fontFamily: FontBase.MyriadPro_Regular
                        }}>Đã làm</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 12,
                            height: SmartScreenBase.smPercenHeight * 5,
                            backgroundColor: '#EBD6D5',
                            borderWidth: 1,
                            borderColor: '#CF636C',
                            borderRadius: SmartScreenBase.smPercenWidth * 2,
                        }} />
                        <Text style={{
                            fontSize: SmartScreenBase.smFontSize * 40,
                            paddingVertical: SmartScreenBase.smPercenHeight,
                            fontFamily: FontBase.MyriadPro_Regular
                        }}>Xem lại sau</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 12,
                            height: SmartScreenBase.smPercenHeight * 5,
                            backgroundColor: '#E6E7E8',
                            borderWidth: 1,
                            borderColor: '#AFB2B5',
                            borderRadius: SmartScreenBase.smPercenWidth * 2,
                        }} />
                        <Text style={{
                            fontSize: SmartScreenBase.smFontSize * 40,
                            paddingVertical: SmartScreenBase.smPercenHeight,
                            fontFamily: FontBase.MyriadPro_Regular
                        }}>Chưa làm</Text>
                    </View>
                </View>
                <View style={{flex: 5}}>
                    <FlatList
                        data={listOption}
                        renderItem={_renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={4}
                    />
                </View>
            </View>
        </View>
    );
};

export default OverView;
