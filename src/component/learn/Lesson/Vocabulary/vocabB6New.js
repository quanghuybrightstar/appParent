import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
    ActivityIndicator,
    ImageBackground,
    FlatList,
    Modal
} from 'react-native';
import { useSelector } from 'react-redux'
import TypeExercise from "../Component/TypeExercise";
import FileSound4 from "../FileSound4";
import Video from 'react-native-video';
import Champion from './ComponentChampion';
import AudioRecord from 'react-native-audio-record';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import stylesButton from '../../../../styleApp/stylesApp';
import { Buffer, constants } from 'buffer';
import { IMAGE_RECORD, IMAGE_GA } from '../../../../assets/image/index';
import style from './ComponentChampion/style';
import ShowData from './ComponentChampion/showVocabData'
import ModalVi from './ComponentChampion/modalVI';
import Sound from 'react-native-sound';
import stringUtils from '../../../../utils/stringUtils';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import API from '../../../../API/APIConstant';
import LogBase from '../../../../base/LogBase';
import APIBase from '../../../../base/APIBase';
import recordSetting from '../../../../utils/recordSetting';

Sound.setCategory('Playback');


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}  

let audioFile;
let chunk;
let InterVal;
var mCurDataV;
const { width, height } = Dimensions.get('window');
const VocabB6New = (props) => {
    const [title, setTitle] = useState('');
    const [dataQuestion, setQuestion] = useState([]);
    const [vi, setVi] = useState(false);
    const [play, setPlay] = useState(true)
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [showVocab, setShowVocab] = useState(false);
    const [vocabularyData, setVocabularyData] = useState([]);
    const [record, setRecord] = useState(false);
    const [playQuestion, setPlayQuestion] = useState(true)
    const [dataChampion, setDataChampion] = useState([]);
    const DataRedux = useSelector((state) => state.vocabularyReducers.vocabulary);
    const AudioQuestion = useRef();
    const audioRecord = useRef();
    const [showButton, setShowButton] = useState(false);
    const [datafinal, setDataFinal] = useState([]);
    const [checkResult, setCheckResult] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [titleResult, setTitleResult] = useState('');
    const [titleSeverRequest, setTitleSeverRequest] = useState([])
    const [visible, setVisible] =  useState(false)
    const [time, setTime] = useState(15);
    const [AudioPlaying, setAudioPlaying] = useState(false);
    
    console.log('here')
    useEffect(() => {
        props.setVietNam('Nhấp vào biểu tượng mic và đọc câu.');
        props.setEnglish('Click on the microphone and read the sentence.');
        _getData()
        _getPermisson()
    }, [])
    const _getPermisson = async () => {
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
    const _getData = async () => {
        try {
            const ressponse = DataRedux
            let data = await convertData(ressponse.data.data_question);
            console.log('data',data);
            setQuestion(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            };
        };
    };
    const convertData = (data) => {
        let dataConvert = [];
        //console.log(data)
        data.map((item, index) => {
            // console.log(item);
            let dataQ = {};
            dataConvert[index] = dataQ;
            let imageQuestion = JSON.parse(item.image)[0];
            dataQ.image = imageQuestion;
            dataQ.audio = item.vi_en_sentence_audio;
            dataQ.vocabulary = item.vocabulary;
            dataQ.spell = item.spell;
            dataQ.en_vi_sentence = item.vocabulary;
            dataQ.spell = item.spell;
            dataQ.lesson_id = item.lesson_id;
            dataQ.id = item.id;
            dataQ.titleVc = item.vi_en_sentence;
            dataQ.vi_en_sentence_mean = JSON.parse(item.vi_en_sentence_mean)[0].trim();
        });
        return dataConvert[props.index];
    };

    const _audioPlay = () => {
        setPlayQuestion(false)
    };

    useEffect(() => {
        if (time <= 0) {
            _playRecod();
        }
    }, [time])

    const _setTime = () => {
        InterVal = setInterval(() => {
            setTime((time) => time - 1);
        }, 1000)
    };

    const _playRecod = async () => {
        setShowVocab(false)
        props.showTypeExercise()
        let date = new Date();
        let fileName = `AudioRecord${date.getTime()}.wav`
        if (!record) {
            await AudioRecord.init({
                ...recordSetting.optionRecord,
                wavFile: fileName // default 'audio.wav'
            });
            await setCheckResult(false)
            await AudioRecord.start()
            audioFile = null
            await AudioRecord.on('data', (data) => {
                chunk = Buffer.from(data).toString('base64');
            });
            setPlayQuestion(true);
            setRecord(true);
            setShowButton(false);
            setPlay(true);
            _setTime()
        } else {
            clearInterval(InterVal)
            setDisabled(true)
            //AudioRecord.stop()
            audioFile = await AudioRecord.stop();
            // await sleep(1000);
            Sound.setCategory('Playback')
            setRecord(false);
            setTime(15);
            await _check();

        }
    };

    const _listenAgain = async () => {
        setPlay(false);
    };

    const _check = async () => {
        var url = API.baseurl+'student/api_student_lesson/compare_recording_file';
        LogBase.log("=====API:",url)
        let dateTime = new Date();
        let fileName = `AudioRecord${dateTime.getTime()}.wav`;
        RNFetchBlob.fetch('POST', url, {
            'Content-Type': 'multipart/form-data',
            jwt_token: APIBase.jwt_token,
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
        }, [
            // { name: 'file', filename: fileName, data: chunk },
            {
                name: 'file',
                filename: fileName,
                data: RNFetchBlob.wrap(audioFile),
            },
            { name: 'question_id', data: dataQuestion.lesson_id },
            { name: 'text_compare', data: dataQuestion.vi_en_sentence_mean },
            { name: 'skill', data: 'vocabulary' }
        ]).then((ressponse) => {

            let data = JSON.parse(ressponse.data);
            let array = [...titleSeverRequest]
            if (data.status) {
                console.log('==========vocab6',data)
                array = data.data.list_word
                setTitleSeverRequest(array);
                mCurDataV = {
                    score: data.data?.overall_score,
                    audio: API.domain + data.data?.user_record_file
                }
                _callData()
                 let convertDataV = _setDataVocab(data.data.list_word);
                setVocabularyData(convertDataV)
                let a = data.data.grade
                setTitleResult(a)
            } else {
                setCheckResult(false);
                setShowButton(true);
                setDisabled(false)
                Alert.alert('Thông báo', 'Server Đang bận vui lòng thử lại')
            }
        }).catch((error) => {
            setCheckResult(false);
            setShowButton(true);
            setDisabled(false)
            console.log(dataQuestion.lesson_id)
            console.log(error);
        })
    };
    const _endAudio = async () => {
        await setPlay(true);
        audioRecord.current.seek(0);
    };

    const _endAudioQuestion = async () => {
        await setPlayQuestion(true);
        AudioQuestion.current.seek(0);
    };

    const _setDataVocab = (data) => {
        let array = [];
        data.map((item) => {
            array.push(item.list_phoneme_score)
        })
        return array
    }
    const _callData = async () => {
        LogBase.log("=====props.dataContent.data_questio: ", props.dataContent.data_question)
        const url = API.baseurl + API.getHistoryRecoder + `?question_id=${(""+props.dataContent.data_question[props.index].id)}&order_by=score&order_type=desc&litmit=3&origin_text=${dataQuestion.vi_en_sentence_mean}`;
        try {
            const ressponse = await APIBase.postDataJson('get',url)
            LogBase.log("=====Res: ", ressponse)
            if (ressponse.data.status) {
                var arrayRevers = ressponse.data?.data || [];
                // mCurDataV && arrayRevers.unshift(mCurDataV)
                LogBase.log("=====arrayRevers",arrayRevers)
                setDisabled(false)
                setDataChampion(arrayRevers);
                setShowButton(true);
                await setCheckResult(true);
                props.hideTypeExercise()
            } else {
                await setCheckResult(false)
                Alert.alert('Thông báo', 'Server Đang bận vui lòng thử lại')
            }
        }
        catch (error) {
            error && error.ressponse && console.log(error.ressponse.data);
        };

    };
    const _checkResult = (title) => {
        let text = '';
        let image = '';
        let titleSS = ''
        let statusImg="false"
        switch (title) {
            case 'C':
                titleSS = 'fair';
                text = 'Bạn cần cố gắng hơn';
                image = 'pronunciation_1111';
                statusImg="false"
                break;
            case 'B':
                titleSS = 'good';
                text = 'Tuyệt vời, hãy giữ phong độ';
                image = 'pronunciation_1112';
                statusImg="true"
                break;
            case 'A':
                titleSS = 'excellent'
                text = 'BẠN QUÁ ĐỈNH';
                image = 'pronunciation_1112';
                statusImg="true"
                break;
            default:
                titleSS = 'poor';
                text = 'Không sao, thử lại nào';
                image = 'pronunciation_1110';
                statusImg="false"
                break;
        }

        return (
            <View style={styles.viewIconTrueFalse}>
                 <FileSound4 showImage={statusImg} />
                <Image source={{ uri: image }} style={styles.viewImageTrue} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.titleSuccess}>{titleSS}!</Text>
                    <Text style={{ fontSize: width / 20, color: '#f0f0ad', textTransform: 'uppercase', fontFamily: 'iCielSoupofJustice' }}>{text}</Text>
                </View>
            </View>
        )
    };

    const _next = async () => {
        props.showTypeExercise()
        if (props.index < 3) {
            // await props.setIndexQuestion(props.index + 1);
            await props.SaveReview(_checkResultFinal(titleResult), 6)
            // await props.plusindex()
            // await props.methodScreen('1')
            //go to 4 or 5
            if(Math.random() >= 0.5){
                props.methodScreen('4')
            }else{
                props.methodScreen('5')
            }
        } else {
            await props.SaveReview(_checkResultFinal(titleResult), 6)
            await props.methodScreen('7')
        }
    };
    const _checkResultFinal = (title) => {
        switch (title) {
            case 'D':
                return 'poor';
            case 'C':
                return 'fair';
            case 'B':
                return 'good';
            case 'A':
                return 'excellent';
            default:
                return 'poor';
        };
    }
    const _checkColor = (value) => {
        switch (value) {
            case 'C':
                return '#f08b01';
            case 'B':
                return '#B9D546';
            case 'A':
                return '#B9D546';
            default:
                return '#EE5555';
        }
    };
    const _setImage = () => {
        if(record) {
            return <Image source={IMAGE_RECORD} style={{ ...styles.iconRecod, width: width / 5.6, height: width / 5.6, position: 'absolute' }} />
        }
        else{
            return <Image source={IMAGE_GA} style={{ ...styles.iconRecod, width: width / 4, height: width / 4, position: 'absolute' }} />
        }
    }
    const _showVocab = (index) => {
        setIndex(index);
        setShowVocab(!showVocab)
    }

    const isCanPlay = () => {
        return !AudioPlaying
    }

    const startPlay = () => {
        setAudioPlaying(true)
    }

    const endPlay = () => {
        setAudioPlaying(false)
    }

    return (
        <View style={styles.container}>
            {
                checkResult ?
                    <View style={styles.viewHeader}>

                        <View style={{ width }}>
                            {_checkResult(titleResult)}
                        </View>
                    </View>
                    :
                    null
            }
            <View style={styles.viewQuestion} >
                <View style={styles.viewInfomation}>
                    <View style={{ ...styles.viewTitleContent, width: '100%', justifyContent: 'center' }}>
                        {
                            !showButton ?
                                <Text style={styles.titleQuestion}>{dataQuestion.vi_en_sentence_mean}</Text>
                                :
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: '100%' }}>
                                    {
                                        titleSeverRequest.map((item, index) => {
                                            return (
                                                <TouchableOpacity onPress={() => _showVocab(index)}>
                                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: _checkColor(item.grade) }}>{item.text} </Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                        }
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={_audioPlay} disabled={record ? true : false} style={{ marginRight: 10 }}>
                            <Image source={{ uri: 'pronunciation1117' }} style={styles.iconSound} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setVisible(true)}}>
                            <Image source={{ uri: 'phienam1' }} style={styles.iconSound} />
                        </TouchableOpacity>
                    </View>
                    {
                        record &&
                        <ImageBackground source={{ uri: 'pronunciation_1115' }} style={styles.imageRecord} imageStyle={{ resizeMode: 'contain' }}>
                            <Text style={{ fontSize: 14, color: '#5fb296' }}>{time}</Text>
                        </ImageBackground>

                    }
                    <View style={styles.Viewchampion}>
                        {
                            dataChampion.map((item, index) => {
                                if (index < 4) {
                                    return <Champion index={index} item={item} isCanPlay={isCanPlay} startPlay={startPlay} endPlay={endPlay}/>
                                }
                            })
                        }
                    </View>
                </View>
                <View style={styles.bottomQuestion}>
                    {/* {
                        dataChampion.length > 0 &&
                        <TouchableOpacity onPress={_listenAgain} style={styles.buttonListen} disabled={record ? true : false}>
                            <Image source={{ uri: 'pronunciation1118' }} style={styles.iconSound} />
                        </TouchableOpacity>
                    } */}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={_playRecod} disabled={disabled} style={{ opacity: disabled ? 0.5 : 1, width: width / 4, height: width / 4, justifyContent: 'center', alignItems: 'center' }}>
                            {_setImage()}
                        </TouchableOpacity>
                        {
                            disabled &&
                            <View style={{ position: 'absolute' }}>
                                <ActivityIndicator size="large" color="blue" />
                            </View>
                        }
                    </View>
                </View>
                {/* {
                        showVocab &&
                        <ShowData data={vocabularyData} style={{top:SmartScreenBase.smPercenHeight*10}} 
                            showVocab={showVocab} index={index} close={()=>setShowVocab(false)}/>
                    } */}
            </View>
            <ModalVi title={dataQuestion} visible={visible} close={()=>setVisible(false)}/>
            <Video
                source={{ uri: audioFile }}
                ref={audioRecord}
                paused={play}
                onEnd={_endAudio}
            />
            <Video
                source={{ uri: dataQuestion.audio }}
                ref={AudioQuestion}
                paused={playQuestion}
                onEnd={_endAudioQuestion}
            />

            {
                showButton ?
                    <TouchableOpacity style={{ ...stylesButton.Sty_Button, ...styles.BT_N }} onPress={_next}>
                        <Text style={stylesButton.Sty_Text_Button}>TIẾP TỤC</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ ...stylesButton.Sty_Button_disable, ...styles.BT_N }}>
                        <Text style={stylesButton.Sty_Text_Button}>TIẾP TỤC</Text>
                    </TouchableOpacity>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width,
    },
    viewHeader: {
        height: height / 5,
        width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewQuestion: {
        height: height / 2,
        borderRadius: 25,
        width: width - 40,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center'
    },
    titlePA: {
        fontSize: 20,
        marginBottom: '4%'
    },
    viewInfomation: {
        width: '100%',
        alignItems: 'center',
        height: '90%'
    },
    viewTitleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    titleQuestion: {
        fontSize: 18,
        marginRight: 10,
        maxWidth: '90%',
    },
    iconSound: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    iconQuestion: {
        width: '100%',
        resizeMode: 'contain',
        height: '70%',
    },
    bottomQuestion: {
        position: 'absolute',
        bottom: -height / 18,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%'
    },
    iconRecod: {
        width: width / 4,
        height: width / 4,
        resizeMode: 'contain',

    },
    imageRecord: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    Viewchampion: {
        width: '100%',
        height: '70%',
        paddingTop: SmartScreenBase.smPercenWidth*2,
    },
    buttonListen: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0
    },
    BT_N: {
        position: 'absolute',
        bottom: 0,
        bottom: height / 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TT_N: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    viewIconTrueFalse: {
        width,
        paddingHorizontal: width / 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    viewImageTrue: {
        width: width / 5,
        height: width / 5,
        resizeMode: 'contain',
        marginRight: 15
    },
    titleSuccess: {
        fontSize: 30,
        // fontWeight: 'bold',
        color: '#f0f0ad',
        textTransform: 'capitalize',
        fontFamily: 'iCielSoupofJustice'
    }
})
export default VocabB6New;
