import React, { useCallback, useEffect, useRef, useState, createRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
  Platform
} from 'react-native';
import Header from '../../component/Header';
import SmartScreenBase from '../../base/SmartScreenBase';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import apiConstant from '../../API/APIConstant';
import FlipCard from 'react-native-flip-card';
import Sound from 'react-native-sound';
import {AppHeader} from '.././../componentBase/AppHeader';
import FontBase from '../../base/FontBase';

const _imgWith = SmartScreenBase.smPercenWidth * 88;
const _imgHeight = (_imgWith * 554) / 944;
const _cardWidth = SmartScreenBase.smPercenWidth * 90;
const upperFirstLetter = (s) => {
  if (!s) return '';
  return s.substr(0, 1).toUpperCase() + s.substr(1);
};

const Item = React.memo(({item, onPress, index, playVoice}) => {
  const image = JSON.parse(item.image);

  const _sound = React.useRef(null);
  const [onPressAct, setOnPress] = React.useState(-1)

  const onPressAudio = () => {
      playVoice(index)
    // if (!!_sound.current) {
    //   _sound.current.play();
    // } else {
    //   _sound.current = new Sound(item.audio, apiConstant.domain, (e) => {
    //     if (e) {
    //       console.log(e);
    //       alert('Có lỗi xảy ra khi tải file nghe!');
    //       return;
    //     }
    //     _sound.current.play();
    //   });
    // }
  };

  // React.useEffect(() => {
  //   return () => {
  //     if (!!_sound.current) {
  //       _sound.current.release();
  //     }
  //   };
  // }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(item)
      }}
      onPressIn={()=>{setOnPress(1)}}
      onPressOut={()=>{setOnPress(-1)}}>
      <View style={styles.container}>
        <View
          style={[{
            backgroundColor: 'white',
            padding: SmartScreenBase.smPercenWidth ,
            position: 'absolute',
            left: -SmartScreenBase.smPercenWidth * 18,
            top: -SmartScreenBase.smPercenWidth * 3,
            borderRadius: SmartScreenBase.smPercenWidth * 4,
          }, onPressAct != 1 && {
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 5,
          }]}>
          {console.log("=====ảnh",`${apiConstant.domain}${image[0]?.trim()}`)}
          <Image
            source={{ uri: `${apiConstant.domain}${image[0]?.trim()}` }}
            style={{
              width: SmartScreenBase.smPercenWidth * 20,
              height: SmartScreenBase.smPercenWidth * 20,
              borderRadius:SmartScreenBase.smPercenWidth*4,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
          }}>
          <Text
            style={{
              fontSize: SmartScreenBase.smFontSize * 40,
              fontFamily: FontBase.MyriadPro_Bold,
              flex: 1,
              paddingLeft: SmartScreenBase.smPercenWidth * 4,
            }}>
            {item.vocabulary}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity 
            style={{
              width: SmartScreenBase.smPercenWidth * 12,
              height: SmartScreenBase.smPercenWidth * 12,
              justifyContent: 'center',
              alignItems: 'center',
            }} onPress={onPressAudio}>
              <Image
                source={{ uri: 'tv_speaker' }}
                style={{
                  width: SmartScreenBase.smPercenWidth * 6,
                  height: SmartScreenBase.smPercenWidth * 6,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <ImageBackground
            source={{uri: item.score ? 'tv_circle' : ""}}
              style={{
                width: SmartScreenBase.smPercenWidth * 12,
                height: SmartScreenBase.smPercenWidth * 12,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: FontBase.MyriadPro_Regular,
                  fontSize: SmartScreenBase.smFontSize * 60,
                }}>
                {item.score}
              </Text>
            </ImageBackground>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const Word = ({ item, translate }) => {
  const vi_mean = JSON.parse(item.vi_mean);
  const _vimean = vi_mean.map((c) => upperFirstLetter(c)).join(', ');

  const en_mean = JSON.parse(item.en_mean);
  const _en_mean = en_mean.map((c) => upperFirstLetter(c)).join(', ');

  const _sens = JSON.parse(item.en_vi_sentence_mean)[0]
  
  const _sound = React.useRef(null);

  const onPress = () => {
    if (!!_sound.current) {
      _sound.current.play();
    } else {
      _sound.current = new Sound(item.audio, apiConstant.domain, (e) => {
        if (e) {
          console.log(e);
          alert('Có lỗi xảy ra khi tải file nghe!');
          return;
        }
        _sound.current.play();
      });
    }
  };
  React.useEffect(() => {
    return () => {
      if (!!_sound.current) {
        _sound.current.release();
      }
    };
  }, []);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
        }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: '#39bc9e',
              fontSize: SmartScreenBase.smFontSize * 54,
              fontFamily: FontBase.MyriadPro_Regular
            }}>
            <Text
              style={{
                fontSize: SmartScreenBase.smFontSize * 54,
                fontFamily: FontBase.MyriadPro_Bold,
                color: '#39bc9e',
              }}>
              {item.vocabulary}
            </Text>{' '}
            {
              !translate&&<Text style={{fontSize: SmartScreenBase.smFontSize * 54, fontFamily: FontBase.MyriadPro_It}}>
              {item.spell}
              </Text>
            }
          </Text>
          <Text
            style={{
              fontSize: SmartScreenBase.smFontSize * 54,
              fontFamily: FontBase.MyriadPro_Bold,
              marginTop:SmartScreenBase.smPercenHeight
            }}>
            {_vimean}
          </Text>
        </View>
        <TouchableOpacity onPress={onPress} style={{alignSelf:'flex-start'}}>
          <Image
            source={{ uri: 'tv_speaker' }}
            style={{
              width: SmartScreenBase.smPercenWidth * 10,
              height: SmartScreenBase.smPercenWidth * 10,
              resizeMode: 'contain',
              marginTop:SmartScreenBase.smPercenHeight
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
          paddingBottom: SmartScreenBase.smPercenWidth * 4,
        }}>
          {
            !translate&&<Text
            style={{
              fontSize: SmartScreenBase.smFontSize * 45,
              fontFamily: FontBase.MyriadPro_Regular,
              marginTop: SmartScreenBase.smPercenWidth * 2,
            }}>
            {_en_mean}
          </Text>
          }
        {translate && (
          <>
          <Text
            style={{
              fontSize: SmartScreenBase.smFontSize * 50,
              fontFamily: FontBase.MyriadPro_Bold,
              marginTop: SmartScreenBase.smPercenWidth * 3,
            }}>
            {item.en_vi_sentence}
          </Text>
          <Text
            style={{
              fontSize: SmartScreenBase.smFontSize * 45,
              marginTop: SmartScreenBase.smPercenWidth * 2,
              fontFamily: FontBase.MyriadPro_It,
            }}>
            {_sens}
          </Text>
          </>
          
        )}
      </View>
    </>
  );
};

const CarouselItem = React.memo(({ item }) => {
  const image = JSON.parse(item.image);
  const [isChange, setChange] = React.useState(true);

  const onPress = () => {
    setChange(!isChange);
  }
  return (
    <View
      style={{ width: _cardWidth, height: Platform.OS==='ios'?450:400 }}>
      <FlipCard
        clickable={false}
        style={{ flex: 1 }}>
        <View style={styles.card}>
          {isChange &&
            <View>
              <View
                style={{
                  alignItems: 'center',
                  overflow: 'hidden',
                  borderRadius: SmartScreenBase.smPercenWidth * 6,
                }}>
                <Image
                  source={{ uri: `${apiConstant.domain}${image[2]?.trim()}` }}
                  style={{
                    width: _imgWith,
                    height: _imgHeight,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <Word item={item} />
            </View>
          }

          {!isChange && <Word item={item} translate />}
        </View>
        <View style={styles.card}>
          <Word item={item} translate />
        </View>
      </FlipCard>
      <TouchableOpacity
        onPress={onPress}
        style={styles.btn}>
        <Image source={{ uri: 'fl_card2' }} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
      </TouchableOpacity>
    </View>
  );
});

const ListVocabScreen = ({ navigation }) => {
  const items = navigation.getParam('data');
  const item = items[0];
  const data = item.list_vocab_in_unit;

  const _sound = useRef(null);

  const [viewing, setViewing] = React.useState(null);

  const _renderItem = ({ item, index }) => {
    return <CarouselItem item={item} />;
  };

  React.useEffect(() => {
    return () => {
      if (!!_sound.current) {
        _sound.current.release();
      }
    };
  }, []);

  const onPlayAudio = async (index) => {
      if (!!_sound.current) {
        var isplay = await _sound.current.isPlaying()
        if(isplay){
          _sound.current.stop()
        }
      }
      _sound.current = new Sound(data[index].audio, apiConstant.domain, (e) => {
        if (e) {
          console.log(e);
          alert('Có lỗi xảy ra khi tải file nghe!');
          return;
        }
        _sound.current.play();
      });
    // }
  };

  const onPressAWord = React.useCallback((i) => {
    setViewing(i);
  }, []);

  return (
    <ImageBackground source={{ uri: 'bgtuvung' }} style={{ flex: 1 }}>
      <AppHeader  title={item.unit_name} leftIconOnPress={() => navigation.goBack()} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => (
          <Item item={item} index={index} onPress={onPressAWord} playVoice={onPlayAudio}/>
        )}
        style={{ marginBottom: 10, flex: 1 }}
      />
      {
        !!viewing && <Modal
          isVisible={true}
          animationType={'slide'}
          transparent={true}
          onBackdropPress={() => setViewing(null)}>
          <View style={{ position: 'relative' }}>
            <Carousel
              data={data}
              renderItem={_renderItem}
              horizontal={true}
              sliderWidth={_cardWidth}
              itemWidth={_cardWidth}
              firstItem={data.indexOf(viewing)}
              inactiveSlideScale={0.95}
              inactiveSlideOpacity={1}
              removeClippedSubviews={false}
              contentContainerCustomStyle={{
                minWidth: _cardWidth * data.length,
              }}
            />
          </View>
        </Modal>
      }

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical:SmartScreenBase.smPercenHeight*2.5,
    marginHorizontal: 16,
    width: SmartScreenBase.smPercenWidth * 73,
    alignSelf: 'flex-end',
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SmartScreenBase.smPercenWidth * 6,
    overflow: 'hidden',
    padding: SmartScreenBase.smPercenWidth * 2,
    position: 'relative',
    width: '99%',
    alignSelf: 'center',
    height: '100%',
  },
  btn: {
    backgroundColor: 'white',
    width: SmartScreenBase.smPercenWidth * 12,
    height: SmartScreenBase.smPercenHeight * 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: -30,
    alignSelf: 'center',
    marginBottom:5,
    paddingRight:5,
  }
});

export default ListVocabScreen;
