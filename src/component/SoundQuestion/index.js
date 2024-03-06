import React, {useRef, useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {View, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import styles from './style'
import EventBus from 'react-native-event-bus';
import SmartScreenBase from '../../base/SmartScreenBase';

const SoundQuestion =  forwardRef((props, ref ) => {
        useImperativeHandle(ref,()=>({playAudio, stopAudio}))
    const [play, setPlay] = useState(true);
    const [onSliding, setOnSliding] = useState(false);
    const [dataAudio, setDataAudio] = useState('');
    const [runSlider, setRunSlider] = useState(0);
    const [audioLongQuestion, setAudioLongQuestion] = useState(0);
    const [runToEnd, setRunToEnd] = useState(false);
    const Audio = useRef();
    const [loadding, setLoading] = useState(true);
    useEffect(() => {
        console.log("=====voice 2:",props.Audio)
        if (props.Audio) {
            setDataAudio(props.Audio);
            setLoading(false);
        }
    }, [props.Audio]);

    React.useEffect(()=>{
        console.log('sound mounted')
        const _listener = (data) => {
            setPlay(true);
            props.playSound && props.playSound()
        };
        EventBus.getInstance().addListener("sound_should_pause", _listener)

        return()=>{
            EventBus.getInstance().removeListener("sound_should_pause", _listener)
        }
    },[])

    
    const playAudio = () => {
        setPlay(!play);
        if(runToEnd){
            setRunSlider(0);
            Audio.current.seek(0);
            setRunToEnd(false)
        }
    };

    const stopAudio = () => {
        setPlay(true);
        if(runToEnd){
            setRunSlider(0);
            Audio.current.seek(0);
            setRunToEnd(false)
        }
    };

    const _setting = (value) => {
        setAudioLongQuestion(value.duration);
        if(props.autoPlay){
            setPlay(false);
        }
    };
    const _settingSlider = (value) => {
        setRunSlider(value.currentTime);
    };

    const _endAudio = async () => {
        setRunToEnd(true);
        await setPlay(true);
        await props.playSound();
        Audio.current.seek(0);
        setRunSlider(0);
    };

    const _changeValue = async () => {
        await setOnSliding(true);
    };
    const _changeValueComplete = (value) => {
        Audio.current.seek(value);
        setOnSliding(false);
    };
    return (
        <View style={[styles.container, props.inPopup && {width: SmartScreenBase.smPercenWidth*80}]}>
            <View style={[styles.controlV, props.inPopup && {backgroundColor: '#999999'}]}>
            {
                props.cardFormat !== 'pro3' &&
                <View>
                    {
                        !loadding ?
                            <TouchableOpacity onPress={playAudio} style={styles.ViewButtonPlay}>
                                <Image source={{uri: play ? 'playwhite' : 'pausewhite'}}
                                       style={styles.iconPlay}
                                />
                            </TouchableOpacity>
                            :
                            <ActivityIndicator size="small" color="#fff"/>
                    }
                </View>

            }
                <Slider
                    onSlidingStart={_changeValue}
                    onSlidingComplete={_changeValueComplete}
                    value={runSlider}
                    maximumValue={audioLongQuestion}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#ffffff80"
                    thumbTintColor="#FFFFFF"
                    style={{marginLeft: SmartScreenBase.smPercenWidth ,width: props.inPopup ? SmartScreenBase.smPercenWidth * 60 : SmartScreenBase.smPercenWidth * 80}}
                    trackStyle={styles.trackStyle}
                    thumbStyle={styles.thumbStyle}
                />
            </View>
            <Video
                audioOnly={true}
                source={{uri: dataAudio}}
                ref={Audio}
                paused={play || onSliding}
                onEnd={_endAudio}
                onLoad={_setting}
                onProgress={_settingSlider}
                onSeek={_settingSlider}
            />
        </View>
    );
});

export default SoundQuestion;
