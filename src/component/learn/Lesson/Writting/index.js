import React,{useState,useEffect} from 'react';
import {
    Text,
    View,
    Animated,
    ImageBackground,
    Alert,
    TouchableOpacity,
    Image,
} from 'react-native';
import MyData from '../../../../component/MyData';
import WrittingD1 from './WrittingD1';
import WrittingD3 from './WrittingD3';
import WrittingD2 from './WrittingD2';
import WrittingD4 from './WrittingD4';
import WrittingD5 from './WrittingD5';
import WrittingD6 from './WrittingD6';
import WrittingD7 from './WrittingD7';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ModalTranSlate from '../../../modalTranslate';
import ListeningD7 from '../Listening/ListeningD7';
import ListeningD5 from "../Listening/ListeningD5";
import Speaking from '../Speaking';
import PronunciationF11 from '../Pronunciation/PronunciationF11';
import Grammar from '../Grammar';

const Writing = (props) => {
    const {lesson_id, question_type, mode, dataContent, reviewResult, Type, class_id,dataLesson} = props;
    const [type, settype] = useState(Type);
    const _onPressOut = () => {
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn thoát bài học không ?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'OK',
                    onPress: () => props.goBack(),
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
    };

    const _render = () => {
        switch (question_type) {
            case '1':
                return (
                    <WrittingD5
                        lesson_id={lesson_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        checkType= {mode === 'lesson'?'exam':type}
                        dataContent={dataContent}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            case '2':
                return (
                    <WrittingD1
                        lesson_id={lesson_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        checkType= {mode === 'lesson'?'exam':type}
                        dataContent={dataContent}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            case '3':
                return (
                    <WrittingD4
                        lesson_id={lesson_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        checkType= {mode === 'lesson'?'exam':type}
                        dataContent={dataContent}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '4':
                return (
                    <WrittingD3
                        lesson_id={lesson_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        checkType= {mode === 'lesson'?'exam':type}
                        dataContent={dataContent}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '5':
                return (
                    <WrittingD2
                        lesson_id={lesson_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        checkType= {mode === 'lesson'?'exam':type}
                        dataContent={dataContent}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '6':
                return (
                    <WrittingD6
                        lesson_id={lesson_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        dataContent={dataContent}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            case '7':
                return (
                    <WrittingD7
                        isTeacher={props.isTeacher}
                        lesson_id={lesson_id}
                        class_id={class_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        dataContent={dataContent}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        lesson_homework ={props.lesson_homework}
                        user_received_id ={props.user_received_id}
                        go_back={props}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        dataLesson={dataLesson}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={{flex: 1}}>
            {_render()}
            <ModalTranSlate/>
        </View>
    );
};

export default Writing;
