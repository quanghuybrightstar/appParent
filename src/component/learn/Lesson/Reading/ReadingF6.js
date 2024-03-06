import React, {useEffect, useState, useRef} from 'react';
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View, Platform, TouchableHighlight, Alert} from 'react-native';
import stylesF6 from './styleRF6';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import TypeExercise from '../Component/TypeExercise2';
import API from '../../../../API/APIConstant';
import FileSound from '../FileSound';
import axios from 'axios';
import LoadingScreen from './../../../../screens/LoadingScreen';
import Carousel from 'react-native-snap-carousel';
import EventBus from 'react-native-event-bus';
import {useDispatch, useSelector} from 'react-redux';
import {ReadingF6Action} from '../../../../redux/actions/ReadingF6Action';
import StyleApp from '../../../../styleApp/stylesApp';
import TypeExercise3 from '../Component/TypeExercise3';
import TextDownLine from '../../../../componentBase/TextDownLine/TextDownLine';
import Loading from '../../../LoadingScreen';

let dataC = [];
const smartFont = SmartScreenBase.smFontSize;
let redo = 0, vietnam = '', english = '';

const ReadingF6 = (props) => {

    const {route, navigation, lesson_id, modeF, group_id, dataContent} = props;
    // const dispatch = useDispatch();
    const [answer, setAnswer] = useState({});
    const [textQuestion, setTextQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [dataCarousel, setDataCarousel] = useState([]);
    const [btnCheck, setBtnCheck] = useState(true);
    const [checkResult, setCheckResult] = useState(false);
    const [btnContinue, setBtnContinue] = useState(false);
    const [btnRedo, setBtnRedo] = useState(false);
    const [result, setResult] = useState(0);
    const [renderExplain, setRenderExplain] = useState(false);
    const [disableBtnCheck, setDisableBtnCheck] = useState(true);
    const [miniTest, setMiniTest] = useState('');
    const [disableBtn, setDisableBtn] = useState(false);
    const [dataAnswer, setDataAnswer] = useState([]);
    const [causeIndex, setcauseIndex] = useState(0);
    const _carousel = useRef();

    const mode = route ? route.param.mode : '';
    // const readingF6Reducer = useSelector(state => state.readingF6Reducer);
    // const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    // const readingF6Reducer = {'data_answer': {'800':1, '801':1,'802':1,'803':1,'804':1}}

    useEffect(() => {
        redo= 0;
        beforeStart()
    }, []);
    
    const beforeStart = async () => {
        props.setLoading(true)
        await _getDataQuestion();
        await _saveLogLearning([])
        props.setLoading(false)
        setIsLoading(false)
    };

    const _saveLogLearning = async () => {
        props.saveLogLearning(dataAnswer);
    };

    const _getDataQuestion = async () => {
        try{
        if (dataContent) {
            if (dataContent.data_question) {
                dataC = [];
                let dataCa = [];
                dataCa = [];
                vietnam = dataContent.data_question[0].list_option[0].group_content_vi;
                english = dataContent.data_question[0].list_option[0].group_content;
                dataContent.data_question.forEach(element => {
                    let dataC = [];
                    element.list_option.forEach(e => {
                        let ques = {};
                        ques['match_option_text'] = e.match_option_text[0];
                        ques['score'] = e.score;
                        ques['question_id'] = e.question_id;
                        let ex = e.explain_parse;
                        ques['explain'] = ex ? ex.content_question_text : '';
                        dataC.push(ques);
                    });
                    dataCa.push(dataC);
                });
                setDataCarousel(dataCa);
            }
            setTextQuestion(dataContent.lesson.lesson_paragraph);
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    };

    const _chooseAnswer = (question_id, index) => {
        //console.log('dataC',dataC)
        let ans = {...answer};
        // console.log('ans', ans);
        ans[question_id] = index;
        let indexOf = dataC.indexOf(question_id);
        if (indexOf === -1) {
            dataC.push(question_id);
        }
        if (dataC.length === dataCarousel.length) {
            setDisableBtnCheck(false);
        } else {
            setDisableBtnCheck(true);
        }
        setAnswer(ans);
    };

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                disabled={disableBtn||item.dis}
                style={{
                    ...stylesF6.btnF6,
                    backgroundColor: checkResult && answer[item.question_id] === index && item.score === '1' ? '#72B228' : 
                    checkResult && answer[item.question_id] === index && item.score !== '1' ? '#ee5555' 
                    : !checkResult && (answer[item.question_id] === index || item.status) ? '#F9E815' : '#cecece',
                }}
                onPress={() => _chooseAnswer(item.question_id, index)}
            >
                <Text style={{color: '#000', fontSize: smartFont * 40}}>{item.match_option_text}</Text>
            </TouchableOpacity>
        );
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
            <View style={{
                ...stylesF6.contentQuestion,
                marginTop: 0, zIndex: 1,
                height: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 27 : SmartScreenBase.smPercenHeight * 24,
            }}>
                <ScrollView style={{zIndex: 0}}>
                    <View style={stylesF6.txtQt}>
                        {console.log("=====textQuestion render")}
                        {
                            dataContent.lesson.lesson_paragraph ?
                                <TextDownLine textBody={dataContent.lesson.lesson_paragraph}/>
                                :
                                null
                        }
                    </View>
                </ScrollView>
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

    const _renderItemCarousel = ({item, index}) => {
        return (
            <View style={{...stylesF6.viewFlat, marginTop: SmartScreenBase.smPercenHeight * 4}}>
                <View style={stylesF6.viewImg}>
                    <Image source={{uri: 'lesson_reading_image1'}}
                           style={stylesF6.imgF}
                    />
                    <Text style={stylesF6.txtT}>{index + 1}/{dataContent.data_question.length}</Text>
                </View>
                <View style={{...stylesF6.viewF, marginBottom: SmartScreenBase.smPercenHeight}}>
                    <ScrollView>
                        <FlatList
                            data={item}
                            renderItem={_renderItem}
                            keyExtractor={(item,index) => index.toString()}
                            numColumns={2}
                            scrollEnabled={false}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    };

    const _checkResult = () => {
        //console.log('redo',dataCarousel)
        let dataAns = [...dataAnswer];
        let count = 0;
        let data = {};
        data['question_id'] = dataContent.data_question[0].question_id;
        data['exercise_type'] = 'reading';
        data['question_type'] = dataContent.data_question[0].list_option[0].question_type;
        let dataDetails = {};
        dataDetails['num_turn'] = redo + 1;
        data['detail_user_turn'] = [];
        data['question_score'] = 0;
        dataDetails['score'] = 0;
        data['final_user_choice'] = [];
        dataDetails['user_choice'] = [];
        dataCarousel.forEach((element, index) => {
            element.forEach((e, i) => {
                if (answer[e.question_id] === i && e.score === '1') {
                    count++;
                    e.status = true;
                }
                if (answer[e.question_id] === i) {
                    data['final_user_choice'].push(e.match_option_text);
                    dataDetails['user_choice'].push(e.match_option_text);
                }
            });
            if(element.find(c=>c.status)){
                element.forEach(e=>e.dis = true);
            }

        });
        data['question_score'] = count / dataCarousel.length;
        dataDetails['score'] = count / dataCarousel.length;
        // if (redo === 1) {
        //     dataAns[0]['question_score'] = data['question_score'];
        //     dataAns[0]['final_user_choice'] = data['final_user_choice'];
        //     dataAns[0]['detail_user_turn'].push(dataDetails);
        // } else {
           
        // }
        data['detail_user_turn'].push(dataDetails);
        dataAns.push(data);

        setResult(count);
        // dispatch(ReadingF6Action(answer));
        if (modeF === 'exam' || modeF === 'mini_test') {
            props.setDataAnswer(dataAns);
            // _saveLogExam(dataAns);
        } else {
            if (redo === 1 || count === dataCarousel.length) {
                _continue();
                setBtnContinue(true);
                setBtnRedo(false);
            } else {
                if (count === dataCarousel.length) {
                    props.showFeedback();
                    setBtnContinue(true);
                    setBtnRedo(false);
                } else {
                    setBtnContinue(false);
                    setBtnRedo(true);
                }
            }
            _carousel.current && _carousel.current.snapToItem(0, false)

            setDataAnswer(dataAns);
            setResult(count);
            setBtnCheck(false);
            setCheckResult(true);
            setDisableBtn(true);
            setcauseIndex(0)
        }

    };

    const _redo = () => {
        redo++;
        let ans = {...answer};
        ///reset data
        dataC = [];
        dataCarousel.forEach((e,i)=>{
            var isTrue = e.find(c=>c.status)
            if(isTrue){
                dataC.push(e[0].question_id)
            }else{
                //dataC.splice(dataC.indexOf(e[0].question_id),1)
                ans[e[0].question_id] = null
            }
        })
        _carousel.current && _carousel.current.snapToItem(0, false)
    
        setAnswer(ans);
        setDisableBtn(false);
        setBtnContinue(false);
        setBtnRedo(false);
        setCheckResult(false);
        setBtnCheck(true);
        setDisableBtnCheck(true);
    };

    const _btnCheck = () => {
        return (
            <View style={{...stylesF6.viewCheck, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    disabled={disableBtnCheck}
                    style={disableBtnCheck ? StyleApp.Sty_Button_disable : StyleApp.Sty_Button}
                    onPress={_checkResult}
                >
                    <Text style={StyleApp.Sty_Text_Button}>KIỂM TRA</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _btnRedo = () => {
        return (
            <View style={{...stylesF6.viewCheck, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    style={StyleApp.Sty_Button}
                    onPress={_redo}
                >
                    <Text style={StyleApp.Sty_Text_Button}>LÀM LẠI</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _continue = () => {
        setRenderExplain(true);
        props.showFeedback();
        props.hideTypeExercise();
    };

    const _btnContinue = () => {
        return (
            <View style={{...stylesF6.viewCheck, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    style={StyleApp.Sty_Button}
                    onPress={() => _continue()}
                >
                    <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _renderResult = () => {
        return (
            <View style={{alignItems: 'center', alignSelf: 'center'}}>
                <View style={{
                    height: SmartScreenBase.smPercenHeight * 18,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FileSound showImage={result === dataCarousel.length ? 'true' : 'false'}/>
                </View>
                <Text style={{...StyleLesson.text_answer}}>
                    BẠN ĐÃ TRẢ LỜI ĐÚNG {result}/{dataCarousel.length}
                </Text>
                <View style={{width: SmartScreenBase.smPercenWidth * 100, alignItems: 'center'}}>
                    {/* <View style={{position: 'absolute', top: 0}}>
                        <Image source={{uri: 'student_home_image13'}}
                               style={[StyleLesson.Sty_ImageList, {transform: [{rotate: '180deg'}]}]}
                        />
                    </View> */}
                    <View style={{
                        height: SmartScreenBase.smPercenHeight * 50,
                        marginTop: SmartScreenBase.smPercenHeight,
                    }}>
                        <FlatList
                            data={dataCarousel}
                            renderItem={_renderExplain}
                            keyExtractor={(item,index) => index.toString()}
                            scrollEnabled={true}
                        />
                    </View>
                </View>
                {
                    miniTest
                        ?
                        _renderBtnExplain()
                        :
                        <View style={{...stylesF6.viewEx, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity
                                style={StyleApp.Sty_Button}
                                onPress={() => _saveLogLearning()}
                            >
                                <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        );
    };

    const _renderExplain = ({item, index}) => {
        return (
            <View
                style={[StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        marginTop: SmartScreenBase.smBaseWidth * 120,
                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                        borderColor: item[answer[item[0].question_id]].score === '1' ? '#388C02' : '#D80B0B',
                        // height: SmartScreenBase.smPercenHeight * 10,
                        justifyContent: 'center',
                    }]}>
                <View style={stylesF6.closeModal}>
                    {
                        item[answer[item[0].question_id]].score === '1'
                            ?
                            <Image source={{uri: 'grammar1_4'}} style={stylesF6.imageClose}/>
                            :
                            <Image source={{uri: 'grammar1_3'}} style={stylesF6.imageClose}/>
                    }
                </View>
                <View style={{
                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                }}>
                    <Text style={stylesApp.txt}><Text style={stylesApp.txt_Title}>{index + 1}. </Text> <Text style={{
                        fontWeight: 'bold',
                        color: item[answer[item[0].question_id]].score === '1' ? '#388C02' : '#D80B0B',
                        fontSize: smartFont * 50,
                    }}>{item[answer[item[0].question_id]].match_option_text.replace(/\n/g, ' ')}</Text> </Text>
                    {
                        item[answer[item[0].question_id]].score !== '1' ? (
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                marginTop: SmartScreenBase.smPercenHeight,
                                alignItems: 'flex-start',
                            }}>
                                <Image source={{uri: 'lesson_grammar_image3'}}
                                       style={{
                                           width: SmartScreenBase.smBaseWidth * 60,
                                           height: SmartScreenBase.smBaseWidth * 60,
                                           resizeMode: 'contain',
                                       }}
                                />
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: '#388C02',
                                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                                    fontSize: smartFont * 50,
                                }}>
                                    {_renderText(item)}
                                </Text>
                            </View>
                        ) : null
                    }
                </View>
                <View style={{
                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                }}>
                    <Text style={{fontWeight:'600',fontSize:SmartScreenBase.smFontSize*55}}>GIẢI THÍCH</Text>
                    <Text style={{fontStyle:'italic',fontSize:SmartScreenBase.smFontSize*45,marginTop:SmartScreenBase.smPercenWidth}}>{item[0].explain}</Text>
                </View>
            </View>
        );
    };

    const _renderText = (item) => {
        let txt = '';
        item.forEach(element => {
            if (element.score === '1') {
                txt = element.match_option_text;
                return false;
            }
        });
        return txt.replace(/\n/g, ' ');
    };

    const _renderBtn = () => {
        return (
            <View style={{...stylesF6.viewCheck, flexDirection: 'row'}}>
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

    const _setCheckExplain = () => {
        let count = 0;
        dataCarousel.forEach((element, index) => {
            element.forEach((e, i) => {
                if (answer[e.question_id] === i && e.score === '1') {
                    count++;
                }
            });
        });
        setResult(count);
        setRenderExplain(true);
    };

    const _renderBtnEx = () => {
        return (
            <View style={{
                ...stylesF6.viewCheck,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: SmartScreenBase.smPercenWidth * 100,
            }}>
                <TouchableOpacity
                    style={{...stylesF6.buttonCheck, width: SmartScreenBase.smPercenWidth * 28}}
                    onPress={() => _backAfterTest()}
                >
                    <Text style={{color: '#fff'}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{...stylesF6.buttonCheck, width: SmartScreenBase.smPercenWidth * 28}}
                    onPress={() => _setCheckExplain()}
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
            <View style={{
                ...stylesF6.viewEx,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: SmartScreenBase.smPercenWidth * 100,
            }}>
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

    return (
        isLoading ?
            null
            :
            <View style={{...stylesF6.containerF6, flex: 1}}>
                {
                    renderExplain ?
                        _renderResult()
                        :
                        <View style={{...stylesF6.viewQueF6}}>
                            {
                                btnRedo &&
                                <FileSound showIcon={'none'} showImage={result === dataCarousel.length ? 'true' : 'false'}/>
                            }
                            {
                                miniTest === 'afterTest'
                                    ?
                                    <TypeExercise3 vietnam={vietnam} english={english} typeExercise={true}/>
                                    :
                                    null
                            }
                            {/*<TypeExercise vietnam={vietnam} english={english}/>*/}
                            {_renderQuestion()}
                            <View style={{...stylesF6.view_next_back_f6}}>
                                <TouchableOpacity
                                    onPress={() => _prevCarousel()}
                                >
                                {causeIndex > 0 && <Image
                                        source={{uri: 'previous'}}
                                        style={{
                                            width: SmartScreenBase.smBaseWidth * 100,
                                            height: SmartScreenBase.smBaseWidth * 100,
                                            resizeMode: 'contain',
                                        }}
                                    />}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => _nextCarousel()}
                                >
                                {causeIndex < dataCarousel.length-1 && <Image
                                        source={{uri: 'next'}}
                                        style={{
                                            width: SmartScreenBase.smBaseWidth * 100,
                                            height: SmartScreenBase.smBaseWidth * 100,
                                            resizeMode: 'contain',
                                        }}
                                    />}
                                </TouchableOpacity>
                            </View>
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
                                        btnCheck ? _btnCheck() : btnRedo ? _btnRedo() : btnContinue ? _btnContinue() : null
                            }
                        </View>
                }
            </View>
    );
};

export default ReadingF6;
