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
import { bg_nhat, check_round, de_xuat, de_xuat_1, dong_ho_1, giao_trinh_co_ban, giao_trinh_mat_goc, logo_new, may_matgoc } from '../../../../assets/image';
import LessonBase from '../../../../base/LessonBase'
import { useSelector } from 'react-redux';
import { ComponentLoadingIndicator } from '../../../../componentBase/indicator/ComponentLoadingIndicator';
import MyData from '../../../../component/MyData';

const ExpectCuri = (props) => {

    const [isDX, setisDX] = React.useState(0);
    const [loading, setloading] = React.useState(true);
    const [curData, setCurData] = React.useState();

    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    const smallTittleText = "Dựa vào kết quả bài kiểm tra,\nchúng tôi đề xuất bạn học"
    const superTittle = "Điểm kiểm tra đầu vào"
    const tittleText = "\“Giáo trình cơ bản\”"
    const bodyText = "Khóa học dành cho những học sinh mất căn bản, mong muốn lấp lỗ hổng kiến thức để cải thiện khả năng Tiếng Anh. Tham gia khóa học, học sinh sẽ được xây dựng nền tảng từ vựng và các chủ đề ngữ pháp trọng tâm để theo kịp bài học trên trường, nâng cao điểm số cũng như thành tích học tập."
    const guiText = "Bạn đã sẵn sàng!\nBây giờ hãy\nhoàn thành tất cả\ncác câu hỏi để\nxác định trình độ\ncủa mình."

    useEffect(()=>{
        getData()
    },[])

    const getData = async () => {
        setloading(true);
        const url = API.baseurl + API.getSuggest;
        APIBase.postDataJson('get',url)
        .then(res=>{
            setloading(false);
            setCurData(res.data.program_default)
            LogBase.log("=====_startPlan",res.data)
        }).catch(e=>{
            LogBase.log("=====e:",e)
            setloading(false);
        })
    }

    const onCancel = async () => {
        //props.navigation.navigate('ChooseStartCuri')
        props.navigation.navigate('Curriculums', {isLoseRoot: true})
    }

    const selectCurr = async () => {
        setloading(true);
        var mData = {
            program_id: curData.id,
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

    return (
        <ImageBackground style={styles.container} source={bg_nhat}>
            <View style={styles.mainLay}>
                {loading ? <ComponentLoadingIndicator isBig={true} visible={loading}/> : 
                <>
                <View style={styles.scrollLay}>
                <ScrollView>
                <View style={styles.scrollContain}>
                <View style={styles.headerLay}>
                    <Image style={[styles.image_diem, styles.image_diem]} source={may_matgoc}/>
                    <View style={[styles.scoreLay]}>
                        <View style={styles.topHeaderS}>
                            <Text style={styles.smallTextTittle}>{superTittle}</Text>
                        </View>
                        <View style={styles.botHeaderS}>
                            <View style={styles.botLeftS}>
                                <Text style={styles.scoreT}>{"4.0"}</Text>
                            </View>
                            <View style={styles.botRightS}>
                                <View style={styles.timeLay}>
                                    <Image style={styles.smallIconS} source={dong_ho_1}/>
                                    <Text style={styles.smallTextT}>{"23:12"}</Text>
                                </View>
                                <View style={styles.checkLay}>
                                    <Image style={styles.smallIconS} source={check_round}/>
                                    <Text style={styles.smallTextT}>{"20/30"}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={styles.notiT}>{smallTittleText}</Text>      
                <Text style={styles.textTittle}>{"\""+curData?.name+"\""}</Text>
                <View style={styles.bodyLay}>
                    <View style={styles.topBody}>
                        <Text style={styles.tittleDV}>{curData?.name}</Text>
                        <Image style={styles.logoS} source={de_xuat_1}/>
                    </View>
                    <View style={styles.botBody}>
                        <Text style={styles.bodyDV}>{bodyText}</Text>
                    </View>
                </View>    
                </View>
                {/* <Text style={styles.smallTextTittle}>{smallTittleText}</Text>
                <Text style={styles.textTittle}>{"\""+curData?.name+"\""}</Text>
                    <View style={styles.boxLay}>
                        <ImageBackground style={styles.curiBg} source={{uri: curData?.img_out_select}}>
                            <View style={styles.curiLay}>
                                {isDX == 0 && <Image style={styles.logoS} source={de_xuat}/>}
                            </View>
                        </ImageBackground>
                        <Text style={styles.textBody}>{curData?.description}</Text>
                    </View>
                <View style={styles.buttonLay}>
                    <ShortMainButton text={"Đồng ý"} widthType={'mega'} type={1}
                        onPress={()=>selectCurr()}/>
                    <ShortMainButton text={"Chọn giáo trình khác"} widthType={'mega'}
                        onPress={()=>onCancel()}/>
                </View> */}
                </ScrollView>
                </View>   
                <View style={styles.buttonLay}>
                    <ShortMainButton text={"Đồng ý"} widthType={'mega'} type={1}
                        onPress={()=>selectCurr()}/>
                    <ShortMainButton text={"Chọn giáo trình khác"} widthType={'mega'}
                        onPress={()=>onCancel()}/>
                </View>
                </>
                }
            </View>
        </ImageBackground>
    );
}

export default ExpectCuri