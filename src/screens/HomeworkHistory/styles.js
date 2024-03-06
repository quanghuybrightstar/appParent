import {useMemo} from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
const {width, height} = Dimensions.get('window');

export const useStyleHomeworkHistory = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        buttonBack: {
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          width: SmartScreenBase.smPercenHeight * 6,
        },
        iconBack: {
          width: SmartScreenBase.smPercenHeight * 6,
          resizeMode: 'contain',
          height: SmartScreenBase.smPercenHeight * 6,
        },
        titleHeader: {
          fontSize: SmartScreenBase.smFontSize * 20 * 3,
          fontFamily: FontBase.MyriadPro_Regular,
        },
        list: {
          marginHorizontal: SmartScreenBase.smPercenHeight * 2,
          marginBottom: SmartScreenBase.smPercenHeight * 3,
          paddingBottom: SmartScreenBase.smPercenHeight * 3,
        },
      }),
    [],
  );
};
