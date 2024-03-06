import React, {useEffect, useState, useRef} from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard,
    Platform,
    Alert
} from 'react-native';
import EventBus from 'react-native-event-bus';
import stylesF6 from './styleRF6';
import stylesRF14 from './styleRF14';
import StyleLesson from '../StyleLesson';
import FileSound from '../FileSound';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import TypeExercise from '../Component/TypeExercise2';
import API from '../../../../API/APIConstant';
import axios from 'axios';
import LoadingScreen from './../../../../screens/LoadingScreen';
import Carousel from 'react-native-snap-carousel';
import WebView from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {ReadingF14Action} from '../../../../redux/actions/ReadingF14Action';
import FileSound4 from '../FileSound4';
import Utils from '../../../../utils/stringUtils';
import lessonMath from '../../../../utils/lessonMath';
import FontBase from '../../../../base/FontBase';
import stringUtils from '../../../../utils/stringUtils';
import LessonBase from '../../../../base/LessonBase';

const smartFont = SmartScreenBase.smFontSize;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartScreenHeight = SmartScreenBase.smPercenHeight;
let redo = 0, vietnam = '', english = '';

const ReadingF14 = (props) => {

    const dispatch = useDispatch();
    const {route, navigation, lesson_id, modeF, group_id, dataContent} = props;
    const [answer, setAnswer] = useState([]);
    const [listQuestion, setListQuestion] = useState('');
    const [textQuestion, setTextQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [dataCarousel, setDataCarousel] = useState([]);
    const [btnCheck, setBtnCheck] = useState(true);
    const [checkResult, setCheckResult] = useState(false);
    const [btnContinue, setBtnContinue] = useState(false);
    const [btnRedo, setBtnRedo] = useState(false);
    const [result, setResult] = useState(0);
    const [renderExplain, setRenderExplain] = useState(false);
    const [webview, setWebview] = useState('');
    const [miniTest, setMiniTest] = useState('');
    const [enableEdit, setEnableEdit] = useState(true);
    const [firstItem, setFirstItem] = useState(0);
    const [disableBtnCheck, setDisableBtnCheck] = useState(true);
    const [dataAnswer, setDataAnswer] = useState([]);
    const [currentAnswer,setCurrentAnswer] = useState([]);
    const [causeIndex, setcauseIndex] = useState(0);
    const _carousel = useRef();

    const mode = route ? route.param.mode : '';
    const readingF14Reducer = useSelector(state => state.readingF14Reducer);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    // const readingF6Reducer = {'data_answer': {'800':1, '801':1,'802':1,'803':1,'804':1}}

    useEffect(() => {
        redo = 0
        _getDataQuestion();
    }, []);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = (e) => {
        props.handleKeyboardShow(-(e.endCoordinates.height - SmartScreenBase.smPercenHeight * 10));
    };

    const _keyboardDidHide = () => {
        props.handleKeyboardHide(0);
    };

    useEffect(() => {
        try{
        if (listQuestion) {
            let dataCa = [...dataCarousel];
            // dataCa = [];
            vietnam = listQuestion[0].list_option[0].group_content_vi;
            english = listQuestion[0].list_option[0].group_content;
            let ans = [...answer];
            listQuestion.forEach((element,index) => {
                let ques = {};
                ques['question_content'] = element.list_option[0].question_content;
                ques['match_option_text'] = element.list_option[0].match_option_text;
                ques['explain'] = element.list_option[0].option_explain;
                ques['score'] = element.list_option[0].score;
                ques['result'] = false;
                dataCa[index] = ques;
                ans[index] = '';
            });
            setAnswer(ans);
            if (modeF === 'review_result') {
                props.hideTypeExercise();
                setAnswer(readingF14Reducer.data_answer);
                setMiniTest('afterTest');
                setCheckResult(true);
                let count = 0;
                dataCa.forEach((element, index) => {
                    if (element.match_option_text.toLowerCase() === readingF14Reducer.data_answer[index].toLowerCase()) {
                        dataCa[index].result = true;
                        count++;
                    }
                });
                setResult(count);
            }
            setDataCarousel(dataCa);
        }
        setIsLoading(false)
        props.setLoading(false)
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    }, [listQuestion]);

    const _saveLogLearning = async () => {
        props.saveLogLearning(dataAnswer);
    };

    useEffect(()=>{
        props.saveLogLearning([]);
    },[])

    const _getDataQuestion = async () => {
        if (dataContent) {
            setListQuestion(dataContent.data_question);
            setTextQuestion(dataContent.lesson.lesson_paragraph);
        }
    };

    const _trimQuestion = (str) => {
        let searchStr = '}';
        let searchStrLen = '}'.length;
        let startIndex = 0, index, indices = {}, start = 0, indexQ = 0;
        if ((index = str.indexOf(searchStr, startIndex)) > -1) {
            let str1 = str.slice(startIndex, index + 1).match(/\{([^}]+)\}/)[1];
            indices['txt2'] = str1;
            let text = str.slice(start, index - (str1.length + 1)).trim();
            indices['txt1'] = text;
            indexQ++;
            startIndex = index + searchStrLen;
        }
        indices['txt3'] = str.slice(startIndex, str.length).trim();
        return indices;
    };

    const _prevCarousel = () => {
        _carousel.current && _carousel.current.snapToPrev()
    };

    const _nextCarousel = () => {
        _carousel.current && _carousel.current.snapToNext()
    };

    const onChangeIndex = (curIndex) => {
        setcauseIndex(curIndex)
    }

    const _renderQuestion = () => {
        return (
            <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                <View style={[StyleLesson.Sty_View_Border, {
                    alignItems: 'flex-start',
                    height: SmartScreenBase.smPercenHeight * 28,
                    padding: SmartScreenBase.smPercenHeight * 2,
                    // marginTop: SmartScreenBase.smPercenHeight * 12
                }]}>
                {/* {
                    webview ?
                        <View style={stylesF6.webView}>
                            <TouchableOpacity
                                style={stylesF6.btnCloseWebView}
                                onPress={() => setWebview('')}
                            >
                                <Text style={{color: '#fff'}}>X</Text>
                            </TouchableOpacity>
                            <WebView
                                source={{
                                    uri: 'https://www.oxfordlearnersdictionaries.com/definition/english/' + webview.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
                                }}
                            />
                        </View>
                        :
                        null
                } */}
                <ScrollView>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-start',
                            }}
                        >
                        {                  
                            textQuestion ?
                            <TextDownLine textBody={textQuestion}/>  
                                :
                                null
                        }
                    </View>
                </ScrollView>
            </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    width: SmartScreenBase.smPercenWidth*100,
                    marginTop: SmartScreenBase.smPercenHeight,
                    paddingHorizontal: SmartScreenBase.smPercenWidth*4,
                    // height: SmartScreenBase.smPercenHeight * 25,
                }}
                >
                    <TouchableOpacity
                        onPress={() => _prevCarousel()}
                        // style={{
                        //     position: 'absolute',
                        //     top: -SmartScreenBase.smPercenHeight,
                        //     left: -SmartScreenBase.smBaseWidth * 450,
                        //     zIndex: 100,
                        // }}
                    >
                        {causeIndex > 0 && <Image
                            source={{ uri: 'previous' }}
                            style={{
                                width: SmartScreenBase.smBaseWidth * 100,
                                height: SmartScreenBase.smBaseWidth * 100,
                                resizeMode: 'contain',
                            }}
                        />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => _nextCarousel()}
                        // style={{
                        //     position: 'absolute',
                        //     top: -SmartScreenBase.smPercenHeight,
                        //     right: -SmartScreenBase.smBaseWidth * 450,
                        //     zIndex: 100,
                        // }}
                    >
                        {causeIndex < dataCarousel.length-1 && <Image
                            source={{ uri: 'next' }}
                            style={{
                                width: SmartScreenBase.smBaseWidth * 100,
                                height: SmartScreenBase.smBaseWidth * 100,
                                resizeMode: 'contain',
                            }}
                        />}
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const _renderAnswer = () => {
        return (
            <Carousel
                ref={_carousel}
                data={dataCarousel}
                renderItem={_renderItemCarousel}
                sliderWidth={SmartScreenBase.smPercenWidth * 100}
                itemWidth={SmartScreenBase.smPercenWidth * 85}
                layout={'default'}
                onBeforeSnapToItem={(slideIndex) => onChangeIndex(slideIndex)}
            />
        );
    };

    const _onChangeText = (text, index) => {
        let as = answer;
        // let ccra = currentAnswer;
        // if (text) {
            as[index] = text;
            // crA[index] = text;
        // } 
        // else {
        //     as.splice(index, 1);
        // }
        let c = 0;
        as.forEach((item) => {
            c += item ? 1 : 0;
        });
        if (c) {
            setDisableBtnCheck(false);
        } else {
            setDisableBtnCheck(true);
        }
        // setCurrentAnswer(crA);
        // console.log('ans',as);
        // console.log('cra',ccra);
        setAnswer(as);
    };

    const _renderItemCarousel = ({item, index}) => {
        console.log('item',item)
        let text = _trimQuestion(item.question_content);
        return (
            <View style={{
                backgroundColor: '#fff',
                marginTop: smartScreenHeight * 4,
                height: smartScreenHeight * 22,
                borderRadius: smartScreenWidth * 5,
            }}>
                <View style={stylesF6.viewImg}>
                    <Image source={{uri: 'lesson_reading_image1'}}
                           style={stylesF6.imgF}
                    />
                    <Text style={stylesF6.txtT}>{index + 1}/{listQuestion.length}</Text>
                </View>
                <View style={stylesF6.viewF}>
                    {
                        item.question_content ?
                            <View style={{
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                margin: smartScreenHeight * 2,
                                alignItems: 'flex-end',
                            }}>
                                {
                                    text['txt1'] ?
                                        text['txt1'].split(' ').map((ques, key) => {
                                            return (
                                                <Text onLongPress={() => LessonBase.goTranslate(ques)}
                                                style={{
                                                    paddingTop: SmartScreenBase.smPercenHeight,
                                                    fontSize: SmartScreenBase.smBaseWidth * 45,
                                                    fontFamily: FontBase.MyriadPro_Regular
                                                }}>{ques} </Text>
                                            );
                                        })
                                        :
                                        null
                                }
                                <View style={{
                                    // ...stylesRF14.textInput,
                                    marginTop: SmartScreenBase.smPercenWidth*0,
                                    minWidth: smartScreenWidth * 10,
                                    borderBottomWidth: 1,
                                    height: SmartScreenBase.smPercenWidth * 8,
                                    paddingTop: SmartScreenBase.smPercenWidth*1.8,
                                    borderBottomColor: checkResult && item.result ? '#72B228' : checkResult && !item.result ? '#D80B0B' : '#000',
                                }}>
                                    <TextInput
                                        autoCorrect={false}
                                        editable= {enableEdit && !item.status}
                                        style={{
                                            // ...stylesRF14.textInput2,
                                            marginTop: Platform.OS == 'ios' ? (SmartScreenBase.ratio > 1.8 ? -SmartScreenBase.smPercenWidth*1 : -SmartScreenBase.smPercenWidth*0.25) : SmartScreenBase.smPercenWidth*0,
                                            fontSize: SmartScreenBase.smBaseWidth * 45,
                                            height: SmartScreenBase.smPercenHeight * 4.3,
                                            color: checkResult && item.result ? '#72B228' : checkResult && !item.result ? '#D80B0B' : '#8E1C76',
                                            textAlignVertical: 'bottom',
                                            fontFamily: FontBase.MyriadPro_Regular
                                        }}
                                        onChangeText={(text) => _onChangeText(text, index)}
                                        value={currentAnswer[index] != null && currentAnswer[index].length>0 && currentAnswer[index]}
                                        // {...currentAnswer[index] != null && currentAnswer[index].length>0? value = currentAnswer[index]:null}
                                        autoCapitalize={'none'}
                                    />
                                </View>
                                {
                                    text['txt3'] ?
                                        text['txt3'].split(' ').map((ques, key) => {
                                            return (
                                                <Text onLongPress={() => LessonBase.goTranslate(ques)}
                                                style={{
                                                    paddingTop: SmartScreenBase.smPercenHeight,
                                                    fontSize: SmartScreenBase.smBaseWidth * 45,
                                                }}>{" "+ques}</Text>
                                            );
                                        })
                                        :
                                        null
                                }
                            </View>
                            :
                            null
                    }
                </View>
            </View>
        );
    };
    // console.log('answer',answer)
    // console.log('dataCarousel',dataCarousel)

// +++++ Check đúng sai
    const _checkResult = () => {
        
        props.hideTypeExercise();
        console.log('redo',redo);
        let count = 0;
        let dataC = [...dataCarousel];
        let dataAns = [...dataAnswer];
        let crAns = [...answer];
        let currentA = [...currentAnswer];
        // console.log('dataAns',dataAns);
        let data = {};
        data['question_id'] = listQuestion[0].question_id;
        data['exercise_type'] = 'pronunciation';
        data['question_type'] = listQuestion[0].list_option[0].question_type;
        let dataDetails = {};
        dataDetails['num_turn'] = redo + 1;
        data['detail_user_turn'] = [];
        data['question_score'] = 0;
        dataDetails['score'] = 0;
        data['final_user_choice'] = [];
        dataDetails['user_choice'] = [];
        dataCarousel.forEach((element, index) => {
            // let trimChar = _trimChar(element.match_option_text.toLowerCase().trim());
            // if (!answer[index]) {
            //     answer[index] = '';
            // }

            // if (Utils.validWord(element.match_option_text) === Utils.validWord(crAns[index])) {
            if (lessonMath.CheckAnswer(element.match_option_text, crAns[index])) {
                currentA[index] = crAns[index];
                data['final_user_choice'].push(crAns[index]);
                dataDetails['user_choice'].push(crAns[index]);
                dataC[index].result = true;
                element.status = true;
                count++;
            }else {
                currentA[index] = '';
            }
        });
        data['question_score'] = count / dataCarousel.length;
        dataDetails['score'] = count / dataCarousel.length;
        // if (redo === 1) {
        //     dataAns[0]['question_score'] = data['question_score'];
        //     dataAns[0]['final_user_choice'] = data['final_user_choice'];
        //     dataAns[0]['detail_user_turn'].push(dataDetails);
        //     props.showFeedback();
        // } else {
        //     data['detail_user_turn'].push(dataDetails);
        //     dataAns.push(data);
        // }
        data['detail_user_turn'].push(dataDetails);
        dataAns.push(data);
        dispatch(ReadingF14Action(crAns));
        if (modeF === 'exam' || modeF === 'mini_test') {
            props.setDataAnswer(dataAns);
            // _saveLogExam(dataAns);
        } else {
            if (redo === 1||count === dataCarousel.length) {
                setBtnContinue(true);
                setBtnRedo(false);
                _continue();
            } else {
                if (count === dataCarousel.length) {
                    setBtnContinue(true);
                    setBtnRedo(false);
                } else {
                    setBtnContinue(false);
                    setBtnRedo(true);
                }
            }
            setAnswer(crAns);
            setDataAnswer(dataAns);
            setDataCarousel(dataCarousel);
            setResult(count);
            setBtnCheck(false);
            setCheckResult(true);
            setEnableEdit(false);
            setcauseIndex(0)
        }
        setCurrentAnswer(currentA);
    };

    const _redo = () => {
        redo++;
        _carousel.current && _carousel.current.snapToItem(0, false)
        props.showTypeExercise();
        setBtnContinue(false);
        setBtnRedo(false);
        setCheckResult(false);
        setEnableEdit(true);
        setDisableBtnCheck(true);
        setBtnCheck(true);
    };

    const _btnCheck = () => {
        return (
            <View style={stylesRF14.viewCheckBtn}>
                <TouchableOpacity
                    disabled={disableBtnCheck}
                    style={disableBtnCheck ? stylesApp.Sty_Button_disable : stylesApp.Sty_Button}
                    onPress={_checkResult}
                >
                    <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _btnRedo = () => {
        return (
            <View style={stylesRF14.viewCheck}>
                <TouchableOpacity
                    style={stylesApp.Sty_Button}
                    onPress={_redo}
                >
                    <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _continue = () => {
        setRenderExplain(true);
        props.showFeedback();
    };

    const _btnContinue = () => {
        return (
            <View style={stylesRF14.viewCheck}>
                <TouchableOpacity
                    style={stylesApp.Sty_Button}
                    onPress={() => _continue()}
                >
                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _renderResult = () => {
        return (
            <View style={{alignItems: 'center', alignSelf: 'center'}}>
                <View style={{
                    height: SmartScreenBase.smPercenHeight * 15,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FileSound showImage={result === dataCarousel.length ? 'true' : 'false'}/>
                </View>
                <Text style={StyleLesson.text_answer}>
                    BẠN ĐÃ TRẢ LỜI ĐÚNG {result}/{dataCarousel.length}
                </Text>
                <View style={{width: SmartScreenBase.smPercenWidth * 100, alignItems: 'center'}}>
                    <View style={{position: 'absolute', top: 0}}>
                        {/* <Image source={{uri: 'student_home_image13'}}
                               style={[StyleLesson.Sty_ImageList, {transform: [{rotate: '180deg'}]}]}
                        /> */}
                    </View>
                    <View style={{
                        height: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 53 : SmartScreenBase.smPercenHeight * 50,
                        marginTop: SmartScreenBase.smPercenHeight,
                    }}>
                        <FlatList
                            data={dataCarousel}
                            renderItem={_renderExplain}
                            keyExtractor={(e,i) => i.toString()}
                            scrollEnabled={true}
                        />
                    </View>
                </View>
                {
                    miniTest
                        ?
                        _renderBtnExplain()
                        :
                        <TouchableOpacity
                            style={{...stylesApp.Sty_Button, marginTop: SmartScreenBase.smPercenHeight * 3}}
                            onPress={() => _saveLogLearning()}
                        >
                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                        </TouchableOpacity>
                }
            </View>
        );
    };

    const _renderExplain = ({item, index}) => {
        let text = _trimQuestion(item.question_content);
        console.log('ans',answer);
        console.log('itemresult',item.result);
        return (
            <View
                style={[StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        marginTop: SmartScreenBase.smBaseWidth * 120,
                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                        borderColor: item.result ? '#388C02' : '#D80B0B',
                        // height: SmartScreenBase.smPercenHeight * 30,
                    }]}>
                <View style={stylesF6.closeModal}>
                    {
                        item.result
                            ?
                            <Image source={{uri: 'grammar1_4'}} style={stylesF6.imageClose}/>
                            :
                            <Image source={{uri: 'grammar1_3'}} style={stylesF6.imageClose}/>
                    }
                </View>
                <View style={{marginLeft: SmartScreenBase.smPercenWidth}}>
                    <View style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        margin: smartScreenHeight * 2,
                        alignItems: 'flex-end',
                    }}>
                        <Text style={stylesApp.txt_Title}>{index + 1}.</Text>
                        {
                            text.txt1 ?
                                text.txt1.split(' ').map((data) => {
                                    return (
                                        <Text style={{
                                            fontSize: SmartScreenBase.smFontSize * 45
                                        }}>{' ' + data.replace(/\n/g, '')}</Text>
                                    );
                                })
                                : null
                        }
                        <View style={{
                            width: !answer[index].length || smartScreenWidth * parseInt(answer[index].length) * 2.5 < SmartScreenBase.smPercenWidth * 10 ? SmartScreenBase.smPercenWidth * 10 : smartScreenWidth * parseInt(answer[index].length) * 2.5,
                            borderBottomWidth: 1, marginLeft: SmartScreenBase.smPercenWidth
                        }}>
                        </View>
                        {
                            text.txt3 ?
                                text.txt3.split(' ').map((data) => {
                                    return (
                                        <Text style={{
                                            fontSize: SmartScreenBase.smFontSize * 45
                                        }}>{' ' + data.replace(/\n/g, '')}</Text>
                                    );
                                })
                                : null
                        }
                    </View>
                            <View style={{flexDirection: 'row', marginLeft: smartScreenWidth * 5, alignItems: 'center'}}>
                                <Image source={{uri: 'lesson_grammar_image2'}}
                                       style={{
                                           width: SmartScreenBase.smBaseWidth * 55,
                                           height: SmartScreenBase.smBaseWidth * 55,
                                           resizeMode: 'contain',
                                       }}
                                />
                                <Text style={{
                                    fontFamily: FontBase.MyriadPro_Bold,
                                    color: item.result ? '#388C02' : '#D80B0B',
                                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                                    fontSize: smartFont * 50,
                                }}>
                                    {answer[index]}
                                </Text>
                            </View>
                       
                    {!item.result ? (
                    <View
                        style={{flexDirection: 'row', marginLeft: smartScreenWidth * 5, marginTop: smartScreenHeight, alignItems: 'center'}}>
                        <Image source={{uri: 'lesson_grammar_image3'}}
                               style={{
                                   width: SmartScreenBase.smBaseWidth * 60,
                                   height: SmartScreenBase.smBaseWidth * 60,
                                   resizeMode: 'contain',
                               }}
                        />
                        <Text style={{
                            fontFamily: FontBase.MyriadPro_Bold,
                            color: '#388C02',
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize: smartFont * 50,
                        }}>
                            {item.match_option_text}
                        </Text>
                    </View>
                    ) : null}
                    <View style={{marginTop: smartScreenHeight * 2, marginLeft: SmartScreenBase.smPercenWidth * 4}}>
                        <Text style={{...StyleLesson.text_explain}}>GIẢI THÍCH :</Text>
                        <Text style={{
                            ...StyleLesson.explain_text,
                            fontStyle: 'italic',
                            paddingBottom: smartScreenHeight,
                        }}>
                            {item.explain}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const _renderBtn = () => {
        return (
            <View style={{...stylesRF14.viewCheck, flexDirection: 'row'}}>
                <TouchableOpacity
                    style={{...stylesF6.buttonCheck, width: SmartScreenBase.smPercenWidth * 42}}
                    onPress={() => navigation.navigate('Reading')}
                >
                    <Text style={{color: '#fff'}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...stylesF6.buttonCheck, width: SmartScreenBase.smPercenWidth * 42}}>
                    <Text style={{color: '#fff'}}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _backAfterTest = () => {
        if (modeF === 'review_result') {
            props.prevReviewResult();
        }
    };

    const _nextQuestion = () => {
        if (modeF === 'review_result') {
            props.nextReviewResult();
        }
    };

    const _renderBtnEx = () => {
        return (
            <View style={{...stylesRF14.viewCheck, flexDirection: 'row'}}>
                <TouchableOpacity
                    style={{...stylesF6.buttonCheck, width: SmartScreenBase.smPercenWidth * 28}}
                    onPress={() => _backAfterTest()}
                >
                    <Text style={{color: '#fff'}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{...stylesF6.buttonCheck, width: SmartScreenBase.smPercenWidth * 28}}
                    onPress={() => setRenderExplain(true)}
                >
                    <Text style={{color: '#fff'}}>Giải thích</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{...stylesF6.buttonCheck, width: SmartScreenBase.smPercenWidth * 28}}
                    onPress={() => _nextQuestion()}
                >
                    <Text style={{color: '#fff'}}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _renderBtnExplain = () => {
        return (
            <View style={{...stylesRF14.viewEx, flexDirection: 'row'}}>
                <TouchableOpacity
                    style={{...stylesF6.buttonCheck, width: SmartScreenBase.smPercenWidth * 42}}
                    onPress={() => _backAfterTest()}
                >
                    <Text style={{color: '#fff'}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{...stylesF6.buttonCheck, width: SmartScreenBase.smPercenWidth * 42}}
                    onPress={() => _nextQuestion()}
                >
                    <Text style={{color: '#fff'}}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _renderCRes = ({item, index}) => {
        // console.log('answer[index].length', answer[index].length)
        let text = _trimQuestion(item.question_content);
        console.log("=====_renderCRes")
        return (
            <View
                style={[StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        marginTop: SmartScreenBase.smBaseWidth * 120,
                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                        borderColor: item.result ? '#388C02' : '#D80B0B',
                        justifyContent: 'center',
                    }]}>
                <View style={stylesF6.closeModal}>
                    {
                        item.result
                            ?
                            <Image source={{uri: 'grammar1_4'}} style={stylesF6.imageClose}/>
                            :
                            <Image source={{uri: 'grammar1_3'}} style={stylesF6.imageClose}/>
                    }
                </View>
                <View style={{marginLeft: SmartScreenBase.smPercenWidth}}>
                    <View style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        margin: smartScreenHeight * 2,
                        alignItems: 'flex-end',
                    }}>
                        <Text style={stylesApp.txt_Title}>{index + 1}.</Text>
                        {/* <Text style={{fontSize: SmartScreenBase.smFontSize * 45}}>{text.txt1 + ' '}</Text> */}
                        {
                            text.txt1 ?
                                text.txt1.split(' ').map((data) => {
                                    return (
                                        <Text style={{
                                            fontSize: SmartScreenBase.smFontSize * 45
                                        }}>{' ' + data.replace(/\n/g, '')}</Text>
                                    );
                                })
                                : null
                        }
                        <View style={{
                            width: !answer[index].length || smartScreenWidth * parseInt(answer[index].length) * 3.4 < SmartScreenBase.smPercenWidth * 12 ? SmartScreenBase.smPercenWidth * 12 : smartScreenWidth * parseInt(answer[index].length) * 3.4,
                            borderBottomWidth: 1, marginLeft: SmartScreenBase.smPercenWidth,
                            borderBottomColor: checkResult && item.result ? '#72B228' : checkResult && !item.result ? '#D80B0B' : !checkResult && answer[index] ? '#8E1C76' : '#000',
                        }}>
                            <Text
                                style={{
                                    fontFamily: FontBase.MyriadPro_Bold,
                                    fontSize: SmartScreenBase.smFontSize * 48,
                                    textAlign: 'center',
                                    color: checkResult && item.result ? '#72B228' : checkResult && !item.result ? '#D80B0B' : !checkResult && answer[index] ? '#8E1C76' : '#000',
                                }}
                            >
                                {answer[index]}
                            </Text>
                        </View>
                        {
                            text.txt3 ?
                                text.txt3.split(' ').map((data) => {
                                    return (
                                        <Text style={{
                                            fontSize: SmartScreenBase.smFontSize * 45
                                        }}>{' ' + data.replace(/\n/g, '')}</Text>
                                    );
                                })
                                : null
                        }
                    </View>
                </View>
            </View>
        );
    };

    const _renderCheckResult = () => {
        return (
            <View style={{alignItems: 'center', alignSelf: 'center'}}>
                <Text style={{
                    ...stylesF6.textNumberTrue,
                    paddingTop: smartScreenHeight * 2,
                    paddingBottom: smartScreenHeight * 2,
                }}>
                    BẠN ĐÃ TRẢ LỜI ĐÚNG {result}/{dataCarousel.length}
                </Text>
                <View style={{width: SmartScreenBase.smPercenWidth * 100, alignItems: 'center'}}>
                    <View style={{height: Platform.OS === 'ios' ?  SmartScreenBase.smPercenHeight * 70 : SmartScreenBase.smPercenHeight * 67}}>
                        <FlatList
                            data={dataCarousel}
                            renderItem={_renderCRes}
                            keyExtractor={(e,i) => i.toString()}
                            scrollEnabled={true}
                        />
                    </View>
                </View>
                {
                    miniTest
                        ?
                        _renderBtnEx()
                        :
                        btnRedo
                            ?
                            _btnRedo()
                            :
                            btnContinue
                                ?
                                _btnContinue()
                                :
                                null
                }
            </View>
        );
    };

    return (
        <View>
            {   isLoading ? null :
                renderExplain ?
                    _renderResult()
                    :
                    checkResult ?
                        _renderCheckResult()
                        :
                        <View>
                            <View style={{ 
                                alignItems: 'center',
                                alignSelf: 'center',
                                height: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 75 : SmartScreenBase.smPercenHeight * 72
                            }}>
                                {_renderQuestion()}

                                {_renderAnswer()}
                                {
                                    miniTest === 'testing'
                                        ?
                                        _renderBtn()
                                        :
                                        miniTest === 'afterTest'
                                            ?
                                            _renderBtnEx()
                                            :
                                            btnCheck ? _btnCheck() : null
                                }
                            </View>
                        </View>
            }
            {
                btnRedo ?
                    <FileSound4 showImage={'false'}/>
                    :
                    null
            }
        </View>
    );
};

export default ReadingF14;
