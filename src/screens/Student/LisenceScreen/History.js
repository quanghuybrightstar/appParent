import {
    Dimensions,
    FlatList,
    ImageBackground,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SmartScreenBase from '../../../base/SmartScreenBase';
import stylesApp from '../../../component/styleApp/stylesApp';
import LoadingScreen from '../../LoadingScreen';
import { AppHeader } from '../../../componentBase/AppHeader';
import BySuccess from './BySuccess';
import API from '../../../API/APIConstant';
import axios from 'axios';
import MyData from '../../../component/MyData';
import {useSelector} from 'react-redux';
import Moment from 'moment';
import FontBase from '../../../base/FontBase';
import {ShortMainButton} from '../../../componentBase/ShortMainButton';
import { TextBox } from '../../../componentBase/TextBox';
import LogBase from '../../../base/LogBase';
import APIBase from '../../../base/APIBase';

const {width, height} = Dimensions.get('screen');

const History = (props) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        _getData();
    }, []);

    const _getData = async () => {
        const url = API.baseurl_2 + API.listOrder + MyData.UserLogin.id;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            LogBase.log("=====API:",url)
            const res = await axios({method: 'get', url: url, headers});
            let dataReturn = res.data;
            //console.log("========lịch sử thanh toán",dataReturn)
            console.log("========lịch sử thanh toán")
            setIsLoading(false);
            if (dataReturn.status) {
                let dataR = dataReturn.data;
                setData(dataR);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const _renderItem = ({item, index}) => {
        console.log("=============Từng item một",item);
        return (
            <View style={{
                marginTop: SmartScreenBase.smPercenHeight * 2,
            }}>
                <View style={{
                    width: '100%',
                    height: SmartScreenBase.smPercenHeight * 15,
                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: '100%',
                        height: SmartScreenBase.smPercenHeight * 5,
                        borderRadius: SmartScreenBase.smPercenWidth * 3,
                        backgroundColor: '#ed8a22',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderColor: '#fff',
                    }}>
                        <Text style={{
                            fontSize: SmartScreenBase.smFontSize * 50,
                            fontFamily: FontBase.MyriadPro_Bold,
                            color: '#fff',
                        }}>{
                        item.order_detail.length>0?item.order_detail[0].package_name:""}</Text>
                    </View>
                    <View style={{
                        width: '100%',
                        height: SmartScreenBase.smPercenHeight * 9,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: SmartScreenBase.smPercenHeight * 0.5,
                    }}>
                        <View style={{
                            width: '48%',
                            height: SmartScreenBase.smPercenHeight * 9,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#e6e7e8',
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                        }}>
                            <Text style={{
                                fontSize: SmartScreenBase.smFontSize * 70,
                                fontFamily: FontBase.MyriadPro_Bold,
                                color: '#1b75bb',
                            }}>{item.total_price?item.total_price:""}
                            <Text style={{
                                fontSize: SmartScreenBase.smFontSize * 50,
                                fontFamily: FontBase.MyriadPro_Bold,
                                color: '#1b75bb',
                            }}>đ</Text>
                            </Text>
                        </View>
                        <View style={{
                            width: '48%',
                            height: SmartScreenBase.smPercenHeight * 9,
                            justifyContent: 'center',
                        }}>
                            <Text style={{fontSize: SmartScreenBase.smFontSize * 40, fontFamily: FontBase.MyriadPro_Regular}}>{"Ngày mua: "+Moment(item.created_at).format('DD/MM/YY')}</Text>
                            <Text style={{fontSize: SmartScreenBase.smFontSize * 40, fontFamily: FontBase.MyriadPro_Regular}}>{item.order_detail.length>0?"Thời hạn: "+item.order_detail[0].number_day+" ngày":""}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };


    return (
        <ImageBackground
            source={{uri: 'background111'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            {
                isLoading
                    ?
                    <LoadingScreen/>
                    :
                    null
            }
            <View style={{flex: 1}}>
                <AppHeader title={"Lịch sử giao dịch"} leftIconOnPress={() => {
                    props.navigation.pop()
                }}/>
                { data.length > 0 ? <View style={{flex: 80, paddingHorizontal: SmartScreenBase.smPercenWidth * 5}}>
                    <FlatList
                        data={data}
                        renderItem={_renderItem}
                        keyExtractor={(index) => index.toString()}
                    />
                </View>
                : <View style={{flexDirection: 'column', alignItems: "center", justifyContent: "center", marginTop: SmartScreenBase.smPercenHeight*9}}>
                            <Image source={{uri: 'thungvsnao'}} resizeMode={'contain'} style={{
                                    width: SmartScreenBase.smBaseWidth * 643,
                                    height: SmartScreenBase.smBaseWidth * 659,
                                }}/>
                            <TextBox text={"Bạn chưa mua khoá học nào."} style={{fontSize: SmartScreenBase.smFontSize*45}}/>
                            <TextBox text={"Nhập mã hoặc ấn vào \"Mua gói mới\" để trải nghiệm."} style={{fontSize: SmartScreenBase.smFontSize*45}}/>
                        </View>}
                <View style={{
                    flex: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                }}>
                <ShortMainButton text={"Mua gói mới"} type={1} widthType={'full'} onPress={()=>{props.navigation.navigate('ChooseUpdate')}}/>
                </View>
            </View>
        </ImageBackground>
    );
};

export default History;
