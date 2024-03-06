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
    Animated,
    Dimensions,
    Keyboard,
} from 'react-native';
import FileSound from '../FileSound';
import FileSound4 from '../FileSound4';

const {width, height} = Dimensions.get('window');
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Slider from '@react-native-community/slider';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import Iconcheck from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import EventBus from 'react-native-event-bus';
import base64 from 'react-native-base64';
import API from '../../../../API/APIConstant';
import {connect} from 'react-redux';
import {ActionListeningD4} from '../../../../redux/actions/ActionListeningD4';
import SoundQestion from '../../../SoundQuestion';
import stringUtils from '../../../../utils/stringUtils';
import ModalScript from '../../../modalScript/index';
import lessonMath from '../../../../utils/lessonMath';
import LessonBase from '../../../../base/LessonBase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontBase from '../../../../base/FontBase';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
let lesson_text_audio;
let DataObject1 = new Object();
let ar = [];
let fakeAns = ['Q', 'prepare', 'red', 'Q', 'Black', 'Q'];

class ListeningD3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkType: '',
            data: {
                question: '',
                answer: [],
            },
            arPost: [],
            ShowCheck: false,
            refresh: false,
            enableEdit: true,
            enableEditByText:[],
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
            number: 0,
            showKey: false,
        };
        //this.state.ArrAnswer = [];
        //this.state.ListIdAnswer = [];
        this.kqList = [];
        this.sliderEditing = false;
    }

    _showKeyBoad = () => {
        // this.setState({showKey: true});
        this.props.hideTypeExercise();
        // this.props.handleKeyboardShow(-SmartScreenBase.smPercenHeight * 10);
    };
    _HideKeyBoad = () => {
        // this.setState({showKey: false});
        this.props.showTypeExercise();
        // this.props.handleKeyboardHide();
    };

    componentWillMount() {
        ar = [];
        let array = [];
        Platform.OS === 'ios' ? Keyboard.addListener('keyboardWillShow', () => this._showKeyBoad()) : Keyboard.addListener('keyboardDidShow', () => this._showKeyBoad());
        Platform.OS === 'ios' ? Keyboard.addListener('keyboardWillHide', () => this._HideKeyBoad()) : Keyboard.addListener('keyboardDidHide', () => this._HideKeyBoad());
        this.setState({isloading: true});
        this.setState({checkType: this.props.checkType});
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({data_lesson: response});
        let exp = [];
        this.setState({dataFirt: response.data});
        lesson_text_audio = '';
        var ans = [];
        var score = [];
        //console.log(lesson_text_audio);this.state.data.question.split(/\n/g)
        DataObject1 = new Object();
        var a1 = response.data.data_question[0].list_option[0].question_content.split('{')[0];
        for (
            let i = 0;
            i < response.data.data_question[0].list_option.length;
            i += 1
        ) {
            array.push(null);
            var a2 = response.data.data_question[0].list_option[i].match_option_text;
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
            this.setState({
                title_VI:
                response.data.data_question[0].list_option[0].group_content_vi,
            });

            this.setState({audio: response.data.lesson.lesson_audio});
            let ob1 = new Object();
            ob1.ans = response.data.data_question[0].list_option[i].option_explain,
                ob1.text = response.data.data_question[0].list_option[i].match_option_text,
                exp.push(ob1);
            this.setState({id: response.data.data_question[0].question_id});
        }
        //console.log(ans);
        DataObject1.score = score;
        DataObject1.question = a1 + lesson_text_audio;
        DataObject1.answer = ans;
        DataObject1.exp = exp;

        this.setState({data: DataObject1});
        this.spliceFun(DataObject1);

        let listArrAnser = [];
        DataObject1.question.split(/\n/g).forEach((item, index) => {
            item.split(' ').forEach((it, i) => {
                let data = {};
                if (it === '__') {
                    data['pr'] = index;
                    data['child'] = i;
                    listArrAnser.push(data);
                }
            });
        });

        this.setState({ListIdAnswer: listArrAnser});
        this.setState({isloading: false});
        this.setState({arraycheck: array});
    }

    _FunctionToReplaceQuestion = (Text) => {
        // if (Text !== '' && Text !== null && Text !== undefined) {
        //     let ApplyText = Text.trim();
        //     while (ApplyText.substr(ApplyText.length - 1) === '.' || ApplyText.substr(ApplyText.length - 1) === ',') {
        //         ApplyText = ApplyText.substring(0, ApplyText.length - 1);
        //         ApplyText = ApplyText.trim();
        //     }
        //     let findReplaceQuestionStatus = ApplyText.indexOf('‘');
        //     let findReplaceQuestionStatus1 = ApplyText.indexOf('\'');
        //     //console.log(findReplaceQuestionStatus);
        //     if (findReplaceQuestionStatus !== -1 || findReplaceQuestionStatus1 !== -1) {
        //         ApplyText = ApplyText.toLowerCase().replace('‘', '’').replace('\'', '’');
        //     }
        //     //console.log(ApplyText);
        //     return (ApplyText);
        // } else {
        //     return ('');
        // }
        return stringUtils.validWord(Text)
    };

    spliceFun(DataObject1) {
        console.log(DataObject1);
        //console.log(DataObject1);
        var List = [];
        DataObject1.question.split(/(?:\r\n|\r|\n)/g).map((i, d) => {
            for (
                let index = 0;
                index < i.split(' ').length;
                index++
            ) {
                if (DataObject1.question.split(' ')[index] == '__') {
                    List.push(index);
                    //console.log(this.state.ListNumber);
                }
            }
        });
        // this.state.ListNumber.push(index);
        this.setState({ListNumber: List});
    }

    componentDidMount() {
        //console.log(this.state.data.answer.length);
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
        if (this.state.checkResuilt == null) {
            return 'yellow';
        } else {
            if (this.state.ArrAnswer[key]) {
                if (this.kqList[key]) {
                    return 'rgba(198,229,14,0.95)';
                } else {
                    return 'rgba(232,66,90,0.85)';
                }
            } else {
                return 'rgba(232,66,90,0.85)';
            }
        }
    }

    _onPressDicription = () => {
        this.setState({dicription: !this.state.dicription});
    };

    _OnShowScript() {

        this.setState({showScript: true});
    }

    _OffShowScript() {
        this.setState({showScript: false});
    }

    _OnChangeText(text, key, keyIndex) {
        this.state.arraycheck[keyIndex] = text;
        this.state.ArrAnswer[keyIndex] = text;
        let check = false;
        this.state.ArrAnswer.forEach((item, index) => {
            if (!!item && this.state.enableEditByText.indexOf(index) <0) {
                check = true;
            }
        });
        this.setState({ShowCheck: check});
    }

    NumberCheck = 0;

    _OnPressBack() {
        this.props.prevReviewResult();
    }

    _trimChar = (string) => {
        return stringUtils.validWord(string)
    };

    // Check đúng sai
    _OnPressCheckResuilt() {
        this.pause();
        //console.log(this.state.checkType,"--------------ntd---------");
       // console.log(this.state.checkResuilt,"--------------ntd-Res--------");{
            if (this.state.checkResuilt == null) {
                this.props.hideTypeExercise();
                let num = 0;
                for (let index = 0; index < this.state.data.answer.length; index++) {
                    this.kqList[index] = false
                    if (this.state.ArrAnswer[index]) {
                        if (lessonMath.CheckAnswer(this.state.data.answer[index], this.state.ArrAnswer[index])) {
                            num += 1;
                            this.kqList[index] = true
                        }
                    }
                    console.log("=====_OnPressCheckResuilt1",this.state.ArrAnswer[index])
                    console.log("=====_OnPressCheckResuilt2",this.state.data.answer[index])
                }
                if (num === this.state.data.answer.length) {

                    this.props.showFeedback();
                    this.setState({checkResuilt: true});
                    this.setState({showImage: true});
                } else {

                    this.NumberCheck += 1;
                    <FormData showImage={false}/>;
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
                    this.props.showFeedback();
                    this.props.hideTypeExercise();
                }
            } else if (this.state.checkResuilt == false) {
                let array = [...this.state.ArrAnswer];
                for (let index = 0; index < this.state.data.answer.length; index++) {
                    if (this.state.ArrAnswer[index] && lessonMath.CheckAnswer(this.state.data.answer[index], this.state.ArrAnswer[index])) {
                        this.kqList[index] = true
                        if(this.state.ArrAnswer[index]){
                            this.state.enableEditByText.push(index);
                        }  
                    }else{
                        this.kqList[index] = false
                        array[index] = '';
                    }
                }
                if (this.NumberCheck < 2) {
                    this.props.showTypeExercise();
                    // let check = false;
                    // array.forEach((item) => {
                    //     if (item) {
                    //         check = true;
                    //         return false;
                    //     }
                    // });

                    // if (check) {
                         this.setState({ShowCheck: false});
                    // } else {
                    //     this.setState({ShowCheck: false});
                    // }
                    this.setState({
                        ArrAnswer: array,
                        checkResuilt: null,

                    });
                    this.setState({disableTouch: false});
                    this.setState({enableEdit: true});
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

    // moveWedView = (str) => {
    //     this.setState({showWeb: true});
    //     this.setState({String: str});
    // };

    render() {
        return (
            <View style={{flex: 1}}>
                <Animated.View
                    onStartShouldSetResponder={() => Keyboard.dismiss()}
                    // style={{ bottom: this.state.valueY }}
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

                        <View
                            style={{
                                minHeight: this.state.show ? height / 1.6 : height / 1.7,
                                // backgroundColor: 'blue'
                            }}
                            showsVerticalScrollIndicator={false}>
                            {this.state.checkResuilt == null ||
                            (this.state.checkResuilt == false && this.NumberCheck < 2)
                                ? this._ShowQuestion()
                                : this._ShowResuilt()}
                        </View>

                        <View
                            style={{
                                height: SmartScreenBase.smPercenHeight * 10,
                                width: '100%',
                                alignItems: 'center',
                            }}>
                            {
                                <View>
                                    {this.state.checkType === 'Testing' ? (
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
                                        this.state.ShowCheck === true ?
                                            <TouchableOpacity
                                                disabled={this.state.ShowCheck == true ? false : true}
                                                onPress={() => {
                                                    this._OnPressCheckResuilt();
                                                }}
                                                style={{...stylesApp.Sty_Button, marginTop: 15}}>
                                                <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                disabled={this.state.ShowCheck == true ? false : true}
                                                // onPress={() => {
                                                //     this._OnPressCheckResuilt();
                                                // }}
                                                style={{...stylesApp.Sty_Button_disable, marginTop: 15}}>
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
                                                , {marginTop: 15},
                                            ]}>
                                            <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flex: 1,
                                        }}>
                                            {this.state.checkResuilt == null ? null : this.state
                                                .checkResuilt == false &&
                                            this.NumberCheck < 2 ? null : (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this._OnShowScript();
                                                    }}
                                                    style={[
                                                        stylesApp.Sty_Button,
                                                        {
                                                            width: SmartScreenBase.smPercenWidth * 40,
                                                            marginRight:
                                                                this.state.checkResuilt == null
                                                                    ? 0
                                                                    : this.state.checkResuilt == false &&
                                                                    this.NumberCheck < 2
                                                                    ? 0
                                                                    : SmartScreenBase.smPercenWidth * 5,
                                                        },
                                                    ]}>
                                                    <Text style={stylesApp.Sty_Text_Button}>SCRIPT</Text>
                                                </TouchableOpacity>
                                            )}
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this._OnPressCheckResuilt();
                                                }}
                                                style={[
                                                    stylesApp.Sty_Button,
                                                    {
                                                        width:
                                                            this.state.checkResuilt == null
                                                                ? SmartScreenBase.smPercenWidth * 90
                                                                : this.state.checkResuilt == false &&
                                                                this.NumberCheck < 2
                                                                ? SmartScreenBase.smPercenWidth * 90
                                                                : SmartScreenBase.smPercenWidth * 40,
                                                    },
                                                ]}>
                                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            }
                        </View>
                    <ModalScript
                        audio={this.state.audio}
                        visible={this.state.showScript}
                        title={this.state.dataFirt.lesson.lesson_text_audio}
                        close={() => { this.setState({showScript: false});
                    }}
                    />
                    </View>
                </Animated.View>
                {console.log("=====dabat",this.state.showScript)}
            </View>
        );
    }

    _Submit = async () => {
        let arrr = [];

        let ob = new Object();
        ob.question_id = this.state.id;
        ob.exercise_type = 'listening';
        ob.question_type = '4';
        ob.final_user_choice = this.state.ArrAnswer.join().toString();
        ob.question_score =  0;

        const score = 1/this.state.data.answer.length;

        let a = [];
        for (let j = 0; j < this.state.arPost.length; j++) {
            let obj = new Object();
            obj.num_turn = j;
            obj.user_choice = this.state.arPost[j].ans?.join();
            let rig = 0;
            this.state.arPost[j].ans.forEach((e,i)=>{
                if(this.kqList[i]){    
                    rig++;
                }
            })
            obj.score = rig * score;
            a.push(obj);
        }
        ob.detail_user_turn = a;
        // 
        arrr.push(ob);
        this.props.saveLogLearning(arrr);
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
            if (this.state.ArrAnswer[index] && lessonMath.CheckAnswer(this.state.data.answer[index] ,this.state.ArrAnswer[index])) {
                num += 1;
            }
        }

        let arrr = [];
        let ob = new Object();
        ob.question_id = this.state.id;
        ob.exercise_type = 'listening';
        ob.question_type = '4';
        ob.question_score = 0;
        ob.final_user_choice = this.state.ArrAnswer.join().toString();
        let a = [];
        for (let j = 0; j < copySaveArrayAns.length; j++) {
            let obj = new Object();
            obj.num_turn = j;
            obj.user_choice = 'this.state.arPost[j].join().toString()';
            obj.score = 1 / this.state.ArrAnswer.length * num;
            a.push(obj);
        }
        ob.detail_user_turn = a;
        arrr.push(ob);
        //console.log(arrr);

        if (this.state.checkType === 'Testing') {
            this.props.setDataAnswer(arrr);
        }
    };
    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
    };

    _getIndex = (parent, child) => {
        let index = 0;
        this.state.ListIdAnswer.forEach((item, i) => {
            if (item.pr === parent && item.child === child) {
                index = i;
                return false;
            }
        });
        return index;
    };

    _ShowQuestion() {
        var index = 0;
        return (
            <View style={{alignSelf: 'center', alignItems: 'center', height: this.state.checkResuilt == false && this.NumberCheck < 2 ? Platform.OS === 'ios' ?  height * 0.75 : height * 0.72 : Platform.OS === 'ios' ? height * 0.60 : height * 0.57}}>
                {this.state.checkResuilt == false && this.NumberCheck < 2 ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                            width: '90%',
                            paddingVertical: SmartScreenBase.smPercenHeight * 4,
                        }}>
                        <Text
                            style={{
                                marginTop: SmartScreenBase.smPercenHeight,
                                color: 'white',
                                fontWeight: '600',
                                fontSize: 20,
                                fontFamily: 'iCielSoupofJustice',
                            }}>
                            BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/
                            {this.state.data.answer.length}
                        </Text>
                        <FileSound4 showImage={this.state.showImage}/>
                    </View>
                ) : (
                    <View
                        style={{
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            // alignSelf: 'center',
                            width: '90%',
                            marginTop: SmartScreenBase.smPercenHeight*2,
                        }}>
                        <SoundQestion
                            Audio={this.state.audio}
                        />

                    </View>
                )}
                <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={Platform.OS === 'ios' ? -SmartScreenBase.smPercenHeight*30 : -SmartScreenBase.smPercenHeight*7}>
                    <View
                        style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            marginTop: SmartScreenBase.smPercenHeight * 4,
                            backgroundColor: 'rgba(255,255,255,0.85)',
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                            padding: SmartScreenBase.smPercenHeight,
                        }}>
                        {this.state.data.question.split(/\n/g).map((ques, key) => {
                            return (
                                <View
                                    style={[
                                        {
                                            zIndex: 0,
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            // alignItems: 'flex-start',
                                            width: SmartScreenBase.smPercenWidth * 90,
                                            alignItems: 'center',
                                        },
                                    ]}>
                                    {
                                        ques.split(' ').map((ques1, key1) => {
                                            if(ques1 == '__'){
                                                index++;
                                            }
                                            return (
                                                <View key={key1}>
                                                    {ques1 == '__' ? (
                                                        < View>
                                                            <View
                                                                style={{
                                                                    backgroundColor: this._ColorAnswer(this._getIndex(key, key1)),
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    //width: SmartScreenBase.smPercenWidth * 25,
                                                                    borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                                    borderColor: 'white',
                                                                    borderRadius: SmartScreenBase.smPercenWidth * 2,
                                                                    justifyContent: 'center',
                                                                }}>
                                                                <View style={{
                                                                    borderRightWidth: 1,
                                                                    borderRightColor: '#000',
                                                                }}>
                                                                    <Text
                                                                        style={[
                                                                            {
                                                                                paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                                                                                borderRightWidth: 1,
                                                                                ...StyleLesson.question_text,
                                                                                color: '#000'
                                                                            },
                                                                        ]}>
                                                                        {this._getIndex(key, key1) + 1}
                                                                    </Text>
                                                                </View>

                                                                <TextInput
                                                                    editable={this.state.enableEditByText.find(e=>e == (index -1)) != null ? false :this.state.enableEdit}
                                                                    returnKeyType="done"
                                                                    blurOnSubmit={true}
                                                                    autoCorrect={false}
                                                                    style={{
                                                                        marginVertical: 0,
                                                                        paddingVertical: 0,
                                                                        //width: SmartScreenBase.smPercenWidth * 15,
                                                                        minWidth: SmartScreenBase.smPercenWidth * 8,
                                                                        marginLeft: 5,
                                                                        marginRight: 5,
                                                                        ...StyleLesson.question_text,
                                                                        color: '#000',
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                    onChangeText={(text) => {
                                                                        this._OnChangeText(text, key1, this._getIndex(key, key1));
                                                                    }}
                                                                    value={this.state.ArrAnswer[this._getIndex(key, key1)] ? this.state.ArrAnswer[this._getIndex(key, key1)] : ''}
                                                                />
                                                            </View>
                                                        </View>
                                                    ) : (
                                                        <TouchableOpacity
                                                            onLongPress={() => LessonBase.goTranslate(ques1)}
                                                            style={[StyleLesson.question_text, {zIndex: 0}]}>
                                                            <Text style={{...StyleLesson.question_text}}>{ques1} </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                </View>
                                            );
                                        })
                                    }
                                </View>
                            );
                        })}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    _ShowResuilt() {
        return (
            <View>
                <View style={{alignItems: 'center', alignSelf: 'center'}}>
                    <View style={{
                        height: SmartScreenBase.smBaseWidth * 400,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <FileSound
                            showImage={this.state.NumberTrue === this.state.data.answer.length ? 'true' : 'false'}/>
                    </View>
                    <Text
                        style={{
                            // marginTop: SmartScreenBase.smPercenHeight,
                            fontWeight: '600',
                            color: '#fff',
                            fontSize: 20,
                            fontFamily: 'iCielSoupofJustice',
                            marginBottom: SmartScreenBase.smPercenHeight * 4,
                        }}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/
                        {this.state.data.answer.length}
                    </Text>

                    <View
                        style={{
                            width: SmartScreenBase.smPercenWidth * 100,
                            alignItems: 'center',
                        }}>
                        {/* <View style={{position: 'absolute', top: 0}}>
                            <Image
                                source={{uri: 'student_home_image13'}}
                                style={[
                                    StyleLesson.Sty_ImageList,
                                    {transform: [{rotate: '180deg'}]},
                                ]}
                            />
                        </View> */}
                        <View style={{height: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 50 : SmartScreenBase.smPercenHeight * 47}}>
                            <FlatList
                                data={this.state.data.answer}
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
        // let index1 = this.state.data.exp.findIndex(x => this._FunctionToReplaceQuestion(x.text.toLowerCase()) === this._FunctionToReplaceQuestion(this.state.data.answer[index].toLowerCase()));
        var setColorByAnswer = false;
        if(!this.state.ArrAnswer[index]){
            setColorByAnswer  = true;
        }else{
            if(!this.kqList[index]){
                setColorByAnswer = true;
            }
        }
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                        marginTop: 20,
                        borderColor:
                           
                            setColorByAnswer
                                ? 'rgba(232,66,90,0.95)'
                                : 'rgba(198,229,14,0.95)',
                    },
                ]}
                >
                <View
                    style={{width: SmartScreenBase.smPercenWidth*84 ,flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: 15, justifyContent: 'flex-start'}}>
                    <Text
                        style={{
                            fontFamily: FontBase.MyriadPro_Bold,
                            //textTransform: 'uppercase',
                            fontSize: SmartScreenBase.smFontSize*48,
                            color: setColorByAnswer
                                ? 'rgba(232,66,90,0.95)'
                                : 'rgba(198,229,14,0.95)',
                        }}>
                        <Text style={stylesApp.txt_Title}>{index + 1}. </Text>{' '}
                        {this.state.ArrAnswer[index] ? this.state.ArrAnswer[index].toString() : ''}{' '}
                    </Text>
                    {(!this.kqList[index]) ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                // justifyContent: 'center',
                                // marginTop: 5,
                            }}>
                            <Image
                                source={{uri: 'lesson_grammar_image3'}}
                                style={StyleLesson.Image_Explain}
                            />
                            <Text
                                style={[
                                    stylesApp.txt,
                                    {
                                        fontFamily: FontBase.MyriadPro_Bold,
                                        color: 'rgba(198,229,14,0.95)',
                                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                                        fontSize: SmartScreenBase.smFontSize*48,
                                        //textTransform: 'uppercase',
                                    },
                                ]}>
                                {this.state.data.answer[index]}
                            </Text>
                        </View>
                    ) : null}
                </View>
                    <View style={{marginTop: 15}}>
                        <Text style={[stylesApp.txt_Title]}>GIẢI THÍCH :</Text>
                        <Text
                            style={[
                                stylesApp.txt,
                                {
                                    fontSize: 16,
                                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                                    fontStyle: 'italic',
                                },
                            ]}>
                            {this.state.data.exp[index].ans}
                        </Text>
                    </View>
                <View
                    style={{
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 56,
                        alignSelf: 'center',
                    }}>
                    <Image
                        source={{
                            uri:
                                this.kqList[index]
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

export default connect(mapStateToProps)(ListeningD3);
