import React, { Component, memo, useCallback, useRef, useState } from 'react';
import { FlatList, Image, Platform, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { Plan, PlanItem, PLAN_TYPE } from '../../../componentBase/PlanItem';
import { PickDateBox } from '../../../componentBase/PickDateBox';

import { TextBox } from '../../../componentBase/TextBox';
import { Colors } from '../../../styleApp/color';
import LinearGradient from 'react-native-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';
import { styles } from './Home.styles';
import { DeletePopup, SmPopup } from '../../../componentBase/SmPopup';
import { PlanModal } from '../../../componentBase/PlanModal';
import { studyPlanMethod } from './Home.logic';
import { connect, useSelector } from 'react-redux';
import moment from 'moment';
import { FullScreenLoadingIndicator, _ComponentLoadingIndicator } from '../../../componentBase/indicator';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import APIBase from '../../../base/APIBase';
import API from '../../../API/APIConstant';
import { FontWeight } from '../../../styleApp/font';
import { CommonJson, StudyPlanJson } from '../../../stringJSON';
import { PieChartComponent } from '../../../componentBase/Chart';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import { TeacherTextJson } from '../../../stringJSON/TeacherTextJson';
import FontBase from '../../../base/FontBase';
import { ComponentLoadingIndicator } from '../../../componentBase/indicator/ComponentLoadingIndicator';
import LogBase from '../../../base/LogBase';
import UpdateVersionModal from '../../../componentBase/UpdateVersionModal/UpdateVersionModal';
import {ICON_PLAN_X, ICON_PLAN_EDIT, ICON_PLAN_DELETE, ICON_PLAN_SUCCESS} from '../../../assets/image/index'

/**
 * @summary Teacher Home screen.
 *
 * @param {object} props
 * @property {object} navigation: The navigation object
 *
 * @returns {Component}
 */
export const HomeScreen = (props) => {
    let [modalVisible, setVisible] = useState(false);
    const language = useSelector(state => state.LanguageStackReducer.language);

    // useFocusEffect(
    //     useCallback(() => {
    //         // Do something when the screen is focused
    //         getData()
    //         return () => {
    //             // Do something when the screen is unfocused
    //             // Useful for cleanup functions
    //         };
    //     }, [currentDate])
    // );

    const {
        loading, setCurrentDate, getData, setReload,
        showModalDate, setModalDate, completePlan,
        currentItem, setCurrentItem, currentDate, chosenDate,
        deletePlan, loadingIndicator, onCheckAction,
        classes, studyData, isReloadData, flatlistRef,changetoNotDonePlan, cancelUpdate,
        getClass, loadingClass, isVisibleUpdate, setVisibleUpdate, pickDateRefs, isMust, dataUpdateVer
    } = studyPlanMethod(props);

    const itemRefs = useRef(new Map()).current;
    const [isRepeat, setIsRepeat] = useState(false)
    /**
     *  Function render the top data list
     */
    const EmptyComponent = useCallback(({ text, goBack }) => {
        console.log('----renderEmptyComponent');
        return (
            <View style={styles.emptyContainer}>
                <Image
                    source={{ uri: 'schedule_image' }}
                    style={styles.emptyImage}
                    resizeMode="contain"
                />
                <TextBox style={styles.emptyText} numberOfLines={3}>{text}</TextBox>
                <ShortMainButton
                    type={1}
                    style={styles.createBtn}
                    textStyles={styles.btnText}
                    onPress={() => {
                        LogBase.log("=====dt_",currentDate)
                        props.navigation.navigate('CreateWorkingPlan', {
                            curDate: currentDate,
                            goBack: goBack,
                        });
                    }}
                    text={language.DateCalendarScreen?.HeaderBt || TeacherTextJson.Home.CreatePlan}
                    widthType={'full'}
                />
            </View>
        );
    }, [currentDate]);

    /**
     *  Function render those action buttons
     *
     *  @property {object} data:
     *  @property {object} rowData:
     *
     */
    const HiddenItem = useCallback(({ data }) => {
        let { item } = data;
        const renderBtn = useCallback((title, icon, onPress) => (
            <TouchableOpacity style={styles.hiddenItem} onPress={onPress}>
                <Image
                    source={icon}
                    style={styles.iconHidden}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        ), []);

        return (
            <View style={styles.viewHiddenItem}>
                <View style={styles.actionBtnContainer}>
                    <View style={styles.actionBtn}>
                        {item.status !== 'done' ? renderBtn(language.JobBox?.CompleteBt || 'Hoàn thành', ICON_PLAN_SUCCESS, () => {
                            completePlan(item);
                            itemRefs.get(item.id).close();
                        })
                        :renderBtn(language.JobBox.CompleteBt, ICON_PLAN_X, () => {
                            itemRefs.get(item.id).close()
                            changetoNotDonePlan(item)
                        })}
                        {renderBtn(language?.JobBox?.FixBt || 'Sửa', ICON_PLAN_EDIT, () => {
                            props.navigation.navigate('CreateWorkingPlan', {
                                data: item,
                                goBack: () => {
                                    getData();
                                    LogBase.log("=====getData c8")
                                    // setReload(!isReloadData);
                                },
                            });
                            itemRefs.get(item.id).close();
                            // setModalDate(true)
                            // setCurrentItem(item)
                        })}
                        {renderBtn(language?.JobBox?.DeleteSt || 'Xóa', ICON_PLAN_DELETE, () => {
                            itemRefs.get(item.id).close();
                            if (item.repeat_type) {
                                setIsRepeat(true)
                            }
                            setCurrentItem(item);
                            setVisible(true);
                        })}
                    </View>
                </View>
            </View>
        );
    }, [currentDate, isReloadData, getData]);

    const closeAll = () => {
        [...itemRefs.entries()].forEach(([key, ref]) => {
            ref.close();
        });
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <PickDateBox ref={pickDateRefs} onSelect={setCurrentDate} isReloadData={isReloadData} />
                <FlatList
                    ref={flatlistRef}
                    scrollToOverflowEnabled={Platform.OS === 'ios'}
                    refreshControl={<RefreshControl
                        refreshing={loading}
                        tintColor={Colors.Gray}
                        onRefresh={() => {
                            getData();
                            LogBase.log("=====getData c9")
                            setReload(!isReloadData);
                        }}
                    />}
                    style={[styles.container, {opacity: loading ? 0 : 1}]}
                    data={studyData}
                    keyExtractor={(item) => item.id}
                    extraData={studyData}
                    renderItem={(itemProps) => {
                        return (
                            <Plan {...itemProps} itemRefs={itemRefs}
                                onPress={() => {
                                    closeAll();
                                    props.navigation.navigate('DetailPlan', {
                                        data: itemProps.item,
                                    });}}
                                HiddenItem={HiddenItem} />
                        );
                    }}
                    ListEmptyComponent={ !loading && <EmptyComponent
                        text={
                            chosenDate === moment().format('YYYY-MM-DD') ?
                                StudyPlanJson.EmptyPlanListToday :
                                StudyPlanJson.EmptyPlanList
                        }
                        goBack={() => {
                            getData();
                            LogBase.log("=====getData c10")
                            setReload(!isReloadData);
                        }}
                    />}
                />
                { !loadingClass ? <ClassSlider
                    language={language}
                    classes={classes}
                    getClass={getClass}
                    props={props}
                    loading={loadingClass}
                /> : <ComponentLoadingIndicator style={{height:SmartScreenBase.smPercenWidth*20, width:SmartScreenBase.smPercenWidth*100}}/>}
            </SafeAreaView>
            <DeletePopup
                confirmOnpress={(isDeleteAll) => {
                    setVisible(false);
                    deletePlan(currentItem.id, isDeleteAll);
                }}
                visible={modalVisible}
                isRepeat={isRepeat}
                onClose={() => setVisible(false)}
                message={language?.DateCalendarScreen?.DeleteCalenderPopup ? (language?.DateCalendarScreen?.DeleteCalenderPopup + '?') : 'Error'}
            />
            <PlanModal
                visible={showModalDate}
                onCancel={() => { setModalDate(false); }}
                defaultValue={currentItem}
                currentDate={currentDate}
                onSave={onCheckAction}
            />
            { isVisibleUpdate && <UpdateVersionModal 
                isVisible={isVisibleUpdate} 
                dataUpdate={dataUpdateVer} 
                onClose={() => {cancelUpdate()}}
            />}
            <FullScreenLoadingIndicator
                visible={loading}
            />
        </>
    );
};


/**
 * Class Slider Component
 */
const ClassSlider = React.memo(({
    classes,
    language,
    getClass,
    loading,
    props,
}) => {
    let [activeSlide, setActiveSlide] = useState(0);
    return (
        <View style={styles.carouselContainer}>
            <Carousel
                onSnapToItem={(index) => { setActiveSlide(index); }}
                data={classes}
                // data={[]}
                renderItem={({ item, index }) => <Class classesData={classes[index]} {...props} language={language} item={item} index={index} />}
                sliderWidth={SmartScreenBase.smPercenWidth * 100}
                itemWidth={SmartScreenBase.smPercenWidth * 100}
                ListEmptyComponent={
                    <View
                        style={{
                            width: SmartScreenBase.smPercenWidth * 100 - 28,
                            height: 140,
                            backgroundColor: '#FFF',
                            paddingHorizontal: 10,
                            paddingVertical: 16,
                            flexDirection: 'column',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            marginHorizontal: 16,
                            marginVertical: 18,
                            borderRadius: 12,
                        }}
                    >
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Image
                                source={{uri: 'class_empty'}}
                                style={{width: SmartScreenBase.smPercenWidth * 45}}
                                resizeMode="contain"
                            />
                            <View style={{width: SmartScreenBase.smPercenWidth * 55 - 56, alignItems: 'center'}}>
                                <Text style={{textAlign: 'center',fontFamily: FontBase.MyriadPro_Regular, color: '#000', fontSize: SmartScreenBase.smFontSize * 40}}>{'Bạn chưa có lớp học online nào.\nĐể theo dõi báo cáo học tập, hãy tạo lớp!'}</Text>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('CreateClassTeacherScreen', {
                                        reload: ()=> {
                                           props.navigation.navigate('ClassManager')
                                        },
                                    })}
                                    style={{width: SmartScreenBase.smPercenWidth*35, height: SmartScreenBase.smPercenWidth*10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
                                >
                                    {/* <TextBox text={'+'} color={Colors.BaseGreen} style={{
                                        fontSize: SmartScreenBase.convertSize(65),
                                        fontFamily: FontBase.MyriadPro_Bold,
                                    }} /> */}
                                    <TextBox text={'Tạo lớp mới'} color={Colors.BaseGreen} style={{
                                        fontSize: SmartScreenBase.smFontSize*45,
                                        fontFamily: FontBase.MyriadPro_Bold,
                                        textDecorationLine: 'underline'                                        
                                    }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            />
                
            {
                classes.length > 0 && (
                    <Pagination
                        dotsLength={classes.length}
                        activeDotIndex={activeSlide}
                        containerStyle={styles.paging}
                        dotElement={<View style={styles.dotContainer}>
                            <View style={styles.dotActive} />
                        </View>}
                        inactiveDotElement={<View style={styles.dotContainer} />}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                )
            }
        </View>
    );
});

/**
 * Component display class statistic
 * @param {any} props
 */
const Class = React.memo((props) => {
    let { item, language, classesData } = props;
    let { overview_score } = item.report_data;
    const checkHasChart = overview_score ? (overview_score.A > 0 || overview_score.B > 0 || overview_score.C > 0 || overview_score.D > 0) : false;

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                if(parseInt(classesData.count_student) > 0){
                    props.navigation.navigate('StudyReportTeacherScreen', {
                        id: item.id,
                    });
                }else{
                    
                }
            }} style={styles.carouselItem}>
            <View style={styles.classItem}>
                <Image
                    source={{ uri: API.image_base_url + (item.class_avatar || item.avatar) }}
                    style={styles.classImage}
                />
                <View style={{ flex: 1 }}>
                    <View style={styles.content} >
                        <LinearGradient
                            colors={[Colors.LightGreen, Colors.BaseGreen]}
                            start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                            style={styles.classNameContainer}>
                            <TextBox
                                style={styles.className}
                            >{item.class_name}</TextBox>
                        </LinearGradient>
                    </View>
                    {!checkHasChart || !(parseInt(classesData.count_student) > 0)
                        ?
                        <View style={[styles.statisticContainer, { justifyContent: 'center' }]}>
                            <TextBox
                                numberOfLines={2}
                                style={styles.emptyChart}
                            >{!(parseInt(classesData.count_student) > 0) ? 'Lớp chưa có học sinh, vui lòng thêm học sinh vào lớp.' : 'Báo cáo học tập của lớp đang được cập nhật.'}</TextBox>
                        </View>
                        :
                        <PieChartComponent
                            containerStyle={styles.statisticContainer}
                            statisticTitle={language.HomeTeacherScreen?.SpecialItemChart || ''}
                            statisticPoint={Number(item.report_data.avg) < 0 ? '0' : item.report_data.avg}
                            chartSize={SmartScreenBase.smPercenHeight * 7.5}
                            statisticTextStyle={styles.statisticText}
                            statisticTypeStyle={styles.statisticType}
                            averageTextStyle={styles.averageText}
                            averagePointStyle={styles.averagePoint}
                            data={[
                                {
                                    key: '1',
                                    svg: { fill: Colors._00AEEF },
                                    value: overview_score.A,
                                    title: language.HomeTeacherScreen.ItemChart1 || 'Giỏi',
                                },
                                {
                                    key: '2',
                                    svg: { fill: Colors._00CC7E },
                                    value: overview_score.B,
                                    title: language.HomeTeacherScreen.ItemChart2 || 'Khá',
                                },
                                {
                                    key: '3',
                                    svg: { fill: Colors.Orange },
                                    value: overview_score.C,
                                    title: language.HomeTeacherScreen.ItemChart3 || 'Trung bình',
                                },
                                {
                                    key: '4',
                                    svg: { fill: Colors._BE1E2D },
                                    value: overview_score.D,
                                    title: language.HomeTeacherScreen.ItemChart4 || 'Dưới Trung bình',
                                },
                            ]}
                        />
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
});

const mapStateToProps = state => ({
    userInfo: state.AuthStackReducer.dataLogin,
});
export const Home = connect(mapStateToProps, null)(HomeScreen);
