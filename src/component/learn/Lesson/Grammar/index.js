import React, {Component, useState, useEffect} from 'react';
import {
    Text,
    View,
    Dimensions,
    Animated,
    TouchableOpacity,
    Image,
    ImageBackground,
    Alert, Keyboard,
} from 'react-native';
import GrammarD1 from './GrammarD1';
import GrammarD2 from './GrammarD2';
import GrammarD3 from './GrammarD3';
import GrammarD4 from './GrammarD4';
import GrammarD5 from './GrammarD5';
import GrammarD6 from './GrammarD6';
import GrammarD7 from './GrammarD7';
import GrammarD9 from './GrammarD9';
import GrammarD8 from './GrammarD8';
import GrammarD11 from './GrammarD11';
import GrammarD12 from './GrammarD12';
import GrammarD13 from './GrammarD13';
import GrammarD14 from './GrammarD14';
import GRD1 from './GRD1';
import ModalTranSlate from '../../../modalTranslate';
import WrittingD4 from '../Writting/WrittingD4';
const {width, height} = Dimensions.get('window');
const Grammar = (props) => {
    const {lesson_id, question_type, mode, exam_id,Type, dataContent} = props;
    const [type, settype] = useState(Type);
    const [valueY, setValueY] = useState(new Animated.Value(0));
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
        console.log('question_type',question_type)
        switch (question_type) {
            case '1':
                return (
                    <GRD1
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        checkType= {mode === 'lesson'?'exam':type}
                        reviewResult={(data) => props.reviewResult(data)}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '2':
                return (
                    <GrammarD1 //
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '3': // sai điểm
                return (
                    <GrammarD5
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
                        nextReviewResult1 = {() => props.nextReviewResult()}
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
                    <GrammarD2 //đã test
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
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
                    <GrammarD4
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        setIndexQuestion={(index) => props.setIndexQuestion(index)}
                    />
                );
            case '6':
                return (
                    <GrammarD3 //đã test
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '7':
                return (
                    <GrammarD12 // đã test
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '8':
                return (
                    <GrammarD6
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        prevReviewResult = {() => props.prevReviewResult()}
                        checkType= {mode === 'lesson'?'exam':type}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '9':
                return (
                    <GrammarD9 //đã check
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
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
                    <GrammarD13
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '11':
                return (
                    <GrammarD11
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            case '12':
                return (
                    <GrammarD14
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
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
                    <GrammarD8
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '14':
                return (
                    <GrammarD8
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult = {() => props.nextReviewResult()}
                        prevReviewResult = {() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        checkType= {mode === 'lesson'?'exam':type}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            default:
                return null;

        }
    };

    return (
        <Animated.View style={{height,width, bottom:valueY}}>
            {_render()}
            <ModalTranSlate/>
        </Animated.View>
    );
};

export default Grammar;

