import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Animated,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';
import styles from '../Writting/Style/styleD6/style';
import styleButton from '../../../../../src/styleApp/stylesApp';
import StyleLesson from '../Writting/Style/styleD7/StyleLesson';
import stylesApp from '../Writting/Style/styleD7/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Header from './Header';
import API from '../../../../API/APIConstant';
import { WebView } from 'react-native-webview';
import axios from "axios";
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from "react-redux";
import Sound from "react-native-sound";
import FileSoundiconlog from "../FileSoundiconlog";
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
import EventBus from 'react-native-event-bus';

let dataCount = [];
let redo = 0;
let vietnam = '';
let english = '';
let totalScore = 0;
let dataCheck = [];
const smartScreen = SmartScreenBase.smPercenHeight;
const smartFont = SmartScreenBase.smFontSize;

const WrittingD6 = (props) => {

    const { navigation, modeF, lesson_id } = props;
    const [showBtn, setShowBtn] = useState(false);
    const [dataQuestion, setDataQuestion] = useState('');
    const [dataIndexQuestion, setDataIndexQuestion] = useState(0);
    const [translateQuestion, setTranslateQuestion] = useState(false);
    const [listText, setListText] = useState([]);
    const [score, setScore] = useState({});
    const [choose, setChoose] = useState({});
    const [status, setStatus] = useState('');
    const [showScore, setShowScore] = useState(false);
    const [redoView, setRedoView] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [option, setOption] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [imageStatus, setimageStatus] = useState('pronunication04_2');
    const [showWeb, setshowWeb] = useState(false);
    const [String, setString] = useState('');
    const [lessonId, setlessonId] = useState('');
    const [datalisson, setdatalisson] = useState([]);
    const [questionType, setquestionType] = useState('');
    const [idLog, setidLog] = useState([]);
    const [animatedValue, setanimatedValue] = useState(new Animated.Value(0));
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [sumRight, setSumRight] = useState(0);

    useEffect(() => {
        _getDataQuestion();
    }, [])

    useEffect(() => {
        try{
        if (dataQuestion) {
            setIsLoading(false);
            let dataText = [...listText];
            dataText = [];
            dataCount = [];
            vietnam = dataQuestion[dataIndexQuestion].list_option[0].group_content_vi;
            english = dataQuestion[dataIndexQuestion].list_option[0].group_content;
            let op = [...option];
            op = [];
            let random = []
            dataQuestion[dataIndexQuestion].list_option.forEach(element => {
                op.push(element.option_text);
                let result = element.match_option_text[0].split(',');
                result.forEach(item => {
                    let data = {};
                    data['match_option_text'] = item;
                    data['option_text'] = element.option_text;
                    data['selected'] = '';
                    data['score'] = false;
                    dataText.push(data);
                });
                random = dataText
                var j, x, i;
                for (i = random.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = random[i];
                    random[i] = random[j];
                    random[j] = x;
                }
            });
            setOption(op);
            setListText(random);
        }
    }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    }, [dataIndexQuestion, dataQuestion]);

    const _getDataQuestion = async () => {
        let res = {};
        res['data'] = props.dataContent;
        let data = res.data;
        setdatalisson(data);
        setlessonId(data.lesson.id);
        // _postDataFirt(data);
        if (data.status) {
            setDataQuestion(data.data_question);
            setquestionType(data.data_question[dataIndexQuestion].list_option[dataIndexQuestion].question_type);
        }
    };

    const _renderHeader = () => {
        return (
            <View style={{width: '100%', height: SmartScreenBase.smPercenHeight * 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'iCielSoupofJustice', color: "#ffffff", fontSize: SmartScreenBase.smFontSize*55}}>{"Bạn đã trả lời đúng "+sumRight+"/"+listText.length}</Text>
            </View>
        );
    }

    const _setCheck = (index, element) => {
        const copy = [...listText];
        copy[index].selected = element;
        setListText(copy);
        if (!listText.find(it => it.selected == '')) {
            setShowBtn(true);
        }
    };

    _moveWebView = (value) => {
        let title = value.split('.').join().split('“').join().split('?').join().split('”').join().split('!').join().split('"').join().split(':').join().replace(/(,)/g, '')
        EventBus.getInstance().fireEvent("modalTranslate", {
            modal: title.toLowerCase(),
            url: 'https://glosbe.com/en/vi/'
        })
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{
                backgroundColor: '#eaf4f7',
                borderRadius: smartScreen * 2,
                marginBottom: smartScreen * 3,
                
            }}>
                <View style={{
                    flexDirection: "row",
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                    marginLeft: SmartScreenBase.smPercenHeight * 1.5,
                    marginBottom: SmartScreenBase.smPercenHeight*1, 
                    flexWrap: 'wrap'
                }}>
                    {
                        item.match_option_text.split(' ').map((element, key) => {
                            return (
                                <View key={key}>
                                    <TouchableOpacity
                                        onLongPress={() => _moveWebView(element)}
                                        style={{ zIndex: 0, }}>
                                        <Text style={{fontFamily: FontBase.MyriadPro_Bold, fontSize: SmartScreenBase.smFontSize*50}}>
                                            {element}{' '}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={{ ...styles.viewStress, marginBottom: SmartScreenBase.smPercenHeight * 2 }}>
                    {
                        option.map((element) => {
                            return (
                                // <View style={styles.viewStrCh}>
                                    <TouchableOpacity
                                        style={{
                                            width: SmartScreenBase.smPercenWidth*40,
                                            paddingHorizontal: smartScreen * 1,
                                            // justifyContent: 'space-between',
                                            // alignItems: 'center',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: item.selected === element ? '#FFF' : '#C6E50E',
                                            backgroundColor: item.selected === element ? '#F9E815' : '#FFF',
                                            height: SmartScreenBase.smPercenHeight * 10
                                        }}
                                        onPress={() => _setCheck(index, element)}
                                    >
                                        <Text style={{
                                            paddingHorizontal: smartScreen * 1,
                                            fontSize: smartFont * 45,
                                            // paddingVertical: smartScreen * 1.5,
                                            alignItems: 'center',
                                            textAlign: 'center',
                                        }}>
                                            {element}
                                        </Text>
                                    </TouchableOpacity>
                                // </View>
                            )
                        })
                    }
                </View>
            </View>
        );
    };
    const _checkQuestion = () => {
        props.hideTypeExercise()
        if (modeF === 'exam' || modeF === 'mini_test') {
            exam_mini_test();
        } else {
            let dataCheck = { ...score };
            let dataChoose = { ...choose };
            let checkS = true;
            dataChoose = {};
            dataChoose['s'] = [];
            dataChoose['z'] = [];
            let total = 0;
            option.map(item => {
                listText.filter(element => {
                    return element.selected == item
                }).map(element => {
                    if (element.option_text != element.selected) {
                        setimageStatus('pronunication04_3');
                    }
                    if (element.option_text === element.selected) {
                        total = total + 1
                    }
                })
            });
            setSumRight(total)
            totalScore = total / listText.length;
            if (redo > 0) {
                setRedoView(false);
            } else {
                setRedoView(true);
            }
            setShowScore(true);
            setChoose(dataChoose);
            setStatus(checkS);
            setScore(dataCheck);
            setShowBtn(false);
        }
    };

    const exam_mini_test = () => {

        option.map(item => {
            dataCheck = item;
            console.log('123', dataCheck)
            {
                listText.filter(element => {
                    return element.selected == item
                }).map(element => {
                    console.log("hihi11233456", element.match_option_text);
                });
            }
        })
    }

    const _nextQuestionErr = () => {
        let index = dataIndexQuestion + 1;
        if (dataQuestion[index]) {
            setDataIndexQuestion(dataIndexQuestion => dataIndexQuestion + 1);
            setShowScore(false);
            setStatus('');
        } else {
            dataBody();
        }
    }

    useEffect(() => {
        props.saveLogLearning([]);
    }, [])

    const dataBody = () => {
        let dataFake = [{
            question_id: dataQuestion[0].question_id,
            exercise_type: 'Wirtting',
            question_type: questionType,
            question_score: totalScore,
            final_user_choice: dataQuestion[dataIndexQuestion].list_option[dataIndexQuestion].match_option_text[0],
            detail_user_turn: [
                {
                    num_turn: '1',
                    score: totalScore,
                    user_choice: dataQuestion[dataIndexQuestion].list_option[dataIndexQuestion].match_option_text[0],
                },
            ]
        }];
        props.saveLogLearning(dataFake);
    };

    const _renderQuestion = () => {
        return (
            <View style={{marginBottom: SmartScreenBase.smPercenHeight * 3, marginHorizontal: SmartScreenBase.smPercenHeight * 3}}>
                <FlatList
                    data={listText}
                    renderItem={_renderItem}
                    keyExtractor={(index) => index.toString()}
                    scrollEnabled={true}
                />
            </View>
        );
    }

    const _renderViewError = () => {
        return (
            <View style={{ height: '90%', top: smartScreen * 2 }}>
                <ScrollView>
                    <View style={[StyleLesson.Position_statusD6, { 
                        marginTop: SmartScreenBase.smBaseWidth * 60 ,
                        marginBottom:SmartScreenBase.smBaseWidth * 40 ,
                    }]}>
                        {
                            totalScore === 1 ?
                                <FileSoundiconlog showImage={"true"} />
                                :
                                <FileSoundiconlog showImage={"false"} />
                        }
                    </View>
                    {
                        option.map(item => {
                            return (
                                <View style={{ alignItems: 'center', marginBottom: smartScreen * 2 }}>
                                    <Text style={{
                                        color: '#fff',
                                        marginVertical: smartScreen * 1.5,
                                        fontSize: SmartScreenBase.smFontSize * 65,
                                        fontFamily: FontBase.MyriadPro_Bold
                                    }}>{item}</Text>
                                    <View style={{
                                        backgroundColor: '#fff',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginHorizontal: smartScreen * 2,
                                        width: '90%',
                                        borderRadius: smartScreen,
                                    }}>
                                        {
                                            listText.filter(element => {
                                                return element.selected == item
                                            }).map(element => {
                                                return (
                                                    <View style={{
                                                        backgroundColor: element.option_text == element.selected ? '#C6E50E' : '#EE5555',
                                                        justifyContent: 'center',
                                                        marginVertical: smartScreen * 1.5,
                                                        alignItems: 'center',
                                                        marginHorizontal: smartScreen * 2,
                                                        height: smartScreen * 5,
                                                        borderColor: '#fff',
                                                        borderRadius: smartScreen * 2,
                                                        width: '80%',
                                                    }}>
                                                        <Text style={{
                                                            fontWeight: 'bold',
                                                            textAlign: 'center'
                                                        }}>{element.match_option_text}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <View>
                {
                    isLoading == false ?
                        <View style={{ height: showScore ? smartScreen * 90 : smartScreen * 75}}>
                            <View style={[styles.containerLq, {marginBottom: showScore ? smartScreen * 19 : smartScreen * 10}]}>
                                {showScore && _renderHeader()}
                                {
                                    status === '' ?
                                        _renderQuestion() :
                                        _renderViewError()
                                }
                            </View>
                            <View style={{
                                position: 'absolute',
                                bottom: SmartScreenBase.smPercenHeight * 5,
                                paddingHorizontal: smartScreen * 3,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <TouchableOpacity
                                    disabled={showBtn ? false : true}
                                    style={showBtn ? styleButton.Sty_Button : styleButton.Sty_Button_disable}
                                    onPress={_checkQuestion}
                                >
                                    {
                                        modeF === 'exam' || modeF === 'mini_test' ?
                                            <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                            :
                                            <Text style={styleButton.Sty_Text_Button}>KIỂM TRA</Text>
                                    }
                                </TouchableOpacity>

                            </View>
                            {
                                showScore ?
                                    <View style={{
                                        position: 'absolute',
                                        bottom: SmartScreenBase.smPercenHeight * 5,
                                        paddingHorizontal: smartScreen * 3,
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <TouchableOpacity
                                            style={styleButton.Sty_Button}
                                            onPress={_nextQuestionErr}
                                        >
                                            <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    null
                            }
                        </View>
                        : <ActivityIndicator size="large" color="#0000ff" marginTop='40%' />
                }
                {/* {
                    showWeb == true ?
                        (
                            <View
                                style={{
                                    position: 'absolute',
                                    width: '80%',
                                    height: '60%',
                                    left: 12,
                                    backgroundColor: '#fff',
                                    zIndex: 1000,
                                    marginTop: '20%',
                                    marginLeft: '10%',
                                    borderRadius: 20,
                                }}>
                                <TouchableOpacity
                                    onPress={() => closeWebView()}
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#fff',
                                        position: 'absolute',
                                        top: -10,
                                        zIndex: 100,
                                        left: -10,
                                    }}>
                                    <Text
                                        style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>
                                        X
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ flex: 1 }}>
                                    <WebView
                                        source={{
                                            uri:
                                                'https://www.oxfordlearnersdictionaries.com/definition/english/' +
                                                String,
                                        }}
                                    />
                                </View>
                            </View>
                        )
                        :
                        null
                } */}
            </View>
        </View>
    );
};

export default WrittingD6;

