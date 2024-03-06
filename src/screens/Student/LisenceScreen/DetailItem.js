import {Dimensions, FlatList, Image, ImageBackground, Text, TouchableOpacity, View, Modal, ScrollView, StyleSheet, Alert, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import SmartScreenBase from '../../../base/SmartScreenBase';
import stylesApp from '../../../component/styleApp/stylesApp';
import Header from './Header';
import ModalBy from './ModalBy';
import BySuccess from './BySuccess';
import API from '../../../API/APIConstant';
import axios from 'axios';
import {useSelector} from 'react-redux';
import LoadingScreen from '../../LoadingScreen';
import { AppHeader } from '../../../componentBase/AppHeader';
import IapBase from '../../../base/IapBase';
import RNIap, {
    finishTransaction,
    purchaseErrorListener,
    purchaseUpdatedListener,
  } from 'react-native-iap';
import APIBase from '../../../base/APIBase';
import MyData from '../../../component/MyData'
import HTML from "react-native-render-html";
import FontBase from '../../../base/FontBase';
import { Colors } from '../../../styleApp/color';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import LogBase from '../../../base/LogBase';
import stringUtils from '../../../utils/stringUtils';

const {width, height} = Dimensions.get('screen');
const testHTML = "<p>Mua gói VIP 1 để sở hữu gói học tập 5 tháng bao gồm:</p><ul><li>Toàn bộ 60 video bài giảng và hơn 300 bài tập thuộc tất cả các kỹ năng.</li><li> Thi thử online với ngân hàng đề thi lên tới 5.500 câu.</li><li> Chế độ học tập “IMaster” – cải thiện điểm yếu và ôn tập những kiến thức đã học.</li><li>Học theo lộ trình học tập cá nhân</li></ul><p>Mua gói VIP 1 để sở hữu gói học tập 5 tháng bao gồm:</p><ul><li>Toàn bộ 60 video bài giảng và hơn 300 bài tập thuộc tất cả các kỹ năng.</li><li> Thi thử online với ngân hàng đề thi lên tới 5.500 câu.</li><li> Chế độ học tập “IMaster” – cải thiện điểm yếu và ôn tập những kiến thức đã học.</li><li>Học theo lộ trình học tập cá nhân</li></ul>";

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const DetailItem = (props) => {

    const index = props.navigation.getParam('index');
    const naviData = props.navigation.getParam('data');

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const defFontSize = 16
    const defFontFamily = FontBase.MyriadPro_Regular

    const [data, setData] = useState({});

    useEffect(() => {
        LogBase.log("==========naviData:",naviData)
        purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase) => {
                LogBase.log('purchase', purchase);
      
              const receipt = purchase.transactionReceipt
                ? purchase.transactionReceipt
                : purchase.originalJson;
                LogBase.log("=====bill:",receipt);
              if (receipt) {
                  IapBase.billCode = receipt;
                  LogBase.log("=====mua thành công ",IapBase.billCode);
                  CallBuyKH(purchase);
              }
            },
          );
      
          purchaseErrorSubscription = purchaseErrorListener(
            (error) => {
                LogBase.log('purchaseErrorListener', error);
              Alert.alert('purchase error', JSON.stringify(error));
            },
          );

          return function cleanIap () { 
            if (purchaseUpdateSubscription) {
                purchaseUpdateSubscription.remove();
                purchaseUpdateSubscription = null;
              }
              if (purchaseErrorSubscription) {
                purchaseErrorSubscription.remove();
                purchaseErrorSubscription = null;
              }
              RNIap.endConnection();
          } 

    }, []);

    const CallBuyKH = async (purchase) => {
        try {
            LogBase.log('CallBuyKH',naviData);
            LogBase.log('===============Platform.OS',Platform.OS === 'ios')
            LogBase.log('===============Platform.OS_1',Platform.OS === 'ios' ? IapBase.billCode : JSON.parse(IapBase.billCode).purchaseToken)
            const url = API.baseurl_2 + API.addOrderLicense;
            const qs = require('qs');
            var mProduct = [{
                package_id: naviData.package_id,
                number: '1',
                price: naviData.price
            }]
            var tranProduct = JSON.stringify(mProduct)
            var mData = {
                student_id: MyData.UserLogin.id,
                order_detail: tranProduct,
                username: MyData.UserLogin.username,
                subscriptionId: naviData.package_code,
                token: Platform.OS === 'ios' ? IapBase.billCode : JSON.parse(IapBase.billCode).purchaseToken,
                bill_type: Platform.OS === 'ios'?'apple_store':'ch_play',
                package_name: 'gk.app.sunday',
            }
    
            var tranData = qs.stringify(mData)
            LogBase.log('===============mData',mData)
            LogBase.log('===============IapBase.billCode',IapBase.billCode)
            // console.log('===============IapBase.billCode.purchaseToken',JSON.parse(IapBase.billCode).orderId)
            var res = await APIBase.tokenAPI('post', url, tranData)
            LogBase.log('==========KQ thanh toán ',res.data)
            //dữ liệu debug
            if(LogBase.isDebug){
                Alert.alert("Dữ liệu gửi lên", tranData, [
                    { text: 'Đóng', style: 'cancel' }
                ]);
            }
            if(res.data.status){
                    const ackResult = await finishTransaction(purchase, true);
                    const cb = props.navigation.getParam('reload');
                    if (cb) {
                        cb();
                    }
                    props.navigation.navigate('LisenceScreen')
                    LogBase.log('=====ackResult 1:', ackResult);
            }else{
                const ackResult = await finishTransaction(purchase, true);
                LogBase.log('=====ackResult 2:', ackResult);
                const cb = props.navigation.getParam('reload');
                if (cb) {
                    cb();
                }
                props.navigation.navigate('LisenceScreen')
                Alert.alert("Thông báo",res.data.msg, [
                    { text: 'Đóng', style: 'cancel' }
                ]);
            }
        } catch (error) {
            LogBase.log("=====xác nhận đơn có lỗi: ",error)
            const ackResult = await finishTransaction(purchase, true);
            LogBase.log('=====ackResult 3:', ackResult);
        }
    }

    const _byNow = async () => {
        props.loading();
        props.hideModal();
        const url = API.baseurl_2 + API.addOrderLicense;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        let qs = require('qs');
        let dataP = {};
        dataP['package_id'] = dataProps.package_id;
        dataP['number'] = 1;
        dataP['price'] = dataProps.price;
        let data = qs.stringify({
            'customer_id': MyData.UserLogin.id,
            'student_id': MyData.UserLogin.id,
            'order_detail': JSON.stringify([dataP]),
            'total_price': dataProps.price
        });
        try {
            LogBase.log("=====API",url)
            const res = await axios({method: 'post', url, headers, data});
            let dataReturn = res.data;
            if (dataReturn.status) {
                props.byNow();
            }
        } catch (error) {
            LogBase.log(error.response.data);
        }
    };

    const _renderItem = (text, value, fontWeight, textDecorationLine, color, isMoney) => {
        return (
            <View style={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Text style={styles.textDetail}>{text}</Text>
                <Text style={[styles.textDetail,{textDecorationLine: textDecorationLine, textDecorationStyle: 'solid', 
                    color: color, fontFamily: fontWeight == 'bold' ? FontBase.MyriadPro_Bold : FontBase.MyriadPro_Regular}]}>{isMoney ? value+"đ" : value}</Text>
            </View>
        );
    };

    const _renderItemFlatList = ({item, index}) => {
        return (
            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: SmartScreenBase.smPercenHeight * 2,
            }}>
                <View
                    style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Image
                        source={{uri: 'tick103'}}
                        resizeMode={'contain'}
                        style={{
                            width: SmartScreenBase.smPercenHeight * 4,
                            height: SmartScreenBase.smPercenHeight * 4,
                        }}/>
                </View>
                <View
                    style={{width: '80%'}}
                ><Text style={{fontSize: SmartScreenBase.smFontSize * 40}}>{item.data}</Text></View>
            </View>
        );
    };

    const _renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <ModalBy
                    dataProps={data}
                    byNow={() => _bySuccess()}
                    loading={() => setIsLoading(true)}
                    hideModal={()=> setModalVisible(false)}
                />
            </Modal>
        );
    };

    const _bySuccess = () => {
        setIsLoading(false);
        setModalVisible(false);
        setModalVisibleSuccess(true);
    };

    const _renderModalSuccess = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleSuccess}
            >
                <BySuccess data={data} hideModal={() => setModalVisibleSuccess(false)}/>
            </Modal>
        );
    };

    return (
        <ImageBackground
            source={{uri: 'background111'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            {/* {isLoading ? <LoadingScreen/> : null} */}
            {_renderModal()}
            {_renderModalSuccess()}
                <AppHeader title={naviData?naviData.package_name:"Không có dữ liệu"} leftIconOnPress={() => {
                    props.navigation.pop()
                }}/>
                <View
                    style={{
                        height: SmartScreenBase.smPercenHeight * 30,
                        width: '100%',
                        backgroundColor: index % 2 ? '#b4dae5' : '#e4e774',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View style={{height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            source={{uri: index % 2 ? 'bus' : 'tuongnuthan'}}
                            resizeMode={'contain'}
                            style={{
                                width: SmartScreenBase.smPercenWidth * 43,
                                height: SmartScreenBase.smPercenWidth * 43,
                            }}/>
                    </View>
                    <View style={{
                        height: '100%',
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 2.5,
                    }}>
                        {naviData.origin_price > naviData.price && _renderItem('', stringUtils.moneyForm(naviData.origin_price), 'normal', 'line-through', '#000', true)}
                        {_renderItem('Giá:', stringUtils.moneyForm(naviData.price), 'bold', 'none', '#d34e42', true)}
                        {_renderItem('Thời gian:', (naviData.number_day / 30) + ' tháng', 'normal', 'none', '#000')}
                        {naviData.gift>0 && _renderItem('Khuyến mại:', '+'+(naviData.gift / 30) + ' tháng', 'bold', 'none', '#d34e42')}
                    </View>
                    <View style={{position: 'absolute', bottom: -SmartScreenBase.smPercenHeight}}>
                        <Image
                            source={{uri: 'student_home_image13'}}
                            style={{
                                transform: [{rotate: '180deg'}],
                                width: SmartScreenBase.smPercenWidth * 100,
                                height: SmartScreenBase.smPercenHeight,
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        height: SmartScreenBase.smPercenHeight * 50,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    }}
                >
                    <View style={{
                        maxHeight: SmartScreenBase.smPercenHeight * 45,
                        width: '100%',
                        backgroundColor: '#fff',
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: SmartScreenBase.smPercenWidth * 5,
                        }}>
                            <ScrollView>
                                <HTML source={{ html: naviData.info }} contentWidth={SmartScreenBase.smPercenWidth*90}
                                                tagsStyles={{
                                                    p: {fontSize: defFontSize, fontFamily: defFontFamily},
                                                    h1: {fontSize: defFontSize, fontFamily: defFontFamily},
                                                    h2: {fontSize: defFontSize, fontFamily: defFontFamily},
                                                    h3: {fontSize: defFontSize, fontFamily: defFontFamily},
                                                    h4: {fontSize: defFontSize, fontFamily: defFontFamily},
                                                    h5: {fontSize: defFontSize, fontFamily: defFontFamily},
                                                    h6: {fontSize: defFontSize, fontFamily: defFontFamily},
                                                    ol: {fontSize: defFontSize, fontFamily: defFontFamily},
                                                    ul: {fontSize: defFontSize, fontFamily: defFontFamily},
                                                    pre: {fontSize: defFontSize, fontFamily: defFontFamily},
                                                    span: {fontSize: defFontSize, fontFamily: defFontFamily},
                                                }}>    
                                </HTML>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: SmartScreenBase.smPercenHeight * 3,
                    }}
                >
                    <ShortMainButton text={"Mua ngay"} type={1} widthType={'full'}
                        onPress={()=>{
                                IapBase.requestProduct(naviData.package_code)
                            }}/>
            </View>
        </ImageBackground>
    );
};

export default DetailItem;

const styles = StyleSheet.create({
    textDetail: {
        fontSize: SmartScreenBase.smFontSize * 45,
        color: Colors.NearBlack
    },
});
