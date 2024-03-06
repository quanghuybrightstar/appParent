import React, { useState, useEffect } from 'react';
import styles from './style';
import {
    Modal,
    View,
    Text,
    Dimensions,
    TextInput,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Animated,
    Keyboard,
    LogBox,
    Platform
} from 'react-native';
import EventBus from 'react-native-event-bus';
import ModalTranSlate from '../modalTranslate';
import LoadingScreen from '../../screens/LoadingScreen';
import stylesButton from '../../styleApp/stylesApp';
const { width, height } = Dimensions.get('window');
import TypeExercise from '../learn/Lesson/Component/TypeExercise2';
import FileSound4 from '../../component/learn/Lesson/FileSound4';
import Utils from '../../utils/stringUtils';
import SmartScreenBase from '../../base/SmartScreenBase';
import LogBase from '../../base/LogBase';
import stringUtils from '../../utils/stringUtils';
import LessonBase from '../../base/LessonBase';
import TextDownLine from '../../componentBase/TextDownLine/TextDownLine';

const ModalHint = (props) => {
    const { dataQuestion, dataAnswer, numberAgain, showModal, numberClickHint, dataBody, dataPostParam, result } = props;
    const [index, setIndex] = useState(0);
    const [titleHint, setTitleHint] = useState('');
    const [titleCheering, setTitleChering] = useState('Hãy đọc đoạn văn có chứa thông tin để trả lời câu hỏi');
    const [numberAnswer, setNumberAnswer] = useState(0);
    const [loadding, setLoading] = useState(true);
    const [dataHint, setDataHint] = useState([]);
    const [titleButton, setTitleButton] = useState('kiểm tra');
    const [dataAnswerRequest, setDataAnswerRequest] = useState([]);
    const [arrayShowHint, setArrayShowHint] = useState([]);
    const [checkStatus, setCheckStatus] = useState(false);
    const [numberCheckResult, setNumberCheckResult] = useState(0);
    const [hint, setHint] = useState('');
    const [valueY, setValueY] = useState(new Animated.Value(0));
    const [showKey, setShowKey] = useState(false);
    const [bodyPost, setBodyPost] = useState(dataBody);
    const [dataPost, setDataPost] = useState(dataPostParam);
    const [disabled, setDisabled] = useState(true);
    const [textTrue, setTextTrue] = useState(false)
    const _scroll = React.useRef(null);
    useEffect(()=>{
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        return ()=>{
            Keyboard.removeListener("keyboardDidShow",_keyboardDidShow)
            Keyboard.removeListener("keyboardDidHide",_keyboardDidHide)
        }
    },[])

    useEffect(() => {
        let title;
        if (dataQuestion[numberClickHint].contenthint.length > 1) {
            title = dataQuestion[numberClickHint].contenthint.split(' ');
        } else {
            title = [" "]
        };
        setTitleHint(title);
        setNumberAnswer(0);
        setLoading(false);
        setIndex(numberClickHint);
        setTitleButton('kiểm tra');
        setDataAnswerRequest([]);
        setNumberCheckResult(0);
        setArrayShowHint([]),
        setBodyPost(dataBody)
        setDataHint([])
        setHint('');
        setCheckStatus(false);
        setDisabled(true)
    }, [numberClickHint]);

    const _keyboardDidShow = () => {
        setShowKey(true)
        if(_scroll.current){
            setTimeout(()=>{
                _scroll.current&&_scroll.current.scrollToEnd();
            },100)
        }
    };

    const _keyboardDidHide = () => {
        setShowKey(false)
    };
    const _changeText = (text, index) => {
        setDisabled(true)
        let arrayAnswer = [...dataAnswer];
        arrayAnswer[index].choseHint = true;
        arrayAnswer[index].value = text;
        setDataAnswerRequest(arrayAnswer);
        let dataShowHint = [...arrayShowHint];
        let array = arrayAnswer[index].value.split(' ');
        array.forEach((item, index) => {
            let oj = {};
            oj.value = array[index];
            oj.color = 'red';
            dataShowHint[index] = oj;
            setDisabled(false)
        })
        setArrayShowHint(dataShowHint);
    };
    const _checkButton = async () => {
        if (titleButton == 'kiểm tra') {
            _checkResultNew()
        } else if (titleButton == 'làm lại') {
            _again();
            setTitleChering('Gần chính xác rồi! Hãy xem các từ gợi ý cho câu trả lời')
        } else {
            _endGame();
            setTitleChering('Hãy đọc đoạn văn có chứa thông tin để trả lời câu hỏi')
        }
    };
    const _endGame = () => {
        if (numberAgain < 2) {
            console.log(1);
            props.dataComeback(dataAnswerRequest, bodyPost);
        } else {
            console.log(2);
            let checkindex = dataAnswerRequest.findIndex(e => e.choseHint == false);
            if (checkindex > -1) {
                console.log(3);
                props.dataNext(dataAnswerRequest, bodyPost)
            } else {
                console.log(4);
                props.dataComeback(dataAnswerRequest, bodyPost);
            }
        }
    }
    
    const _checkResultNew = async () => {
        console.log('arrayShowHint',arrayShowHint[0])
        setTextTrue(false)
        let arrayResult = [...result];
        let arrayAnswer = [...dataAnswerRequest];
        let ShowHint = [...arrayShowHint];
        let numberSS = 0;
        let numberArray = 0;
        
        arrayResult[index].forEach((item, index) => {
            let compare = Utils.validWord(item).split(' ');
            let numberTrue = 0;
            for (let i = 0; i < ShowHint.length; i++) {
                compare.forEach((string, number) => {
                    if (stringUtils.validWord(ShowHint[i].value) == stringUtils.validWord(string)) {
                        ShowHint[i].color = 'green'
                        numberTrue++
                    }
                });
                if (numberTrue == compare.length) {
                    numberArray = index;
                    numberSS = 100;
                    setTextTrue(true)
                }
            }
            if (numberTrue > numberSS) {
                numberArray = index
                numberSS = numberTrue
            }
        });
        await _pushDataPost()
        console.log("=====setHint",arrayResult[index][numberArray])
        if (numberCheckResult < 1) {
            if (numberArray > 0) {
                await setHint(arrayResult[index][numberArray]);
            } else if (numberSS == 100) {
                await setHint(arrayResult[index][numberArray]);
            } else {
                await setHint(arrayResult[index][numberArray]);
            }
        }
        console.log("=====Hint",hint)
        if (numberSS == 100) {
            let dataRequest = [...dataAnswerRequest];
            dataRequest[index].color = "green";
            setArrayShowHint(ShowHint);
            setCheckStatus(true);
            setDataAnswerRequest(dataRequest)
            setTitleButton('tiếp tục');
        } else {
            setNumberCheckResult(numberCheckResult + 1)
            setArrayShowHint(ShowHint);
            setTitleButton('làm lại');
            setCheckStatus(true);
            if (numberAnswer < 2) {
                setTitleButton('làm lại');
            } else {
                setTitleButton('tiếp tục')
            }
        }
    };

    // const _checkResult = async () => {

    //     if(result) { _checkResultNew(); return }

    //     console.log('arrayShowHint',arrayShowHint[0])
    //     setTextTrue(false)
    //     let arrayResult = [...dataQuestion];
    //     let arrayAnswer = [...dataAnswerRequest];
    //     let ShowHint = [...arrayShowHint];
    //     let numberSS = 0;
    //     let numberArray = 0;
        
    //     arrayResult[index].answer.forEach((item, index) => {
    //         let compare = Utils.validWord(item).split(' ');
    //         let numberTrue = 0;
           
    //         for (let i = 0; i < ShowHint.length; i++) {
    //             compare.forEach((string, number) => {
    //                 if (ShowHint[i].value.toLowerCase() == string.toLowerCase()) {
    //                     ShowHint[i].color = 'green'
    //                     numberTrue++
    //                 }
    //             });
    //             if (numberTrue == compare.length) {
    //                 numberArray = index;
    //                 numberSS = 100;
    //                 setTextTrue(true)
    //             }
    //         }
    //         if (numberTrue > numberSS) {
    //             numberArray = index
    //             numberSS = numberTrue
    //         }
    //     });
    //     await _pushDataPost()
    //     if (numberCheckResult < 1) {
    //         if (numberArray > 0) {
    //             await setHint(arrayResult[index].answer[numberArray]);
    //         } else if (numberSS == 100) {
    //             await setHint(arrayResult[index].answer[numberArray]);
    //         } else {
    //             await setHint(dataQuestion[index].answerHint);
    //         }
    //     }
    //     if (numberSS == 100) {
    //         let dataRequest = [...dataAnswerRequest];
    //         dataRequest[index].color = "green";
    //         setArrayShowHint(ShowHint);
    //         setCheckStatus(true);
    //         setDataAnswerRequest(dataRequest)
    //         setTitleButton('tiếp tục');
    //     } else {
    //         setNumberCheckResult(numberCheckResult + 1)
    //         setArrayShowHint(ShowHint);
    //         setTitleButton('làm lại');
    //         setCheckStatus(true);
    //         if (numberAnswer < 2) {
    //             setTitleButton('làm lại');
    //         } else {
    //             setTitleButton('tiếp tục')
    //         }
    //     }
    // };

    const _pushDataPost = () => {
        let value = [];
        let convertBody = [...bodyPost];
        let oj = {}
        oj.score = 0
        arrayShowHint.forEach((item, index) => {
            value.push(item.value)
        })
        result[index].forEach((item, index) => {
            if (item.toLowerCase() == value.join(' ').toLowerCase()) {
                oj.score = parseFloat(dataPost.data_question[index].list_option[0].score);
            }
        })
        oj.num_turn = parseInt(convertBody[index].detail_user_turn.length) + 1;
        oj.user_choice = value.join(' ');
        convertBody[index].detail_user_turn.push(oj)
        setBodyPost(bodyPost);
    }
    const _again = () => {
        let dataRequest = [...dataAnswerRequest]
        setNumberAnswer(numberAnswer + 1);
        dataRequest[index].value = "";
        _checkHint();
        setDataAnswerRequest(dataRequest);
        setDisabled(true)
        setTitleButton('kiểm tra')
    };

    const _checkHint = async () => {
        let ShowHint = [...arrayShowHint];
        let datahint = [...dataHint];
        LogBase.log("=====hint",hint)
        LogBase.log("=====ShowHint",ShowHint)
        LogBase.log("=====datahint",datahint)
        if (hint.split(' ').length == ShowHint.length) {
            var numberFinish = 0
            hint.split(' ').forEach(async (item, index) => {
                if (!datahint[index]) {
                    datahint[index] = undefined;
                }
                for (let i = 0; i < ShowHint.length; i++) {
                    if (item.toLowerCase() == ShowHint[i].value.toLowerCase()) {
                        ShowHint[i].color = 'green';
                        datahint[index] = ShowHint[i].value
                        numberFinish++
                    }
                    await setDataHint(datahint);
                }
            });
            if (numberFinish == hint.split(' ').length) {
                dataAnswerRequest[index].color = 'green'
                setTitleButton('tiếp tục');
            } else {
                dataAnswerRequest[index].color = 'red'
                setTitleButton('kiểm tra');
                _hint(datahint)
            }
            setArrayShowHint([]);
        } else {
            hint.split(' ').forEach(async (item, index) => {
                if (!datahint[index]) {
                    datahint[index] = undefined;
                }
                // for (let i = 0; i < ShowHint.length; i++) {
                    if (index < ShowHint.length && item.toLowerCase() == ShowHint[index].value.toLowerCase()) {
                        LogBase.log("item= "+item+"|ShowHint[index].value= "+ShowHint[index].value,"")
                        ShowHint[index].color = 'green';
                        datahint[index] = ShowHint[index].value
                        numberFinish++;
                    }
                    // await setDataHint(datahint);
                // }

            });
            dataAnswerRequest[index].color = 'red';
            setDataHint(datahint);
            setTitleButton('kiểm tra');
            LogBase.log("=====datahint",datahint)
            _hint(datahint);
            setArrayShowHint([]);
        };
    }
    const _random = () => {
        let data = hint.split(' ');
        return data[Math.floor(Math.random() * data.length)]
    }
    const _hint = async (datahint) => {
        let dataCheck = hint.split(' ');
        let addHint = [...datahint];
        var sumWordRigth = 0
        addHint.forEach(ele => {
            LogBase.log("=====ele",ele)
            if(ele) sumWordRigth = sumWordRigth + 1
        });
        
        if (numberAnswer < 1) {
            var number = 0
            var numberHint = await _setNumberHint(dataCheck)
            LogBase.log("=====numberHint",numberHint)
            LogBase.log("=====addHint",addHint)
            LogBase.log("=====sumWordRigth",sumWordRigth)
            LogBase.log("=====Math",Math.round(sumWordRigth/2))
            dataCheck.forEach((item, index) => {
                if (number < numberHint) {
                    if (!addHint[index]) {
                        addHint[index] = item
                        number++
                    }
                }
            })
            setDataHint(addHint);
            setCheckStatus(false);
        } else {
            dataCheck.forEach((item, index) => {
                addHint[index] = item
            })
            setDataHint(addHint);
            setCheckStatus(false);
        }
    }
    const _setNumberHint = (data) => {
        let number = 0;
        data.forEach((Element, index) => {
            if (arrayShowHint[index]) {
                if (Element.toLowerCase() == arrayShowHint[index].value.toLowerCase()) {
                    number++
                }
            }

        })
        let numberH;
        if (numberAnswer == 0) {
            numberH = (data.length - number) / 100 * 50
        } else {
            numberH = (data.length - number) / 100 * 100
        }
        return Math.round(numberH);
    }
    return (
        !loadding ?
            <Modal
                visible={showModal}
                animationType={'slide'}
                transparent={true}
                style={styles.container}
            >
            <ImageBackground
                source={{ uri: 'imagebackgroundlesson' }}
                imageStyle={{
                    width: SmartScreenBase.smPercenWidth * 100,
                    height: SmartScreenBase.smPercenHeight * 100,
                    resizeMode: 'cover',
                }}
                style={{ flex: 1 }}>
                <TypeExercise 
                    goBack={() => props.navigation()}
                    isTeacher={props.isTeacher} 
                    indexQuestion={numberClickHint} totalQuestion={props.dataAnswer.length} />
                <ScrollView
                    ref={_scroll}
                    style={[{
                            marginTop:SmartScreenBase.smPercenHeight*(showKey?0:15),
                            paddingHorizontal:SmartScreenBase.smPercenWidth*4,
                        }]}
                    >
                    <View style={{
                        flex:1,
                    }}>
                        <View style={styles.viewHint}>
                            <Image source={{ uri: 'lesson_grammar_image5' }} style={styles.iconLinght} />
                            <Text style={styles.titleCheering}>{titleCheering}</Text>
                        </View>
                        <View style={{ ...styles.viewContentHint,backgroundColor:'#fff' }}>
                            {/* <View style={{ 
                                flexDirection: 'row', 
                                flexWrap: 'wrap', 
                                width: '100%', 
                                paddingHorizontal: 15,
                            }}>
                                {
                                    titleHint.map((item, index) => {
                                        return (
                                            <TouchableOpacity onLongPress={() => LessonBase.goTranslate(item)}>
                                                <Text style={styles.titleHint}>{item} </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View> */}
                            <TextDownLine textBody={dataQuestion[numberClickHint].contenthint}/>
                            <View style={{ 
                                flexDirection: 'row', 
                                flexWrap: 'wrap', 
                                width: '100%', 
                                // justifyContent: 'center', 
                                marginTop: 3, 
                                paddingHorizontal: 7 
                            }}>
                                {
                                    dataHint.map((item, index) => {
                                        return (
                                            <View style={{ ...styles.viewTitleHint, paddingHorizontal: 7, paddingVertical: item ? 7 : 7,minWidth:width/9 }}>
                                                <Text style={{ ...styles.titleHint, fontWeight: '500',textAlign:'center' }}>
                                                    {item}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={{ ...styles.viewValueHintContainer,backgroundColor:'#fff' }}>
                            <View style={styles.viewNumber}>
                                <Text style={styles.titleButton}>{index + 1}</Text>
                            </View>
                            {
                                titleButton != 'kiểm tra' &&
                                <View style={{ position: 'absolute', right: 0, top: -25 }}>
                                    <Image
                                        source={{ uri: textTrue ? 'grammar1_4' : 'grammar1_3' }}
                                        style={{ width: 45, height: 45, resizeMode: 'contain', }}
                                    />
                                    <FileSound4 showImage={textTrue ? 'true' : 'false'} />
                                </View>
                            }
                            <TextDownLine textBody={dataQuestion[index].question}/>
                            <View style={styles.viewAnswerContent}>
                                <Image style={styles.imagePencil} source={{ uri: 'lesson_grammar_image1' }} />
                                {
                                    !checkStatus ?
                                        <TextInput
                                            placeholder="Trả lời"
                                            style={styles.inputAnswer}
                                            placeholderTextColor='#303030'
                                            multiline={true}
                                            autoCorrect={false}
                                            //autoCompleteType={false}
                                            onChangeText={(text) => _changeText(text, index)}
                                        />
                                        :
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '80%', borderBottomColor: '#303030', borderBottomWidth: 1 }}>
                                            {
                                                arrayShowHint.map((item, index) => {
                                                    return (
                                                        <Text style={{ color:'#8E1C76', fontSize: 17, fontWeight: '700', paddingBottom: 2 }}>{item.value} </Text>
                                                    )
                                                })
                                            }
                                        </View>
                                }
                            </View>
                        </View>
                        {
                            showKey&&Platform.OS==='ios'&&<View
                            style={{height:SmartScreenBase.smPercenHeight*50}}
                            ></View>
                        }
                    </View>
                </ScrollView>
                {
                    !showKey&&<View style={{ 
                        alignItems:'center',
                        paddingTop:SmartScreenBase.smPercenHeight*3,
                        paddingBottom:SmartScreenBase.smPercenHeight*2,
                    }}>
                        <TouchableOpacity style={disabled ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} onPress={_checkButton} disabled={disabled}>
                            <Text style={stylesButton.Sty_Text_Button}>{titleButton.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ImageBackground>
            </Modal >
            :
            <LoadingScreen />
    )
};
export default ModalHint