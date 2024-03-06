import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Platform, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Plan } from '../../../componentBase/PlanItem';
import { PickDateBox } from '../../../componentBase/PickDateBox';

import { TextBox } from '../../../componentBase/TextBox';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './WokingByDay.styles';
import { DeletePopup, SmPopup } from '../../../componentBase/SmPopup';
import { PlanModal } from '../../../componentBase/PlanModal';
import { studyPlanMethod } from './WokingByDay.logic';
import { connect, useSelector } from 'react-redux';
import moment from "moment";
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import { AppHeader } from '../../../componentBase/AppHeader';
import { CommonJson, StudyPlanJson } from '../../../stringJSON';
import { Colors } from '../../../styleApp/color';
import {ICON_PLAN_X, ICON_PLAN_EDIT, ICON_PLAN_DELETE, ICON_PLAN_SUCCESS} from '../../../assets/image/index'

/**
 * @summary Working schedule by day screen - Quản lý Kế hoạch GV .
 * 
 * @param {object} props 
 * @property {object} navigation: The navigation object
 * 
 * @returns {Component}
 */
export const WorkingByDay = (props) => {
    let [modalVisible, setVisible] = useState(false)
    const language = useSelector(state => state.LanguageStackReducer.language);
    const itemRefs = useRef(new Map()).current;
    const {
        loading, setCurrentDate, getData,
        showModalDate, setModalDate, completePlan,
        currentItem, setCurrentItem, currentDate,
        deletePlan, loadingIndicator, setReload,
        studyData, flatlistRef, changetoNotDonePlan,
        isReloadData
    } = studyPlanMethod(props)
    let [activeSlide, setActiveSlide] = useState(0)
    const [isRepeat, setIsRepeat] = useState(false)

    /**
     * Close all item
     */
    const closeAll = () => {
        [...itemRefs.entries()].forEach(([key, ref]) => {
            ref.close();
        });
    }
    /**
     *  Function render the top data list
     */
    const renderEmptyComponent = useCallback((text) => {
        return (
            <View style={styles.emptyContainer}>
                <Image
                    source={{ uri: "schedule_image" }}
                    style={styles.emptyImage}
                    resizeMode='contain'
                />
                <TextBox style={styles.emptyText} numberOfLines={3}>{text}</TextBox>
            </View>
        )
    }, [])

    /**
     *  Function render those action buttons
     *  
     *  @property {object} data:
     *  @property {object} rowData:
     * 
     */
    const HiddenItem = useCallback(({ data }) => {
        let { item } = data
        const renderBtn = useCallback((title, icon, onPress) => (
            <TouchableOpacity style={styles.hiddenItem} onPress={onPress}>
                <Image
                    source={icon}
                    style={styles.iconHidden}
                    resizeMode='contain'
                />
                {/* <TextBox numberOfLines={4} style={styles.txtTitleHidden}>{title}</TextBox> */}
            </TouchableOpacity>
        ), [])

        return (
            <View style={styles.viewHiddenItem}>
                <View style={styles.actionBtnContainer}>
                    <View style={styles.actionBtn}>
                        {item.status !== 'done' ? renderBtn(language.JobBox.CompleteBt, ICON_PLAN_SUCCESS, () => {
                            itemRefs.get(item.id).close()
                            completePlan(item)
                        })
                        :renderBtn(language.JobBox.CompleteBt, ICON_PLAN_X, () => {
                            itemRefs.get(item.id).close()
                            changetoNotDonePlan(item)
                        })}
                        {renderBtn(language.JobBox.FixBt, ICON_PLAN_EDIT, () => {
                            props.navigation.navigate("CreateWorkingPlan", {
                                data: item,
                                goBack: () => {
                                    getData()
                                    setReload(!isReloadData);
                                }
                            })
                            itemRefs.get(item.id).close()
                            // setModalDate(true)
                            // setCurrentItem(item)
                        })}
                        {renderBtn(language.JobBox.DeleteSt, ICON_PLAN_DELETE, () => {
                            itemRefs.get(item.id).close()
                            if (item.repeat_type) {
                                setIsRepeat(true)
                            }
                            setCurrentItem(item)
                            setVisible(true)
                        })}
                    </View>
                </View>
            </View>
        )
    }, [currentDate, isReloadData, getData])

    return (
        <LinearGradient
            style={styles.flex1}
            colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White, Colors.White]}
            start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}>
            <AppHeader
                navigation={props.navigation}
                title={language.DateCalendarScreen.Header}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                rightComponent={() => (
                    <TouchableOpacity style={styles.rightHeaderComponent} onPress={() => {
                        closeAll()
                        props.navigation.navigate('CreateWorkingPlan', {
                            curDate: currentDate,
                            goBack: () => {
                                getData()
                                setReload(!isReloadData);
                            }
                        })
                    }}>
                        <TextBox style={styles.createPlanText}>{language.DateCalendarScreen?.HeaderBt || ""}</TextBox>
                    </TouchableOpacity>
                )}
            />
            <PickDateBox
                isReloadData={isReloadData}
                onSelect={setCurrentDate}
                // ref={pickDateRef}
            />
                <FlatList
                    ref={flatlistRef}
                    scrollToOverflowEnabled={Platform.OS === 'ios'}
                    style={[styles.flex1, loading ? {opacity: 0} : {opacity: 1}]}
                    refreshControl={<RefreshControl
                        refreshing={loading}
                        tintColor={Colors.Gray}
                        onRefresh={() => {
                            getData()
                            setReload(!isReloadData);
                        }}
                    />}
                    data={studyData}
                    keyExtractor={(item, index) => item.id + index.toString()}
                    extraData={studyData}
                    renderItem={(itemProps) => {
                        return (
                            <Plan onPress={() => {
                                closeAll()
                                props.navigation.navigate("DetailPlan", {
                                    data: itemProps.item
                                })
                            }} {...itemProps} itemRefs={itemRefs} HiddenItem={HiddenItem} />
                        )
                    }}
                    ListEmptyComponent={() => renderEmptyComponent(currentDate === moment().format("YYYY-MM-DD") ?
                        StudyPlanJson.EmptyPlanListToday :
                        StudyPlanJson.EmptyPlanList)}
                />
            <DeletePopup
                confirmOnpress={(isDeleteAll) => {
                    setVisible(false)
                    deletePlan(currentItem.id, isDeleteAll)
                    console.log("---choseItem()", currentItem);
                }}
                isRepeat={isRepeat}
                visible={modalVisible}
                onClose={() => setVisible(false)}
                message={!!language?.DateCalendarScreen?.DeleteCalenderPopup ? (language?.DateCalendarScreen?.DeleteCalenderPopup + "?") : "Error"}
            />
            <PlanModal
                visible={showModalDate}
                onCancel={() => { setModalDate(false) }}
                defaultValue={currentItem}
                // currentDate={currentDate}
                onSave={() => { }}
            />
            <FullScreenLoadingIndicator
                visible={loading}
            />
        </LinearGradient >
    )
}
