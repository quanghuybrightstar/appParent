import { StatusBar, ImageBackground, View, Alert, Keyboard, Text, StyleSheet, ScrollView, Button, FlatList, TextInput, TouchableOpacity, UIManager, LayoutAnimation, Platform, Image } from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase'
import LinearGradient from 'react-native-linear-gradient';
import React, { useState, useEffect } from 'react';
import { Colors } from "../../../styleApp/color";
import FontBase from '../../../base/FontBase';
import {EmptyTextInput} from '../../../componentBase/EmptyTextInput';
import { width } from '../../ListSkillScreen/style';
import MarkData from './MarkData';

var listSco = []

const ScoreWrittingBox = 
(props) => {

    const [scorelist, setScoreList] = useState([]);
    const [scoreR, setScoreR] = useState([]);
    const [isHide, setIsHide] = useState(true);

    useEffect(() => {
        
        if(!props.data){
            listSco = []
        }else{
            var sList = []
            for(var i=0;i<props.data.length;i++){
                sList.push(props.data[i].score)
            }
            listSco = sList
            setScoreList(sList)
        }
    }, [props.data])

    const criteriaNameItem = (item) => {
        return(
            <View style={[styles.criteriaSty, { width: SmartScreenBase.smPercenWidth * 40}]}>
                <Text style={[styles.TextBody, styles.TextNameTT]}>{item.text}</Text>
            </View>
        )
    } 

    const criteriaPercenItem = (item) => {
        return(
            <View style={[styles.criteriaSty, { width: SmartScreenBase.smPercenWidth * 24, alignItems: 'center',}]}>
                <Text style={styles.TextBody}>{item.proportion+"%"}</Text>
            </View>
        )
    } 

    const criteriaScoreItem = (item, key) => {
        return(
            <View style={[styles.criteriaSty, { width: SmartScreenBase.smPercenWidth * 24, alignItems: 'center',}]}>
                    <EmptyTextInput
                        editable={props.isTeacher}
                        value={scorelist[key]}
                        placeholder={'0'}
                        keyboardType={'numeric'}
                        maxLength={4}
                        style={[{height: SmartScreenBase.smPercenWidth*10, width: SmartScreenBase.smPercenWidth*24
                        }, styles.TextSize, styles.TextBody]}
                         onChangeText={(text) => onChangeText(text, key)}
                    />
            </View>
        )
    } 

    const onChangeText = (text, key) => {
        var mText = text.replace(',','.').replace(',','.');
        if(mText <= 10){
            listSco[key] = mText
            setScoreList(listSco)
            setScoreR(scoreR+1)
            MarkData.curScoreList = listSco;
            console.log('==========Ch_scorelist',scorelist)
            props.setIsDisBtn(sumScore().sum == 0)
        }
    } 

    const sumScore = () => {
        var sum = 0;
        var isAllEmpty = true
        if(props.data){
            for(var i=0;i<props.data.length;i++)
            {
                if(scorelist[i]){
                    sum = sum + scorelist[i]*props.data[i].proportion
                    isAllEmpty = false
                }
            }
        }
        MarkData.totalScore = sum/100
        return {sum: Math.round(sum)/100, isEmpty: isAllEmpty};
    } 

    const hideBox = () => {
        setIsHide(false)
    } 

    const showBox = () => {
        setIsHide(true)
    } 

    return (
        <View style={props.style}>
        {isHide?
        <View>
            <LinearGradient colors={[Colors.LightGreen, Colors.BaseGreen]}
                start={{ x: 0.1, y: 0.2 }} end={{ x: 0.9, y: 0.8 }}
                style={styles.boxScore}>
                <View style={styles.topPath}>
                    <View style={[styles.topPathItem, { width: SmartScreenBase.smPercenWidth * 40 }]}>
                        <Text style={styles.TextSize, styles.TextTittleTop}>Tiêu chí</Text>
                    </View>
                    <View style={[styles.topPathItem, { width: SmartScreenBase.smPercenWidth * 23, marginLeft: SmartScreenBase.smPercenWidth }]}>
                        <Text style={styles.TextSize, styles.TextTittleTop}>Tỷ trọng</Text>
                    </View>
                    <View style={[styles.topPathItem, { width: SmartScreenBase.smPercenWidth * 23, marginLeft: SmartScreenBase.smPercenWidth }]}>
                        <Text style={styles.TextSize, styles.TextTittleTop}>Điểm</Text>
                    </View>
                </View>
                {props.data &&
                    <View style={styles.midPath}>
                        <View style={[styles.midPathItem, { width: SmartScreenBase.smPercenWidth * 64 }]}>
                            <View style={{flexDirection: 'column'}}>
                                {props.data.map(criteriaNameItem)}
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                {props.data.map(criteriaPercenItem)}
                            </View>     
                        </View>
                        <View style={[styles.midPathItem, { width: SmartScreenBase.smPercenWidth * 23, marginLeft: SmartScreenBase.smPercenWidth }]}>
                            <View style={{flexDirection: 'column'}}>
                                    {props.data.map(criteriaScoreItem)}
                            </View> 
                        </View>
                    </View>}
                <View style={styles.botPath}>
                    <View style={[styles.botPathItem, { width: SmartScreenBase.smPercenWidth * 64 }]}>
                        <Text style={styles.TextSize, styles.TextTittleBot}>Điểm</Text>
                    </View>
                    <View style={[styles.botPathItem, { width: SmartScreenBase.smPercenWidth * 23, marginLeft: SmartScreenBase.smPercenWidth, justifyContent: 'center'}]}>
                        <Text style={[styles.TextSize, styles.TextBody, {color: sumScore().isEmpty ? Colors.Gray : Colors.NearBlack}]}>{sumScore().sum}</Text>
                    </View>
                </View>
            </LinearGradient>
            <TouchableOpacity onPress={() => hideBox()} style={[styles.hideButton]}>
                <Image source={{uri: 'muitenup'}} resizeMode={'contain'}
                style={{width: SmartScreenBase.smPercenWidth*6, height: SmartScreenBase.smPercenWidth*6}}/>
            </TouchableOpacity>
        </View>
        :
        <TouchableOpacity onPress={() => showBox()} style={{marginTop: SmartScreenBase.smPercenWidth*3}}>
            <LinearGradient colors={[Colors.LightGreen, Colors.BaseGreen]}
                start={{ x: 0.1, y: 0.2 }} end={{ x: 0.9, y: 0.8 }}
                style={styles.boxInHide}>

                <Image source={{uri: 'iconghi'}} resizeMode={'contain'}
                    style={{width: SmartScreenBase.smPercenWidth*9, height: SmartScreenBase.smPercenWidth*9, marginLeft: SmartScreenBase.smPercenWidth}}/>
                <Image source={{uri: 'muitendown'}} resizeMode={'contain'}
                    style={{width: SmartScreenBase.smPercenWidth*6, height: SmartScreenBase.smPercenWidth*6, marginLeft: SmartScreenBase.smPercenWidth*2.5}}/>
            </LinearGradient>
        </TouchableOpacity>}                  
        </View>
    );
};

export default ScoreWrittingBox;

var styles = StyleSheet.create({

    boxScore: {
        paddingBottom: SmartScreenBase.smPercenWidth*3,
        width: SmartScreenBase.smPercenWidth*92,
        borderRadius: SmartScreenBase.smPercenWidth*4,
        flexDirection: 'column',
        alignItems: 'center'
    },

    topPath: {
        marginTop: SmartScreenBase.smPercenWidth*2,
        flexDirection: 'row'
    },

    topPathItem: {
        backgroundColor: Colors.DarkBaseGreen,
        height: SmartScreenBase.smPercenWidth*12,
        borderRadius: SmartScreenBase.smPercenWidth*10,
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    midPath: {
        marginTop: SmartScreenBase.smPercenWidth,
        flexDirection: 'row'
    },

    midPathItem: {
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth*4,
        flexDirection: 'row'
    },

    botPath: {
        marginTop: SmartScreenBase.smPercenWidth,
        width: SmartScreenBase.smPercenWidth*88,
        flexDirection: 'row'
    },

    botPathItem: {
        backgroundColor: '#fff',
        height: SmartScreenBase.smPercenWidth*12,
        borderRadius: SmartScreenBase.smPercenWidth*10,
        flexDirection: 'row',
        alignItems: 'center' 
    },

    criteriaSty: {
        height: SmartScreenBase.smPercenWidth*10,
        justifyContent: 'center', 
        alignItems: 'flex-start'
    },

    hideButton: {
        backgroundColor: Colors.BaseGreen,
        width: SmartScreenBase.smPercenWidth*16,
        height: SmartScreenBase.smPercenWidth*8.5,
        borderBottomLeftRadius: SmartScreenBase.smPercenWidth*16,
        borderBottomRightRadius: SmartScreenBase.smPercenWidth*16,
        marginLeft: SmartScreenBase.smPercenWidth*71,
        alignItems: 'center'
    },

    boxInHide: {
        backgroundColor: Colors.BaseGreen,
        width: SmartScreenBase.smPercenWidth*22,
        height: SmartScreenBase.smPercenWidth*11,
        borderRadius: SmartScreenBase.smPercenWidth*16,
        flexDirection: 'row',
        alignItems: 'center'
    },

    TextSize: {
        fontSize: SmartScreenBase.smFontSize*50
    },

    TextTittleTop: {
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.White
    },

    TextTittleBot: {
        fontFamily: FontBase.MyriadPro_Bold,
        color: Colors.NearBlack,
        fontSize: SmartScreenBase.smFontSize*50,
        marginLeft: SmartScreenBase.smPercenWidth*5
    },

    TextBody: {
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*50,
    },
    TextNameTT: {
        paddingLeft: SmartScreenBase.smPercenWidth*4
    },
});