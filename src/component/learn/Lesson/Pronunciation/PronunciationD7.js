import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ImageBackground,
    TouchableOpacity,
    Image, FlatList,
    Modal,
    Alert,
    Dimensions, BackHandler, Animated,
} from 'react-native';
import Slider from "@react-native-community/slider";
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import styleButton from '../../../../../src/styleApp/stylesApp';
import Sound from 'react-native-sound';
import axios from 'axios';
import {useSelector} from 'react-redux';
import FileSoundiconlog from '../FileSoundiconlog';
import stringUtils from '../../../../utils/stringUtils';
import FontBase from '../../../../base/FontBase';
import LogBase from '../../../../base/LogBase';
import EventBus from 'react-native-event-bus';

const smartScreen = SmartScreenBase.smPercenHeight;
const {width, height} = Dimensions.get('window');
let timeOutValueSlider;
let btnItems = {btnItem: false};
let data;
let totalScore = 0, countTrue = 0;
var datacheck = []

const PronunciationD7 = (props) => {
    const [playSound, setPlaySound] = useState(false);
    const [valueSlider, setValueSlider] = useState(0);
    const [sound, setSound] = useState('');
    const [duration, setDuration] = useState(0);
    const [dataQuestion, setDataQuestion] = useState('');
    const [dataIndexQuestion, setDataIndexQuestion] = useState(0);
    const [listQuestion, setListQuestion] = useState('');
    const [translateQuestion, setTranslateQuestion] = useState(false);
    const [textTranslate, setTextTranslate] = useState('');
    const [TextEnglish, setTextEnglish] = useState('');
    const [number, setnumber] = useState(0);
    const [numberChoole, setnumberChoole] = useState(0);
    const [checked, setchecked] = useState(false);
    const [headeranswer, setheaderanswer] = useState(false);
    const [listText, setListText] = useState([]);
    const [listTextDT, setlistTextDT] = useState([]);
    const [Image1, setImage1] = useState(null);
    const [loading, setloading] = useState(true);
    const [questionType, setquestionType] = useState('');
    const [showImage, setshowImage] = useState('');
    const [check_Answer, setcheck_Answer] = useState(false);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    useEffect(() => {
        _getDataQuestion();

        const _listener = (data) => {
            sound && sound.pause();
            setPlaySound(false);
        };
        EventBus.getInstance().addListener("sound_should_pause", _listener)

        return()=>{
            EventBus.getInstance().removeListener("sound_should_pause", _listener)
        }
    }, []);

    useEffect(() => {
        if (sound) {
            BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', backAction);
            };
        }
    }, [sound]);
    const backAction = () => {
        sound.stop();
        props.goBack();
        return true;
    };

    useEffect(() => {
        if (listQuestion) {
            let dataText = {...listText};
            dataText = [];
            let dataTextDT = {...listTextDT};
            dataTextDT = [];
            let soundF = listQuestion[0].content_question ?? '';
            soundF = JSON.parse(soundF);
            if (soundF) {
                let contentQuestionAudio = soundF.content_question_audio ?? '';
                let soundN = new Sound(contentQuestionAudio, '',
                    (error) => {
                        if (error) {
                            console.log(error);
                        } else {
                            soundN.setNumberOfLoops(0);
                            setDuration(soundN.getDuration());
                            setSound(soundN);
                            // setPlaySound(true);
                        }
                    },
                );
            }
            let Datalist_option = dataQuestion[dataIndexQuestion].list_option[0];
            let question_content = Datalist_option.question_content;
            let option_textdata = Datalist_option.option_text;
            option_textdata = option_textdata.replace(/, /gi, ',');
            dataTextDT = option_textdata.split(',');
            question_content = question_content.replace(/,/gi, '');
            let result = question_content.split(' ');
            dataText['result'] = result;
            dataText = dataText['result'].toString();
            dataText = dataText.trim();
            dataText = dataText.split(',');
            dataText.map((item, index) => {
                let oj = {};
                oj.value = item;
                oj.choose = false;
                dataText[index] = oj;
            });
            countTrue = dataTextDT.length;
            setListText(dataText);
            LogBase.log("=====dataText",dataText)
            setlistTextDT(dataTextDT);
        }


    }, [listQuestion]);

    useEffect(() => {
        _playSound();
    }, [playSound]);

    useEffect(() => {
        _stopSound();
    }, [valueSlider]);
    useEffect(() => {
        if (dataQuestion) {
            let editdata = dataQuestion[dataIndexQuestion].list_option;
            editdata.map((item, index) => {
                item.choole = false;
                item.itemchecked = false;
                return editdata;
            });
            setListQuestion(editdata);
        }
    }, [dataIndexQuestion, dataQuestion]);

    const _onsetAnswer = (item) => {
        let editdata = listText[item];
        if (!editdata.choose === true) {
            if (numberChoole === countTrue) {
                Alert.alert('Thông Báo', 'Bạn đã chọn đủ số đáp án', [
                    {text: 'Đồng ý', style: 'cancel'},
                ]);
            } else {
                editdata.choose = !editdata.choose;
                setnumberChoole(numberChoole + 1);
                console.log("=====onItem ok")
            }
        } else {
            editdata.choose = !editdata.choose;
            setnumberChoole(numberChoole - 1);
        }
    };

    const _getDataQuestion = async () => {
        datacheck = []
        data = props.dataContent;
        if (data.status) {
            setDataQuestion(data.data_question);
            setTextEnglish(data.data_question[dataIndexQuestion].list_option[0].group_content);
            setTextTranslate(data.data_question[dataIndexQuestion].list_option[0].group_content_vi);
            setquestionType(data.data_question[dataIndexQuestion].list_option[0].question_type);
        }
        setloading(false);
    };

    useEffect(()=>{
        props.saveLogLearning([]);
    },[])

    // Tính điểm 
    const dataBody = () => {
        LogBase.log("=====datacheck",datacheck)
        var dataSaveList = []
        dataQuestion.forEach((ele, index) => {
            var mono = {
                question_id: ele.question_id,
                exercise_type: 'pronunciation',
                question_type: questionType,
                question_score: 0,
                final_user_choice: datacheck[index].choice,
                detail_user_turn: [
                    {
                        num_turn: '1',
                        score: datacheck[index].score,
                        user_choice: datacheck[index].choice,
                    },
                ],
            }
            dataSaveList.push(mono)
        });
        LogBase.log("=====dataBody",dataSaveList)
        props.saveLogLearning(dataSaveList);
    };

    const backgroundColor = (choose, value) => {
        const vl = stringUtils.validWord(value).replace('?', '')
        const Datafilter = listText.filter(item => item.choose == false);
        const DataChoosen = listText.filter(item => item.choose == true);
        let color;
        if (!checked) {
            if (!choose) {
                color = '#fff';
            } else {
                color = '#f9e815';
            }
        } else {
            if (!choose) {
                color = '#fff';
            } else if (listTextDT.find(item => stringUtils.validWord(item.replace('?', '')) == vl)) {
                color = '#D7DF01';
            } else {
                color = '#EE5555';
            }
        }
        return color;
    };
    const _renderItem = (item, index) => {
        return (
            <TouchableOpacity
                disabled={check_Answer}
                onPress={() => _onsetAnswer(index)}
                style={
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: smartScreen * 1.5,
                        borderWidth: 1,
                        borderRadius: smartScreen * 1.7,
                        marginHorizontal: '1%',
                        height: smartScreen * 4,
                        flexDirection: 'row',
                        backgroundColor: backgroundColor(item.choose, item.value),
                        borderColor: '#fff',
                        minWidth: SmartScreenBase.smPercenWidth * 20
                    }}
            >
                <View style={{
                    textAlign: 'center',
                    alignItems: 'center',
                    resizeMode: 'contain',
                }}>
                    <Text style={{
                        fontFamily: FontBase.MyriadPro_Bold,
                        fontSize: SmartScreenBase.smFontSize * 45,
                        color: '#000',
                        textAlign: 'center',
                        alignItems: 'center',
                        paddingLeft: SmartScreenBase.smPercenWidth * 2,
                        paddingRight: SmartScreenBase.smPercenWidth * 2,
                        justifyContent: 'center',
                    }}>{item.value}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const backgroundColor2 = (choose, value) => {
        value = value.replace(/[^a-zA-Z ]/g, "");
        let color = '#fff';
        let indexOf = listTextDT.find((c) => c.replace(/[^a-zA-Z ]/g, "") == value);
        color = indexOf ? '#D7DF01' : '#fff';
        return color;
    };
    const _AAArenderItem = ({item, index}) => {
        LogBase.log("=====_AAArenderItem",item)
        return (
            <View
                style={{
                    backgroundColor: backgroundColor2(item.choose, item.value),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: smartScreen * 1.5,
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderRadius: smartScreen * 1.7,
                    height: smartScreen * 4,
                    flexDirection: 'row',
                    marginRight: SmartScreenBase.smPercenWidth * 2,
                    minWidth: SmartScreenBase.smPercenWidth * 20
                }}
            >
                <View style={{
                    textAlign: 'center',
                    alignItems: 'center',
                    resizeMode: 'contain',
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: SmartScreenBase.smFontSize * 45,
                        color: '#000',
                        textAlign: 'center',
                        alignItems: 'center',
                        paddingLeft: SmartScreenBase.smPercenWidth * 2,
                        paddingRight: SmartScreenBase.smPercenWidth * 2,
                        justifyContent: 'center',
                    }}>{item.value}</Text>
                </View>
            </View>
        );
    };

    //Check Đúng sai
    const _checkQuestion = () => {
        LogBase.log("=====_checkQuestion")
        let numberchose = 0;
        sound && sound.stop();
        setPlaySound(false);
        setValueSlider(0);
        setchecked(true);
        setcheck_Answer(true);
        if (number == 0) {
            if (listTextDT.length !== listText.filter(item => item.choose).length) {
                LogBase.log("=====listTextDT:",listTextDT)
                LogBase.log("=====listText:",listText)
                setImage1('pronunication04_3');
                setshowImage(false);
                setnumber(number + 1);
                datacheck.push({
                    choice: "",
                    score: 0
                })
                LogBase.log("=====_checkQuestion 0.5")
            } else {
                LogBase.log("=====_checkQuestion 1")
                setnumber(number + 1);
                const Datafilter = listText.filter(item => item.choose == true);
                setImage1('pronunication_01_03');
                numberchose = numberchose + 1;
                setshowImage(true);
                var anserList = []
                var isRight = true
                Datafilter.forEach(item => {
                    LogBase.log("=====Datafilter",item.value)
                    LogBase.log("=====listTextDT",listTextDT)
                    if (listTextDT.find(c=>stringUtils.validWord(item.value.replace('?', '')) == stringUtils.validWord(c.replace('?', ''))) == null) {
                        isRight = false
                    }
                });
                if(isRight){
                    LogBase.log("=====_checkQuestion 2")
                    datacheck.push({
                        choice: "",
                        score: 1
                    })
                }else{
                    LogBase.log("=====_checkQuestion 3")
                    setImage1('pronunication04_3');
                    setshowImage(false);
                    datacheck.push({
                        choice: "",
                        score: 0
                    })
                }
            }
            //itemscore['scores'] = rs.data.overall_score;
            numberchose += numberchose;
            totalScore += numberchose/listTextDT.length;
        } else if (number == 1) {
            setnumberChoole(0);
            if (Image1 == 'pronunication_01_03') {
                _nextQuettion();
            } else {
                setheaderanswer(true);
            }
        }
        LogBase.log("=====_checkQuestion kq",datacheck)
    };

    const _nextQuettion = () => {

        setcheck_Answer(false);
        setshowImage('');
        if (dataIndexQuestion < dataQuestion.length - 1) {
            props.setIndexQuestion(dataIndexQuestion + 1);
            setPlaySound(false);
            if(sound && timeOutValueSlider){
                sound.setCurrentTime(0);
                sound.stop();
                clearInterval(timeOutValueSlider);
            }
            setValueSlider(0);
            setSound('');
            setnumber(0);
            setheaderanswer(false);
            setImage1(null);
            setchecked(false);
            setDataIndexQuestion(dataIndexQuestion + 1);
        } else {
            dataBody();
        }
    };
    const _playSound = () => {
        if (sound) {
            if (playSound) {
                console.log("====play")
                let timeInterval = 100;
                timeOutValueSlider = setInterval(() => {
                    setValueSlider(valueSlider => valueSlider + 0.1);
                }, timeInterval);
                sound.play(() => {
                    sound.setNumberOfLoops(0);
                    sound.stop();
                    // clearInterval(timeOutValueSlider);
                });
            } else {
                console.log("====stop")
                sound.pause();
                clearInterval(timeOutValueSlider);
            }
        } else {
            setPlaySound(false);
        }
    };

    const _stopSound = () => {
        if (valueSlider >= duration && sound || duration - valueSlider < 0.1 && sound) {
            setPlaySound(false);
            setValueSlider(0);
            sound.setCurrentTime(0);
            sound.stop();
            clearInterval(timeOutValueSlider);
        }
    };

    const _onValueChangeSlide = async (val) => {
        await setValueSlider(val);
        await sound.setCurrentTime(val);
        if (playSound) {
            sound.play();
        }
    };
    const Headerscreen = () => {
        return (
            <View>
                {/*<Header index={dataIndexQuestion} total={dataQuestion.length}/>*/}
                <View style={{
                    alignSelf: 'center',
                    width: SmartScreenBase.smPercenWidth * 85,
                    borderRadius: SmartScreenBase.smPercenWidth * 6,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                }}>
                    <View style={StyleLesson.Position_ImageType1}>
                        <Image source={{uri: 'lesson_image1'}} style={StyleLesson.Sty_ImageTyle_1}/>
                    </View>
                    <Text style={[StyleLesson.Sty_Text_Type_Lesson, {textAlign: 'left', zIndex: 1}]}>
                        {
                            translateQuestion
                                ?
                                textTranslate
                                :
                                TextEnglish
                        }
                    </Text>
                    <View style={StyleLesson.Position_ImageType2}>
                        <TouchableOpacity onPress={() => setTranslateQuestion(!translateQuestion)}>
                            <Image source={{uri: 'lesson_image2'}} style={StyleLesson.Sty_ImageTyle_2}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View style={{flex: 1}}>
            <View
                imageStyle={stylesApp.ImageBackGround}
                style={{flex: 1}}>
                {
                    loading == false ?
                        headeranswer == false ?
                            <View style={{flex: 1}}>
                                {/*<Header index={dataIndexQuestion} total={dataQuestion.length}*/}
                                {/*        goBack={() => backAction()} stopSound={() => console.log('pause')}/>*/}
                                <View style={{
                                    marginTop: smartScreen * 1.5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: smartScreen * 1.5,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: smartScreen * 5,
                                        marginBottom: smartScreen * 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => setPlaySound(!playSound)}
                                            >
                                                {
                                                    !playSound ?
                                                        <Image source={{uri: 'lesson_vocab_image18'}} style={{
                                                            resizeMode: 'contain',
                                                            width: smartScreen * 6,
                                                            height: smartScreen * 6,

                                                        }}/>
                                                        :
                                                        <Image source={{uri: 'lesson_vocab_image19'}} style={{
                                                            resizeMode: 'contain',
                                                            width: smartScreen * 6,
                                                            height: smartScreen * 6,
                                                        }}/>
                                                }
                                            </TouchableOpacity>
                                        </View>
                                        <Slider
                                            style={{width: width - (smartScreen * 14)}}
                                            minimumValue={0}
                                            maximumValue={duration}
                                            minimumTrackTintColor="#FFFFFF"
                                            maximumTrackTintColor="#FFFFFF"
                                            thumbTintColor="#FFFFFF"
                                            value={valueSlider}
                                            onValueChange={val => _onValueChangeSlide(val)}
                                        />
                                    </View>
                                    <View style={{width: SmartScreenBase.smPercenWidth*100 ,justifyContent: 'center' ,alignItems: 'center', 
                                        paddingHorizontal: SmartScreenBase.smPercenWidth*2}}>
                                        <View style={{flexDirection: "row" ,flexWrap: 'wrap'}}>
                                            {listText.map((mono, index)=>{
                                                return _renderItem(mono, index)
                                            })}
                                        </View>
                                    </View>
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
                                <View style={{width: SmartScreenBase.smPercenWidth*100 ,justifyContent: 'center' ,alignItems: 'center', 
                                paddingHorizontal: SmartScreenBase.smPercenWidth*2}}>
                                    <FlatList
                                        style={{flexWrap: 'wrap'}}
                                        width='100%'
                                        textAlign='center'
                                        alignItems='center'
                                        data={listText}
                                        renderItem={_AAArenderItem}
                                        numColumns={4}
                                        keyExtractor={(item, index) => index.toString()}
                                        extraData={listText}
                                    />
                                </View>
                                <View style={{
                                    position: 'absolute',
                                    bottom: smartScreen * 3,
                                    paddingHorizontal: smartScreen * 3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: width,
                                }}>
                                    <TouchableOpacity
                                        style={styleButton.Sty_Button}
                                        onPress={_nextQuettion}
                                    >
                                        <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        :
                        <View style={{
                            flex: 1,
                            zIndex: 10,
                            alignItems: 'center',
                        }}>
                            <ActivityIndicator size="large" color="#0000ff" marginTop='40%'/>
                            <Text style={{color: '#fff'}}>Vui lòng chờ trong giây lát...</Text>
                        </View>
                }
                {
                    headeranswer == true ?
                        null
                        :
                        <View style={{
                            position: 'absolute',
                            bottom: smartScreen * 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                width: width,
                                justifyContent: 'center',
                                alignItems: 'center',
                                resizeMode: 'contain',
                                bottom: smartScreen * 3,
                            }}>
                                {
                                    showImage !== '' ?
                                        <FileSoundiconlog showImage={showImage ? 'true' : 'false'}/>
                                        :
                                        null
                                }
                            </View>
                            <TouchableOpacity
                                disabled={numberChoole > 0 ? false : true}
                                style={numberChoole > 0 ? styleButton.Sty_Button : styleButton.Sty_Button_disable}
                                onPress={_checkQuestion}
                            >
                                <Text
                                    style={styleButton.Sty_Text_Button}>{checked == false ? 'KIỂM TRA' : 'TIẾP TỤC'}</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        </View>
    );
};

export default PronunciationD7;
