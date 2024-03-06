import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { TextBox } from '../../../../componentBase/TextBox';
import { DetailSkillJson } from '../../../../stringJSON';
import { FontSize } from '../../../../styleApp/font';
import { AssignItemMethod } from './ChooseClassTCScreen.logic';
import { styles } from './ChooseClassTCScreen.style';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { Colors } from '../../../../styleApp/color';
import stylesApp from '../../../../styleApp/stylesApp';
import Loading from '../../../../component/LoadingScreen'
/**
 * ChooseClassTCScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const ChooseClassTCScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    let { loading, dataClass, baseurl, firstLoading } = AssignItemMethod(props)
    let [flow] = useState(props.navigation.getParam('flow') ?? '')
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('SettingAssignmentsScreen', { class: item, dataLesson: props.navigation.getParam('dataLesson'), flow: flow })} style={styles.viewItem}>
                <Image style={styles.imageItem} source={{ uri: baseurl + item.class_avatar }} />
                <View style={styles.viewContent}>
                    <TextBox numberOfLines={2} style={styles.txtNameClass} textBreakStrategy='simple'>{item?.class_name?.length > 45 ? `${item.class_name.substring(0, 45)}...` : item?.class_name}</TextBox>
                    <TextBox numberOfLines={2} style={styles.txtNameSchool} textBreakStrategy='simple'>{item.organization_name} </TextBox>
                    <TextBox numberOfLines={2} style={styles.txtNameSchool} textBreakStrategy='simple'>{moment(item.start_time).format('DD/MM/YYYY')} - {moment(item.end_time).format('DD/MM/YYYY')}</TextBox>
                </View >
            </TouchableOpacity >
        )

    }

    // if (firstLoading) {
    //     return (
    //         <ImageBackground
    //             source={{ uri: 'imagebackground' }}
    //             imageStyle={stylesApp.ImageBackGround}
    //             style={styles.loading}>
    //             <Loading />
    //         </ImageBackground>
    //     )
    // }

    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={language.ChooseClassTCScreen.Header}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                styleTitle={{ fontSize: FontSize.size60Font }}

            />
            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                <View style={styles.body}>
                    <TextBox style={styles.txtChooseClass}>{language.ChooseClassTCScreen.TittleList}</TextBox>
                    <View style={styles.flex1}>
                        <FlatList
                            indicatorStyle={'black'}
                            data={dataClass.filter(i => i.count_student != 0)}
                            renderItem={renderItem}
                            keyExtractor={(index, item) => item.id}
                            contentContainerStyle={styles.flatlist}
                        />
                    </View>
                </View>
            </LinearGradient>
            <FullScreenLoadingIndicator
                visible={loading}
            />
        </>
    )
}