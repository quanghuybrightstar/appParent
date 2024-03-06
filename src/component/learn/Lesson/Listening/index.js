import React, { Component, useState, useEffect } from 'react';
import {
    Animated,
    Alert, Keyboard, Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import ListeningD1 from './ListeningD1';
import ListeningD4 from './ListeningD4';
import ListeningD5 from './ListeningD5';
import ListeningD7 from './ListeningD7';
import ListeningD8 from './ListeningD8';
import ListeningD3 from './ListeningD3';
import ListeningD6 from './ListeningD6';
import ListeningD8new from './ListeningD8new';
import ListeningD9new from './listeningD9new';
import ModalTranSlate from '../../../modalTranslate';

const Listening = (props) => {
    const { lesson_id, question_type, mode, exam_id, reviewResult, Type, group_id, dataContent } = props;
    const [valueY, setValueY] = useState(new Animated.Value(0));
    const [status, setStatus] = useState(true);
    const _onPressOut = () => {
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn thoát bài học không ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => _onGoBack(),
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    };
    useEffect(() => {
        console.log('type', Type);
        Keyboard.addListener('keyboardDidShow', () => _showKeyBoad());
        Keyboard.addListener('keyboardDidHide', () => _HideKeyBoad());
    });
    const _onGoBack = async () => {
        await setStatus(!status);
        props.goBack();
    };
    const _render = () => {
        switch (question_type) {
            case '1':
                return (
                    <ListeningD7 //done điểm miniTest //doneminitest// nut ok
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        checkType={'exam'}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            case '2':
                return (
                    <ListeningD5 //done //done điểm miniTest//doneminitest//nut ok
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        checkType={'exam'}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            case '3':
                return (
                    <ListeningD1
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        checkType={'exam'}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            case '4':
                return (
                    <ListeningD3
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        checkType={'exam'}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                        handleKeyboardShow={(e) => props.handleKeyboardShow(e)}
                        handleKeyboardHide={() => props.handleKeyboardHide()}
                    />
                );
            case '5':
                return (
                    <ListeningD8
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        checkType={'exam'}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            case '6':
                return (
                    <ListeningD4 // done//done nút
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        checkType={'exam'}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            case '7':
                return (
                    <ListeningD6
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        reviewResult={(data) => props.reviewResult(data)}
                        showFeedback={() => props.showFeedback()}
                        hideFeedback={() => props.hideFeedback()}
                        checkType={'exam'}
                        dataContent={dataContent}
                        saveLogLearning={(data) => props.saveLogLearning(data)}
                        showTypeExercise={() => props.showTypeExercise()}
                        hideTypeExercise={() => props.hideTypeExercise()}
                    />
                );
            case '8':
                return (
                    <ListeningD8new
                        group_id={group_id}
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        reviewResult={reviewResult}
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
                    <ListeningD9new
                        group_id={group_id}
                        lesson_id={lesson_id}
                        modeF={mode}
                        setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
                        nextReviewResult={() => props.nextReviewResult()}
                        prevReviewResult={() => props.prevReviewResult()}
                        reviewResult={reviewResult}
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
    // useEffect(() => {
    //     Keyboard.addListener('keyboardDidShow', () => _showKeyBoad());
    //     Keyboard.addListener('keyboardDidHide', () => _HideKeyBoad());
    // });
    const _showKeyBoad = () => {
        if (question_type != '8' && question_type != '9') {
            Animated.timing(valueY, {
                toValue: height / 17,
                duration: 500,
            }).start();
        } 
        // else {
        //     if (question_type == '4') {
        //         Animated.timing(valueY, {
        //             toValue: height /3,
        //             duration: 500,
        //         }).start();
        //     } else {
        //         Animated.timing(valueY, {
        //             toValue: height / 15,
        //             duration: 500,
        //         }).start();
        //     }
        // }
    };
    const _HideKeyBoad = () => {
        Animated.timing(valueY, {
            toValue: 0,
            duration: 500,
        }).start();
    };
    return (
        <Animated.View style={{ flex: 1, bottom: valueY }}>
            {_render()}
            <ModalTranSlate />
        </Animated.View>
    );
};

export default Listening;
