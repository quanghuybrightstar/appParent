import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Dimensions,
    ActivityIndicator,
    Platform,
} from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import EmptyBox from './EmptyBox';
import font from '../../base/FontBase';
import API from '../../API/APIConstant';
import APIBase from '../../base/APIBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import FontBase from '../../base/FontBase';
import { AppHeader } from '../../componentBase/AppHeader';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../styleApp/color';
import LogBase from '../../base/LogBase';

const { width, height } = Dimensions.get('window');
var newSym = 0, newPes = 0;

const NewChatScreen = (props) => {
    const [data, setData] = useState([]);
    const [systemChatData, setSystemChatData] = useState([]);
    const [isLoadingPer, setIsLoadingPer] = useState(true);
    const [isLoadingSym, setIsLoadingSym] = useState(true);
    const dataRedux = useSelector(state => state.AuthStackReducer.dataLogin);
    const itemClass = useSelector(state => state.AuthStackReducer.itemClass);
    const dataStudent = useSelector(state => state.ListStudentReducer.dataStudent);
    const class_id = props.navigation.getParam('class_id');
    const sumStudent = props.navigation.getParam('class_sum_Student');
    const class_name = props.navigation.getParam('class_name');
    const [index, setIndex] = useState(0);
    const [notiNotReadPes, setNotiNotReadPes] = useState(0);
    const [notiNotReadSym, setNotiNotReadSym] = useState(0);
    // offset for loadmore
    const [offset, setOffset] = useState(0)
    // flag to check if screen reach end
    const [isReachedEnd, setReachedEnd] = useState(false)
    // flag to check if all data is loaded
    const [isEnd, setIsEnd] = useState(false)
    
    const [routes] = useState([
        { key: 'first', title: 'cá nhân' },
        { key: 'second', title: 'hệ thống' },
    ]);

    const _isStudent = props.navigation.getParam('student');

    useEffect(() => {
        console.log('addd listen');
        newSym = 0
        newPes = 0
        var listener = props.navigation.addListener('didFocus', () => {
            _getData();
            _getConfigChat();
        });
        // _getData()

        const interval = setInterval(() => {
            _getData();
            _getConfigChat();
        }, 90000);
        return ()=>{
            console.log('remove listen');
            listener.remove();
            clearInterval(interval);
        };
    }, []);



    const _getConfigChat = async () => {
        var url = API.baseurl + 'api_inbox/inbox_system?class_id=' + class_id;
        if (_isStudent) {url = API.baseurl + 'api_inbox/inbox_system';}
        APIBase.postDataJson('get',url).then(res=>{
            console.log('_getConfigChat',res.data);
            if (res.data.status){
                setSystemChatData(res.data.data);
                newSym = res.data.number_system_new
                setNotiNotReadSym(res.data.number_system_new)
            }
            setIsLoadingSym(false);
        }).catch(e=>{
            setIsLoadingSym(false);
        });
    };

    // const _getConfigChat = async () => {
    //     var url = API.baseurl + 'api_inbox/inbox_system?class_id=' + class_id + `?offset=0&limit=20&`;
    //     if (_isStudent) {url = API.baseurl + 'api_inbox/inbox_system' + `?offset=0&limit=20&`;}
    //     APIBase.postDataJson('get',url).then(res=>{
    //         console.log('_getConfigChat',res.data);
    //         if (res.data.status){
    //             setSystemChatData(res.data.data);
    //             newSym = res.data.number_system_new
    //         }
    //         // setIsLoading(false);
    //     }).catch(e=>{
    //         // setIsLoading(false);
    //     });
    // };

    const _getData = async () => {
        var url = API.baseurl + API.api_inbox+ '?class_id=' + class_id;
        if (_isStudent) {url = API.baseurl + API.api_inbox;}
        APIBase.postDataJson('get',url).then(res=>{
            if (res.data.status){
                var noti = parseInt(res.data.number_msg_new);
                LogBase.log('=======res.data.data',noti);
                newPes = noti
                setNotiNotReadPes(noti)
                setData(res.data.data);
            }
            setIsLoadingPer(false);
        }).catch(e=>{
            setIsLoadingPer(false);
        });
    };

    const loadMoreSymMes = () => {
        if (isReachedEnd || isLoadingSym || isEnd) return;
        setReachedEnd(true)
        var url = API.baseurl + 'api_inbox/inbox_system?class_id=' + class_id + `?offset=${offset + 20}&limit=20&`;
        if (_isStudent) {url = API.baseurl + 'api_inbox/inbox_system' + `?offset=${offset + 20}&limit=20&`;}
        APIBase.tokenAPI('get', url).then(r => {
            setReachedEnd(false)
            LogBase.log("=====loadMoreSymMes",r.data)
            setOffset(offset + 20)
            if (r.data.data.length === 0) setIsEnd(true)
            setSystemChatData(systemChatData.concat(r.data.data))
            LogBase.log("=====mData",systemChatData.length)
        }).catch((err) => {
            console.log('err', err)
            setReachedEnd(false)
        })
    }

    const _convertTime = (date) => {
        if (!date) {return '';}
        date = String(date).split(' ');
        var days = String(date[0]).split('-');
        var hours = String(date[1]).split(':');
        return days[2] + '/' + days[1] + '/' + days[0] + ' ' + hours[0] + ':' + hours[1];
    };

    function debounceEvent(callback, time) {
        let interval;
        return () => {
            clearTimeout(interval);
            interval = setTimeout(() => {
                interval = null;

                // eslint-disable-next-line
                callback(arguments);
            }, time);
        };
    }

    const _moveChatContentScreen = (item) => {
        LogBase.log("=====_moveChatContentScreen",item)
        props.navigation.navigate(_isStudent ? 'ChatContentScreenStudent' : 'ChatContentScreenNew', {
            item,
            class_id: class_id,
            isStudent:_isStudent,
        });
    };
    const _gotoDetailSystem = (item)=>{
        LogBase.log("=====_gotoDetailSystem",_isStudent)
        props.navigation.navigate(_isStudent ? 'DetailSystemMessageScreenStudent' : 'DetailSystemMessageScreen',{item,isStudent:_isStudent});
    };
    const _moveSendM = () => {
        LogBase.log("=====_moveSendM",_isStudent)
        props.navigation.navigate(_isStudent ? 'SendMessageScreenNewStudent' : 'SendMessageScreenNew', {
            class_id: class_id,
            isStudent:_isStudent,
        });
    };

    const _getWeight = (status) => {
        return status != 2 ? font.MyriadPro_Bold : font.MyriadPro_Bold;
    };

    const PersonalMessageItem  = ({ item, index }) => {

        const [onPressAct, setOnPress] = React.useState(-1)

        const seen = item.seen_latest_msg_status === '1';
        const isSentByMe = item.last_user_send_id === item.user_id;
        const lastNameSend = item.last_name_send;
        return (
            <TouchableOpacity style={styles.ViewContent} 
            onPress={() => _moveChatContentScreen(item)}
            onPressIn={()=>setOnPress(index)}
            onPressOut={()=>{setOnPress(-1)}}
            >
                <View style={[{
                    backgroundColor: '#fefefe',
                    width: width / 1.15,
                    height: 90,
                    paddingVertical: 10,
                    paddingLeft: 40,
                    paddingRight: 10,
                    borderRadius: SmartScreenBase.smBaseWidth * 40,
                }, 
                onPressAct != index && {
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    borderWidth:1,
                    borderColor:'#ececec',
                    shadowColor:'#000',
                }
                ]}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[{
                                fontSize: SmartScreenBase.smFontSize * 50,
                                fontFamily: seen ? FontBase.MyriadPro_Regular : FontBase.MyriadPro_Bold,
                            }, seen && styles.messageTitleSeenTxt]}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            >{item.room_name?.trim()}</Text>
                        </View>
                        <Text style={[{
                            fontSize: SmartScreenBase.smFontSize * 36,
                            fontFamily: FontBase.MyriadPro_Regular,
                            color: seen ? '#9C9EA0' : '#000',
                            marginTop: SmartScreenBase.smPercenWidth
                        }]}
                        >{_convertTime(item.latest_msg_time)}</Text>
                    </View>
                    <Text style={[styles.titleContent, {
                        fontFamily: FontBase.MyriadPro_Regular,
                        color: seen ? '#9C9EA0' : '#000',
                    }]} numberOfLines={2}>
                        {`${isSentByMe ? 'Bạn: ' : lastNameSend ? (lastNameSend+": ") : '' }${item.latest_msg_content?.trim() || 'Chưa có tin nhắn nào'}`}
                    </Text>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: -25,
                    }}>
                        <FastImage
                            source={{uri: item.avatar != null ? API.domain + item.avatar : 'mhchung_image_1'}}
                            //source={{uri: item.avatar != null ? API.domain + item.avatar : 'mhchung_image_1'}}
                            style={{ width: 50, height: 50, borderRadius: SmartScreenBase.smPercenWidth*25, borderWidth: 2, borderColor: Colors.Orange }} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderPersonalMessageItem = ({item, index}) => {

        const [onPressAct, setOnPress] = React.useState(-1)

        const seen = item.seen_latest_msg_status === '1';
        const isSentByMe = item.last_user_send_id === item.user_id;
        return (
            <TouchableOpacity style={styles.ViewContent} 
            onPress={() => _moveChatContentScreen(item)}
            onPressIn={()=>setOnPress(index)}
            onPressOut={()=>{setOnPress(-1)}}
            >
                <View style={[{
                    backgroundColor: '#fefefe',
                    width: width / 1.15,
                    height: 90,
                    paddingVertical: 10,
                    paddingLeft: 40,
                    paddingRight: 10,
                    borderRadius: SmartScreenBase.smBaseWidth * 40,
                }, 
                onPressAct != index && {
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    borderWidth:1,
                    borderColor:'#ececec',
                    shadowColor:'#000',
                }
                ]}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[{
                                fontSize: SmartScreenBase.smFontSize * 50,
                                fontFamily: seen ? FontBase.MyriadPro_Regular : FontBase.MyriadPro_Bold,
                            }, seen && styles.messageTitleSeenTxt]}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            >{item.room_name?.trim()}</Text>
                        </View>
                        <Text style={[{
                            fontSize: SmartScreenBase.smFontSize * 36,
                            fontFamily: FontBase.MyriadPro_Regular,
                            color: seen ? '#9C9EA0' : '#000',
                        }]}
                        >{_convertTime(item.latest_msg_time)}</Text>
                    </View>
                    <Text style={[styles.titleContent, {
                        fontFamily: FontBase.MyriadPro_Regular,
                        color: seen ? '#9C9EA0' : '#000',
                    }]} numberOfLines={2}>
                        {`${isSentByMe ? 'Bạn: ' : '' }${item.latest_msg_content?.trim()}`}
                    </Text>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: -25,
                    }}>
                        <FastImage
                            source={{uri: item.avatar != null ? API.domain + item.avatar : 'mhchung_image_1'}}
                            //source={{uri: item.avatar != null ? API.domain + item.avatar : 'mhchung_image_1'}}
                            style={{ width: 50, height: 50, borderRadius: SmartScreenBase.smPercenWidth*25, borderWidth: 2, borderColor: Colors.Orange }} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const SystemMessagesItem = ({ item, index }) => {

        const [onPressAct, setOnPress] = React.useState(-1)
        // LogBase.log("SystemMessagesItem", item)

        const seen = item.seen_latest_msg_status === '1';
        return (
            <TouchableOpacity style={styles.ViewContent} onPress={() => _gotoDetailSystem(item)}
            onPressIn={()=>setOnPress(index)}
            onPressOut={()=>{setOnPress(-1)}}>
                <View style={[{
                    backgroundColor: '#fefefe',
                    width: width / 1.15,
                    paddingVertical: 10,
                    paddingLeft: 40,
                    paddingRight: 10,
                    borderRadius: SmartScreenBase.smBaseWidth * 40,
                }, onPressAct != 1 && {
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    borderWidth:1,
                    borderColor:'#ececec',
                    shadowColor:'#000',
                }]}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text style={
                            [
                                {
                                    fontSize: SmartScreenBase.smFontSize * 50,
                                    fontFamily: seen ? FontBase.MyriadPro_Regular : FontBase.MyriadPro_Bold,
                                    flex: 1,
                                    color: seen ? '#9C9EA0' : '#000',
                                },
                            ]
                        }
                        numberOfLines={1}>{item.title ?? 'Hệ thống'}
                        </Text>
                        <Text
                            style={
                                [
                                    {
                                        fontFamily: FontBase.MyriadPro_Regular,
                                        color: seen ? '#9C9EA0' : '#000',
                                        fontSize: SmartScreenBase.smFontSize * 32,
                                    },
                                ]
                            }
                        >
                            {_convertTime(item.send_time)}
                        </Text>
                    </View>
                    <Text style={[styles.titleContent, {
                        fontFamily: FontBase.MyriadPro_Regular,
                        color: seen ? '#9C9EA0' : '#000',
                    }]}
                    ellipsizeMode={'tail'}
                    numberOfLines={2}>{item.msg}</Text>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: -25,
                        borderColor: '#8febd9',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image source={{ uri: 'student_setting_image9' }}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderEmptyBox = useCallback(()=> {
        return (
            <View style={styles.ViewFlastList}>
                <EmptyBox />
            </View>
        );
    }, []);

    const FirstRoute = () => {
        if (isLoadingPer)
        {return <ActivityIndicator color={'green'} style={{marginTop:SmartScreenBase.smPercenHeight * 5}}/>;}

        return  <View style={styles.ViewFlastList}>
            <FlatList
                ListEmptyComponent={renderEmptyBox}
                data={data}
                renderItem={({item, index})=> <PersonalMessageItem item={item} index={index} /> }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>;
    };

    const SecondRoute = () => {
        if (isLoadingSym)
        {return <ActivityIndicator color={'#dcdcdc'} style={{marginTop:SmartScreenBase.smPercenHeight * 5}}/>;}
        return <View style={styles.ViewFlastList}>
            <FlatList
                data={systemChatData}
                renderItem={({item, index})=><SystemMessagesItem  item={item} index={index} />}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={()=>{
                    return <Text style={{
                        textAlign: 'center',
                        marginLeft:SmartScreenBase.smPercenWidth * 5,
                        fontSize:SmartScreenBase.smFontSize * 45,
                        fontFamily: FontBase.MyriadPro_Regular,
                    }}>Không có thông báo</Text>;
                }}
                // onEndReached={debounceEvent(() => {
                //     loadMoreSymMes();
                // }, 200)}
                ListFooterComponent={() => (
                    <View style={{ marginVertical: 15 }}>
                        {isReachedEnd && <ActivityIndicator />}
                    </View>
                )}
            />
        </View>;
    };
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    const _renderTap = useCallback((props) => {
        let index = props.navigationState.index;
        let notiNotReadPes = props.navigationState.notiNotReadPes
        let notiNotReadSym = props.navigationState.notiNotReadSym
        console.log("=====props",props.navigationState)
        return <View style={{
            height: height / 10,
            width,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SmartScreenBase.smPercenHeight * 2,
            borderBottomColor: '#E5E3E3',
            borderBottomWidth: 1,
        }}>
            <TouchableOpacity
                onPress={() => setIndex(0)}
                style={{
                    height: '100%',
                    borderBottomWidth: props.navigationState.index == '0' ? 2 : 0,
                    borderBottomColor: props.navigationState.index == '0' ? '#e8bf5e' : undefined,
                    justifyContent: 'space-around',
                    flex: 1,
                    alignItems: 'center',
                    paddingBottom: SmartScreenBase.smPercenHeight * 2,
                }}

            >
                <ImageBackground source={{ uri: 'iconchat' }} style={{ resizeMode: 'contain', width: width / 9, height: width / 9 }} >

                    {
                        notiNotReadPes == 0 ?
                            null :
                            <View style={{
                                right: -width / 23,
                                position: 'absolute',
                                width: width / 15,
                                backgroundColor: '#af3033',
                                height: width / 15,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{ color: '#fff' , fontFamily: FontBase.MyriadPro_Regular, fontSize: SmartScreenBase.smFontSize * 45}}>{notiNotReadPes}</Text>
                            </View>

                    }
                </ImageBackground>
                <Text style={{ textTransform: 'uppercase', color: '#58595b', fontSize: 20, fontFamily: props.navigationState.index == 0 ? FontBase.MyriadPro_Bold  : FontBase.MyriadPro_Light, paddingTop: 15 }}>{props.navigationState.routes[0].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setIndex(1)}
                style={{
                    height: '100%',
                    justifyContent: 'space-around',
                    flex: 1,
                    alignItems: 'center',
                    borderBottomWidth: props.navigationState.index == '1' ? 2 : 0,
                    borderBottomColor: props.navigationState.index == '1' ? '#e8bf5e' : undefined,
                    paddingBottom: SmartScreenBase.smPercenHeight * 2,
                }}>
            <ImageBackground source={{ uri: 'icontb' }} style={{ resizeMode: 'contain', width: width / 9, height: width / 9 }} >
            {
                notiNotReadSym == 0 ?
                    null :
                    <View style={{
                        right: -width / 23,
                        position: 'absolute',
                        width: width / 15,
                        backgroundColor: '#af3033',
                        height: width / 15,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: '#fff' , fontFamily: FontBase.MyriadPro_Regular, fontSize: SmartScreenBase.smFontSize * 45}}>{notiNotReadSym}</Text>
                    </View>

                    }
                    </ImageBackground>
                <Text style={{ textTransform: 'uppercase', color: '#58595b', fontSize: 20, fontFamily: props.navigationState.index == 1 ? FontBase.MyriadPro_Bold  : FontBase.MyriadPro_Light,paddingTop: 15 }}>{props.navigationState.routes[1].title}</Text>
            </TouchableOpacity>
        </View>;
    }, []);

    return (
    // !sumStudent && dataRedux.role === 'parent' && dataRedux.role !== 'student'
    //     ?
    //     <>
    //     {console.log("==========parent")}
    //     <LoginFirstComponentParent /> </>
    //     :
        <View style={styles.container} >
            <AppHeader
                title={class_name || 'Tin nhắn'}
                leftIconOnPress={() => {props.navigation.goBack();}}
            />
            {!isLoadingPer && !isLoadingSym ? <TabView
                lazy
                navigationState={{ index, routes, notiNotReadPes, notiNotReadSym}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={width}
                renderTabBar={_renderTap}
            /> :
            <View style={{marginTop: SmartScreenBase.smPercenHeight*40}}>
                <ActivityIndicator size="large"/>
            </View>}

            {index === 0 && <TouchableOpacity style={styles.butttonAddUser} onPress={_moveSendM}>
                <Image source={{ uri: 'plus_teacher' }} style={styles.iconAddUser} />
            </TouchableOpacity>}
        </View>
    );
};

export default NewChatScreen;
