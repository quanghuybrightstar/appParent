import React, {useCallback, useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, Platform, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SWITCH_OFF, SWITCH_ON} from '../../../assets/icon';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {TextBox} from '../../../componentBase/TextBox';
import {Colors} from '../../../styleApp/color';
import styles from './style';
import {typeBtn} from './type';
const ComponentSetting = (props) => {
  const {
    type,
    onPress,
    hasNumber,
    number,
    onPressSub,
    marginLeft,
    marginBottom,
  } = props;
  console.log('number', number);
  //Lưu dữ liệu sub value
  const [subValue, setSubValue] = useState(number || 0);

  //Kiểm tra có sub value hay không và lưu dl sub value
  useEffect(() => {
    if (hasNumber) {
      if (number) {
        setSubValue(number);
      } else {
        setSubValue(0);
      }
    }
  }, [hasNumber, number]);

  //Xử lý khi ấn bật tắt switch
  const _checkTrue = useCallback(() => {
    props.checkTrue(props.statusType);
  }, [props]);
  //render giao diện item bên phải mỗi dòng
  const renderButton = useCallback(() => {
    switch (type) {
      case typeBtn.switch:
        return (
          <TouchableOpacity
            style={[
              styles.buttonCheckSetting,
              {marginLeft: marginLeft ? 0 : SmartScreenBase.smBaseWidth * 100},
            ]}
            onPress={_checkTrue}>
            <Image
              source={props.status === '1' ? SWITCH_ON : SWITCH_OFF}
              style={
                props.status === '1' ? styles.iconSetting : styles.iconSetting2
              }
            />
          </TouchableOpacity>
        );
      case typeBtn.language:
        return (
          <View style={styles.languageSetting}>
            <TextBox
              style={[
                styles.language,
                Platform.OS === 'ios' && {
                  fontWeight: 'bold',
                },
              ]}>
              {!!props.status
                ? props.status === 'vi'
                  ? 'Tiếng Việt'
                  : 'Tiếng Anh'
                : ''}
            </TextBox>
          </View>
        );
      case typeBtn.navigate:
        return (
          <View style={styles.languageSetting}>
            <Icon
              name="navigate-next"
              size={SmartScreenBase.smFontSize * 75}
              color={Colors.Gray}
              style={{
                alignItems: 'flex-end',
                textAlign: 'right',
              }}
            />
          </View>
        );
      case typeBtn.version:
        return (
          <View style={styles.languageSetting}>
            <Text allowFontScaling={false} style={styles.version}>
              {props.status}
            </Text>
          </View>
        );
    }
  }, [_checkTrue, marginLeft, onPress, props.status, type]);

  //Xử lý khi ấn mỗi item
  const _onPress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  //Xử lý khi ấn giảm sub value
  const _onPressDecrease = useCallback(() => {
    if (onPressSub) {
      const newValue = (subValue ? subValue : 0) - 1 < 0 ? 0 : subValue - 1;
      setSubValue(newValue);
      onPressSub(newValue);
    }
  }, [subValue, onPressSub]);

  //Xử lý khi ấn tăng sub value
  const _onPressIncrease = useCallback(() => {
    if (onPressSub) {
      const newValue = +subValue + 1;
      setSubValue(newValue);
      onPressSub(newValue);
    }
  }, [subValue, onPressSub]);

  return (
    <TouchableOpacity
      onPress={_onPress}
      disabled={props.disable}
      activeOpacity={onPress ? 0.5 : 1}
      style={[
        styles.viewSetting,
        marginBottom && {marginBottom: SmartScreenBase.smBaseHeight * 2},
      ]}>
      <View style={styles.viewTitleSetting}>
        {hasNumber ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: '33%'}}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  height: SmartScreenBase.smBaseHeight * 65,
                }}>
                <View
                  style={[
                    styles.numberContainer,
                    {
                      borderColor:
                        props.status === '1'
                          ? Colors.DarkGreen
                          : Colors.GrayishBlue,
                    },
                  ]}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.number,
                      {
                        color:
                          props.status === '1'
                            ? Colors.VividOrange
                            : Colors.GrayishBlue,
                      },
                    ]}>
                    {subValue}
                  </Text>
                </View>
                <View
                  style={[
                    styles.btnContainer,
                    {
                      backgroundColor:
                        props.status === '1'
                          ? Colors.DarkGreen
                          : Colors.GrayishBlue,
                    },
                  ]}>
                  <TouchableOpacity
                    style={{
                      height: SmartScreenBase.smBaseHeight * 32,
                      justifyContent: 'flex-start',
                    }}
                    onPress={_onPressIncrease}>
                    <Icon
                      name="keyboard-arrow-up"
                      size={SmartScreenBase.smFontSize * 50}
                      color={Colors.White}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: SmartScreenBase.smBaseHeight * 32,
                      justifyContent: 'center',
                    }}
                    onPress={_onPressDecrease}>
                    <Icon
                      name="keyboard-arrow-down"
                      size={SmartScreenBase.smFontSize * 50}
                      color={Colors.White}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{width: '67%'}}>
              <Text allowFontScaling={false} style={styles.titleSetting}>
                {props.title}
              </Text>
            </View>
          </View>
        ) : (
          <Text allowFontScaling={false} style={styles.titleSetting}>
            {props.title}
          </Text>
        )}
      </View>
      {renderButton()}
    </TouchableOpacity>
  );
};
export default ComponentSetting;
