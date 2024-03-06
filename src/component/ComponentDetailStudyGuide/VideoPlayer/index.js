/* eslint-disable react/jsx-no-bind */
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import styles from './styles';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import {TextBox} from '../../../componentBase/TextBox';
import Slider from '@react-native-community/slider';

const VideoPlayer = (props) => {
  const {path} = props;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pause, setPause] = useState(true);
  const [onSliding, setOnSliding] = useState(false);
  const [portrait, setPortrait] = useState(true);
  const [showControl, setShowControl] = useState(true);
  const [roundType, setRoundType] = useState('');
  const playVideo = useRef();
  const [isStop, setStop] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const timeout = React.useRef(null);
  const _oldPause = React.useRef('0');
  const [index, setIndex] = useState(1);
  const [seekValue, setSeekValue] = useState(0);
  const [realCurr, setRealCurr] = useState(0);

  useEffect(() => {
    setTime();
    return () => {
      clearTimeout(timeout.current);
      Orientation.lockToPortrait();
    };
  }, [setTime]);

  const _renderTime = useCallback((seconds) => {
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
  }, []);

  const setTime = useCallback(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setShowControl(false);
    }, 3000);
  }, []);

  const _handlePlay = useCallback(() => {
    if (isStop) {
      setStop(false);
      setCurrentTime(0);
      setSeekValue(0);
      playVideo.current.seek(0);
    }
    // playVideo.current.seek(realCurr);
    setPause(!pause);
    setTime();
  }, [isStop, pause, setTime]);

  const _handlePrev = useCallback(() => {
    setStop(false);
    setTime();
    if (parseInt(currentTime, 10) > 10) {
      playVideo.current.seek(currentTime - 10);
      setCurrentTime(currentTime - 10);
      setSeekValue(currentTime - 10);
    } else {
      playVideo.current.seek(0);
      setCurrentTime(0);
      setSeekValue(0);
    }
    setIndex(0);
  }, [currentTime, setTime]);

  const _handleNext = useCallback(() => {
    setStop(false);
    setTime();
    if (parseInt(currentTime, 10) < parseInt(duration - 10, 10)) {
      playVideo.current.seek(currentTime + 10);
      setCurrentTime(currentTime + 10);
      setSeekValue(currentTime + 10);
    } else {
      playVideo.current.seek(duration);
      setCurrentTime(duration);
      setSeekValue(duration);
    }
    setIndex(0);
    setSeekValue(currentTime + 10);
  }, [currentTime, duration, setTime]);

  const _onSlidingStart = useCallback(() => {
    clearTimeout(timeout.current);
    setStop(false);
    setOnSliding(true);
  }, []);

  const _onSlidingComplete = useCallback(
    (value) => {
      console.log('value._onSlidingComplete', value);
      setTime();
      setOnSliding(false);
      if (value === duration) {
        playVideo.current.seek(value);
        setStop(true);
      }
      setIndex(0);
      setSeekValue(value);
      playVideo.current.seek(value);
      if (Math.round(value) === Math.round(duration)) {
        setCurrentTime(duration);
        setStop(true);
        setPause(true);
      } else {
        setCurrentTime(value + 0.5);
      }
    },
    [duration, setTime],
  );

  const _handleZoom = useCallback(() => {
    _oldPause.current = pause ? '1' : '2';
    setTime();
    // console.log('realCurr._handleZoom', realCurr);
    // console.log('currentTime._handleZoom', currentTime);
    // setPause(true);
    // if (realCurr < currentTime) {
    //   playVideo.current.seek(currentTime);
    //   setSeekValue(currentTime);
    // } else {
    //   playVideo.current.seek(realCurr + 0.5);
    //   setCurrentTime(realCurr + 0.5);
    //   setSeekValue(realCurr + 0.5);
    // }
    setShowControl(false);
    if (portrait) {
      setPortrait(false);
      if (Platform.OS === 'ios') {
        Orientation.lockToLandscapeRight();
      } else {
        Orientation.lockToLandscape();
      }
    } else {
      setPortrait(true);
      Orientation.lockToPortrait();
    }
  }, [pause, portrait, setTime]);

  const _handleShowControl = useCallback(() => {
    setShowControl(!showControl);
    setTime();
  }, [setTime, showControl]);

  const _renderVideo = useCallback(() => {
    function onSeek(event) {
      // if (roundType === 'ceil') {
      //   setCurrentTime(Math.ceil(event.currentTime));
      // } else if (roundType === 'floor') {
      //   setCurrentTime(Math.round(event.currentTime));
      // }
      // if (roundType === 'ceil') {
      //   setCurrentTime(Math.ceil(event.currentTime));
      // } else if (roundType === 'floor') {
      //   setCurrentTime(Math.floor(event.currentTime));
      // }
    }
    function onProgress(event) {
      console.log('event.onProgress', event);
      console.log('seekValue.onProgress', seekValue);
      setRealCurr(
        event.currentTime < Math.round(currentTime)
          ? currentTime
          : event.currentTime,
      );
      if (index > 0) {
        // setCurrentTime(event.currentTime);
        if (
          (seekValue &&
            Math.round(seekValue) === Math.round(event.currentTime)) ||
          !seekValue
        ) {
          console.log('event', event);
          console.log('seekValue', seekValue);
          console.log(
            'Math.round(seekValue) === Math.round(event.currentTime)',
            Math.round(seekValue) === Math.round(event.currentTime),
          );
          if (roundType === 'ceil') {
            setCurrentTime(Math.ceil(event.currentTime));
          } else if (roundType === 'floor') {
            console.log(
              'Math.round(event.currentTime)',
              Math.round(event.currentTime),
            );
            setCurrentTime(Math.round(event.currentTime));
          }
          setSeekValue(0);
        }
        // setCurrentTime(Math.ceil(event.currentTime));
      } else {
        setIndex(index + 1);
        console.log('index', index);
      }
    }
    function onLoad(event) {
      setLoading(false);
      console.log('event', event.duration);
      console.log('Math.round(event.duration)', Math.round(event.duration));
      if (
        Math.round(event.duration) === Math.floor(event.duration) ||
        event.duration - Math.ceil(event.duration) < 0.3
      ) {
        setRoundType('floor');
      } else if (Math.round(event.duration) === Math.ceil(event.duration)) {
        setRoundType('ceil');
      }
      if (Math.round(event.duration) === Math.ceil(event.duration)) {
        setDuration(Math.ceil(event.duration));
      } else if (Math.round(event.duration) === Math.floor(event.duration)) {
        setDuration(Math.floor(event.duration));
      }
      _oldPause.current = '0';
      //
      console.log('currentTime', currentTime);
      playVideo.current.seek(currentTime);
      if (_oldPause.current === '2') {
        setTimeout(() => {
          setPause(false);
        }, 100);
      }
    }
    function onEnd() {
      console.log('onEnd');
      if (duration === currentTime) {
        setPause(true);
        setStop(true);
      }
    }
    return (
      <Video
        source={{uri: path}}
        style={styles.video}
        ref={playVideo}
        paused={pause || onSliding}
        onProgress={onProgress}
        onSeek={onSeek}
        onLoad={onLoad}
        onEnd={onEnd}
        resizeMode={'contain'}
      />
    );
  }, [
    currentTime,
    duration,
    onSliding,
    path,
    pause,
    roundType,
    index,
    seekValue,
  ]);

  useEffect(() => {
    console.log('curr', currentTime);
  }, [currentTime]);
  useEffect(() => {
    console.log('real', realCurr);
  }, [realCurr]);

  const _renderControl = () => {
    if (loading) {
      return (
        <View style={styles.viewControl}>
          <ActivityIndicator />
        </View>
      );
    }
    return showControl ? (
      <View style={styles.viewControl}>
        <View style={styles.viewTopControl}>
          <TouchableOpacity style={styles.buttonNext} onPress={_handlePrev}>
            <Image
              source={{uri: 'next_video_study_guide'}}
              style={{...styles.iconNext, transform: [{rotate: '180deg'}]}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPlay} onPress={_handlePlay}>
            <Image
              source={{
                uri: pause
                  ? 'play_video_study_guide'
                  : 'pause_video_study_guide',
              }}
              style={styles.iconPlay}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNext} onPress={_handleNext}>
            <Image
              source={{uri: 'next_video_study_guide'}}
              style={styles.iconNext}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewProcess}>
          <TextBox style={styles.textTime}>{_renderTime(currentTime)}</TextBox>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor={'#fff'}
            maximumTrackTintColor={'#D1D3D4'}
            thumbTintColor={'#fff'}
            trackStyle={styles.trackStyle}
            thumbStyle={styles.thumbStyle}
            value={currentTime}
            onValueChange={(value) => {
              setStop(false);
              setCurrentTime(value);
              // setRealCurr(value);
            }}
            onSlidingStart={_onSlidingStart}
            onSlidingComplete={_onSlidingComplete}
          />
          <TextBox style={styles.textTime}>{_renderTime(duration)}</TextBox>
          <TouchableWithoutFeedback
            hitSlop={{
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            }}
            style={styles.buttonZoom}
            onPress={_handleZoom}>
            <Image
              source={{uri: 'zoom_study_guide'}}
              style={styles.buttonZoom}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    ) : null;
  };

  return portrait ? (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={_handleShowControl}>
        <View style={styles.containerVideo}>
          {_renderVideo()}
          {_renderControl()}
        </View>
      </TouchableWithoutFeedback>
    </View>
  ) : (
    <Modal
      visible={true}
      animationType={'fade'}
      transparent={true}
      supportedOrientations={[
        'portrait',
        'landscape',
        'landscape-left',
        'landscape-right',
      ]}>
      <TouchableWithoutFeedback onPress={_handleShowControl}>
        <View style={styles.containerModal}>
          {_renderVideo()}
          {_renderControl()}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default VideoPlayer;
