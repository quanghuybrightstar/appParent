import React, {useState, useEffect} from 'react';
import {SafeAreaView, ImageBackground, View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import DataAPI from '../../../component/DataAPI';
import API from '../../../API/APIConstant';
import axios from 'axios';
import styles from './styles';
import LoadingScreen from '../../LoadingScreen';
import HeaderStudentClass from '../../../component/HeaderStudentClass';
import ViewTop from './ViewTop';
import ViewContent from './ViewContent';
import apiBase from '../../../base/APIBase';
import {LOAD_API_CLASSSCREEN} from '../../../ReduxStudent/actions/Student/types';
import { AppHeader } from '../../../componentBase/AppHeader';
import SmartScreenBase from '../../../base/SmartScreenBase';
import FontBase from '../../../base/FontBase';
import {Colors} from '../../../styleApp/color';
import {VINHDANH} from '../../../assets/index';


const GoldBoard = ({navigation,hideHeader}) => {
    const userData = useSelector(state => state.AuthStackReducer.dataLogin);

    const [classId,setClassId] = React.useState(()=>{
        var id = navigation.getParam('id') || 0;
        return id;
    });
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (classId > 0) {return;}
        const url = API.baseurl + 'api_class/my_classes';
        apiBase.postDataJson('get',url).then(res=>{
            if (res.data.status && res.data.data.length > 0) {
                setClassId(res.data.data[0].id);
            }
            dispatch({type: LOAD_API_CLASSSCREEN, data: res.data.data});
        }).catch(e=>{

        });
    },[]);

    useEffect(() => {
        if (classId == 0) {return;}
        setLoading(true);
        const url = API.baseurl + DataAPI.UrlRank + '?type=class&class_id=' + classId + '&limit=3&type=class';
        apiBase.postDataJson('get',url).then(r=>{
            if (r.data.status) {
                setData(r.data.data.top_users);
            } else {
                setData([]);
            }
            setLoading(false);
        }).catch(e=>{
            console.log(e);
            setLoading(false);
            setData([]);
        });
    }, [classId]);

    return (
        <ImageBackground style={styles.container} source={{uri: 'bgtuvung'}}>
            {!hideHeader && <AppHeader
                title={'Bảng vàng'}
                leftIconOnPress={() => {
                    navigation.pop();
                }}
                rightComponent={()=> (
                    userData && userData.role === 'teacher' && (
                        <TouchableOpacity
                            onPress={()=> {
                                navigation.navigate('VinhdanhTeach', { id:classId });
                            }}
                            style={{padding: 4}}>
                            <Image
                                source={VINHDANH}
                                style={{height: 30, alignSelf: 'flex-end', width: 130}}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    )
                )}
            />}
            {loading ? <LoadingScreen/> :
                <>
                    {data.length > 0 && classId > 0 ? <View style={styles.containerContent}>
                        {data.length > 0 && <ViewTop data={data}/>}
                        {classId > 0 && <ViewContent classId={classId}/>}
                    </View>
                        :   <View style={{width: '100%' ,alignItems: 'center', paddingTop: SmartScreenBase.smPercenHeight * 5}}>
                            <Text style={{fontFamily: FontBase.MyriadPro_Regular,
                                fontSize: SmartScreenBase.smFontSize * 50, color: Colors.NearBlack}}>
                                {'Hiện tại lớp học chưa có kết quả xếp hạng'}</Text>
                        </View>
                    }
                </>
            }
        </ImageBackground>
    );
};

export default GoldBoard;
