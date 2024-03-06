import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    Slider,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Animated,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import Grammar from '../../component/learn/Lesson/Grammar';
import Listening from '../../component/learn/Lesson/Listening';
import Pronunciation from '../../component/learn/Lesson/Pronunciation';
import Reading from '../../component/learn/Lesson/Reading';
import Speaking from '../../component/learn/Lesson/Speaking';
import Vocabulary from '../../component/learn/Lesson/Vocabulary';
import Writing from '../../component/learn/Lesson/Writting';
import ResultLesson from './ResultLesson';
import SmartScreenBase from '../../base/SmartScreenBase';
import API from '../../API/APIConstant';
import { useSelector } from 'react-redux';
import stylesApp from '../styleApp/stylesApp';
import Video from 'react-native-video';
import TypeExercise from './Lesson/Component/TypeExercise2';
import MyData from '../MyData';
import EventBus from 'react-native-event-bus';
import APIBase from '../../base/APIBase';
import LogBase from '../../base/LogBase';
import StudentGuide from './StudentGuide';

const _icon = (t, p) => {
    switch (t) {
        case 'audio':
            return 'teacher_huongdanbaigiang_icon_mp3';
        case 'video':
            return 'teacher_huongdanbaigiang_icon_video';
        case 'img':
            return 'teacher_huongdanbaigiang_icon_image';
        case 'writing':
            return 'teacher_huongdanbaigiang_icon_text';
        case 'document':
            const check = t.substr(t.lastIndexOf('.'))
            if (check.indexOf('doc') >= 0 || check.indexOf('docx') >= 0) {
                return 'teacher_huongdanbaigiang_icon_text';
            } else if (check.indexOf('ppt') >= 0) {
                return 'teacher_huongdanbaigiang_icon_powerpoint';
            } else if (check.indexOf('pdf') >= 0) {
                return 'teacher_huongdanbaigiang_icon_pdf';
            }
            return 'teacher_huongdanbaigiang_icon_text'
        default:
            return 'teacher_huongdanbaigiang_icon_text';
    }
}
const GuidItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={{
            paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
            marginTop: SmartScreenBase.smPercenWidth * 2,
        }} onPress={() => {
            onPress(item)
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                flex: 1,
                height: SmartScreenBase.smPercenWidth * 22,
                marginLeft: SmartScreenBase.smPercenWidth * 5,
                borderRadius: SmartScreenBase.smPercenWidth * 4
            }}>
                <Image
                    source={{ uri: _icon(item.type, item.path) }}
                    style={{
                        width: SmartScreenBase.smPercenWidth * 20,
                        height: SmartScreenBase.smPercenWidth * 20,
                        marginLeft: -SmartScreenBase.smPercenWidth * 10
                    }}
                />
                <Text
                    numberOfLines={2}
                    ellipsizeMode={'middle'}
                    style={{
                        fontWeight: 'bold',
                        fontSize: SmartScreenBase.smFontSize * 45,
                        flex: 1,
                    }}
                >{item.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

let dataResult, lesson_id, class_id, count = 0;

const ListLesson = ({ navigation }) => {

    const data = navigation.getParam('data');
    const isMasterUnit = navigation.getParam('isMasterUnit');

    const [skill, setSkill] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [resultView, setResultView] = useState(false);
    const [name, setName] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [valueFeedback, setValueFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [dataContent, setDataContent] = useState(null);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [showModal, setShowModal] = useState(false);
    const [resource, setResource] = useState(null);
    const [duration, setDuration] = useState(0);
    const [pause, setPause] = useState(false);
    const [valueSlider, setValueSlider] = useState(0);
    const [baseUrl, setBaseUrl] = useState('');
    const [playBack, setPlayBack] = useState(0);
    const [logLearning, setLogLearning] = useState({});
    const [dataLog, setDataLog] = useState({});
    const player = useRef();
    const [vietnam, setVietNam] = useState('');
    const [english, setEnglish] = useState('');
    const [typeExercise, setTypeExercise] = useState(true);
    const [indexQuestion, setIndexQuestion] = useState(0);
    const [totalQuestion, setTotalQuestion] = useState(1);
    const [hideStatusBar, setHideStatusBar] = useState(false);
    const marginTop = useRef(new Animated.Value(0)).current;
    const textInput = useRef();
    const [showGuide, setShowGuide] = React.useState(null);
    const questionData = React.useRef(null);

    const [show, setShow] = useState(false)
    useEffect(() => {
        if(isMasterUnit){
            goQuestionFromMasterUnit()
        }else{
            if (data.resources_id) {
                _getResources();
            } else {
                _getDataQuestion();
            }
        }
    }, []);

    useEffect(() => {
        if (valueSlider === duration && valueSlider !== 0 && duration !== 0) {
            setPause(true);
        }
    }, [valueSlider]);

    const _getResources = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.getResource(data.resources_id, data.class_id);
        try {
            const res = await APIBase.postDataJson('GET', url);
            let data = res.data;
            console.log("=====_getResources",dataReturn)
            if (data.status) {
                setBaseUrl(data.base_url);
                setResource(data.resource);
                _getDataQuestion();
            }else{
                setIsLoading(false);
                Alert.alert(
                    data.msg,
                    '',
                    [
                      {
                        text: "Trở về",
                        onPress: () => navigation.goBack(),
                        style: "cancel",
                      }
                    ]
                  );
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const _saveStartLogLearning = async (saveLog, dataReturnContent) => {

        if(isMasterUnit || dataLogin.role !== 'student') return
        console.log("=====_saveStartLogLearning")
        const url = API.baseurl + API.saveLogLearning;
        try {
            const res = await APIBase.postDataJson('post', url, saveLog );
        let dataReturn = res.data;
        console.log("=====logAPI",res.data)
        setIsLoading(false);
        if (dataReturn.status) {
            setDataLog(dataReturn);
        }else Alert.alert(dataReturn.msg)
    } catch (error) {
        setIsLoading(false);
        console.log(error);
    }
};

const _saveLogHw = async (dataAnswer) => {

}

const saveLessonMasterUnit = async (dataAnswer) => {

    setIsLoading(true);
    const url = API.baseurl + API.saveMasterUnit
    var dataN = {
        looking_back_id: data.lesson_id,
        data_answer: JSON.stringify(dataAnswer),
        skill: data.lesson_type,
        type: data.type
    }
    console.log("=====Req saveLessonMasterUnit",dataN)
    var res = await APIBase.postDataJson('POST',url, dataN);
    console.log("=====saveLessonMasterUnit",res.data)
    if (dataAnswer.length > 0 && res.data.status) {
        // Ra màn hình báo điểm
        _reviewResult(res.data);
        //Trở về master unit ở đây
        // const cb = navigation.getParam('cb');
        // if (cb) {
        //     cb();
        // }
        // navigation.goBack()
    }
}

const _saveLogLearning = async (dataAnswer) => {
    LogBase.log("=====go _saveLogLearning")
    if(!dataAnswer || dataAnswer.length == 0) { setIsLoading(false); return;}
    console.log("=====_saveLogLearning",dataAnswer)
    if(isMasterUnit) saveLessonMasterUnit(dataAnswer)

    setIsLoading(true);
    setShowFeedback(false);

    var url = API.baseurl + (data.lesson_homework ? API.save_homework :
        dataLogin.role === 'student' ? API.saveLogLearning : API.checkScore)
    
    if (data.lesson_homework) {
        if(dataAnswer && dataAnswer.length > 0){
        const dataN = {
            'data_exercise': 1,
            'user_choice': JSON.stringify(dataAnswer),
            'exercise_id': data.lesson_id,
            'resource_id': dataAnswer[0].resource_id,
            'exercise_type': data.lesson_type,
            'duration': 100,
            'user_exercise_id': data.user_received_id
        }
        var qs = require('qs');
        LogBase.log("=========_saveStartLogLearning ListLesson 2",dataN);
        var res = await APIBase.tokenAPI('POST',url, qs.stringify(dataN));
        if (dataAnswer.length > 0 && res.data.status) {
            if((skill == 'speaking' && questionType == 3) || (skill == 'writing' && questionType == 7)){
                const cb = navigation.getParam('cb');
                if (cb) {
                    cb();
                }
                MyData.isDoneExe = true
                setIsLoading(false);
            }else{
                _reviewResult(res.data);
            }
        }else {
            setIsLoading(false);
            Alert.alert(
                res.data.msg,
                '',
                [
                  {
                    text: "Trở về",
                    onPress: () => navigation.goBack(),
                    style: "cancel",
                  },
                ]
              );
            // Alert.alert(res.data.msg)
        }
    }else{
        setIsLoading(false);
    }

        return;
    }
    var dataN = {
        ...logLearning,
        data_answer: JSON.stringify(dataAnswer),
        skill: skill,
        log_lesson_detail_id: dataLog.log_lesson_detail_id,
        log_lesson_id: dataLog.log_lesson_id
    };
    if (dataAnswer.length == 0) {
        delete dataN.log_lesson_id;
        delete dataN.log_lesson_detail_id;
    }
    try {
        LogBase.log("=========_saveStartLogLearning ListLesson 3",dataN);
        const res = await APIBase.postDataJson('POST', url, dataN);
        let dataReturn = res.data;
        setIsLoading(false);
        if (dataAnswer.length > 0 && dataReturn.status) {
            if((skill == 'speaking' && questionType == 3) || (skill == 'writing' && questionType == 7)){
                const cb = navigation.getParam('cb');
                if (cb) {
                    cb();
                }
                LogBase.log("=====ReloadList")
                setIsLoading(false);
            }else{
                _reviewResult(dataReturn);
            }
        } else {
            setDataLog(dataReturn);
        }
    } catch (error) {
        setIsLoading(false);
        console.log('error', error);
    }
};

const goQuestionFromMasterUnit = async () => {
    setIsLoading(true);
    const url = API.baseurl + API.getLessonMasterUnit(data.lesson_id, data.type)
    try {
        const res = await APIBase.postDataJson('GET', url);
        let dataReturn = res.data;
        LogBase.log("=====goQuestionFromMasterUnit",dataReturn)
        hideLoading()
        if (dataReturn.status) {
            if (dataReturn?.list_guide_file?.length > 0) {
                questionData.current = dataReturn;
                setShowGuide(dataReturn.list_guide_file)
            } else {
                getDataQuestionDone(dataReturn)
            }
        }else Alert.alert(dataReturn.msg)
    } catch (error) {
        setIsLoading(false);
        console.log(error);
        if (error.message === 'Network Error') {
            Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                { text: 'Đồng ý', style: 'cancel' },
            ]);
        }
    }
};

const hideLoading = () => {
    if(data.lesson_type.toLowerCase() != 'reading' || (data.question_type != 6 && data.question_type != 14)){
        LogBase.log("hideLoading")
        setIsLoading(false);
    }else{
        LogBase.log("dont call hideLoading")
    } 
}

const checkRequestMasterUnit = (isRequest) => {
    if(isRequest){
        Alert.alert(
            "Bạn cần hoàn thành MasterUnit trước khi tiếp tục",
            '',
            [
              {
                text: "Trở về",
                onPress: () => navigation.goBack(),
                style: "cancel",
              },
            ]
          );
        return true
    }else{
        return false
    }
}

const _getDataQuestion = async () => {
    setIsLoading(true);
    const url = data.lesson_homework ?
        API.baseurl + API.getLessonMyHomework2(data.lesson_id)
        :
        dataLogin.role === 'student' ?
            API.baseurl + API.studentLesson(data.lesson_id, data.class_id) :
            API.baseurl + API.teacherLesson + data.lesson_id;
    try {
        const res = await APIBase.postDataJson('GET', url);
        let dataReturn = res.data;
        LogBase.log("=====_getDataQuestion",dataReturn)
        if (dataReturn.status) {
            hideLoading()
            if(checkRequestMasterUnit(dataReturn.require_learn_master_unit)){
                return
            }
            if (dataReturn?.list_guide_file?.length > 0) {
                questionData.current = dataReturn;
                setShowGuide(dataReturn.list_guide_file)
            } else {
                getDataQuestionDone(dataReturn)
            }
        }else {
            setIsLoading(false);
            Alert.alert(
                dataReturn.msg,
                '',
                [
                  {
                    text: "Trở về",
                    onPress: () => navigation.goBack(),
                    style: "cancel",
                  },
                ]
              );
        }
    } catch (error) {
        setIsLoading(false);
        console.log(error);
        if (error.message === 'Network Error') {
            Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                { text: 'Đồng ý', style: 'cancel' },
            ]);
        }
    }
};

const getDataQuestionDone = async (dataReturn) => {
    setDataContent(dataReturn);
    if (data.lesson_type !== 'vocabulary') {
        setVietNam(dataReturn.data_question[0].list_option[0].group_content_vi);
        setEnglish(dataReturn.data_question[0].list_option[0].group_content);
        if (!data.question_type) {
            data.question_type = dataReturn.data_question[0].list_option[0].question_type
        }
    }
    let saveLog = { ...logLearning };
    saveLog['class_id'] = data.class_id ?? 1;
    saveLog['unit_id'] = data.unit_id;
    saveLog['skill'] = data.lesson_type;
    saveLog['curriculum_id'] = data.curriculum_id ?? 1;
    saveLog['lesson_id'] = dataReturn.lesson.id;
    // saveLog['data_lesson'] = dataReturn;
    setLogLearning(saveLog);

    if (data.lesson_type.toLowerCase() === 'pronunciation' && data.question_type === '5'
        || data.lesson_type.toLowerCase() === 'pronunciation' && data.question_type === '6'
        || data.lesson_type.toLowerCase() === 'pronunciation' && data.question_type === '11'
        || data.lesson_type.toLowerCase() === 'reading'
        || data.lesson_type.toLowerCase() === 'listening'
        || data.lesson_type.toLowerCase() === 'speaking' && data.question_type !== '2'
        || data.lesson_type.toLowerCase() === 'writing' && data.question_type !== '2'
        || data.lesson_type.toLowerCase() === 'grammar' && data.question_type !== '5'
    ) {
        setTotalQuestion(1);
    } else {
        setTotalQuestion(dataReturn.data_question.length);
    }
    setQuestionType(data.question_type);
    setName(data.lesson_name);
    lesson_id = data.lesson_id;
    setModalVisible(false);
    setShowFeedback(false);
    setSkill(data.lesson_type);
    if (!!data.lesson_homework) {
        setIsLoading(false);
    } else {
        await _saveStartLogLearning(saveLog, dataReturn);
    }
}

const _reviewResult = (d) => {
    dataResult = d;
    setResultView(true);
};

const listLesson = () => {
    console.log("=====skill "+skill+" "+questionType)
    if (skill) {
        switch (skill.toLowerCase()) {
            case 'grammar':
                return (
                    <Grammar
                        lesson_id={lesson_id}
                        question_type={questionType}
                        mode={'lesson'}
                        reviewResult={(data) => _reviewResult(data)}
                        goBack={() => navigation.goBack()}
                        showFeedback={() => setShowFeedback(true)}
                        hideFeedback={() => setShowFeedback(false)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => _saveLogLearning(data)}
                        showTypeExercise={() => setTypeExercise(true)}
                        hideTypeExercise={() => setTypeExercise(false)}
                        handleKeyboardShow={(e) => handleKeyboardShow(e)}
                        handleKeyboardHide={() => handleKeyboardHide()}
                        setIndexQuestion={(index) => setIndexQuestion(index)}

                    />
                );
            case 'listening':
                return (
                    <Listening
                        lesson_id={lesson_id}
                        question_type={questionType}
                        mode={'lesson'}
                        reviewResult={(data) => _reviewResult(data)}
                        goBack={() => navigation.goBack()}
                        showFeedback={() => setShowFeedback(true)}
                        hideFeedback={() => setShowFeedback(false)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => _saveLogLearning(data)}
                        showTypeExercise={() => setTypeExercise(true)}
                        hideTypeExercise={() => setTypeExercise(false)}
                        handleKeyboardShow={(e) => handleKeyboardShow(e)}
                        handleKeyboardHide={() => handleKeyboardHide()}
                    />
                );
            case 'pronunciation':
                return (
                    <Pronunciation
                        lesson_id={lesson_id}
                        question_type={questionType}
                        mode={'lesson'}
                        reviewResult={(data) => _reviewResult(data)}
                        goBack={() => navigation.goBack()}
                        showFeedback={() => setShowFeedback(true)}
                        hideFeedback={() => setShowFeedback(false)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => _saveLogLearning(data)}
                        showTypeExercise={() => setTypeExercise(true)}
                        hideTypeExercise={() => setTypeExercise(false)}
                        setIndexQuestion={(index) => setIndexQuestion(index)}
                        handleKeyboardShow={(e) => handleKeyboardShow(e)}
                        handleKeyboardHide={() => handleKeyboardHide()}
                    />
                );
            case 'reading':
                return (
                    <Reading
                        isTeacher={dataLogin.role === 'teacher'}
                        lesson_id={lesson_id}
                        question_type={questionType}
                        mode={'lesson'}
                        reviewResult={(data) => _reviewResult(data)}
                        goBack={() => navigation.goBack()}
                        showFeedback={() => setShowFeedback(true)}
                        hideFeedback={() => setShowFeedback(false)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => _saveLogLearning(data)}
                        showTypeExercise={() => setTypeExercise(true)}
                        hideTypeExercise={() => setTypeExercise(false)}
                        navigation={navigation}
                        handleKeyboardShow={(e) => handleKeyboardShow(e)}
                        handleKeyboardHide={() => handleKeyboardHide()}
                        show={(value) => setShow(value)}
                        setLoading={(loading) => setIsLoading(loading)}
                    />
                );
            case 'speaking':
                return (
                    <Speaking
                        isTeacher={dataLogin.role === 'teacher'}
                        dataLesson={data}
                        lesson_id={lesson_id}
                        question_type={questionType}
                        mode={'lesson'}
                        reviewResult={(data) => _reviewResult(data)}
                        goBack={() => navigation.goBack()}
                        showFeedback={() => setShowFeedback(true)}
                        hideFeedback={() => setShowFeedback(false)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => _saveLogLearning(data)}
                        lesson_homework={data.lesson_homework}
                        user_received_id={data.user_received_id}
                        showTypeExercise={() => setTypeExercise(true)}
                        hideTypeExercise={() => setTypeExercise(false)}
                        setIndexQuestion={(index) => setIndexQuestion(index)}
                    />
                );
            case 'vocabulary':
                return (
                    <Vocabulary
                        lesson_id={lesson_id}
                        question_type={questionType}
                        isMasterUnit={isMasterUnit}
                        masterType={data.type}
                        mode={'lesson'}
                        reviewResult={(data) => _reviewResult(data)}
                        goBack={() => navigation.goBack()}
                        showFeedback={() => setShowFeedback(true)}
                        dataContent={dataContent}
                        showTypeExercise={() => setTypeExercise(true)}
                        hideTypeExercise={() => setTypeExercise(false)}
                        setVietNam={(vi) => setVietNam(vi)}
                        setEnglish={(en) => setEnglish(en)}
                        setIndexQuestion={(index) => setIndexQuestion(index)}
                        dataLesson={data}
                        saveLogLearning={(data) => _saveLogLearning(data)}
                    />
                );
            case 'writing':
                return (
                    <Writing
                        isTeacher={dataLogin.role === 'teacher'}
                        lesson_id={lesson_id}
                        class_id={data.class_id}
                        question_type={questionType}
                        mode={'lesson'}
                        reviewResult={(data) => _reviewResult(data)}
                        goBack={() => navigation.goBack()}
                        showFeedback={() => setShowFeedback(true)}
                        hideFeedback={() => setShowFeedback(false)}
                        dataContent={dataContent}
                        lesson_homework={data.lesson_homework}
                        user_received_id={data.user_received_id}
                        showTypeExercise={() => setTypeExercise(true)}
                        hideTypeExercise={() => setTypeExercise(false)}
                        saveLogLearning={(data) => _saveLogLearning(data)}
                        setIndexQuestion={(index) => setIndexQuestion(index)}
                        handleKeyboardShow={(e) => handleKeyboardShow(e)}
                        handleKeyboardHide={() => handleKeyboardHide()}
                        dataLesson={data}
                    />
                );
            default:
                return null;
        }
    }
    return null;
};

const _feedBack = async () => {
    setModalVisible(false);
    setIsLoading(true);
    const url = API.baseurl + API.feedBack;
    const headers = {
        'Content-Type': 'application/json',
        'jwt_token': APIBase.jwt_token,
        'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
        'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
    };
    let data = {};
    data['feedback_content'] = valueFeedback;
    try {
        const res = await APIBase.postDataJson('post', url, data);
        let dataReturn = res.data;
        setIsLoading(false);
        if (dataReturn.status) {
            Alert.alert('Thông báo', 'Gửi phản hồi thành công!', [
                { text: 'Đồng ý', style: 'cancel' },
            ]);
        }
    } catch (error) {
        Alert.alert('Thông báo', error.response.data.msg, [
            { text: 'Đồng ý', style: 'cancel' },
        ]);
        setIsLoading(false);
        setModalVisible(false);
        console.log(error);
    }
};

const _play = () => {
    if (pause) {
        if (valueSlider === duration) {
            player.current.seek(0);
        } else {
            player.current.seek(valueSlider);
        }
    }
    setPause(!pause);
};

const _renderBtn = () => {
    return (
        <View style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: SmartScreenBase.smPercenWidth * 90,
            height: SmartScreenBase.smPercenHeight * 24,
        }}>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                }}
                onPress={() => _play()}
            >
                {
                    pause
                        ?
                        <Image source={{ uri: 'playgray' }}
                            style={{
                                width: SmartScreenBase.smPercenWidth * 20,
                                height: SmartScreenBase.smPercenWidth * 20,
                            }}
                        />
                        :
                        null
                }

            </TouchableOpacity>
        </View>
    );
};

const _onValueChange = (value) => {
    if (count === 0) {
        let playBack = pause ? 1 : 0;
        setPlayBack(playBack);
    }
    if (!pause) {
        setPause(true);
    }
    count++;
};

const _onSlidingComplete = (value) => {
    if (playBack) {
        setPause(true);
    } else {
        setPause(false);
    }
    player.current.seek(value);
    count = 0;
};

const _renderResourceAudioVideo = () => {
    return (
        <View style={{
            height: resource.type === 'audio' ? SmartScreenBase.smPercenHeight * 22 : SmartScreenBase.smPercenHeight * 32,
            width: SmartScreenBase.smPercenWidth * 90,
        }}>
            <Video
                source={{ uri: baseUrl + resource.path }}   // Can be a URL or a local file.
                ref={player}
                paused={pause}
                onLoad={(event) => setDuration(event.duration)}
                onProgress={(event) => setValueSlider(event.currentTime)}
                audioOnly={resource.type === 'audio' ? true : false}
                onEnd={() => setValueSlider(duration)}
                onSeek={(event) => setValueSlider(event.currentTime)}
                resizeMode={'stretch'}
                style={{
                    width: '100%',
                    height: resource.type === 'audio' ? 0 : SmartScreenBase.smPercenHeight * 24,
                }}
            />
            {
                resource.type === 'audio'
                    ?
                    null
                    :
                    _renderBtn()
            }
            <View style={{
                height: SmartScreenBase.smPercenHeight * 8,
                position: 'absolute',
                bottom: 0,
                backgroundColor: '#00000060',
                width: SmartScreenBase.smPercenWidth * 90,
                borderBottomRightRadius: SmartScreenBase.smPercenWidth * 5,
                borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 5,
                paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: SmartScreenBase.smPercenWidth * 80,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => _play()}
                    >
                        <Image source={{ uri: pause ? 'playwhite' : 'pausewhite' }}
                            style={{
                                width: SmartScreenBase.smPercenWidth * 5,
                                height: SmartScreenBase.smPercenWidth * 5,
                            }}
                        />
                    </TouchableOpacity>
                    <Slider
                        style={{ width: SmartScreenBase.smPercenWidth * 60 }}
                        minimumValue={0}
                        maximumValue={duration}
                        minimumTrackTintColor="#e82944"
                        maximumTrackTintColor="#FFFFFF"
                        thumbTintColor="#FFFFFF"
                        value={valueSlider}
                        onSlidingComplete={(value) => _onSlidingComplete(value)}
                        onValueChange={(value) => _onValueChange(value)}
                    />
                </View>
            </View>
        </View>
    );
};

const _renderResourceText = () => {
    return (
        <View style={{
            height: SmartScreenBase.smPercenHeight * 30,
            width: SmartScreenBase.smPercenWidth * 90,
            justifyContent: 'center', alignItems: 'center',
        }}>
            {
                resource.type === 'img'
                    ?
                    <Image
                        resizeMode={'contain'}
                        source={{ uri: baseUrl + resource.path }}
                        style={{
                            height: SmartScreenBase.smPercenHeight * 30,
                            width: SmartScreenBase.smPercenWidth * 80,
                        }}
                    />
                    :
                    <ScrollView style={{ padding: SmartScreenBase.smPercenWidth * 2 }}>
                        <Text>
                            {resource.content}
                        </Text>
                    </ScrollView>
            }
        </View>
    );
};

const _renderModalResource = () => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
        >
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                backgroundColor: '#00000080',
            }}>
                <View style={{
                    width: SmartScreenBase.smPercenWidth * 90,
                    backgroundColor: '#fff',
                    borderRadius: SmartScreenBase.smPercenWidth * 5,
                    height: resource ? resource.type === 'audio' ? SmartScreenBase.smPercenHeight * 30 : SmartScreenBase.smPercenHeight * 40 : SmartScreenBase.smPercenHeight * 30,
                    // justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#eef7ff',
                        height: SmartScreenBase.smPercenHeight * 8,
                        borderTopLeftRadius: SmartScreenBase.smPercenWidth * 5,
                        borderTopRightRadius: SmartScreenBase.smPercenWidth * 5,
                    }}>
                        <View style={{
                            flex: 1.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // margin: SmartScreenBase.smPercenHeight * 3
                        }}>
                            <Image
                                source={{ uri: 'cogiao' }} style={{
                                    width: SmartScreenBase.smPercenHeight * 6,
                                    height: SmartScreenBase.smPercenHeight * 6,
                                }} />
                        </View>
                        <View style={{
                            flex: 5,
                            // alignItems: 'center',
                            // justifyContent: 'center'
                        }}>
                            <Text style={{ fontStyle: 'italic', paddingBottom: SmartScreenBase.smPercenWidth }}>Giáo
                                    viên</Text>
                            <Text style={{ fontWeight: 'bold' }}>
                                {
                                    resource
                                        ?
                                        resource.fullname
                                        :
                                        null
                                }
                            </Text>
                        </View>
                        <TouchableOpacity style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            onPress={() => setShowModal(false)}
                        >
                            <Image
                                source={{ uri: 'xbtn' }} style={{
                                    width: SmartScreenBase.smPercenHeight * 2,
                                    height: SmartScreenBase.smPercenHeight * 2,
                                }} />
                        </TouchableOpacity>
                    </View>
                    {
                        resource
                            ?
                            resource.type === 'audio' || resource.type === 'video'
                                ?
                                _renderResourceAudioVideo()
                                :
                                _renderResourceText()
                            : null
                    }
                </View>
            </View>
        </Modal>
    );
};

const _renderModalFeedback = () => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    backgroundColor: '#00000080',
                }}>
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 90,
                        backgroundColor: '#fff',
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    }}>
                        <Image
                            source={{ uri: 'phanhoianh' }} style={{
                                width: SmartScreenBase.smPercenWidth * 20,
                                height: SmartScreenBase.smPercenHeight * 3,
                                margin: SmartScreenBase.smPercenHeight * 2,
                            }}
                            resizeMode={'contain'}
                        />
                        <View style={{ width: '100%', marginBottom: SmartScreenBase.smPercenHeight }}>
                            <Text style={{ fontStyle: 'italic' }}>Hãy viết phản hồi của bạn</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => textInput.current.focus()}>
                            <View style={{
                                width: '100%',
                                borderWidth: 1,
                                height: SmartScreenBase.smPercenHeight * 15,
                                borderColor: '#565656',
                                borderRadius: SmartScreenBase.smPercenWidth * 2,
                            }}>
                                <TextInput
                                    ref={textInput}
                                    style={{
                                        width: '100%',
                                        padding: SmartScreenBase.smPercenWidth * 2,
                                    }}
                                    onChangeText={(text) => setValueFeedback(text)}
                                    multiline={true}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            margin: SmartScreenBase.smPercenHeight * 2,
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#01283a',
                                    width: SmartScreenBase.smPercenWidth * 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: SmartScreenBase.smPercenWidth * 20,
                                }}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ color: '#fff', padding: SmartScreenBase.smPercenHeight }}>Huỷ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={valueFeedback ? false : true}
                                style={{
                                    backgroundColor: valueFeedback ? '#01283a' : '#01283a80',
                                    width: SmartScreenBase.smPercenWidth * 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: SmartScreenBase.smPercenWidth * 20,
                                }}
                                onPress={() => _feedBack()}
                            >
                                <Text style={{ color: '#fff', padding: SmartScreenBase.smPercenHeight }}>Gửi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const handleKeyboardShow = (e) => {
    setHideStatusBar(true);
    Animated.timing(marginTop, {
        toValue: e,
        duration: 500,
    }).start();
};

const handleKeyboardHide = () => {
    setHideStatusBar(false);
    Animated.timing(marginTop, {
        toValue: 0,
        duration: 500,
    }).start();
};

const onPressOut = () => {
    LogBase.log("=====onPressOut",skill.toLowerCase())
    if (skill.toLowerCase() === 'listening' || skill.toLowerCase() === 'pronunciation' || skill.toLowerCase() === 'speaking'){
        LogBase.log("=====onPressOut","helo")
        EventBus.getInstance().fireEvent("sound_should_pause", {})
    }
}

if (showGuide != null && showGuide.length > 0) {
    LogBase.log("=====showGuide",showGuide)
    return <StudentGuide
        onPressDo={() => {
            setShowGuide(null)
            getDataQuestionDone(questionData.current)
        }}
        navigation={navigation}
        data={showGuide} />
}

return (
    resultView
        ?
        <ResultLesson isHomework={data.lesson_homework} isMasterUnit={isMasterUnit} skill={skill} data={dataResult} name={name} isTeacher={dataLogin.role === 'teacher'}
            goBack={() => {
                const cb = navigation.getParam('cb');
                if (cb) {
                    cb();
                    LogBase.log("=====reload start")
                }
                MyData.isDoneExe = true
                navigation.goBack()
        }} />
        :
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ImageBackground
                source={{ uri: 'imagebackgroundlesson' }}
                imageStyle={stylesApp.ImageBackGround}
                imageStyle={{resizeMode: 'cover'}}
                style={{ flex: 1}}>
                <StatusBar hidden={hideStatusBar} barStyle='light-content' translucent={Platform.OS === 'android'} backgroundColor='transparent' />
                <Animated.View style={{ flex: 1, marginTop: marginTop }}>
                    <TypeExercise vietnam={vietnam}
                        english={english}
                        typeExercise={typeExercise}
                        type={'lesson'}
                        goBack={() => navigation.goBack()}
                        indexQuestion={indexQuestion}
                        totalQuestion={totalQuestion}
                        show={show}
                        onPressOut={onPressOut}
                        isTeacher={dataLogin.role === 'teacher'}
                    />
                    {
                        isLoading
                            ?
                            // <ImageBackground
                            //     source={{ uri: 'imagebackgroundlesson' }}
                            //     imageStyle={stylesApp.ImageBackGround}
                            //     imageStyle={{resizeMode: 'cover'}}
                            //     style={{ flex: 1, position: 'absolute', zIndex: 1000}}>
                                <View style={{position: 'absolute', zIndex: 1000, width: SmartScreenBase.smPercenWidth*100, height: SmartScreenBase.smPercenHeight*120, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000070'}}>
                                <Image
                                    source={require('../../assets/eloading.gif')}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        resizeMode: 'contain',
                                    }}
                                    />
                                </View>
                            // </ImageBackground>
                            :
                            null
                    }
                    {/* {
                        showFeedback
                            ?
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: SmartScreenBase.smPercenHeight * 10,
                                    zIndex: 100,
                                    right: SmartScreenBase.smPercenWidth * 8,
                                }}
                                onPress={() => setModalVisible(true)}
                            >
                                <Image
                                    source={{ uri: 'phanhoianh' }} style={{
                                        width: SmartScreenBase.smPercenWidth * 20,
                                        height: SmartScreenBase.smPercenHeight * 3,
                                        tintColor: '#fff',
                                    }}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>
                            :
                            null
                    } */}
                    {listLesson()}
                    {_renderModalResource()}
                    {/* {_renderModalFeedback()} */}
                </Animated.View>
            </ImageBackground>
        </TouchableWithoutFeedback>
);
};

export default ListLesson;
