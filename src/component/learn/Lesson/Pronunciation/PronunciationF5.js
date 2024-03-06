import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Animated,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    Slider,
    Modal,
} from 'react-native';
import styles from './style';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Sound from 'react-native-sound';
import Header from './Header';
import API from '../../../../API/APIConstant';
import axios from 'axios';
import FileSound4 from '../FileSound4';
import LoadingScreen from './../../../../screens/LoadingScreen';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import StyleApp from '../../../../styleApp/stylesApp';
import EventBus from 'react-native-event-bus';
import { Colors } from 'react-native/Libraries/NewAppScreen';

let dataCount = [];
let vietnam = '';
let english = '';
const smartScreen = SmartScreenBase.smPercenHeight;
const smBaseWidth = SmartScreenBase.smPercenWidth;
let redo = 0;

const PronunciationF5 = (props) => {

    const {route, navigation, lesson_id, modeF, group_id, dataContent} = props;
    const [showBtn, setShowBtn] = useState(true);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [dataQuestion, setDataQuestion] = useState('');
    const [dataIndexQuestion, setDataIndexQuestion] = useState(0);
    const [translateQuestion, setTranslateQuestion] = useState(false);
    const [listText, setListText] = useState([]);
    const [checked, setChecked] = useState(false);
    const [redoView, setRedoView] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [disableTouch, setDisableTouch] = useState(false);
    const [logLearning, setLogLearning] = useState({
        'class_id': 1,
        'unit_id': 1,
        'curriculum_id': 1,
    });
    const [statusSound, setstatusSound] = useState('');
    const [dataLog, setDataLog] = useState({});
    const [dataAnswer, setDataAnswer] = useState([]);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [playBack, setPlayBack] = useState(0);
    const [sound, setSound] = useState(0);
    const [pause, setPause] = useState(false);
    const [disableBtnCheck, setDisableBtnCheck] = useState(true);
    const [sumRight, setSumRight] = useState(0);
    const player = useRef();

    useEffect(() => {
        _getDataQuestion();
        props.saveLogLearning([]);

        const _listener = (data) => {
            setPause(true);
        };
        EventBus.getInstance().addListener("sound_should_pause", _listener)
        return()=>{
            EventBus.getInstance().removeListener("sound_should_pause", _listener)
        }
    }, []);
    const _saveLogLearning = () => {
        props.saveLogLearning(dataAnswer);
    };

    const _getDataQuestion = async () => {
        if (dataContent) {
            setDataQuestion(dataContent.data_question);
        }
    };

    useEffect(() => {
        try{
        if (dataQuestion) {
            let dataText = [...listText];
            dataText = [];
            dataCount = [];
            dataQuestion.forEach(element => {
                let dataQ = [];
                vietnam = element.list_option[0].group_content_vi;
                english = element.list_option[0].group_content;
                let audioFile = element.list_option[0].content_question;
                audioFile = JSON.parse(audioFile);
                let contentQuestionAudio = audioFile ? audioFile.content_question_audio : '';
                dataQ['audio_file'] = contentQuestionAudio;
                dataQ['question'] = element.list_option[0].question_content;
                dataQ['option'] = [];
                let count = 0;
                element.list_option.forEach(e => {
                    if (count < 2) {
                        let data = {};
                        data['match_option_text'] = e.match_option_text[0];
                        data['selected'] = '';
                        data['score'] = e.score;
                        data['question_id'] = e.question_id;
                        dataQ['option'].push(data);
                        count++;
                    } else {
                        return false;
                    }
                });
                dataText.push(dataQ);
            });
            setListText(dataText);
            setIsLoading(false);
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    }, [dataIndexQuestion, dataQuestion]);

    const _setCheck = (index, question_id) => {
        let dataC = [...listText];
        let indexQ = 0;
        dataC.forEach((e, i) => {
            e['option'].forEach((element, j) => {
                if (j === index && element.question_id === question_id) {
                    indexQ = i;
                }
            });
        });
        dataC[indexQ]['option'].forEach((e, i) => {
            if (i !== index) {
                dataC[indexQ]['option'][i]['result'] = '';
            } else {
                dataC[indexQ]['option'][i]['result'] = 'selected';
            }
        });
        setListText(dataC);
        let c = dataCount.indexOf(indexQ);
        if (c === -1) {
            dataCount.push(indexQ);
        }
        if (dataCount.length >= dataC.length) {
            setDisableBtnCheck(false);
        }
    };

    const _renderQItem = ({item, index}) => {
        return (
            <View style={{...styles.viewStrChF5, paddingHorizontal: SmartScreenBase.smPercenWidth*2}}>
                <TouchableOpacity
                    disabled={disableTouch}
                    style={{
                        ...styles.buttonCk,
                        borderColor: item.result === '0' ? '#EE5555' : '#C7E519',
                        backgroundColor: item.result === 'selected' ? '#F9E815' : item.result === '1' ? '#C7E519' : item.result === '0' ? '#EE5555' : '#fff',
                        width: smBaseWidth * 40,
                        alignItems: 'center',
                    }}
                    onPress={() => _setCheck(index, item.question_id)}
                >
                    <Text>{item.match_option_text}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _playSound = async (index) => {
        await setPause(true);
        await setSound('');
        await setSound(listText[index]['audio_file']);
        await setPause(false);
    };

    const _renderItem = ({item, index}) => {
        return (
            <View style={{...styles.viewRenderItemF5}}>
                <View style={{
                    width: '18%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: 0,
                    top: SmartScreenBase.smPercenWidth*3,
                }}>
                    <TouchableOpacity
                        style={styles.iconAudioF5}
                        onPress={() => _playSound(index)}
                    >
                        <Image source={{uri: 'speaking1_03'}} style={styles.imageAudio} resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
                <View style={{width: '82%'}}>
                    <Text style={styles.textHeaderF5}>{item.question}</Text>
                </View>
                <View style={styles.viewStressF5}>
                    <FlatList
                        data={item['option']}
                        renderItem={_renderQItem}
                        keyExtractor={(item,index) => index.toString()}
                        scrollEnabled={false}
                        horizontal={true}
                        // style={{justifyContent: 'space-between'}}
                    />
                </View>
            </View>
        );
    };

    const _checkQuestion = () => {
        props.hideTypeExercise()
        var dataAns = [...dataAnswer];
        var datalistText = [...listText];
        var checkS = true;
        var count = 0
        listText.forEach((e, i) => {
            let data = {};
            data['exercise_type'] = 'pronunciation';
            data['question_type'] = dataQuestion[0].list_option[0].question_type;
            e['option'].forEach((element, j) => {
                if (element['result'] === 'selected') {
                    data['question_score'] = element['score'];
                    data['question_id'] = element.question_id;
                    data['final_user_choice'] = element.match_option_text;
                    let dataDetails = {};
                    dataDetails['num_turn'] = redo + 1;
                    dataDetails['score'] = element['score'];
                    dataDetails['user_choice'] = element.match_option_text;
                    data['detail_user_turn'] = [];
                    if (redo > 0) {
                        dataAns.forEach((el, index) => {
                            if (el.question_id === element.question_id) {
                                dataAns[index]['detail_user_turn'].push(dataDetails);
                                dataAns[index]['final_user_choice'] = element.match_option_text;
                                dataAns[index]['question_score'] = element['score'];
                            }
                        });
                    } else {
                        data['detail_user_turn'].push(dataDetails);
                    }
                    if (element['score'] === '1') {
                        datalistText[i]['option'][j]['result'] = '1';
                        count = count+1
                    } else {
                        datalistText[i]['option'][j]['result'] = '0';
                        checkS = false;
                    }
                }
            });
            if (redo === 0) {
                dataAns.push(data);
            }
        });
        setSumRight(count)
        if (modeF === 'exam' || modeF === 'mini_test') {
            props.setDataAnswer(dataAns);
            // _saveLogExam(dataAns);
        } else {
            if (redo > 0) {
                setRedoView(false);
            } else {
                setRedoView(true);
            }
            setDataAnswer(dataAns);
            setDisableTouch(true);
            setModalSuccess(checkS);
            setstatusSound(checkS);
            setChecked(true);
            setShowBtn(false);
            setPause(true)
        }
    };

    const _nextQuestion = () => {
        // setIsLoading(true);
        _saveLogLearning();
    };

    const _renderHeader = () => {
        return (
            <View style={{width: '100%', height: SmartScreenBase.smPercenHeight * 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'iCielSoupofJustice', color: "#ffffff", fontSize: SmartScreenBase.smFontSize*55}}>{"Bạn đã trả lời đúng "+sumRight+"/"+listText.length}</Text>
            </View>
        );
    }

    const _renderQuestion = () => {
        return (
            <View style={{...styles.viewListAnswerF5, marginBottom: checked ? smartScreen * 13 : smartScreen * 3}}>
                <FlatList
                    data={listText}
                    renderItem={_renderItem}
                    keyExtractor={(item,index) => index.toString()}
                    scrollEnabled={true}
                />
            </View>
        );
    };

    return (
        <View style={{flex: 1}}>
            {/*<Header index={dataIndexQuestion} total={1} goBack={() => props.goBack()} stopSound={() => _stopSound()}/>*/}
            {
                isLoading ?
                    <LoadingScreen/>
                    :
                    <View style={styles.containerLq}>
                        {checked && _renderHeader()}
                        {_renderQuestion()}
                        <Video
                            source={{uri: sound}}   // Can be a URL or a local file.
                            ref={player}
                            paused={pause}
                            audioOnly={true}
                        />
                        {
                            statusSound === true ?
                                <FileSound4 showImage={"true"} />
                                :
                                statusSound === false ?
                                    <FileSound4 showImage={"false"}/>
                                    :
                                    null
                        }
                    </View>
            }
            {
                showBtn ?
                    <View style={{...styles.viewCheckF4, width: '100%', alignItems: 'center', bottom: SmartScreenBase.smPercenHeight * 3}}>
                        <TouchableOpacity
                            disabled={disableBtnCheck}
                            style={disableBtnCheck ? StyleApp.Sty_Button_disable : StyleApp.Sty_Button}
                            onPress={_checkQuestion}
                        >
                            <Text style={StyleApp.Sty_Text_Button}>KIỂM TRA</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
            }
            {
                checked ?
                    modalSuccess || !redoView
                        ?
                        <View style={{...styles.viewCheckF4, width: '100%', alignItems: 'center', bottom: SmartScreenBase.smPercenHeight * 3}}>
                            <TouchableOpacity
                                style={StyleApp.Sty_Button}
                                onPress={_nextQuestion}
                            >
                                <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        redoView ?
                            <View style={{...styles.viewCheckF4, width: '100%', alignItems: 'center', bottom: SmartScreenBase.smPercenHeight * 3}}>
                                <TouchableOpacity
                                    style={StyleApp.Sty_Button}
                                    onPress={_nextQuestion}
                                >
                                    <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                            </View>
                            : null
                    : null
            }
        </View>
    );
};

export default PronunciationF5;
