import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    Text,
    Image, ScrollView
} from 'react-native';
import styles from './style'
// import { ScrollView } from 'react-native-gesture-handler';
import LessonBase from '../../base/LessonBase';
import SoundQuestion from '../SoundQuestion';
import SmartScreenBase from '../../base/SmartScreenBase';

const modalScript = (props) => {
    const [visible, setVisible] = useState(false);
    const [audio, setAudio] = useState(props.audio);
    const _close = () =>{
        props.close()
    }

    if(!props.visible || !props.title)
        return null;

    return (
        <View style={styles.container}>
            <View style={styles.viewScript}>
                <ScrollView>
                    {
                        props.title.split('\n').map((r,ir)=>{
                            return <View key={ir} style={styles.content}>
                                {
                                    r.split(' ').map((e,i)=>{
                                        return <Text onLongPress={()=>{
                                            LessonBase.goTranslate(e)
                                        }} style={styles.text} key={i}>{e}</Text>
                                    })
                                }
                            </View>
                        })
                    }
                </ScrollView>
                {audio && <View style={{marginTop: SmartScreenBase.smPercenWidth}}/>}
                {audio && <SoundQuestion inPopup Audio={audio}/>}
                <TouchableOpacity style={styles.buttonClose} onPress={_close}>
                    <Image source={{uri:'icon_close'}} style={{width:15, height:15, resizeMode:'contain', tintColor:'gray'}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default modalScript