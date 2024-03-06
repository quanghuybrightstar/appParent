import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image,
    ScrollView,
    ActivityIndicator,
    Platform,
    Alert,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
import API from '../../API/APIConstant';
import Axios from 'axios';
import stylesApp from '../../styleApp/stylesApp';
import { stylesHistory } from '../Student/StudyForTest/styles';
import Loading from '../../screens/LoadingScreen';
import SmartScreenBase from '../../base/SmartScreenBase';
import font from '../../base/FontBase';
import APIBase from '../../base/APIBase';
import FontBase from '../../base/FontBase';
import { some } from 'lodash-es';
import LessonBase from '../../base/LessonBase';

// Giáo trình dạng list

const MapList = (props) => {

    const [dataSkill, setDataSkill] = useState([
        { skill: 'pronunciation' },
        { skill: 'vocabulary' },
        { skill: 'grammar' },
        { skill: 'reading' },
        { skill: 'listening' },
        { skill: 'speaking' },
        { skill: 'writing' },
        { skill: 'project' },
        { skill: 'mini_test' },
        { skill: 'exam' },
        // { skill: 'skill_guide' },
    ]);
    const [dataList, setDataList] = useState([]);
    const [saveDataList, setSaveDataList] = useState([]);
    const [nameSkill, setNameSkill] = useState('pronunciation');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        _getData();
    }, [props.curriculum_id]);

    useEffect(()=> {
        setDataSkill([
            { skill: 'pronunciation' },
            { skill: 'vocabulary' },
            { skill: 'grammar' },
            { skill: 'reading' },
            { skill: 'listening' },
            { skill: 'speaking' },
            { skill: 'writing' },
            { skill: 'project' },
            { skill: 'mini_test' },
            { skill: 'exam' },
            // { skill: 'skill_guide' },
        ]);
        setDataList([])
        setSaveDataList([])
        setNameSkill('pronunciation')
    }, [props.class_id]);
    
    const _getData = async () => {
        const url = API.baseurl + API.CourseManager + props.curriculum_id;
        setIsLoading(true);
        try {
            const response = await APIBase.postDataJson('GET', url);
            console.log("============_getDataMapL");
            if (response.data.status == true) {
                setSaveDataList(response.data.data.lesson_data.data);
                response.data.data.lesson_data.data.forEach(element => {
                            console.log("=====type",element.sub_lesson_type, element.lesson_id)
                });
                let dataSkillList = [...dataSkill];
                // console.log("=====SkillList1",dataSkillList);
                dataSkillList = dataSkillList.filter(item => some(response.data.data.lesson_data.data, ['lesson_type', item.skill]));
                setDataSkill(dataSkillList);
                // console.log("=====SkillList2",dataSkillList);
                setNameSkill(dataSkillList[0]?.skill);
                // console.log("=====koko")
                let dataConvert = await _convertDataList(response.data.data.lesson_data.data);
                setDataList(dataConvert);
            } else {Alert.alert(response.data.msg);}
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        _setData();
    }, [nameSkill]);

    const _setData = async () => {
        let dataConvert = await _convertDataList(saveDataList);
        setDataList(dataConvert);
    };
    const _snapItem = async (ind) => {
        let array = [...dataSkill];
        array.forEach((item, index) => {
            if (ind === index) {
                setNameSkill(item.skill);
                setDataList([]);
            }
        });

    };
    const _convertDataList = async (data) => {
        // let array = [...dataList];
        var array = []
        data.forEach(async (item, index) => {
            if (item.sub_lesson_type == nameSkill) {
                let name = array.findIndex((int) => {
                    console.log("=====_convertDataLis1", int.unit_name, item.unit_name)
                    return int.unit_name == item.unit_name;
                });
            if (name == -1) {
                    console.log("=====_convertData 1", item.sub_lesson_type, nameSkill)
                    let oj = {
                        unit_name: '',
                        show: false,
                        dataItem: [],
                    };
                    oj.unit_name = item.unit_name;
                    oj.lesson_type = item.lesson_type;
                    let checkExist = oj.dataItem.find(c => c.lesson_id == item.lesson_id);
                    if (checkExist == null) {
                        oj.dataItem.push(item);
                    }
                    await array.push(oj);
            } else {
                console.log("=====_convertData 2", item.unit_name, array[name].unit_name)
                if (item.unit_name == array[name].unit_name) {
                        array[name].dataItem.push(item);
                }
            }
        }
        });
        return array;
    };

    const _togleList = (index) => {
        let data = [...dataList];
        for (let i = 0; i < data.length; i++) {
            if (i !== index) {
                data[i].show = false;
            }
        }
        data[index].show = !data[index].show;
        setDataList(data);

    };

    const _moveLesson = (item) => {
        console.log("=====datalessonMap",item)
        // let data = {};
        // data.lesson_type = item.lesson_type;
        // data.question_type = item.question_type ? item.question_type : '2';
        // data.lesson_name = item.lesson_name;
        // data.lesson_id = item.lesson_id;
        // data.unit_id = item.unit_id;
        // data.class_id = props.class_id;
        // data.curriculum_id = props.curriculum_id;

        // if (item.lesson_type === 'mini_test') {
        //     props.navigation.navigate('ExamStudyForTest', {
        //         id: data.lesson_id,
        //         name: data.lesson_name,
        //         type: 'mini_test',
        //         lessonInfo: data,
        //     });
        // } else if (item.lesson_type === 'exam') {
        //     props.navigation.navigate('ExamStudyForTest', {
        //         id: data.lesson_id,
        //         name: data.lesson_name,
        //         type: 'exam',
        //         lessonInfo: data,
        //     });
        // } else {
        //     props.navigation.navigate('ListLesson', { data: data });
        // }

        console.log("=====homechange",item)

        const dataRun = {
            lesson_type: item.lesson_type,
            question_type: item.question_type,
            lesson_name: item.lesson_name,
            lesson_id: item.lesson_id,
            user_received_id: item.id,
            class_id: props.class_id,
            unit_id: item.unit_id,
            curriculum_id: props.curriculum_id

        };

        LessonBase._moveLessonHS(dataRun, props.navigation, false, null, "curi")
        // props.navigation.navigate('ListLesson', {data: data});
    };

    const _renderItem = ({ item, index }) => {
        let unit_num = item.unit_name, unit_name1 = '';
        let idx = unit_num.indexOf(':');
        if (idx < 0) {
            idx = unit_num.indexOf('-');
        }
        if (idx >= 0) {
            unit_name1 = unit_num.substring(idx + 1).trim();
            unit_num = unit_num.substring(0, idx).trim();
        }

        return (
            <View style={{ borderRadius: 15, width: '100%', marginBottom: 10, backgroundColor: '#22222280' }}>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderRadius: 15,
                    backgroundColor: '#fff',
                    height: 50,
                    alignItems: 'center',
                }}>
                    <Text
                        style={{
                            fontSize: SmartScreenBase.smFontSize * 50,
                            paddingLeft: SmartScreenBase.smPercenWidth * 5,
                            fontFamily: FontBase.MyriadPro_Bold,
                            paddingTop: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight : 0,
                            color: '#010101',
                        }}>{unit_num}: </Text>
                    <Text
                        style={{
                            fontSize: SmartScreenBase.smFontSize * 50,
                            color: '#010101',
                            paddingTop: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight : 0,
                            fontFamily: FontBase.MyriadPro_Bold,
                        }}>{unit_name1}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            _togleList(index);
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f0f0f0',
                            width: width / 12,
                            height: width / 12,
                            borderRadius: width / 3,
                            position: 'absolute',
                            right: 20,
                        }}>
                        <Text style={{
                            color: '#69696a',
                            fontFamily: FontBase.MyriadPro_Bold,
                            fontSize: SmartScreenBase.smFontSize * 70,
                            padding: 0,
                            position: 'absolute',
                        }}>{dataList[index].show ? '-' : '+'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', alignItems: 'center' }}>
                    {
                        dataList[index].show &&
                        <ScrollView style={{ flex: 1, width: '100%' }}>
                            {

                                item.dataItem.map((itm, ind) => {
                                    return (
                                        <TouchableOpacity
                                            key={ind}
                                            onPress={() => _moveLesson(itm)}
                                            style={{
                                                height: 50,
                                                justifyContent: 'center',
                                                width: '100%',
                                                borderBottomWidth: ind == item.dataItem.length - 1 ? 0 : 1,
                                                borderBottomColor: '#fff',
                                                alignItems: 'center',
                                            }}>
                                            <Text
                                                style={{ fontSize: SmartScreenBase.smFontSize * 50, color: '#fff', width: '70%', fontFamily: FontBase.MyriadPro_Bold }}
                                                numberOfLines={1}>{ind + 1}. {itm.lesson_topic}</Text>
                                            <Text
                                                style={{ fontSize: SmartScreenBase.smFontSize * 50, color: '#fff', width: '70%', fontFamily: FontBase.MyriadPro_Regular }}
                                                numberOfLines={1}>{itm.lesson_name}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </ScrollView>
                    }
                </View>

            </View>
        );
    };
    const _checkImage = (item) => {
        switch (item) {
        case 'vocabulary':
            return 'icon_vocabulary';
        case 'listening':
            return 'icon_listening';
        case 'grammar':
            return 'icon_grammar';
        case 'reading':
            return 'icon_reading';
        case 'speaking':
            return 'icon_speaking';
        case 'writing':
            return 'icon_writing';
        case 'pronunciation':
            return 'icon_pronuncition';
        case 'mini_test':
            return 'icon_mini_test';
        case 'project':
            return 'icon_project';
        case 'exam':
            return 'icon_mini_test';
        }
    };
    const renderCarouSel = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={index}
                style={{
                    justifyContent: 'flex-end',
                    backgroundColor: '#ffffff',
                    height: height / 7,
                    borderRadius: 25,
                    alignItems: 'center',
                    marginTop: '25%',
                }}>
                <View style={{
                    width: width / 3.5,
                    height: width / 3.5,
                    borderRadius: width / 2,
                    position: 'absolute',
                    top: -width / 7,
                    zIndex: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                }}>
                    <Image source={{ uri: _checkImage(item.skill) }}
                        style={{
                            width: '100%', height: '100%',
                            borderRadius: width / 2,
                        }} />
                </View>
                <Text style={{
                    fontSize: SmartScreenBase.smFontSize * 80,
                    color: '#00A79C',
                    textTransform: 'uppercase',
                    paddingBottom: SmartScreenBase.smPercenHeight * 5,
                    fontFamily: font.UTM_FB_B,
                }}>{item.skill}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 4 }}>
                <Carousel
                    data={dataSkill}
                    renderItem={renderCarouSel}
                    sliderWidth={width}
                    itemWidth={width - 100}
                    onSnapToItem={_snapItem}
                />
            </View>
            <View style={{ marginTop: 20, paddingHorizontal: 20, width: '100%', flex: 7 }}>
                {
                    isLoading ?
                        <View style={{
                            left: '50%',
                            // flex: 1,
                            position: 'absolute',
                            zIndex: 10,
                        }}>
                            <ActivityIndicator size="large" />
                        </View>
                        :
                        null
                }
                <FlatList
                    data={dataList}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};
export default MapList;
