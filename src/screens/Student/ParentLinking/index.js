import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import API from '../../../API/APIConstant';
import SmartScreenBase from '../../../base/SmartScreenBase';
import MyData from '../../../component/MyData';
import {AppHeader} from '../../../componentBase/AppHeader';
import {ShortMainButton} from '../../../componentBase/ShortMainButton';
import {TextBox} from '../../../componentBase/TextBox';
import {CommonJson, ProfileJson} from '../../../stringJSON';
import {Colors} from '../../../styleApp/color';
import axios from 'axios';
import {ConfirmModal} from './ConfirmModal';
import {FullScreenLoadingIndicator} from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import {SmPopup} from '../../../componentBase/SmPopup/SmPopup';
import {styles} from './ParentLinking.style';
import * as action from '../../../ReduxStudent/actions/Student';
import APIBase from '../../../base/APIBase';
import {useSelector} from 'react-redux';
import {ParentText} from '../../../stringJSON/ParentTextJson';

/**
 * Parent Linking Screen
 * @param {object} props props from redux and navigation
 * @returns Component
 */
export const ParentLinkingScreen = props => {
  //entered parent code
  const [code, setCode] = useState('');
  //err text from server
  const [err, setErr] = useState('');
  //parent info
  const [parent, setParent] = useState({});
  //check if confirm modal is shown
  const [isConfirmVisble, setConfirmVisible] = useState(false);
  //Loading flag
  const [loadingIndicator, setIndicator] = useState(false);
  //Check if result modal is shown
  const [resultModal, setResultModal] = useState(false);
  //message from API
  const [message, setMessage] = useState('');
  // Student infor
  const [inforStudent, setInforStudent] = useState({});

  const onSetCode = useCallback(
    value => {
      setCode(value);
    },
    [setCode],
  );

  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

  /**
   * Validate parent code
   */
  const onValidateCode = async () => {
    if (dataLogin.role != 'parent') {
      const url =
        API.baseurl + API.checkUserCode + code.trim() + '&user_role=parent';
      setIndicator(true);
      try {
        const res = await APIBase.postDataJson('get', url);
        let data = res.data;
        console.log(
          '🚀 ~ file: index.js ~ line 34 ~ onValidateCode ~ data',
          data,
        );
        setIndicator(false);
        if (data.status) {
          setErr('');
          setParent(data.user_data);
          setConfirmVisible(true);
        } else {
          setErr(data.msg);
        }
      } catch (error) {
        setIndicator(false);
        setErr(error.response.data.msg);
        console.log(error.response);
        console.log(error.request);
      } finally {
      }
    } else {
      const url =
        API.baseurl_pay + API.getInforStudent + '?email=' + code.trim();
      setIndicator(true);
      try {
        const res = await APIBase.callPaySV('get', url);
        let data = res.data;
        setIndicator(false);
        if (data.status) {
          setErr('');
          setInforStudent(data.data);
          setConfirmVisible(true);
        }
      } catch (error) {
        setIndicator(false);
        setErr(error.response.data.msg);
      } finally {
      }
    }
  };

  /**
   * Send request to parent
   */
  const onSendRequest = async () => {
    const url = API.baseurl + API.sendRequest;
    try {
      setConfirmVisible(false);
      setIndicator(true);
      const res = await APIBase.postDataJson('post', url, {
        user_code: code.trim(),
        role: 'student',
      });
      let data = res.data;
      if (data.status) {
        setMessage(res.data.msg);
        setResultModal(true);
      } else {
        setErr(data.msg);
      }
    } catch (error) {
      setErr(error.response.data.msg);
      console.log(error.response);
      console.log(error.request);
    } finally {
      setIndicator(false);
    }
  };

  /**
   * Send request to children
   */
  const onSendRequestChildren = async () => {
    const url = API.baseurl + API.postSendRqChild;
    try {
      setConfirmVisible(false);
      setIndicator(true);
      const res = await APIBase.postDataJson('post', url, {
        email: code.trim(),
      });
      let data = res.data;
      if (data.status) {
        setMessage(res.data.msg);
        setResultModal(true);
      } else {
        setErr(data.msg);
      }
    } catch (error) {
      setErr(error.response.data.msg);
      console.log(error.response);
      console.log(error.request);
    } finally {
      setIndicator(false);
    }
  };

  const onTextInputFocus = useCallback(() => {
    setErr('');
  }, []);
  const onTextInputBlur = () => {
    setCode(code.trim());
  };

  const disabled = code.trim() === '' || err;

  return (
    <View style={styles.container}>
      <AppHeader
        title={
          dataLogin.role != 'parent'
            ? ProfileJson.ParentLinking
            : ParentText.AssociateStudent.CreateAssociate
        }
        leftIconOnPress={() => {
          props.navigation.pop();
        }}
      />
      <View style={styles.container}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View>
            <Image
              source={{uri: 'family_linking'}}
              style={styles.imgHeader}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
              style={styles.gradient}
            />
          </View>
          <View style={styles.body}>
            <TextBox
              text={
                dataLogin.role != 'parent'
                  ? ProfileJson.LinkingDescription
                  : ParentText.AssociateStudent.AssociateDesc
              }
              style={[
                styles.title,
                dataLogin.role == 'parent' && styles.tileParent,
              ]}
              numberOfLines={2}
            />
            {dataLogin.role != 'parent' && (
              <TextBox text={ProfileJson.LinkingCode} style={styles.subTitle} />
            )}
            <View
              style={[
                styles.textInputBox,
                !!err && {borderColor: Colors._E41E27},
              ]}>
              <Image source={{uri: 'avtlk1'}} style={styles.imgCode} />
              <TextInput
                autoCapitalize={'none'}
                autoCompleteType={'off'}
                autoCorrect={false}
                placeholder={
                  dataLogin.role != 'parent'
                    ? ProfileJson.LinkingPlaceholder
                    : ParentText.AssociateStudent.AssociatePlaceholder
                }
                placeholderTextColor={Colors.Gray}
                style={styles.textInput}
                value={code}
                onFocus={onTextInputFocus}
                onBlur={onTextInputBlur}
                onChangeText={onSetCode}
              />
              {!!err && (
                <Image source={{uri: 'canhbao1'}} style={styles.errIcon} />
              )}
            </View>
            {!!err && (
              <TextBox numberOfLines={2} text={err} style={styles.errText} />
            )}
          </View>
          <View style={styles.bottomBox}>
            <ShortMainButton
              // loading={loadingIndicator}
              isDisabled={disabled}
              onPress={onValidateCode}
              type={1}
              widthType="full"
              text={ProfileJson.Linking}
              // style={styles.btnLink}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
      <FullScreenLoadingIndicator visible={loadingIndicator} />
      <SmPopup
        visible={resultModal}
        confirmText={CommonJson.Done}
        confirmOnpress={() => {
          action.loadapiprofilehv();
          setResultModal(false);
          props.navigation.pop();
        }}
        messageStyle={styles.messageStyle}
        message={message}
        cancelText={null}
      />
      {dataLogin.role != 'parent' ? (
        <ConfirmModal
          parent={parent}
          visible={isConfirmVisble}
          requestClose={() => setConfirmVisible(false)}
          onSendRequest={onSendRequest}
        />
      ) : (
        <ConfirmModal
          parent={inforStudent}
          visible={isConfirmVisble}
          requestClose={() => setConfirmVisible(false)}
          onSendRequest={onSendRequestChildren}
        />
      )}
    </View>
  );
};
