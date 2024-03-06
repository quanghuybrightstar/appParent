import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Slider,
    Modal,
    Dimensions,
    Animated, Easing, Alert,
} from 'react-native';
// import styles from './stylePronunciation';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Sound from 'react-native-sound';
import Header from './Header';
import API from '../../../../API/APIConstant';
import axios from 'axios';
import LoadingScreen from './../../../../screens/LoadingScreen';
import StyleApp from './../../../../styleApp/stylesApp';

import {useDispatch, useSelector} from 'react-redux';

let timeOutValueSlider;
let vietnam = '';
let english = '', count = 0;
const smartFont = SmartScreenBase.smFontSize;
const {width, height} = Dimensions.get('window');
import Video from 'react-native-video';
import FileSound from '../FileSound';
import FontBase from '../../../../base/FontBase';
import EventBus from 'react-native-event-bus';
import SoundQuestion from '../../../SoundQuestion';

const smartScreen = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;

const PronunciationF2 = (props) => {

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
    const [textQuestion, setTextQuestion] = useState('');
    // const [translateQuestion, setTranslateQuestion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [optionExplain, setOptionExplain] = useState('');
    const AudioRef = useRef();

    // const [logLearning, setLogLearning] = useState({
    //     'class_id': 1,
    //     'unit_id': 1,
    //     'curriculum_id': 1,
    // });
    // const [dataLog, setDataLog] = useState({});
    const [dataAnswer, setDataAnswer] = useState([]);
    // const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [playBack, setPlayBack] = useState(0);
    const [pause, setPause] = useState(false);
    const player = useRef();

    useEffect(() => {
        if (valueSlider === duration && valueSlider !== 0 && duration !== 0) {
            setPlaySound(false);
        }
    }, [valueSlider]);

    useEffect(() => {
        _getDataQuestion();
    }, []);

    useEffect(() => {
        if (listQuestion) {
            vietnam = listQuestion[0].group_content_vi;
            english = listQuestion[0].group_content;
            let soundF = listQuestion[0].content_question ?? '';
            soundF = JSON.parse(soundF);
            if (soundF) {
                let contentQuestionAudio = soundF.content_question_audio ?? '';
                setSoundPlay(contentQuestionAudio);
            }
            // setIsLoading(false);
        }
    }, [listQuestion]);

    // useEffect(() => {
    //     if (playSound) {
    //         setPause(false);
    //     } else {
    //         setPause(true);
    //     }
    // }, [playSound]);

    useEffect(() => {
        if (dataQuestion) {
            if (dataQuestion[dataIndexQuestion]) {
                setListQuestion(dataQuestion[dataIndexQuestion].list_option);
            } else {
                alert('Không có dữ liệu');
                props.goBack();
            }
        }
    }, [dataIndexQuestion, dataQuestion]);

    useEffect(() => {
        try{
        if (listQuestion) {
            listQuestion.forEach(element => {
                if (element.score === '1') {
                    setTextQuestion(element.match_option_text[0]);
                    setOptionExplain(element.option_explain);
                }
            });
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    }, [listQuestion]);

    useEffect(()=>{
        props.saveLogLearning([]);
    },[])

    const _saveLogLearning = () => {
        console.log("======ketthuc 1",dataAnswer)
        props.saveLogLearning(dataAnswer);
    };

    const _getDataQuestion = async () => {
        if (dataContent) {
            console.log("======dataPro2",dataContent.data_question)
            setDataQuestion(dataContent.data_question);
        }
    };

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={[styles.buttonAnswerF2, answer === index ? styles.backgroundColorChoose : styles.backgroundColorNoChoose]}
                onPress={() => setAnswer(index)}
            >
                <Text style={{color: '#000', fontFamily: FontBase.MyriadPro_Bold, fontSize: smartFont * 45}}>{item.match_option_text[0]}</Text>
            </TouchableOpacity>
        );
    };

    const _checkQuestion = () => {
        AudioRef.current.stopAudio();
        setPlaySound(false);
        let dataAns = [...dataAnswer];
        let data = {};
        data['question_id'] = dataQuestion[dataIndexQuestion].question_id
        listQuestion[answer].question_id;
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
        setDataAnswer(dataAns);
        if (modeF === 'exam' || modeF === 'mini_test') {
            _nextQuestionExam();
            // _saveLogExam(dataAns);
            clearInterval(timeOutValueSlider);
            setAnswer(-1);
        } else {
            let score = listQuestion[answer].score ?? 0;
            if (score === '1') {
                setModalSuccess(true);
                setModalVisible(true);
                // _Playradiorigh();
                clearInterval(timeOutValueSlider);
                // setAnswer(-1);
            } else {
                setModalSuccess(false);
                setModalVisible(true);
                // _Playradiowrong();
                clearInterval(timeOutValueSlider);
                // setAnswer(-1);
            }
        }
    };

    const _renderError = () => {
        return (
            <View style={styles.centeredView}>
                <View style={{...styles.modalView, borderColor: '#EE5555'}}>
                    <View style={styles.closeModalF2}>
                        <Image source={{uri: 'grammar1_3'}} style={styles.imageCloseF2}/>
                    </View>
                    <View style={styles.viewContentModal}>
                        <View style={{width: '30%', height: SmartScreenBase.smBaseWidth * 250}}>
                            <FileSound showImage={'false'}/>
                        </View>
                        <View style={styles.viewTextModal}>
                            <Text style={{fontSize: smartFont * 60}}>
                                Đáp án đúng là
                            </Text>
                            <Text style={{fontSize: smartFont * 60}}>
                                {textQuestion} - {optionExplain}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const _renderSuccess = () => {
        return (
            <View style={styles.centeredView}>
                <View style={{...styles.modalView, borderColor: '#BBD54E'}}>
                    <View style={styles.closeModalF2}>
                        <Image source={{uri: 'grammar1_4'}} style={styles.imageCloseF2}/>
                    </View>
                    <View style={styles.viewContentModal}>

                        <View style={{width: '30%', height: SmartScreenBase.smBaseWidth * 250}}>
                            <FileSound showImage={'true'}/>
                        </View>
                        <View style={styles.viewTextModal}>
                            <Text style={{fontSize: smartFont * 60}}>
                                Đáp án đúng là
                            </Text>
                            <Text style={{fontSize: smartFont * 60}}>
                                {textQuestion} - {optionExplain}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const _nextQuestion = () => {
        setPlaySound(false);
        let index = dataIndexQuestion + 1;
        if (dataQuestion[index]) {
            props.setIndexQuestion(index);
            // setIsLoading(true);
            setDataIndexQuestion(dataIndexQuestion => dataIndexQuestion + 1);
            setModalVisible(false);
            setAnswer(-1);
        } else {
            console.log("======ketthuc")
            setModalVisible(false);
            _saveLogLearning();
            // navigation.navigate("Pronunciation");
            // alert('Đã hoàn thành');
        }
    };

    const _nextQuestionExam = () => {
        setanimatedValue(new Animated.Value(0));
        setPlaySound(false);
        let index = dataIndexQuestion + 1;
        if (dataQuestion[index]) {
            // setIsLoading(true);
            setDataIndexQuestion(dataIndexQuestion => dataIndexQuestion + 1);
            setModalVisible(false);
            setAnswer(-1);
        } else {
            props.setDataAnswer(dataAnswer);
        }
    };

    // const _onValueChange = (value) => {
    //     if (count === 0) {
    //         let playBack = pause ? 1 : 0;
    //         setPlayBack(playBack);
    //     }
    //     if (!pause) {
    //         setPause(true);
    //     }
    //     count++;
    // };

    // const _onSlidingComplete = (value) => {
    //     if (playBack) {
    //         setPause(true);
    //     } else {
    //         setPause(false);
    //     }
    //     player.current.seek(value);
    //     count = 0;
    // };

    const _play = () => {
        AudioRef.current.playAudio();
        setPlaySound(!playSound);
    };

    return (
        <View
            style={{flex: 1}}>
            {
                // isLoading ?
                //     <LoadingScreen/>
                //     :
                    <View style={{flex: 1}}>
                        <View style={styles.viewListAnswer}>
                            <View style={styles.playSound}>
                                <TouchableOpacity
                                    onPress={() => _play()}
                                >
                                    {
                                        !playSound ?
                                            <Image source={{uri: 'lesson_vocab_image18'}} style={styles.imageSound}
                                                   resizeMode={'contain'}/>
                                            :
                                            <Image source={{uri: 'lesson_vocab_image19'}} style={styles.imageSound}
                                                   resizeMode={'contain'}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.styleViewSlider}>
                                <SoundQuestion
                                playSound={() => setPlaySound(false)}
                                ref={AudioRef}
                                Audio={soundPlay}
                                cardFormat={'pro3'}/>
                            </View>
                            {/* <View style={styles.styleViewSlider}>
                                <Slider
                                    style={styles.styleSlider}
                                    minimumValue={0}
                                    maximumValue={duration}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#FFFFFF"
                                    thumbTintColor="#FFFFFF"
                                    value={valueSlider}
                                    onSlidingComplete={(value) => _onSlidingComplete(value)}
                                    onValueChange={(value) => _onValueChange(value)}
                                />
                            </View> */}
                            <FlatList
                                data={listQuestion}
                                renderItem={_renderItem}
                                keyExtractor={(index) => index.toString()}
                                scrollEnabled={false}
                            />
                        </View>
                        {/* <Video
                            source={{uri: soundPlay}}   // Can be a URL or a local file.
                            ref={player}
                            paused={pause}
                            audioOnly={true}
                            onEnd={() => setValueSlider(duration)}
                            onSeek={(event) => setValueSlider(event.currentTime)}
                            onLoad={(event) => setDuration(event.duration)}
                            onProgress={(event) => setValueSlider(event.currentTime)}
                        /> */}
                    </View>
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
                    null
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{flex: 1, backgroundColor: '#00000060'}}>
                    {
                        modalSuccess
                            ?
                            _renderSuccess()
                            :
                            _renderError()
                    }
                    <View style={{...styles.viewCheck, width: '100%', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={StyleApp.Sty_Button}
                            onPress={_nextQuestion}
                        >
                            <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerLq: {
        flex: 1,
        marginBottom: smartScreen * 10,
    },
    viewPronunciation: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonFormat: {
        width: '90%',
        height: '6%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        marginBottom: smartScreen * 1.5,
        borderRadius: smartScreen * 1.5 / 2,
    },
    viewListAnswerF5: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: smartScreen,
    },
    viewListAnswer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: smartScreen * 3,
    },
    viewListAnswerF9: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: smartScreen * 3,
    },
    buttonAnswer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: smartScreen * 1.5,
        borderRadius: smartScreen * 1.5 / 2,
        width: width - (smartScreen * 6),
        height: smartScreen * 6,
    },
    buttonAnswerF2: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: smartScreen * 1.5,
        borderRadius: smartScreen * 1.5,
        width: width - (smartScreen * 6),
        height: smartScreen * 7,
    },
    backgroundColorNoChoose: {
        backgroundColor: '#fff',
    },
    backgroundColorChoose: {
        backgroundColor: '#F9E815',
    },
    styleSlider: {
        width: width - (smartScreen * 6),
    },
    styleViewSlider: {
        marginBottom: SmartScreenBase.smPercenHeight * 2,
        marginTop: SmartScreenBase.smPercenHeight * 3,
    },
    viewCheck: {
        position: 'absolute',
        bottom: smartScreen * 3,
        paddingHorizontal: smartScreen * 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCheck: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00283A',
        marginBottom: smartScreen * 2,
        borderRadius: (width - (smartScreen * 6)) / 2,
        width: width - (smartScreen * 6),
        height: smartScreen * 6,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height / 2,
    },
    modalView: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        width: width - (smartScreen * 6),
        borderWidth: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    imageError: {
        width: smartScreen * 12,
        height: smartScreen * 12,
    },
    viewContentModal: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewTextModal: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeModal: {
        position: 'absolute',
        top: -(smartScreen * 8) / 2,
    },
    closeModalF2: {
        position: 'absolute',
        top: -smartScreen * 3,
    },
    imageClose: {
        width: smartScreen * 8,
        height: smartScreen * 8,
    },
    imageCloseF2: {
        width: smartScreen * 6,
        height: smartScreen * 6,
    },
    modalPopup: {
        backgroundColor: '#00000060',
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 1000,
    },
    imageSound: {
        width: smartScreen * 8,
        height: smartScreen * 8,
        marginTop: smartScreen * 7,
    },
    viewRenderItemF4: {
        width: width - smartScreen * 6,
        backgroundColor: '#eaf4f7',
        borderRadius: smartScreen * 2,
        marginBottom: smartScreen * 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        fontWeight: 'bold',
        fontSize: smartScreen * 2,
        color: '#000',
        padding: smartScreen * 3,
    },
    textHeaderF4: {
        fontWeight: 'bold',
        color: '#000',
        padding: smartScreen * 3,
    },
    iconAudioF5: {
        // position: 'absolute',
        // top: smartScreen * 1.5,
        // right: smartScreen * 1.5,
        backgroundColor: '#5293CA',
        borderRadius: smartScreen * 1000,
        // tintColor: '#5293CA'
    },
    iconAudio: {
        position: 'absolute',
        top: smartScreen * 1.5,
        right: smartScreen * 1.5,
        backgroundColor: '#5293CA',
        borderRadius: smartScreen * 3,
    },
    imageAudio: {
        width: smartScreen * 6,
        height: smartScreen * 6,

    },
    viewStress: {
        flexDirection: 'row',
        marginBottom: smartScreen,
        marginTop: smartScreen,
    },
    viewStrCh: {
        width: '33%',
        // paddingHorizontal: smartScreen,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonCkF4: {
        borderWidth: 2,
        borderRadius: smartScreen * 1.5,
        paddingLeft: smartScreen * 4.8,
        paddingRight: smartScreen * 4.8,
        paddingTop: smartScreen,
        paddingBottom: smartScreen,
        // justifyContent: 'center',
        // height: smartScreen * 5
    },
    buttonCk: {
        borderWidth: 2,
        borderRadius: smartScreen * 1.5,
        // paddingLeft: smartScreen * 5,
        // paddingRight: smartScreen * 5,
        // paddingTop: smartScreen * 1.5,
        // paddingBottom: smartScreen * 1.5,
        justifyContent: 'center',
        height: smartScreen * 5,
    },
    viewCheckF4: {
        position: 'absolute',
        bottom: smartScreen,
        paddingHorizontal: smartScreen * 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewCheckF9: {
        // bottom: smartScreen,
        // marginTop: smartScreen * 5,
        paddingHorizontal: smartScreen * 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewShowScore: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: smartScreen * 4,
        marginBottom: smartScreen * 10,
        paddingHorizontal: smartScreen / 2,
    },
    viewScore: {
        width: '33%',
        paddingHorizontal: smartScreen / 2,
        justifyContent: 'center',
    },
    viewSco: {
        backgroundColor: '#eaf3f6',
        height: smartScreen * 45,
        borderRadius: smartScreen * 2,
    },
    viewItemCheck: {
        borderWidth: 2,
        borderRadius: 100,
        paddingTop: smartScreen * 1.5,
        paddingBottom: smartScreen * 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: smartScreen * 0.3,
    },
    imageModal: {
        width: width,
        height: smartScreen * 20,
    },
    centeredViewCheck: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: smartScreen * 7,
        left: -smartScreen,
    },
    centeredViewCheckF4: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: smartScreen * 10,
        left: -smartScreen,
        width: width,
        height: smartScreen * 20,
        backgroundColor: 'red',
    },
    textIsScore: {
        fontWeight: 'bold',
        fontSize: smartScreen * 2,
        paddingTop: smartScreen * 3,
        padding: smartScreen,
        color: '#fff',
    },
    viewBtnRd: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRedo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00283A',
        marginBottom: smartScreen * 4,
        borderRadius: (width - (smartScreen * 6)) / 2,
        height: smartScreen * 6,
        width: smartScreen * 20,
    },
    viewCheckRd: {
        position: 'absolute',
        bottom: smartScreen,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewCheckF9: {
        // position: 'absolute',
        bottom: smartScreen,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewStrChF5: {
        // paddingHorizontal: smartScreen,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewStressF5: {
        // flexDirection: 'row',
        marginBottom: smartScreen * 1.5,
        marginTop: smartScreen,
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    textHeaderF5: {
        fontWeight: 'bold',
        fontSize: smartScreen * 2,
        color: '#000',
        padding: smartScreen * 2,
    },
    viewRenderItemF5: {
        width: width - smartScreen * 3,
        backgroundColor: '#eaf4f7',
        borderRadius: smartScreen * 2,
        marginBottom: smartScreen * 3,
    },
    viewRenderF9: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    viewRenderItemF9: {
        width: width - smartScreen * 6,
        backgroundColor: '#eaf4f7',
        borderRadius: smartScreen * 2,
        marginBottom: smartScreen * 5,
        paddingTop: smartScreen * 3,
        paddingBottom: smartScreen * 6,
        padding: smartScreen,
        borderWidth: 2,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewInputF9: {
        width: smartScreen * 15,
        height: smartScreen * 7,
        borderRadius: smartScreen * 4,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textInput: {
        width: smartScreen * 10,
        // height: smartScreen/2,
        textAlign: 'center',
        fontWeight: 'bold',
        zIndex: 10,
        padding: 0,
    },
    positionImageF9: {
        position: 'absolute',
        top: -smartScreen * 3,
        left: smartScreen * 2,
        zIndex: 1000,
    },
    styImgF9: {
        width: smartScreen * 6,
        height: smartScreen * 6,
    },
    centeredViewCheckF9: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: smartScreen * 15,
        left: -smartScreen,
    },
    viewListAnswerF9: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: smartScreen * 3,
        marginTop: smartScreen * 6,
        marginBottom: smartScreen * 3,
    },
    imageSoundF9: {
        width: smartScreen * 6,
        height: smartScreen * 6,
    },
    styleSliderF9: {
        width: width - (smartScreen * 13),
        marginLeft: smartScreen / 2,
    },
    questionContent: {
        flexDirection: 'row',
        color: '#fff',
        marginBottom: smartScreen * 3,
    },
    textListNumber: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: smartScreen * 3,
    },
    textListNumber2: {
        fontSize: smartScreen * 2.5,
    },
    backgroundColorNoChooseF10: {
        backgroundColor: '#fff',
        borderColor: '#BBD54E',
        borderWidth: 2,
    },
    backgroundColorChooseF10: {
        backgroundColor: '#F9E815',
        borderColor: '#fff',
        borderWidth: 2,
    },
    buttonAnswerF10: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: smartScreen * 1.5,
        borderRadius: smartScreen * 1.5,
        width: width - (smartScreen * 6),
        height: smartScreen * 6,
    },
    checkNoF10: {
        backgroundColor: '#EE5555',
        borderColor: '#fff',
        borderWidth: 2,
    },
    checkF10: {
        backgroundColor: '#BBD54E',
        borderColor: '#fff',
        borderWidth: 2,
    },
    centeredViewCheckF10: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: smartScreen * 11,
        left: -smartScreen,
    },
    viewListAnswerF10: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: smartScreen * 4,
    },
    styleViewSliderF10: {
        marginBottom: SmartScreenBase.smPercenHeight,
        marginTop: SmartScreenBase.smPercenHeight * 2,
    },
    playSoundF10: {
        marginTop: -smartScreen * 3,
    },
    styleSliderF10: {
        ...Platform.select({
            ios: {
                width: smartScreenWidth * 87,
            },
            default: {
                width: smartScreenWidth * 95,
            },
        }),
    },
    textHeaderF11: {
        fontWeight: 'bold',
        fontSize: smartScreen * 4,
        color: '#fff',
        // padding: smartScreen * 2,
    },
    viewListAnswerF11: {
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: smartScreen * 5,
    },
    viewHeaderF11: {
        margin: 0,
        // backgroundColor: '#000'
    },
    viewStressF11: {
        // flexDirection: 'row',
        marginBottom: smartScreen * 1.5,
        // marginTop: smartScreen/2,
    },
    viewStrChF11: {
        // paddingHorizontal: smartScreen * 1,
        // justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: smartScreen,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCkF11: {
        borderWidth: 2,
        borderRadius: smartScreen * 2,
        paddingLeft: smartScreen * 4,
        paddingRight: smartScreen * 4,
        paddingTop: smartScreen * 1.5,
        paddingBottom: smartScreen * 1.5,
        width: '90%',
        height: smartScreen * 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCheckF11: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00283A',
        marginBottom: smartScreen * 2,
        borderRadius: (width - (smartScreen * 6)) / 2,
        width: '32%',
        height: smartScreen * 6,
    },
    viewCheckF11: {
        position: 'absolute',
        bottom: smartScreen,
        paddingHorizontal: smartScreen * 3,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnNb: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00283A',
        marginBottom: smartScreen * 2,
        borderRadius: (width - (smartScreen * 6)) / 2,
        width: '32%',
        height: smartScreen * 6,
    },
    explainF11: {
        marginBottom: smartScreen * 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textExplainF11: {
        color: '#fff',
        fontSize: smartScreen * 3,
    },
    centeredViewF11: {
        flex: 1,
        paddingHorizontal: smartScreen * 2,
        marginTop: smartScreen * 3,
    },
    modalViewF11: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: smartScreen * 3,
        width: width - (smartScreen * 6),
        borderWidth: 5,
        paddingHorizontal: smartScreen * 3,
    },
    closeMoF11: {
        justifyContent: 'center',
        alignItems: 'center',
        // width: width - (smartScreen * 6),
    },
    closeModalF11: {
        position: 'absolute',
        top: -(smartScreen * 8) / 2,
    },
    viewContentModalF11: {
        marginTop: smartScreen * 4,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: smartScreen,
        alignItems: 'center',
    },
    imgExplainF11: {
        width: smartScreen * 5,
        height: smartScreen * 5,
    },
    viewDetailsExplainF11: {
        marginTop: smartScreen * 3,
        marginBottom: smartScreen * 3,
    },
    btnNbExplain: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00283A',
        marginBottom: smartScreen * 2,
        borderRadius: (width - (smartScreen * 6)) / 2,
        width: '48%',
        height: smartScreen * 6,
    },
    viewRenderItemF6: {
        width: width - smartScreen * 16,
        backgroundColor: '#eaf4f7',
        borderRadius: smartScreen * 2,
        marginBottom: smartScreen * 3,
        height: smartScreen * 15,
        borderWidth: 2,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    iconAudioF6: {
        position: 'absolute',
        top: smartScreen * 4,
        right: smartScreen * 1.5,
        backgroundColor: '#5293CA',
        borderRadius: smartScreen * 3,
    },
    viewLaF6: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -smartScreen * 5,
    },
    txtRdF6: {
        fontWeight: 'bold',
        fontSize: smartScreen * 3,
    },
    closeModalF6: {
        position: 'absolute',
        top: smartScreen * 5,
        left: smartScreen * 5,
        zIndex: 100,
    },
    imageCloseF6: {
        width: smartScreen * 6,
        height: smartScreen * 6,
    },
    viewListAnswerF6: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewLa2F6: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -smartScreen * 5,
    },
    containerLqF11: {
        flex: 1,
        marginBottom: smartScreen * 15,
    },
    viewRenderItemF8: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: smartScreen * 1.5,
    },
    buttonCheckF11C: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00283A',
        marginBottom: smartScreen * 2,
        borderRadius: (width - (smartScreen * 6)) / 2,
        width: '90%',
        height: smartScreen * 6,
    },
    btnNbF11: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00283A',
        marginBottom: smartScreen * 2,
        borderRadius: (width - (smartScreen * 6)) / 2,
        width: '48%',
        height: smartScreen * 6,
    },
});

export default PronunciationF2;
