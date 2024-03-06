import React, {useEffect, useState} from 'react';
import {
    View,
    Image,
    Alert,
    Text,
    FlatList,
    TextInput,
    Platform,
    Dimensions,
    Animated,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import StyleLesson from '../StyleLesson';
import FileSound from '../FileSound';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import API from '../../../../API/APIConstant';
import {useDispatch, useSelector} from 'react-redux';
import EventBus from 'react-native-event-bus';
import {ActionGrammarD1} from '../../../../redux/actions/ActionGrammarD1';
import stringUtils from '../../../../utils/stringUtils';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import font from '../../../../base/FontBase';
import LogBase from '../../../../base/LogBase';
import TextDownLine from '../../../../componentBase/TextDownLine/TextDownLine'
import { Colors } from '../../../../styleApp/color';

let dataNew = [];
let DataObject1 = new Object();
const {width, height} = Dimensions.get('window');
let layoutScroll = 0, heightC = 0, layoutX = [], layoutY = [], indexFocus = -1, layoutView = 0, countShow = true;

const GRD1 = (props: any) => {
    const {route, navigation, lesson_id, modeF, exam_id, checkType, setDataAnswer} = props;
    const [data, setdata] = useState([]);
    const [correctAns, setcorrectAns] = useState(0);
    const [statusScreen, setstatusScreen] = useState('home');
    const [statusType, setstatusType] = useState(checkType);
    const [dataFirt, setdataFirt] = useState('');
    const [countPress, setcountPress] = useState(0);
    const [locationY, setlocationY] = useState(0);
    const [title_ENG, settitle_ENG] = useState('');
    const [title_VI, settitle_VI] = useState('');
    const dataRedux = useSelector((state) => state.GrammarD1Reducer.data_answer);
    const [titlePress, settitlePress] = useState(false);
    const [arrayPost, setarrayPost] = useState([]);
    const [showBut, setshowBut] = useState(false);
    const [showEnd, setshowEnd] = useState(false);
    const [data_lesson, setdata_lesson] = useState({});
    const dataLogin = useSelector((state) => state.AuthStackReducer.dataLogin);
    const [isloading, setisloading] = useState(false);
    const [widthInput, setWidthInput] = useState([]);
    const dispatch = useDispatch();
    const [history,setHistory] = React.useState([]);

    const _onScroll = (layoutY) => {
        layoutScroll = layoutY;
    };

    const _onLayout2 = (layout) => {
        heightC = layout.height;
    };

    const _onLayout3 = (layout) => {
        layoutView = layout.height;
    };

    const _onLayout = (layout, index) => {
        layoutX[index] = index * layout.height + layout.y;
        layoutY[index] = layout.height;
    };

    useEffect(() => {
        // Keyboard.addListener('keyboardDidShow', _showKeyBoad);
        // Keyboard.addListener('keyboardDidHide', _HideKeyBoad);
        setisloading(true);
        _getDataContent();
    }, []);

    const _getDataContent = () => {
        dataNew = [];
        let response = {};
        response['data'] = props.dataContent;
        setdata_lesson(response);
        setdataFirt(response.data.lesson);
        for (let j = 0; j < response.data.data_question.length; j += 1) {
            var dataAns = [];
            DataObject1 = new Object();
            var text =
                '}' +
                response.data.data_question[j].list_option[0].question_content;
            var ListText = text.split('{')[0].split('}')[1] + ' ';
            for (let j = 1; j < text.split('{').length; j++) {
                ListText =
                    ListText + '________' + ' ' + text.split('{')[j].split('}')[1].trim();
                // LogBase.log("=====ListText",ListText);
                dataAns.push(text.split('{')[j].split('}')[0]);
            }
            DataObject1.question = ListText;
            DataObject1.answer = dataAns;
            DataObject1.myanswer = [];
            DataObject1.id = response.data.data_question[j].question_id;
            DataObject1.explain = response.data.data_question[j].list_option[0].explain_parse.content_question_text;
            settitle_ENG(
                response.data.data_question[j].list_option[0].group_content,
            );
            settitle_VI(
                response.data.data_question[j].list_option[0].group_content_vi,
            );
            dataNew.push(DataObject1);
        }
        setdata(dataNew);
    };

    const resetData = () => {
        data.forEach(d=>{
            d.myanswer.forEach(ma=>{
                if(!ma.status){
                    ma.ans = '';
                }
            })
        })
        setshowBut(false);
        props.showTypeExercise();
    };
    const _FunctionToReplaceQuestion = (Text) => {
        if (Text !== '' && Text !== null && Text !== undefined) {
            Text = Text.toLowerCase();
            let ApplyText = Text.trim();
            while (
                ApplyText.substr(ApplyText.length - 1) === '.' ||
                ApplyText.substr(ApplyText.length - 1) === ','
                ) {
                ApplyText = ApplyText.substring(0, ApplyText.length - 1);
                ApplyText = ApplyText.trim();
            }
            let findReplaceQuestionStatus = ApplyText.indexOf('‘');
            let findReplaceQuestionStatus1 = ApplyText.indexOf('\'');
            //console.log(findReplaceQuestionStatus);
            if (
                findReplaceQuestionStatus !== -1 ||
                findReplaceQuestionStatus1 !== -1
            ) {
                ApplyText = ApplyText.toLowerCase().replace('‘', '’').replace('\'', '’');
            }
            //console.log(ApplyText);
            return ApplyText;
        } else {
            return '';
        }
    };
    const _OnPress = () => {
        let archeck = [];
        let numberRight = 0;
            for (let i = 0; i < data.length; i++) {
                let arrMy = [];
                let arrMyAns = new Object();
                for (let i = 0; i < data.length; i++) {
                    arrMyAns = new Object();
                    let ArItem = [];
                    for (let j = 0; j < data[i].myanswer.length; j++) {
                        ArItem.push(data[i].myanswer[j].ans);
                    }
                    arrMyAns.ans = ArItem;
                    arrMy.push(arrMyAns);
                }
                archeck = arrMy;
            }
            data.forEach(e=>{
                if(e.myanswer){
                    e.answer.forEach((ee,i)=>{
                        if(e.myanswer[i]){
                            var mi = stringUtils.validWord(e.myanswer[i].ans);
                            var sp = ee.split('/').map(c=>stringUtils.validWord(c));
                            if(sp.indexOf(mi) >=0){
                                numberRight++;
                                e.myanswer[i].status = true;
                            }
                        }
                    })
                }
            })
            
            // console.log('statusScreen',statusScreen)
            // console.log('data',data)
            // console.log('numberRight',numberRight)
            if (statusScreen === 'home') {
                const tHis = [];
                data.forEach(e=>{
                    tHis.push(JSON.parse(JSON.stringify(e.myanswer)))
                })
                setHistory([...history,tHis])

                setcountPress(countPress + 1);
                if (numberRight === data.length) {
                    props.hideTypeExercise();
                    setshowEnd(true);
                    setstatusScreen('ans');
                    setcorrectAns(numberRight);
                    props.showFeedback();
                } else {
                    props.hideTypeExercise();
                    let arr = [...arrayPost];
                    let ob = new Object();
                    ob.ans = archeck;
                    arr.push(ob);
                    setarrayPost(arr);
                    setcorrectAns(numberRight);


                    if (countPress < 1) {
                        setstatusScreen('ans');
                    } else {
                        //alert('ahihi')
                        props.hideTypeExercise();
                        setshowEnd(true);
                        setstatusScreen('ans');
                        props.showFeedback();
                    }
                }
            } else if (statusScreen === 'ans') {
                //alert('ahehe')
                if (countPress > 1) {
                    props.nextReviewResult();
                } else {
                    setstatusScreen('home');
                }
            }
    };
    const _SubmitTeting = async () => {
        await dispatch(ActionGrammarD1(data));
        let arrr = [];
        for (let i = 0; i < data.length; i++) {
            let ob = new Object();
            (ob.question_id = data[i].id),
                (ob.exercise_type = 'grammar'),
                (ob.question_type = '1');
            let a = [];
            for (let j = 0; j < arrayPost.length; j++) {
                let obj = new Object();
                obj.num_turn = j;
                obj.score =
                    _FunctionToReplaceQuestion(
                        arrayPost[j].ans[i].ans.join().toUpperCase(),
                    ) === _FunctionToReplaceQuestion(data[i].answer.join().toUpperCase())
                        ? 1
                        : 0;
                obj.user_choice = _FunctionToReplaceQuestion(
                    arrayPost[j].ans[i].ans.join().toUpperCase(),
                );
                a.push(obj);
            }
            ob.detail_user_turn = a;
            arrr.push(ob);
        }
        if (checkType === 'Testing') {
            props.setDataAnswer(arrr);
        }
        props.nextReviewResult();
    };

    useEffect(()=>{
        props.saveLogLearning([]);
    },[]);

    const _Submit = async () => {
        const subs =  data.map((q,i)=>{
            const my = history.map(c=>c[i])
            const ans = {
                question_id: q.id,
                exercise_type: 'grammar',
                question_type:'1',
                detail_user_turn:my.map((m,id)=>{
                    return {
                        num_turn:id + 1,
                        score: (m.length>0&&m.find(c=>!c.status)==null)?1:0,
                        user_choice:m.map(cc=>cc.ans).join()
                    }
                })
            }

            //ans.score = ans.detail_user_turn.filter(c=>c.score==1).length;

            return ans;
        })
        props.saveLogLearning(subs);
    };
  
    const _OnTextChange = (text, index, indexQues) => {
        if (data[indexQues].myanswer.length === 0) {
            data[indexQues].myanswer.push({
                ans:text,
                index:index,
                indexQues:indexQues
            });
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
        //in mảng câu trả lời
        //console.log(data);
        for(let q of data){
            for(let m of q.myanswer){
                if(!m.status&&!!m.ans){
                    setshowBut(true)
                    return;
                }
            }
        }
        setshowBut(false)
    };

    const _onChangeWidth = (width, index) => {
        let widthIp = [...widthInput];
        widthIp[index] = width + SmartScreenBase.smPercenHeight * 2;
        setWidthInput(widthIp);
    };

    const placeFill = (mItem, index, indexQ, isResult, wordIndex) => {

        // LogBase.log("=====item",mItem)
        // LogBase.log("=====index",index)
        // LogBase.log("=====indexQ",indexQ)
        // LogBase.log("=====isResult",isResult)

        return (                
        <View key={index} style={{height: SmartScreenBase.smPercenHeight * 3, marginRight: SmartScreenBase.smPercenWidth}}>
                {
                    mItem?.status || isResult ?  <View style={{
                        zIndex: 10,
                        borderBottomWidth: 1,
                        alignItems: 'center',
                        minWidth:SmartScreenBase.smPercenWidth*12,
                        paddingHorizontal:SmartScreenBase.smPercenWidth*2,
                    }}>
                        <Text style={{
                                    ...StyleLesson.question_text,
                                    fontWeight: 'bold',
                                }}>{mItem?.ans}</Text>
                    </View>:<TextInput
                    autoCorrect={false}
                    autoCapitalize={wordIndex == 0 ? "sentences" : "none"}
                    onChangeText={(text) => {
                        _OnTextChange(text, index, indexQ);
                    }}
                    style={[
                        StyleLesson.question_text,
                        {
                            color: Colors.Violet,
                            marginVertical: 0,
                            paddingVertical: 0,
                            borderBottomWidth: 1,
                            minWidth: SmartScreenBase.smPercenWidth * 20 ,
                            textAlign: 'center',
                            fontWeight: 'bold',
                        },
                    ]}
                    onContentSizeChange={(event) => {
                        _onChangeWidth(event.nativeEvent.contentSize.width, indexQ);
                    }}
                    onFocus={() => indexFocus = indexQ}
                />
                }
        </View>)
    }

    const renderItemQuestion = (item) => {
        const indexQues = item.index;
        let arr = item.item.question.split(' ');
        // LogBase.log("=====arr",arr)
        let arrMy = [];
        let arrMyAns = new Object();
        for (let i = 0; i < data.length; i++) {
            arrMyAns = new Object();
            let ArItem = [];
            for (let j = 0; j < data[i].myanswer.length; j++) {
                ArItem.push(data[i].myanswer[j].ans);
            }
            arrMyAns.ans = ArItem;
            arrMy.push(arrMyAns);
        }
        const myanswer = item.item.myanswer;
        const isRight = myanswer&&myanswer.length>0&&!myanswer.find(c=>!c.status);
        let indexAns = -1;
        // LogBase.log("=====myanswer",myanswer)
        return (
            <View
                onLayout={(event) => _onLayout(event.nativeEvent.layout, indexQues)}
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        marginTop: SmartScreenBase.smPercenHeight * 2,
                    },
                ]}>
                    {
                        <TextDownLine 
                            textDL={stringUtils.toListDownLine(item.item.question)}
                            placeToFill={(mItem, mIndex, mIndexQ, isResu, wordIndex) => placeFill(mItem, mIndex, mIndexQ, isResu, wordIndex)}
                            indexQ={indexQues}
                            statusFillList={myanswer}
                            isResult={false}
                        />  
                    }
                {/* {arr.map((e, index) => {
                    return (
                        <View key={index} style={{height: SmartScreenBase.smPercenHeight * 3}}>
                            {e == '_______' ? <>
                                {
                                    myanswer[++indexAns]?.status ?<View style={{
                                        zIndex: 10,
                                        borderBottomWidth: 1,
                                        alignItems: 'center',
                                        minWidth:SmartScreenBase.smPercenWidth*12,
                                        paddingHorizontal:SmartScreenBase.smPercenWidth*2,
                                    }}>
                                        <Text style={{
                                                    ...StyleLesson.question_text,
                                                    fontWeight: 'bold',
                                                }}>{myanswer[indexAns].ans}</Text>
                                    </View>:<TextInput
                                    autoCorrect={false}
                                    onChangeText={(text) => {
                                        _OnTextChange(text, index, indexQues);
                                    }}
                                    style={[
                                        StyleLesson.question_text,
                                        {
                                            marginVertical: 0,
                                            paddingVertical: 0,
                                            borderBottomWidth: 1,
                                            minWidth: SmartScreenBase.smPercenWidth * 20 ,
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                        },
                                    ]}
                                    onContentSizeChange={(event) => {
                                        _onChangeWidth(event.nativeEvent.contentSize.width, indexQues);
                                    }}
                                    onFocus={() => indexFocus = indexQues}
                                />
                                }
                            </> : (
                                <TouchableOpacity
                                    onLongPress={() => moveWedView(e)}
                                    style={[stylesApp.txt, {zIndex: 0, height: 20}]}>
                                    <Text style={StyleLesson.question_text}>{e} </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                })} */}
            </View>
        );
    };
    const renderAns = () => {
        return (
            <View
                style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    height: height * 0.75,
                }}>
                {
                    showEnd ?
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                height: SmartScreenBase.smPercenHeight * 15,
                            }}>
                            <FileSound showImage={correctAns == data.length ? 'true' : 'false'}/>
                        </View>
                        :
                        <FileSound showIcon={'none'} showImage={correctAns == data.length ? 'true' : 'false'}/>
                }
                <Text style={StyleLesson.text_answer}>
                    BẠN ĐÃ TRẢ LỜI ĐÚNG {correctAns}/{data.length}
                </Text>
                <View
                    style={{
                        width: SmartScreenBase.smPercenWidth * 100,
                        alignItems: 'center',
                    }}>
                    <View
                        style={{height: showEnd ? SmartScreenBase.smPercenHeight * 53 : SmartScreenBase.smPercenHeight * 68}}>
                        <FlatList
                            data={data}
                            //keyExtractor={(item, index) => 'item' + index}
                            renderItem={(item, index) => renderItemAns(item, index)}
                            // pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            // legacyImplementation={false}
                            keyExtractor={(item,index)=>String(index)}
                        />
                    </View>
                </View>
            </View>
        );
    };
    const renderItemAns = (item, index) => {
        
        let indexOf = item.index;
        let arrMy = [];
        let arrMyAns = new Object();
        let arr = item.item.question.split(' ');
        for (let i = 0; i < data.length; i++) {
            arrMyAns = new Object();
            let ArItem = [];
            for (let j = 0; j < data[i].myanswer.length; j++) {
                ArItem.push(data[i].myanswer[j].ans);
            }
            arrMyAns.ans = ArItem;
            arrMy.push(arrMyAns);
        }
        const myanswer = item.item.myanswer;
        const isRight = myanswer&&myanswer.length>0&&!myanswer.find(c=>!c.status);
        let indexAns = 0;
        // LogBase.log("=====myanswer 2", myanswer)
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                        marginTop: SmartScreenBase.smPercenHeight * 5,
                        borderColor:isRight? 'rgba(198,229,14,0.95)': '#e21010',
                    },
                ]}>
                <View
                    style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 56,
                    }}>
                    <Image
                        source={{
                            uri:isRight? 'grammar1_4': 'grammar1_3',
                        }}
                        style={StyleLesson.Sty_Image_Small_Answer}
                    />
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: SmartScreenBase.smPercenHeight * 2}}>
                    {
                        <TextDownLine
                            textDL={stringUtils.toListDownLine(item.item.question)}
                            placeToFill={(mItem, mIndex, mIndexQ, isResu) => placeFill(mItem, mIndex, mIndexQ, isResu)}
                            indexQ={indexOf}
                            statusFillList={myanswer}
                            isResult={true}
                            showNumber={true}
                        />  
                    }
                    {/* {arr.map((e, index) => {
                        return (
                            <View key={index}>
                                {e == '_______' ? (
                                    <View
                                        style={{
                                            zIndex: 10,
                                            borderBottomWidth: 1,
                                            alignItems: 'center',
                                            minWidth:SmartScreenBase.smPercenWidth*12,
                                            paddingHorizontal:SmartScreenBase.smPercenWidth*2,
                                        }}>
                                        <Text
                                            style={
                                                {
                                                    fontFamily:font.MyriadPro_Bold,
                                                    fontSize: SmartScreenBase.smFontSize * 55,
                                                    color:myanswer[indexAns]?.status
                                                            ? 'rgba(198,229,14,0.95)'
                                                            : '#e21010',
                                                }
                                            }>
                                            {myanswer[indexAns++]?.ans}
                                        </Text>
                                    </View>
                                ) : (
                                    <Text style={{...StyleLesson.question_text, zIndex: 0}}> {e}</Text>
                                )}
                            </View>
                        );
                    })} */}
                </View>
                {showEnd === true && !isRight ? (
                    arrMy[item.index].ans.length
                        ?
                        <View>
                            {arrMy[item.index].ans.map((item, index) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 15,
                                            alignItems: 'center',
                                            flexWrap: 'wrap'
                                        }}>
                                        <Text
                                            style={{
                                                color: '#e21010',
                                                fontFamily:font.MyriadPro_Bold,
                                                fontSize: SmartScreenBase.smFontSize * 55,
                                                marginTop: SmartScreenBase.smPercenHeight,
                                                marginRight:SmartScreenBase.smPercenWidth *2,
                                            }}>
                                            {item}
                                        </Text>
                                        <View style={{flexDirection: 'row', alignItems: 'center',marginBottom: SmartScreenBase.smPercenWidth*3}}>
                                        <Image
                                            source={{uri: 'lesson_grammar_image3'}}
                                            style={{
                                                width: width / 15,
                                                height: width / 15,
                                                resizeMode: 'contain',
                                                paddingBottom: SmartScreenBase.smPercenWidth
                                            }}
                                        />
                                        <Text
                                            style={{
                                                color: 'rgba(198,229,14,0.95)',
                                                fontFamily:font.MyriadPro_Bold,
                                                fontSize: SmartScreenBase.smFontSize * 55,
                                                // marginTop: SmartScreenBase.smPercenHeight,
                                                marginLeft:SmartScreenBase.smPercenWidth * 2,
                                            }}>
                                            {data[indexOf].answer[index] === ''
                                                ? ''
                                                : data[indexOf].answer[index]}
                                        </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        :
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 15,
                            alignItems: 'center',
                        }}>
                            <Image
                                source={{uri: 'lesson_grammar_image3'}}
                                style={{
                                    width: width / 15,
                                    height: width / 15,
                                    resizeMode: 'contain',
                                }}
                            />
                            <Text
                                style={{
                                    color: 'rgba(198,229,14,0.95)',
                                    fontFamily:font.MyriadPro_Bold,
                                    fontSize: SmartScreenBase.smFontSize * 55,
                                    marginTop: SmartScreenBase.smPercenHeight,
                                    marginLeft:SmartScreenBase.smPercenWidth,
                                }}>
                                {data[item.index].answer}
                            </Text>
                        </View>
                ) : null}
                {showEnd === true ? (
                    <View
                        style={{
                            marginTop: SmartScreenBase.smPercenHeight,
                            marginBottom: SmartScreenBase.smPercenHeight,
                            borderTopColor: '#00000060',
                            width: '98%',
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: SmartScreenBase.smFontSize * 60,
                                marginTop: 15,
                            }}>
                            GIẢI THÍCH:
                        </Text>
                        <Text style={StyleLesson.explain_text}>{item.item.explain}</Text>
                    </View>
                ) : null}
            </View>
        );
    };

    const renderQuestion = () => {
            return (
                <KeyboardAwareFlatList
                    nestedScrollEnabled
                    enableOnAndroid={true}
                    data={data}
                    renderItem={(item, index) => renderItemQuestion(item, index)}
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    keyExtractor={(item,index)=>String(index)}
                    onKeyboardDidShow={()=>{
                        props.hideTypeExercise();
                    }}
                    onKeyboardDidHide={()=>{
                        props.showTypeExercise();
                    }}
                    extraScrollHeight={Platform.OS === 'ios' ? -SmartScreenBase.smPercenHeight*29 : 0}
                />
            );
    };
    return (
        <View
            onLayout={(event) => _onLayout2(event.nativeEvent.layout)}
            style={{
                width: '100%',
                height: '100%',
            }}>
            <View
                onLayout={(event) => _onLayout3(event.nativeEvent.layout)}
                style={{
                    marginBottom: SmartScreenBase.smPercenHeight * 3,
                    width: '100%',
                    height: statusScreen === 'home' ? SmartScreenBase.smPercenHeight * 60 : '75%',
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
                    // backgroundColor:'blue'
                }}>
                {statusScreen === 'home' ? (
                        showBut ? (
                            <TouchableOpacity
                                onPress={() => {
                                    _OnPress();
                                }}
                                style={[stylesApp.Sty_Button]}>
                                <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={[stylesApp.Sty_Button_disable]}>
                                <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                            </TouchableOpacity>
                        )
                    ) : countPress > 1 || showEnd === true ? (
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    _Submit();
                                }}
                                style={[stylesApp.Sty_Button]}>
                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                resetData();
                                _OnPress();
                            }}
                            style={[stylesApp.Sty_Button]}>
                            <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                        </TouchableOpacity>
                    )}
            </View>
        </View>
    );
};

export default GRD1;
