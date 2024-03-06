import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Alert, ActivityIndicator, ImageBackground
} from 'react-native';
//import Loading from '../../../../screens/LoadingScreen';
import FileSound4 from '../FileSound4';
import FileSound from '../FileSound';
import axios from 'axios';
import TypeExercise from '../Component/TypeExercise';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { ListenningD6 } from '../../../../redux/actions/ListenningD6';
import Iconcheck from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');
import base64 from 'react-native-base64';
import stylesButton from '../../../../styleApp/stylesApp';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import API from '../../../../API/APIConstant';
import StyleLesson from '../StyleLesson';
import FontBase from '../../../../base/FontBase';
let Audio;
let interval;
let ar = [];
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
const WrittingD5 = props => {
    const [question, setQuestion] = useState([]);
    const [playQ, setPlay] = useState('pause');
    const [longQestion, setLongQuestion] = useState(0);
    const [arrayPost, setarrayPost] = useState([]);
    const { route, navigation, lesson_id, modeF, exam_id } = props;
    const [number, setNumber] = useState(0);
    //const [sound, setsound] = useState(new Sound());
    const [dataFirt, setdataFirt] = useState('');
    const [answer, setAnswer] = useState([]);
    const [finalResult, setFinalResult] = useState([]);
    const [clickA, setClickA] = useState(null);
    const [numberAnswer, setNumberAnswer] = useState(0);
    const [textButton, setTextButton] = useState('kiểm tra');
    const [loadding, setLoading] = useState(false);
    const [textQuestion, setTextQuestion] = useState('');
    const [testing, setTesting] = useState('homeword');
    const [checkResult, setCheckResult] = useState(false);
    const [numberSuccess, setNumberSuccess] = useState(0);
    const [showScript, setshowScript] = useState(false);
    const [numberAgain, setNumberAgain] = useState(0);
    const [end, setEnd] = useState(false);
    const [explain, setexplain] = useState([]);
    const [showWebView, setShowWebView] = useState(false);
    const [string, setString] = useState('');
    const [vi, setVi] = useState(false);
    const [threads, setThreads] = useState('');
    const [logid, setlogid] = useState('');
    const [data_lesson, setdata_lesson] = useState({});
    const [data, setData] = useState('');
    const [data1, setData1] = useState('');
    const dataRedux = useSelector(state => state.listenningD6Reducer.data_answer);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const dispatch = useDispatch();
    const [disable, setDisable] = useState(true);
    const [buttonDislable, setButtonDislable] = useState(true)
    useEffect(() => {
    }, [playQ])
    const audio = (data) => {
        Audio = new Sound(`${data}`, null, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return false;
            } else {
                console.log(`${data}`);
            }
            setLongQuestion(Audio.getDuration());
        });
    };

// const submitPre = async ()=>{
//     const body = {
//         data_lesson: JSON.stringify(data_lesson),
//         skill: 'listening',
//         data_answer: JSON.stringify([]),
//         class_id: 1,
//         unit_id: 1,
//         curriculum_id: 1,
//         lesson_id: dataFirt.id,
//     };
//     const url = dataLogin.role === 'student'
//         ? API.baseurl+'api_log_learning/check_score'
//         : API.baseurl + API.saveLogLearning;
//     const header = {
//         'Content-Type': 'application/json',
//         'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
//         'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
//         'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
//     };

//     try {
//         console.log("=========_saveStartLogLearning WrittingD5");
//         const res = await axios({ method: 'post', url: url, headers: header, data: body });
//         let dataReturn = res.data;
//         // if (dataReturn.status) {
//         //     if (modeF === 'lesson') {
//         //         props.reviewResult(dataReturn);
//         //     }
//         // }
//         // ar = [];
//         console.log('dataRe',dataReturn)
//     } catch (error) {
//         console.log(error);
//     }
// }

    useEffect(()=>{
        // submitPre();
    },[])

    const _Submit = async () => {
        let arrr = [];
        console.log('answer', answer);
        

        for (let i = 0; i < answer.length; i++) {
            let ob = new Object();
            ob.question_id = parseInt(data1[i].question_id),
                ob.exercise_type = 'listening',
                ob.question_type = parseInt(data1[i].question_type);
            ob.final_user_choice = answer[i];
            let a = [];
            for (let j = 0; j < arrayPost.length; j++) {
                let obj = new Object();
                obj.num_turn = j;
                obj.score = numberSuccess / question.length;
                obj.user_choice = "arrayPost[j].ans[i].value";
                a.push(obj);
            }
            ob.detail_user_turn = a
            arrr.push(ob)
        }
        props.saveLogLearning(arrr);
        // const body = {
        //     data_lesson: JSON.stringify(data_lesson),
        //     skill: 'listening',
        //     log_lesson_detail_id: parseInt(logid.log_lesson_detail_id),
        //     log_lesson_id: parseInt(logid.log_lesson_id),
        //     data_answer: JSON.stringify(arrr),
        //     class_id: 1,
        //     unit_id: 1,
        //     curriculum_id: 1,
        //     lesson_id: dataFirt.id,
        // };
        //props.hideFeedback();
        // const url = dataLogin.role === 'student'
        //     ? API.baseurl+'api_log_learning/check_score'
        //     : API.baseurl + API.saveLogLearning;
        // const header = {
        //     'Content-Type': 'application/json',
        //     'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
        //     'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
        //     'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        // };

        // try {
        //     console.log("=========_saveStartLogLearning WrittingD5 2");
        //     const res = await axios({ method: 'post', url: url, headers: header, data: body });
        //     let dataReturn = res.data;
        //     if (dataReturn.status) {
        //         if (modeF === 'lesson') {
        //             props.reviewResult(dataReturn);
        //         }
        //     }
        //     ar = [];
        // } catch (error) {
        //     console.log(error);
        // }

        ar = [];
    }
    useEffect(() => {
        if (testing == 'aftertest') {
            setAnswer(dataRedux.answer);
            setQuestion(dataRedux.question);
            setFinalResult(dataRedux.final);
            setNumberSuccess(dataRedux.numberSucess);
            setCheckResult(true);
            setLoading(true);
        } else {
            _getData();
        }
    }, []);
    const _getData = async () => {
        let ar = [];
        let ressponse = {};
        console.log(ressponse);
        ressponse['data'] = props.dataContent;
        // _postDataFirt(ressponse.data);
        setdata_lesson(ressponse);
        let dataConvert = await _convertData(
            ressponse.data.data_question[0].list_option,
        );
        for (let i = 0; i < ressponse.data.data_question[0].list_option.length; i++) {
            ar.push(ressponse.data.data_question[0].list_option[i].option_explain)
        }
        setexplain(ar);
        setdataFirt(ressponse.data.lesson);
        setData1(ressponse.data.data_question[0].list_option);
        setData(ressponse.data.data_question[0].list_option[0]);
        setThreads(ressponse.data.data_question[0].list_option[0].group_content);
        setTextQuestion(ressponse.data.lesson.lesson_paragraph.split(' '));
        setQuestion(dataConvert.question);
        setFinalResult(dataConvert.final);
        let random = await dataConvert.answer;
        var j, x, i;
        for (i = random.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = random[i];
            random[i] = random[j];
            random[j] = x;
        }
        //await audio(ressponse.data.lesson.lesson_audio)
        setAnswer(random);
        setLoading(true);
    };
    const _convertData = data => {
        let dataconvert = Object();
        let dataQuestion = [];
        let dataAnswer = [];
        let dataFilnal = [];
        try{
        data.map((item, index) => {
            let ojQuestion = Object();
            let ojAnswer = Object();
            ojQuestion.option_explain = item.option_explain
            ojQuestion.value = item.option_text;
            ojQuestion.color = 'yellow';
            ojQuestion.margin = -width / 20;
            ojQuestion.opacity = false;
            ojQuestion.choose = false;
            ojAnswer.value = item.match_option_text[0];
            dataQuestion.push(ojQuestion);
            dataAnswer.push(ojAnswer);
            dataFilnal.push(ojAnswer);
        });
        dataconvert.question = dataQuestion;
        dataconvert.answer = dataAnswer;
        dataconvert.final = dataFilnal;
    }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
        return dataconvert;
    };
    const _changeA = index => {
        let data = [...question];
        data.map((item, number) => {
            data[number].opacity = false;
            data[number].choose = false
            if (index == number) {
                data[number].opacity = true;
                data[number].choose = true
            }
        });
        setQuestion(data);
        setClickA(index);
    };
    const _changeB = index => {
        let number = 0;
        let data = [...question];
        if (clickA != null) {
            let array = [...answer];
            let a = array[index];
            array[index] = array[clickA];
            array[clickA] = a;
            data[index].margin = -width / 5.4;
            setAnswer(array);
            data.map((item, int) => {
                data[int].opacity = false;
                data[int].choose = false
                if (item.margin == -width / 5.4) {
                    number = number + 1;
                    // data[index].opacity = 1;
                }
                if (index == int) {
                    data[int].choose = true
                }
            });
        }
        if (number == answer.length) {
            setButtonDislable(false)
        }
        setNumberAnswer(number);
        setClickA(null);
        setQuestion(data);
    };
    const _checkResult = () => {
        if (textButton == 'kiểm tra') {
            props.hideTypeExercise();
            _showResult();
            setNumberAgain(numberAgain + 1);
            if (numberAgain >= 2) {
                props.hideTypeExercise();
                props.showFeedback();
            }
        } else if (textButton == 'làm lại') {
            props.showTypeExercise();
            _again();
        } else if (textButton == 'xem kết quả') {
            setTextButton('tiếp tục')
            setNumberAgain(numberAgain + 1)

        } else {
            props.hideTypeExercise();
            _Submit();
        }
    };
    const _showResult = async () => {
        setDisable(false)
        let data = [...question];
        let ob = new Object();
        ob.ans = answer;
        ar.push(ob);
        setarrayPost(ar);
        //console.log('data',answer);
        let number = 0;
        answer.map((item, index) => {
            data[index].choose = false;
            data[index].opacity = false;
            if (item.value != finalResult[index].value) {
                data[index].color = '#D80B0B';
            } else {
                data[index].color = '#388C02';
                number = number + 1;
            }
        });

        if (testing != 'testing') {
            if (numberAgain < 1) {
                if (number == question.length) {
                    setEnd(true);
                    setNumberSuccess(number);
                    setCheckResult(true);
                    setTextButton('tiếp tục');
                    props.showFeedback();
                } else {
                    setCheckResult(true);
                    setQuestion(data);
                    setTextButton('làm lại');
                    setNumberSuccess(number);
                    setNumberAgain(numberAgain + 1);
                }
            } else {
                if (number == question.length) {
                    setEnd(true);
                    setNumberSuccess(number);
                    setCheckResult(true);
                    setTextButton('tiếp tục');
                    props.showFeedback();
                } else {
                    if (numberAgain == 1) {
                        setNumberSuccess(number);
                        setNumberAgain(numberAgain + 1)
                        setCheckResult(true);
                        setTextButton('xem kết quả');
                        // setNumberAgain(numberAgain +1)
                        props.showFeedback();
                        setEnd(true)
                    } else {
                        props.showFeedback();
                        setNumberSuccess(number);
                        setCheckResult(true);
                        setTextButton('tiếp tục');
                        setEnd(true);
                    }
                }
            }
        } else {
            await _testing(number, data);
        }
    };
    const _testing = async (number, data) => {
        let oj = Object();
        oj.question = data;
        oj.answer = answer;
        oj.final = finalResult;
        oj.numberSucess = numberSuccess;
        await dispatch(ListenningD6(oj));
        //alert('ahihi')
    };
    const _again = () => {
        setDisable(true)
        let data = [...question];
        let array = [...answer];
        data.map((item, index) => {
            data[index].color = 'yellow';
            data[index].margin = -width / 20;
        });
        setButtonDislable(true)
        setCheckResult(false);
        setAnswer(array);
        setQuestion(data);
        setTextButton('kiểm tra');
        setNumberAnswer(0);
    };
    const _changeImage = index => {
        if (question[index].color == '#D80B0B') {
            return 'matchingred';
        } else if (question[index].color == '#388C02') {
            return 'matchinggreen';
        } else {
            return 'matchingyellow';
        }
    };
    const _renderItem = ({ item, index }) => {
        return (

            <View style={{ width: '100%', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: width / 4, }}>
                    <ImageBackground source={{ uri: 'matchinggreen' }} style={{ position: 'absolute', zIndex: 1, width: width / 2.8, height: width / 4, resizeMode: 'contain', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.titleAnswerFlastList}>{question[index].value}</Text>
                    </ImageBackground>
                    <ImageBackground source={{ uri: 'matchingwhite' }} style={{ paddingLeft: '10%', position: 'absolute', width: width / 2, height: width / 4, resizeMode: 'contain', justifyContent: 'center', alignItems: 'center', left: width / 3.5, zIndex: 0 }}>
                        <Text style={styles.titleResult}>{finalResult[index].value}</Text>
                    </ImageBackground>
                    <Image source={{ uri: 'grammar1_4' }} style={styles.iconCheck} />
                </View>

            </View>
        );
    };
    const _showWedView = () => {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{
                        uri:
                            'https://www.oxfordlearnersdictionaries.com/definition/english/' +
                            string,
                    }}
                />
            </View>
        );
    };
    const closeWebView = () => {
        setShowWebView(false);
    };
    const _changeTitle = () => {
        if (!vi) {
            setThreads(data.group_content_vi);
            setVi(true);
        } else {
            setThreads(data.group_content);
            setVi(false);
        }
    };
    const _OnShowScript = () => {
        setshowScript(!showScript);
    }
    return !loadding ? (
        <View
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                flexDirection: 'row',
                position: 'absolute',
                zIndex: 1500,
                //justifyContent: "space-around",
                padding: 10,
                backgroundColor: '#FFFFFF60',
            }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    ) : (
            <View style={styles.container}>
                {showWebView && (
                    <View
                        style={{
                            position: 'absolute',
                            width: '99%',
                            height: '90%',
                            left: 12,
                            backgroundColor: '#fff',
                            top: height / 6,
                            zIndex: 3,
                        }}>
                        <TouchableOpacity
                            onPress={closeWebView}
                            style={{
                                width: 35,
                                height: 35,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                position: 'absolute',
                                top: -10,
                                zIndex: 100,
                                left: -10,
                            }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#D80B0B' }}>
                                X
                        </Text>
                        </TouchableOpacity>
                        {_showWedView()}
                    </View>
                )}
                {showScript === true ? (
                    <View
                        style={{
                            width: SmartScreenBase.smBaseWidth * 1080,
                            height: SmartScreenBase.smBaseHeight * 1080,
                            backgroundColor: '#00000030',
                            position: 'absolute',
                            zIndex: 1000,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                width: SmartScreenBase.smBaseWidth * 970,
                                height: SmartScreenBase.smBaseHeight * 600,
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                borderRadius: 20,
                                marginBottom: SmartScreenBase.smBaseHeight * 200,
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    height: '80%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 5,
                                }}>
                                <Text style={{ marginTop: 20 }}>
                                    {dataFirt.lesson_text_audio}
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    height: '20%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={_OnShowScript}
                                    style={[
                                        stylesApp.Sty_Button,
                                        {
                                            width: SmartScreenBase.smPercenWidth * 40,
                                            marginRight: SmartScreenBase.smPercenWidth * 5,
                                        },
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>Đóng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : null}
                {!checkResult ? (
                    null
                ) : (
                        numberAgain < 3 || numberSuccess == question.length ?

                            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                {
                                    numberSuccess == question.length || numberAgain < 3 ?
                                    <View style={{
                                        height: SmartScreenBase.smBaseWidth * 300,
                                        width: "100%",
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        {numberAgain >= 1 || numberSuccess == question.length ? <FileSound showImage={numberSuccess == question.length ? 'true' : 'false'}/> :null }
                                        
                                    </View>
                                    :
                                     null
                                }

                                <View style={{ width: width, justifyContent: 'center', alignItems: 'center', marginTop: !end ? SmartScreenBase.smBaseWidth * 100 : 0 }}>
                                    <Text style={{...StyleLesson.text_answer}}>Bạn đã trả lời đúng {numberSuccess} / {question.length}</Text>
                                </View>
                            </View>
                            :

                            <View style={{ width: '100%', paddingHorizontal: 30,paddingTop:50 }}>
                                <Text style={{...StyleLesson.text_answer}}> Đáp án đúng là :</Text>
                            </View>
                    )}

                <ScrollView style={[styles.scrollViewContainer]}>
                    {!end ? (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={[styles.bodyContainer,]}>
                                <View style={styles.bodyContent}>
                                    <View style={{ height: '100%', width: width / 2.5, zIndex: 1 }}>
                                        {question.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => _changeB(index)}
                                                    style={styles.buttonLeft}>
                                                    <Image
                                                        source={{ uri: `${_changeImage(index)}` }}
                                                        style={styles.imageLeft}
                                                    />
                                                    <View style={styles.viewLeftContent}>
                                                        <View style={styles.viewTitleLeft}>
                                                            <Text style={{ ...styles.titleLeft, fontSize: SmartScreenBase.smFontSize * 43 }}>{item.value}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                    <View style={{ height: '100%', zIndex: 0 }}>
                                        {answer.map((item, index) => {
                                            return (
                                                disable ?
                                                    <View
                                                        onStartShouldSetResponder={() => _changeA(index)}
                                                        style={[
                                                            styles.buttonRight,
                                                            {
                                                                marginLeft:
                                                                    question[index] && question[index].margin
                                                                        ? question[index].margin
                                                                        : -width / 20,
                                                                // opacity:
                                                                //     question[index] && question[index].opacity
                                                                //         ? question[index].opacity
                                                                //         : 1,
                                                            },
                                                        ]}>
                                                        <Image
                                                            source={{ uri: question[index].choose ? 'matchingto' : 'matchingwhite' }}
                                                            style={[styles.imageRight, { tintColor: question[index].opacity ? '#f3911e' : undefined }]}
                                                        />
                                                        <View style={styles.viewRightContent}>
                                                            <Text style={[styles.titleRight]}>{item.value}</Text>
                                                        </View>
                                                        {checkResult && (
                                                            <Image
                                                                source={{
                                                                    uri:
                                                                        question[index].color == '#388C02'
                                                                            ? 'grammar1_4'
                                                                            : 'grammar1_3',
                                                                }}
                                                                style={styles.iconCheck}
                                                            />
                                                        )}
                                                    </View>
                                                    :
                                                    <View
                                                        style={[
                                                            styles.buttonRight,
                                                            {
                                                                marginLeft:
                                                                    question[index] && question[index].margin
                                                                        ? question[index].margin
                                                                        : -width / 20,
                                                            },
                                                        ]}>
                                                        <Image
                                                            source={{ uri: question[index].choose ? 'matchingto' : 'matchingwhite' }}
                                                            style={[styles.imageRight, { tintColor: question[index].opacity ? '#f3911e' : undefined }]}
                                                        />
                                                        <View style={styles.viewRightContent}>
                                                            <Text style={[styles.titleRight]}>{item.value}</Text>
                                                        </View>
                                                        {checkResult && (
                                                            <Image
                                                                source={{
                                                                    uri:
                                                                        question[index].color == '#388C02'
                                                                            ? 'grammar1_4'
                                                                            : 'grammar1_3',
                                                                }}
                                                                style={styles.iconCheck}
                                                            />
                                                        )}
                                                    </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    ) : (
                            <View>
                                {
                                    textButton == 'xem kết quả' || numberSuccess == question.length ?
                                        < View style={styles.bodyContent}>
                                            <View style={{ height: '100%', width: width / 2.5, zIndex: 1 }}>
                                                {question.map((item, index) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => _changeB(index)}
                                                            style={styles.buttonLeft}>
                                                            <Image
                                                                source={{ uri: `${_changeImage(index)}` }}
                                                                style={styles.imageLeft}
                                                            />
                                                            <View style={styles.viewLeftContent}>
                                                                <View style={styles.viewTitleLeft}>
                                                                    <Text style={{ ...styles.titleLeft, fontSize: SmartScreenBase.smFontSize * 43 }}>{item.value}</Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    );
                                                })}
                                            </View>
                                            <View style={{ height: '100%', zIndex: 0 }}>
                                                {answer.map((item, index) => {
                                                    return (
                                                        disable ?
                                                            <View
                                                                onStartShouldSetResponder={() => _changeA(index)}
                                                                style={[
                                                                    styles.buttonRight,
                                                                    {
                                                                        marginLeft:
                                                                            question[index] && question[index].margin
                                                                                ? question[index].margin
                                                                                : -width / 20,
                                                                        // opacity:
                                                                        //     question[index] && question[index].opacity
                                                                        //         ? question[index].opacity
                                                                        //         : 1,
                                                                    },
                                                                ]}>
                                                                <Image
                                                                    source={{ uri: question[index].choose ? 'matchingto' : 'matchingwhite' }}
                                                                    style={[styles.imageRight, { tintColor: question[index].opacity ? '#f3911e' : undefined }]}
                                                                />
                                                                <View style={styles.viewRightContent}>
                                                                    <Text style={[styles.titleRight]}>{item.value}</Text>
                                                                </View>
                                                                {checkResult && (
                                                                    <Image
                                                                        source={{
                                                                            uri:
                                                                                question[index].color == '#388C02'
                                                                                    ? 'grammar1_4'
                                                                                    : 'grammar1_3',
                                                                        }}
                                                                        style={styles.iconCheck}
                                                                    />
                                                                )}
                                                            </View>
                                                            :
                                                            <View
                                                                style={[
                                                                    styles.buttonRight,
                                                                    {
                                                                        marginLeft:
                                                                            question[index] && question[index].margin
                                                                                ? question[index].margin
                                                                                : -width / 20,
                                                                    },
                                                                ]}>
                                                                <Image
                                                                    source={{ uri: question[index].choose ? 'matchingto' : 'matchingwhite' }}
                                                                    style={[styles.imageRight, { tintColor: question[index].opacity ? '#f3911e' : undefined }]}
                                                                />
                                                                <View style={styles.viewRightContent}>
                                                                    <Text style={[styles.titleRight]}>{item.value}</Text>
                                                                </View>
                                                                {checkResult && (
                                                                    <Image
                                                                        source={{
                                                                            uri:
                                                                                question[index].color == '#388C02'
                                                                                    ? 'grammar1_4'
                                                                                    : 'grammar1_3',
                                                                        }}
                                                                        style={styles.iconCheck}
                                                                    />
                                                                )}
                                                            </View>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                        :
                                        <FlatList
                                            data={answer}
                                            renderItem={_renderItem}
                                            extraData={answer}
                                            keyExtractor={(item, index) => index.toString()}
                                            showsVerticalScrollIndicator={false}
                                        />
                                        }
                            </View>
                        )}
                </ScrollView>
                {
                    testing == 'homeword' ? (
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={buttonDislable ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} onPress={_checkResult} disabled={buttonDislable}>
                                <Text style={stylesButton.Sty_Text_Button}>{textButton.toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
                {
                    testing == 'testing' && numberAnswer == answer.length && (
                        <TouchableOpacity style={[
                            stylesApp.Sty_Button,
                            { width: SmartScreenBase.smPercenWidth * 90, marginTop: 10 },
                        ]} onPress={_showResult}>
                            <Text style={styles.titleCheck}>TIẾP TỤC</Text>
                        </TouchableOpacity>
                    )
                }
                {
                    testing == 'aftertest' && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TouchableOpacity
                                style={styles.buttonBack}
                                onPress={() => {
                                    this.props.methodScreenBack();
                                }}>
                                <Text style={styles.titleCheck}>QUAY LẠI</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonBack}
                                onPress={() => {
                                    setEnd(!end);
                                }}>
                                <Text style={styles.titleCheck}>GIẢI THÍCH</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonBack}
                                onPress={() => {
                                    this.props.methodScreen(9);
                                }}>
                                <Text style={styles.titleCheck}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View >
        );
};
const styles = StyleSheet.create({
    container: {
        height: height / 1.14,
        width: width,
        alignItems: 'center',
    },
    scrollViewContainer: {
        width: width,
        height: '60%',
        maxHeight: '70%',
        // paddingTop: height / 45,
        paddingHorizontal: 20,
        
    },
    scrollViewQuestion: {
        width: '100%',
        backgroundColor: '#fff',
        height: height / 4.1,
        padding: 15,
        borderRadius: 15,
    },
    titleQuestion: {
        fontSize: 17,
        fontWeight: '500',
    },
    bodyContainer: {
        width: '100%',
        paddingTop: 25,
    },
    bodyContent: {
        width: '100%',
        flexDirection: 'row',
    },
    imageLeft: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '7%',
        resizeMode: 'contain',
    },
    buttonLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: width / 4,
        marginBottom: '0.2%',
    },
    titleNumber: {
        marginRight: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewLeftContent: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingLeft: '7%',
    },
    viewTitleLeft: {
        borderColor: '#4D4D4D',
        width: '72%',
    },
    titleLeft: {
        fontSize: 14,
        paddingLeft: 5,
        width: '100%',
        fontWeight: '500',
    },
    buttonRight: {
        width: width / 1.5,
        height: width / 4,
    },
    imageRight: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },
    viewRightContent: {
        position: 'absolute',
        width: '100%',
        paddingLeft: '22%',
        height: '100%',
        justifyContent: 'center',
    },
    titleRight: {
        marginLeft: SmartScreenBase.smPercenWidth*3.5,
        width: SmartScreenBase.smPercenWidth*34,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*45,
    },
    buttonCheck: {
        width: width / 1.3,
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 15,
        backgroundColor: '#01283A',
        marginTop: 15,
        borderRadius: 25,
    },
    buttonBack: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 15,
        backgroundColor: '#01283A',
        marginTop: 15,
        borderRadius: 25,
    },
    titleCheck: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
    },
    ViewFlastList: {
        borderRadius: 15,
        marginTop: 50,
        padding: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        minHeight: height / 7,
    },
    numberFlastList: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleAnswerFlastList: {
        padding: SmartScreenBase.smPercenWidth*1.5,
        width: SmartScreenBase.smPercenWidth*31,
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 15,
    },
    iconHand: {
        width: width / 15,
        height: width / 15,
        resizeMode: 'contain',
    },
    titleResult: {
        fontSize: SmartScreenBase.smFontSize*48,
        fontFamily: FontBase.MyriadPro_Bold,
        paddingRight: SmartScreenBase.smPercenWidth*7,
        color: '#388C02',
        paddingLeft: SmartScreenBase.smPercenWidth*2.5,
    },
    titleSucess: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
    },
    iconFace: {
        width: width / 3.5,
        height: width / 3.5,
        resizeMode: 'contain',
    },
    iconCheck: {
        position: 'absolute',
        width: SmartScreenBase.smBaseWidth*80,
        height: SmartScreenBase.smBaseWidth*80,
        right: SmartScreenBase.smPercenWidth,
        top: SmartScreenBase.smPercenWidth*8.5,
    },
    iconCheck2: {
        position: 'absolute',
        width: 40,
        height: 40,
        top: -25,
        left: width / 2 - 50,
    },
});
export default WrittingD5;
