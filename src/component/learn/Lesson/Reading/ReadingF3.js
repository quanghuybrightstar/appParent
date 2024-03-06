import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Platform, FlatList, ScrollView, TextInput, Keyboard} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ButtonCheck from '../../../items/ButtonCheck';
import TypeExercise from '../Component/TypeExercise2';
import stylesApp from '../../../styleApp/stylesApp';
import StyleLesson from '../StyleLesson';
import FileSound from '../FileSound';
import API from '../../../../API/APIConstant';
import {connect} from 'react-redux';
import {ReadingD11Action} from '../../../../redux/actions/ReadingD11Action';
import axios from 'axios';
import WebView from 'react-native-webview';
import LoadingScreen from '../../../../screens/LoadingScreen';
import EventBus from 'react-native-event-bus';
import FileSound4 from "../FileSound4";
import StyleApp from '../../../../styleApp/stylesApp';
import stringUtils from '../../../../utils/stringUtils';
import { Colors } from '../../../../styleApp/color';
import LessonBase from '../../../../base/LessonBase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const smartFont = SmartScreenBase.smFontSize;

class ReadingF3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowCheck: false,
            ChooseAnswer: false,
            HeightLayoutTitle: 0,
            IndexChoose: -1,
            refresh: false,
            disableTouch: false,
            checkResuilt: null,
            NumberTrue: 0,
            data: {},
            minitest: false,
            mode: '',
            btnEx: false,
            webview: '',
            isLoading: true,
            vietnam: '',
            english: '',
            logLearning: {
                'class_id': 1,
                'unit_id': 1,
                'curriculum_id': 1,
            },
            dataLog: {},
            dataAnswer: [],
            enableEdit: true,
            dataAns: [],
            widthInput: [],
            heightScrool: SmartScreenBase.smPercenHeight * 43,
            scrollEnabled: false,
            disableBtnCheck: true,
            isQuestion: true,
            correctAns:[],
            keyboardShow:false,
        };
        this.ArrAnswer = [];
        this.ListNumber = [];
        this.ListIdAnswer = [];
        this.NumberCheck = 0;
        this.contentHeight = null;
        this.scrollHeight = null;
        this.scrollY = null;
        this.dataP = [];
        [
            'handleKeyboardShow', 'handleKeyboardHide',
            'handleLayout', 'handleContentChange', 'handleScroll',
        ].forEach((method) => {
            this[method] = this[method].bind(this);
        });
        this.resuFlatlist = React.createRef()
        this.keyboardScroll = React.createRef()
    }
    

    componentDidMount() {
        this._getQuestion();
        this.keyboardDidShowListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.handleKeyboardShow);
        this.keyboardDidHideListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.handleKeyboardHide);
        this.props.saveLogLearning([]);
    }
    
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    };

    // todo: handle layout instead of keyboard
    handleKeyboardShow = (e) => {
        // this.setState({scrollEnabled: true,keyboardShow:true});
        // this.setState({heightScrool: SmartScreenBase.smPercenHeight * 40 - e.endCoordinates.height * 0.6});
        // this.scrollToBottom();
        this.props.hideTypeExercise();
    };

    handleKeyboardHide() {
        // this.setState({heightScrool: SmartScreenBase.smPercenHeight * 43,keyboardShow:false});
        // this.setState({scrollEnabled: false});
        this.props.showTypeExercise();
    }

    handleScroll(e) {
        this.scrollY = e.nativeEvent.contentOffset.y;
    }

    handleLayout(e) {
        this.scrollHeight = e.nativeEvent.layout.height;
        this.scrollToBottom();
    }

    handleContentChange(w, h) {
        // repeated called on Android
        // should do diff
        if (h === this.contentHeight) {
            return;
        }
        this.contentHeight = h;

        if (this.scrollHeight == null) {
            setTimeout(() => {
                this.scrollToBottomIfNecessary();
            }, 500);
        } else {
            this.scrollToBottomIfNecessary();
        }
    }

    scrollToBottomIfNecessary() {
        // todo: range detection
        this.scrollToBottom();
    }

    scrollToBottom() {
        const {scrollHeight, contentHeight} = this;
        // console.log('123233')
        if (scrollHeight == null) {
            return;
        }

        if (contentHeight > scrollHeight) {
            if (this.indexFocus) {
                this.refs.scroller.scrollTo({y: this.layoutX[this.indexFocus]});
            }
        }
        if (contentHeight === scrollHeight) {
            this.refs.scroller.scrollTo({y: 100});
        }
    }

    _trimChar = (string) => {
        string = string.replace('‘', '\'').replace(/[\u2018\u2019]/g, '\'');
        while (string.charAt(string.length - 1) === '.' || string.charAt(string.length - 1) === ',') {
            string = string.substring(0, string.length - 1).trim();
        }
        return string;
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
                dataText['option'] = [];
                question.forEach(element => {
                    dataText['question'] = stringUtils.filterTextInNgoac(element.list_option[0].question_content);
                    this.setState({vietnam: element.list_option[0].group_content_vi});
                    this.setState({english: element.list_option[0].group_content});
                    element.list_option.forEach((e, i) => {
                        dataText['answer'].push(e.match_option_text[0]);
                        dataText['explain'].push(e.option_explain);
                        dataText['option'].push(e.match_option_text[0]);
                        if(i == 0){
                            dataText['option'] = dataText['option'].concat(e.jamming_answer_parse);
                        }
                    });
                });
                
                dataText['option'] = this._shuffle(dataText['option']);
                let dataQ = dataText.question.split(' ');
                dataQ.forEach((element, index) => {
                    let indexOf = element.search((/\{([^}]+)\}/));
                    if (indexOf !== -1) {
                        this.ListNumber.push(index);
                    }
                });
                for (let index = 0; index < dataText['answer'].length; index++) {
                    this.ArrAnswer.push('');
                    this.ListIdAnswer.push(-1);
                }
                this.setState({data: dataText});
                let dataQue = this.props.data_answer.data_answer;
                if (this.props.modeF === 'review_result') {
                    this.setState({minitest: true, mode: 'afterTest'});
                    this.ArrAnswer = dataQue;
                    let num = 0;
                    for (let index = 0; index < dataText.answer.length; index++) {
                        if (stringUtils.validWord(this.ArrAnswer[index]) === stringUtils.validWord(dataText.answer[index])) {
                            num += 1;
                        }
                    }
                    this.setState({btnEx: true, NumberTrue: num, dataAns: dataQue});
                    this.setState({disableTouch: true});
                    if (num >= dataQue.length) {
                        this.setState({checkResuilt: true});
                    } else {
                        this.setState({checkResuilt: false});
                    }
                }
                // this._saveStartLogLearning();
                this.setState({isLoading: false});
            }
        }
    }

    _shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    _CheckChooseAnswer(key) {
        let check = this.ListIdAnswer.filter(function (e) {
            return e == key;
        });
        if (check.length == 0) {
            return true;
        } else {
            return false;
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
                let trimChar = this.ArrAnswer[id] ? stringUtils.validWord(this.ArrAnswer[id]):'';
                if (trimChar == stringUtils.validWord(this.state.data.answer[id])) {
                    return '#C7E519';
                } else {
                    return '#EE5555';
                }
            }
        }
    }

    _OnPressCheckResuilt() {
        // this.props.dispatch(ReadingD11Action(this.ArrAnswer));
        this.resuFlatlist.current && this.resuFlatlist.current.scrollToOffset({ offset: 0, animated: false })
        this.keyboardScroll.current && this.keyboardScroll.current?.scrollToPosition(0, 0, false)
        if (this.state.checkResuilt == null) {
            console.log("resnull")
            this.props.hideTypeExercise();
            let num = 0;    
            let dataLesson = this.state.logLearning.data_lesson;
            dataLesson = JSON.parse(dataLesson);
            let dataAns = [...this.state.dataAnswer];
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
            for (let index = 0; index < this.state.data.answer.length; index++) {
                if (this.ArrAnswer[index]) {
                    data['final_user_choice'].push(stringUtils.validWord(this.ArrAnswer[index]));
                    dataDetails['user_choice'].push(stringUtils.validWord(this.ArrAnswer[index]));
                    data['detail_user_turn'] = [];
                    let trimChar = stringUtils.validWord(this.ArrAnswer[index]);
                    if (this.state.data.answer[index]) {
                        if (trimChar === stringUtils.validWord(this.state.data.answer[index])) {
                            //console.log(parseFloat(dataLesson.data_question[0].list_option[index].score),"scorrrreeeeeee")
                             data['question_score'] += 1/dataLesson.data_question[0].list_option.length// parseFloat(dataLesson.data_question[0].list_option[index].score);
                             dataDetails['score'] += 1/dataLesson.data_question[0].list_option.length// parseFloat(dataLesson.data_question[0].list_option[index].score);
                            num += 1;
                        }
                    }
                } else {
                    data['final_user_choice'].push('');
                    dataDetails['user_choice'].push('');
                    data['detail_user_turn'] = [];
                }
            }

            if (num === this.state.data.answer.length) {
                if (this.props.modeF === 'exam' || this.props.modeF === 'mini_test') {
                    this.props.setDataAnswer(dataAns);
                    this.setState({isQuestion: false});
                } else {
                    this.props.showFeedback();
                    this.props.hideTypeExercise();
                    this.setState({checkResuilt: true,isQuestion:false});
                }
            } else {
                this.NumberCheck += 1;
                this.setState({checkResuilt: false,isQuestion:false});
            }
            
            if (this.NumberCheck < 2) {
                data['detail_user_turn'].push(dataDetails);
                dataAns.push(data);
            } else {
                dataAns[0]['question_score'] = data['question_score'];
                dataAns[0]['final_user_choice'] = data['final_user_choice'];
                dataAns[0]['detail_user_turn'].push(dataDetails);
                this.props.showFeedback();
                this.props.hideTypeExercise();
            }
            if (this.props.modeF === 'exam' || this.props.modeF === 'mini_test') {
                this.props.setDataAnswer(dataAns);
                // _saveLogExam(dataAns);
            } else {
                this.setState({dataAnswer: dataAns});
                this.setState({NumberTrue: num});
                this.setState({disableTouch: true});
                this.setState({ChooseAnswer: false});
            }
            this.setState({enableEdit: false});
        } else if (this.state.checkResuilt == false) {
            this.setState({isQuestion: true});
            if (this.NumberCheck < 2) {
                let dataAn = [...this.state.dataAns];
                // this.ArrAnswer = [];
                // for (let index = 0; index < this.state.data.answer.length; index++) {
                //     this.ArrAnswer.push('');
                // }
                this.props.showTypeExercise();
                console.log('có vào');
                
                for (let i = 0; i < dataAn.length; i++) {
                    const item = dataAn[i];
                    if (item) {
                        let ansTrim = stringUtils.validWord(item);
                        let corAns = stringUtils.validWord(this.state.data.answer[i])
                        if (ansTrim != corAns) {
                            dataAn[i] = "";
                            this.ArrAnswer[i] = "";
                        }else{
                            this.state.correctAns.push(this.ListNumber[i]);
                        }
                    }
                }

                this.setState({dataAns: dataAn});
                this.setState({
                    disableTouch: false,
                    ShowCheck: false,
                    disableBtnCheck: true,
                    enableEdit: true,
                    checkResuilt: null
                });
            } else {
                //console.log("tính điểm nè")
                this.props.hideTypeExercise();
                this._saveLogLearning();
                this.props.hideFeedback();
            }
        } else {
            //console.log("res not null or false")
            this.props.hideTypeExercise();
            this.props.hideFeedback();
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
        for (let index = 0; index < this.ArrAnswer.length; index++) {
            if (stringUtils.validWord(this.ArrAnswer[index]) === stringUtils.validWord(this.state.data['answer'][index])) {
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
        // console.log('NumberCheck',this.NumberCheck)
        return (
            this.state.isLoading
                ?
                <LoadingScreen/>
                :
                <View style={{flex: 1, alignItems: 'center', alignSelf: 'center'}}>
                    <View>
                        {this.state.checkResuilt == null || 
                        (this.state.checkResuilt == false && this.NumberCheck < 2)
                        ? this._ShowQuestion() : this._ShowResuilt()}
                    </View>
                    {
                        !this.state.keyboardShow&&<View
                            style={{alignSelf: 'center', marginTop: SmartScreenBase.smPercenHeight * 3}}>
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
                    }
                    {
                        this.state.checkResuilt === false && this.NumberCheck < 2 &&
                        <FileSound4 showImage={"false"} />
                    }
                </View>
        );
    }

    _OnChangeText(text, key) {
       // console.log(this.state.correctAns,"111111111111111111111111111111111111111")
        let id = this.ListNumber.indexOf(key);
        this.ArrAnswer[id] = text;
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
        	this.setState({ disableBtnCheck: false });
        } else {
            this.setState({ disableBtnCheck: true });
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

    layoutX = [];
    indexFocus = -1;
    _onLayout = (layout, ques) => {
        if (ques !== -1) {
            this.layoutX.push(layout.y - SmartScreenBase.smPercenHeight);
        }
    };

    _ShowQuestion() {
        return (
            <View style={{alignSelf: 'center', alignItems: 'center'}}>
                <View onLayout={(e) => {
                    this.state.HeightLayoutTitle = e.nativeEvent.layout.height;
                }}
                      style={[{zIndex: 2}]}>
                </View>
                {
                    this.state.checkResuilt!=null&&<Text style={{
                        ...StyleLesson.text_answer
                    }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.answer.length}</Text>
                }
                <View style={{alignSelf: 'center', alignItems: 'center'}}>
                    {this.state.isQuestion && (
                        <View style={{
                                marginVertical: SmartScreenBase.smPercenHeight,
                                zIndex: 0,
                                height:SmartScreenBase.smPercenHeight*18,
                        }}>
                                <View style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center', 
                                }}>
                                    {
                                        this.state.data.option ?
                                            this.state.data.option.map((item, key) => {
                                                return (
                                                    <View key={item}
                                                        style={{
                                                            paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                                                            padding: SmartScreenBase.smPercenHeight / 2,
                                                            backgroundColor: this._CheckChooseAnswer(key) == true ? 'yellow' : '#EEC900',
                                                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                                                            borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                            borderColor: 'white',
                                                            marginHorizontal: SmartScreenBase.smPercenWidth,
                                                            marginVertical: SmartScreenBase.smPercenHeight,
                                                        }}
                                                    >
                                                        <Text style={StyleLesson.question_text}>{item}</Text>
                                                    </View>
                                                );
                                            }) : null
                                    }
                                </View>
                        </View>
                    )}
                    <View style={{height: this.state.checkResuilt!=null?SmartScreenBase.smPercenHeight*65: this.state.heightScrool}}>
                        {/* <ScrollView
                            ref="scroller"
                            scrollEnabled={this.state.scrollEnabled}
                            scrollEventThrottle={16}
                            onScroll={this.handleScroll}
                            onLayout={this.handleLayout}
                            onContentSizeChange={this.handleContentChange}
                            {...this.props}> */}
                            <View style={{alignSelf: 'center'}}>
                                <View style={[StyleLesson.Sty_View_Border, {
                                    alignItems: 'flex-start',
                                    zIndex: 0,
                                    height: this.state.scrollEnabled ? '100%' : (
                                        this.state.checkResuilt!=null?SmartScreenBase.smPercenHeight*60:SmartScreenBase.smPercenHeight * 40
                                    ) 
                                }]}>
                                    <KeyboardAwareScrollView
                                        ref={this.keyboardScroll}
                                        extraScrollHeight={Platform.OS === 'ios' ? -SmartScreenBase.smPercenHeight*28 : 0}
                                        enableOnAndroid={true} 
                                        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
                                        {
                                            this.state.data.question ?
                                                this.state.data.question.split(' ').map((ques, key) => {
                                                    return (
                                                        <View key={key} onLayout={(event) => this._onLayout(event.nativeEvent.layout, ques.search((/\{([^}]+)\}/)))}>
                                                            {
                                                                ques.search((/\{([^}]+)\}/)) !== -1 ? (
                                                                    <View style={{
                                                                        backgroundColor: this._ColorAnswer(key),
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        width: this._withInput(key),
                                                                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                                        borderColor: 'white',
                                                                        borderRadius: SmartScreenBase.smPercenWidth * 2,
                                                                        height: SmartScreenBase.smPercenHeight * 4,
                                                                    }}
                                                                    >
                                                                        <Text style={[stylesApp.txt, {
                                                                            ...StyleLesson.question_text,
                                                                            paddingHorizontal: SmartScreenBase.smPercenWidth * 1.5,                                                                            
                                                                            fontWeight: 'bold',
                                                                        }]}>{this.ListNumber.indexOf(key) + 1}</Text>
                                                                        <View style={{height: '80%', width: 1, backgroundColor: Colors.Black, marginRight: SmartScreenBase.smPercenWidth}}/>
                                                                        <TextInput
                                                                            autoCorrect={false}
                                                                            editable={this.state.enableEdit? (this.state.correctAns.find(e=>e == key) ? false :  true) : false}
                                                                            style={{
                                                                                fontSize: SmartScreenBase.smFontSize * 45,
                                                                                marginVertical: -5,
                                                                                paddingVertical: 0,
                                                                                width: this._withInput(key),
                                                                                fontWeight: 'bold',
                                                                                color:'black'
                                                                               // marginBottom : -5
                                                                            }}
                                                                            onChangeText={(text) => {
                                                                                this._OnChangeText(text, key);
                                                                            }}

                                                                            value={this.state.dataAns.length && this.state.dataAns[this.ListNumber.indexOf(key)] ? this.state.dataAns[this.ListNumber.indexOf(key)] : ''}
                                                                            autoCapitalize={'none'}
                                                                            onContentSizeChange={(event) => {
                                                                                this._onChangeWidth(event.nativeEvent.contentSize.width, key);
                                                                            }}
                                                                            // onFocus={() => {
                                                                            //     // this.keyboardAwareScroll.current.scrollToFocusedInput(ReactNative.findNodeHandle(event.target))
                                                                            //     console.log("=====hideTypeExercise 1");
                                                                            //     this.props.hideTypeExercise();
                                                                            //     this.indexFocus = this.ListNumber.indexOf(key)
                                                                            //   }}                                  
                                                                            // onEndEditing={() => {
                                                                            //     // console.log("=====showTypeExercise 1");
                                                                            //     // this.props.showTypeExercise();
                                                                            //   }}      
                                                                        />
                                                                    </View>
                                                                ) : (
                                                                    <TouchableOpacity
                                                                        onLongPress={() => LessonBase.goTranslate(ques)}
                                                                        style={{height: SmartScreenBase.smPercenHeight * 4,justifyContent:'center'}}
                                                                    >
                                                                        <Text style={{
                                                                            ...stylesApp.txt,
                                                                            ...StyleLesson.question_text,
                                                                            fontSize: SmartScreenBase.smFontSize * 40,
                                                                            paddingBottom: SmartScreenBase.smBaseHeight * 4,
                                                                        }}> {ques.replace(/\n/g, ' ')}</Text>
                                                                    </TouchableOpacity>
                                                                )}
                                                        </View>
                                                    );
                                                }) : null
                                        }
                                    </KeyboardAwareScrollView>
                                </View>
                            </View>
                        {/* </ScrollView> */}
                    </View>
                </View>
            </View>
        );
    }

    _ShowResuilt() {
        return (
            <View>
                <View style={{alignItems: 'center', alignSelf: 'center'}}>
                    <View style={{
                        height: SmartScreenBase.smPercenHeight * 13,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: SmartScreenBase.smPercenHeight
                    }}>
                        <FileSound showImage={this.state.NumberTrue===this.state.data.answer.length ? 'true' : 'false'}/>
                    </View>
                    <Text style={{
                        ...StyleLesson.text_answer
                    }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.answer.length}</Text>
                    <View style={{width: SmartScreenBase.smPercenWidth * 100, alignItems: 'center'}}>
                        <View style={{height: SmartScreenBase.smPercenHeight * 54}}>
                            <FlatList
                                ref={this.resuFlatlist}
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
        let trimChar = item ? stringUtils.validWord(item) : '';
        return (
            <View style={[StyleLesson.Sty_View_Border, {
                alignItems: 'flex-start',
                marginTop: SmartScreenBase.smBaseWidth * 120,
                borderWidth: SmartScreenBase.smPercenWidth / 2,
                borderColor: trimChar !== stringUtils.validWord(this.state.data.answer[index]) ? 'rgba(232,66,90,0.95)' : 'rgba(198,229,14,0.95)',
            }]}>
                <View style={{flexDirection: 'row', marginTop: SmartScreenBase.smPercenHeight}}>
                    <Text style={{...stylesApp.txt, fontSize: SmartScreenBase.smFontSize * 40}}><Text
                        style={stylesApp.txt_Title}>{index + 1}. </Text> <Text style={{
                        fontWeight: 'bold',
                        color: trimChar !== stringUtils.validWord(this.state.data.answer[index]) ? 'rgba(232,66,90,0.95)' : 'rgba(198,229,14,0.95)',
                        fontSize: smartFont * 50,
                    }}>{item}</Text> </Text>
                    {
                        trimChar !== stringUtils.validWord(this.state.data.answer[index]) ? (
                            <View style={{
                                flexDirection: 'row',
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                justifyContent: 'flex-end',
                            }}>
                                <Image source={{uri: 'lesson_grammar_image3'}}
                                       style={{
                                           width: SmartScreenBase.smBaseWidth * 60,
                                           height: SmartScreenBase.smBaseWidth * 60,
                                           resizeMode: 'contain',
                                       }}
                                />
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: 'rgba(198,229,14,0.95)',
                                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                                    fontSize: smartFont * 50,
                                }}>
                                    {this.state.data.answer[index]}
                                </Text>
                            </View>
                        ) : null
                    }
                </View>
                <View
                    style={{marginTop: SmartScreenBase.smPercenHeight, marginBottom: SmartScreenBase.smPercenHeightvc}}>
                    <Text style={stylesApp.txt_Title}>GIẢI THÍCH :</Text>
                    <Text style={{...stylesApp.txt, fontStyle: 'italic', fontSize: SmartScreenBase.smFontSize * 45}}>{this.state.data.explain[index]}</Text>
                </View>
                <View style={{position: 'absolute', alignSelf: 'center', top: -SmartScreenBase.smBaseWidth * 70}}>
                    <Image
                        source={{uri: trimChar === stringUtils.validWord(this.state.data.answer[index]) ? 'grammar1_4' : 'grammar1_3'}}
                        style={StyleLesson.Sty_Image_Small_Answer}
                    />
                </View>
            </View>
        );
    };
}


function mapStateToProps(state) {
    return {
        data_answer: state.readingD11Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(ReadingF3);
