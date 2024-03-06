import {Text, View, Image, TouchableOpacity, Animated, Alert, ScrollView} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import StyleLesson from '../StyleLesson';
import SmartScreenBase from '../../../../base/SmartScreenBase';

const TypeExercise = (props) => {

    const [translate, setTranslate] = useState(false);
    const {vietnam, english} = props;

    return (
        <View style={{
            height: SmartScreenBase.smPercenHeight * 15,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                ...StyleLesson.Position_ImageType1,
                top: SmartScreenBase.smPercenWidth * 3,
                left: -SmartScreenBase.smPercenWidth * 8,
                zIndex: 100,
            }}>
                <Image source={{uri: 'lesson_image1'}}
                       style={StyleLesson.Sty_ImageTyle_1}
                />
            </View>
            <ScrollView contentContainerStyle={{
                ...StyleLesson.Sty_Tyle_Lesson,
                height: SmartScreenBase.smPercenHeight * 10,
                paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
            }}>
                <Text style={StyleLesson.Sty_Text_Type_Lesson}>
                    {
                        translate ?
                            vietnam
                            :
                            english
                    }
                </Text>
            </ScrollView>
            <View style={{
                ...StyleLesson.Position_ImageType2,
                right: SmartScreenBase.smPercenWidth,
                bottom: SmartScreenBase.smPercenWidth,
            }}>
                <TouchableOpacity
                    onPress={() => setTranslate(!translate)}
                >
                    <Image source={{uri: 'lesson_image2'}}
                           style={StyleLesson.Sty_ImageTyle_2}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TypeExercise;
