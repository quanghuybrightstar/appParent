import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Platform, ImageBackground } from 'react-native'
import { connect } from 'react-redux';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { AppHeader } from '../../../componentBase/AppHeader';
import { TextBox } from '../../../componentBase/TextBox';
import * as action from '../../../ReduxStudent/actions/Student';
import { ProfileJson } from '../../../stringJSON';
import { Colors } from '../../../styleApp/color';
import { FontSize, FontWeight } from '../../../styleApp/font';
import moment from 'moment'
import { MyButton } from '../../../componentBase/Button';
import { styles } from './NewProfile.style';
import { RoundAvatar } from '../../../componentBase/RoundAvatar'
import API from '../../../API/APIConstant';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import APIBase from '../../../base/APIBase';
import MyData from '../../../component/MyData';
import LoadingScreen from "../../LoadingScreen";

/**
 * Profile Screen
 * @param {object} props props from redux and navigation
 * @returns Component
 */
const NewProfileScreen = (props) => {

    const reload = props.navigation.getParam('isReLoad')
    const [dataPro, setDataPro] = useState()
    const [dataParent, setdataParent] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProfilehv();
    }, [])

    useEffect(() => {
        console.log("=====reload",reload)
        if(reload){
            console.log("=====reload1",reload)
            getProfilehv();
            console.log("=====reload2",reload)
        }
    }, [reload])

    const getProfilehv = async () => {
        var url = API.baseurl + API.api_profile + MyData.TokenUser.id
        setLoading(true)
        var res = await APIBase.postDataJson('get', url)
        console.log("=====getProfilehv",res.data)
        setLoading(false)
        if(res.data.status){
            setDataPro(res.data.user)
            if(res.data.parent_info?.parent_fullname)
                setdataParent(res.data.parent_info)
        }else{

        }
    }

    const getGender = (text) => {
        return text === "female" ? ProfileJson.Female : ProfileJson.Male
    }

    const getDate = (text) => {
        return !!text ? moment(text).format('DD / MM / YYYY') : ""
    }

    const getPhone = (text) => {
        return text === "female" ? ProfileJson.Female : ProfileJson.Male
    }

    const getEmail = (text) => {
        return text === "female" ? ProfileJson.Female : ProfileJson.Male
    }

    const getClass_icon = (text) => {
        return text === "female" ? ProfileJson.Female : ProfileJson.Male
    }

    // let userInfo = props.userLinking
    let parents = props.user?.list_parent || []
    /**
     * User Info component
     * @param {string} icon url of icon
     * @param {string} value displayed text
     * @param {number} numberOfLines 
     * @returns Component
     */



    const renderInfo = (icon, value, numberOfLines = 1) => (
        <View style={[styles.viewInfo]}>
            <Image source={{ uri: icon }} style={styles.icon} resizeMode="contain" />
            <TextBox numberOfLines={null} textBreakStrategy="simple" text={value} style={styles.textInfo} />
        </View>
    )
    let isLinked = parents.length > 0
    //console.log(props)
    let parent_info = parents[0]
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: 'bg_gradient' }} resizeMode='cover' resizeMethod='scale' style={styles.container}>
                <AppHeader title={ProfileJson.Title} leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                    rightComponent={() => (
                        <TouchableOpacity onPress={() => props.navigation.navigate("NewEditProfileScreen", {dataPro: dataPro})}>
                            <Image
                                source={{ uri: 'hv_edit_profile' }}
                                style={styles.rightHeader}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                    )}
                />
                {loading ? <LoadingScreen/>
                :
                <ScrollView showsVerticalScrollIndicator={false} bounces={false} >
                    <Image source={{ uri: 'profile_earth' }} style={styles.bannerImg} />
                    <View>
                        <View style={styles.profileBox}>
                            <View style={styles.nameBox}>
                                {/* <Image source={{ uri: props.user.avatar || "" }} style={[styles.avatar, styles.boxShadow]} resizeMode="contain" /> */}
                                <View style={styles.boxShadow}>
                                    <RoundAvatar avatar={API.domain + dataPro?.avatar || props.user.avatar || ""} width={SmartScreenBase.smPercenWidth * 30} height={SmartScreenBase.smPercenWidth * 30} style={[styles.avatar, styles.boxShadow]} />
                                </View>
                                <TextBox numberOfLines={null} text={dataPro?.fullname || props.user.fullname} style={styles.nameText} />
                                <TextBox numberOfLines={null} text={dataPro?.username  || props.user.user_code} style={styles.userCode} />
                            </View>
                            {renderInfo('gender', getGender(dataPro?.gender  || props.user.gender))}
                            {renderInfo('birthday', getDate(dataPro?.birthday || props.user.birthday))}
                            {renderInfo('phone', dataPro?.phone  || props.user.phone || "")}
                            {renderInfo('email', dataPro?.email  || props.user.email || "")}
                            {renderInfo('class_icon', dataPro?.grade_name  || props.user.grade_name || "")}
                            <View style={[styles.viewSchool]}>
                                <Image source={{ uri: "school" }} style={styles.iconSchool} resizeMode="contain" />
                                <TextBox numberOfLines={null} textBreakStrategy="simple" text={dataPro?.school  || props.user.school} style={styles.textInfo} />
                            </View>
                            <View style={styles.viewAccount}>
                                <View style={styles.row}>
                                    <TextBox text={`${ProfileJson.Account}:`} />
                                    <TextBox text="Free" style={styles.accountStatusText} />
                                </View>
                                <View style={styles.viewBtnUpdate}>
                                    <ShortMainButton text="Nâng cấp" type={1} style={styles.btnUpdate} textStyles={styles.btnUpdateText} onPress={() => {
                                        props.navigation.navigate('UpgradeAccount');
                                    }} />
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={styles.footer}>
                                <TouchableOpacity onPress={() => {
                                    props.navigation.navigate('UpgradeAccount');
                                    console.log("=====UpgradeAccount")
                                }}>
                                    <TextBox text={ProfileJson.Parent} style={styles.parentText} />
                                </TouchableOpacity>
                                {!dataParent && <TouchableOpacity style={styles.btnAdd} onPress={() => {
                                    props.navigation.navigate('ParentLinkingScreen')
                                }}>
                                    <Image source={{ uri: 'plusbtn' }} style={styles.imgAdd} resizeMode="contain" />
                                    <TextBox text={ProfileJson.AddLinking} style={styles.txtAdd} />
                                </TouchableOpacity>}
                            </View>
                            {dataParent && <View style={styles.viewParent}>
                                {/* <Image source={{ uri: parent_info.avatar }} style={[styles.avatar, styles.boxShadow, styles.imgParent]} /> */}
                                <View style={[styles.boxShadow, styles.androidSmallShadow]}>
                                    <RoundAvatar avatar={API.image_base_url + dataParent.parent_avatar} width={SmartScreenBase.smPercenWidth * 15} height={SmartScreenBase.smPercenWidth * 15} style={{ ...styles.boxShadow, ...styles.avatar, }} />
                                </View>
                                <View style={styles.viewInfoParent}>
                                    <TextBox text={dataParent.parent_fullname} style={styles.nameParent} />
                                    {!!dataParent.date_connected && <TextBox text={`Đã liên kết từ ${moment(parent_info.time_connect).format('DD-MM-YYYY')}`} style={styles.lingkingText} />}
                                </View>
                            </View>}
                        </View>
                    </View>
                </ScrollView>
                }
            </ImageBackground>
        </View>
    )
}


const mapStateToProps = state => ({
    data: state.LoadAPIProfileHV,
    user: state.LoadAPIProfileHV.Data?.data || state.AuthStackReducer.dataLogin,
    storeRedux: state.AuthStackReducer.dataLogin
});
export default connect(mapStateToProps, action)(NewProfileScreen);
