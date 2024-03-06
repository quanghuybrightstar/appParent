import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Platform, ImageBackground } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { AppHeader } from '../../../componentBase/AppHeader';
import { TextBox } from '../../../componentBase/TextBox';
import * as action from '../../../ReduxStudent/actions/Student';
import moment, { lang } from 'moment'
import { MyButton } from '../../../componentBase/Button';
import { styles } from './TeacherProfile.style';
import APIBase from '../../../base/APIBase';
import API from '../../../API/APIConstant';
import { useState } from 'react';
import { ActionLogin } from '../../../redux/actions/ActionLogin';
import { RoundAvatar } from '../../../componentBase/RoundAvatar';
import stylesApp from '../../../styleApp/stylesApp';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import { FontWeight } from '../../../styleApp/font';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';

/**
 * Teacher Profile screen
 * @param {Object} props props from redux and navigation
 * @returns {Component}
 */
const TeacherProfile = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    let dispatch = useDispatch();
    // user profile information
    let [user, setUser] = useState(dataLogin)
    let [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getData()
    }, [dataLogin, props])


    /**
     * get teacher profile information
     */
    const getData = async () => {
        setLoading(true)
        let url = API.baseurl + API.editProfile + "?id=" + dataLogin.id
        try {
            let response = await APIBase.postDataJson('get', url)
            setLoading(false)
            if (!!response && !!response.data && !!response.data) {
                setUser(response.data.data)
                // dispatch(ActionLogin({ ...dataLogin, ...response.data.data }))
            }
            console.log("response", response);
        } catch (error) {
            setLoading(false)
            console.log("000000errr", error);
        }
    }

    /**
     * Information each row
     * @param {strin} icon url of icon
     * @param {string} value information
     * @returns {Component}
     */
    const renderInfo = (icon, value) => (
        <View style={styles.viewInfo}>
            <Image source={{ uri: icon }} style={styles.icon} resizeMode="contain" />
            <TextBox numberOfLines={null} textBreakStrategy="simple" text={value} style={styles.textInfo} />
        </View>
    )
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: 'bg_gradient' }} resizeMode='cover' resizeMethod='scale' style={styles.container}>
                <AppHeader title={language.ProfileTeacherScreen.Header} leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                    rightComponent={() => (
                        <TouchableOpacity onPress={() => props.navigation.navigate("EditProfileTeacher", {user: user})}>
                            <Image
                                source={{ uri: 'hv_edit_profile' }}
                                 style={styles.rightHeader}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )}
                />
                {/* { !isLoading ?  */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image source={{ uri: 'profile_earth' }} style={styles.bannerImg} />
                    <View>
                        <View style={[stylesApp.shadow, styles.profileBox]}>
                            <View style={styles.nameBox}>
                                {/* <Image source={{ uri: user.avatar || "" }} style={[styles.avatar, styles.boxShadow]} resizeMode="contain" /> */}
                                <View style={[stylesApp.shadow]}>
                                    <RoundAvatar avatar={user.avatar || ""} isTeacher={true} width={SmartScreenBase.smPercenWidth * 35} height={SmartScreenBase.smPercenWidth * 35} style={[styles.avatar]} />
                                </View>
                                <TextBox numberOfLines={null} text={user.fullname} style={styles.nameText} />
                            </View>
                            {renderInfo('gender', user.gender === "female" ? language.EditProfileTeacherScreen.Female : language.EditProfileTeacherScreen.Male)}
                            {renderInfo('birthday', !!user.birthday ? moment(user.birthday).format('DD / MM / YYYY') : "")}
                            {renderInfo('phone', user.phone || "")}
                            {renderInfo('email', user.email || "")}
                            {/* {renderInfo('school_icon_profile', user.school || "")} */}
                            {dataLogin.role != 'parent' && 
                            <View style={[styles.viewSchool]}>
                                <Image source={{ uri: "school_icon_profile" }} style={styles.iconSchool} resizeMode="contain" />
                                <TextBox numberOfLines={2} text={user.school || user.province} style={styles.textInfo} />
                            </View>
                            }
                            <View style={styles.viewAccount}>
                                <View style={styles.row}>
                                    <TextBox text={`${language.ProfileTeacherScreen.Account}:`} style={FontWeight.Regular} />
                                    <TextBox text="Free" style={styles.accountStatusText} />
                                </View>
                                <View style={styles.viewBtnUpdate}>
                                    {dataLogin.role != 'parent' && (
                                        <>
                                        {/* <ShortMainButton text="Nâng cấp"
                                        widthType={'mini'}
                                        textStyles={styles.textDevices}
                                        type={1} textStyles={styles.btnUpdateText}
                                        style={styles.btnUpdate} onPress={() => {
                                            // props.navigation.navigate('LisenceScreen');
                                        }} /> */}
                                        </>
                                    )}
                                </View>
                            </View>
                        </View>
                        {/* <View style={styles.statisticContainer}>
                            <View style={styles.sideStatistic}>
                                <TextBox text={`${user.class_number || 0}`} style={styles.numberStatistic} />
                                <TextBox text={language.ProfileTeacherScreen.BottomText1} style={styles.titleStatistic} />
                            </View>
                            <View style={styles.middleStatistic}>
                                <TextBox text={`${user.student_number || 0}`} style={styles.numberStatistic} />
                                <TextBox text={language.ProfileTeacherScreen.BottomText2} style={styles.titleStatistic} />
                            </View>
                            <View style={styles.sideStatistic}>
                                <TextBox text={`${user.curriculum_number || 0}`} style={styles.numberStatistic} />
                                <TextBox text={language.ProfileTeacherScreen.BottomText3} style={styles.titleStatistic} />
                            </View>
                        </View> */}
                    </View>
                </ScrollView>
                  {/* : <FullScreenLoadingIndicator visible={isLoading}/>
                 } */}
            </ImageBackground>
        </View>
    )
}


const mapStateToProps = state => ({
});
export default connect(mapStateToProps, action)(TeacherProfile);
