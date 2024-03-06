import React, {useState, useEffect, useRef, createRef} from 'react';
import {
    View,
    Text,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Modal,
    Keyboard,
    StyleSheet,
    TextInput,
    Button,
    ScrollView,
    FlatList,
    Platform,
} from 'react-native';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../base/SmartScreenBase';
import Header from './Header';
import API from '../../API/APIConstant';
import axios from 'axios';
import LoadingScreen from '../../screens/LoadingScreen';
import StyleLesson from '../learn/Lesson/StyleLesson';
import {useSelector} from 'react-redux';
import styles from './styles';
import HeaderNew from './HeaderNew';

let commentTxt = '', userExerciseId, indexIssue = 0, textIssue;

const WritingNew = (props) => {

    const {item, index} = props;

    return (
        <TextInput
            style={{
                width: SmartScreenBase.smPercenWidth * 10,
                textAlign: 'center',
                padding: SmartScreenBase.smPercenHeight,
                fontSize: SmartScreenBase.smFontSize * 45,
            }}
            onSubmitEditing={(event) => props.onChangeScore(event.nativeEvent.text, index)}
            defaultValue={item ? item.toString() : '0'}
            keyboardType={'numeric'}
            returnKeyType={'done'}
        />
    );
};

export default WritingNew;
