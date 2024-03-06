import {useMemo} from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import {Colors} from '../../styleApp/color';
const {width, height} = Dimensions.get('window');
import stylesApp from '../../styleApp/stylesApp';
export const useStyleTopic = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: SmartScreenBase.smPercenHeight * 2,
        },
        content: {
          backgroundColor: Colors.White,
          borderRadius: SmartScreenBase.smPercenWidth * 3,
          padding: SmartScreenBase.smPercenHeight,
          ...stylesApp.shadow,
          marginHorizontal: SmartScreenBase.smPercenHeight * 2,
        },
        txtTitle: {
          fontSize: SmartScreenBase.smFontSize * 45,
          color: Colors.DarkGreen,
          fontFamily: FontBase.MyriadPro_Bold,
        },
        answer: {
          marginTop: SmartScreenBase.smBaseWidth * 5,
        },
        txtAnswer: {
          fontSize: SmartScreenBase.smFontSize * 45,
          color: Colors.Black,
          fontFamily: FontBase.MyriadPro_Regular,
        },
        txtDate: {
          fontSize: SmartScreenBase.smFontSize * 45,
          color: Colors.Black,
          fontFamily: FontBase.MyriadPro_Bold,
        },
        itemContainer: {},
        itemHistory: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: 0,
          padding: SmartScreenBase.smPercenHeight * 2,
        },
        line: {
          width: width - SmartScreenBase.smPercenHeight * 8,
          height: SmartScreenBase.smBaseHeight,
          backgroundColor: 'gray',
          alignSelf: 'center',
        },
        time: {
          justifyContent: 'space-between',
        },
        txtTimeToLive: {
          color: Colors.Black,
        },
        score: {
          backgroundColor: Colors.DarkGreen,
          justifyContent: 'center',
          borderRadius: SmartScreenBase.smBaseHeight * 10,
          width: SmartScreenBase.smPercenWidth * 20,
          alignItems: 'center',
        },
        txtScore: {
          fontSize: SmartScreenBase.smFontSize * 60,
          padding: SmartScreenBase.smPercenHeight,
          color: Colors.White,
          fontFamily: FontBase.MyriadPro_Bold,
          marginTop: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight : 0,
        },
        markContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: SmartScreenBase.smPercenHeight * 2,
          paddingBottom: SmartScreenBase.smPercenHeight * 2,
        },
        textMark: {
          color: 'green',
          fontSize: SmartScreenBase.smFontSize * 45,
          fontFamily: FontBase.MyriadPro_Bold,
        },
        textUnMark: {
          color: Colors.DarkGreen,
          fontSize: SmartScreenBase.smFontSize * 45,
          fontFamily: FontBase.MyriadPro_Bold,
          textDecorationLine: 'underline',
        },
      }),
    [],
  );
};
