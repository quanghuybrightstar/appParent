import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  Platform,
  Easing,
} from 'react-native';
import styles from './style';
import Loading from '../../../component/LoadingScreenFull';
import {AppHeader} from '../../../componentBase/AppHeader';
import ComponentInput from './componentInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import ComponentModal from './componentModal';
import {BG} from '../../../assets/icon';
import {useDispatch} from 'react-redux';
import {dispatchChangePassword} from '../../../redux/actions/Setting';
import {MyButton} from '../../../componentBase/Button';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {ShortMainButton} from '../../../componentBase/ShortMainButton'

const ChangePassword = (props) => {
  const dispatch = useDispatch();

  // đã đủ thông tin để hiện button chưa
  const [isActiveButton, setIsActiveButton] = useState(false);

  // Lưu trạng thái loading
  const [loading, setLoading] = useState(false);
  // Lưu message error
  const [error, setError] = useState({
    status: false,
    msg: '',
  });
  // Lưu trạng thái bật tắt message
  const [isVisible, setIsVisible] = useState(false);

  // chạy khi ấn lưu
  const _onSave = useCallback(
    async (values) => {
      try {
        const {oldPass, newPass, confirmPass} = values;
        if (
          oldPass.trim() === '' ||
          newPass.trim() === '' ||
          confirmPass.trim() === ''
        ) {
          setError({
            status: false,
            msg: 'Mật khẩu cần tối thiểu 6 kí tự và không gồm toàn dấu cách.',
          });
          setIsVisible(true);
          return;
        }
        if (newPass.length < 6) {
          setError({
            status: false,
            msg: 'Mật khẩu mới có ít nhất 6 ký tự.',
          });
          setIsVisible(true);
          return;
        }
        if (newPass !== confirmPass) {
          setError({
            status: false,
            msg: 'Mật khẩu bạn nhập không trùng khớp',
          });
          setIsVisible(true);
          return;
        }
        const body = {
          password: newPass,
          re_password: confirmPass,
          old_password: oldPass,
        };
        setLoading(true);
        const res = await dispatch(dispatchChangePassword(body));
        console.log('res', res);
        setError({
          status: res?.data?.status,
          msg: res?.data?.msg,
        });
        setIsVisible(true);
      } catch (e) {
        setError('Đổi mật khẩu thất bại');
        console.log('e', e);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  // Quay lại màn hình cũ
  const goBack = useCallback(() => {
    props.navigation.pop();
  }, [props.navigation]);

  const data = {
    oldPass: '',
    newPass: '',
    confirmPass: '',
  };

  // kiểm tra nhập đủ text chưa
  const checkText = (textData) => {
    console.log("=====textData",textData)
    if(textData.oldPass.length > 0 && textData.newPass.length > 0 && textData.confirmPass.length > 0){
      if(!isActiveButton){
        setIsActiveButton(true)
      }
    }else{
      if(isActiveButton){
        setIsActiveButton(false)
      }
    }
  };

  // đóng message modal
  const onClose = useCallback(() => {
    setIsVisible(false);
    if (error.status) {
      goBack();
    }
  }, [error.status, goBack]);

  // hiển thị modal message
  const renderModal = useCallback(() => {
    return (
      <ComponentModal
        isVisible={isVisible}
        onClose={onClose}
        message={error.msg}
      />
    );
  }, [error, isVisible, onClose]);

  // ẩn bàn phím
  const hideKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <>
      {isVisible && renderModal()}
      <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>
        <AppHeader
          title={'Đổi mật khẩu'}
          leftIconOnPress={goBack}
          styleTitle={styles.title2}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1}}
          onPress={hideKeyboard}>
          <>
            {!loading ? (
              <Formik initialValues={data} onSubmit={_onSave}>
                {({values, handleChange, submitForm}) => (
                  <Animated.View>
                    {checkText(values)}
                    <KeyboardAwareScrollView
                      keyboardShouldPersistTaps={'handled'}
                      contentContainerStyle={{
                        justifyContent: 'space-between',
                        height:
                          Platform.OS === 'android'
                            ? SmartScreenBase.smPercenHeight * 90
                            : '100%',
                      }}
                      style={
                        {
                          // backgroundColor: 'red',
                        }
                      }
                      showsVerticalScrollIndicator={false}>
                      <View style={styles.container}>
                        <View style={styles.viewTop}>
                          <ComponentInput
                            handleChange={handleChange('oldPass')}
                            placeholder="Mật khẩu cũ"
                          />
                          <ComponentInput
                            handleChange={handleChange('newPass')}
                            placeholder="Mật khẩu mới"
                          />
                          <ComponentInput
                            handleChange={handleChange('confirmPass')}
                            placeholder="Nhập lại mật khẩu mới"
                          />
                        </View>
                      </View>
                      <View style={styles.viewBottomContainer}>
                        <ShortMainButton
                          text={"Xác nhận"}
                          type={1}
                          widthType={'full'}
                          isDisabled={!isActiveButton}
                          onPress={submitForm}/>
                      </View>
                    </KeyboardAwareScrollView>
                  </Animated.View>
                )}
              </Formik>
            ) : (
              <Loading />
            )}
          </>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
};
export default ChangePassword;
