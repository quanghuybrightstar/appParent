import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, ImageBackground, View, Text } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import LogBase from '../../../../base/LogBase';
import stylesApp from '../../../../styleApp/stylesApp';
import { lichsu_thanhtoan } from '../../../../assets/icon';
import { avatargoi } from '../../../../assets/image';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../../styleApp/color';
import styles from './PickPackageStyle'
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { SmPopup } from '../../../../componentBase/SmPopup/SmPopup';

/**
 * PickPackage Screen - Các gói có thể lấy
 */
const PickPackage = (props) => {

    const datatest = [{
        id: '101',
        package_name: 'Gói học trọn đời',
        package_type: 'basic',
        duration_expired: '365',
        bought_date: '20/11/2022',
        status: 'bought'
    },
    {
        id: '102',
        package_name: 'Gói học trọn đời',
        package_type: 'basic',
        duration_expired: '365',
        bought_date: '20/11/2022',
        isForever: 'true',
        status: 'bought'
    },
    {
        id: '104',
        package_name: 'Gói học trọn đời',
        package_type: 'basic',
        duration_expired: '183',
        bought_date: '20/11/2022',
        status: 'bought'
    },
    {
        id: '103',
        package_name: 'Gói học trọn đời',
        package_type: 'basic',
        duration_expired: '183',
        bought_date: '20/11/2022',
        status: 'bought'
    }]

    const [dataList, setDataList] = useState(props.navigation.getParam('dataList'));
    const [ loading, setLoading ] = useState(false)
    const [ showActive, setShowActive ] = useState(false)
    const [ curIDPay, setCurIDPay ] = useState()

    useEffect(() => {
    },[])

    const kichhoat = async (id) => {

        var url = API.baseurl_pay + API.active_package
        console.log("=====getProductionList url",url)
        setLoading(true)
        try{
            data = {id: id}
            const res = await APIBase.callPaySV('post', url, data)
            console.log("=====getProductionList res",res)
            if(res.data.status){
                var cb = props.navigation.getParam('reload')
                if(cb) { cb() }
                props.navigation.navigate('UpgradeAccount')
            }else{

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

    const bodyPopup = () => {
        return(
            <View>
                <Text style={styles.textBoldPopupSty}>{"Bạn có chắc chắn muốn kích hoạt\ngói học tập này?"}</Text>
                <Text style={styles.textRegularPopupSty}>Sau khi kích hoạt, các tính năng của gói sẽ được áp dụng và thời gian sử dụng gói sẽ bắt đầu được tính</Text>
            </View>
        );
    }

    const renderMono = ({item, index}) => {
        console.log("=====renderMono",item)
        var textStatus = ""
        var buttonTittle = ""
        switch (item.status) {
            case "active":
                textStatus = "Đang sử dụng"
                break;
            case "bought":
                textStatus = "Chưa kích hoạt"
                buttonTittle = "Kích hoạt"
                break;
            case "expired":
                textStatus = "Đã hết hạn"
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
                        <TouchableOpacity onPress={()=>choiceKichhoat(item.payment_id)}>
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
                title={"Kích hoạt gói"}
                leftIconOnPress={() => {
                    props.navigation.pop();
                }}
            />
            <View>
                <FlatList
                    renderItem={renderMono}
                    data={dataList}
                    keyExtractor={(item, index)=>{
                        return item.index + index.toString()
                    }}
                />
            </View>
            <SmPopup visible={showActive} children={bodyPopup()} message={"Sau khi kích hoạt, thời gian sử dụng gói sẽ bắt đầu được tính. Bạn có chắc chắn muốn kích hoạt gói học tập này?"}
                    confirmOnpress={() => {setShowActive(false); kichhoat(curIDPay)}} confirmText={"Kích hoạt"} cancelText={"Huỷ"} cancelOnpress={()=>setShowActive(false)}/>
        </ImageBackground>
    );
};

export default PickPackage;