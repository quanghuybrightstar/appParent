import React, {useState, useEffect, useRef} from 'react';
import {
    View, Text, ActivityIndicator,
    Keyboard, Animated,
    TouchableOpacity, Image, ScrollView, Modal, TextInput, Alert,
    Dimensions, BackHandler,
} from 'react-native';
import styles from './style';
import Slider from "@react-native-community/slider";
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Sound from 'react-native-sound';
import styleButton from '../../../../../src/styleApp/stylesApp';
import axios from 'axios';
// import {ScrollView} from 'react-native-gesture-handler';
import FileSoundiconlog from '../FileSoundiconlog';
import {useSelector} from 'react-redux';
import EventBus from 'react-native-event-bus';

let dataCount;
let count = 0;
let vietnam = '';
let english = '';
let timeOutValueSlider;
let redo = 0;
let totalScore = 0;
const {height, width} = Dimensions.get('window');
const smartScreen = SmartScreenBase.smPercenHeight;

const PronunciationD8 = (props) => {
    const {navigation, lesson_id, modeF} = props;
    const [showBtn, setShowBtn] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataQuestion, setDataQuestion] = useState('');
    const [dataIndexQuestion, setDataIndexQuestion] = useState(0);
    const [listText, setListText] = useState({});
    const [sound, setSound] = useState('');
    const [playSound, setPlaySound] = useState(false);
    const [answerSceen, setanswerSceen] = useState(true);
    const [duration, setDuration] = useState(0);
    const [valueSlider, setValueSlider] = useState(0);
    const [redoView, setRedoView] = useState(true);
    const [loading, setloading] = useState(true);
    const [answer, setAnswer] = useState([]);
    const [check, setCheck] = useState([]);
    const [questionType, setquestionType] = useState([]);
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    useEffect(() => {
        _getDataQuestion();
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        const _listener = (data) => {
            sound && sound.pause();
            setPlaySound(false);
        };
        EventBus.getInstance().addListener("sound_should_pause", _listener)

        return()=>{
            EventBus.getInstance().removeListener("sound_should_pause", _listener)
        }
    }, []);

    const _keyboardDidShow = () => {
        props.handleKeyboardShow(-SmartScreenBase.smPercenHeight * 20);
    };

    useEffect(() => {
        if (sound) {
            BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', backAction);
            };
        }
    }, [sound]);
    const backAction = () => {
        sound.stop();
        props.goBack();
    };
    const _keyboardDidHide = () => {
        props.handleKeyboardHide();
    };

    useEffect(() => {
        try{
        if (dataQuestion) {
            let dataText = {...listText};
            dataText = {};
            count = 0;
            dataCount = [];
            let soundF = dataQuestion[dataIndexQuestion].list_option[0].content_question ?? '';
            soundF = JSON.parse(soundF);
            if (soundF) {
                let contentQuestionAudio = soundF.content_question_audio ?? '';
                const sound = new Sound(contentQuestionAudio, '',
                    (error) => {
                        if (error) {
                            console.log(error);
                        } else {
                            sound.setNumberOfLoops(0);
                            setDuration(sound.getDuration());
                            setSound(sound);
                        }
                    },
                );
            }
            vietnam = dataQuestion[dataIndexQuestion].list_option[0].group_content_vi;
            english = dataQuestion[dataIndexQuestion].list_option[0].group_content;
            let match_option_text = dataQuestion[dataIndexQuestion].list_option[0].match_option_text[0];
            match_option_text = match_option_text.replace(' ', '');
            let result = match_option_text.split(',');
            let answerD = [...answer];
            answerD = [];
            result.forEach(item => {
                answerD.push('');
            });
            setAnswer(answerD);
            dataText['result'] = result;
            setListText(dataText);
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    }, [dataIndexQuestion, dataQuestion]);

    useEffect(() => {
        _playSound();
    }, [playSound]);

    useEffect(() => {
        _stopSound();
    }, [valueSlider]);

    const _stopSound = () => {
        if (valueSlider >= duration && sound || duration - valueSlider < 0.1 && sound) {
            setPlaySound(false);
            setValueSlider(0);
            sound.setCurrentTime(0);
            sound.stop();
            clearInterval(timeOutValueSlider);
        }
    };

    const _playSound = () => {
        if (sound) {
            if (playSound) {
                let timeInterval = 100;
                timeOutValueSlider = setInterval(() => {
                    setValueSlider(valueSlider => valueSlider + 0.1);
                }, timeInterval);
                sound.play(() => {
                    sound.setNumberOfLoops(0);
                    sound.stop();
                    // clearInterval(timeOutValueSlider);
                });
            } else {
                sound.pause();
                clearInterval(timeOutValueSlider);
            }
        } else {
            setPlaySound(false);
        }
    };


    const _getDataQuestion = async () => {
        let data = props.dataContent;
        // _postDataFirt(data);
        if (data.status) {
            if (data.data_question.length) {
                setDataQuestion(data.data_question);
                setquestionType(data.data_question[dataIndexQuestion].list_option[dataIndexQuestion].question_type);
            } else {
                Alert.alert('Thông báo', 'Không có data', [
                    {text: 'Đồng ý', style: 'cancel'},
                ]);
            }
        }
        setloading(false);
    };

    const _onChangeText = (text, index) => {
        let answerD = [...answer];
        answerD[index] = text;
        let c = 0;
        answerD.forEach((item) => {
            c += item ? 1 : 0;
        });
        if (c) {
            setShowBtn(true);
        } else {
            setShowBtn(false);
        }
        setAnswer(answerD);
    };

    const _checkQuestion = () => {
        let checkS = true;
        let lCheck = [...check];
        let datalCheck = [];
        setPlaySound(false);
        setValueSlider(0);
        sound.setCurrentTime(0);
        sound.stop();
        clearInterval(timeOutValueSlider);
        listText['result'].forEach((element, index) => {
            let checkRs = false;
            answer.forEach((item) => {
                console.log("=====ss:",element.toLowerCase().trim(),item.toLowerCase().trim())
                if (element.toLowerCase().trim() === item.toLowerCase().trim()) {
                    checkRs = true;
                    return false;
                }
            });
            if (checkRs) {
                lCheck[index] = '1';
                datalCheck.push(element.toLowerCase());
            } else {
                lCheck[index] = '0';
            }
        });
        totalScore = datalCheck.length / answer.length;
        console.log("=====totalScore:",datalCheck.length,answer.length,totalScore)
        if(totalScore == 1) {checkS = true}
        else {checkS = false}
        setCheck(lCheck);
        setModalSuccess(checkS);
        setModalVisible(true);
        setShowBtn(false);

    };

    const _renderError = () => {
        return (
            <FileSoundiconlog showImage={'false'}/>
        );
    };

    const _renderSuccess = () => {
        return (
            <FileSoundiconlog showImage={'true'}/>
        );
    };

    const _nextQuestion = () => {
        let index = dataIndexQuestion + 1;
        if (dataQuestion[index]) {
            setDataIndexQuestion(dataIndexQuestion => dataIndexQuestion + 1);
            setModalVisible(false);
            setStatus('');
            setDuration(0);
            setSound('');
            setPlaySound(false);
        } else {
            setModalVisible(false);
            dataBody();
        }
    };
    const _correctAnswer = () => {
        props.hideTypeExercise();
        if (modalSuccess) {
            let index = dataIndexQuestion + 1;
            if (dataQuestion[index]) {
                setDataIndexQuestion(dataIndexQuestion => dataIndexQuestion + 1);
                setModalVisible(false);
                setStatus('');
                setDuration(0);
                setSound('');
                setPlaySound(false);
            } else {
                setModalVisible(false);
                dataBody();
            }
        } else {
            setanswerSceen(false);
            setModalVisible(false);
        }
    };

    const dataBody = () => {
        let dataFake = [{
            question_id: dataQuestion[0].question_id,
            exercise_type: 'pronunciation',
            question_type: questionType,
            question_score: totalScore,
            final_user_choice: answer,
            detail_user_turn: [
                {
                    num_turn: '1',
                    score: totalScore,
                    user_choice: answer,
                },
            ],
        }];
        props.saveLogLearning(dataFake);
    };

    useEffect(()=>{
        props.saveLogLearning([]);
    },[])

    const _onValueChangeSlide = async (val) => {
        await setValueSlider(val);
        await sound.setCurrentTime(val);
        if (playSound) {
            sound.play();
        }
    };

    const _renderQuestion = () => {
        return (
            <View style={{marginTop: smartScreen * 2, marginBottom: smartScreen * 2}}>
                <ScrollView>
                    <View style={{
                        ...styles.viewRenderItemF8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                        {
                            listText['result'] == undefined ?
                                null :
                                listText['result'].map((item, index) => {
                                    return (
                                        <View style={{
                                            backgroundColor: check[index] === '1' ? '#C7E519' : check[index] === '0' ? '#EE5555' : '#fff',
                                            margin: smartScreen,
                                            borderWidth: 2,
                                            borderColor: '#fff',
                                            borderRadius: smartScreen * 6,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: smartScreen * 5,
                                            minWidth: width * 0.27,
                                        }}>
                                            {
                                                modalVisible ?
                                                    <Text
                                                        style={{
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                            zIndex: 10,
                                                            padding: 0,
                                                            width: '100%',
                                                        }}>
                                                        {answer[index]}
                                                    </Text>
                                                    :
                                                    <View style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                        {!answer[index] &&
                                                        <View style={{
                                                            position: 'absolute',
                                                            bottom: width * 0.01,
                                                            left: width * 0.03,
                                                            right: width * 0.03,
                                                            height: 1,
                                                            backgroundColor: '#000',
                                                        }}/>}

                                                        <TextInput
                                                            style={{
                                                                marginHorizontal: smartScreen * 2,
                                                                textAlign: 'center',
                                                                fontWeight: 'bold',
                                                                zIndex: 10,
                                                                padding: 0,
                                                                width: '100%',
                                                                height: '100%',
                                                            }}
                                                            onSubmitEditing={Keyboard.dismiss}
                                                            onChangeText={text => _onChangeText(text, index)}
                                                            value={answer[index] ?? ''}
                                                        />
                                                    </View>
                                            }
                                        </View>
                                    );
                                })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    };

    return (
        <View style={{flex: 1, zIndex: 11}}>
            <View>
                {
                    loading == false ?
                        answerSceen === true ?
                            <Animated.View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: smartScreen * 3,
                                    marginBottom: smartScreen * 3,
                                }}>
                                    <TouchableOpacity
                                        onPress={() => setPlaySound(!playSound)}
                                    >
                                        {
                                            !playSound ?
                                                <Image source={{uri: 'lesson_vocab_image18'}}
                                                       style={styles.imageSoundD8} resizeMode={'contain'}/>
                                                :
                                                <Image source={{uri: 'lesson_vocab_image19'}}
                                                       style={styles.imageSoundD8} resizeMode={'contain'}/>
                                        }
                                    </TouchableOpacity>
                                    <Slider
                                        style={{
                                            width: width - (smartScreen * 12),
                                            marginLeft: smartScreen / 2,
                                        }}
                                        minimumValue={0}
                                        maximumValue={duration}
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="#FFFFFF"
                                        thumbTintColor="#FFFFFF"
                                        value={valueSlider}
                                        onValueChange={val => _onValueChangeSlide(val)}
                                    />
                                </View>
                                <View style={{height: modalVisible ? SmartScreenBase.smPercenHeight * 32 : SmartScreenBase.smPercenHeight * 55}}>
                                    {_renderQuestion()}
                                </View>
                            </Animated.View>
                            :
                            <View>
                                {/*{Headerscreen()}*/}
                                <View style={{marginTop: smartScreen * 10}}>
                                    <Text style={{
                                        left: SmartScreenBase.smBaseWidth * 30,
                                        fontSize: 18,
                                        fontFamily: 'iCielSoupofJustice',
                                        color: '#fff',
                                    }}>
                                        Đáp án đúng là:
                                    </Text>
                                </View>
                                <View style={{
                                    marginTop: smartScreen * 4,
                                    marginBottom: smartScreen * 30,
                                }}>
                                    <ScrollView>
                                        <View style={{
                                            ...styles.viewRenderItemF8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                        }}>
                                            {
                                                listText['result'].map((item, index) => {
                                                    return (
                                                        <View style={{
                                                            backgroundColor: '#C7E519',
                                                            margin: smartScreen,
                                                            borderWidth: 2,
                                                            borderColor: '#fff',
                                                            borderRadius: smartScreen * 6,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: smartScreen * 5,
                                                            minWidth: width * 0.27,
                                                            flexDirection: 'row',
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    textAlign: 'center',
                                                                    fontWeight: 'bold',
                                                                    zIndex: 10,
                                                                    padding: 0,
                                                                }}>
                                                                {item}
                                                            </Text>
                                                        </View>
                                                    );
                                                })
                                            }
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        :
                        <ActivityIndicator size="large" color="#0000ff" marginTop='40%'/>
                }
                {
                    modalVisible ?
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: smartScreen * 42,
                            width: width,
                            height: smartScreen * 20,
                        }}>
                            <FileSoundiconlog showImage={modalSuccess ? 'true' : 'false'}/>
                        </View>
                        : null
                }                
            </View>
            <View style={{
                width: width,
                position: 'absolute',
                bottom: smartScreen * 3,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {
                    !answerSceen ?
                        <TouchableOpacity
                            style={styleButton.Sty_Button}
                            onPress={_nextQuestion}
                        >
                            <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                        </TouchableOpacity>
                        :
                       !modalVisible &&
                        <TouchableOpacity
                            disabled={showBtn ? false : true}
                            style={showBtn ? styleButton.Sty_Button : styleButton.Sty_Button_disable}
                            onPress={() => _checkQuestion()}
                        >
                            <Text style={styleButton.Sty_Text_Button}>KIỂM TRA</Text>
                        </TouchableOpacity>
                }
                {
                    modalVisible &&
                    <TouchableOpacity
                        style={styleButton.Sty_Button}
                        onPress={() => _correctAnswer()}
                    >
                        <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

export default PronunciationD8;
