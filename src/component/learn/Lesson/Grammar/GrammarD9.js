import React, {Component} from 'react';
import {ActivityIndicator, Alert, Dimensions, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import EventBus from 'react-native-event-bus';
import axios from 'axios';
import {connect} from 'react-redux';
import API from '../../../../API/APIConstant';
import FileSound from '../FileSound';
import FileSound4 from '../FileSound4';
import {ActionGrammarD9} from '../../../../redux/actions/ActionGrammarD9';
import style from '../Listening/styleD1';
import APIBase from '../../../../base/APIBase';
import lessonMath from '../../../../utils/lessonMath';
import LessonBase from '../../../../base/LessonBase';
const {width, height} = Dimensions.get('window');
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
let DataObject1 = new Object();
let DataObject2 = new Object();
let whoosh = [1, 3, 0, 1];
let ans = [];
let dataNew = [];
let a = [];

class GrammarD9 extends Component {
    option = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    constructor(props) {
        super(props);
        this.state = {
            checkType: '',
            data: [],
            checkPlay: false,
            refresh: false,
            ShowCheck: false,
            checkResuilt: null,
            NumberTrue: 0,
            Replay: false,
            timecurent: 0,
            timeduration: 0,
            playState: 'paused', //playing, paused
            playSeconds: 0,
            duration: 0,
            dataFirt: {},
            showScript: false,
            showImage: false,
            dicription: false,
            showWeb: false,
            String: '',
            title_ENG: '',
            title_VI: '',
            titlePress: false,
            arrayPost: [],
            isloading: false,
            logid: '',
            data_lesson: {},
            numberAgain: 0,
            checkData: [],
        };
        this.ArrAnswer = [];
        this.CheckResound = [];
        this.sliderEditing = false;
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
    _SubmitTeting = async () => {
        this.setState({numberAgain: this.state.numberAgain + 1});
        this.props.dispatch(ActionGrammarD9(this.ArrAnswer));
        let arrr = [];
        for (let i = 0; i < this.ArrAnswer.length; i++) {
            let ob = new Object();
            ob.question_id = parseInt(this.state.data_lesson.data.data_question[i].question_id),
                ob.exercise_type = 'grammar' ,
                ob.question_type = parseInt(this.state.data_lesson.data.data_question[i].list_option[0].question_type);
            ob.final_user_choice = this.state.data[i].option[this.ArrAnswer[i]];
            let a = [];
            for (let j = 0; j < this.state.arrayPost.length; j++) {
                let obj = new Object();
                obj.num_turn = j;
                obj.score = this.state.data[i].option[this.state.arrayPost[j].ans[i]] === this.state.data[i].answer ? 1 : 0;
                obj.user_choice = this.state.data[i].option[this.state.arrayPost[j].ans[i]];
                a.push(obj);
            }
            ob.detail_user_turn = a;
            arrr.push(ob);
        }
        if (this.state.checkType === 'Testing') {
            this.props.setDataAnswer(arrr);
        }
    };
    _Submit = async () => {
        // console.log('this.state.arrayPost', this.state.arrayPost);
        // console.log(this.state.data);
        let arrr = [];
        for (let i = 0; i < this.ArrAnswer.length; i++) {
            let ob = new Object();
            ob.question_id = parseInt(this.state.data_lesson.data.data_question[i].question_id),
                ob.exercise_type = 'grammar' ,
                ob.question_type = parseInt(this.state.data_lesson.data.data_question[i].list_option[0].question_type);
            ob.final_user_choice = this.state.data[i].option[this.ArrAnswer[i]];
            let a = [];
            for (let j = 0; j < this.state.arrayPost.length; j++) {
                let obj = new Object();
                obj.num_turn = j;
                obj.score = this.state.data[i].option[this.state.arrayPost[j].ans[i]] === this.state.data[i].answer ? 1 : 0;
                obj.user_choice = this.state.data[i].option[this.state.arrayPost[j].ans[i]];
                a.push(obj);
            }
            ob.detail_user_turn = a;
            arrr.push(ob);
        }
        this.props.saveLogLearning(arrr);
        // console.log('ahihi', arrr);
        // const body = {
        //     data_lesson: JSON.stringify(this.state.data_lesson),
        //     skill: 'listening',
        //     log_lesson_detail_id: parseInt(this.state.logid.log_lesson_detail_id),
        //     log_lesson_id: parseInt(this.state.logid.log_lesson_id),
        //     data_answer: JSON.stringify(arrr),
        //     class_id: 1,
        //     unit_id: 1,
        //     curriculum_id: 1,
        //     lesson_id: this.state.dataFirt.lesson.id,
        // };
        // this.props.hideFeedback();
        // let dataLogin = this.props.data_login;
        // const url = dataLogin.role === 'student'
        //     ? 'https://setest.gkcorp.com.vn/index.php/api/api_log_learning/check_score'
        //     : API.baseurl + API.saveLogLearning;
        // const header = {
        //     'Content-Type': 'application/json',
        //     'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
        //     'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
        //     'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        // };
        // try {
        //     const res = await axios({method: 'post', url: url, headers: header, data: body});
        //     let dataReturn = res.data;
        //     //console.log(res);
        //     if (dataReturn.status) {
        //         if (this.props.modeF === 'lesson') {
        //             this.props.reviewResult(dataReturn);
        //         }
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };

    componentDidMount() {
        for (let index = 0; index < this.state.data.length; index++) {
            //this.ArrAnswer.push(-1);
            this.CheckResound.push(false);
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

    _onPressDicription = () => {
        this.setState({dicription: !this.state.dicription});
    };

    componentWillMount() {
        a = [];
        let arraycheckData = [...this.state.checkData];
        let array = [];
        this.setState({isloading: true});
        dataNew = [];
        this.setState({checkType: this.props.checkType});
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({data_lesson: response});
        // this._postDataFirt(response.data);
        //console.log(response.data)
        this.setState({dataFirt: response.data});
        try{
        for (let i = 0; i < response.data.data_question.length; i += 1) {
            array.push(null);
            DataObject1 = new Object();
            DataObject1.question_id = response.data.data_question[i].question_id;
            ans = [];
            for (
                let j = 0;
                j < response.data.data_question[i].list_option.length;
                j += 1
            ) {
                this.setState({
                    title_ENG:
                    response.data.data_question[i].list_option[j].group_content,
                });
                this.setState({
                    title_VI:
                    response.data.data_question[i].list_option[j].group_content_vi,
                });
                DataObject2 = new Object();
                if (response.data.data_question[i].list_option[j].score == '1') {
                    DataObject1.answer =
                        response.data.data_question[i].list_option[j].match_option_text[0];
                }
                DataObject1.question =
                    response.data.data_question[i].list_option[j].question_content;
                ans.push(
                    response.data.data_question[i].list_option[j].match_option_text[0],
                );
                DataObject1.option = ans;
                DataObject1.explain = response.data.data_question[i].list_option[j].explain_parse.content_question_text;
            }

            dataNew.push(DataObject1);
        }
    }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
        for (let i = 0; i < array.length; i++){
            let oj = {
                value: '',
                disabled: false,
            };
            arraycheckData.push(oj);
        }
        this.setState({data: dataNew, checkData: arraycheckData});
        this.ArrAnswer = array;

        if (this.props.checkType === 'afterTest') {
            this.ArrAnswer = this.props.data_answer;
            let check = 0;
            for (let index = 0; index < dataNew.length; index++) {
                if (
                    dataNew[index].option[this.ArrAnswer[index]] ==
                    dataNew[index].answer
                ) {
                    check += 1;
                    //console.log(check);
                }
            }
            if (check == dataNew.length) {
                this.setState({showImage: true});
            }
            this.setState({NumberTrue: check});
            this.setState({checkResuilt: true});
        }
        this.setState({isloading: false});
    }

    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
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

    _ChooseAnswer(index, id) {
        let array = [...this.state.checkData];
        this.setState({ShowCheck: false});
        let number = 0;
        array[index].value = this.state.data[index].option[id];
        array.forEach((item, ind) => {
            let a = this.state.data[ind].option.findIndex((string) => string == item.value);
            if(item.value != ''){
                number++;
                this.ArrAnswer[ind] = a;
            }
        });
        //console.log('uber', number, array.length)
        if(number == array.length){
            this.setState({ShowCheck: true});
        }
        // let status = this.ArrAnswer.find(element => element === null);
        // if(status === undefined){
        //     this.setState({ShowCheck: false});
        // }
        this.setState({refresh: !this.state.refresh, checkData: array});
    }

    checkNumber = 0;

    _CheckResuilt() {
        //console.log(this.ArrAnswer);
        if (this.state.checkType === 'Testing') {
            this._SubmitTeting();
            if (this.state.checkResuilt == null) {
                console.log('this.ArrAnswer', this.ArrAnswer);
                let check = 0;
                for (let index = 0; index < this.state.data.length; index++) {
                    if (
                        this.state.data[index].option[this.ArrAnswer[index]] ==
                        this.state.data[index].answer
                    ) {
                        check += 1;
                    }
                }
                //this.setState({NumberTrue: check});
                if (check == this.state.data.length) {
                    this.props.showFeedback();
                    this.setState({checkResuilt: true});
                    this.setState({showImage: true});
                } else {
                    this.props.nextReviewResult();
                }
            } else {
                this.props.nextReviewResult();
            }
        } else if (this.state.checkType === 'afterTest') {
            if (this.state.checkResuilt == null) {
                let check = 0;
                for (let index = 0; index < this.state.data.length; index++) {
                    if (
                        this.state.data[index].option[this.ArrAnswer[index]] ==
                        this.state.data[index].answer
                    ) {
                        check += 1;
                    }
                }
                this.setState({NumberTrue: check});
                if (check == this.state.data.length) {
                    this.setState({checkResuilt: true});
                    this.setState({showImage: true});
                } else {
                    this.checkNumber += 1;
                    this.setState({checkResuilt: true});
                }
            } else if (this.state.checkResuilt == true) {
                this.props.nextReviewResult();
            }
        } else {
            if (this.props.modeF === 'exam') {
                let arrr = [];
                for (let i = 0; i < this.ArrAnswer.length; i++) {
                    let ob = new Object();
                    ob.question_id = parseInt(this.state.data_lesson.data.data_question[i].question_id),
                        ob.exercise_type = 'grammar' ,
                        ob.question_type = parseInt(this.state.data_lesson.data.data_question[i].list_option[0].question_type);
                    ob.final_user_choice = this.state.data[i].option[this.ArrAnswer[i]];
                    let a = [];
                    for (let j = 0; j < this.state.arrayPost.length; j++) {
                        let obj = new Object();
                        obj.num_turn = j;
                        obj.score = this.state.data[i].option[this.state.arrayPost[j].ans[i]] === this.state.data[i].answer ? 1 : 0;
                        obj.user_choice = this.state.data[i].option[this.state.arrayPost[j].ans[i]];
                        a.push(obj);
                    }
                    ob.detail_user_turn = a;
                    arrr.push(ob);
                }
                this.props.setDataAnswer(arrr);
            }

            if (this.state.checkResuilt == null) {
                let array = [...this.state.checkData];
                this.props.hideTypeExercise();
                let check = 0;
                for (let index = 0; index < this.state.data.length; index++) {
                    array[index].value = '';
                    array[index].disabled = false;
                    if (
                        this.state.data[index].option[this.ArrAnswer[index]] ==
                        this.state.data[index].answer
                    ) {
                        array[index].value = this.state.data[index].option[this.ArrAnswer[index]];
                        array[index].disabled = true;
                        check++;
                    }
                }
                this.setState({checkData: array, numberAgain: this.state.numberAgain + 1});
                this.state.NumberTrue = check;
                if (check == this.state.data.length) {
                    this.props.showFeedback();
                    this.setState({checkResuilt: true});
                    this.setState({showImage: true});
                } else {
                    this.checkNumber += 1;
                    this.setState({checkResuilt: false});
                }
                if (this.checkNumber >= 2) {
                    this.props.showFeedback();
                }
                let ob = new Object();
                ob.ans = this.ArrAnswer;
                a.push(ob);
                this.setState({arrayPost: a});
            } else if (this.state.checkResuilt == false) {
                if (this.checkNumber < 2) {
                    this.props.showTypeExercise();
                    this.setState({checkResuilt: null});
                    this.setState({ShowCheck: false});
                    let array = [];
                    for (let index = 0; index < this.state.data.length; index++) {
                        array.push(null);
                    }
                    this.ArrAnswer = array;
                } else {
                    this.props.hideTypeExercise();
                    this._Submit();
                }
            } else {
                this.props.hideTypeExercise();
                this._Submit();
            }
        }
        this.setState({
            refresh: !this.state.refresh,
        });
    }

    _OnShowScript() {
        this.setState({showScript: !this.state.showScript});
    }

    render() {
        return (
            <View
                style={{flex: 1}}>
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
                        }}>
                        <ActivityIndicator size="large" color="#00ff00"/>
                    </View>
                ) : null}
                {this.state.checkResuilt == null ? (
                    <View style={{
                        height: SmartScreenBase.smPercenHeight * 60,
                        marginBottom: SmartScreenBase.smPercenHeight * 3,
                    }}>
                        <FlatList
                            data={this.state.data}
                            extraData={this.state.refresh}
                            keyExtractor={(item, index) => 'item' + index}
                            renderItem={this.RenderItem.bind(this)}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                ) : (
                    <View style={{
                        height: this.state.checkResuilt == false && this.checkNumber < 2 ? SmartScreenBase.smPercenHeight * 75 : SmartScreenBase.smPercenHeight * 75 ,
                        marginBottom: SmartScreenBase.smPercenHeight * 3,
                    }}>
                        {this._ShowResuilt()}
                    </View>
                )}
                {this.state.showScript === true ? (
                    <View
                        style={{
                            width: SmartScreenBase.smBaseWidth * 1080,
                            height: SmartScreenBase.smBaseHeight * 1080,
                            backgroundColor: '#00000030',
                            position: 'absolute',
                            zIndex: 100,
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
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._OnShowScript();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                        {
                                            width: SmartScreenBase.smPercenWidth * 40,
                                            marginRight: SmartScreenBase.smPercenWidth * 5,
                                        },
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>Đóng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : null}
                <View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            {this.state.checkType === 'Testing' ? (
                                this.state.ShowCheck == true ?
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._CheckResuilt();
                                            }}
                                            style={[
                                                stylesApp.Sty_Button,
                                            ]}>
                                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._CheckResuilt();
                                            }}
                                            style={[
                                                stylesApp.Sty_Button_disable,
                                            ]}>
                                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                        </TouchableOpacity>
                                    </View>
                            ) : this.state.checkResuilt == null ? (
                                this.state.ShowCheck == true ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._CheckResuilt();
                                        }}
                                        style={stylesApp.Sty_Button}>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={
                                            stylesApp.Sty_Button_disable
                                        }>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>

                            ) : this.state.checkResuilt == false && this.checkNumber < 2 ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        this._CheckResuilt();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                    ]}>
                                    {/*<FileSound4 showImage={'false'}/>*/}
                                    <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._CheckResuilt();
                                        }}
                                        style={[
                                            stylesApp.Sty_Button,
                                        ]}>
                                        <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                </View>
            </View>
        );
    }

    RenderItem = ({item, index}) => {
        let sens = item.question.split('\n');
        
        return (
            <View
                style={{
                    width: SmartScreenBase.smPercenWidth * 100,
                    marginBottom: SmartScreenBase.smPercenHeight * 3,
                }}>
                <View
                    style={{
                        width: SmartScreenBase.smPercenWidth * 90,
                        alignSelf: 'center',
                    }}>
                    <View
                        style={
                            {
                                marginTop: SmartScreenBase.smPercenHeight * 2,
                                width: SmartScreenBase.smPercenWidth * 90,
                                borderRadius: SmartScreenBase.smPercenWidth * 3,
                                padding: SmartScreenBase.smPercenHeight,
                                alignSelf: 'center',
                            }
                        }>
                        {
                            sens.map((s,i)=>{
                                const arr = s.split(' ');
                                return <View key={i} style={{flexDirection:'row',flexWrap:'wrap'}}>
                                    {
                                        i==0&&<Text
                                            style={[
                                                StyleLesson.question_text,
                                                {
                                                    fontWeight: '700',
                                                    color: '#FFF',
                                                },
                                            ]}>
                                            {index + 1}.{' '}
                                        </Text>
                                    }
                                    {arr.filter(i => i).map((e, k) => {
                                        return (
                                            <View key={k} style={{}}>
                                                {e == '_' ? (
                                                    <View style={{zIndex: 10}}>
                                                        <Text style={StyleLesson.question_text}>{e}</Text>
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity
                                                        onLongPress={() => LessonBase.goTranslate(e)}
                                                        style={[stylesApp.txt, {zIndex: 0,}]}>
                                                        <Text style={{...StyleLesson.question_text, color: '#FFF'}}>{e} </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        );
                                    })}
                                </View>
                            })
                        }
                    </View>
                    <View
                        style={{
                            marginTop: SmartScreenBase.smPercenHeight,
                            alignItems: 'center',
                        }}>
                        {item.option.map((e, key) => {
                            return (
                                this.state.numberAgain > 0 ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._ChooseAnswer(index, key);
                                        }}
                                        disabled={this.state.checkData[index].disabled}
                                    >
                                        <View
                                            style={[
                                                StyleLesson.Sty_View_Border,
                                                style.styleTexxtQues,
                                                {
                                                    borderColor:
                                                        this.state.checkData[index].value == e
                                                            ? 'rgba(255,255,255,0.95)'
                                                            : '#F9E815',
                                                    backgroundColor:
                                                        this.state.checkData[index].value == e
                                                            ? '#F9E815'
                                                            : 'rgba(255,255,255,0.95)',
                                                },
                                            ]}>
                                            <Text
                                                style={[
                                                    stylesApp.txt,
                                                    {fontSize: SmartScreenBase.smPercenWidth * 4},
                                                ]}>
                                                {this.option[key] + '. ' + e}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._ChooseAnswer(index, key);
                                        }}>
                                        <View
                                            style={[
                                                StyleLesson.Sty_View_Border,
                                                style.styleTexxtQues,
                                                {
                                                    borderColor:
                                                        this.state.checkData[index].value == e
                                                            ? 'rgba(255,255,255,0.95)'
                                                            : '#F9E815',
                                                    backgroundColor:
                                                        this.state.checkData[index].value == e
                                                            ? '#F9E815'
                                                            : 'rgba(255,255,255,0.95)',
                                                },
                                            ]}>
                                            <Text
                                                style={[
                                                    stylesApp.txt,
                                                    {fontSize: SmartScreenBase.smPercenWidth * 4},
                                                ]}>
                                                {this.option[key] + '. ' + e}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </View>
        );
    };

    _ShowResuilt() {
        return (
            <View style={{flex: 1}}>
                <View style={{alignSelf: 'center', alignItems: 'center'}}>
                    {this.state.checkResuilt == true || this.checkNumber >= 2 ? (
                        <View style={{
                            height: SmartScreenBase.smPercenHeight * 15,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <FileSound showImage={this.state.showImage == true ? 'true' : 'false'}/>
                        </View>

                    ) : <FileSound showIcon={'none'} showImage={this.state.showImage == true ? 'true' : 'false'}/>}
                    <Text
                        style={StyleLesson.text_answer}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.length}
                    </Text>
                </View>
                <View
                    style={{
                        width: SmartScreenBase.smPercenWidth * 100,
                        alignItems: 'center',
                        flex: 1,
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
                    <View style={{flex: 1}}>
                        <FlatList
                            data={this.state.data}
                            extraData={this.state.refresh}
                            keyExtractor={(item, index) => 'item' + index}
                            renderItem={this.RenderItemResuilt.bind(this)}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </View>
        );
    }

    RenderItemResuilt = ({item, index}) => {
        //A, B, C, D
        //console.log(this.state.data[index].option[this.ArrAnswer[index]]);
        //console.log(this.state.data[index].answer);
        const valueOption = this.option[
            this.state.data[index].option.indexOf(
                this.state.data[index].option.find(
                    answer =>
                        answer === this.state.data[index].option[this.ArrAnswer[index]],
                ),
            )
            ];
        const valueOptionText = this._FunctionToReplaceQuestion(valueOption) === '' ? '' : valueOption.toUpperCase() + '.';
        const resultOption1 = this.option[
            this.state.data[index].option.indexOf(this.state.data[index].option[this.ArrAnswer[index]])
            ];
        const resultOption1Text = this._FunctionToReplaceQuestion(resultOption1) === '' ? '' : resultOption1.toUpperCase() + '.';
        const resultOption = this.option[
            this.state.data[index].option.indexOf(this.state.data[index].answer)
            ];

        if (this.checkNumber < 2 && this.state.checkResuilt == false) {
            return (
                <View
                    style={[
                        StyleLesson.Sty_View_Border,
                        {
                            alignItems: 'flex-start',
                            borderWidth: SmartScreenBase.smPercenWidth / 2,
                            marginTop: SmartScreenBase.smBaseWidth * 80,
                            borderColor:
                                this.state.checkData[index].value ==
                                this.state.data[index].answer
                                    ? 'rgba(198,229,14,0.95)'
                                    : '#e21010',
                        },
                    ]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SmartScreenBase.smPercenHeight * 2,
                            paddingHorizontal: SmartScreenBase.smPercenWidth * 2
                        }}>
                        <Text
                            style={{...StyleLesson.question_text}}>
                            {index + 1}.{' '}
                        </Text>
                        <Text style={{...StyleLesson.question_text, width: SmartScreenBase.smPercenWidth*76 }}>
                            {item.question}
                        </Text>
                    </View>

                    <View
                        style={{
                            margin: SmartScreenBase.smPercenHeight,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        {this.state.checkData[index].value ==
                        this.state.data[index].answer ?
                            <Image
                                source={{uri: 'lesson_grammar_image3'}}
                                style={StyleLesson.Image_Explain}
                            />
                            : null
                        }
                        <Text
                            style={[
                                StyleLesson.answer_text,
                                {
                                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                                    color: this.state.checkData[index].value ==
                                    this.state.data[index].answer
                                        ? 'rgba(198,229,14,0.95)'
                                        : '#e21010',
                                },
                            ]}>
                            {valueOptionText + ' ' +
                            this._FunctionToReplaceQuestion(this.state.data[index].option[this.ArrAnswer[index]])}
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
                                    this.state.checkData[index].value ==
                                    this.state.data[index].answer
                                        ? 'grammar1_4'
                                        : 'grammar1_3',
                            }}
                            style={StyleLesson.Sty_Image_Small_Answer}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View
                    style={[
                        StyleLesson.Sty_View_Border,
                        {
                            alignItems: 'flex-start',
                            marginTop: SmartScreenBase.smBaseWidth * 80,
                            borderWidth: SmartScreenBase.smPercenWidth / 2,
                            borderColor:
                                this.state.checkData[index].value ==
                                this.state.data[index].answer
                                    ? 'rgba(198,229,14,0.95)'
                                    : '#e8425a',
                        },
                    ]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SmartScreenBase.smPercenHeight * 2,
                            paddingRight: SmartScreenBase.smPercenWidth,
                            paddingHorizontal: SmartScreenBase.smPercenWidth * 2
                        }}>
                        <Text style={{...StyleLesson.question_text}}>
                            {index + 1}.{' '}
                        </Text>
                        <Text style={{...StyleLesson.question_text, width: SmartScreenBase.smPercenWidth*76}}>
                            {item.question}
                        </Text>
                    </View>
                    {
                        this.state.data[index].option[this.ArrAnswer[index]] !==
                        this.state.data[index].answer ?
                            <View
                                style={{
                                    margin: SmartScreenBase.smPercenHeight,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    style={StyleLesson.Image_Explain}
                                />
                                <Text
                                    style={[
                                        StyleLesson.answer_text,
                                        {
                                            width: SmartScreenBase.smPercenWidth*68,
                                            marginLeft: SmartScreenBase.smPercenWidth * 5,
                                            color: this.state.data[index].option[this.ArrAnswer[index]] ==
                                            this.state.data[index].answer
                                                ? 'rgba(198,229,14,0.95)'
                                                : '#e21010',
                                        },
                                    ]}>
                                    {resultOption1Text + ' ' + this._FunctionToReplaceQuestion(this.state.data[index].option[this.ArrAnswer[index]])}
                                </Text>
                            </View>
                            : null
                    }
                    <View
                        style={{
                            margin: SmartScreenBase.smPercenHeight,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{uri: 'lesson_grammar_image3'}}
                            style={StyleLesson.Image_Explain}
                        />
                        <Text
                            style={[
                                StyleLesson.answer_text,
                                {
                                    width: SmartScreenBase.smPercenWidth*68,
                                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                                    color: 'rgba(198,229,14,0.95)',
                                },
                            ]}>
                            {resultOption + '. ' + this.state.data[index].answer}
                        </Text>
                    </View>
                        <View
                            style={{
                                marginTop: SmartScreenBase.smPercenHeight,
                                marginBottom: SmartScreenBase.smPercenHeight,

                            }}>
                            <Text style={stylesApp.txt}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: SmartScreenBase.smFontSize * 60,
                                    }}>
                                    GIẢI THÍCH
                                </Text>
                            </Text>
                            <Text style={StyleLesson.explain_text}>
                                {item.explain}
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
                                    this.state.data[index].option[this.ArrAnswer[index]] ==
                                    this.state.data[index].answer
                                        ? 'grammar1_4'
                                        : 'grammar1_3',
                            }}
                            style={StyleLesson.Sty_Image_Small_Answer}
                        />
                    </View>
                </View>
            );
        }
    };
}

function mapStateToProps(state) {
    return {
        data_answer: state.GrammarD9Reducer.data_answer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(GrammarD9);
