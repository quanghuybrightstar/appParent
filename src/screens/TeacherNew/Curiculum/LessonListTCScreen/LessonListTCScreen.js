import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect, useDispatch, useSelector } from 'react-redux';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { Colors } from '../../../../styleApp/color';
import { FontSize } from '../../../../styleApp/font';
import { styles } from './LessonListTCScreen.style';
import { detailSkillMethod } from './LessonListTCScreen.logic';
import { ImageLesson } from '../../../../componentBase/ImageLesson';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import LessonBase from '../../../../base/LessonBase';
import MyData from '../../../../component/MyData';
import lessonMath from '../../../../utils/lessonMath';
import LogBase from '../../../../base/LogBase';

/**
 * LessonListTCScreen Screen - Danh sách lesson trong thư viên
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const LessonListTCScreen = (props) => {
    let { Favorite, AssignCurriculum, assignCurriculum, loading, Assign, CheckLevel, dataParam, listLesson, checkFavorite} = detailSkillMethod(props)
    const language = useSelector(state => state.LanguageStackReducer.language)

    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    /**
     * Function that navigate to the screen depends on input item
    */
    const clickLesson = (item) => {

        LogBase.log("=====clickLesson",item)
        LessonBase._moveLessonHS(item, props.navigation, true)
    }
    // console.log("----------LessonListTCScreen", listLesson);
    /**
     * Function render item of skill list
    */

    const renderItem = ({ item, index }) => {
        var isGuide = item.lesson_type == "skill_guide"
        return (
            <TouchableOpacity onPress={() => clickLesson(item)} style={styles.viewItem}>
                <View style={styles.contentItem}>
                    <Image style={styles.itemImg} source={{ uri: ImageLesson(item.lesson_type, item.sub_lesson_type) }} />
                    <View style={styles.paddingBot70}>
                        <TextBox numberOfLines={null} style={[styles.txtTopic]}>
                            {(!isGuide ? `${item.level === 'normal' ? 'medium' : item.level}    ` : ``) + `${item.lesson_topic}`}
                        </TextBox>
                        {!isGuide && <View
                            style={[styles.viewLevel, { backgroundColor: CheckLevel(item.level) }]}>
                            <TextBox style={styles.txtLevel}>{item.level === 'normal' ? 'medium' : item.level}</TextBox>
                        </View>}
                        <TextBox style={styles.txtName} numberOfLines={null}>
                            {item.lesson_name}
                        </TextBox>
                        <View style={dataLogin.role != 'parent' ? styles.footerItem : styles.footerItemParent}>
                            {dataLogin.role != 'parent' &&
                            <TouchableOpacity onPress={() => Favorite(item)} style={styles.favTouch}>
                                <Image source={{ uri: checkFavorite(item.lesson_id) ? 'favorite' : 'unfavorite' }} resizeMode={'contain'} style={styles.iconFavoite} />
                            </TouchableOpacity>
                            }
                            {!isGuide ? <SmallCheckBox
                                onPress={() => AssignCurriculum(item)}
                                isNotify={assignCurriculum.findIndex(i => i.lesson_id === item.lesson_id) !== -1}
                                size={SmartScreenBase.smBaseWidth * 57}
                            /> : null }
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    // console.log("----LessonListTCScreen", listLesson);
    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={lessonMath.convertSkill(dataParam.skill)}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                styleTitle={styles.txtHeader}
            />
            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>

                <FlatList
                    indicatorStyle={'black'}
                    contentContainerStyle={styles.flatlist}
                    data={listLesson}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.lesson_id + index.toString()}
                />
                <ShortMainButton
                    type={1}
                    isDisabled={assignCurriculum.length > 0 ? false : true}
                    onPress={Assign}
                    style={styles.btnAssign}
                    textStyles={styles.txtAssign}
                    text={language.LessonListTCScreen.MainButton}
                    widthType={'full'}
                />
            </LinearGradient>
            <FullScreenLoadingIndicator
                visible={loading}
            />
        </>
    )
}
