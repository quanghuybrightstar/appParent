import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
    TextInput,
    Alert,
    Animated,
    TouchableOpacity,
    Keyboard,
    FlatList,
    Platform
} from 'react-native';
import axios from 'axios';
import TypeExercise from '../Component/TypeExercise';
import FileSound from '../FileSound';
import LoaddingScreen from '../../../../screens/LoadingScreen';
const { width, height } = Dimensions.get('window');
import Carousel from 'react-native-snap-carousel';
import EventBus from 'react-native-event-bus';
import ModalHint from '../../../modalHint';
import API from '../../../../API/APIConstant';
import { Reading11newAction } from '../../../../redux/actions/Reading11newAction';
// import { StatusTestingAciton } from '../../../../redux/actions/statusTestingAction'
import { useDispatch, useSelector } from 'react-redux'
import FileSound4 from "../FileSound4";
import Utils from '../../../../utils/stringUtils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stylesButton from '../../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import FontBase from '../../../../base/FontBase';
import stringUtils from '../../../../utils/stringUtils';
import TextDownLine from '../../../../componentBase/TextDownLine/TextDownLine';

const _window = Dimensions.get('window');

var statusM = 0;

const Readding11new = (props) => {
    const { modeF, lesson_id, group_id } = props;
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('')
    const [vi, setVi] = useState(false)
    const [dataQuestion, setDataQuestion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stringQuestion, setStringQuestion] = useState('');
    const [numberSuccess, setNunberSuccess] = useState(0);
    const [numberAnswer, setNumberAnswer] = useState(0);
    const [showKey, setShowKey] = useState(false);
    const [valueY, setValueY] = useState(0);
    const [dataAnswer, setDataAnswer] = useState([]);
    const [titleButton, setTitleButton] = useState('kiểm tra');
    const [numberAgain, setNumberAgain] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [clickHint, setClickHint] = useState(0);
    const [dataPost, setDataPost] = useState({});
    const [bodyPost, setBodyPost] = useState([]);
    const [idLog, setIdLog] = useState({});
    const [disabled, setDisabled] = useState(true)
    const [result, setResult] = useState(''); // đáp án
    const dataRedux = useSelector(state => state.Reading11NewReducer.data_answer);
    const testing = useSelector(state => state.TesttingReducer.testing);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const _scroll = React.useRef(null);
    const carousel = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        // Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        // Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        _getData()
        props.saveLogLearning([]);
        // return ()=>{
        //     Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        //     Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        // }
    }, []);

    useEffect(()=>{
        console.log(numberAgain,"-----gain")
    },[numberAgain])
    // const _keyboardDidShow = () => {
    //     setShowKey(true)
    //     setValueY( SmartScreenBase.smPercenHeight*20)
    //     // Animated.timing(valueY, {
    //     //     toValue: height / 17,
    //     //     duration: 200
    //     // }).start();
    //     if(_scroll.current){
    //         setTimeout(()=>{
    //             !!_scroll.current&&_scroll.current.scrollToEnd({animated:false});
    //         },100)
    //     }
    //     props.hideTypeExercise();
    // };

    // const _keyboardDidHide = () => {
    //     setShowKey(false)
    //     //setValueY( 0)
    //     // Animated.timing(valueY, {
    //     //     toValue: 0,
    //     //     duration: 200
    //     // }).start();
    //     console.log("======HS1",statusM)
    //     if(statusM == 0){
    //         props.showTypeExercise()
    //         console.log("======HS "+statusM)
    //     }
    // };

    const _getData = async () => {
        try{
        let ressponse = {};
        ressponse['data'] = props.dataContent;
        let convertData = await _convertData(ressponse.data.data_question)
        await setStringQuestion(ressponse.data.lesson.lesson_paragraph.replace(/(?:|\r)/g, ''));
        setDataQuestion(convertData);
        setData(ressponse.data.data_question[0].list_option[0]);
        setTitle(ressponse.data.data_question[0].list_option[0].group_content);
        _convertDataPost(ressponse.data);
        // console.log(ressponse.data);
        var listKQ = []
        ressponse.data.data_question.forEach(element => {
            listKQ.push(element.list_option[0].match_option_text)
        });
        setResult(listKQ)

        await setDataPost(ressponse.data);
        await setLoading(false)
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
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
            oj.final_user_choice = '';
            oj.exercise_type = 'reading';
            oj.detail_user_turn = []
            body.push(oj);
        });
        setBodyPost(body)
    };

    const _convertData = (data) => {
        let array = []
        let dataConvert = [];
        for (let i = 0; i < data.length; i++) {
            
            let content = data[i].list_option[0];
            let index = content.question_content.indexOf('.', 3)
            // console.log("=====question_content " + content.question_content)
            // console.log("=====index",index)
            let answer = [];
            let oj = {};
            oj.question = content.question_content;
            // console.log("=====question",oj.question)
            if (content.list_option_same != "") {
                if (JSON.parse(content.list_option_same).length > 0) {
                    JSON.parse(content.list_option_same).forEach(e => {
                        answer.push(e)
                    });

                }
            };
            answer.push(content.match_option_text);
            oj.answer = answer;
            if (content.hint) {
                oj.contenthint = content.hint;
            } else {
                oj.contenthint = [' '];
            }
            oj.answerHint = content.match_option_text;
            oj.explain = content.explain_parse.content_question_text;
            oj.lightHint = false;
            oj.checkStatus = true
            dataConvert.push(oj)
        }
        for (let i = 0; i < dataConvert.length; i++) {
            let oj = {};
            oj.value = '';
            oj.color = 'red';
            oj.question = dataConvert[i].question;
            oj.explain = dataConvert[i].explain;
            oj.choseHint = false;
            array.push(oj)
            setDataAnswer(array)
        }
        return dataConvert
    };
    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.ViewCarousel} key={index.toString()}>
                <View style={styles.viewNumberQuestion}>
                    <Text style={styles.titleNumberQuestion}>{index + 1}/{dataQuestion.length}</Text>
                </View>
                {
                    dataAnswer[index] && dataAnswer[index].choseHint &&
                    <View style={{ position: 'absolute', left: 0, top: -25 }}>
                        <Image
                            source={{ uri: dataAnswer[index] && dataAnswer[index].color == "green" ? 'grammar1_4' : 'grammar1_3' }}
                            style={{ width: 45, height: 45, resizeMode: 'contain', }}
                        />
                    </View>
                }
                <TextDownLine textBody={item.question}/> 
                {/* <Text style={styles.titleQuestion}>{item.question}</Text> */}
                <View style={styles.viewContentListQuestion}>
                    <Image style={styles.imagePencil} source={{ uri: 'lesson_grammar_image1' }} />
                    {
                        dataAnswer[index] && dataAnswer[index].choseHint ?
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '80%', borderBottomColor: '#303030', borderBottomWidth: 1 }}>
                                <Text style={{ color: dataAnswer[index].color, fontSize: 17, fontWeight: '700', paddingBottom: 2 }}>{dataAnswer[index].value?.trim()}</Text>
                            </View>
                            :
                            item.checkStatus ?
                                <TextInput
                                    placeholder="Trả lời"
                                    style={styles.inputAnswer}
                                    placeholderTextColor='#30303070'
                                    onChangeText={(text) => _changeText(text, index)}
                                    multiline={true}
                                    autoCorrect={false}
                                    value={dataAnswer[index] && dataAnswer[index].value ? dataAnswer[index].value : ''}
                                />
                                :
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '80%', borderBottomColor: '#303030', borderBottomWidth: 1 }}>
                                    <Text style={{ color: dataAnswer[index].color, fontSize: 17, fontWeight: '700', paddingBottom: 2 }}>{dataAnswer[index].value}</Text>
                                </View>

                    }

                </View>
            </View>
        )
    };

    const _renderFlastList = ({ item, index }) => {
        const quest = dataQuestion[index];
        console.log("=====_renderFlastList",item)
        return (
            <View style={{ ...styles.viewFlastListContent, borderColor: item.color, }}>
                <Text style={styles.titleFlastList}>{index + 1}.<Text style={{ fontWeight: '500' }}>{item.question}</Text>
                </Text>
                <Text style={{ ...styles.titleFlastList, 
                        paddingLeft: SmartScreenBase.smBaseWidth*100, 
                        marginTop: SmartScreenBase.smPercenHeight,
                        color: item.color,
                }}>
                    {item.value?.trim()}
                </Text>
                {
                    numberAgain >= 3&&item.color!='green'&&<View style={{ 
                        flexDirection: 'row', 
                        width: '100%', 
                        alignItems: 'center',
                        }}>
                        <Image source={{ uri: 'lesson_grammar_image3' }} 
                        style={{ 
                            width: SmartScreenBase.smBaseWidth*80,
                            height: SmartScreenBase.smBaseWidth*80, 
                            resizeMode: 'contain' 
                        }} />
                        <Text style={{ ...styles.titleFlastList, 
                                paddingLeft: SmartScreenBase.smBaseWidth*20, 
                                marginTop: SmartScreenBase.smPercenHeight,
                                width: SmartScreenBase.smPercenWidth*76, 
                                color: 'green'
                        }}>
                            {quest.answer[0]}
                        </Text>
                </View>
                }
                {
                    numberAgain >= 3 &&
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: SmartScreenBase.smFontSize*55, fontWeight: 'bold' }} >GIẢI THÍCH:</Text>
                        <Text style={{ fontSize:  SmartScreenBase.smFontSize*45,fontStyle:'italic' }}>{quest.explain}</Text>
                    </View>
                }
                <Image source={{ uri: item.color == 'red' ? 'grammar1_3' : 'grammar1_4' }} style={styles.iconFace} />
            </View>
        )
    };

    const _changeText = (text, index) => {
        setDisabled(true)
        let array = [...dataAnswer]
        let oj = {};
        oj.value = text;
        oj.color = 'red';
        oj.question = dataQuestion[index].question;
        oj.explain = dataQuestion[index].explain;
        oj.choseHint = false;
        array[index] = oj
        setDataAnswer(array)
        let number = 0;
        array.forEach((item) => {
            if (item) {
                if (item.value) {
                    number++

                }
            }
        })
        setNumberAnswer(number);
        setDataAnswer(array);
        if (number != 0) {
            setDisabled(false)
        }
    };

    const _checkTitleButton = async () => {
        if (titleButton == 'kiểm tra') {
            _checkResult()
        } else if (titleButton == 'làm lại') {
            _again()
        } else {

            _postDataAnswer();
        }
    };

    const _trimChar = (string) => {
        if (string) {
            string = string.replace('‘', '\'').replace(/[\u2018\u2019]/g, '\'');
            while (string.charAt(string.length - 1) === '.' || string.charAt(string.length - 1) === ',') {
                string = string.substring(0, string.length - 1).trim();
            }
            return string;
        };
        return '';
    };
    const _checkResult = async () => {
        let data = [...result];
        let array = [...dataAnswer];
        console.log("=====data",data)
        console.log("=====array",array)
        let numberSS = 0
        data.forEach((item, index) => {
            console.log("=====mono", Utils.validWord(array[index].value), Utils.validWord(item[0]))
            let isRig = item.find(c=>Utils.validWord(stringUtils.compareComma(c)) === Utils.validWord(stringUtils.compareComma(array[index].value))) != null;
            if(isRig){
                array[index].color = 'green';
                item.status = true;
                numberSS++
            }
        });

        await _pushDataPost(array);
        if (modeF === 'exam' || modeF === 'mini_test') {
            await _saveData(array, numberSS);
            await props.setDataAnswer(bodyPost)
        } else {
            if (testing == 'homeword') {
                props.hideTypeExercise()

                if (numberSS != dataQuestion.length) {
                    if (numberAgain >= 2) {
                        statusM = 1;
                        setTitleButton('tiếp tục');
                        setDataAnswer(array);
                        setNumberAgain(5);
                        setNunberSuccess(numberSS)
                        props.showFeedback();
                    } else {
                        setDataAnswer(array);
                        setTitleButton('làm lại');
                        setNumberAgain(numberAgain + 1)
                        setNunberSuccess(numberSS);

                    }
                } else {
                    setTitleButton('tiếp tục');
                    statusM = 1;
                    setDataAnswer(array);
                    setNumberAgain(5);
                    setNunberSuccess(numberSS);
                    props.showFeedback();
                }
            } else {
                await _saveData()
            }
        }

    };
    const _saveData = async (array, numberSS) => {
        let oj = {}
        oj.dataAnswer = array
        oj.numberSS = numberSS
        oj.dataQuestion = dataQuestion
        await dispatch(Reading11newAction(oj))
    }
    const _pushDataPost = (data) => {
        let convertBody = [...bodyPost];
        let array = [...dataAnswer];
        data.forEach((item, index) => {
            let oj = {};
            oj.num_turn = numberAgain + 1;
            oj.user_choice = item.value;
            oj.score = 0
            let number = 0
            //console.log(dataPost.data_question[index])
            if (item.color == 'green') {
                oj.score = dataPost.data_question[index].list_option[0].score
            }
            //console.log(oj);
            if (!item.choseHint) {
                convertBody[index].detail_user_turn.push(oj);
            }
            if (item.color == 'green') {
                array[index].choseHint = true;
                array[index].value = item.value
            }
        })
        convertBody.forEach((item, index) => {
            bodyPost[index].question_score = item.detail_user_turn[item.detail_user_turn.length - 1]?.score;
            bodyPost[index].final_user_choice = item.detail_user_turn[item.detail_user_turn.length - 1]?.user_choice;
        })
        //console.log('convertBody', convertBody)
        setDataAnswer(array)
        setBodyPost(convertBody)
    };
    const _again = () => {
        setDisabled(true)
        props.showTypeExercise()
        let data = [...dataAnswer];
        let dataQ = [...dataQuestion];
        data.forEach((item, index) => {
            if (!item.choseHint) {
                item.value = '';
                item.color = 'red'
            }
        })
        if (numberAgain == 1) {
            setDisabled(true)
            dataQuestion.forEach((item, index) => {
                dataQ[index].lightHint = true
                // setDisabled(false)
            })
            setDataQuestion(dataQ);
            setDataAnswer(data)
            setTitleButton('kiểm tra')
            setNunberSuccess(0);
            setNumberAnswer(0);
        } else {
            if (numberAgain < 2) {
                setDataAnswer(data)
                setTitleButton('kiểm tra')
                setNunberSuccess(0);
                setNumberAnswer(0);
            } else {
                let indexOf = dataAnswer.findIndex(element => { return element.choseHint == false });
                setClickHint(indexOf);
                let array = [...dataQuestion];
                array[indexOf].lightHint = false;
                setDataQuestion(array);
                setShowModal(true);
                props.show(true)
                setTitleButton('kiểm tra');
                setNunberSuccess(0);
                setNumberAnswer(0);


            }
        }
    };

    const _showModalHint = async (index) => {
        await setClickHint(index);
        let array = [...dataQuestion];
        array[index].lightHint = false;
        await setDataQuestion(array);
        setShowModal(true);
        props.show(false)
    };

    const _dataComback = async (value, bodyData) => {
        let data = [...dataQuestion]
        value.forEach((item, index) => {
            data[index].lightHint = !item.choseHint
            data[index].checkStatus = !item.choseHint
        })
       await setTitleButton('kiểm tra');
        setDataQuestion(data)
        setShowModal(false);
        props.show(false)
        setDataAnswer(value);
        setDisabled(false)
        let indexOf = value.findIndex(element => { return element.choseHint == false });
        if (indexOf == -1) {
            setNumberAnswer(value.length);
        }
        setBodyPost(bodyData);
        _checkResult()
    };
    const _dataNext = (value, bodyData) => {
        let data = [...dataQuestion]
        value.forEach((item, index) => {
            data[index].lightHint = !item.choseHint
            data[index].checkStatus = !item.choseHint
        })
        setDataQuestion(data)
        setDataAnswer(value);
        let indexOf = value.findIndex(element => { return element.choseHint == false });
        setClickHint(indexOf);
        let array = [...dataQuestion];
        array[indexOf].lightHint = false;
        setBodyPost(bodyData);
        setDisabled(false)
    }
    const _changeTitle = () => {
        if (!vi) {
            setVi(true);
            setTitle(data.group_content_vi)
        } else {
            setVi(false);
            setTitle(data.group_content)
        }
    }
    const _afterTest = () => {
        if (modeF === 'review_result') {
            props.nextReviewResult();
        }
    }
    const _goback = () => {
        if (modeF === 'review_result') {
            alert(2)
            props.prevReviewResult();
        }
    }
    const _result = () => {
        setNumberAgain(numberAgain == 0 ? 4 : 0)
    }
    const _gobackLesson = () => {
        setShowModal(false);
        props.show(false)
        props.navigation.goBack()
    }
    
    return (
        !loading ?
            <View style={styles.container}>
                {
                    titleButton != 'kiểm tra' ?
                        <View style={styles.headerContainer,{maxHeight : 50, 
                        marginTop: (numberSuccess == dataQuestion.length||numberAgain >= 3)? SmartScreenBase.smPercenHeight*13:0 
                        }}>
                            <View style={styles.viewSuccess}>
                                {
                                    numberAgain >= 3 &&
                                    <FileSound showImage={numberSuccess == dataQuestion.length ? 'true' : 'false'} />
                                }
                                <Text style={styles.titleSuccess}>Bạn đã trả lời đúng {numberSuccess}/ {dataQuestion.length}</Text>
                            </View>
                        </View>
                        : null
                }
                {
                    titleButton == 'kiểm tra' && !showModal ?
                        <View style={[{height: SmartScreenBase.smPercenHeight*74.5 - SmartScreenBase.smPercenWidth*20}]}>
                            {/* <ScrollView
                                ref={_scroll} */}
                                 {/* contentContainerStyle={{paddingBottom:valueY}}
                                 > */}
                                <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={150}>
                                <View style={[{ width, paddingHorizontal: 10 }]}>
                                    <View style={[styles.viewQuestionContainer]}>
                                        <ScrollView persistentScrollbar={true} nestedScrollEnabled>
                                            <View style={styles.viewQuestionContent}>
                                                {
                                                    <TextDownLine textBody={stringQuestion}/>                                
                                                }
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style={[styles.viewFlasListContainer, ]}>
                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width/20, marginTop: 10 }}>
                                        <TouchableOpacity onPress={() => carousel.current.snapToPrev()}>
                                            <Image source={{ uri: 'next' }} style={{ height: 40, width: 40, resizeMode: 'contain', transform: [{ rotate: '180deg' }] }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => carousel.current.snapToNext()}>
                                            <Image source={{ uri: 'next' }} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                    </View>
                                    <Carousel
                                        ref={carousel}
                                        data={dataQuestion}
                                        renderItem={_renderItem}
                                        sliderWidth={width}
                                        itemWidth={width - 60}
                                    />
                                </View>
                            {/* </ScrollView> */}
                            </KeyboardAwareScrollView>
                        </View>
                        :
                        !showModal &&
                        <View style={[{ 
                            width, paddingHorizontal: 10}, 
                            titleButton == 'làm lại' && {height: (Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight*83 : SmartScreenBase.smPercenHeight*83)-SmartScreenBase.smPercenWidth*20},
                            titleButton == 'tiếp tục' && {height: SmartScreenBase.smPercenHeight*67-SmartScreenBase.smPercenWidth*20}
                            ]}>
                            <FlatList
                                data={dataAnswer}
                                renderItem={_renderFlastList}
                                extraData={dataAnswer}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                }
                
                {console.log("=====gt "+titleButton+"|"+showModal)}
                {
                    !showModal &&
                    <View style={styles.viewButtonBottom}>
                        <TouchableOpacity style={disabled ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} onPress={_checkTitleButton} disabled={disabled}>
                            <Text style={stylesButton.Sty_Text_Button}>{titleButton.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    testing == 'testing' &&
                    <View style={styles.viewButtonBottom}>
                        <TouchableOpacity style={disabled ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} onPress={_checkResult} disabled={disabled}>
                            <Text style={stylesButton.Sty_Text_Button}>tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    testing == 'aftertest' &&
                    <View style={{ ...styles.viewButtonBottom, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ ...styles.buttonBottom, width: width / 4, paddingHorizontal: 5 }} onPress={_goback}>
                            <Text style={styles.titleButton}>quay lại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.buttonBottom, width: width / 3 }} onPress={_result}>
                            <Text style={styles.titleButton}>xem giải thích</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.buttonBottom, width: width / 4, paddingHorizontal: 5 }} onPress={_afterTest}>
                            <Text style={styles.titleButton}>tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                }

                <ModalHint
                    result={result}
                    showModal={showModal}
                    dataQuestion={dataQuestion}
                    dataAnswer={dataAnswer}
                    numberAgain={numberAgain}
                    numberClickHint={clickHint}
                    dataComeback={_dataComback}
                    dataNext={_dataNext}
                    dataBody={bodyPost}
                    dataPostParam={dataPost}
                    navigation={_gobackLesson}
                    isTeacher={props.isTeacher}
                />
                {
                    titleButton == 'làm lại' ?
                        <FileSound4 showImage={"false"} />
                        :
                        null
                }
            </View>
            :
            null
    )
};

const styles = StyleSheet.create({
    container: {
        width,
        height,
    },
    headerContainer: {
        height: height / 5.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    viewSuccess: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    imageFace: {
        width: width / 3.2,
        height: width / 3.2,
        top: '10%',
        resizeMode: 'contain'
    },
    titleSuccess: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'iCielSoupofJustice',
      //  fontWeight: 'bold'
    },
    viewQuestionContainer: {
        width: '100%',
        height: SmartScreenBase.smPercenHeight*30,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: SmartScreenBase.smPercenWidth*4,
    },
    viewQuestionContent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    titleQuestionContent: {
        fontSize: 17,
        // fontWeight: '500'
    },
    imageAladin: {
        position: 'absolute',
        right: 0, width: width / 4,
        height: width / 4,
        resizeMode: 'contain',
        bottom: -width / 6
    },
    viewFlasListContainer: {
        width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ViewCarousel: {
        marginTop: height / 21,
        backgroundColor: '#fff',
        width: '100%',
        height: height / 4.6,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    viewNumberQuestion: {
        width: width / 7,
        height: width / 7,
        borderColor: '#F7AC16',
        borderWidth: 2,
        borderRadius: 50,
        position: 'absolute',
        left: '45%',
        top: -width / 12,
        zIndex: 3,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleNumberQuestion: {
        fontSize: 24,
        fontWeight: '700'
    },
    inputAnswer: {
        fontSize: 17,
        fontWeight: '700',
        borderBottomWidth: 1,
        borderBottomColor: '#303030',
        color: '#8E1C76',
        width: '80%',
        paddingBottom: 2,
        alignItems: 'flex-start',
        maxHeight: width / 7
    },
    titleQuestion: {
        marginTop: '5%',
        width: '100%',
        fontSize: 18
    },
    viewContentListQuestion: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    imagePencil: {
        marginRight: 5,
        width: width / 7,
        height: width / 7,
        resizeMode: 'contain'
    },
    viewButtonBottom: {
        paddingTop:SmartScreenBase.smPercenHeight*2,
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonBottom: {
        width: width / 1.3,
        height: width / 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#01283A',
    },
    titleButton: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    viewFlastListContent: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 50,
        justifyContent: 'center'
    },
    titleFlastList: {
        fontSize: SmartScreenBase.smFontSize*50,
        fontFamily: FontBase.MyriadPro_Bold
        // width: '80%'
    },
    iconFace: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        position: 'absolute',
        top: -30,
        left: '48%'
    }
});

export default Readding11new
