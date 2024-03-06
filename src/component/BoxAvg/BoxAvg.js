import {View, Text, TouchableOpacity, Image} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
import {Colors} from '../../styleApp/color';
import FontBase from '../../base/FontBase';
import {ParentText} from '../../stringJSON/ParentTextJson';
import stylesApp from '../../styleApp/stylesApp';
import {TextBox} from '../../componentBase/TextBox';
import {
  arrow_left_dark_icon,
  arrow_right_dark_icon,
  icrease_avg_icon,
  decrease_avg_icon,
} from '../../assets/icon';
import styles from './BoxAvg.style';
import {Fragment} from 'react';

// Render Header Box Dashboard
export const renderHeaderBox = (titleAvg, dataParam, setDataParam) => {
  return (
    <View style={stylesApp.flexJusStartBetween}>
      <TextBox
        numberOfLines={2}
        text={titleAvg}
        style={[
          styles.titleBox,
          stylesApp.textColorLight,
          titleAvg == ParentText.Home.AvgSkillScrore && {
            width: '45%',
          },
        ]}
      />
      <View style={[stylesApp.flexAlignCenter]}>
        <TouchableOpacity
          onPress={() => setDataParam({...dataParam, type: 'month'})}
          style={[
            stylesApp.flexAlignCenter,
            {
              paddingRight: SmartScreenBase.smBaseWidth * 28,
            },
          ]}>
          <Text
            style={[
              styles.textTypeTimeAvg,
              dataParam?.type == 'month' && styles.textTypeSelectedTime,
            ]}>
            {ParentText.Home.Month}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setDataParam({...dataParam, type: 'semester'})}
          style={[stylesApp.flexAlignCenter]}>
          <Text
            style={[
              styles.textTypeTimeAvg,
              dataParam?.type == 'semester' && styles.textTypeSelectedTime,
            ]}>
            {ParentText.Home.Semester}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const convertDot = str => {
  var newString = str.replace(/\./g, ',');

  return newString;
};

export const BoxAvg = props => {
  let {titleAvg, dataAvg, typeBox, dataParam, setDataParam} = props;
  return (
    <View style={[styles.boxDashboard]}>
      {renderHeaderBox(titleAvg, dataParam, setDataParam)}

      <View
        style={[
          stylesApp.flexCenter,
          {
            paddingVertical: SmartScreenBase.smPercenWidth * 2,
          },
        ]}>
        <TouchableOpacity style={stylesApp.flexAlignCenter}>
          <Image
            style={{
              width: SmartScreenBase.smBaseWidth * 37,
              height: SmartScreenBase.smBaseWidth * 65,
              resizeMode: 'cover',
            }}
            source={arrow_left_dark_icon}
          />
        </TouchableOpacity>

        <View
          style={
            (stylesApp.flexCenterColumn,
            {
              paddingHorizontal: SmartScreenBase.smPercenWidth * 8,
            })
          }>
          <Text style={styles.textOrangeBottom}>
            {dataParam?.type == 'month'
              ? dataAvg?.month
                ? `Tháng ${dataAvg?.month}`
                : ''
              : dataAvg?.semester
              ? `${dataAvg?.semester}`
              : ''}
          </Text>

          <View style={[stylesApp.flexAlignEnd, stylesApp.flexOnlyJusCenter]}>
            <Text style={[styles.textBlue]}>
              {convertDot(
                parseFloat(
                  Number.parseFloat(dataAvg?.score).toFixed(2),
                ).toString(),
              )}
            </Text>
            {dataAvg?.growth != 0 ? (
              <Fragment>
                <Image
                  style={{
                    width: SmartScreenBase.smBaseWidth * 37,
                    height: SmartScreenBase.smBaseWidth * 48,
                    resizeMode: 'cover',
                    top: -SmartScreenBase.smBaseWidth * 20,
                    marginHorizontal: SmartScreenBase.smPercenWidth * 1,
                  }}
                  source={
                    dataAvg?.growth > 0 ? icrease_avg_icon : decrease_avg_icon
                  }
                />
                <Text style={styles.textComparation}>
                  {convertDot(
                    parseFloat(
                      Number.parseFloat(dataAvg?.growth).toFixed(2),
                    ).toString(),
                  )}
                </Text>
              </Fragment>
            ) : null}
          </View>
        </View>

        <TouchableOpacity style={stylesApp.flexAlignCenter}>
          <Image
            style={{
              width: SmartScreenBase.smBaseWidth * 37,
              height: SmartScreenBase.smBaseWidth * 65,
              resizeMode: 'cover',
            }}
            source={arrow_right_dark_icon}
          />
        </TouchableOpacity>
      </View>

      <View style={stylesApp.flexJusEnd}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ManageListScore', {
              typeAvg: {typeBox},
              title:
                typeBox == 'exam'
                  ? ParentText.Home.ManageExam
                  : ParentText.Home.ManageExercise,
            })
          }
          style={stylesApp.flexAlignCenter}>
          <Text style={styles.textUnderlineDetail}>
            {ParentText.Home.TextDetail}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
