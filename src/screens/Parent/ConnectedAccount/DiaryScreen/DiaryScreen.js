import {View, Text, ScrollView, TouchableOpacity, ImageBackground, SafeAreaView} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';

import Exercise from '../../../../component/Exercise/Exercise';
import TimeLearning from '../TimeLearning/TimeLearning';
import axios from 'axios';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import API from "../../../../API/APIConstant";
import {useSelector} from "react-redux";
import LoadingScreen from "../../../LoadingScreen";
import LoginFirstComponentParent from '../../../../component/LoginFirstComponent/Parent';
import Header from '../../../../component/Header';
import APIBase from '../../../../base/APIBase';

const DiaryScreen = (props) => {
    const student = useSelector(state => state.ListStudentReducer.currentStudent);
    const dataStudent = useSelector(state => state.ListStudentReducer.dataStudent);
    const [parentHomework, setParentHomework] = useState(null);
    const [teacherHomework, setTeacherHomework] = useState([]);
    const [classHomework, setClassHomework] = useState([]);
    const [timeLearning, setTimeLearning] = useState([]);
    const [maxValue, setMaxValue] = useState(0);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('dataStudent.length', dataStudent.length);
        if (dataStudent.length) {
            _getData();
        }
    }, [student]);

    const _getData = async () => {
        setLoading(true);
        const url = API.baseurl + API.getDiaryStudent(student.id);
        const headers = {...API.header, jwt_token: APIBase.jwt_token};
        try {
            const res = await axios({method: 'get', url, headers});
            if (res.data.status) {
                const {data} = res.data;
                setParentHomework(data.parent_homework);
                setTeacherHomework(data.teacher_homework);
                setClassHomework(data.class_homework);
                setTimeLearning(data.time_learning_report);
                setRecentActivity(data.recent_activity);
            }
            setLoading(false);
        } catch (e) {
            console.log('get diary student', e);
            setLoading(false);
        }
    };

    useEffect(() => {
        if(timeLearning.length){
            let max = 0;
            timeLearning.map(item => (parseInt(item.value) > max) && (max = parseInt(item.value)));
            setMaxValue(max - max%10 + 10);
        }
    }, [timeLearning]);

    const _header = useMemo(() =>
    {
        if (dataStudent.length) {
            header({fullname: student.fullname})
        }
    }, [student]);

    const _chartTime = useMemo(() => <TimeLearning timeLearning={timeLearning} maxValue={maxValue}/>,[timeLearning, maxValue]);

    const _goToHistory = () => {
    };

    return (
        !dataStudent.length
        ?
            <LoginFirstComponentParent />
            :
            <ImageBackground
                source={{uri: 'imagebackground'}}
                style={{flex: 1}}>
                {
                    loading ? <LoadingScreen/> :
                        <View style={{flex: 1, marginBottom: SmartScreenBase.smPercenHeight * 12}}>
                            <Header showBack={false} title= {'Giáo trình và Bài tập'} goBack={() => props.navigation.goBack()}/>
                            {/*{_header}*/}
                            <View style={{
                                flex: 5,
                                paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
                                paddingTop: SmartScreenBase.smPercenHeight
                            }}>
                                {/*<Text*/}
                                {/*    style={{color: '#f7f7f7', fontWeight: '700', fontSize: SmartScreenBase.smPercenWidth * 5}}>Giáo*/}
                                {/*    trình và Bài tập</Text>*/}
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {
                                        parentHomework && <Exercise item={parentHomework} type={1} navigation={props.navigation}/>
                                    }
                                    {
                                        teacherHomework.map(item => <Exercise item={item} type={2} navigation={props.navigation}/>)
                                    }
                                    {
                                        classHomework.map(item => <Exercise item={item} type={3} navigation={props.navigation}/>)
                                    }
                                </ScrollView>
                            </View>

                            <View style={{flex: 4, marginVertical: SmartScreenBase.smPercenHeight * 1.2}}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
                                }}>
                                    <Text style={{
                                        color: '#f7f7f7',
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                        fontWeight: '700'
                                    }}>Thời gian
                                        học</Text>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#01283a',
                                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                                            paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
                                            paddingVertical: SmartScreenBase.smPercenWidth
                                        }}
                                        onPress={_goToHistory}
                                    >
                                        <Text style={{color: '#fff'}}>Lịch sử</Text>
                                    </TouchableOpacity>
                                </View>
                                {_chartTime}
                            </View>
                        </View>
                }
            </ImageBackground>
    );
};

const header = (props) => {
    return (
        <View
            style={{
                width: SmartScreenBase.smPercenWidth * 100,
                backgroundColor: "rgba(0,0,0,0.3)",
                justifyContent: 'center',
                height: SmartScreenBase.smPercenHeight * 7,
                paddingLeft: SmartScreenBase.smPercenWidth * 4
            }}>
            <Text
                style={{
                    marginTop: SmartScreenBase.smPercenHeight,
                    color: 'white',
                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                    fontWeight: '800',
                    fontSize: SmartScreenBase.smPercenWidth * 5,
                }}>
                {'Nhật ký ' + props.fullname}
            </Text>
        </View>
    )
};

export default DiaryScreen;
