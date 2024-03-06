import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Keyboard,
    Alert,
    StyleSheet,
    Dimensions,
    ActivityIndicator,FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react';
const { width, height } = Dimensions.get('window');
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from './style';
import APIBase from '../../../src/base/APIBase';
// import { FlatList } from 'react-native-gesture-handler';
import API from '../../API/APIConstant';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
import SmartScreenBase from '../../base/SmartScreenBase';
import stringUtils from '../../utils/stringUtils';
import FontBase from '../../base/FontBase';
import { AppHeader } from '../../componentBase/AppHeader';
import { Colors } from '../../styleApp/color';

const SendMessageScreenNew = (props) => {
    const [routes] = useState([
        { key: 'first', title: 'Học sinh' },
        { key: 'second', title: 'Phụ huynh' },
    ]);
    const [indexRoute, setIndexRoute] = useState(0);
    const [studentContact, setStudentContact] = useState([]);
    const [parentContact, setParentContact] = useState([]);

    const class_id = props.navigation.getParam('class_id');
    const [loading,setLoading] = useState(true);
    const [textFilter,setTextFilter] = useState('');
    const _isStudent = props.navigation.getParam('isStudent');

    useEffect(() => {
        _getData(_isStudent ? 'student' : 'teacher');
    }, []);

    const _getData = async (role) => {
        let url = `${API.baseurl}${API.list_contact}?user_role=${role}&class_id=${_isStudent ? '' : class_id}`;
        try {
            var res = await APIBase.formDataAPI('get', url, null);
            var data = JSON.parse(res.data);

            if (data.status) {
                console.log('contact',data);
                if (!_isStudent){
                    setStudentContact(data.data_contact.filter(e=>e.user_role == 'student'));
                    setParentContact(data.data_contact.filter(e=>e.user_role == 'parent'));
                } else {
                    setStudentContact(data.data_contact.filter(e=>e.user_role == 'teacher'));
                }
            } else {
                Alert('có lỗi xảy ra' + data.msg);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const _tab = () => {
        if (loading)
        {return <ActivityIndicator color={'#dcdcdc'} style={{marginTop:SmartScreenBase.smPercenHeight}}/>;}
        let items =  indexRoute == 0 ? studentContact : parentContact;

        if (textFilter){
            const ft = stringUtils.removeAccents(textFilter).toLowerCase();
            items = items.filter(c=>stringUtils.removeAccents(c?.fullname?.toLowerCase() ?? '').indexOf(ft) >= 0);
        }

        return (
            <View>
                <FlatList
                    data={items}
                    renderItem={_render}
                    keyExtractor={(item, index) => item.user_id + index.toString()}
                    ListEmptyComponent={()=>{
                        return <View style={{
                            alignSelf: 'center',
                            marginTop: 20,
                        }}>
                            <Text style={{fontSize: SmartScreenBase.smFontSize*55, fontFamily: FontBase.MyriadPro_Regular}}>Không tìm thấy kết quả</Text>
                        </View>;
                    }}
                />
            </View>
        );
    };

    const _render = (single) => {
        let data = single.item;
        let fullName = indexRoute == 1 ? 'Phụ huynh ' + data.child_name : data.fullname;
        return (
            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 16,
                marginVertical: 12,
            }}

            onPress={()=>{
                if (_isStudent){
                    console.log('data',data);
                    props.navigation.navigate('ChatContentScreenStudent',{
                        item :{
                            room_name : data.fullname,
                            to_user_id : data.user_id,
                        },
                        class_id:class_id,
                        isStudent:_isStudent,
                    });
                } else {
                    console.log("=====Haha",data)
                    props.navigation.navigate('ChatContentScreenNew',{
                        item :{
                            room_name : indexRoute == 1 ? 'Phụ huynh ' + data.child_name : data.fullname,
                            to_user_id : data.user_id,
                        }, class_id:class_id,
                    });
                }
            }
            }
            >
                <View style={{ borderRadius: 80, borderWidth: 2, borderColor: Colors.Orange}}>
                    <Image style={{ width: SmartScreenBase.smPercenWidth*16, height: SmartScreenBase.smPercenWidth*16, borderRadius: 80 }}
                        source={{
                            uri: data.avatar != null ? (API.domain + data.avatar)
                                : ( data.gender == 'female' ? 'gv_liststudent_09' : 'gv_liststudent_11'),
                        }}
                    />
                </View>
                <Text style={{ fontSize: 20, color: '#000', paddingHorizontal: 12,  flex: 1, fontFamily: FontBase.MyriadPro_Regular }}>{fullName}</Text>
            </TouchableOpacity>
        );
    };

    const _renderTab = () => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: Colors.Gray,
                borderBottomWidth: 1,

            }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        borderBottomColor: indexRoute == 0 ? 'orange' : '',
                        borderBottomWidth: indexRoute == 0 ? 2 : 0,
                        paddingBottom: 10,
                        marginTop: 7,
                    }}
                    onPress={() => setIndexRoute(0)
                    }>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: FontBase.MyriadPro_Regular }}>{'Học sinh'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        borderBottomColor: indexRoute == 1 ? 'orange' : '',
                        borderBottomWidth: indexRoute == 1 ? 2 : 0,
                        marginTop: 7,
                    }}
                    onPress={() => setIndexRoute(1)
                    }>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: FontBase.MyriadPro_Regular }}>{'Phụ huynh'}</Text>
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}>

            <AppHeader
                title="Tin nhắn mới"
                leftIconOnPress={()=> {
                    if (_isStudent){
                        props.navigation.goBack();
                    } else {
                        props.navigation.navigate('NewChatScreen', {class_id});
                    }
                }}
                containerStyle={{
                    paddingBottom: 0
                }}
            />
            <View style={{flex: 1}}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#00B9B7', '#00E2A0']} style={styles.ViewHeaderContainer}>
                <View style={{
                    // marginTop:DeviceInfo.hasNotch() ? 35 : 15,
                    width:'100%',
                }}>
                    {/* <View style={{
                        flexDirection:'row',
                    }}>
                        <TouchableOpacity
                            style={{paddingRight:10}}
                            onPress={()=>{
                                if (_isStudent){
                                    props.navigation.goBack();
                                } else {
                                    props.navigation.navigate('NewChatScreen', {class_id});
                                }
                            }}>
                            <Image style={styles.iconBack} source={{ uri: 'imageback' }} />
                        </TouchableOpacity>
                        <Text style={styles.titleHeader}>Tin nhắn mới</Text>
                    </View> */}
                    <View style={{
                        // marginTop: SmartScreenBase.smPercenHeight * 2,
                        flexDirection:'row',
                        backgroundColor: 'white',
                        borderRadius: 25,
                        paddingVertical:SmartScreenBase.smPercenWidth * 2,
                        paddingHorizontal:SmartScreenBase.smPercenWidth * 4,
                        marginHorizontal:SmartScreenBase.smPercenWidth,
                    }}>
                        <View style={{
                            borderRightColor: 'black',
                            borderRightWidth: 1,
                            paddingRight: SmartScreenBase.smPercenWidth * 2,
                        }}>
                            <Image source={{uri: 'btn_search'}} style={{width: SmartScreenBase.smPercenWidth*6, height: SmartScreenBase.smPercenWidth*6, resizeMode: 'contain'}}/>
                        </View>
                        <TextInput
                            style={{
                                paddingLeft: SmartScreenBase.smPercenWidth * 2,
                                alignItems: 'center',
                                flex:1,
                                fontSize:SmartScreenBase.smFontSize * 45,
                                paddingVertical:0,
                                fontFamily: FontBase.MyriadPro_Regular,
                            }}
                            placeholder="Tìm người nhận"
                            placeholderTextColor="#8F8F8F"
                            onChangeText={(text) => setTextFilter(text)}
                            value={textFilter}
                        />
                    </View>
                </View>
            </LinearGradient>
            <View style={{paddingBottom: SmartScreenBase.smPercenWidth*3 ,height: SmartScreenBase.smPercenHeight*(100-6) - SmartScreenBase.smBaseHeight*40 - SmartScreenBase.smPercenWidth*8}}>
                {
                    !_isStudent ? <TabView
                        navigationState={{ index: indexRoute, routes }}
                        renderScene={SceneMap({
                            first: _tab,
                            second: _tab,
                        })}
                        initialLayout={{ width: Dimensions.get('window').width }}
                        renderTabBar={() => _renderTab()}
                        onIndexChange={setIndexRoute}
                    /> : _tab()
                }
            </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SendMessageScreenNew;
