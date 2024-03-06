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
    PermissionsAndroid,
    Platform,
    Linking
} from 'react-native';
import { useSelector } from 'react-redux'
import Sound from 'react-native-sound';
import Video from 'react-native-video';
import Champion from './ComponentChampion';
import AudioRecord from 'react-native-audio-record';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { Buffer } from 'buffer';
import stylesButton from '../../../../styleApp/stylesApp';
import { IMAGE_RECORD, IMAGE_GA } from '../../../../assets/image/index';
import ShowData from './ComponentChampion/showVocabData'
import FileSound4 from "../FileSound4";
import SmartScreenBase from '../../../../base/SmartScreenBase';
import API from '../../../../API/APIConstant';
import MyData from '../../../MyData';
import recordSetting from '../../../../utils/recordSetting';
import { useDispatch } from 'react-redux'
import { vocabulary } from "../../../../redux/actions/vocabulary";
import LogBase from '../../../../base/LogBase';
import { SmPopup } from '../../../../componentBase/SmPopup/SmPopup';
import { StudentGrammarJson } from '../../../../stringJSON/StudentGrammarJson';
import { CommonJson } from '../../../../stringJSON';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import FontBase from '../../../../base/FontBase';
import APIBase from '../../../../base/APIBase';
import { Colors } from '../../../../styleApp/color';

Sound.setCategory('Playback');

let audioFile;
let chunk;
let InterVal;
var mCurDataV;
const { width, height } = Dimensions.get('window');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}  

const VocabB2New = (props) => {
    const [dataQuestion, setQuestion] = useState([]);
    const [play, setPlay] = useState(true)
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState(true)
    const [record, setRecord] = useState(false);
    const [playQuestion, setPlayQuestion] = useState(true)
    const [dataChampion, setDataChampion] = useState([]);
    const [index, setIndex] = useState(0);
    const [showVocab, setShowVocab] = useState(false);
    const [vocabularyData, setVocabularyData] = useState([]);
    const DataRedux = useSelector((state) => state.vocabularyReducers.vocabulary);
    const AudioQuestion = useRef();
    const audioRecord = useRef();
    const [showButton, setShowButton] = useState(false);
    const [datafinal, setDataFinal] = useState([]);
    const [checkResult, setCheckResult] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [titleResult, setTitleResult] = useState('');
    const [time, setTime] = useState(15);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [AudioPlaying, setAudioPlaying] = useState(false);
    const [curVoice, setCurVoice] = useState();

    const dispatch = useDispatch()

    useEffect(() => {
        props.setVietNam('Nhấp vào biểu tượng mic và đọc từ.');
        props.setEnglish('Click on the microphone and read the word.');
        _getData();
        initAudioPlayer(`AudioRecord${Date.now()}.wav`)
    }, [])

    const _getData = async () => {
        try {
            var ressponse = {}
            var data
            if(props.isMasterUnit){
                ressponse['data'] = props.dataContent;
                await dispatch(vocabulary(ressponse));
            }else{
                ressponse = DataRedux
            }
            console.log("=====convertData:")
            data = await convertData(ressponse.data.data_question);
            setQuestion(data)
            if(props.isMasterUnit){
                props.SaveDataTotal(data.id)
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
            ;
        }
        ;
    };
    const convertData = (data) => {
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
            dataQ.lesson_id = item.lesson_id;
            dataQ.id = item.id;
        });
        console.log("=====dataConvert",dataConvert[props.index])
        return dataConvert[props.index];
    };

    const isCanPlay = () => {
        return !AudioPlaying
    }

    const startPlay = () => {
        setAudioPlaying(true)
    }

    const endPlay = () => {
        setAudioPlaying(false)
    }

    const _audioPlay = () => {
        console.log("=====_audioPlay")
        setPlay(true);
        setPlayQuestion(false)
    };

    useEffect(() => {
        if (time <= 0) {
            _playRecod();
        }
    }, [time])

    const _setTime = async () => {
        InterVal = setInterval(() => {
            console.log(time)
            setTime((time) => time - 1);
        }, 1000)
    };

    const initAudioPlayer = (resource) => {
        AudioRecord.init({
          ...recordSetting.optionRecord,
          wavFile: resource,
        });
      }

      const startRecoder = async () => {
            try {
                LogBase.log("=====start reco")
                AudioRecord.start()
            } catch (error) {
                LogBase.log("=====showErro", error)
            }
            setCheckResult(false)
            props.showTypeExercise()
            audioFile = null
            AudioRecord.on('data', (data) => {
                chunk = Buffer.from(data).toString('base64');
            });
            setPlayQuestion(true);
            setRecord(true);
            setShowButton(false);
            setPlay(true);
            _setTime(true)
      }

    const _playRecod = async () => {
        setShowVocab(false)
        setTitleResult('')
        if (!record) {
            LogBase.log("=====record","1")
            if(Platform.OS === 'android'){
                const granted = await PermissionsAndroid.requestMultiple(
                    [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
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
                    initAudioPlayer(`AudioRecord${Date.now()}.wav`)
                  }
              }else{
                Alert.alert('Chú ý','Bạn vẫn chưa cấp quyền thu âm, vui lòng click đồng ý khi được hỏi xin quyền')
                return;
              }
              startRecoder()
          }else{
  
            await check(PERMISSIONS.IOS.MICROPHONE).then((result) => {
              switch (result) {
              case RESULTS.UNAVAILABLE:
                  Alert.alert('Chú ý','Thiết bị của bạn không hỗ trợ thu âm')
                  break;
              case RESULTS.GRANTED:
                  LogBase.log("=====record","2")
                  if(!MyData.recordAudioPer){
                    MyData.recordAudioPer = true
                    initAudioPlayer(`AudioRecord${Date.now()}.wav`)
                  }
                  startRecoder()
                  break;
              case RESULTS.LIMITED:
                  Alert.alert('Chú ý','Quyền thu âm bị hạn chế do đang có nhiều hơn 1 trình thu âm hoạt động')
                  break;
              case RESULTS.DENIED:
                  LogBase.log("=====recordPress 3","")
                  request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
                      LogBase.log("=====result 3",result)
                      if(result == RESULTS.GRANTED){
                          startRecoder()
                      }else{
  
                      }
                    });
                  break;
              case RESULTS.BLOCKED:
                  LogBase.log("=====recordPress 4","")
                  setIsShowPopup(true)
                  break;
              }
          })
          .catch((error) => {
              // …
          });
        }
        } else {
            await clearInterval(InterVal)
            setRecord(false);
            setTime(15)
            setDisabled(true)
            //AudioRecord.stop();
            audioFile = await AudioRecord.stop();
            await sleep(1000);
            Sound.setCategory('Playback')
            await _check(chunk);
        }
    };

    const _history = () => {
        setHistory(!history);
    };

    const _listenAgain = async () => {
        console.log("=====_listenAgain")
        setPlayQuestion(true)
        if(play)
            setPlay(false);
    };

    const _check = async () => {
        await setRecord(false);
        let dateTime = new Date();
        let fileName = `AudioRecord${dateTime.getTime()}.wav`;
        LogBase.log('=====API:',API.baseurl+'student/api_student_lesson/compare_recording_file')
        // console.log('audioFile',audioFile)

        RNFetchBlob.fetch('POST', API.baseurl+'student/api_student_lesson/compare_recording_file', {
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
            { name: 'text_compare', data: dataQuestion.en_vi_sentence },
            { name: 'skill', data: 'vocabulary' }
        ]).then((ressponse) => {
            let data = JSON.parse(ressponse.data);
            LogBase.log("=====res:",data)
            if (data.status) {
                LogBase.log("=====check: 1")
                mCurDataV = {
                    score: data.data?.overall_score,
                    audio: data.data?.user_record_file
                }
                _callData()
                LogBase.log("=====check: 2")
                let convertDataV = _setDataVocab(data.data.list_word);
                LogBase.log("=====check: 3")
                setVocabularyData(convertDataV)
                LogBase.log("=====check: 4")
                let a = data.data.grade
                setTitleResult(a)
                LogBase.log("=====check: 5")
            } else {
                LogBase.log("=====check: 6")
                setCheckResult(false);
                setShowButton(true);
                setDisabled(false)
                Alert.alert('Thông báo', 'Server Đang bận vui lòng thử lại')

            }
        }).catch((error) => {
            LogBase.log("=====check: 7", error)
            setCheckResult(false);
            setShowButton(true);
            setDisabled(false)
            error && error.ressponse && console.log(error.ressponse.data);
        })
    };

    const _setDataVocab = (data) => {
        let array = [];
        data.map((item) => {
            array.push(item.list_phoneme_score)
        })
        return array
    };

    const _endAudio = async () => {
        await setPlay(true);
        audioRecord.current.seek(0);
    };

    const _endAudioQuestion = async () => {
        await setPlayQuestion(true);
        AudioQuestion.current.seek(0);
    };

    const _callData = async () => {
        const url = API.baseurl + API.getHistoryRecoder + `?question_id=${(""+props.dataContent.data_question[props.index].id)}&order_by=score&order_type=desc&litmit=3&origin_text=${dataQuestion.en_vi_sentence}`;
        try {
            const ressponse = await APIBase.postDataJson('get',url)
            if (ressponse.data.status) {
                // let array = [...datafinal];
                // let arrayRevers = [];
                // let oj = {}
                // oj['score'] = value.data.overall_score;
                // oj['audio'] = audioFile
                // array.push(oj);
                // setDataFinal(array);
                // for (let i = array.length - 1; i >= 0; i--) {
                //     for (let j = 1; j <= i; j++) {
                //         if (array[j].overall_score > array[j - 1].overall_score) {
                //             let item = array[j]
                //             array[j] = array[j - 1];
                //             array[j - 1] = item
                //         }
                //     }
                // }
                // arrayRevers.push(oj)
                // array.map((item) => {
                //     arrayRevers.push(item)
                // })
                var arrayRevers = ressponse.data?.data || [];
                var lastReco = {
                    audio: audioFile,
                    score: mCurDataV.score
                }
                // audioFile && arrayRevers.unshift(lastReco)
                LogBase.log("=====arrayRevers",arrayRevers)
                setDisabled(false)
                setDataChampion(arrayRevers);
                setShowButton(true);
                await setCheckResult(true)
                props.hideTypeExercise()
            } else {
                await setCheckResult(false)
                console.log(ressponse.msg);
                Alert.alert('Thông báo', 'Server Đang bận vui lòng thử lại')
            }
        } catch (error) {
            error && error.ressponse && console.log(error.ressponse.data);
        }

    };
    const _checkResult = (title) => {
        let text = '';
        let image = '';
        let status = '';
        let statusImg = 'false';
        console.log("=====_checkResult",title)
        switch (title) {
            case 'C':
                status = 'fair';
                text = 'Bạn cần cố gắng hơn';
                image = 'pronunciation_1111';
                statusImg="false"
                break;
            case 'B':
                status = 'good';
                text = 'Tuyệt vời, hãy giữ phong độ';
                image = 'pronunciation_1112';
                statusImg="true"
                break;
            case 'A':
                status = 'excellent';
                text = 'BẠN QUÁ ĐỈNH';
                image = 'pronunciation_1112';
                statusImg="true"
                break;
            default:
                status = 'poor';
                text = 'Không sao, thử lại nào';
                image = 'pronunciation_1110';
                statusImg="false"
                break;
        }
        return (
            <View style={{ 
                width, 
                paddingHorizontal: width / 30, 
                flexDirection: 'row', 
                alignItems: 'center' ,
                justifyContent: 'space-between'
            }}>
                  <FileSound4 showImage={statusImg} />
                <Image source={{ uri: image }}
                    style={{ width: width / 5, height: width / 5, resizeMode: 'contain' }} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: SmartScreenBase.smFontSize*80,
                        color: '#f0f0ad',
                        textTransform: 'capitalize',
                        fontFamily: 'iCielSoupofJustice'
                    }}>{status}!</Text>
                    <Text style={{
                        fontSize: width / 20,
                        color: '#f0f0ad',
                        textTransform: 'uppercase',
                        fontFamily: 'iCielSoupofJustice'
                    }}>{text}</Text>
                </View>
              
            </View>
        )
    };

    const _next = () => {
        try{
            props.showTypeExercise();
            props.SaveReview(_checkResultFinal(titleResult), 2);
            props.methodScreen('3')
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
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
        }
    };
    const _setImage = (mRecord) => {
        if (mRecord) {
            return <ImageBackground source={IMAGE_RECORD} style={{
                ...styles.iconRecod,
                width: width / 5.6,
                height: width / 5.6,
                position: 'absolute'
            }} />
        }
        else{
            return <ImageBackground source={IMAGE_GA}
                style={{ ...styles.iconRecod, width: width / 4, height: width / 4, position: 'absolute' }} />
        }
    }

    const _colorQ = (title) => {
        switch (title) {
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
    const _showVocab = (index) => {
        setIndex(index);
        setShowVocab(!showVocab)
    }

    var curRecord = record

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
            <View style={styles.viewQuestion}>
                <View style={styles.viewInfomation}>
                    <View style={styles.viewTitleContent}>
                        <View style={{ justifyContent: 'center', alignItems: 'center',flex:1 }}>
                            {
                                !showButton ?
                                    <Text style={{
                                        ...styles.titleQuestion,
                                        color: Colors.Black
                                    }}>{dataQuestion.en_vi_sentence}</Text>
                                    :
                                    <TouchableOpacity onPress={() => _showVocab(index)}>
                                        <Text style={{
                                            ...styles.titleQuestion,
                                            color: _colorQ(titleResult)
                                        }}>{dataQuestion.en_vi_sentence}</Text>
                                    </TouchableOpacity>
                            }
                            <Text style={{
                                ...styles.titlePA,
                                position: 'absolute',
                                bottom: -height / 16
                            }}>{dataQuestion.spell}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>_audioPlay()} disabled={curRecord ? true : false}>
                            <Image source={{ uri: 'pronunciation1117' }} style={styles.iconSound} />
                        </TouchableOpacity>
                        {
                            curRecord ?
                                <ImageBackground source={{ uri: 'pronunciation_1115' }} style={{
                                    height: 30,
                                    width: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft:5
                                }} imageStyle={{ resizeMode: 'contain' }}>
                                    <Text style={{ fontSize: 14, color: '#5fb296' }}>{time}</Text>
                                </ImageBackground>
                                : null

                        }
                    </View>
                    

                    {
                        history ?
                            <Image source={{ uri: dataQuestion.image }} style={styles.iconQuestion}
                                imageStyle={{ borderRadius: 15, }} />
                            :
                            <View style={styles.Viewchampion}>
                                {
                                    dataChampion.map((item, index) => {
                                        if (index < 4) {
                                            return <Champion index={index} item={item} isCanPlay={isCanPlay} startPlay={startPlay} endPlay={endPlay}/>
                                        }
                                    })
                                }
                            </View>
                    }
                </View>
                <View style={{
                    ...styles.bottomQuestion,
                    justifyContent: dataChampion.length > 0 ? 'space-between' : 'center',
                }}>
                    {
                        dataChampion.length > 0 &&
                        <View>
                            {
                                history ?
                                    <TouchableOpacity onPress={()=>_listenAgain()} style={styles.buttonListen}
                                        disabled={curRecord ? true : false}>
                                        <Image source={{ uri: 'pronunciation1118' }} style={styles.iconSound} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.buttonListen} disabled={curRecord ? true : false}>

                                    </TouchableOpacity>
                            }
                        </View>
                    }
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={_playRecod} disabled={disabled} style={{
                            opacity: disabled ? 0.5 : 1,
                            width: width / 4,
                            height: width / 4,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {_setImage(curRecord)}
                        </TouchableOpacity>
                        {
                            disabled &&
                            <View style={{ position: 'absolute' }}>
                                <ActivityIndicator size="large" color="blue" />
                            </View>
                        }
                    </View>
                    {
                        dataChampion.length > 0 &&
                        <TouchableOpacity onPress={_history} style={styles.buttonListen}>
                            <Image source={{ uri: history ? 'pronunciation1116' : 'pronunciation1119' }}
                                style={styles.iconSound} />
                        </TouchableOpacity>
                    }
                    {/* {
                        showVocab &&
                            <ShowData style={{ top: - SmartScreenBase.smPercenHeight*30, left: - SmartScreenBase.smPercenWidth*11, width: SmartScreenBase.smPercenWidth*80}} 
                                data={vocabularyData} showVocab={showVocab} index={index} close={()=>setShowVocab(false)}/>
                    } */}
                </View>
            </View>
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
            <SmPopup visible={isShowPopup} message={StudentGrammarJson.CallMicToRecoderError}
                confirmOnpress={() => {setIsShowPopup(false); Linking.openSettings()}} confirmText={CommonJson.Confirm} cancelText={CommonJson.Cancel} cancelOnpress={() => {setIsShowPopup(false)}}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width
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
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: 'center'
    },
    titlePA: {
        fontSize: SmartScreenBase.smFontSize*45,
        marginBottom: '4%'
    },
    viewInfomation: {
        width: '100%',
        alignItems: 'center',
        height: '90%',
    },
    viewTitleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10%'
    },
    titleQuestion: {
        fontSize: SmartScreenBase.smFontSize*65,
        marginRight: 10,
        fontFamily: FontBase.MyriadPro_Bold,
    },
    iconSound: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    iconQuestion: {
        width: '100%',
        height: '70%',
        resizeMode: 'contain',
    },
    bottomQuestion: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -height / 18,

        alignItems: 'center',
        width: '70%',
        zIndex: 1000
    },
    iconRecod: {
        width: width / 4,
        height: width / 4,
        resizeMode: 'contain',
    },
    Viewchampion: {
        width: '100%',
        height: '70%',
        paddingTop: SmartScreenBase.smPercenWidth*1.5,
    },
    buttonListen: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BT_N: {
        position: 'absolute',
        bottom: height / 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TT_N: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }
})

const areEqual = (prevProps, nextProps) => {
    return true
  }
  export default React.memo(VocabB2New, areEqual);

