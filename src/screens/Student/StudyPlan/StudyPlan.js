import React, { Component, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FlatList, Image, Platform, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { AppHeader } from '../../../componentBase/AppHeader';
import { PlanItem, PLAN_TYPE } from '../../../componentBase/PlanItem';
import { PickDateBox } from '../../../componentBase/PickDateBox';
import { FontSize, FontWeight } from '../../../styleApp/font';
import { CommonJson, StudyPlanJson } from '../../../stringJSON';
import { TextBox } from '../../../componentBase/TextBox';
import { Colors } from '../../../styleApp/color';
import LinearGradient from 'react-native-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';
import stylesApp from '../../../styleApp/stylesApp';
import { styles } from './StudyPlan.styles';
import { SmPopup } from '../../../componentBase/SmPopup';
import { PlanModal } from '../../../componentBase/PlanModal';
import { studyPlanMethod } from './StudyPlan.logic';
import { connect } from 'react-redux';
import moment from "moment";
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import SwipeableItem, { UnderlayParams } from 'react-native-swipeable-item';
import { Plan } from '../../../componentBase/PlanItem';
import {ICON_PLAN_X, ICON_PLAN_EDIT, ICON_PLAN_DELETE, ICON_PLAN_SUCCESS} from '../../../assets/image/index'

/**
 * @summary StudyPlan screen.
 * 
 * @param {object} props 
 * @property {object} navigation: The navigation object
 * 
 * @returns {Component}
 */
export const StudyPlanScreen = (props) => {
    let [modalVisible, setVisible] = useState(false)

    const {
        loading, scheduleData, onCreate, isReloadData,
        studyData, setCurrentDate, getData,
        setIsReloadData, flatlistRef,changetoNotDonePlan,
        showModalDate, setModalDate, completePlan,
        currentItem, setCurrentItem, currentDate,
        deletePlan, loadingIndicator, onCheckAction
    } = studyPlanMethod(props)
    const itemRefs = useRef(new Map()).current;

    /**
     * Close all item
     */
    const closeAll = () => {
        [...itemRefs.entries()].forEach(([key, ref]) => {
            ref.close();
        });
    }
    /**
     *  Function render Schedule in a list
     */
    const renderScheduleItem = useCallback((item, index) => {
        const checkType = () => {
            if (item.type === 'personal') {
                return Colors.SuccessGreen
            } else if (item.type === 'teaching_work') {
                return Colors._00AEEF
            } else if (item.type === 'professional_activities') {
                return Colors.Orange
            } else if (item.type === 'test_evaluation') {
                return Colors._C367F4
            } else if (item.type === 'other') {
                return Colors._BE1E2D
            } else return Colors.SuccessGreen
        }
        return (
            <PlanItem
                key={item.id}
                containerStyle={styles.planItemContainer}
                actionable={false}
                type={PLAN_TYPE.ORANGE}
                middleComponent={() => (
                    <TextBox style={styles.itemNameClassSchedule}>{item.title}</TextBox>
                )}
                rightComponent={() => (<TextBox style={styles.itemTimeSchedule}>{moment(item.start_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm") + " - " + moment(item.end_time, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}</TextBox>)}
            />
        )
    }, [])

    /**
     *  Function render those action buttons
     *  
     *  @property {object} data:
     *  @property {object} rowData:
     * 
     */
    const HiddenItem = ({ data }) => {
        let { item } = data
        const renderBtn = useCallback((title, icon, onPress) => (
            <TouchableOpacity style={styles.hiddenItem} onPress={onPress}>
                <Image
                    source={icon}
                    style={styles.iconHidden}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        ), [])
        const closeAll = () => {
            itemRefs.get(item.id).close()
        }
        return (
            <View style={styles.viewHiddenItem}>
                <View style={styles.actionBtnContainer}>
                    <View style={styles.actionBtn}>
                        {item.status !== 'done' ? renderBtn(CommonJson.Complete, ICON_PLAN_SUCCESS, () => {
                            completePlan(item);
                            closeAll()
                        })
                        :renderBtn(CommonJson.Complete, ICON_PLAN_X, () => {
                            closeAll()
                            changetoNotDonePlan(item)
                        })}
                        {renderBtn(CommonJson.Edit, ICON_PLAN_EDIT, () => {
                            setModalDate(true)
                            closeAll()
                            setCurrentItem(item)
                        })}
                        {renderBtn(CommonJson.Delete, ICON_PLAN_DELETE, () => {
                            setCurrentItem(item)
                            setVisible(true)
                            closeAll()
                        })}
                    </View>
                </View>
            </View>
        )
    }

    /**
     *  Function render the top data list
     */
    const renderHeader = useCallback(() => {
        return (
            <>
                <TextBox style={styles.title}>{StudyPlanJson.ScheduleTitle}</TextBox>
                {scheduleData.length < 1 ? <>
                    <View style={styles.emptyContainer}>
                        <Image
                            source={{ uri: "schedule_image" }}
                            style={styles.emptyImage}
                            resizeMode='contain'
                        />
                        <TextBox
                            style={styles.emptyText}
                            numberOfLines={3}
                        >{currentDate === moment().format("YYYY-MM-DD") ?
                            StudyPlanJson.EmptyScheduleListToday :
                            StudyPlanJson.EmptyScheduleList}</TextBox>
                    </View>
                </> : scheduleData.map(renderScheduleItem)}
                <View style={styles.row}>
                    <TextBox style={styles.title}>{StudyPlanJson.PlanTitle}</TextBox>
                    <TouchableOpacity onPress={() => {
                        closeAll()
                        setModalDate(true)
                    }}>
                        <LinearGradient
                            style={styles.createBtn}
                            colors={[Colors.LightGreen, Colors.LightGreen, Colors.BaseGreen]}
                            start={{ x: 0, y: 0.5 }} xend={{ x: 1, y: 0.5 }}>
                            <Image source={{ uri: 'white_plus' }}
                                style={[styles.imgPlus,]} resizeMode='contain' />
                            <View style={styles.border}>
                                <TextBox style={styles.createText}>{CommonJson.Create}</TextBox>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </>
        )
    }, [renderScheduleItem, studyData, scheduleData])

    /**
     *  Function render the top data list
     */
    const renderEmptyComponent = useCallback((text) => {
        return (
            <View style={styles.emptyContainer}>
                <TextBox style={styles.emptyText} numberOfLines={3}>{text}</TextBox>
                <Image
                    source={{ uri: "schedule_image" }}
                    style={styles.emptyImage}
                    resizeMode='contain'
                />
            </View>
        )
    }, [])






    return (
        <>
            <LinearGradient
                style={styles.container}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White, Colors.White]}
                start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}>
                <AppHeader
                    navigation={props.navigation}
                    title={StudyPlanJson.Header}
                    leftIconOnPress={() => {
                        props.navigation.pop()
                    }}
                    rightComponent={() => (
                        <TouchableOpacity style={styles.rightHeaderComponent} onPress={() => {
                            closeAll()
                            props.navigation.navigate('TimeTable', {
                                goBack: () => {
                                    getData()
                                    setIsReloadData(!isReloadData)
                                }
                            })
                        }}>
                            <TextBox style={styles.headerRightText}>{StudyPlanJson.ScheduleButton}</TextBox>
                        </TouchableOpacity>
                    )}
                />
                <PickDateBox
                    isReloadData={isReloadData}
                    onSelect={setCurrentDate} />
                { !loadingIndicator ?
                <FlatList
                    scrollToOverflowEnabled={Platform.OS === 'ios'}
                    ref={flatlistRef}
                    style={styles.container}
                    refreshControl={<RefreshControl
                        refreshing={loading}
                        tintColor={Colors.Gray}
                        onRefresh={() => {
                            getData()
                            setIsReloadData(!isReloadData)
                        }}
                    />}
                    data={studyData}
                    keyExtractor={(item, index) => item.id}
                    extraData={studyData}
                    renderItem={(itemProps) => {
                        return (
                            <Plan {...itemProps} itemRefs={itemRefs} HiddenItem={HiddenItem} />
                        )
                    }}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={() => renderEmptyComponent(
                        currentDate === moment().format("YYYY-MM-DD") ?
                            StudyPlanJson.EmptyPlanListToday :
                            StudyPlanJson.EmptyPlanList
                    )}
                /> : <FullScreenLoadingIndicator visible={loadingIndicator}/>}
                <SmPopup
                    confirmOnpress={() => {
                        setVisible(false)
                        deletePlan(currentItem.id)
                        console.log("---choseItem()", currentItem);
                    }}
                    visible={modalVisible}
                    onClose={() => setVisible(false)}
                    message={StudyPlanJson.DeletePlanTitle}
                />
            </LinearGradient>
            <PlanModal
                visible={showModalDate}
                onCancel={() => { setModalDate(false) }}
                defaultValue={currentItem}
                currentDate={currentDate}
                onSave={onCheckAction}
            />
        </>
    )
}


const mapStateToProps = state => ({
    userInfo: state.AuthStackReducer.dataLogin,
});
export const StudyPlan = connect(mapStateToProps, null)(StudyPlanScreen);