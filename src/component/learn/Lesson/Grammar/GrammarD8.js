import React, {useEffect, useState} from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    Keyboard,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert, ScrollView,
} from 'react-native';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import EventBus from 'react-native-event-bus';
import TypeExercise from '../Component/TypeExercise';
import {connect, useSelector} from 'react-redux';
import FileSound from '../FileSound';
import API from '../../../../API/APIConstant';
import axios from 'axios';
import stringUtils from '../../../../utils/stringUtils';
import font from '../../../../base/FontBase';
import lessonMath from '../../../../utils/lessonMath';
import LogBase from '../../../../base/LogBase';
import LessonBase from '../../../../base/LessonBase';
import { TextBox } from '../../../../componentBase/TextBox';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';

let dataNew = [];
let DataObject1 = new Object();
let correct = 0;
let fakeData = [
    {
        question:
            'Question 1. It used (take)  _______ visitors two days of trekking to reach the summit of Fansipan. ',
        answer: ['to take'],
        myanswer: [{ans: 'Q', index: 6, indexQues: 0}],
    },
    {
        question:
            'Question 3. Even though two years has passed, I still am not used (spend)  _______ one hour on bus going to my workplace. (spend) ',
        answer: ['to spending'],
        myanswer: [{ans: 'Q', index: 15, indexQues: 2}],
    },
    {
        question:
            'Question 4. Her son (use)  _______ to be addicted to game online, but now he can glue his eyes to screen whole day. ',
        answer: ['didn’t use'],
        myanswer: [{ans: 'Q', index: 6, indexQues: 3}],
    },
    {
        question:
            'Question 5. If only Hanoi (be)  _______ not such a hotel-packed city like today. (be) ',
        answer: ['were'],
        myanswer: [{ans: 'Q', index: 7, indexQues: 4}],
    },
    {
        question:
            'Question 6. Physics used (be)  _______ my nightmare, but now it is the subject I love the most. ',
        answer: ['to be'],
        myanswer: [{ans: 'Q', index: 6, indexQues: 5}],
    },
    {
        question:
            'Question 7. If he asked me, I would (advise)  _______ him not to change his current job. (advise) ',
        answer: ['advise'],
        myanswer: [{ans: 'Q', index: 10, indexQues: 6}],
    },
];
const {width, height} = Dimensions.get('window');
const GRD1 = (props) => {
    const {navigation} = props;
    const [arrayPost, setarrayPost] = useState([]);
    const [data, setdata] = useState([]);
    const [correctAns, setcorrectAns] = useState(0);
    const [myAns, setmyAns] = useState([]);
    const [statusScreen, setstatusScreen] = useState('home');
    const [statusType, setstatusType] = useState('exam');
    const [dicription, setdicription] = useState(false);
    const [showWeb, setshowWeb] = useState(false);
    const [String, setString] = useState('');
    const [countPress, setcountPress] = useState(0);
    const [title_ENG, settitle_ENG] = useState('');
    const [title_VI, settitle_VI] = useState('');
    const [showButton, setshowButton] = useState(true);
    const [disableBtn, setDisableBtn] = useState(true);
    const [titlePress, settitlePress] = useState(false);
    const [logid, setlogid] = useState('');
    const [showEnd, setshowEnd] = useState(false);
    const [dataFirt, setdataFirt] = useState('');
    const {route, lesson_id, modeF, exam_id} = props;
    const [valueY, setValueY] = useState(new Animated.Value(0));
    const [valueX, setvalueX] = useState(new Animated.Value(0));
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [data_lesson, setdata_lesson] = useState({});
    const _showKeyBoad = (e) => {
        props.handleKeyboardShow(-(e.endCoordinates.height - SmartScreenBase.smPercenHeight * 16));
    };
    const _HideKeyBoad = () => {
        props.handleKeyboardHide();
    };
    const [suggests,setSuggets] = React.useState([]);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', (e) => _showKeyBoad(e));
        Keyboard.addListener('keyboardDidHide', () => _HideKeyBoad());
        if (statusType == 'afterTest') {
            setdata(fakeData);
            setstatusScreen('ans');
        } else {
            dataNew = [];
            var suggetList = []
            let response = {};
            response['data'] = props.dataContent;
            setdata_lesson(response);
            setdataFirt(response.data.lesson);
            //console.log(response.data)
            // _postDataFirt(response.data);
            for (let j = 0; j < response.data.data_question.length; j += 1) {
                var dataAns = [];
                DataObject1 = new Object();
                var text =
                    '}' +
                    response.data.data_question[j].list_option[0].question_content;
                var ListText = text.split('{')[0].split('}')[1] + ' ';
                for (let j = 1; j < text.split('{').length; j++) {
                    var addText = text.split('{')[j].split('}')[1]
                    if(addText.charAt(0) != ' '){
                        addText = " "+addText
                    }
                    ListText =
                        ListText + '_______' + addText;
                }
                var listDA = []
                for (let m = 0; m < response.data.data_question[j].list_option.length; m ++) {
                    listDA.push(response.data.data_question[j].list_option[m].match_option_text)
                }
                LogBase.log("=====ListText",ListText);
                DataObject1.question = ListText;
                DataObject1.answer = listDA;
                DataObject1.myanswer = [];
                DataObject1.id = response.data.data_question[j].question_id;
                DataObject1.exp = response.data.data_question[j].list_option[0].option_explain;
                settitle_ENG(
                    response.data.data_question[j].list_option[0].group_content,
                );
                settitle_VI(
                    response.data.data_question[j].list_option[0].group_content_vi,
                );
                dataNew.push(DataObject1);
                response.data.data_question[j].list_option[0].jamming_answer_parse.forEach(element => {
                    suggetList.push(element)
                });
            }

            //console.log(dataNew);
            setdata(dataNew);
            setSuggets(suggetList)
        }
    }, []);

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    useEffect(()=>{
        props.saveLogLearning([]);
    },[]);

    const setScore = () => {
        let score = 0;
        data.forEach((e,i)=>{
            // e.answer.forEach((ee,ii)=>{
            //     if(!!e.myanswer[ii]){
            //         if(lessonMath.CheckAnswer(ee, e.myanswer[ii].ans)){
            //             e.myanswer[ii].status = true;
            //         }
            //     }
            // })
            e.myanswer.forEach((ee,ii)=>{
                if(!!ee){
                    if(lessonMath.CheckAnswer(e.answer[ii], ee.ans)){
                        ee.status = true;
                        score++;
                    }
                }
            })
            // console.log("=====sieuData", e)
            // if(e.answer == e.myanswer.filter(c=>c.status).length){
            //     score++;
            // }
        })
        setarrayPost([
            ...arrayPost,
            {
                ans: JSON.parse(JSON.stringify(data))
            }
        ]);
        setcorrectAns(score);
        if(score===data.length){
            setshowEnd(true)
        }
    };
    const _Submit = async () => {
        props.hideFeedback();
        
        let ans = data.map((q,i)=>{
            return {
                exercise_type: 'grammar',
                question_type:'13',
                question_id: q.id,
                detail_user_turn:  arrayPost.map((a,ii)=>{
                    return {
                        num_turn: ii+1,
                        user_choice: a.ans[i].myanswer.map(c=>c.ans).join(),
                        score: a.ans[i].answer.length == a.ans[i].myanswer.filter(c=>c.status).length?1:0
                    }
                })
            }
        })
        
        props.saveLogLearning(ans);
    };
    const _OnPress = () => {
        if(showEnd){
            _Submit();
            return;
        }
        if (statusType == 'exam') {
            if (statusScreen === 'home') {
                props.hideTypeExercise();
                setScore();
                setcountPress(countPress + 1);
                if (countPress < 1) {
                    setstatusScreen('ans');
                } else {
                    props.showFeedback();
                    setshowEnd(true);
                    setstatusScreen('ans');
                }
            } else if (statusScreen === 'ans') {
                if (countPress > 1) {
                    props.hideTypeExercise();
                    _Submit();
                    // navigation.methodScreen();
                } else {
                    props.showTypeExercise();
                    setDisableBtn(true);
                    setstatusScreen('home');
                }
            }
        } else if (statusType == 'Testing') {
            navigation.methodScreen();
        }
    };    

    const _OnTextChange = (text, index, indexQues) => {
        if (data[indexQues].myanswer.length === 0) {
            let Object1 = new Object();
            Object1.ans = text;
            Object1.index = index;
            Object1.indexQues = indexQues;
            data[indexQues].myanswer.push(Object1);
        } else {
            let check1 = data[indexQues].myanswer
                .map(function (e) {
                    return e.index;
                })
                .indexOf(index);
            if (check1 == -1) {
                let Object1 = new Object();
                Object1.ans = text;
                Object1.index = index;
                Object1.indexQues = indexQues;
                data[indexQues].myanswer.push(Object1);
            } else {
                for (let i = 0; i < data[indexQues].myanswer.length; i++) {
                    if (data[indexQues].myanswer[i].index == index) {
                        data[indexQues].myanswer[i].ans = text;
                    }
                }
            }
        }
        for(let q of data){
            for(let a of q.myanswer){
                if(!a.status && !!a.ans){
                    setDisableBtn(false)
                    return;
                }
            }
        }
        setDisableBtn(true);
    };
    const renderItemQuestion = (item, indexQ) => {
    
        let stt = 0;
        let sens = item.question.split('\n');
        
        return (
            <View style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: SmartScreenBase.smPercenWidth * 3,
                width: SmartScreenBase.smPercenWidth * 90,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: SmartScreenBase.smPercenWidth * 5,
                marginTop: SmartScreenBase.smPercenWidth * 8,
                paddingVertical:SmartScreenBase.smPercenHeight*2
            }}>
                {
                    sens.map((el,i)=>{
                        let arr = el.split(' ');
                        return  <View key={i}
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            zIndex: 0,
                            width: SmartScreenBase.smPercenWidth * 80,
                        }}>
                        {arr.map((e, index) => {
                            let indexText = index;
                            return (
                                <>
                                    {stringUtils.removeSpecialWord(e) == '_______' ? (
                                        <View style={{height:SmartScreenBase.smPercenHeight*3,borderBottomWidth: 1,}}>
                                            {
                                                item.myanswer[stt]&&item.myanswer[stt].status?<Text
                                                    style={{
                                                        textAlign: 'center',
                                                        fontWeight: '400',
                                                        fontSize: SmartScreenBase.smFontSize * 45,
                                                        zIndex: 10, 
                                                        marginHorizontal: SmartScreenBase.smPercenWidth,
                                                        paddingHorizontal: SmartScreenBase.smPercenWidth,
                                                    }}
                                                >
                                                    {
                                                        item.myanswer[stt].ans
                                                    }
                                                </Text>: <TextInput
                                                autoCapitalize={index == 0 ? "sentences" : 'none'}
                                                onChangeText={(text) => {
                                                    _OnTextChange(text, indexText, indexQ);
                                                }}
                                                style={{
                                                    color: Colors.Violet,
                                                    minWidth: SmartScreenBase.smPercenWidth * 20,
                                                    textAlign: 'center',
                                                    fontSize: SmartScreenBase.smFontSize * 45,
                                                    paddingVertical:0,
                                                    fontWeight:'400',
                                                    zIndex: 10, 
                                                    marginHorizontal: SmartScreenBase.smPercenWidth,
                                                    paddingHorizontal: SmartScreenBase.smPercenWidth,
                                                }}
                                            />
                                            }
                                        </View>
                                    ) : (
                                        <TouchableOpacity
                                            onLongPress={() => LessonBase.goTranslate(e)}
                                            style={{
                                                fontWeight: '400',
                                                fontSize: SmartScreenBase.smPercenWidth * 3,
                                                color: 'black',
                                                height:SmartScreenBase.smPercenHeight*3
                                            }}>
                                            <Text style={{...StyleLesson.question_text}}> {e}</Text>
                                        </TouchableOpacity>
                                    )}
                                </>
                            );
                        })}
                    </View>
                    })
                }
                <View
                    style={{
                        position: 'absolute',
                        top: -SmartScreenBase.smPercenWidth * 4,
                        backgroundColor: '#FFF',
                        height: SmartScreenBase.smPercenWidth * 8,
                        width: SmartScreenBase.smPercenWidth * 8,
                        borderRadius: SmartScreenBase.smPercenWidth * 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#F7AC16',
                    }}>
                    <Text style={{fontSize: SmartScreenBase.smFontSize * 45, fontWeight: 'bold'}}>{indexQ + 1}</Text>
                </View>
            </View>

        );
    };
    const renderAns = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {
                    showEnd === true
                        ?
                        <View style={{
                            height: SmartScreenBase.smPercenHeight * 15,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <FileSound showImage={correctAns === data.length ? 'true' : 'false'}/>
                        </View>
                        :
                        <FileSound showIcon={'none'} showImage={correctAns === data.length ? 'true' : 'false'}/>
                }
                <Text style={StyleLesson.text_answer}>
                    BẠN ĐÃ TRẢ LỜI ĐÚNG {correctAns}/{data.length}
                </Text>
                <View
                    style={{
                        width: SmartScreenBase.smPercenWidth * 100,
                        alignItems: 'center',
                    }}>
                    <View style={{height:  showEnd === true ? SmartScreenBase.smPercenHeight * 47 : SmartScreenBase.smPercenHeight * 62}}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => 'item' + index}
                            renderItem={({item, index}) => renderItemAns(item, index)}
                        />
                    </View>
                </View>
            </View>
        );
    };
    const isEmpty = (str) => {
        return (!str || 0 === str.length);
    };
    const _FunctionToReplaceQuestion = (Text) => {
        if (Text !== '' && Text !== null && Text !== undefined) {
            let ApplyText = Text.trim();
            while (ApplyText.substr(ApplyText.length - 1) === '.' || ApplyText.substr(ApplyText.length - 1) === ',') {
                ApplyText = ApplyText.substring(0, ApplyText.length - 1);
                ApplyText = ApplyText.trim();
            }
            let findReplaceQuestionStatus = ApplyText.indexOf('‘');
            let findReplaceQuestionStatus1 = ApplyText.indexOf('\'');
            //console.log(findReplaceQuestionStatus);
            if (findReplaceQuestionStatus !== -1 || findReplaceQuestionStatus1 !== -1) {
                ApplyText = ApplyText.toLowerCase().replace('‘', '’').replace('\'', '’');
            }
            // console.log(ApplyText);
            return (ApplyText);
        } else {
            return ('');
        }
    };
    const renderItemAns = (item, indexOf) => {
        let arrMy = [];
        let arrMyAns = new Object();
        let arr = item.question.split(' ');

        for (let i = 0; i < data.length; i++) {
            arrMyAns = new Object();
            let ArItem = [];
            for (let j = 0; j < data[i].myanswer.length; j++) {
                ArItem.push(data[i].myanswer[j].ans);
            }
            arrMyAns.ans = ArItem;
            arrMy.push(arrMyAns);
        }
        const isRight = item.answer.length == item.myanswer.filter(c=>c.status).length;
        let stt= -1;

        const sens = item.question.split('\n');

        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        paddingVertical: SmartScreenBase.smBaseWidth * 60,
                        alignItems: 'flex-start',
                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                        marginTop: SmartScreenBase.smPercenHeight * 5,
                        borderColor: isRight
                                ? 'rgba(198,229,14,0.95)'
                                : '#e21010'
                    },
                ]}>
                {showEnd === true ? null : (<>
                {
                    sens.map((el,i)=>{
                        const arr2 = el.split(' ');
                        return <View key={i} style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            {
                                i==0&&<Text style={{...StyleLesson.question_text, fontWeight: 'bold'}}>
                                {indexOf + 1}.
                            </Text>
                            }
                            {arr2.map((e, index) => {
                                let indexText = index;
                                let index1 = data[indexOf].myanswer.findIndex(
                                    (x) => x.index === indexText,
                                );
                                return (
                                    <View key={index}>
                                        {e == '_______' ? (
                                            <View
                                                style={{
                                                    zIndex: 10,
                                                    borderBottomWidth: 1,
                                                    paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                                                    alignItems: 'center',
                                                }}>
                                                <Text style={{
                                                    fontWeight: '600',
                                                    color: item.myanswer[++stt]?.status 
                                                            ? 'rgba(198,229,14,0.95)'
                                                            : '#e21010',
                                                    ...StyleLesson.question_text,
                                                }}>
                                                    {item.myanswer[stt]?.ans}
                                                </Text>
                                            </View>
                                        ) : (
                                            <Text style={[StyleLesson.question_text, {zIndex: 0}]}> {e}</Text>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    })
                }
                </>
                )}
                {showEnd === true ? (
                    <View>
                        <TextBox numberOfLines={9} text={(indexOf + 1)+". "+sens}/>
                        {
                            item.answer.map((ans,i)=>{
                                const r = item.myanswer[i]?.status;
                                return (
                                    <View key={i} style={{flexDirection: 'row', flexWrap: 'wrap', width: SmartScreenBase.smPercenWidth*85, marginTop: SmartScreenBase.smPercenWidth*3
                                }}>
                                        {/* {
                                            i==0&&<Text style={{...StyleLesson.answer_text, fontWeight: 'bold'}}>
                                                {indexOf + 1}.{' '}
                                            </Text>
                                        } */}
                                        {
                                            !r&&<>
                                                <Text style={{
                                                        color: '#e21010',
                                                        marginTop: SmartScreenBase.smPercenWidth,
                                                        ...StyleLesson.answer_text,
                                                    }}>
                                                    {item.myanswer[i]?.ans}
                                                </Text>
                                                <Image
                                                    source={{uri: 'lesson_grammar_image3'}}
                                                    style={{
                                                        width: width / 16,
                                                        height: width / 16,
                                                        resizeMode: 'contain',
                                                        marginLeft:SmartScreenBase.smPercenWidth*2
                                                    }}
                                                />
                                            </>
                                        }
                                        <Text
                                            style={{
                                                color: 'rgba(198,229,14,0.95)',
                                                marginTop: SmartScreenBase.smPercenWidth*0.5,
                                                ...StyleLesson.answer_text,
                                            }}>
                                            {'  '}
                                            {ans[0]}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                ) : null}
                {showEnd === true ? (
                    <View
                        style={{
                            marginTop: SmartScreenBase.smPercenHeight,
                            marginBottom: SmartScreenBase.smPercenHeight,
                            width: '98%',
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                ...StyleLesson.text_explain,
                                paddingVertical: SmartScreenBase.smPercenHeight,
                            }}>
                            GIẢI THÍCH:
                        </Text>
                        <Text style={{...StyleLesson.explain_text}}>{data[indexOf].exp.replace(/&quot;/g, '"')} </Text>
                    </View>
                ) : null}
                <View
                    style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 56,
                    }}>
                    <Image
                        source={{
                            uri: isRight
                                    ? 'grammar1_4'
                                    : 'grammar1_3'
                        }}
                        style={StyleLesson.Sty_Image_Small_Answer}
                    />
                </View>
            </View>
        );
    };
    const renderQuestion = () => {
        return (
            <FlatList
                data={data}
                renderItem={({item, index}) => renderItemQuestion(item, index)}
                keyExtractor={(item,index)=>index+''}
            />
        );
    };

    return (
        <Animated.View
            style={{
                width: '100%',
                height: '100%',
            }}>
            {statusScreen === 'home' ? (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        width: '90%',
                        height: SmartScreenBase.smPercenHeight * 15,
                    }}>
                    <ScrollView
                        style={{
                            width: SmartScreenBase.smPercenWidth * 90,
                            alignSelf: 'center',
                        }}>
                        <View
                            style={{
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}>
                            {suggests.map((item, key) => {
                                return (
                                    <View style={{zIndex: 20}} key={key}>
                                        <View
                                            style={{
                                                backgroundColor: '#EEC900',
                                                marginRight: SmartScreenBase.smPercenWidth * 2,
                                                borderRadius: SmartScreenBase.smPercenWidth * 10,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderWidth: 2,
                                                borderColor: '#FFF',
                                                marginTop: SmartScreenBase.smPercenHeight,
                                            }}>
                                            <Text style={{
                                                ...StyleLesson.question_text,
                                                padding: SmartScreenBase.smPercenWidth,
                                            }}> {item} </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
            ) : null}

            <View
                style={{
                    width: '100%',
                    height:
                        statusScreen === 'home'
                            ? SmartScreenBase.smPercenHeight * 40
                            : SmartScreenBase.smPercenHeight * 70,
                    ...StyleLesson.question_content,
                }}>
                {statusScreen === 'home'
                    ? renderQuestion()
                    : statusScreen === 'ans'
                        ? renderAns()
                        : null}
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: SmartScreenBase.smPercenHeight * 10,
                }}>
                {statusType == 'afterTest' ? (
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => {
                                this._CheckResuilt();
                            }}
                            style={[
                                stylesApp.Sty_Button,
                                {
                                    width: SmartScreenBase.smPercenWidth * 40,
                                    marginRight: SmartScreenBase.smPercenWidth * 10,
                                },
                            ]}>
                            <Text style={stylesApp.Sty_Text_Button}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                _OnPress();
                            }}
                            style={[
                                stylesApp.Sty_Button,
                                {width: SmartScreenBase.smPercenWidth * 40},
                            ]}>
                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                        </TouchableOpacity>
                    </View>
                ) : statusScreen === 'home' ? (
                    showButton === true ?
                        <TouchableOpacity
                            disabled={disableBtn}
                            onPress={() => {
                                _OnPress();
                            }}
                            style={[
                                disableBtn ? stylesApp.Sty_Button_disable : stylesApp.Sty_Button,
                            ]}>
                            <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                        </TouchableOpacity>
                        : null

                ) : countPress > 1 || showEnd === true ? (
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => {
                                _OnPress();
                            }}
                            style={[
                                stylesApp.Sty_Button,
                            ]}>
                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={() => {
                            _OnPress();
                        }}
                        style={[
                            stylesApp.Sty_Button,
                        ]}>
                        <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                    </TouchableOpacity>
                )}
            </View>
        </Animated.View>
    );
};

function mapStateToProps(state) {
    return {
        data_answer: state.readingD11Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(GRD1);
