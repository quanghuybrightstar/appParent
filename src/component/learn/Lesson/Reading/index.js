import React, { useState, useEffect, useRef } from 'react';
import {Text, View, Dimensions, Animated, TouchableOpacity, Image, ImageBackground, Alert} from 'react-native';
import ReadingF1 from './ReadingF1';
import ReadingF2 from './ReadingF2';
import ReadingF3 from './ReadingF3';
import ReadingF4 from './ReadingF4';
import ReadingF5 from './ReadingF5';
import ReadingF6 from './ReadingF6';
import ReadingF7 from './Reading7new';
import ReadingF8 from './ReadingD8';
import ReadingF9 from './readingD9';
import ReadingF10 from './Reading10New';
import ReadingF11 from './Reading11new';
import ReadingF12 from './ReadingF12';
import ReadingF13 from './Reading13new';
import ReadingF14 from './ReadingF14';
import stylesApp from '../../../styleApp/stylesApp';
import StyleLesson from '../StyleLesson';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ModalTranSlate from '../../../modalTranslate';
import PronunciationD1 from '../Pronunciation/PronunciationD1';
import WrittingD2 from '../Writting/WrittingD2';

const Reading = (props) => {
    const {lesson_id, question_type, mode, group_id, dataContent} = props;

    const _render = () => {
        console.log('question_type',question_type)
        switch (question_type) {
            case '1':
                return (
                    <ReadingF1
                        group_id={group_id}
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
                    <ReadingF2
                        group_id={group_id}
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
            case '3':
                return (
                    <ReadingF3
                        group_id={group_id}
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
            case '4':
                return (
                    <ReadingF4
                        group_id={group_id}
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
            case '5':
                return (
                    <ReadingF5
                        group_id={group_id}
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
            case '6':
                return (
                    <ReadingF6
                        group_id={group_id}
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
                        setLoading={(loading) => props.setLoading(loading)}
                    />
                );
            case '7':
                return (
                    <ReadingF7
                        group_id={group_id}
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
            case '8':
                return (
                    <ReadingF8
                        group_id={group_id}
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
            case '9':
                return (
                    <ReadingF9
                        group_id={group_id}
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
            case '10':
                return (
                    <ReadingF10
                        group_id={group_id}
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
            case '11':
                return (
                    <ReadingF11
                        group_id={group_id}
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
                        navigation={props.navigation}
                        show={(value)=>props.show(value)}
                        isTeacher={props.isTeacher}
                    />
                );
            case '12':
                return (
                    <ReadingF12
                        group_id={group_id}
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
            case '13':
                return (
                    <ReadingF13
                        group_id={group_id}
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
                        setLoading={(loading) => props.setLoading(loading)}
                    />
                );
            case '14':
                return (
                    <ReadingF14
                        group_id={group_id}
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
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                        setLoading={(loading) => props.setLoading(loading)}
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

export default Reading;
