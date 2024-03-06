import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import styles from "./styles";

const TextDocument = (props) => {
    const {content} = props;
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.text}>{content}</Text>
            </ScrollView>
        </View>
    )
};

export default TextDocument;
