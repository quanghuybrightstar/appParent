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
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';
import {TextBox} from '../../../../componentBase/TextBox';
import {FullScreenLoadingIndicator} from '../../../../componentBase/indicator';
import {useSelector} from 'react-redux';
import {ParentText} from '../../../../stringJSON/ParentTextJson';
import {useRef} from 'react';
import stylesApp from '../../../../styleApp/stylesApp';
import styles from './IntroScreen.style';
import {FontWeight} from '../../../../styleApp/font';
import Carousel from 'react-native-snap-carousel';
import {bg_intro} from '../../../../assets/image';
import {introScreenLogic} from './IntroScreen.logic';
import {right_green_icon, left_green_icon} from '../../../../assets/icon';

export const IntroScreen = props => {
  let {
    dataIntroCarousel,
    refCarow,
    keyItem,
    setKeyItem,
    _pressCarou,
    handlePressChangeItem,
  } = introScreenLogic(props);
  const {width, height} = Dimensions.get('window');

  const Dot = ({onPress, active}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: SmartScreenBase.smPercenWidth * 3.6,
          height: SmartScreenBase.smPercenWidth * 3.6,
          backgroundColor: active ? '#00db9b' : '#d9d9d9',
          borderRadius: SmartScreenBase.smPercenWidth * 4,
          marginHorizontal: SmartScreenBase.smPercenWidth * 1.8,
        }}
      />
    );
  };

  const CarouselItem = ({item}) => {
    const isLastElement = item?.id == dataIntroCarousel.length;
    return (
      <View
        style={[
          {
            height: '100%',
            width: SmartScreenBase.smPercenWidth * 100,
            marginTop: isLastElement && SmartScreenBase.smPercenWidth * 5,
          },
          stylesApp.flexAllCenterColumn,
        ]}>
        <FastImage
          resizeMode="contain"
          source={item?.imgSrc}
          style={{
            width: 78 * SmartScreenBase.smPercenWidth,
            height: 78 * SmartScreenBase.smPercenWidth,
            marginBottom: isLastElement
              ? SmartScreenBase.smPercenWidth * 4
              : SmartScreenBase.smPercenWidth * 8,
          }}
        />
        <View
          style={{
            width: SmartScreenBase.smPercenWidth * 84,
            ...stylesApp.flexAllCenterColumn,
          }}>
          <Text style={styles.textTitleIntro}>{item?.title}</Text>
          <Text
            style={[styles.textSubTitleIntro, {width: isLastElement && '70%'}]}>
            {item?.subTitle}
          </Text>
          <Text style={styles.textDetailIntro}>{item?.detail}</Text>
        </View>
      </View>
    );
  };

  const _renderItem = ({item, index}) => {
    return <CarouselItem item={item} />;
  };

  return (
    <ImageBackground
      source={bg_intro}
      imageStyle={stylesApp.ImageBackGround}
      style={{flex: 1}}>
      <View style={styles.flex1}>
        <Carousel
          ref={refCarow}
          data={dataIntroCarousel}
          renderItem={_renderItem}
          horizontal={true}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={index => setKeyItem(index)}
        />
      </View>
      <View
        style={[
          stylesApp.flexCenter,
          {
            marginTop: SmartScreenBase.smPercenWidth * 2,
            marginBottom: SmartScreenBase.smPercenWidth * 20,
          },
        ]}>
        <TouchableOpacity
          style={styles.btnChangeItem}
          onPress={() => handlePressChangeItem('prev')}>
          {keyItem > 0 && (
            <Image
              style={{
                width: SmartScreenBase.smBaseWidth * 80,
                height: SmartScreenBase.smBaseWidth * 80,
                resizeMode: 'contain',
              }}
              source={left_green_icon}
            />
          )}
        </TouchableOpacity>
        <View
          style={[
            stylesApp.flexAlignCenter,
            {
              paddingHorizontal: SmartScreenBase.smPercenWidth * 10,
            },
          ]}>
          {dataIntroCarousel.map((item, index) => {
            return (
              <Dot
                key={index}
                active={keyItem == index}
                onPress={() => _pressCarou(index)}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.btnChangeItem}
          onPress={() => handlePressChangeItem('next')}>
          <Image
            style={{
              width: SmartScreenBase.smBaseWidth * 80,
              height: SmartScreenBase.smBaseWidth * 80,
              resizeMode: 'contain',
            }}
            source={right_green_icon}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
