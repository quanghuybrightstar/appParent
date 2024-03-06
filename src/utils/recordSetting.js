// setting thu am

import { PermissionsAndroid, Platform } from "react-native";
import MyData from "../component/MyData";

const optionRecord = {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6,
    wavFile: '1.wav'
}

const checkPermission = async (initRecord) => {
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
          initRecord();
        }
      }else{
        Alert.alert('Chú ý','Bạn vẫn chưa cấp quyền thu âm, vui lòng click đồng ý khi được hỏi xin quyền')
        return;
      }
  }
}

export default {
    optionRecord,
    checkPermission
};