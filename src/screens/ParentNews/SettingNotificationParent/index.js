import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Text, ImageBackground, ScrollView} from 'react-native';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {typeBtn} from './type';
import {AppHeader} from '../../../componentBase/AppHeader';
import {BG} from '../../../assets/icon';
import {alertError, mapSettingApp} from '../../../utils';
import {
  loadSettingAppParent,
  saveSettingApp,
} from '../../../ReduxStudent/actions/Student';
import ComponentSetting from '../../Teacher/SettingTeacher/componentSetting';
import SmartScreenBase from '../../../base/SmartScreenBase';
import Loading from '../../../component/LoadingScreenFull';
import {TextBox} from '../../../componentBase/TextBox';
export const SettingNotificationParent = props => {
  const dispatch = useDispatch();
  const {settingApp} = useSelector(state => state.LoadAPIFunctionHV);

  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
  const {deviceId} = useSelector(state => state.AuthStackReducer);

  //Lưu dữ liệu sản phẩm mới
  const [newFeature, setNewFeature] = useState('');
  //Lưu dữ liệu khuyến mĩa
  const [newPromotion, setNewPromotion] = useState('');
  //Lưu dữ liệu tin nhắn mới
  const [newMsg, setNewMsg] = useState('');
  //Lưu dữ liệu hs xin vào lớp
  const [studentReq, setStudentReq] = useState('');
  //Lưu dữ liệu hs thêm vào lớp
  const [studentApproved, setStudentApproved] = useState('');
  //Lưu dữ liệu hs hoàn thành bt
  const [studentComplete, setStudentComplete] = useState('');
  //Lưu dữ liệu hs quá hạn
  const [studentExpired, setStudentExpired] = useState('');
  //Lưu dữ liệu số bài chấm
  const [numberExercise, setNumberExercise] = useState('');
  //Lưu dữ liệu giáo trình mới
  const [newCurriculum, setNewCurriculum] = useState('');
  //Lưu trạng thái loading
  const [loading, setLoading] = useState(true);
  const {navigation} = props;

  //modify dữ liệu từ api
  const mapsSetting = useMemo(() => {
    return mapSettingApp(settingApp?.user_setting);
  }, [settingApp?.user_setting]);

  //lưu dữ liệu sau khi modify
  useEffect(() => {
    setNewFeature(mapsSetting?.new_feature);
    setNewPromotion(mapsSetting?.new_promotion);
    setNewMsg(mapsSetting?.new_msg);
    setStudentReq(mapsSetting?.student_request);
    setStudentApproved(mapsSetting?.student_approved);
    setStudentComplete(mapsSetting?.student_complete_exercise);
    setStudentExpired(mapsSetting?.student_expired);
    setNumberExercise(mapsSetting?.number_exercise_pending);
    setNewCurriculum(mapsSetting?.new_curriculum);
  }, [mapsSetting]);

  //chạy lần đầu để lấy dữ liệu từ api
  useEffect(() => {
    didMount();
  }, [deviceId, didMount, dispatch]);

  //lấy dữ liệu từ api
  const didMount = useCallback(async () => {
    try {
      setLoading(true);
      console.log('deviceId', deviceId);
      if (deviceId) {
        await dispatch(loadSettingAppParent(deviceId, dataLogin.jwt_token));
      } else {
        alertError();
      }
    } catch (error) {
      alertError(() => navigation.goBack());
    } finally {
      setLoading(false);
    }
  }, [dataLogin.jwt_token, deviceId, dispatch, navigation]);

  console.log('studentExpired', studentExpired);
  console.log('numberExercise', numberExercise);

  //xử lý khi ấn bật tắt switch
  const saveSetting = useCallback(
    async (type, jsonSetting, newValue) => {
      console.log('type', type);
      console.log('jsonSetting', jsonSetting);
      console.log('newValue', newValue);
      try {
        switch (type) {
          case 'newFeature':
            await dispatch(
              saveSettingApp(
                jsonSetting,
                +settingApp.userDeviceId,
                dataLogin.jwt_token,
              ),
            );
            setNewFeature({
              ...newFeature,
              value: newValue,
            });
            break;
          case 'newPromotion':
            await dispatch(
              saveSettingApp(
                jsonSetting,
                +settingApp.userDeviceId,
                dataLogin.jwt_token,
              ),
            );
            setNewPromotion({
              ...newPromotion,
              value: newValue,
            });
            break;
          case 'newMsg':
            await dispatch(
              saveSettingApp(
                jsonSetting,
                +settingApp.userDeviceId,
                dataLogin.jwt_token,
              ),
            );
            setNewMsg({
              ...newMsg,
              value: newValue,
            });
            break;
          case 'studentReq':
            await dispatch(
              saveSettingApp(
                jsonSetting,
                +settingApp.userDeviceId,
                dataLogin.jwt_token,
              ),
            );
            setStudentReq({
              ...studentReq,
              value: newValue,
            });
            break;
          case 'studentApproved':
            await dispatch(
              saveSettingApp(
                jsonSetting,
                +settingApp.userDeviceId,
                dataLogin.jwt_token,
              ),
            );
            setStudentApproved({
              ...studentApproved,
              value: newValue,
            });
            break;
          case 'studentExpired':
            await dispatch(
              saveSettingApp(
                jsonSetting,
                +settingApp.userDeviceId,
                dataLogin.jwt_token,
              ),
            );
            setStudentExpired({
              ...studentExpired,
              value: newValue,
            });
            break;
          case 'studentComplete':
            await dispatch(
              saveSettingApp(
                jsonSetting,
                +settingApp.userDeviceId,
                dataLogin.jwt_token,
              ),
            );
            setStudentComplete({
              ...studentComplete,
              value: newValue,
            });
            break;
          case 'numberExercise':
            await dispatch(
              saveSettingApp(
                jsonSetting,
                +settingApp.userDeviceId,
                dataLogin.jwt_token,
              ),
            );
            setNumberExercise({
              ...numberExercise,
              value: newValue,
            });
            break;
          case 'newCurriculum':
            await dispatch(
              saveSettingApp(
                jsonSetting,
                +settingApp.userDeviceId,
                dataLogin.jwt_token,
              ),
            );
            setNewCurriculum({
              ...newCurriculum,
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
        console.log('🛠 LOG: 🚀 --> ~ file: index.js ~ line 86 ~ error', error);
        console.log(
          '🛠 LOG: 🚀 --> --------------------------------------------------------',
        );
        alertError();
      } finally {
      }
    },
    [
      dispatch,
      newFeature,
      newPromotion,
      newMsg,
      studentReq,
      settingApp?.userDeviceId,
      studentApproved,
      studentExpired,
      studentComplete,
      numberExercise,
      newCurriculum,
      dataLogin,
    ],
  );

  //ấn bật tắt sản phẩm mới
  const checkNewFuture = useCallback(() => {
    const newValue =
      !newFeature?.value || newFeature?.value === '0' ? '1' : '0';
    saveSetting(
      'newFeature',
      [
        {
          setting_template_id: newFeature?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [newFeature, saveSetting]);

  //ấn bật tắt khuyến mãi mới
  const checkNewPromotion = useCallback(() => {
    const newValue =
      !newPromotion?.value || newPromotion?.value === '0' ? '1' : '0';
    saveSetting(
      'newPromotion',
      [
        {
          setting_template_id: newPromotion?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [newPromotion, saveSetting]);

  //ấn bật tắt hs xin vào lớp
  const checkStudentReq = useCallback(() => {
    const newValue =
      !studentReq?.value || studentReq?.value === '0' ? '1' : '0';
    saveSetting(
      'studentReq',
      [
        {
          setting_template_id: studentReq?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [saveSetting, studentReq]);

  //ấn bật tắt tin nhắn mới
  const checkNewMsg = useCallback(() => {
    const newValue = !newMsg?.value || newMsg?.value === '0' ? '1' : '0';
    saveSetting(
      'newMsg',
      [
        {
          setting_template_id: newMsg?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [newMsg, saveSetting]);

  //ấn bật tắt hs hoàn thành bài tập
  const checkStudentComplete = useCallback(() => {
    console.log('studentComplete', studentComplete);
    const newValue =
      !studentComplete?.value || studentComplete?.value === '0' ? '1' : '0';
    saveSetting(
      'studentComplete',
      [
        {
          setting_template_id: studentComplete?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [saveSetting, studentComplete]);

  //ấn bật tắt hs quá hạn
  const checkStudentExpired = useCallback(() => {
    const newValue =
      !studentExpired?.value || studentExpired?.value === '0' ? '1' : '0';
    saveSetting(
      'studentExpired',
      [
        {
          setting_template_id: studentExpired?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [saveSetting, studentExpired]);

  //Tăng giảm sl hs quá hạn
  const onPressStudentExpired = useCallback(
    sub_value => {
      const newValue = '1';
      saveSetting(
        'studentExpired',
        [
          {
            setting_template_id: studentExpired?.setting_template_id,
            value: newValue,
            sub_value,
          },
        ],
        newValue,
      );
    },
    [saveSetting, studentExpired],
  );

  //ấn bật tắt số bài cần chấm
  const checkNumberExercise = useCallback(() => {
    const newValue =
      !numberExercise?.value || numberExercise?.value === '0' ? '1' : '0';
    saveSetting(
      'numberExercise',
      [
        {
          setting_template_id: numberExercise?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [numberExercise, saveSetting]);

  //tăng giảm số bài cần chấm
  const onPressNumberExercise = useCallback(
    sub_value => {
      console.log('sub_value', sub_value);
      const newValue = '1';
      saveSetting(
        'numberExercise',
        [
          {
            setting_template_id: numberExercise?.setting_template_id,
            value: newValue,
            sub_value,
          },
        ],
        newValue,
      );
    },
    [saveSetting, numberExercise],
  );

  //ấn bật tắt giáo trình mới
  const checkNewCurriculum = useCallback(() => {
    const newValue =
      !newCurriculum?.value || newCurriculum?.value === '0' ? '1' : '0';
    saveSetting(
      'newCurriculum',
      [
        {
          setting_template_id: newCurriculum?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [newCurriculum, saveSetting]);

  //ấn bật tắt hs quá hạn
  const checkStudentApproved = useCallback(() => {
    const newValue =
      !studentApproved?.value || studentApproved?.value === '0' ? '1' : '0';
    saveSetting(
      'studentApproved',
      [
        {
          setting_template_id: studentApproved?.setting_template_id,
          value: newValue,
        },
      ],
      newValue,
    );
  }, [saveSetting, studentApproved]);

  //quay về màn hình cũ
  const goBack = useCallback(() => {
    props.navigation.pop();
  }, [props.navigation]);

  return (
    <ImageBackground source={BG} style={{flex: 1}}>
      <AppHeader
        styleTitle={{fontSize: SmartScreenBase.smFontSize * 60}}
        title={'Thông báo'}
        leftIconOnPress={goBack}
      />
      {!loading ? (
        <ScrollView
          contentContainerStyle={{paddingBottom: 15}}
          showsVerticalScrollIndicator={false}>
          <>
            <View style={styles.container}>
              <View style={styles.viewTop}>
                <TextBox style={styles.titleNotification}>Tổng quan</TextBox>
                <ComponentSetting
                  title="Cập nhật sản phẩm mới, tính năng mới"
                  status={newFeature?.value}
                  checkTrue={checkNewFuture}
                  type={typeBtn.switch}
                />
                <ComponentSetting
                  title="Các chương trình khuyến mãi"
                  status={newPromotion?.value}
                  checkTrue={checkNewPromotion}
                  type={typeBtn.switch}
                />
                <ComponentSetting
                  title="Khi có tin nhắn mới"
                  status={newMsg?.value}
                  checkTrue={checkNewMsg}
                  type={typeBtn.switch}
                />
                <View style={styles.hr} />
                <TextBox style={styles.titleNotification}>Lớp học</TextBox>
                <ComponentSetting
                  title="Khi có yêu cầu liên kết"
                  image={'student_setting_image8'}
                  status={studentReq?.value}
                  checkTrue={checkStudentReq}
                  type={typeBtn.switch}
                />
                <ComponentSetting
                  title="Khi con đã hoàn thành hết bài tập được giao trong lớp"
                  image={'student_setting_image8'}
                  status={studentComplete?.value}
                  checkTrue={checkStudentComplete}
                  type={typeBtn.switch}
                />
                {/* <ComponentSetting
                  title="học sinh để quá hạn bài tập trên 1 bài"
                  image={'student_setting_image8'}
                  status={studentExpired?.value}
                  checkTrue={checkStudentExpired}
                  type={typeBtn.switch}
                  hasNumber
                  number={+studentExpired?.sub_value}
                  onPressSub={onPressStudentExpired}
                /> */}
                <View style={styles.hr} />
                <TextBox style={styles.titleNotification}>Chuyên môn</TextBox>
                <ComponentSetting
                  title="Bài cần chấm"
                  image={'student_setting_image8'}
                  status={numberExercise?.value}
                  type={typeBtn.switch}
                  checkTrue={checkNumberExercise}
                  hasNumber
                  number={+numberExercise?.sub_value}
                  onPressSub={onPressNumberExercise}
                />
                <View style={styles.hr} />
                <TextBox style={styles.titleNotification}>Giáo trình</TextBox>
                <ComponentSetting
                  title="Khi có giáo trình mới"
                  image={'student_setting_image8'}
                  status={newCurriculum?.value}
                  checkTrue={checkNewCurriculum}
                  type={typeBtn.switch}
                />
              </View>
            </View>
          </>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </ImageBackground>
  );
};
