import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import AudioComponent from './AudioComponent';
import SmartScreenBase from '../../base/SmartScreenBase';
import API from '../../API/APIConstant';
import FontBase from '../../base/FontBase';
import LogBase from '../../base/LogBase';

const formatScript=(s)=>{
    if(!s)return '';
    return s.replace(/{.+?}/g,function(a,v){
        return `(${a.replace(/[{}]/g,'')})______`
    })
}

const QuestionHeader=React.forwardRef(({data,result},ref)=>{
    const _audio = React.useRef(null);
    const pause=()=>{
        if(_audio.current){
            _audio.current.pause();
        }
    }
    React.useImperativeHandle(ref, () => ({
        pause
    }));

    return <>
        {
            !!data.group_file&&!result&&<AudioComponent 
                ref={_audio}
                path={`${API.domain}${data.group_file}`}
            />
        }
        <Text style={styles.title}>
            {data.group_content}
        </Text>
        {
            !!data.group_title  &&
            <Text style={styles.groupTitle}>
                {data.group_title}
            </Text>
        }
        {
            !!data.group_script&&<Text style={styles.groupScript} >
                    {formatScript(data.group_script)}
            </Text>
        }
    </>
})

const QuestionHeaderListen=React.forwardRef(({data,result},ref)=>{
    const _audio = React.useRef(null);
    const pause=()=>{
        if(_audio.current){
            _audio.current.pause();
        }
    }
    React.useImperativeHandle(ref, () => ({
        pause
    }));

    return <>
        {
            !!data.group_file&&!result&&<AudioComponent 
                ref={_audio}
                path={`${API.domain}${data.group_file}`}
            />
            }
        <Text style={styles.title}>
            {data.group_content}
        </Text>
    </>
})

const QuestionHeaderFillInBlank=React.forwardRef(({data,result},ref)=>{
    const _audio = React.useRef(null);
    const pause=()=>{
        if(_audio.current){
            _audio.current.pause();
        }
    }
    React.useImperativeHandle(ref, () => ({
        pause
    }));

    return <>
        {
            !!data.group_title  &&
            <Text style={styles.groupTitle}>
                {data.group_title}
            </Text>
        }
        {
            !!data.group_script&&<Text 
            style={styles.groupScript}
                >{formatScript(data.group_script)}</Text>
        }
        <Text style={styles.title}>
            {data.group_content}
        </Text>
    </>
})
const styles = StyleSheet.create({
    title:{
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily:FontBase.MyriadPro_Bold
    },
    groupTitle:{ 
        fontSize: SmartScreenBase.smFontSize * 50, 
        marginTop:SmartScreenBase.smPercenHeight*1.5,
        width:'100%',
        textAlign:'center',
        fontFamily:FontBase.MyriadPro_Regular
    },
    groupScript:{
        marginVertical:SmartScreenBase.smPercenHeight*1.5,
        fontSize:SmartScreenBase.smFontSize*50,
        textAlign:'justify',
        fontFamily:FontBase.MyriadPro_Regular
    }
})
export {QuestionHeader,QuestionHeaderFillInBlank,QuestionHeaderListen}