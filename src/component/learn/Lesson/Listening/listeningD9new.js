import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    Platform,
    ImageBackground,
    TextInput,
    Keyboard,
    Animated,
    ActivityIndicator
} from 'react-native';
import Slider from '@react-native-community/slider';
import FileSound from '../FileSound';
import FileSound4 from '../FileSound4';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ButtonCheck from '../../../items/ButtonCheck';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import Iconcheck from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
// import { RectButton } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation';
import { connect } from "react-redux";
import { Listening9Action } from '../../../../redux/actions/listening9Action';
import EventBus from 'react-native-event-bus';
import LoaddingScreen from '../../../../screens/LoadingScreen';
import ModalScript from '../../../modalScript/index';
import API from '../../../../API/APIConstant';
import SoundQestion from '../../../SoundQuestion/sound2';
import stylesButton from '../../../../styleApp/stylesApp';
import stringUtils from '../../../../utils/stringUtils';
import lessonMath from '../../../../utils/lessonMath';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
import { KeyboardAwareScrollView, KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import LogBase from '../../../../base/LogBase';

let DataObject1 = new Object();
let DataObject2 = new Object();
let whoosh;
let ans = [];
let arrayText = [];
let array = 0;
var Sound = require('react-native-sound');
let questionId = [];
let optionExplain = [];
let myResultList = [];
let Audio;
const { width, height } = Dimensions.get('window')
Sound.setCategory('Playback');
class ListeningD9new extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            ShowCheck: false,
            checkResuilt: null,
            checkPlay: false,
            refresh: false,
            NumberTrue: 0,
            playState: 'paused',
            playSeconds: 0,
            duration: 0,
            dataFirt: '',
            dataFlastList: '',
            color: '#8E1C76',
            borderBottomColor: '#8E1C76',
            correct: 0,
            value: '',
            again: 0,
            success: false,
            miniTest: false,
            reload: arrayText,
            changeTextMap: [],
            checked: [],
            QuestionEN: '',
            QuestionVI: '',
            Langue: false,
            afterTest: 'homeword',
            webView: false,
            String: '',
            testTing: false,
            title: 'GIẢI THÍCH',
            loading: true,
            // valueY: new Animated.Value(0),
            showKey: false,
            idLog: {},
            bodyPost: [],
            dataPost: {},
            visible: false,
            textAudio: '',
            statusEnter: false,
            loadAudio: false,
            disable: true,
            stateEnd: 15
        };
        this.ListAnswer = [];
        this.CheckResound = [];
        this.sliderEditing = false;

    }

    UNSAFE_componentWillMount() {
        Orientation.lockToPortrait();
        this._getAPI()
    }

    _convertDataPost = (data) => {
        console.log("=====_convertDataPost")
        const { bodyPost } = this.state
        let body = [...bodyPost];
        let dataP = { ...data };
        dataP.data_question.map((item, index) => {
            let oj = {}
            oj.question_id = item.question_id;
            oj.question_type = item.list_option[0].question_type;
            oj.question_score = 0;
            oj.final_user_choice = [];
            oj.exercise_type = "listening";
            oj.detail_user_turn = []
            body.push(oj);
        });
        this.setState({ bodyPost: body })
    }
    _getAPI = async () => {
        let response = {};
        response['data'] = this.props.dataContent;
        let a = [...this.state.changeTextMap];
        this.setState({
            dataFirt: response.data,
            textAudio: response.data.lesson.lesson_text_audio
        })
        response.data.data_question.map((data, index) => {
            let questionContent = data.list_option[0].question_content;
            let changeText = this.trimQuestion(questionContent);
            a.push(changeText)
            this.setState({
                QuestionEN: data.list_option[0].group_content,
                QuestionVI: data.list_option[0].group_content_vi,
            })
        });
        // Hỗ trợ nhiều đáp án
        myResultList = [];
        response.data.data_question.map((data, index) => {
            data.list_option.forEach(element => {
                // console.log("=====match_option_text",JSON.parse(element.match_option_text))
                // var str = element.match_option_text.toString().replace("[","").replace("]","").replaceAll('"','')
                // var sbt = str.split(',')
                myResultList.push(element.match_option_text);
                optionExplain[index] = element.option_explain;
            });

        })
        this._convertDataPost(response.data)
        // if (this.props.checkType == 'homeword') {
        //     this._postDataFirt(response.data);
        // }
        this.setState({ changeTextMap: a, loading: false, dataPost: response.data })
    }
    trimQuestion = (str) => {
        let searchStr = '}';
        let searchStrLen = '}'.length;
        let startIndex = 0, index;
        let indices = {};
        indices['data'] = [];
        indices['text3'] = '';
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            let str1 = str.slice(startIndex, index + 1).match(/\{([^}]+)\}/)[1];
            let data = {};
            data['text2'] = str.slice(startIndex, index - str1.length - 1).split(' ')
            data['text'] = str1;
            indices['data'].push(data);
            startIndex = index + searchStrLen;
        }
        indices['text3'] = str.slice(startIndex, str.length).split(' ')
        return indices;
    }
    async componentDidMount() {
        this._checkAfterTest()
        Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : "keyboardDidShow", this._keyboardDidShow);
        Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : "keyboardDidHide", this._keyboardDidHide);
        this.props.saveLogLearning([]);
    }
    _keyboardDidShow = () => {
        // this.setState({ showKey: true })
        this.props.hideTypeExercise()
        // Animated.timing(this.state.valueY, {
        //     toValue: height / 90,
        //     duration: 500,
        //     // easing
        // }).start();
    };

    _keyboardDidHide = () => {
        this.props.showTypeExercise()
        // this.setState({ showKey: false });
        // Animated.timing(this.state.valueY, {
        //     toValue: 0,
        //     duration: 500,
        //     // easing
        // }).start();
    };

    _onChangeText = async (text, index, number) => {
        this.setState({ disable: true })
        let change = [...this.state.changeTextMap];
        change[index]["data"][number]['checked'] = false;
        change[index]["checkvalue"] = false
        change[index]["data"][number]['value'] = text.toLowerCase();
        try {
            for(var i=0;i<myResultList[index].length;i++){
                if (stringUtils.validWord(myResultList[index][i]) === stringUtils.validWord(text.toLowerCase())) {
                    change[index]["data"][number]['checked'] = true;
                    change[index]["checkvalue"] = true;
                }
            }
        } catch (error) {
            if (stringUtils.validWord(myResultList[index]) === stringUtils.validWord(text.toLowerCase())) {
                change[index]["data"][number]['checked'] = true;
                change[index]["checkvalue"] = true;
            }
        }
        
        // if (stringUtils.validWord(myResultList[number][]) === stringUtils.validWord(text.toLowerCase())) {
        //     change[index]["data"][number]['checked'] = true;
        //     change[index]["checkvalue"] = true;
        // }
        this.setState({ disable: !change.find(c=>!c.data[0].mCheck && !!c.data[0].value) })
        // change.map((item) => {
        //     if ( item.data[0].value) {
        //         if (item.data[0].value != '') {
        //             this.setState({ disable: false })
        //         }
        //     }
        // })
        await this.setState({ changeTextMap: change, });
    };

    _moveWebView = (value) => {
        let title = value.split('.').join().split('“').join().split('”').join().replace(/(,)/g, '')
        EventBus.getInstance().fireEvent("modalTranslate", {
            modal: title.toLowerCase(),
            url: 'https://glosbe.com/en/vi/'
        })
    };

    renderItem = ({ item, index }) => {
        const { color, borderBottomColor, showKey, changeTextMap } = this.state
        return (
            <View style={{

                alignItems: 'center',
                marginTop: 30,
                marginBottom: 10,                
            }}>
                <View style={{ backgroundColor: '#fff', top: -20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#F7AC16', position: 'absolute', width: 40, height: 40, borderRadius: 50, zIndex: 3 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{index + 1}</Text>
                </View>
                <View style={{ 
                    width: '100%', 
                    backgroundColor: '#fff', 
                    paddingVertical: 20, 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    borderRadius: 15, 
                    alignItems: 'center', 
                    paddingHorizontal: 20 }}>
                    {
                        item.data.map((text, number) => {
                            return (
                                <>
                                    {
                                        text.text2.map((string, i) => {
                                            return (
                                                <TouchableOpacity onLongPress={() => this._moveWebView(string)} style={{ justifyContent: 'flex-end', height: 25 }}>
                                                    <Text style={{ fontSize: 15 }}>{string} </Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                    <TextInput
                                        style={{
                                            ...Platform.select({
                                                android: {
                                                    padding: 0
                                                }
                                            }),
                                            fontWeight: 'bold',
                                            borderBottomWidth: 1,
                                            minWidth: '15%',
                                            paddingLeft: 3,
                                            fontSize: 17,
                                            color: color,
                                            borderBottomColor: borderBottomColor,
                                            textAlign: 'center'
                                        }}
                                        // onFocus={() => { this._onFocus(index) }}
                                        autoCorrect={false}
                                        // returnKeyType="done"
                                        // blurOnSubmit={true}
                                        multiline={true}
                                        autoCapitalize="none"
                                        onChangeText={(text) => this._onChangeText(text, index, number)}
                                        value={text.value ?? ''}
                                        editable={!text.mCheck}
                                    />
                                </>
                            );
                        })
                    }
                    {
                        item.text3.map(sring => {
                            return (
                                <TouchableOpacity onLongPress={() => this.moveWedView(sring)} style={{ justifyContent: 'flex-end', height: 25 }}>
                                    <Text style={{ fontSize: 15 }}>{sring} </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    };
    _onFocus = async (index) => {
        console.log(index, this.state.changeTextMap.length);
        if (index != this.state.changeTextMap.length - 1) {
            this.myFlatList.scrollToIndex({ viewPosition: 0.1, index: index });
        } else {
            this.setState({ stateEnd: 200 })
            await this.myFlatList.scrollToEnd()
        }
    }


    moveWedView = (value) => {
        let title = value.split('.').join().split('“').join().split('”').join().replace(/(,)/g, '')
        EventBus.getInstance().fireEvent("modalTranslate", {
            modal: title.toLowerCase(),
            url: 'https://glosbe.com/en/vi/'
        })
    }
    renderItem2 = ({ item, index }) => {
        console.log('item',item)
        const { dataFlastList, correct, success, again, afterTest } = this.state
        return (
            <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', paddingHorizontal: 10, }}>
                <View style={{
                    borderColor: afterTest !== "Result" ? this.state.changeTextMap[index].checkvalue ? '#388C02' : '#D80B0B' : '',
                    backgroundColor: '#fff',
                    paddingVertical: 20,
                    borderRadius: 15,
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    marginTop: 30,
                    width: '100%',
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                    }}>
                        <Text style={stylesButton.txt_Title}>{index + 1}. </Text>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                            {
                                item.data.map((text, number) => {
                                    return (
                                        <>
                                            {
                                                text.text2.map((string, i) => {
                                                    return (
                                                        <TouchableOpacity onLongPress={() => this.moveWedView(string)}>
                                                            <Text style={{fontSize: SmartScreenBase.smFontSize*45, fontFamily: FontBase.MyriadPro_Regular}}>{string} </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                            <View style={{
                                                alignItems: 'center',
                                                minWidth: '15%',
                                                paddingLeft: 3,
                                                borderBottomWidth: 1,
                                                borderBottomColor: 'black',
                                            }}>
                                                <Text style={{ color: this.state.changeTextMap[index].checkvalue ? Colors.TrueGreen : Colors.FalseRed, fontSize: SmartScreenBase.smFontSize*45, fontFamily: FontBase.MyriadPro_Bold}}>{text.value}</Text>
                                            </View>
                                        </>
                                    );
                                })
                            }
                            {
                                item.text3.map(sring => {
                                    return (
                                        <TouchableOpacity onLongPress={() => this.moveWedView(sring)}>
                                            <Text style={{fontSize: SmartScreenBase.smFontSize*45, fontFamily: FontBase.MyriadPro_Regular}}>{sring} </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                    {
                        again == 1 ?
                            <View>
                                {!this.state.changeTextMap[index].checkvalue &&
                                    item.data.map((text, number) => {
                                        return (
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SmartScreenBase.smPercenWidth*3}}>
                                                <Image resizeMode={'contain'} source={{ uri: 'lesson_grammar_image3' }} style={{ height: SmartScreenBase.smPercenWidth*5, width: SmartScreenBase.smPercenWidth*5}} />
                                                <Text style={{ fontSize: SmartScreenBase.smFontSize*50, color: Colors.TrueGreen, fontFamily: FontBase.MyriadPro_Bold, marginLeft: 10 }}>{myResultList[index][0]}</Text>
                                            </View>
                                        )
                                    })
                                }
                                <Text style={{ fontSize: SmartScreenBase.smFontSize*55, fontFamily: FontBase.MyriadPro_Bold, marginTop: SmartScreenBase.smPercenWidth*3}}>Giải thích:</Text>
                                {
                                    item.data.map((o_e) => {
                                        return (
                                            <Text style={{ color: '#2c2c2c', fontFamily: FontBase.MyriadPro_It, fontSize: SmartScreenBase.smFontSize*45}}>{optionExplain[index]}</Text>
                                        )
                                    })
                                }
                            </View>
                            : null
                    }
                    <Image 
                        source={{ uri: this.state.changeTextMap[index].checkvalue ? 'grammar1_4' : 'grammar1_3' }} 
                        style={{ position: 'absolute', width: 35, height: 35, top: -20,alignSelf:'center' }} 
                    />
                </View>
            </View>
        )

    }
    _checkResult = () => {
        this.props.hideTypeExercise();
        this.setState({ webView: false })
        let check = false
        console.log("=====_checkResult",this.state.changeTextMap)
        this.state.changeTextMap.map((item, index) => {
            return item.data.map((value, number) => {
                console.log("=====_checkResult map",value)
                if (value.value) {
                    check = true
                }
            })
        })
        if (check) {
            this.setState({ checkResuilt: true })
            this._checkSuccess()
        }
    }
    _trimChar = (string) => {
        // string = string.replace('‘', '\'').replace(/[\u2018\u2019]/g, '\'').trim();
        // while (string.charAt(string.length - 1) === '.' || string.charAt(string.length - 1) === ',') {
        //     string = string.substring(0, string.length - 1).trim();
        // }
        // return string;
        return stringUtils.validWord(string)
    };
    _checkSuccess = async () => {
        // alert(1)
        const { modeF } = this.props
        let dataChangtext = this.state.changeTextMap;
        let correctD = 0;
        dataChangtext.forEach(element => {
            let c = true;
            element.data.forEach(e => {
                e.mCheck = e.checked;
                if (!e.checked) {
                    c = false;
                }
            });
            if (c) {
                correctD++;
            }
        });
        console.log(dataChangtext);
        this.setState({ correct: correctD });
        await this._pushData(dataChangtext)
        console.log(modeF)
        if (modeF === 'exam' || modeF === 'mini_test') {
            await this._saveData()
            this.props.setDataAnswer(this.state.bodyPost)
        } else {
            if (correctD === this.state.changeTextMap.length) {
                this.props.showFeedback()
                this.setState({
                    success: true
                })
            }
            if (this.state.again == 1) {
                this.props.showFeedback()
                this.setState({
                    success: true
                })
            }
        }
    }
    _pushData = (data) => {
        const { bodyPost, again, dataPost } = this.state
        let arrayBody = [...bodyPost];
        data.forEach((item, index) => {
            let oj = {}
            let array = []
            oj.num_turn = again + 1;
            let totalScore = dataPost.data_question[index].list_option[0].score;
            let numberTrue = 0
            item.data.forEach((value, number) => {
                if (lessonMath.CheckAnswer(myResultList[index] ,value.value)) {
                    numberTrue++;
                }
                array.push(value.value)
            })
            oj.score = totalScore * numberTrue
            console.log("=====Score"+index,totalScore,numberTrue)
            oj.user_choice = array
            arrayBody[index].detail_user_turn.push(oj);
            arrayBody[index].final_user_choice = array;
            arrayBody[index].question_score = totalScore * numberTrue;
        })
        this.setState({ bodyPost: arrayBody });
    }
    _again = () => {
        this.props.showTypeExercise();
        let array = [...this.state.changeTextMap];
        array.map((item, index) => {
            array[index].data.forEach(element => {
                this.setState({ disable: true })
                if (!this.state.changeTextMap[index].checkvalue) {
                    element.value = ''
                };
                if (this.state.changeTextMap[index].checkvalue) {
                    this.setState({ disable: false })
                }
            })
        })
        this.setState({
            changeTextMap: array,
            checkResuilt: null,
            again: this.state.again + 1
        })
    }
    _goBack = () => {
        this.props.comback()
    };
    _saveData = async () => {
        let oj = {}
        oj.changeTextMap = this.state.changeTextMap;
        oj.dataFirt = this.state.dataFirt;
        oj.script = this.state.textAudio
        await this.props.dispatch(Listening9Action(oj));
    }
    closeWebView = () => {
        this.setState({ webView: false })
    }
    _showExamp = async () => {
        if (this.state.afterTest == "aftertest") {
            await this.setState({ afterTest: 'Result', title: 'QUAY LẠI' })
        } else {
            await this.setState({ afterTest: 'aftertest', title: 'GIẢI THÍCH' })
        }
        await this._checkAfterTest()
    }
    _checkAfterTest = () => {
        const { afterTest } = this.state
        if (afterTest == 'aftertest') {
            this.setState({
                checkResuilt: true,
                testTing: false,
                again: 0,
            })
        } else if (afterTest == 'Result') {
            this.setState({
                checkResuilt: true,
                // miniTest: true,
                again: 1,
                testTing: false
            })
        }
    }
    _showNextBack = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <TouchableOpacity
                    onPress={this._goBack}
                    style={stylesButton.Sty_ShortButton}>
                    <Text style={stylesButton.Sty_Text_Button}>QUAY LẠI</Text>
                </TouchableOpacity>
                {
                    this.state.testTing &&
                    <TouchableOpacity
                        onPress={this._showExamp}
                        style={stylesButton.Sty_ShortButton}>
                        <Text style={stylesButton.Sty_Text_Button}>{this.state.title}</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={this._saveData}
                    style={stylesButton.Sty_ShortButton}>
                    <Text style={stylesButton.Sty_Text_Button}>TIẾP TỤC</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _afterTest = () => {

        if (this.props.modeF === 'review_result') {

            this.props.nextReviewResult();
        }
    }
    _goback = () => {
        if (this.props.modeF === 'review_result') {
            this.props.prevReviewResult();
        }
    }
    _showNextBack2 = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <TouchableOpacity
                    onPress={this._goback}
                    style={stylesButton.Sty_ShortButton}>
                    <Text style={stylesApp.Sty_Text_Button}>QUAY LẠI</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._showModal}
                    style={stylesButton.Sty_ShortButton}>
                    <Text style={stylesApp.Sty_Text_Button}>SCRIPT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._showExamp}
                    style={stylesButton.Sty_ShortButton}>
                    <Text style={stylesApp.Sty_Text_Button}>{this.state.title}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this._afterTest}
                    style={stylesButton.Sty_ShortButton}>
                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _nextScreen = () => {
        this.props.hideTypeExercise();
        this._postDataAnswer()
    }
    _postDataAnswer = async () => {
        this.props.saveLogLearning(this.state.bodyPost);
    }
    _showModal = () => {
        this.setState({
            visible: !this.state.visible
        })
    }
    render() {
        const { success, correct, dataFirt, testTing, loading, showKey } = this.state;
        return (
            !loading ?
                <>
                <View style={{height: this.state.checkResuilt == null ? height - SmartScreenBase.smPercenWidth*30 : !this.state.testTing ? height - SmartScreenBase.smPercenWidth*40 : height - SmartScreenBase.smPercenWidth*34}} onStartShouldSetResponder={() => { Keyboard.dismiss() }}>
                    <View
                        style={{
                            alignItems: 'center',
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            width: SmartScreenBase.smPercenWidth * 100,
                        }}>
                        {/* {
                            !showKey && this.state.checkResuilt == null
                                ?
                                : null
                        } */}
                        <View style={{ width: '100%', paddingHorizontal: SmartScreenBase.smPercenWidth * 3, }}>
                            {
                                dataFirt.data_question &&
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                        success ?
                                            <View style={{
                                                height: SmartScreenBase.smBaseWidth * 250,
                                                width: "100%",
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <FileSound showImage={correct == dataFirt.data_question.length ? 'true' : 'false'} />
                                            </View>
                                            :
                                            <View 
                                            // style={{opacity: showKey ? 0 : 1}}
                                            >
                                                {!this.state.checkResuilt &&
                                                    this._ShowQuestion()
                                                }
                                            </View>
                                    }
                                    {
                                        this.state.checkResuilt &&
                                        <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'iCielSoupofJustice', marginTop: success ? 0 : 50, marginBottom: 10, textTransform: 'uppercase' }}>Bạn đã trả lời đúng {correct}/{dataFirt.data_question.length}</Text>
                                    }
                                </View>
                            }
                            {
                                this.state.checkResuilt == null ?
                                    <View style={{ ...Platform.select({ android: { height: SmartScreenBase.smPercenHeight * 55 }, ios: { height: SmartScreenBase.smPercenHeight * 55 } }), marginTop: SmartScreenBase.smPercenHeight}}>
                                        <KeyboardAwareFlatList
                                            enableOnAndroid={true}
                                            extraScrollHeight={Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight*8 : 0}
                                            // ref={(list) => this.myFlatList = list}
                                            data={this.state.changeTextMap}
                                            renderItem={this.renderItem}
                                            showsVerticalScrollIndicator={false}
                                            keyExtractor={(item, index) => item.text}

                                        />
                                    </View>
                                    :
                                    <View>
                                        {LogBase.log("=====this.state.again",this.state.again)}
                                        {LogBase.log("=====SmartScreenBase.ratio",SmartScreenBase.ratio)}
                                        {LogBase.log("=====success",success)}
                                        <FlatList
                                            data={this.state.changeTextMap}
                                            renderItem={this.renderItem2}
                                            style={{
                                                ...Platform.select({
                                                    ios: {
                                                        height: this.state.again == 1 ? (SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*63 : SmartScreenBase.smPercenHeight*60) : !success ? (SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*68 : SmartScreenBase.smPercenHeight*65) : (SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*68 : SmartScreenBase.smPercenHeight*59)
                                                    },
                                                    android: {
                                                        // height: !success ? '78%' : '75%'
                                                        height: this.state.again == 1 ? (SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*63 : SmartScreenBase.smPercenHeight*60) : !success ? (SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*68 : SmartScreenBase.smPercenHeight*65) : (SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*68 : SmartScreenBase.smPercenHeight*65)
                                                    }
                                                })
                                            }
                                            }
                                            showsVerticalScrollIndicator={false}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                            }

                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: 'absolute', bottom: height / 60 }}>
                        {
                            this.state.miniTest &&
                            <View style={{ width: '100%' }}>
                                {this._showNextBack()}
                            </View>
                        }

                        {
                            this.state.testTing &&
                            <View style={{ width: '100%' }}>
                                {this._showNextBack()}
                            </View>
                        }
                        {
                            this.state.afterTest == 'aftertest' &&
                            <View style={{ width: '100%' }}>
                                {this._showNextBack2()}
                            </View>
                        }
                        {
                            this.state.afterTest == 'Result' &&
                            <View style={{ width: '100%' }}>
                                {this._showNextBack2()}
                            </View>
                        }
                    </View>
                    {
                        !this.state.miniTest && this.state.afterTest == "homeword" ?
                            <View style={{alignItems: 'center' ,flexDirection: 'column' ,height: SmartScreenBase.smPercenWidth*30, paddingTop: SmartScreenBase.smPercenWidth*5}}>
                                {
                                    this.state.checkResuilt == null ?
                                        <TouchableOpacity
                                            onPress={this._checkResult}
                                            style={this.state.disable ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button}
                                            disabled={this.state.disable}
                                        >
                                            <Text style={stylesButton.Sty_Text_Button}>KIỂM TRA</Text>
                                        </TouchableOpacity>
                                        :
                                        !this.state.success ?
                                            !this.state.testTing &&
                                            <TouchableOpacity
                                                onPress={this._again}
                                                style={{ ...stylesButton.Sty_Button }}>
                                                <Text style={stylesButton.Sty_Text_Button}>LÀM LẠI</Text>
                                                <FileSound4 showImage={correct == dataFirt.data_question.length ? 'true' : 'false'} />
                                            </TouchableOpacity>
                                            :
                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                                                <TouchableOpacity
                                                    onPress={this._showModal}
                                                    style={stylesButton.Sty_ShortButton}>
                                                    <Text style={stylesButton.Sty_Text_Button}>SCRIPT</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={this._nextScreen}
                                                    style={stylesButton.Sty_ShortButton}>
                                                    <Text style={stylesButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                                </TouchableOpacity>
                                            </View>
                                }
                            </View> : null
                    }
                </View>
                <ModalScript
                    audio={this.state.dataFirt.lesson.lesson_audio}
                    visible={this.state.visible}
                    title={this.state.textAudio}
                    close={this._showModal}
                />
                </>
                :
                <LoaddingScreen />
        );
    }
    _checkLangue = () => {
        this.setState({ Langue: !this.state.Langue })
    }
    _ShowQuestion() {
        return (
            <SoundQestion
                Audio={this.state.dataFirt.lesson.lesson_audio}

            />
        );
    }
}
function mapStateToProps(state) {
    return {
        listening: state.listening9Reducers.listening,
        dataLogin: state.AuthStackReducer.dataLogin,
        checkType: state.TesttingReducer.testing
    }
}
export default connect(mapStateToProps)(ListeningD9new);
