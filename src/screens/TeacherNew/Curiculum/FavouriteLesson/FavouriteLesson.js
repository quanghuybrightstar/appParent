import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect, useDispatch, useSelector } from 'react-redux';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { DetailSkillJson } from '../../../../stringJSON/CurriculumTeacherJson';
import { StudentGrammarJson } from '../../../../stringJSON/StudentGrammarJson';
import { Colors } from '../../../../styleApp/color';
import { FontSize } from '../../../../styleApp/font';
import { styles } from './FavouriteLesson.style';
import { detailSkillMethod } from './FavouriteLesson.logic';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ImageLesson } from '../../../../componentBase/ImageLesson';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import LessonBase from '../../../../base/LessonBase';
import LogBase from '../../../../base/LogBase';

/**
 * FavouriteLesson Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const FavouriteLesson = (props) => {
    const [dataParam] = useState(props.navigation.getParam('data'));
    let { Favorite, AssignCurriculum, assignCurriculum, Assign, data, Delete, loading, isReachedEnd, debounceEvent,
        loadMore } = detailSkillMethod(props);
    const language = useSelector(state => state.LanguageStackReducer.language);
    LogBase.log('---FavouriteLesson', data);
    /**
     * Function that return color depends on level
    */
    const CheckLevel = (value) => {
        if (value === 'easy') {
            return Colors._6EBF49;
        } else if (value === 'normal') {
            return Colors.Orange;
        } else if (value === 'hard') {
            return Colors._BE1E2D;
        }
    };

    /**
     * Function that navigate to the screen depends on input item
    */
    const clickLesson = (item) => {

        LogBase.log("=====clickLesson",item)
        var dataR = item
        dataR.unit_id = 184
        // dataR.exam_id = item.lesson_id;
        LessonBase._moveLessonHS(dataR, props.navigation, true)
    };

    const checkTick = (item) => {
        var isTick = false
        assignCurriculum.forEach(element => {
            if(item.lesson_id == element.lesson_id && item.exam_id == element.exam_id){
                isTick = true
            }
        });
        return isTick
    };

    /**
     * Function render item of favorite list
    */
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => clickLesson(item)} style={styles.viewItem}>
                <View style={styles.contentItem}>
                    <Image style={styles.itemImg} source={{ uri: ImageLesson(item.lesson_type, item.sub_lesson_type) }} />
                    <View style={styles.flex1} >
                        <TextBox numberOfLines={null} style={styles.txtTopic}>
                            {`${item.level === 'normal' ? 'medium' : item.level}    ` + `${item.topic}`}
                        </TextBox>
                        <View
                            style={[styles.viewLevel, { backgroundColor: CheckLevel(item.level) }]}>
                            <Text style={styles.txtLevel}>{item.level === 'normal' ? 'medium' : item.level}</Text>
                        </View>
                        <TextBox style={styles.txtExercise} numberOfLines={null}>
                            {item.exercise_name}
                        </TextBox>
                        <TextBox style={[styles.txtCurriculum, styles.colorBlack]} numberOfLines={null}>
                            {item.curriculum_name}
                        </TextBox>
                        <View style={[styles.horizontal, styles.marginTop]}>
                            {item.lesson_type != 'skill_guide' && <View style={styles.viewNumberExercise}>
                                <TextBox style={styles.txtNumber} numberOfLines={null}>
                                    {item.number_exercise} {language.MyFavoriteScreen.AssignTime}
                                </TextBox>
                            </View>}
                            <View style={styles.footerItem}>
                                <TouchableOpacity onPress={() => Delete(item)} style={styles.favTouch}>
                                    <Image source={{ uri: 'favorite' }} resizeMode={'contain'} style={styles.iconFavoite} />
                                </TouchableOpacity>
                                {item.lesson_type != 'skill_guide' && <SmallCheckBox
                                    onPress={() => AssignCurriculum(item)}
                                    isNotify={checkTick(item)}
                                    size={SmartScreenBase.smBaseWidth * 57}
                                />}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        );
    };
    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={language.MyFavoriteScreen.Header}
                leftIconOnPress={() => {
                    props.navigation.pop();
                }}
                styleTitle={styles.txtHeader}
            />
            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                { !loading ? <>
                <FlatList
                    style={styles.gradient}
                    indicatorStyle={'black'}
                    data={data}
                    ListEmptyComponent={()=> {
                        return <View>
                            <Text style={styles.txtEmptyContent}>
                                Bạn chưa có bài tập yêu thích nào
                            </Text>
                        </View>;
                    }}
                    renderItem={renderItem}
                    onEndReached={debounceEvent(() => {
                        loadMore();
                    }, 200)}
                    ListFooterComponent={() => (
                        <View style={styles.marginVertical15}>
                            {isReachedEnd && <ActivityIndicator />}
                        </View>
                    )}
                    keyExtractor={(item, index) => item.lesson_id + item.exam_id}
                />
                {
                    !!data?.length &&
                    <ShortMainButton
                        type={1}
                        isDisabled={assignCurriculum.length > 0 ? false : true}
                        onPress={Assign}
                        style={styles.btnAssign}
                        textStyles={styles.txtAssign}
                        text={DetailSkillJson.assign}
                        widthType={'full'}
                    />}
                </> : <FullScreenLoadingIndicator visible={loading}/>}
            </LinearGradient>
        </>
    );
};
