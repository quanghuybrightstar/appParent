import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Modal,
    Keyboard,
    Text,
    Dimensions,
    Platform,
} from 'react-native';
import { ALERT_TYPE } from './index';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import { WIDTH_DESIGN } from '../../utils/configs';
import { ShortMainButton } from '../ShortMainButton';
const Baseheight = Dimensions.get('screen').height / 100;

interface LProps {
  onClose?: () => void;
  style?: any;
  visible?: boolean;
}

interface AlertStyle {
  color?: any;
  backgroundColor?: any;
}
export interface AstraAlertOptions {
  text: string;
  buttonStyle?: AlertStyle;
  onPress?: () => void;
  preventHideModal?: boolean;
}

export const zIndexAlert = 100000000;

const TIMEOUT = 300;

interface LState {
  visible: boolean;
  title?: String;
  message?: String;
  image?: any;
  success: boolean;
  accountExists: boolean;
  type: string;
  options?: AstraAlertOptions[];
  onClose?: () => void;
  callback?: () => void;
  hideIcon?: boolean;
}

export interface ShowModalOptions {
  callback?: () => void;
  success?: boolean;
  timeout?: number;
  hideKeyboard?: boolean;
  renderBottom: () => Component,
}

const showModalOptionsDefault = {
    callback: undefined,
    success: false,
    timeout: 100,
    hideKeyboard: false,
    renderBottom: undefined,
};
export const ShowAlertByTypeDefaltParams = {
    title: '',
    message: '',
    options: [],
    onClose: undefined,
    hideIcon: false,
    timeout: 0,
};

export default class BaseAlert extends React.PureComponent<LProps, LState> {
  state = {
      visible: false,
      title: '',
      message: '',
      success: false,
      type: ALERT_TYPE.DEFAULT,
      options: [],
      callback: () => {},
      hideIcon: false,
      renderBottom: undefined,
  };

  timeoutShowModal: any;
  timeoutCloseModal: any;

  showModal = (
      title: string,
      message: string,
      button: string,
      options: ShowModalOptions = showModalOptionsDefault
  ) => {
      //   console.log('showModal options: ', message);
      if (options.hideKeyboard) {
          Keyboard.dismiss();
      }

      if (this.timeoutShowModal) {
          clearTimeout(this.timeoutShowModal);
      }
      this.timeoutShowModal = setTimeout(() => {
          this.setState({
              title,
              message,
              button,
              success: options.success || false,
              visible: true,
              callback: options.callback,
              renderBottom: options.renderBottom,
          });
      }, TIMEOUT);
  };

  onClose = () => {
      let { callback } = this.state;
      if (callback) {
          if (this.timeoutCloseModal) {
              clearTimeout(this.timeoutCloseModal);
          }
          callback();
          this.timeoutCloseModal = setTimeout(() => {
              this.setState({
                  visible: false,
                  type: ALERT_TYPE.DEFAULT,
                  options: undefined,
                  callback: () => {},
              });
          }, TIMEOUT);
      } else {
          this.setState({
              visible: false,
              type: ALERT_TYPE.DEFAULT,
              options: undefined,
          });
      }
  };

  render() {
      let { visible } = this.state;
      return (
          <Modal
              animationType="fade"
              transparent={true}
              visible={visible}
              onRequestClose={this.nop}
          >
              <View style={styles.modalWrap}>
                  <StatusBar
                      translucent
                      backgroundColor={'transparent'}
                      barStyle="dark-content"
                  />
                  <TouchableOpacity
                    //   onPress={this.state.onClose || this.onClose}
                      onPress={() => {}}
                      style={styles.modalOverlay}
                      activeOpacity={1}
                  />
                  {this.renderModalContent()}
              </View>
          </Modal>
      );
  }

  renderModalContent = () => {
      let { title, message, success, button, renderBottom } = this.state;
      return (
          <View style={[styles.modalView]}>
              {!!title && (
                  <Text style={styles.title}>
                      {title || ''}
                  </Text>
              )}
              <Text style={styles.message}>
                  {message || ''}
              </Text>
              <View style={{marginTop: Baseheight * 3}}>
                  <ShortMainButton
                      widthType="mini"
                      onPress={() => {
                          if (button && button.onPress){
                              button.onPress();
                          }
                          this.state.onClose || this.onClose();
                      }}
                      text={(button && button.text) ? button.text : 'Đồng ý'}
                      type={1}
                      textStyles={styles.txtButtonLogin}
                  />
              </View>
              {
                  renderBottom && renderBottom()
              }
          </View>
      );
  };

  nop = () => {};
}

const styles = StyleSheet.create({
    modalWrap: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000060',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: zIndexAlert,
    },
    modalOverlay: {
    // backgroundColor: colors.black60p,
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    modalView: {
        backgroundColor: 'rgba(248, 248, 248, 1)',
        borderRadius: SmartScreenBase.smPercenWidth * (50 / WIDTH_DESIGN) * 100,
        paddingTop: 20,
        paddingBottom: 14,
        paddingHorizontal: 10,
        width: SmartScreenBase.smPercenWidth * (930 / WIDTH_DESIGN) * 100,
        alignSelf: 'center',
        zIndex: 10,
        alignItems: 'center',
    },
    nonPadding: {
        paddingHorizontal: 0,
        paddingBottom: 0,
    },
    title: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily: FontBase.MyriadPro_Bold,
        color: '#111111',
        textAlign: 'center',
        marginTop: 10,
        width: SmartScreenBase.smPercenWidth * (790 / WIDTH_DESIGN) * 100,
        alignSelf: 'center',
    },
    titleView: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#CBCACA',
    },
    messageView: {
    // paddingVertical: 20
    },
    message: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily: FontBase.MyriadPro_Regular,
        color: '#000',
        textAlign: 'center',
        width: SmartScreenBase.smPercenWidth * (800 / WIDTH_DESIGN) * 100,
        alignSelf: 'center',
        paddingTop: 12,
        lineHeight: Platform.select({ android: SmartScreenBase.smFontSize * 60,  ios: SmartScreenBase.smFontSize * 50}),
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    iconWaring: {
        width: 40,
        height: 43.96,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    btnOk: {
        backgroundColor: 'red',
        paddingVertical: 10,
        width: '50%',
        alignSelf: 'center',
        borderRadius: 6,
        marginTop: 20,
    },

    txtOk: {
        color: '#0000',
        fontSize: 16,
        textAlign: 'center',
    },
    subMessage: {
        fontSize: 14,
        // paddingBottom: 16,
        textAlign: 'center',
    },
    txtButtonLogin: {
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 55,
        color: '#fff',
        width: SmartScreenBase.smPercenWidth * 50,
        textAlign: 'center',
        paddingVertical: SmartScreenBase.smPercenWidth * 3,
    },
});
