import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Animated,

} from 'react-native';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');
import styles from './style';
import VirusAchievement from '../../component/VirusAchievement';
import LinearGradient from 'react-native-linear-gradient';
import Dash from 'react-native-dash';
import GradientDetails from './gradientDetails'
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
const RankScreen = (props) => {

    const _getTime = (date) => {
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            second = date.getSeconds();
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + second
    }
    const _getDataChar = async () => {
        let date = new Date();
        let dateTo = await _getTime(date);
        let from = new Date();
        from.setDate(from.getDate() - 7);
        let DateFrom = await _getTime(from);
        const url = API.baseurl + API.learning_history + id + '&from_time=' + DateFrom + '&to_time=' + dateTo
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': dataClasss.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        }
        console.log('asdasdURL', url)
        try {
            const response = await axios({ method: 'get', url, headers });
            let DataChart = await _converDataChart(response.data.data_detail);
        } catch (error) {
            console.log(error)
        }
    };
    const [data, setData] = useState([
        { value: 6, day: '1/9', checked: false },
        { value: 6.5, day: '2/9', checked: false },
        { value: 4, day: '3/9', checked: false },
        { value: 9.25, day: '4/9', checked: false },
        { value: 0, day: '1/10', checked: false },
        { value: 0, day: '2/10', checked: false }
    ]);
    const [checked, setCkecked] = useState(false);
    const [index, setIndex] = useState(0)
    const _checked = (index) => {
        let array = [...data]
        array.map((item, int) => {
            array[int].checked = false
            if (int == index) {
                array[index].checked = true
            }
        })
        setCkecked(true)
        setIndex(index)
        setData(array)
    }
    return (
        <ImageBackground source={{ uri: 'bgtt' }} style={styles.container}>
            <View style={styles.ViewHeaderContainer}>
                <View style={styles.viewBack}>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                        <Image style={styles.iconBack} source={{ uri: 'imageback' }} />
                    </TouchableOpacity>
                    <Text style={styles.titleHeader}>{props.navigation.getParam('item').lessson}</Text>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.viewDetails}>
                    <View style={{ width, paddingHorizontal: '7%', marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: SmartScreenBase.smFontSize*50, color: '#3d83a5', fontFamily: FontBase.MyriadPro_Bold }}>ĐIỂM TRUNG BÌNH</Text>
                        <TouchableOpacity style={{
                            paddingHorizontal: 10,
                            backgroundColor: '#327ba0',
                            flexDirection: 'row',
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50
                        }}>
                            <Image source={{ uri: 'muitenxuong' }} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 5 }} />
                            <Text style={{ color: '#fff', fontSize: 14, fontFamily: FontBase.MyriadPro_Regular }} dashColor='gray' >Tháng 9/2020</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width,
                        marginTop: 20,
                        flex: 1,
                        justifyContent: 'space-between'
                    }}>
                        <View style={{ width, marginTop: 20 }}>
                            <View style={{ width, alignItems: 'center', height: height / 6.7 }}>
                                <Text style={{ color: '#dadce3', textAlign: 'left', width: '100%', marginLeft: '5%', fontSize: 16 }}>10</Text>
                                <Dash style={{ width: '84%', height: 1 }} dashColor="#dadce3" dashLength={5} />
                            </View>
                            <View style={{ width, alignItems: 'center', height: height / 6.7 }}>
                                <Text style={{ color: '#dadce3', textAlign: 'left', width: '100%', marginLeft: '5%', fontSize: 16 }}>5</Text>
                                <Dash style={{ width: '84%', height: 1 }} dashColor="#dadce3" dashLength={5} />
                            </View>
                            <Text style={{ color: '#dadce3', textAlign: 'left', width: '100%', marginLeft: '5%', fontSize: 16 }}>0</Text>
                        </View>
                        <View style={{ height: '20%', backgroundColor: '#bfc1c1', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width }}>
                            {data.map((item, index) => (
                                <GradientDetails item={item} index={index} Checked={_checked} />
                            ))}
                        </View>
                    </View>
                </View>
                {
                    checked &&
                    <View style={{ width, alignItems: 'center', marginTop: height / 15 }}>
                        <View style={{ padding: 10, borderRadius: 25, backgroundColor: '#fff', justifyContent: 'center', height: height / 7, width: width / 2, justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 30, color: '#2d3b8b', fontWeight: 'bold', textAlign: 'center' }}>{data[index].value}</Text>
                            <View style={{ width: '100%', backgroundColor: '#327ba0', borderRadius: 50, height: '47%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 14, fontFamily: FontBase.MyriadPro_Regular }}>Tuần <Text style={{ fontSize: 18, fontFamily: FontBase.MyriadPro_Bold }}>{''}4{' '}</Text>Tháng <Text style={{ fontSize: 18, fontFamily: FontBase.MyriadPro_Bold }}>9</Text></Text>
                            </View>
                        </View>
                    </View>
                }
            </View>
        </ImageBackground>
    )
}
export default RankScreen;