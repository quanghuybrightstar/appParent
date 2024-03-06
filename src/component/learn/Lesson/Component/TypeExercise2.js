import {Text, View, Image, TouchableOpacity, Animated, Alert, ScrollView} from 'react-native';
import React, {useState, useEffect, useMemo, useRef} from 'react';
import StyleLesson from '../StyleLesson';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ModalExitLesson from "../../../ModalExitLesson";
import MyData from '../../../MyData';

let interval;

const TypeExercise = (props) => {

    const [translate, setTranslate] = useState(false);
    const withProgress = useRef(new Animated.Value(0)).current;
    const [time, setTime] = useState('00:00');
    const [showModalExitLesson, setShowModalExitLesson] = useState(false);
    const {vietnam, english, typeExercise, type, indexQuestion, totalQuestion, show, typeExam, dataTime} = props;
    let duration = 60 * 15;

    useEffect(() => {
        let withP = SmartScreenBase.smPercenWidth * 80 * ((indexQuestion + 1) / totalQuestion);
        // console.log('withP', withP);
        // console.log('totalQuestion', totalQuestion);
        // console.log('indexQuestion', indexQuestion);
        Animated.timing(withProgress, {
            toValue: withP,
            duration: 1000,
        }).start();
    }, [indexQuestion, totalQuestion]);

    useEffect(() => {
        if (type === 'mini_test') {
            if (typeExam !== 'bigExam') {
                let timer = duration, minutes, seconds;
                setInterval(function () {
                    minutes = parseInt(timer / 60, 10);
                    seconds = parseInt(timer % 60, 10);

                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    seconds = seconds < 10 ? '0' + seconds : seconds;

                    setTime(minutes + ':' + seconds);
                    if (--timer < 0) {
                        props.saveLogExam();
                        clearInterval();
                    }
                }, 1000);
            }
        } else {
            clearInterval();
        }
    }, []);

    useEffect(() => {
        if (type === 'mini_test' && typeExam === 'bigExam' && dataTime) {
            duration = dataTime.exam.duration * 60;
            let timer = duration, minutes, seconds;
            setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;

                setTime(minutes + ':' + seconds);
                if (--timer < 0) {
                    props.saveLogExam();
                    clearInterval();
                }
            }, 1000);
        } else {
            clearInterval();
        }
    }, [dataTime]);

    const _onPressOut = () => {
        props.onPressOut&&props.onPressOut();
        if(props.isTeacher || MyData.isCanExit){
            props.goBack();
        }else{
            setShowModalExitLesson(true);
        }
    };

    const _cancelModalExitLesson = () => {
        setShowModalExitLesson(false);
    };

    const _confirmModalExitLesson = () => {
        setShowModalExitLesson(false);
        props.goBack();
    };

    const timeCountDown = useMemo(() => <Text
        style={{fontSize: SmartScreenBase.smFontSize * 45, color: '#f7931e'}}>{time}</Text>, [time]);
    return (
        <View>
            {
                !show &&
                <View
                    style={{alignSelf: 'center', alignItems: 'center', marginTop: SmartScreenBase.smPercenHeight * 2}}>
                    <View style={[StyleLesson.Sty_Width_Screen, {marginTop: SmartScreenBase.smPercenHeight * 3}]}>
                        <View style={StyleLesson.View_Process}>
                            <Animated.View style={[StyleLesson.Process, {width: withProgress}]}/>
                        </View>
                        <View style={{width: SmartScreenBase.smPercenWidth * 10, alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => _onPressOut()}>
                                <View>
                                    <Image source={{uri: 'lesson_image3'}}
                                           style={StyleLesson.ImageExit}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginRight: SmartScreenBase.smPercenWidth * 2}}>
                        <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4, fontWeight: '700', color: 'white'}}>
                            {`${indexQuestion + 1}/${totalQuestion}`}
                        </Text>
                    </View>
                </View>
            }
            {
                show &&
                <View style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                    marginBottom: 40,
                }}>
                    <View style={[StyleLesson.Sty_Width_Screen, {marginTop: SmartScreenBase.smPercenHeight * 3}]}>
                        {/* <View style={StyleLesson.View_Process}>
                            <Animated.View style={[StyleLesson.Process, { width: withProgress }]} />
                        </View>
                        <View style={{ width: SmartScreenBase.smPercenWidth * 10, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => _onPressOut()}>
                                <View>
                                    <Image source={{ uri: 'lesson_image3' }}
                                        style={StyleLesson.ImageExit}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                    <View style={{marginRight: SmartScreenBase.smPercenWidth * 2}}>
                        {/* <Text style={{ fontSize: SmartScreenBase.smPercenWidth * 4, fontWeight: '700', color: 'white' }}>
                            {`${indexQuestion + 1}/${totalQuestion}`}
                        </Text> */}
                    </View>
                </View>
            }
            {
                typeExercise
                    ?
                    <View style={{
                        height: SmartScreenBase.smPercenHeight * 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            ...StyleLesson.Position_ImageType1,
                            top: SmartScreenBase.smPercenHeight,
                            left: SmartScreenBase.smPercenWidth * 3,
                            zIndex: 100,
                        }}>
                                    <Image source={{uri: 'lesson_image1'}}
                                           style={{
                                               ...StyleLesson.Sty_ImageTyle_1,
                                               width: SmartScreenBase.smPercenWidth * 20,
                                               height: SmartScreenBase.smPercenWidth * 20,
                                               marginTop: SmartScreenBase.smPercenHeight * 2,
                                           }}
                                           resizeMode={'contain'}
                                    />
                        </View>
                        <View
                            style={{
                                ...StyleLesson.Sty_Tyle_Lesson,
                                height: SmartScreenBase.smPercenHeight * 10,
                                paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                            }}>
                            <ScrollView>
                                <View style={{flexDirection: 'row' ,minHeight: SmartScreenBase.smPercenHeight * 10, alignItems: 'center', 
                                            justifyContent: 'center'}}>
                                    <Text style={{
                                        ...StyleLesson.Sty_Text_Type_Lesson,
                                        marginVertical: SmartScreenBase.smPercenHeight * 1,
                                    }}>
                                        {
                                            translate ?
                                                vietnam
                                                :
                                                english
                                        }
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{
                            ...StyleLesson.Position_ImageType2,
                            right: SmartScreenBase.smPercenWidth * 5,
                            bottom: SmartScreenBase.smPercenWidth * 3,
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
                    :
                    null
            }
            {showModalExitLesson && <ModalExitLesson _cancelModalExitLesson={_cancelModalExitLesson} isTeacher={props.isTeacher}
                                                     _confirmModalExitLesson={_confirmModalExitLesson}/>}
        </View>
    );
};

export default TypeExercise;
