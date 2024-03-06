import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    Slider,
    Modal,
    Animated,
} from 'react-native';
import styles from './style';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Header from './Header';
import API from '../../../../API/APIConstant';
import axios from 'axios';
import LoadingScreen from './../../../../screens/LoadingScreen';
import {useDispatch, useSelector} from 'react-redux';
import Sound from 'react-native-sound';
import FileSoundiconlog from '../FileSoundiconlog';
import StyleApp from '../../../../styleApp/stylesApp';

let dataCount = [];
let redo = 0;
let vietnam = '';
let english = '';

const smartScreen = SmartScreenBase.smPercenHeight;
const smartFont = SmartScreenBase.smFontSize;
const {width, height} = Dimensions.get('window');

const PronunciationF4 = (props) => {

    const {route, navigation, lesson_id, modeF, group_id, dataContent} = props;
    const [showBtn, setShowBtn] = useState(true);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
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
    const [disableBtnCheck, setDisableBtnCheck] = useState(true);
    const [numRight,setNumRight] = useState(0);

    const [logLearning, setLogLearning] = useState({
        'class_id': 1,
        'unit_id': 1,
        'curriculum_id': 1,
    });
    const [dataLog, setDataLog] = useState({});
    const [dataAnswer, setDataAnswer] = useState([]);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [optionText, setOptionText] = useState([]);

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
            let dataText = [...listText];
            let opText = [...optionText];
            dataText = [];
            opText = [];
            dataCount = [];
            vietnam = dataQuestion[dataIndexQuestion].list_option[0].group_content_vi;
            english = dataQuestion[dataIndexQuestion].list_option[0].group_content;
            dataQuestion[dataIndexQuestion].list_option.forEach(element => {
                opText.push(element.option_text);
                let result = element.match_option_text[0].split(',');
                result.forEach(item => {
                    let data = {};
                    data['match_option_text'] = item.trim();
                    data['option_text'] = element.option_text;
                    data['selected'] = '';
                    data['score'] = false;
                    dataText.push(data);
                });
            });
            dataText = _shuffle(dataText);
            setOptionText(opText);
            setListText(dataText);
            setIsLoading(false);
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")};
    }, [dataIndexQuestion, dataQuestion]);

    const _shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    const _setCheck = (index, value) => {
        let dataC = [...listText];
        dataC[index]['selected'] = value;
        setListText(dataC);
        let c = dataCount.indexOf(index);
        if (c === -1) {
            dataCount.push(index);
        }
        if (dataCount.length >= dataC.length) {
            setDisableBtnCheck(false);
        }
    };

    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.viewRenderItemF4}>
                <Text style={{...styles.textHeaderF4, fontSize: smartFont * 65}}>{item.match_option_text}</Text>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: smartScreen,
                    marginTop: smartScreen,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: width - smartScreen * 10,
                }}>
                    {
                        optionText.map((element,i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    style={{
                                        borderWidth: 2,
                                        borderRadius: smartScreen * 1.5,
                                        paddingLeft: smartScreen * 4,
                                        paddingRight: smartScreen * 4,
                                        paddingTop: smartScreen,
                                        paddingBottom: smartScreen,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderColor: item.selected === element ? '#FFF' : '#C6E50E',
                                        backgroundColor: item.selected === element ? '#F9E815' : '#FFF',
                                    }}
                                    onPress={() => _setCheck(index, element)}
                                >
                                    <Text style={{
                                        fontSize: smartFont * 45,
                                        color: '#4D4D4D',
                                        textAlign: 'center',
                                    }}>{element}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </View>
        );
    };

    const _renderItemCheck = ({item, index}) => {
        return (
            <View style={{
                ...styles.viewItemCheck,
                borderColor: '#FFF',
                backgroundColor: item.score ? '#C7E519' : '#EE5555',
            }}>
                <Text style={{fontWeight: 'bold', fontSize: smartFont * 45}}>{item.match_option_text}</Text>
            </View>
        );
    };

    const _renderItemScore = ({item, index}) => {
        return (
            <View style={{...styles.viewItemCheck, borderColor: '#FFF', backgroundColor: '#C7E519'}}>
                <Text style={{fontWeight: 'bold', fontSize: smartFont * 45}}>{item.match_option_text}</Text>
            </View>
        );
    };

    const _checkQuestion = () => {
        props.hideTypeExercise();
        let dataAns = [...dataAnswer];
        let dataA = {};
        dataA['question_id'] = dataQuestion[dataIndexQuestion].list_option[0].question_id;
        dataA['exercise_type'] = 'pronunciation';
        dataA['question_type'] = dataQuestion[dataIndexQuestion].list_option[0].question_type;
        dataA['question_score'] = 0;
        dataA['final_user_choice'] = [];
        let dataDetails = {};
        dataDetails['num_turn'] = 1;
        dataDetails['score'] = 0;
        dataDetails['user_choice'] = [];
        let dataCheck = {...score};
        let dataChoose = {...choose};
        let checkS = true;
        dataCheck = {};
        optionText.forEach((e) => {
            dataCheck[e] = [];
            dataChoose[e] = [];
        });
        let final_user_choice = '';
        let user_choice = '';
        let c = 0;
        listText.forEach(element => {
            final_user_choice += `${element.selected},`;
            user_choice += `${element.selected},`;
            let data = {};
            data['match_option_text'] = element.match_option_text;
            data['option_text'] = element.option_text;
            data['selected'] = element.selected;

            optionText.forEach((item) => {
                if (element.selected === item) {
                    data['score'] = element.selected === element.option_text ? true : false;
                    dataChoose[item].push(data);
                }
                if (element.option_text === item) {
                    dataCheck[item].push(data);
                }
            });
            if (!data['score']) {
                checkS = false;
            } else {
                c++;
            }
        });
        setNumRight(c);
        dataA['question_score'] = 1 / listText.length * c;
        dataDetails['score'] = 1 / listText.length * c;
        dataA['final_user_choice'] = final_user_choice;
        dataDetails['user_choice'] = user_choice;
        dataA['detail_user_turn'] = [];
        dataA['detail_user_turn'].push(dataDetails);
        dataAns.push(dataA);
        setDataAnswer(dataAns);
        if (modeF === 'exam' || modeF === 'mini_test') {
            props.setDataAnswer(dataAns);
        } else {
            setChoose(dataChoose);
            setModalSuccess(checkS);
            setStatus(checkS);
            setScore(dataCheck);
            setModalVisible(true);
            setShowBtn(false);
        }
    };

    const _renderError = () => {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: smartScreen * 10,
                width: width,
                height: smartScreen * 20,
            }}>
                <FileSoundiconlog showImage={'false'}/>
            </View>
        );
    };

    const _renderSuccess = () => {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: smartScreen * 10,
                width: width,
                height: smartScreen * 20,
            }}>
                <FileSoundiconlog showImage={'true'}/>
            </View>
        );
    };

    const _nextQuestion = () => {
        props.hideTypeExercise();
        if (modalSuccess) {
            let index = dataIndexQuestion + 1;
            if (dataQuestion[index]) {
                setDataIndexQuestion(dataIndexQuestion => dataIndexQuestion + 1);
                setModalVisible(false);
                setShowScore(false);
                setStatus('');
            } else {
                _saveLogLearning();
            }
        } else {
            setShowScore(true);
            setModalVisible(false);
        }
    };

    const _nextQuestionErr = () => {
        let index = dataIndexQuestion + 1;
        if (dataQuestion[index]) {
            setDataIndexQuestion(dataIndexQuestion => dataIndexQuestion + 1);
            setModalVisible(false);
            setShowScore(false);
            setStatus('');
        } else {
            _saveLogLearning();
        }
    };

    const _renderQuestion = () => {
        return (
            <View style={{...styles.viewListAnswer, marginBottom: smartScreen * 3}}>
                <FlatList
                    data={listText}
                    renderItem={_renderItem}
                    keyExtractor={(item,index) => index.toString()}
                    scrollEnabled={true}
                />
            </View>
        );
    };

    const _renderViewError = () => {
        return (
            <View style={{ 
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical:SmartScreenBase.smPercenHeight,
            }}>
                {
                    optionText.map((e,i) => {
                        return (
                            <View style={styles.viewScore} key={i}>
                                <View style={{
                                    backgroundColor: '#eaf3f6',
                                    height: SmartScreenBase.smPercenHeight*50,
                                    borderRadius: smartScreen * 2,
                                    overflow:'hidden'
                                }}>
                                    <View style={{alignItems: 'center', paddingTop: SmartScreenBase.smPercenHeight}}>
                                        <Text>{e}</Text>
                                    </View>
                                    <FlatList
                                        data={choose[e]}
                                        renderItem={_renderItemCheck}
                                        keyExtractor={(item,index) => index.toString()}
                                        scrollEnabled={true}
                                        style={{flex:1}}
                                    />
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        );
    };

    const _renderScore = () => {
        return (
            <View style={{...styles.viewShowScore, justifyContent: 'space-around'}}>
                {
                    optionText.map((e,i) => {
                        return (
                            <View style={styles.viewScore} key={i}>
                                <View style={styles.viewSco}>
                                    <View style={{alignItems: 'center', paddingTop: smartScreen * 2}}>
                                        <Text>{e}</Text>
                                    </View>
                                    <FlatList
                                        data={score[e]}
                                        renderItem={_renderItemScore}
                                        keyExtractor={(item,index) => index.toString()}
                                        scrollEnabled={true}
                                    />
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        );
    };

    return (
        <View style={{flex: 1}}>
            {
                isLoading ?
                    null
                    :
                    <View style={styles.containerLq}>
                        {
                            showScore ?
                                <Text style={{
                                    fontSize: smartScreen * 2,
                                    paddingTop: smartScreen * 3,
                                    padding: smartScreen,
                                    color: '#fff',
                                    fontFamily: 'iCielSoupofJustice',
                                    fontSize: SmartScreenBase.smFontSize * 60,
                                }}>
                                    ĐÁP ÁN ĐÚNG LÀ :
                                </Text>
                                :
                                null
                        }
                        {
                            showScore ?
                                _renderScore()
                                :
                                status === '' ?
                                    _renderQuestion()
                                    :<>
                                    <View style={{
                                        alignItems: 'center',
                                    }}>
                                        <View style={{
                                            height:SmartScreenBase.smBaseWidth * 350,
                                            marginVertical:SmartScreenBase.smPercenHeight/2,
                                            justifyContent:'center'
                                        }}>
                                            <FileSoundiconlog showImage={modalSuccess?'true':'false'}/>
                                        </View>
                                        <Text style={{
                                                fontSize:SmartScreenBase.smFontSize*60,
                                                color:'#fff',fontFamily: 'iCielSoupofJustice',
                                            }}>
                                            BẠN ĐÃ TRẢ LỜI ĐÚNG {numRight}/{listText.length}
                                        </Text>
                                    </View>
                                    {
                                        _renderViewError()
                                    }
                                    </>
                        }
                    </View>
            }
            {
                showBtn ?
                    <View style={{
                        ...styles.viewCheckF4,
                        width: '100%',
                        alignItems: 'center',
                        bottom: SmartScreenBase.smPercenHeight * 3,
                    }}>
                        <TouchableOpacity
                            disabled={disableBtnCheck}
                            style={disableBtnCheck ? StyleApp.Sty_Button_disable : StyleApp.Sty_Button}
                            onPress={_checkQuestion}
                        >
                            <Text style={StyleApp.Sty_Text_Button}>KIỂM TRA</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
            }
            {
                showScore ?
                    <View style={{
                        ...styles.viewCheckF4,
                        width: '100%',
                        alignItems: 'center',
                        bottom: SmartScreenBase.smPercenHeight * 3,
                    }}>
                        <TouchableOpacity
                            style={StyleApp.Sty_Button}
                            onPress={_nextQuestionErr}
                        >
                            <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
            }
            {
                modalVisible
                    ?
                    <View style={styles.viewModalF4}>
                        {/* {
                            modalSuccess
                                ?
                                _renderSuccess()
                                :
                                _renderError()
                        } */}
                        {modalSuccess || !redoView
                            ?
                            <View style={{
                                ...styles.viewCheckF4,
                                width: '100%',
                                alignItems: 'center',
                                bottom: SmartScreenBase.smPercenHeight * 3,
                            }}>
                                <TouchableOpacity
                                    style={StyleApp.Sty_Button}
                                    onPress={_nextQuestion}
                                >
                                    <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            redoView ?
                                <View style={{
                                    ...styles.viewCheckF4,
                                    width: '100%',
                                    alignItems: 'center',
                                    bottom: SmartScreenBase.smPercenHeight * 3,
                                }}>
                                    <TouchableOpacity
                                        style={StyleApp.Sty_Button}
                                        onPress={_nextQuestion}
                                    >
                                        <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                                </View>
                                : null
                        }
                    </View>
                    :
                    null
            }
        </View>
    );
};

export default PronunciationF4;
