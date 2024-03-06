import {useMemo} from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
const {width, height} = Dimensions.get('window');

export const useStyleChoiceCurriculum = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        textCD: {
          fontSize: SmartScreenBase.smFontSize*55,
          width: '100%',
          textAlign: 'center',
          marginTop: SmartScreenBase.smPercenWidth*8,
        },
        iconBack: {
          width: SmartScreenBase.smPercenHeight * 17,
          resizeMode: 'contain',
          height: SmartScreenBase.smPercenHeight * 17,
        },
        titleHeader: {
          fontSize: SmartScreenBase.smFontSize * 10,
          fontFamily: FontBase.MyriadPro_Regular,
        },
        list: {},
        footer: {
          backgroundColor: 'transparent',
          height: SmartScreenBase.smPercenHeight * 15,
        },
      }),
    [],
  );
};
