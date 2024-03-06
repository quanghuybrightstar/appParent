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
import APIBase from '../../../base/APIBase';
import FontBase from '../../../base/FontBase';
import { AppHeader } from '../../../componentBase/AppHeader';

const SeeTheAnswer = (props) => {

    const user_exam_result_id = props.navigation.getParam('user_exam_result_id');
    const name = props.navigation.getParam('name');
    const [listQuestion, setListQuestion] = useState([]);
    const [listOption, setListOption] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const _testType = props.navigation.getParam('type');

    const questions = props.navigation.getParam('questions')

    const fromResult = props.navigation.getParam('fromResult');

    // console.log(_testType,user_exam_result_id + ' ' + fromResult)

    useEffect(() => {
        if(_testType==='mock_test'){
            _startMockTest();
        }else{
            setListOption(questions)
            setIsLoading(false)
        }
    }, []);

    const _startMockTest = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.mockTestHistoryDetail + user_exam_result_id;
        // console.log('url', url);
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const res = await APIBase.postDataJson('GET',url);
            let dataReturn = res.data;
            // console.log('dataReturn', res.data);
            if (dataReturn.status) {
                setListOption(dataReturn.list_question);
                setListQuestion(dataReturn.list_question);
            }
        } catch (error) {
            Alert.alert('Thông báo', error.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'},
            ]);
            // console.log(error.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    const _renderItem = ({item, index}) => {
        var dataMono = JSON.parse(item.user_choice)
        // console.log("=====_renderItem",dataMono[0].score)
        return (
            <TouchableOpacity
                style={{
                width: SmartScreenBase.smPercenWidth * 15,
                height: SmartScreenBase.smPercenHeight * 6,
                backgroundColor: parseInt(dataMono[0].score) > 0 ? '#8DC63F' : '#D68086',
                borderWidth: 1,
                borderColor: parseInt(dataMono[0].score) > 0 ? '#62B440' : '#C22D39',
                borderRadius: SmartScreenBase.smPercenWidth * 2,
                justifyContent: 'center',
                alignItems: 'center',
                margin: SmartScreenBase.smPercenWidth * 5,
            }}
            onPress={() => {
                //props.navigation.navigate('ResultStudy', {listQuestion, index, name})
                if(!fromResult){
                    var cb = props.navigation.getParam('cb');
                    if(cb){
                        cb(index)
                    }
                    props.navigation.goBack();
                }else{
                    props.navigation.navigate('ResultStudy', {
                        listQuestion:questions, 
                        index, 
                        name,
                        userExamResId:user_exam_result_id,
                        // type:_testType,
                    })
                }
            }}
            >
                <Text style={{fontSize: SmartScreenBase.smFontSize * 50, fontWeight: 'bold'}}>{index + 1}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View
            // source={{uri: 'bg_exam'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            {isLoading ? <LoadingScreen/> : null}
            <AppHeader title={'Đáp án'} leftIconOnPress={() => props.navigation.goBack()} />
            {/* <View style={{flex:1}}></View> */}
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
                            backgroundColor: '#8DC63F',
                            borderWidth: 1,
                            borderColor: '#62B440',
                            borderRadius: SmartScreenBase.smPercenWidth * 2,
                        }}></View>
                        <Text style={{
                            fontSize: SmartScreenBase.smFontSize * 40,
                            paddingVertical: SmartScreenBase.smPercenHeight,
                            fontFamily: FontBase.MyriadPro_Regular
                        }}>Câu đúng</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 12,
                            height: SmartScreenBase.smPercenHeight * 5,
                            backgroundColor: '#D68086',
                            borderWidth: 1,
                            borderColor: '#C22D39',
                            borderRadius: SmartScreenBase.smPercenWidth * 2,
                        }}>

                        </View>
                        <Text style={{
                            fontSize: SmartScreenBase.smFontSize * 40,
                            paddingVertical: SmartScreenBase.smPercenHeight,
                            fontFamily: FontBase.MyriadPro_Regular
                        }}>Câu sai</Text>
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

export default SeeTheAnswer;
