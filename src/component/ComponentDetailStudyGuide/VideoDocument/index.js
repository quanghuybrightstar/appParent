import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Modal, ActivityIndicator, StatusBar, Platform } from 'react-native';
import styles from "./styles";
import Slider from "@react-native-community/slider";
import Video from "react-native-video";
import Orientation from "react-native-orientation";

//let timeout;

const VideoDocument = (props) => {
    const { path, autoplayDisabled = false } = props;
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [pause, setPause] = useState(true);
    const [onSliding, setOnSliding] = useState(false);
    const [portrait, setPortrait] = useState(true);
    const [showControl, setShowControl] = useState(true);
    const playVideo = useRef();
    const [isStop, setStop] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const timeout = React.useRef(null);
    const _oldPause = React.useRef('0');

    useEffect(() => {
        // setTime();
        return () => {
            clearTimeout(timeout.current);
            Orientation.lockToPortrait();
        }
    }, []);

    useEffect(() => {
        setPause(true)
    }, [props.pauseTrigger])

    const _renderTime = (seconds) => {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);
        return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
    };

    const setTime = () => {
        clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            setShowControl(false);
        }, 3000)
    };

    const _handlePlay = () => {
        if (isStop) {
            setStop(false);
            playVideo.current.seek(0);
        }
        setPause(!pause);
        setTime();
    };

    const _handlePrev = () => {
        setStop(false);
        setTime();
        if (parseInt(currentTime) > 10) {
            playVideo.current.seek(currentTime - 10);
        } else {
            playVideo.current.seek(0);
        }
    };

    const _handleNext = () => {
        setStop(false);
        setTime();
        if (parseInt(currentTime) < parseInt(duration - 10)) {
            playVideo.current.seek(currentTime + 10);
        } else {
            playVideo.current.seek(duration);
        }
    };

    const _onSlidingStart = () => {
        !!props.setDisableScroll && props.setDisableScroll(true)
        setTimeout(() => {
            clearTimeout(timeout.current);
            setStop(false);
            setOnSliding(true);
        }, 20)
    };

    const _onSlidingComplete = (value) => {
        setTime();
        setOnSliding(false);
        playVideo.current.seek(value);
        !!props.setDisableScroll && props.setDisableScroll(false)
    };

    const _handleZoom = () => {
        _oldPause.current = pause ? '1' : '2';
        setTime();
        setPause(true);
        setShowControl(false);
        if (portrait) {
            setPortrait(false);
            if (Platform.OS === 'android') Orientation.lockToLandscapeLeft();
            else Orientation.lockToLandscapeRight();
        } else {
            props.onZoomout && props.onZoomout()
            setPortrait(true)
            Orientation.lockToPortrait();
        }
    };

    const _handleShowControl = () => {
        setShowControl(!showControl);
        setTime();
    };

    const _renderVideo = () => {
        return (
            <Video
                source={{ uri: path }}
                style={styles.video}
                ref={playVideo}
                paused={pause || onSliding}
                onProgress={event => setCurrentTime(event.currentTime)}
                onSeek={event => setCurrentTime(event.currentTime)}
                onLoad={event => {
                    console.log('onload')
                    setLoading(false)
                    if (currentTime <= 0) {
                        if (duration == 0) {
                            if (props.hasOwnProperty('defaultStart') && props.defaultStart === false) {
                                // setPause(false);
                            } else {
                                setPause(false);
                            }
                            if (autoplayDisabled) {
                                setPause(true);
                            }
                            playVideo.current.seek(0)
                        }
                    } else {
                        playVideo.current.seek(currentTime);
                        if (_oldPause.current === '2') {
                            setTimeout(() => {
                                setPause(false);
                            }, 100)
                        }
                    }
                    setDuration(event.duration);
                    _oldPause.current = '0'
                    //
                }}
                onEnd={() => {
                    console.log('onEnd')
                    setPause(true);
                    setStop(true)
                    setCurrentTime(duration)
                }}
                resizeMode={'contain'}

            />
        )
    };

    const _renderControl = () => {
        if (loading) {
            return <View style={styles.viewControl}>
                <ActivityIndicator />
            </View>
        }
        return (
            showControl ?
                <View style={styles.viewControl}>
                    <View style={styles.viewTopControl}>
                        <TouchableOpacity style={styles.buttonNext} onPress={_handlePrev}>
                            <Image source={{ uri: 'next_video_study_guide' }}
                                style={{ ...styles.iconNext, transform: [{ rotate: '180deg' }] }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonPlay} onPress={_handlePlay}>
                            <Image source={{ uri: pause ? 'play_video_study_guide' : 'pause_video_study_guide' }}
                                style={styles.iconPlay} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonNext} onPress={_handleNext}>
                            <Image source={{ uri: 'next_video_study_guide' }} style={styles.iconNext} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewProcess}>
                        <Text style={styles.textTime}>{_renderTime(currentTime)}</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={duration}
                            minimumTrackTintColor={"#fff"}
                            maximumTrackTintColor={"#D1D3D4"}
                            thumbTintColor={'#fff'}
                            trackStyle={styles.trackStyle}
                            thumbStyle={styles.thumbStyle}
                            value={currentTime}
                            onSlidingStart={_onSlidingStart}
                            onSlidingComplete={_onSlidingComplete}
                        />
                        <Text style={styles.textTime}>{_renderTime(duration)}</Text>
                        <TouchableWithoutFeedback style={styles.buttonZoom} onPress={_handleZoom}>
                            <Image source={{ uri: portrait ? 'zoom_study_guide' : 'zoom_out_study_guide'}} style={styles.buttonZoom} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                : null
        )
    };

    return (
        portrait ?
            <>
                <StatusBar hidden={false} />
                {/* <View style={styles.container}> */}
                    <TouchableWithoutFeedback onPress={_handleShowControl}>
                        <View style={[styles.containerVideo, props.containerStyle]}>
                            {_renderVideo()}
                            {_renderControl()}
                        </View>
                    </TouchableWithoutFeedback>
                {/* </View> */}
            </>
            :
            <>
                <StatusBar hidden />
                <Modal
                    visible={true}
                    animationType={'fade'} transparent={true}
                    supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}
                >
                    <TouchableWithoutFeedback onPress={_handleShowControl}>
                        <View style={styles.containerModal}>
                            {_renderVideo()}
                            {_renderControl()}
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </>
    )
};

export default VideoDocument;
