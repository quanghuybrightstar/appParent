import React, {Component, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    Animated,
    PermissionsAndroid, ActivityIndicator, ImageBackground, FlatList, Dimensions, BackHandler,
    TouchableWithoutFeedback,
    Modal,
    Platform,
    Linking,
} from 'react-native';
import Video from 'react-native-video';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Sound from 'react-native-sound';
import StyleLesson from '../StyleLesson';
import styleButton from '../../../../../src/styleApp/stylesApp';
import AudioRecord from 'react-native-audio-record';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import {connect} from 'react-redux';
import URL from '../../../../../src/API/APIConstant';
import {IMAGE_RECORD, IMAGE_GA} from '../../../../assets/image/index';
import {RightAnswer, WrongAnswer} from '../../../../assets/sound';
import ShowData from '../Vocabulary/ComponentChampion/showVocabData';
import Champion from '../../Lesson/Vocabulary/ComponentChampion';
import AdjustLabel from '../../../../componentBase/AdjustLabel/AdjustLabel'
import FontBase from '../../../../base/FontBase';
import API from '../../../../../src/API/APIConstant';
import MyData from '../../../MyData';
import recordSetting from '../../../../utils/recordSetting';
import LogBase from '../../../../base/LogBase';
import FileSound4 from '../FileSound4';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import { StudentGrammarJson } from '../../../../stringJSON/StudentGrammarJson';
import { CommonJson } from '../../../../stringJSON';
import { SmPopup } from '../../../../componentBase/SmPopup/SmPopup';
import APIBase from '../../../../base/APIBase'
import { Colors } from '../../../../styleApp/color';

Sound.setCategory('Playback');
const _setDataVocab = (data) => {
    let array = [];
    data.map((item) => {
        array.push(item.list_phoneme_score)
    })
    return array
};

let InterVal;
let date = new Date();
let Radiotest = `record${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.wav`;
let options = {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6,
    wavFile: '1.wav'
};
let a = 0;
var dataRadio = {};
var group_contents = {};
let deceleration;
let dataFilebase64 = '';
let audio = '';
let data_overallScore = [];
const {width, height} = Dimensions.get('window');
const smartFont = SmartScreenBase.smFontSize;
var datacheck = []
var isCorrect = false
var isStartCheck = false

class PronunciationD1 extends Component {

    sound = null;

    constructor(props) {
        super(props);
        this.state = {
            stateShowimage: true,
            scoreListoption: null,
            Image1: null,
            stateShowear: false,
            stateText: true,
            data_ojb: '',
            index: 0,
            dataRadio: '',
            link: '',
            stateOnplay: false,
            statereplayspeed: true,
            checkMicro: false,
            indexkt: 0,
            audioFile: '',
            recording: false,
            loaded: false,
            paused: true,
            lengthData: 0,
            dataQuestion: [],
            stateTitel: '',
            btnTitel: true,
            showmodalh: false,
            statespelling: '',
            disiblemicro: false,
            whoose: true,
            loading: true,
            loadingcheck: true,
            statu_scroe: 0,
            arrayans: [],
            datalisson: [],
            questionType: '',
            lessonId: '',
            idLog: [],
            statuicon: false,
            reading_convention: false,
            dataIndexQuestion: 0,
            totalScore: 0,
            txtDood: '',
            txtPoor: '',
            statusReco: '',
            resultStatus: 0,
            dataOverall_score_grade: [],
            data_list_word: [],
            time: 15,
            data_word: [],
            historySound: null,
            isLoading: false,
            renderStatus: false,
            showSound: true,
            details:[],
            detailsId:0,
            isShowPopup: false,
            historyRecodData: [],
            AudioPlaying: false,
            curVoice: null
        };
        this._onImage = this._onImage.bind(this);
        this.startRecoder = this.startRecoder.bind(this);
        this._oncheck = this._oncheck.bind(this);
        this.nextQuetion = this.nextQuetion.bind(this);
        this._onreplay = this._onreplay.bind(this);
        this._onlistenagain = this._onlistenagain.bind(this);
        this._onSpelling = this._onSpelling.bind(this);
        this.rightAnswer = null;
        this.wrongAnswer = null;
        //this._onlistenagainHistory = this._onlistenagainHistory.bind(this);
        this._player = null;
        this.mAudio = React.createRef();
        this.isCanPlay = this.isCanPlay.bind(this);
        this.startPlay = this.startPlay.bind(this);
        this.endPlay = this.endPlay.bind(this);
    }

    async componentDidMount() {
        // await this.checkPermission();
        await this.getDataquetion();
        this.initAudioPlayer();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.backAction,
        );
        this.props.saveLogLearning([]);
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    initAudioPlayer = () => {
        AudioRecord.init({
          ...recordSetting.optionRecord,
          wavFile:`pro2_${Date.now()}.wav`
        });
      }

    backAction = () => {
        this.props.goBack();
        return true;
    };

    _setTime = () => {
        InterVal = setInterval(() => {
            this.setState({time: this.state.time - 1});
            if (this.state.time <= 0) {
                this._onImage();
            }
        }, 1000);
    };
    getDataquetion = async () => {
        let data = this.props.dataContent;
        try{
        // this._postDataFirt(data);
        if (data.status) {
            this.setState({loading: false});
            this.setState({datalisson: data});
            this.setState({lessonId: data.lesson.id});
            group_contents = data.data_question[this.state.dataIndexQuestion].list_option[0];
            this.setState({stateTitel: group_contents.group_content});
            this.setState({data_ojb: data.data_question[this.state.dataIndexQuestion].list_option[0].match_option_text[0]});
            this.setState({statespelling: data.data_question[this.state.dataIndexQuestion].list_option[0].option_text});
            this.setState({questionType: data.data_question[this.state.dataIndexQuestion].list_option[0].question_type});
            this.setState({scoreListoption: data.data_question[this.state.dataIndexQuestion].list_option[0].score});
            this.setState({dataQuestion: data.data_question});
            this.setState({lengthData: data.data_question.length});
            dataRadio = JSON.parse(data.data_question[this.state.dataIndexQuestion].list_option[0].content_question);
            const fLink = JSON.parse(data.data_question[this.state.dataIndexQuestion].list_option[0].content_question).content_question_audio;
            this.setState({link: fLink});
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    };

    checkPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
                {
                    title: 'Audio Recording Permission',
                    message: 'PERSMISSION RO RECORD AUDIO',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Audio permission denied');
            }
        } catch (err) {
            console.warn(err);
        }

    };

    _onreplay = () => {
        if (this.mAudio.current) {
            this.setState({whoose: false})
            this.mAudio.current.seek(0);
        }
        this.setState({stateShowimage: true});
    };

    _oncheck = async () => {
        let itemscore = {};
        // let widthProgress = props.total ? ((props.index + 1) * SmartScreenBase.smPercenWidth * 80 / props.total) : 0;
        const {dataQuestion, data_ojb, index, link, Image1, statespelling} = this.state;
        //let nameAu = `record${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.wav`;
        let fileName = `AudioRecord${Date.now()}.wav`;
        this.setState({statuicon: true});
        this.isStartCheck = false
        var url = API.baseurl+'student/api_student_lesson/compare_recording_file'
        LogBase.log('==========API:',url)
        var reqList = [
            // {name: 'file', filename: nameAu, data: dataFilebase64},
            {
                name: 'file',
                filename: fileName,
                data: RNFetchBlob.wrap(this.state.audioFile),
            },
            {name: 'text_compare', data: this.state.data_ojb},
            {name: 'question_id', data: (""+this.props.dataContent.data_question[this.state.dataIndexQuestion].question_id)},
            {name: 'skill', data: 'pronunciation'},
        ]
        RNFetchBlob.fetch('POST', url, {
            'Content-Type': 'application/x-www-form-urlencoded',
            jwt_token: APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        }, reqList).then((resp) => {
            // this.setState({loadingcheck: false});
            let rs = JSON.parse(resp.data);
            LogBase.log("==========res::",resp)
            if (rs.status) {
                LogBase.log("==========res:",rs)
                var mCurVoice = {
                    score: `${rs.data.overall_score}`,
                    audio: `${API.domain}${rs.data.user_record_file}`
                }
                this.addScore(rs.data.overall_score)
                var dt = _setDataVocab(rs.data.list_word);
                this.setState({data_list_word: rs.data.list_word,details:dt});
                this.setState({statu_scroe: rs.data.overall_score_grade, resultStatus: rs.data.overall_score});
                itemscore['scores'] = rs.data.overall_score;
                itemscore['audioFiles'] = this.state.audioFile;
                if (data_overallScore.length < 3) {
                    data_overallScore.push(itemscore);
                } else if (data_overallScore.length == 3) {
                    if (data_overallScore[2].scores <= rs.data.overall_score) {
                        data_overallScore.pop();
                        data_overallScore.push(itemscore);
                    }
                }
                for (let i = data_overallScore.length - 1; i >= 0; i--) {
                    for (let j = 1; j <= i; j++) {
                        if (data_overallScore[j].scores > data_overallScore[j - 1].scores) {
                            let item = data_overallScore[j];
                            data_overallScore[j] = data_overallScore[j - 1];
                            data_overallScore[j - 1] = item;
                        }
                    }
                }
                var vStatus = rs.data.grade
                this.setState({dataOverall_score_grade: data_overallScore, curVoice: mCurVoice});
                if (vStatus == 'A') {
                    this.setState({txtDood: 'EXCELLENT!', txtPoor: 'BẠN QUÁ ĐỈNH', statusReco: vStatus});
                    this.setState({totalScore: this.state.totalScore + this.state.scoreListoption});
                    this.isCorrect = true;
                } else if (vStatus == 'B') {
                    this.setState({txtDood: 'GOOD!', txtPoor: 'TUYỆT VỜI, HÃY GIỮ PHONG ĐỘ', statusReco: vStatus});
                    this.setState({totalScore: this.state.totalScore + this.state.scoreListoption});
                    this.isCorrect = true;
                } else if (vStatus == 'C') {
                    this.setState({txtDood: 'FAIR!', txtPoor: 'BẠN CẦN CỐ GẮNG HƠN', statusReco: vStatus});
                    this.setState({totalScore: this.state.totalScore + this.state.scoreListoption});
                    this.isCorrect = false;
                } else {
                    this.setState({txtDood: 'POOR!', txtPoor: 'KHÔNG SAO, THỬ LẠI NÀO', statusReco: vStatus});
                    this.isCorrect = false;
                }
                this.isStartCheck = true
            }else{
                Alert.alert(rs.msg || "kiểm tra thu âm không thành công")
            }
            this._getHistoryRecod();
            // this.setState({loadingcheck: false});
            // this.setState({isLoading: false, showSound: false});
            // this.setState({stateText: false, renderStatus: true});
            this.props.hideTypeExercise();
        }).catch((err) => {
            this.setState({loadingcheck: false});
        }).finally(() => {
            // this.wrongAnswer.seek(0);
            // this.setState({isLoading: false, showSound: false});
        });
    };
    nextQuetion = async () => {
        //await AudioRecord.stop();
        //Sound.setCategory('Playback');
        this.props.showTypeExercise();
        clearInterval(InterVal);
        data_overallScore = [];
        this.setState({
            historyRecodData: [],
            data_list_word: [],
            data_word: [],
            renderStatus: false,
            showSound: true,
            reading_convention:false,
            whoose: true
        });
        const {dataQuestion} = this.state;
        if (this.state.dataIndexQuestion < this.state.lengthData - 1) {

            let indexQ = this.state.dataIndexQuestion;
            indexQ++;
            this.props.setIndexQuestion(this.state.dataIndexQuestion + 1);
            this.setState({
                loadingcheck: true,
                dataIndexQuestion: indexQ,
                statuicon: false,
                time: 15,
                indexkt: 0,
                data_ojb: dataQuestion[indexQ].list_option[0].match_option_text[0],
                statespelling: dataQuestion[indexQ].list_option[0].option_text,
                link: JSON.parse(dataQuestion[indexQ].list_option[0].content_question).content_question_audio,
                stateText: !this.state.stateText,
                Image1: null,
                showmodalh: false,
                stateShowimage: true
            });

            dataFilebase64 = '';
            audio = '';

        } else {
            this.dataBody();
        }
    };

    addScore = (score) => {
        var indexDataCheck = datacheck.find(c => c.text == this.state.data_ojb)
        if(!indexDataCheck){
            datacheck.push({
                choice: "",
                score: score/100,
                text: this.state.data_ojb
            })
        }else{
            datacheck[datacheck.indexOf(indexDataCheck)] = {
                choice: "",
                score: score/100,
                text: this.state.data_ojb
            }
        }
        console.log("==========datacheck",datacheck)
    }

    // Tính điểm
    dataBody = () => {
        LogBase.log("=====datacheck",datacheck)
        var dataSaveList = []
        this.state.dataQuestion.forEach((ele, index) => {
            var mono = {
                question_id: ele.question_id,
                exercise_type: 'pronunciation',
                question_type: this.state.questionType,
                question_score: 0,
                final_user_choice: datacheck[index].choice,
                detail_user_turn: [
                    {
                        num_turn: '1',
                        score: datacheck[index].score,
                        user_choice: datacheck[index].choice,
                    },
                ],
            }
            dataSaveList.push(mono)
        });
        LogBase.log("=====dataBody",dataSaveList)
        this.props.saveLogLearning(dataSaveList);
    };

    startRecoder = () => {
        dataFilebase64 = '',
        audio = '';
        AudioRecord.start();
        this.setState({stateShowimage: false});
        this.setState({audioFile: '', recording: true, loaded: false, showSound: true,stateText:true});
        this._setTime();
    }

    _onImage = async () => {
        LogBase.log("=====_onImage 1")
        if (this.state.whoose == false && this.mAudio.current) {
            this.setState({whoose: true})
        }
        LogBase.log("=====_onImage 2")
        if (this.state.stateShowimage) { 
            var isCanRun = true
            LogBase.log("=====recordPress 1",isCanRun)
            if(Platform.OS === 'android'){
                const granted = await PermissionsAndroid.requestMultiple(
                    [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
                    {
                        title: 'Audio Recording Permission',
                        message: 'PERSMISSION RO RECORD AUDIO',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted['android.permission.RECORD_AUDIO'] == PermissionsAndroid.RESULTS.GRANTED) {
                    if(!MyData.recordAudioPer){
                        MyData.recordAudioPer = true
                        this.initAudioPlayer()
                    }
                }else{
                Alert.alert('Chú ý','Bạn vẫn chưa cấp quyền thu âm, vui lòng click đồng ý khi được hỏi xin quyền')
                isCanRun = false
                return;
                }
                this.startRecoder()
            }else{
                await check(PERMISSIONS.IOS.MICROPHONE).then((result) => {
                    switch (result) {
                    case RESULTS.UNAVAILABLE:
                        Alert.alert('Chú ý','Thiết bị của bạn không hỗ trợ thu âm')
                        break;
                    case RESULTS.GRANTED:
                        LogBase.log("=====recordPress 2",isCanRun)
                        if(!MyData.recordAudioPer){
                            MyData.recordAudioPer = true
                            this.initAudioPlayer()
                        }
                        this.startRecoder()
                        break;
                    case RESULTS.LIMITED:
                        Alert.alert('Chú ý','Quyền thu âm bị hạn chế do đang có nhiều hơn 1 trình thu âm hoạt động')
                        break;
                    case RESULTS.DENIED:
                        LogBase.log("=====recordPress 3",isCanRun)
                        request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
                            LogBase.log("=====result 3",result)
                            if(result == RESULTS.GRANTED){
                                this.startRecoder()
                            }else{

                            }
                          });
                        break;
                    case RESULTS.BLOCKED:
                        LogBase.log("=====recordPress 4",isCanRun)
                        this.setState({isShowPopup: true})
                        break;
                    }
                })
                .catch((error) => {
                    // …
                });
            }
            LogBase.log("=====recordPress 5",isCanRun)
        } else {
            LogBase.log("=====_onImage 3")
            clearInterval(InterVal);
            this.setState({stateShowimage: true});
            this.setState({isLoading: true});
            LogBase.log("=====_onImage 4")
            if (!this.state.recording) {
                this.setState({isLoading: false});
                return;
            }
            LogBase.log("=====_onImage 5")
            try {
                audio = await AudioRecord.stop();
                Sound.setCategory('Playback');
                this.setState({audioFile: audio, time: 15});
                LogBase.log("=====_onImage 6")
                RNFetchBlob.fs.readStream(
                    audio,
                    'base64',
                    4095)
                    .then((ifstream) => {
                        ifstream.open();
                        ifstream.onData((chunk) => {
                            dataFilebase64 += chunk;
                        });
                        ifstream.onError((err) => {
                            console.log('oops', err);
                        });
                        ifstream.onEnd(() => {
                        });
                    });
                LogBase.log("=====_onImage 7")
                await this._oncheck();
                LogBase.log("=====_onImage 8")
            } catch (err) {
                console.warn('err', err);
            }
        }
    };
    pause = () => {
        this.sound.pause();
        this.setState({paused: true});
    };
    load = () => {
        return new Promise((resolve, reject) => {
            if (!this.state.audioFile) {
                return reject('file path is empty');
            }
            this.sound = new Sound(audio, '', error => {
                if (error) {
                    console.log('failed to load the file', error);
                    return reject(error);
                }
                this.setState({loaded: true});
                console.log('Tai nghe', this.state.audioFile);
                return resolve();
            });
        });
    };

    _getHistoryRecod = async () => {

        var url = API.baseurl + API.getHistoryRecoder + `?question_id=${this.props.dataContent.data_question[this.state.dataIndexQuestion].question_id}&order_by=score&order_type=desc&litmit=3&origin_text=${this.state.data_ojb}`
        var res = await APIBase.postDataJson('get',url)
        this.setState({loadingcheck: false});
        if(res.data?.status){
            LogBase.log("=====_getHistoryRecod", res.data)
            var mlist = res.data.data || []
            // this.state.curVoice && mlist.unshift(this.state.curVoice)
            if(mlist.length > 0)
                this.setState({historyRecodData: mlist})
            LogBase.log("=====voice list", mlist)
        }
        this.setState({isLoading: false, showSound: false});
        this.setState({stateText: false, renderStatus: true});
        this.props.hideTypeExercise();
    }

    _onlistenagain = async () => {
        if(this._player){
            this._player.release();
            this._player = null;
        }

        this.setState({stateShowimage: true});
        if (this.state.whoose == false && this.mAudio.current) {
            this.setState({whoose: true})
        }
        this.setState({disiblemicro: !this.setState.disiblemicro});
        if (!this.state.loaded) {
            try {
                await this.load();
            } catch (error) {
                console.log(error);
            }
        }
        this.setState({paused: false});
        Sound.setCategory('Playback');
        this.sound.play(success => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            this.setState({paused: true});
        });
    };

    _onlistenagainHistory = async (item) => {
        if (this.state.whoose == false && this.mAudio.current) {
            this.setState({whoose: true})
        }
        if(this._player){
            this._player.release();
            this._player = null;
        }
        this._player = new Sound(item.audioFiles, '', error => {
            if (error) {
                console.log('failed to load the file', error);
            } else {
                this._player.play();   
            }
        });
        // if (this.state.historySound != null) {
        //     this.setState({historySound: this.state.historySound.stop(() => this.state.historySound.setSpeed(1))});
        // }
    };
    _onSpelling = () => {
        this.setState({showmodalh: !this.state.showmodalh});
    };

    _endAudioQuestion = async () => {
        await this.setState({whoose: true})
        this.mAudio.current.seek(0);
    };

    _RenderItem({item, index}) {
        return (
            <View
                style={{
                    marginTop: SmartScreenBase.smPercenHeight,
                    width: SmartScreenBase.smPercenWidth * 85,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: SmartScreenBase.smPercenWidth * 14,
                }}>
                    <Text style={{fontWeight: 'bold', fontFamily: 'MyriadPro-Bold'}}>{index + 1}</Text>
                    <View style={{
                        top: -SmartScreenBase.smPercenHeight,
                    }}>
                        <Text style={{fontWeight: 'bold', fontFamily: 'MyriadPro-Bold'}}>{index == 0 ? 'st' : index == 1 ? 'nd' : 'rd'}</Text>
                    </View>
                </View>
                <View style={{
                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                    width: SmartScreenBase.smPercenWidth * 42,
                    height: SmartScreenBase.smPercenHeight * 2.5,
                    borderRadius: (SmartScreenBase.smPercenHeight * 2.5) / 2,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(34,33,33,0.2)',
                }}>
                    <View
                        style={{
                            width: (item.scores / 100) * (SmartScreenBase.smPercenWidth * 42),
                            height: SmartScreenBase.smPercenHeight * 2.5 - 2,
                            borderRadius: (SmartScreenBase.smPercenHeight * 2.5) / 2,
                            backgroundColor: '#3399CC',
                        }}
                    >

                    </View>
                </View>

                <Text style={{ fontFamily: FontBase.MyriadPro_Regular, marginLeft: SmartScreenBase.smPercenWidth*2,
                    width: SmartScreenBase.smPercenWidth*10}}>
                            {item.scores}%
                        </Text>
                <View style={{
                    marginLeft: SmartScreenBase.smPercenWidth * 3,
                }}>
                    <TouchableOpacity onPress={() => this._onlistenagainHistory(item)}
                                      style={{zIndex: 1}}>
                        <Image source={{uri: 'pronunciation1118'}}
                               style={{
                                   width: SmartScreenBase.smBaseWidth * 80,
                                   height: SmartScreenBase.smBaseWidth * 80,
                                   resizeMode: 'contain',
                               }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    txtColor = (element) => {
        if (element.grade === 'A' || element.grade === 'B') {
            return '#088A08';
        } else if (element.grade === 'C') {
            return '#E5B007';
        } else {
            return '#D71921';
        }
    };

    word_pronunciation = (element,idx) => {
        this.setState({
            reading_convention: !this.state.reading_convention,
            data_word: element.list_phoneme_score,
            detailsId:idx,
        });

    };

    isCanPlay = () => {
        return !this.state.AudioPlaying
    }

    startPlay = () => {
        this.setState({AudioPlaying: true})
    }

    endPlay = () => {
        this.setState({AudioPlaying: false})
    }

    _renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showmodalh}
            >
                <TouchableWithoutFeedback onPress={this._onSpelling} accessible={false}>
                    <View
                        style={{
                            backgroundColor: '#00000080',
                            position: 'absolute',
                            width: width,
                            height: height,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <TouchableWithoutFeedback>
                            <View style={StyleLesson.showmodal_PronunciationD1}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: '#848484',
                                    marginTop: SmartScreenBase.smPercenHeight * 2,
                                    width: '95%',
                                    textAlign: 'center',
                                }}>
                                    BẢNG MẪU TỰ NGỮ ÂM QUỐC TẾ (IPA)
                                </Text>
                                <View style={{
                                    height: 1,
                                    width: '90%',
                                    backgroundColor: '#848484',
                                    margin: SmartScreenBase.smPercenHeight * 2,
                                }}/>
                                <Text style={{
                                    width: '95%',
                                }}>
                                    {this.state.statespelling}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };


    _renderModalReading = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.reading_convention}
            >
                <TouchableWithoutFeedback onPress={() => this.setState({reading_convention: false})}>
                    <View
                        style={{
                            backgroundColor: '#00000080',
                            position: 'absolute',
                            width: width,
                            height: height,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <TouchableWithoutFeedback>
                            <View style={StyleLesson.showmodal_PronunciationD1}>
                                <View style={{flexDirection: 'row', width: '90%'}}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: '#848484',
                                        marginTop: SmartScreenBase.smPercenHeight * 2,
                                        width: '50%',
                                        textAlign: 'center',
                                    }}>
                                        Phone
                                    </Text>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: '#848484',
                                        marginTop: SmartScreenBase.smPercenHeight * 2,
                                        width: '50%',
                                        textAlign: 'center',
                                    }}>
                                        Score
                                    </Text>
                                </View>
                                <View style={{
                                    height: 1,
                                    width: '90%',
                                    backgroundColor: '#848484',
                                    margin: SmartScreenBase.smPercenHeight * 2,
                                }}/>
                                {
                                    this.state.data_word.map((element, key) => {
                                        return (
                                            <View key={key} style={{flexDirection: 'row', width: '90%'}}>
                                                <Text style={{
                                                    fontSize: smartFont * 45,
                                                    fontWeight: 'bold',
                                                    width: '50%',
                                                    textAlign: 'center',
                                                }}>
                                                    {element.label}
                                                </Text>
                                                <Text style={{
                                                    fontSize: smartFont * 45,
                                                    fontWeight: 'bold',
                                                    width: '50%',
                                                    textAlign: 'center',
                                                }}>
                                                    {element.score}
                                                </Text>
                                            </View>
                                        );
                                    })
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    _renderBtnRecordAndroid = () => {
        return (
            this.state.stateShowimage
                ?
                <ImageBackground
                    source={IMAGE_GA}
                    style={{
                        width: SmartScreenBase.smBaseWidth * 300,
                        height: SmartScreenBase.smBaseWidth * 300,
                    }}
                    resizeMode={'contain'}
                    />
                :
                <ImageBackground
                    source={IMAGE_RECORD}
                    style={{
                        width: SmartScreenBase.smBaseWidth * 220,
                        height: SmartScreenBase.smBaseWidth * 220,
                    }}
                    resizeMode={'contain'}/>
        );
    };

    _renderLoading = () => {
        return (
            <View style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100,
                top: SmartScreenBase.smBaseWidth * 100,
                left: SmartScreenBase.smBaseWidth * 100,
            }}>
                <ActivityIndicator size="large" color="#fff"/>
            </View>
        );
    };

    _renderStatus = () => {
        return (
            <View style={{
                height: SmartScreenBase.smPercenHeight * 15,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: SmartScreenBase.smPercenWidth * 8,
            }}>
                <View style={{
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}>
                    <Image
                        source={{
                            uri: this.state.statusReco == 'A' || this.state.statusReco == 'B' ?
                                'pronunciation_1112'
                                : this.state.statusReco === 'C' ?
                                    'pronunciation_1111'
                                    : 'pronunciation_1110',
                        }}
                        style={{
                            width: SmartScreenBase.smPercenWidth * 20,
                            height: SmartScreenBase.smPercenWidth * 20,
                        }}
                    />
                    {/* {
                        this.state.statusReco == 'A' || this.state.statusReco == 'B' ?
                            <Video source={RightAnswer}
                                   ref={refs => this.wrongAnswer = refs}
                                   paused={false}
                                   audioOnly={true}
                                   // onEnd={() => this.rightAnswer.seek(0)}
                            />
                            :
                            <Video source={WrongAnswer}
                                   ref={refs => this.wrongAnswer = refs}
                                   paused={false}
                                   audioOnly={true}
                                   // onEnd={() => this.wrongAnswer.seek(0)}
                            />
                    } */}
                    {this.isStartCheck ? <FileSound4 showImage={this.isCorrect ? 'true' : 'false'} /> : null}
                </View>
                <View style={{
                    width: '75%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}>
                    <Text style={{
                        fontSize: SmartScreenBase.smFontSize * 90,
                        color: '#FFFDA4',
                        fontFamily: 'iCielSoupofJustice',
                    }}>{this.state.txtDood}</Text>
                    <AdjustLabel 
                        fontSize={SmartScreenBase.smFontSize * 60} 
                        text={this.state.txtPoor} 
                        numberOfLines={1} 
                        style={{
                            color: '#FFFDA4',
                            fontFamily: 'iCielSoupofJustice',
                        }}/>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.renderStatus && this._renderStatus()}
                <View style={{flex: 1, alignItems: 'center'}}>
                    {this._renderModal()}
                    {
                        !this.state.loading ?
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    height: SmartScreenBase.smPercenHeight * 54,
                                    marginTop: SmartScreenBase.smPercenHeight * 3,
                                    width: SmartScreenBase.smPercenWidth * 85,
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: SmartScreenBase.smPercenHeight * 2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position:'relative'
                                }}>
                                    {
                                        this.state.data_list_word.length == 0 ?
                                            <View
                                                style={{
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                }}>
                                                {
                                                    this.state.data_ojb.split(' ').map((e, k) => {
                                                        return (
                                                            <View key={k}>
                                                                {
                                                                    e.split(' ').map((element, key) => {
                                                                        return (
                                                                            <View key={key}>
                                                                                <View
                                                                                    style={{zIndex: 1}}>
                                                                                    <Text style={{
                                                                                        fontSize: this.state.data_ojb.split(' ').length == 1 ? smartFont * 65 : smartFont * 55,
                                                                                        fontFamily: FontBase.MyriadPro_Bold,
                                                                                        color: Colors.Black
                                                                                    }}>
                                                                                        {element}{' '}
                                                                                    </Text>
                                                                                </View>
                                                                            </View>
                                                                        );
                                                                    })
                                                                }
                                                            </View>
                                                        );
                                                    })
                                                }
                                            </View>
                                            :
                                            <View
                                                style={{
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                }}>
                                                {
                                                    this.state.data_list_word.map((element, key) => {
                                                        return (
                                                            <View key={key}>
                                                                <TouchableOpacity disabled={true}
                                                                    onPress={() => this.word_pronunciation(element,key)}
                                                                    style={{zIndex: 1}}>
                                                                    <Text style={{
                                                                        color: this.txtColor(element),
                                                                        fontSize: this.state.data_list_word.length === 1 ? smartFont * 65 : smartFont * 50,
                                                                        fontWeight: 'bold',
                                                                    }}>
                                                                        {element.text}{' '}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        );
                                                    })
                                                }
                                            </View>
                                    }
                                    <View style={{
                                        marginBottom: SmartScreenBase.smPercenHeight * 2,
                                        marginTop: SmartScreenBase.smPercenHeight * 2,
                                        width: SmartScreenBase.smPercenWidth * 85,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}>
                                        <TouchableOpacity disabled={!this.state.stateShowimage}
                                                          onPress={this._onreplay}>
                                            <Image source={{uri: 'pronunciation1117'}}
                                                   style={StyleLesson.Sty_ImageTyle_Pronunciation1}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this._onSpelling}>
                                            <Image source={{uri: 'phienam1'}}
                                                   style={StyleLesson.Sty_ImageTyle_Pronunciation1}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.Viewchampion}>
                                        {
                                            this.state.historyRecodData.map((item, index) => {
                                                if (index < 4) {
                                                    return <Champion index={index} item={item} isCanPlay={() => this.isCanPlay()} startPlay={() => this.startPlay()} endPlay={() => this.endPlay()}/>
                                                }
                                            })
                                        }
                                    </View>
                                    {/* {
                                        this.state.dataOverall_score_grade.length <= 0 ?
                                            <View
                                                style={{
                                                    height: SmartScreenBase.smBaseWidth * 80,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>

                                            </View>
                                            :
                                            <View
                                                style={{
                                                    width: SmartScreenBase.smPercenWidth * 85,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <View style={{
                                                    width: SmartScreenBase.smPercenWidth * 14,
                                                }}>
                                                    <Text style={{fontWeight: 'bold', fontFamily: 'MyriadPro-Bold'}}>LATEST</Text>
                                                </View>
                                                <View style={{
                                                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                                                    width: SmartScreenBase.smPercenWidth * 42,
                                                    height: SmartScreenBase.smPercenHeight * 2.5,
                                                    borderRadius: (SmartScreenBase.smPercenHeight * 2.5) / 2,
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'center',
                                                    backgroundColor: 'rgba(34,33,33,0.2)',
                                                }}>
                                                    <Animated.View
                                                        style={{
                                                            width: (this.state.resultStatus / 100) * (SmartScreenBase.smPercenWidth * 42),
                                                            height: SmartScreenBase.smPercenHeight * 2.5 - 2,
                                                            borderRadius: (SmartScreenBase.smPercenHeight * 2.5) / 2,
                                                            backgroundColor: '#3399CC',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                    </Animated.View>
                                                </View>
                                                <Text style={{ fontFamily: FontBase.MyriadPro_Regular, marginLeft: SmartScreenBase.smPercenWidth*2,
                                                    width: SmartScreenBase.smPercenWidth*10}}>
                                                        {this.state.resultStatus}%
                                                </Text>
                                                <View style={{
                                                    marginLeft: SmartScreenBase.smPercenWidth * 3,
                                                }}>
                                                    <TouchableOpacity onPress={() => this._onlistenagain()}>
                                                        <Image source={{uri: 'pronunciation1118'}}
                                                               style={{
                                                                   width: SmartScreenBase.smBaseWidth * 80,
                                                                   height: SmartScreenBase.smBaseWidth * 80,
                                                                   resizeMode: 'contain',
                                                               }}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                    } */}
                                    {/* <View style={{
                                        alignItems: 'center',
                                        height: SmartScreenBase.smPercenHeight * 15,
                                        width: SmartScreenBase.smPercenWidth * 85,
                                        justifyContent: 'center',
                                    }}>
                                        <FlatList
                                            data={this.state.dataOverall_score_grade}
                                            width='100%'
                                            renderItem={this._RenderItem.bind(this)}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View> */}
                                    <View style={{
                                        height: SmartScreenBase.smPercenHeight * 5,
                                        marginBottom: SmartScreenBase.smPercenHeight * 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        {
                                            this.state.stateShowimage ?
                                                null
                                                :
                                                <ImageBackground
                                                    source={{uri: 'pronunciation_1115'}}
                                                    resizeMode={'contain'}
                                                    style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: SmartScreenBase.smPercenWidth * 7,
                                                        height: SmartScreenBase.smPercenWidth * 7,
                                                    }}>
                                                    <Text style={{
                                                        fontSize: SmartScreenBase.smFontSize * 40,
                                                        color: '#5fb296',
                                                    }}>{this.state.time}</Text>
                                                </ImageBackground>
                                        }
                                    </View>
                                </View>
                                <View style={{
                                    height: SmartScreenBase.smPercenHeight * 5,
                                }}>
                                </View>
                                <View style={{
                                    ...StyleLesson.microPronunciationD1,
                                    marginTop: this.state.stateShowimage ? SmartScreenBase.smPercenHeight * 49 : SmartScreenBase.smPercenHeight * 51,
                                }}>
                                    <TouchableOpacity
                                        disabled={this.state.isLoading}
                                        onPress={() => this._onImage()}
                                    >
                                        {
                                            this.state.isLoading &&
                                            this._renderLoading()
                                        }
                                        {this._renderBtnRecordAndroid()}
                                    </TouchableOpacity>
                                </View>
                                {/* {
                                        !!this.state.reading_convention&&!!this.state.details ?
                                            <ShowData 
                                                style={{
                                                    marginTop:SmartScreenBase.smPercenHeight*6,
                                                    marginHorizontal:SmartScreenBase.smPercenWidth*8,
                                                    width:SmartScreenBase.smPercenWidth*80
                                                }}
                                                data={this.state.details} 
                                                showVocab={this.state.reading_convention} 
                                                close={() => { this.setState({reading_convention: false})}}
                                                index={this.state.detailsId} />
                                            :
                                            null
                                    } */}
                            </View>
                            :
                            <ActivityIndicator size="large" color="#0000ff" marginTop='40%'/>
                    }
                    <View style={{
                        alignItems: 'center',
                        height: SmartScreenBase.smPercenHeight * 10,
                    }}>
                        <View>
                            <TouchableOpacity
                                disabled={this.state.stateText}
                                onPress={this.nextQuetion}
                                style={!this.state.stateText ? styleButton.Sty_Button : styleButton.Sty_Button_disable}
                            >
                                <Text style={styleButton.Sty_Text_Button}>
                                    TIẾP TỤC
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Video
                    source={{ uri: this.state.link }}
                    ref={this.mAudio}
                    audioOnly={true}
                    paused={this.state.whoose}
                    onEnd={this._endAudioQuestion}
                />
                <SmPopup visible={this.state.isShowPopup} message={StudentGrammarJson.CallMicToRecoderError}
                confirmOnpress={() => {this.setState({isShowPopup: false}); Linking.openSettings()}} confirmText={CommonJson.Confirm} cancelText={CommonJson.Cancel} cancelOnpress={() => {this.setState({isShowPopup: false})}}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(PronunciationD1);
