import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ImageBackground,
    PermissionsAndroid, ActivityIndicator,
    FlatList, Dimensions,
    Slider, TextInput,
    Modal,
    Platform,
    Linking
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Sound from 'react-native-sound';
import StyleLesson from './stylespeakingD3/StyleLesson';
import styleButton from '../../../../../src/styleApp/stylesApp';
import stylesApp from './stylespeakingD3/stylesApp';
import AudioRecord from 'react-native-audio-record';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import URL from '../../../../../src/API/APIConstant';
import apiBase from '../../../../base/APIBase';
import api from '../../../../API/APIConstant';
import API from '../../../../../src/API/APIConstant';
import FontBase from '../../../../base/FontBase';
import MyData from '../../../MyData';
import { SmPopup } from '../../../../componentBase/SmPopup/SmPopup';
import { StudentGrammarJson } from '../../../../stringJSON/StudentGrammarJson';
import { CommonJson } from '../../../../stringJSON';
import LogBase from '../../../../base/LogBase';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import EventBus from 'react-native-event-bus';
import recordSetting from '../../../../utils/recordSetting';

const {height, width} = Dimensions.get('window');
const smartScreen = SmartScreenBase.smPercenHeight;
Sound.setCategory('Playback');
let options = {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6,
    wavFile: 'speeched.wav',
};
let dataSenadio = '';
let a = 0;
var group_contents = {};
let deceleration;
let database64 = '';
let timeOutValueSlider;
let date = new Date();

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}  

class SpeakingD3 extends Component {
    sound = null;

    constructor(props) {
        super(props);
        this.state = {
            stateShowimage: true,
            countNumber: 0,
            answer: '',
            Image1: null,
            data_ojb: '',
            index: 0,
            link: '',
            showSen: false,
            audioFile: '',
            recording: false,
            loaded: false,
            paused: true,
            lengthData: 0,
            dataQuestion: [],
            stateTest: null,
            DataOption_text: '',
            stateTitel: '',
            btnTitel: true,
            disiblemicro: false,
            whoose: null,
            loading: true,
            pausSound: true,
            Listteachers: false,
            Sensuccessfully: false,
            Samplepost: true,
            nameTeacher: 'Giáo Viên',
            samplerecording: true,
            seveRadio: false,
            imagemicro: 'pronunication_01_09',
            valueSlider: 0,
            StatusRecording: true,
            playSound: false,
            duration: 0,
            Play_Sound: '',
            file_id: '',
            data_Teacher: [],
            teachers:[],
            stateContent:'',
            isShowPopup: false
        };
        this._onImage = this._onImage.bind(this);
        this.startRecoder = this.startRecoder.bind(this);
        this._onlistenagain = this._onlistenagain.bind(this);
        this._onTranslet = this._onTranslet.bind(this);
        this._onValueChangeSlide = this._onValueChangeSlide.bind(this);
        this._onPause = this._onPause.bind(this);
        this._onSen = this._onSen.bind(this);
        this._showtTeacher = this._showtTeacher.bind(this);
        this._onCancel = this._onCancel.bind(this);
        this._showSensuccessfully = this._showSensuccessfully.bind(this);
        this._onContinue = this._onContinue.bind(this);
        this._checkQuestion = this._checkQuestion.bind(this);
        this._onListenieces = this._onListenieces.bind(this);
        this._onSamplerecording = this._onSamplerecording.bind(this);
        this._onListtionagain = this._onListtionagain.bind(this);

        MyData.isCanExit = false
    }

    async componentDidMount() {
        await this.checkPermission();
        let response = {};
        response['data'] = this.props.dataContent;
        let data = response.data;
        this._Datacontact(data);
        // this._postDataFirt(data);
        try{
        group_contents = response.data.data_question[a].list_option[0];
        this.setState({stateTitel: group_contents.group_content});
        this.setState({stateContent: group_contents.group_content});
        this.setState({data_ojb: response.data.data_question[a].list_option[0].match_option_text[0]});
        this.setState({dataQuestion: response.data.data_question});
        this.setState({lengthData: response.data.data_question.length});
        this.setState({DataOption_text: response.data.data_question[a].list_option[0].hint});
        this.setState({link: response.data.data_question[a].list_option[0].match_option_audio});
        this.setState({loading: false});
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
        deceleration = new Sound(this.state.link, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return false;
            } else {
                this.setState({whoose: deceleration});
            }
        });
        AudioRecord.init(recordSetting.optionRecord);
        this.saverPreData();
        LogBase.log("=====props",this.props)

        const _listener = (data) => {
            LogBase.log("=====onPressOut","kaka")
            if(this.state.Play_Sound){
                this.setState({playSound: false});
                this.state.Play_Sound.pause();
                this.state.Play_Sound.getCurrentTime((seconds) => this.setState({valueSlider: seconds}));
                clearInterval(timeOutValueSlider);
            }
        };
        EventBus.getInstance().addListener("sound_should_pause", _listener)

        return()=>{
            EventBus.getInstance().removeListener("sound_should_pause", _listener)
        }
    }

    async componentWillUnmount(){
        if(this.state.Play_Sound){
            this.state.Play_Sound.pause();
        }
    }

    saverPreData = () => {
        this.props.saveLogLearning([]);
    };

    saverData = (rs) => {
        let dataFake = [{
            question_id: this.state.dataQuestion[0].question_id,
            exercise_type: 'speaking',
            question_type: 3,
            resource_id: rs.file_id,
            question_score: 1,
            final_user_choice: '',
            detail_user_turn: [
                {
                    num_turn: '1',
                    score: 1,
                    user_choice: '',
                },
            ],
        }];
        if(rs){
            this.props.saveLogLearning(dataFake);
        }
        this.setState({
            Sensuccessfully: true,
            file_id: rs.file_id,
            showSen: false,
        });
    };
    
    checkPermission = async () => {
            if(Platform.OS == 'android'){
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
                console.log('You can use the Oudio');
            } else {
                console.log('Oudio permission denied');
            }
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
                    break;
                case RESULTS.LIMITED:
                    Alert.alert('Chú ý','Quyền thu âm bị hạn chế do đang có nhiều hơn 1 trình thu âm hoạt động')
                    break;
                case RESULTS.DENIED:
                    LogBase.log("=====recordPress 3",isCanRun)
                    request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
                        LogBase.log("=====result 3",result)
                        if(result == RESULTS.GRANTED){
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
    };

    startRecoder = () => {
        console.log("=====start reco 1")
        this.setState({
            countNumber: 1,
            valueSlider:0,
            imagemicro: 'pronunication_01_10',
            audioFile: '', 
            recording: true, 
            loaded: false,
            playSound:false,
        },()=>{
            AudioRecord.start();
        });
    }

    _onImage = async () => {
        console.log('press record',this.state)
        if (this.state.countNumber == 0 || this.state.countNumber == 2) {

            if(this.state.playSound&&this.state.Play_Sound){
                this.state.Play_Sound.pause();
                clearInterval(timeOutValueSlider);
                //this.state.Play_Sound.setCurrentTime(0);
            }

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
                        request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
                            LogBase.log("=====result 3",result)
                            if(result == RESULTS.GRANTED){
                                this.startRecoder()
                            }else{

                            }
                          });
                        break;
                    case RESULTS.BLOCKED:
                        this.setState({isShowPopup: true})
                        break;
                    }
                })
                .catch((error) => {
                    // …
                });
            }

        } else if (this.state.countNumber == 1) {
            try {
                if (!this.state.recording) {
                    return;
                }
                console.log("=====stop reco 1")
                this.setState({disiblemicro: true});
                let audio = await AudioRecord.stop();
                Sound.setCategory('Playback');
                await this._loadAudio(audio);
                this.setState({
                    countNumber: 2,
                    pausSound: false,
                    imagemicro: 'pronunication_01_09',
                    valueSlider:0,
                    audioFile: audio,
                    disiblemicro: false
                });
                RNFetchBlob.fs.readStream(
                    audio,
                    'base64',
                    4095)
                    .then((ifstream) => {
                        ifstream.open();
                        ifstream.onData((chunk) => {
                            database64 += chunk;
                        });
                        ifstream.onError((err) => {
                            console.log('oops', err);
                        });
                        ifstream.onEnd(() => {
                        });
                    });
            } catch (err) {
                console.warn('err', err);

            }
        }
    };

    _loadAudio = (audio) => {
        let newsound = new Sound(audio, '',
            (error) => {
                if (error) {
                    console.log('error load audio', error);
                } else {
                    newsound.setNumberOfLoops(0);
                    this.setState({duration: newsound.getDuration()});
                    this.setState({Play_Sound: newsound});
                    this.setState({playSound: false});
                }
            },
        );
    };

    load = () => {
        return new Promise((resolve, reject) => {
            if (!this.state.audioFile) {
                return reject('file path is empty');
            }
            this.sound = new Sound(this.state.audioFile, '', error => {
                if (error) {
                    return reject(error);
                }
                this.setState({loaded: true});
                return resolve();
            });
        });
    };

    _onlistenagain = async () => {
        LogBase.log("=====playSound",this.state.playSound)
        // LogBase.log("=====Play_Sound",this.state.Play_Sound)
        LogBase.log("=====valueSlider",this.state.valueSlider)
        // this.setState({playSound: !this.state.playSound});
        if (this.state.Play_Sound) {
            if (!this.state.playSound) {
                this.setState({playSound: true});
                LogBase.log("=====Play_Sound 1", "")
                if (this.state.valueSlider >= this.state.duration) {
                    this.setState({valueSlider: 0});
                    this.state.Play_Sound.setCurrentTime(0);
                }
                this.state.Play_Sound.play(success => {
                    if (success) {
                        console.log('successfully finished playing');
                        this.state.Play_Sound.setNumberOfLoops(0);
                        this.state.Play_Sound.stop();
                        this.setState({playSound: false});
                        clearInterval(timeOutValueSlider);
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
                let timeInterval = 50;
                timeOutValueSlider = setInterval(() => {
                    this.setState({valueSlider: this.state.valueSlider + 0.065});
                }, timeInterval);
            } else {
                LogBase.log("=====Play_Sound 2", "")
                this.setState({playSound: false});
                this.state.Play_Sound.pause();
                // this.state.Play_Sound.getCurrentTime((seconds) => this.setState({valueSlider: seconds}));
                clearInterval(timeOutValueSlider);
            }
        } else {
            this.setState({playSound: false});
        }
    };

    _onTranslet = () => {
        this.setState({btnTitel: !this.state.btnTitel});
        if (this.state.btnTitel == true) {
            this.setState({stateTitel: group_contents.group_content});
        } else {
            this.setState({stateTitel: group_contents.group_content_vi});
        }
    };
    _onValueChangeSlide = async (val) => {
        await this.setState({valueSlider: val});
        await this.state.Play_Sound.setCurrentTime(val);
        if (this.state.playSound) {
            this.state.Play_Sound.play();
        }
    };
    _onPause = () => {
        this.setState({pausSound: !this.state.pausSound});
        if (this.state.pausSound == true) {
            this.setState({imagemicro: 'pronunication_01_09'});
        } else {
            this.setState({imagemicro: 'pronunication_01_10'});
        }
    };

    _onSen = () => {
        if(this.state.Play_Sound){
            this.setState({playSound: false});
            this.state.Play_Sound.pause();
            this.state.Play_Sound.getCurrentTime((seconds) => this.setState({valueSlider: seconds}));
            clearInterval(timeOutValueSlider);
        }
        // this.setState({showSen: true});
        if (this.props.lesson_homework) {this._onSenposts()} else {
            setTimeout(() => {
                this._showSensuccessfully()
            }, 1000);
        }
    };
    _showtTeacher = () => {
        this.setState({Listteachers: !this.state.Listteachers});
    };

    _onCancel = () => {
        this.setState({showSen: false});
    };

    _showSensuccessfully = () => {
        this.state.Play_Sound.pause();
        this.setState({countNumber: 0});
        this.setState({showSen: false});
        this.setState({Sensuccessfully: true});
        
        console.log('filename',this.state.audioFile)

        var bodysoti = [
            {name: 'question_type', data: '3'},
            {name: 'skill', data: 'speaking'},
            {name: 'title', data: this.state.stateContent},
            {name: 'lesson_id', data: this.props.lesson_id},
            {name: 'assign_to_id', data: this.state.teachers[0]?.user_id},
            {name: 'unit_id', data: this.props.dataLesson?.unit_id},
            {name: 'content_writing', data: 'Đây là nội dung bài nói'},
            {name: 'class_id', data: this.props.dataLesson?.class_id},
            {
                name: 'file',
                filename: `speaking3_${Date.now()}.wav`,
                data: RNFetchBlob.wrap(this.state.audioFile),
            },
        ]
        console.log("=====body:",bodysoti)
        apiBase
        .uploadFile(api.baseurl + 'student/api_student_lesson/assign_lesson', bodysoti).then(resp=>{
            console.log('=====resSpeaking ', resp);
            let dataFake = [{
                question_id: this.state.dataQuestion[0].question_id,
                exercise_type: 'speaking',
                question_type: 3,
                // resource_id: rs.file_id,
                question_score: 1,
                final_user_choice: '',
                detail_user_turn: [
                    {
                        num_turn: '1',
                        score: 1,
                        user_choice: '',
                    },
                ],
            }];
            this.props.saveLogLearning(dataFake);
        }).catch(e=>{
            console.log('err: ', e);
        })
    };
    _onContinue = () => {
        this.state.Play_Sound.pause();
        MyData.isCanExit = true
        this.setState({
            showSen: false,
            Sensuccessfully: false,
            Samplepost: false,
            countNumber: 0,
        });
    };
    _onListenieces = () => {
        if (this.state.whoose) {
            this.setState({whoose: this.state.whoose.stop(() => this.state.whoose.setSpeed(1))});
        }
    };
    _checkQuestion = async () => {
        // this._onSenpostsScore();
        console.log("=====_checkQuestion")
        //await this.saverData();
        this.props.go_back.goBack();
    };
    _onSamplerecording = async () => {
        this.setState({StatusRecording: !this.state.StatusRecording, whoose: this.state.whoose.stop()});
        if (this.state.samplerecording == true) {
            console.log("=====start reco 2")
            AudioRecord.start();
            this.setState({samplerecording: false});
        } else {
            this.setState({samplerecording: true});
            if (!this.state.recording) {
                return;
            }
            try {
                console.log("=====stop reco 2")
                let audio = await AudioRecord.stop();
                this.setState({audioFile: audio});
                this.setState({StatusRecording: !this.state.StatusRecording});
                RNFetchBlob.fs.readStream(
                    audio,
                    'base64',
                    4095)
                    .then((ifstream) => {
                        ifstream.open();
                        ifstream.onData((chunk) => {
                            dataSenadio += chunk;
                        });
                        ifstream.onError((err) => {
                            console.log('oops', err);
                        });
                        ifstream.onEnd(() => {
                        });
                    });
            } catch (err) {
                console.warn('err', err);

            }
        }
    };
    _onListtionagain = async () => {
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
    _onSenpostsScore = async () => {
        let dataFake = [{
            question_id: this.state.dataQuestion[0].question_id,
            exercise_type: 'speaking',
            question_type: this.state.questionType,
            question_score: 0,
            final_user_choice: 'speaking',
            detail_user_turn: [
                {
                    num_turn: '1',
                    score: 0,
                    user_choice: 'speaking',
                },
            ],
        }];
        const body = {
            data_exercise: JSON.stringify({}),
            user_choice: JSON.stringify(dataFake),
            exercise_id: this.props.user_received_id,
            resource_id: this.state.file_id,
            exercise_type: 'speaking',
            duration: '100',
        };
        const header = {
            'Content-Type': 'application/json',
            jwt_token: this.props.data_login.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        const url = API.baseurl+'student/api_homework/save_homework';
        try {
            const res = await axios({method: 'post', headers: header, url, data: body});
            console.log('res.data11', res.data);
        } catch (e) {
            console.log('e', e.response.data);
        }
    };

    _onSenposts = async () => {
        this.state.Play_Sound.pause();
        let dataLogin = this.props.data_login;
        let nameAu = `record${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.mp3`;
        RNFetchBlob.fetch('POST', URL.baseurl + URL.uploadResource, {
            'Content-Type': 'application/x-www-form-urlencoded',
            jwt_token: dataLogin.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        }, [
            {name: 'file', filename: nameAu, data: RNFetchBlob.wrap(this.state.audioFile)},
            {name: 'title', data: this.state.stateContent},
            {name: 'class_id', data: this.props.dataLesson?.class_id},
        ]).then((resp) => {
            let rs = JSON.parse(resp.data);
            LogBase.log('Gửi bài viết: ', rs);
            if(rs.status){
                this.saverData(rs)
            }
        }).catch((err) => {
            console.log('err: ', err);
        });
    };
    _Datacontact = async (data) => {
        let dataTeacher = [];
        let dataLogin = this.props.data_login;
        const url = URL.baseurl + URL.list_contact +  dataLogin.role+ '&class_id=' + this.props.dataLesson?.class_id
        LogBase.log('=====API:',url)
        const header = {
            'Content-Type': 'application/json',
            jwt_token: dataLogin.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const res = await axios({method: 'get', url: url, headers: header});
            LogBase.log('=====res',res.data)
            if (res.data.status && res.data.data_contact.length>0) {
                dataTeacher.push(res.data.data_contact[0].username);
                this.setState({data_Teacher: dataTeacher,teachers:res.data.data_contact});
            }
        } catch (error) {
            this.setState({loading: false});
            console.log(error.message);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
    };

    _OnTextChange(stateContent) {
        this.setState({stateContent: stateContent});
    }

    _renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showSen}
            >
                <View style={{
                    height: height,
                    width: width,
                    zIndex: 1234,
                    backgroundColor: '#0000009C',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: '90%',
                        backgroundColor: '#f6f6f6',
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        justifyContent: 'center',
                        padding: SmartScreenBase.smPercenWidth * 5,
                        marginBottom:SmartScreenBase.smPercenWidth * 10,
                    }}>
                        <Text style={{fontWeight: 'bold', fontSize: SmartScreenBase.smFontSize * 50}}>
                            Tiêu đề:
                        </Text>
                        <View style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: SmartScreenBase.smPercenHeight,
                            zIndex:9
                        }}>
                            <TextInput
                                onChangeText={(stateContent) => {
                                    this._OnTextChange(stateContent);
                                }}
                                value={this.state.stateContent}
                                multiline={true}
                                placeholder={this.state.stateTitel||'Nhập tiêu đề ...'}
                                style={{
                                    width: '100%',
                                    borderRadius: SmartScreenBase.smPercenWidth * 2,
                                    borderColor: '#D8D8D8',
                                    borderWidth: 1,
                                    height: SmartScreenBase.smPercenHeight * 5,
                                    paddingLeft: SmartScreenBase.smPercenWidth * 2,
                                    fontSize: SmartScreenBase.smFontSize * 45,
                                }}
                            />
                        </View>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: SmartScreenBase.smFontSize * 50,
                            marginTop: SmartScreenBase.smPercenHeight,
                        }}>
                            Gửi cho:
                        </Text>
                        <View style={{
                            width: '100%',
                            height: SmartScreenBase.smPercenHeight * 4,
                            justifyContent: 'center',
                            marginTop: SmartScreenBase.smPercenHeight,
                            alignItems: 'center',
                        }}>
                            <Picker
                                selectedValue={this.state.nameTeacher}
                                style={{width: Platform.OS === 'ios' ? '105%' : '100%'}}
                                onValueChange={(itemValue, itemIndex) => this.setState({nameTeacher: itemValue})}
                            >
                                {
                                    this.state.data_Teacher.map(item => {
                                        return <Picker.Item label={item} value={item}/>;
                                    })
                                }
                            </Picker>
                        </View>
                        <View style={{
                            marginTop: smartScreen * 4,
                            width: '100%',
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                width: '50%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <TouchableOpacity onPress={this._onCancel} style={{
                                    width: SmartScreenBase.smPercenWidth * 27,
                                    height: smartScreen * 4,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    backgroundColor: '#F08B01',
                                }}>
                                    <Text style={{color: '#fff'}}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: '50%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <TouchableOpacity
                                    onPress={this.props.lesson_homework ? this._onSenposts : this._showSensuccessfully}
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 27,
                                        height: smartScreen * 4,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        backgroundColor: '#F08B01',
                                    }}>
                                    <Text style={{color: '#fff'}}>Gửi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    _renderModalSend = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.Sensuccessfully}
            >
                <View style={{
                    height: height,
                    width: width,
                    backgroundColor: '#0000009C',
                    zIndex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={{uri: 'lesson_speaking_image3'}}
                           style={StyleLesson.Sty_ImageTyle_sen}
                    />
                    <Text style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontFamily: FontBase.MyriadPro_Regular,
                        fontSize: SmartScreenBase.smFontSize * 65,
                        top: SmartScreenBase.smPercenHeight * 3,
                    }}>{"Đã gửi cho giáo viên\nBạn chờ kết quả chấm nhé!"}</Text>
                    <TouchableOpacity onPress={this._onContinue} style={{
                        ...styleButton.Sty_Button,
                        marginTop: SmartScreenBase.smPercenHeight * 10,
                    }}>
                        <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                {this._renderModal()}
                {this._renderModalSend()}
                {
                    this.state.loading === false ?
                        <View style={{flex: 1}}>
                            {
                                this.state.Samplepost == true ?
                                    <View style={{zIndex:99}}>
                                        <View style={{
                                            marginTop: SmartScreenBase.smPercenHeight * 5,
                                            marginLeft: SmartScreenBase.smPercenWidth * 6,
                                            width: SmartScreenBase.smPercenWidth * 85,
                                            height: smartScreen * 20,
                                            paddingHorizontal: 20,
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: 20,
                                            paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                                        }}>
                                            <ScrollView persistentScrollbar={true}>
                                                <TextDownLine textBody={this.state.DataOption_text}/>
                                                {/* <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: SmartScreenBase.smPercenWidth * 4,
                                                    marginLeft: SmartScreenBase.smPercenWidth,
                                                    color: '#000',
                                                }}>
                                                    {this.state.DataOption_text}
                                                </Text> */}
                                            </ScrollView>

                                        </View>
                                        <View style={StyleLesson.micro}>
                                            <View>
                                                <TouchableOpacity onPress={this._onImage}
                                                                  disabled={this.state.disiblemicro}>
                                                    <ImageBackground source={{uri: this.state.imagemicro}} style={StyleLesson.Sty_ImageTyle_1_2_1}>
                                                        {this.state.disiblemicro && <ActivityIndicator style={{marginTop: SmartScreenBase.smPercenHeight*4.5}} size="large" color="#999999"/>}
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    <View style={{
                                        flex: 1, 
                                        alignItems: 'center',
                                        width: SmartScreenBase.smPercenWidth * 85,
                                    }}>
                                        <View style={{
                                            height: smartScreen * 50,
                                            backgroundColor: '#fff',
                                            top: smartScreen * 3,
                                            borderRadius: 20,
                                            paddingVertical: 20,
                                            marginBottom: smartScreen * 5,
                                        }}>
                                            <ScrollView persistentScrollbar={true} style={{paddingHorizontal: 20,flex:1}}>
                                                <Text style={{
                                                    marginBottom: 10,
                                                    fontSize: SmartScreenBase.smFontSize * 45,
                                                }}>
                                                    {this.state.data_ojb}
                                                </Text>
                                            </ScrollView>
                                        </View>
                                        {/* <View style={{
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity onPress={this._onListenieces}
                                                              disabled={!this.state.StatusRecording}>
                                                <Image source={{uri: 'lesson_speaking_image5'}}
                                                       style={StyleLesson.Sty_ImageTyledd1D3}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this._onSamplerecording}>
                                                <Image source={{uri: 'lesson_speaking_image4'}}
                                                       style={StyleLesson.Sty_ImageTyledd2D3}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this._onListtionagain}>
                                                <Image source={{uri: 'onlisten_again1'}}
                                                       style={StyleLesson.Sty_ImageTyledd1D3}/>
                                            </TouchableOpacity>
                                        </View> */}
                                        <View style={{
                                            width: width,
                                            position: 'absolute',
                                            bottom: smartScreen,
                                            paddingHorizontal: smartScreen * 2,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity
                                                style={styleButton.Sty_Button}
                                                onPress={this._checkQuestion}
                                            >
                                                <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                            }
                            <View>
                                {
                                    this.state.countNumber >= 2 ?
                                        <View style={StyleLesson.micro2}>
                                            <TouchableOpacity onPress={() => this._onlistenagain()}>
                                                <Image source={{uri: 'pronunication_01_05'}}
                                                       style={StyleLesson.Sty_ImageTyle_1_1_2}
                                                />
                                            </TouchableOpacity>

                                            <View style={{
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>
                                                <Slider
                                                    style={{
                                                        width: width - (smartScreen * 10),
                                                        marginLeft: smartScreen / 2,
                                                    }}
                                                    minimumValue={0}
                                                    maximumValue={this.state.duration}
                                                    minimumTrackTintColor="#FFFFFF"
                                                    maximumTrackTintColor="#FFFFFF"
                                                    thumbTintColor="#FFFFFF"
                                                    value={this.state.valueSlider}
                                                    onValueChange={val => this._onValueChangeSlide(val)}
                                                />
                                            </View>
                                        </View>
                                        :
                                        null
                                }
                            </View>
                        </View>
                        :
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                            <View>
                                <Text style={{color: '#fff'}}>
                                    Vui lòng chờ trong giây lát...
                                </Text>
                            </View>
                        </View>
                }
                <View style={{
                    alignItems: 'center',
                    bottom: SmartScreenBase.smPercenHeight * 3,
                    height: SmartScreenBase.smPercenHeight * 10,
                    justifyContent: 'center',
                }}>
                    {
                        this.state.countNumber >= 2 ? (
                                <View style={{
                                    width: width,
                                    paddingHorizontal: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={this.props.isTeacher ? this._onContinue : this._onSen}
                                        style={styleButton.Sty_Button}
                                    >
                                        <Text style={styleButton.Sty_Text_Button}>
                                            {this.props.isTeacher ? "XEM BÀI MẪU" : "GỬI"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                            :
                            null
                    }
                </View>
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

export default connect(mapStateToProps)(SpeakingD3);
