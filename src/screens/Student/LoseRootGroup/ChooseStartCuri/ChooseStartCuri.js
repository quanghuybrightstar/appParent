import React, {useEffect, useState} from 'react';
import { Alert, Image, ImageBackground, Keyboard, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import API from '../../../../API/APIConstant';
import images from '../../../../assets/images';
import APIBase from '../../../../base/APIBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import BorderTextInput from '../../../../componentBase/BorderTextInput';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { hideAlert, showAlert } from '../../../../componentBase/BaseAlert';
import LogBase from '../../../../base/LogBase'
import styles from './styles';
import { bg_nhat, de_xuat, giao_trinh_co_ban, giao_trinh_co_ban_select, giao_trinh_mat_goc, giao_trinh_mat_goc_select, logo_new } from '../../../../assets/image';
import LessonBase from '../../../../base/LessonBase'
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const ChooseStartCuri = (props) => {

    const [isDX, setisDX] = React.useState(0);
    const [listData, setlistData] = React.useState([]);
    const [curCuri, setcurCuri] = React.useState(-1);
    const [loading, setloading] = React.useState(false);

    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    const imageList = [{choose: giao_trinh_co_ban_select, none: giao_trinh_co_ban}, {choose: giao_trinh_mat_goc_select, none: giao_trinh_mat_goc}]

    const tittleText = "Chọn giáo trình của bạn"
    const bodyTextBasic = "Khóa học bám sát chương trình Bộ GD, giúp học sinh phát triển toàn diện 4 kỹ năng mà trọng tâm là phát triển năng lực giao tiếp và tư duy bằng Tiếng Anh."
    const bodyTextloseroot = "Khóa học dành cho những học sinh mất căn bản, mong muốn lấp lỗ hổng kiến thức để cải thiện khả năng Tiếng Anh, xây dựng nền tảng từ vựng và ngữ pháp để theo kịp bài học trên trường."

    useEffect(()=>{
        getData()
    },[])

    const getData = async () => {
        setloading(true);
        const url = API.baseurl + API.getProgram;
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

    const selectCurr = async () => {
        setloading(true);
        var mData = {
            program_id: curCuri,
            grade_id: dataLogin.grade_id
        }
        LogBase.log("=====selectCurr req",mData)
        const url = API.baseurl + API.setProgram;
        APIBase.postDataJson('post',url,mData)
        .then(res=>{
            setloading(false);
            props.navigation.navigate('ChooseCalendarStudy')
            LogBase.log("=====_startPlan",res.data)
        }).catch(e=>{
            LogBase.log("=====e:",e)
            setloading(false);
        })
    }

    const renderCur = ({item ,index}) => {
        LogBase.log("=====renderCur",item)
        var mlink = API.image_base_url + (curCuri == item.id ? item.img_in_select : item.img_out_select)
        LogBase.log("=====mlink",mlink)
        return(
            <TouchableWithoutFeedback  onPress={()=>setcurCuri(item.id)}>
            <View style={{width: '100%', alignItems: 'center'}}>
                <ImageBackground imageStyle={curCuri == item.id ? styles.curiActiveBg : styles.curiBg} 
                    source={{uri: mlink}}>
                    <View style={curCuri == item.id ? styles.curiActiveLay : styles.curiLay}>
                        {index == 0 && <Image style={curCuri == item.id ? styles.logoActiveS : styles.logoS} source={de_xuat}/>}
                        {curCuri == item.id && <Text style={styles.textBody}>{item.description}</Text>}
                    </View>
                </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    // const next = async () => {
    //     selectCurr()
    //     props.navigation.navigate('ChooseCalendarStudy')
    // }

    return (
        <ImageBackground style={styles.container} source={bg_nhat}>
            <View style={styles.mainLay}>
                <Text style={[styles.textTittle,{
                    marginTop: SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight*14 : SmartScreenBase.smPercenHeight*6, 
                    marginBottom: SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenWidth*7 : SmartScreenBase.smPercenWidth*0
                    }]}>{tittleText}</Text>
                <FlatList
                    data={listData}
                    renderItem={renderCur}
                    keyExtractor={(item, index) => {
                        return index.toString() + index.toString();
                    }}
                />
                {/* <TouchableWithoutFeedback  onPress={()=>setcurCuri(0)}>
                <View>
                    <ImageBackground imageStyle={curCuri == 0 ? styles.curiActiveBg : styles.curiBg} 
                        source={curCuri == 0 ? giao_trinh_co_ban_select : giao_trinh_co_ban}>
                        <View style={curCuri == 0 ? styles.curiActiveLay : styles.curiLay}>
                            {isDX == 0 && <Image style={curCuri == 0 ? styles.logoActiveS : styles.logoS} source={de_xuat}/>}
                            {curCuri == 0 && <Text style={styles.textBody}>{bodyTextBasic}</Text>}
                        </View>
                    </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback  onPress={()=>setcurCuri(1)}>
                <View>
                    <ImageBackground imageStyle={curCuri == 1 ? styles.curiActiveBg : styles.curiBg} 
                        source={curCuri == 1 ? giao_trinh_mat_goc_select : giao_trinh_mat_goc}>
                        <View style={curCuri == 1 ? styles.curiActiveLay : styles.curiLay}>
                            {isDX == 1 && <Image style={curCuri == 1 ? styles.logoActiveS : styles.logoS} source={de_xuat}/>}
                            {curCuri == 1 && <Text style={styles.textBody}>{bodyTextloseroot}</Text>}
                        </View>
                    </ImageBackground>
                    </View>
                </TouchableWithoutFeedback> */}
                <View style={[styles.buttonLay,{bottom: SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenWidth*8 : SmartScreenBase.smPercenWidth*3}]}>
                    <ShortMainButton text={"Tiếp tục"} widthType={'mega'} type={1} isDisabled={curCuri == -1} loading={loading}
                        onPress={()=>selectCurr()}/>
                </View>
            </View>
        </ImageBackground>
    );
}

export default ChooseStartCuri