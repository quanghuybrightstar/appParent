import {useMemo} from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
export const useStyleCurriculumClass = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        btnContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: SmartScreenBase.smPercenHeight * 2,
          marginHorizontal: SmartScreenBase.smPercenHeight * 2,
          marginTop: SmartScreenBase.smPercenHeight * 5,
          borderRadius: SmartScreenBase.smPercenHeight,
          flexDirection: 'row',
        },
        txtButton: {
          fontSize: SmartScreenBase.smFontSize * 55,
          fontFamily: FontBase.MyriadPro_Regular,
          marginTop:
            Platform.OS === 'ios' ? SmartScreenBase.smBaseHeight * 8 : 0,
        },
        imgLogo: {
          width: SmartScreenBase.smBaseWidth * 60,
          height: SmartScreenBase.smBaseHeight * 30,
          marginRight: SmartScreenBase.smBaseWidth * 20,
        },
        content: {
          flex: 1,
        },
        buttonAdd: {
          marginVertical: SmartScreenBase.smPercenHeight * 2,
          marginHorizontal: SmartScreenBase.smPercenHeight * 2,
          borderRadius: SmartScreenBase.smPercenHeight * 4,
          width: SmartScreenBase.smPercenHeight * 30,
          alignSelf: 'center',
          height: SmartScreenBase.smPercenHeight * 7,
        },
        titleHeader: {
          fontSize: SmartScreenBase.smFontSize * 60,
          fontFamily: FontBase.MyriadPro_Regular,
        },
        buttonText: {
          fontSize: SmartScreenBase.smFontSize * 55,
          fontFamily: FontBase.MyriadPro_Bold,
        },
      }),
    [],
  );
};
