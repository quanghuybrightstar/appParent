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
    Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SmartScreenBase from '../../../base/SmartScreenBase';
import styleApp from '../../../styleApp/stylesApp';
import LoadingScreen from '../../LoadingScreen';
import BySuccess from './BySuccess';
import { AppHeader } from '../../../componentBase/AppHeader';
import FontBase from '../../../base/FontBase';
import LinearGradient from "react-native-linear-gradient";
import { Colors } from '../../../styleApp/color';
import { MyButton } from '../../../componentBase/Button';
import IapBase from '../../../base/IapBase'
import {ShortMainButton} from '../../../componentBase/ShortMainButton';
import {TextBoxModal} from '../../../componentBase/TextBoxModal';
import API from '../../../API/APIConstant';
import MyData from '../../../component/MyData'
import APIBase from '../../../base/APIBase';
import {NotifyModal} from '../../../componentBase/NotifyModal/NotifyModal';
import styles from './Styles';
import { TextBox } from '../../../componentBase/TextBox';

const {width, height} = Dimensions.get('screen');
const LicenseScreenStudent = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [textInTB, setTextInTB] = useState(false);
    const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);
    const [textMessage, setTextMessage] = useState(false);
    const [dataBuyed, setDataBuyed] = useState([]);
    const [dataFake, setDataFake] = useState([
        {
            package_name: 'TIếng Anh lớp 8 - VIP 1',
            sort_desc: '5 tháng sử dụng toàn bộ gíao trình lớp 8',
            duration_expired: 0,
        },
        {
            package_name: 'TIếng Anh lớp 7 - VIP 1',
            sort_desc: '5 tháng sử dụng toàn bộ gíao trình lớp 8',
            duration_expired: 1,
            duration_expired_string: '29 ngày 14 giờ 52 phút',
            percent_remain: 80,
        },
        {
            package_name: 'TIếng Anh lớp 7 - VIP 1',
            sort_desc: '5 tháng sử dụng toàn bộ gíao trình lớp 8',
            duration_expired: 1,
            duration_expired_string: '29 ngày 14 giờ 52 phút',
            percent_remain: 80,
        }
    ]);

    useEffect(()=>{
        callData()
    },[])

    const callData = async () => {
        var url = API.baseurl_2 + API.getLicenseOwned;
        console.log('==========API:',url)
        var res = await APIBase.postDataJson('get', url)
        console.log('==========res callData',res.data)
       if(res.data.status){
            setDataBuyed(res.data.data)
       }else{
           Alert(res.data.msg)
       } 
    } 

    const _sendCode = async () => {
        setModalVisible(false);
        //setModalVisibleSuccess(true);
        //Gọi API gửi mã ở đây
        var url = API.baseurl_2 + API.activeLicenseCode;
        var data = {
            student_id: MyData.UserLogin.id,
            username: MyData.UserLogin.username,
            code: textInTB
        }
        console.log('==========data',data)
        console.log('==========url',url)
        var res = await APIBase.postDataJson('post', url, data)
        console.log('==========res',res.data)
       if(res.data.status){
            setModalVisibleSuccess(true)
            setTextMessage("Bạn đã mua thành công")
       }else{
            setModalVisibleSuccess(true)
            setTextMessage(res.data.msg)
       }
    };

    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.contain}>
                <View style={[styles.subContain,{marginTop: index==0?SmartScreenBase.smPercenWidth:0, ...styleApp.shadow}]}>
                    <LinearGradient
                        style={{height: SmartScreenBase.smPercenHeight * 6, borderTopRightRadius: SmartScreenBase.smPercenWidth * 5, 
                        borderTopLeftRadius: SmartScreenBase.smPercenWidth * 5, justifyContent: 'center', alignItems: 'center'}}
                        colors={item.duration_expired!=0?[Colors.BaseGreen, Colors.LightGreen]:[Colors.White,Colors.White]}
                        start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}>
                            <Text style={[styles.textTittle,{color: item.duration_expired!=0 ? Colors.White : Colors.SuperLightGray}]}>{item.package_name}</Text>
                    </LinearGradient>
                    <View style={styles.ViewTittle}>
                        <View style={styles.subViewTittle}>
                            <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{
                                    fontSize: SmartScreenBase.convertSize(45),
                                    fontFamily: FontBase.MyriadPro_Regular,
                                    textAlign: 'center', color: Colors.SuperLightGray,
                                }}>
                                    {item.sort_desc}
                                </Text>
                            </View>
                            {
                                item.duration_expired!=0
                                    ?
                                    <View style={{flex: 2, width: '100%'}}>
                                        <View style={{
                                            flex: 1,
                                            alignItems: 'flex-end',
                                            width: '100%',
                                            flexDirection: 'row',
                                            marginBottom: SmartScreenBase.smPercenHeight * 2,
                                        }}>
                                            <View
                                                style={{
                                                    width: '100%',
                                                    backgroundColor: Colors.GrayB6,
                                                    height: SmartScreenBase.smPercenHeight * 2.2,
                                                    borderRadius: SmartScreenBase.smPercenWidth * 100,
                                                    // justifyContent: 'center',
                                                }}
                                            >
                                                <LinearGradient
                                                    style={{width: `${item.percent_remain}%`,height: '100%',borderRadius: SmartScreenBase.smPercenWidth * 100}}
                                                    colors={[Colors.BaseGreen, Colors.LightGreen]}
                                                    start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}>
                                                </LinearGradient>
                                            </View>
                                        </View>
                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <Text style={{
                                                fontSize: SmartScreenBase.smFontSize * 40,
                                                fontFamily: FontBase.MyriadPro_Regular,
                                                textAlign: 'center',
                                                color: Colors.NearBlack,
                                            }}>
                                                {item.duration_expired_string}
                                            </Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={styles.ViewBoxBot}>
                                        <View style={[styles.ViewTextBox,{opacity: item.duration_expired!=0 ? 1 : 0.6 }]}>
                                            <Text style={styles.textBody}>ĐÃ HẾT HẠN</Text>
                                        </View>
                                        <ShortMainButton type={1} style={{height: SmartScreenBase.smBaseWidth*100}} onPress={() => props.navigation.navigate('ChooseUpdate', {reload: callData})}
                                            text={"Gia hạn"} widthType={'mini'}
                                        />
                                    </View>
                            }
                        </View>
                    </View>
                </View>
                <View style={{height: SmartScreenBase.smPercenWidth*2.5}}></View>
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
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000070'}}>
                    <View style={{
                        height: SmartScreenBase.smPercenWidth * 40,
                        width: SmartScreenBase.smPercenWidth * 90,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TextInput
                                style={styles.textInputMd}
                                placeholder={'Nhập mã của bạn'}
                                onChangeText={(value)=>{setTextInTB(value)}}
                            />

                        </View>
                        <View style={{
                            flex: 1,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                flex: 1,
                                width: '85%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                            }}>
                                <ShortMainButton onPress={() => setModalVisible(false)}
                                    text={"Quay về"}
                                    widthType={'mini'}
                                />
                                <ShortMainButton onPress={() => _sendCode()}
                                    text={"Gửi mã"}
                                    widthType={'mini'}
                                    type={1}
                                />
                            </View>
                            {/* <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}>
                                <Text style={{color: Colors.NearBlack ,fontFamily: FontBase.MyriadPro_Regular,fontSize: SmartScreenBase.smFontSize * 40}}>Nếu chưa có mã vui
                                    lòng </Text>
                                <TouchableOpacity>
                                    <Text style={{color: Colors.NearBlack ,fontFamily: FontBase.MyriadPro_Bold,fontSize: SmartScreenBase.smFontSize * 40}}>Click
                                        vào đây</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const _renderModalSuccess = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleSuccess}
            >
                <BySuccess data={textInTB} hideModal={() => setModalVisibleSuccess(false)}/>
            </Modal>
        );
    };

    return (
        <ImageBackground
            source={{uri: 'background111'}}
            imageStyle={styleApp.ImageBackground}
            style={{flex: 1}}>
            <NotifyModal visible={modalVisibleSuccess} confirmText={"Đóng"} message={textMessage} confirmOnpress={()=>{setModalVisibleSuccess(false)}}/>
            {_renderModal()}
            {/* {_renderModalSuccess()} */}
            {
                isLoading
                    ?
                    <LoadingScreen/>
                    :
                    null
            }
            <View style={{flex: 1}}>
                <AppHeader title={"Nâng cấp tài khoản"} leftIconOnPress={() => {
                    props.navigation.pop()
                }}/>
                    <View style={{flex: 5, alignContent: 'center', alignItems: 'center', marginTop: SmartScreenBase.smPercenHeight*2}}>
                        {dataBuyed && dataBuyed.length > 0 ? <FlatList
                            data={dataBuyed}
                            renderItem={_renderItem}
                            keyExtractor={(index) => index.toString()}
                        />
                    : <View style={{flexDirection: 'column', alignItems: "center", justifyContent: "center", marginTop: SmartScreenBase.smPercenHeight*9}}>
                            <Image source={{uri: 'thungvsnao'}} resizeMode={'contain'} style={{
                                    width: SmartScreenBase.smBaseWidth * 643,
                                    height: SmartScreenBase.smBaseWidth * 659,
                                }}/>
                            <TextBox text={"Bạn chưa mua khoá học nào."} style={{fontSize: SmartScreenBase.smFontSize*45}}/>
                            <TextBox text={"Hãy click vào \"Mua gói mới\" để trải nghiệm."} style={{fontSize: SmartScreenBase.smFontSize*45}}/>
                        </View>}
                    </View>
                    <View style={{
                        flex: 2,justifyContent: 'space-evenly',flexDirection: 'row', marginTop: SmartScreenBase.smPercenHeight*2
                    }}>
                        {/* <TouchableOpacity
                            style={{flex: 1, alignItems: 'center'}}
                            onPress={() => setModalVisible(true)}
                        >
                            <Image source={{uri: 'nhapma'}} resizeMode={'contain'} style={{
                                width: SmartScreenBase.smBaseWidth * 220,
                                height: SmartScreenBase.smBaseWidth * 250,
                            }}/>
                            <Text numberOfLines={2} style={{textAlign: 'center', width: SmartScreenBase.smPercenWidth*20,fontFamily: FontBase.MyriadPro_Regular, color: '#00A69C', fontSize: SmartScreenBase.convertSize(45)}}>
                                Nhập{"\n"}mã
                            </Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={{flex: 1, alignItems: 'center'}}
                            onPress={() => props.navigation.navigate('ChooseUpdate', {reload: callData})}
                        >
                            <Image source={{uri: 'muagoi'}} resizeMode={'contain'} style={{
                                width: SmartScreenBase.smBaseWidth * 220,
                                height: SmartScreenBase.smBaseWidth * 250,
                            }}/>
                            <Text numberOfLines={2} style={{textAlign: 'center', width: SmartScreenBase.smPercenWidth*20,fontFamily: FontBase.MyriadPro_Regular, color: '#00A69C', fontSize: SmartScreenBase.convertSize(45)}}>
                                Mua{"\n"}gói mới
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flex: 1, alignItems: 'center'}}
                            onPress={() => props.navigation.navigate('History')}
                        >
                            <Image source={{uri: 'lichsu'}} resizeMode={'contain'} style={{
                                width: SmartScreenBase.smBaseWidth * 220,
                                height: SmartScreenBase.smBaseWidth * 250,
                            }}/>
                            <Text numberOfLines={2} style={{textAlign: 'center', width: SmartScreenBase.smPercenWidth*20,fontFamily: FontBase.MyriadPro_Regular, color: '#00A69C', fontSize: SmartScreenBase.convertSize(45)}}>
                                Lịch sử giao dịch
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </ImageBackground>
    );
};

export default LicenseScreenStudent;
