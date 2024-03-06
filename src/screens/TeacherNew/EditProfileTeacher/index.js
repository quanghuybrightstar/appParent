import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View, Image, ImageBackground, TextInput, Platform, Text } from 'react-native';
import { connect, useSelector } from 'react-redux';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { AppHeader } from '../../../componentBase/AppHeader';
import { TextBox } from '../../../componentBase/TextBox';
import * as action from '../../../ReduxStudent/actions/Student';
import moment from 'moment';
import { MyButton } from '../../../componentBase/Button';
import { AppTextInput } from '../../../componentBase/AppTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SelectDateModal } from '../../../componentBase/SelectDateModal';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import { SelectImageModal } from '../../../componentBase/SelectImageModal';
import { editProfileMethod } from './logic';
import { styles } from './EditProfileTeacher.style';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import stylesApp from '../../../styleApp/stylesApp';
import { CommonJson } from '../../../stringJSON';
import FontBase from '../../../base/FontBase';
import { Colors } from '../../../styleApp/color';
import { RoundAvatar } from '../../../componentBase/RoundAvatar';

/**
 * EditProfileTeacher Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
const EditProfileTeacher = (props) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const language = useSelector(state => state.LanguageStackReducer.language);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    let {
        checkDisable,
        avatar,
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
        setDob,
        setEmail,
        setGender,
        setModalVisible,
        setName,
        setPhone,
        setPickerVisible,
        setSchool,
        setErrorPhoneText, errorPhoneText,
    } = editProfileMethod(props);

    const onBlurNameInput = useCallback(()=> {setName((_name) => _name.trim());}, [setName]);

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: 'bg_gradient' }} resizeMode="cover" resizeMethod="scale" style={styles.container}>
                <AppHeader title={language.EditProfileTeacherScreen.Header} leftIconOnPress={() => {
                    props.navigation.pop();
                }}

                rightComponent={() => {
                    return <TouchableOpacity
                        disabled={checkDisable()}
                        onPress={editProfile}
                        style={{paddingHorizontal: SmartScreenBase.smPercenWidth * 7,paddingVertical: SmartScreenBase.smPercenWidth * 1.5, borderRadius: 9999, backgroundColor: checkDisable() ? Colors.Gray : Colors.White}}>
                        <Text style={{fontFamily: FontBase.MyriadPro_Bold, color:  checkDisable() ? '#fff' : '#02dda3', fontSize: SmartScreenBase.smFontSize * 40}}>{CommonJson.Save}</Text>
                    </TouchableOpacity>;
                }}
                />
                <KeyboardAwareScrollView style={styles.keyboard}>
                    <Image source={{ uri: 'profile_earth' }} style={styles.bannerImg} />
                    <View style={styles.nameBox}>
                        <View style={stylesApp.shadow}>
                            <TouchableOpacity style={[styles.btnAvatar]} onPress={() => setPickerVisible(true)}>
                            <RoundAvatar avatar={avatar.uri || ""} isTeacher={true} width={SmartScreenBase.smPercenWidth * 35} height={SmartScreenBase.smPercenWidth * 35} style={[styles.avatar]} />
                                {/* <Image
                                    source={avatar}
                                    style={styles.avatar} resizeMode="cover" /> */}
                                <View style={styles.viewIconCamera}>
                                    <Image source={{ uri: 'camera' }} style={styles.iconCamera} resizeMode="contain" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <AppTextInput
                            style={styles.textInput}
                            title={language.EditProfileTeacherScreen.NameTittle+"*"}
                            value={name}
                            placeholder={language.EditProfileTeacherScreen.NameTittle}
                            onChangeText={setName}
                            onBlur={onBlurNameInput}
                            titleStyle={styles.ipName}
                            autoCapitalize={'words'}
                        />
                        <View style={[styles.viewDate, styles.marginBottom0]}>
                            <TextBox
                                style={styles.txtOption}
                            >
                                {language.EditProfileTeacherScreen.GenderTittle}
                            </TextBox>
                            <View style={styles.row}>
                                <View style={styles.viewGender}>
                                    <TouchableOpacity onPress={() => setGender(true)}
                                        style={[styles.shadow, isMale ? styles.activeGenderContainer : styles.genderContainer]}>
                                        <Image source={{ uri: 'male_icon' }} style={[styles.genderIcon, isMale ? styles.activeGenderIcon : {}]} resizeMode="contain" />
                                    </TouchableOpacity>
                                    <TextBox style={styles.genderText} >
                                        {language.EditProfileTeacherScreen.Male}
                                    </TextBox>
                                </View>
                                <View style={styles.viewGender}>
                                    <TouchableOpacity onPress={() => setGender(false)}
                                        style={[styles.shadow, !isMale ? styles.activeGenderContainer : styles.genderContainer]}>
                                        <Image source={{ uri: 'female_icon' }} style={[styles.genderIcon, !isMale ? styles.activeGenderFemaleIcon : {}]} resizeMode="contain" />
                                    </TouchableOpacity>
                                    <TextBox style={styles.genderText} >
                                        {language.EditProfileTeacherScreen.Female}
                                    </TextBox>
                                </View>
                            </View>
                        </View>
                        {/* <View style={styles.viewDate}>
                            <TextBox
                                style={styles.txtOption}
                            >
                                {language.EditProfileTeacherScreen.BirthDayTittle}
                            </TextBox>
                            <TouchableOpacity style={[styles.shadow, styles.dob]} onPress={() => {
                                setModalVisible(true)
                            }}>
                                <TextBox style={styles.ipDate} >
                                    {moment(dob).format("DD/MM/YYYY")}
                                </TextBox>
                            </TouchableOpacity>
                        </View> */}
                        <View style={styles.viewDate}>
                            <TextBox
                                style={styles.txtOption}
                            >
                                {language.EditProfileTeacherScreen.BirthDayTittle+"*"}
                            </TextBox>
                            <View>
                                <TextInput
                                    value={moment(dob).format('DD/MM/YYYY')}
                                    onChangeText={() => { }}
                                    editable={false}
                                    containerStyle={styles.width100}
                                    style={[styles.dob, styles.textInput]}
                                />
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles.btnIPDate}
                                    onPress={() => {
                                        setModalVisible(true);
                                    }} />
                            </View>
                        </View>
                        <AppTextInput
                            titleStyle={styles.titleStyle}
                            style={styles.textInput}
                            title={language.EditProfileTeacherScreen.PhoneTittle+"*"}
                            value={phone}
                            keyboardType="number-pad"
                            textError={errorPhoneText}
                            maxLength={11}
                            placeholder={language.EditProfileTeacherScreen.PhoneTittle}
                            onChangeText={setPhone}
                            titleStyle={styles.marginBottom5}
                            onEndEditing={()=>{
                                if(phone.trim().length < 10){
                                    setErrorPhoneText("Số điện thoại hợp lệ gồm 10-11 số")
                                }else{
                                    setErrorPhoneText("")
                                }
                            }}
                        />
                        <AppTextInput
                            style={styles.textInput}
                            editable={false}
                            title={language.EditProfileTeacherScreen.EmailTittle}
                            value={email}
                            placeholder={language.EditProfileTeacherScreen.EmailTittle}
                            onChangeText={setEmail}
                            titleStyle={styles.marginBottom5}
                        />
                        {/* <AppTextInput
                        title={ProfileJson.Class}
                        value={classes}
                        placeholder={ProfileJson.Class}
                        onChangeText={setClasses}
                    /> */}
                    
                    {dataLogin.role != 'parent' && (
                        <AppTextInput
                            style={styles.textInput}
                            title={language.EditProfileTeacherScreen.WorkAddressTittle}
                            value={school}
                            placeholder={language.EditProfileTeacherScreen.WorkAddressTittle}
                            onChangeText={setSchool}
                            titleStyle={styles.marginBottom5}

                        />
                    )}
                    </View>
                    <View style={styles.viewbtn}>
                        {/* <ShortMainButton
                            text={language.EditProfileTeacherScreen.SaveBt}
                            onPress={editProfile}
                            type={1}
                            isDisabled={disabled}
                            widthType={'full'}
                        /> */}
                    </View>
                </KeyboardAwareScrollView>
                <SelectDateModal rangeDate={dob} isVisible={modalVisible} maximunDate={new Date()}
                    onSave={(date) => {
                        if (date) {
                            console.log('----date', date);
                            setDob(date);
                        }
                    }}
                    requestClose={() => {
                        setModalVisible(false);
                    }} />
                <FullScreenLoadingIndicator
                    visible={loadingIndicator}
                />
                <SelectImageModal visible={imagePickerVisible}
                    onDone={setAvatar}
                    onCancel={() => {
                        setPickerVisible(false);
                    }} />
            </ImageBackground>
        </View >
    );
};


const mapStateToProps = () => ({
});
export default connect(mapStateToProps, action)(EditProfileTeacher);
