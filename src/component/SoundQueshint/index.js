import React, {useRef, useState, useEffect} from 'react';
import {View, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import EventBus from 'react-native-event-bus';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import styles from './style'

const SoundQueshint = (props) => {

    const {pause} = props;
    console.log('pause', pause);
    const [play, setPlay] = useState(true);
    const [onSliding, setOnSliding] = useState(false);
    const [dataAudio, setDataAudio] = useState('');
    const [runSlider, setRunSlider] = useState(0);
    const [audioLongQuestion, setAudioLongQuestion] = useState(0);
    const Audio = useRef();
    const [loadding, setLoading] = useState(true);

    useEffect(() => {
        const _listener = (data) => {
            setPlay(true);
        };
        EventBus.getInstance().addListener("sound_should_pause", _listener)

        return()=>{
            EventBus.getInstance().removeListener("sound_should_pause", _listener)
        }
    }, []);

    useEffect(() => {
        if (props.Audio) {
            setDataAudio(props.Audio);
            setLoading(true);
        }
    }, [props.Audio]);

    useEffect(() => {
        if (pause) {
            setPlay(true);
            if(runSlider === audioLongQuestion){
                Audio.current.seek(0);
            }
        } else {
            setPlay(false);
        }
    }, [pause]);

    const playAudio = () => {
        props.action();
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
        await setPlay(true);
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
        <View style={styles.container}>
            {
                loadding ?
                    <TouchableOpacity onPress={playAudio} style={styles.ViewButtonPlay}>
                        <Image source={{uri: play ? 'lesson_listen_image3' : 'lesson_listen_image1'}}
                               style={styles.iconPlay}
                        />
                    </TouchableOpacity>
                    :
                    <ActivityIndicator size="small" color="#000"/>
            }
            <Slider
                onSlidingStart={_changeValue}
                onSlidingComplete={_changeValueComplete}
                value={runSlider}
                maximumValue={audioLongQuestion}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#00000080"
                thumbTintColor="#000000"
                style={styles.sliderStyles}
                trackStyle={styles.trackStyle}
                thumbStyle={styles.thumbStyle}
            />
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
};

export default SoundQueshint;
