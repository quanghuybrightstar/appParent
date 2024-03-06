import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import styles from './style';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import FileSoundiconlog from '../FileSoundiconlog';
import LoadingScreen from './../../../../screens/LoadingScreen';
import StyleApp from '../../../../styleApp/stylesApp';
import LogBase from '../../../../base/LogBase';
import SoundQuestion from '../../../SoundQuestion/sound2'

const {width, height} = Dimensions.get('window');
let dataCount = [];
let count = 0, countAudio;
let vietnam = '';
let english = '';
let timeOutValueSlider;
let redo = 0;
let rightanswer;

const smartScreen = SmartScreenBase.smPercenHeight;

const PronunciationF9 = (props) => {

    const {route, navigation, lesson_id, modeF, group_id, dataContent} = props;
    const [showBtn, setShowBtn] = useState(true);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataQuestion, setDataQuestion] = useState('');
    const [dataIndexQuestion, setDataIndexQuestion] = useState(0);
    const [listText, setListText] = useState({});
    const [sound, setSound] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [dataAnswer, setDataAnswer] = useState([]);
    const [matchOptionText, setMatchOptionText] = useState('');
    const [animatedValue, setanimatedValue] = useState(new Animated.Value(0));
    const [disableBtn, setDisableBtn] = useState(true);
    const audioPlayer = useRef();

    useEffect(() => {
        _getDataQuestion();
        props.saveLogLearning([]);
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
            let dataText = {...listText};
            count = 0;
            dataCount = [];
            let result = _trimQuestion(dataQuestion[dataIndexQuestion].list_option[0].question_content);
            let soundF = dataQuestion[dataIndexQuestion].list_option[0].content_question ?? '';
            soundF = JSON.parse(soundF);
            if (soundF) {
                let contentQuestionAudio = soundF.content_question_audio ?? '';
                setSound(contentQuestionAudio);
            }
            vietnam = dataQuestion[dataIndexQuestion].list_option[0].group_content_vi;
            english = dataQuestion[dataIndexQuestion].list_option[0].group_content;
            dataText = result;
            setMatchOptionText(dataQuestion[dataIndexQuestion].list_option[0].match_option_text[0]);
            setListText(dataText);
            setIsLoading(false);
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    }, [dataIndexQuestion, dataQuestion]);

    const _onChangeText = (text, index) => {
        let listT = {...listText};
        listT['data'][index]['value'] = text;
        setListText(listT);
        let indexOf = dataCount.indexOf(index);
        if (text) {
            if (indexOf === -1) {
                dataCount.push(index);
            }
        } else {
            if (indexOf !== -1) {
                dataCount.splice(indexOf, 1);
            }
        }
        if (dataCount.length === count) {
            setDisableBtn(false);
        } else {
            setDisableBtn(true);
        }
    };

    const animate = () => {
        Animated.timing(
            animatedValue,
            {
                toValue: 1,
                duration: 2000,
            },
        ).start();
    };

    const spin = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [SmartScreenBase.smBaseWidth * 700, SmartScreenBase.smBaseWidth * 750, SmartScreenBase.smBaseWidth * 700],
    });

    const _checkQuestion = () => {
        animate();
        audioPlayer.current && audioPlayer.current._endAudio()
        let checkS = true;
        let listT = {...listText};
        let dataAns = [...dataAnswer];
        let data = {};
        data['question_id'] = dataQuestion[dataIndexQuestion].question_id;
        data['exercise_type'] = 'pronunciation';
        data['question_type'] = dataQuestion[dataIndexQuestion].list_option[0].question_type;
        listT['data'].forEach((element, index) => {
            data['final_user_choice'] = element.value;
            let dataDetails = {};
            dataDetails['num_turn'] = redo + 1;
            dataDetails['user_choice'] = element.value;
            if (element.value.toLowerCase().trim() === element.result.toLowerCase().trim()) {
                listT['data'][index]['status'] = '1';
                data['question_score'] = dataQuestion[dataIndexQuestion].list_option[0].score;
                dataDetails['score'] = dataQuestion[dataIndexQuestion].list_option[0].score;
            } else {
                data['question_score'] = 0;
                dataDetails['score'] = 0;
                listT['data'][index]['status'] = '0';
                checkS = false;
            }
            data['detail_user_turn'] = [];
            data['detail_user_turn'].push(dataDetails);
        });
        dataAns.push(data);
        if (modeF === 'exam' || modeF === 'mini_test') {
            props.setDataAnswer(dataAns);
        } else {
            if (checkS) {
                setStatus('1');
                // _Playradiorigh();
            } else {
                setStatus('0');

                // _Playradiowrong();
            }
            setDataAnswer(dataAns);
            setListText(listT);
            setModalSuccess(checkS);
            setModalVisible(true);
            setShowBtn(false);
        }
    };

    const _nextQuestion = () => {
        if (rightanswer) {
            rightanswer.stop();
        }
        // setIsLoading(true);
        setanimatedValue(new Animated.Value(0));
        let index = dataIndexQuestion + 1;
        if (dataQuestion[index]) {
            props.setIndexQuestion(index);
            setDisableBtn(true);
			setShowBtn(true);
            setModalVisible(false);
            setStatus('');
            clearInterval(timeOutValueSlider);
            setDataIndexQuestion(dataIndexQuestion => dataIndexQuestion + 1);
        } else {
            setModalVisible(false);
            _saveLogLearning();
        }
    };

    const _trimQuestion = (str) => {
        let searchStr = '}';
        let searchStrLen = '}'.length;
        let startIndex = 0, index;
        let indices = {};
        indices['data'] = [];
        indices['text_last'] = '';
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            let str1 = str.slice(startIndex, index + 1).match(/\{([^}]+)\}/)[1];
            let data = {};
            data['text'] = str.slice(startIndex, index - str1.length - 1);
            data['result'] = str1;
            indices['data'].push(data);
            startIndex = index + searchStrLen;
            count++;
        }
        indices['text_last'] = str.slice(startIndex, str.length);
        return indices;
    };


    const _renderQuestion = () => {
        let textLast = '';
        if (listText['text_last']) {
            textLast = listText['text_last'].split(' ');
        }
        return (
            <View style={{...styles.viewListAnswer, marginTop: smartScreen * 4, marginBottom: smartScreen * 10}}>
                <View style={styles.positionImageF9}>
                    {
                        status === '1' ?
                            <Image source={{uri: 'grammar1_4'}} style={styles.styImgF9} resizeMode={'contain'}/>
                            : status === '0' ?
                            <Image source={{uri: 'grammar1_3'}} style={styles.styImgF9} resizeMode={'contain'}/>
                            : null
                    }
                </View>
                <View style={{
                    ...styles.viewRenderItemF9,
                    borderColor: status === '1' ? '#C7E519' : status === '0' ? '#EE5555' : '#eaf4f7',
                }}>
                    {
                        listText['data'] ?
                            listText['data'].map((item, index) => {
                                return (
                                    <View style={{...styles.viewRenderF9}}>
                                        <Text style={{fontWeight: 'bold', fontSize: SmartScreenBase.smFontSize * 45}}>{item.text.replace(/\n/g, '')}</Text>
                                        <View style={{
                                            ...styles.viewInputF9,
                                            borderColor: item.status === '1' ? '#C7E519' : item.status === '0' ? '#EE5555' : '#b4b4b4',
                                        }}>
                                            {
                                                item.status ?
                                                    <View style={{
                                                        textAlign: 'center',
                                                        fontWeight: 'bold',
                                                        zIndex: 10,
                                                        padding: 0,
                                                        paddingHorizontal: SmartScreenBase.smPercenWidth,
                                                        borderBottomWidth: item.value ? 0 : 1,
                                                        color: item.status === '1' ? '#C7E519' : item.status === '0' ? '#EE5555' : '#000',
                                                        // paddingBottom: Platform.OS === 'android' && !item.status && -smartScreen/3,
                                                    }}>
                                                        <Text style={{
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                            color: item.status === '1' ? '#C7E519' : item.status === '0' ? '#EE5555' : '#000',
                                                            fontSize: SmartScreenBase.smFontSize * 45
                                                        }}>{item.value ? item.value.replace(/\n/g, '') : ''}</Text>
                                                    </View>
                                                    :
                                                    <TextInput
                                                        style={{
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                            zIndex: 10,
                                                            padding: 0,
                                                            borderBottomWidth: item.value ? 0 : 1,
                                                            color: item.status === '1' ? '#C7E519' : item.status === '0' ? '#EE5555' : '#000',
                                                            fontSize: SmartScreenBase.smFontSize * 45,
                                                            minWidth: SmartScreenBase.smPercenWidth * 20,
                                                            maxWidth: SmartScreenBase.smPercenWidth * 80,
                                                            marginHorizontal: SmartScreenBase.smPercenWidth*2
                                                            // paddingBottom: Platform.OS === 'android' && !item.status && -smartScreen/3,
                                                        }}
                                                        // multiline={true}
                                                        autoCapitalize='none'
                                                        onChangeText={text => _onChangeText(text, index)}
                                                        value={item.value ?? ''}
                                                    />
                                            }
                                        </View>
                                        {
                                            index === listText['data'].length - 1
                                                ?
                                                textLast ?
                                                    textLast.map((data) => {
                                                        return (
                                                            <Text style={{
                                                                fontWeight: 'bold',
                                                                paddingBottom: smartScreen,
                                                                fontSize: SmartScreenBase.smFontSize * 45
                                                            }}>{' ' + data.replace(/\n/g, '')}</Text>
                                                        );
                                                    })
                                                    : null
                                                :
                                                null
                                        }
                                    </View>
                                );
                            })
                            : null
                    }
                    <View style={{
                        position: 'absolute',
                        bottom: SmartScreenBase.smPercenHeight * 2,
                        left: SmartScreenBase.smPercenWidth * 5,
                    }}>
                        {
                            status === '0'
                                ?
                                <View style={{
                                    flexDirection: 'row',
                                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                                    alignItems: 'flex-end',
                                }}>
                                    <Image source={{uri: 'lesson_grammar_image3'}}
                                           style={{...StyleLesson.Image_Explain, marginBottom: 2}}
                                    />
                                    <Text style={[stylesApp.txt, {
                                        fontWeight: 'bold',
                                        color: 'rgba(198,229,14,0.95)',
                                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                                        fontSize: SmartScreenBase.smFontSize * 50,
                                    }]}>
                                        {matchOptionText} </Text>
                                </View>
                                :
                                null
                        }
                    </View>
                </View>
            </View>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{flex: 1}}>
                {/*<Header index={dataIndexQuestion} total={dataQuestion.length} goBack={() => props.goBack()} stopSound={() => setPause(true)} />*/}
                {
                    isLoading ?
                        <LoadingScreen/>
                        :
                        <View style={styles.containerLq}>
                            <View style={styles.viewListAnswerF9}>
                                <SoundQuestion Audio={sound} ref={audioPlayer}/>
                            </View>
                            <View style={{height: smartScreen * 45}}>
                                {_renderQuestion()}
                            </View>
                            {
                                modalVisible ?
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    bottom: smartScreen * 5,
                                    width: width,
                                    height: smartScreen * 20,
                                }}>
                                    <FileSoundiconlog showImage={modalSuccess ? 'true' : 'false'}/>
                                </View>
                                : null
                            }
                            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: smartScreen * 3}}>
                                {
                                    showBtn ?
                                        <View style={{
                                            paddingHorizontal: smartScreen * 3,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity
                                                disabled={disableBtn}
                                                style={disableBtn ? StyleApp.Sty_Button_disable : StyleApp.Sty_Button}
                                                onPress={() => _checkQuestion()}
                                            >
                                                <Text style={StyleApp.Sty_Text_Button}>KIỂM TRA</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={{
                                            paddingHorizontal: smartScreen * 3,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity
                                                disabled={disableBtn}
                                                style={StyleApp.Sty_Button}
                                                onPress={() => _nextQuestion()}
                                            >
                                                <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                            </TouchableOpacity>
                                        </View>
                                }
                            </View>
                        </View>
                }
            </View>
        </TouchableWithoutFeedback>
    );
};

export default PronunciationF9;
