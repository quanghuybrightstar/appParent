import React, {Component} from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Modal,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import AudioRecord from 'react-native-audio-record';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import {useSelector} from 'react-redux';
import {
  boy,
  girl_speaking,
  girl,
  boy_speaking,
} from '../../../../../assets/gif';
import stringUtils from '../../../../utils/stringUtils';
import stylesApp from '../../../../styleApp/stylesApp';
import api from '../../../../API/APIConstant';
import apiBase from '../../../../base/APIBase';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import font from '../../../../base/FontBase';
import cloneDeep from 'lodash/cloneDeep';
import MyData from '../../../MyData';
import recordSetting from '../../../../utils/recordSetting';
import { Colors } from '../../../../styleApp/color';
import FontBase from '../../../../base/FontBase';
import { SmPopup } from '../../../../componentBase/SmPopup/SmPopup';
import { StudentGrammarJson } from '../../../../stringJSON/StudentGrammarJson';
import { CommonJson } from '../../../../stringJSON';
import LogBase from '../../../../base/LogBase';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

var curTime = null;
var issub = 1;

Sound.setCategory('Playback');

const {width, height} = Dimensions.get('window');


const validWord=(s)=>{
  if(!s) return s;
  let res = s.replace(/[‘\u2018\u2019]/g, '\'')
              .trim();
  while(res.indexOf('  ')>-1){
      res = res.replace(/  /g,' ');
  }
  while (res.charAt(res.length - 1) === '.' || res.charAt(res.length - 1) === ',') {
      res = res.substring(0, res.length - 1).trim();
  }
  return res.trim();
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const getGifts = (gender, speaking) => {
  if (speaking) return gender === 'female' ? girl_speaking : boy_speaking;
  return gender === 'female' ? girl : boy;
};

const Slider = ({value}) => {
  return (
    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <View
        style={{
          width: SmartScreenBase.smPercenWidth * 70,
          marginVertical: SmartScreenBase.smPercenWidth * 6,
          height: SmartScreenBase.smPercenWidth * 6,
          backgroundColor: '#dcdcdc',
          borderRadius: SmartScreenBase.smPercenWidth * 4,
        }}>
        <LinearGradient
          style={{
            borderRadius: SmartScreenBase.smPercenWidth * 10,
            height: '100%',
            width: value != 0 && value < 5 ? `5%` : `${value}%`,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          colors={['#00e1a0', '#00b9b7']}
          start={{x: 0, y: 1}}
          end={{x: 0.5, y: 0.5}}>
          {/* <View
            style={{
              backgroundColor: '#fff',
              marginHorizontal: 4,
              paddingHorizontal: SmartScreenBase.smPercenWidth,
              borderRadius: SmartScreenBase.smPercenWidth * 2,
            }}>
            <Text
              style={{
                color: '#00b9b7',
                fontWeight: '600',
                fontSize: SmartScreenBase.smFontSize * 40,
              }}>
              {value}%
            </Text>
          </View> */}
        </LinearGradient>
      </View>
      <Text style={{color: Colors.NearBlack, fontFamily: FontBase.MyriadPro_Bold,fontSize: SmartScreenBase.smFontSize * 45}}>
          {value}%
        </Text>
    </View>
  );
};

const BtnCircle = ({onPress, uri}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnConCir}>
      <Image style={styles.btnCirle} source={{uri: uri}} />
    </TouchableOpacity>
  );
};

const Boss = React.memo(({question, soundChange, recording, isNotPlay,onAudio,allAudios,id}) => {

  const _soundSave = React.useRef(null);
  const _sound = React.useMemo(() => {
    if (!!_soundSave.current) {
      if(_soundSave.current.isPlaying()){
        _soundSave.current.stop();
      }
      _soundSave.current.release();
    }
    if (!question._quest.audio) return null;
    var sound = new Sound(question._quest.audio, api.domain, (e) => {
      if (e) {
        alert('Có lỗi khi tải file nghe, vui lòng thử lại sau!');
        return;
      }
      soundChange && soundChange(true);
      !isNotPlay &&
        sound.play((su) => {
          LogBase.log("=====boss end 2")
          soundChange && soundChange(false);
        });
    });
    _soundSave.current = sound;
    onAudio&&onAudio('b-' + id + '-' + question.question_id,sound)
    return sound;
  }, [question]);

  React.useEffect(() => {
    return () => {
      // console.log('destroy boss')
      if (!!_sound) {
        if(_sound.isPlaying()){
          _sound.stop();
        }
        _sound.release();
      }
    };
  }, []);

  React.useEffect(() => {
    if (!!_sound && _sound.isPlaying() && recording) {
      _sound.stop();
    }
  }, [recording]);

  return (
    <TouchableOpacity
      onPress={() => {
        LogBase.log("=====issub",issub)
        if (!!_sound && _sound.isLoaded() && !_sound.isPlaying() && !recording && issub == 2) {
          soundChange && soundChange(true);
          if(allAudios){
            Object.keys(allAudios).forEach(e=>{
              if(e!= 'b-' + id +'-'+question.question_id){
                if(allAudios[e]&&allAudios[e].isPlaying()){
                  allAudios[e].stop()
                }
              }
            })
          }

          _sound.play((su) => {
            soundChange && soundChange(false);
          });
        }
      }}
      style={styles.bossCon}>
      <View style={styles.bossCon2}></View>
      <Text style={styles.title}>{question._quest.text}</Text>
    </TouchableOpacity>
  );
});

const Employee = React.memo(({question, soundChange, recordChange, checkRecording, isNotPlay,recordDone,onAudio,allAudios,id,stopBoss}) => {
  const [recording, setRecording] = React.useState(false);
  const [showRecord, setShowRecord] = React.useState(false);
  const _audioFile = React.useRef(isNotPlay ? question._mySound : null);
  const [result, setResult] = React.useState(question._results || null);
  const [loading, setLoading] = React.useState(false);
  const [viewingWord, setViewingWord] = React.useState(null);
  const [isShowPopup, setIsShowPopup] = React.useState(false);
  const user = useSelector((state) => state.AuthStackReducer.dataLogin);
  
  const _sound = React.useMemo(() => {
    if (!!_sound) {
      _sound.release();
    }
    if (!question._ans.audio) return null;
    var sound = new Sound(question._ans.audio, api.domain, (e) => {
      if (e) {
        alert('Có lỗi khi tải file nghe, vui lòng thử lại sau!');
        return;
      }
      soundChange && soundChange(true);
      !isNotPlay &&
        sound.play((su) => {
          setShowRecord(true);
          LogBase.log("=====sound Employee end")
          issub = 2
          soundChange && soundChange(false);
        });
    });
    !isNotPlay && (_audioFile.current = null);
    !isNotPlay && setResult(null);
    onAudio&&onAudio('s-' + id + '-' + question.question_id,sound)
    setLoading(null);
    return sound;
  }, [question]);

  const _mySound = React.useMemo(() => {
    if (!_audioFile.current || recording) return null;
    var sound = new Sound(_audioFile.current, null, (e) => {
      if (e) {
        alert('Có lỗi khi tải file nghe, vui lòng thử lại sau!');
        return;
      }
    });
    onAudio&&onAudio('m-'  + id + '-' +  question.question_id,sound)
    return sound;
  }, [recording]);

  React.useEffect(() => {
    initAudioPlayer(`speaking2_${question?.question_id}.wav`)
    setShowRecord(false);
  }, [question]);

  React.useEffect(() => {
    return () => {
      if(!!_sound){
        if(_sound.isPlaying()){
          _sound.stop();
        }
        _sound.release();
      }
      if(!!_mySound){
        if(_mySound.isPlaying()){
          _mySound.stop();
        }
        _mySound.release();
      }
      if(recording){
        AudioRecord.stop();
      }
    };
  }, []);

  const initAudioPlayer = (resource) => {
    AudioRecord.init({
      ...recordSetting.optionRecord,
      wavFile: resource,
    });
  }

  const stopByTime = async () => {
    if(AudioRecord._recording){
      _audioFile.current = await AudioRecord.stop();
      AudioRecord._recording = false;
      question._mySound = _audioFile.current;
      await sleep(200);
      Sound.setCategory('Playback');
      checkSound();
      //stop record
      setRecording(false);
      recordChange && recordChange(false);
    }
  }

const startRecoder = () => {

  if (!!_mySound && _mySound.isPlaying()) {
    _mySound.stop();
  }
  if (!!_sound && _sound.isPlaying()) {
    _sound.stop();
  }
  AudioRecord.start();
  //start record
  _audioFile.current = null;
  !isNotPlay && setResult(null);
  setRecording(true);
  recordChange && recordChange(true);
  AudioRecord._recording = true;
  
  curTime = setTimeout(() => {
    console.log("=====go recordPress")
    stopByTime()
  }, 15000)

}

  const recordPress = async () => {
    if (loading) return;
    if (recording) {
      _audioFile.current = await AudioRecord.stop();
      AudioRecord._recording = false;
      question._mySound = _audioFile.current;
      await sleep(200);
      Sound.setCategory('Playback');
      checkSound();
      //stop record
      setRecording(false);
      recordChange && recordChange(false);
    } else {
      curTime && clearTimeout(curTime)
      //check permission
        if(AudioRecord._recording)
            return;
        var isCanRun = true
        LogBase.log("=====recordPress 1",isCanRun)
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
                initAudioPlayer(`speaking2_${question?.question_id}.wav`)
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
                LogBase.log("=====recordPress 2",isCanRun)
                if(!MyData.recordAudioPer){
                  MyData.recordAudioPer = true
                  initAudioPlayer(`speaking2_${question?.question_id}.wav`)
                }
                startRecoder()
                break;
            case RESULTS.LIMITED:
                Alert.alert('Chú ý','Quyền thu âm bị hạn chế do đang có nhiều hơn 1 trình thu âm hoạt động')
                break;
            case RESULTS.DENIED:
                LogBase.log("=====recordPress 3",isCanRun)
                request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
                    LogBase.log("=====result 3",result)
                    if(result == RESULTS.GRANTED){
                        startRecoder()
                    }else{

                    }
                  });
                break;
            case RESULTS.BLOCKED:
                LogBase.log("=====recordPress 4",isCanRun)
                setIsShowPopup(true)
                break;
            }
        })
        .catch((error) => {
            // …
        });
      }
    }
  };
  const stopAll=()=>{
    if(!!_sound && _sound.isPlaying()){
      _sound.stop();
    }
    if(!!_mySound && _mySound.isPlaying()){
      _mySound.stop();
    }
  }
  const checkSound = () => {

  //  console.log(question._ans.text)

    setLoading(true);
    var reqData = [
      {
        name: 'file',
        filename: `speaking2_${Date.now()}_${question?.question_id}.wav`,
        data: RNFetchBlob.wrap(_audioFile.current),
      },
      {name: 'question_id', data: question.question_id},
      {name: 'text_compare', data: validWord(question._ans.text)},
      {name: 'skill', data: 'speaking'},
    ]
    apiBase
      .uploadFile(api.baseurl + api.compare_record, reqData)
      .then((r) => {
        //console.log(r)
        const data = JSON.parse(r);
        console.log("=====uploadFile req",reqData)
        if (data.status) {
          LogBase.log('=====uploadFile res', data.data);
          setResult(data.data);
          question._results = data.data;
        } else {
          data.msg && data.msg.length > 0 && Alert.alert("",data.msg);
        }
      })
      .catch((e) => {
        console.log(e);
         Alert.alert("","Dữ liệu chưa được lưu, vui lòng thử lại bài tập này sau");
      })
      .finally(() => {
        setLoading(false);
        recordDone && recordDone(true);
      });
  };

  const spellModal = () => {
    return(
      <Modal visible={true} animationType="slide" transparent={true}>
      <View style={styles.mdCon}>
        <View style={styles.mdCon2}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily:font.MyriadPro_Bold,
                flex: 1,
                fontSize: SmartScreenBase.smFontSize * 70,
                color:
                  viewingWord.grade === 'A'
                    ? 'green'
                    : viewingWord.grade === 'B'
                    ? 'orange'
                    : 'red',
                alignItems: 'center',
              }}>
              {stringUtils.validWord(viewingWord.text)}
            </Text>
            {/* <BtnCircle
              uri={'onlisten_again1'}
              onPress={() => {
                !!_mySound && _mySound.play();
              }}
            /> */}

            {/* <BtnCircle
              uri={'speak_sp2'}
              onPress={() => {
                !!_sound &&
                  _sound.play((su) => {
                    soundChange && soundChange(false);
                  });
              }}
            /> */}
          </View>
          <Slider value={parseInt(viewingWord.overall_score)} />
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: SmartScreenBase.smPercenWidth,
              borderBottomWidth: 1,
              borderBottomColor: '#dcdcdc',
              marginTop: SmartScreenBase.smPercenWidth * 2,
            }}>
            <Text style={[styles.lb, {flex: 1}]}>Phone</Text>
            <Text style={[styles.lb, {flex: 1}]}>Score</Text>
            <Text style={[styles.lb, {flex: 2}]}>Sound like</Text>
          </View>
          {!!viewingWord.list_phoneme_score &&
            viewingWord.list_phoneme_score.map((e, i) => {
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    marginTop: SmartScreenBase.smPercenWidth,
                  }}>
                  <Text
                    style={[styles.txt, {flex: 1, textAlign: 'center',fontFamily:font.MyriadPro_Bold,}]}>
                    {e.label}
                  </Text>
                  <Text
                    style={[styles.txt, {flex: 1, textAlign: 'center',fontFamily:font.MyriadPro_Bold,}]}>
                    {e.score}%
                  </Text>
                  <Text style={[styles.txt, {flex: 2, textAlign: 'center',fontFamily:font.MyriadPro_Bold,}]}>
                    {e.sounds_like}
                  </Text>
                </View>
              );
            })}
          <View
            style={{
              alignItems: 'center',
              marginTop: SmartScreenBase.smPercenWidth * 4,
            }}>
            <TouchableOpacity
              onPress={() => {
                if(_sound&&_sound.isPlaying()){
                  _sound.stop();
                }
                setViewingWord(null)
              }}
              style={stylesApp.Sty_ShortButton}>
              <Text style={stylesApp.Sty_Text_Button}>ĐÓNG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    )
  }

  return (
    <View style={{flexDirection: 'row'}}>
      {!isNotPlay && (
        <>
          {showRecord ? (
            <TouchableOpacity onPress={recordPress}>
              <Image
                style={{
                  width: SmartScreenBase.smPercenWidth * 18,
                  height: SmartScreenBase.smPercenWidth * 18,
                  resizeMode: 'contain',
                }}
                source={{
                  uri: recording
                    ? 'pronunication_01_10'
                    : 'lesson_vocab_image12',
                }}
              />
            </TouchableOpacity>
          ) : (
            <View style={{width: SmartScreenBase.smPercenWidth * 18}}></View>
          )}
        </>
      )}
      {!result ? (
        <TouchableOpacity
          onPress={() => {
            if(!checkRecording){
            console.log("=====go go go")
            stopBoss && stopBoss();
            console.log("=====go go go1")
            Object.keys(allAudios).forEach(e=>{
              if(e!= 's-'+ id +'-' +question.question_id){
                if(allAudios[e]&&allAudios[e].isPlaying()){
                  allAudios[e].stop()
                }
              }
            })
            if (!!_sound && _sound.isLoaded() && !_sound.isPlaying()) {
              soundChange && soundChange(true);
              _sound.play((su) => {
                LogBase.log("=====_sound end 3")
                setShowRecord(true);
                soundChange && soundChange(false);
              });
            }
          }
          }}
          style={styles.EmCon}>
          <View style={styles.EmCon2}></View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={styles.title2}>
              {question._ans.text}
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.EmCon,
            isNotPlay && {
              width: SmartScreenBase.smPercenWidth * 70,
            },
          ]}>
          <View style={styles.EmCon2}></View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: SmartScreenBase.smPercenWidth,
                }}>
                {result.list_word.map((e, i) => {
                  return (
                    <View 
                    // onPress={() => setViewingWord(e)} 
                    key={i}>
                      <Text
                        style={{
                          ...styles.title2,
                          marginRight:3,
                          color:
                            e.grade === 'A'
                              ? 'green'
                              : e.grade === 'B'
                              ? 'orange'
                              : 'red',
                        }}>
                        {e.text}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.result}>
                <BtnCircle
                  uri={'tv_tainghe'}
                  onPress={() => {
                    stopBoss && stopBoss();
                    if(!!_sound && _sound.isPlaying()){
                      _sound.stop();
                    }
                    !!_mySound && _mySound.play();
                    
                    if(allAudios){
                      Object.keys(allAudios).forEach(e=>{
                        if(e!= 'm-'+ id +'-' +question.question_id){
                          if(allAudios[e]&&allAudios[e].isPlaying()){
                            allAudios[e].stop()
                          }
                        }
                      })
                    }
                  }}
                />
                <BtnCircle
                  uri={'speak_sp2'}
                  onPress={() => {
                    stopBoss && stopBoss();
                    if(!!_mySound && _mySound.isPlaying()){
                      _mySound.stop();
                    }
                    !!_sound &&
                      _sound.play((su) => {
                        LogBase.log("=====_sound end 4")
                    });
                    if(allAudios){
                      Object.keys(allAudios).forEach(e=>{
                        if(e!= 's-' + id +'-'+question.question_id){
                          if(allAudios[e]&&allAudios[e].isPlaying()){
                            allAudios[e].stop()
                          }
                        }
                      })
                    }

                  }}
                />
                {isNotPlay && (
                  <BtnCircle
                    uri={
                      recording ? 'tv_recording2' : 'mic_sp2'
                    }
                    onPress={recordPress}
                  />
                )}
                <Text
                  style={{
                    ...stylesApp.txt_Title,
                    flex: 1,
                    color: '#00b9b7',
                    textAlign: 'right',
                  }}>
                  {result.overall_score}%
                </Text>
              </View>
            </>
          )}
        </View>
      )}
        <View style={{
                width: SmartScreenBase.smPercenWidth * 12,
                height: SmartScreenBase.smPercenWidth * 12,
                borderRadius: SmartScreenBase.smPercenWidth * 6,
                marginTop: -SmartScreenBase.smPercenWidth * 2,
                overflow: "hidden",
                }}>
                {LogBase.log("=====user.avatar",user.avatar)}
            <Image
            style={{
                width: SmartScreenBase.smPercenWidth * 12,
                height: SmartScreenBase.smPercenWidth * 12,
                resizeMode: 'cover',
                borderRadius:SmartScreenBase.smPercenWidth * 6}}
            source={{uri: user.avatar || 'lesson_speaking_image6'}}
        />
        </View>
      <SmPopup visible={isShowPopup} message={StudentGrammarJson.CallMicToRecoderError}
        confirmOnpress={() => {setIsShowPopup(false); Linking.openSettings()}} confirmText={CommonJson.Confirm} cancelText={CommonJson.Cancel} cancelOnpress={() => {setIsShowPopup(false)}}/>
      {/* {!!viewingWord && spellModal()} */}
    </View>
  );
});

// SpeakingD2

const Screen = ({dataContent,setIndexQuestion,saveLogLearning}) => {
  const {data_question} = dataContent;
  const [currentQ, setCurrentQ] = React.useState(0);
  const [soundPlaying, setSoundPlaying] = React.useState(false);
  const [showEmployee, setShowEmployee] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const [btnState, setBtnState] = React.useState(0);

  const [showLast, setShowLast] = React.useState(false);

  const listSound = React.useRef({});

  const _currentQ = React.useMemo(() => {
    if (currentQ >= data_question.length) return null;
    var res = data_question[currentQ].list_option[0];
    try{
    res.match_option_texts = res.match_option_text;
    res.option_texts = JSON.parse(res.option_text);
    res._quest = stringUtils.getRandomElFromArr(res.option_texts);
    res._ans = stringUtils.getRandomElFromArr(res.match_option_texts);
    }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    return res;
  }, [currentQ]);
  React.useEffect(()=>{
    issub = 1
    saveLogLearning([])
  },[])

  const soundBossChange = React.useCallback((s) => {
    console.log("=====soundBossChange")
    setSoundPlaying(s);
    if (!s) setShowEmployee(true);
  }, []);

  const stopBoss = () => {
    console.log("=====stopBoss")
    setSoundPlaying(false);
  };

  const recordChange = React.useCallback((s) => {
    console.log("=====recordChange")
    setRecording(s);
    s&&setBtnState(1);
    if(s){
      setSoundPlaying(false)
    }else{
    }
  }, []);
  const recordDone=React.useCallback(()=>{
    setBtnState(2);
  },[])
  const onAudio=(i,audio)=>{
    // console.log('onAudio',i)
    listSound.current[i] = audio;
  }
  const onNextPress = () => {
    issub = 1
    if (currentQ >= data_question.length - 1) {
      setShowLast(true);
      return;
    }
    setIndexQuestion(currentQ+1)
    setCurrentQ((curr) => curr + 1);
    setBtnState(0);
    setShowEmployee(false);
  };
  const onFinish=()=>{
    let data = data_question.map(e=>{
        var q = e.list_option[0];
        return {
            question_id: q.question_id,
            exercise_type: 'speaking',
            question_type: '2',
            question_score: q?._results?.overall_score/100,
            final_user_choice: 'harmful to your eyes',
            detail_user_turn: [
                {
                    num_turn: 1,
                    score: q?._results?.overall_score/100,
                    user_choice: 'harmful to your eyes',
                },
            ]
        }
    })
    console.log('=====saveLogLearning',data)
    saveLogLearning(data);
  }
  if (showLast) {
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <ScrollView style={{flex: 1,width:'100%'}}>
                <View style={styles.container}>
                {data_question.map((e, i) => {
                    return (
                    <View key={i} style={{marginVertical:SmartScreenBase.smPercenWidth}}>
                        <Boss
                        onAudio={onAudio}
                        allAudios={listSound.current}
                        id={'last'}
                         question={e.list_option[0]} isNotPlay />
                        <Employee
                        recordChange={recordChange}
                        question={e.list_option[0]}
                        isNotPlay
                        id={'last'}
                        onAudio={onAudio}
                        allAudios={listSound.current}
                        />
                    </View>
                    );
                })}
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={onFinish}
                disabled={recording}
                style={[stylesApp.Sty_Button,{marginVertical:SmartScreenBase.smPercenWidth*5}]}>
                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
            </TouchableOpacity>
        </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView style={{marginTop:SmartScreenBase.smBaseHeight,width:'100%'}}>
        <ImageBackground
          source={getGifts(_currentQ._quest.gender, soundPlaying)}
          imageStyle={styles.img}
          resizeMode="contain"
          style={styles.imgTop}></ImageBackground>
        <View style={{paddingVertical:SmartScreenBase.smPercenHeight,
              width:'100%',
              paddingHorizontal:SmartScreenBase.smPercenWidth*5
            }}>
          <Boss
            question={_currentQ}
            recording={recording}
            soundChange={soundBossChange}
            onAudio={onAudio}
            id={'first'}
            allAudios={listSound.current}
          />
          {showEmployee && (
            <Employee
              question={_currentQ}
              // soundChange={soundEmChange}
              checkRecording={recording}
              recordChange={recordChange}
              stopBoss={stopBoss}
              recordDone={recordDone}
              onAudio={onAudio}
              id={'first'}
              allAudios={listSound.current}
            />
          )}
        </View>
      </ScrollView>
      <View style={{
        alignItems:'center',
        paddingTop:SmartScreenBase.smPercenHeight*2,
        paddingBottom:SmartScreenBase.smPercenHeight*4,
      }}>
        <TouchableOpacity
            onPress={onNextPress}
            disabled={btnState <= 1}
            style={
              btnState <= 1
                ? stylesApp.Sty_Button_disable
                : stylesApp.Sty_Button
            }>
            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imgTop: {
    width: SmartScreenBase.smPercenWidth * 85,
    height: SmartScreenBase.smPercenHeight * 25,
    alignSelf:'center'
  },
  img: {
    borderRadius: SmartScreenBase.smBaseWidth * 20,
  },
  bossCon: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: SmartScreenBase.smPercenWidth*3,
    width: SmartScreenBase.smPercenWidth * 70,
    marginVertical: SmartScreenBase.smPercenWidth * 4,
    marginRight: SmartScreenBase.smPercenWidth * 10,
    borderRadius: SmartScreenBase.smPercenWidth * 2,
    position: 'relative',
    alignSelf:'flex-start'
  },
  bossCon2: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: -20,
    left: 20,
    borderLeftWidth: 20,
    borderTopWidth: 20,
    borderLeftColor: 'rgba(0,0,0,0.5)',
    borderTopColor: 'rgba(0,0,0,0)',
  },
  EmCon: {
    backgroundColor: '#fff',
    padding: SmartScreenBase.smPercenWidth*3,
    width: SmartScreenBase.smPercenWidth * 55,
    marginLeft: SmartScreenBase.smPercenWidth * 2,
    marginRight: SmartScreenBase.smPercenWidth * 5,
    borderTopLeftRadius: SmartScreenBase.smPercenWidth * 2,
    borderBottomRightRadius: SmartScreenBase.smPercenWidth * 2,
    borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 2,
    position: 'relative',
  },
  EmCon2: {
    width: SmartScreenBase.smPercenWidth * 5,
    height: SmartScreenBase.smPercenWidth * 5,
    position: 'absolute',
    top: 0,
    right: -SmartScreenBase.smPercenWidth * 4,
    borderRightWidth: SmartScreenBase.smPercenWidth * 5,
    borderTopWidth: SmartScreenBase.smPercenWidth * 5,
    borderRightColor: 'rgba(0,0,0,0)',
    borderTopColor: '#fff',
  },
  btnCirle: {
    width: SmartScreenBase.smPercenWidth * 10,
    height: SmartScreenBase.smPercenWidth * 10,
  },
  btnConCir: {
    width: SmartScreenBase.smPercenWidth * 10,
    height: SmartScreenBase.smPercenWidth * 10,
    borderRadius: SmartScreenBase.smPercenWidth * 5,
    backgroundColor: '#00b9b7',
    marginRight: 10,
  },
  result: {
    flexDirection: 'row',
    padding: SmartScreenBase.smPercenWidth,
    alignItems: 'center',
  },
  mdCon: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mdCon2: {
    width: SmartScreenBase.smPercenWidth * 90,
    backgroundColor: '#fff',
    padding: SmartScreenBase.smPercenWidth * 4,
    borderRadius: SmartScreenBase.smPercenWidth * 4,
  },
  lb: {
    fontSize: SmartScreenBase.smFontSize * 45,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txt: {
    fontSize: SmartScreenBase.smFontSize * 45,
    fontFamily:font.MyriadPro_Bold
  },
  title:{
    fontSize: SmartScreenBase.smFontSize * 50,
    color:'#fff',
    fontFamily:font.MyriadPro_Bold
  },
  title2:{
    fontSize: SmartScreenBase.smFontSize * 50,
    color:'#000',
    fontFamily:font.MyriadPro_Bold
  }
});
