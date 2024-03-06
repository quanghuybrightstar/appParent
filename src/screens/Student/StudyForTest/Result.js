import React, {useState} from 'react';
import {Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, Alert,StyleSheet, Platform} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import Header from '../../../component/Header';
import API from '../../../API/APIConstant';
import apiBase from '../../../base/APIBase';
import MyData from '../../../component/MyData';
import axios from 'axios';
import LoadingScreen from '../../LoadingScreen';
import FontBase from '../../../base/FontBase';
import Button,{ButtonMedium} from '../../../commons/Button';
import LogBase from '../../../base/LogBase';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import cloneDeep from 'lodash/cloneDeep';
import stringUtils from '../../../utils/stringUtils';

const {width, height} = Dimensions.get('window');

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

const getScore=(s)=>{
    var ss=  String(s);
    if(ss.length<=4)
        return ss;
    return s.toFixed(2)
}

const ResultStudyForTest = (props) => {

    const data = props.navigation.getParam('data');
    const type = props.navigation.getParam('type');
    const isTeacher = props.navigation.getParam('isTeacher');
    const answers = props.navigation.getParam('answers');
    const listQuestion = props.navigation.getParam('listQuestion')
    const user_exam_result_id = props.navigation.getParam('user_exam_result_id');

    const name = props.navigation.getParam('name');
    const [isLoading, setIsLoading] = useState(false);
    const [time, setTime] = useState(null);

    // console.log(user_exam_result_id)
    const countTime = () => {
        if(!data.duration) return 0;
        let hours = Math.floor(data.duration / 3600);
        (hours >= 1) ? data.duration = data.duration - (hours*36000) : hours = "00";
        let minutes = Math.floor(data.duration / 60);
        (minutes >= 1) ? data.duration = data.duration - (minutes*60) : minutes = "00";
        (data.duration < 1) ? data.duration = "00" : void 0;

        (minutes.toString().length == 1) ? minutes = '0' + minutes : void 0;
        (data.duration.toString().length == 1) ? data.duration = '0' + data.duration : void 0;

        setTime(`${hours}:${minutes}:${data.duration}`);
    }

    React.useEffect(()=>{
        countTime();
    }, []);
    const _seeAnswer=()=>{
        const questionData = JSON.stringify(listQuestion)
        const questions = answers.map(e=>{
            return {
                id:e.question_id,
                json_question_data: questionData,
                question_id:e.question_id,
                score:e.question_score,
                user_choice: JSON.stringify(e.detail_user_turn)
            }
        })

        if(type==='mock_test'){
            console.log("=====dv1")
            props.navigation.navigate('SeeTheAnswer', {
                user_exam_result_id,
                name,
                //type,
                fromResult:true,
                questions:questions,
            })
            return;
        }

        props.navigation.navigate('SeeTheAnswer', {
            user_exam_result_id,
            name,
            type:type,
            questions:questions,
            fromResult:true,
        })
    }
    
    // Lấy dữ liệu bài chữa
    const _startMockTest = async () => {
        const exam_id = props.navigation.getParam('exam_id');
        const is_homework = props.navigation.getParam('is_homework');
        console.log('Xem bài chữa',type)
        // if(type != 'mock_test'){
        //     const questionData = JSON.stringify(props.navigation.getParam('listQuestion'))
        //     const answers = props.navigation.getParam('answers');
        //     // console.log('answers',answers)
        //     const questions = answers.map(e=>{
        //         return {
        //             id:e.question_id,
        //             json_question_data: questionData,
        //             question_id:e.question_id,
        //             score:e.question_score,
        //             user_choice: JSON.stringify(e.detail_user_turn)
        //         }
        //     })
        //     console.log("=====bb2")
        //     props.navigation.navigate('ResultStudy', {
        //         listQuestion: questions,
        //         index: 0,
        //         name,
        //         type
        //     });
        //     return;
        // }

        if(type != 'mock_test'){
            var mUserChoice = []
            answers.forEach(ele => {
                var mono = {
                    user_choice: JSON.stringify(ele.detail_user_turn)
                }
                mUserChoice.push(mono)
            });
            LogBase.log("=====answers",mUserChoice)
            props.navigation.navigate(isTeacher ? 'TeacherResultStudy' : 'ResultStudy', {
                listQuestion: listQuestion,
                userChoice: mUserChoice,
                index: 0,
                name,
                type,
                userExamResId : user_exam_result_id,
                isTeacher: isTeacher
                // file_correct_exam: !!dataReturn.file_correct_exam?`${dataReturn.base_url}${dataReturn.file_correct_exam}`:''
            });
            return;
        }

        setIsLoading(true);
        const url = API.baseurl + API.mockTestHistoryDetail + user_exam_result_id + `&type=${type}&is_homework=${is_homework}&exam_id=${exam_id}`;
        apiBase.postDataJson('get',url).then(res=>{
            let dataReturn = res.data;
            console.log('data check2', dataReturn);
            setIsLoading(false);
            if (dataReturn.status) {
                // for(var i=0;i<dataReturn.data_question.length;i++){
                //     dataReturn.data_question[i].user_choice = dataReturn.list_question[i].user_choice
                // }
                // console.log("=====bb1",dataReturn)
                dataReturn.data_question.forEach(e=>{
                    if(e.list_option[0]?.skill=='grammar' && e.list_option[0]?.question_type ==11){
                        e.list_option = fillAtGrammar11(e.list_option)
                    }
                })
                props.navigation.navigate('ResultStudy', {
                    listQuestion: dataReturn.data_question,
                    userChoice: dataReturn?.list_question,
                    index: 0,
                    name,
                    type,
                    userExamResId : user_exam_result_id,
                    file_correct_exam: !!dataReturn.file_correct_exam?`${dataReturn.base_url}${dataReturn.file_correct_exam}`:''
                });
            }
        }).catch(e=>{
            setIsLoading(false);
            console.log("=====e:",e)
            Alert.alert('Thông báo', error.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'},
            ]);
        })
    };

    const fillAtGrammar11 = (mData) => {

        var cloneList = []
        var resu = stringUtils.shuffleArray(mData.map(e=>e.match_option_text[0]))
        resu = mData.map(e=>e.match_option_text[0])
        var content = mData[0].question_content;
        var ansFromQues = content.match(/\[(.*?)\]/g)
        ansFromQues.forEach(a=>{
            a= a.replace("[","").replace("]","")
            var objClone = cloneDeep(mData[0]);
            objClone.score = resu == a ? 0 : 1;
            objClone.match_option_text[0] = a;
            cloneList.push(objClone)
        })
        return cloneList
    }

    const _goHome=()=>{
        if(props.navigation.getParam('doAgain')){
            props.navigation.navigate('PracticeHistoryExam',{
                draw:props.navigation.getParam('draw')
            })
        }else if(props.navigation.getParam('type') == 'placement_test'){
            props.navigation.navigate('ExpectCuri')
        }else{
            const cb = props.navigation.getParam('cb');
            console.log("=====goback", cb)
            if (cb) {
                cb();
            }
            props.navigation.goBack()
        }
    }

    return (
        <View style={{
            flex:1,
            position:'relative'
        }}>
            <Image source={{uri: 'rs_bg2'}}
                style={{
                    width:'100%',
                    height:'100%',
                    resizeMode:'stretch'
                }}
            />
            <View style={{
                position:'absolute',
                left:0,
                top:0,
                right:0,
                bottom:0,
            }}>
                <Text style={{
                    fontSize: 30,
                    color: '#717477',
                    width:width,
                    textAlign:'center',
                    fontFamily: FontBase.MyriadPro_Bold,
                    lineHeight: 50,
                    position:'absolute',
                    left:0,
                    top:height*(Platform.OS=='ios'?0.12:0.11)
                }}>KIỂM TRA</Text>
                <View style={{
                    height:height*0.19,
                    borderLeftWidth:1,
                    borderRightWidth:1,
                    borderBottomWidth:1,
                    borderColor:'black',
                    flexDirection:'row',
                    position:'absolute',
                    left:5,
                    width:width-10,
                    top:height*0.22
                }}>
                    <View style={{
                        position:'absolute',
                        width:'100%',
                        flexDirection:'row',
                        left:0,
                        top:-height*0.025,
                        alignItems:'center',
                        height:height*0.05,
                        zIndex:9999,
                    }}>
                        <View style={{flex:2,height:1,backgroundColor:'black'}}></View>
                        <Text  style={[styles.lb,{
                            marginBottom:10
                        }]}>Điểm</Text>
                        <View style={{flex:2,height:1,backgroundColor:'black'}}></View>
                        <Text style={[styles.lb,{
                            marginBottom:10,
                        }]}>Lời phê giáo viên</Text>
                        <View style={{flex:3,height:1,backgroundColor:'black'}}></View>
                    </View>
                    <View style={{
                        width:width*0.333,
                        position:'relative',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <Text style={{
                            fontFamily:'iCielAlina-regular',
                            fontSize:SmartScreenBase.smFontSize*200,
                            color:'#be1f2d'
                        }}>
                            {getScore(data.score)}
                        </Text>
                        <Image source={{uri:'tt_gach'}}
                            style={{
                                width:width*0.2,
                                height:width*0.1,
                                resizeMode:'contain',
                                marginTop:-height*(Platform.OS==='ios'? 0.04:0.04)}}/>
                    </View>
                    <View style={{width:1,height:'100%',backgroundColor:'#acacac'}}>

                    </View>
                    <View style={{
                        position:'relative',
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        padding:10,
                    }}>
                        <Text style={{
                            fontFamily:'iCielAlina-regular',
                            fontSize:SmartScreenBase.smFontSize*(Platform.OS==='ios'?80: 70),
                            color:'#be1f2d'
                        }}>
                            {data.comment}
                        </Text>
                    </View>
                </View>
                <View style={{
                    paddingHorizontal:SmartScreenBase.smPercenWidth*10,
                    width:'100%',
                    position:'absolute',
                    left:0,
                    top:height*(Platform.OS==='ios'? 0.5:0.505)
                }}>
                    {!isTeacher ? <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.lb3}>Thời gian hoàn thành: </Text>
                        <Text style={styles.lb2}>{time}</Text>
                    </View> : null}
                    <TouchableOpacity
                        disabled={isTeacher}
                        style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginTop:Platform.OS==='ios'?5:0
                        }}
                        onPress={_seeAnswer}
                    >
                        <Text  style={styles.lb3}>Số câu trả lời đúng:</Text>
                        <Text style={styles.lb2}>{`${data.number_true}/${data.number_true + data.number_false}`}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <ButtonMedium mstyle={styles.btn} isSmall title={'Xem bài chữa'} onPress={() => _startMockTest()}/>
                    <ButtonMedium mstyle={styles.btn} isSmall title={'Trở về'} onPress={_goHome}/>
                </View>
            </View>
            {/* {isLoading && <LoadingScreen/>} */}
            <FullScreenLoadingIndicator visible={isLoading}/>
        </View>
    );
};

export default ResultStudyForTest;

const styles = StyleSheet.create({
    footer:{
        width: smartScreenWidth * 100,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: smartScreenHeight * 4,
        flexDirection: 'row',
        position:'absolute',
        left:0,
        bottom:height*0.01
    },
    btn:{
        width:SmartScreenBase.smPercenWidth*40
    },
    lb:{
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize:SmartScreenBase.smFontSize*60,
        color: '#6c6d70',
    },
    lb3:{
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize:22,
        color: '#6c6d70',
    },
    lb2:{
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize:SmartScreenBase.smFontSize*60,
        color: '#be1f2d',
    }
})
