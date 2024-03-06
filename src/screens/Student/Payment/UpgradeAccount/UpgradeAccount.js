import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, ImageBackground, View, TouchableOpacity } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import LogBase from '../../../../base/LogBase';
import stylesApp from '../../../../styleApp/stylesApp';
import { lichsu_thanhtoan, buy_icon, nhap_goi } from '../../../../assets/icon';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../../styleApp/color';
import styles from './UpgradeAccountStyle' 
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { avatargoi, nangcap_tk_empty } from '../../../../assets/image';
import { useSelector } from 'react-redux';
import { SmPopup } from '../../../../componentBase/SmPopup/SmPopup';
import FontBase from '../../../../base/FontBase';

/**
 * UpgradeAccount Screen - Nâng cấp tài khoản
 */
const UpgradeAccount = (props) => {

    const [ loading, setLoading ] = useState(false)
    const [ showActive, setShowActive ] = useState(false)
    const [ curIDPay, setCurIDPay ] = useState()
    const [ dataList, setDataList ] = useState([])
    const [firstloadDone, setfirstloadDone] = useState(false)
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const isStudent = dataLogin.role == 'student'

    const datatest = [{
        id: '101',
        package_name: 'Gói học trọn đời',
        package_type: 'basic',
        duration_expired: '20/11/2022',
        bought_date: '20/11/2022',
        status: 'expired'
    },
    {
        id: '102',
        package_name: 'Gói học trọn đời',
        package_type: 'basic',
        duration_expired: '20/11/2022',
        bought_date: '20/11/2022',
        isForever: 'true',
        status: 'active'
    },
    {
        id: '104',
        package_name: 'Gói học trọn đời',
        package_type: 'basic',
        duration_expired: '20/11/2022',
        bought_date: '20/11/2022',
        status: 'active'
    },
    {
        id: '103',
        package_name: 'Gói học trọn đời',
        package_type: 'basic',
        duration_expired: '20/11/2022',
        bought_date: '20/11/2022',
        status: 'bought'
    }]

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {

        var url = API.baseurl_pay + API.getProductionList
        console.log("=====getProductionList url",url)
        setLoading(true)
        try{
            const res = await APIBase.callPaySV('get', url)
            console.log("=====getProductionList res",res)
            setfirstloadDone(true)
            if(res.data.status){
                console.log("=====getProductionList",res.data.data.package_list)
                setDataList(res.data.data.package_list.concat(res.data.data.package_list))
            }
            setLoading(false)
        }catch(error) {
            setLoading(false)
        }        
    }

    const choiceKichhoat = (id) => {
        setShowActive(true)
        setCurIDPay(id)
    }

    const kichhoat = async (id) => {

        var url = API.baseurl_pay + API.active_package
        console.log("=====getProductionList url",url)
        setLoading(true)
        try{
            data = {id: id}
            const res = await APIBase.callPaySV('post', url, data)
            console.log("=====getProductionList res",res)
            if(res.data.status){
                getData()
            }
            setLoading(false)
        }catch(error) {
            setLoading(false)
        }        
    }

    const bodyPopup = () => {
        return(
            <View>
                <Text style={styles.textBoldPopupSty}>{"Bạn có chắc chắn muốn kích hoạt\ngói học tập này?"}</Text>
                <Text style={styles.textRegularPopupSty}>Sau khi kích hoạt, các tính năng của gói sẽ được áp dụng và thời gian sử dụng gói sẽ bắt đầu được tính</Text>
            </View>
        );
    }

    const monoOnclick = (item) => {
        switch (item.status) {
            case "active":
            case "expired":
                isStudent && props.navigation.navigate('BuyPackage', {reload: getData})
                break;
            case "bought":
                isStudent ? choiceKichhoat(item.payment_id) : null
                break;      
            default:
                break;
        }
    }

    const renderMono = ({item, index}) => {
        var textStatus = ""
        var buttonTittle = ""
        switch (item.status) {
            case "active":
                textStatus = "Đang sử dụng"
                buttonTittle = isStudent ? (!item.isForever ? "Mua thêm" : "") : ""
                break;
            case "bought":
                textStatus = "Chưa kích hoạt"
                buttonTittle = isStudent ? "Kích hoạt" : "Gán"
                break;
            case "expired":
                textStatus = "Đã hết hạn"
                buttonTittle = isStudent ? "Gia hạn" : ""
                break;        
            default:
                break;
        }
        return(
            <View style={styles.boxContainSty}>
                <View style={styles.boxImageSty}>
                    <Image source={avatargoi} style={styles.boxImagePackageSty} resizeMode={'contain'}/>
                </View>
                <View style={styles.boxBodySty}>
                    <TextBox style={styles.package_name}>{item.package_name}</TextBox>
                    <TextBox>{"Trạng thái: "+textStatus}</TextBox>
                    <TextBox>{"Ngày mua: "+item.bought_date}</TextBox>
                    <TextBox>{(item.status == "active" ? "Thời hạn còn lại: " : "Thời hạn: ")+(item.isForever ? "Vĩnh viễn" : (item.duration_expired + " ngày"))}</TextBox>
                </View>
                <View style={styles.boxButtonSty}>
                    {buttonTittle != "" &&
                        <TouchableOpacity onPress={()=>monoOnclick(item)}>
                            <LinearGradient                 
                                colors={[Colors.BaseGreen, Colors.LightGreen]}
                                start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                                style={[styles.miniButtonSty]}>
                                <TextBox style={styles.textminiButtonSty}>{buttonTittle}</TextBox>
                            </LinearGradient>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    return (
        <ImageBackground
        source={{uri: 'background111'}}
        imageStyle={stylesApp.ImageBackground}
        style={{flex: 1}}>
            <AppHeader
                navigation={props.navigation}
                title={"Nâng cấp tài khoản"}
                leftIconOnPress={() => {
                    props.navigation.pop();
                }}
                rightImage={lichsu_thanhtoan} rightIconOnPress={() => {props.navigation.navigate('PayHistory')}}
            />
            {dataList && firstloadDone && dataList.length == 0 ?<View style={styles.layoutEmptySty}>
                <Image source={nangcap_tk_empty} style={styles.ImageEmptySty} resizeMode={'contain'}/>
                <Text style={styles.TextEmptyTopSty}>{"Bạn chưa mua gói học tập nào!"}</Text>
                <Text style={styles.TextEmptyBopSty}>{"Hãy click vào \"Mua gói mới\" để trải nghiệm"}</Text>
            </View>
            : <View style={styles.scrollLay}>
                <FlatList
                    renderItem={renderMono}
                    data={dataList}
                    keyExtractor={(item, index)=>{
                        return item.index + index.toString()
                    }}
                />
            </View>}
            <View style={styles.layoutBtnSty}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('BuyPackage', {reload: getData})}>
                    <LinearGradient                 
                        colors={[Colors.BaseGreen, Colors.LightGreen]}
                        start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                        style={[styles.ButtonSty]}>
                        <Image source={buy_icon} style={styles.ImageSty} resizeMode={'contain'}/>
                        <TextBox style={styles.textBtnSty}>{"Mua gói mới"}</TextBox>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>props.navigation.navigate('EnterPurchasedPackage', {reload: getData})}>
                    <View                 
                        style={[styles.ButtonSty,styles.ButtonAddSty]}>
                        <Image source={nhap_goi} style={[styles.ImageSty,]} resizeMode={'contain'}/>
                        <TextBox style={styles.textAddBtnSty}>{"Nhập gói đã mua"}</TextBox>
                    </View>
                </TouchableOpacity>
            </View>
            <SmPopup visible={showActive} children={bodyPopup()} message={"Sau khi kích hoạt, thời gian sử dụng gói sẽ bắt đầu được tính. Bạn có chắc chắn muốn kích hoạt gói học tập này?"}
                    confirmOnpress={() => {setShowActive(false); kichhoat(curIDPay)}} confirmText={"Kích hoạt"} cancelText={"Huỷ"} cancelOnpress={()=>setShowActive(false)}/>
        </ImageBackground>
    );
};

export default UpgradeAccount;