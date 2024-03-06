
import * as React from 'react'
import { useCallback } from 'react'
import { Alert, FlatList, Image, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import SmartScreenBase from '../../../../base/SmartScreenBase'
import { AppHeader } from '../../../../componentBase/AppHeader'
import { TextBox } from '../../../../componentBase/TextBox'
import { FontSize, FontWeight } from '../../../../styleApp/font'
import stylesApp from '../../../../styleApp/stylesApp'
import { styles } from './CreateClassTeacherScreen.styles'
import moment from "moment";
import API from '../../../../API/APIConstant'
import APIBase from '../../../../base/APIBase'
import { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { JobBox } from '../../../../componentBase/JobBox'
import Loading from '../../../../component/LoadingScreen'
import { Colors } from '../../../../styleApp/color'
import { SelectBox } from './SelectBox'
import { AppTextInput } from '../../../../componentBase/AppTextInput'
import { SelectDateModal } from '../../../../componentBase/SelectDateModal'
import { SelectImageModal } from '../../../../componentBase/SelectImageModal'
import { ShortMainButton } from '../../../../componentBase/ShortMainButton'
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator'
import { BorderSelectBox } from '../../../../componentBase/BorderSelectBox';

/**
 * CreateClassTeacherScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const CreateClassTeacherScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    //First render flag
    let [firstLoading, setFirstLoad] = useState(true)
    //Loading flag
    let [loading, setLoading] = useState(false)
    //Jobbox reference
    let jobBoxRef = React.useRef();
    //Select reference
    let selectRef = React.useRef();
    //Class type list
    let [classType, setType] = useState([])
    //is Left Date check 
    let [isLeftDate, setLeftDate] = useState(true)
    //Class name
    let [className, setName] = useState('')
    //school text
    let [school, setSchool] = useState('')
    //Error for date
    let [errorDate, setErrorDate] = useState('')
    //start date modal visible
    let [modalStartDate, setModalStartDate] = useState(false)
    //end date modal visible
    let [modalEndDate, setModalEndDate] = useState(false)
    //start date value
    let [startDate, setStartDate] = useState(moment().toDate())
    //end date value
    let [endDate, setEndDate] = useState(moment().toDate())
    //image of class
    let [image, setImage] = useState(null)
    //img picker visible
    let [imagePickerVisible, setPickerVisible] = useState(false)
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        const checkStartDate = moment(moment(startDate).format('YYYY-MM-DD')).format('X');
        const checkEndDate = moment(moment(endDate).format('YYYY-MM-DD')).format('X')
        if (checkEndDate < checkStartDate) {
            setErrorDate('Ngày kết thúc không được nhỏ hơn ngày bắt đầu')
        } else {
            setErrorDate('')
        }
    }, [startDate, endDate])

    /**
     * Function create class
    */
    const onCreate = async () => {
        setLoading(true)
        let url = API.baseurl + API.CreateClass
        let form = new FormData();
        // let start = moment(startDate).toDate().getTime();
        // let end = moment(endDate).toDate().getTime();
        // if (end < start) {
        //     setLoading(false)
        //     Alert.alert("Ngày kết thúc không được nhỏ hơn ngày bắt đầu.")
        //     return;
        // }
        form.append("class_name", className)
        form.append("start_time", moment(startDate).format('YYYY-MM-DD HH:mm:ss'))
        form.append("end_time", moment(endDate).format('YYYY-MM-DD HH:mm:ss'))
        form.append("type", selectRef.current.getValue() ? 'online' : 'offline')
        form.append("grade_id", jobBoxRef.current.getValue().type + "")
        !!school && form.append("organization_name", school + "")
        !!image && !!image.uri && form.append("file", image)
        try {
            let res = await APIBase.tokenAPIFormData('post', url, form)
            setLoading(false)
            if (!!res && !!res.data && !!res.data.class_id) {
                props.navigation.pop()
                try {
                    props.navigation.state.params.reload()
                } catch (error) {
                    console.log(error)
                }
            } else {
                setTimeout(() => {
                    if(res?.data){
                        Alert.alert('', res?.data?.msg || "Chức năng này đang gặp vấn đề", [
                            { text: 'OK', style: 'cancel' }
                        ]);
                    }
                }, 500)
            }
        } catch (error) {
            setLoading(false)
            setTimeout(() => {
                Alert.alert('', error, [
                    { text: 'OK', style: 'cancel' }
                ]);
            }, 500)
            console.log("----error", error);
        }
    }

    /**
     * Function get list of grade
    */
    const getData = async () => {
        let url = API.baseurl + API.getGrade
        try {
            let res = await APIBase.tokenAPI('get', url)
            let data = res.data.list_grade
            setType(data.map((item) => ({
                ...item,
                color: Colors.TransparentWhite,
                type: item.id
            })))
            setTimeout(() => {
                setFirstLoad(false)
            }, 200)
        } catch (error) {

        }
    }

    return (
        <View style={styles.container}>
            <AppHeader
                title={language.CreateClassTeacherScreen.CreateClassHeader}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
            />
            <FullScreenLoadingIndicator
                visible={firstLoading}
            />
            { !firstLoading && <KeyboardAwareScrollView
                style={{ flex: 1 }}
                onKeyboardWillShow={(frames) => {
                    Platform.OS === 'ios' && setKeyboardHeight(frames.endCoordinates.height)
                }}
                onKeyboardWillHide={(frames) => {
                    Platform.OS === 'ios' && setKeyboardHeight(0)
                }}>
                <JobBox
                    listData={classType}
                    ref={jobBoxRef}
                    disableColor={true}
                    dropdownStyles={styles.drop}
                />
                <View style={styles.spacing} />
                <SelectBox ref={selectRef} />
                <View style={styles.spacing} />
                <AppTextInput
                    titleStyle={styles.title}
                    title={<>
                        {language.CreateClassTeacherScreen.ClassName}<TextBox style={styles.required}>*</TextBox>
                    </>}
                    value={className}
                    placeholder={language.CreateClassTeacherScreen.EnterClass}
                    onChangeText={setName}
                    style={styles.inputContainer}
                />
                <View style={styles.spacing} />
                <AppTextInput
                    titleStyle={styles.title}
                    title={language.CreateClassTeacherScreen.SchoolName}
                    value={school}
                    placeholder={language.CreateClassTeacherScreen.SchoolEnter}
                    onChangeText={setSchool}
                    style={styles.inputContainer}
                />

                {/* <View style={[styles.row, styles.marginTop30]}>
                    <TextBox style={[styles.title, styles.titlePadding, styles.width40]}>{language.CreateClassTeacherScreen.StartDay}<TextBox style={styles.required}>*</TextBox></TextBox>
                    <View style={styles.space} />
                    <TextBox style={[styles.title, styles.titlePadding, styles.width40]}>{language.CreateClassTeacherScreen.EndDay}<TextBox style={styles.required}>*</TextBox></TextBox>
                </View>
                <View style={[styles.row, styles.bgGreen]}>
                    <TouchableOpacity onPress={() => {
                        setModalStartDate(true)
                        setLeftDate(true)
                    }} >
                        <LinearGradient
                            style={styles.viewDate}
                            colors={[Colors.LightGreen, Colors.BaseGreen]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <TextBox style={styles.date}>{moment(startDate).format('DD/MM/YYYY')}</TextBox>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Image source={{ uri: 'icon_right' }} style={styles.iconRight} />
                    <TouchableOpacity onPress={() => {
                        setModalEndDate(true)
                        setLeftDate(false)
                    }} >
                        <LinearGradient
                            style={styles.viewDate}
                            colors={[Colors._7AE1D4, Colors._7AE1D4]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <TextBox style={styles.date}>{moment(endDate).format('DD/MM/YYYY')}</TextBox>
                        </LinearGradient>
                    </TouchableOpacity>
                </View> */}
                {!!errorDate && <TextBox numberOfLines={null} style={styles.errText}>{errorDate}</TextBox>}
                <View style={styles.imgContainer}>
                    <TextBox style={[styles.title, styles.titlePadding]}>{language.CreateClassTeacherScreen.Avatar}</TextBox>
                    <TouchableOpacity
                        style={styles.imgPicker}
                        onPress={() => { setPickerVisible(true) }}
                    >
                        {!image ? <View style={styles.imgPlaceholder}>
                            <Image
                                source={{ uri: 'empty_image_icon' }}
                                resizeMode='contain'
                                style={styles.imgHolderIcon}
                            />
                            <TextBox style={styles.addImageTxt}>{language.CreateClassTeacherScreen.AddImage}</TextBox>
                        </View> :
                            <Image
                                source={image}
                                resizeMode='contain'
                                style={styles.choosenImage}
                            />}
                    </TouchableOpacity>
                </View>
                <View style={[styles.btnDone]}>
                <ShortMainButton
                    isDisabled={!className || !!errorDate}
                    onPress={onCreate}
                    type={1}
                    text={language.CreateClassTeacherScreen.FinishBt}
                    style={styles.viewAdd}
                    widthType={'full'}

                />
            </View>
            </KeyboardAwareScrollView>}
            <SelectDateModal rangeDate={startDate} isVisible={modalStartDate}
                minimunDate={moment().toDate()}
                onSave={(date) => {
                    if (!!date) {
                        setStartDate(date)
                        // setEndDate(date)
                        setModalStartDate(false)
                    }
                }}
                requestClose={() => {
                    setModalStartDate(false)
                }} />
            <SelectDateModal rangeDate={endDate} isVisible={modalEndDate}
                minimunDate={startDate}
                onSave={(date) => {
                    if (!!date) {
                        setEndDate(date)
                        setModalEndDate(false)
                    }
                }}
                requestClose={() => {
                    setModalEndDate(false)
                }} />
            <SelectImageModal visible={imagePickerVisible}
                onDone={setImage}
                onCancel={() => {
                    setPickerVisible(false)
                }} />
            <FullScreenLoadingIndicator
                visible={loading}
            />
        </View >
    )
}
