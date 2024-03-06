import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Alert
} from 'react-native';
import Loading from '../../../../screens/LoadingScreen';
import axios from 'axios';
import TypeExercise from '../Component/TypeExercise'
// import { FlatList } from 'react-native-gesture-handler';
import FileSound from '../FileSound';
import FileSound4 from '../FileSound4';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { ReadingD7AcitonNew } from '../../../../redux/actions/readingD7ActionNew';
import EventBus from 'react-native-event-bus'
import API from '../../../../API/APIConstant';
import SmartScreenBase from "../../../base/SmartScreenBase";

const AdjustLabel = ({
    fontSize, text, style, numberOfLines
}) => {
    const [currentFont, setCurrentFont] = useState(fontSize);
    return (
        <Text numberOfLines={ numberOfLines }
        adjustsFontSizeToFit
        style={ [style, { fontSize: currentFont }] }
        onTextLayout={ (e) => {
          const { lines } = e.nativeEvent;
          if (lines.length > numberOfLines) {
            setCurrentFont(currentFont - 1);
          }
        } }>{ text }</Text>
    )
};

// import FileSound4 from "../FileSound4";
const { width, height } = Dimensions.get('window')
import stylesButton from '../../../../styleApp/stylesApp';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
const Reading7new = (props) => {
    const { modeF, lesson_id, group_id } = props;
    const [question, setQuestion] = useState([])
    const [answer, setAnswer] = useState([])
    const [finalResult, setFinalResult] = useState([])
    const [clickA, setClickA] = useState(null);
    const [numberAnswer, setNumberAnswer] = useState(0);
    const [textButton, setTextButton] = useState('kiểm tra');
    const [loadding, setLoading] = useState(false);
    const [textQuestion, setTextQuestion] = useState('');
    const testing = useSelector(state => state.TesttingReducer.testing)
    const [checkResult, setCheckResult] = useState(false);
    const [numberSuccess, setNumberSuccess] = useState(0);
    const [numberAgain, setNumberAgain] = useState(0);
    const [end, setEnd] = useState(false);
    const [showWebView, setShowWebView] = useState(false);
    const [string, setString] = useState('');
    const [vi, setVi] = useState(false);
    const [threads, setThreads] = useState('');
    const [data, setData] = useState('')
    const [dataPost, setDataPost] = useState({});
    const [bodyPost, setBodyPost] = useState([]);
    const [idLog, setIdLog] = useState({});
    const [dislable, setDislable] = useState(true);
    const [buttonDislable, setButtonDislable] = useState(true)
    const dataRedux = useSelector(state => state.readingD7NewReducer.reading);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const dispatch = useDispatch();
    const [showLast,setShowLast] = React.useState(false);

    useEffect(() => {
        if (testing == 'aftertest') {
            setAnswer(dataRedux.answer);
            setQuestion(dataRedux.question);
            setFinalResult(dataRedux.final);
            setNumberSuccess(dataRedux.numberSucess);
            setCheckResult(true)
            setLoading(true);
            setDislable(false)
        } else {
            _getData()
        }
        props.saveLogLearning([]);
    }, [])
    const _getData = async () => {
        let ressponse = {};
        ressponse['data'] = props.dataContent;
        let dataConvert = await _convertData(ressponse.data.data_question[0].list_option);
        setData(ressponse.data.data_question[0].list_option[0])
        setThreads(ressponse.data.data_question[0].list_option[0].group_content)
        setTextQuestion(ressponse.data.lesson.lesson_paragraph);
        setQuestion(dataConvert.question);
        setFinalResult(dataConvert.final);
        console.log(ressponse.data);
        let random = await dataConvert.answer;
        var j, x, i;
        for (i = random.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = random[i];
            random[i] = random[j];
            random[j] = x;
        }
        _convertDataPost(ressponse.data)
        await setDataPost(ressponse.data)
        // if (testing == 'homeword') {
        //     _postDataFirt(ressponse.data);
        // }
        //console.log('ressponse', ressponse)
        setAnswer(random);
        setLoading(true);

    };
    
    const _convertDataPost = (data) => {
        let body = [...bodyPost];
        let dataP = { ...data };
        dataP.data_question.map((item, index) => {
            let oj = {}
            oj.question_id = item.question_id;
            oj.question_type = item.list_option[0].question_type;
            oj.question_score = 0;
            oj.final_user_choice = [];
            oj.exercise_type = 'reading';
            oj.detail_user_turn = []
            body.push(oj);
        });
        setBodyPost(body)
    }
    const _convertData = (data) => {
        let dataconvert = {};
        let dataQuestion = [];
        let dataAnswer = []
        let dataFilnal = []
        try{
        data.map((item, index) => {
            let ojQuestion = {}
            let ojAnswer = {}
            ojQuestion.option_explain = item.option_explain
            ojQuestion.value = item.option_text;
            ojQuestion.color = 'yellow';
            ojQuestion.margin = -width / 20;
            ojQuestion.opacity = false;
            ojQuestion.choose = false;
            ojAnswer.value = item.match_option_text[0];
            dataQuestion.push(ojQuestion);
            dataAnswer.push(ojAnswer);
            dataFilnal.push(ojAnswer)
        })
        dataconvert.question = dataQuestion;
        dataconvert.answer = dataAnswer;
        dataconvert.final = dataFilnal;
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
        return dataconvert;
    };

    const _postDataAnswer = async () => {
        props.saveLogLearning(bodyPost);
    };

    const _changeA = (index) => {
        let data = [...question]
        data.map((item, number) => {
            data[number].choose = false
            data[number].opacity = false
            if (index == number) {
                data[number].opacity = true;
                data[number].choose = true
            }
        })
        setQuestion(data)
        setClickA(index)
    };

    const _changeB = (index) => {
        let number = 0;
        let data = [...question]
        if (clickA != null) {
            let array = [...answer];
            let a = array[index]
            array[index] = array[clickA];
            array[clickA] = a;
            data[index].margin = -width / 5.4
            setAnswer(array)
            data.map((item, int) => {
                data[int].opacity = false;
                data[int].choose = false
                if (item.margin == -width / 5.4) {
                    number = number + 1;
                }
                if (int === index) {
                    data[index].choose = true
                }
            })
        }
        if (number == answer.length) {
            setButtonDislable(false)
        }
        setNumberAnswer(number)
        setClickA(null)
        setQuestion(data)
    };

    const _checkResult = () => {
        if (textButton == 'kiểm tra') {
            //props.hideFeedback();
            props.hideTypeExercise();
            _showResult()
            setNumberAgain(numberAgain + 1);
            setDislable(false)
            if (numberAgain >= 1) {
                props.showFeedback();
            }
        } else if (textButton == 'làm lại') {
            props.hideFeedback();
            props.showTypeExercise();
            _again()
        } else if (textButton == 'tiếp tục') {
            props.hideTypeExercise();
            _endGame()
        }
        else {
            props.hideFeedback();
            setTextButton('tiếp tục')
            setNumberAgain(numberAgain + 1)
            setShowLast(true);
        }
    };
    const _endGame = () => {
        if (testing == 'homeword') {
            _postDataAnswer()
        } else {
            props.methodScreen(7);
        }
    }

    const _showResult = async () => {
        let data = [...question]
        let number = 0
        answer.map((item, index) => {
            if (item.value != finalResult[index].value) {
                data[index].color = "#D80B0B"
            } else {
                data[index].color = "#388C02"
                number = number + 1
            }
            question[index].opacity = 1
        });
        await _pushDataPost(answer)
        if (modeF === 'exam' || modeF === 'mini_test') {
            await _testing(number, data)
            console.log(bodyPost)
            props.setDataAnswer(bodyPost)
        } else {
            if (testing != 'testing') {
                if (numberAgain < 1) {
                    if (number == question.length) {
                        setEnd(true)
                        setNumberSuccess(number)
                        setCheckResult(true);
                        setTextButton('tiếp tục');
                        props.showFeedback();
                    } else {
                        setCheckResult(true)
                        setQuestion(data)
                        setTextButton('làm lại')
                        setNumberSuccess(number)
                    }
                } else {
                    if (number == question.length) {
                        setEnd(true)
                        setNumberSuccess(number)
                        setCheckResult(true);
                        setTextButton('tiếp tục');
                    } else {
                        if (numberAgain == 1) {
                            setNumberSuccess(number);
                            setCheckResult(true);
                            setTextButton('xem kết quả');
                            setEnd(true);
                        } else {
                            setNumberSuccess(number);
                            setCheckResult(true);
                            setTextButton('tiếp tục');
                            setEnd(true);
                        }
                    }

                }
            } else {
                await _testing(number, data)
            }
        }
    };
    const _pushDataPost = (data) => {
        let convertPost = [...bodyPost];
        let oj = {};
        let array = [];
        let score = 0;
        let num = 0;
        data.forEach((Element) => {
            array.push(Element)
        })
        question.forEach((item, index) => {
            console.log(item.color)
            if (item.color == "#388C02") {
                num++;
            }
        })
        score = num / question.length;
        convertPost[0].final_user_choice = array;
        convertPost[0].question_score = score;
        oj.num_turn = numberAgain + 1
        oj.score = score;
        oj.user_choice = array
        convertPost[0].detail_user_turn.push(oj)
        setBodyPost(convertPost)
    }
    const _testing = async (number, data) => {
        let oj = {}
        oj.question = data;
        oj.answer = answer;
        oj.final = finalResult;
        oj.numberSucess = number
        await dispatch(ReadingD7AcitonNew(oj))
    }
    const _again = () => {
        console.log(123)
        let data = [...question];
        let array = [...answer]
        data.map((item, index) => {
            data[index].choose = false;
            data[index].opacity = false;
            data[index].color = 'yellow';
            data[index].margin = -width / 20;

        })
        setButtonDislable(true)
        setCheckResult(false)
        setAnswer(array)
        setQuestion(data)
        setTextButton('kiểm tra')
        setNumberAnswer(0);
        setDislable(true);
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
    const _changeImage = (index) => {
        if (question[index].color == '#D80B0B') {
            return 'matchingred'
        } else if (question[index].color == '#388C02') {
            return 'matchinggreen'
        } else {
            return 'matchingyellow'
        }
    };
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ width: "100%", marginBottom: 10, marginLeft: SmartScreenBase.smPercenWidth*2}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: width / 4, }}>
                    <ImageBackground source={{ uri: 'matchinggreen' }} style={{ position: 'absolute', zIndex: 1, width: width / 2.8, height: width / 4, resizeMode: 'contain', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.titleAnswerFlastList}>{question[index].value}</Text>
                    </ImageBackground>
                    <ImageBackground source={{ uri: 'matchingwhite' }} style={{ position: 'absolute', width: width / 2, height: width / 4, resizeMode: 'contain', justifyContent: 'center', alignItems: 'center', left: width / 3.5, zIndex: 0 }}>
                        <Text style={styles.titleResult} numberOfLines={5}>{finalResult[index].value}</Text>
                    </ImageBackground>
                    <Image source={{ uri: 'grammar1_4' }} style={styles.iconCheck} />
                </View>
                {/* <Text style={{ fontSize: 20, color: '#25988D', fontWeight: 'bold', marginTop: 15, textTransform:'uppercase'}}>
                    Giải thích:
                </Text>
                <Text style={{ fontSize: 18, fontStyle: 'italic', marginBottom: 10 }}>
                    {question[index].option_explain}
                </Text> */}
            </View>
        )
    }

    // console.log('numberAgain',numberAgain)
    // console.log('checkResult',checkResult)
    return (
        !loadding ?
            <Loading />
            :
            <View style={{ ...styles.container, flex: 1, marginTop: textButton == 'tiếp tục' ? 30 : 0, }}>
                {
                    !checkResult ?
                        <View style={{ marginBottom: height / 45, }}>
                            {/*<TypeExercise title={threads} onPress={_changeTitle} />*/}
                        </View>
                        :
                        numberAgain < 3 || numberSuccess == question.length ?
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <FileSound
                                showIcon={numberAgain>=2 || numberSuccess == question.length   ?null: 'none'}
                                showImage={numberSuccess == question.length ? 'true' : 'false'} />
                                <View style={{ width: width, justifyContent: 'center', alignItems: 'center', marginVertical: SmartScreenBase.smPercenHeight * 3}}>
                                    <Text style={[styles.titleSucess, {fontWeight: 'normal'}]}>Bạn đã trả lời đúng {numberSuccess} / {question.length}</Text>
                                </View>
                            </View>
                            :
                            <View style={{ width: '100%', paddingHorizontal: 15 }}>
                                <Text style={{fontFamily: 'iCielSoupofJustice', fontSize: 20, color: '#fff', marginBottom: 20 }}> Đáp án đúng là :</Text>
                            </View>


                }
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
                    {
                        !checkResult &&
                        <View style={{ ...styles.scrollViewQuestion }}  >
                            <ScrollView style={{ flexGrow: 1 }} nestedScrollEnabled persistentScrollbar={true}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >
                                    {
                                        <TextDownLine textBody={textQuestion}/>  
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    }
                    {
                        !end ?
                            <View style={{ ...styles.bodyContainer }}>
                                <View style={{ ...styles.bodyContent, marginLeft: buttonDislable ? 0 : SmartScreenBase.smPercenHeight * 5}}>
                                    <View style={{ height: '100%', width: width / 2.5, zIndex: 1 }}>
                                        {
                                            question.map((item, index) => {
                                                return (
                                                    dislable ?
                                                        <TouchableOpacity onPress={() => _changeB(index)} style={styles.buttonLeft}>
                                                            <Image source={{ uri: `${_changeImage(index)}` }} style={styles.imageLeft} />
                                                            <View style={styles.viewLeftContent}>
                                                                <Text style={styles.titleNumber}>{index + 1}</Text>
                                                                <View style={styles.viewTitleLeft}>
                                                                    <Text style={styles.titleLeft}>{item.value}</Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        :
                                                        <View style={styles.buttonLeft}>
                                                            <Image source={{ uri: `${_changeImage(index)}` }} style={styles.imageLeft} />
                                                            <View style={styles.viewLeftContent}>
                                                                <Text style={styles.titleNumber}>{index + 1}</Text>
                                                                <View style={styles.viewTitleLeft}>
                                                                    <Text style={styles.titleLeft}>{item.value}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={{ height: '100%', zIndex: 0, }}>
                                        {
                                            answer.map((item, index) => {
                                                return (
                                                    dislable ?
                                                        <View onStartShouldSetResponder={() => _changeA(index)} style={[styles.buttonRight,
                                                        {
                                                            marginLeft: question[index] && question[index].margin ? question[index].margin : -width / 20,

                                                        }]}>
                                                            <Image source={{ uri: question[index].choose ? 'matchingto' : 'matchingwhite' }} style={{ ...styles.imageRight, tintColor: question[index].opacity ? '#f3911e' : undefined }} />
                                                            <View style={styles.viewRightContent}>
                                                                <AdjustLabel fontSize={SmartScreenBase.smFontSize * 45} text={item.value} numberOfLines={5} style={styles.titleRight}/>
                                                            </View>
                                                        </View>
                                                        :
                                                        <View style={[styles.buttonRight,
                                                        {
                                                            marginLeft: question[index] && question[index].margin ? question[index].margin : -width / 20,

                                                        }]}>
                                                            <Image source={{ uri: 'matchingwhite' }} style={{ ...styles.imageRight, }} />
                                                            <View style={styles.viewRightContent}>
                                                                <AdjustLabel fontSize={SmartScreenBase.smFontSize * 45} text={item.value} numberOfLines={5} style={styles.titleRight}/>
                                                            </View>
                                                            {
                                                                checkResult &&
                                                                <Image source={{ uri: question[index].color == '#388C02' ? 'grammar1_4' : 'grammar1_3' }} style={styles.iconCheck} />
                                                            }
                                                        </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                                
                                {
                                    testing == 'testing' &&
                                    <TouchableOpacity style={buttonDislable ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} onPress={_showResult}>
                                        <Text style={stylesButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                                }
                                {
                                    testing == 'aftertest' &&
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={stylesButton.Sty_ShortButton} onPress={() => { _goback() }}>
                                            <Text style={stylesButton.Sty_Text_Button}>QUAY LẠI</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={stylesButton.Sty_ShortButton} onPress={() => { setEnd(!end) }}>
                                            <Text style={stylesButton.Sty_Text_Button}>GIẢI THÍCH</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={stylesButton.Sty_ShortButton} onPress={() => { _afterTest() }}>
                                            <Text style={stylesButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                            :
                            <View>
                                {
                                    textButton == 'xem kết quả' || numberSuccess == question.length ?
                                        <View style={{ ...styles.bodyContent, marginLeft: buttonDislable ? 0 : SmartScreenBase.smPercenHeight * 3}}>
                                            <View style={{ height: '100%', width: width / 2.5, zIndex: 1 }}>
                                                {
                                                    question.map((item, index) => {
                                                        return (
                                                            dislable ?
                                                                <TouchableOpacity onPress={() => _changeB(index)} style={styles.buttonLeft}>
                                                                    <Image source={{ uri: `${_changeImage(index)}` }} style={styles.imageLeft} />
                                                                    <View style={styles.viewLeftContent}>
                                                                        <Text style={styles.titleNumber}>{index + 1}</Text>
                                                                        <View style={styles.viewTitleLeft}>
                                                                            <Text style={styles.titleLeft}>{item.value}</Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                :
                                                                <View style={styles.buttonLeft}>
                                                                    <Image source={{ uri: `${_changeImage(index)}` }} style={styles.imageLeft} />
                                                                    <View style={styles.viewLeftContent}>
                                                                        <Text style={styles.titleNumber}>{index + 1}</Text>
                                                                        <View style={styles.viewTitleLeft}>
                                                                            <Text style={styles.titleLeft}>{item.value}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                            <View style={{ height: '100%', zIndex: 0 }}>
                                                {
                                                    answer.map((item, index) => {
                                                        return (
                                                            dislable ?
                                                                <View onStartShouldSetResponder={() => _changeA(index)} style={[styles.buttonRight,
                                                                {
                                                                    marginLeft: question[index] && question[index].margin ? question[index].margin : -width / 20,

                                                                }]}>
                                                                    <Image source={{ uri: question[index].choose ? 'matchingto' : 'matchingwhite' }} style={{ ...styles.imageRight, tintColor: question[index].opacity ? '#f3911e' : undefined }} />
                                                                    <View style={styles.viewRightContent}>
                                                                        <AdjustLabel fontSize={SmartScreenBase.smFontSize * 45} text={item.value} numberOfLines={5} style={styles.titleRight}/>
                                                                    </View>
                                                                </View>
                                                                :
                                                                <View style={[styles.buttonRight,
                                                                {
                                                                    marginLeft: question[index] && question[index].margin ? question[index].margin : -width / 20,

                                                                }]}>
                                                                    <Image source={{ uri: 'matchingwhite' }} style={{ ...styles.imageRight, }} />
                                                                    <View style={styles.viewRightContent}>
                                                                        <AdjustLabel fontSize={SmartScreenBase.smFontSize * 45} text={item.value} numberOfLines={5} style={styles.titleRight}/>
                                                                    </View>
                                                                    {
                                                                        checkResult &&
                                                                        <Image source={{ uri: question[index].color == '#388C02' ? 'grammar1_4' : 'grammar1_3' }} style={styles.iconCheck} />
                                                                    }
                                                                </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                        :
                                        <View >

                                            <FlatList
                                                data={answer}
                                                renderItem={_renderItem}
                                                extraData={answer}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </View>
                                }

                            </View>
                    }
                </ScrollView>

                {
                    testing == 'homeword' &&
                    <View style={{ marginVertical: 15 }}>
                        <TouchableOpacity style={buttonDislable ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} onPress={_checkResult} disabled={buttonDislable}>
                            <Text style={stylesButton.Sty_Text_Button}>{textButton.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    end &&
                    <View>
                        {
                            testing == 'testing' &&
                            <TouchableOpacity style={buttonDislable ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} onPress={_showResult}>
                                <Text style={stylesButton.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        }
                        {
                            testing == 'aftertest' &&
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity style={stylesButton.Sty_ShortButton} onPress={() => { _goback() }}>
                                    <Text style={stylesButton.Sty_Text_Button}>QUAY LẠI</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={stylesButton.Sty_ShortButton} onPress={() => { setEnd(!end) }}>
                                    <Text style={stylesButton.Sty_Text_Button}>GIẢI THÍCH</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={stylesButton.Sty_ShortButton} onPress={() => { _afterTest() }}>
                                    <Text style={stylesButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                }
                {
                    // textButton == 'làm lại' ?
                    //     <FileSound4 showImage={"false"} />
                    //     :
                    //     null
                }
            </View >
    )
};
const styles = StyleSheet.create({
    container: {
        height: height / 1.14,
        width: width,
        alignItems: 'center',
    },
    scrollViewContainer: {
        width: width,
        paddingBottom: height / 30,
        paddingHorizontal: 20,
    },
    scrollViewQuestion: {
        width: '100%',
        backgroundColor: '#fff',
        height: height / 3.5,
        padding: 15,
        borderRadius: 15,
        marginBottom: 25,
    },
    titleQuestion: {
        fontSize: 17,
        // fontWeight: '500'
    },
    bodyContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyContent: {
        width: '97%',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red'
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
        marginBottom: '0.2%'
    },
    titleNumber: {
        marginRight: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    viewLeftContent: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingLeft: '7%'
    },
    viewTitleLeft: {
        borderLeftWidth: 1.1,
        borderColor: '#4D4D4D',
        width: '72%'
    },
    titleLeft: {
        fontSize: width * 0.04,
        paddingLeft: 5,
        width: '100%',
        // fontWeight: '500'
    },
    buttonRight: {
        width: width / 1.5,
        height: width / 4
    },
    imageRight: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    viewRightContent: {
        position: 'absolute',
        width: '100%',
        paddingLeft: '22%',
        height: '100%',
        justifyContent: 'center'
    },
    titleRight: {
        paddingLeft: '7%',
        width: '70%',
    },
    buttonCheck: {
        width: width / 1.3,
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 15,
        backgroundColor: '#01283A',
        marginTop: 10,
        borderRadius: 25
    },
    buttonBack: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 15,
        backgroundColor: '#01283A',
        marginTop: 15,
        borderRadius: 25
    },
    titleCheck: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff'
    },
    ViewFlastList: {
        borderRadius: 15,
        marginTop: 25,
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        minHeight: height / 7
    },
    numberFlastList: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    titleAnswerFlastList: {
        fontSize: SmartScreenBase.smFontSize*45,
        paddingRight: SmartScreenBase.smPercenWidth*3,
        fontFamily: FontBase.MyriadPro_Bold,
        textAlign: 'center'
    },
    iconHand: {
        width: width / 15,
        height: width / 15,
        resizeMode: 'contain',
    },
    titleResult: {
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Bold,
        paddingRight: SmartScreenBase.smPercenWidth*5,
        color: '#388C02',
        paddingLeft: SmartScreenBase.smPercenWidth*9
    },
    titleSucess: {
        fontFamily:'iCielSoupofJustice',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    iconFace: {
        width: width / 3.5,
        height: width / 3.5,
        resizeMode: 'contain',
        position: 'absolute',
        top: -5,
        left: (width - (width / 3.5)) / 2
    },
    iconCheck: {
        position: 'absolute',
        width: SmartScreenBase.smBaseWidth*80,
        height: SmartScreenBase.smBaseWidth*80,
        right: SmartScreenBase.smPercenWidth*2,
        top: SmartScreenBase.smPercenWidth*8.5
    }
})
export default Reading7new
