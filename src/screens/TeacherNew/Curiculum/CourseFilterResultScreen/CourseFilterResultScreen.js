import React from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { styles } from './CourseFilterResultScreen.style';
import { DetailSkillJson, ResultFilterJson } from '../../../../stringJSON/CurriculumTeacherJson'
import { FontSize } from '../../../../styleApp/font';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { TextBox } from '../../../../componentBase/TextBox';
import { resultFilterMethod } from './CourseFilterResultScreen.logic';
import { Colors } from '../../../../styleApp/color';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ImageLesson } from '../../../../componentBase/ImageLesson';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { ModalFilterCommon } from '../../../../componentBase/ModalFilter';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import LessonBase from '../../../../base/LessonBase';

/**
 * CourseFilterResultScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const CourseFilterResultScreen = (props) => {
    let { Favorite, AssignCurriculum, assignCurriculum, loading, dataFilter, onAssign, routerGradle, isLoading, loadMore, onFilter, isReachedEnd, debounceEvent} = resultFilterMethod(props)

    /**
     * Function that return color depends on level
     */
    const CheckLevel = (value) => {
        if (value === 'easy') {
            return Colors._6EBF49
        } else if (value === 'normal') {
            return Colors.Orange
        } else if (value === 'hard') {
            return Colors._BE1E2D
        }
    }
    const [visible, setVisible] = React.useState(false)

    /**
     * Function that navigate when clicking a lesson
     */
    const clickLesson = (item) => {
        var dataR = item
        dataR.unit_id = 184
        LessonBase._moveLessonHS(dataR, props.navigation, true)
    }

    /**
     * Function render item of filter list
     */
    const renderItem = (props) => {
        let { item, index } = props;
        let itemOuter = item
        // console.log("-------item", itemOuter);
        return (
            <View >
                <TextBox style={styles.txtCurriculum} numberOfLines={null} >{itemOuter.curriculum_name}</TextBox>
                <FlatList
                    indicatorStyle={'black'}
                    data={itemOuter.list_lesson}
                    renderItem={(data) => {
                        return (
                            <TouchableOpacity onPress={() => clickLesson(data.item)} style={[styles.viewItem, { borderBottomWidth: index + 1 === dataFilter.length && data.index + 1 === itemOuter.list_lesson.length ? 0 : 1 }]}>
                                <View style={styles.contentItem}>
                                    <Image source={{ uri: ImageLesson(data.item.lesson_type, data.item.sub_lesson_type) }} style={styles.itemImg} />
                                    <View >
                                        <TextBox numberOfLines={null} style={styles.txtTopic}>
                                            {`${data.item.level === 'normal' ? 'medium' : (data.item.level || '')}` + `${!!data.item.level ? `    ` : ''}` + `${data.item.topic}`}
                                        </TextBox>
                                        <View
                                            style={[styles.viewLevel, { backgroundColor: CheckLevel(data.item.level) }]}>
                                            <TextBox style={styles.txtLevel}>{data.item.level === 'normal' ? 'medium' : data.item.level}</TextBox>
                                        </View>
                                        <TextBox style={styles.ls_name} numberOfLines={null}>
                                            {data.item.lesson_name}
                                        </TextBox>
                                        <TextBox numberOfLines={null} style={styles.ttx_unit_name}>{data.item.unit_name}</TextBox>
                                    </View>
                                </View>
                                <View style={styles.footerItem}>
                                    <TouchableOpacity onPress={() => Favorite(data.item)} style={styles.favTouch}>
                                        <Image source={{ uri: data.item.is_in_wishlist ? 'favorite' : 'unfavorite' }} resizeMode={'contain'} style={styles.iconFavoite} />
                                    </TouchableOpacity>
                                    {data.item.lesson_type !== 'skill_guide' ? <SmallCheckBox
                                        onPress={() => AssignCurriculum(data.item)}
                                        isNotify={assignCurriculum.findIndex((i) => i.lesson_id === data.item.lesson_id) !== -1}
                                        size={SmartScreenBase.smBaseWidth * 57}
                                    /> : null}
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={i => i.lesson_id}
                />
            </View>
        )
    }
    // console.log("----dataFilter", dataFilter);
    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={ResultFilterJson.sundayEnglish}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                styleTitle={styles.txtHeader}
                rightIcon={'filter1'}
                styleHeaderRight={{ tintColor: Colors.White }}
                rightIconOnPress={() => setVisible(true)}

            />

            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                {
                    loading ?
                        <View style={styles.loading}>
                            <View style={styles.box}>
                                <ActivityIndicator color={'white'} size="large" />
                            </View>
                        </View>
                        :
                        <>
                            <FlatList
                                contentContainerStyle={styles.flatlist}
                                data={dataFilter}
                                renderItem={renderItem}
                                keyExtractor={item => item.curriculum_id}
                                ListEmptyComponent={() =>
                                    <>
                                        {!loading && < View style={styles.viewEmpty}>
                                            <TextBox>{DetailSkillJson.Nodata}</TextBox>
                                        </View>}
                                    </>
                                }
                                ListFooterComponent={() => (
                                    <View style={{ marginVertical: 15 }}>
                                      {isReachedEnd && <ActivityIndicator/>}
                                    </View>
                                  )}
                                onEndReached={debounceEvent(() => {
                                    loadMore()
                                  }, 200)}
                            />
                            {dataFilter.length > 0 &&
                                <ShortMainButton
                                    type={1}
                                    isDisabled={assignCurriculum.length > 0 ? false : true}
                                    onPress={onAssign}
                                    style={styles.btnAssign}
                                    textStyles={styles.txtAssign}
                                    text={DetailSkillJson.assign}
                                    widthType={'full'}
                                />
                            }
                        </>
                }
            </LinearGradient>
            <ModalFilterCommon
                visible={visible}
                hideModal={() => setVisible(false)}
                dataGrade={routerGradle}
                showKeyword={true}
                showLevel={true}
                showGrade={true}
                onFilter={(param) => onFilter(param)}
                params={props.navigation.getParam('param')}
                cancel={true}
            />
            <FullScreenLoadingIndicator
                visible={isLoading}
            />
        </>

    )
}