import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, Animated, TouchableOpacity, Image, FlatList, Slider, Modal} from 'react-native';
import styles from './style';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import FileSound from '../FileSound';
import Header from './Header';
import API from '../../../../API/APIConstant';
import Sound from 'react-native-sound';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {PronunciationF11Action} from '../../../../redux/actions/PronunciationF11Action';
import LoadingScreen from './../../../../screens/LoadingScreen';
import FileSoundiconlog from '../FileSoundiconlog';
import StyleApp from '../../../../styleApp/stylesApp';
import MarqueeText from 'react-native-marquee';
import FontBase from '../../../../base/FontBase';

let dataCheckQt = 0, count = 0;
const smartScreen = SmartScreenBase.smPercenHeight;
const smartFont = SmartScreenBase.smFontSize;

const PronunciationF11 = (props) => {

    const {navigation, lesson_id, modeF, group_id, dataContent} = props;
    const [showBtn, setShowBtn] = useState(true);
    const [dataQuestion, setDataQuestion] = useState('');
    const [listText, setListText] = useState([]);
    const [checked, setChecked] = useState(false);
    const [explain, setExplain] = useState(false);
    const [success, setSuccess] = useState(false);
    const [modeStatus, setModeStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [logLearning, setLogLearning] = useState({
        'class_id': 1,
        'unit_id': 1,
        'curriculum_id': 1,
    });
    const [disableBtnCheck, setDisableBtnCheck] = useState(true);
    const [dataAnswer, setDataAnswer] = useState([]);

    // const mode = route ? route.params.mode : '';
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

            try {
                    var dataText = [];
                    dataContent.data_question.forEach(element => {
                        let dataQ = [];
                        dataQ['option_explain'] = '';
                        let explain = element.list_option[0].explain_parse;
                        if (explain) {
                            dataQ['option_explain'] = explain.content_question_text;
                        }
                        dataQ['check'] = false;
                        dataQ['option'] = [];
                        element.list_option.forEach(e => {
                            let data = {};
                            data['match_option_text'] = e.match_option_text[0];
                            data['score'] = e.score;
                            if (e.score > 0) {
                                dataQ['answer'] = e.match_option_text[0].replace(/[^a-zA-Z ]/g, '');
                            }
                            data['selected'] = false;
                            data['question_id'] = e.question_id;
                            dataQ['option'].push(data);
                        });
                        dataText.push(dataQ);
                    });
                    setListText(dataText);
            } catch (error) {
                console.log("=====Loi du lieu",error)
                Alert.alert("","Bài tập này đang bị lỗi dữ liệu, xin hãy chọn bài khác", [
                    {text: 'Trở về', style: 'cancel', onPress: () => props.goBack()}
                ])
            }
        }
    };

    const _setCheck = (index, question_id) => {
        let dataC = [...listText];
        let indexQ = 0;
        dataC.forEach((e, i) => {
            e['option'].forEach((element, j) => {
                if (j === index && element.question_id === question_id) {
                    dataC[i]['checked'] = element.match_option_text.replace(/[^a-zA-Z ]/g, '');
                    indexQ = i;
                }
            });
        });
        dataC[indexQ]['option'].forEach((e, i) => {
            if (i !== index) {
                dataC[indexQ]['option'][i]['result'] = '';
                dataC[indexQ]['option'][i]['selected'] = false;
            } else {
                dataC[indexQ]['option'][i]['result'] = 'selected';
                dataC[indexQ]['option'][i]['selected'] = true;
            }
        });
        let c = 0;
        dataC.forEach((e, i) => {
            e['option'].forEach((element, i) => {
                if (element['selected']) {
                    c++;
                }
            });
        });
        if (c === dataC.length) {
            setDisableBtnCheck(false);
        }
        // dispatch(PronunciationF11Action(dataC));
        setListText(dataC);
    };

    const _convertText = (myString) => {
        let itemM = myString.match(/\[(.*?)\]/);
        let indices = {};
        if (itemM) {
            let indexOf = myString.indexOf(itemM[0]);
            let str1 = myString.slice(0, indexOf);
            let str2 = itemM[1];
            let str3 = myString.slice(indexOf + itemM[0].length, myString.length);
            indices['str1'] = str1;
            indices['str2'] = str2;
            indices['str3'] = str3;
        } else {
            indices['str'] = myString;
        }
        return indices;
    };

    const _renderQItem = ({item, index}) => {
        let textConvert = _convertText(item.match_option_text);
        return (
            <View style={styles.viewStrChF11}>
                <TouchableOpacity
                    disabled={checked}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: SmartScreenBase.smPercenWidth * 40,
                        height: SmartScreenBase.smPercenHeight * 7,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        borderWidth: 2,
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                        borderColor: item.result ? '#fff' : '#C7E519',
                        backgroundColor: item.result === 'selected' ? '#F9E815' : item.result === '1' ? '#C7E519' : item.result === '0' ? '#EE5555' : '#fff',
                    }}
                    onPress={() => _setCheck(index, item.question_id)}
                >
                    <MarqueeText
                        duration={3000}
                        marqueeOnStart
                        loop
                        marqueeDelay={1000}
                        marqueeResetDelay={1000}
                    >
                        {
                            textConvert.str
                                ?
                                <Text
                                    numberOfLines={1}
                                    style={{fontSize: SmartScreenBase.smFontSize * 45}}
                                >
                                    {textConvert.str}
                                </Text>
                                :
                                <Text numberOfLines={1} style={{fontSize: SmartScreenBase.smFontSize * 45}}>
                                    <Text>{textConvert.str1}</Text>
                                    <Text style={{textDecorationLine: 'underline'}}>{textConvert.str2}</Text>
                                    <Text>{textConvert.str3}</Text>
                                </Text>
                        }
                    </MarqueeText>
                </TouchableOpacity>
            </View>
        );
    };

    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.viewHeaderF11}>
                <Text style={{fontSize: SmartScreenBase.smFontSize*55, fontFamily: FontBase.MyriadPro_Bold, color: '#fff'}}>{index + 1}.</Text>
                <View style={styles.viewStressF11}>
                    <FlatList
                        data={item['option']}
                        renderItem={_renderQItem}
                        keyExtractor={(index) => index.toString()}
                        scrollEnabled={false}
                        numColumns={2}
                    />
                </View>
            </View>
        );
    };

    const _checkQuestion = () => {
        let datalistText = [...listText];
        let dataAns = [...dataAnswer];
        let checkS = true;
        datalistText.forEach((e, i) => {
            let data = {};
            data['exercise_type'] = 'pronunciation';
            data['question_type'] = dataContent.data_question[0].list_option[0].question_type;
            e['option'].forEach((element, j) => {
                if (element['result'] === 'selected') {
                    data['question_score'] = element['score'];
                    data['question_id'] = element.question_id;
                    data['final_user_choice'] = element.match_option_text;
                    let dataDetails = {};
                    dataDetails['num_turn'] = 1;
                    dataDetails['score'] = element['score'];
                    dataDetails['user_choice'] = element.match_option_text;
                    data['detail_user_turn'] = [];
                    data['detail_user_turn'].push(dataDetails);
                    if (element['score'] === '1') {
                        datalistText[i]['check'] = true;
                        datalistText[i]['option'][j]['result'] = '1';
                    } else {
                        datalistText[i]['option'][j]['result'] = '0';
                        checkS = false;
                    }
                }
            });
            dataAns.push(data);
        });
        // dispatch(PronunciationF11Action(datalistText));
        // if (modeF === 'exam' || modeF === 'mini_test') {
        //     props.setDataAnswer(dataAns);
        //     // _saveLogExam(dataAns);
        // } else {
             setDataAnswer(dataAns);
             setListText(datalistText);
            setChecked(true);
            setShowBtn(false);
            _explain();
        // }
    };


    const _renderQuestion = () => {
        return (
            <View style={{...styles.viewListAnswerF11}}>
                <FlatList
                    data={listText}
                    renderItem={_renderItem}
                    // keyExtractor={(i) => i.toString()}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={true}
                />
            </View>
        );
    };

    const _renderSuccess = () => {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: SmartScreenBase.smBaseWidth * 400,
            }}>
                <FileSound showImage={'true'}/>
            </View>
        );
    };

    const _renderError = () => {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: SmartScreenBase.smBaseWidth * 400,
            }}>
                <FileSound showImage={'false'}/>
            </View>
        );
    };

    const _renderItemExplain = ({item, index}) => {
        return (
            <View style={styles.centeredViewF11}>
                <View style={{...styles.modalViewF11, borderColor: item['check'] ? '#BBD54E' : '#EE5555'}}>
                    <View style={styles.closeMoF11}>
                        <View style={styles.closeModalF11}>
                            {
                                item['check'] ?
                                    <Image source={{uri: 'grammar1_4'}} style={styles.imageClose}
                                           resizeMode={'contain'}/>
                                    : <Image source={{uri: 'grammar1_3'}} style={styles.imageClose}
                                             resizeMode={'contain'}/>
                            }
                        </View>
                    </View>
                    {
                        item['check'] ?
                            <View style={{...styles.viewContentModalF11, borderBottomWidth: 0}}>
                                <Text style={{
                                    color: '#222',
                                    fontFamily: FontBase.MyriadPro_Bold,
                                    fontSize: SmartScreenBase.smFontSize*50,
                                }}>{index + 1}. </Text>
                                <Text style={{
                                    color: '#BBD54E',
                                    fontWeight: 'bold',
                                    fontSize: SmartScreenBase.smFontSize * 50,
                                    // marginLeft: SmartScreenBase.smPercenWidth*2,
                                }}>{item.answer}</Text>
                            </View>
                            : <View style={{...styles.viewContentModalF11, borderBottomWidth: 0}}>
                                <Text style={{
                                    color: '#222',
                                    fontFamily: FontBase.MyriadPro_Bold,
                                    fontSize: SmartScreenBase.smFontSize*50,
                                }}>{index + 1}. </Text>
                                <Text style={{
                                    color: item['check'] ? '#BBD54E' : '#EE5555',
                                    fontWeight: 'bold',
                                    fontSize: SmartScreenBase.smFontSize * 50,
                                    // marginLeft: SmartScreenBase.smPercenWidth*2,
                                    marginRight: SmartScreenBase.smPercenWidth*2,
                                }}>{item.checked}</Text>
                                <Image source={{uri: 'lesson_grammar_image3'}} style={styles.imgExplainF11}
                                       resizeMode={'contain'}/>
                                <Text style={{
                                    color: '#BBD54E',
                                    fontWeight: 'bold',
                                    fontSize: SmartScreenBase.smFontSize * 50,
                                    paddingLeft: smartScreen,
                                }}>{item.answer}</Text>
                            </View>
                    }
                    <View style={{...styles.viewDetailsExplainF11, marginTop: SmartScreenBase.smPercenWidth}}>
                        <Text style={{color: '#000', fontWeight: 'bold', fontSize: smartFont * 55, marginTop: SmartScreenBase.smPercenWidth}}>GIẢI THÍCH:</Text>
                        <Text style={{fontStyle: 'italic', fontSize: smartFont * 45, marginTop: SmartScreenBase.smPercenWidth}}>{item.option_explain}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const _explain = () => {
        props.hideTypeExercise();
        dataCheckQt = 0;
        let dataText = [...listText];
        dataText.forEach((e, i) => {
            e['option'].forEach((element, j) => {
                if (element['selected']) {
                    if (element['score'] == '1') {
                        dataCheckQt++;
                        dataText[i]['check'] = true;
                    }
                }
            });
        });
        if (dataCheckQt === listText.length) {
            setSuccess(true);
        } else {
            setSuccess(false);
        }
        setExplain(true);
        setChecked(false);
        setShowBtn(false);
    };

    const _renderExplain = () => {
        return (
            <View style={{...styles.explainF11, marginBottom: SmartScreenBase.smPercenHeight * 25}}>
                {
                    dataCheckQt === listText.length
                        ?
                        _renderSuccess()
                        :
                        _renderError()
                }
                <Text style={{
                    ...StyleLesson.text_answer,
                }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {dataCheckQt}/{listText.length}</Text>
                <FlatList
                    data={listText}
                    renderItem={_renderItemExplain}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={true}
                />
            </View>
        );
    };

    const _backAfterTest = () => {
        if (modeF === 'review_result') {
            props.prevReviewResult();
        } else {
            setExplain(false);
            setChecked(true);
            setShowBtn(false);
        }
    };

    const _nextQuestion = () => {
        if (modeF === 'review_result') {
            props.nextReviewResult();
        }
    };

    return (
        <View style={{flex: 1}}>
            {
                // isLoading ?
                //     <LoadingScreen/>
                //     :
                    explain ?
                        _renderExplain()
                        :
                        <View style={styles.containerLqF11}>
                            {_renderQuestion()}
                        </View>
            }
            {
                showBtn ?
                    modeStatus ?
                        <View style={styles.viewCheckF11}>
                            <TouchableOpacity
                                style={styles.btnNbF11}
                                onPress={() => {
                                    navigation.navigate('Pronunciation');
                                }}
                            >
                                <Text style={{color: '#FFF'}}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnNbF11}
                                onPress={() => {
                                    navigation.navigate('Pronunciation');
                                }}
                            >
                                <Text style={{color: '#FFF'}}>Next</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{
                            ...styles.viewCheckF11,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
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
                checked ?
                    modeStatus ?
                        <View style={styles.viewCheckF11}>
                            <TouchableOpacity
                                style={styles.btnNb}
                                onPress={() => _backAfterTest()}
                            >
                                <Text style={{color: '#FFF'}}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonCheckF11}
                                onPress={() => _explain()}
                            >
                                <Text style={{color: '#FFF'}}>Giải thích</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnNb}
                                onPress={() => _nextQuestion()}
                            >
                                <Text style={{color: '#FFF'}}>Next</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{
                            ...styles.viewCheckF11,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bottom: SmartScreenBase.smPercenHeight * 3,
                        }}>
                            <TouchableOpacity
                                style={StyleApp.Sty_Button}
                                onPress={_explain}
                            >
                                <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                    : null
            }
            {
                explain ?
                    modeStatus ?
                        <View style={styles.viewCheckF11}>
                            <TouchableOpacity
                                style={styles.btnNbExplain}
                                onPress={() => _backAfterTest()}
                            >
                                <Text style={{color: '#FFF'}}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnNbExplain}
                                onPress={() => {
                                    _nextQuestion();
                                }}
                            >
                                <Text style={{color: '#FFF'}}>Next</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{
                            ...styles.viewCheckF11,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bottom: SmartScreenBase.smPercenHeight * 3,
                        }}>
                            <TouchableOpacity
                                style={StyleApp.Sty_Button}
                                onPress={() => _saveLogLearning()}
                            >
                                <Text style={StyleApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                    : null
            }

        </View>
    );
};

export default PronunciationF11;
