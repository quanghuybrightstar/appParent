import React, {useCallback, useState} from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {IC_LOCK} from '../../../assets/icon';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {Colors} from '../../../styleApp/color';
import styles from './style';
const ComponentInput = ({placeholder, handleChange, onBlur}) => {
  //Lưu trạng thái show/hide password
  const [secureText, setSecureText] = useState(true);

  //Show/hide password
  const viewPass = useCallback(() => {
    setSecureText(!secureText);
  }, [secureText]);

  return (
    <View style={styles.viewSetting}>
      <View style={styles.viewTitleSetting}>
        <Image resizeMode="contain" style={styles.iconLock} source={IC_LOCK} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          allowFontScaling={false}
          style={styles.input}
          secureTextEntry={secureText}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor={Colors.DarkGray}
          {...{onBlur}}
        />
      </View>
      <TouchableOpacity onPress={viewPass} style={styles.viewTitleSetting}>
        <Ionicons
          name={secureText ? 'eye-slash' : 'eye'}
          size={SmartScreenBase.smFontSize * 50}
          color={Colors.BaseGreen}
        />
      </TouchableOpacity>
    </View>
  );
};
export default ComponentInput;
