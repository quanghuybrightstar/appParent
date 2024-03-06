import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {Colors} from '../../../styleApp/color';
import {FontSize} from '../../../styleApp/font';
const {width, height} = Dimensions.get('window');
export const useStyleLanguageSetting = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        button: {
          padding: SmartScreenBase.smPercenHeight * 2,
          borderBottomWidth: 1,
          marginHorizontal: SmartScreenBase.smPercenHeight,
          borderBottomColor: Colors.GrayB6,
        },
        lang: {
          fontSize: FontSize.size45Font,
          fontFamily: FontBase.MyriadPro_Regular,
        },
        headerTitle: {
          fontFamily: FontBase.MyriadPro_Regular,
          fontSize: SmartScreenBase.smFontSize * 20 * 3,
        },
      }),
    [],
  );
};
