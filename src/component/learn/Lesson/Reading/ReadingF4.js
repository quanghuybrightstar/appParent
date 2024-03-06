import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, FlatList, TextInput, ScrollView, Keyboard, Platform} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ButtonCheck from '../../../items/ButtonCheck';
import TypeExercise from '../Component/TypeExercise2';
import stylesApp from '../../../styleApp/stylesApp';
import StyleLesson from '../StyleLesson';
import FileSound from '../FileSound';
import API from '../../../../API/APIConstant';
import {connect} from 'react-redux';
import {ReadingD13Action} from '../../../../redux/actions/ReadingD13Action';
import axios from 'axios';
import WebView from 'react-native-webview';
import LoadingScreen from '../../../../screens/LoadingScreen';
import EventBus from 'react-native-event-bus';
import FileSound4 from '../FileSound4';
import StyleApp from '../../../../styleApp/stylesApp';
import Utils from '../../../../utils/stringUtils';
import lessonMath from '../../../../utils/lessonMath';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LessonBase from '../../../../base/LessonBase';

let smartFont = SmartScreenBase.smFontSize;

class ReadingD13 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowCheck: false,
            HeightLayoutTitle: 0,
            refresh: false,
            enableEdit: true,
            checkResuilt: null,
            NumberTrue: 0,
            isLoading: true,
            data: {},
            heightScrool: SmartScreenBase.smPercenHeight * 65,
            scrollEnabled: false,
            btnEx: false,
            webview: '',
            vietnam: '',
            english: '',
            logLearning: {
                'class_id': 1,
                'unit_id': 1,
                'curriculum_id': 1,
            },
            dataLog: {},
            dataAnswer: [],
            dataAns: [],
            widthInput: [],
            showQuestion: true,
            disableBtnCheck: true,
            correctAns: []
        };
        this.ArrAnswer = [];
        this.kqList = [];
        this.ListNumber = [];
        this.ListIdAnswer = [];
        this.contentHeight = null;
        this.scrollHeight = null;
        this.scrollY = null;
        this.dataP = [];
        // [
        //     'handleKeyboardShow', 'handleKeyboardHide',
        //     'handleLayout', 'handleContentChange', 'handleScroll',
        // ].forEach((method) => {
        //     this[method] = this[method].bind(this);
        // });
    }

    componentDidMount() {
        this._getQuestion();
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.handleKeyboardShow);
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardHide);
    }

    componentWillUnmount() {
        // this.keyboardDidShowListener.remove();
        // this.keyboardDidHideListener.remove();
    };

    // todo: handle layout instead of keyboard
    // handleKeyboardShow = (e) => {
    //     this.setState({scrollEnabled: true});
    //     this.setState({heightScrool: SmartScreenBase.smPercenHeight * 60 - e.endCoordinates.height * (
    //         Platform.OS==='ios'?0.6:0.7
    //     )});
    //     this.scrollToBottom();
    // };

    // handleKeyboardHide() {
    //     this.setState({heightScrool: SmartScreenBase.smPercenHeight * 60});
    //     // this.setState({scrollEnabled: false});
    // }

    // handleScroll(e) {
    //     this.scrollY = e.nativeEvent.contentOffset.y;
    // }

    // handleLayout(e) {
    //     this.scrollHeight = e.nativeEvent.layout.height;
    //     this.scrollToBottom();
    // }

    // handleContentChange(w, h) {
    //     // repeated called on Android
    //     // should do diff
    //     if (h === this.contentHeight) {
    //         return;
    //     }
    //     this.contentHeight = h;

    //     if (this.scrollHeight == null) {
    //         setTimeout(() => {
    //             this.scrollToBottomIfNecessary();
    //         }, 500);
    //     } else {
    //         this.scrollToBottomIfNecessary();
    //     }
    // }

    // scrollToBottomIfNecessary() {
    //     // todo: range detection
    //     this.scrollToBottom();
    // }

    scrollToBottom() {
        console.log('scrollToBottom')
        // const {scrollHeight, contentHeight} = this;
        // if (scrollHeight == null) {
        //     return;
        // }

        // if (contentHeight > scrollHeight) {
        //     this.refs.scroller.scrollTo({y: this.layoutX[this.indexFocus]});
        // }
        // if (contentHeight === scrollHeight) {
        //     this.refs.scroller.scrollTo({y: 100});
        // }
    }

    _saveStartLogLearning = async () => {
        const url = API.baseurl + API.saveLogLearning;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            console.log("=========_saveStartLogLearning ReadingF4");
            const res = await axios({method: 'post', url: url, headers: header, data: this.state.logLearning});
            let data = res.data;
            this.setState({isLoading: false});
            this.setState({dataLog: data});
        } catch (error) {
            this.setState({isLoading: false});
            console.log(error.response.data);
        }
    };

    _saveLogLearning = async () => {
        this.props.saveLogLearning(this.state.dataAnswer);
    };

    async _getQuestion() {
        if (this.props.dataContent) {
            let dataReturn = this.props.dataContent;
            if (dataReturn.status) {
                let saveLog = {...this.state.logLearning};
                saveLog['data_lesson'] = JSON.stringify(dataReturn);
                saveLog['lesson_id'] = dataReturn.lesson.id;
                this.setState({logLearning: saveLog});
                let dataText = {...this.state.data};
                let question = dataReturn.data_question;
                dataText['answer'] = [];
                dataText['explain'] = [];
                dataText['intro'] = dataReturn.lesson.lesson_paragraph;
                question.forEach(element => {
                    dataText['question'] = element.list_option[0].question_content;
                    this.setState({vietnam: element.list_option[0].group_content_vi});
                    this.setState({english: element.list_option[0].group_content});
                    element.list_option.forEach(e => {
                        dataText['answer'].push(e.match_option_text ?? []);
                        dataText['explain'].push(e.option_explain);
                    });
                });
                this.setState({data: dataText});
                // this._trimIndex(dataText.question);
                let dataQ = dataText.question.replace(/{(.*?)}/g,"______").split(' ');
                dataQ.forEach((element, index) => {
                    let indexOf = element.search((/_/));
                    if (indexOf !== -1) {
                        this.ListNumber.push(index);
                    }
                });
                console.log('lsNum',this.ListNumber);
                for (let index = 0; index < dataText.answer.length; index++) {
                    this.ArrAnswer.push('');
                    this.ListIdAnswer.push(-1);
                }
                let dataQue = this.props.data_answer ? this.props.data_answer.data_answer : '';
                if (this.props.modeF === 'review_result') {
                    this.setState({minitest: true, mode: 'afterTest'});
                    this.ArrAnswer = dataQue;
                    let num = 0;
                    for (let index = 0; index < dataText.answer.length; index++) {
                        if (Utils.validWord(this.ArrAnswer[index]) === Utils.validWord(dataText.answer[index])) {
                            num += 1;
                        }
                    }
                    this.setState({btnEx: true, NumberTrue: num,dataAns: dataQue});
                    if (num >= dataQue.length) {
                        this.setState({checkResuilt: true});
                    } else {
                        this.setState({checkResuilt: false});
                    }
                }
                this._saveStartLogLearning();
                this.setState({isLoading: false});
            }
        }
    }

    _ColorAnswer(key) {
        let id = this.ListNumber.indexOf(key);
        if (this.state.checkResuilt == null) {
            if(this.state.correctAns.find(e=>e == key)){
                return '#C7E519';
            }
            return '#f8e920';
        } else {
            if (this.state.mode === 'testing') {
                return '#f8e920';
            } else {
                if (this.ArrAnswer[id]) {
                    if (this.kqList[id]) {
                        return '#C7E519';
                    } else {
                        return '#EE5555';
                    }
                } else {
                    if (this.state.mode) {
                        return '#f8e920';
                    } else {
                        return '#EE5555';
                    }
                }
            }
        }
    }

    _OnChangeText(text, key) {
        let id = this.ListNumber.indexOf(key);
        this.ArrAnswer[id] = text;
        // console.log('ansArr',this.ArrAnswer);
        if (Platform.OS === 'android') {
            let widthIn = [...this.state.widthInput];
            widthIn[id] = SmartScreenBase.smPercenWidth * text.length * 2 + SmartScreenBase.smPercenWidth * 15;
            this.setState({widthInput: widthIn});
        }
        let dataAn = [...this.state.dataAns];
        dataAn[id] = text;
        this.setState({dataAns: dataAn});
        this.setState({ShowCheck: true});
        let c = 0;
        this.ArrAnswer.forEach((item) => {
            c += item ? 1 : 0;
        });
        if (c) {
            this.setState({disableBtnCheck: false});
        } else {
            this.setState({disableBtnCheck: true});
        }
    }

    _onChangeWidth = (width, key) => {
        if (Platform.OS === 'ios') {
            let id = this.ListNumber.indexOf(key);
            let widthIn = [...this.state.widthInput];
            widthIn[id] = width;
            this.setState({widthInput: widthIn});
        }
    };

    _withInput(key) {
        if (Platform.OS === 'ios') {
            return this.state.widthInput[this.ListNumber.indexOf(key)] && this.state.widthInput[this.ListNumber.indexOf(key)] > SmartScreenBase.smPercenWidth * 5 ? this.state.widthInput[this.ListNumber.indexOf(key)] + (SmartScreenBase.smPercenWidth * 12) : SmartScreenBase.smPercenWidth * 20;
        } else {
            return this.state.widthInput[this.ListNumber.indexOf(key)] && this.state.widthInput[this.ListNumber.indexOf(key)] > SmartScreenBase.smPercenWidth * 2 ? this.state.widthInput[this.ListNumber.indexOf(key)] : SmartScreenBase.smPercenWidth * 20;
        }
    }

    NumberCheck = 0;

    async _OnPressCheckResuilt() {
        await this.props.dispatch(ReadingD13Action(this.ArrAnswer));
        // console.log('dtAns',this.state.dataAns);
        // console.log('cheeckRes',this.state.checkResuilt);
        if (this.state.checkResuilt == null) {
            this.props.hideTypeExercise();
            let num = 0;
            let dataLesson = JSON.parse(this.state.logLearning.data_lesson);
            let dataAns = [...this.state.dataAnswer];
            // console.log('dtA',dataAns);
            let data = {};
            data['question_id'] = dataLesson.data_question[0].question_id;
            data['exercise_type'] = 'reading';
            data['question_type'] = dataLesson.data_question[0].list_option[0].question_type;
            data['question_score'] = 0;
            let dataDetails = {};
            dataDetails['num_turn'] = this.NumberCheck;
            dataDetails['score'] = 0;
            data['final_user_choice'] = [];
            dataDetails['user_choice'] = [];
            // console.log('dtas',this.state.data.answer);
            for (let index = 0; index < this.state.data.answer.length; index++) {
                console.log("go go go0")
                data['final_user_choice'].push(Utils.validWord(this.ArrAnswer[index]));
                console.log("go go go1")
                dataDetails['user_choice'].push(Utils.validWord(this.ArrAnswer[index]));
                console.log("go go go2")
                data['detail_user_turn'] = [];
                // let trimChar = Utils.validWord(this.ArrAnswer[index]);
                // console.log("go go go3",this.state.data.answer)
                //if (trimChar === Utils.validWord(this.state.data.answer[index])) {
                if(lessonMath.CheckAnswer(this.state.data.answer[index], this.ArrAnswer[index])){
                    this.kqList[index] = true;
                    console.log("go go go4")
                    data['question_score'] += 1/this.state.data.answer.length;// parseFloat(dataLesson.data_question[0].list_option[index].score);
                    dataDetails['score'] += 1/this.state.data.answer.length;//parseFloat(dataLesson.data_question[0].list_option[index].score);
                    num += 1;
                }else{
                    this.kqList[index] = false;
                }
            }
            this.setState({showQuestion: false});
            if (num === this.state.data.answer.length) {
                if (this.props.modeF === 'exam' || this.props.modeF === 'mini_test') {
                    this.props.setDataAnswer(dataAns);
                    // _saveLogExam(dataAns);
                } else {
                    this.props.hideTypeExercise();
                    this.state.checkResuilt = true;
                    this.props.showFeedback();
                }
            } else {
                this.NumberCheck += 1;
                this.state.checkResuilt = false;
            }
            // console.log('numCheck',this.NumberCheck);
            // console.log('dtAns',dataAns);
            if (this.NumberCheck < 2) {
                data['detail_user_turn'].push(dataDetails);
                dataAns.push(data);
            } else {
                this.props.hideTypeExercise();
                this.props.showFeedback();
                dataAns[0]['question_score'] = data['question_score'];
                dataAns[0]['final_user_choice'] = data['final_user_choice'];
                dataAns[0]['detail_user_turn'].push(dataDetails);
            }
            if (this.props.modeF === 'exam' || this.props.modeF === 'mini_test') {
                this.props.setDataAnswer(dataAns);
            } else {
                this.state.disableTouch = true;
                this.state.NumberTrue = num;
                this.setState({dataAnswer: dataAns});
            }
            this.state.enableEdit = false;
        } else if (this.state.checkResuilt == false) {
            this.props.showTypeExercise();
            this.setState({showQuestion: true,ShowCheck: false});

            if (this.NumberCheck < 2) {
                let dataAn = [...this.state.dataAns];
                dataAn.forEach((item, index) => {
                    if (item) {
                        // if(Utils.validWord(item) == Utils.validWord(this.state.data.answer[index])){
                        if(lessonMath.CheckAnswer(this.state.data.answer[index], item)){
                            this.kqList[index] = true;
                            console.log("go go go5")
                            this.state.correctAns.push(this.ListNumber[index]);
                        }else{
                            this.kqList[index] = false;
                            dataAn[index] = "";
                            this.ArrAnswer[index] = "";
                        }
                    }
                });
                this.setState({dataAns: dataAn});
                this.setState({
                    checkResuilt: null,
                    disableTouch: false,
                    enableEdit: true,
                    disableBtnCheck: true
                });
            } else {
                // this.props.methodScreen();
                this.props.hideFeedback();
                this.props.hideTypeExercise();
                this.setState({isLoading: true});
                this._saveLogLearning();
            }
        } else {
            // this.props.methodScreen();
            this.props.hideTypeExercise();
            this.props.hideFeedback();
            this.setState({isLoading: true});
            this._saveLogLearning();
        }
        this.setState({refresh: !this.state.refresh});
        
    }

    _renderBtn() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    style={{
                        width: SmartScreenBase.smPercenWidth * 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        backgroundColor: '#01283A',
                    }}
                    onPress={() => this.props.navigation.navigate('Reading')}
                >
                    <Text style={{color: '#fff'}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: SmartScreenBase.smPercenWidth * 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                    borderRadius: SmartScreenBase.smPercenWidth * 5,
                    backgroundColor: '#01283A',
                }}>
                    <Text style={{color: '#fff'}}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _explain() {
        this.props.hideTypeExercise();
        this.NumberCheck = 3;
        let num2 = 0;
        console.log("=====Chet o 1")
        for (let index = 0; index < this.ArrAnswer.length; index++) {
            if (this.kqList[index]) {
                num2 += 1;
            }
        }
        if (num2 >= this.state.data['answer'].length) {
            this.setState({checkResuilt: true});
        } else {
            this.setState({checkResuilt: false});
        }
        this.setState({btnEx: false});
        this.setState({NumberTrue: num2});
    }

    _backAfterTest() {
        if (this.props.modeF === 'review_result') {
            this.props.prevReviewResult();
        } else {
            if (!this.state.btnEx) {
                this.NumberCheck = 1;
                this.state.disableTouch = true;
                this.setState({checkResuilt: false});
                this.setState({btnEx: true});
            }
        }
    }

    _nextQuestion() {
        if (this.props.modeF === 'review_result') {
            this.props.nextReviewResult();
        }
    }

    _renderBtnEx() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: SmartScreenBase.smPercenWidth * 100,
            }}>
                <TouchableOpacity
                    style={{
                        width: SmartScreenBase.smPercenWidth * 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        backgroundColor: '#01283A',
                    }}
                    onPress={() => this._backAfterTest()}
                >
                    <Text style={{color: '#fff'}}>Back</Text>
                </TouchableOpacity>
                {
                    this.state.btnEx ?
                        <TouchableOpacity
                            style={{
                                width: SmartScreenBase.smPercenWidth * 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                                borderRadius: SmartScreenBase.smPercenWidth * 5,
                                backgroundColor: '#01283A',
                            }}
                            onPress={() => this._explain()}
                        >
                            <Text style={{color: '#fff'}}>Giải thích</Text>
                        </TouchableOpacity>
                        : null
                }
                <TouchableOpacity
                    style={{
                        width: SmartScreenBase.smPercenWidth * 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        backgroundColor: '#01283A',
                    }}
                    onPress={() => this._nextQuestion()}
                >
                    <Text style={{color: '#fff'}}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _renderBtnExplain() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    style={{
                        width: SmartScreenBase.smPercenWidth * 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        backgroundColor: '#01283A',
                    }}
                    onPress={() => this._backAfterTest()}
                >
                    <Text style={{color: '#fff'}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: SmartScreenBase.smPercenWidth * 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        backgroundColor: '#01283A',
                    }}
                    onPress={() => this._nextQuestion()}
                >
                    <Text style={{color: '#fff'}}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        // console.log(this.state)
        // console.log('this.ArrAnswer',this.ArrAnswer)
        return (
            this.state.isLoading
                ?
                <LoadingScreen/>
                :
                <View style={{flex: 1, alignItems: 'center'}}>
                    {/* <KeyboardAwareScrollView extraScrollHeight={0}> */}
                        {this.state.checkResuilt == null || this.state.checkResuilt == false && this.NumberCheck < 2 ? this._ShowQuestion() : this._ShowResuilt()}
                    <View style={{alignSelf: 'center', marginTop: SmartScreenBase.smPercenHeight * 3}}>
                        {
                            !this.state.mode ? (
                                <TouchableOpacity
                                    disabled={this.state.disableBtnCheck}
                                    style={this.state.disableBtnCheck ? StyleApp.Sty_Button_disable :StyleApp.Sty_Button}
                                    onPress={() => {
                                        this._OnPressCheckResuilt();
                                    }}>
                                    <Text style={StyleApp.Sty_Text_Button}>
                                        {
                                            this.state.checkResuilt == null
                                                ? 'KIỂM TRA'
                                                : this.state.checkResuilt == false && this.NumberCheck < 2
                                                ? 'LÀM LẠI'
                                                : 'TIẾP TỤC'
                                        }
                                    </Text>
                                </TouchableOpacity>
                            ) : this.state.mode === 'testing' ?
                                this._renderBtn()
                                : this.state.mode === 'afterTest' ?
                                    this._renderBtnEx()
                                    : this.state.mode === 'explain' ?
                                        this._renderBtnExplain()
                                        : null
                        }
                    </View>
                    {/* </KeyboardAwareScrollView> */}
                    {
                        this.state.checkResuilt === true && this.NumberCheck < 2 ?
                            <FileSound4 showImage={'true'}/>
                            :
                            this.state.checkResuilt === false && this.NumberCheck < 2 ?
                                <FileSound4 showImage={'false'}/>
                                :
                                null
                    }
                </View>
        );
    }

    _trimQuestion = (str) => {
        let searchStr = '}';
        let searchStrLen = '}'.length;
        let startIndex = 0, index, indices = [], start = 0, indexQ = 0;
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            let str1 = str.slice(startIndex, index + 1).match(/\{([^}]+)\}/)[1];
            let text = str.slice(start, index - (str1.length + 1)).trim();
            text.split(' ').forEach((item) => {
                indices.push(item);
            });
            indices.push('{item}');
            indexQ++;
            start = index + 1;
            startIndex = index + searchStrLen;
        }
        return indices;
    };

    layoutX = [];
    indexFocus = -1;
    // _onLayout = (layout) => {
    //     this.layoutX.push(layout.y - SmartScreenBase.smPercenHeight);
    // };

    _ShowQuestion() {
        let dataTrim = this.state.data.question.replace(/{(.*?)}/g,"______").split(' ');
        // console.log('dtTrim',dataTrim);
        const isIcon = this.state.checkResuilt == false && this.NumberCheck < 2
        return (
            <View style={{
                height: SmartScreenBase.smPercenHeight * (isIcon?70:60),
                marginTop:SmartScreenBase.smPercenHeight*(isIcon?5:0),
                }}>
                <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={Platform.OS === 'android' ? 110 : 0}>
                <View style={{height: '100%'}}>
                    {/* <ScrollView
                        ref="scroller"
                        scrollEnabled={this.state.scrollEnabled}
                        scrollEventThrottle={16}
                        onScroll={this.handleScroll}
                        onLayout={this.handleLayout}
                        onContentSizeChange={this.handleContentChange}
                        {...this.props}> */}
                        {
                            this.state.showQuestion
                                ?
                                <View style={{alignSelf: 'center'}}>
                                    <View style={[StyleLesson.Sty_View_Border, {
                                        alignItems: 'flex-start',
                                        // height: SmartScreenBase.smPercenHeight * 24,
                                    }]}>
                                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                            {
                                                this.state.data.intro ?
                                                    this.state.data.intro.split(' ').map((ques, key) => {
                                                        return (
                                                            <TouchableOpacity
                                                                key={key}
                                                                onLongPress={() => LessonBase.goTranslate(ques)}>
                                                                <Text style={{
                                                                    ...stylesApp.txt,
                                                                    fontSize: SmartScreenBase.smFontSize * 45,
                                                                }}>{ques.replace(/\n/g, ' ') + ' '}</Text>
                                                            </TouchableOpacity>
                                                        );
                                                    })
                                                    : null
                                            }
                                        </View>
                                    </View>
                                </View>
                                :
                                null
                        }
                        <View style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            marginTop: SmartScreenBase.smPercenHeight,
                        }}>
                            {this.state.checkResuilt == false && this.NumberCheck < 2 ?
                                    <Text style={{...StyleLesson.text_answer, textAlign: 'center'}}>BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.answer.length}</Text> 
                                : null}
                            <View style={[StyleLesson.Sty_View_Border, {
                                alignItems: 'flex-start',
                                zIndex: 0,
                                // height: this.state.scrollEnabled ? '100%' : SmartScreenBase.smPercenHeight * (
                                //     this.state.checkResuilt == false && this.NumberCheck < 2?50:32
                                // ),
                                paddingBottom: SmartScreenBase.smPercenHeight * 3
                            }]}>
                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {
                                        dataTrim.length ?
                                            dataTrim.map((item, key) => {
                                                return (
                                                    item.search(/_/) <0
                                                        ?
                                                        <View style={{alignItems: 'center',flexDirection: 'row'}}>
                                                        <Text onLongPress={() => LessonBase.goTranslate(item)}
                                                        style={{
                                                            ...stylesApp.txt,
                                                            fontSize: SmartScreenBase.smFontSize * 45,
                                                            paddingBottom: SmartScreenBase.smBaseHeight * 3,
                                                        }}> {item.replace(/\n/g, ' ')}</Text>
                                                        </View>
                                                        
                                                        :
                                                        <View
                                                            style={{
                                                                backgroundColor: this._ColorAnswer(key),
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                                borderColor: 'white',
                                                                borderRadius: SmartScreenBase.smPercenWidth * 2,
                                                            }}
                                                            // onLayout={(event) => this._onLayout(event.nativeEvent.layout)}
                                                        >
                                                            <View style={{
                                                                borderRightWidth: 1,
                                                                paddingHorizontal: SmartScreenBase.smPercenWidth * 2
                                                            }}>
                                                                <Text style={{
                                                                    ...StyleLesson.question_text,
                                                                    fontWeight: 'bold',
                                                                }}>
                                                                    {this.ListNumber.indexOf(key) + 1}
                                                                </Text>
                                                            </View>
                                                            <TextInput
                                                                editable={this.state.enableEdit? (this.state.correctAns.find(e=>e == key) ? false :  true) : false}
                                                                style={[stylesApp.txt, {
                                                                    fontSize: SmartScreenBase.smFontSize * 45,
                                                                    marginVertical: Platform.OS === 'android' ? 0 : SmartScreenBase.smPercenHeight/2,
                                                                    paddingVertical: 0,
                                                                    paddingHorizontal: SmartScreenBase.smPercenWidth,
                                                                    fontWeight: 'bold',
                                                                    minWidth: SmartScreenBase.smPercenWidth * 15
                                                                }]}
                                                                onChangeText={(text) => {
                                                                    this._OnChangeText(text, key);
                                                                }}
                                                                value={this.state.dataAns.length && this.state.dataAns[this.ListNumber.indexOf(key)] ? this.state.dataAns[this.ListNumber.indexOf(key)] : ''}
                                                                autoCapitalize={'none'}
                                                                onContentSizeChange={(event) => {
                                                                    this._onChangeWidth(event.nativeEvent.contentSize.width, key);
                                                                }}
                                                                // value={this.ArrAnswer[this.ListNumber.indexOf(index + 1)] ?? ''}
                                                                onFocus={() => this.indexFocus = this.ListNumber.indexOf(this.ListNumber.indexOf(key))}
                                                            />
                                                        </View>
                                                );
                                            })
                                            : null
                                    }
                                </View>
                            </View>
                        </View>
                    {/* </ScrollView> */}
                </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    _ShowResuilt() {
        // console.log('numTrue',this.state.NumberTrue);
        // console.log('ansNum',this.state.data.answer);
        return (
            <View>
                <View style={{alignItems: 'center', alignSelf: 'center', marginTop: SmartScreenBase.smPercenHeight * 3}}>
                    <View style={{
                        height: SmartScreenBase.smBaseWidth * 200,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <FileSound
                            showImage={this.state.NumberTrue == this.state.data.answer.length ? 'true' : 'false'}/>
                    </View>
                    <Text style={{
                        ...StyleLesson.text_answer
                    }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.answer.length}</Text>
                    <View style={{width: SmartScreenBase.smPercenWidth * 100, alignItems: 'center'}}>
                        <View style={{position: 'absolute', top: 0}}>
                            {/* <Image source={{uri: 'student_home_image13'}}
                                   style={[StyleLesson.Sty_ImageList, {transform: [{rotate: '180deg'}]}]}
                            /> */}
                        </View>
                        <View style={{height: SmartScreenBase.smPercenHeight * 50}}>
                            <FlatList
                                data={this.ArrAnswer}
                                extraData={this.state.refresh}
                                keyExtractor={(item, index) => 'item' + index}
                                renderItem={this.RenderItemResuilt.bind(this)}
                                contentContainerStyle={{alignItems: 'center'}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    RenderItemResuilt = ({item, index}) => {
        console.log("=====Chet o 2",item)
        console.log("=====Chet o 4",this.state.data.answer)
        return (
            <View style={[
                StyleLesson.Sty_View_Border, {
                    alignItems: 'flex-start',
                    borderWidth: SmartScreenBase.smPercenWidth / 2,
                    marginTop: SmartScreenBase.smBaseWidth * 130,
                    borderColor: !this.kqList[index] ? 'rgba(232,66,90,0.95)' : 'rgba(198,229,14,0.95)',
                }]}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', width: SmartScreenBase.smPercenWidth*82,marginTop: SmartScreenBase.smPercenHeight, justifyContent: 'flex-start'}}>
                    <Text style={{...stylesApp.txt, fontSize: smartFont * 50}}><Text
                        style={stylesApp.txt_Title}>{index + 1}. </Text> <Text style={{
                        color: !this.kqList[index] ? 'rgba(232,66,90,0.95)' : 'rgba(198,229,14,0.95)',
                        fontWeight: 'bold',
                        fontSize: smartFont * 60
                    }}>{this.ArrAnswer[index].toString()}  </Text></Text>
                    {
                        !this.kqList[index] ? (
                            <View style={{
                                flexDirection: 'row',
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={{uri: 'lesson_grammar_image3'}}
                                       style={{
                                           width: SmartScreenBase.smBaseWidth * 70,
                                           height: SmartScreenBase.smBaseWidth * 70,
                                           resizeMode: 'contain',
                                       }}
                                />
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: 'rgba(198,229,14,0.95)',
                                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                                    fontSize: smartFont * 60,
                                }}>
                                    {this.state.data.answer[index][0]}
                                </Text>
                            </View>
                        ) : null
                    }
                </View>
                <View style={{marginTop: SmartScreenBase.smPercenHeight, marginBottom: SmartScreenBase.smPercenHeight}}>
                    <Text style={[stylesApp.txt_Title, {fontWeight: 'bold'}]}>GIẢI THÍCH :</Text>
                    <Text style={{
                        ...stylesApp.txt,
                        fontStyle: 'italic',
                        fontSize: smartFont * 45,
                        padding: SmartScreenBase.smBaseHeight * 3,
                    }}>{this.state.data['explain'][index]}</Text>
                </View>
                <View style={{position: 'absolute', alignSelf: 'center', top: -SmartScreenBase.smBaseWidth * 70}}>
                    <Image
                        source={{uri: this.kqList[index] ? 'grammar1_4' : 'grammar1_3'}}
                        style={StyleLesson.Sty_Image_Small_Answer}
                    />
                </View>
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {
        data_answer: state.readingD13Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(ReadingD13);
