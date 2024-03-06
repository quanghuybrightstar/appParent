/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './styles';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import {TextBox} from '../TextBox';

const AudioPlayer = ({source, onBack}) => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = useState(0);
  const [pause, setPause] = useState(true);
  const [loading, setLoading] = useState(true);
  const [onSliding, setOnSliding] = useState(false);
  const playAudio = useRef();
  const [isStop, setStop] = useState(false);
  const [roundType, setRoundType] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let flag = false;
      console.log('loading', loading);
      if (loading) {
        Alert.alert('tải file âm thanh gặp lỗi.', '', [
          {
            text: 'OK',
            onPress: onBack,
          },
        ]);
        setLoading(false);
      }
    }, 8000);
    return () => {
      clearTimeout(timeout);
    };
  }, [loading]);

  React.useEffect(() => {
    setLoading(true);
  }, [source]);

  const _renderTime = (seconds) => {
    const h = parseInt(seconds / (60 * 60), 10);
    const m = parseInt((seconds % (60 * 60)) / 60, 10);
    const s = parseInt(seconds % 60, 10);
    return (
      (h < 10 ? '0' + h : h) +
      ':' +
      (m < 10 ? '0' + m : m) +
      ':' +
      (s < 10 ? '0' + s : s)
    );
  };

  const _handlePlay = () => {
    if (isStop) {
      setStop(false);
      playAudio.current.seek(0);
    }
    setPause(!pause);
  };

  const _handlePrev = () => {
    setStop(false);
    if (parseInt(currentTime) > 10) {
      playAudio.current.seek(currentTime - 10);
    } else {
      playAudio.current.seek(0);
    }
  };

  const _handleNext = () => {
    setStop(false);
    if (parseInt(currentTime, 10) < parseInt(duration - 10, 10)) {
      playAudio.current.seek(currentTime + 10);
    } else {
      playAudio.current.seek(duration);
    }
  };

  useEffect(() => {
    if (currentTime === duration) {
      console.log(123);
      setStop(true);
    }
  }, [currentTime, duration]);

  const _onSlidingStart = () => {
    setStop(false);
    setOnSliding(true);
  };

  const _onSlidingComplete = (value) => {
    setOnSliding(false);
    playAudio.current.seek(value);
  };

  return (
    <View style={styles.container}>
      <Video
        source={{uri: source}}
        audioOnly={true}
        ref={playAudio}
        paused={pause || onSliding}
        onProgress={(event) => {
          console.log('event', event);
          if (roundType === 'ceil') {
            setCurrentTime(Math.ceil(event.currentTime));
          } else if (roundType === 'floor') {
            setCurrentTime(Math.floor(event.currentTime));
          }
        }}
        onSeek={(event) => {
          if (roundType === 'ceil') {
            setCurrentTime(Math.ceil(event.currentTime));
          } else if (roundType === 'floor') {
            setCurrentTime(Math.floor(event.currentTime));
          }
        }}
        onLoad={(event) => {
          console.log('event', event);
          setLoading(false);
          if (Math.round(event.duration) === Math.ceil(event.duration)) {
            setRoundType('ceil');
            setDuration(Math.ceil(event.duration));
          } else if (
            Math.round(event.duration) === Math.floor(event.duration)
          ) {
            setRoundType('floor');
            setDuration(Math.floor(event.duration));
          }
        }}
        onEnd={() => {
          setPause(true);
          setStop(true);
          setCurrentTime(0);
        }}
      />
      <View style={styles.containerAudio}>
        <View style={styles.viewControl}>
          {loading ? (
            <ActivityIndicator size={60} />
          ) : (
            <TouchableOpacity style={styles.buttonPlay} onPress={_handlePlay}>
              <Image
                source={{uri: pause ? 'play_study_guide' : 'pause_study_guide'}}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.viewProcess}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor="#00e1a0"
              maximumTrackTintColor="#D1D1D1"
              thumbTintColor={'#00d4a8'}
              trackStyle={styles.trackStyle}
              thumbStyle={styles.thumbStyle}
              value={currentTime}
              tapToSeek
              onSlidingStart={_onSlidingStart}
              onSlidingComplete={_onSlidingComplete}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <TextBox style={styles.textTime}>
              {_renderTime(currentTime)}
            </TextBox>
            <TextBox style={styles.textTime}>{_renderTime(duration)}</TextBox>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;
