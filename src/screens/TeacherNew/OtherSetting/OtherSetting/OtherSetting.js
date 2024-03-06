import React from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  View,
  Image,
  Platform,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {MyButton} from '../../../../componentBase/Button';
import {MyLongMainButton} from '../../../../componentBase/LongMainButton';
import {CommonJson} from '../../../../stringJSON';
import {FontSize, FontWeight} from '../../../../styleApp/font';
import stylesApp from '../../../../styleApp/stylesApp';
import {OtherSettingMethod} from './OtherSetting.logic';
import {styles} from './OtherSetting.style';
import {ShortMainButton} from '../../../../componentBase/ShortMainButton';
import {SmPopup} from '../../../../componentBase/SmPopup/SmPopup';
import SmartScreenBase from '../../../../base/SmartScreenBase';

/**
 * Other Menu list
 * @param {Object} props props from redux and navigation
 * @returns {Component}
 */
const OtherSettingScreen = props => {
  let {
    AllFunction,
    AllFunctionParent,
    language,
    isShowLogout,
    setShowLogout,
    callLogOut,
  } = OtherSettingMethod(props);

  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

  /**
   * render function in menu
   * @param {object} item function of menu list
   * @param {number} index
   * @returns {Component}
   */
  const render_item = (item, index) => {
    return (
      <MyLongMainButton
        style={{
          marginLeft: SmartScreenBase.smPercenWidth * 3,
          marginRight: SmartScreenBase.smPercenWidth * 3,
          marginTop: SmartScreenBase.smPercenHeight * 3,
        }}
        onPress={() => {
          props.navigation.navigate(item.screen);
        }}
        text={item.name}
        image={item.image}
        textStyles={styles.txtBtn}
      />
    );
  };

  return (
    <ImageBackground
      source={{uri: 'bg_them'}}
      style={stylesApp.ImageBackGround}>
      <Image source={{uri: 'logo_gv'}} style={styles.imgLogo} />
      <View
        style={[
          styles.viewOption,
          {
            marginTop:
              Platform.OS == 'android' && SmartScreenBase.ratio <= 1.8
                ? SmartScreenBase.smPercenHeight * -3
                : SmartScreenBase.smPercenHeight * -1,
          },
        ]}>
        {dataLogin.role == 'parent'
          ? AllFunctionParent.map((item, key) => {
              return render_item(item, key);
            })
          : AllFunction.map((item, key) => {
              return render_item(item, key);
            })}
        <SmPopup
          visible={isShowLogout}
          contentStyles={{height: SmartScreenBase.smPercenWidth * 50}}
          cancelText={'Hủy'}
          confirmText={'Đồng ý'}
          message={'Bạn có muốn đăng xuất tài khoản không?'}
          cancelOnpress={() => {
            setShowLogout(false);
          }}
          confirmOnpress={() => {
            callLogOut();
          }}
        />
      </View>
      <View
        style={[
          styles.btnLay,
          {
            marginTop:
              Platform.OS == 'android' && SmartScreenBase.ratio <= 1.8
                ? SmartScreenBase.smPercenHeight * 0
                : SmartScreenBase.smPercenHeight * 5,
          },
        ]}>
        <ShortMainButton
          type={1}
          style={[styles.btnLogout]}
          widthType={'full'}
          text={language.FunctionTeacherScreen.LogoutBt}
          onPress={() => {
            setShowLogout(true);
          }}
        />
      </View>
    </ImageBackground>
  );
};
function mapStateToProps(state) {
  return {};
}
export const OtherSetting = connect(mapStateToProps)(OtherSettingScreen);
