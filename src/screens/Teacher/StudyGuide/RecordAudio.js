import React, {useState, useRef, useEffect} from 'react'
import {Modal, View, Image, TouchableOpacity, Text, TouchableWithoutFeedback,Platform} from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
import Video from "react-native-video";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import FontBase from '../../../base/FontBase';
import { TimeCountUp } from '../../../componentBase/TimeCountUp/TimeCountUp';

const RecordAudio = (props) => {
    console.log('RecordAudio',props)
    const player = useRef();
    const timeUpRef = useRef();
    const uri = 'file://' + props.path;
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [pause, setPause] = useState(true);
    const [isStop,setStop] = useState(false);

    useEffect(() => {
        if (props.path) {
            setCurrentTime(0);
            setDuration(0);
            setPause(true);
        }
    }, [props.path]);

    const _handlePlay = () => {
        if(isStop){
            setStop(false);
            player.current.seek(0);
        }
        setPause(!pause);
        // if (currentTime === duration) {
        //     player.current.seek(0);
        // }
    };

    const _onSlidingComplete = (value) => {
        player.current.seek(value);
    };

    const recoderClick = () => {
        console.log("=====recoderClick")
        timeUpRef.current?.stop()
        props._handleRecode && props._handleRecode()
    };

    return (
        <Modal animationType="slide" transparent={true} visible={true}>
            {
                (props.path && !props.recoding) ?
                    <Video source={{uri}}   // Can be a URL or a local file.
                           ref={player}
                           audioOnly={true}
                           paused={pause}
                           onLoad={(event) => setDuration(event.duration)}
                           onProgress={(event) => setCurrentTime(event.currentTime)}
                           onSeek={(event) => setCurrentTime(event.currentTime)}
                           onEnd={() => {
                               setPause(true);
                               setStop(true);
                               //player.current.seek(0);
                           }}
                    />
                    : null
            }
            <TouchableWithoutFeedback onPress={props._cancelModalRecord}>
                <View style={{
                    flex: 1, backgroundColor: '#00000070', justifyContent: 'center', alignItems: 'center'
                }}>
                    <View
                        style={{
                            width: SmartScreenBase.smPercenWidth * 70, backgroundColor: '#fff',
                            borderRadius: SmartScreenBase.smPercenWidth * 5, height: '45%',
                            alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <Text style={{
                            position: 'absolute',
                            top: SmartScreenBase.smPercenWidth * 5,
                            left: SmartScreenBase.smPercenWidth * 5,
                            fontFamily: FontBase.MyriadPro_Bold,
                            fontSize: SmartScreenBase.smFontSize * 50
                        }}>Thu âm</Text>

                        <View style={{
                            width: '100%',
                            height: SmartScreenBase.smPercenWidth * 27,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: SmartScreenBase.smPercenHeight * 3
                        }}>
                            {props.recoding &&
                            <Image source={{uri: 'teacher_huongdanbaigiang_ghiam'}}
                                   style={{
                                       position: 'absolute',
                                       left: 0,
                                       right: 0,
                                       height: SmartScreenBase.smPercenWidth * 10,
                                   }}/>
                            }
                            <TouchableOpacity style={{
                                width: SmartScreenBase.smPercenWidth * 27, height: SmartScreenBase.smPercenWidth * 27,
                                position: 'absolute',
                                left: SmartScreenBase.smPercenWidth * 21.5,
                            }}
                                              onPress={recoderClick}
                            >
                                <Image
                                    source={{uri: props.recoding ? 'teacher_huongdanbaigiang_btn_dung_ghiam' : 'teacher_huongdanbaigiang_btn_ghiam'}}
                                    style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                                />
                            </TouchableOpacity>
                            {props.recoding &&
                            <View style={{
                                       position: 'absolute',
                                       height: SmartScreenBase.smPercenWidth * 15,
                                       width: SmartScreenBase.smPercenWidth * 30,
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       bottom: -SmartScreenBase.smPercenWidth * 22,
                                   }}>
                                <TimeCountUp visible={true} ref={timeUpRef}/>
                            </View>}
                        </View>
                        {
                            (!props.recoding && props.path) ?
                                <View
                                    style={{position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity style={{
                                            width: SmartScreenBase.smPercenWidth * 10, alignItems: 'center',
                                            height: SmartScreenBase.smPercenWidth * 10, justifyContent: 'center'
                                        }}
                                            onPress={_handlePlay}
                                        >
                                            <Image
                                                source={{uri: pause ? 'teacher_huongdanbaigiang_btn_play' : 'teacher_huongdanbaigiang_btn_pause'}}
                                                style={{width: '80%', height: '80%', resizeMode: 'contain',}}
                                            />
                                        </TouchableOpacity>

                                        <View style={{
                                            width: SmartScreenBase.smPercenWidth * 35,
                                            height: SmartScreenBase.smPercenHeight,
                                            backgroundColor: '#d1d3d4',
                                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                                            borderRadius: SmartScreenBase.smPercenWidth * 1.5
                                        }}>
                                            <LinearGradient colors={['#00e1a0', '#00b9b7']}
                                                            start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                                                            style={{
                                                                width: (currentTime / duration * 100) + '%',
                                                                height: '100%',
                                                                borderRadius: SmartScreenBase.smPercenWidth * 1.5
                                                            }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        width: '90%',
                                        marginHorizontal: SmartScreenBase.smPercenWidth * 3,
                                        justifyContent: 'space-between',
                                        marginTop: SmartScreenBase.smPercenHeight * 2,
                                        marginBottom: SmartScreenBase.smPercenHeight * 2
                                    }}>
                                        <TouchableOpacity onPress={props._cancelModalRecord} style={{width: '47%'}}>
                                            <LinearGradient colors={['#00e1a0', '#00b9b7']}
                                                            start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                                                            style={{
                                                                width: '100%',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                height: SmartScreenBase.smPercenHeight * 4.5,
                                                                backgroundColor: '#01283A',
                                                                borderRadius: SmartScreenBase.smPercenWidth * 4
                                                            }}
                                            >
                                                <Text style={{
                                                    color: '#fff', 
                                                    fontFamily: Platform.OS==='android'?'myriadpro_bold':'MyriadPro-Bold',
                                                    fontSize: SmartScreenBase.smFontSize * 40
                                                }}>Hủy</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{width: '47%'}} onPress={props._saveRecode}>
                                            <LinearGradient colors={['#00e1a0', '#00b9b7']}
                                                            start={{x: 0, y: 0.5}} end={{x: 0.5, y: 0.5}}
                                                            style={{
                                                                width: '100%',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                height: SmartScreenBase.smPercenHeight * 4.5,
                                                                backgroundColor: '#01283A',
                                                                borderRadius: SmartScreenBase.smPercenWidth * 4
                                                            }}
                                            >
                                                <Text style={{
                                                    color: '#fff', 
                                                    fontFamily: Platform.OS==='android'?'myriadpro_bold':'MyriadPro-Bold',
                                                    fontSize: SmartScreenBase.smFontSize * 40
                                                }}>Lưu</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View> : null
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default RecordAudio;
