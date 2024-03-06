import {useMemo} from 'react';
import {Platform} from 'react-native';
import {Dimensions, StyleSheet} from 'react-native';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import {Colors} from '../../styleApp/color';

const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartScreenHeight = SmartScreenBase.smPercenHeight;

export const useStyleHomeworkDetail = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: Colors.LightGrayish,
        },
        body: {
          marginTop: smartScreenWidth * 5,
          marginBottom: SmartScreenBase.smPercenHeight * 4,
        },
        avatarContainer: {
          position: 'absolute',
          zIndex: 10000,
          width: SmartScreenBase.smBaseWidth * 150,
          height: SmartScreenBase.smBaseWidth * 150,
          borderRadius: SmartScreenBase.smBaseWidth * 100,
          shadowOpacity: 0.5,
          shadowColor: Colors.BaseGreen,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowRadius: 3.84,
          elevation: 2,
          backgroundColor: Colors.White,
        },
        avatar: {
          width: SmartScreenBase.smBaseWidth * 150,
          height: SmartScreenBase.smBaseWidth * 150,
          zIndex: 1,
        },
        mark: {
          width: SmartScreenBase.smBaseWidth * 90,
          height: SmartScreenBase.smBaseWidth * 85,
          zIndex: 1,
          position: 'absolute',
          right: SmartScreenBase.smBaseWidth * 20,
          bottom: -SmartScreenBase.smBaseWidth * 35,
        },
        markContainer: {
          backgroundColor: Colors.White,
        },
        titleContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: smartScreenWidth * 10,
          height: SmartScreenBase.smBaseWidth * 150,
          justifyContent: 'center',
        },
        titleView: {
          alignItems: 'center',
          width: '60%',
        },
        btnView: {
          alignItems: 'center',
        },
        title: {
          fontSize: SmartScreenBase.smFontSize * 50,
          textAlign: 'center',
        },
        title2: {
          fontSize: SmartScreenBase.smFontSize * 60,
        },
        scoreTable: {
          backgroundColor: Colors.White,
          borderRadius: smartScreenWidth * 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: smartScreenHeight * 2,
          paddingBottom: smartScreenHeight * 5,
        },
        scoreContainer: {
          width: '30%',
          alignItems: 'center',
          paddingHorizontal: smartScreenWidth * 3,
        },
        score: {
          borderRadius: smartScreenWidth * 3,
          borderWidth: SmartScreenBase.smBaseHeight,
          width: '100%',
          height: smartScreenHeight * 10,
          borderColor: Colors.DarkGray,
          marginTop: smartScreenHeight,
          justifyContent: 'center',
        },
        txtScoreInput: {
          textAlign: 'center',
          color: Colors.Red_BE1,
          fontSize: SmartScreenBase.smFontSize * 80,
          fontFamily: FontBase.MyriadPro_Bold,
          marginTop: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight : 0,
        },
        reviewContainer: {
          width: '70%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: smartScreenWidth * 5,
        },
        txtReviewInput: {
          fontSize: SmartScreenBase.smFontSize * 50,
          fontFamily: FontBase.MyriadPro_Regular,
        },
        review: {
          borderRadius: smartScreenWidth * 3,
          borderWidth: SmartScreenBase.smBaseHeight,
          width: '100%',
          height: smartScreenHeight * 25,
          borderColor: Colors.SuperLightGray,
          marginTop: smartScreenHeight,
          padding: smartScreenWidth * 3,
        },
        btnContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: smartScreenWidth * 10,
          marginVertical: smartScreenWidth * 5,
          justifyContent: 'center',
          alignSelf: 'center',
          paddingVertical: smartScreenHeight * 1,
        },
        btnText: {
          fontSize: SmartScreenBase.smFontSize * 55,
          color: Colors.White,
          paddingHorizontal: smartScreenWidth * 17,
          fontWeight: 'bold',
          fontFamily: FontBase.MyriadPro_Bold,
          marginTop:
            Platform.OS === 'android' ? 0 : SmartScreenBase.smBaseHeight * 8,
        },
        paddingBody: {
          paddingHorizontal: smartScreenWidth * 5,
        },
        titleHeader: {
          fontFamily: FontBase.MyriadPro_Regular,
          fontSize: SmartScreenBase.smFontSize * 20 * 3,
        },
        txtScore: {
          fontFamily: FontBase.MyriadPro_Bold,
          fontSize: SmartScreenBase.smFontSize * 50,
          paddingTop:
            Platform.OS === 'android' ? 0 : SmartScreenBase.smBaseHeight * 5,
        },
      }),
    [],
  );
};
