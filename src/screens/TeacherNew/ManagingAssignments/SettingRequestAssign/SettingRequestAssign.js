import React, {useEffect, useState} from 'react';
import { Alert, FlatList, Image, ImageBackground, Keyboard, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { hideAlert, showAlert } from '../../../../componentBase/BaseAlert';
import LogBase from '../../../../base/LogBase'
import styles from './SettingRequestAssign.style';
import { bg_nhat, logo_new } from '../../../../assets/image';
import { RadioButtonBox } from '../../../../componentBase/RadioButtonBox';
import { Colors } from '../../../../styleApp/color';
import { useSelector } from 'react-redux';
import MyData from '../../../../component/MyData';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ComponentLoadingIndicator } from '../../../../componentBase/indicator/ComponentLoadingIndicator';
import { AppHeader } from '../../../../componentBase/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import { TextBox } from '../../../../componentBase/TextBox';
import { IconButton } from '../../../../componentBase/IconButton/IconButton';
import { FontSize } from '../../../../styleApp/font';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { left_way, right_way, white_arrow_left, white_arrow_right } from '../../../../assets/icon';
import stringUtils from '../../../../utils/stringUtils';
import { Platform } from 'react-native';
import { SmPopup } from '../../../../componentBase/SmPopup/SmPopup';

/**
 * ChooseAssignType Screen - setting số lượng bài
 */

const SettingRequestAssign = (props) => {

    // var typeAss = ''
    // var naviData = ''
    // var navitpData = ''

    // if(props.isModal){
    //     typeAss = props.editData.type
    //     naviData = props.editData.data
    //     navitpData = props.editData.tpData
    // }else{
    //     typeAss = props.navigation.getParam('type')
    //     naviData = props.navigation.getParam('data')
    //     navitpData = props.navigation.getParam('tpData')
    // }
    const [typeAss] = useState(props.isModal ? props.editData.type : props.navigation.getParam('type'));
    const [naviData] = useState(props.isModal ? props.editData.data : props.navigation.getParam('data'));
    const [navitpData] = useState(props.isModal ? props.editData.tpData : props.navigation.getParam('tpData'));
    const [listData, setListdata] = useState(naviData);
    const [loading, setloading] = React.useState(false);
    const [Update, setUpdate] = React.useState(0);
    const listAssign = useSelector(state => state.AssignReducer.listAssign);
    const noteG = "* Bài tập Easy phù hợp với trình độ Junior\n* Bài tập Medium phù hợp với trình độ Middle\n* Bài tập Hard phù hợp với trình độ Senior"
    const [visiblePop, setvisiblePop] = useState(false);
    const [modalData, setmodalData] = useState();
    const levelConst = [
        {lv: 'easy', stt: 1},
        {lv: 'medium', stt: 2},
        {lv: 'hard', stt: 3}
    ]

    useEffect(()=>{
        LogBase.log("+++++naviData",naviData)
    },[])

    const onClickAD = async () => {
        setvisiblePop(true)
        LogBase.log("+++++onClickAD")
    }

    const pushByRequest = async () => {
        setloading(true);
        const url = API.baseurl + API.getLessonByRequest

        var settingLes = []
        if(navitpData.curHard != -1){
            settingLes.push({stand: 'good', practice_per: navitpData.curHard, study_per: 100-navitpData.curHard})
        }
        if(navitpData.curMedium != -1){
            settingLes.push({stand: 'medium', practice_per: navitpData.curMedium, study_per: 100-navitpData.curMedium})
        }
        if(navitpData.curEasy != -1){
            settingLes.push({stand: 'weak', practice_per: navitpData.curEasy, study_per: 100-navitpData.curEasy})
        }
        
        var body={
            list_student: JSON.stringify(listAssign.students),
            id_class: listAssign.class_id,
            unit_learning_id: navitpData.curUnit,
            setting_student: JSON.stringify(settingLes),
            ingredient: JSON.stringify(listData)
        }
        LogBase.log("=====req", body)
        APIBase.postDataJson('post',url,body)
        .then(res=>{
            setloading(false);
            var svData = res.data
            if(svData.status){
                var editData = {
                    type: typeAss,
                    data: naviData,
                    tpData: navitpData
                }
                var allData = {
                    data: svData.data, 
                    type: typeAss, 
                    editData: editData,
                    updateDT: updateDT
                }
                if(props.isModal){
                    props.enter(svData.data, editData)
                }else{
                    props.navigation.navigate('ListLessonResult', allData)
                }
            }else{
                Alert.alert("",svData.msg)
            }
            LogBase.log("=====_startPlan",res.data)
        }).catch(e=>{
            LogBase.log("=====e:",e)
            setloading(false);
        })
    }

    const chooseBox = (index) => {
        var mlist = [...listData]
        if(mlist[index].sum == 0){
            mlist[index].sum = 1
            setListdata(mlist)
        }
    }

    const clickCheckBox = (index) => {
        var mlist = [...listData]
        if(mlist[index].sum == 0){
            mlist[index].sum = 1
            setListdata(mlist)
        }else{
            mlist[index].sum = 0
            setListdata(mlist)
        }
    }

    const checkDis = () => {
        var mlist = [...listData]
        var istrue = true
        mlist.forEach(element => {
            LogBase.log("=====checkDis",element)
            if(element.sum > 0)
                istrue = false
        });
        return istrue
    }

    const upSum = (index) => {
        var mlist = [...listData]
            mlist[index].sum = mlist[index].sum + 1
            setListdata(mlist)
    }

    const downSum = (index) => {
        var mlist = [...listData]
        if(mlist[index].sum > 0){
            mlist[index].sum = mlist[index].sum - 1
            setListdata(mlist)
        }
    }

    const upLevel = (index) => {
        var mlist = [...listData]
        if(mlist[index].level == 'easy')
            mlist[index].level = 'medium'
        else if(mlist[index].level == 'medium')
            mlist[index].level = 'hard'
        setListdata(mlist)
    }

    const downLevel = (index) => {
        var mlist = [...listData]
        if(mlist[index].level == 'medium')
            mlist[index].level = 'easy'
        else if(mlist[index].level == 'hard')
            mlist[index].level = 'medium'
        setListdata(mlist)
    }

    const updateDT = () => {
        setUpdate(Update + 1)
    }

    const checkColorLevel = (item) => {
        var mcolor = Colors.Red
        switch (item.level) {
            case 'hard':
                mcolor = Colors.Red
                break;
            case 'medium':
                mcolor = Colors.Orange_F8
                break;
            case 'easy':
                mcolor = Colors.Green_00CC83
                break;
        }
        return mcolor
    }

    const renderBox = (item, index) => {
        LogBase.log("=====renderBox",item)
        return(
            <TouchableOpacity onPress={()=>chooseBox(index)} style={[styles.boxLay,{height: SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenWidth*34 : Platform.OS == 'android' && SmartScreenBase.ratio <= 1.85 ? SmartScreenBase.smPercenWidth*29 : SmartScreenBase.smPercenWidth*32}]}>
                <View style={styles.topBox}>
                    <TextBox style={styles.tittleBox}>{stringUtils.upCaseFirstChar(item.skill)}</TextBox>
                    <SmallCheckBox
                            onPress={() => clickCheckBox(index)}
                            isNotify={item.sum > 0}
                            size={SmartScreenBase.smBaseWidth * 57}
                        />
                </View>
                <View style={[styles.bodyBox,{height: SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenWidth*12 : Platform.OS == 'android' && SmartScreenBase.ratio <= 1.85 ? SmartScreenBase.smPercenWidth*8 :  SmartScreenBase.smPercenWidth*10}]}>
                    <View style={[styles.levelLay,{backgroundColor: checkColorLevel(item)}]}>
                        { item.skill != 'vocabulary' && item.skill != 'pronunciation' && <TouchableOpacity onPress={() => downLevel(index)}>
                            <Image style={styles.levelImg} source={white_arrow_left}/>
                        </TouchableOpacity>}
                        <TextBox style={styles.levelT}>{stringUtils.upCaseFirstChar(item.level)}</TextBox>
                        { item.skill != 'vocabulary' && item.skill != 'pronunciation' && <TouchableOpacity onPress={() => upLevel(index)}>
                            <Image style={styles.levelImg} source={white_arrow_right}/>
                        </TouchableOpacity>}
                    </View>
                </View>
                <View style={styles.botBox}>
                    <View style={styles.sumLay}>
                        <TouchableOpacity onPress={() => downSum(index)}>
                            <Image style={[styles.sumImgS,{opacity: item.sum <= 0 ? 0.4 : 1}]} source={left_way}/>
                        </TouchableOpacity>
                        <TextBox style={styles.sumT}>{item.sum+" bài"}</TextBox>
                        <TouchableOpacity disabled={item.sum >= 20} onPress={() => upSum(index)}>
                            <Image style={[styles.sumImgS,{opacity: item.sum >= 20 ? 0.4 : 1}]} source={right_way}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    
    return (
        <>  
            {props.isModal ? 
            <View style={styles.opacityBg}>
                <View style={[styles.modalLay,{height: SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight * 86 : SmartScreenBase.smPercenHeight * 96}]}>
                    <View style={styles.listLay}>
                        {listData && listData.map((item, index)=>{
                            return(
                                <View>
                                    {renderBox(item, index)}
                                </View>
                                )
                        })}
                        <TextBox numberOfLines={10} style={styles.noteS}>{noteG}</TextBox>
                    </View>
                    <View style={styles.buttonLayModal}>
                        <ShortMainButton text={"Huỷ"} widthType={'mini'}
                            onPress={()=> props.cancel()}/>
                        <ShortMainButton text={"Áp dụng"} widthType={'mini'} type={1} loading={loading} isDisabled={checkDis()}
                            onPress={()=> onClickAD()}/>
                    </View>
                </View>
                <SmPopup
                    confirmOnpress={() => {
                        pushByRequest()
                        // props.enter(allData.svData.data, allData.editData)
                        setvisiblePop(false)
                    }}
                    visible={visiblePop}
                    onClose={() => setvisiblePop(false)}
                    cancelText={"Hủy"}
                    confirmText={"Đồng ý"}
                    message={'Hệ thống sẽ đề xuất danh sách bài tập mới, những thay đổi trước đó của bạn sẽ không được giữ lại'}
                />
            </View>
            : <>
            <AppHeader
                navigation={props.navigation}
                title={"Giao bài theo yêu cầu"}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
            />
            <LinearGradient
            style={styles.flex1}
            colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                
                <View style={styles.mainLay}>
                    <View style={styles.fatherListLay}>
                        {/* <ScrollView> */}
                            <View style={styles.listLay}>
                                {listData && listData.map((item, index)=>{
                                    // var isLast = (listData.length == (index+1)) && listData.length % 2 == 1 
                                    return(
                                        <View
                                            //  style={{alignItems: 'center', width: isLast ? '100%' : 'auto', paddingRight: isLast ? SmartScreenBase.smPercenWidth*5 : 0}}
                                             >
                                            {renderBox(item, index)}
                                        </View>
                                    )
                                })}
                                <TextBox numberOfLines={10} style={styles.noteS}>{noteG}</TextBox>
                            </View>
                        {/* </ScrollView> */}
                    </View>
                        <View style={styles.buttonLay}>
                            <ShortMainButton text={"Tiếp tục"} widthType={'full'} type={1} loading={loading} isDisabled={checkDis()}
                                onPress={()=> pushByRequest()}/>
                        </View>
                    </View>
            </LinearGradient>
            </>}
        </>
    );
}

export default SettingRequestAssign