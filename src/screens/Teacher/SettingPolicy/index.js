import React, {useCallback} from 'react';
import {ImageBackground, Platform, ScrollView} from 'react-native';
import {AppHeader} from '../../../componentBase/AppHeader';
import {BG} from '../../../assets/icon';
import SmartScreenBase from '../../../base/SmartScreenBase';
import HTML from 'react-native-render-html';
import {FontSize} from '../../../styleApp/font';
import FontBase from '../../../base/FontBase';
const SettingPolicy = (props) => {
  const {content} = props.navigation.state.params;

  //Quay về màn hình cũ
  const goBack = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  console.log('content', content);

  return (
    <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>
      <AppHeader
        title={'Chính sách và điều khoản'}
        leftIconOnPress={goBack}
        styleTitle={{fontSize: SmartScreenBase.smFontSize * 20 * 3}}
      />
      <ScrollView>
        <HTML
          source={{html: content}}
          containerStyle={{
            paddingHorizontal: SmartScreenBase.smBaseWidth * 100,
            paddingVertical: SmartScreenBase.smBaseHeight * 50,
          }}
          baseFontStyle={{
            fontSize: FontSize.size45Font,
            fontFamily: FontBase.MyriadPro_Regular,
            lineHeight: SmartScreenBase.smPercenHeight * 3,
          }}
          allowFontScaling={false}
          allowedStyles={[{fontFamily: FontBase.MyriadPro_Regular}]}
          tagsStyles={{
            b: {
              fontFamily: FontBase.MyriadPro_Bold,
              fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
            },
          }}
        />
      </ScrollView>
    </ImageBackground>
  );
};
export default SettingPolicy;
