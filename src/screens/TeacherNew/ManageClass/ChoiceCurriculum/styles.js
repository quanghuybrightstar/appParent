import {useMemo} from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';
import {FontSize} from '../../../../styleApp/font';
export const useStyleChoiceCurriculum = () => {
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
          marginTop: SmartScreenBase.smPercenHeight * 2,
          borderRadius: SmartScreenBase.smPercenHeight,
          flexDirection: 'row',
        },
        txtButton: {
          fontSize: SmartScreenBase.smFontSize * 50,
        },
        imgLogo: {
          width: SmartScreenBase.smBaseWidth * 50,
          height: SmartScreenBase.smBaseHeight * 30,
          marginRight: SmartScreenBase.smBaseWidth * 10,
        },
        buttonAdd: {
          paddingVertical: SmartScreenBase.smPercenHeight * 1.7,
          paddingHorizontal: SmartScreenBase.smPercenHeight * 12,
          borderRadius: SmartScreenBase.smPercenHeight * 4,
        },
        titleHeader: {
          fontSize: SmartScreenBase.smFontSize * 60,
          fontFamily: FontBase.MyriadPro_Regular,
        },
        buttonAddContainer: {
          height: SmartScreenBase.smPercenWidth * 14,
          width: SmartScreenBase.smPercenWidth * 55,
          borderRadius: SmartScreenBase.smPercenWidth * 15,
          alignSelf: 'center',
          backgroundColor: 'transparent',
          marginVertical: SmartScreenBase.smPercenHeight * 2,
        },
        textSty: {
          fontSize: SmartScreenBase.smPercenWidth * 6,
          fontFamily: FontBase.MyriadPro_Bold,
        },
        tabBar: {
          flexDirection: 'row',
        },
        indicatorContainer: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }, //2.13.0
        labelStyle: {
          fontSize: FontSize.size45Font,
          color: Colors.Black,
          paddingTop:
            Platform.OS === 'ios' ? SmartScreenBase.smBaseHeight * 2 : 0,
        },
        loading: {
          zIndex: 999,
        },
      }),
    [],
  );
};
