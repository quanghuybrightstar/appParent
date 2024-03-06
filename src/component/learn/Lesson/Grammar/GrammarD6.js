import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Platform,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Animated,
    Dimensions,
    Keyboard,
} from 'react-native';
import FileSound from '../FileSound';

let dataAns = [];
const {width, height} = Dimensions.get('window');
import SmartScreenBase from '../../../../base/SmartScreenBase';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import EventBus from 'react-native-event-bus';
import base64 from 'react-native-base64';
import API from '../../../../API/APIConstant';
import {connect} from 'react-redux';
import {ActionListeningD4} from '../../../../redux/actions/ActionListeningD4';
import SoundQestion from '../../../SoundQuestion';
import stringUtils from '../../../../utils/stringUtils';
import font from '../../../../base/FontBase';
import LessonBase from '../../../../base/LessonBase';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
let lesson_text_audio;
let DataObject1 = new Object();
let ar = [];
let fakeAns = ['Q', 'prepare', 'red', 'Q', 'Black', 'Q'];

class GrammarD6 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkType: '',
            data: {
                question: '',
                answer: [],
                answers:[],
            },
            arPost: [],
            ShowCheck: false,
            refresh: false,
            enableEdit: true,
            checkResuilt: null,
            NumberTrue: 0,
            checkPlay: false,
            playState: 'paused', //playing, paused
            playSeconds: 0,
            duration: 0,
            ListNumber: [],
            dataFirt: {},
            ArrAnswer: [],
            ListIdAnswer: [],
            showImage: false,
            checkleng: 0,
            showWeb: false,
            String: '',
            isloading: false,
            showScript: false,
            title_ENG: '',
            title_VI: '',
            titlePress: false,
            valueY: new Animated.Value(0),
            arraycheck: [],
            logid: '',
            data_lesson: {},
            id: 0,
            audio: '',
        };
        //this.state.ArrAnswer = [];
        //this.state.ListIdAnswer = [];
        this.sliderEditing = false;
        this.NumberCheck = 0;
        this.History=[]
    }

    _showKeyBoad = () => {
        this.props.handleKeyboardShow(-height / 4 + 5);
    };
    _HideKeyBoad = () => {
        this.props.handleKeyboardHide();
    };

    shuffle(a) {
        let arr = [...a];
        var j, x, i;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    }

    componentWillMount(): void {
        let array = [];
        dataAns = [];
        Keyboard.addListener('keyboardDidShow', () => this._showKeyBoad());
        Keyboard.addListener('keyboardDidHide', () => this._HideKeyBoad());
        this.setState({isloading: true});
        this.setState({checkType: this.props.checkType});
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({data_lesson: response});
        // this._postDataFirt(response.data);
        //console.log(response);
        let exp = [];
        this.setState({dataFirt: response.data});
        lesson_text_audio = '';
        let question = '';
        var ans = [];
        var score = [];
        //console.log(lesson_text_audio);
        DataObject1 = new Object();
        var a1 = response.data.data_question[0].list_option[0].question_content.split(
            '{',
        )[0];
        for (
            let i = 0;
            i < response.data.data_question[0].list_option.length;
            i += 1
        ) {
            array.push(null);
            var a2 = response.data.data_question[0].list_option[0].question_content
                .split('{')
                [i + 1].split('}')[0];
            ans.push(a2);
            score.push(response.data.data_question[0].list_option[i].score);
            //console.log('ans', ans);
            var a3 = response.data.data_question[0].list_option[0].question_content
                .split('{')
                [i + 1].split('}')[1];
            var a4 = response.data.data_question[0].list_option[0].question_content
                .split('{')
                [response.data.data_question[0].list_option.length].split('}')[1];
            lesson_text_audio = lesson_text_audio + ' __ ' + a3;
            this.setState({
                title_ENG:
                response.data.data_question[0].list_option[0].group_content,
            });
            dataAns = response.data.data_question[0].list_option[0].jamming_answer.split(',');
            this.setState({
                title_VI:
                response.data.data_question[0].list_option[0].group_content_vi,
            });
            this.setState({audio: response.data.lesson.lesson_audio});
            let ob1 = new Object();
            ob1.ans = response.data.data_question[0].list_option[i].option_explain,
                ob1.text = response.data.data_question[0].list_option[i].match_option_text[0],
                exp.push(ob1);
            this.setState({id: response.data.data_question[0].question_id});
        }
        //console.log(ans);
        DataObject1.option = this.shuffle(dataAns);
        DataObject1.score = score;
        DataObject1.question = a1 + lesson_text_audio;
        DataObject1.answer = ans;
        DataObject1.answers = [];
        DataObject1.exp = exp;
        //console.log(DataObject1);
        this.setState({data: DataObject1});
        this.spliceFun(DataObject1);
        if (this.props.checkType === 'afterTest') {
            fakeAns = this.props.data_answer;
            this.setState({ArrAnswer: fakeAns});
            let num = 0;
            for (let index = 0; index < DataObject1.answer.length; index++) {
                if (
                    this._FunctionToReplaceQuestion(fakeAns[index].toLowerCase()) ==
                    this._FunctionToReplaceQuestion(DataObject1.answer[index].toLowerCase())
                ) {
                    num += 1;
                }
            }
            if (num === DataObject1.answer.length) {
                this.setState({showImage: true});
            }
            this.setState({NumberTrue: num});
            this.setState({ShowCheck: true});
            this.setState({checkResuilt: true});
        } else {
            //this.play(response.data.lesson.lesson_audio);
        }
        this.setState({isloading: false});
        this.setState({arraycheck: array});
    }

    _FunctionToReplaceQuestion = (Text) => {
        if (Text !== '' && Text !== null && Text !== undefined) {
            Text = Text.toLowerCase();
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
            //console.log(ApplyText);
            return (ApplyText);
        } else {
            return ('');
        }
    };

    spliceFun(DataObject1) {
        //debugger;
        //console.log(DataObject1);
        var List = [];
        for (
            let index = 0;
            index < DataObject1.question.split(' ').length;
            index++
        ) {
            if (DataObject1.question.split(' ')[index] == '__') {
                List.push(index);
                //console.log(this.state.ListNumber);
            }
        }
        //this.state.ListNumber.push(index);
        this.setState({ListNumber: List});
    }

    componentDidMount() {
        //console.log(this.state.data.answer.length);
        var listArrAnser = [];
        var listListIdAnswer = [];
        for (let index = 0; index < this.state.data.answer.length; index++) {
            listArrAnser.push('');
            this.state.ListIdAnswer.push(-1);
        }
        this.timeout = setInterval(() => {
            if (
                this.sound &&
                this.sound.isLoaded() &&
                this.state.playState == 'playing' &&
                !this.sliderEditing
            ) {
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({playSeconds: seconds});
                });
            }
        }, 100);
        this.props.saveLogLearning([]);
    }

    _TextAnswer(key) {
        let id = this.state.ListNumber.indexOf(key);
        return this.state.ArrAnswer[id];
    }

    play = async (link) => {
        if (this.sound) {
            this.sound.play(this.playComplete);
            this.setState({playState: 'playing'});
        } else {
            this.sound = new Sound(link, null, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    //Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({playState: 'paused'});
                } else {
                    this.setState({
                        playState: 'playing',
                        duration: this.sound.getDuration(),
                    });
                    this.sound.play(this.playComplete);
                }
            });
        }
    };
    playComplete = (success) => {
        if (this.sound) {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                //Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({playState: 'paused', playSeconds: 0});
            this.sound.setCurrentTime(0);
        }
    };

    componentWillUnmount() {
        if (this.sound) {
            this.sound.release();
            this.sound = null;
        }
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }

    pause = () => {
        if (this.sound) {
            this.sound.pause();
        }

        this.setState({playState: 'paused'});
    };

    _ColorAnswer(key) {
        let id = this.state.ListNumber.indexOf(key);
        if (this.state.checkResuilt == null) {
            return 'yellow';
        } else {
            if (
                this.state.ArrAnswer[id] &&
                this._FunctionToReplaceQuestion(this.state.ArrAnswer[id].toLowerCase()) ==
                this._FunctionToReplaceQuestion(this.state.data.answer[id].toLowerCase())
            ) {
                return 'rgba(198,229,14,0.95)';
            } else {
                return 'rgba(232,66,90,0.85)';
            }
        }
    }

    _onPressDicription = () => {
        this.setState({dicription: !this.state.dicription});
    };

    _OnShowScript() {
        this.setState({showScript: !this.state.showScript});
    }

    _OnChangeText(text, key) {
        this.state.arraycheck[key] = text;
        this.state.ArrAnswer[key] = text;

        this.setState({
            arraycheck: [...this.state.arraycheck],
        });
        

        for(let i=0; i < this.state.ArrAnswer.length; i++){
            if(!!this.state.ArrAnswer[i] && !this.state.data.answers[i]?.status){
                this.setState({
                    ShowCheck:true
                })
                return;
            }
        }
        this.setState({ShowCheck: false});
        ///this.setState({ShowCheck: true});
    }

    //NumberCheck = 0;

    _OnPressBack() {
        this.props.prevReviewResult();
    }

    _OnPressCheckResuilt() {
        this.pause();
            const {answer,answers} = this.state.data;
            const {ArrAnswer} = this.state;
            // console.log('ArrAnswer',ArrAnswer)
            // console.log('ans',answer)
            if (this.state.checkResuilt == null) {
                let num = 0;
                answer.forEach((e,i)=>{
                    if(!!ArrAnswer[i] && stringUtils.validWord(e) == stringUtils.validWord(ArrAnswer[i]) ){
                        num++;
                        answers[i] = {
                            status:true,
                            chose: ArrAnswer[i]
                        }
                    }
                })
                this.History.push(JSON.parse(JSON.stringify(answers)));
               
                if (num === this.state.data.answer.length) {
                    this.props.showFeedback();
                    this.props.hideTypeExercise();
                    this.setState({checkResuilt: true});
                    this.setState({showImage: true});
                } else {
                    this.NumberCheck += 1;
                    this.setState({checkResuilt: false});
                }
                let ob = new Object();
                ob.ans = this.state.ArrAnswer.slice('');
                ar.push(ob);
                this.setState({arPost: ar});
                this.setState({disableTouch: true});
                this.setState({NumberTrue: num});
                this.setState({enableEdit: false});
                if (this.NumberCheck >= 2) {
                    this.props.hideTypeExercise();
                    this.props.showFeedback();
                }
                
            } else if (this.state.checkResuilt == false) {
                if (this.NumberCheck < 2) {
                    let arrAnswer = [...this.state.ArrAnswer];
                    this.state.data.answer.forEach((item, index) => {
                        if(!this.state.data.answers[index]?.status){
                            arrAnswer[index] = '';
                        }
                    });
                    
                    this.setState({checkResuilt: null});
                    this.setState({ArrAnswer: arrAnswer});
                    this.setState({disableTouch: false});
                    this.setState({enableEdit: true});
                    this.setState({ShowCheck: false});
                } else {
                    this.props.hideTypeExercise();
                    this._Submit();
                    //this.props.methodScreen();
                }
            } else {
                this.props.hideTypeExercise();
                this._Submit();
                //this.props.methodScreen();
            }
            this.setState({refresh: !this.state.refresh});
    }

    moveWedView = (str) => {
        this.setState({showWeb: true});
        this.setState({String: str});
    };
    closeWebView = () => {
        this.setState({showWeb: false});
    };

    render() {
        //console.log(DataObject1);
        return (
            <SafeAreaView style={{flex: 1}}>
                <Animated.View
                    onStartShouldSetResponder={() => Keyboard.dismiss()}
                    //style={{bottom: this.state.valueY}}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            alignSelf: 'center',
                        }}>
                        {this.state.isloading === true ? (
                            <View
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    position: 'absolute',
                                    zIndex: 1500,
                                    //justifyContent: "space-around",
                                    padding: 10,
                                    backgroundColor: '#FFFFFF60',
                                }}>
                                <ActivityIndicator size="large" color="#0000ff"/>
                            </View>
                        ) : null}
                        {this.state.showScript === true ? (
                            <View
                                style={{
                                    width: SmartScreenBase.smBaseWidth * 1080,
                                    height: SmartScreenBase.smBaseHeight * 1080,
                                    backgroundColor: '#00000030',
                                    position: 'absolute',
                                    zIndex: 1000,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        width: SmartScreenBase.smBaseWidth * 970,
                                        height: SmartScreenBase.smBaseHeight * 600,
                                        backgroundColor: '#FFF',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnShowScript();
                                        }}>
                                        <Text
                                            style={[
                                                stylesApp.Sty_Text_Button,
                                                {color: '#000', marginLeft: '85%'},
                                            ]}>
                                            X
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={{width: '100%', height: '80%'}}>
                                        <Text style={{marginTop: 20, marginLeft: 20}}>
                                            {this.state.dataFirt.lesson.lesson_text_audio}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            height: '20%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    />
                                </View>
                            </View>
                        ) : null}
                        <View
                            showsVerticalScrollIndicator={false}>
                            {this.state.checkResuilt == null ||
                            (this.state.checkResuilt == false && this.NumberCheck < 2)
                                ? this._ShowQuestion()
                                : this._ShowResuilt()}
                        </View>
                        <View>
                            {
                                <View>
                                    {this.state.checkType === 'afterTest' ? (
                                        <View style={{flexDirection: 'row'}}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this._OnPressBack();
                                                }}
                                                style={[
                                                    stylesApp.Sty_Button,
                                                    {
                                                        width: SmartScreenBase.smPercenWidth * 10,
                                                        marginRight: SmartScreenBase.smPercenWidth * 5,
                                                    },
                                                ]}>
                                                <Text style={stylesApp.Sty_Text_Button}>Back</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this._onPressDicription();
                                                }}
                                                style={[
                                                    stylesApp.Sty_Button,
                                                    {
                                                        width: SmartScreenBase.smPercenWidth * 60,
                                                        marginRight: SmartScreenBase.smPercenWidth * 5,
                                                    },
                                                ]}>
                                                <Text style={stylesApp.Sty_Text_Button}>
                                                    Giải thích
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this._OnPressCheckResuilt();
                                                }}
                                                style={[
                                                    stylesApp.Sty_Button,
                                                    {width: SmartScreenBase.smPercenWidth * 10},
                                                ]}>
                                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : this.state.checkType === 'Testing' ? (
                                        <View style={{flexDirection: 'row'}}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this._SubmitTesting();
                                                }}
                                                style={[
                                                    stylesApp.Sty_Button,
                                                    {width: SmartScreenBase.smPercenWidth * 90},
                                                ]}>
                                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : this.state.checkResuilt == null ? (
                                        this.state.ShowCheck == true ?
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this._OnPressCheckResuilt();
                                                }}
                                                style={[
                                                    stylesApp.Sty_Button,
                                                ]}>
                                                <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                style={[
                                                    stylesApp.Sty_Button_disable,
                                                ]}>
                                                <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                            </TouchableOpacity>
                                    ) : this.state.checkResuilt == false &&
                                    this.NumberCheck < 2 ? (
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._OnPressCheckResuilt();
                                            }}
                                            style={[
                                                stylesApp.Sty_Button,
                                            ]}>
                                            <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={{flexDirection: 'row'}}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this._OnPressCheckResuilt();
                                                }}
                                                style={[
                                                    stylesApp.Sty_Button
                                                ]}>
                                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            }
                        </View>
                    </View>
                </Animated.View>
            </SafeAreaView>
        );
    }

    _Submit = async () => {
        const sc = parseFloat(1 / this.state.data.answer.length);
        var ans = {
            question_id: this.state.id,
            exercise_type : 'grammar',
            question_type : '8',
            final_user_choice:this.state.ArrAnswer.join(),
            detail_user_turn:this.History.map((e,i)=>{
                return {
                    num_turn: i+1,
                    user_choice: e.map(c=>c?.chose).join(),
                    score: e.filter(c=>c?.status).length * sc
                }
            }),
        }
        this.props.saveLogLearning([ans]);

    };
    _SubmitTesting = async () => {
        this.props.dispatch(ActionListeningD4(this.state.ArrAnswer));

        let copySaveArrayAns = [...this.state.arPost];
        let resual = [...this.state.ArrAnswer];
        let newObject = new Object();
        newObject.ans = resual;
        copySaveArrayAns.push(newObject);

        let num = 0;
        for (let index = 0; index < this.state.data.answer.length; index++) {
            if (
                this._FunctionToReplaceQuestion(this.state.ArrAnswer[index].toLowerCase()) ==
                this._FunctionToReplaceQuestion(this.state.data.answer[index].toLowerCase())
            ) {
                num += 1;
            }
        }

        let arrr = [];
        let ob = {};
        ob.question_id = this.props.lesson_id;
        ob.exercise_type = 'grammar';
        ob.question_type = '8';
        ob.final_user_choice = this.state.ArrAnswer;
        let a = [];
        for (let j = 0; j < this.state.arPost.length; j++) {
            let obj = {};
            obj.num_turn = j;
            obj.user_choice = this.state.arPost[j].ans;
            let c = 0;
            this.state.data.answer.forEach((item, index) => {
                let anOld = this._FunctionToReplaceQuestion(item.toLowerCase());
                let anNew = this.state.arPost[j].ans[index] ? this._FunctionToReplaceQuestion(this.state.arPost[j].ans[index].toLowerCase()) : '';
                c += anOld === anNew ? 1 : 0;
            });
            obj.score = c/this.state.data.answer;
            a.push(obj);
        }
        let count = 0;
        this.state.data.answer.forEach((item, index) => {
            let anOld = this._FunctionToReplaceQuestion(item.toLowerCase());
            let anNew = this.state.ArrAnswer[index] ? this._FunctionToReplaceQuestion(this.state.ArrAnswer[index].toLowerCase()) : '';
            count += anOld === anNew ? 1 : 0;
        });
        ob.question_score = count/this.state.data.answer;
        ob.detail_user_turn = a;
        arrr.push(ob);

        if (this.state.checkType === 'Testing') {
            this.props.setDataAnswer(arrr);
        }
    };
    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
    };

    _ShowQuestion() {
        let indexQ = -1;
        const {answers} = this.state.data;
        return (
            <View style={{
                alignSelf: 'center',
                alignItems: 'center',
                height: SmartScreenBase.smPercenHeight * 58,
                marginBottom: SmartScreenBase.smPercenHeight * 3,
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        margin: SmartScreenBase.smPercenHeight * 2,
                    }}>
                        {
                            this.state.checkResuilt!=null&&
                            <FileSound
                            showIcon='none'
                            showImage={this.state.NumberTrue === this.state.data.answer.length ? 'true' : 'false'}/>
                        }
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
                                justifyContent: 'center',
                            }}>
                            {this.state.data.option.map((item, key) => {
                                return (
                                    <View
                                            key={key}
                                            style={{
                                                paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                                                paddingVertical: SmartScreenBase.smPercenHeight / 2,
                                                backgroundColor: 'yellow',
                                                borderRadius: SmartScreenBase.smPercenWidth * 3,
                                                borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                borderColor: 'white',
                                                marginHorizontal: SmartScreenBase.smPercenWidth,
                                                marginBottom: SmartScreenBase.smPercenHeight,
                                            }}>
                                            <Text style={StyleLesson.question_text}>{item}</Text>
                                        </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
                <ScrollView>
                    <View
                        style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                        }}>
                        <View
                            style={[
                                {
                                    zIndex: 0,
                                    width: SmartScreenBase.smPercenWidth * 90,
                                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                                    backgroundColor: 'rgba(255,255,255,0.85)',
                                    padding: SmartScreenBase.smPercenHeight,
                                    alignSelf: 'center',
                                },
                            ]}>
                                {
                                    this.state.data.question.split('\n').map((sens,idx)=>{
                                        return <View key={idx} style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            alignItems: 'flex-start',
                                            marginBottom:SmartScreenBase.smPercenHeight * 1.5,
                                        }}
                                        >
                                            {
                                                sens.split(' ').map((ques,key)=>{
                                                    if(ques == '__'){
                                                        indexQ++;
                                                    }
                                                    let idxQ = indexQ;
                                                    return (
                                                        <View key={key} style={{height:SmartScreenBase.smPercenHeight*4,justifyContent:'center'}}>
                                                            {ques == '__' ? (
                                                                <View>
                                                                    <View
                                                                        style={{
                                                                            backgroundColor: this.state.checkResuilt==null?'yellow':( answers[idxQ]?.status ? 'rgba(198,229,14,0.95)':'rgba(232,66,90,0.95)' ),
                                                                            flexDirection: 'row',
                                                                            alignItems: 'center',
                                                                            borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                                            borderColor: 'white',
                                                                            borderRadius: SmartScreenBase.smPercenWidth * 2,
                                                                            justifyContent: 'center',
                                                                        }}>
                                                                        <View style={{borderRightWidth: 1, borderRightColor: '#000'}}>
                                                                            <Text
                                                                                style={[
                                                                                    StyleLesson.question_text,
                                                                                    {
                                                                                        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                                                                                        borderRightWidth: 1,
                                                                                        fontWeight: 'bold',
                                                                                    },
                                                                                ]}>
                                                                                {idxQ +1}
                                                                            </Text>
                                                                        </View>
                                                                        <TextInput
                                                                            editable={this.state.enableEdit && !answers[idxQ]?.status }
                                                                            style={[
                                                                                StyleLesson.question_text,
                                                                                {
                                                                                    marginVertical: 0,
                                                                                    paddingVertical: 0,
                                                                                    minWidth: SmartScreenBase.smPercenWidth * 15,
                                                                                    marginLeft: 5,
                                                                                    marginRight: 5,
                                                                                    fontFamily:font.MyriadPro_Bold,
                                                                                    color: 'black'
                                                                                },
                                                                            ]}
                                                                            onChangeText={(text) => {
                                                                                this._OnChangeText(text, idxQ);
                                                                            }}
                                                                            value={this.state.ArrAnswer[idxQ] ?? ''}
                                                                        />
                                                                    </View>
                                                                </View>
                                                            ) : (
                                                                <TouchableOpacity
                                                                    onLongPress={() => LessonBase.goTranslate(ques)}
                                                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                                                    <Text
                                                                        style={{...StyleLesson.question_text,}}>{ques.replace(/\n/g, '')} </Text>
                                                                </TouchableOpacity>
                                                            )}
                                                        </View>
                                                    );
                                                })
                                            }
                                        </View>
                                    })
                                }
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _ShowResuilt() {
        return (
            <View>
                <View style={{alignItems: 'center', alignSelf: 'center', marginBottom: SmartScreenBase.smPercenHeight * 3}}>
                    <View style={{
                        height: SmartScreenBase.smPercenHeight * 15,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <FileSound
                            showImage={this.state.NumberTrue === this.state.data.answer.length ? 'true' : 'false'}/>
                    </View>
                    <Text
                        style={StyleLesson.text_answer}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/
                        {this.state.data.answer.length}
                    </Text>
                    <View
                        style={{
                            width: SmartScreenBase.smPercenWidth * 100,
                            alignItems: 'center',
                        }}>
                        <View style={{height: SmartScreenBase.smPercenHeight * (Platform.OS==='ios'?53:51)}}>
                            <FlatList
                                data={this.state.data.exp}
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
        console.log("=====RenderItemResuilt",item.text)
        let anOld = this._FunctionToReplaceQuestion(item.text.toLowerCase());
        let anNew = this.state.ArrAnswer[index] ? this._FunctionToReplaceQuestion(this.state.ArrAnswer[index].toLowerCase()) : '';
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        paddingTop: SmartScreenBase.smPercenWidth * 3,
                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                        marginTop: SmartScreenBase.smPercenHeight * 5,
                        borderColor:
                            anOld !== anNew
                                ? 'rgba(232,66,90,0.95)'
                                : 'rgba(198,229,14,0.95)',
                    },
                ]}>
                <View
                    style={{flexDirection: 'row', alignItems: 'center', paddingTop: SmartScreenBase.smPercenWidth * 3}}>
                    <Text
                        style={{
                            ...StyleLesson.answer_text,
                            fontWeight: 'bold',
                            //textTransform: 'uppercase',
                            color: anOld !== anNew
                                ? 'rgba(232,66,90,0.95)'
                                : 'rgba(198,229,14,0.95)',
                        }}>
                        <Text style={StyleLesson.question_text}>{index + 1}. </Text>{' '}
                        {this.state.ArrAnswer[index] ?? ''}{' '}
                    </Text>
                    {anOld !== anNew ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                //alignItems: 'center',
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                // justifyContent: 'center',
                                //backgroundColor:'red'
                            }}>
                            <Image
                                source={{uri: 'lesson_grammar_image3'}}
                                style={StyleLesson.Image_Explain}
                            />
                            <Text
                                style={[
                                    StyleLesson.question_text,
                                    {
                                        fontWeight: 'bold',
                                        color: 'rgba(198,229,14,0.95)',
                                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                                        //textTransform: 'uppercase',
                                    },
                                ]}>
                                {item.text}
                            </Text>
                        </View>
                    ) : null}
                </View>
                {this.state.checkType === 'afterTest' ? (
                    <View style={{marginTop: 15}}>
                        <Text style={[stylesApp.txt_Title]}>GIẢI THÍCH :</Text>
                        <Text
                            style={[
                                stylesApp.txt,
                                {
                                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                                    fontStyle: 'italic',
                                },
                            ]}>
                            {item.ans}
                        </Text>
                    </View>
                ) : (
                    <View style={{marginTop: SmartScreenBase.smPercenHeight * 2}}>
                        <Text style={StyleLesson.text_explain}>GIẢI THÍCH :</Text>
                        <Text
                            style={[
                                StyleLesson.explain_text,
                                {
                                    fontStyle: 'italic',
                                },
                            ]}>
                            {item.ans}
                        </Text>
                    </View>
                )}

                <View
                    style={{
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 56,
                        alignSelf: 'center',
                    }}>
                    <Image
                        source={{
                            uri:
                                anOld === anNew
                                    ? 'grammar1_4'
                                    : 'grammar1_3',
                        }}
                        style={StyleLesson.Sty_Image_Small_Answer}
                    />
                </View>
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {
        data_answer: state.ListeningD4Reducer.data_answer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(GrammarD6);
