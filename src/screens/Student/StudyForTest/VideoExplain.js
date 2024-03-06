import React from 'react'
import {View,StyleSheet} from 'react-native'
import HeaderGradient from '../../../commons/HeaderGradient';
import SmartScreenBase from '../../../base/SmartScreenBase';
import VideoDocument from '../../../component/ComponentDetailStudyGuide/VideoDocument';
const Screen=({navigation})=>{
    const path = navigation.getParam('path')
    return <View
    style={{flex: 1,backgroundColor:'#fff'}}>
        <HeaderGradient 
            title={'Video chữa bài'} 
            goBack={() => navigation.goBack()}/>
        <View style={styles.content}>
            <VideoDocument path={path}/>
        </View>
    </View>
}

export default Screen;

const styles = StyleSheet.create({
    content:{
        flex:1,
    },
})