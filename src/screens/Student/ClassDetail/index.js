import React, {useEffect, useState} from 'react';
import {ImageBackground, View, Text, SafeAreaView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import DataAPI from '../../../component/DataAPI';
import API from '../../../API/APIConstant';
import axios from 'axios';
import styles from './styles';
import LoadingScreen from '../../LoadingScreen';
import HeaderStudentClass from '../../../component/HeaderStudentClass';
import { AppHeader } from '../../../componentBase/AppHeader';
import LogBase from '../../../base/LogBase';

const ClassDetail = (props) => {
    const {navigation} = props;
    const {id} = navigation.state.params;
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        _getData();
    }, []);

    const _getData = async () => {
        setLoading(true);
        const url = API.baseurl + DataAPI.UrlDetailClass + '?id=' + id;
        console.log(url)
        const headers = {...API.header, jwt_token: dataLogin.jwt_token};
        try {
            LogBase.log("=====API",url)
            const res = await axios({method: 'get', url, headers});
            if (res.data.status) {
                setData(res.data.data);
            } else {
                setData(null);
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setData(null);
            setLoading(false);
        }
    };

    const _renderDate = (time) => {
        const date = new Date(time.split(' ')[0]);
        return ((date.getDate().toString().length === 1 ? '0' : '') + date.getDate()) + '/' +
            (((date.getMonth() + 1).toString().length === 1 ? '0' : '') + (date.getMonth() + 1)) + '/' +
            date.getFullYear();
    };

    const _renderLineContent = (uri, text) => {
        return (
            <View style={styles.viewLineContent}>
                <Image source={{uri}} style={styles.iconContent}/>
                <Text style={styles.textContent} numberOfLines={1}>{text}</Text>
            </View>
        );
    };
    console.log(data);
    return (
        <ImageBackground style={styles.container} source={{uri: 'bgtuvung'}}>
            <AppHeader
                title={'Thông tin lớp học'}
                leftIconOnPress={() => {
                    navigation.pop();
                }}
            />
            {loading ? <LoadingScreen/> :
                <View style={{flex:1, paddingBottom: 40}}>
                    <View style = {styles.containerInfo}>
                        <ImageBackground style={styles.containerContent} source={{uri: 'bg_class_detail'}}
                            imageStyle={styles.imageBackgroundContent}>

                            <Text style={styles.textTitleContent}>Thông tin lớp</Text>
                            {_renderLineContent('gv_liststudent_09', data && data.teacher_name)}
                            {_renderLineContent('gv_44', data && data.organization_name)}
                            {/* {_renderLineContent('gv_45', data && _renderDate(data.start_time) + ' - ' + _renderDate(data.end_time))} */}
                            {_renderLineContent('code_icon', data && data.class_code)}
                            {_renderLineContent('gv_46', data && data.count_student + ' học sinh')}
                            {/* <View style={styles.border}/> */}
                            {/* <Text style={styles.textTitleContent}>Học tập</Text>
                            {_renderLineContent('gv_47', data && data.num_exercise_expired + ' học sinh quá hạn làm bài tập')}
                            {_renderLineContent('gv_48', data && data.number_new_exercise + ' bài tập chưa làm')} */}
                            <View style={styles.border}/>
                            <Text style={styles.textTitleContent}>Giáo trình</Text>
                            {_renderLineContent('gv_49', data && data.curriculum_name)}
                        </ImageBackground>
                    </View>

                </View>
            }
        </ImageBackground>
    );
};

export default ClassDetail;
