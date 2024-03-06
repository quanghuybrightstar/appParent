import React, {useState, useEffect} from 'react';
import {View, ImageBackground} from 'react-native';
import PronunciationD1 from './PronunciationD1';
import PronunciationF2 from './PronunciationF2';
import PronunciationD3 from './PronunciationD3';
import PronunciationF4 from './PronunciationF4';
import PronunciationF5 from './PronunciationF5';
import PronunciationD6 from './PronunciationD6';
import PronunciationD7 from './PronunciationD7';
import PronunciationD8 from './PronunciationD8';
import PronunciationF9 from './PronunciationF9';
import PronunciationF10 from './PronunciationF10';
import PronunciationF11 from './PronunciationF11';
import ReadingF9 from '../Reading/readingD9';
import Reading from '../Reading';

const Pronunciation = (props) => {
    const {lesson_id, question_type, mode, group_id, dataContent} = props;

    useEffect(() => {
        if (!question_type) {
            alert("Không tìm thấy dạng bài")
            props.goBack();
        }
    }, []);

    const _render = () => {
        switch (question_type) {
            case '1':
                return (
                    <PronunciationD1
                        group_id={group_id}
                        lesson_id={lesson_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        goBack={() => props.goBack()}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            case '2':
                return (
                    <PronunciationF2
                        lesson_id={lesson_id}
                        group_id={group_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        goBack={() => props.goBack()}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            case '3':
                return (
                    <PronunciationD3
                        lesson_id={lesson_id}
                        group_id={group_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        goBack={() => props.goBack()}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            case '4':
                return (
                    <PronunciationF4
                        lesson_id={lesson_id}
                        group_id={group_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        goBack={() => props.goBack()}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            case '5':
                return (
                    <PronunciationF5
                        lesson_id={lesson_id}
                        group_id={group_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        goBack={() => props.goBack()}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            case '6':
                return (
                    <PronunciationD6
                        lesson_id={lesson_id}
                        group_id={group_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        goBack={() => props.goBack()}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            case '7':
                return (
                    <PronunciationD7
                        lesson_id={lesson_id}
                        group_id={group_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        goBack={() => props.goBack()}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            case '8':
                return (
                    <PronunciationD8
                        lesson_id={lesson_id}
                        group_id={group_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        goBack={() => props.goBack()}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '9':
                return (
                    <PronunciationF9
                        lesson_id={lesson_id}
                        group_id={group_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        goBack={() => props.goBack()}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            case '10':
                return (
                    <PronunciationF10
                        lesson_id={lesson_id}
                        group_id={group_id}
                        modeF={mode}
                        reviewResult={(data) => props.reviewResult(data)}
                        goBack={() => props.goBack()}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            case '11':
                return (
                    <PronunciationF11
                        lesson_id={lesson_id}
                        group_id={group_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        goBack={() => props.goBack()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            default:
                return null;

        }
    };

    return (
        <View style={{flex: 1}}>
            {
                _render()
            }
        </View>
    );
};

export default Pronunciation;
