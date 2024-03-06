import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    Keyboard,
    LayoutAnimation,
    KeyboardAvoidingView,
    Alert,
    Platform,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    Animated,
    Dimensions,
} from 'react-native';
import FileSound from '../FileSound';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import Slider from '@react-native-community/slider';
import Iconcheck from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import API from '../../../../API/APIConstant';
import style from './styles';
import EventBus from 'react-native-event-bus';
import {ActionListeningD2} from '../../../../redux/actions/ActionListeningD2';
// import SoundQestion from '../../../SoundQuestion/sound2';
import SoundQestion from '../../../SoundQuestion';
import SoundQueshint from '../../../SoundQueshint';
import ModalScript from '../../../modalScript'
import stringUtils from '../../../../utils/stringUtils';
import lessonMath from '../../../../utils/lessonMath';
import FontBase from '../../../../base/FontBase';
import LogBase from '../../../../base/LogBase';
import LessonBase from '../../../../base/LessonBase';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
let DataObject1 = new Object();
let DataObject2 = new Object();
let DataObject = new Object();
let newObject = new Object();
const {width, height} = Dimensions.get('window');
let ans = [];
let answeraaaa = [];

class ListeningD5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title_ENG: '',
            title_VI: '',
            playState: 'pause',
            isloading: '',
            showWeb: false,
            String: '',
            ArrAnswer: [],
            tuongDuong: [],
            statusScreen: 'question',
            showButton: false,
            numberDoExam: 0,
            numberRightEx: 0,
            statusCheckRightOrFalse: '',
            valueY: 0,
            showScript: false,
            playSeconds: 0,
            PlayAudioHint: false,
            sliderEditing: false,
            playSecondsHint: 0,
            selectAudio: '',
            fileAudioEx: '',
            playIconEx: 'pause',
            SaveArrayAns: [],
            dataFirt: {},
            checktype: 'exam',
            logid: '',
            data_lesson: {},
            titlePress: false,
            audio: '',
            showkey: false,
            pause: [],
            pauseQuestion: true,
        };
        this.kqList = [];
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
        //     if (findReplaceQuestionStatus !== -1 || findReplaceQuestionStatus1 !== -1) {
        //         ApplyText = ApplyText.toLowerCase().replace('‘', '’').replace('\'', '’');
        //     }
        //     return (ApplyText);
        // } else {
        //     return ('');
        // }
        return stringUtils.validWord(Text)
    };

    _Submit = async () => {
        let dataHistory = [];
        //console.log(this.state.SaveArrayAns);
        for (let i = 0; i < this.state.dataFirt.data_question.length; i++) {
            let ar = this.state.SaveArrayAns.map((e,j)=>{
                return {
                    num_turn:j,
                    score: e.ans[i].status?1:0,
                    user_choice:e.ans[i].ans
                }
            });
            let Ob = new Object();
            Ob.question_id = this.state.dataFirt.data_question[i].question_id;
            Ob.exercise_type = 'Listening';
            Ob.question_type = this.state.dataFirt.data_question[i].list_option[0].question_type;
            if (this.state.ArrAnswer[i].status === true) {
                Ob.question_score = this.state.dataFirt.data_question[i].list_option[0].score;
            } else {
                Ob.question_score = '0';
            }
            Ob.final_user_choice = this.state.ArrAnswer[i];
            Ob.detail_user_turn = ar;
            dataHistory.push(Ob);
        }
        //console.log('dataHistory',dataHistory)
        if (this.state.checktype === 'Testing') {
            this.props.setDataAnswer(dataHistory);
        } else {
            this.props.saveLogLearning(dataHistory);
        }
    };
    _reSetAns = () => {
        const arrNew =  this.state.ArrAnswer.map(e=>{
            return {
                status:e.status,
                statusHint:false,
                ans: e.status?e.ans:'', 
            }
        })
        this.setState({ArrAnswer: arrNew});
        
        // let arrayAnsBegin = [];
        // let arr = [...this.state.ArrAnswer];
        // let array = [...this.state.tuongDuong];
        // for (let i = 0; i < this.state.data.length; i++) {
        //     let DataObject = new Object();

        //     if (this._trimChar(this.state.data[i].answer.toLowerCase()) === this._trimChar(arr[i].ans.toLowerCase())) {
        //         DataObject.status = true;
        //         DataObject.statusHint = false;
        //         DataObject.ans = arr[i].ans;
        //     } else {
        //         if (array[i] !== '') {
        //             array[i].map((item) => {
        //                 if (this._trimChar(item.toLowerCase()) == this._trimChar(arr[i].ans.toLowerCase())) {
        //                     DataObject.status = true;
        //                     DataObject.statusHint = false;
        //                     DataObject.ans = arr[i].ans;
        //                 } else {
        //                     DataObject.status = null;
        //                     DataObject.statusHint = null;
        //                     DataObject.ans = '';
        //                 }
        //             });
        //         } else {
        //             DataObject.status = null;
        //             DataObject.statusHint = null;
        //             DataObject.ans = '';
        //         }
        //     }
        //     arrayAnsBegin.push(DataObject);
        // }
        // this.setState({ArrAnswer: arrayAnsBegin});

    };
    _SaveArrayAns = () => {
        let copySaveArrayAns = [...this.state.SaveArrayAns];
        let resual = [...this.state.ArrAnswer];
        let newObject = new Object();
        newObject.ans = resual;
        copySaveArrayAns.push(newObject);
        //console.log(copySaveArrayAns);
        this.setState({SaveArrayAns: copySaveArrayAns});
    };
    play = async (link) => {
        this.sound = null;
        //this.setState({playSecondsHint: 0,})
        if (this.sound) {
            this.sound.play(this.playComplete);
            this.setState({playState: 'playing'});
        } else {
            this.sound = new Sound(link, null, (error) => {
                if (error) {
                    this.setState({playState: 'paused'});
                } else {
                    this.setState({
                        playState: 'playing',
                        selectAudio: 'audio',
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
            }
            this.setState({
                playState: 'paused',
                playSeconds: 0,
                PlayAudioHint: false,
                playSecondsHint: 0, selectAudio: '',
            });

            this.sound.setCurrentTime(0);
        }
    };

    _actionPlay = (index) => {
        let pauseHint = [...this.state.pause];
        pauseHint.forEach((item, i) => {
            if (i !== index) {
                pauseHint[i] = true;
            } else {
                pauseHint[i] = !item;
            }
        });
        this.setState({pause: pauseHint, pauseQuestion: true});
    };

    _showAudioHint = (index) => {
        return (
            <View style={{width: height / 2.5, marginBottom: 5}}>
                <SoundQueshint
                    pause={this.state.pause[index]}
                    Audio={this.state.data[index].fileAudio}
                    action={() => this._actionPlay(index)}
                />
            </View>
        );
    };

    componentDidMount() {
        let dataNew = [];
        this.setState({isloading: true});
        this.setState({checktype: this.props.checkType});
        Keyboard.addListener('keyboardDidShow', () => this._showKeyBoad());
        Keyboard.addListener('keyboardDidHide', () => this._HideKeyBoad());
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({data_lesson: response});
        this.setState({dataFirt: response.data});
        let arrayAnsBegin = [];
        let array = [];
        let pauseHint = [...this.state.pause];
        for (let i = 0; i < response.data.data_question.length; i += 1) {
            pauseHint.push(true);
            DataObject1 = new Object();
            this.setState({fileAudioEx: response.data.lesson.lesson_audio});
            DataObject1.question_id = response.data.data_question[i].question_id;
            ans = [];
            for (
                let j = 0;
                j < response.data.data_question[i].list_option.length;
                j += 1
            ) {
                let a = response.data.data_question[i].list_option[0].list_option_same;
                //array[i] = a;
                array[i] = [];
                // if (!!a) {
                //     array[i] = JSON.parse(a);
                // }
                array[i].push(response.data.data_question[i].list_option[0].match_option_text)
                
                DataObject = new Object();
                DataObject.ans = '';
                DataObject.status = false;
                DataObject.statusHint = false;
                arrayAnsBegin.push(DataObject);
                DataObject2 = new Object();
                DataObject2.fileAudio = JSON.parse(
                    response.data.data_question[i].list_option[j].content_question,
                ).content_question_audio;
                DataObject2.question =
                    response.data.data_question[i].list_option[j].question_content;
                DataObject2.answer = array[i]
                DataObject2.explain = response.data.data_question[i].list_option[j].explain_parse ? response.data.data_question[i].list_option[j].explain_parse.content_question_text : JSON.parse(response.data.data_question[i].list_option[j].explain).content_question_text;
                this.setState({
                    title_ENG:
                    response.data.data_question[i].list_option[j].group_content,
                });
                this.setState({audio: response.data.lesson.lesson_audio});
                this.setState({
                    title_VI:
                    response.data.data_question[i].list_option[j].group_content_vi,
                });
            }
            if (this.props.checkType !== 'afterTest' && this.props.checkType !== 'Testing') {
            }
            dataNew.push(DataObject2);
        }
        this.setState({tuongDuong: array, pause: pauseHint});
        this.setState({ArrAnswer: arrayAnsBegin});
        this.setState({data: dataNew});
        //console.log('dataNew', dataNew);
        this.setState({isloading: false});
        this.timeout = setInterval(() => {
            if (
                this.sound &&
                this.sound.isLoaded() &&
                this.state.playState == 'playing' &&
                !this.state.sliderEditing
            ) {
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({playSeconds: seconds, playSecondsHint: seconds});
                });
            }
        }, 100);
        this.props.saveLogLearning([]);
    }

    pause = () => {
        if (this.sound) {
            this.sound.stop();
        }
        this.setState({playState: 'paused', selectAudio: ''});
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

    _showKeyBoad = () => {
        this.props.hideTypeExercise();
        this.setState({valueY:height * ( Platform.OS === 'ios'?0.04:0.06), showkey: true});
    };
    _HideKeyBoad = () => {
        this.props.showTypeExercise();
        this.setState({valueY: 0, showkey: false});
    };
    _Loadding = () => {
        return (
            <View style={style.Loading}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    };

    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
    };

    _actionSoundQuestion = () => {
        console.log('123132');
        let pauseHint = [...this.state.pause];
        pauseHint.forEach((item, i) => {
            pauseHint[i] = true;
        });
        this.setState({pause: pauseHint, pauseQuestion: !this.state.pauseQuestion});
    };

    _ShowQuestion() {
        return (
            <View style={{
                width: SmartScreenBase.smPercenWidth*100,
                height: Platform.OS === 'ios' ? height * 0.62 : (height/width) >= 2 ? height * 0.67 : height * 0.6,
                alignItems: 'center',
                paddingTop: this.state.showkey?(height*0.07):0
            }}>
                <SoundQestion
                    Audio={this.state.audio}
                    // action={this._actionSoundQuestion}
                    // pauseQuestion={this.state.pauseQuestion}
                    // type={'listening2'}
                />
                <View
                    style={{
                        paddingBottom: this.state.valueY,
                        // height: Platform.OS === 'ios' ? height * 0.52 : height * 0.48,
                        width: SmartScreenBase.smPercenWidth*100,
                        flex:1,
                    }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        extraData={this.state.refresh}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={this._RenderQuestion.bind(this)}
                        // style={{height:this.state.valueY}}
                    />
                </View>
            </View>
        );
    }

    _RenderQuestion = ({item, index}) => {
        //console.log(item);
        let arr = item.question.split(' ');
        return (
            <View style={{...style.RenderQuestionView, marginBottom: index == this.state.data.length - 1 ? 30 : 0}}>
                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: SmartScreenBase.smPercenWidth*90,
                        marginTop: 10,
                    }}>
                    <Text style={[StyleLesson.question_text_2, {fontFamily: FontBase.MyriadPro_Bold}]}>{index + 1}. </Text>
                    {arr.map((e, key) => {
                        return (
                            <View style={{}} key={key} >
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                    <Text style={[{fontFamily: FontBase.MyriadPro_Regular}, StyleLesson.question_text_2]}>
                                        {e}{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                <View style={{marginBottom: 5, flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={{uri: 'lesson_grammar_image1'}}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 112,
                            height: SmartScreenBase.smBaseWidth * 112,
                            marginLeft: SmartScreenBase.smPercenHeight,
                            resizeMode: 'contain',
                            marginRight: 2,
                        }}
                    />
                    <View style={{width: SmartScreenBase.smPercenWidth*70, justifyContent:'center'}}>
                        {this.state.ArrAnswer[index].status === true ? (
                            <Text style={{
                                fontStyle: 'italic',
                                color: '#8E1C76',
                                fontSize: SmartScreenBase.smFontSize * 45,
                                marginLeft:SmartScreenBase.smPercenWidth
                            }}>
                                {this.state.ArrAnswer[index].ans}
                            </Text>
                        ) : (
                            <TextInput
                                style={[
                                    stylesApp.txt,
                                    {
                                        margin: SmartScreenBase.smPercenHeight,
                                        justifyContent: 'flex-start',
                                        borderBottomColor: '#00000050',
                                        borderBottomWidth: 0.5,
                                        fontStyle: 'italic',
                                        color: '#8E1C76',
                                        fontSize: SmartScreenBase.smFontSize * 45,
                                    },
                                ]}
                                returnKeyType="done"
                                blurOnSubmit={true}
                                autoCorrect={false}
                                placeholder={'Sửa lại...'}
                                multiline={true}
                                onChangeText={(text) => {
                                    this._OnTextChange(text, index);
                                }}
                            />
                        )}
                    </View>
                </View>
            </View>
        );
    };

    _OnTextChange(text, index) {
        // let array = this.state.ArrAnswer.slice('');
        // array[index].ans = text;
        // this.setState({ArrAnswer: array});
        //this._OnCheckNotNull(array);
        this.state.ArrAnswer[index].ans = text;
        this.setState({showButton: !!this.state.ArrAnswer.find(c=>!c.status &&!!c.ans )});
    }

    _OnCheckNotNull = (array) => {
        let check = false;
        array.forEach((item) => {
            if (item) {
                check = true;
                return false;
            }
        });
        if (check) {
            this.setState({showButton: true});
        } else {
            this.setState({showButton: false});
        }
    };
    _trimChar = (string) => {
        // string = string.replace('‘', '\'').replace(/[\u2018\u2019]/g, '\'').trim();
        // while (string.charAt(string.length - 1) === '.' || string.charAt(string.length - 1) === ',') {
        //     string = string.substring(0, string.length - 1).trim();
        // }
        // return string;
        return stringUtils.validWord(string)
    };
    _onCheckNumberRight = () => {
        let number = 0;
        //let copyArray = [...this.state.ArrAnswer];

        this.state.ArrAnswer.forEach((a,i)=>{

            this.kqList[i] = false;
            if(!!a && !!a.ans){
                if(lessonMath.CheckAnswer(this.state.data[i].answer[0], a.ans)){
                    number++;
                    a.status = true;
                    a.statusHint = true;
                    this.kqList[i] = true;
                }
            }
        })
        
        // for (let i = 0; i < this.state.ArrAnswer.length; i++) {
        //     if (this.state.ArrAnswer[i] != '') {
        //         if (
        //             this._trimChar(this.state.ArrAnswer[i].ans.toLowerCase()) ===
        //             this._trimChar(this.state.data[i].answer.toLowerCase())
        //         ) {
        //             number++;
        //             copyArray[i].status = true;
        //             copyArray[i].statusHint = true;
        //         }
        //         if (array[i] != '') {
        //             array[i].map((item) => {
        //                 if (this._trimChar(item.toLowerCase()) == this._trimChar(this.state.ArrAnswer[i].ans.toLowerCase())) {
        //                     number++;
        //                     copyArray[i].status = true;
        //                     copyArray[i].statusHint = true;
        //                     console.log(1);
        //                 }
        //             });
        //         }
        //     }
        // }

        //this.setState({ArrAnswer: copyArray});

        if (number === this.state.data.length) {
            this.setState({statusCheckRightOrFalse: 'allRight',numberRightEx: number});
        } else {
            this.setState({statusCheckRightOrFalse: 'NoAllRight',numberRightEx: number});
        }
        //this.setState({numberRightEx: number});
        //console.log(copyArray);
    };
    _OnPressKT = () => {
        this.props.hideTypeExercise();
        this.setState({numberDoExam: this.state.numberDoExam + 1});
        this._onCheckNumberRight();
        this.setState({statusScreen: 'resultNotDone'});
    };
    _OnPressLL = () => {
        //console.log('ArrAnswer', this.state.ArrAnswer);
        this.props.showTypeExercise();
        this.setState({showButton: false});
        if (this.state.numberDoExam < 2) {
            this._reSetAns();
            this.setState({statusScreen: 'question'});
        } else {
            this._reSetAns();
            this.setState({statusScreen: 'ShowHind'});
        }
    };

    _ShowHintQuestion() {
        return (
            <View style={{
                width: SmartScreenBase.smPercenWidth*100, 
                height: Platform.OS === 'ios' ? height * 0.60 : (height/width) >= 2 ? SmartScreenBase.smPercenHeight * 67 : height * 0.56,
                paddingTop: this.state.showkey?(height*0.07):0
                }}>
                {/* <SoundQestion
                    Audio={this.state.audio}
                    action={this._actionSoundQuestion}
                    pauseQuestion={this.state.pauseQuestion}
                    type={'listening2'}
                /> */}
                <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        extraData={this.state.refresh}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={this._ItemHintQuestion.bind(this)}
                    />
            </View>
        );
    }

    _onPressHintIcon = (index) => {
        let copyArray = this.state.ArrAnswer.slice('');
        copyArray[index].statusHint = true;
        this.setState({ArrAnswer: copyArray});
    };
    _ItemHintQuestion = ({item, index}) => {
        //console.log(item);
        let arr = item.question.split(' ');
        return (
            <View style={{
                ...style.RenderQuestionView,
                marginBottom: this.state.showkey && index == this.state.data.length - 1 ? height / 9 : 0,
            }}>
                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: SmartScreenBase.smPercenWidth*90,
                        marginTop: 10,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>{index + 1}. </Text>
                    {arr.map((e, key) => {
                        return (
                            <View style={{}} key={key}>
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                    <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4}}>
                                        {e}{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                {!this.state.ArrAnswer[index].status&&this._showAudioHint(index)}
                <View style={{marginBottom: 5, flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={{uri: 'lesson_grammar_image1'}}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 112,
                            height: SmartScreenBase.smBaseWidth * 112,
                            marginLeft: SmartScreenBase.smPercenHeight,
                            resizeMode: 'contain',
                            marginRight: 2,
                        }}
                    />
                    <View style={{width: SmartScreenBase.smPercenWidth*70,justifyContent:'center'}}>
                        {this.state.ArrAnswer[index].status === true ? (
                            <Text style={{
                                fontStyle: 'italic',
                                color: '#8E1C76',
                                fontSize: SmartScreenBase.smFontSize * 45,
                                marginLeft:SmartScreenBase.smPercenWidth
                            }}>
                                {this.state.ArrAnswer[index].ans}
                            </Text>
                        ) : (
                            <TextInput
                                style={[
                                    stylesApp.txt,
                                    {
                                        margin: SmartScreenBase.smPercenHeight,
                                        justifyContent: 'flex-start',
                                        borderBottomColor: '#00000050',
                                        borderBottomWidth: 0.5,
                                        fontStyle: 'italic',
                                        color: '#8E1C76',
                                        fontSize: SmartScreenBase.smFontSize * 45,
                                    },
                                ]}
                                returnKeyType="done"
                                blurOnSubmit={true}
                                autoCorrect={false}
                                placeholder={'Sửa lại...'}
                                multiline={true}
                                onChangeText={(text) => {
                                    this._OnTextChange(text, index);
                                }}
                            />
                        )}
                    </View>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 30,
                        right: -SmartScreenBase.smBaseWidth * 5,
                    }}>
                </View>
            </View>
        );
    };
    _ShowResultNotDone = () => {
        console.log("=====_ShowResultNotDone", SmartScreenBase.ratio)
        console.log("=====hideIcon", hideIcon)
        const hideIcon = this.state.numberDoExam<=2 
                            && this.state.numberRightEx !== this.state.data.length
        return (
            <View style={{width: SmartScreenBase.smPercenWidth*100, height: Platform.OS === 'ios' ? (SmartScreenBase.ratio >= 1.95 ? SmartScreenBase.smPercenHeight * 78 : SmartScreenBase.smPercenHeight * 75) : SmartScreenBase.ratio >= 2 ? SmartScreenBase.smPercenHeight * 82 : SmartScreenBase.smPercenHeight * 75}}>
                <View style={{
                    height: SmartScreenBase.smPercenHeight*(hideIcon?1:13),
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FileSound 
                    showIcon={hideIcon?'none':null}
                    showImage={this.state.numberRightEx === this.state.data.length ? 'true' : 'false'}/>
                </View>
                <View style={{width: SmartScreenBase.smPercenWidth*100, alignItems: 'center'}}>
                    <Text style={{...StyleLesson.text_answer}}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.numberRightEx}/
                        {this.state.data.length}
                    </Text>
                </View>
                <View
                    style={{
                        height: Platform.OS === 'ios' ? SmartScreenBase.ratio >= 1.95 ? SmartScreenBase.smPercenHeight*(hideIcon?70:60) : SmartScreenBase.smPercenHeight*(hideIcon?65:55)
                         : SmartScreenBase.ratio >= 2 ? SmartScreenBase.smPercenHeight*(hideIcon?74:64) : SmartScreenBase.smPercenHeight*(hideIcon?65:55),
                        width: SmartScreenBase.smPercenWidth*100,
                    }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        extraData={this.state.refresh}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={this.state.numberRightEx == this.state.data.length ? this._ItemResultDone.bind(this) : this._ItemResultNotDone.bind(this)}
                    />
                </View>
            </View>
        );
    };
    _ItemResultNotDone = ({item, index}) => {
        let arr = item.question.split(' ');
        !this.state.ArrAnswer[index].status;
        return (
            <View
                style={{
                    width: SmartScreenBase.smPercenWidth*90,
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    marginLeft: SmartScreenBase.smPercenWidth*5,
                    marginTop: 50,
                    borderColor:
                        !this.state.ArrAnswer[index].status
                            ? '#D80B0B'
                            : '#72B228',
                    borderWidth: 3,
                }}>
                <View
                    style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 80,
                    }}>
                    <Image
                        source={{
                            uri:
                                !this.state.ArrAnswer[index].status
                                    ? 'grammar1_3'
                                    : 'grammar1_4',
                        }}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 120,
                            height: SmartScreenBase.smBaseWidth * 120,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: SmartScreenBase.smPercenWidth*90,
                        marginTop: 10,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>{index + 1}. </Text>
                    {arr.map((e, key) => {
                        return (
                            <View style={{}} key={key}>
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                    <Text
                                        style={stylesApp.Sty_Marid_Bold_50}>
                                        {e}{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                <View style={{marginBottom: 5, flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={{uri: 'lesson_grammar_image1'}}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 112,
                            height: SmartScreenBase.smBaseWidth * 112,
                            marginLeft: SmartScreenBase.smPercenHeight,
                            resizeMode: 'contain',
                            marginRight: 2,
                        }}
                    />
                    <View
                        style={{
                            width: width * 0.6,
                            marginBottom: Platform.OS === 'ios' ? 12 : 0,
                            justifyContent: 'center',
                            height: this._FunctionToReplaceQuestion(this.state.ArrAnswer[index].ans) === '' ? SmartScreenBase.smBaseWidth * 112 : null,
                            marginLeft: 10,
                        }}>
                        <Text style={{
                            fontStyle: 'italic',
                            color: '#8E1C76',
                            fontSize: SmartScreenBase.smFontSize * 45,
                        }}>
                            {this.state.ArrAnswer[index].ans}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };
    _ShowResultDone = () => {
        this.props.hideTypeExercise();
        this.props.showFeedback();
        return (
            <View style={{width: width, height: Platform.OS === 'ios' ? height * 0.75 : (height/width) >= 2 ? SmartScreenBase.smPercenHeight * 79 : height * 0.66}}>
                <View style={{
                    height: SmartScreenBase.smPercenHeight * 13,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FileSound showImage={this.state.numberRightEx === this.state.data.length ? 'true' : 'false'}/>
                </View>
                <View style={{width, alignItems: 'center'}}>
                    <Text style={{...StyleLesson.text_answer}}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.numberRightEx}/
                        {this.state.data.length}
                    </Text>
                </View>
                <View
                    style={{
                        height: Platform.OS === 'ios' ? height * 0.53 : (height/width) >= 2 ? SmartScreenBase.smPercenHeight * 59 : height * 0.43,
                        width: width,
                    }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        extraData={this.state.refresh}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={this._ItemResultDone.bind(this)}
                    />
                </View>
            </View>
        );
    };
    _ShowScriptItem = (index, isRight) => {
        return (
            <View
                style={{
                    width,
                    marginLeft: SmartScreenBase.smPercenHeight,
                    flexDirection: 'row',
                    marginBottom: 10,
                }}>
                {!isRight && <Image
                    source={{
                        uri: 'lesson_grammar_image3',
                    }}
                    style={{
                        width: SmartScreenBase.smBaseWidth * 50,
                        height: SmartScreenBase.smBaseWidth * 50,
                        resizeMode: 'contain',
                    }}
                />}
                <View
                    style={{
                        //height: SmartScreenBase.smBaseWidth * 112,
                        width: width * 0.75,
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                    <Text style={[stylesApp.Sty_Marid_Bold_50,{marginLeft: 5, color: '#72B228'}]}>
                        {this.state.data[index].answer[0][0]}
                    </Text>
                </View>
            </View>
        );
    };
    _ItemResultDone = ({item, index}) => {
        const isRight = this.state.ArrAnswer[index].status;
        
        return (
            <View
                style={{
                    width: width * 0.9,
                    backgroundColor: '#FFF',
                    borderWidth: 2,
                    borderColor: isRight?'#72B228':'#D80B0B',
                    borderRadius: 10,
                    marginLeft: width * 0.05,
                    marginTop: 50,
                }}>
                <View
                    style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 80,
                    }}>
                    <Image
                        source={{
                            uri: isRight?'grammar1_4':'grammar1_3'
                        }}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 120,
                            height: SmartScreenBase.smBaseWidth * 120,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: width * 0.9,
                        marginTop: 10,
                    }}>
                    <Text style={[stylesApp.Sty_Marid_Bold_50,{
                         color: isRight
                            ? '#72B228'
                            : '#D80B0B',
                    }]}>
                        <Text style={[
                            stylesApp.Sty_Marid_Bold_50,{
                                color: '#000',
                            }]}>{index + 1}. </Text>
                        {this.state.ArrAnswer[index].ans}
                    </Text>
                </View>
                {!isRight &&
                    this._ShowScriptItem(index, isRight)
                }
                <View style={{marginBottom: 5}}>
                    <Text
                        style={{
                            marginLeft: SmartScreenBase.smPercenHeight,
                            fontWeight: 'bold',
                        }}>
                        GIẢI THÍCH:
                    </Text>
                    <View
                        style={{
                            width: width * 0.7,
                            marginBottom: 12,
                            justifyContent: 'center',
                            marginLeft: 30,
                        }}>
                        <Text style={{
                            fontStyle: 'italic',
                            color: '#000',
                            fontSize: SmartScreenBase.smFontSize * 45,
                        }}>
                            {this.state.data[index].explain}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    _OnShowScript() {
        this.setState({showScript: !this.state.showScript});
    }

    _ShowScript = () => {
        return (
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
                        <Text style={{marginTop: 20, padding: 10}}>
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
        );
    };

    _OnPressBack() {
        this.props.prevReviewResult();
    }

    _SubmitTeting = async () => {
        let dataHistory = [];
        //console.log('this.state.SaveArrayAns',this.state.SaveArrayAns);
        this.props.dispatch(ActionListeningD2(this.state.ArrAnswer));
        //console.log('aojoajoajaoa DONE')
        let copySaveArrayAns = [...this.state.SaveArrayAns];
        let resual = [...this.state.ArrAnswer];
        let newObject = new Object();
        newObject.ans = resual;
        copySaveArrayAns.push(newObject);
        for (let i = 0; i < this.state.dataFirt.data_question.length; i++) {
            let ar = [];
            for (let j = 0; j < copySaveArrayAns.length; j++) {
                let Ob1 = new Object();
                Ob1.num_turn = j;
                Ob1.score = 0
                lessonMath.CheckAnswer(this.state.data[i].answer[0],copySaveArrayAns[j].ans[i].ans) ? 1 : 0
                Ob1.user_choice = copySaveArrayAns[j].ans[i].ans;
                ar.push(Ob1);
            }
            let Ob = new Object();
            Ob.question_id = this.state.dataFirt.data_question[i].question_id;
            Ob.exercise_type = 'Listening';
            Ob.question_type = this.state.dataFirt.data_question[i].list_option[0].question_type;
            if (this.state.ArrAnswer[i].status === true) {
                Ob.question_score = this.state.dataFirt.data_question[
                    i
                    ].list_option[0].score;
            } else {
                Ob.question_score = '0';
            }
            Ob.final_user_choice = this.state.ArrAnswer[i];
            Ob.detail_user_turn = ar;
            dataHistory.push(Ob);
        }
        console.log(dataHistory);
        const body = {
            data_lesson: JSON.stringify(this.state.data_lesson),
            skill: 'writting',
            log_lesson_detail_id: parseInt(this.state.logid.log_lesson_detail_id),
            log_lesson_id: parseInt(this.state.logid.log_lesson_id),
            data_answer: JSON.stringify(dataHistory),
            class_id: 1,
            unit_id: 1,
            curriculum_id: 1,
            lesson_id: this.state.dataFirt.lesson.id,
        };
        let dataLogin = this.props.data_login;
        if (this.state.checktype === 'Testing') {
            this.props.setDataAnswer(dataHistory);
        }
        const url =
            dataLogin.role === 'student'
                ? API.baseurl+'api_log_learning/check_score'
                : API.baseurl + API.saveLogLearning;
        const header = {
            'Content-Type': 'application/json',
            jwt_token:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            console.log("=========_saveStartLogLearning Listen D5");
            const res = await axios({
                method: 'post',
                url: url,
                headers: header,
                data: body,
            });
            let dataReturn = res.data;
            //console.log(res)
            if (dataReturn.status) {
                this.props.reviewResult(dataReturn);
            }
        } catch (error) {
            console.log(error);
        }
    };


    render() {
        return (
            <View style={{flex: 1}}>
            <Animated.View onStartShouldSetResponder={() => Keyboard.dismiss()}>
                {this.state.isloading === true ? this._Loadding() : null}
                {this.state.statusScreen === 'question'
                    ? this._ShowQuestion()
                    : this.state.statusScreen === 'resultNotDone'
                        ? this._ShowResultNotDone()
                        : this.state.statusScreen === 'ShowHind'
                            ? this._ShowHintQuestion()
                            : this.state.statusScreen === 'resultDone'
                                ? this._ShowResultDone()
                                : null}
                {/* {this.state.showScript === true ? this._ShowScript() : null} */}
                {
                    this.state.checktype === 'exam' ? (
                        <View
                            style={{
                                width: width,
                                height: height * 0.1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            {this.state.statusScreen === 'question' ? (
                                this.state.showButton === true ?
                                    <TouchableOpacity
                                        disabled={false}
                                        onPress={() => {
                                            this.pause();
                                            this._OnPressKT();
                                            this._SaveArrayAns();
                                        }}
                                        style={stylesApp.Sty_Button}>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        disabled={true}
                                        onPress={() => {
                                            this.pause();
                                            this._OnPressKT();
                                            this._SaveArrayAns();
                                        }}
                                        style={stylesApp.Sty_Button_disable}>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                            ) : this.state.statusScreen === 'resultNotDone' ? (
                                this.state.statusCheckRightOrFalse === 'allRight' ? (
                                    <View style={{
                                        flexDirection: 'row',
                                        width: width,
                                        height: height * 0.1,
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._OnShowScript();
                                            }}
                                            style={stylesApp.Sty_ShortButton}>
                                            <Text style={stylesApp.Sty_Text_Button}>SCRIPT</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._Submit();
                                            }}
                                            style={stylesApp.Sty_ShortButton}>
                                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnPressLL();
                                        }}
                                        style={stylesApp.Sty_Button}>
                                        <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                                    </TouchableOpacity>
                                )
                            ) : this.state.statusScreen === 'ShowHind' ? (
                                <View style={{
                                    width: width,
                                    height: height * 0.1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        disabled={!this.state.showButton}
                                        onPress={() => {
                                            this._OnPressKT();
                                            this._SaveArrayAns();
                                            this.setState({statusScreen: 'resultDone'});
                                        }}
                                        style={this.state.showButton?stylesApp.Sty_Button:stylesApp.Sty_Button_disable}>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : this.state.statusScreen === 'resultDone' ? (
                                <View style={{
                                    marginTop: height * 0.05,
                                    flexDirection: 'row',
                                    width: width,
                                    height: height * 0.1,
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnShowScript();
                                        }}
                                        style={stylesApp.Sty_ShortButton}>
                                        <Text style={stylesApp.Sty_Text_Button}>SCRIPT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._Submit();
                                        }}
                                        style={stylesApp.Sty_ShortButton}>
                                        <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                        </View>
                    ) : this.state.checktype === 'Testing' ? (
                        <View
                            style={{
                                width: width,
                                height: height * 0.1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._onCheckNumberRight();
                                    this._SaveArrayAns();
                                    this._SubmitTeting();
                                }}
                                style={stylesApp.Sty_Button}>
                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
            </Animated.View>
            {this.state.showScript && <ModalScript
                    audio={this.state.audio}
                    title={this.state.dataFirt?.lesson?.lesson_text_audio}
                    visible={this.state.showScript}
                    close={()=>this.setState({showScript:false})}
                />}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.ListeningD2Reducer.data_answer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(ListeningD5);
