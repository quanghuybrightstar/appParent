import React from 'react';
import { Image, TouchableOpacity, View, Text, ActivityIndicator, RefreshControl, FlatList, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { AppHeader } from '../../../../../componentBase/AppHeader';
import { ImageLesson } from '../../../../../componentBase/ImageLesson';
import { FullScreenLoadingIndicator } from '../../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ModalFilterCommon } from '../../../../../componentBase/ModalFilter';
import { TextBox } from '../../../../../componentBase/TextBox';
import { CommonJson } from '../../../../../stringJSON';
import { TeacherTextJson } from '../../../../../stringJSON/TeacherTextJson';
import { Colors } from '../../../../../styleApp/color';
import { FontSize } from '../../../../../styleApp/font';
import { ManageAssignMethod } from './ManageAssign.logic';
import { styles } from './ManageAssign.style';

/**
 * Assigning Lession Management screen
 * @param {Object} props props from redux and navigation
 * @returns {Component}
 */
export const ManageAssign = (props) => {
    const [visible, setVisible] = React.useState(false)
    const { Favorite, setOffset, debounceEvent, isLoading, flatlistRef,
        isReachedEnd, getData, valueUrl, offset, CheckLevel, dataAssign, loading, onFilter, loadMore, filter, firstLoading, reLoadData } = ManageAssignMethod(props)
    const language = useSelector(state => state.LanguageStackReducer.language)
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    /**
     * render each lession
     * @param {object} props   Flatlist props 
     * @returns {Component}
     */
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => props.navigation.navigate('DetailManageAssign', { id: item.exercise_id, allData: item})}
                style={[styles.viewItem, { borderBottomWidth: index + 1 === dataAssign?.length ? 0 : 0.3 }]}>
                <View style={styles.contentItem}>
                    <Image source={{ uri: ImageLesson(item.skill, item.sub_lesson_type) }} style={styles.itemImg} />
                    <View style={styles.flex1}>
                        <TextBox numberOfLines={null} style={styles.txtTopic}>
                            {`${item.level === 'normal' ? 'medium' : item.level}    ` + `${item.exercise_topic}`}
                        </TextBox>
                        <View
                            style={[styles.viewLevel, { backgroundColor: CheckLevel(item.level) }]}>
                            <TextBox style={styles.txtLevel}>{item.level === 'normal' ? 'medium' : item.level}</TextBox>
                        </View>
                        <TextBox style={styles.txtNameUnit} numberOfLines={null}>
                            {item.exercise_name}
                        </TextBox>
                        <TextBox style={styles.txtCurriculum} numberOfLines={null}>
                            {item.curriculum_name}
                        </TextBox>
                        
                        {dataLogin.role != 'parent' &&
                        <View style={styles.footerItem}>
                            <View style={styles.viewNumberAssign} >
                                <TextBox style={styles.txtNumberAssign} numberOfLines={null}>
                                    {item.number_assign} {CommonJson.Assign}
                                </TextBox>
                            </View>
                            <TouchableOpacity onPress={() => Favorite(item)} style={styles.touchFav}>
                                <Image source={{ uri: item.is_in_wishlist ? 'favorite' : 'unfavorite' }} resizeMode={'contain'} style={styles.iconFavoite} />
                            </TouchableOpacity>
                        </View>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={language.ManagingAssignmentScreen.Header}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                styleTitle={{ fontSize: FontSize.size60Font }}
                rightIcon={dataAssign?.length > 0 || filter ? (filter ? 'filter1' : 'filter2') : null}
                styleHeaderRight={{ tintColor: Colors.White }}
                rightIconOnPress={() => setVisible(true)}

            />

            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                { !firstLoading ?
                <FlatList
                    ref={flatlistRef}
                    scrollToOverflowEnabled={Platform.OS === 'ios'}
                    refreshControl={<RefreshControl
                        tintColor={Colors.Gray}
                        refreshing={loading}
                        onRefresh={() => reLoadData(valueUrl)}
                    />}
                    indicatorStyle={'black'}
                    contentContainerStyle={styles.flatlist}
                    data={dataAssign}
                    renderItem={renderItem}
                    onEndReached={debounceEvent(() => {
                        loadMore(valueUrl)
                    }, 500)
                    }
                    ListEmptyComponent={<>{!loading && <TextBox style={styles.txtEmpty}>{!filter ? TeacherTextJson.ManageAssign.Empty : TeacherTextJson.ManageAssign.EmptySearch}</TextBox>}</>}
                    ListFooterComponent={() => {
                        if (isReachedEnd) return (
                            <View style={styles.marginVertical15}>
                                <ActivityIndicator />
                            </View>
                        )
                        return <></>
                    }}
                    keyExtractor={(item, index) => item.id}
                /> : <FullScreenLoadingIndicator visible={firstLoading}/>
                }
            </LinearGradient>
            <ModalFilterCommon
                visible={visible}
                hideModal={() => setVisible(false)}
                showDate={true}
                cancel={true}
                onFilter={(param) => onFilter(param)}
            />
            <FullScreenLoadingIndicator
                visible={isLoading}
            />
        </>
    )
}