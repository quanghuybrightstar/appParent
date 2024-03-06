import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    FlatList,
    Platform,
    Alert
} from 'react-native';
import {styles, width, height} from './style';
import API from '../../API/APIConstant';
import {useSelector} from 'react-redux';
import axios from 'axios';
import stylesApp from '../../styleApp/stylesApp';
import {stylesHistory} from '../Student/StudyForTest/styles';
import Loading from '../../component/LoadingScreen';
import SmartScreenBase from '../../base/SmartScreenBase';
import APIBase from '../../base/APIBase';
import FontBase from '../../base/FontBase';
import { AppHeader } from '../../componentBase/AppHeader';
import lessonMath from '../../utils/lessonMath';

const ListSkillScreen = (props) => {

    const [dataListSkill, setDataListSkill] = useState([]);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        _CallDataClass();
    }, []);

    useEffect(() => {
        if(reload){
            setReload(false)
            _CallDataClass();
        }
    }, [reload]);

    const _CallDataClass = async () => {
        const url = API.baseurl + API.lessons_by_skill(props.navigation.getParam('id'));
        try {
            const response = await APIBase.postDataJson('GET',url);

            if(response.data.status == true){
                setDataListSkill(response.data.data);
            }else{
                Alert.alert(response.data.msg);
            }
        } catch (error) {
            console.log('error', error.response.data);
        } finally {
            setIsLoading(false);
        }
    };
    const _checkImage = (item) => {
        switch (item) {
            case 'vocabulary':
                return 'vocab';
            case 'listening':
                return 'icon6';
            case 'grammar':
                return 'icon1';
            case 'speaking':
                return 'icon5';
            case 'reading':
                return 'icon4';
            case 'writing':
                return 'writing';
            case 'pronunciation':
                return 'icon2';
            case 'mini_test':
                return 'icon8';
            case 'exam':
                return 'icon8';
            case 'project':
                return 'project'
        }
    };
    const _checkImageStatus = (point) => {
        if (point >= 100) {
            return 'done';
        } else if (point < 10) {
            return 'notdone';
        } else if (10 <= point && point < 20) {
            return 'icon10';
        } else if (20 <= point && point < 30) {
            return 'icon20';
        } else if (30 <= point && point < 40) {
            return 'icon30';
        } else if (40 <= point && point < 50) {
            return 'icon40';
        } else if (50 <= point && point < 60) {
            return 'icon50';
        } else if (60 <= point && point < 70) {
            return 'icon60';
        } else if (70 <= point && point < 80) {
            return 'icon70';
        } else if (80 <= point && point < 90) {
            return 'icon80';
        } else if (90 <= point && point < 100) {
            return 'icon90';
        }
        return 'notdone'
    };

    const _moveScreen = (data) => {
        // if(data.is_blocked == 1)
        //     return;
        // console.log("=====_moveScreen",data)
        props.navigation.navigate('ListLessonScreen', {data, class_id: props.navigation.getParam("class_id"),cb:(d)=>{
            if(d){
                setReload(true)
            }
        }});
    };
    const _renderItem = ({item, index}) => {
        return (
            index === 0 ?
                <TouchableOpacity style={styles.item0} onPress={() => _moveScreen(item)}>
                    <View style={styles.iconSkill}>
                        <Image source={{uri: _checkImage(item.skill)}}
                               style={styles.imgSkill}/>
                    </View>
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        {
                            item.is_blocked ==0 ?
                                <ImageBackground source={{uri: _checkImageStatus(item.process_learn)}} style={{
                                    height: width / 10,
                                    width: width / 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: SmartScreenBase.smPercenWidth * 3
                                }}>
                                    {
                                        item.process_learn !== 100 &&
                                        <Text style={{fontSize: SmartScreenBase.smFontSize*45, fontFamily: FontBase.MyriadPro_Bold}}>{item.process_learn}</Text>
                                    }
                                </ImageBackground>
                                :
                                <Image source={{uri: 'lockmap'}} style={{
                                    resizeMode: 'contain',
                                    height: width / 10,
                                    width: width / 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    tintColor: '#222',
                                    marginRight: SmartScreenBase.smPercenWidth * 3
                                }}/>

                        }
                        <Text style={{...styles.title0, fontFamily: FontBase.MyriadPro_Bold , color:'#00A79C'}}>{lessonMath.convertSkill(item.skill)}</Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.item} onPress={() => _moveScreen(item)}>
                    <View style={{
                        width: '96%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                    }}>
                        <Text style={{...styles.titleItem, fontFamily: FontBase.MyriadPro_Bold, color: '#231F20'}}>{lessonMath.convertSkill(item.skill)}</Text>
                        {
                            item.is_blocked ==0 ?
                                <ImageBackground source={{uri: _checkImageStatus(item.process_learn)}} style={{
                                    height: width / 10,
                                    width: width / 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    right: '5%',
                                }}>
                                    {
                                        item.process_learn !== 100 &&
                                        <Text style={{
                                            fontSize: SmartScreenBase.smFontSize*45,
                                            fontFamily: FontBase.MyriadPro_Bold,
                                        }}>{item.process_learn}</Text>
                                    }
                                </ImageBackground>
                                :
                                <Image source={{uri: 'lockmap'}} style={{
                                    resizeMode: 'contain',
                                    height: width / 10,
                                    width: width / 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    right: '5%',
                                    tintColor: '#222',
                                }}/>
                        }
                    </View>
                    <View style={styles.viewIconItem}>
                        <Image source={{uri: _checkImage(item.skill)}}
                        style={styles.viewImg}/>
                    </View>
                </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <ImageBackground
                        source={{uri: 'imagebackground'}}
                        imageStyle={stylesApp.ImageBackGround}
                        style={stylesHistory.loading}>
                        <Loading/>
                    </ImageBackground>
                    :
                    null
            }
            <ImageBackground style={styles.container} source={{uri: 'bgmap'}}>
                <AppHeader  title={props.navigation.getParam('name_unit')} leftIconOnPress={() => props.navigation.goBack()} />
                <View style={{...styles.container, alignItems: 'center', width, paddingHorizontal: SmartScreenBase.smPercenWidth * 5}}>
                    <FlatList
                        data={dataListSkill}
                        renderItem={_renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        style={{width: '100%', flex: 1}}
                    />
                </View>
            </ImageBackground>
        </View>
    );

};
export default ListSkillScreen;
