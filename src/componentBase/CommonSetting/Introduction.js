import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../component/base/SmartScreenBase';
import {typeBtn} from '../../screens/Teacher/SettingNotification/type';
import ComponentSetting from '../../screens/Teacher/SettingTeacher/componentSetting';
import {Colors} from '../../styleApp/color';
import device from '../../utils/device';
import { CommonJson } from '../../stringJSON';
import API from '../../API/APIConstant';
import APIBase from '../../base/APIBase';
import LogBase from '../../base/LogBase';
import { SmPopup } from '../SmPopup';

const Introduction = ({navigation}) => {
  // todo: lấy ra setting app từ store
  const {settingApp} = useSelector((state) => state.LoadAPIFunctionHV);
  const [isShowPopup, setIsShowPopup] = useState(false);

  // todo: đi sang màn support
  const navigateToSupport = useCallback(() => {
    navigation.navigate('SettingSupport', {
      content: settingApp?.app_info?.support,
    });
  }, [navigation, settingApp?.app_info?.support]);

  // todo: đi sang màn contact
  const navigateToContact = useCallback(() => {
    LogBase.log("=====settingApp",settingApp)
    navigation.navigate('SettingContact', {data_contact: settingApp?.data_contact});
  }, [navigation]);

  // todo: đi sang màn about
  const navigateToAbout = useCallback(() => {
    navigation.navigate('SettingAbout', {
      content: settingApp?.app_info?.intro_app,
    });
  }, [navigation, settingApp?.app_info?.intro_app]);

  // todo: đi sang màn policy
  const navigateToPolicy = useCallback(() => {
    navigation.navigate('SettingPolicy', {
      content: settingApp?.app_info?.policy,
    });
  }, [navigation, settingApp?.app_info?.policy]);

  const deleteAcc = async () => {
    try{
      var url = API.baseurl + API.deleteAcc
      var res = await APIBase.tokenAPI("put", url ,{
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    LogBase.log("=====deleteAcc",res)
      if(res.status){
        Alert.alert("Thông báo","Bạn đã xoá tài khoản thành công",[
          {text: 'Trở về', style: 'cancel', onPress: () => navigation.navigate("LoginScreen")}
      ])
      }else{
        Alert.alert("",res.msg)
      }
    }catch (error) {
      LogBase.log("=====error",error)
      Alert.alert("","Xoá tài khoản chưa thực hiện được, vui lòng thử lại sau")
    }
  }

  return (
    <View>
      <Text style={styles.titleNotification}>Giới thiệu</Text>
      <ComponentSetting
        title="Về Sunday English"
        image={'student_setting_image8'}
        type={typeBtn.navigate}
        onPress={navigateToAbout}
      />
      <ComponentSetting
        title="Chính sách và điều khoản sử dụng"
        image={'student_setting_image8'}
        type={typeBtn.navigate}
        onPress={navigateToPolicy}
      />
      <ComponentSetting
        title="Liên hệ"
        image={'student_setting_image8'}
        type={typeBtn.navigate}
        onPress={navigateToContact}
      />
      {/* <ComponentSetting
        title="Hỗ trợ"
        image={'student_setting_image8'}
        type={typeBtn.navigate}
        onPress={navigateToSupport}
      /> */}
      <ComponentSetting
        title="Phiên bản"
        image={'student_setting_image8'}
        type={typeBtn.version}
        status={
          device.getVersion()
        }
      />
      <ComponentSetting
        title="Xoá tài khoản"
        image={'student_setting_image8'}
        type={typeBtn.navigate}
        onPress={() => setIsShowPopup(true)}
      />
      <SmPopup visible={isShowPopup} message={"Mọi dữ liệu và các gói học tập bạn đã mua sẽ bị mất, bạn có chắc chắn muốn xoá tài khoản?"}
        confirmOnpress={() => {setIsShowPopup(false); deleteAcc()}} 
        confirmText={CommonJson.Delete} cancelText={CommonJson.Cancel} cancelOnpress={() => setIsShowPopup(false)}/>
    </View>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  titleNotification: {
    fontSize: SmartScreenBase.smFontSize * 50,
    fontFamily: FontBase.MyriadPro_Bold,
    color: Colors.DarkGreen,
    marginBottom: SmartScreenBase.smBaseHeight * 5,
  },
});
