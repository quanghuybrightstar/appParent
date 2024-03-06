import React from 'react';
import {ScrollView} from 'react-native';
import HTML from 'react-native-render-html'
import styles from "./style";

const TextLecture = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.text}>
            <HTML html={props.text}/>
        </ScrollView>
    )
};

export default TextLecture;
