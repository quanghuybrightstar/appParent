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
import { bg_nhat, logo_new } from '../../../../assets/image';
import LessonBase from '../../../../base/LessonBase'
import { useSelector } from 'react-redux';

const LoseRoot = (props) => {

    const [isStart, setisStart] = React.useState(false);
    const [loading, setloading] = React.useState(false);
    const [text, setText] = React.useState("");

    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const tittleText = "Bài kiểm tra đầu vào"
    //const bodyText = `Trước khi bắt đầu hành trình, hãy làm bài kiểm tra đầu vào để Sunday English có thể xác định năng lực của bạn và đề xuất giáo trình phù hợp. Bài kiểm tra gồm ${slQues} câu hỏi và bạn có ${timePra} phút để làm bài.`
    const guiText = "Bạn đã sẵn sàng!\nBây giờ hãy\nhoàn thành tất cả\ncác câu hỏi để\nxác định trình độ\ncủa mình."
    const slQues = dataLogin.grade_id == 2 ? 30 : 35
    const timePra = dataLogin.grade_id == 2 ? 25 : 30

    useEffect(()=>{
        setText(`Trước khi bắt đầu hành trình, hãy làm bài kiểm tra đầu vào để Sunday English có thể xác định năng lực của bạn và đề xuất giáo trình phù hợp. Bài kiểm tra gồm ${slQues} câu hỏi và bạn có ${timePra} phút để làm bài.`)
    },[])

    const onCancel = async () => {
        //props.navigation.navigate('ChooseStartCuri')
        props.navigation.navigate('Curriculums', {isLoseRoot: true})
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
            {!isStart ? <View style={styles.mainLay}>
                <Image style={styles.logoS} source={logo_new}/>
                <Text style={styles.textTittle}>{tittleText}</Text>
                <Text style={styles.textBody}>{text}</Text>
                <View style={styles.buttonLay}>
                    <ShortMainButton text={"Bắt đầu ngay"} widthType={'mega'} type={1}
                        onPress={()=>onCallBKT()}/>
                    <ShortMainButton text={"Bỏ qua"} widthType={'mega'}
                        onPress={()=>{onCancel()}}/>
                </View>
            </View>
            :<View style={styles.mainLay}>
                <View style={styles.addvoid}/>
                <Text style={styles.textTittle}>{guiText}</Text>
            </View>
            }
        </ImageBackground>
    );
}

export default LoseRoot