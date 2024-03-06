import React, {useEffect, useState} from 'react';
import { Alert, FlatList, Image, ImageBackground, Keyboard, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { hideAlert, showAlert } from '../../../../componentBase/BaseAlert';
import LogBase from '../../../../base/LogBase'
import styles from './ChooseAssignType.styles';
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
import { have_time, light_green, pen_vs_page } from '../../../../assets/icon';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { FontSize } from '../../../../styleApp/font';
import SmartScreenBase from '../../../../base/SmartScreenBase';

/**
 * ChooseAssignType Screen - Chọn hình thức giao
 */

const ChooseAssignType = (props) => {

    const [curType, setType] = useState(0)

    const TCAssign = "Giao bài tự do"
    const TYCAssign = "Giao bài theo yêu cầu"
    const TNLAssign = "Giao bài theo năng lực"

    const bodyAssTC = "Tự chọn những bài tập mong muốn giao cho học sinh trong các giáo trình của Sunday English và giáo trình riêng."
    const bodyAssTYC = "Chọn kỹ năng, độ khó và số lượng bài tập cần giao, sau đó Sunday English sẽ tự động đề xuất bài tập thích hợp cho học sinh của bạn."
    const bodyAssTNL = "Chỉ cần chọn thời lượng bài tập, Sunday English sẽ tự đề xuất những bài tập phù hợp nhất với năng lực từng học sinh của bạn."

    const next = () => {
        if(curType == 1){
            MyData.mAssignType == ''
            props.navigation.navigate('ChooseCurruculum')
        }else{
            props.navigation.navigate('SettingExercise',{type:curType})
        }
    }

    const onSelect = (type) => {
        setType(type)
    }

    const programRender = (type ,tittle, icon, body) => {
        return(
            <TouchableOpacity onPress={()=>onSelect(type)} style={styles.programLay}>
                <View style={styles.topLay}>
                    <Image source={icon} style={styles.iconPro}/>
                    <TextBox style={styles.tittleS}>{tittle}</TextBox>
                    <SmallCheckBox onPress={()=>onSelect(type)} isNotify={curType == type} style={styles.checkboxS}/>
                </View>
                <View style={styles.botLay}>
                    <TextBox numberOfLines={100} style={styles.bodyText}>{body}</TextBox>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={"Chọn hình thức giao"}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                styleTitle={{ fontSize: FontSize.size60Font }}
            />
            <LinearGradient
            style={styles.flex1}
            colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                
                <View style={styles.mainLay}>
                        {programRender(1, TCAssign, light_green, bodyAssTC)}
                        {programRender(2, TYCAssign, pen_vs_page, bodyAssTYC)}
                        {programRender(3, TNLAssign, have_time, bodyAssTNL)}
                        <View style={[styles.buttonLay,{marginTop: SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight*8 : 0}]}>
                            <ShortMainButton text={"Tiếp tục"} widthType={'full'} type={1} isDisabled={curType == 0}
                                onPress={()=>next()}/>
                        </View>
                    </View>
            </LinearGradient>
        </>
    );
}

export default ChooseAssignType