import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Platform,
    FlatList,
    KeyboardAvoidingView,
    Dimensions,
    Alert,TextInput
} from 'react-native';
import styles from './style';
import API from '../../API/APIConstant';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../base/SmartScreenBase';
import apiBase from '../../base/APIBase';
import stringUtil from '../../utils/stringUtils';
import {AppHeader} from '../../componentBase/AppHeader/AppHeader';
import FontBase from '../../base/FontBase';
import { Colors } from '../../styleApp/color';

const { width, height } = Dimensions.get('window')
const ChatContentScreenNew = (props) => {
    const [dataFlastList, setDataFlastLisrt] = useState([{}]);
    const dataRedux = useSelector(state => state.AuthStackReducer.dataLogin);
    const navigation = props.navigation.getParam('item');
    const class_id = props.navigation.getParam('class_id');
    const [disabled, setDisabled] = useState(false)
    const [content, setContent] = useState();
    const resfF = useRef();
    const _isStudent = props.navigation.getParam('isStudent');


    useEffect(() => {
        let focusListener =  props.navigation.addListener('didFocus', () => {
            _getData(navigation.room_id)
        });
        // _getData(navigation.room_id)

        return ()=>{
            focusListener.remove();
        };
    }, []);

    useEffect(() => {
        if(navigation.to_user_id){
            _getDataFromResUser()
        }
    }, [navigation.to_user_id]);

    const _getData = async (room_id) => {
        if (room_id) {
            const url = `${API.baseurl}${API.api_inbox_detail}?id=${room_id}`
            apiBase.postDataJson('get',url).then(res=>{
                if(res.data.status){
                    const messages = res.data.data.reverse()
                    setDataFlastLisrt(messages);
                }else Alert.alert(res.data.msg);
                setDisabled(false)
            }).catch(e=>{
                setDisabled(false)
            })
        }
    }

    const _getDataFromResUser = async (room_id) => {
            const url = `${API.baseurl}${API.getRoomIDFrom2User}${navigation.to_user_id}`
            apiBase.postDataJson('get',url).then(res=>{
                if(res.data.status){
                    _getData(res.data.room_id)
                }else Alert.alert(res.data.msg);
                setDisabled(false)
            }).catch(e=>{
                setDisabled(false)
            })
    };

    const _convertTime = (data) => {
        if (data) {
            let date = stringUtil.parseStringToDate(data)

            let separate = _getSeparatedTime(date);
            let strTime = "";
            if (separate > 60) {
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                strTime = hours + ':' + data.slice(data.length - 5, data.length - 3) + ' ' + ampm + " " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            } else if (separate < 1){
                strTime = "Vừa xong"
            } else {
                strTime = separate + " phút trước"
            }
            return strTime
        }
    };


    const _getSeparatedTime = (time) => {

        let now = new Date();
        let seconds = Math.floor((now - time) / 1000);
        let minutes = Math.floor(seconds / 60);

        return minutes<0?1:minutes;


    }

    const _renderItem = ({ item, index }) => {
        return (
            item.user_send_id == undefined ? null : (
                item.user_send_id != dataRedux.id ?
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', marginTop: 20, marginBottom: 5, }}>
                        <Image source={{ uri: item.user_avatar != null ? API.domain + item.user_avatar : 'mhchung_image_1' }} style={{ width: 40, height: 40, resizeMode: 'cover', borderRadius: 50, marginRight: 15 }} />
                        <View style={{ width: '100%' }}>
                            <View style={{
                                borderRadius: 15, paddingBottom: 10, paddingHorizontal: 10, backgroundColor: '#fdfefd', maxWidth: '72%', shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                padding: 10,
                                paddingHorizontal: 10,
                                shadowRadius: 3.84,
                                elevation: 5,
                                marginBottom: 10
                            }}>
                                {item.type == 'class_room_chat' ? <Text style={{ color: Colors.DarkCyan, fontSize: SmartScreenBase.smFontSize*40, fontFamily: FontBase.MyriadPro_Regular }}>{item.fullname}</Text> : null}
                                <Text style={{ color: '#221F1F', fontSize: SmartScreenBase.smFontSize*45, fontFamily: FontBase.MyriadPro_Regular }}>{item.msg}</Text>
                            </View>
                            <Text style={{ fontSize: SmartScreenBase.smFontSize*45, fontFamily: FontBase.MyriadPro_Regular, color: '#686868' }}>{_convertTime(item.send_time)}</Text>
                        </View>
                    </View>
                    :
                    <View style={{ width: '100%', alignItems: 'flex-end', marginTop: 10, marginBottom: 5 }}>
                        <View style={{
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            marginBottom: 10,
                            borderRadius: 15,
                            padding: 10,
                            paddingHorizontal: 10,
                            backgroundColor: '#afe7d7',
                            maxWidth: '80%'
                        }}>
                            <Text style={{ color: '#221F1F', fontSize: SmartScreenBase.smFontSize*45, fontFamily: FontBase.MyriadPro_Regular }}>{item.msg}</Text>
                        </View>
                        <Text style={{ fontSize: SmartScreenBase.smFontSize*45, fontFamily: FontBase.MyriadPro_Regular, color: '#686868' }}>{_convertTime(item.send_time)}</Text>
                    </View>)
        )
    };
    const _postRequest = async () => {
        console.log("=====_postRequest",content, content.trim())
        if(!content || content.trim().length == 0) return
        setDisabled(true)
        const url = API.baseurl + API.send;
        const data = {};
        if (!navigation.room_id) {
            data.to_user_id = navigation.to_user_id
            data.content = content
            data.class_id = class_id
        } else {
            data.to_user_id = dataRedux.id ? navigation.to_user_id : navigation.from_user_id
            data.room_id = navigation.room_id
            data.content = content
            data.class_id = class_id
        }
        console.log('_postRequest',data)
        apiBase.postDataJson('post',url,data).then(res=>{
            console.log('res send',res);
            if(res.data.status){
                _getData(res.data.room_id)
            }
            setContent('');
            setDisabled(false)
        }).catch(e=>{
            setDisabled(false)
        })
    };

    const _goBack = () => {
        if(_isStudent){
            props.navigation.goBack();
        }else{
            props.navigation.navigate('NewChatScreen', { class_id });
        }
    };
    const _changeText = (Text) => {
        setContent(Text)
    }
    const [headName, setHeadName] = useState(navigation.room_name)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.container} >
            <AppHeader title={headName} leftIconOnPress={() => props.navigation.goBack()} />

                <View style={{ paddingHorizontal: 10, flex: 3 }}>
                    <FlatList
                        inverted
                        ref={resfF}
                        data={dataFlastList}
                        renderItem={_renderItem}
                        // onContentSizeChange={() => { resfF.current.scrollToEnd({ animated: true },) }}
                        // onLayout={() => { resfF.current.scrollToEnd() }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={{ backgroundColor: '#bdf3e2', height: SmartScreenBase.smPercenHeight*13 }}>
                    <View style={{ backgroundColor: 'white', marginTop: SmartScreenBase.smPercenHeight*3, marginHorizontal: SmartScreenBase.smPercenHeight*2, borderRadius: 10}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: SmartScreenBase.smPercenHeight*7,
                            paddingHorizontal: SmartScreenBase.smPercenHeight*1.5,
                        }}>
                            <TextInput
                                placeholder="Soạn nội dung"
                                autoCorrect={false}
                                onChangeText={_changeText}
                                multiline={true}
                                value={content}
                                numberOfLines={3}
                                style={{
                                    width: '80%',
                                    fontFamily: FontBase.MyriadPro_Regular,
                                    fontSize: SmartScreenBase.smFontSize*45
                                }}
                            />
                            <TouchableOpacity
                            disabled={disabled}
                            onPress={_postRequest}>
                                <Image source={{ uri: 'iconsend' }} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

export default ChatContentScreenNew;
