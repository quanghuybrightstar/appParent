import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Alert, ActivityIndicator, ImageBackground, Platform
} from 'react-native';
//import Loading from '../../../../screens/LoadingScreen';
import FileSound from '../FileSound';
import FileSound4 from '../FileSound4';
import axios from 'axios';
import TypeExercise from '../Component/TypeExercise';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {ListenningD6} from '../../../../redux/actions/ListenningD6';
import Iconcheck from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');
import Slider1 from './Slider';
import base64 from 'react-native-base64';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import API from '../../../../API/APIConstant';
import SoundQestion from '../../../SoundQuestion';
import StyleLesson from '../StyleLesson';
import EventBus from 'react-native-event-bus';
import ModalScript from '../../../modalScript'
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';

let Audio;
let interval;
let ar = [];
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
const ListeningD4 = props => {
    const [question, setQuestion] = useState([]);
    const [playQ, setPlay] = useState('pause');
    const [longQestion, setLongQuestion] = useState(0);
    const [runSlider, setRunSlider] = useState(0);
    const [arrayPost, setarrayPost] = useState([]);
    const {route, navigation, lesson_id, modeF, exam_id} = props;
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
    const [testing, setTesting] = useState('exam');
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
    const [id, setid] = useState(0);
    const [audiolink, setaudiolink] = useState('');
    const [loadAudio, setLoadAudio] = useState(false);
    const dataRedux = useSelector(state => state.listenningD6Reducer.data_answer);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const dispatch = useDispatch();
    const [disable, setDisable] = useState(true);
    const [showLast,setShowLast] = useState(false);

    useEffect(() => {
        _playQuestion('pause');
    }, [props.Status]);

    useEffect(()=>{
        props.saveLogLearning([]);
    },[]);

    const _playQuestion = async (value) => {
        if (value == 'pause') {
            await Audio.pause();
            clearInterval(interval);
        } else if (value == 'play') {
            await Audio.play();
            setNumber(number + 1);
        }
    };

    const _play = async (value) => {
        await setPlay(value);
        await _playQuestion(value);
    };

    const _changeValue = async (value) => {
        await Audio.setCurrentTime(value);
        await setRunSlider(value);
        await _playQuestion('play');
        await setPlay('play');


    };
    const _changeStart = async (value) => {
        await Audio.setCurrentTime(value);
        await setRunSlider(value);
        await _playQuestion('pause');
        await setPlay('pause');
    };

    useEffect(() => {
        setTime();
    }, [playQ]);
    useEffect(() => {
        _playQuestion('pause');
    }, [props.Status]);

    const _Submit = async () => {
        let arrr = [];
        //  console.log('answer',answer);
        // console.log('question',question);

        let ob = new Object();
        ob.question_id = id;
        ob.exercise_type = 'listening';
        ob.question_type = '6';
        ob.question_score = 0;
        ob.final_user_choice = answer.map(u => u.value).join();
        let a = [];
        for (let j = 0; j < arrayPost.length; j++) {
            let obj = new Object();
            obj.num_turn = j;
            obj.score = numberSuccess / question.length;
            obj.user_choice = 'arrayPost[j].ans[i].value';
            a.push(obj);
        }
        ob.detail_user_turn = a;
        arrr.push(ob);
        props.saveLogLearning(arrr);
    };
    const setTime = () => {
        interval = setInterval(() => {
            if (playQ == 'play') {
                Audio.getCurrentTime((seconds, isPlaying) => {
                    setRunSlider(seconds);
                    if (seconds > (longQestion / 100 * 99.5)) {
                        setPlay('pause');
                        setRunSlider(0);
                        Audio.pause();
                        Audio.setCurrentTime(0);
                    }
                });
            } else {
                clearInterval(interval);
            }

        }, 200);
    };
    useEffect(() => {
        if (testing == 'afterTest') {
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
        ressponse['data'] = props.dataContent;
        //console.log(ressponse);
        // _postDataFirt(ressponse.data);
        setdata_lesson(ressponse);
        let dataConvert = await _convertData(
            ressponse.data.data_question[0].list_option,
        );
        for (let i = 0; i < ressponse.data.data_question[0].list_option.length; i++) {
            ar.push(ressponse.data.data_question[0].list_option[i].option_explain);
        }
        setexplain(ar);
        setid(ressponse.data.data_question[0].question_id);
        setdataFirt(ressponse.data.lesson);
        setaudiolink(ressponse.data.lesson.lesson_audio);
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
            ojQuestion.option_explain = item.option_explain;
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
            data[number].choose = false;
            if (index == number) {
                data[number].opacity = true;
                data[number].choose = true;
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
                data[int].choose = false;
                if (item.margin == -width / 5.4) {
                    number = number + 1;
                    // data[index].opacity = 1;
                }
                if (index == int) {
                    data[int].choose = true;
                }
            });
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
            if ((numberAgain+1) >= 2) {
                props.showFeedback();
            }
        } else if (textButton == 'làm lại') {
            props.showTypeExercise();
            _again();
        } else if (textButton == 'xem kết quả') {
            setTextButton('tiếp tục ');
            setNumberAgain(numberAgain + 1);
            props.hideFeedback();
        }
        else if(textButton == 'tiếp tục'){
            setTextButton('tiếp tục ');
            if(numberSuccess == question.length){
                setShowLast(true);
            }
            setNumberAgain(4);
            setCheckResult(true);
        }
        else{
           props.hideTypeExercise();
            _Submit();
        }
    };
    const _showResult = async () => {
        setDisable(false);
        let arr = [...arrayPost];
        let data = [...question];
        let ob = new Object();
        ob.ans = answer;
        arr.push(ob);
        setarrayPost(arr);
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

        if (testing != 'Testing') {
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
                        setNumberAgain(numberAgain + 1);
                        setCheckResult(true);
                        setTextButton('xem kết quả');
                        // setNumberAgain(numberAgain +1)
                        setEnd(true);
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
        setDisable(true);
        let data = [...question];
        let array = [...answer];
        data.map((item, index) => {
            data[index].choose = false;
            data[index].opacity = false;
            data[index].color = 'yellow';
            data[index].margin = -width / 20;
        });
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
    const _renderItem = ({item, index}) => {
        return (
            <View style={{width: '100%', marginBottom: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', height: width / 4}}>
                    <ImageBackground source={{uri: 'matchinggreen'}} style={{
                        position: 'absolute',
                        zIndex: 1,
                        width: width / 2.8,
                        height: width / 4,
                        resizeMode: 'contain',
                        justifyContent: 'center',
                        // alignItems: 'center',
                    }}>
                        <Text style={styles.titleAnswerFlastList}>{question[index].value}</Text>
                    </ImageBackground>
                    <ImageBackground source={{uri: 'matchingwhite'}} style={{
                        paddingLeft: '10%',
                        position: 'absolute',
                        width: width / 2,
                        height: width / 4,
                        resizeMode: 'contain',
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: width / 3.333,
                        zIndex: 0,
                    }}>
                        <Text style={styles.titleResult}>{finalResult[index].value}</Text>
                    </ImageBackground>
                    <Image source={{uri: 'grammar1_4'}} style={styles.iconCheck}/>
                </View>
                <Text style={{
                    ...StyleLesson.text_explain,
                    marginTop: 15,
                    marginBottom: 10,
                    textTransform: 'uppercase',
                }}>
                    Giải thích:
                </Text>
                <Text style={{...StyleLesson.explain_text, marginBottom: 10}}>
                    {question[index].option_explain}
                </Text>
            </View>
        );
    };

    

    const _showWedView = () => {
        return (
            <View style={{flex: 1}}>
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

    const _OnShowScript = () => {
        setshowScript(!showScript);
    };

    return !loadding ? (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                position: 'absolute',
                zIndex: 1500,
                //justifyContent: "space-around",
                padding: 10,
                backgroundColor: '#FFFFFF60',
            }}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
    ) : (
        <View style={{...styles.container}}>
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
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#D80B0B'}}>
                            X
                        </Text>
                    </TouchableOpacity>
                    {_showWedView()}
                </View>
            )}
            <ModalScript
                audio={audiolink}
                title={dataFirt.lesson_text_audio}
                visible={showScript}
                close={()=>setshowScript(false)}
            />
            {!checkResult ? (
                <View>
                    <View>
                        <SoundQestion
                            Audio={audiolink}
                        />
                    </View>
                </View>
            ) : (

                (numberAgain < 3 || numberSuccess == question.length) &&!showLast ?

                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: SmartScreenBase.smPercenHeight}}>
                        {
                            (numberSuccess == question.length || numberAgain < 3) &&
                            <View style={{
                                height: SmartScreenBase.smPercenHeight*((numberAgain >= 2 ||numberSuccess == question.length)?13:1),
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <FileSound 
                                showIcon={ (numberAgain >= 2 ||numberSuccess == question.length) ?null: 'none'}
                                showImage={numberSuccess == question.length ? 'true' : 'false'}/>
                            </View>
                        }

                        <View style={{
                            width: width,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: !end ? SmartScreenBase.smBaseWidth * 100 : 0,
                        }}>                     

                            <Text style={{...StyleLesson.text_answer}}>Bạn đã trả lời
                                đúng {numberSuccess} / {question.length}</Text>
                        </View>
                    </View>
                    :

                    <View style={{width: '100%', paddingHorizontal: 30}}>
                        <Text style={{...StyleLesson.text_answer}}> Đáp án đúng
                            là :</Text>
                    </View>
            )}
            <View style={{...styles.scrollViewContainer,
                 maxHeight: SmartScreenBase.smPercenHeight * (numberAgain>=3 || showLast?( Platform.OS==='ios'? 70:66):(
                (checkResult && !(numberAgain >= 2 ||numberSuccess == question.length)) ?58:(Platform.OS==='ios'? 55:52)
            ))}}>
                {!end ? (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.bodyContainer}>
                            <View style={styles.bodyContent}>
                                <View style={{height: '100%', width: width / 2.5, zIndex: 1}}>
                                    {question.map((item, index) => {
                                        return (
                                            disable ?
                                                <TouchableOpacity
                                                    onPress={() => _changeB(index)}
                                                    style={styles.buttonLeft}>
                                                    <Image
                                                        source={{uri: `${_changeImage(index)}`}}
                                                        style={styles.imageLeft}
                                                    />
                                                    <View style={styles.viewLeftContent}>
                                                        <View style={styles.viewTitleLeft}>
                                                            <Text style={styles.titleLeft}>{item.value}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                <View

                                                    style={styles.buttonLeft}>
                                                    <Image
                                                        source={{uri: `${_changeImage(index)}`}}
                                                        style={styles.imageLeft}
                                                    />
                                                    <View style={styles.viewLeftContent}>
                                                        <View style={styles.viewTitleLeft}>
                                                            <Text style={styles.titleLeft}>{item.value}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                        );
                                    })}
                                </View>
                                <View style={{height: '100%', zIndex: 0}}>
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
                                                        },
                                                    ]}>
                                                    <Image
                                                        source={{uri: question[index].choose ? 'matchingto' : 'matchingwhite'}}
                                                        style={[styles.imageRight, {tintColor: question[index].opacity ? '#f3911e' : undefined}]}
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
                                                        source={{uri: question[index].choose ? 'matchingto' : 'matchingwhite'}}
                                                        style={[styles.imageRight, {tintColor: question[index].opacity ? '#f3911e' : undefined}]}
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
                                    })
                                        }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                ) : (
                    <View>
                        {
                            (textButton == 'xem kết quả' || numberSuccess == question.length)&&!showLast ?
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={styles.bodyContainer}>
                                        <View style={styles.bodyContent}>
                                            <View style={{ height: '100%', width: width / 2.5, zIndex: 1 }}>
                                                {question.map((item, index) => {
                                                    return (
                                                        disable ?
                                                            <TouchableOpacity
                                                                onPress={() => _changeB(index)}
                                                                style={styles.buttonLeft}>
                                                                <Image
                                                                    source={{uri: `${_changeImage(index)}`}}
                                                                    style={styles.imageLeft}
                                                                />
                                                                <View style={styles.viewLeftContent}>
                                                                    <View style={styles.viewTitleLeft}>
                                                                        <Text style={styles.titleLeft}>{item.value}</Text>
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        :
                                                            <View style={styles.buttonLeft}>
                                                                <Image
                                                                    source={{uri: `${_changeImage(index)}`}}
                                                                    style={styles.imageLeft}
                                                                />
                                                                <View style={styles.viewLeftContent}>
                                                                    <View style={styles.viewTitleLeft}>
                                                                        <Text style={styles.titleLeft}>{item.value}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                    );
                                                })}
                                            </View>
                                            <View style={{height: '100%', zIndex: 0}}>
                                                {answer.map((item, index) => {
                                                    return (
                                                        disable ?
                                                            <View
                                                                onStartShouldSetResponder={() => _changeA(index)}
                                                                style={[styles.buttonRight,
                                                                    {
                                                                        marginLeft:
                                                                            question[index] && question[index].margin
                                                                                ? question[index].margin
                                                                                : -width / 20,
                                                                    },
                                                            ]}>
                                                                <Image
                                                                    source={{uri: question[index].choose ? 'matchingto' : 'matchingwhite'}}
                                                                    style={[styles.imageRight, {tintColor: question[index].opacity ? '#f3911e' : undefined}]}
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
                                                                    source={{uri: question[index].choose ? 'matchingto' : 'matchingwhite'}}
                                                                    style={[styles.imageRight, {tintColor: question[index].opacity ? '#f3911e' : undefined}]}
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
                                    :
                                <FlatList
                                    data={answer}
                                    renderItem={_renderItem}
                                    extraData={answer}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    style={{}}
                                />
                        }

                    </View>
                )}
            </View>

            {
                numberAnswer != answer.Length && numberAnswer != answer.length &&(
                    <View>
                        <TouchableOpacity
                           disabled={true}
                           onPress={_checkResult}
                           style={[stylesApp.Sty_Button_disable, {marginTop: SmartScreenBase.smPercenHeight*2}]}
                        >
                            <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

            {
                testing === 'exam' && numberAnswer == answer.length &&(
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                        {
                            (textButton.toUpperCase() === 'TIẾP TỤC' || numberAgain == 3) && (
                                <TouchableOpacity
                                onPress={_OnShowScript}
                                style={[stylesApp.Sty_ShortButton,{marginTop: SmartScreenBase.smPercenHeight*2}]}
                                >
                                    <Text style={stylesApp.Sty_Text_Button}>SCRIPT</Text>
                                </TouchableOpacity>
                            )
                        }
                        <TouchableOpacity
                           onPress={_checkResult}
                           style={[(textButton.toUpperCase() === 'TIẾP TỤC' || numberAgain == 3) ? stylesApp.Sty_ShortButton
                            :stylesApp.Sty_Button, {marginTop: SmartScreenBase.smPercenHeight*2}]}
                        >
                            <Text style={stylesApp.Sty_Text_Button}>{textButton.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

            {testing == 'Testing' && numberAnswer == answer.length && (
                <TouchableOpacity style={[
                    stylesApp.Sty_Button,
                    {width: SmartScreenBase.smPercenWidth * 90, marginTop: 10},
                ]} onPress={_showResult}>
                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                </TouchableOpacity>
            )}

            {testing == 'afterTest' && (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                    <TouchableOpacity
                        style={styles.buttonBack}
                        onPress={() => {
                            this.props.methodScreenBack();
                        }}>
                        <Text style={stylesApp.Sty_Text_Button}>QUAY LẠI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonBack}
                        onPress={() => {
                            setEnd(!end);
                        }}>
                        <Text style={stylesApp.Sty_Text_Button}>GIẢI THÍCH</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonBack}
                        onPress={() => {
                            this.props.methodScreen(9);
                        }}>
                        <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        alignItems: 'center',
    },
    scrollViewContainer: {
        width: width,
        // height: '70%',
        maxHeight: '70%',
        paddingTop: SmartScreenBase.smPercenHeight,
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
        paddingLeft: '7%',
        fontWeight: '500',
        fontSize: 14,
        marginRight:50
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
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Bold,
        width: SmartScreenBase.smPercenWidth*28,
        marginLeft: SmartScreenBase.smPercenWidth*2,
        color: Colors.Black
    },
    iconHand: {
        width: width / 15,
        height: width / 15,
        resizeMode: 'contain',
    },
    titleResult: {
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Bold,
        paddingRight: 35,
        color: '#388C02',
        paddingLeft: 10,
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
        width: 30,
        height: 30,
        right: 0,
        top: '38%',
    },
    iconCheck2: {
        position: 'absolute',
        width: 40,
        height: 40,
        top: -25,
        left: width / 2 - 50,
    },
});
export default ListeningD4;
