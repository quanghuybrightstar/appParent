import React, { useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, TextBase, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { TextBox } from '../../../../componentBase/TextBox';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import { ModalUpdate } from './ModalUpdate';
import { WorkScheduleMethod } from './WorkSchedule.logic';
import { styles } from './WorkSchedule.style';

/**
 * Working Statistic by Year
 * @param {object} props Props from redux and navigation
 * @returns {Component}
 */
export const WorkSchedule = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    let { year, nextYear, preYear, dataSchedule, loading, getData } = WorkScheduleMethod(props)
    const [visible, setVisible] = useState(false)
    const [idMonth, setIdMonth] = useState()
    const [content, setContent] = useState('')
    const [month, setMonth] = useState()
    const flatlistRef = useRef();

    /**
     * Render working statistic by month in the year
     * @param {Object} props Flatlist params
     * @returns {Component}
     */
    const _renderItem = ({ item, index }) => {
        return (
            <View style={[styles.row, { marginBottom: 5 }]}>
                <View style={styles.viewMonth}>
                    <TextBox style={styles.txtMonth}>{item[0]}</TextBox>
                </View>
                <View style={styles.viewContent}>
                    <TextBox style={{ alignSelf: 'flex-start', ...FontWeight.LightItalic }} numberOfLines={null}>{!!item[1] ? item[1].content : ''}</TextBox>
                    <TouchableOpacity onPress={() => {
                        setVisible(true)
                        setIdMonth(!!item[1] ? item[1].id : '')
                        setContent(!!item[1] ? item[1].content : '')
                        setMonth(item[0])

                    }} style={styles.btnUpdate}>
                        <TextBox style={styles.txtUpdate}>{language.YearCalendarScreen.LinkBt}</TextBox>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={language.YearCalendarScreen.header}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                styleTitle={{ fontSize: FontSize.size60Font }}
            />
            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>

                <LinearGradient
                    style={styles.viewYear}
                    colors={[Colors.LightGreen, Colors._00C3B1, Colors.BaseGreen,]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <TouchableOpacity onPress={() => {
                        preYear()
                        flatlistRef?.current?.scrollToOffset(0, true);
                    }}>
                        <Image source={{ uri: 'iconleft' }} style={styles.iconControl} />
                    </TouchableOpacity>
                    <TextBox style={styles.txtYear}>{year}</TextBox>
                    <TouchableOpacity onPress={() => {
                        nextYear()
                        flatlistRef?.current?.scrollToOffset(0, true);
                    }}>
                        <Image source={{ uri: 'iconright' }} style={styles.iconControl} />
                    </TouchableOpacity>

                </LinearGradient>

                <LinearGradient
                    style={styles.body}
                    colors={[Colors._A0F5DA, Colors._AEE9E7]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <View style={[styles.row, styles.viewHeader]}>
                        <View style={[styles.viewMonth, styles.backgroundColor]}>
                            <TextBox style={[styles.txtMonth, { color: Colors.White }]}>{language.YearCalendarScreen.TittleTable1}</TextBox>
                        </View>
                        <View style={[styles.viewContent, styles.backgroundColor]}>
                            <TextBox style={[styles.txtMonth, { color: Colors.White }]} >{language.YearCalendarScreen.TittleTable2}</TextBox>
                        </View>
                    </View>
                    <FlatList
                        bounces={false}
                        ref={flatlistRef}
                        indicatorStyle={'black'}
                        data={dataSchedule}
                        renderItem={_renderItem}
                        keyExtractor={index => index.toString()}
                        contentContainerStyle={styles.flatlist}
                    />
                </LinearGradient>
            </LinearGradient>
            <ModalUpdate visible={visible}
                hideModal={() => setVisible(false)}
                id={idMonth}
                content={content}
                month={month}
                year={year}
                reloadData={getData}
            />
            <FullScreenLoadingIndicator visible={loading} />
        </>
    )
}
