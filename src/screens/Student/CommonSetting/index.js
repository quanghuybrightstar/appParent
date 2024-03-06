import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Text, ImageBackground, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BG} from '../../../assets/icon';
import {AppHeader} from '../../../componentBase/AppHeader';
import Introduction from '../../../componentBase/CommonSetting/Introduction';
import {typeBtn} from '../../Teacher/SettingNotification/type';
import {useStyleSettingStudent} from './styles';
import {alertError, comfirm, mapSettingApp} from '../../../utils';
import Loading from '../../../component/LoadingScreenFull';
import {
  loadSettingApp,
  saveSettingApp,
} from '../../../ReduxStudent/actions/Student';
import {ActionLogin} from '../../../redux/actions/ActionLogin';
import ComponentSetting from '../../Teacher/SettingTeacher/componentSetting';
import _ from 'lodash';
import LogBase from '../../../base/LogBase';
import MyData from '../../../component/MyData';

const _CommonSetting = ({navigation}) => {
  //todo: lấy device id của app
  const {deviceId} = useSelector((state) => state.AuthStackReducer);
  //todo: lấy setting app từ store
  const {settingApp} = useSelector((state) => state.LoadAPIFunctionHV);
  //todo: style của app
  const styles = useStyleSettingStudent();
  const dispatch = useDispatch();
  // todo: loading khi call api
  const [isLoading, setIsLoading] = useState(false);
  // todo: lưu lại thông tin của sound
  const [sound, setSound] = useState('');
  // todo: lưu lại thông tin của bài tập mới
  const [newExcercise, setNewExcercise] = useState('');
  // todo: lưu lại thông tin của bài tập đc chấm chữa
  const [teacherMarkExcercise, setTeacherMarkExcercise] = useState('');
  // todo: lưu lại thông tin của bài tập đc nhắc nhở
  const [remindLerning, setRemindLerning] = useState('');
  // todo: lưu lại thông tin của báo cáo
  const [newReport, setNewReport] = useState('');
  // todo: lưu lại thông tin của giáo viên khi cập nhật giáo trình
  const [teacherEditCurriculum, setTeacherEditCurriculum] = useState('');
  // todo: lưu lại thông tin của thông báo mới
  const [newMessage, setNewMessage] = useState('');
  // todo: lưu lại thông tin của ngôn ngữ
  const [language, setLanguage] = useState('');

  // todo: map thông tin setting để đổ lên UI
  const mapsSetting = useMemo(() => {
    return mapSettingApp(settingApp?.user_setting);
  }, [settingApp]);

  // todo: quay lại màn hình trước
  const goBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  // todo: đi sang màn đổi mật khẩu
  const onNavigateChangePassword = useCallback(() => {
    navigation.navigate('ChangePassword');
  }, [navigation]);

  // todo: khi api hết hạn phiên đăng nhập thì logout
  const onLogOut = useCallback(() => {
    comfirm(
      'Đăng xuất',
      'Phiên đăng nhập hết hạn! Bạn có muốn đăng xuất tài khoản không?',
      async () => {
        dispatch(ActionLogin({}));
        navigation.navigate('LoginApp');
      },
    );
  }, [dispatch, navigation]);
  /**-----------------------
   * *       didMount
   *  load when init screen
   *
   *------------------------**/
  const didMount = useCallback(async () => {
    try {
      setIsLoading(true);
      if (deviceId) {
        const result = await dispatch(loadSettingApp(deviceId));
        if (result.logout) {
          onLogOut();
        }
      } else {
        alertError();
      }
    } catch (error) {
      alertError();
    } finally {
      setIsLoading(false);
    }
  }, [deviceId, dispatch, onLogOut]);

  /**========================================================================
   **                           saveSetting
   *?  lưu cài đặt thay đổi
   *@param type type of setting
   *@param newValue changed value
   *========================================================================**/
  const saveSetting = useCallback(
    _.debounce(
      async (type, jsonSetting, newValue) => {
        try {
          switch (type) {
            case 'sound':
              await dispatch(
                saveSettingApp(jsonSetting, settingApp.userDeviceId),
              );
              setSound({
                ...sound,
                value: newValue,
              });
              MyData.isDisableSound = newValue == 0 ? true : false
              LogBase.log("=====set isDisableSound", newValue)
              break;
            case 'newExcercise':
              await dispatch(
                saveSettingApp(jsonSetting, +settingApp.userDeviceId),
              );
              setNewExcercise({
                ...newExcercise,
                value: newValue,
              });
              break;
            case 'teacherMarkExcercise':
              await dispatch(
                saveSettingApp(jsonSetting, +settingApp.userDeviceId),
              );
              setTeacherMarkExcercise({
                ...teacherMarkExcercise,
                value: newValue,
              });
              break;
            case 'remindLerning':
              await dispatch(
                saveSettingApp(jsonSetting, +settingApp.userDeviceId),
              );
              setRemindLerning({
                ...remindLerning,
                value: newValue,
              });
              break;
            case 'newReport':
              await dispatch(
                saveSettingApp(jsonSetting, +settingApp.userDeviceId),
              );
              setNewReport({
                ...newReport,
                value: newValue,
              });
              break;
            case 'teacherEditCurriculum':
              await dispatch(
                saveSettingApp(jsonSetting, +settingApp.userDeviceId),
              );
              setTeacherEditCurriculum({
                ...teacherEditCurriculum,
                value: newValue,
              });
              break;
            case 'newMessage':
              await dispatch(
                saveSettingApp(jsonSetting, +settingApp.userDeviceId),
              );
              setNewMessage({
                ...newMessage,
                value: newValue,
              });
              break;

            default:
              break;
          }
        } catch (error) {
          console.log(
            '🛠 LOG: 🚀 --> --------------------------------------------------------',
          );
          console.log(
            '🛠 LOG: 🚀 --> ~ file: index.js ~ line 86 ~ error',
            error,
          );
          console.log(
            '🛠 LOG: 🚀 --> --------------------------------------------------------',
          );
          alertError();
        } finally {
        }
      },
      2000,
      {leading: true, trailing: false},
    ),
    [
      dispatch,
      newExcercise,
      newMessage,
      newReport,
      remindLerning,
      settingApp?.userDeviceId,
      sound,
      teacherEditCurriculum,
      teacherMarkExcercise,
    ],
  );

  /**-----------------------
   * *       checkSound
   *  change setting sound
   *
   *------------------------**/
  const checkSound = useCallback(() => {
    const newValue = sound?.value === '0' ? '1' : '0';
    saveSetting(
      'sound',
      [
        {
          setting_template_id: sound?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [saveSetting, sound?.setting_template_id, sound?.value]);

  /**-----------------------
   * *       checkNewExcercise
   *  change setting NewExcercise
   *
   *------------------------**/
  const checkNewExcercise = useCallback(() => {
    const newValue = newExcercise?.value === '0' ? '1' : '0';
    saveSetting(
      'newExcercise',
      [
        {
          setting_template_id: newExcercise?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [newExcercise?.setting_template_id, newExcercise?.value, saveSetting]);

  /**-----------------------
   * *       checkTeacherMarkExercise
   *  change setting TeacherMarkExercise
   *
   *------------------------**/
  const checkTeacherMarkExercise = useCallback(() => {
    const newValue = teacherMarkExcercise?.value === '0' ? '1' : '0';
    saveSetting(
      'teacherMarkExcercise',
      [
        {
          setting_template_id: teacherMarkExcercise?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [
    saveSetting,
    teacherMarkExcercise?.setting_template_id,
    teacherMarkExcercise?.value,
  ]);

  /**-----------------------
   * *       checkRemindLearning
   *  change setting RemindLearning
   *
   *------------------------**/
  const checkRemindLearning = useCallback(() => {
    const newValue = remindLerning?.value === '0' ? '1' : '0';
    saveSetting(
      'remindLerning',
      [
        {
          setting_template_id: remindLerning?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [remindLerning?.setting_template_id, remindLerning?.value, saveSetting]);

  /**-----------------------
   * *       checkNewReport
   *  change setting NewReport
   *
   *------------------------**/
  const checkNewReport = useCallback(() => {
    const newValue = newReport?.value === '0' ? '1' : '0';
    saveSetting(
      'newReport',
      [
        {
          setting_template_id: newReport?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [newReport?.setting_template_id, newReport?.value, saveSetting]);

  /**-----------------------
   * *       checkTeacherEditCurriculum
   *  change setting TeacherEditCurriculum
   *
   *------------------------**/
  const checkTeacherEditCurriculum = useCallback(() => {
    const newValue = teacherEditCurriculum?.value === '0' ? '1' : '0';
    saveSetting(
      'teacherEditCurriculum',
      [
        {
          setting_template_id: teacherEditCurriculum?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [
    saveSetting,
    teacherEditCurriculum?.setting_template_id,
    teacherEditCurriculum?.value,
  ]);

  /**-----------------------
   * *       checkNewMessage
   *  change setting TeacherNewMessage
   *
   *------------------------**/
  const checkNewMessage = useCallback(() => {
    const newValue = newMessage?.value === '0' ? '1' : '0';
    saveSetting(
      'newMessage',
      [
        {
          setting_template_id: newMessage?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [newMessage?.setting_template_id, newMessage?.value, saveSetting]);

  /**-----------------------
   * *       checkLanguage
   *  change setting Language
   *
   *------------------------**/
  const checkLang = useCallback(() => {
    language && navigation.navigate('LanguageSetting', {language, setLanguage});
  }, [language, navigation]);

  console.log('language.Changed', language);

  useEffect(() => {
    didMount();
  }, [deviceId, didMount, dispatch, navigation]);

  /**=======================
   * *       set info settings
   *
   *
   *========================**/
  useEffect(() => {
    setSound(mapsSetting?.sound);
    setNewExcercise(mapsSetting?.new_exercise);
    setTeacherMarkExcercise(mapsSetting?.teacher_mark_exercise);
    setRemindLerning(mapsSetting?.remind_learning);
    setNewReport(mapsSetting?.new_report);
    setTeacherEditCurriculum(mapsSetting?.teacher_edit_curriculum);
    setNewMessage(mapsSetting?.new_msg);
    setLanguage(mapsSetting?.lang);
  }, [mapsSetting]);

  return (
    <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>
      <AppHeader
        styleTitle={styles.titleHeader}
        title={'Cài đặt'}
        leftIconOnPress={goBack}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.viewTop}>
              <Text allowFontScaling={false} style={styles.titleNotification}>
                Cài đặt chung
              </Text>
              <ComponentSetting
                title="Hiệu ứng âm thanh"
                status={sound?.value}
                checkTrue={checkSound}
                statusType="WhenthereMessage"
                type={typeBtn.switch}
              />
              <ComponentSetting
                disable={true}
                title="Ngôn ngữ"
                status={language?.value}
                checkTrue={checkLang}
                statusType="AmicaMarkedComplete"
                type={typeBtn.language}
                onPress={checkLang}
              />
              <ComponentSetting
                title="Đổi mật khẩu"
                type={typeBtn.navigate}
                onPress={onNavigateChangePassword}
              />
              <View style={styles.hr} />
              <Text allowFontScaling={false} style={styles.titleNotification}>
                Thông báo
              </Text>
              <ComponentSetting
                title="Báo bài tập mới được giao"
                status={newExcercise?.value}
                checkTrue={checkNewExcercise}
                type={typeBtn.switch}
              />
              <ComponentSetting
                title="Báo bài tập được chấm, chữa"
                status={teacherMarkExcercise?.value}
                type={typeBtn.switch}
                checkTrue={checkTeacherMarkExercise}
              />
              <ComponentSetting
                title="Nhắc nhở học tập"
                status={remindLerning?.value}
                checkTrue={checkRemindLearning}
                type={typeBtn.switch}
              />
              <ComponentSetting
                title="Báo cáo học tập mới"
                status={newReport?.value}
                checkTrue={checkNewReport}
                type={typeBtn.switch}
              />
              <ComponentSetting
                title="Khi giáo viên cập nhật giáo trình"
                status={teacherEditCurriculum?.value}
                checkTrue={checkTeacherEditCurriculum}
                type={typeBtn.switch}
              />
              <ComponentSetting
                title="Báo tin nhắn mới"
                status={newMessage?.value}
                checkTrue={checkNewMessage}
                type={typeBtn.switch}
              />
              <View style={styles.hr} />
              <Introduction {...{navigation}} />
            </View>
          </View>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default memo(_CommonSetting);
