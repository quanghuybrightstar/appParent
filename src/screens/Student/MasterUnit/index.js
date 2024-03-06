import React, {memo, useCallback, useState, useRef} from 'react';
import { ImageBackground, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import styles from './styles';
import Content from '../../../component/ComponentMasterUnit/Content';
import { AppHeader } from '../../../componentBase/AppHeader';

import useLogic from './logic';
import TabInProgress from './TabInProgress';
import TabCompleted from './TabCompleted';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { Colors } from '../../../styleApp/color';
import FontBase from '../../../base/FontBase';

const initialLayout = {width: Dimensions.get('window').width};

export const StatusUnit = {
    Progress: 0,
    Completed: 1,
};

const MasterUnit = ({navigation}) => {

    const classId = navigation.getParam('classId');

    const [updateComp, setUpdateComp] = useState(false);
    const incomRef = useRef()
    const complRef = useRef()

    const [routes, setRoutes] = useState([
        { key: 'first', title: 'CHƯA HOÀN THÀNH'},
        { key: 'second', title: 'ĐÃ HOÀN THÀNH'},
    ]);
    const [index, setIndex] = useState(0);

    const renderScene =  ({ route, jumpTo }) => {
        switch (route.key) {
        case 'first':
            return <TabInProgress ref={incomRef} _moveLesson={_moveLesson} status={StatusUnit.Progress} classId={classId} navigation={navigation} />;
        case 'second':
            return <TabInProgress ref={complRef} _moveLesson={_moveLesson} status={StatusUnit.Completed} classId={classId} navigation={navigation} />;
        }
    };
    const goBack = useCallback(()=>{navigation.pop();}, [navigation]);

    const refreshAll = () => {
        console.log("=====refreshAll")
        incomRef.current?._onRefresh()
        complRef.current?._onRefresh()
    }

    const _moveLesson = (value) => {
        // console.log("=====_moveLesson",value)
        // return
        let data = {};
        data.lesson_type = value.lesson_type;
        data.question_type = value.question_type;
        data.lesson_name = value.lesson_name;
        data.lesson_id = value.id;
        data.lesson_old_id = value.lesson_old_id;
        data.unit_id = value.unit_id;
        data.class_id = classId;
        data.curriculum_id = value.curriculum_id;
        data.topic = value.topic;
        data.type = value.type;

        // console.log('=====_moveLesson', data);
        //console.log('data',data)
        if (value.lesson_type === 'mini_test') {
            navigation.navigate('ExamStudyForTest',{
                id:data.lesson_id,
                name:data.lesson_name,
                type: data.type,
                lessonInfo:data,
                isMasterUnit: true,
                cb: refreshAll
            });
        } else if (value.lesson_type === 'exam') {
            data.lesson_id = value.exam_id;
            navigation.navigate('ExamStudyForTest',{
                id:data.lesson_id,
                name:data.lesson_name,
                type: data.type,
                lessonInfo:data,
                isMasterUnit: true,
                cb: refreshAll
            });
        } else if (value.lesson_type === 'project') {
            console.log('🚀 ~ file: index.js ~ line 67 ~ ListLessonScreen ~ data', data);
            navigation.navigate('ProjectNew', { data: data });
        } else if (value.lesson_type === 'skill_guide') {
            navigation.navigate('StudentGrammar', { data: data });
        } else {
            navigation.navigate('ListLesson', {data: data, isMasterUnit: true, cb: refreshAll});
        }
    };

    const renderTabBar = useCallback((props)=> {
        return <TabBar
            {...props}
            indicatorStyle={styles.tabBarIndicator}
            style={styles.tabBarContainer}
            renderLabel={(scene) => <Text style={{
                fontSize: SmartScreenBase.smFontSize * 45,
                color: scene.focused ? '#000'  : '#888',
                fontFamily: scene.focused ? FontBase.MyriadPro_Bold : FontBase.MyriadPro_Light,
                width: SmartScreenBase.smPercenWidth * 45,
                height: SmartScreenBase.smPercenHeight * 3,
                textAlign: 'center',
                // textAlignVertical: 'center',
            }}>{scene.route.title}</Text>}
        />;
    }, []);


    return (
        <ImageBackground style={styles.container} source={{uri: 'bgtuvung'}}>
            <AppHeader
                title={'Master Unit'}
                leftIconOnPress={goBack}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
                
            />
            {/* <Content data={data}/> */}
        </ImageBackground>
    );
};

export default MasterUnit;
