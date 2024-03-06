import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Alert, ImageBackground, TextInput } from 'react-native';
import { connect } from 'react-redux';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { AppHeader } from '../../../componentBase/AppHeader';
import { TextBox } from '../../../componentBase/TextBox';
import * as action from '../../../ReduxStudent/actions/Student';
import { CommonJson, ProfileJson } from '../../../stringJSON';
import { Colors } from '../../../styleApp/color';
import { FontSize, FontWeight } from '../../../styleApp/font';
import moment from 'moment';
import { MyButton } from '../../../componentBase/Button';
import styleApp from '../../../styleApp/stylesApp';
import { AppTextInput } from '../../../componentBase/AppTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SelectDateModal } from '../../../componentBase/SelectDateModal';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import API from '../../../API/APIConstant';
import MyData from '../../../component/MyData';
import Axios from 'axios';
import { SelectImageModal } from '../../../componentBase/SelectImageModal';
import { editProfileMethod } from './logic';
import { styles } from './NewEditProfile.style';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import stylesApp from '../../../styleApp/stylesApp';
import dateTimeHelper from '../../../utils/dateTimeHelper';
import { ChooseValueModal } from '../../../componentBase/ChooseValueModal/ChooseValueModal';

/**
 * Edit Profile Screen
 * @param {object} props
 * @returns Component
 */
const NewEditProfileScreen = (props) => {

    let {
        avatar,
        classes,
        dob,
        editProfile,
        email,
        imagePickerVisible,
        isMale,
        loadingIndicator,
        modalVisible,
        name,
        phone,
        school,
        setAvatar,
        setClasses,
        setGrade,
        setDob,
        setEmail,
        setGender,
        setIndicator,
        setModalVisible,
        setGradeVisible,
        gradeVisible,
        setName,
        setPhone,
        setPickerVisible,
        setSchool, checkDisable,
        setErrorPhoneText, errorPhoneText,
        changePhone, changeAvatar
    } = editProfileMethod(props);
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: 'bg_gradient' }} resizeMode="cover" resizeMethod="scale" style={styles.container}>
                <AppHeader title={ProfileJson.EditProfile} leftIconOnPress={() => {
                    props.navigation.navigate('NewProfileScreen', {isReLoad: avatar});
                }}
                rightComponent={() => (
                    <TouchableOpacity style={[styles.rightHeaderComponent,{backgroundColor: checkDisable() ? Colors.Gray : Colors.White}]} disabled={checkDisable()} onPress={editProfile}>
                        <TextBox style={[styles.createPlanText, {color: checkDisable() ? Colors.White : Colors.BaseGreen}]}>{CommonJson.Save}</TextBox>
                    </TouchableOpacity>
                )}
                />
                <KeyboardAwareScrollView style={styles.insideContainer} bounces={false}>
                    <Image source={{ uri: 'profile_earth' }} style={styles.bannerImg} />
                    <View style={styles.nameBox}>
                        <View style={styles.shadow}>
                            <TouchableOpacity style={[styles.btnAvatar, styles.shadow]} onPress={() => setPickerVisible(true)}>
                                <Image
                                    source={avatar}
                                    style={styles.avatar} resizeMode="cover" />
                                <View style={styles.viewIconCamera}>
                                    <Image source={{ uri: 'camera' }} style={styles.iconCamera} resizeMode="contain" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <AppTextInput
                            titleStyle={styles.titleStyle}
                            style={styles.textInput}
                            title={ProfileJson.Name+"*"}
                            value={name}
                            placeholder={ProfileJson.Name}
                            onChangeText={setName}
                            autoCapitalize={'words'}
                        />
                        <View style={styles.viewDate}>
                            <TextBox
                                style={[styles.txtOption, styles.titleStyle]}
                            >
                                {ProfileJson.Gender}
                            </TextBox>
                            <View style={styles.row}>
                                <View style={styles.viewGender}>
                                    <TouchableOpacity onPress={() => setGender(true)}
                                        style={[styles.shadow, isMale ? styles.activeGenderContainer : styles.genderContainer]}>
                                        <Image source={{ uri: 'male_icon' }} style={[styles.genderIcon, isMale ? styles.activeGenderIcon : {}]} resizeMode="contain" />
                                    </TouchableOpacity>
                                    <TextBox style={styles.genderText} >
                                        {CommonJson.Male}
                                    </TextBox>
                                </View>
                                <View style={styles.viewGender}>
                                    <TouchableOpacity onPress={() => setGender(false)}
                                        style={[styles.shadow, !isMale ? styles.activeGenderContainer : styles.genderContainer]}>
                                        <Image source={{ uri: 'female_icon' }} style={[styles.genderIcon, !isMale ? styles.activeGenderFemaleIcon : {}]} resizeMode="contain" />
                                    </TouchableOpacity>
                                    <TextBox style={styles.genderText} >
                                        {CommonJson.Female}
                                    </TextBox>
                                </View>
                            </View>
                        </View>
                        <View style={styles.viewDate}>
                            <TextBox
                                style={[styles.txtOption, styles.titleStyle]}
                            >
                                {ProfileJson.Date+"*"}
                            </TextBox>
                            <View >
                                <TextInput
                                    value={moment(dob).format('DD/MM/YYYY')}
                                    onChangeText={() => { }}
                                    editable={false}
                                    containerStyle={styles.fullWidth}
                                    style={[styles.dateInput, styles.textInput]}
                                />

                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles.dateButton}
                                    onPress={() => {
                                        setModalVisible(true);
                                    }} />
                            </View>
                        </View>

                        <AppTextInput
                            titleStyle={styles.titleStyle}
                            style={styles.textInput}
                            title={ProfileJson.Phone+"*"}
                            value={phone}
                            textError={errorPhoneText}
                            keyboardType="number-pad"
                            maxLength={11}
                            placeholder={ProfileJson.Phone}
                            onChangeText={changePhone}
                            onEndEditing={()=>{
                                if(phone.trim().length < 10){
                                    setErrorPhoneText("Số điện thoại hợp lệ gồm 10-11 số")
                                }
                            }}
                        />
                        
                        <AppTextInput
                            titleStyle={styles.titleStyle}
                            editable={false}
                            style={styles.textInput}
                            title={ProfileJson.Email}
                            value={email}
                            placeholder={ProfileJson.Email}
                            onChangeText={setEmail}
                        />
                        <View style={styles.viewDate}>
                            <AppTextInput
                                editable={false}
                                titleStyle={styles.titleStyle}
                                style={styles.textInput}
                                title={ProfileJson.Class+"*"}
                                keyboardType="number-pad"
                                maxLength={7}
                                value={classes}
                                placeholder={ProfileJson.Class}
                                onChangeText={(str)=>{
                                    if(str == 'Khối ' || str == 'Khối 6' || str == 'Khối 7' || str == 'Khối 8' || str == 'Khối 9')
                                    setClasses(str)
                                }}
                            />
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.dateButton}
                                onPress={() => {
                                    setGradeVisible(true);
                            }} />
                        </View>
                        <AppTextInput
                            titleStyle={styles.titleStyle}
                            style={styles.textInput}
                            title={ProfileJson.School}
                            value={school}
                            placeholder={ProfileJson.School}
                            onChangeText={setSchool}
                        />
                    </View>
                    {/* <View style={styles.viewBtnSave}>
                        <ShortMainButton
                            // isDisabled={}
                            onPress={editProfile}
                            text={CommonJson.Save}
                            type={1}
                            style={styles.btnSave}
                            isDisabled={checkDisable()}
                        />
                    </View> */}
                </KeyboardAwareScrollView>
                <ChooseValueModal choose={(mIndex)=>{
                        setGradeVisible(false); 
                        setGrade(mIndex);
                        setClasses("Khối "+ mIndex)
                    }} 
                    visible={gradeVisible}/>
                <SelectDateModal rangeDate={dob} isVisible={modalVisible} maximunDate={moment(new Date()).format('MM/DD/YYYY')}
                    onSave={(date) => {
                            console.log('----date', date);
                            setDob(date);
                    }}
                    requestClose={() => {
                        setModalVisible(false);
                    }} />
                <FullScreenLoadingIndicator
                    visible={loadingIndicator}
                />
                <SelectImageModal visible={imagePickerVisible}
                    onDone={changeAvatar}
                    onCancel={() => {
                        setPickerVisible(false);
                    }} />
            </ImageBackground>
        </View >
    );
};


const mapStateToProps = state => ({
    user: state.LoadAPIProfileHV.Data?.data || state.AuthStackReducer.dataLogin,
    storeRedux: state.AuthStackReducer.dataLogin,
});
export default connect(mapStateToProps, action)(NewEditProfileScreen);
