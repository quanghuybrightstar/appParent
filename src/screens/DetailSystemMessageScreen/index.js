import React, { useEffect, useState } from 'react';
import {View,TouchableOpacity,Image,Text,ImageBackground, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../base/SmartScreenBase';
import DeviceInfo from 'react-native-device-info';
import Button from '../../commons/Button';
import api from '../../API/APIConstant';
import FontBase from '../../base/FontBase';
import API from '../../API/APIConstant';
import APIBase from '../../base/APIBase';
import LogBase from '../../base/LogBase';
import { AppHeader } from '../../componentBase/AppHeader';

const getLink = (s)=>{
    if (!s)
    {return s;}
    if (s.indexOf('http') == 0)
    {return s;}
    return `${api.domain}${s}`;
};

const Screen = ({navigation})=>{

    const [item, setItem] = useState(navigation.getParam('item'));
    useEffect(() => {
        LogBase.log("=====item.room_id",item)
        // let focusListener =  navigation.addListener('didFocus', () => {
            _getData(item.msg_id);
        // });
        // _getData(navigation.room_id)

        // return ()=>{
        //     focusListener.remove();
        // };
    }, []);

    const _getData = async (mes_id) => {
        LogBase.log("=====mes_id",mes_id)
        if (mes_id) {
            var data = {
                msg_id: mes_id
            }
            const url = `${API.baseurl}${API.mark_system_seen}`;
            APIBase.postDataJson('put',url,data).then(res=>{
                LogBase.log("=====mark_system_seen",res.data)
                setItem(res.data.data[0])
                if (res.data.status){
                } else {Alert.alert(res.data.msg);}
            }).catch(e=>{
            });
        }
    };

    return <ImageBackground
        source={{uri:'bgtuvung'}}
        style={{
            flex:1,
        }}>
        <AppHeader title={'Chi tiết thông báo'} leftIconOnPress={() => { navigation.pop();}}/>
        <View style={{
            flex:1,
            alignItems:'center',
        }}>
            <Text style={{
                fontSize:SmartScreenBase.smFontSize * 55,
                color:'#000',
                marginVertical:SmartScreenBase.smPercenHeight * 2,
                fontFamily: FontBase.MyriadPro_Bold,
                marginHorizontal:SmartScreenBase.smPercenWidth * 2,
                marginTop: SmartScreenBase.smPercenWidth*10,
                textAlign: 'center'
            }}>
                {item.title}
            </Text>
            {
                !!item.file_link &&
                <Image
                    source={{uri:getLink(item.file_link)}}
                    style={{
                        width:SmartScreenBase.smPercenWidth * 90,
                        height:SmartScreenBase.smPercenWidth * 65,
                    }}
                />
            }
            <Text style={{
                fontSize:SmartScreenBase.smFontSize * 50,
                color:'#000',
                marginTop:SmartScreenBase.smPercenHeight * 2,
                fontFamily: FontBase.MyriadPro_Regular,
                paddingHorizontal:SmartScreenBase.smPercenWidth * 5,
                width:'100%',
                marginBottom:SmartScreenBase.smPercenHeight * 5,
            }}>
                {item.msg}
            </Text>
            {/* <Button   title="Xem chi tiết"/> */}
        </View>
    </ImageBackground>;
};

export default Screen;
