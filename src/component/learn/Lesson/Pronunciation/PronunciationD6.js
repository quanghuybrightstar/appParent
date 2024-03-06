import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ImageBackground,
    TouchableOpacity,
    Image,
    FlatList,
    Slider,
    Alert, Dimensions,
} from 'react-native';
import styles from './style';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Sound from 'react-native-sound';
import axios from "axios";
import styleButton from '../../../../../src/styleApp/stylesApp';
import {useSelector} from "react-redux";
import  FileSound4 from '../FileSound4';
import LogBase from '../../../../base/LogBase';
import EventBus from 'react-native-event-bus';
import { TextBox } from '../../../../componentBase/TextBox';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';

const {width, height} = Dimensions.get('window');
let dataCount = [];
let vietnam = '';
let english = '';
const smartScreen = SmartScreenBase.smPercenHeight;
let dataIndexQuestion = 0;
let data = '';
let dataChoice = [];
let dataAnswer = [], numberTurn = 1;
const PronunciationD6 = (props) => {
    const {navigation, lesson_id, modeF} = props;
    const [showBtn, setShowBtn] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [dataQuestion, setDataQuestion] = useState('');
    const [listText, setListText] = useState([]);
    const [checked, setChecked] = useState(false);
    const [loading, setloading] = useState(true);
    const [sumRight, setSumRight] = useState(0);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    useEffect(() => {
        _getDataQuestion();

        const _listener = (data) => {
            listText.forEach(element => {
                if (element['audio']) {
                    element['audio_file'].stop();
                }
            });
        };
        EventBus.getInstance().addListener("sound_should_pause", _listener)

        return()=>{
            EventBus.getInstance().removeListener("sound_should_pause", _listener)
        }
    }, [])

    const backAction = () => {
        listText.forEach(element => {
            if (element['audio']) {
                element['audio_file'].stop();
            }
        });
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
                let contentQuestionAudio = audioFile.content_question_audio ?? '';
                const sound = new Sound(encodeURI(contentQuestionAudio), "",
                    (error) => {
                        if (error) {
                            console.log('error', error)
                            dataQ['audio'] = false;
                        } else {
                            sound.setNumberOfLoops(0);
                            dataQ['audio_file'] = sound;
                            dataQ['audio'] = true;
                        }
                    },
                );
                dataQ['question'] = element.list_option[0].question_content;
                let explain = element.list_option[0].explain_parse
                // explain = JSON.parse(explain);
                dataQ['explain'] = explain.content_question_text ?? '';
                dataQ['option'] = [];
                element.list_option.forEach(e => {
                    let data = {};
                    data['match_option_text'] = e.match_option_text[0];
                    data['selected'] = '';
                    data['score'] = e.score;
                    if (e.score === '1') {
                        let q_c = e.question_content.split('.')
                        dataQ['match_option_text'] = q_c[1] ? q_c[1] : q_c[0];
                    }
                    data['question_id'] = e.question_id;
                    dataQ['option'].push(data);
                });
                dataText.push(dataQ);
            });
            setListText(dataText);
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    }, [dataQuestion]);

    const _getDataQuestion = async () => {
        data = props.dataContent;
        // _postDataFirt(data);
        if (data.status) {
            setDataQuestion(data.data_question);
        }
        setloading(false);
    };

    const _setCheck = (index, i) => {
        let dataC = [...listText];
        dataC[index]['option'].forEach((e, j) => {
            if (i !== j) {
                dataC[index]['option'][j]['result'] = '';
            } else {
                dataC[index]['option'][j]['result'] = 'selected';
            }
        });
        setListText(dataC);
        let c = dataCount.indexOf(index);
        if (c === -1) {
            dataCount.push(index);
        }
        if (dataCount.length >= dataC.length) {
            setShowBtn(true);
        }
    };

    const _playSound = (index) => {
        listText.forEach(element => {
            if (element['audio']) {
                element['audio_file'].stop();
            }
        });
        if (listText[index]['audio']) {
            listText[index]['audio_file'].play();
        }
    };

    useEffect(()=>{
        props.saveLogLearning([]);
    },[])

    const dataBody = () => {
        props.saveLogLearning(dataAnswer);
        console.log("=====WHat")
    };

    const _renderItem = ({item, index}) => {
        return (
            <View style={{flex: 1}}>
                <View style={styles.closeModalF6}>
                    {
                        item['check'] === '1' ?
                            <Image source={{uri: 'grammar1_4'}} style={styles.imageCloseF6} resizeMode='contain'/>
                            : item['check'] === '0' ?
                            <Image source={{uri: 'grammar1_3'}} style={styles.imageCloseF6} resizeMode='contain'/>
                            : null
                    }
                </View>
                <View style={{paddingHorizontal: smartScreen * 5,}}>
                    <View style={{
                        ...styles.viewRenderItemF6,
                        borderColor: item['check'] === '1' ? '#C7E519' : item['check'] === '0' ? '#EE5555' : '#eaf4f7'
                    }}>
                        <TouchableOpacity
                            style={{...styles.iconAudioF6, zIndex: 100}}
                            onPress={() => _playSound(index)}
                        >
                            <Image source={{uri: 'speaking1_03'}} style={styles.imageAudio} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        {
                            checked ?
                                <View style={styles.viewLa2F6}>
                                    <Text style={styles.txtRdF6}>{item.match_option_text}</Text>
                                    <Text>{item.explain}</Text>
                                </View>
                                :
                                <View style={styles.viewLaF6}>
                                    {
                                        item['option'].map((element, i) => {
                                            if (i === 0) {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => _setCheck(index, i)}
                                                    >
                                                        <Text style={{
                                                            ...styles.txtRdF6,
                                                            color: element['result'] === 'selected' ? '#b228a5' : '#000'
                                                        }}>
                                                            {element.match_option_text}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            } else {
                                                return (
                                                    <View style={{flexDirection: 'row'}}>
                                                        <Text style={styles.txtRdF6}> • </Text>
                                                        <TouchableOpacity
                                                            onPress={() => _setCheck(index, i)}
                                                        >
                                                            <Text style={{
                                                                ...styles.txtRdF6,
                                                                color: element['result'] === 'selected' ? '#b228a5' : '#000'
                                                            }}>
                                                                {element.match_option_text}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            }
                                        })
                                    }
                                </View>
                        }
                    </View>
                </View>
            </View>
        );
    };

    const _checkQuestion = () => {
        props.hideTypeExercise()
        let datalistText = [...listText];
        let checkS = true;
        let datatrue = [];
        var scoreList = []
        let dataDetails = {};
        dataDetails['num_turn'] = numberTurn;
        dataDetails['user_choice'] = [];
        let count = 0, choose = [];
        listText.forEach((e, i) => {
            e['option'].forEach((element, j) => {
                if (element['result'] === 'selected') {
                    choose.push(element.match_option_text);
                    dataChoice.push(element.match_option_text);
                    if (element['score'] === '1') {
                        count++;
                        datalistText[i]['check'] = '1';
                        if (datalistText[i]['check'] = '1') {
                            datatrue.push(element.match_option_text);
                        }
                        scoreList.push(1)
                    } else {
                        datalistText[i]['check'] = '0';
                        checkS = false;
                        scoreList.push(0)
                    }
                }
            });
        });

        setSumRight(count)
        var dataSaveList = []
        dataQuestion.forEach((ele, index) => {
            var mono = {
                question_id: ele.question_id,
                exercise_type: 'pronunciation',
                question_type: dataQuestion[0].list_option[0].question_type,
                question_score: 0,
                final_user_choice: [],
                detail_user_turn: [
                    {
                        num_turn: '1',
                        score: scoreList[index],
                        user_choice: dataChoice[index],
                    },
                ],
            }
            dataSaveList.push(mono)
        });
        LogBase.log("=====dataBody",dataSaveList)
        dataAnswer = dataSaveList;

        setModalSuccess(checkS);
        setChecked(true);
        setShowBtn(false);
        listText.forEach(element => {
            if (element['audio']) {
                element['audio_file'].stop();
            }
        });
    };

    const _nextQuestion = () => {
        console.log("=====Loda")
        dataBody();
        console.log("=====Loda 2")
    }

    const _redoQuestion = () => {
        numberTurn++;
        let datalistText = [...listText];
        datalistText.forEach((e, i) => {
            datalistText[i]['check'] = '';
            e['option'].forEach((element, j) => {
                    datalistText[i]['option'][j]['result'] = '';
            });
        });
        dataCount = [];
        setShowBtn(false);
        setChecked(false);
    }

    const _renderHeader = () => {
        return (
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center',marginTop: SmartScreenBase.smPercenHeight * 3 ,marginBottom: SmartScreenBase.smPercenHeight * 3}}>
                <Text style={{fontFamily: 'iCielSoupofJustice', color: Colors.White, fontSize: SmartScreenBase.smFontSize*55}}>{"Bạn đã trả lời đúng "+sumRight+"/"+listText.length}</Text>
            </View>
        );
    }

    const _renderQuestion = () => {
        return (
            <View style={{...styles.viewListAnswerF6, marginBottom: SmartScreenBase.smPercenHeight * 3,}}>
                <FlatList
                    data={listText}
                    renderItem={_renderItem}
                    keyExtractor={(index) => index.toString()}
                    scrollEnabled={true}
                />
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <View
                imageStyle={stylesApp.ImageBackGround}
                style={{flex: 1}}>
                {checked && _renderHeader()}
                {
                    loading == false ?
                        <View style={styles.containerLq}>
                            {_renderQuestion()}
                        </View>
                        :
                        <ActivityIndicator size="large" color="#0000ff" marginTop='50%'/>
                }

                {
                    checked ?
                        modalSuccess
                            ?
                            <View style={{...styles.viewCheckD6, bottom: SmartScreenBase.smPercenHeight * 3}}>
                                <TouchableOpacity
                                    style={styleButton.Sty_Button}
                                    onPress={_nextQuestion}
                                >
                                    <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                                <FileSound4 showImage={"true"}/>
                            </View>
                            :
                            <View style={{...styles.viewCheckRd, bottom: SmartScreenBase.smPercenHeight * 3}}>
                                <View style={{...styles.viewBtnRd, width: '100%'}}>
                                    <TouchableOpacity
                                        style={styleButton.Sty_Button}
                                        onPress={_nextQuestion}
                                    >
                                        <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                                </View>
                                <FileSound4 showImage={"false"}/>
                            </View>
                        :
                        <View style={{
                            position: 'absolute',
                            bottom: SmartScreenBase.smPercenHeight * 3,
                            width: width,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity
                                disabled={showBtn ? false:true }
                                style={showBtn ? styleButton.Sty_Button : styleButton.Sty_Button_disable}
                                onPress={_checkQuestion}
                            >
                                <Text style={styleButton.Sty_Text_Button}>KIỂM TRA</Text>
                            </TouchableOpacity>
                        </View>

                }
            </View>
        </View>
    );
};

export default PronunciationD6;
