import { Text, View, Image, TouchableOpacity, Animated, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';

import StyleLesson from '../../../component/learn/Lesson/StyleLesson';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { TextBox } from '../../../componentBase/TextBox';
import styles from "./style";

/**
 * Question Component
 * @param {object} props 
 * @property {string} vietnam vietnam question text
 * @property {string} english english question text
 * @returns Component
 */
export const Question = (props) => {

    const [translate, setTranslate] = useState(false);
    const { vietnam, english } = props;
    const [showMore, setShowMore] = useState(false);
    return (
        <View style={styles.outerContainer}>
            <View style={styles.imgWrapper}>
                <Image source={{ uri: 'lesson_image1' }}
                    style={StyleLesson.Sty_ImageTyle_1}
                />
            </View>
            <View style={styles.containerView}>
                {showMore ? <View style={styles.quesWrapper}>
                    <TextBox numberOfLines={4} onTextLayout={e => {
                        setShowMore(e.nativeEvent.lines.length > 3 ? false : true);
                    }} style={[styles.questionBox]}>
                        {
                            translate ?
                                vietnam
                                :
                                english
                        }
                    </TextBox>
                </View> :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.questionContainer}
                    >
                        <TextBox numberOfLines={undefined} onTextLayout={e => {
                            setShowMore(e.nativeEvent.lines.length > 3 ? false : true);
                        }} style={[styles.questionBox]}>
                            {
                                translate ?
                                    vietnam
                                    :
                                    english
                            }
                        </TextBox>
                    </ScrollView>
                }
            </View>
            <View style={styles.btnWrapper}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setTranslate(!translate)}
                >
                    <Image source={{ uri: 'lesson_image2' }}
                        style={StyleLesson.Sty_ImageTyle_2}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};


