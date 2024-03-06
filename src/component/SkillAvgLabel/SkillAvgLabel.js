import {Colors} from '../../styleApp/color';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
import {FontSize, FontWeight} from '../../styleApp/font';
import styles from './SkillAvgLabel.style';
import stylesApp from '../../styleApp/stylesApp';
import {icrease_avg_icon, decrease_avg_icon} from '../../assets/icon';
import {Fragment} from 'react';

export const SkillAvgLabel = props => {
  let {skillList, data, index} = props;

  // ArrowLeft Icon
  const ArrowLeftIcon = ({size, color}) => {
    return (
      <View
        style={{
          position: 'absolute',
          right:
            -SmartScreenBase.smPercenWidth * 41 * 0.9 * 0.1 -
            (SmartScreenBase.smBaseWidth * 70) / 2,
          width: size / 2,
          height: size / 2,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderRightColor: color,
        }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            width: size / 2,
            height: size / 2,
            backgroundColor: 'transparent',
            borderTopWidth: size / 4,
            borderLeftWidth: size / 4,
            borderBottomWidth: size / 4,
            borderRightWidth: 0,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: color,
          }}
        />
      </View>
    );
  };

  // ArrowLeft Icon
  const ArrowRightIcon = ({size, color}) => {
    return (
      <View
        style={{
          position: 'absolute',
          left:
            -SmartScreenBase.smPercenWidth * 41 * 0.9 * 0.1 -
            (SmartScreenBase.smBaseWidth * 70) / 2,
          width: size / 2,
          height: size / 2,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderRightColor: color,
        }}>
        <View
          style={{
            position: 'absolute',
            right: 0,
            width: size / 2,
            height: size / 2,
            backgroundColor: 'transparent',
            borderTopWidth: size / 4,
            borderRightWidth: size / 4,
            borderBottomWidth: size / 4,
            borderLeftWidth: 0,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRightColor: color,
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.skillContainer,
        stylesApp.flexColumn,
        {
          alignItems:
            index == skillList.length
              ? 'center'
              : index % 2 == 0
              ? 'flex-end'
              : 'flex-start',
        },
      ]}
      key={data?.skill}>
      <View style={[styles.skillLabel, stylesApp.flexCenter]}>
        <Text style={styles.textLabel}>{data?.skill}</Text>
        {index == skillList.length ? (
          <Fragment>
            <ArrowLeftIcon
              size={SmartScreenBase.smBaseWidth * 75 * 2}
              color={Colors.PrimaryBlue}
            />
            <ArrowRightIcon
              size={SmartScreenBase.smBaseWidth * 75 * 2}
              color={Colors.PrimaryBlue}
            />
          </Fragment>
        ) : index % 2 == 0 ? (
          <ArrowRightIcon
            size={SmartScreenBase.smBaseWidth * 75 * 2}
            color={Colors.PrimaryBlue}
          />
        ) : (
          <ArrowLeftIcon
            size={SmartScreenBase.smBaseWidth * 75 * 2}
            color={Colors.PrimaryBlue}
          />
        )}
      </View>
      <View
        style={[
          stylesApp.flexAlignEnd,
          {
            justifyContent: 'center',
            width: '100%',
          },
        ]}>
        <Text style={[styles.textScore]}>{data?.score}</Text>
        <Image
          style={{
            width: SmartScreenBase.smBaseWidth * 37,
            height: SmartScreenBase.smBaseWidth * 48,
            resizeMode: 'contain',
            position: 'relative',
            top: -SmartScreenBase.smBaseWidth * 20,
            marginHorizontal: SmartScreenBase.smPercenWidth * 1,
          }}
          source={data?.growth >= 0 ? icrease_avg_icon : decrease_avg_icon}
        />
        <Text style={styles.textComparation}>{Math.abs(data?.growth)}</Text>
      </View>
    </View>
  );
};
