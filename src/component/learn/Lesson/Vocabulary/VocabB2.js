import React, { Component } from "react";
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    PermissionsAndroid,
    Alert,
    Animated
} from "react-native";
import TypeExercise from "../Component/TypeExercise";
import SmartScreenBase from "../../../base/SmartScreenBase";
import ButtonCheck from "../../../items/ButtonCheck";
import axios from 'axios';
import FileSound3 from "../FileSound3";
import { Buffer } from 'buffer';
import { connect } from 'react-redux'
const { width, height } = Dimensions.get('window');
let Sound = require('react-native-sound');
import AudioRecord from 'react-native-audio-record';
import Video from 'react-native-video';
import API from "../../../../API/APIConstant";
import APIBase from "../../../../base/APIBase";
import recordSetting from "../../../../utils/recordSetting";
var RNFetchBlob = require('rn-fetch-blob').default

AudioRecord.init(recordSetting.optionRecord);

// let Audio;
let record;
let audioFile;
let chunk;
// let Base64;
class VocabB2Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkResuilt: null,
            checkMicro: false,
            check: false,
            Resuilt: -1,
            showCheck: false,
            dataQuestion: [],
            Loading: false,
            record: 'record',
            TextButton: 'kiểm tra',
            numberAgain: 0,
            disabled: false,
            spell: false,
            disabledRecord: true,
            title: 'Click on microphone and read',
            status: '',
            animatedValue: new Animated.Value(0),
            playAgain: true,
            playQuestion: true
        }
    }
    componentDidMount = async () => {
        await this._getPermisson()
        await this._getData();
    };
    _getPermisson = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === await PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
    };

    _getData = async () => {
        try {
            const ressponse = await this.props.Vocab
            await this.setState({ data: ressponse.data })
            let data = await this.convertData(ressponse.data.data_question);
            await this.setState({
                dataQuestion: data,
                Loading: true,
            });
        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            };
        };
    };
    convertData = (data) => {
        let dataConvert = [];
        data.map((item, index) => {
            let dataQ = {};
            dataConvert[index] = dataQ;
            let imageQuestion = JSON.parse(item.image)[0];
            dataQ.image = imageQuestion;
            dataQ.audio = item.audio;
            dataQ.vocabulary = item.vocabulary;
            dataQ.spell = item.spell;
            dataQ.en_vi_sentence = item.vocabulary;
            dataQ.spell = item.spell;
        });
        return dataConvert[this.props.index];
    };
    _play = () => {
        this.setState({ playQuestion: false })
        this.AudioQuestion.seek(0)
    };
    _playRecord = async () => {
        this.setState({ playAgain: false });
        this.Audio.seek(0)
    }
    _record = async () => {
        const { record, showCheck } = this.state
        if (record == "record") {
            await AudioRecord.init({
                ...recordSetting.optionRecord,
                wavFile: 'AudioRecord.wav' // default 'audio.wav'
            });
            await AudioRecord.start();
            await AudioRecord.on('data', (data) => {
                chunk = Buffer.from(data).toString('base64');
            });
            audioFile = null
            this.setState({ record: 'stop', showCheck: false, disabled: true, playQuestion: true, playAgain: true })
        } else {
            AudioRecord.stop();
            audioFile = await AudioRecord.stop();
            this.setState({ record: 'record', showCheck: true, disabled: false })
        }
    }
    _OnPressCheckResuilt() {
        const { TextButton, numberAgain } = this.state
        if (TextButton == 'kiểm tra') {
            this._check()
        } else if (TextButton == "làm lại") {
            this._again()
        } else {
            this._endGame()
        }
    }
    _check = () => {
        this.setState({ Loading: false })
        const { TextButton, numberAgain } = this.state;
        if (TextButton == "kiểm tra") {
            let dateTime = new Date();
            let fileName = `AudioRecord${dateTime.getTime()}.mp3`
            RNFetchBlob.fetch('POST', API.baseurl+'student/api_student_lesson/recording_file', {
                'Content-Type': 'multipart/form-data',
                jwt_token: APIBase.jwt_token,
                Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
                'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            }, [
                { name: 'file', filename: fileName, data: chunk },
            ]).then((ressponse) => {
                console.log('asdasdasds',JSON.parse(ressponse.data))
                audioFile = null
                console.log(ressponse.data)
                if (JSON.parse(ressponse.data).status == true) {
                    this.setState({
                        check: true,
                        Resuilt: 0,
                        TextButton: 'tiếp tục',
                        Loading: true,
                        status: 'excellent'
                    })
                } else {
                    if (numberAgain < 2) {
                        this.setState({
                            check: true,
                            Resuilt: 3,
                            TextButton: 'làm lại',
                            Loading: true,
                            status: 'poor'
                        })
                    } else {
                        this.setState({
                            check: true,
                            Resuilt: 3,
                            TextButton: 'tiếp tục',
                            Loading: true,
                            status: 'poor'
                        })
                    }
                }
            }).catch((error) => {
                console.log("err: ", error);
                setTimeout(() => {
                    this.setState({
                        check: false,
                        showCheck: false,
                        numberAgain: numberAgain,
                        TextButton: 'kiểm tra'
                    });
                    audioFile = null
                    this.setState({ Loading: true })
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
                }, 2000)
            })
        } else if (TextButton == "làm lại") {
            this._again()
        } else {
            this._endGame()
        }
    }
    _againEnd = () => {
        const { numberAgain } = this.state
        this.setState({
            check: false,
            showCheck: false,
            numberAgain: 2,
            TextButton: 'kiểm tra'
        });
    }
    _again = () => {
        this.setState({ animatedValue: new Animated.Value(0) });
        const { numberAgain } = this.state;
        this.setState({
            check: false,
            showCheck: false,
            numberAgain: numberAgain + 1,
            TextButton: 'kiểm tra',
        });
    }
    _endGame = async () => {
        await this.props.SaveReview(this.state.status, 2)
        this.props.methodScreen('3')
    }

    _changeTitle = () => {
        if (!this.state.vi) {
            this.setState({ title: 'Nhấp vào microphone và đọc', vi: true });
        } else {
            this.setState({ title: 'Click on microphone and read', vi: false });
        }
    }
    render() {
        // const spin = this.state.animatedValue.interpolate({
        //     inputRange: [0, 0.5, 1],
        //     outputRange: [SmartScreenBase.smBaseWidth * 600, SmartScreenBase.smBaseWidth * 650, SmartScreenBase.smBaseWidth * 600]
        // });
        const { dataQuestion, Loading, numberAgain, record, check, showCheck, spell, checkResuilt, TextButton, disabled } = this.state;
        console.log(1123, dataQuestion);
        return (
            Loading ?
                <View style={{ alignItems: "center", height: SmartScreenBase.smPercenHeight * 87 }}>
                    <View style={{ alignItems: "center" }}>
                        <TypeExercise title={this.state.title} onPress={this._changeTitle} />
                        <View style={{justifyContent: 'center', paddingHorizontal: 15, height: height / 3.5, }}>
                            <Text style={{ textAlign: 'center', fontSize: 34, color: '#fff', fontWeight: 'bold' }}>{dataQuestion.en_vi_sentence}</Text>
                            {
                                spell &&
                                <Text style={{ textAlign: 'center', fontSize: 20, color: '#fff', fontWeight: 'bold' }}>{dataQuestion.spell}</Text>
                            }
                            <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 20 }} >
                                <View style={{}}>
                                    <TouchableOpacity onPress={() => this._play()} disabled={disabled}>
                                        <Image source={{ uri: "pronunication_01" }}
                                            style={{
                                                width: SmartScreenBase.smBaseWidth * 120,
                                                height: SmartScreenBase.smBaseWidth * 120, resizeMode: "contain"
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginLeft: width / 20 }}>
                                    <TouchableOpacity onPress={() => { this.setState({ spell: !spell }) }}>
                                        <Image source={{ uri: "lesson_vocab_image24" }}
                                            style={{
                                                width: SmartScreenBase.smBaseWidth * 120,
                                                height: SmartScreenBase.smBaseWidth * 120, resizeMode: "contain"
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: SmartScreenBase.smPercenHeight * 20, justifyContent: "center", flexDirection: 'row' }}>
                        {check == false ? (
                            <TouchableOpacity onPress={() => { this._record() }} >
                                <Image source={{ uri: record == 'record' ? 'lesson_vocab_image12' : 'lesson_vocab_image14' }}
                                    style={{ width: SmartScreenBase.smBaseWidth * 390, height: SmartScreenBase.smBaseWidth * 390, resizeMode: "contain" }}
                                />
                            </TouchableOpacity>
                        ) : (
                            <FileSound3 showImage={this.state.Resuilt == 0 ? "true" : this.state.Resuilt == 1 ? "false" : "null"} />
                            )}
                        {audioFile &&
                            <TouchableOpacity style={{ marginLeft: 30, position: 'absolute', right: -30, top: '40%' }} onPress={this._playRecord}>
                                <Image source={{ uri: 'tainghe' }} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{ position: "absolute", bottom: SmartScreenBase.smPercenHeight * 5, alignSelf: "center" }}>
                        {showCheck == true ? (
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                                {
                                    TextButton == 'tiếp tục' &&
                                    <TouchableOpacity onPress={this._againEnd} style={{ backgroundColor: '#01283A', paddingHorizontal: 30, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>LÀM LẠI</Text>
                                    </TouchableOpacity>

                                }
                                <TouchableOpacity onPress={() => { this._OnPressCheckResuilt() }} style={{ backgroundColor: '#01283A', paddingHorizontal: 30, width: TextButton != 'tiếp tục' ? width / 1.2 : 'auto', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{TextButton.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null
                        }
                        <Video source={{ uri: audioFile }}
                            ref={refs => this.Audio = refs}
                            paused={this.state.playAgain}
                            onEnd={() => { this.setState({ playAgain: true })}}
                        />
                        <Video source={{ uri: dataQuestion.audio }}
                         ref={refs => this.AudioQuestion = refs}  // Can be a URL or a local file.
                            paused={this.state.playQuestion}                                // Store reference
                        />
                    </View>
                </View>
                :
                <View style={{ backgroundColor: '#ffffff50', width: width, height: height, justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                    <ActivityIndicator size="small" color="blue" />
                    <Text style={{ fontSize: 17, color: 'blue' }}>Vui Lòng đợi trong giây lát...</Text>
                </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        Vocab: state.vocabularyReducers.vocabulary,
    }
}
export default connect(mapStateToProps)(VocabB2Screen);
