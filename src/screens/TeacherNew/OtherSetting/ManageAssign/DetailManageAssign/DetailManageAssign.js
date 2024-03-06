import React from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../../componentBase/AppHeader';
import { FontSize, FontWeight } from '../../../../../styleApp/font';
import { DetailManageAssignMethod } from './DetailManageAssign.logic';
import { styles } from './DetailManageAssign.style'
import moment from 'moment'
import { FullScreenLoadingIndicator } from '../../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { DetailSkillJson } from '../../../../../stringJSON';
import { Colors } from '../../../../../styleApp/color';
import { TextBox } from '../../../../../componentBase/TextBox';
import { ShortMainButton } from '../../../../../componentBase/ShortMainButton'

/**
 * Detail Assigning Lession management
 * @param {Object} props props from redux and navigation
 * @returns {Component}
 */
export const DetailManageAssign = (props) => {
    const { dataDetail, loading, onAssign, displayedData } = DetailManageAssignMethod(props)
    const language = useSelector(state => state.LanguageStackReducer.language)
    const lessonDt = props.navigation.getParam('allData')
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    /**
     * Header of Statistic
     */
    const renderHeader = (item, index) => {
        return (
            <View style={styles.viewTable}>
                {dataLogin.role != 'parent' ? 
                <TextBox style={[FontWeight.SemiBold, styles.className]}>{`${index + 1}. ${item.class_name}`}</TextBox>
                :  <TextBox style={styles.className}></TextBox>
                }
                <View style={styles.rowTitle}>
                    <LinearGradient
                        style={styles.viewDate}
                        colors={[Colors._AAF6DC, Colors._A0F5D9]}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <TextBox numberOfLines={null} style={styles.txtTable}>{language.HistoryHomeWorkScreen.Column2}</TextBox>
                    </LinearGradient>
                    <View>
                        <LinearGradient
                            style={[styles.viewPoint, { flex: 0 }]}
                            colors={[Colors._AAF6DC, Colors._A0F5D9]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <TextBox style={styles.txtTable}>{language.HistoryHomeWorkScreen.Column3}</TextBox>
                        </LinearGradient>
                        <View style={[styles.rowTitle, { justifyContent: 'space-between', marginTop: SmartScreenBase.smBaseHeight * 5 }]}>
                            <LinearGradient
                                style={[styles.viewRank, styles.paddingVertical2]}
                                colors={[Colors._AAF6DC, Colors._A0F5D9]}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                <TextBox style={styles.txtTable}>{language.HistoryHomeWorkScreen.Column3p1}</TextBox>
                            </LinearGradient>
                            <LinearGradient
                                style={[styles.viewRank, styles.paddingVertical2]}
                                colors={[Colors._AAF6DC, Colors._A0F5D9]}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                <TextBox style={styles.txtTable}>{language.HistoryHomeWorkScreen.Column3p2}</TextBox>
                            </LinearGradient>
                            <LinearGradient
                                style={[styles.viewRank, styles.paddingVertical2]}
                                colors={[Colors._AAF6DC, Colors._A0F5D9]}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                <TextBox style={styles.txtTable}>{language.HistoryHomeWorkScreen.Column3p3}</TextBox>
                            </LinearGradient>
                            <LinearGradient
                                style={[styles.viewRank, styles.paddingVertical2]}
                                colors={[Colors._AAF6DC, Colors._A0F5D9]}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                <TextBox style={styles.txtTable}>{language.HistoryHomeWorkScreen.Column3p4}</TextBox>
                            </LinearGradient>
                        </View>
                    </View>
                    <LinearGradient
                        style={styles.viewNumber}
                        colors={[Colors._AAF6DC, Colors._A0F5D9]}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <TextBox numberOfLines={null} style={styles.txtTable}>{language.HistoryHomeWorkScreen.Column4}</TextBox>
                    </LinearGradient>
                </View>
            </View>
        )
    }

    /**
     * Render data of statistic
     */
    const renderData = (item, index) => {
        return (
            <View style={[styles.rowTitle, styles.viewTable]} key={item.class_id + index}>
                <View style={styles.viewDate}>
                    <TextBox style={styles.txtValue} numberOfLines={1} >{moment(item.date_assign).format('DD/MM/YYYY')}</TextBox>
                </View>
                <View style={styles.row}>
                    <View style={styles.viewPoint}>
                        <View style={[styles.rowTitle, { justifyContent: 'space-between' }]}>
                            <View style={styles.viewRank}><TextBox style={styles.txtValue}>{parseInt((item.poor / item.total_user) * 100)}%</TextBox></View>
                        </View>
                    </View>
                    <View style={styles.viewPoint}>
                        <View style={[styles.rowTitle, { justifyContent: 'space-between' }]}>
                            <View style={styles.viewRank}><TextBox style={styles.txtValue}>{parseInt((item.average / item.total_user) * 100)}%</TextBox></View>
                        </View>
                    </View>
                    <View style={styles.viewPoint}>
                        <View style={[styles.rowTitle, { justifyContent: 'space-between' }]}>
                            <View style={styles.viewRank}><TextBox style={styles.txtValue}>{parseInt((item.good / item.total_user) * 100)}%</TextBox></View>
                        </View>
                    </View>
                    <View style={styles.viewPoint}>
                        <View style={[styles.rowTitle, { justifyContent: 'space-between' }]}>
                            <View style={styles.viewRank}><TextBox style={styles.txtValue}>{parseInt((item.excellent / item.total_user) * 100)}%</TextBox></View>
                        </View>
                    </View>
                </View>
                <View style={styles.viewNumber}>
                    <TextBox style={styles.txtValue}>{item.total_complete}/{item.total_user}</TextBox>
                </View>
            </View>
        )
    }

    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={language.HistoryHomeWorkScreen.Header}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                styleTitle={styles.headerText}

            />
            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                <View style={styles.body}>
                    <View style={styles.viewTopic}>
                        <TextBox numberOfLines={null} style={styles.txtTopic}>{lessonDt.skill == 'exam' ? lessonDt.exercise_name : lessonDt.exercise_topic}</TextBox>
                        <TextBox style={{ ...FontWeight.Regular }}>{lessonDt.exercise_name}</TextBox>
                    </View>
                </View>
                <ScrollView style={styles.flex1} bounces={true} showsVerticalScrollIndicator={false}>


                    {displayedData.map((item, index) => {
                        return (
                            <View key={item.class_id}>
                                {renderHeader(item, index)}
                                {item.lesson.map((i, idx) => {
                                    return renderData(i, idx)
                                })}
                            </View>
                        )
                    })}
                </ScrollView>
            </LinearGradient>
            <ShortMainButton
                type={1}
                style={styles.btnAssign}
                textStyles={styles.txtAssign}
                onPress={onAssign}
                text={DetailSkillJson.assign}
                widthType={'full'}
            />
            <FullScreenLoadingIndicator visible={loading} />
        </>
    )
}