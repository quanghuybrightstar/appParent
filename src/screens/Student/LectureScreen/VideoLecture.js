import React, {useCallback, useState, useRef, useEffect} from 'react';
import {View, Image, TouchableWithoutFeedback, Text, TouchableOpacity, Modal, ImageBackground} from 'react-native';
import Video from "react-native-video";
import styles from "./style";
import API from "../../../API/APIConstant";
import Slider from "@react-native-community/slider";
import Orientation from 'react-native-orientation';
import SmartScreenBase from "../../../component/base/SmartScreenBase";

let timeout;
const VideoLecture = (props) => {
    const _playVideo = useRef();
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [pause, setPause] = useState(true);
    const [showControl, setShowControl] = useState(true);
    const [modal, setModal] = useState(false);

    const _getAudioTimeString = (seconds) => {
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);
        return (((m < 10 && '0') + m) + ':' + ((s < 10 && '0') + s));
    };

    const _handleTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setShowControl(false);
        }, 5000);
    };

    const _handlePlay = () => {
        setPause(!pause);
        if (currentTime === duration) {
            _playVideo.current.seek(0);
        }
        _handleTimeout();
    };

    const _iconPlay = useCallback((_onPressPlay) => {
        return (
            <View style={styles.viewTopControl}>
                <TouchableOpacity style={styles.viewIconPlay} onPress={_onPressPlay}>
                    <Image
                        source={{uri: !pause ? 'pausewhite' : 'playwhite'}}
                        style={{...styles.iconPlay, marginLeft: pause ? SmartScreenBase.smPercenWidth * 1.2 : 0}}
                    />
                </TouchableOpacity>
            </View>
        )
    }, [pause]);

    const _showSlider = useCallback((_onScrollComplete) => {
        return (
            <View style={styles.viewBottomControl}>
                <Text style={styles.textSecond}>{_getAudioTimeString(currentTime)}</Text>
                <Slider
                    style={styles.viewSlider}
                    trackStyle={styles.trackStyleSlider}
                    minimumTrackTintColor={'#939598'}
                    thumbTintColor={'#939598'}
                    thumbStyle={styles.thumbStyleSlider}
                    onSlidingComplete={_onScrollComplete}
                    minimumValue={0}
                    maximumValue={duration}
                    value={currentTime}
                />
                <Text style={styles.textSecond}>{_getAudioTimeString(duration)}</Text>
            </View>
        )
    }, [currentTime, duration]);

    const _onCompleteSlider = (value) => {
        _playVideo.current.seek(value);
        _handleTimeout();
    };

    const _onEndVideo = () => {
        setPause(true);
        _playVideo.current.seek(duration);
    };

    const _onLoadVideo = (event) => {
        setDuration(event.duration);
        _playVideo.current.seek(currentTime);
    };

    const _video = useCallback((_onEndVideo, _onLoadVideo) => {
        return (
            <Video
                ref={_playVideo}
                style={styles.video}
                source={{uri: API.urlAvatar + '/' + props.sourceVideo}}
                onLoad={_onLoadVideo}
                onProgress={event => setCurrentTime(event.currentTime)}
                onSeek={event => setCurrentTime(event.currentTime)}
                resizeMode={'stretch'}
                paused={pause}
                onEnd={_onEndVideo}
            />
        )
    }, [showControl, pause, currentTime]);

    const _handleShowControl = () => {
        setShowControl(!showControl);
        if(!showControl){
            _handleTimeout();
        }
    };

    const _controlVideo = useCallback((_openModal) => {
        return (
            showControl && <View style={styles.viewControl}>
                {
                    modal && <TouchableWithoutFeedback onPress={_openModal}>
                        <View style={styles.viewPositionIconNormal}>
                            <Image
                                source={{uri: 'normal'}}
                                style={styles.iconFull}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                }
                {_iconPlay(_handlePlay)}
                {_showSlider(_onCompleteSlider)}
            </View>
        )
    }, [showControl, pause, currentTime, duration]);

    const _openModal = () => {
        setModal(!modal);
        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'LANDSCAPE') {
                Orientation.lockToPortrait();
            } else {
                Orientation.lockToLandscape();
            }
        });
        _handleTimeout();
    };

    return (
        !modal ?
            <ImageBackground source={{uri: 'imagebackground'}} style={styles.containerVideo}>
                <TouchableWithoutFeedback onPress={_handleShowControl}>
                    <View style={styles.viewVideo}>
                        {_video(_onEndVideo, _onLoadVideo)}
                        {_controlVideo(_openModal)}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.viewBottomVideo}>
                    <TouchableWithoutFeedback onPress={_openModal}>
                        <Image
                            source={{uri: 'full'}}
                            style={styles.iconFull}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </ImageBackground>
            :
            <Modal visible={modal} transparent={true}
                   supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}>
                <TouchableWithoutFeedback onPress={_handleShowControl}>
                    <View style={styles.viewVideo}>
                        {_video(_onEndVideo, _onLoadVideo)}
                        {_controlVideo(_openModal)}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
    )
};

export default VideoLecture;
