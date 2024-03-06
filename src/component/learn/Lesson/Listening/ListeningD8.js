import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    Platform, ActivityIndicator,
    ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ButtonCheck from '../../../items/ButtonCheck';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import FileSound from '../FileSound';
import stylesApp from '../../../styleApp/stylesApp';
import Iconcheck from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import base64 from 'react-native-base64';
import API from '../../../../API/APIConstant';
import {connect} from 'react-redux';
import EventBus from 'react-native-event-bus';
import {ActionListeningD5} from '../../../../redux/actions/ActionListeningD5';
import ListeningD5Reducer from '../../../../redux/reducers/ListeningD5Reducer';
import SoundQestion from '../../../SoundQuestion';
import ModalScript from '../../../modalScript'
import LessonBase from '../../../../base/LessonBase';

let DataObject1 = new Object();
let DataObject2 = new Object();
let whoosh;
let ans = [];
let dataNew = [];
var Sound = require('react-native-sound');
Sound.setCategory('Playback');

class ListeningD8 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            ShowCheck: false,
            checkResuilt: null,
            checkPlay: false,
            refresh: false,
            NumberTrue: 0,
            playState: 'paused', //playing, paused
            playSeconds: 0,
            duration: 0,
            dataFirt: {},
            checkType: 'afterTest',
            showScript: false,
            showImage: false,
            dicription: false,
            showWeb: false,
            String: '',
            isloading: false,
            title_ENG: '',
            title_VI: '',
            titlePress: false,
            arrayPost: [],
            logid: '',
            data_lesson: {},
            SaveArrayAns: [],
        };
        this.ListAnswer = [];
        this.CheckResound = [];
        this.sliderEditing = false;
    }

    componentWillMount() {
        dataNew = [];
        this.ListAnswer = [];
        this.setState({checkType: this.props.checkType});
        this.setState({isloading: true});
        let response = {};
        response['data'] = this.props.dataContent;
        console.log(response);
        this.setState({dataFirt: response.data});
        this.setState({data_lesson: response});
        // this._postDataFirt(response.data);
        for (let i = 0; i < response.data.data_question.length; i += 1) {
            DataObject1 = new Object();
            DataObject1.question_type = response.data.data_question[i].list_option[0].question_type;
            DataObject1.question_id = response.data.data_question[i].question_id;
            ans = [];
            console.log(response.data);
            for (
                let j = 0;
                j < response.data.data_question[i].list_option.length;
                j += 1
            ) {
                DataObject2 = new Object();
                if (
                    response.data.data_question[i].list_option[j].match_option_text[0] ==
                    'T'
                ) {
                    DataObject1.answer = true;
                } else if (
                    response.data.data_question[i].list_option[j].match_option_text[0] ==
                    'F'
                ) {
                    DataObject1.answer = false;
                }
                DataObject1.question =
                    response.data.data_question[i].list_option[j].question_content;
                this.setState({
                    title_ENG:
                    response.data.data_question[0].list_option[0].group_content,
                });
                this.setState({audio: response.data.lesson.lesson_audio});
                this.setState({
                    title_VI:
                    response.data.data_question[0].list_option[0].group_content_vi,
                });
                DataObject1.script = response.data.data_question[i].list_option[j].explain_parse;

            }
            dataNew.push(DataObject1);
            this.setState({data: dataNew});
        }
        this.checkout(this.state.data);
        console.log('dataNew', dataNew);
        this.setState({isloading: false});
        if (this.props.checkType == 'afterTest') {
            console.log('this.props.data_answer', this.props.data_answer);
            this.setState({data: dataNew});
            this.ListAnswer = this.props.data_answer;
            let checktrue = 0;
            for (let index = 0; index < dataNew.length; index++) {
                if (this.ListAnswer[index] == dataNew[index].answer) {
                    checktrue++;
                }
            }
            this.setState({NumberTrue: checktrue});
            this.setState({checkResuilt: true});
        }
    }

    checkout(object) {
        for (let index = 0; index < object.length; index++) {
            this.ListAnswer.push(null);
            this.CheckResound.push(false);
        }
        //console.log(this.ListAnswer);
    }

    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
    };
    _Submit = async () => {
        let arrr = [];
        // console.log(this.state.data);
        // console.log(this.state.arrayPost);
        for (let i = 0; i < this.ListAnswer.length; i++) {
            let ob = new Object();
            ob.question_id = this.state.data[i].question_id,
                ob.exercise_type = 'listening',
                ob.question_type = 1;
            //ob.question_score =  this.state.data[i].option[this.ArrAnswer[i]] === this.state.data[i].answer?1/this.ArrAnswer.length : 0
            ob.final_user_choice = this.ListAnswer[i];
            let a = [];
            for (let j = 0; j < this.state.arrayPost.length; j++) {
                let obj = new Object();
                obj.num_turn = j;
                obj.user_choice = this.state.arrayPost[j].ans[i];
                obj.score = this.state.arrayPost[j].ans[i] === this.state.data[i].answer ? 1 : 0;
                a.push(obj);
            }
            ob.detail_user_turn = a;
            arrr.push(ob);
        }
        console.log('arrrrrrrrrrr',arrr);
        this.props.saveLogLearning(arrr);
        // console.log(arrr);
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
        //     console.log(dataReturn)
        //     if (dataReturn.status) {
        //         if (this.props.modeF === 'lesson') {
        //             this.props.reviewResult(dataReturn);
        //         }
        //     }
        //     this.setState({arrayPost:[]})
        // } catch (error) {
        //     console.log(error);
        // }
    };
    _SubmitTesting = async () => {
        console.log('this.ListAnswer', this.ListAnswer);
        this.props.dispatch(ActionListeningD5(this.ListAnswer));
        let copySaveArrayAns = [...this.state.SaveArrayAns];
        let arrr = [];
        let resual = [...this.ListAnswer];
        console.log();
        let newObject = new Object();
        newObject.ans = resual;
        copySaveArrayAns.push(newObject);
        console.log('copySaveArrayAns', copySaveArrayAns);
        for (let i = 0; i < this.ListAnswer.length; i++) {
            let ob = new Object();
            ob.question_id = this.state.data[i].question_id,
                ob.exercise_type = 'listening',
                ob.question_type = 1;
            //ob.question_score =  this.state.data[i].option[this.ArrAnswer[i]] === this.state.data[i].answer?1/this.ArrAnswer.length : 0
            ob.final_user_choice = this.ListAnswer[i];
            let a = [];
            for (let j = 0; j < copySaveArrayAns.length; j++) {
                let obj = new Object();
                obj.num_turn = j;
                obj.user_choice = copySaveArrayAns[j].ans[i];
                obj.score = copySaveArrayAns[j].ans[i] === this.state.data[i].answer ? 1 : 0;
                a.push(obj);
            }
            ob.detail_user_turn = a;
            arrr.push(ob);
        }
        this.props.setDataAnswer(arrr);
        console.log('subArr',arrr);
    };

    componentDidMount() {
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
            this.sound = new Sound(link, null, error => {
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
    playComplete = success => {
        if (this.sound) {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
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

    _OnpressAnswer() {
        let check = this.ListAnswer.filter(function (e) {
            return e !== null || e !== '';
        });
        if (check.length == this.state.data.length) {
            this.state.ShowCheck = true;
        }
        this.setState({refresh: !this.state.refresh});
    }

    _OnPressCheckResuilt() {
        //console.log(this.state.data)
        this.pause();
        if (this.state.checkType == 'exam') {
            let a = [];
            if (this.state.checkResuilt == null) {
                this.props.hideTypeExercise();
                for (let index = 0; index < this.state.data.length; index++) {
                    if (this.ListAnswer[index] == this.state.data[index].answer) {
                        this.state.NumberTrue += 1;
                    }
                }
                if (this.state.NumberTrue == this.state.data.length) {
                    this.setState({checkResuilt: true});
                    this.setState({showImage: true});

                } else {
                    this.setState({checkResuilt: false});
                }
                this.props.showFeedback();
                let ob = new Object();
                ob.ans = this.ListAnswer;
                a.push(ob);
                this.setState({arrayPost: a});
            } else {
                this.props.hideTypeExercise();
                this._Submit();
                //this.props.methodScreen();
            }
        }
         else if (this.state.checkType == 'Testing') {
            this._SubmitTesting();
        } else if (this.state.checkType == 'afterTest') {
            this.props.nextReviewResult();
        }
    }

    _OnShowScript() {
        this.setState({showScript: !this.state.showScript});
    }

    moveWedView = (str) => {
        this.setState({showWeb: true});
        this.setState({String: str});
    };
    closeWebView = () => {
        this.setState({showWeb: false});
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                }}>
                {
                    this.state.isloading === true ?
                        <View style={{
                            width: '100%', height: '100%',
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
                        : null
                }
                <View style={{flex: 1,}}>
                    {this.state.checkResuilt == null
                        ? this._ShowQuestion()
                        : this._ShowAnswer()}
                </View>
                <ModalScript
                    audio={this.state.audio}
                    title={this.state.dataFirt?.lesson?.lesson_text_audio}
                    visible={this.state.showScript}
                    close={()=>this.setState({showScript:false})}
                />
                {/* {
                    this.state.showScript === true ?
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 100,
                            height: SmartScreenBase.smPercenHeight * 100,
                            backgroundColor: '#00000030',
                            position: 'absolute',
                            zIndex: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: -SmartScreenBase.smPercenHeight * 10,
                        }}>
                            <View style={{
                                width: SmartScreenBase.smPercenWidth * 90,
                                height: SmartScreenBase.smPercenHeight * 60,
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                borderRadius: 20,
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._OnShowScript();
                                    }}>
                                    <Text
                                        style={[stylesApp.Sty_Text_Button, {color: '#000', marginLeft: '85%'}]}>X</Text>
                                </TouchableOpacity>
                                <ScrollView style={{flex: 1}}>
                                    <View style={{
                                        width: '90%',
                                        height: '80%',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        marginTop: SmartScreenBase.smPercenHeight * 3,
                                        marginBottom: SmartScreenBase.smPercenHeight * 5
                                    }}>
                                        {
                                            this.state.dataFirt.lesson.lesson_text_audio
                                                ?
                                                this.state.dataFirt.lesson.lesson_text_audio.split(' ').map((data) => {
                                                    return (
                                                        <View>
                                                            <TouchableOpacity
                                                                onLongPress={() => this._moveWebView(data)}
                                                            >
                                                                <Text style={{...StyleLesson.question_text}}>
                                                                    {' ' + data.replace(/\n/g, ' ')}
                                                                </Text>

                                                            </TouchableOpacity>
                                                        </View>
                                                    );
                                                })
                                                :
                                                null
                                        } 
                                    </View>
                                </ScrollView>
                            </View>

                        </View>
                        :
                        null
                }*/}
                <View style={{
                    alignItems: 'center',
                    height: SmartScreenBase.smPercenHeight * 15,
                    justifyContent: 'center',
                }}>

                    {
                        this.state.checkType === 'exam' ?
                                this.state.checkResuilt == null ?
                                    this.state.ShowCheck == true ?
                                        <TouchableOpacity
                                            disabled={false}
                                            onPress={() => {
                                                this._OnPressCheckResuilt();
                                            }}
                                            style={stylesApp.Sty_Button}>
                                            <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>

                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            disabled={true}
                                            onPress={() => {
                                                this._OnPressCheckResuilt();
                                            }}
                                            style={stylesApp.Sty_Button_disable}>
                                            <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>

                                        </TouchableOpacity>
                                    :
                                    <View style={{width: '100%', flexDirection: 'row'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._OnShowScript();
                                            }}
                                            style={[stylesApp.Sty_Button, {
                                                width: SmartScreenBase.smPercenWidth * 40,
                                                marginRight: SmartScreenBase.smPercenWidth * 5,
                                            }]}
                                        >
                                            <Text style={stylesApp.Sty_Text_Button}>SCRIPT</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._OnPressCheckResuilt();
                                            }}
                                            style={[stylesApp.Sty_Button, {width: SmartScreenBase.smPercenWidth * 40}]}
                                        >
                                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>

                                        </TouchableOpacity>
                                    </View>
                                : this.state.checkResuilt == null ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnPressCheckResuilt();
                                        }}
                                        style={[stylesApp.Sty_Button, {width: SmartScreenBase.smPercenWidth * 90}]}
                                    >
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>

                                    </TouchableOpacity>
                                    :
                                    <View style={{width: '100%', flexDirection: 'row'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._OnShowScript();
                                            }}
                                            style={[stylesApp.Sty_Button, {
                                                width: SmartScreenBase.smPercenWidth * 40,
                                                marginRight: SmartScreenBase.smPercenWidth * 5,
                                            }]}
                                        >
                                            <Text style={stylesApp.Sty_Text_Button}>SCRIPT</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._OnPressCheckResuilt();
                                            }}
                                            style={[stylesApp.Sty_Button, {width: SmartScreenBase.smPercenWidth * 40}]}
                                        >
                                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>

                                        </TouchableOpacity>
                                    </View>
                    }
                </View>
            </View>
        );
    }

    _ShowQuestion() {
        return (
            <View style={{flex: 1}}>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}>
                    <SoundQestion
                        Audio={this.state.audio}
                    />
                </View>
                <View
                    style={{
                        width: SmartScreenBase.smPercenWidth * 100,
                        marginTop: SmartScreenBase.smPercenHeight * 2,
                    }}>
                    <View style={{height: SmartScreenBase.smPercenHeight * 50}}>
                        <FlatList
                            data={this.state.data}
                            extraData={this.state.refresh}
                            keyExtractor={(item, key) => 'item' + key}
                            renderItem={this._render_Item_Question}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </View>
        );
    }

    _render_Item_Question = ({item, index}) => {
        let arr = item.question.split(' ');
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        padding: 0,
                        alignItems: 'flex-start',
                        marginBottom: SmartScreenBase.smPercenHeight * 3,
                    },
                ]}>
                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        width: SmartScreenBase.smPercenWidth * 90,
                        borderRadius: SmartScreenBase.smPercenWidth * 3,
                        padding: SmartScreenBase.smPercenHeight,
                        alignSelf: 'center',
                        marginTop: SmartScreenBase.smPercenHeight * 2,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{index + 1}. </Text>
                    {arr.map((e, index, key) => {
                        return (
                            <View>
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                    <Text style={{fontSize: 16}}>{e} </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                <View
                    style={{
                        marginTop: SmartScreenBase.smPercenHeight * 2,
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.ListAnswer[index] = true;
                            this._OnpressAnswer();
                        }}>
                        <View
                            style={{
                                width: SmartScreenBase.smPercenWidth * 45,
                                backgroundColor:
                                    this.ListAnswer[index] == true
                                        ? 'rgba(255,255,0,0.95)'
                                        : 'rgba(216,216,216,0.95)',
                                borderRightWidth: 2,
                                borderColor: 'white',
                                borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 3,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: SmartScreenBase.smPercenHeight * 5,
                            }}>
                            <Text style={stylesApp.txt_Title}>TRUE</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.ListAnswer[index] = false;
                            this._OnpressAnswer();
                        }}>
                        <View
                            style={{
                                width: SmartScreenBase.smPercenWidth * 45,
                                backgroundColor:
                                    this.ListAnswer[index] == false
                                        ? 'rgba(255,255,0,0.95)'
                                        : 'rgba(216,216,216,0.95)',
                                borderBottomRightRadius: SmartScreenBase.smPercenWidth * 3,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: SmartScreenBase.smPercenHeight * 5,
                            }}>
                            <Text style={stylesApp.txt_Title}>FALSE</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    _onPressDicription = () => {
        this.setState({dicription: !this.state.dicription});
    };

    _ShowAnswer() {
        return (
            <View style={{alignItems: 'center', alignSelf: 'center', flex: 1}}>
                <View style={{
                    height: SmartScreenBase.smBaseWidth * 250,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FileSound showImage={this.state.NumberTrue == this.state.data.length ? 'true' : 'false'}/>
                </View>
                <Text
                    style={{...StyleLesson.text_answer}}>
                    BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.length}
                </Text>
                <View
                    style={{
                        width: SmartScreenBase.smPercenWidth * 100,
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    
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
        //console.log(this.state.data[index])
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                        borderColor:
                            this.ListAnswer[index] !== this.state.data[index].answer
                                ? 'rgba(232,66,90,0.95)'
                                : 'rgba(198,229,14,0.95)',
                        marginTop: SmartScreenBase.smPercenHeight * 6,
                    },
                ]}>
                <View
                    style={{
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 56,
                        alignSelf: 'center',
                    }}>
                    <Image
                        source={{
                            uri:
                                this.ListAnswer[index] === this.state.data[index].answer
                                    ? 'grammar1_4'
                                    : 'grammar1_3',
                        }}
                        style={StyleLesson.Sty_Image_Small_Answer}
                    />
                </View>
                <View style={{
                    padding: SmartScreenBase.smPercenHeight,
                    flexDirection: 'row',
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                }}>
                    <Text
                        style={[stylesApp.txt_Title, {fontSize: SmartScreenBase.smPercenWidth * 4}]}>{index + 1}. </Text>
                    <Text style={[stylesApp.txt_Title, {
                        flex: 1,
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                    }]}>{item.question}</Text>
                </View>
                <View
                    style={{
                        margin: SmartScreenBase.smPercenHeight,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                    }}>
                    {this.ListAnswer[index] !== this.state.data[index].answer ? (
                            <Text
                                style={[
                                    stylesApp.txt,
                                    {
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                        color: 'rgba(232,66,90,0.95)',
                                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                                        textTransform: 'uppercase',
                                    },
                                ]}>
                                {this.ListAnswer[index] !== undefined ? this.ListAnswer[index].toString() : ''}
                            </Text>) : null
                    }
                    {this.ListAnswer[index] !== this.state.data[index].answer ? (
                            <Image
                                source={{uri: 'lesson_grammar_image3'}}
                                style={[
                                    StyleLesson.Image_Explain,
                                    {
                                        marginLeft: SmartScreenBase.smPercenWidth * 3, width: SmartScreenBase.smBaseWidth * 70,
                                        height: SmartScreenBase.smBaseWidth * 55,
                                        width: SmartScreenBase.smBaseWidth * 55,
                                        resizeMode: 'contain',
                                        marginBottom: SmartScreenBase.smPercenWidth * 0.5,
                                    },
                                ]}
                            />) : null
                    }                    
                        <Text
                            style={
                                {
                                    fontWeight: 'bold',
                                    marginLeft: SmartScreenBase.smPercenWidth * 3,
                                    textTransform: 'uppercase',
                                    fontSize: 16,
                                    color: 'rgba(198,229,14,0.95)',
                                }
                            }>
                            {this.state.data[index].answer !== undefined ? this.state.data[index].answer.toString() : ' '}
                        </Text>
                </View>
                    <View
                        style={{
                            marginTop: SmartScreenBase.smPercenHeight,
                            marginBottom: SmartScreenBase.smPercenHeight,
                        }}>
                        <Text style={stylesApp.txt}>
                            <Text style={stylesApp.txt_Title}>GIẢI THÍCH:</Text>
                        </Text>
                        {/* <Text style={stylesApp.txt}> */}
                        <Text style={{
                            fontStyle: 'italic',
                            fontSize: 16,
                            paddingRight: 10,
                        }}>{' ' + item.script.content_question_text}</Text>
                        {/* </Text> */}
                    </View>
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {
        data_answer: state.ListeningD5Reducer.data_answer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(ListeningD8);
