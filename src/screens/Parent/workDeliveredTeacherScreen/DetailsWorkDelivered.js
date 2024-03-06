import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity, Image, Alert} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import axios from 'axios';
import {useSelector} from 'react-redux';
import API from '../../../API/APIConstant';
import LoadingScreen from '../../LoadingScreen';
import SmartScreenBase from '../../../base/SmartScreenBase';
import APIBase from '../../../base/APIBase';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

const DetailsWorkDelivered = (props) => {

    const {navigation} = props;
    const exercise_id = props.navigation.getParam('exercise_id');
    const exercise_name = props.navigation.getParam('exercise_name');
    const dataClass = useSelector(state => state.AuthStackReducer.dataClass);
    const [isLoading, setIsLoading] = useState(true);
    const [completed, setCompleted] = useState([]);
    const [inComplete, setInComplete] = useState([]);
    const [index, setIndex] = useState(0);
    const [baseUrl, setBaseUrl] = useState('');
    const [routes, setRoutes] = useState([
        {key: 0, title: 'ĐÃ CHẤM', count: 0},
        {key: 1, title: 'CHƯA CHẤM', count: 0},
    ]);

    useEffect(() => {
        _getDetals();
    }, []);

    const _getDetals = async () => {
        const url = API.baseurl + API.getDetailsWorkDelivered(dataClass.id_Class, exercise_id);
        // console.log('url', url);
        // const url = 'https://setest.gkcorp.com.vn/index.php/api/api_class/class_homework_detail?class_id=177&exercise_id=611';
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const res = await axios({method: 'get', url, headers});
            let data = res.data;
            setIsLoading(false);
            if (data.status) {
                let rt = [...routes];
                routes[0]['count'] = data.data.completed.length;
                routes[1]['count'] = data.data.incomplete.length;
                setRoutes(rt);
                setBaseUrl(data.base_url);
                setCompleted(data.data.completed);
                setInComplete(data.data.incomplete);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const _renderTime = (time) => {
        if (time) {
            let date = time.split(' ')[0].split('-');
            let date2 = time.split(' ')[1].split(':');
            return `${date2[0]}h${date2[1]}' - ${date[2]}/${date[1]}/${date[0]}`;
        }
        return '';
    };

    const _sendToRemindStudent = async (user_received_id, id) => {
        setIsLoading(true);
        const url = API.baseurl + API.remindStudent;
        const headers = {...API.header, 'Content-Type': 'application/x-www-form-urlencoded'};
        let qs = require('qs');
        const data = qs.stringify({
            user_id: user_received_id,
            exercise_id: id,
        });
        try {
            const res = await axios({method: 'post', url, headers, data});
            setIsLoading(false);
            if (res.data.status) {
                let inC = [...inComplete];
                inC.forEach((e, i) => {
                    if (e['id'] === id) {
                        inC[i]['remind'] = 1;
                        return false;
                    }
                });
                setInComplete(inC);
            }
            Alert.alert('Thông báo', res.data.msg, [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
        } catch (e) {
            setIsLoading(false);
            Alert.alert('Thông báo', e.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
            console.log('remind student', e);
        }
    };

    const _renderRemind = (item) => {
        return (
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    height: SmartScreenBase.smPercenHeight * 4,
                    width: SmartScreenBase.smPercenWidth * 20,
                    backgroundColor: '#dc4630',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: 0,
                    borderRadius: SmartScreenBase.smPercenWidth,
                    top: -SmartScreenBase.smPercenWidth,
                    zIndex: 1000
                }}
                onPress={() => _sendToRemindStudent(item.user_received_id, item.id)}
            >
                <Text style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: SmartScreenBase.smFontSize * 40,
                }}>Nhắc nhở</Text>
            </TouchableOpacity>
        );
    };

    const _renderExam = ({item, i}) => {
        return (
            <View style={{
                padding: SmartScreenBase.smPercenWidth * 5,
                paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                backgroundColor: 'white',
                borderRadius: SmartScreenBase.smPercenWidth * 3,
                marginTop: SmartScreenBase.smPercenHeight * 2,
            }}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 20,
                                        height: SmartScreenBase.smPercenWidth * 20,
                                    }}
                                    resizeMode={'contain'}
                                    source={{uri: 'avt'}}/>
                            </View>
                        </View>
                        <View style={{flex: 2.5}}>
                            {
                                index === 0
                                    ?
                                    null
                                    :
                                    item.remind === '0'
                                        ?
                                        _renderRemind(item)
                                        :
                                        <Image
                                            style={{
                                                width: SmartScreenBase.smPercenWidth * 20,
                                                height: SmartScreenBase.smPercenWidth * 22,
                                                position: 'absolute',
                                                right: 0,
                                                top: -SmartScreenBase.smPercenWidth * 10,
                                            }}
                                            resizeMode={'contain'}
                                            source={{uri: 'nhacnho'}}
                                        />

                            }
                            <Text style={{
                                fontWeight: '500',
                                fontSize: smartFont * 50,
                            }}>{item.to_fullname.length > 15 ? item.to_fullname.slice(0, 15) + '...' : item.to_fullname}</Text>
                            <View style={{
                                paddingTop: smartScreenHeight * 3,
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                            }}>
                                <Image
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 5,
                                        height: SmartScreenBase.smPercenWidth * 5,
                                    }}
                                    resizeMode={'contain'}
                                    source={{uri: 'student_home_image5'}}/>
                                <Text
                                    style={{
                                        paddingLeft: SmartScreenBase.smPercenWidth * 2,
                                        fontSize: SmartScreenBase.smFontSize * 40,
                                    }}>{`Ngày nộp ${_renderTime(index === 0 ? item.create_submit_time : item.deadline)}`}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const _renderScene = () => {
        return (
            <View style={styles.scene}>
                <FlatList
                    data={index === 0 ? completed : inComplete}
                    renderItem={_renderExam}
                    keyExtractor={(index) => index.toString()}
                />
            </View>
        );
    };

    const _renderItem = ({item, i}) => {
        return (
            <View style={{
                flex: 1,
                height: smartScreenHeight * 5,
                borderBottomWidth: index === item.key ? 3 : 0,
                borderBottomColor: '#f5bb43',
            }}>
                <TouchableOpacity
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => setIndex(item.key)}
                >
                    <Text style={{
                        color: '#fff',
                        fontWeight: index === item.key ? 'bold' : 'normal',
                    }}>{`${item.title} (${item.count})`}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _renderTabBar = () => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#fff',
                marginTop: smartScreenHeight,
            }}>
                <FlatList
                    data={routes}
                    renderItem={_renderItem}
                    keyExtractor={(index) => index.toString()}
                    scrollEnabled={false}
                    numColumns={2}
                />
            </View>
        );
    };


    return (
        <View style={{flex: 1, backgroundColor: '#3279b9'}}>
            {
                isLoading
                    ?
                    <LoadingScreen/>
                    :
                    <View style={{flex: 1}}>
                        <View style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: SmartScreenBase.smPercenHeight * 3,
                                paddingRight: SmartScreenBase.smPercenWidth * 2,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 5,
                                        height: SmartScreenBase.smPercenWidth * 5,
                                        // backgroundColor: '#fff',
                                    }}
                                    onPress={() => props.navigation.goBack()}
                                >
                                    <Image style={{
                                        width: SmartScreenBase.smPercenWidth * 5,
                                        height: SmartScreenBase.smPercenWidth * 5,
                                    }}
                                           resizeMode={'contain'}
                                           source={{uri: 'imageback'}}/>
                                </TouchableOpacity>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        color: 'white',
                                        // marginLeft: SmartScreenBase.smPercenWidth * 5,
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                        padding: smartScreenHeight,
                                    }}>{exercise_name}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            <TabView
                                navigationState={{index, routes}}
                                renderScene={_renderScene}
                                onIndexChange={setIndex}
                                initialLayout={{width: smartScreenWidth * 100}}
                                renderTabBar={_renderTabBar}
                            />
                        </View>
                    </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        marginTop: smartScreenHeight * 2,
        paddingHorizontal: smartScreenWidth * 2.5,
    },
    tabStyle: {
        fontSize: smartFont * 10,
        backgroundColor: 'red',
    },
});


export default DetailsWorkDelivered;
