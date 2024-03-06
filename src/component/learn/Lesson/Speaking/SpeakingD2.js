import React, {Component} from 'react';
import {
    Text,
    View,
    PermissionsAndroid,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
    ImageBackground,
    ActivityIndicator,
    ScrollView, Dimensions,
} from 'react-native';
import StyleLesson from '../Speaking/stylespeakingD3/StyleLesson';
import styleButton from '../../../../../src/styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import stylesApp from '../Speaking/stylespeakingD3/stylesApp';
import axios from 'axios';
import AudioRecord from 'react-native-audio-record';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import {connect} from 'react-redux';
import {speakinggirl1_01, speakinggirl1_02} from '../../../../../assets/gif';
import API from '../../../../API/APIConstant';
import recordSetting from '../../../../utils/recordSetting';
const {width, height} = Dimensions.get('window');

let dataNew = [];
let DataObject1 = new Object();
let DataObject2 = new Object();
let options = {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6,
    wavFile: 'tests.wav',
};
let audioFiles;
var obj = {};
let a = 0;
var dataRadio = {};
let chunk = '';
let audio = '';

class SpeakingD2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refresh: false,
            checkResuilt: null,
            Resuilt: 0,
            ShowCheck: 0,
            ShowResuilt: false,
            showClien: false,
            idText: 0,
            idExam: 0,
            sound: '',
            idmap: [0],
            checkShowClient: [],
            txtEn: '',
            txtVi: '',
            translet: true,
            loadding: true,
            imgRecording: true,
            clikRadio: 0,
            loaded: false,
            checkstarD2: false,
            ImageStar1: 'saotrang',
            ImageStar2: 'saotrang',
            ImageStar3: 'saotrang',
            resultScreen: true,
            dataQuestion: [],
            statetime: true,
            clikRadiopepeat: 0,
            imageteacher: speakinggirl1_02,
            playRadio: false,
            whose: null,
            reEcord: false,
            audioReecore: '',
        };
        this._onplayRadiostarus = this._onplayRadiostarus.bind(this);
        this._onRepeat = this._onRepeat.bind(this);
        this._onlistenagain = this._onlistenagain.bind(this);
        this._onNextdataQuettion = this._onNextdataQuettion.bind(this);
    }

    async componentDidMount() {
        await this.checkPermission();
        let arr;
        dataNew = [];
        let response = {};
        response['data'] = this.props.dataContent;
        console.log('response',response)
        let data = response.data;
        this.setState({loadding: false});
        // this._postDataFirt(data);
        for (let i = 0; i < response.data.data_question.length; i += 1) {
            this.setState({txtEn: response.data.data_question[i].list_option[0].group_content});
            this.setState({txtVi: response.data.data_question[i].list_option[0].group_content_vi});
            this.setState({dataQuestion: response.data.data_question});

            DataObject2 = new Object();
            arr = [];
            for (let j = 0; j < JSON.parse(response.data.data_question[i].list_option[0].option_text).length; j++) {
                DataObject1 = new Object();
                DataObject1.Boss = JSON.parse(response.data.data_question[i].list_option[0].option_text)[j];
                DataObject1.client = JSON.parse(response.data.data_question[i].list_option[0].match_option_text)[j];
                arr.push(DataObject1);
                this.state.checkShowClient.push(false);
            }
            DataObject2.id = i;
            DataObject2.data = arr;
            dataNew.push(DataObject2);
        }
        this.setState({data: dataNew});
        this.setState({sound: 'https://setest.gkcorp.com.vn' + dataNew[this.state.idExam].data[0].Boss.audio});
        this.play(API.domain + dataNew[this.state.idExam].data[0].Boss.audio);
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
        AudioRecord.init(recordSetting.optionRecord);
        this.props.saveLogLearning([]);
    }

    saverData = () => {
        let dataFake = [{
            question_id: 1,
            exercise_type: 'speaking',
            question_type: 2,
            question_score: 0,
            final_user_choice: this.state.data_ojb,
            detail_user_turn: [
                {
                    num_turn: '1',
                    score: 0,
                    user_choice: 'tivi',
                },
            ],
        }];
        this.props.saveLogLearning(dataFake);
    };

    _onNextdataQuettion = () => {
        if (this.state.idExam < this.state.dataQuestion.length - 1) {
            this.props.setIndexQuestion(this.state.idExam + 1);
            this.setState({idExam: this.state.idExam + 1});
            this.setState({resultScreen: true});
            this.setState({idText: 0});
            this.setState({checkShowClient: []});
            this.setState({idmap: [0]});
            a = a + 1;
            this.setState({imgRecording: true});
            this.setState({data: dataNew});
            this.setState({sound: 'https://setest.gkcorp.com.vn' + dataNew[this.state.idExam].data[0].Boss.audio});
            this.play(API.domain + dataNew[this.state.idExam].data[0].Boss.audio);
        } else {
            this.saverData();
        }
    };

    render() {
        let ar = this.state.data[0];
        return (
            <View style={{flex: 1}}>
                <View style={{justifyContent: 'space-between', flex: 1}}>
                    {
                        this.state.loadding == false ?
                            <View style={{flex: 1}}>
                                {
                                    this.state.resultScreen == true ?
                                        <View style={{
                                            width: SmartScreenBase.smPercenWidth * 100,
                                            alignSelf: 'center',
                                            alignItems: 'center',
                                            marginTop: SmartScreenBase.smPercenHeight * 2,
                                            flex: 1,
                                        }}>
                                            <View style={{top: 1}}>
                                                <ImageBackground source={this.state.imageteacher}
                                                                 imageStyle={{borderRadius: 10}}
                                                                 resizeMode="contain"
                                                                 style={{
                                                                     width: SmartScreenBase.smBaseWidth * 890,
                                                                     height: SmartScreenBase.smPercenHeight * 25,

                                                                 }}>
                                                    {
                                                        this.state.checkstarD2 == true && this.state.statetime == true ?
                                                            <View style={{
                                                                height: SmartScreenBase.smPercenHeight * 4,
                                                                justifyContent: 'center',
                                                                flexDirection: 'row',
                                                                top: SmartScreenBase.smPercenHeight * 18,
                                                            }}>
                                                                <Image source={{uri: this.state.ImageStar1}}
                                                                       style={StyleLesson.Sty_ImageTyle_2starD2}/>
                                                                <Image source={{uri: this.state.ImageStar2}}
                                                                       style={StyleLesson.Sty_ImageTyle_2starD2}/>
                                                                <Image source={{uri: this.state.ImageStar3}}
                                                                       style={StyleLesson.Sty_ImageTyle_2starD2}/>
                                                            </View>
                                                            :
                                                            null
                                                    }
                                                </ImageBackground>
                                            </View>
                                            <View style={{
                                                marginHorizontal: SmartScreenBase.smPercenWidth * 5,
                                                top: SmartScreenBase.smPercenHeight * 5,
                                                height: SmartScreenBase.smPercenHeight * 40,
                                            }}>
                                                <FlatList
                                                    data={this.state.data}
                                                    keyExtractor={(item, index) => 'item' + index}
                                                    renderItem={this._Render_Item}
                                                    showsVerticalScrollIndicator={false}
                                                />
                                            </View>

                                        </View>
                                        :
                                        <View>
                                            <View style={{
                                                marginTop: SmartScreenBase.smPercenHeight * 5,
                                                height: SmartScreenBase.smPercenHeight * 60,
                                                marginHorizontal: SmartScreenBase.smPercenWidth * 5,
                                            }}>
                                                <FlatList
                                                    data={this.state.data}
                                                    keyExtractor={(item, index) => 'item' + index}
                                                    renderItem={this._Render_Itemresul}
                                                    showsVerticalScrollIndicator={false}
                                                />
                                            </View>
                                            <View style={{
                                                width:'100%',
                                                height: SmartScreenBase.smPercenHeight * 5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <TouchableOpacity onPress={this._onNextdataQuettion} style={styleButton.Sty_Button}>
                                                        <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                }
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
                </View>
            </View>
        );
    }

    play = async (link) => {
        console.log('link', link);
        this.setState({imageteacher: speakinggirl1_01});
        if (this.sound) {
            this.sound.play(this.playComplete);
            this.setState({playState: 'playing'});
        } else {
            this.sound = new Sound(
                link,
                null,
                error => {
                    if (error) {
                        console.log('failed to load the sound', error);
                        this.setState({playState: 'paused'});
                    } else {
                        this.setState({
                            playState: 'playing',
                            duration: this.sound.getDuration(),
                        });
                        this.sound.play(this.playComplete);
                    }
                },
            );
        }
    };
    play1 = async (link) => {
        this.setState({imageteacher: speakinggirl1_01});
        this.sound = new Sound(
            link,
            null,
            error => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({playState: 'paused'});
                } else {
                    this.setState({
                        playState: 'playing',
                        duration: this.sound.getDuration(),
                    });
                    this.sound.play(this.playComplete);
                }
            },
        );
    };
    playComplete = success => {
        if (this.sound) {
            if (success) {
                this.setState({imageteacher: speakinggirl1_02});
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            this.state.checkShowClient[this.state.idText] = true;
            this.setState({playState: 'paused', playSeconds: 0});
            this.sound.setCurrentTime(0);
            this.setState({showClien: true});
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
            }, 10);
        }
    };

    _onplayRadiostarus = (item, index) => {
        console.log('123445',item.data[index].Boss.audio)
        const soundN = API.domain + item.data[index].Boss.audio;
        console.log('file am thanh', soundN);
        let deceleration = new Sound(soundN, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return false;
            } else {
                deceleration.stop(() => deceleration.play());
            }
        });
    };

    _onRepeat = async () => {
        this.setState({reEcord: !this.state.reEcord});
        if (this.state.reEcord) {
            console.log('bat thu am');
            AudioRecord.start();
        } else {
            console.log('tat thu am');
            let Reecore = await AudioRecord.stop();
            this.setState({audioReecore: Reecore});
        }
    };
    _onlistenagain = async (item, index) => {
        let newSound = new Sound(this.state.audioReecore, '', error => {
            if (error) {
                console.log('failed to load the file', error);
            } else {
                newSound.play();
                console.log('Tai nghe', this.state.audioFile);
            }
        });

    };

    _onplayRadio = async () => {
        if (this.state.clikRadio == 0) {
            audio = '';
            this.setState({clikRadio: this.state.clikRadio + 1});
            this.setState({imgRecording: !this.state.imgRecording});
            this.setState({audioFile: '', recording: true, loaded: false});
            AudioRecord.start();
        } else if (this.state.clikRadio == 1) {
            this.setState({clikRadio: this.state.clikRadio + 1});
            this.setState({imgRecording: !this.state.imgRecording});
            if (!this.state.recording) {
                return;
            }
            try {
                audio = await AudioRecord.stop();
                this.setState({audioFile: audio});
                let data = '';
                RNFetchBlob.fs.readStream(
                    audio,
                    'base64',
                    4095)
                    .then((ifstream) => {
                        ifstream.open();
                        ifstream.onData((chunk) => {
                            data += chunk;
                        });
                        ifstream.onError((err) => {
                            console.log('oops', err);
                        });
                        ifstream.onEnd(() => {
                        });
                    });
                let date = new Date();
                let nameAudioD2 = `record${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.mp3`;
                RNFetchBlob.fetch('POST', API.baseurl+'student/api_student_lesson/compare_recording_file', {
                    'Content-Type': 'multipart/form-data',
                    'jwt_token':
                        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
                    'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
                    Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
                }, [
                    {name: 'file', filename: nameAudioD2, data: data},
                    {name: 'text_compare', data: '123'},
                ]).then((resp) => {
                    let Dataresp = JSON.parse(resp.data);
                    if (Dataresp.data.overall_score == 100) {
                        this.setState({checkstarD2: true});
                        this.setState({ImageStar1: 'saovang'});
                        this.setState({ImageStar2: 'saovang'});
                        this.setState({ImageStar3: 'saovang'});
                    } else if ((75 <= Dataresp.data.overall_score) && (Dataresp.data.overall_score < 100)) {
                        this.setState({checkstarD2: true});
                        this.setState({ImageStar1: 'saovang'});
                        this.setState({ImageStar2: 'saovang'});
                    } else if ((35 <= Dataresp.data.overall_scoreresp) && (Dataresp.data.overall_score < 75)) {
                        this.setState({checkstarD2: true});
                        this.setState({ImageStar1: 'saovang'});
                    } else {
                        this.setState({checkstarD2: true});
                    }
                }).catch((err) => {
                    console.log('err: ', err);
                });
            } catch (err) {
                console.warn('err', err);
            }
            setTimeout(() => {
                this.setState({statetime: false});
                this.setState({checkstarD2: false});
                if (this.state.idText < 1) {
                    this.state.idmap.push(1);
                    this.setState({clikRadio: 0});
                    this.setState({idText: this.state.idText + 1});
                    this.setState({showClien: false});
                    this.play1(API.domain + this.state.data[this.state.idExam].data[this.state.idText].Boss.audio);
                    this.setState({checkstarD2: false});
                    this.setState({statetime: true});
                } else {
                    this.setState({checkstarD2: true});
                    this.setState({resultScreen: false});
                }
                this.setState({clikRadio: 0});
            }, 2000);

        }
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
                console.log('You can use the Oudio');
            } else {
                console.log('Oudio permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    load = () => {
        return new Promise((resolve, reject) => {
            if (!this.state.audioFile) {
                return reject('file path is empty');
            }
            this.sound = new Sound(this.state.audioFile, '', error => {
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

    _Render_Item = ({item}) => {
        return (
            <View>
                {
                    this.state.idmap.map((icon, index) => {
                        return (
                            <View>
                                {
                                    item.id === this.state.idExam ?
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: SmartScreenBase.smPercenHeight * 2,
                                            justifyContent: 'flex-start',
                                            width: '100%',
                                        }}>
                                            <View style={[StyleLesson.Sty_View_Border, {
                                                backgroundColor: 'rgba(0,0,0,0.7)',
                                                width: '80%',
                                                marginTop: 0,
                                            }]}>
                                                <Text style={{color: '#fff'}}>{item.data[index].Boss.text}</Text>
                                            </View>
                                        </View>
                                        : null
                                }
                                {
                                    this.state.checkShowClient[index] == true ?
                                        item.id === this.state.idExam ?
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: SmartScreenBase.smPercenHeight * 2,
                                                justifyContent: 'flex-end',
                                                width: '100%',
                                            }}>
                                                {
                                                    this.state.idmap.length - 1 == index ?
                                                        <TouchableOpacity
                                                            onPress={this._onplayRadio}
                                                            style={{
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                zIndex: 2,
                                                            }}>
                                                            {
                                                                this.state.imgRecording ?
                                                                    <Image source={{uri: 'lesson_vocab_image12'}}
                                                                           style={{
                                                                               width: SmartScreenBase.smPercenWidth * 18,
                                                                               height: SmartScreenBase.smPercenWidth * 18,
                                                                               resizeMode: 'contain',
                                                                           }}
                                                                    />
                                                                    :
                                                                    <Image source={{uri: 'pronunication_01_10'}}
                                                                           style={{
                                                                               width: SmartScreenBase.smPercenWidth * 18,
                                                                               height: SmartScreenBase.smPercenWidth * 18,
                                                                               resizeMode: 'contain',
                                                                           }}
                                                                    />
                                                            }

                                                        </TouchableOpacity>
                                                        :
                                                        null
                                                }
                                                <View style={[StyleLesson.Sty_View_Border, {
                                                    backgroundColor: '#fff',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: '50%',
                                                    marginTop: 0,
                                                }]}>
                                                    <Text style={{
                                                        fontWeight: '400',
                                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                                        color: 'black',
                                                    }}>
                                                        {item.data[index].client.text}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    alignItems: 'center',
                                                    width: SmartScreenBase.smPercenWidth * 18,
                                                    justifyContent: 'center',
                                                }}>
                                                    <Image source={{uri: 'lesson_speaking_image6'}}
                                                           style={{
                                                               width: SmartScreenBase.smPercenWidth * 12,
                                                               height: SmartScreenBase.smPercenWidth * 12,
                                                               top: -SmartScreenBase.smPercenWidth * 3,
                                                               resizeMode: 'contain',
                                                           }}
                                                    />
                                                </View>
                                            </View>
                                            : null
                                        : null
                                }
                            </View>
                        );
                    })
                }
            </View>

        );

    };

    _Render_Itemresul = ({item}) => {
        return (
            <View>
                {
                    this.state.idmap.map((icon, index) => {
                        return (
                            <View>
                                {
                                    item.id === this.state.idExam ?
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: SmartScreenBase.smPercenHeight * 2,
                                            justifyContent: 'flex-start',
                                            width: '100%',
                                        }}>
                                            <View style={{
                                                alignItems: 'center',
                                                width: SmartScreenBase.smPercenWidth * 12,
                                                justifyContent: 'center',
                                            }}>
                                                <Image source={{uri: 'lesson_speaking_image6'}}
                                                       style={{
                                                           top: -SmartScreenBase.smPercenWidth * 3,
                                                           width: SmartScreenBase.smPercenWidth * 10,
                                                           height: SmartScreenBase.smPercenWidth * 10,
                                                           resizeMode: 'contain',
                                                       }}
                                                />
                                            </View>
                                            <View style={[StyleLesson.Sty_View_Border, {
                                                backgroundColor: 'rgba(0,0,0,0.7)',
                                                width: '70%',
                                                marginTop: 0,
                                            }]}>
                                                <Text style={{color: '#fff'}}>{item.data[index].Boss.text}</Text>
                                            </View>
                                        </View>
                                        : null
                                }
                                {
                                    this.state.checkShowClient[index] == true ?
                                        item.id === this.state.idExam ?
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: SmartScreenBase.smPercenHeight * 2,
                                                justifyContent: 'flex-end',
                                                width: '100%',
                                            }}>
                                                <View style={[StyleLesson.Sty_View_Border, {
                                                    backgroundColor: '#fff',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: '70%',
                                                    marginTop: 0,
                                                }]}>
                                                    <Text style={stylesApp.txt}>
                                                        {item.data[index].client.text}
                                                    </Text>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        width: '90%',
                                                        justifyContent: 'center',
                                                        marginVertical: SmartScreenBase.smPercenWidth * 1.5,
                                                    }}>
                                                        <View style={{
                                                            width: SmartScreenBase.smPercenWidth * 10,
                                                            height: SmartScreenBase.smPercenWidth * 10,
                                                            backgroundColor: '#0B243B80',
                                                            borderRadius: SmartScreenBase.smPercenWidth * 10 / 2,
                                                        }}>
                                                            <TouchableOpacity
                                                                onPress={() => this._onplayRadiostarus(item, index)}>
                                                                <Image source={{uri: 'speaking1_03'}}
                                                                       style={{
                                                                           width: SmartScreenBase.smPercenWidth * 10,
                                                                           height: SmartScreenBase.smPercenWidth * 10,
                                                                           resizeMode: 'contain',
                                                                       }}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{
                                                            width: SmartScreenBase.smPercenWidth * 10,
                                                            height: SmartScreenBase.smPercenWidth * 10,
                                                            backgroundColor: '#0B243B',
                                                            borderRadius: SmartScreenBase.smPercenWidth * 10 / 2,
                                                            marginHorizontal: SmartScreenBase.smPercenWidth * 5,
                                                        }}>
                                                            <TouchableOpacity onPress={this._onRepeat}>
                                                                <Image source={{uri: 'speaking1_05'}}
                                                                       style={{
                                                                           width: SmartScreenBase.smPercenWidth * 10,
                                                                           height: SmartScreenBase.smPercenWidth * 10,

                                                                           resizeMode: 'contain',
                                                                       }}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{
                                                            width: SmartScreenBase.smPercenWidth * 10,
                                                            height: SmartScreenBase.smPercenWidth * 10,
                                                            backgroundColor: '#0B243B80',
                                                            borderRadius: SmartScreenBase.smPercenWidth * 10 / 2,
                                                        }}>
                                                            <TouchableOpacity onPress={this._onlistenagain}>
                                                                <Image source={{uri: 'onlisten_again1'}}
                                                                       style={{
                                                                           width: SmartScreenBase.smPercenWidth * 10,
                                                                           height: SmartScreenBase.smPercenWidth * 10,
                                                                           resizeMode: 'contain',
                                                                       }}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    alignItems: 'center',
                                                    width: SmartScreenBase.smPercenWidth * 20,
                                                    justifyContent: 'center',
                                                }}>
                                                    <Image source={{uri: 'lesson_speaking_image6'}}
                                                           style={{
                                                               width: SmartScreenBase.smPercenWidth * 10,
                                                               height: SmartScreenBase.smPercenWidth * 10,
                                                               top: -SmartScreenBase.smPercenWidth * 4,
                                                               resizeMode: 'contain',
                                                           }}
                                                    />
                                                    <View style={{flexDirection: 'row'}}>
                                                        <Image source={{uri: this.state.ImageStar1}}
                                                               style={StyleLesson.Sty_statustarD2}/>
                                                        <Image source={{uri: this.state.ImageStar2}}
                                                               style={[StyleLesson.Sty_statustarD2, {marginHorizontal: SmartScreenBase.smPercenWidth * 2}]}/>
                                                        <Image source={{uri: this.state.ImageStar3}}
                                                               style={StyleLesson.Sty_statustarD2}/>
                                                    </View>
                                                </View>
                                            </View>
                                            : null
                                        : null
                                }
                            </View>
                        );
                    })
                }
            </View>

        );

    };
}

function mapStateToProps(state) {
    return {
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(SpeakingD2);
