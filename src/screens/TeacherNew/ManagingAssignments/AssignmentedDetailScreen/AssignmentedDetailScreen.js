import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import { CommonJson } from '../../../../stringJSON/CommonJson'
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, Image, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { styles } from './AssignmentedDetailScreen.styles';
import { TextBox } from '../../../../componentBase/TextBox';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AssignmentedDetailScreenMethod } from './AssignmentedDetailScreen.logic';
import { ModalRemind } from './ModalRemind';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import moment from 'moment'
import API from '../../../../API/APIConstant';
import { Colors } from '../../../../styleApp/color';
import FontBase from '../../../../base/FontBase';
import { PieChartComponent } from '../../../../componentBase/Chart';
import stylesApp from '../../../../styleApp/stylesApp';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';

/**
 * AssignmentedDetailScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const AssignmentedDetailScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    let { AssignCurriculum, studentChoose, loading, dataComplete, dataInComplete, dataInfoClass, list_student,
        selectAll, baseUrl, chooseAll, reloadData, setStudentChoose, getData } = AssignmentedDetailScreenMethod(props)
    //tab management
    const [tab, setTab] = useState(1)
    //visible of modal
    const [visible, setVisible] = useState(false)
    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={CommonJson.PostAssigned}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                styleTitle={styles.txtHeader}
                // rightIcon={'post_assigned'}
                // rightIconOnPress={() => props.navigation.navigate('FastAssignmentsScreen', { role: 'FastAssign', list_student: list_student, exerciseId: props.navigation.getParam('exerciseId'), classId: props.navigation.getParam('classId'), exercise_info: dataInfoClass, reload: getData })}
                // styleHeaderRight={styles.rightHeader}
            />
            <LinearGradient
                style={styles.container}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                <View style={styles.container}>
                { !loading ? <>
                    <View style={styles.viewTopic}>
                        <TextBox numberOfLines={null} style={styles.txtTopic}>{dataInfoClass.exercise_topic}</TextBox>
                        <TextBox style={styles.txtNameItem}>{dataInfoClass.exercise_name}</TextBox>
                        <TextBox style={styles.txtTimeTopic}>Thời gian làm: <TextBox style={[styles.txtTimeTopic, styles.fontWeight500]}>{moment(dataInfoClass.start_time).format('DD/MM/YYYY')} - {moment(dataInfoClass.end_time).format('DD/MM/YYYY')}</TextBox></TextBox>
                    </View>
                    {dataInfoClass.total_complete > 0 &&
                        <Class language={language} dataInfoClass={dataInfoClass} />
                    }
                    <LinearGradient
                        style={styles.viewTab}
                        colors={[Colors.BaseGreen, Colors.LightGreen]}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <TouchableOpacity onPress={() => setTab(1)} style={[styles.btnTab, { borderBottomWidth: tab === 1 ? 5 : 0, borderColor: Colors._F4BA42 }]}>
                            <TextBox style={[styles.titleTabText, { fontFamily: tab === 1 ? FontBase.MyriadPro_Bold : FontBase.MyriadPro_Light, }]}>{language.AssignmentedDetailScreen.BottomTab_1}</TextBox>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setTab(2)} style={[styles.btnTab, { borderBottomWidth: tab === 2 ? 5 : 0, borderColor: Colors._F4BA42 }]}>
                            <TextBox style={[styles.titleTabText, { fontFamily: tab === 2 ? FontBase.MyriadPro_Bold : FontBase.MyriadPro_Light }]}>{language.AssignmentedDetailScreen.BottomTab_2}</TextBox>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        style={styles.container}
                        colors={[Colors._FFFFFF00, Colors._00000020]}
                        start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}>
                        <View style={styles.viewBodyTab}>
                            {tab === 1 && <CompleteFuntion dataComplete={dataComplete} baseUrl={baseUrl} />}
                            {tab === 2 && <Unfinished
                                language={language}
                                studentChoose={studentChoose}
                                AssignCurriculum={AssignCurriculum}
                                visible={visible}
                                setVisible={setVisible}
                                dataInComplete={dataInComplete}
                                selectAll={selectAll}
                                baseUrl={baseUrl}
                                chooseAll={chooseAll}
                                lessonId={props.navigation.getParam('exerciseId')}
                                reloadData={reloadData}
                                setStudentChoose={setStudentChoose}
                            />}
                        </View>
                    </LinearGradient>
                    </> :
                    <FullScreenLoadingIndicator visible={loading} />
                    }
                </View>
            </LinearGradient>
            {/* <FullScreenLoadingIndicator visible={loading} /> */}
        </>
    )
}

/**
 * 
 * @param {object} props 
 * @property {object} language Text of button 
 * @property {object} studentChoose Student information
 * @property {function} AssignCurriculum Student information
 * @property {boolean} visible Visibile of modal
 * @property {function} setVisible Set visible of modal
 * @property {object} dataInComplete Set visible of modal
 * @property {boolean} selectAll is select all boolean
 * @property {string} baseUrl base url string
 * @property {boolean} chooseAll choose all flag
 * @property {number} lessonId lesson id
 * @property {function} reloadData on refresh data
 * @property {function} setStudentChoose set selected student
 * @returns {Component}
 */
const Unfinished = React.memo((props) => {
    const { language, AssignCurriculum, studentChoose,
        visible, setVisible, dataInComplete, selectAll, baseUrl, chooseAll, lessonId, reloadData, setStudentChoose } = props
    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.horizontal, styles.marginTop10]}>
                <View style={styles.flexAndRow}>
                    <Image source={{ uri: baseUrl + item.to_avatar }} style={[styles.itemAvatar, styles.marginRight40]} />
                    <TextBox style={styles.txtName}>{item.to_fullname}</TextBox>
                </View>

                { item.remind === '0' ?
                    <View style={styles.marginRight20}>
                        <SmallCheckBox
                            onPress={() => AssignCurriculum(item)}
                            isNotify={studentChoose.includes(item.id)}
                            size={SmartScreenBase.smBaseWidth * 57}
                        />
                    </View>
                    :
                    <Image source={{ uri: 'ic_remind' }} style={styles.icRemind} />
                }
            </View>
        )
    }
    return (
        <>
            {dataInComplete.length === 0 ?
                <View style={styles.viewEmpty}>
                    <TextBox>Tất cả học sinh đã hoàn thiện bài tập</TextBox>
                </View> :
                <View style={styles.viewUnfinished}>
                    <View style={[styles.horizontal, styles.headerRemind]}>
                        <TouchableOpacity disabled={studentChoose.length > 0 ? false : true} onPress={() => setVisible(true)} style={[styles.viewRemind, { backgroundColor: studentChoose.length > 0 ? Colors._ED8A22 : Colors._D0D2D3 }]}>
                            <TextBox style={styles.txtRemind}>{language.AssignmentedDetailScreen.textButtonInTab_2}</TextBox>
                        </TouchableOpacity>
                        <View style={styles.row}>
                            <TextBox style={styles.selectAll}>{language.AssignmentedDetailScreen.textFilterInTab_2}</TextBox>
                            <View style={styles.chosenAll}>
                                <SmallCheckBox
                                    onPress={selectAll}
                                    isNotify={chooseAll}
                                    size={SmartScreenBase.smBaseWidth * 57}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.container, { marginBottom: SmartScreenBase.smBaseHeight * 20 }]}>
                        <FlatList

                            bounces={false}
                            indicatorStyle={Colors.Black}
                            data={dataInComplete}
                            renderItem={renderItem}
                            contentContainerStyle={styles.flatListContent}
                            keyExtractor={(item, index) => item.id + "" + index.toString()}
                        />
                    </View>
                    <ModalRemind
                        visible={visible}
                        hideModal={() => setVisible(false)}
                        studentChoose={studentChoose}
                        exercise_id={lessonId}
                        reloadData={reloadData}
                        setStudentChoose={setStudentChoose}
                    />
                </View >
            }

        </>
    )
})


/**
 * 
 * @param {object} props 
 * @property {string} baseUrl base url string
 * @property {array} dataComplete list of data
 * @returns {Component}
 */
const CompleteFuntion = React.memo((props) => {
    let { dataComplete, baseUrl } = props

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.horizontal, styles.item]}>
                <View style={[styles.row, styles.flex1]}>
                    <Image source={{ uri: baseUrl + item.to_avatar }} style={[styles.itemAvatar, styles.marginRight40]} />
                    {/* <TextBox style={styles.txtName}>{item.from_fullname}</TextBox> */}
                    <View style={styles.infoWrapper}>
                        <TextBox style={styles.txtName}>{item.to_fullname}</TextBox>
                        <View style={[styles.row]}>
                            <Image source={{ uri: 'icon_time' }} style={styles.iconTime} />
                            <TextBox style={styles.txtTime}>Nộp vào {!!item.create_submit_time && (moment(item.create_submit_time).format('HH$mm’ - DD/MM/YYYY').replace('$', 'h'))}</TextBox>
                        </View>
                    </View>
                </View>
                {console.log("=====item",item)}
                {item.score ? <View
                    style={styles.viewPoint}>
                    <TextBox style={styles.txtPoint}>{item.score}</TextBox>
                </View> : item.status == '0' ? <View
                    style={styles.viewNotAs}>
                    <TextBox numberOfLines={2} style={styles.txtNotAs}>{"Chưa chấm"}</TextBox>
                </View> : null}
            </View>
        )
    }
    return (
        <>
            {
                dataComplete.length === 0 ?
                    <View style={styles.viewEmpty}>
                        <TextBox>Chưa có học sinh nào hoàn thiện bài tập này</TextBox>
                    </View>
                    :
                    <View style={styles.viewComplete}>
                        <FlatList

                            bounces={false}
                            indicatorStyle={Colors.Black}
                            data={dataComplete}
                            renderItem={renderItem}
                            contentContainerStyle={styles.marginBottom30}
                            keyExtractor={index => index.toString()}
                        />
                    </View>
            }
        </>
    )


})

/**
 * 
 * @param {object} props 
 * @property {object} language Text of button 
 * @property {object} dataInfoClass information of class
 * @returns {Component}
 */
const Class = React.memo((props) => {
    let { language, dataInfoClass } = props
    // let {overview_score} = item.report_data

    return (
        <View style={styles.carouselItem}>
            <View style={styles.classItem}>
                <View style={styles.container}>
                    <PieChartComponent
                        containerStyle={styles.statisticContainer}
                        statisticTitle={"Số học sinh hoàn thành"}
                        statisticPoint={`${dataInfoClass.total_complete}/${dataInfoClass.total_user}`}
                        chartSize={SmartScreenBase.smPercenWidth * 27}
                        statisticTextStyle={styles.statisticText}
                        statisticTypeStyle={styles.statisticType}
                        averageTextStyle={styles.averageText}
                        averagePointStyle={styles.averagePoint}
                        data={[
                            {
                                key: '1',
                                svg: { fill: Colors._00AEEF },
                                value: dataInfoClass.excellent,
                                title: language.AssignmentedDetailScreen.ItemChart1 || "Giỏi"
                            },
                            {
                                key: '2',
                                svg: { fill: Colors._00CC7E },
                                value: dataInfoClass.good,
                                title: language.AssignmentedDetailScreen.ItemChart2 || "Khá"
                            },
                            {
                                key: '3',
                                svg: { fill: Colors.Orange },
                                value: dataInfoClass.average,
                                title: language.AssignmentedDetailScreen.ItemChart3 || "Trung bình"
                            },
                            {
                                key: '4',
                                svg: { fill: Colors._BE1E2D },
                                value: dataInfoClass.poor,
                                title: language.AssignmentedDetailScreen.ItemChart4 || "Dưới Trung bình"
                            }
                        ]}
                    />
                </View>
            </View>
        </View>
    )
})