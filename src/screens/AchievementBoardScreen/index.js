import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, FlatList, Alert, Dimensions } from 'react-native'
import styles from './style';
import axios from 'axios';
import SmartScreenBase from '../../base/SmartScreenBase';
import { useSelector } from 'react-redux'
import API from '../../API/APIConstant';
import LogBase from '../../base/LogBase';
let smartPhone = SmartScreenBase.smFontSize;
const { width, height } = Dimensions.get('window');

const AchievementBoardScreen = (props) => {
    const [dataFlastList, setDataFlasList] = useState([])
    const storeRedux = useSelector(state => state.AuthStackReducer.dataClass)
    useEffect(() => {
        _getData()
    }, []);
    // console.log(smartPhone* 20)
    const _getData = async () => {
        const url = API.baseurl+'api_class/ranking?id=' + storeRedux.id_Class;
        const headers = {
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            LogBase.log("=====API",url)
            const ressponse = await axios({ method: 'get', headers, url })
            LogBase.log("=====res",ressponse.data)
            if (ressponse.status) {
                setDataFlasList(ressponse.data.data)
            } else {
                Alert.alert('Thông báo', `${ressponse.data.msg}`)
            }
        } catch (error) {
            console.log(error)
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
    };
    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.viewFlasList}>
                <View style={styles.viewInfo}>
                    <ImageBackground source={{ uri: 'avt' }} style={styles.viewIamge}>
                        <Image source={{ uri: `${item.avatar}` }} style={styles.imageAvatar} />
                    </ImageBackground>
                    <View style={{
                        position: 'absolute',
                        width: '80%',
                        backgroundColor: _changeColor(item),
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 5,
                        borderRadius: 25,
                        bottom: '25%'
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', }}>{item.fullname}</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#fff',
                        position: 'absolute', bottom: 5,
                        width: '97%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        paddingVertical: 2
                    }} >
                        <Text style={{ fontSize: 13, fontWeight: 'bold', }}>{_changeText(item)}</Text>
                    </View>
                </View>
                <View style={{ width: '35%', height: '100%', }}>
                    <Image source={{ uri: _changeImage(item) }} style={{ resizeMode: 'cover', width: '100%', height: '100%' }} />
                </View>
            </View>
        )
    }
    const _changeColor = (item) => {
        if (item.type == 'top_1') {
            return "#DC4630"
        } else if (item.type == 'top_completed') {
            return '#1B75BB'
        } else if (item.type == 'top_change_rank') {
            return '#355602'
        } else if (item.type == 'top_speed') {
            return "#064F44"
        } else {
            return '#6D1D02'
        }
    }
    const _changeText = (item) => {
        if (item.type == 'top_1') {
            return "Đạt điểm cao nhất"
        } else if (item.type == 'top_completed') {
            return "Đã hoàn thành " + item.number_completed + ' bài tập'
        } else if (item.type == 'top_change_rank') {
            return "Leo lên " + item.number_rank_change + ' bậc'
        } else if (item.type == 'top_speed') {
            return "Hoàn thành bài tập nhanh nhất"
        } else {
            return "Để quá hạn " + item.total_expired + ' bài tập'
        }
    }
    const _changeImage = (item) => {
        if (item.type == 'top_1') {
            return "vodich"
        } else if (item.type == 'top_completed') {
            return "caycuoc"
        } else if (item.type == 'top_change_rank') {
            return "leoranh"
        } else if (item.type == 'top_speed') {
            return "thangio"
        } else {
            return "luoibieng"
        }
    }
    const convertText = (text) => {
        let title;
        if(text.length <=15){
            title = text
        }else{
            title = text.slice(0,26) +'...'
        }
        return title
    }
    return (
        <ImageBackground
            source={{ uri: 'imagebackground' }}
            style={styles.container}
        >
            <View style={styles.header}>
                <View style={styles.ViewBack}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Image source={{ uri: 'imageback' }} style={styles.iconBack} />
                    </TouchableOpacity>
                    {/* <Text style={styles.titleHeader}>Bảng thành tích</Text> */}
                    <Text style={{ ...styles.titleHeader, fontWeight: 'bold',}} numberOfLines={1}>{storeRedux.className}</Text>
                </View>
            </View>
            <View style={{ height: height / 1.15 }}>
                <FlatList
                    data={dataFlastList}
                    renderItem={_renderItem}
                    // keyExtractor={(item, index ) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{ paddingTop: 20, height: height / 4, }}
                />

            </View>
        </ImageBackground>
    )
}
export default AchievementBoardScreen;