import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions, FlatList, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert, ActivityIndicator, Linking } from 'react-native';
import styles from './style'
import { Question } from './Question';
import ModalPickVideo from '../../../component/modalPickerImage';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import utils from "../../../utils/stringUtils";
import { TextBox } from '../../../componentBase/TextBox';
import { AppHeader } from '../../../componentBase/AppHeader';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import { SmPopup } from '../../../componentBase/SmPopup/SmPopup';
import { AppTextInput } from '../../../componentBase/AppTextInput';
import { Colors } from '../../../styleApp/color';
import MyData from '../../../component/MyData';
import DocumentPicker from 'react-native-document-picker';
import { ProjectJson, CommonJson } from '../../../stringJSON';
import SmartScreenBase from '../../../base/SmartScreenBase';
import Loading from '../../../component/LoadingScreen';
import Content from '../../../component/ComponentDetailStudyGuide/Content';
import API from '../../../API/APIConstant';
import APIBase from '../../../base/APIBase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Carousel from 'react-native-snap-carousel';
import { StudentGrammarJson } from '../../../stringJSON/StudentGrammarJson';
import LogBase from '../../../base/LogBase';
import FilePickerManager from 'react-native-file-picker';
import stringUtils from '../../../utils/stringUtils';
import ResultLesson from '../../../component/learn/ResultLesson';
import StudentGuide from '../../../component/learn/StudentGuide';

const { width, height } = Dimensions.get('window');

/**
 * Project screen
 * @param {object} props props from redux and navigation
 * @returns Component
 */

 const _supportType=[
    'mp3','mp4','pdf','ppt','pptx','doc','docx','png','jpg','jpeg','wav','mov','xlsx','gdoc','webm','heic','m4a'
]

const ProjectNew = (props) => {

    const isCuriculumStu = props.navigation.getParam('isCuriculumStu')
    const isTeacher = props.navigation.getParam('isTeacher')

    const instructionRef = React.useRef()
    //index of introduction carousel
    const [indexCarousel, setIndexCarousel] = useState(0);
    //question data
    const [dataQuestion, setDataQuestion] = useState({});
    //video link
    const [linkVideo, setLinkVideo] = useState('')
    //video picker visible
    const [visible, setVisible] = useState(false)
    //Video validate Error visible
    const [visibleMp4, setVisibleMp4] = useState(false);
    //Lession data
    const [lesson, setLesson] = useState(null)
    //List of instruction
    const [dataInstruction, setDataInstruction] = useState([]);
    // Delete Video modal visible
    const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false)
    //Submit Video modal visible
    const [isSubmitConfirmVisible, setSubmitConfirmVisible] = useState(false)
    //Success message modal visible
    const [isSuccessVisible, setSuccessVisible] = useState(false)
    //media of the Project
    const [media, setMedia] = useState(null)
    //temp media for update
    const [tempMedia, setTempMedia] = useState(null)
    //baseAssetUrl from API
    const [baseAssetUrl, setBaseAssetUrl] = useState('')
    //Check if media is uploading
    const [isUploading, setUploading] = useState(false)
    //Pause handling
    const [videoPaused, setVideoPaused] = useState([])
    //First render Flag
    const [isFirstLoad, setFirstLoad] = useState(true)
    //Pause trigger state
    const [pauseTrigger, setPauseTrigger] = useState(0)
    //Media size
    const [fileSize, setFileSize] = useState(0)
    //UPloading processing
    const [uploadingProgress, setUploadingProgress] = useState(0)
    //disableScroll
    const [disableScroll, setDisableScroll] = useState(false)
    //Error Modal visible
    const [showErrorModal, setErrorModal] = useState(false)
    //show guide screen
    const [showGui, setshowGui] = useState(false)
    const [listGui, setlistGui] = useState([]);
    const [dataLog, setDataLog] = useState({});

    useEffect(() => {
        _getApi()
    }, []);

    useEffect(() => {
        setPauseTrigger(pauseTrigger + 1)
    }, [indexCarousel])


    /**
     * get project info
     */
    const _getApi = async () => {
        const url = isCuriculumStu ? API.baseurl + API.student_grammar(props.navigation.state.params.data.lesson_id)
                            : props.navigation.state.params.data.lesson_homework ? API.baseurl + API.getLessonMyHomework2(props.navigation.state.params.data.lesson_id)
                            : API.baseurl + API.teacherLesson + props.navigation.state.params.data.lesson_id
        // const url = "https://setest.gkcorp.com.vn/index.php/api/student/api_student_lesson/lesson?id=" + props.navigation.state.params.data.lesson_id;
        // const headers = {
        //     'Content-Type': 'multipart/form-data',
        //     jwt_token: dataLogin.jwt_token,
        //     Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        //     'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
        // };
        try {
            // const response = await axios({ method: 'get', headers, url })
            const response = await APIBase.postDataJson('get', url)
            console.log('=====project', response.data)
            if (response.data.status) {
                setDataQuestion(response.data.data_question);
                setLesson(response.data.lesson);
                setBaseAssetUrl(response.data.base_url)
                if (response.data.data_question.hasOwnProperty('instruction')) {
                    const instr = response.data.data_question.instruction
                    if (!!instr && instr.length > 0) {
                        let temp = [];
                        LogBase.log('=====instr', instr)
                        temp = instr.map(a => { return true })
                        setVideoPaused(temp)
                        setDataInstruction(instr)
                    } else {
                        setDataInstruction(false)
                    }
                    setTimeout(() => {
                        setPauseTrigger(pauseTrigger + 1)
                    }, 300);
                }
                saveDataLog([])
                var guiList = response.data.list_guide_file
                setlistGui(guiList)
                setshowGui(guiList && guiList.length > 0)
            }
            setFirstLoad(false)
        } catch (error) {
            LogBase.log('=====error', error)
            setFirstLoad(false)
            props.navigation.pop()
        }
    }

    /**
     * open camera to get video
     */
    const _openCamera = () => {
        LogBase.log("=====_openCamera")
        // setVisible(false)
        ImagePicker.openCamera({
            width: 500,
            height: 500,
            // cropping: true,
            mediaType: "video",
        }).then(video => {
            console.log('🚀 ~ file: index.js ~ line 99 ~ ProjectNew ~ video', video)
            setVisible(false)
            _checkFile(video);
        }).catch(err => {
            setVisible(false)
            setTimeout(() => {
                if (err.code === "E_PERMISSION_MISSING" || err.code === 'E_PICKER_NO_CAMERA_PERMISSION')
                    setErrorModal(true)
            }, 500)
        })
    }

    /**
     * open camera to get image
     */
    const _takePhoto = () => {
        LogBase.log("=====_takePhoto")
        // setVisible(false)
        ImagePicker.openCamera({
            width: 500,
            height: 500,
            // cropping: true,
            mediaType: "photo",
        }).then(video => {
            console.log('🚀 ~ file: index.js ~ line 99 ~ ProjectNew ~ video', video)
            setVisible(false)
            _checkFile(video);
        }).catch(err => {
            setVisible(false)
            setTimeout(() => {
                if (err.code === "E_PERMISSION_MISSING" || err.code === 'E_PICKER_NO_CAMERA_PERMISSION')
                    setErrorModal(true)
            }, 500)
        })
    }

    /**
     * open library to get video
     */
    const _openLibrary = async () => {
        LogBase.log("=====_openLibrary")
        if (Platform.OS === 'ios') {

            try {
                const res = await DocumentPicker.pick({
                    readContent: false,
                    // type: _supportType
                });
                 var fex = res.name.substr(res.name.lastIndexOf('.') + 1).toLowerCase();
                 if(!_supportType.includes(fex)){
                    console.log("=====Đang ko hỗ trợ định dạng "+fex)
                    Alert.alert('Thông báo', 'Định dạng file '+fex+' không được hỗ trợ!',
                        [{text: "Đóng", onPress: () => console.log("OK Pressed")}],
                        {cancelable: false}
                    )
                     return;
                 }
                setVisible(false)
                console.log("=====resP",res)
                var resu = {
                    path: decodeURI(res.fileCopyUri),
                    name: res.name,
                    uri: decodeURI(res.uri),
                    mime: res.type
                }
                _checkFile(resu)
            } catch (err) {
                setVisible(false)
                if (DocumentPicker.isCancel(err)) {
                    console.log('Canceled from single doc picker');
                }else{
                    console.log("----er", err.message);
                }
            }

            // ImagePicker.openPicker({
            //     mediaType: "any",
            // }).then(video => {
            //     setVisible(false)
            //     _checkFile(video)
            // }).catch(err => {
            //     setVisible(false)
            //     setTimeout(() => {
            //         if (err.code === "E_PERMISSION_MISSING" || err.code === 'E_PICKER_NO_CAMERA_PERMISSION')
            //             setErrorModal(true)
            //     }, 500)
            // })
        } else {
            FilePickerManager.showFilePicker(null, (response) => {
                if (response.didCancel) {
                  
                }
                else if (response.error) {
                    console.log("----er", response.error);
                    setVisible(false)
                }
                else {
                    var fex = response.fileName.substr(response.fileName.lastIndexOf('.') + 1).toLowerCase();
                    if(!_supportType.includes(fex.toLowerCase())){
                        Alert.alert('Thông báo', 'Định dạng file không hỗ trợ!',
                            [{text: "Đóng", onPress: () => console.log("OK Pressed")}],
                            {cancelable: false}
                        )
                         return;
                    }else{
                        _checkFileMedia(response)
                        setVisible(false)
                    }
                }
            });
            // try {
            //     const res = await DocumentPicker.pick({
            //         type: [DocumentPicker.types.allFiles],
            //     });
            //     setVisible(false)
            //     _checkFileMedia(res)
            // } catch (err) {
            //     console.log('🚀 ~ file: index.js ~ line 114 ~ const_openLibrary= ~ err', err)
            //     if (DocumentPicker.isCancel(err)) {
            //         // User cancelled the picker, exit any dialogs or menus and move on
            //     } else {
            //         throw err;
            //     }
            // }
        }
    };

    /**
     * check type of file
     * @param {object} value file object
     */
    const _checkFile = (value) => {
        console.log("=====_checkFile",value)

        // if (mp4 !== 'mp4') {
        //     setVisibleMp4(true);
        //     setMedia(null)
        //     setTempMedia(null)
        //     setLinkVideo('')
        // } else {
        setLinkVideo(lesson.name)
        // setTempMedia({
        //     ...value,
        //     path: Platform.OS === 'ios' && value.path.includes('file://') ? value.path.replace('file://', '') : value.path
        // })
        var mPart = Platform.OS === 'ios' && value.path.includes('file://') ? value.path.replace('file://', '') : value.path
        setMedia({
            ...value,
            path: mPart
        })
        setTempMedia(null)
        // setSubmitConfirmVisible(true)
        // }
    };

    /**
     * check type of file
     * @param {object} input file object
     */
    const _checkFileMedia = (input) => {
        LogBase.log("=====_checkFileMedia",input)
        // if (ext !== 'mp4' && ext !== 'mp3') {
        //     setVisibleMp4(true);
        //     setMedia(null)
        //     setTempMedia(null)
        //     setLinkVideo('')
        // } else {
        setLinkVideo(lesson.name)
        setFileSize(input.size)
        // setTempMedia({
        //     mime: input.type,
        //     filename: input.uri,
        //     path: input.uri,
        //     sourceURL: input.uri
        // })
        setMedia({
            mime: input.type,
            filename: input.fileName,
            path: "file://"+input.path,
            sourceURL: input.uri
        })
        setTempMedia(null)
        // setSubmitConfirmVisible(true)
        // }
    }

    const getDataLog = (file_id) => {
        var dataLog = [{
            question_id: 1,
            exercise_type: 'project',
            question_type: 1,
            resource_id: file_id,
            question_score: 1,
            final_user_choice: '',
            detail_user_turn: [

            ],
        }]

        return dataLog
    }

    const saveDataLog = async (dataAnswer) => {
        var data = props.navigation.state.params.data

        if(!data.curriculum_id){
            return
        }

        var saveLog = {
        }
        saveLog['class_id'] = data.class_id ?? 1;
        saveLog['unit_id'] = data.unit_id;
        saveLog['skill'] = data.lesson_type;
        saveLog['curriculum_id'] = data.curriculum_id ?? 1;
        saveLog['lesson_id'] = data.lesson_id;

        var dataN = {
            ...saveLog,
            data_answer: JSON.stringify(dataAnswer),
            skill: 'project',
            log_lesson_detail_id: dataLog.log_lesson_detail_id,
            log_lesson_id: dataLog.log_lesson_id
        };
        if (dataAnswer.length == 0) {
            delete dataN.log_lesson_id;
            delete dataN.log_lesson_detail_id;
            delete dataN.data_answer;
        }

        var url = API.baseurl + (data.lesson_homework ? API.save_homework : API.saveLogLearning)

        try {
            const res = await APIBase.postDataJson('POST', url, dataN);
            let dataReturn = res.data;
            if (dataReturn.status) {
                setDataLog(dataReturn);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    const convertFileType = (mType) => {
        LogBase.log("=====mType",mType)
        var mResult = ''
        let splitType = mType?.split("\/")
        LogBase.log("=====splitType",splitType)
        var mCode = splitType[0]
        LogBase.log("=====mCode",mCode)
        switch (mCode) {
            case 'image':
                mResult = 'img'
                break;
            case 'video':
                mResult = 'video'
                break;
            case 'audio':
                mResult = 'audio'
                break;
            default:
                break;
        }
        return mResult
    }

    const showFile = () => {
        var sendData = {
            title: linkVideo,
            type: convertFileType(media.mime),
            path: media.path,
            content: ''
        }
        LogBase.log("=====sendData",sendData)
        props.navigation.navigate('DetailStudyGuide', {title: sendData.title, type: sendData.type, path: sendData.path, content: sendData.content});
    }

    /**
     * post answer to server
     */
    const _postAnswer = async () => {
        setUploading(true)
        const URL = API.baseurl + API.SaveProject;
        let type = 'image/jpeg'
        try {
            let splitType = media?.mime?.split("\/")
            type = splitType[1]
        } catch (error) {

        }
        LogBase.log("=====API",URL)
        var bodysoti = [
            { name: 'file', filename: `${linkVideo}.${type}`, type: media.mime, data: RNFetchBlob.wrap(media.path) },
            { name: 'lesson_id', data: props.navigation.state.params.data.lesson_id },
            { name: 'class_id', data: props.navigation.state.params.data.class_id },
            { name: 'unit_id', data: props.navigation.state.params.data.unit_id },
            { name: 'curriculum_id', data: props.navigation.state.params.data.curriculum_id },
            { name: 'project_id', data: dataQuestion.id },
            { name: 'type', data: props.navigation.state.params.data.lesson_homework ? 'exercise' : ''},
            { name: 'user_exercise_id', data: props.navigation.state.params.data.lesson_id },
            
        ]
        LogBase.log("=====Body:",bodysoti)
        APIBase.uploadFile(URL, bodysoti)
            .then((ressponse) => {
                let data = JSON.parse(ressponse)
                // console.log("=====project",data,[
                //     { name: 'file', filename: `${linkVideo}.${type}`, type: media.mime, data: RNFetchBlob.wrap(media.path) },
                //     { name: 'lesson_id', data: props.navigation.state.params.data.lesson_id },
                //     { name: 'class_id', data: props.navigation.state.params.data.class_id },
                //     { name: 'unit_id', data: props.navigation.state.params.data.unit_id },
                //     { name: 'curriculum_id', data: props.navigation.state.params.data.curriculum_id },
                //     { name: 'project_id', data: dataQuestion.id }
                // ])
                console.log("=====_postAnswer",data, [
                    { name: 'file', filename: `${linkVideo}.${type}`, type: media.mime, data: RNFetchBlob.wrap(media.path) },
                    { name: 'lesson_id', data: props.navigation.state.params.data.lesson_id },
                    { name: 'class_id', data: props.navigation.state.params.data.class_id },
                    { name: 'unit_id', data: props.navigation.state.params.data.unit_id },
                    { name: 'curriculum_id', data: props.navigation.state.params.data.curriculum_id },
                    { name: 'project_id', data: dataQuestion.id },
                    { name: 'type', data: props.navigation.state.params.data.lesson_homework ? 'exercise' : ''},
                    { name: 'user_exercise_id', data: props.navigation.state.params.data.lesson_id },
                    
                ])
                if (data.status) {
                    
                    saveDataLog(getDataLog(data.file_id))

                    setSuccessVisible(true)
                    setTimeout(() => {
                        setSuccessVisible(false)
                        MyData.isDoneExe = true
                        const cb = props.navigation.getParam('cb');
                        if (cb) {
                            cb();
                        }
                        props.navigation.pop()
                    }, 2000);
                    // var data = {
                    //     resource_id: ressponse?.file_id
                    // }
                } else {
                    Alert.alert(data.msg)
                }
                setUploading(false)
            }).catch((error) => {
                setUploading(false)
            })
    };

    const goLink = (mLink) => {
        var trueLink = mLink.replace('\n','')
        Linking.openURL(trueLink)
    }

    // Highlight and set onPress link
    const renderTextWithLink = (mText) => {
        var slEnter = mText.split('\n').length
        var changeT = mText
        for(var i=0; i < slEnter; i++){
            changeT = changeT.replace('\n',' @mi#')
        }
        var mtextList = changeT.split(' ')
        var dataText = []
        var needCre = false
        var curIndex = 0
        mtextList.forEach((ele, index) => {
            var subS = ele.toLowerCase()
            if(ele.length >= 11 && (subS.substring(0,4) == 'http' || subS.substring(0,8) == '@mi#http')){
                var monoS = {
                    textR: ele.replace('@mi#','\n'),
                    status: 1
                }
                dataText.push(monoS)
                needCre = true
                curIndex = curIndex + 1
            }else{
                if(index == 0) needCre = true
                if(needCre){
                    var monoS = {
                        textR: ele.replace('@mi#','\n'),
                        status: 0
                    }
                    dataText.push(monoS)
                    if(index != 0){
                        curIndex = curIndex + 1
                    }
                    needCre = false
                }else{
                    dataText[curIndex].textR = dataText[curIndex].textR + ' ' + ele.replace('@mi#','\n')
                }
            }
        });

        return (
            <View style={styles.instructionText}>
                {
                    dataText.map((mono) => {
                        if(mono.status == 0)
                            return(
                                <TextBox numberOfLines={undefined}>{mono.textR}</TextBox>
                            )
                        else return(
                            <TextBox onPress={()=>goLink(mono.textR)} style={{color: Colors.BlueHex, textDecorationLine: 'underline'}} numberOfLines={undefined}>{mono.textR}</TextBox>
                        )
                    })
                }
            </View>
        )
    }

    /**
     * render instruction
     * @returns Component
     */
    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.instructionItem}>
                <View>
                    <ScrollView bounces={false} >
                        <View style={styles.instructionItemBox}>
                            {!!item.i_file && <>
                                {utils.isVideoLink(item.i_file) ?
                                    <Content
                                        setDisableScroll={setDisableScroll}
                                        containerStyle={styles.videoContainer}
                                        autoplayDisabled={true}
                                        onZoomout={() => { }}
                                        type={stringUtils.checkTypeRS(item.i_file_type)}
                                        path={`${baseAssetUrl}${item.i_file}`}
                                        pauseTrigger={pauseTrigger}
                                        defaultStart={false}
                                    />
                                    :
                                    <Image
                                        // onProgress={(e) => {
                                        //     console.log("000000e", e);
                                        // }}
                                        source={{ uri: `${baseAssetUrl}${item.i_file}`, }}
                                        style={styles.instructionImage}
                                        resizeMode="contain" />
                                }
                            </>}
                            {/* <TextBox style={styles.instructionText} numberOfLines={undefined}>{item.i_text}</TextBox> */}
                            {renderTextWithLink(item.i_text)}
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }

    if (isFirstLoad) return (
        <ImageBackground
            source={{ uri: 'imagebackgroundlesson' }}
            imageStyle={styles.ImageBackGround}
            style={styles.loading}>
            <Loading />
        </ImageBackground>
    )//${dataQuestion.question}
    return (
        <View style={styles.container}>
            {showGui ? <StudentGuide
                onPressDo={() => {
                    setshowGui(false)
                }}
                navigation={props.navigation}
                data={listGui} />
            : <ImageBackground style={styles.container} source={{ uri: 'bg_project' }}>
                <AppHeader title={ProjectJson.Project} leftIconOnPress={() => {
                    props.navigation.pop()
                }} />
                {/* <KeyboardAvoidingView style={styles.container} enabled behavior="height"> */}
                <View style={styles.insideContainer}>
                    <Question english={dataQuestion.question} vietnam={dataQuestion.question_vi} />
                    <View style={styles.instructionBox}>
                        <View style={styles.instructionDetailBox}>
                            <TextBox style={styles.instructionLabel}>{ProjectJson.Suggestion}:</TextBox>
                            <Carousel
                                data={dataInstruction}
                                scrollEnabled={Platform.OS === 'android' || !disableScroll}
                                // ref={instructionRef}
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={16}
                                onSnapToItem={setIndexCarousel}
                                sliderHeight={300}
                                renderItem={_renderItem}
                                sliderWidth={SmartScreenBase.smBaseWidth * 1080 - SmartScreenBase.smBaseWidth * 80}
                                itemWidth={SmartScreenBase.smBaseWidth * 1080 - SmartScreenBase.smBaseWidth * 80}

                            />
                            <View style={styles.instructionPagination}>
                                <View style={styles.row}>
                                    {dataInstruction.length > 1 ?
                                        dataInstruction.map((item, index) => {
                                            return (
                                                <View style={styles.paginationDot}>
                                                    <View style={[styles.paginationDotInside, index === indexCarousel ? { backgroundColor: Colors.BaseGreen, ...styles.paginationDotInside } : {}]} />
                                                </View>
                                            )
                                        })
                                        : null}
                                </View>
                            </View>
                        </View>

                    </View>
                    {!!media &&
                        <View style={styles.mediaBox}>
                            <TouchableOpacity style={styles.mediaItem} onPress={() => showFile()}>
                                <View style={styles.mediaIcon}>
                                    <Image source={{ uri: 'playwhite' }} resizeMethod='scale' resizeMode='contain' style={styles.mediaImage} />
                                </View>
                                <TextBox style={styles.mediaName} numberOfLines={1}>{linkVideo}</TextBox>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.trashBtn} onPress={() => setDeleteConfirmVisible(true)}>
                                <Image source={{ uri: 'trash_icon' }} style={styles.trashImage} />
                            </TouchableOpacity>
                        </View>
                    }
                        <View style={styles.submitBox}>
                        {!media && !isTeacher ? 
                            <ShortMainButton
                                onPress={() => setVisible(true)}
                                type={1}
                                text={ProjectJson.UploadFile}
                                style={styles.submitBtn}
                            />
                            : !isTeacher && <ShortMainButton
                            onPress={_postAnswer}
                            type={1}
                            text={ProjectJson.Submit}
                            style={styles.submitBtn}
                            />
                        }
                        {isTeacher &&
                            <View style={styles.notifyBox}> 
                                <TextBox numberOfLines={2} style={{color: Colors.Black, textAlign: 'center'}}
                                text={"Học sinh có thể lựa chọn các chức năng: Chụp ảnh, quay video, tải tệp ở máy để nộp bài"}/>
                            </View>
                        }
                        </View>
                </View>

                {/* </KeyboardAvoidingView> */}
                <ModalPickVideo
                    visible={visible}
                    status={'video'}
                    takePhoto={_takePhoto}
                    openCamera={_openCamera}
                    openLibrary={_openLibrary}
                    close={() => setVisible(false)}
                />
                <SmPopup visible={visibleMp4}
                    message={ProjectJson.MediaFormatErr}
                    cancelText={null}
                    contentStyles={styles.modalBox}
                    messageStyle={styles.messageModalStyle}
                    confirmOnpress={() => setVisibleMp4(false)}
                />
                <SmPopup visible={isSuccessVisible}
                    message={ProjectJson.SubmitSuccess}
                    cancelText={null}
                    confirmText={null}
                    contentStyles={[styles.modalBox, styles.messageSuccessModalBox]}
                    containerStyles={styles.messageSuccessModal}
                    messageStyle={[styles.messageModalStyle, styles.messageSuccessModalText]}
                />
                <SmPopup visible={isDeleteConfirmVisible}
                    message={ProjectJson.DeleteMessage}
                    cancelText={CommonJson.No}
                    confirmText={CommonJson.Yes}
                    contentStyles={styles.modalBox}
                    messageStyle={[styles.messageModalStyle, styles.messageDeleteStyle]}
                    cancelOnpress={() => setDeleteConfirmVisible(false)}
                    confirmOnpress={() => {
                        setDeleteConfirmVisible(false)
                        setLinkVideo('')
                        setMedia(null)
                        setTempMedia(null)
                    }}
                />
                <SmPopup visible={showErrorModal}
                    message={StudentGrammarJson.MediaError}
                    cancelText={CommonJson.Cancel}
                    confirmText={CommonJson.Confirm}
                    contentStyles={styles.modalBox}
                    messageStyle={[styles.messageModalStyle, styles.messageDeleteStyle]}
                    cancelOnpress={() => setErrorModal(false)}
                    confirmOnpress={() => {
                        setErrorModal(false)
                        Linking.openSettings()
                    }}
                />
                {/* <KeyboardAwareScrollView onPress={() => Keyboard.dismiss()}> */}
                <SmPopup visible={isSubmitConfirmVisible}
                    contentStyles={styles.submitModal}
                    cancelText={CommonJson.Cancel}
                    confirmText={CommonJson.Done}
                    confirmDisable={!linkVideo}
                    cancelOnpress={() => {
                        setSubmitConfirmVisible(false)
                        setLinkVideo('')
                        setMedia(null)
                        setTempMedia(null)
                    }}
                    confirmOnpress={() => {
                        setSubmitConfirmVisible(false)
                        setMedia(tempMedia)
                        setTempMedia(null)
                    }}
                >
                    <TextBox style={styles.submitLabel}>{ProjectJson.FileName}</TextBox>
                    <AppTextInput
                        multiline
                        value={linkVideo}
                        onChangeText={setLinkVideo}
                        placeholder={"Nhập tên bài"}
                        style={styles.answerInput}
                    />
                </SmPopup>
                {/* </KeyboardAwareScrollView> */}
                {isUploading && <View style={styles.loadingView}>
                    <ActivityIndicator color={Colors.BaseGreen} />
                    {/* <TextBox text={`Tải lên ${uploadingProgress}%`} style={{ color: 'white', backgroundColor: '#ccc', marginTop: SmartScreenBase.smBaseHeight * 20 }} /> */}
                </View>}
            </ImageBackground>}
        </View >
    );
};
export default ProjectNew;