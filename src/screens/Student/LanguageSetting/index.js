import React, {memo, useCallback, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../component/LoadingScreenFull';
import {AppHeader} from '../../../componentBase/AppHeader';
import {saveSettingApp} from '../../../ReduxStudent/actions/Student';
import {alertError, alertInfo} from '../../../utils';
import ComponentModal from '../../Teacher/ChangePassword/componentModal';
import {stylesHistory} from '../StudyForTest/styles';
import {useStyleLanguageSetting} from './styles';

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
  //todo: lấy ra language hiện tại
  const {language, setLanguage} = navigation.state.params;

  //todo: style màn hình hiện tại
  const styles = useStyleLanguageSetting();
  // todo: loading khi call api
  const [isLoading, setIsLoading] = useState(false);
  // todo: lấy ra setting app
  const {settingApp} = useSelector((state) => state.LoadAPIFunctionHV);
  // todo: Lưu trạng thái bật tắt message
  const [isVisible, setIsVisible] = useState(false);
  // todo: Lưu message error
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  // todo: quay lại màn hình trước
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // todo: call api  thay đổi ngôn ngữ
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
          saveSettingApp(jsonSetting, +settingApp.userDeviceId),
        );
        if (result?.status) {
          setLanguage({
            ...language,
            value: lang.key,
          });
          setError('Đổi ngôn ngữ thành công');
          setIsVisible(true);
        }
      } catch (e) {
        alertError();
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, language, setLanguage, settingApp.userDeviceId],
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
      {isLoading && (
        <View style={stylesHistory.loading}>
          <Loading />
        </View>
      )}
      {isVisible && renderModal()}
      <AppHeader
        title={'Ngôn ngữ'}
        styleTitle={styles.headerTitle}
        leftIconOnPress={goBack}
      />
      {langs.map((value, index) => {
        const onPress = () => {
          changeLanguage(value);
        };
        return (
          <TouchableOpacity {...{onPress}} key={index} style={styles.button}>
            <Text allowFontScaling={false} style={styles.lang}>
              {value.key} ({value.value})
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(_LanguageSetting);
