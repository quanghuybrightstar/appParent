import React, {useEffect, useRef} from 'react';
import {View, Text, Image, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import FontBase from '../../base/FontBase';
import {fixedStringNumber} from '../../utils/stringUtils';
import SmartScreenBase from '../../base/SmartScreenBase';
const {width} = Dimensions.get('window');

const ComponentLesson = (props) => {
  const {item} = props;
  const {scoretotal, up, score_up, lessson, image} = item || {};
  const Value = useRef(new Animated.Value(0)).current;
  let widthSlider = (width / 2.3 / 10) * scoretotal;
  const changedDirection = up ? '+' : '';
  // const isChanged = Number.parseFloat(score_up) !== 0;
  // const changedScore = fixedStringNumber(score_up, 1);
  const scoreTotal = fixedStringNumber(scoretotal, 1);

  useEffect(() => {
    Animated.timing(Value, {
      toValue: widthSlider,
      duration: 2000,
    }).start();
  });
  return (
    <View style={styles.V_LS}>
      <View style={styles.V_animationC}>
        <View style={styles.viewAnimation}>
          <Text
            style={{
              position: 'absolute',
              top: -width / 18,
              left: width / 5.7,
              color: '#fff',
              fontSize: 14,
              fontFamily: FontBase.MyriadPro_Bold,
            }}>
            {lessson}
          </Text>
          <View
            style={{
              position: 'absolute',
              height: width / 6.7,
              width: width / 6.7,
              left: -width / 26,
              backgroundColor: '#fff',
              borderRadius: width / 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={{uri: image}} style={styles.iconLesson} />
          </View>

          <View
            style={{
              width: width / 2.2,
              marginLeft: width / 26,
              alignItems: 'flex-start',
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#65b0e9', '#ada1f8']}
              style={{borderRadius: 50, marginRight: 10}}>
              <Animated.View style={{width: Value, height: width / 16}} />
            </LinearGradient>
          </View>
        </View>
        <View style={styles.ViewScrore}>
          <Text
            style={{
              fontSize: 20,
              color: '#303e8d',
              fontFamily: FontBase.MyriadPro_Bold,
              alignItems: 'center',
            }}>
            {scoreTotal || "..."}
          </Text>
          <View
            style={{
              alignItems: 'center',
              position: 'absolute',
              top: 1,
              right: SmartScreenBase.smPercenWidth*2,
            }}>
            {/* {isChanged && (
              <Text
                style={{
                  color: up ? '#98c355' : '#b03538',
                  fontSize: 12,
                  fontWeight: '500',
                  textAlign: 'center',
                  fontFamily: FontBase.UTM_AVO,
                }}>
                {changedDirection}
                {changedScore}
              </Text>
            )} */}
          </View>
        </View>
      </View>
    </View>
  );
};
export default ComponentLesson;
