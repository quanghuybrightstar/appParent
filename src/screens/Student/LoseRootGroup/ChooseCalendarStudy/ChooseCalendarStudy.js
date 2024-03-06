import React, {useEffect, useState} from 'react';
import { Alert, FlatList, Image, ImageBackground, Keyboard, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import API from '../../../../API/APIConstant';
import images from '../../../../assets/images';
import APIBase from '../../../../base/APIBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import BorderTextInput from '../../../../componentBase/BorderTextInput';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { hideAlert, showAlert } from '../../../../componentBase/BaseAlert';
import LogBase from '../../../../base/LogBase'
import styles from './styles';
import { bg_nhat, logo_new } from '../../../../assets/image';
import LessonBase from '../../../../base/LessonBase'
import { RadioButtonBox } from '../../../../componentBase/RadioButtonBox';
import { Colors } from '../../../../styleApp/color';
import { useSelector } from 'react-redux';
import MyData from '../../../../component/MyData';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ComponentLoadingIndicator } from '../../../../componentBase/indicator/ComponentLoadingIndicator';

const ChooseCalendarStudy = (props) => {

    const [listData, setlistData] = React.useState([]);
    const [curIndex, setcurIndex] = React.useState(-1);
    const [loading, setloading] = React.useState(false);
    const [isStart, setisStart] = React.useState(false);

    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    const tittleText = "Chọn mục tiêu rèn luyện"
    const bodyText = "Trước khi bắt đầu hành trình, hãy làm bài kiểm tra đầu vào để Sunday English có thể xác định năng lực của bạn và đề xuất giáo trình phù hợp. Bài kiểm tra gồm 20 câu hỏi và bạn có 10 phút để làm bài."
    const guiText = "Cùng bắt đầu\ncuộc hành trình\ncủa bạn nào!"

    useEffect(()=>{
        getData()
    },[])

    const getData = async () => {
        setloading(true);
        const url = API.baseurl + API.getCalenderList;
        APIBase.postDataJson('get',url)
        .then(res=>{
            setloading(false);
            setlistData(res.data.data)
            LogBase.log("=====_startPlan",res.data)
        }).catch(e=>{
            LogBase.log("=====e:",e)
            setloading(false);
        })
    }

    const savedone = async () => {
        setisStart(true)
        setTimeout(() => {
            MyData.isFirstLogin = false
            props.navigation.navigate('HomeScreen')
            props.navigation.navigate('MapScreenStudent')
        }, 2000)
        setTimeout(() => {
            setisStart(false)
        }, 2500)
    }

    const saveCalender = async () => {
        savedone()
        setloading(true);
        const url = API.baseurl + API.setCalenderStudy;
        var body={
            grade_id: dataLogin.grade_id,
            target_id: listData[curIndex].target_id
        }
        APIBase.postDataJson('post',url,body)
        .then(res=>{
            setloading(false);
            LogBase.log("=====_startPlan",res.data)
        }).catch(e=>{
            LogBase.log("=====e:",e)
            setloading(false);
        })
    }

    const _renderItem = (data) => {
        return(
            <TouchableOpacity onPress={()=>setcurIndex(data.index)}>
            <View style={styles.monoLay}>
                <Text style={styles.tittleMono}>{data.item.title}</Text>
                <Text style={styles.desMono}>{data.item.description}</Text>
                <View style={styles.radioLay}>
                    <RadioButtonBox onPress={()=>setcurIndex(data.index)} color={Colors.BaseGreen} isNotify={curIndex == data.index} style={styles.borderLine}/>
                </View>
            </View>
            </TouchableOpacity>
        )
    }

    const onCallBKT = async () => {
        setisStart(true)
        setTimeout(() => {
            props.navigation.navigate('ExamStudyForTest',{
                type:'placement_test',
            })
        }, 1500)
        setTimeout(() => {
            setisStart(false)
        }, 2000)
    }

    return (
        <ImageBackground style={styles.container} source={bg_nhat}>
            <View style={[styles.mainLay,{paddingTop: SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight*10 : SmartScreenBase.smPercenHeight*2}]}>
                {loading ? <ComponentLoadingIndicator visible={loading}/> : !isStart ? <>
                    <Text style={styles.textTittle}>{tittleText}</Text>
                    <FlatList
                        data={listData}
                        renderItem={(item)=>_renderItem(item)}
                        keyExtractor={(index) => index.toString()}
                        // refreshControl={<RefreshControl
                        //     refreshing={loading}
                        //     tintColor={Colors.Gray}></RefreshControl>}
                    />
                    <View style={styles.buttonLay}>
                        <ShortMainButton text={"Tiếp tục"} widthType={'mega'} type={1} isDisabled={curIndex == -1} loading={loading}
                            onPress={()=>saveCalender()}/>
                    </View>
                    </>
                    :<>
                        <View style={styles.addvoid}/>
                        <Text style={styles.textGuiS}>{guiText}</Text>
                    </>}
                </View>
        </ImageBackground>
    );
}

export default ChooseCalendarStudy