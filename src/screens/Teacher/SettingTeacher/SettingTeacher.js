import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, ImageBackground, ScrollView, Alert} from 'react-native';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import ComponentSetting from './componentSetting';
import Loading from '../../../component/LoadingScreenFull';
import {typeBtn} from './type';
import {AppHeader} from '../../../componentBase/AppHeader';
import {BG} from '../../../assets/icon';
import {
  loadSettingApp,
  loadSettingAppParent,
  saveSettingApp,
} from '../../../ReduxStudent/actions/Student';
import {alertError, mapSettingApp} from '../../../utils';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {TextBox} from '../../../componentBase/TextBox';
import device from '../../../utils/device';
import LogBase from '../../../base/LogBase';
import MyData from '../../../component/MyData';
import API from '../../../API/APIConstant';
import APIBase from '../../../base/APIBase';
import { SmPopup } from '../../../componentBase/SmPopup';
import { StudentGrammarJson } from '../../../stringJSON/StudentGrammarJson';
import { CommonJson } from '../../../stringJSON';
const SettingTeacher = (props) => {
  const dispatch = useDispatch();
  //lưu dữ liệu từ api
  const {settingApp} = useSelector((state) => state.LoadAPIFunctionHV);
  //lưu device id
  const {deviceId} = useSelector((state) => state.AuthStackReducer);
  //lưu token teacher
  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
  //lưu trạng thái sound
  const [sound, setSound] = useState('');
  //lưu trạng thái ngôn gnuwx
  const [lang, setLang] = useState('');
  //lưu trạng thái thông tin app
  const [appInfo, setAppInfo] = useState('');
  //show popup delete acc
  const [isShowPopup, setIsShowPopup] = useState(false);
  //lưu trạng thái loading
  const [loading, setLoading] = useState(true);
  const {navigation} = props;

  //modify dữ liệu từ api
  const mapsSetting = useMemo(() => {
    return mapSettingApp(settingApp?.user_setting);
  }, [settingApp]);

  useEffect(() => {
    LogBase.log('settingApp 1', settingApp);
    setSound(mapsSetting?.sound);
    setLang(mapsSetting?.lang);
    setAppInfo(settingApp?.app_info);
  }, [mapsSetting, settingApp]);

  useEffect(() => {
    LogBase.log('settingApp 2', settingApp);
    setSound(mapsSetting?.sound);
  }, [mapsSetting?.sound]);
  useEffect(() => {
    didMount();
  }, [deviceId, didMount, dispatch]);

  //lấy dữ liệu từ api
  const didMount = useCallback(async () => {
    try {
      setLoading(true);
      console.log('deviceId12', deviceId);
      console.log('DataClass.jwt_token', dataLogin.jwt_token);
      if (deviceId) {
        console.log('dispatch');
        await dispatch(dataLogin?.role == 'teacher' ? loadSettingApp(deviceId, dataLogin.jwt_token) : loadSettingAppParent(deviceId, dataLogin.jwt_token));
      } else {
        alertError();
      }
    } catch (error) {
      alertError(() => navigation.goBack());
    } finally {
      setLoading(false);
    }
  }, [dataLogin.jwt_token, deviceId, dispatch, navigation]);

  //Quay lại màn hình trước
  const goBack = useCallback(() => {
    props.navigation.pop();
  }, [props.navigation]);

  //Xử lý khi bật tắt sound
  const checkSound = useCallback(async () => {
    LogBase.log("=====checkSound",sound)
    const newValue = sound?.value === '0' ? '1' : '0';
    await dispatch(
      saveSettingApp(
        [
          {
            setting_template_id: sound?.setting_template_id,
            value: newValue,
          },
        ],
        settingApp?.userDeviceId,
        dataLogin.jwt_token,
      ),
    );
    setSound({
      ...sound,
      value: newValue,
    });
    MyData.isDisableSound = newValue == 0 ? true : false
    LogBase.log("=====set isDisableSound", newValue)
  }, [dataLogin.jwt_token, dispatch, settingApp?.userDeviceId, sound]);

  const deleteAcc = async () => {
    try{
      var url = API.baseurl + API.deleteAcc
      var res = await APIBase.tokenAPI("put", url ,{
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    LogBase.log("=====deleteAcc",res)
      if(res.status){
        Alert.alert("Thông báo","Bạn đã xoá tài khoản thành công",[
          {text: 'Trở về', style: 'cancel', onPress: () => props.navigation.navigate("LoginScreen")}
      ])
      }else{
        Alert.alert("",res.msg)
      }
    }catch (error) {
      LogBase.log("=====error",error)
      Alert.alert("","Xoá tài khoản chưa thực hiện được, vui lòng thử lại sau")
    }
  }

  return (
    <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>
      {!loading ? (
        <>
          <AppHeader
            styleTitle={{fontSize: SmartScreenBase.smFontSize * 60}}
            title={'Cài đặt'}
            leftIconOnPress={goBack}
          />
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.viewTop}>
                <TextBox style={styles.titleNotification}>
                  Cài đặt chung
                </TextBox>
                <ComponentSetting
                  title="Hiệu ứng âm thanh"
                  status={sound?.value}
                  checkTrue={checkSound}
                  type={typeBtn.switch}
                  marginLeft
                  marginBottom
                />
                <ComponentSetting
                  disable={true}
                  title="Ngôn ngữ"
                  status={lang?.value}
                  type={typeBtn.language}
                  onPress={() =>
                    navigation.navigate('LanguageSetting', {
                      language: lang,
                      setLang: setLang,
                    })
                  }
                />
                <ComponentSetting
                  title="Đổi mật khẩu"
                  type={typeBtn.navigate}
                  onPress={() => navigation.navigate('ChangePassword')}
                />
                <ComponentSetting
                  title="Thông báo"
                  type={typeBtn.navigate}
                  onPress={() =>
                    navigation.navigate(dataLogin.role != 'parent' ?'SettingNotification' : 'SettingNotificationParent', {
                      user_setting: settingApp?.user_setting,
                    })
                  }
                />
                <View style={styles.hr} />
                <TextBox style={styles.titleNotification}>Giới thiệu</TextBox>
                <ComponentSetting
                  title="Về Sunday English"
                  image={'student_setting_image8'}
                  type={typeBtn.navigate}
                  onPress={() =>
                    navigation.navigate('SettingAbout', {
                      content: settingApp?.app_info?.intro_app,
                    })
                  }
                />
                <ComponentSetting
                  title="Chính sách và điều khoản sử dụng"
                  image={'student_setting_image8'}
                  type={typeBtn.navigate}
                  onPress={() =>
                    navigation.navigate('SettingPolicy', {
                      content: settingApp?.app_info?.policy,
                    })
                  }
                />
                <ComponentSetting
                  title="Liên hệ"
                  image={'student_setting_image8'}
                  type={typeBtn.navigate}
                  onPress={() => {
                    //LogBase.log("=====settingApp",settingApp);
                    navigation.navigate('SettingContact',{data_contact: settingApp?.data_contact})
                  }}
                />
                {/* <ComponentSetting
                  title="Hỗ trợ"
                  image={'student_setting_image8'}
                  type={typeBtn.navigate}
                  onPress={() =>
                    navigation.navigate('SettingSupport', {
                      content: settingApp?.app_info?.support,
                    })
                  }
                /> */}
                <ComponentSetting
                  title="Phiên bản"
                  image={'student_setting_image8'}
                  type={typeBtn.version}
                  status={device.getVersion()}
                />
                <ComponentSetting
                  title="Xoá tài khoản"
                  image={'student_setting_image8'}
                  type={typeBtn.navigate}
                  onPress={() => setIsShowPopup(true)}
                />
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <Loading />
      )}
      <SmPopup visible={isShowPopup} message={"Mọi dữ liệu và các gói học tập bạn đã mua sẽ bị mất, bạn có chắc chắn muốn xoá tài khoản?"}
        confirmOnpress={() => {setIsShowPopup(false); deleteAcc()}} 
        confirmText={CommonJson.Delete} cancelText={CommonJson.Cancel} cancelOnpress={() => setIsShowPopup(false)}/>
    </ImageBackground>
  );
};
export default SettingTeacher;
