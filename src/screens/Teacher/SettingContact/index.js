import React, {useCallback} from 'react';
import {ImageBackground, ScrollView, View, Touchable, Linking, TouchableOpacity} from 'react-native';
import {AppHeader} from '../../../componentBase/AppHeader';
import ComponentContact from './componentContact';
import {
  BG,
  IC_COMPANY,
  IC_LOCATION,
  IC_MAIL,
  IC_PHONE,
} from '../../../assets/icon';
import SmartScreenBase from '../../../base/SmartScreenBase';
import styles from './style';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import LogBase from '../../../base/LogBase';
const SettingContact = (props) => {
  const data_contact = props.navigation.getParam('data_contact')
  //Quay về màn hình cũ
  const goBack = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  return (
    <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>
      <AppHeader
        styleTitle={styles.titleHeader}
        title={'Liên hệ'}
        leftIconOnPress={goBack}
      />
      <ScrollView
        contentContainerStyle={{
          paddingVertical: SmartScreenBase.smBaseHeight * 20,
          paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
        }}>
        <ComponentContact
          icon={IC_COMPANY}
          text={data_contact.company}
          style={{
            width: SmartScreenBase.smBaseWidth * 90,
            height: SmartScreenBase.smBaseWidth * 60,
          }}
        />
        <View style={styles.hr} />
        <TouchableOpacity onPress={()=>{Linking.openURL("tel:0334650128")}}>
          <ComponentContact
            icon={IC_PHONE}
            text={data_contact.company_phone}
            style={{
              width: SmartScreenBase.smBaseWidth * 70,
              height: SmartScreenBase.smBaseWidth * 70,
            }}
          />
        </TouchableOpacity>
        <View style={styles.hr} />
        <ComponentContact
          icon={IC_MAIL}
          text={data_contact.company_mail}
          style={{
            width: SmartScreenBase.smBaseWidth * 72,
            height: SmartScreenBase.smBaseWidth * 55,
          }}
        />
        <View style={styles.hr} />
        <ComponentContact
          icon={IC_LOCATION}
          text={data_contact.company_location}
          style={{
            width: SmartScreenBase.smBaseWidth * 70,
            height: SmartScreenBase.smBaseWidth * 80,
          }}
        />
      </ScrollView>
    </ImageBackground>
  );
};
export default SettingContact;
