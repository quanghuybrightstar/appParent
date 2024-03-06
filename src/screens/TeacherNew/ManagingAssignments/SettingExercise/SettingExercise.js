import React, {useEffect, useState} from 'react';
import { Alert, FlatList, Image, ImageBackground, Keyboard, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { hideAlert, showAlert } from '../../../../componentBase/BaseAlert';
import LogBase from '../../../../base/LogBase'
import styles from './SettingExercise.style';
import { bg_nhat, logo_new } from '../../../../assets/image';
import { RadioButtonBox } from '../../../../componentBase/RadioButtonBox';
import { Colors } from '../../../../styleApp/color';
import { useSelector } from 'react-redux';
import MyData from '../../../../component/MyData';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ComponentLoadingIndicator } from '../../../../componentBase/indicator/ComponentLoadingIndicator';
import { TextBox } from '../../../../componentBase/TextBox';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import LinearGradient from 'react-native-linear-gradient';
import { have_time, left_way, light_green, pen_vs_page, right_way } from '../../../../assets/icon';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { FontSize } from '../../../../styleApp/font';
import Slider from '@react-native-community/slider';
import { IconButton } from '../../../../componentBase/IconButton/IconButton';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { forEach } from 'lodash';
import { Modal } from 'react-native';
import stringUtils from '../../../../utils/stringUtils';

/**
 * SettingExercise Screen - Setting nguồn bài tập
 */

const SettingExercise = (props) => {

    const typeAss = props.navigation.getParam('type')
    
    const [curHard, setcurHard] = useState(-1)
    const [curMedium, setcurMedium] = useState(-1)
    const [curEasy, setcurEasy] = useState(-1)
    const [curUnit, setcurUnit] = useState(1)
    const [curminute, setcurminute] = useState(30)
    const [sumUnit, setsumUnit] = useState(12)
    const [setting, setSetting] = useState()
    const [skillList, setskillList] = useState([])
    const [isShowModal, setisShowModal] = useState(false)
    const [loading, setloading] = React.useState(true);

    const listAssign = useSelector(state => state.AssignReducer.listAssign);

    const noteG = "* Kéo thanh gạt để chọn tỷ lệ ôn luyện kiến thức đã học và kiến thức mới theo trình độ của từng kỹ năng."
    const listener = React.useRef();
    useEffect(() => {
        // const init = async () => {
        //     await getData();
        // };
        // init();
        // if (!listener.current) {
        //     listener.current = props.navigation.addListener('didFocus', getData);
        // }
        // return () => {
        //     listener.current.remove();
        // };
        getData()
    },[])

    const getData = async () => {
        setloading(true);
        //const url = API.baseurl + API.getSettingAss + `?id_class=${listAssign.class_id}&student_list=[${listAssign.students}]`;
        const url = API.baseurl + API.getSettingAss + `?id_class=${listAssign.class_id}&student_list=[${listAssign.students}]`;

        APIBase.postDataJson('get',url)
        .then(res=>{
            var svData = res.data.data
            setloading(false);
            setcurUnit(svData.cur_unit)
            setsumUnit(svData.total_unit)
            setSetting(svData.lesson_list_propose)
            setskillList(svData.level_skill)
            var mlist = svData.study_data
            LogBase.log("=====study_data",mlist)
            if(mlist && mlist.length > 0){
                var monoHard = mlist.find(c=>c.stand == 'good')
                LogBase.log("=====monoHard",monoHard)
                if(monoHard){
                    setcurHard(monoHard.practice_percent)
                }else{
                    setcurHard(-1)
                }
                var monoMedium = mlist.find(c=>c.stand == 'medium')
                if(monoMedium){
                    setcurMedium(monoMedium.practice_percent)
                }else{
                    setcurMedium(-1)
                }
                var monoEasy = mlist.find(c=>c.stand == 'weak')
                if(monoEasy){
                    setcurEasy(monoEasy.practice_percent)
                }else{
                    setcurEasy(-1)
                }
            }
            LogBase.log("=====_startPlan",res.data)
        }).catch(e=>{
            LogBase.log("=====e:",e)
            setloading(false);
        })
    }

    const pushByCapacity = async () => {
        setloading(true);
        const url = API.baseurl + API.getLessonByCapacity

        var settingLes = []
        if(curHard != -1){
            settingLes.push({stand: 'good', practice_percent: curHard, study_percent: 100-curHard})
        }
        if(curMedium != -1){
            settingLes.push({stand: 'medium', practice_percent: curMedium, study_percent: 100-curMedium})
        }
        if(curEasy != -1){
            settingLes.push({stand: 'weak', practice_percent: curEasy, study_percent: 100-curEasy})
        }
        
        var body={
            list_student: JSON.stringify(listAssign.students),
            id_class: listAssign.class_id,
            unit_learning_id: curUnit,
            setting_student: JSON.stringify(settingLes),
            desired_time: curminute
        }
        LogBase.log("=====req", body)
        APIBase.postDataJson('post',url,body)
        .then(res=>{
            setloading(false);
            var svData = res.data
            if(svData.status){
                props.navigation.navigate('ListLessonResult', {data: svData.data, type: typeAss})
            }else{
                Alert.alert("",svData.msg)
            }
            LogBase.log("=====_startPlan",res.data)
        }).catch(e=>{
            LogBase.log("=====e:",e)
            setloading(false);
        })
    }

    const pushByRequest = () => {
        var tpData = {
            curHard: curHard,
            curMedium: curMedium,
            curEasy: curEasy,
            curUnit: curUnit
        }
        var msettingList = [...setting]
        props.navigation.navigate('SettingRequestAssign',{data: msettingList, tpData: tpData, type: typeAss})
    }

    const next = () => {
        // if(curType == 1){
        //     props.navigation.navigate('ChooseCurruculum')
        // }else{
        //     props.navigation.navigate('SettingExercise')
        // }
    }

    const unitUp = () => {
        setcurUnit(parseInt(curUnit)+1)
    }

    const unitDown = () => {
        setcurUnit(parseInt(curUnit)-1)
    }

    const minuteUp = () => {
        setcurminute(parseInt(curminute)+10)
    }

    const minuteDown = () => {
        setcurminute(parseInt(curminute)-10)
    }

    const renderElement = (skill, level, isfini) => {
        return(
            <>
                <View style={styles.skillInfoLay}>
                    <View style={styles.notBlueS}></View>
                    <TextBox style={styles.skillInfoS}>{stringUtils.upCaseFirstChar(skill)}</TextBox>
                    <TextBox style={styles.levelInfoS}>{stringUtils.upCaseFirstChar(level)}</TextBox>
                </View>
                {!isfini && <View style={styles.eleLine}></View>}
            </>
        )
    }

    const renderModal = () => {
        return(
            <Modal transparent visible={isShowModal}>
                <View style={styles.grayBGLay}>
                    <View style={styles.modalLay}>
                        <View style={styles.tittleModalLay}>
                            <TextBox style={styles.tittleModal}>{"Kỹ năng"}</TextBox>
                            <TextBox style={styles.tittleModal}>{"Trình độ"}</TextBox>
                        </View>
                        <View style={styles.contentModalLay}>
                            {skillList && skillList.length > 0 && skillList.map((ele, index)=>{
                                return(
                                    <>
                                        {renderElement(ele.skill, ele.level, index == skillList.length-1)}
                                    </>
                                )
                            })}
                            {/* {renderElement("Pronunciation","Junior")}
                            {renderElement("Listening","Junior")}
                            {renderElement("Vocabulary","Junior")}
                            {renderElement("Speaking","Junior")}
                            {renderElement("Grammar","Junior")}
                            {renderElement("Writing","Junior")}
                            {renderElement("Reading","Junior", true)} */}
                        </View>
                        <TouchableOpacity style={styles.closeBtnLay} onPress={()=>setisShowModal(false)}>
                            <Image style={styles.closeBtn} source={{uri: 'lesson_grammar_image6'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    const sliderRender = (mvalue ,setvalue, tittle, pracPercen) => {
        return(
            <View style={[styles.programLay, {paddingVertical: SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenWidth*5 : SmartScreenBase.smPercenWidth*3.5}]}>
                {mvalue >= 0 ? <>
                <TextBox style={styles.tittleMonoS}>{tittle}</TextBox>
                <Slider
                    style={styles.sliderS}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor={Colors.Orange_F8}
                    maximumTrackTintColor={Colors.Gray_E9}
                    thumbTintColor={'#fff'}
                    trackStyle={styles.trackStyle}
                    thumbStyle={styles.thumbStyle}
                    value={curUnit >= sumUnit ? 100 : mvalue}
                    onValueChange={(value) => {
                        setvalue(value);
                    }}
                    // onSlidingStart={_onSlidingStart}
                    // onSlidingComplete={_onSlidingComplete}
                />
                <View style={styles.botMonoLay}>
                    <TextBox style={styles.pracT}>{"Ôn luyện ("+parseInt(mvalue)+"%)"}</TextBox>
                    <TextBox style={styles.learnT}>{"Kiến thức mới ("+(100-parseInt(mvalue))+"%)"}</TextBox>
                </View>
                </>
                : null}
            </View>
        )
    }

    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={typeAss == 3 ?  "Giao bài theo năng lực" : "Giao bài theo yêu cầu"}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                styleTitle={{ fontSize: FontSize.size60Font }}
            />
            <LinearGradient
            style={styles.flex1}
            colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                {loading ? <View style={[styles.mainLay, {paddingBottom: SmartScreenBase.smPercenWidth*20}]}>
                    <ComponentLoadingIndicator isBig/>
                </View>
                 : <View style={styles.mainLay}>
                    <View style={styles.tittleLay}>
                        <TextBox style={styles.tittleS}>{"Unit đang học"}</TextBox>
                        <View style={styles.unitLay}>
                            <IconButton isDisabled={curUnit <= 1} size={"medium"} color={Colors.BaseGreen} icon={left_way} onPress={()=>unitDown()}/>
                                <TextBox style={styles.unitS}>{"Unit "+curUnit}</TextBox>
                            <IconButton isDisabled={curUnit >= sumUnit} size={"medium"} color={Colors.BaseGreen} icon={right_way} onPress={()=>unitUp()}/>
                        </View>
                    </View>
                    {typeAss == 3 && <View style={styles.tittleLay}>
                        <TextBox style={styles.tittleS}>{"Thời lượng mong muốn"}</TextBox>
                        <View style={styles.unitLay}>
                            <IconButton isDisabled={curminute <= 10} size={"medium"} color={Colors.BaseGreen} icon={left_way} onPress={()=>minuteDown()}/>
                                <TextBox style={styles.unitS}>{curminute+" phút"}</TextBox>
                            <IconButton isDisabled={curminute >= 180} size={"medium"} color={Colors.BaseGreen} icon={right_way} onPress={()=>minuteUp()}/>
                        </View>
                    </View>}
                    <TextBox style={styles.tittleLastS}>{"Tỷ lệ kiến thức"}</TextBox>
                    <TextBox numberOfLines={4} style={styles.noteS}>{noteG}</TextBox>
                        {sliderRender(curHard, setcurHard, "Trình độ Senior", 30)}
                        {sliderRender(curMedium, setcurMedium, "Trình độ Middle",10)}
                        {sliderRender(curEasy, setcurEasy, "Trình độ Junior",50)}
                    <TouchableOpacity style={[styles.detailLay,{opacity: listAssign.students?.length >1 ? 0 : 1}]} onPress={()=>setisShowModal(true)}>
                        <TextBox style={styles.detailS}>{"Xem chi tiết"}</TextBox>
                    </TouchableOpacity>
                    <View style={[styles.buttonLay,{marginTop: SmartScreenBase.ratio >1.9 ? SmartScreenBase.smPercenHeight*8 : 0}]}>
                        <ShortMainButton text={"Tiếp tục"} widthType={'full'} type={1} loading={loading}
                            onPress={()=> typeAss == 3 ? pushByCapacity() : pushByRequest()}/>
                    </View>
                    </View>}
                {isShowModal && renderModal()}
            </LinearGradient>
        </>
    );
}

export default SettingExercise