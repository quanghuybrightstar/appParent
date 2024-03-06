import {Colors} from '../../styleApp/color';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
import {FontSize, FontWeight} from '../../styleApp/font';
import styles from './ModalInforLearned.style';
import stylesApp from '../../styleApp/stylesApp';
import {circle_close_icon} from '../../assets/icon';

export const ModalInforLearned = props => {
  // Func Render
  const renderDetailTimeLearning = detail => {
    return (
      <View
        style={[
          stylesApp.flexAlignEnd,
          stylesApp.textColorLight,
          styles.detailItem,
        ]}>
        <Text
          style={[
            {
              fontSize: SmartScreenBase.smFontSize * 34,
            },
            stylesApp.textColorLight,
          ]}>
          {detail?.week}:{' '}
        </Text>
        <Text
          style={[
            {
              fontSize: SmartScreenBase.smFontSize * 31,
            },
            stylesApp.textColorLight,
          ]}>
          <Text
            style={[
              {
                fontSize: SmartScreenBase.smFontSize * 34,
                ...FontWeight.Bold,
              },
              stylesApp.textColorLight,
            ]}>
            {detail?.total_time.toString() ||
              detail?.total_homework_done.toString() ||
              detail?.total_word_done.toString()}{' '}
          </Text>
          phút
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, stylesApp.flexCenter]}>
      <View
        style={[
          stylesApp.flexCenter,
          {
            width: '100%',
          },
        ]}>
        <View style={[stylesApp.flexAllCenterColumn, styles.inforTimeLearning]}>
          <View style={[styles.boxTimeLearning, stylesApp.flexAllCenterColumn]}>
            <Text
              style={{
                color: Colors.PrimaryOrange,
                fontSize: SmartScreenBase.smFontSize * 54,
                ...FontWeight.Bold,
              }}>
              {props?.totalInfor?.total_time}
            </Text>
            <Text
              style={{
                color: Colors.PrimaryOrange,
                fontSize: SmartScreenBase.smFontSize * 31,
              }}>
              phút
            </Text>
          </View>

          <Text
            style={{
              color: Colors.PrimaryOrange,
              fontSize: FontSize.size37Font,
              ...FontWeight.Bold,
            }}>
            {props?.totalInfor?.month}
          </Text>
        </View>

        <View
          style={[styles.listDetailTimeLearning, stylesApp.flexAlignCenter]}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={props?.data}
            renderItem={({item}) => renderDetailTimeLearning(item)}
            keyExtractor={(detail, index) => detail?.week?.toString() + index}
            style={styles.flatListDetail}
            numColumns={2}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={props.handleCloseModalInfor}
        style={{
          position: 'absolute',
          right: -SmartScreenBase.smBaseWidth * 42,
          top: -SmartScreenBase.smBaseWidth * 25,

          width: SmartScreenBase.smBaseWidth * 88,
          height: SmartScreenBase.smBaseWidth * 85,
        }}>
        <Image
          style={{
            width: SmartScreenBase.smBaseWidth * 59,
            height: SmartScreenBase.smBaseWidth * 56,
            resizeMode: 'contain',
          }}
          source={circle_close_icon}
        />
      </TouchableOpacity>
    </View>
  );
};
