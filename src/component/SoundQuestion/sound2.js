import React, {useRef, useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {View, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import styles from './style'
import EventBus from 'react-native-event-bus';

const Sound2 =  forwardRef((props, ref ) => {
        useImperativeHandle(ref,()=>({playAudio}))

    const [play, setPlay] = useState(true);
    const [onSliding, setOnSliding] = useState(false);
    const [dataAudio, setDataAudio] = useState('');
    const [runSlider, setRunSlider] = useState(0);
    const [audioLongQuestion, setAudioLongQuestion] = useState(0);
    const Audio = useRef();
    const [loadding, setLoading] = useState(true);

    const {pauseQuestion, type,style,sliderStyles} = props;

    React.useEffect(()=>{
        console.log('sound mounted')
        const _listener = (data) => {
            setPlay(true);
        };
        EventBus.getInstance().addListener("sound_should_pause", _listener)

        return()=>{
            EventBus.getInstance().removeListener("sound_should_pause", _listener)
        }
    },[])

    useEffect(() => {
        if (props.Audio) {
            setDataAudio(props.Audio);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [props.Audio]);

    useEffect(() => {
        if (type === 'listening2') {
            if (pauseQuestion) {
                setPlay(true);
                if(runSlider === audioLongQuestion){
                    Audio.current.seek(0);
                }
            } else {
                setPlay(false);
            }
        }
    }, [pauseQuestion]);

    //todo: truyền vào ref
    useImperativeHandle(ref, () => ({
        _endAudio,
      }));

    const playAudio = () => {
        if (type === 'listening2') {
            props.action();
        } else {
            setPlay(!play);
            if(runSlider === audioLongQuestion){
                Audio.current.seek(0);
            }
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
        <View style={[styles.container,style]}>
            {
                props.cardFormat !== 'pro3' &&
                <View style={{paddingRight: 5}}>
                    {
                        !loadding ?
                            <TouchableOpacity onPress={playAudio} style={styles.ViewButtonPlay} >
                                {
                                    props.status == 'hint'?
                                    <Image source={{uri: play ? 'lesson_listen_image3' : 'lesson_listen_image1'}}
                                       style={{...styles.iconPlay,}}
                                />
                                :
                                <Image source={{uri: play ? 'playwhite' : 'pausewhite'}}
                                       style={styles.iconPlay}
                                />
                                }
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
                minimumTrackTintColor={props.status?"#000000":"#ffffff"}
                maximumTrackTintColor={props.status?"#00000080":"#ffffff80"}
                thumbTintColor={props.status?undefined:"#FFFFFF"}
                style={[styles.sliderStyles,sliderStyles]}
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
});

export default Sound2;
