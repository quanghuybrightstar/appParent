import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {Colors} from '../../../styleApp/color';
const {width, height} = Dimensions.get('window');
export const useStyleSettingStudent = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          width,
          marginTop: SmartScreenBase.smBaseHeight * 25,
          paddingHorizontal: SmartScreenBase.smBaseHeight * 15,
        },
        viewTop: {
          borderRadius: SmartScreenBase.smPercenHeight * 2,
          width: '100%',
          backgroundColor: Colors.White,
          paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
          paddingVertical: SmartScreenBase.smBaseHeight * 25,
        },
        titleNotification: {
          fontSize: SmartScreenBase.smFontSize * 50,
          color: Colors.DarkGreen,
          marginBottom: SmartScreenBase.smBaseHeight,
          fontFamily: FontBase.MyriadPro_Bold,
        },
        viewTitleSetting: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        iconSetting: {
          resizeMode: 'contain',
          width: '100%',
          height: '100%',
        },
        viewBottomContainer: {
          width,
          alignItems: 'center',
          marginVertical: SmartScreenBase.smBaseHeight * 25,
        },
        buttonSave: {
          backgroundColor: Colors.DarkBlue2,
          width: width / 1.5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: width / 3,
          height: height / 14,
        },
        titleSave: {
          fontSize: SmartScreenBase.smFontSize * 55,
          color: Colors.White,
          fontFamily: FontBase.MyriadPro_Bold,
        },
        hr: {
          width: '100%',
          height: SmartScreenBase.smBaseHeight,
          backgroundColor: Colors.Gray,
          marginVertical: SmartScreenBase.smBaseHeight * 25,
        },
        titleHeader: {
          fontFamily: FontBase.MyriadPro_Regular,
          fontSize: SmartScreenBase.smFontSize * 20 * 3,
        },
      }),
    [],
  );
};
