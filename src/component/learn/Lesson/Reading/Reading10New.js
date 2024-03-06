import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    Alert,
    Animated,
    Keyboard,
    Platform
} from 'react-native';
import LoaddingScreen from '../../../../screens/LoadingScreen';
import axios from 'axios';
import TypeExercise from '../Component/TypeExercise';
import FileSound from '../FileSound';
import { ReadingD10Aciton } from '../../../../redux/actions/ReaddingD10Action';
import { useDispatch, useSelector } from 'react-redux';
import EventBus from 'react-native-event-bus';
import API from '../../../../API/APIConstant';
import SmartScreenBase from "../../../../base/SmartScreenBase";
import FileSound4 from "../FileSound4";
import Utils from '../../../../utils/stringUtils';
const { width, height } = Dimensions.get('window');
import stylesButton from '../../../../styleApp/stylesApp';
import FontBase from '../../../../base/FontBase';
import {Colors} from '../../../../styleApp/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


var statusM = 0;

const Reading10new = (props) => {
    const { modeF, lesson_id, group_id } = props;
    const [Loadding, setLoading] = useState(false);
    const [stringQuestion, setStringQuestion] = useState('');
    const [dataQuestion, setDataQuestion] = useState([]);
    const [dataAnswer, setDataAnswer] = useState([]);
    const [numberAnswer, setNumberAnswer] = useState(0);
    const [textButton, setTextButton] = useState('kiểm tra');
    const [checkAnswer, setCheckAnswer] = useState(false);
    const [numberSuccess, setNumberSuccess] = useState(0);
    const [numberAgain, setNumberAgain] = useState(0);
    const [data, setData] = useState('');
    const [vi, setVi] = useState(false);
    const [title, setTitle] = useState('');
    // const [testing, setTesting] = useState('homeword');
    const testing = useSelector(state => state.TesttingReducer.testing)
    const [showkey, setShowKey] = useState(false);
    const [dataPost, setDataPost] = useState({});
    const [bodyPost, setBodyPost] = useState([]);
    const [idLog, setIdLog] = useState({});
    const dataRedux = useSelector((state) => state.reading10Reducer.reading);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [valueY, setValueY] = useState(new Animated.Value(0));
    const [disabled, setDisabled] = useState(true)
    const dispack = useDispatch();
    const ScrollRef = useRef();
    useEffect(() => {
        if (testing == 'aftertest') {
            setDataQuestion(dataRedux.dataQuestion);
            setNumberSuccess(dataRedux.numberSuccess);
            setDataAnswer(dataRedux.dataAnswer);
            setCheckAnswer(true);
            setNumberAgain(2)
            setLoading(true);
        } else {
            _getData()
        }
        // Keyboard.addListener('keyboardDidShow', () => _showKeyBoad());
        // Keyboard.addListener('keyboardDidHide', () => _HideKeyBoad());
        props.saveLogLearning([]);
    }, []);
    const _showKeyBoad = () => {
        props.hideTypeExercise();
        Animated.timing(
            valueY,
            {
                toValue: height / 19,
                duration: 200,
            }
        ).start();
        setShowKey(true)
    };

    const _HideKeyBoad = () => {
        if(statusM == 0){
            props.showTypeExercise();
            Animated.timing(
                valueY,
                {
                    toValue: 0,
                    duration: 200,
                }
            ).start();
            setShowKey(false)
        }
    };

    const _getData = async () => {
        let ressponse = {};
        ressponse['data'] = props.dataContent;
        //console.log('ressponse',ressponse)
        let dataConvert = await _converData(ressponse.data.data_question[0].list_option)
        await setData(ressponse.data.data_question[0].list_option[0])
        await setTitle(ressponse.data.data_question[0].list_option[0].group_content)
        await setDataQuestion(dataConvert)
        console.log(ressponse.data);
        await setStringQuestion(ressponse.data.lesson.lesson_paragraph);
        _convertDataPost(ressponse.data)
        await setDataPost(ressponse.data)
        // if (testing == 'homeword') {
        //     _postDataFirt(ressponse.data);
        // }
        await setLoading(true);
    };

    const _postDataAnswer = async () => {
        props.saveLogLearning(bodyPost);
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
        setBodyPost(body);
    }
    const _converData = (data) => {
        let array = [];
        let dataConvert = []
        try{
        data.map((item, index) => {
            let oj = {};
            oj.question = item.option_text;
            oj.answer = item.match_option_text[0];
            oj.status = false;
            dataConvert.push(oj)
        })
        for (let i = 0; i < data.length; i++) {
            let oj = {};
            oj.answer = '';
            array.push(oj);
            setDataAnswer(array);
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
        return dataConvert;
    }
    const _changeText = (string, index) => {
        setDisabled(true)
        let array = [...dataAnswer];
        setNumberAnswer(array.length)
        let oj = {};
        oj.answer = string;
        array[index] = oj
        if (string != '') {
            setDisabled(false)
        }
        setDataAnswer(array)
    };
    const _checkClick = () => {
        // setTimeout(()=>{
        //     ScrollRef.current&&ScrollRef.current.scrollTo({ y: 0, animated: true })
        // },200)
        
        if (textButton == 'kiểm tra') {
            _checkAnswer()

        } else if (textButton == 'làm lại') {
            _again()
        } else {
            _endGame()
        }
    }
    const _endGame = () => {
        if (testing == 'homeword') {
            _postDataAnswer()
        } else {
            props.methodScreen(10)
        }
    }
    const _again = () => {
        setDisabled(true)
        props.showTypeExercise();
        let array = [...dataAnswer]
        array.forEach((item, index) => {
            console.log(item)
            let oj = {}
            oj.answer = '';
            if (item.color != "#EE5555") {
                oj.answer = item.answer
                oj.status = true
                // setDisabled(false)
            }
            oj.color = 'yellow'
            array[index] = oj
        })
        setDataAnswer(array);
        setNumberSuccess(0);
        setCheckAnswer(false);
        setTextButton('kiểm tra')
    };

    const _checkAnswer = async () => {
        let array = [...dataAnswer]
        let number = 0;
        array.forEach((item, index) => {
            // let trimChar = _trimChar(item.answer.toLowerCase().trim());
            // console.log(dataQuestion[index].answer.toLowerCase());
            if (Utils.validWord(item.answer) === Utils.validWord(dataQuestion[index].answer)) {
                let oj = {};
                oj.answer = item.answer;
                oj.color = '#BCD74F'
                array[index] = oj
                number = number + 1

            } else {
                let oj = {}
                oj.answer = item.answer;
                oj.color = '#EE5555'
                array[index] = oj
            }
        })
        console.log('arrAns', array);
        console.log('arrQ', dataQuestion);
        await _pushDataPost(array)
        if (modeF === 'exam' || modeF === 'mini_test') {
            await _saveData(array, number)
            props.setDataAnswer(bodyPost)
        }
        if (testing == 'homeword') {
            props.hideTypeExercise();
            if (number !== dataQuestion.length) {
                setNumberAgain(numberAgain + 1);
                if (numberAgain < 1) {
                    setNumberSuccess(number);
                    setCheckAnswer(true);
                    setDataAnswer(array);
                    setTextButton('làm lại');
                } else {
                    statusM = 1;
                    setNumberSuccess(number);
                    setCheckAnswer(true);
                    setDataAnswer(array);
                    setTextButton('tiếp tục');
                    props.showFeedback();
                }
            } else {
                statusM = 1;
                setNumberSuccess(number);
                setCheckAnswer(true);
                setDataAnswer(array);
                setTextButton('tiếp tục');
                props.showFeedback();
            }

        } else {

            await _saveData()
        }
    };
    const _pushDataPost = (data) => {
        let dataBody = [...bodyPost];
        let oj = {};
        let array = []
        let score = 0
        let number = 0;
        data.forEach((Element, index) => {
            array.push(Element.answer);
            if (Element.color == '#BCD74F') {
                number++
            }
        })
        console.log(data.length)
        score = number / data.length;
        dataBody[0].final_user_choice = array;
        dataBody[0].question_score = score;
        oj.num_turn = numberAgain + 1;
        oj.score = score;
        oj.user_choice = array
        dataBody[0].detail_user_turn.push(oj)
        setBodyPost(dataBody);
    }
    const _saveData = async (array, number) => {
        let oj = {};
        oj.dataQuestion = dataQuestion;
        oj.dataAnswer = array;
        oj.numberSuccess = number;
        await dispack(ReadingD10Aciton(oj));
        // await props.methodScreen(10);
    };

    const _changeTitle = () => {
        if (!vi) {
            setVi(true)
            setTitle(data.group_content_vi)
        } else {
            setVi(false)
            setTitle(data.group_content)
        }
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

    const renderQuestion = () => {
        return(
            <>
            <View style={styles.viewQuestion}>
                <ScrollView nestedScrollEnabled persistentScrollbar={true}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                        <TextDownLine textBody={stringQuestion}/>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bodyContent}>
            {
                dataQuestion.map((item, index) => {
                    return (
                            <View style={[styles.viewContent,]}>
                                <View style={styles.viewLeftContent}>
                                    <View style={styles.viewNumberContent}>
                                        <Text style={styles.titleNumber}>{index + 1}</Text>
                                    </View>
                                    <Text style={styles.titleContent}>{item.question}</Text>
                                </View>
                                <View style={[styles.viewRightContent, {
                                    backgroundColor: dataAnswer[index] && dataAnswer[index].status ? '#BCD74F' : 'yellow'
                                }]}>
                                    {
                                        !dataAnswer[index].status ?
                                            <View>
                                                <TextInput
                                                    style={styles.titleInput}
                                                    multiline={true}
                                                    autoCorrect={false}
                                                    returnKeyType="done"
                                                    blurOnSubmit={true}
                                                    autoCapitalize={'none'}
                                                    onChangeText={(text) => _changeText(text, index)}
                                                    value={dataAnswer[index] && dataAnswer[index].answer ? dataAnswer[index].answer : ''}
                                                />
                                            </View>
                                            :
                                            <Text style={styles.titleInput}>{dataAnswer[index].answer}</Text>
                                    }
                                </View>
                            </View>
                    )
                })
            }
        </View>
        </>
        );
    }

    const renderResult = () => {
        return(
            <View style={styles.bodyContent}>
            {
                dataQuestion.map((item, index) => {
                    // console.log(item)
                    return (
                        numberAgain < 2 ?
                            <View style={[styles.viewContent,]}>
                                <View style={styles.viewLeftContent}>
                                    <View style={styles.viewNumberContent}>
                                        <Text style={styles.titleNumber}>{index + 1}</Text>
                                    </View>
                                    <Text style={styles.titleContent}>{item.question}</Text>
                                </View>
                                <View style={[styles.viewRightContent, {
                                    backgroundColor: dataAnswer[index] && dataAnswer[index].color ? dataAnswer[index].color : 'yellow'
                                }]}>
                                    <Text style={styles.titleInput}>{dataAnswer[index].answer}</Text>
                                </View>
                            </View>
                            :
                            <View style={[styles.viewContent, {
                                borderColor: dataAnswer[index].color||'#EE5555',
                                borderWidth: 2,
                                marginBottom: 40,
                                paddingVertical: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white'
                            }]}>
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.titleNumber}>{index + 1}. <Text style={{ color: dataAnswer[index].color || '#EE5555',}}>{item.question} - <Text style={{ color: dataAnswer[index].color }}>{dataAnswer[index].answer}</Text></Text></Text>
                                    {
                                        dataAnswer[index].color != '#BCD74F'&&<View
                                            style={{flexDirection:'row',marginTop:SmartScreenBase.smPercenHeight}}
                                        >
                                            <Image
                                                    source={{uri: 'lesson_grammar_image3'}}
                                                    style={{
                                                        marginHorizontal: SmartScreenBase.smPercenWidth * 2,
                                                        width: SmartScreenBase.smBaseWidth * 50,
                                                        height: SmartScreenBase.smBaseWidth * 50,
                                                        resizeMode: 'contain',
                                                        marginTop: SmartScreenBase.smBaseHeight*6
                                                    }}
                                                />
                                            <Text style={[styles.titleNumber,{flex:1,color:'#BCD74F'}]}>{item.question} - {item.answer}</Text>
                                        </View>
                                    }
                                </View>
                                <Image source={{ uri: dataAnswer[index].color == '#BCD74F' ? 'grammar1_4' : 'grammar1_3' }}
                                    style={{ resizeMode: 'contain', width: width / 10, height: width / 10, position: 'absolute', top: -width / 17, }}
                                />
                            </View>
                    )
                })
            }
        </View>
        );
    }

    //console.log('testing', numberAgain);
    return (
        Loadding ?
            <View style={styles.container} 
            // onStartShouldSetResponder={() => Keyboard.dismiss()}
            >
                {
                    !checkAnswer ?
                        !showkey &&
                        null
                        :
                        <View style={{
                            height: SmartScreenBase.smPercenWidth*22,
                            justifyContent:'center',
                            alignItems: 'center',
                            marginTop: 30
                        }}>
                            <View style={{ alignItems: 'center', 
                                justifyContent: 'flex-end', 
                                height: SmartScreenBase.smPercenHeight*(numberAgain>=2||numberSuccess == dataQuestion.length?12:1) }}>
                                <FileSound 
                                showIcon={ numberAgain>=2||numberSuccess == dataQuestion.length?null: 'none'}
                                showImage={numberSuccess == dataQuestion.length ? 'true' : 'false'} />
                            </View>
                            <Text style={{
                                color: "white",
                                fontFamily: 'iCielSoupofJustice',
                                fontSize: 20,
                            }}>Bạn đã trả lời đúng {numberSuccess}/ {dataQuestion.length}</Text>
                        </View>
                }
                <Animated.View style={[styles.bodyContainer, { bottom: valueY, marginTop: 20}, 
                    textButton=="kiểm tra" && {height: SmartScreenBase.smPercenHeight * 71.5 - SmartScreenBase.smPercenWidth*23},
                    textButton=="làm lại" && {height: SmartScreenBase.smPercenHeight * 71.5 - SmartScreenBase.smPercenWidth*30},
                    textButton=="tiếp tục" && {height: SmartScreenBase.smPercenHeight * 71.5 - SmartScreenBase.smPercenWidth*25},
                    ]}>
                    {!checkAnswer ? 
                    <KeyboardAwareScrollView 
                        extraScrollHeight={Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight*20 : SmartScreenBase.smPercenHeight*13} 
                        showsVerticalScrollIndicator={false} 
                        enableOnAndroid={true} 
                        ref={ScrollRef}>

                        {renderQuestion()}
                    </KeyboardAwareScrollView> 
                    : <ScrollView>
                        {renderResult()}
                    </ScrollView>}
                </Animated.View>
                <View style={styles.viewBtn}>
                    {
                        testing == 'homeword' &&
                        <TouchableOpacity style={disabled ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} onPress={_checkClick} disabled={disabled}>
                            <Text style={stylesButton.Sty_Text_Button}>{textButton.toUpperCase()}</Text>
                        </TouchableOpacity>
                    }
                    {
                        testing == 'testing' &&
                        <TouchableOpacity style={disabled ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} onPress={_checkAnswer} disabled={disabled}>
                            <Text style={stylesButton.Sty_Text_Button}>TIẾP TỤC</Text>
                        </TouchableOpacity>
                    }
                    {
                        testing == 'aftertest' &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width, paddingHorizontal: 10 }}>
                            <TouchableOpacity style={styles.buttonAfterTest} onPress={_goback}>
                                <Text style={styles.titleButtonCheck}>Quay lại</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonAfterTest} onPress={_afterTest}>
                                <Text style={styles.titleButtonCheck}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {/* {
                        textButton == 'làm lại' ?
                            <FileSound4 showImage={"false"} />
                            :
                            null
                    } */}
                </View>
            </View>
            :
            null
    )
};
export default Reading10new;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width,
        height,
        // backgroundColor: "#f00"
    },
    HeaderContainer: {

        justifyContent: 'center'
    },
    bodyContainer: {
        paddingHorizontal: 10,
        width,
    },
    viewQuestion: {
        width: '100%',
        height: height / 3,
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 15,
        marginBottom: 30
    },
    titleQuestion: {
        fontSize: SmartScreenBase.smFontSize*50,
        fontFamily: FontBase.MyriadPro_Regular,
        color: Colors.Black
    },
    bodyContent: {
        width: '100%',
        marginBottom: 75,
        paddingTop: 30,
        // alignItems:'center',
        justifyContent: 'center'
    },
    viewContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        backgroundColor: '#ffffff85',
        borderRadius: 20,
        paddingVertical: 15,
        minHeight: 60,
        marginBottom: 20
    },
    viewLeftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    viewNumberContent: {
        width: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRightWidth: 1,
        borderRightColor: '#3c3c3c',
        marginRight: 10,
    },
    titleNumber: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    titleContent: {
        fontSize: SmartScreenBase.smFontSize*50,
        fontFamily: FontBase.MyriadPro_Regular,
        color: Colors.Black,
        width: '85%'
    },
    viewRightContent: {
        width: '48%',
        backgroundColor: 'yellow',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff'
    },
    titleInput: {
        paddingLeft: 10,
        fontSize: 20,
        paddingVertical: 5,
        // fontWeight: '700'
    },
    buttonCheck: {
        width: width / 1.1,
        height: height / 13,
        marginTop: 10,
        backgroundColor: '#01283A',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonAfterTest: {
        paddingHorizontal: 20,
        height: height / 13,
        marginTop: 10,
        backgroundColor: '#01283A',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleButtonCheck: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700'
    },
    titleSuccess: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'iCielSoupofJustice',
    },
    viewBtn: {
        marginTop: SmartScreenBase.smPercenHeight * 3
    }
});
