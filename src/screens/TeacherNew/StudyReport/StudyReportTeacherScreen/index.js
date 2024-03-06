
import * as React from 'react'
import { useCallback } from 'react'
import { FlatList, Image, ImageBackground, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import API from '../../../../API/APIConstant'
import APIBase from '../../../../base/APIBase'
import SmartScreenBase from '../../../../base/SmartScreenBase'
import { AppHeader } from '../../../../componentBase/AppHeader'
import { ShortMainButton } from '../../../../componentBase/ShortMainButton'
import { TextBox } from '../../../../componentBase/TextBox'
import { FontSize, FontWeight } from '../../../../styleApp/font'
import stylesApp from '../../../../styleApp/stylesApp'
import { styles } from './StudyReportTeacherScreen.styles'
import moment from "moment";
import { useMethod } from './StudyReportTeacherScreen.logic'
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view'
import { Colors } from '../../../../styleApp/color'
import { ChartReport } from './ChartReport'
import { StudentList } from './StudentList'

/**
 * StudyReportTeacher Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const StudyReportTeacherScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    const [classItem] = useState(props.navigation.state.params.dataClass)
    let {
        currDay,
        firstDay,
        lastDay,
        nextWeek,
        preWeek,
        isDisableNext
    } = useMethod(props)
    const [index, setIndex] = useState(0);
    const TAB = [
        { key: 'first', title: language.StudyReportTeacherScreen.TittleTab1 },
        { key: 'second', title: language.StudyReportTeacherScreen.TittleTab2 },
    ];

    /**
     * Scene render
     * @param {object} props Tabbar props
     * @property {object} route route props include each route data
     * @returns {Component}
     */
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <ChartReport {...props} firstDay={firstDay} lastDay={lastDay} />;
            case 'second':
                return <StudentList {...props} curDay={currDay}/>;
            default:
                return null;
        }
    };

    /**
     * render tabbar of the screen
     */
    const renderTabbar = useCallback((props) => {
        return (
            <TabBar
                {...props}
                style={styles.tabBarContainer}
                renderTabBarItem={(props) => {
                    let bold = props.key === TAB[index].key ? FontWeight.Bold : FontWeight.Light
                    return (
                        <TabBarItem
                            {...props}
                            labelStyle={{
                                ...bold,
                                ...styles.tabbar
                            }}
                        />
                    )
                }}
                indicatorStyle={styles.tabBar}
                activeColor={Colors.BaseGreen}
                inactiveColor={Colors.Gray}
            />
        )
    }, [index])
    return (
        <View style={styles.container}>
            <AppHeader
                title={`${language.StudyReportTeacherScreen.Header} ${!!classItem ? classItem.class_name : ''}`}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
            />
            <LinearGradient
                style={styles.viewYear}
                colors={[Colors.LightGreen, Colors._00C3B1, Colors.BaseGreen,]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <TouchableOpacity onPress={preWeek}>
                    <Image source={{ uri: 'iconleft' }} style={styles.iconControl} />
                </TouchableOpacity>
                <TextBox style={styles.txtYear}>{`${firstDay} >> ${lastDay}`}</TextBox>
                <TouchableOpacity disabled={isDisableNext} onPress={nextWeek}>
                    <Image source={{ uri: 'iconright' }} style={[styles.iconControl, {opacity: isDisableNext ? 0 : 1}]} />
                </TouchableOpacity>
            </LinearGradient>
            <TabView
                navigationState={{ index, routes: TAB }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabbar}
            />


        </View>
    )
}