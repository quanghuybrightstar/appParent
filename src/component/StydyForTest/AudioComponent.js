import React from 'react'
import {View,StyleSheet,Text,TouchableOpacity,Image,ActivityIndicator} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import Video from "react-native-video";
import Slider from "../../libs/Slider";
import SmartScreenBase from '../../base/SmartScreenBase';
import Icon from 'react-native-vector-icons/Fontisto';

const Screen = ({path,style},ref)=>{
    const _player = React.useRef(null);
    const [playing,setPlaying] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [currentTime,setCurrentTime] = React.useState(0);
    const [duration,setDuration] = React.useState(0);
    const [sliding,setSliding] = React.useState(false);
    const [end,setEnd] = React.useState(false);

    const _onSlidingStart=()=>{
        setSliding(true);
    }
    
    const _onPlayPress=()=>{
        setEnd(false);
        setPlaying(!playing)
    }

    const pause=()=>{
        if(playing){
            setPlaying(false)
        }
    }

    const _onSlidingComplete=(value)=>{
        setSliding(false);
        _player.current.seek(value*duration/1000)
    }
    React.useImperativeHandle(ref, () => ({
        pause
    }));
    React.useEffect(()=>{
        _player.current.seek(0)
        setTimeout(()=>{
            setPlaying(false);
            setCurrentTime(0);
            setDuration(0);
            setSliding(false);
            setEnd(false);
        },100)
    },[path])

    React.useEffect(()=>{
        if(end){
            setCurrentTime(0)
            _player.current.seek(0)
            setEnd(false);
        }
    },[end])
    
    return <View style={[styles.container,style]}>
            <Video
                paused={!playing}
                source={{uri: path}}
                audioOnly={true}
                onProgress={event => {
                    if(duration<=0 && event.seekableDuration >0){
                        setDuration(event.seekableDuration)
                    }

                    if(!sliding){
                        var percent = event.currentTime*1000/(event.playableDuration|| event.seekableDuration );
                        setCurrentTime(percent>1000?1000:percent)
                    }
                }}
                onSeek={event => {
                    
                }}
                onLoad={event => {
                    setLoading(false)
                    setDuration(event.duration)
                }}
                onEnd={(event) => {
                    setEnd(true);
                    setPlaying(false)
                }}
                onLoadStart={()=>{
                    setLoading(true)
                }}
                ref={_player}
            />
            <LinearGradient
                style={styles.content}
                colors={['#00e1a0', '#00b9b7']}
                start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
            >
                <TouchableOpacity onPress={_onPlayPress} style={styles.btn}>
                    {
                        loading?
                            <ActivityIndicator color='#fff'/>:
                            <View style={styles.btnRC}>
                                <Icon name={playing?'pause':'play'} 
                                    size={SmartScreenBase.smBaseWidth*60} color='#fff'/>
                            </View>
                    }
                </TouchableOpacity>
                <Slider
                    disabled={loading}
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1000}
                    minimumTrackTintColor={"#fff"}
                    maximumTrackTintColor={"#fff"}
                    trackStyle={styles.trackStyle}
                    thumbStyle={styles.thumbStyle}
                    leftStyle={styles.leftStyle}
                    value={currentTime}
                    onSlidingStart={_onSlidingStart}
                    onSlidingComplete={_onSlidingComplete}
                />
        </LinearGradient>
    </View>
}
const styles = StyleSheet.create({
    container:{
        marginVertical:SmartScreenBase.smPercenHeight
    },
    btn:{
        paddingHorizontal:SmartScreenBase.smBaseWidth*30,
        height:SmartScreenBase.smBaseWidth*60,
        alignItems:'center',
        zIndex:9999
    },
    content:{
        borderRadius:SmartScreenBase.smBaseWidth*100,
        paddingHorizontal:SmartScreenBase.smPercenWidth*2,
        paddingVertical:SmartScreenBase.smBaseHeight*8,
        flexDirection:'row',
        alignItems:'center'
    },
    slider:{
        flex:1,
        paddingRight:SmartScreenBase.smBaseWidth*60,
    },
    trackStyle:{
        backgroundColor:'#fff',
        height:1,
    },
    thumbStyle:{
        width:0,
        height:0,
    },
    leftStyle:{
        height:6,
        borderRadius:10,
    },
    btnRC:{
        width:SmartScreenBase.smBaseWidth*60,
        height:SmartScreenBase.smBaseWidth*60,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default React.forwardRef(Screen);