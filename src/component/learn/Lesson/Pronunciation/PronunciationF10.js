import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ImageBackground, Animated, TouchableOpacity, Image, FlatList, Modal} from 'react-native';
import styles from './style';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Slider from "@react-native-community/slider";
import Sound from 'react-native-sound';
import Header from './Header';
import API from '../../../../API/APIConstant';
import axios from 'axios';
import LoadingScreen from './../../../../screens/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import Video from 'react-native-video';
import FileSoundiconlog from "../FileSoundiconlog";
import StyleApp from '../../../../styleApp/stylesApp';
import EventBus from 'react-native-event-bus';

let timeOutValueSlider;
let vietnam = '';
let english = '';
const smartFont = SmartScreenBase.smFontSize;
let count = 0;

const PronunciationF10 = (props) => {

    const {route, navigation, lesson_id, modeF, group_id, dataContent} = props;
    const [answer, setAnswer] = useState(-1);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [playSound, setPlaySound] = useState(false);
    const [valueSlider, setValueSlider] = useState(0);
    const [soundPlay, setSoundPlay] = useState('');
    const [duration, setDuration] = useState(0);
    const [dataQuestion, setDataQuestion] = useState('');
    const [dataIndexQuestion, setDataIndexQuestion] = useState(0);
    const [listQuestion, setListQuestion] = useState('');
    const [questionContent, setQuestionContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [logLearning, setLogLearning] = useState({
        'class_id': 1,
        'unit_id': 1,
        'curriculum_id': 1,
    });
    const [dataAnswer, setDataAnswer] = useState([]);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [playBack, setPlayBack] = useState(0);
    const [pause, setPause] = useState(false);
    const [isShowResult, setShowResult] = useState(false);
    const player = useRef();

    useEffect(() => {
        if (valueSlider === duration && valueSlider !== 0 && duration !== 0) {
            setPlaySound(false);
        }
    }, [valueSlider]);

    useEffect(() => {
        if (playSound) {
            setPause(false);
        } else {
            setPause(true);
        }
    }, [playSound]);

    useEffect(() => {
        _getDataQuestion();
        props.saveLogLearning([]);

        const _listener = (data) => {
            setPause(true);
            setPlaySound(false);
        };
        EventBus.getInstance().addListener("sound_should_pause", _listener)

        return()=>{
            EventBus.getInstance().removeListener("sound_should_pause", _listener)
        }
    }, []);

    useEffect(() => {
        if (listQuestion) {
            setIsLoading(true);
            setQuestionContent(listQuestion[0].question_content);
            vietnam = listQuestion[0].group_content_vi;
            english = listQuestion[0].group_content;
            let soundF = listQuestion[0].content_question ?? '';
            soundF = JSON.parse(soundF);
            if (soundF) {
                let contentQuestionAudio = soundF.content_question_audio ?? '';
                setSoundPlay(contentQuestionAudio);
            }
            setIsLoading(false)
        }
    }, [listQuestion]);

    useEffect(() => {
        if (dataQuestion) {
            setListQuestion(dataQuestion[dataIndexQuestion].list_option);
        }
    }, [dataIndexQuestion, dataQuestion]);

    const _saveLogLearning = () => {
        props.saveLogLearning(dataAnswer);
    };

    const _getDataQuestion = async () => {
        if (dataContent) {
            setDataQuestion(dataContent.data_question);
        }
    };

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={[
                    styles.buttonAnswerF10,
                    !item.selected ?
                        answer === index ? styles.backgroundColorChooseF10 : styles.backgroundColorNoChooseF10
                        : item.score === '1' ? styles.checkF10 : styles.checkNoF10,
                ]}
                onPress={() => setAnswer(index)}
            >
                <Text style={{color: '#000', fontSize: smartFont * 50}}>{item.match_option_text[0]}</Text>
            </TouchableOpacity>
        );
    };
    const _checkQuestion = () => {
        try{
        setShowResult(true)
        setPlaySound(false);
        let listQ = [...listQuestion];
        listQ[answer]['selected'] = '1';
        let score = listQ[answer].score ?? 0;
        let dataAns = [...dataAnswer];
        let data = {};
        data['question_id'] = listQuestion[answer].question_id;
        data['exercise_type'] = 'pronunciation';
        data['question_type'] = listQuestion[answer].question_type;
        data['question_score'] = listQuestion[answer].score;
        data['final_user_choice'] = listQuestion[answer].match_option_text[0];
        let dataDetails = {};
        dataDetails['num_turn'] = 1;
        dataDetails['score'] = listQuestion[answer].score;
        dataDetails['user_choice'] = listQuestion[answer].match_option_text[0];
        data['detail_user_turn'] = [];
        data['detail_user_turn'].push(dataDetails);
        dataAns.push(data);
        if (modeF === 'exam' || modeF === 'mini_test')  {
            props.setDataAnswer(dataAns);
            // _saveLogExam(dataAns);
        } else {
            setDataAnswer(dataAns);
            if (score === '1') {
                setModalSuccess(true);
                setModalVisible(true);
                clearInterval(timeOutValueSlider);
                setAnswer(-1);
            } else {
                setModalSuccess(false);
                setModalVisible(true);
                clearInterval(timeOutValueSlider);
                setAnswer(-1);
            }

            setListQuestion(listQuestion);
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    };

    const _renderError = () => {
        return (
            <View style={{justifyContent: "center",
                alignItems: "center",
                position: 'absolute',
                bottom: SmartScreenBase.smPercenHeight * 8,
                width:'100%'
            }}>
                <FileSoundiconlog showImage={"false"}/>
            </View>
        );
    };

    const _renderSuccess = () => {
        return (
            <View style={{justifyContent: "center",
                alignItems: "center",
                position: 'absolute',
                bottom: SmartScreenBase.smPercenHeight * 8,
                width:'100%'
            }}>
                <FileSoundiconlog showImage={"true"}/>
            </View>
        );
    };

    const _nextQuestion = () => {
        setShowResult(false)
        setPause(true);
        setPlaySound(false);
        setValueSlider(0);
        let index = dataIndexQuestion + 1;
        if (dataQuestion[index]) {
            props.setIndexQuestion(index);
            setDataIndexQuestion(dataIndexQuestion => dataIndexQuestion + 1);
            setModalVisible(false);
            setAnswer(-1);
        } else {
            setModalVisible(false);
            // setIsLoading(true);
            _saveLogLearning();
        }
    };

    const _onValueChange = (value) => {
        if (count === 0) {
            let playBack = pause ? 1 : 0;
            setPlayBack(playBack);
        }
        if (!pause) {
            setPause(true);
        }
        count++;
    };

    const _onSlidingComplete = (value) => {
        if (playBack) {
            setPause(true);
        } else {
            setPause(false);
        }
        player.current.seek(value);
        count = 0;
    };

    const _play = () => {
        if (!playSound) {
            if (valueSlider === duration) {
                player.current.seek(0);
            } else {
                player.current.seek(valueSlider);
            }
        }
        setPlaySound(!playSound);
    };

    return (
        <View style={{flex: 1}}>
            {/*<Header index={dataIndexQuestion} total={dataQuestion.length} goBack={() => props.goBack()} stopSound={() => setPause(false)}/>*/}
            {
                // isLoading ?
                //     <LoadingScreen/>
                //     :
                    <View style={{flex: 1}}>
                        <View style={styles.viewListAnswer}>
                            <View style={styles.playSoundF10}>
                                <TouchableOpacity
                                    disabled={isShowResult}
                                    onPress={() => _play()}
                                >
                                    {
                                        !playSound ?
                                            <Image source={{uri: 'lesson_vocab_image18'}} style={styles.imageSound}/>
                                            :
                                            <Image source={{uri: 'lesson_vocab_image19'}} style={styles.imageSound}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.styleViewSliderF10}>
                                <Slider
                                    style={styles.styleSliderF10}
                                    minimumValue={0}
                                    maximumValue={duration}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#FFFFFF"
                                    thumbTintColor="#FFFFFF"
                                    value={valueSlider}
                                    onSlidingComplete={(value) => _onSlidingComplete(value)}
                                    onValueChange={(value) => _onValueChange(value)}
                                />
                            </View>
                            <View style={styles.questionContent}>
                                <Text style={styles.textListNumber}>
                                    <Text style={styles.textListNumber2}>{questionContent.trim()}</Text>
                                </Text>
                            </View>
                            <FlatList
                                data={listQuestion}
                                renderItem={_renderItem}
                                keyExtractor={(index) => index.toString()}
                                scrollEnabled={false}
                            />
                            <Video
                                source={{uri: soundPlay}}   // Can be a URL or a local file.
                                ref={player}
                                paused={pause}
                                audioOnly={true}
                                onEnd={() => setValueSlider(duration)}
                                onSeek={(event) => setValueSlider(event.currentTime)}
                                onLoad={(event) => setDuration(event.duration)}
                                onProgress={(event) => setValueSlider(event.currentTime)}
                            />
                        </View>
                    </View>
            }
            {
                    modalVisible ?
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: SmartScreenBase.smPercenHeight * 48,
                            width: SmartScreenBase.smPercenWidth*100,
                            height: SmartScreenBase.smPercenWidth * 20,
                        }}>
                            <FileSoundiconlog showImage={modalSuccess ? 'true' : 'false'}/>
                        </View>
                        : null
            } 
            {
                !modalVisible ?
                    <View style={{...styles.viewCheck, width: '100%', alignItems: 'center'}}>
                        <TouchableOpacity
                            disabled={answer === -1}
                            style={answer === -1 ? StyleApp.Sty_Button_disable : StyleApp.Sty_Button}
                            onPress={_checkQuestion}
                        >
                            <Text style={StyleApp.Sty_Text_Button}>KIỂM TRA</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{...styles.viewCheck, width: '100%', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={StyleApp.Sty_Button}
                        onPress={_nextQuestion}
                    >
                        <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default PronunciationF10;
