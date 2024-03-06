import React, {useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from "./styles";
import Slider from "@react-native-community/slider";
import Video from "react-native-video";
import LoadingScreen from "../../../screens/LoadingScreen";

const AudioDocument = (props) => {
    const {path} = props;
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [pause, setPause] = useState(true);
    const [loading, setLoading] = useState(true);
    const [onSliding, setOnSliding] = useState(false);
    const playAudio = useRef();
    const [isStop,setStop] = useState(false);

    const _renderTime = (seconds) => {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);
        return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
    };

    const _handlePlay = () => {
        if(isStop){
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
        if (parseInt(currentTime) < parseInt(duration - 10)) {
            playAudio.current.seek(currentTime + 10);
        } else {
            playAudio.current.seek(duration);
        }
    };

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
                source={{uri: path}}
                audioOnly={true}
                ref={playAudio}
                paused={pause || onSliding}
                onProgress={event => setCurrentTime(event.currentTime)}
                onSeek={event => setCurrentTime(event.currentTime)}
                onLoad={event => {
                    setLoading(false);
                    setDuration(event.duration);
                }}
                onEnd={() => {
                    setPause(true);
                    setStop(true)
                    //playAudio.current.seek(0);
                }}
            />
            {loading ? <LoadingScreen/> :
                <View style={styles.containerAudio}>
                    <View style={styles.viewProcess}>
                        <Text style={styles.textTime}>{_renderTime(currentTime)}</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={duration}
                            minimumTrackTintColor={"#00d4a8"}
                            maximumTrackTintColor={"#D1D3D4"}
                            thumbTintColor={'#00d4a8'}
                            trackStyle={styles.trackStyle}
                            thumbStyle={styles.thumbStyle}
                            value={currentTime}
                            onSlidingStart={_onSlidingStart}
                            onSlidingComplete={_onSlidingComplete}
                        />
                        <Text style={styles.textTime}>{_renderTime(duration)}</Text>
                    </View>

                    <View style={styles.viewControl}>
                        <TouchableOpacity style={styles.buttonNext} onPress={_handlePrev}>
                            <Image source={{uri: 'prev_study_guide'}} style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonPlay} onPress={_handlePlay}>
                            <Image source={{uri: pause ? 'play_study_guide' : 'pause_study_guide'}}
                                   style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonNext} onPress={_handleNext}>
                            <Image source={{uri: 'next_study_guide'}} style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
};

export default AudioDocument;
