import React, {useCallback} from 'react';
import {Image, ImageBackground, Linking, View, TouchableOpacity} from 'react-native';
import {BG, IC_SUPPORT} from '../../../assets/icon';
import {AppHeader} from '../../../componentBase/AppHeader';
import {TextBox} from '../../../componentBase/TextBox';
import styles from './style';
const SettingSupport = ({navigation}) => {
  const {content} = navigation.state.params;

  //Quay về màn hình cũ
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>
      <AppHeader
        styleTitle={styles.titleHeader}
        title={'Hỗ trợ'}
        leftIconOnPress={goBack}
      />
      <View style={styles.textContainer}>
        <TextBox numberOfLines={10} style={styles.text}>{content}</TextBox>
      </View>
      <TouchableOpacity onPress={()=>{Linking.openURL("tel:0334650128")}} style={styles.contactContainer}>
        <Image source={IC_SUPPORT} style={styles.icon} />
        <TextBox style={styles.contact}>LIÊN HỆ QUA HOTLINE</TextBox>
      </TouchableOpacity>
    </ImageBackground>
  );
};
export default SettingSupport;
