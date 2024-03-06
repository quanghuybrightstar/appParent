import React from 'react';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import AssignForClassOnline from '.';
import { styles } from './ManagingAssignmentsScreen.styles';
import { ManagingAssignmentsMethod } from './ManagingAssignmentsScreen.logic';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator'
import { ImageLesson } from '../../../../componentBase/ImageLesson';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { ModalFilterCommon } from '../../../../componentBase/ModalFilter'
import { ParentText } from '../../../../stringJSON/ParentTextJson';

/**
 * Manange Assignment Screen - Quản lý Giao bài
 * @param {Object} props props redux and navigation
 * @returns {Component}
 */
export const ManagingAssignmentsScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    const [visible, setVisible] = React.useState(false)

    const dataLogin = useSelector((state) =>  state.AuthStackReducer.dataLogin)

    let { Favorite,
        CheckLevel, showall, dataLession, onFilter, isFavouriting, valueUrl, offset, loadMore, debounceEvent, firstLoading,
        loading } = ManagingAssignmentsMethod(props)

    /**
     * render assignment
     * @param {Object} param0 assignment
     * @returns {Component}
     */
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => props.navigation.navigate('AssignmentedDetailScreen', { classId: props.navigation.getParam('dataClass').id, exerciseId: item.exercise_id })}
                style={[styles.viewItem, { borderBottomWidth: index + 1 === dataLession.length ? 0 : 0.3 }]} >
                <View style={styles.contentItem}>
                    <Image style={styles.itemImg} source={{ uri: ImageLesson(item.skill, item.sub_lesson_type) }} />
                    <View >
                        <TextBox numberOfLines={null} style={[styles.txtTopic, styles.lesson_topic]}>
                            {`${item.level === 'normal' ? 'medium' : item.level}    ` + `${item.exercise_topic}`}
                        </TextBox>
                        <View
                            style={[styles.viewLevel, { backgroundColor: CheckLevel(item.level) }]}>
                            <TextBox style={styles.txtLevel}>{item.level === 'normal' ? 'medium' : item.level}</TextBox>
                        </View>
                        <TextBox style={styles.txtTopic} numberOfLines={null}>
                            {item.exercise_name}
                        </TextBox>
                        <TextBox style={styles.txtCurriculum} numberOfLines={null}>
                            {item.curriculum_name}
                        </TextBox>
                    </View>
                </View>
                <View style={styles.footerItem}>
                    <TouchableOpacity onPress={() => Favorite(item)} style={styles.touchFav}>
                        <Image source={{ uri: item.is_in_wishlist ? 'favorite' : 'unfavorite' }} resizeMode={'contain'} style={styles.iconFavoite} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity >
        )
    }

    /**
     * assign function, navigation to FastAssignmentsScreen
     */
    const Assign = () => {
        props.navigation.navigate(dataLogin.role != 'parent' ? 'FastAssignmentsScreen' : 'FastAssignmentsParentScreen', { role: 'SettingAssign', classId: props.navigation.getParam('dataClass')?.id })
    }

    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={language.ManagingAssignmentsScreen.Header}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                styleTitle={{ fontSize: FontSize.size60Font }}

            />
            {  !firstLoading && <>
                {!showall ?
                    <LinearGradient
                        style={styles.flex1}
                        colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                        <Image source={{ uri: 'banner_assign' }} style={styles.imageBanner} resizeMode={'contain'} />
                        <Text numberOflines={null} style={styles.txtContent}>{language.ManagingAssignmentsScreen.EmptyText_1} <TextBox style={styles.txtAssign}>{language.ManagingAssignmentsScreen.EmptyText_2}</TextBox> {dataLogin.role != 'parent' ? language.ManagingAssignmentsScreen.EmptyText_3 : ParentText.ManageAssigment.EmptyAssigment}</Text>
                        <View style={styles.viewbtn}>
                            <ShortMainButton
                                onPress={Assign}
                                type={1}
                                text={language.ManagingAssignmentsScreen.ButtonText}
                                style={styles.btnAssign}
                                textStyles={styles.txtbtnAssign}
                                widthType={'full'}
                            />
                        </View>
                    </LinearGradient>
                    :
                    <LinearGradient
                        style={styles.flex1}
                        colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                        <View style={styles.btn}>
                            <ShortMainButton
                                onPress={Assign}
                                type={1}
                                widthType={'full'}
                                text={language.ManagingAssignmentsScreen.ButtonText}
                                style={[styles.btnAssign,]}
                                textStyles={styles.txtbtnAssign}
                            />
                        </View>
                        <View style={styles.body}>
                            <View style={styles.horizontal}>
                                <TextBox style={styles.txtTitle}>{language.ManagingAssignmentsScreen.TittleList}</TextBox>
                                <TouchableOpacity onPress={() => setVisible(true)} style={styles.viewFilter}>
                                    <Image source={{ uri: "filter" }} style={styles.iconFilter} resizeMode={'contain'} />
                                    <View style={styles.border} />
                                    <TextBox style={styles.txtFilter}>{language.CourseListTCScreen.FilterBt}</TextBox>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.viewFl}>
                                {loading ?
                                    <ActivityIndicator size={22} style={styles.loading} />
                                    :
                                    <FlatList
                                        indicatorStyle={'black'}
                                        ListEmptyComponent={<TextBox style={styles.txtEmpty}>{'Không có kết quả nào phù hợp'}</TextBox>}
                                        data={dataLession}
                                        renderItem={renderItem}
                                        onEndReached={debounceEvent(() => {
                                            loadMore(valueUrl)
                                        }, 200)}
                                        keyExtractor={(item, index) => item.id + '' + index.toString()}
                                        contentContainerStyle={styles.flatlist}
                                    />
                                }

                            </View>
                        </View>
                        <ModalFilterCommon
                            visible={visible}
                            hideModal={() => setVisible(false)}
                            showDate={true}
                            cancel={true}
                            onFilter={(param) => onFilter(param)}
                        />
                    </LinearGradient>
                    }
                </>
            }
            <FullScreenLoadingIndicator
                visible={isFavouriting}
            />
            <FullScreenLoadingIndicator
                visible={firstLoading}
            />
        </>
    )
}