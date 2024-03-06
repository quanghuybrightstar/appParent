import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    Platform,
    ImageBackground,
    TextInput,
    ActivityIndicator
} from 'react-native';
import Slider from '@react-native-community/slider';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ButtonCheck from '../../../items/ButtonCheck';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import Iconcheck from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import styles from './listten8Styles';
import Sound from 'react-native-sound';
const Question = (props) => {
    const _changeValue = value => {
        props.changeValue(value)
    }
    const _changeStart = (value) => {
        props.changeStart(value)
    }
    return (
        <View style={{}}>
            <View style={StyleLesson.Sty_Tyle_Lesson}>
                <View style={StyleLesson.Position_ImageType1}>
                    <Image source={{ uri: 'lesson_image1' }}
                        style={StyleLesson.Sty_ImageTyle_1}
                    />
                </View>
                <Text style={[StyleLesson.Sty_Text_Type_Lesson, { textAlign: 'left' }]}>{props.title}</Text>
                <View style={StyleLesson.Position_ImageType2}>
                    <TouchableOpacity
                        onPress={props.onPress}
                    >
                        <Image source={{ uri: 'lesson_image2' }}
                            style={StyleLesson.Sty_ImageTyle_2}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: '90%',
                    marginTop: SmartScreenBase.smPercenHeight * 4
                }}>
                {
                    !props.LoadAudio ?
                        <ActivityIndicator size="small" color="#fff" />
                        :
                        <View
                            style={{
                                width: '10%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            {props.state == 'play' && (
                                <TouchableOpacity onPress={() => props.play('pause')}>
                                    <Iconcheck name="pause" color="#FFF" size={30} />
                                </TouchableOpacity>
                            )}
                            {props.state == 'pause' && (
                                <TouchableOpacity onPress={() => props.play('play')}>
                                    <Iconcheck name="caretright" color="#FFF" size={30} />
                                </TouchableOpacity>
                            )}
                        </View>
                }
                <View
                    style={{
                        marginHorizontal: 30,
                        flexDirection: 'row',
                    }}>

                    <Slider
                        onSlidingStart={_changeStart}
                        onSlidingComplete={_changeValue}
                        value={props.slider}
                        maximumValue={props.longQuest}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="#FFFFFF"
                        style={{
                            flex: 1,
                            alignSelf: 'center',
                            marginHorizontal: Platform.select({ ios: 5 }),
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
export default Question