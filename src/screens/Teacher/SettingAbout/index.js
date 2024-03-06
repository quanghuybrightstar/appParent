import React, {useCallback} from 'react';
import {Image, ImageBackground, ScrollView} from 'react-native';
import {AppHeader} from '../../../componentBase/AppHeader';
import {BG, BG_POLICY} from '../../../assets/icon';
import SmartScreenBase from '../../../base/SmartScreenBase';
import HTML from 'react-native-render-html';
import {FontSize} from '../../../styleApp/font';
import FontBase from '../../../base/FontBase';

const SettingAbout = (props) => {
  const {content} = props.navigation.state.params;

  //Quay về màn hình cũ
  const goBack = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  return (
    <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>
      <AppHeader
        title={'Về Sunday English'}
        leftIconOnPress={goBack}
        styleTitle={{fontSize: SmartScreenBase.smFontSize * 20 * 3}}
      />
      <ScrollView>
        <Image
          source={BG_POLICY}
          style={{
            width: '100%',
            height: SmartScreenBase.smPercenHeight * 35,
          }}
        />
        <HTML
          source={{html: content}}
          containerStyle={{
            paddingHorizontal: SmartScreenBase.smBaseWidth * 100,
          }}
          allowFontScaling={false}
          baseFontStyle={{
            fontSize: FontSize.size45Font,
            fontFamily: FontBase.MyriadPro_Regular,
            lineHeight: SmartScreenBase.smPercenHeight * 3,
          }}
          allowedStyles={[{fontFamily: FontBase.MyriadPro_Regular}]}
          tagsStyles={{
            b: {fontFamily: FontBase.MyriadPro_Bold},
          }}
        />
      </ScrollView>
    </ImageBackground>
  );
};
export default SettingAbout;
