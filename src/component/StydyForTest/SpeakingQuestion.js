import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Platform,
    PermissionsAndroid,
    Alert,
    Linking
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import AudioComponent from './AudioComponent';
import {ButtonMedium} from '../../commons/Button';
import font from '../../base/FontBase';
import recordSetting from '../../utils/recordSetting';
import MyData from '../MyData';

Sound.setCategory('Playback');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


const Component=({dataQuestion,timeOut,dataAnswer,dataAns,type,onRecording})=>{
    const [recording,setRecording] = React.useState(false);
    const [audioPath,setAudioPath] = React.useState(dataQuestion._audioPath);
    const [askAgin,setAskAgain] = React.useState(false);
    const data = dataQuestion.list_option[0]

    // const checkPermiss= async ()=>{
    //     if(Platform.OS==='android'){
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    //             {
    //               title: "Ứng dụng cần quyền truy cập mic",
    //               message:"Ứng dụng cần quyền truy cập mic",
    //               buttonNeutral: "Ask Me Later",
    //               buttonNegative: "Cancel",
    //               buttonPositive: "OK"
    //             }
    //         );
    //         if(granted!==PermissionsAndroid.RESULTS.GRANTED){
    //             Alert.alert('Thông báo', 'Ứng dụng ko có quyền truy cập Mic!',
    //                 [
    //                     {text: "Cho phép", onPress: () => Linking.openSettings()},
    //                     {text: "Đóng", onPress: () => console.log("OK Pressed")}
    //             ],
    //                 {cancelable: false}
    //             )
    //             return;
    //         }
    //     }
    // }

    React.useEffect(() => {
        initAudioPlayer(`Speaking_${dataQuestion?.question_id}_${Date.now()}.wav`)
        setAudioPath(dataQuestion._audioPath)
        setRecording(false)
        return()=>{
            AudioRecord.stop();
        }
    }, [dataQuestion]);
    const _startRecord=async()=>{

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
              initAudioPlayer(`Speaking_${dataQuestion?.question_id}_${Date.now()}.wav`)
            }
          }else{
            Alert.alert('Chú ý','Bạn vẫn chưa cấp quyền thu âm, vui lòng click đồng ý khi được hỏi xin quyền')
            return;
          }
      }

        onRecording&&onRecording(true)
        AudioRecord.start();
        setRecording(true)
    }
    const _recordPress=async()=>{
        if(recording){
            setRecording(false)
            const path = await AudioRecord.stop();
            dataQuestion._audioPath = path
            await sleep(200)
            onRecording&&onRecording(false)
            Sound.setCategory('Playback');
            setAudioPath(path)
        }else{
            // await checkPermiss();
            // if(dataQuestion._audioPath){
            //     setAskAgain(true);
            //     return
            // }
            _startRecord();
        }
    }

    const initAudioPlayer = (resource) => {
        AudioRecord.init({
          ...recordSetting.optionRecord,
          wavFile: resource,
        });
      }

    const _onDoAgain=()=>{
        setAskAgain(false)
        _startRecord();
    }
    return <View style={styles.container}>
        <Text style={styles.text}>Gợi ý:</Text>
        <Text style={styles.text}>{data?.hint}</Text>
        {
            !!audioPath&&<AudioComponent style={styles.audio} path={audioPath}/>
        }
        <TouchableOpacity
            onPress={_recordPress}
         style={styles.btnRc}>
            <Image source={{uri:recording?'pronunciation_1113':'pronunciation1114'}} 
            style={styles.btnRcImg}/>
        </TouchableOpacity>
        {
            askAgin&&!timeOut&&<Modal 
                visible={true} 
                animationType="slide"
                transparent={true}
                >
                <View style={styles.md}>
                    <View style={styles.mdView}>
                        <Text style={styles.txt}>
                            File thu âm bạn vừa thu
                        </Text>
                        <Text style={styles.txt}>
                            sẽ không được lưu!
                        </Text>
                        <Text style={styles.txt}>
                            Bạn có chắc chắn muốn thu âm lại?
                        </Text>
                        <View style={styles.footer}>
                            <ButtonMedium onPress={()=>setAskAgain(false)} isSmall outline title={'Huỷ'} />
                            <ButtonMedium onPress={_onDoAgain} isSmall title={'Đồng ý'}/>
                        </View>
                    </View>
                </View>
            </Modal>
        }
    </View>
}
const styles = StyleSheet.create({
  container: {},
  btnRc: {
    alignSelf: 'center',
    marginTop: SmartScreenBase.smPercenHeight * 4,
  },
  txt: {
    fontFamily: font.MyriadPro_Regular,
    fontSize: SmartScreenBase.smFontSize * 55,
    width: '100%',
    textAlign: 'center',
  },
  text: {
    fontSize: SmartScreenBase.smFontSize * 50,
    fontFamily: font.MyriadPro_Regular,
    marginTop: SmartScreenBase.smPercenHeight,
  },
  btnRcImg: {
    width: SmartScreenBase.smBaseWidth * 350,
    height: SmartScreenBase.smBaseWidth * 350,
  },
  mdView: {
    width: '90%',
    backgroundColor: '#fff',
    paddingVertical: SmartScreenBase.smPercenHeight * 4,
    borderRadius: SmartScreenBase.smPercenWidth * 4,
  },
  md: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
    marginTop: SmartScreenBase.smPercenHeight * 2,
  },
  audio:{
        marginTop:SmartScreenBase.smPercenHeight*6
    }
});
export default Component;