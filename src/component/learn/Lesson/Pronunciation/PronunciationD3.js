import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import {
    View, Text, ActivityIndicator, ImageBackground, Dimensions,
    TouchableOpacity, Image, FlatList, Slider, Modal, Alert, BackHandler,
} from 'react-native';
import stylesApp from '../../../styleApp/stylesApp';
import styleButton from '../../../../../src/styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {useSelector} from 'react-redux';
import FileSound4 from '../FileSound4';
import SoundQuestion from '../../../SoundQuestion';
import LogBase from '../../../../base/LogBase';
import EventBus from 'react-native-event-bus';

const {width, height} = Dimensions.get('window');
const smartScreen = SmartScreenBase.smPercenHeight;
let editdata = [];
let data;
let datacheck = [];
let pointScore = 0;
let countTrue = 0;
const PronunciationD3 = (props) => {
    const {lesson_id, modeF, dataContent} = props;
    const [modalSuccess, setModalSuccess] = useState(false);
    const [playSound, setPlaySound] = useState(false);
    const [sound, setSound] = useState('');
    const [dataQuestion, setDataQuestion] = useState('');
    const [dataIndexQuestion, setDataIndexQuestion] = useState(0);
    const [listQuestion, setListQuestion] = useState('');
    const [typeButton, settypeButton] = useState(0);
    const [numberChoole, setnumberChoole] = useState(0);
    const [checked, setchecked] = useState(false);
    const [headeranswer, setheaderanswer] = useState(false);
    const [dataanswer, setdataAnswer] = useState({});
    const [loading, setloading] = useState(true);
    const [questionType, setquestionType] = useState('');
    const [Soundtest, setSoundtest] = useState(false);
    const [statusSound, setstatusSound] = useState('');
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const AudioRef = useRef();


    useEffect(() => {
        _getDataQuestion();
    }, []);

    useEffect(() => {
        if (dataQuestion) {
            pointScore = 0;
            editdata = dataQuestion[dataIndexQuestion].list_option;
            editdata.map((item, index) => {
                item.choole = false;
                item.itemchecked = false;
                return editdata;
            });
            let j, x, i;
            for (i = editdata.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = editdata[i];
                editdata[i] = editdata[j];
                editdata[j] = x;
            }
            countTrue = 0;
            editdata.forEach(item => {
                countTrue += parseFloat(item.score) > 0 ? 1 : 0;
            });
            console.log("=====editdata",editdata)
            setListQuestion(editdata);
        }
    }, [dataIndexQuestion, dataQuestion]);

    useEffect(() => {
        if (listQuestion) {
            console.log("=====listQuestion",dataIndexQuestion,listQuestion)
            let soundF = listQuestion[0].content_question ?? '';
            soundF = JSON.parse(soundF);
            if (soundF) {
                let contentQuestionAudio = soundF.content_question_audio ?? '';
                setSound(contentQuestionAudio);
            }
        }
    }, [dataIndexQuestion, listQuestion]);
    const _onsetAnswer = (item) => {
        let editdata = dataQuestion[dataIndexQuestion].list_option[item];
        if (!editdata.choole === true) {
            if (numberChoole === countTrue) {
                Alert.alert('Thông Báo', 'Bạn đã chọn đủ số đáp án', [
                    {text: 'Đồng ý', style: 'cancel'},
                ]);
            } else {
                editdata.choole = !editdata.choole;
                setnumberChoole(numberChoole + 1);
            }
        } else {
            editdata.choole = !editdata.choole;
            setnumberChoole(numberChoole - 1);
        }
    };

    const _getDataQuestion = async () => {
        data = dataContent;
        if (data.status) {
            setDataQuestion(data.data_question);
            setquestionType(data.data_question[dataIndexQuestion].list_option[dataIndexQuestion].question_type);
        }
        setloading(false);
    };

    const backgroundColor = (choole, check, check2) => {
        let color;
        if (choole == '') {
            color = '#fff';
        } else {
            color = '#fff';
        }
        if (choole == true) {
            if (check2 == true) {
                color = '#EE5555';
            }
            if (check == true) {
                color = '#C6E50E';
            }
        }
        return color;
    };
    const borderColor = (choole, check, check2) => {
        let color;
        if (choole == '') {
            color = '#C6E50E';
        } else {
            color = '#C6E50E';
        }
        if (choole == true) {
            if (check2 == true) {
                color = '#FFF';
            }
            if (check == true) {
                color = '#FFF';
            }
        }
        return color;
    };
    const uri = (choole, check, check2) => {
        let uri;
        if (choole == false) {
            uri = 'pronunication03_03';
        } else {
            uri = 'tick';
        }
        if (choole == true) {
            if (check2 == true) {
                uri = 'pronunication03_02';
            }
            if (check == true) {
                uri = 'pronunication03_02';
            }
        }
        return uri;
    };
    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                disabled={checked}
                // disabled={notification == true && editdata.choole == false? true : false}
                onPress={() => _onsetAnswer(index)}
                style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: smartScreen * 1.5,
                        borderWidth: 1,
                        borderRadius: smartScreen * 1.7,
                        width: '45%',
                        margin: '2%',
                        height: smartScreen * 6,
                        flexDirection: 'row',
                        backgroundColor: backgroundColor(item.choole, item.itemcheck, item.itemchecked2),
                        borderColor: borderColor(item.choole, item.itemcheck, item.itemchecked2),
                    }}
            >
                <Image source={{uri: uri(item.choole, item.itemcheck, item.itemchecked2)}}
                       style={{
                           width: '20%',
                           marginTop: '-2%',
                           height: SmartScreenBase.smBaseWidth * 100,
                           resizeMode: 'contain',
                       }}
                />
                <View style={{
                    width: '70%',
                    marginTop: '-2%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    resizeMode: 'contain',
                }}>
                    <Text style={{color: '#000'}}>{item.match_option_text[0]}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    const _RenderItem = ({item, index}) => {
        return (
            <View style={{margin: 10, alignItems: 'center'}}>
                <View style={{
                    width: '70%',
                    borderColor: '#C6E50E',
                    height: SmartScreenBase.smBaseWidth * 130,
                    borderWidth: 1,
                    borderRadius: smartScreen * 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    resizeMode: 'contain',
                    backgroundColor: '#FFF',
                }}>
                    <Text style={{color: '#000', textAlign: 'center'}}>{item.value}: {item.xplain}</Text>
                </View>
            </View>
        );
    };
    const dataBody = () => {
        LogBase.log("=====datacheck",datacheck)
        var dataSaveList = []
        dataQuestion.forEach((ele, index) => {
            var mono = {
                question_id: ele.question_id,
                exercise_type: 'pronunciation',
                question_type: questionType,
                question_score: pointScore,
                final_user_choice: datacheck[index].choice,
                detail_user_turn: [
                    {
                        num_turn: '1',
                        score: pointScore,
                        user_choice: datacheck,
                    },
                ],
            }
            dataSaveList.push(mono)
        });
        LogBase.log("=====dataBody",dataSaveList)
        props.saveLogLearning(dataSaveList);
    };

    useEffect(()=>{
        props.saveLogLearning([]);
        datacheck = [];
    },[])
// Click kiểm tra 
    const _checkQuestion = async () => {
        try{
        setchecked(true);
        let Datacore = [];
        let Choole = [];
        let arraymuonlay = [];
        let index = dataIndexQuestion + 1;
        if (typeButton == 0) {
            AudioRef.current.stopAudio();
            setPlaySound(false)
            setSoundtest(true);
            settypeButton(1);
            setModalSuccess(!modalSuccess);
            let count = 0;
            let check = 0;
            dataQuestion[dataIndexQuestion].list_option.map((item, index) => {
                Choole = item.choole;
                Datacore = item.score;
                item.itemcheck;
                item.itemchecked2;
                if (Datacore>0) {
                    check++;
                }
                if (Choole && 0 < Datacore) {
                    count++;
                    item.itemcheck = true;
                    datacheck.push({
                        score: 1,
                        choice: item.match_option_text[0]
                    })
                }
                if (Datacore <= 0 && Choole) {
                    item.itemchecked2 = true;
                    datacheck.push({
                        score: 0,
                        choice: item.match_option_text[0]
                    })
                }
            });
            pointScore = count/check;
            if (pointScore === 1) {
                setstatusSound(true);
            } else {
                setstatusSound(false);
            }
        } else if (typeButton == 1) {
            console.log("=====_checkQuestion 2",typeButton)
            settypeButton(2);
            setheaderanswer(true);
            dataQuestion[dataIndexQuestion].list_option.map((item, index) => {
                if (item.score != 0) {
                    let oj = {};
                    oj.value = item.match_option_text[0];
                    oj.status = true;
                    oj.xplain = item.option_explain;
                    arraymuonlay.push(oj);
                    setdataAnswer(arraymuonlay);
                }
            });
        } else {
            console.log("=====_checkQuestion 3",typeButton)
            if (dataIndexQuestion < dataQuestion.length-1) {
                settypeButton(0);
                props.setIndexQuestion(dataIndexQuestion + 1)
                setDataIndexQuestion(dataIndexQuestion + 1);
                // setDataQuestion(data.data_question);
                setheaderanswer(false);
                setPlaySound(false)
                setSoundtest(false)
                setstatusSound('')
                setdataAnswer({})
                setchecked(false)
                setnumberChoole(false)
            } else {
                dataBody();
            }
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    };

    const onPlay = () => {
        AudioRef.current.playAudio();
        setPlaySound(!playSound);
    };

    return (
        <View
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            {
                loading == false ?
                    headeranswer == false ?
                        <View style={{flex: 1}}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: smartScreen * 3,
                            }}>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            onPlay();
                                        }}
                                    >
                                        {
                                            !playSound ?
                                                <Image source={{uri: 'lesson_vocab_image18'}} style={{
                                                    width: smartScreen * 8,
                                                    height: smartScreen * 8,
                                                    marginTop: smartScreen * 2,
                                                }}/>
                                                :
                                                <Image source={{uri: 'lesson_vocab_image19'}} style={{
                                                    width: smartScreen * 8,
                                                    height: smartScreen * 8,
                                                    marginTop: smartScreen * 2,
                                                }}/>
                                        }
                                    </TouchableOpacity>
                                </View>
                                <SoundQuestion
                                    playSound={() => setPlaySound(false)}
                                    ref={AudioRef}
                                    Audio={sound}
                                    cardFormat={'pro3'}
                                />
                                <FlatList
                                    data={listQuestion}
                                    renderItem={_renderItem}
                                    numColumns={2}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                {
                                    statusSound === true ?
                                        <FileSound4 showImage={'true'}/>
                                        :
                                        statusSound === false ?
                                            <FileSound4 showImage={'false'}/>
                                            :
                                            null
                                }
                            </View>
                        </View>
                        :
                        <View style={{flex: 1}}>
                            <View>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    fontFamily: 'iCielSoupofJustice',
                                    margin: SmartScreenBase.smPercenHeight * 2,
                                }}>
                                    Đáp án đúng là:
                                </Text>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <FlatList
                                    data={dataanswer}
                                    width='100%'
                                    height='70%'
                                    renderItem={_RenderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                    :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                        <View>
                            <Text style={{color: '#fff'}}>
                                Vui lòng chờ trong giây lát...
                            </Text>
                        </View>
                    </View>
            }
            <View style={{
                position: 'absolute',
                bottom: smartScreen * 3,
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    disabled={numberChoole > 0 ? false : true}
                    style={numberChoole > 0 ? styleButton.Sty_Button : styleButton.Sty_Button_disable}
                    onPress={() => _checkQuestion()}
                >
                    <Text style={styleButton.Sty_Text_Button}>{checked == false ? 'KIỂM TRA' : 'TIẾP TỤC'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PronunciationD3;
