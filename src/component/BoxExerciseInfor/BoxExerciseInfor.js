import * as React from 'react';
import {
  FlatList,
  Image,
  View,
  RefreshControl,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Animated,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {TextBox} from '../../componentBase/TextBox';
import stylesApp from '../../styleApp/stylesApp';
import SmartScreenBase from '../base/SmartScreenBase';
import {ParentText} from '../../stringJSON/ParentTextJson';
import styles from './BoxExerciseInfor.style';

export const BoxExerciseInfor = props => {
  return (
    <View style={[styles.boxDashboard]}>
      <View style={stylesApp.flexJusBetween}>
        <TextBox
          text={props.textTitle || props.data.class_name}
          style={[styles.titleBox, stylesApp.textColorLight]}
        />
        <TouchableOpacity
          onPress={props.handleNavigateDetail}
          style={stylesApp.flexAlignCenter}>
          <Text style={styles.textUnderlineDetail}>
            {ParentText.Home.TextDetail}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          stylesApp.flexAlignStart,
          {
            paddingVertical: SmartScreenBase.smPercenWidth * 4,
          },
        ]}>
        <View style={[stylesApp.flexCenterColumn, styles.detailExerciseLeft]}>
          <TextBox
            text={`${ParentText.Home.ExerciseDone}/${ParentText.Home.ExerciseAssigned}`}
          />
          <View style={stylesApp.flexCenter}>
            <Text style={[styles.textOrange, styles.textPdTop]}>
              {props.data.homework_done}
            </Text>
            <Text style={[styles.textBlue, styles.textPdTop]}>
              /{props.data.total_homework}
            </Text>
          </View>
        </View>

        <View style={stylesApp.flexCenterColumn}>
          <TextBox text={`${ParentText.Home.NumberExerciseOver}`} />

          <View style={stylesApp.flexCenter}>
            <Text style={[styles.textRed, styles.textPdTop]}>
              {props.data.homework_late}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
