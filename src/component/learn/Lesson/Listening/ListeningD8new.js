import React, { useEffect, useState, useReducer, useCallback } from 'react';
import {
    Text,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    Platform,
    ImageBackground,
    TextInput,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import styles from './listten8Styles';
import FileSound from '../FileSound';
import FileSound4 from '../FileSound4';

const { width, height } = Dimensions.get('window');
import { useSelector, useDispatch } from 'react-redux';

import SmartScreenBase from '../../../../base/SmartScreenBase';
import API from '../../../../API/APIConstant';
import stylesButton from '../../../../styleApp/stylesApp'
let Sound = require('react-native-sound');
Sound.setCategory('Playback');

import FlatListQuestion from './FlatListQuestion/FlatListQuestion';

import EventBus from 'react-native-event-bus';
import { listening8Aciton } from '../../../../redux/actions/listtening8Action';
import LoaddingScreen from '../../../../screens/LoadingScreen';
import ModalScript from '../../../modalScript/index'
import SoundQestion from '../../../SoundQuestion/sound2'
import stringUtils from '../../../../utils/stringUtils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Listening8new = (props) => {
    const { modeF, lesson_id, group_id } = props;
    const [playQ, setPlay] = useState('pause');
    const [longQestion, setLongQuestion] = useState(0);
    const [runSlider, setRunSlider] = useState(0);
    const [number, setNumber] = useState(0);
    const [dataFlasList, setDataFlastList] = useState([])
    const [valueY, setValueY] = useState(0);
    const [result, setResult] = useState([]);
    const [textButton, setTextButton] = useState('kiểm tra')
    const [numberSuccess, setNumberSuccess] = useState(0)
    const [buttonShow, setButtonShow] = useState(false);
    const [again, setAgain] = useState(0);
    const [optionExplain, setOptionExplain] = useState('');
    const [lessonTextAudio, setLessonTextAudio] = useState('');
    const [script, setScript] = useState(false);
    // const [testing, setTesting] = useState(props.checkType);
    const testing = useSelector(state => state.TesttingReducer.testing)
    const [viewValue, setViewValue] = useState(false);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [vi, setVi] = useState(false);
    const [loading, setLoading] = useState(true);
    const [idLog, setIdLog] = useState({});
    const [dataPost, setDataPost] = useState({});
    const [bodyPost, setBodyPost] = useState([])
    const dataRedux = useSelector(state => state.listening8Reducer.listening);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [loadAudio, setLoadAudio] = useState(false)
    const [visible, setVisible] = useState(false);
    const [titleGT, setTitleGT] = useState('Xem giải thích');
    const [audio, setAudio] = useState('');
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch();
    const keyShowing = React.useRef(false);

    // useEffect(()=>{
        // Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        // Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        // return ()=>{
        //     Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        //     Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        // }
    // },[])
    useEffect(() => {
        if (testing == 'aftertest') {
            setDataFlastList(dataRedux.dataFlasList);
            setNumberSuccess(dataRedux.numberSuccess);
            setOptionExplain(dataRedux.optionExplain);
            setLessonTextAudio(dataRedux.lessonTextAudio);
            setResult(dataRedux.result);
            setTextButton('làm lại');
            setLoading(false);
        } else {
            _getData();
        }
    }, [testing])

    useEffect(()=>{
        props.saveLogLearning([]);
    },[])

    const _keyboardDidShow = () => {
        keyShowing.current = true;
        props.hideTypeExercise()
        setValueY(8)
    };

    const _keyboardDidHide = () => {
        keyShowing.current = false;
        props.showTypeExercise()
        setValueY(0)
    };
    const _getData = async () => {
        let response = {};
        response['data'] = props.dataContent;
        let dataList = response.data.data_question[0].list_option[0].json_data_parse ? response.data.data_question[0].list_option[0].json_data_parse : "";
        let data = await response.data.data_question;
        let Explain = [];
        let array = [...result];
        
        setData(response.data.data_question[0].list_option[0])
        setTitle(response.data.data_question[0].list_option[0].group_content)
        await data.map((item, index) => {
            Explain[index] = item.list_option[0].option_explain;
        })
        let trimQ = await dataList.map((item, int) => {
            return trimQuestion(item, response.data.data_question[int].list_option)
        });
        trimQ.map((item, index) => {
            array.push(item.data)
        })
        console.log("=====Explain",Explain)
        setResult(array)
        setLessonTextAudio(response.data.lesson.lesson_text_audio)
        setOptionExplain(Explain)
        setDataFlastList(trimQ);
        _convertDataPost(response.data)
        await setDataPost(response.data)
        setAudio(response.data.lesson.lesson_audio);
        // if (testing == 'homeword') {
        //     _postDataFirt(response.data);
        // }
        setLoading(false)
    }
    const _convertDataPost = (data) => {
        let body = [...bodyPost];
        let dataP = { ...data };
        dataP.data_question.map((item, index) => {
            let oj = {}
            oj.question_id = item.question_id;
            oj.question_type = item.list_option[0].question_type;
            oj.question_score = item.list_option[0].score;
            oj.final_user_choice = "";
            oj.exercise_type = "listening";
            oj.detail_user_turn = []
            body.push(oj);
        });
        setBodyPost(body);
    };

    const trimQuestion = (str, options) => {
        let searchStr = '}';
        let searchStrLen = '}'.length;
        let startIndex = 0, index;
        let indices = {};
        indices['data'] = [];
        indices['text3'] = '';
        while ((index = str.row_2.indexOf(searchStr, startIndex)) > -1) {
            let str1 = str.row_2.slice(startIndex, index + 1).match(/\{([^}]+)\}/)[1];
            let data = {};
            data['text2'] = str.row_2.slice(startIndex, index - str1.length - 1).replace(/(?:\r\n|\r|\n)/g, ' ').split(' ');
            data['text'] = str1.replace(/(?:\r\n|\r|\n)/g, ' ');
            data.text3 = options[0].match_option_text;
            data.color = '#F9E815';
            data.value = "";
            indices['data'].push(data);
            startIndex = index + searchStrLen;
            data.disabled = false;
        };
        indices['text3'] = str.row_2.slice(startIndex, str.length).replace(/(?:\r\n|\r|\n)/g, ' ').split(' ');
        indices.textQ = str.row_1.replace(/(?:\r\n|\r|\n)/g, ' ').split(' ');
        indices.color = '#F9E815';
        return indices;
    };

    const _checkValue = (index, value, id) => {
        dataFlasList[index].data[id].value = value;
        var isDis = true;
        for(let item of dataFlasList){
            if(item.data.find(c=>!c.disabled&&!!c.value)){
                isDis = false;
                break;
            }
        }
        setDisabled(isDis)
        setDataFlastList([...dataFlasList])
    };

    const _checkResult = () => {
        if (textButton == 'kiểm tra') {
            props.hideTypeExercise();
            keyShowing.current&&setTimeout(()=>{
                props.hideTypeExercise();
            },1000)
            _compare()
        } else if (textButton == 'làm lại') {
            props.showTypeExercise();
            _again()
        } else {
            if (testing == 'homeword') {
                props.hideTypeExercise();
                _postDataAnswer()
            }
        }
    };
    const _postDataAnswer = async () => {
        props.saveLogLearning(bodyPost);
    }

    // hỗ trợ nhiều đáp án
    const checkEachQuest = (mResultList, mAnswer) => {
        var isDone = false
        mResultList.map((mono, mindex) => {
            console.log("checkEachQuest",_trimChar(mono.toLowerCase()),_trimChar(mAnswer.toLowerCase()))
            if (_trimChar(mono.toLowerCase()) == _trimChar(mAnswer.toLowerCase())) {
                isDone = true
            }
        })
        return isDone
    }

    const _again = () => {
        setDisabled(true)
        let number = 0;
        if (again < 2) {
            let array = [...dataFlasList];
            result.forEach((element, index) => {
                // console.log('element',element);
                element.map((itm, ind) => {
                    array[index].color = "#D80B0B";
                    array[index].data[ind].color = '#F9E815'
                    if (!checkEachQuest(itm.text3,array[index].data[ind].value)) {
                        array[index].data[ind].value = '';
                        return false
                    }
                })
            });

            setNumberSuccess(0);
            setDataFlastList(array);
            setTextButton('kiểm tra');
        }
    };

    const _trimChar = (string) => {
        // string = string.replace('‘', '\'').replace(/[\u2018\u2019]/g, '\'').trim();
        // while (string.charAt(string.length - 1) === '.' || string.charAt(string.length - 1) === ',') {
        //     string = string.substring(0, string.length - 1).trim();
        // }
        // return string;
        return stringUtils.validWord(string)
    };

    const _compare = async () => {
        let number = 0
        if (testing == 'homeword') {
            let array = [...dataFlasList];
            
            result.forEach((element, index) => {
                let oNum = 0;
                element.map((itm, ind) => {
                    array[index].color = "#D80B0B";
                    array[index].data[ind].color = '#D80B0B'
                    if (checkEachQuest(itm.text3,array[index].data[ind].value)) {
                        oNum++
                        array[index].data[ind].color = '#72B228'
                        array[index].data[ind].disabled = true
                        return false
                    }
                })
                if (oNum == element.length) {
                    number++;
                    array[index].color = "#72B228";
                }
            });
            
            setNumberSuccess(number);
            await _pushData(array)
            if (modeF === 'exam' || modeF === 'mini_test') {
                await _saveData()
                props.setDataAnswer(bodyPost)
            } else {
                if (number < result.length) {
                    if (again < 1) {
                        setDataFlastList(array)
                        setTextButton('làm lại')
                        setAgain(again + 1)
                    } else {
                        props.showFeedback();
                        setDataFlastList(array)
                        setTextButton('tiếp tục')
                    }
                } else {
                    props.showFeedback();
                    setDataFlastList(array)
                    setTextButton('tiếp tục')
                }
            }

        } else {
            await _saveData()
        }

    };
    const _pushData = (value) => {
        let arrayBody = [...bodyPost]
        let array = [];
        value.forEach((item, index) => {
            if (item.data.length > 0) {
                let oj = {}
                oj.color = item.color,
                    oj.value = item.data[0]
                array.push(oj)
            }
        })
        array.forEach((item, index) => {
            let oj = {};
            oj.score = item.color == "#D80B0B" ? 0 : 1;
            oj.user_choice = item.value.value
            oj.num_turn = again + 1
            arrayBody[index].final_user_choice = item.value.value;
            arrayBody[index].detail_user_turn.push(oj)
        })
        setBodyPost(arrayBody);
    };

    const _saveData = async () => {
        let array = [...dataFlasList];
        array.map((item, index) => {
            if (item.data.length != 0) {
                result.forEach((element) => {
                    if (element.toLowerCase() === item.data[0].value.toLowerCase()) {
                        array[index].color = "#72B228";
                        setNumberSuccess(numberSuccess + 1)
                        return false
                    }
                });
            }
            array[index].color = "#D80B0B";
        });
        let arraySave = {}
        arraySave.dataFlasList = dataFlasList
        arraySave.result = result;
        arraySave.numberSuccess = numberSuccess;
        arraySave.optionExplain = optionExplain
        arraySave.lessonTextAudio = lessonTextAudio;
        await dispatch(listening8Aciton(arraySave))
        // await props.methodScreen(9);

    }
    const renderItem = (item, index) => {
        return (
            <FlatListQuestion
                item={item}
                index={index}
                checkValue={_checkValue}
                checkTest={textButton}
                numberAgain={again}
            />
        )
    };

    const _afterTest = () => {
        if (modeF === 'review_result') {

            props.nextReviewResult();
        }
    }
    const _goback = () => {
        if (modeF === 'review_result') {
            props.prevReviewResult();
        }
    }
    const _showScript = () => {
        setVisible(!visible)
    }
    const _clickGT = () => {
        if (textButton != 'tiếp tục') {
            setTextButton('tiếp tục'); setViewValue(true)
            setTitleGT('Quay Lại')
        } else {
            setTextButton('làm lại'); setViewValue(false)
            setTitleGT('Xem Giải Thích')
        }
    }
    const _aftertest = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
                <TouchableOpacity style={stylesButton.Sty_ShortButton} onPress={() => { _goback() }}>
                    <Text style={{ color: '#fff', fontSize: 15 }}></Text>
                </TouchableOpacity>
                {
                    viewValue &&
                    <TouchableOpacity style={stylesButton.Sty_ShortButton} onPress={() => { setVisible(!visible) }}>
                        <Text style={styles.Sty_Text_Button}>SCRIPT</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity style={sstylesButton.Sty_ShortButton} onPress={() => { _clickGT }}>
                    <Text style={styles.Sty_Text_Button}>{titleGT}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={sstylesButton.Sty_ShortButton} onPress={() => { _afterTest() }}>
                    <Text style={styles.Sty_Text_Button}></Text>
                </TouchableOpacity>
            </View>
        )
    }
    const _renderItemAgain = (item, index) => {
        console.log("=====_renderItemAgain",item.data);
        return (
            item.data.length > 0 ?
                <View style={[styles.boderViewEnd, { borderColor: item.color, }]}>
                    <Image source={{ uri: item.color == '#D80B0B' ? 'lesson_grammar_image6' : 'grammar1_4' }} style={styles.imageTrueFalse} />
                    <View style={{ flexDirection: 'row', width: '100%',alignItems:'center' }}>
                        <Text style={stylesButton.txt_Title}>{index +1}. </Text>
                        {
                            item.data.map((itm, ind) => {
                                return <Text style={styles.titleAnswer}><Text style={{ color: itm.color }}> {itm.value}</Text>{ind != item.data.length - 1 && itm.value != '' && '-'}</Text>
                            })

                        }
                    </View>
                    {
                        item.color == '#D80B0B' &&
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: 'lesson_grammar_image3' }} style={{ height: 30, width: 30, resizeMode: 'contain', marginRight: 10 }} />
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                {
                                    // item.text3.map((itm, ind) => {
                                        // return 
                                        <Text style={styles.titleResult2}>{item.data[0].text3[0]}</Text>
                                    // })
                                }
                            </View>
                        </View>
                    }
                    <View style={{ width: '100%', marginVertical: SmartScreenBase.smPercenWidth*2 }}></View>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>GIẢI THÍCH: </Text>
                        <Text style={styles.titleExplain}>{optionExplain[index]?optionExplain[index]:""}</Text>
                    </View>
                </View>
                :
                null
        )
    };
    const _testing = () => {
        return (
            <View style={{ width: '100%', justifyContent: 'center', paddingHorizontal: 20, alignItems: 'center' }}>
                <TouchableOpacity style={styles.Sty_Button} onPress={_compare}>
                    <Text style={styles.Sty_Text_Button}>TIẾP TỤC</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        !loading ?
            <View style={[styles.container,{
                marginTop:SmartScreenBase.smPercenHeight*(valueY)
            }]}>
                {
                    textButton == 'kiểm tra' ?
                        <SoundQestion Audio={audio} />
                        :
                        <View style={{ width: width, alignItems: 'center', marginTop: SmartScreenBase.smPercenHeight*2 }}>
                            {
                                textButton == 'tiếp tục' ?
                                    <View style={{
                                        height: SmartScreenBase.smPercenHeight * 11,
                                        width: "100%",
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <FileSound showImage={numberSuccess == result.length ? 'true' : 'false'} />
                                    </View>
                                    :
                                    <FileSound4 showImage={numberSuccess == result.length ? 'true' : 'false'} />
                            }
                            <Text style={[styles.titleResult, {fontWeight: 'normal'}]}>Bạn đã trả lời đúng {numberSuccess}/ {result.length}</Text>
                        </View>
                }
                <View style={[styles.bodyContainer, 
                    {
                        height: textButton == "làm lại" ? SmartScreenBase.smPercenHeight * 80 - SmartScreenBase.smPercenWidth*20
                                : textButton == 'kiểm tra' ? SmartScreenBase.smPercenHeight * 67.5 - SmartScreenBase.smPercenWidth*20
                                : SmartScreenBase.smPercenHeight * 69.2 - SmartScreenBase.smPercenWidth*20
                    }]}>
                    <KeyboardAwareScrollView 
                        extraScrollHeight={Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight*24 : SmartScreenBase.smPercenHeight*14} 
                        enableOnAndroid={true}>
                        {
                            dataFlasList.map((item, index) => {
                                return(textButton != 'tiếp tục'?renderItem(item, index):_renderItemAgain(item, index))
                            })
                        }
                    </KeyboardAwareScrollView>
                    {/* <FlatList
                            data={dataFlasList}
                            renderItem={textButton != 'tiếp tục'?renderItem:_renderItemAgain}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                    /> */}
                </View>
                {
                    valueY==0&&<>
                        {
                            testing == 'homeword' &&
                            <View style={{ 
                                width: '100%', 
                                flexDirection: textButton != 'tiếp tục' ? 'column' : 'row', 
                                justifyContent: textButton != 'tiếp tục' ? 'center' : 'space-around', 
                                paddingHorizontal: 20,
                                alignItems: 'center',
                                paddingTop:textButton == 'tiếp tục'?10:10,
                            }}>
                                {
                                    textButton == 'tiếp tục' &&
                                    <TouchableOpacity style={stylesButton.Sty_ShortButton} onPress={() => { setVisible(!visible) }}>
                                        <Text style={stylesButton.Sty_Text_Button}>SCRIPT</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity style={textButton != 'tiếp tục' ? disabled ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button : stylesButton.Sty_ShortButton} onPress={_checkResult} disabled={disabled}>
                                    <Text style={stylesButton.Sty_Text_Button}>{textButton.toLocaleUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {
                            testing == 'testing' &&
                            <View>
                                {_testing()}
                            </View>
                        }
                        {
                            testing == 'aftertest' &&
                            <View style={{ width }}>
                                {_aftertest()}
                            </View>
                        }
                    </>
                }
                <ModalScript
                    audio={audio}
                    title={lessonTextAudio}
                    visible={visible}
                    close={_showScript}
                />
            </View>
            :
            null
    )
};

export default Listening8new;
