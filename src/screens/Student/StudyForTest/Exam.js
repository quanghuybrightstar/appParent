import React, {useState, useEffect, useMemo} from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    Modal,
    Alert,
    Platform,
    BackHandler,
    Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import {stylesExam, stylesHistory} from './styles';
import QuestionTrueFalse from '../../../component/StydyForTest/QuestionTrueFalse';
import QuestionMultipleChoice from '../../../component/StydyForTest/QuestionMultipleChoice';
import QuestionFillTheBlank from '../../../component/StydyForTest/QuestionFillTheBlank';
import QuestionFillTheBlankFixed from '../../../component/StydyForTest/QuestionFillTheBlankFixed';
import AnswerTheQuestion from '../../../component/StydyForTest/AnswerTheQuestion';
import WritingQuestion from '../../../component/StydyForTest/WritingQuestion';
import QuestionFillTheSentence from '../../../component/StydyForTest/QuestionFillTheSentence';
import RewriteWithTheGivenWords from '../../../component/StydyForTest/RewriteWithTheGivenWords';
import {ButtonGradien,ButtonMedium} from '../../../commons/Button';
import Utils from '../../../utils/stringUtils';
import stringUtils from '../../../utils/stringUtils';
import SpeakingQuestion from '../../../component/StydyForTest/SpeakingQuestion';
import apiBase from '../../../base/APIBase';
import RNFetchBlob from 'rn-fetch-blob';
import {QuestionHeaderFillInBlank,QuestionHeader,QuestionHeaderListen} from '../../../component/StydyForTest/QuestionHeader'
import FontBase from '../../../base/FontBase';
import { AppHeader } from '../../../componentBase/AppHeader';
import MyData from '../../../component/MyData';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import LogBase from '../../../base/LogBase';
import StudentGuide from '../../../component/learn/StudentGuide';
import cloneDeep from 'lodash/cloneDeep';

const styles = stylesExam;
let data_answer = [];

const num2digit=(n)=>{
    return n>9?(n+''):('0'+n);
}

const TimeCounter=({duration,onTimeOut,onTimeChange,stop})=>{
    const [time,setTime] = React.useState(duration)
    const _interval = React.useRef(null);

    React.useEffect(()=>{
        if(stop){
            clearInterval(_interval.current)
        }
    },[stop])

    React.useEffect(()=>{
        if(time<=0){
            clearInterval(_interval.current)
            onTimeOut()
        }
        onTimeChange(time)
    },[time])

    React.useEffect(()=>{
        if(stop) return
        setTime(duration);
        _interval.current = setInterval(()=>{
            setTime(t=>t-1);
        },1000);
        return ()=>{
            clearInterval(_interval.current)
        }
    },[duration])

    return <View style={styles.time}>
        <Text style={styles.timer}>{`${num2digit(Math.floor(time/60))}:${num2digit(time%60)}`}</Text>
    </View>
}

const Exam = ({navigation}) => {
    const id = navigation.getParam('id');
    const name = navigation.getParam('name');
    const purpose = navigation.getParam('purpose');
    const check_Box = navigation.getParam('checkBox');
    const dataAnswer = navigation.getParam('data_answer');
    const indexChoose = navigation.getParam('indexChoose');
    const lessonInfo = navigation.getParam('lessonInfo')
    const _typeTest = navigation.getParam('type')||'mock_test'
    const isMasterUnit = navigation.getParam('isMasterUnit');
    const isTeacher = navigation.getParam('isTeacher');
    const [isLoading, setIsLoading] = useState(true);
    const [indexQuestion, setIndexQuestion] = useState(0);
    const [listQuestion, setListQuestion] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [statusModal, setStatusModal] = useState('back');
    const [checkBox, setCheckBox] = useState([]);
    const [answerUser,setAnswerUser] = useState([]);
    const [duration,setDuration] = React.useState(1000000);
    const [done,setDone] = React.useState(false);
    const _examData = React.useRef(null);
    const _header = React.useRef(null);
    const [disableNext,setDisableNext] = React.useState(false);
    const [isRecoder,setIsRecoder] = React.useState(false);
    const [begin,setBegin] = React.useState(true);
    const [masterUnitID,setMasterUnitID] = useState(null);
    const [dataGui,setDataGui] = useState([]);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
      }, []);

      const _keyboardDidShow = () => {
        setDisableNext(true)
      };

      const _keyboardDidHide = () => {
        setDisableNext(false)
      };

      const onRecording = (isReco) => {
        setIsRecoder(true)  
        setDisableNext(isReco)
      };
      
    useEffect(()=>{
        const backAction = () => {
            _goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    },[])

    useEffect(() => {
        data_answer = [];
        try {
            for (let i = 0; i < listQuestion.length; i++) {
                let detail_user_turn = [];
                let user_turn = {};
                user_turn['num_turn'] = 1;
                user_turn['score'] = 0;
                user_turn['user_choice'] = '';
                detail_user_turn.push(user_turn);
                let data = {};
                data['question_id'] = listQuestion[i].question_id;
                data['exercise_type'] = listQuestion[i].list_option[0].skill;
                data['question_type'] = listQuestion[i].list_option[0].question_type;
                data['question_data'] = JSON.stringify(listQuestion);
                data['final_user_choice'] = '';
                data['detail_user_turn'] = detail_user_turn;
                data['question_score'] = 0;
                data_answer.push(data);
            }
        } catch (error) {
            console.log("=====Loi du lieu",error)
            Alert.alert("","Bài kiểm tra này đang bị lỗi dữ liệu, xin hãy chọn bài khác", [
                {text: 'Trở về', style: 'cancel', onPress: () => navigation.goBack()}
            ])
        }

    }, [listQuestion]);
    useEffect(() => {
        if (indexChoose!=null) {
            data_answer = dataAnswer;
            setCheckBox(check_Box);
            setIndexQuestion(indexChoose);
        }
    }, [indexChoose]);
    useEffect(() => {
        if(isMasterUnit){
            _startMockTestFromMasterUnit();
        }else if(_typeTest == 'placement_test'){
            _startPlacementTest();
        }else{
            _startMockTest();
        }
    }, []);

    const _startPlacementTest = () => {
        setIsLoading(true);
        const url = API.baseurl + API.load_placement_test;
        apiBase.postDataJson('get',url)
        .then(res=>{
            setIsLoading(false);
            setBegin(false);
            LogBase.log("=====_startPlacementTest",res.data.exam)
            _processData(res.data)
        }).catch(e=>{
            LogBase.log("=====e:",e)
            setIsLoading(false);
        })
    };

    const _startMockTestFromMasterUnit = () => {
        setIsLoading(true);
        const url = API.baseurl + API.getLessonMasterUnit(id, _typeTest);
        apiBase.postDataJson('get',url)
        .then(res=>{
            LogBase.log("=====_startMockTest",res.data)
            setIsLoading(false);
            setBegin(false);
            _processData(res.data)
            setMasterUnitID(res.data.looking_back_utilize_id)
        }).catch(e=>{
            LogBase.log("=====e:",e)
            setIsLoading(false);
        })
    };

    const _startMockTest = () => {
        setIsLoading(true);
        const url = `${API.baseurl}student/api_exam/exam_v2?id=${id}&type=${_typeTest}&class_id=${lessonInfo?.class_id||0}&unit_id=${lessonInfo?.unit_id||0}&is_homework=${lessonInfo?.lesson_homework ? 1 : 0}`;
        apiBase.postDataJson('get',url)
        .then(res=>{
            LogBase.log("=====_startMockTest new",res.data)
            setIsLoading(false);
            setBegin(false);
            _processData(res.data)
            // saveDataLog()
        }).catch(e=>{
            LogBase.log("=====e:",e)
            setIsLoading(false);
        })
    };

    const _processData=(dataReturn)=>{
        if (dataReturn.status) {
            _examData.current = dataReturn;
            setDuration(60 * parseInt((dataReturn.exam.duration && dataReturn.exam.duration != 0) ? dataReturn.exam.duration : 40));
            if(dataReturn.list_guide_file && dataReturn.list_guide_file.length > 0){
                setDataGui(dataReturn.list_guide_file)
            }
            dataReturn.data_question.forEach(e=>{
                if(!!e.list_option){
                    e.list_option.forEach(o=>{
                        if(!!o.list_option_same){
                            o.list_option_same2 = JSON.parse(o.list_option_same)
                        }
                    })
                    if(e.list_option[0]?.skill=='reading' && e.list_option[0]?.question_type ==3){
                        e.suggestWords = stringUtils.shuffleArray(e.list_option.map(e=>e.match_option_text[0]))
                    }

                    if(e.list_option[0]?.skill=='grammar' && e.list_option[0]?.question_type ==11){
                        e.list_option = fillAtGrammar11(e.list_option)
                    }
                }
            })
            setListQuestion(dataReturn.data_question);
        } else {
            Alert.alert('Thông báo', dataReturn.msg, [
                {text: 'Đồng ý', style: 'cancel'},
            ]);
        }
    }

    const fillAtGrammar11 = (mData) => {

        var cloneList = []
        var resu = stringUtils.shuffleArray(mData.map(e=>e.match_option_text[0]))
        resu = mData.map(e=>e.match_option_text[0])
        var content = mData[0].question_content;
        var ansFromQues = content.match(/\[(.*?)\]/g)
        ansFromQues.forEach(a=>{
            a= a.replace("[","").replace("]","")
            var objClone = cloneDeep(mData[0]);
            LogBase.log("=====a :",a)
            LogBase.log("=====resu :",resu[0])
            objClone.score = resu[0] == a ? 1 : 0;
            objClone.match_option_text[0] = a;
            cloneList.push(objClone)
        })
        return cloneList
    }

    const saveDataLog = async (dataAnswer) => {

        var data = lessonInfo

        if(!data.curriculum_id || _typeTest == 'mock_test'){
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

    const getNumberQuest=(quest)=>{
        const {skill,question_type} = quest.list_option[0];
        if((skill === 'reading' && question_type == 2) ||
            (skill === 'reading' && question_type == 3)||
            (skill == 'grammar' && question_type == 1) ||
            (skill === 'writing' && question_type == 4)||
            (skill === 'reading' && question_type == 11) ||
            (skill === 'writing' && question_type == 2) ||
            (skill === 'writing' && question_type == 3) ||
            (skill === 'writing' && question_type == 5) ||
            (skill === 'reading' && question_type == 12)
        ){
            return quest.list_option.length;
        }
        return 1;
    }

    const getCurrentNum=(idx)=>{
        var count = 0;
        for(let i=0; i < idx; i++){
            count += getNumberQuest(listQuestion[i])
        }
        return count;
    }

    const _showQuestion = (skill,question_type) => {

        const curIndex = getCurrentNum(indexQuestion)
        console.log('=====curIndex '+skill+" "+question_type)

        if(skill==='speaking' && (question_type==2 || question_type==3)){
            return <SpeakingQuestion
                onRecording={onRecording}
                dataQuestion={listQuestion[indexQuestion]}
                question_type={question_type}
                dataAnswer={(index, user_choice) => _dataAnswer(index, user_choice)}
                dataAns={data_answer}
                beginNum={curIndex}
                timeOut={statusModal=='timeout'}
            />
        }

        return (
            (skill === 'reading' && question_type == 2) ||
            (skill === 'reading' && question_type == 3)||
            (skill == 'grammar' && question_type == 1)
                ?
                <QuestionFillTheBlank
                    dataQuestion={listQuestion[indexQuestion]}
                    question_type={question_type}
                    dataAnswer={(index, user_choice) => _dataAnswer(index, user_choice)}
                    dataAns={data_answer}
                    beginNum={curIndex}
                />
                :
                (skill === 'reading' && question_type == 6) ||
                (skill === 'reading' && question_type == 1) ||
                (skill === 'writing' && question_type == 8) ||
                (skill == 'pronunciation' && question_type == 11) ||
                (skill == 'grammar' && question_type == 9) ||
                (skill == 'grammar' && question_type ==11)||
                (skill === 'listening' && question_type == 3)
                    ?
                    <QuestionMultipleChoice
                        dataQuestion={listQuestion[indexQuestion]}
                        question_type={question_type}
                        dataAnswer={(user_choice) => _dataAnswerMultiChoice(user_choice)}
                        dataAns={data_answer}
                        answerChoose = {answerUser}
                        beginNum={curIndex}
                    />
                    :
                    (skill === 'reading' && question_type == 11) ||
                    (skill === 'writing' && question_type == 2) ||
                    (skill === 'writing' && question_type == 3) ||
                    (skill === 'writing' && question_type == 5) ||
                    (skill === 'listening' && question_type == 1)||
                    (skill === 'listening' && question_type == 2)
                        ?
                        <AnswerTheQuestion
                            dataQuestion={listQuestion[indexQuestion]}
                            question_type={question_type}
                            dataAnswer={(index, user_choice) => _dataAnswerQuestion(index, user_choice)}
                            dataAns={data_answer}
                            beginNum={curIndex}
                            isRandom={(skill == 'writing' && question_type == 2) ? true : false}
                        />
                        :
                        (skill === 'reading' && question_type == 12)||
                        (skill === 'listening' && question_type == 5)
                            ?
                            <QuestionTrueFalse
                                dataQuestion={listQuestion[indexQuestion]}
                                question_type={question_type}
                                dataAnswer={(user_choice) => _dataAnswer(0,user_choice)}
                                dataAns={data_answer}
                                beginNum={curIndex}
                            />
                            :
                            (skill === 'writing' && question_type == 4)
                                ?
                                <RewriteWithTheGivenWords
                                    dataQuestion={listQuestion[indexQuestion]}
                                    question_type={question_type}
                                    dataAnswer={(index, user_choice) => _dataAnswer(index, user_choice)}
                                    dataAns={data_answer}
                                    beginNum={curIndex}
                                />
                                :
                            (skill === 'reading' && question_type == 14)||
                            (skill === 'listening' && question_type == 9)
                            ?
                             <QuestionFillTheSentence
                                    dataQuestion={listQuestion[indexQuestion]}
                                    question_type={question_type}
                                    dataAnswer={(index, user_choice) => _dataAnswer(index, user_choice)}
                                    dataAns={data_answer}
                                    beginNum={curIndex}
                                />:
                                null
        );
    };

    const _goBack = () => {
        if(_header.current){
            _header.current.pause();
        }
        setStatusModal('back');
        setModalVisible(true);
    };

    const backAgain = () => {
        navigation.goBack();
    };

    const _renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.viewModal}>
                    <View style={styles.viewContentModal}>
                        {
                            statusModal === 'back'
                                ?
                                _renderBack()
                                :
                                statusModal === 'send'
                                    ?
                                    _renderSend()
                                    :
                                    _renderTimeout()
                        }
                    </View>
                </View>
            </Modal>
        );
    };
    const _renderBack = () => {
        return (
            <View style={styles.viewChildModal}>
                <Text style={{...styles.text_def, textAlign: 'center', fontFamily: FontBase.MyriadPro_Bold}}>Bài kiểm tra vẫn chưa kết
                    thúc</Text>
                <Text style={{...styles.text_def, textAlign: 'center'}}>Câu trả lời của bạn sẽ không được lưu!</Text>
                <Text style={{...styles.text_def, textAlign: 'center'}}>Bạn có chắc chắn muốn thoát không?</Text>
                <View style={styles.viewBtnModal}>
                    <ButtonMedium isSmall outline title={'Đóng'} onPress={() => setModalVisible(false)} />
                    <ButtonMedium isSmall title={'Có'} onPress={() => {
                        setModalVisible(false);
                        navigation.goBack();
                    }} />
                </View>
            </View>
        );
    };

    const _sendTest=async()=>{
        setModalVisible(false);
        // setIsLoading(true);
        setDone(true);

        for(let qu of listQuestion){
            if(!!qu._audioPath){
                try{
                    let resour = await apiBase.uploadFile(API.baseurl + API.uploadResource,[
                        {
                            name: 'file',filename: `exam_${Date.now()}_${qu.question_id}.wav`,
                            data: RNFetchBlob.wrap(qu._audioPath)
                        },
                    ]);
                    const ress = JSON.parse(resour)
                    console.log('upload resource',ress)
                    if(ress.file_id){
                        var ans = data_answer.find(c=>c.question_id == qu.question_id);
                        ans.resource_id = ress.file_id
                        ans.detail_user_turn = [
                            {
                                num_turn:1,
                                score:1,
                                user_choice: '',
                                resource_id: ress.file_id
                            }
                        ]
                    }
                }catch{

                }
            }
        }

        const url = `${API.baseurl}api_log_learning/save_exam_v2`
        const answers = data_answer.map(e=>{
            return {
                exercise_type:e.exercise_type,
                final_user_choice:e.final_user_choice,
                question_id:e.question_id,
                question_score:e.question_score,
                question_type:e.question_type,
                detail_user_turn:e.detail_user_turn,
                // question_data:_typeTest==='mock_test'?e.question_data:'[]',
                resource_id:e.resource_id
            }
        })

        console.log('answers',answers)
        const data={
            data_exam:JSON.stringify(_examData.current.exam),
            data_answer:JSON.stringify(answers),
            type:_typeTest,
            exam_id:_examData.current.exam.id,
            unit_id:lessonInfo?.unit_id,
            class_id:lessonInfo?.class_id,
            user_exam_result_id: _examData.current.user_exam_result_id,
            is_homework: lessonInfo?.lesson_homework ? 1 : 0,
            looking_back_utilize_id: masterUnitID
            // data_question: _typeTest==='mock_test'?e.question_data:'[]'
        }
        console.log('==++==data',data)
        apiBase.postDataJson('post',url,JSON.stringify(data)).then(res=>{
            console.log("=====_sendTest done")
            setIsLoading(false);
            if (res.data.status) {
                    if(_typeTest==='mock_test'){ // luyện thi
                        const doAgain = navigation.getParam('doAgain');
                        if(doAgain){
                            console.log('gotoKQTest 1')
                            navigation.navigate(isTeacher ? 'TeacherResultTest' : 'ResultStudyForTest', {
                                data: res.data,
                                id: id,
                                name,
                                user_exam_result_id:_examData.current.user_exam_result_id,
                                listQuestion:listQuestion,
                                type:_typeTest,
                                answers:answers,
                                doAgain:doAgain,
                                draw:navigation.getParam('draw') + 1,
                                isTeacher: isTeacher,
                            });
                        }else{
                            // navigation.popToTop({immediate:true})
                            // console.log('=====gotoKQTest 2',_examData.current)
                            // navigation.navigate(isTeacher ? 'TeacherResultTest' : 'ResultStudyForTest', {
                            //     data: res.data,
                            //     id: id,
                            //     name,
                            //     user_exam_result_id:_examData.current.user_exam_result_id,
                            //     listQuestion:listQuestion,
                            //     type:_typeTest,
                            //     answers:answers,
                            //     isTeacher: isTeacher
                            // });

                            navigation.dispatch(
                                navigation.replace(isTeacher ? 'TeacherResultTest' : 'ResultStudyForTest', {
                                    data: res.data,
                                    id: id,
                                    name,
                                    user_exam_result_id:_examData.current.user_exam_result_id,
                                    listQuestion:listQuestion,
                                    type:_typeTest,
                                    answers:answers,
                                    isTeacher: isTeacher
                                })
                              );
                        }
                    }else if(_typeTest == 'placement_test'){
                        navigation.popToTop({immediate:true})
                        navigation.navigate('ExpectCuri')
                    }else{
                        MyData.isDoneExe = true
                        navigation.dispatch(
                            navigation.replace(isTeacher ? 'TeacherResultTest' : 'ResultStudyForTest', {
                                data: res.data,
                                id: id,
                                name,
                                user_exam_result_id:_examData.current.user_exam_result_id,
                                listQuestion:listQuestion,
                                exam_id: _examData.current.exam.id,
                                is_homework: lessonInfo?.lesson_homework ? 1 : 0,
                                type:_typeTest,
                                answers:answers,
                                cb: navigation.getParam('cb'),
                                isTeacher: isTeacher
                                // back: backAgain()
                            })
                          );

                        console.log('gotoKQTest 3',navigation.getParam('cb'))
                    }
            } else {
                Alert.alert('Thông báo', res.data.msg, [
                    {text: 'Đồng ý', style: 'cancel'},
                ]);
            }
        }).catch(e=>{
            console.log("=====Lỗi g",e)
            setIsLoading(false);
        })
    }
    const _renderSend = () => {
        return (
            <View style={styles.viewChildModal}>
                <Text style={{...styles.text_def, textAlign: 'center',marginHorizontal:SmartScreenBase.smPercenWidth*3}}>Bạn có chắc chắn muốn nộp bài trước thời
                    hạn?</Text>
                <View style={styles.viewBtnModal}>
                    <ButtonMedium isSmall outline title={'Đóng'} onPress={() => setModalVisible(false)} />
                    <ButtonMedium isSmall title={'Có'} onPress={_sendTest} />
                </View>
            </View>
        );
    };

    const _renderTimeout = () => {
        return (
            <View style={styles.viewChildModal}>
                <Text style={{...styles.text_def, textAlign: 'center',marginHorizontal:SmartScreenBase.smPercenWidth*3}}>Đã hết thời gian làm bài! Bài của bạn sẽ tự động
                    thu.</Text>
                <View style={{...styles.viewBtnModal, justifyContent: 'center'}}>
                    <ButtonMedium isSmall title={'Đồng ý'} onPress={() =>_sendTestTimeOut() } />
                </View>
            </View>
        );
    };

    const _dataAnswer = (index, user_choice) => {
        LogBase.log("=====_dataAnswer")
        const quest = listQuestion[indexQuestion];
        const opt = quest.list_option[index];
        let u_c = Utils.validWord(user_choice);
        let score =  u_c === Utils.validWord(opt.match_option_text[0]) ? 1 : 0;

        if(score ==0 && !!opt.list_option_same2){
            score = opt.list_option_same2.find(c=>Utils.validWord(c)===u_c) !=null?1:0;
        }


        var answer = data_answer.find(c=>c.question_id === quest.question_id);
        if(!answer){
            answer = {
                question_id: quest.question_id,
                exercise_type: opt.skill,
                question_type: opt.question_type,
                question_data: JSON.stringify(listQuestion),
                final_user_choice: user_choice,
                detail_user_turn:[],
                question_score: score,
            }
            data_answer.push(answer);
        }
        answer.detail_user_turn[index] = {
            num_turn:1,
            score:score,
            user_choice: user_choice,
        }
        answer.question_score = answer.detail_user_turn.filter(c=>c.score == 1).length;
        answer.final_user_choice = user_choice;
    };
    const _dataAnswerQuestion=(index, user_choice) => {
        const quest = listQuestion[indexQuestion];
        const opt = quest.list_option[index];
        let u_c = Utils.validWord(user_choice);
        var mMatch_option_text = opt.match_option_text[0]

        let score =  u_c === Utils.validWord(mMatch_option_text||opt.option_text) ? 1 : 0;
        if(score ==0 && !!opt.list_option_same2){
            score = opt.list_option_same2.find(c=>Utils.validWord(c)===u_c) !=null?1:0;
        }

        var answer = data_answer.find(c=>c.question_id === quest.question_id);
        if(!answer){
            answer = {
                question_id: quest.question_id,
                exercise_type: opt.skill,
                question_type: opt.question_type,
                question_data: JSON.stringify(listQuestion),
                final_user_choice: user_choice,
                detail_user_turn:[],
                question_score: score,
            }
            data_answer.push(answer);
        }
        answer.detail_user_turn[index] = {
            num_turn:1,
            score:score,
            user_choice: user_choice,
        }
        answer.question_score = answer.detail_user_turn.filter(c=>c.score == 1).length;
        answer.final_user_choice = user_choice;
    };
    const _dataAnswerMultiChoice = (indexMultiChoice) => {
        const quest = listQuestion[indexQuestion];
        let score = quest.list_option[indexMultiChoice].score;
        var answer = data_answer.find(c=>c.question_id === quest.question_id);
        if(!answer){
            answer = {
                question_id: quest.question_id,
                exercise_type: quest.list_option[indexMultiChoice].skill,
                question_type: quest.list_option[indexMultiChoice].question_type,
                question_data: JSON.stringify(listQuestion),
                final_user_choice: quest.list_option[indexMultiChoice].match_option_text[0],
                detail_user_turn:[],
                question_score: score,
            }
            data_answer.push(answer);
        }
        answer.detail_user_turn[0] = {
            num_turn:1,
            score:score,
            user_choice: quest.list_option[indexMultiChoice].match_option_text[0],
        }
        answer.question_score = answer.detail_user_turn.filter(c=>c.score == 1).length;
    };
    const _send = () => {
        if(_header.current){
            _header.current.pause();
        }
        setStatusModal('send');
        setModalVisible(true);
    };
    const _sendTestTimeOut=()=>{
        setModalVisible(false)
        _sendTest();
    }

    const _renderContent = useMemo(() => {
        if(listQuestion.length==0)
            return null;
        const quest = listQuestion[indexQuestion];
        let skill = quest.list_option[0].skill;
        let question_type = parseInt(quest.list_option[0].question_type);
        console.log('_renderContent',quest)
        console.log(skill,question_type);


        if((skill === 'reading' && question_type == 4)){
            return <View style={styles.content2}>
                    <QuestionFillTheBlankFixed
                        dataQuestion={listQuestion[indexQuestion]}
                        question_type={question_type}
                        dataAnswer={(index, user_choice) => _dataAnswer(index, user_choice)}
                        dataAns={data_answer}
                        beginNum={getCurrentNum(indexQuestion)}
                        header={()=>{
                            return <QuestionHeaderFillInBlank ref={_header} data={quest.list_option[0]}/>
                        }}
                    />
            </View>
        }
        if(skill ==='writing' && question_type == 7){
            return <View style={styles.content2}>
                        <WritingQuestion
                            dataQuestion={listQuestion[indexQuestion]}
                            question_type={question_type}
                            dataAnswer={(index, user_choice) => _dataAnswer(index, user_choice)}
                            dataAns={data_answer}
                            beginNum={getCurrentNum(indexQuestion)}
                            header={()=>{
                                return <QuestionHeader  ref={_header} data={quest.list_option[0]}/>
                            }}
                        />
            </View>
        }

        return (
            <View style={styles.content2}>
                <KeyboardAwareScrollView
                    style={styles.view_question}
                    extraScrollHeight={
                    (skill === 'reading' && question_type == 11) ||
                    (skill === 'writing' && question_type == 2) ||
                    (skill === 'writing' && question_type == 3) ||
                    (skill === 'writing' && question_type == 5) ||
                    (skill === 'listening' && question_type == 1)||
                    (skill === 'listening' && question_type == 2) 
                    ? SmartScreenBase.smPercenHeight*12.5 : 0}
                    enableOnAndroid={false}
                    nestedScrollEnabled
                    onKeyboardWillShow={(frames) => {

                        console.log('Keyboard event', frames)
                      }}
                >
                    <View style={{
                        flex:1,
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                    }}>
                        {
                            skill==='listening'?
                            <QuestionHeaderListen  ref={_header} data={quest.list_option[0]}/>
                            :
                            <QuestionHeader  ref={_header} data={quest.list_option[0]}/>
                        }
                        {
                            _showQuestion(skill,question_type)
                        }
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }, [listQuestion, indexQuestion,statusModal]);

    const _setCheckBox = () => {
        let checkB = [...checkBox];
        let c = false;
        checkB.forEach((item, index) => {
            if (item === indexQuestion) {
                checkB.splice(index,1);
                c = true;
                return false;
            }
        });
        if (!c) {
            checkB.push(indexQuestion);
        }
        setCheckBox(checkB);
    };

    const onTimeChange=(t)=>{

    }
    const onTimeOut=()=>{
        setStatusModal('timeout');
        setTimeout(()=>{
            setModalVisible(true);
        },300)
    }

    return (
        <View
            style={{flex: 1}}>
            <AppHeader title={_typeTest == 'mock_test' ? 'Làm bài thi' : 'Làm bài kiểm tra'} leftIconOnPress={() => {
                _goBack()
            }}
            rightComponent={() => (
                <ButtonSend onPress={() => _send()}/>
            )}
            />
            <View style={styles.contents}>
                <View style={styles.header_content}>
                    <TouchableOpacity
                        style={styles.total_question}
                        onPress={() => {
                            if(_header.current){
                                _header.current.pause();
                            }
                            navigation.navigate(isTeacher ? 'TeacherOverView' : 'OverView', {
                                length: listQuestion.length,
                                isTeacher,
                                data_answer,
                                checkBox,
                                id,
                                name,
                                purpose
                            })
                        }}
                    >
                        <Text
                            style={{
                                ...styles.text_def,
                                padding: SmartScreenBase.smPercenWidth * 2,
                                fontFamily: FontBase.MyriadPro_Regular
                            }}>
                            {listQuestion.length > 0 ? (`${indexQuestion + 1 > 9 ? indexQuestion + 1 : `0${indexQuestion + 1}`}/${listQuestion.length > 9 ? listQuestion.length :  `0${listQuestion.length}`}`) : ""}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.preview}>
                        <TouchableOpacity
                            onPress={() => _setCheckBox()}
                        >
                            <Image source={{uri: checkBox.indexOf(indexQuestion) !== -1 ? 'checkboxanh' : 'checkboxthi'}}
                            resizeMode={'contain'} style={styles.img_checkbox}/>
                        </TouchableOpacity>
                        <Text style={{
                            ...styles.text_def,
                            paddingLeft: SmartScreenBase.smPercenWidth * 3,
                            fontFamily: FontBase.MyriadPro_Regular,
                        }}>Xem lại sau</Text>
                    </View>
                </View>
                {_renderContent}
                {
                    !begin&&<View style={[styles.footer,{
                        marginBottom: !isRecoder && disableNext && Platform.OS==='android'?-SmartScreenBase.smPercenHeight*12:0
                    }]}>
                        <ButtonGradien
                            disabled={indexQuestion === 0}
                            onPress={() => {if(!disableNext) setIndexQuestion(indexQuestion => indexQuestion - 1)}}
                        >
                            <Image
                                source={require('../../../assets/image/prev_2.png')}
                                resizeMode={'contain'} style={{...styles.img_nextback}}/>
                        </ButtonGradien>
                        <TimeCounter
                            stop={done}
                            duration={duration}
                            onTimeOut={onTimeOut}
                            onTimeChange={onTimeChange}/>
                        <ButtonGradien
                            disabled={listQuestion.length - 1 === indexQuestion}
                            onPress={() => {if(!disableNext) setIndexQuestion(indexQuestion => indexQuestion + 1)}}
                        >
                            <Image source={require('../../../assets/image/next_2.png')}
                                resizeMode={'contain'} style={styles.img_nextback}/>
                        </ButtonGradien>
                    </View>
                }
            </View>
            {_renderModal()}
            {dataGui.length > 0 && 
             <View style={{position: 'absolute', left: 0, top: 0, height: '100%', width: '100%'}}>
                <StudentGuide
                onPressDo={() => {
                    setDataGui([])
                    // getDataQuestionDone(questionData.current)
                }}
                navigation={navigation}
                data={dataGui} />
                </View>
                }
            <FullScreenLoadingIndicator visible={isLoading}/>
        </View>
    );
};

const ButtonSend=({onPress})=>{
    return <TouchableOpacity
    onPress={onPress}
    style={{
        backgroundColor:'#fff',
        borderRadius:SmartScreenBase.smPercenWidth*5,
        paddingVertical:SmartScreenBase.smPercenHeight/2,
        paddingHorizontal:SmartScreenBase.smPercenWidth*6,
        marginRight:SmartScreenBase.smPercenWidth*4,
        borderColor:'#00b9b7',
        borderWidth:2
    }}>
        <Text style={{color:'#00b9b7',fontSize: SmartScreenBase.smFontSize* 45, fontFamily: FontBase.MyriadPro_Bold}}>Nộp bài</Text>
    </TouchableOpacity>
}

export default Exam;
