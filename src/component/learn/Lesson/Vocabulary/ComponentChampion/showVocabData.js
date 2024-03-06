import React, { useState, useEffect } from 'react';
import { View, Text,FlatList ,StyleSheet, TouchableOpacity, Image} from 'react-native';
import SmartScreenBase from '../../../../../base/SmartScreenBase';
import font from '../../../../../base/FontBase'

const ShowData = (props) => {
    
    const _close = () =>{
        console.log("======OK")
        props.close()
    }

    const _renderItem = ({ item, index }) => {
        console.log('item',item)
        return (
            <View style={{ width: '100%', height: 30, alignItems: 'center', flexDirection: 'row' }}>
                <Text style={[{flex:1},styles.text]}>/{item.label}/</Text>
                <Text style={[{flex:1},styles.text]}>{item.score}%</Text>
                <Text style={[styles.text,{flex:2}]}>{item.sounds_like}</Text>
            </View>)

    }
    return (
        <View style={[styles.con,props.style]}>
            <TouchableOpacity style={styles.buttonClose} onPress={_close}>
                <Image source={{uri:'icon_close'}} style={{width:15, height:15, resizeMode:'contain', tintColor:'gray'}} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[{flex:1},styles.lb]}>Phone</Text>
                <Text style={[{flex:1},styles.lb]}>Score</Text>
                <Text style={[{flex:2},styles.lb]}>Sound like</Text>
            </View>
            <FlatList
                data={props.showVocab? props.data[props.index]:[]}
                renderItem={_renderItem}
                style={{ marginTop: 5 }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    lb:{
        fontFamily:font.MyriadPro_Bold,
        fontSize:SmartScreenBase.smFontSize*45,
        textAlign:'center'
    },
    text:{
        fontFamily:font.MyriadPro_Regular,
        fontSize:SmartScreenBase.smFontSize*50,
        textAlign:'center',
        paddingLeft:5
    },
    buttonClose:{
        width: 35,
        height: 35,
        position: 'absolute',
        top: 5,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    con:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10, 
        position: 'absolute', 
        width: '100%', 
        backgroundColor: '#fff', 
        top: SmartScreenBase.smPercenHeight*6, 
        borderRadius: 15, 
        padding: 15,
        paddingTop: SmartScreenBase.smPercenWidth*6,
        zIndex: 99,
    }
})
export default ShowData;