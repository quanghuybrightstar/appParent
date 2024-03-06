import React, {memo, useCallback, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';
import Loading from '../../../component/LoadingScreenFull';
import {AppHeader} from '../../../componentBase/AppHeader';
import {TextBox} from '../../../componentBase/TextBox';
import {saveSettingApp} from '../../../ReduxStudent/actions/Student';
import {alertError, alertInfo} from '../../../utils';
import ComponentModal from '../ChangePassword/componentModal';
import {useStyleLanguageSetting} from './styles';
import APIBase from '../../../base/APIBase';

const langs = [
  {
    key: 'vi',
    value: 'Tiếng Việt',
  },
  {
    key: 'en',
    value: 'Tiếng Anh',
  },
];
const _LanguageSetting = ({navigation}) => {
  console.log('navigation.state.params', navigation.state.params);
  //todo: lấy ra language hiện tại
  const {language, setLang} = navigation.state.params;

  //todo: style màn hình hiện tại
  const styles = useStyleLanguageSetting();
  // todo: loading khi call api
  const [isLoading, setIsLoading] = useState(false);
  // todo: lấy ra setting app
  const {settingApp} = useSelector((state) => state.LoadAPIFunctionHV);
  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
  // todo: Lưu trạng thái bật tắt message
  const [isVisible, setIsVisible] = useState(false);
  // todo: Lưu message error
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  // todo: quay lại màn hình trước
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const changeLanguage = useCallback(
    async (lang) => {
      try {
        setIsLoading(true);
        const jsonSetting = [
          {
            setting_template_id: language?.setting_template_id,
            value: lang.key,
          },
        ];
        const result = await dispatch(
          saveSettingApp(
            jsonSetting,
            +settingApp?.userDeviceId,
            APIBase.jwt_token,
          ),
        );
        if (result?.status) {
          setLang({
            ...language,
            value: lang.key,
          });
          setError('Đổi ngôn ngữ thành công');
          setIsVisible(true);
        }
      } catch (e) {
        console.log('error', error);
        alertError();
      } finally {
        setIsLoading(false);
      }
    },
    [
      dataLogin.jwt_token,
      dispatch,
      error,
      language,
      setLang,
      settingApp?.userDeviceId,
    ],
  );

  // todo: đóng message modal
  const onClose = useCallback(() => {
    setIsVisible(false);
    goBack();
  }, [goBack]);

  // todo: hiển thị modal message
  const renderModal = useCallback(() => {
    return (
      <ComponentModal isVisible={isVisible} onClose={onClose} message={error} />
    );
  }, [error, isVisible, onClose]);

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      {isVisible && renderModal()}

      <AppHeader title={'Ngôn ngữ'} leftIconOnPress={goBack} />
      {langs?.map((value, index) => {
        const onPress = () => {
          changeLanguage(value);
        };
        return (
          <TouchableOpacity {...{onPress}} key={index} style={styles.button}>
            <TextBox
              style={{
                fontSize: SmartScreenBase.smFontSize * 50,
                fontFamily: FontBase.MyriadPro_Regular,
              }}>
              {value.key} ({value.value})
            </TextBox>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(_LanguageSetting);
