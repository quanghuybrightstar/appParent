import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from './style';
import Video from 'react-native-video';
import API from '../../../../../API/APIConstant';
const { width, height } = Dimensions.get('window');

const Champion = (props) => {
    const [rank, setRank] = useState('');
    const [widthSlider, setWidth] = useState(new Animated.Value(0));
    const [st2, setSt2] =  useState(0)
    const AudioRecord = useRef();
    const [play, setPlay] = useState(true);
    let widthAnimated = (width / 2.2) / 100 * parseInt(props.item.score);
    useEffect(() => {
        _setWidth();
        
        setSt2(widthAnimated)
    }, [props.item.score]);
    
    const _setWidth = () => {
        setWidth((width / 2.2) / 100 * parseInt(props.item.score));
        switch (props.index) {
            case (1):
                setRank('st');
                break;
            case (2):
                setRank('nd');
                break;
            case (3):
                setRank('rd');
                break;
        };

        // if (props.index < 2) {
        //     Animated.timing(
        //         widthSlider,
        //         {
        //             toValue: widthAnimated,
        //             duration: 1000,
        //         }
        //     ).start();
        // }else{
        //     Animated.timing(
        //         widthSlider,
        //         {
        //             toValue: widthAnimated,
        //             duration: 0,
        //         }
        //     ).start();
        // }
    };

    const _setPlay = () => {
        if(!props.isCanPlay) setPlay(false)

        if(props.isCanPlay()){
            props.startPlay && props.startPlay()
            setPlay(false)
        }
    }

    const _endAudio = async () => {
        await setPlay(true);
        AudioRecord.current.seek(0);
        props.endPlay && props.endPlay()
    };

    return (
        <View style={styles.container}>
            {
                props.index > 0 ?
                    <View style={styles.ViewContent}>
                        <Text style={styles.titleContent}>{props.index}</Text>
                        <Text style={{ fontSize: 14, textAlign: 'justify' }}>{rank}</Text>
                        <Text style={styles.titleContent}>:</Text>
                    </View>
                    :
                    <View style={styles.ViewContent}>
                        <Text style={styles.titleContent}>latest:</Text>
                    </View>
            }
            <View style={styles.boView}>
                <View style={styles.viewSlider}>
                    <View style={{ backgroundColor: '#52aadd', borderRadius: 50, width: `${props.item.score}%`, height: '100%' }}>
                    </View>
                </View>
                <Text style={{ textAlign: 'right', paddingHorizontal: 5 }}>{parseInt(props.item.score)}%</Text>
            </View>
            <TouchableOpacity onPress={() => _setPlay()}>
                <Image source={{ uri: 'pronunciation1118' }} style={styles.iconListen} />
            </TouchableOpacity>
            {console.log("=====props.item.audio",props.item.audio)}
            <Video
                source={{ uri: props.item.audio }}
                ref={AudioRecord}
                paused={play}
                onEnd={_endAudio}
            />
        </View>
    )
}
export default Champion