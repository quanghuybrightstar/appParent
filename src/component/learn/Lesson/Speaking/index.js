import React, {Component} from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import SpeakD1 from './SpeakingD1';
import SpeakD2 from './SpeakingD2New';
import SpeakD3 from './SpeakingD3';
import stylesApp from '../../../styleApp/stylesApp';
import StyleLesson from '../StyleLesson';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ModalTranSlate from '../../../modalTranslate';
import ReadingF1 from '../Reading/ReadingF1';

const Speaking = (props) => {
    const {group_id, question_type, mode, dataContent, lesson_id} = props;

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
    }

    const _render = () => {
        switch (question_type) {
            case '1':
                return (
                    <SpeakD1
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            case '2':
                return (
                    <SpeakD2
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            case '3':
                return (
                    <SpeakD3
                        isTeacher={props.isTeacher}
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        dataContent={dataContent}
                        lesson_homework ={props.lesson_homework}
                        user_received_id = {props.user_received_id}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        dataLesson={props.dataLesson}
                        go_back={props}
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

export default Speaking;
