import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, ImageBackground, View } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import LogBase from '../../../../base/LogBase';
import stylesApp from '../../../../styleApp/stylesApp';
import { lichsu_thanhtoan, thanhtoanfail_icon, thanhtoanok_icon, gan_icon, kichhoat_icon } from '../../../../assets/icon';
import styles from './PayHistoryStyle'
import { Colors } from '../../../../styleApp/color';
import moment from 'moment';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { nangcap_tk_empty } from '../../../../assets/image';

/**
 * PayHistory Screen - Lịch sử thanh toán
 */
const PayHistory = (props) => {

const testData = [
    {
        id: '10203',
        package_type: 'basic',
        package_name: 'Gói học tập Tera Diamond',
        action: 'buy',
        is_success: true,
        detail: 'Thanh toán thành công',
        date: '20-2-2022',
        duration: 30,
        cur_price: 600000,
        gift_duration: 335,
    },
    {
        id: '10204',
        package_type: 'basic',
        package_name: 'Gói học tập Tera Diamond',
        action: 'buy',
        is_success: false,
        detail: 'Thanh toán không hợp lệ',
        date: '20-2-2022',
        duration: 30,
        cur_price: 600000,
        gift_duration: 335,
    },
    {
        id: '10205',
        package_type: 'basic',
        package_name: 'Gói học tập Tera Diamond',
        action: 'buy',
        is_success: true,
        detail: 'Đã hoàn tiền',
        date: '20-3-2022',
        duration: 30,
        cur_price: 600000,
        gift_duration: 335,
    },
    {
        id: '10206',
        package_type: 'basic',
        package_name: 'Gói học tập Tera Diamond',
        action: 'activated',
        is_success: true,
        detail: 'Kích hoạt thành công',
        date: '20-4-2022',
        duration: 30,
        cur_price: 600000,
        gift_duration: 335,
    },
    {
        id: '10207',
        package_type: 'basic',
        package_name: 'Gói học tập Tera Diamond',
        action: 'assign',
        is_success: true,
        detail: 'Gán thành công',
        date: '20-4-2022',
        duration: 30,
        cur_price: 600000,
        gift_duration: 335,
    },
    {
        id: '10208',
        package_type: 'basic',
        package_name: 'Gói học tập Tera Diamond',
        action: 'expired',
        is_success: true,
        detail: '',
        date: '20-4-2022',
        duration: 30,
        cur_price: 600000,
        gift_duration: 335,
    },
]

const [dataList, setDataList] = useState([])
const [firstloadDone, setfirstloadDone] = useState(false)

useEffect (() => {
    getData()
},[])

const getData = async () => {
    const url = API.baseurl_pay + API.history_package;
    // setIndicator(true)
    try {
        const res = await APIBase.callPaySV('GET', url)
        var data = res.data;
        // setIndicator(false)
        console.log("=====reskkk",data);
        setfirstloadDone(true)
        if (data.status) {
            var changeList = convertData(data.data.package_list)
            setDataList(changeList)
        } else {
            // setErr(data.msg)
        }

    } catch (error) {
        // setIndicator(false)
        // setErr(error.response.data.msg)
        console.log(error.response);
        console.log(error.request);
    } finally {
    }
}

const convertData = (mListData) => {
    console.log("=====dataConvert start",mListData)

    var dataConvert = []
    var monList = []
    var kYear = 0
    var kMonth = 0
    mListData.forEach(ele => {
        var month = moment(ele.date, "DD-MM-YYYY").get('month')
        var year = moment(ele.date, "DD-MM-YYYY").get('year')
        if(kYear != year || kMonth != month){
            ele.month = month+1
            ele.year = year
            kYear = year
            kMonth = month
        }
    });
    console.log("=====dataConvert end")
    dataConvert = dataConvert.concat(mListData)
    // mListData.forEach(ele => {
    //     if(monList.length == 0 || monList.find(mc => mc == ele.month) == null){
    //         monList.push(ele.month)
    //     }
    // });
    // monList.forEach(mono => {
    //     var monoList = mListData.filter(cm => cm.month == mono)
    //     if(monoList.length > 0){
    //         //month header ở đây
    //     }
    //     dataConvert = dataConvert.concat(monoList)
    // });
    console.log("=====dataConvert",dataConvert)
    return dataConvert
}

const fillIcon = (action, is_success) => {
    switch (action.toLowerCase()) {
        case 'buy':
            return is_success ? thanhtoanok_icon : thanhtoanfail_icon
        case 'assign':
            return gan_icon
        case 'activated':
            return kichhoat_icon
        case 'expired':
            return thanhtoanfail_icon          
        default:
            break;
    }
}

const fillText = (action, name) => {
    switch (action.toLowerCase()) {
        case 'buy':
            return "Mua "+name
        case 'assign':
            return "Gán "+name
        case 'activated':
            return "Kích hoạt "+name
        case 'expired':
            return name+" hết hạn"          
        default:
            break;
    }
}

const renderMono = ({item, index}) => {
    return (
        <>
        {item.year && <View style={styles.headerBoxSty}>
            <Text style={styles.headerBoxTextSty}>{"Tháng "+item.month+"/"+item.year}</Text>
        </View>}
        <View style={styles.hisBoxSty}>
            <View style={styles.imageLaySty}>
                <Image style={styles.imageSty} source={fillIcon(item.action, item.is_success)} />
            </View>
            <View style={styles.bodyLaySty}>
                <Text style={styles.firstTextBodySty}>{fillText(item.action, item.package_name)}</Text>
                <Text style={styles.secondTextBodySty}>{item.date}</Text>
            </View>
            <View style={styles.tailLaySty}>
                <Text style={[styles.tailTextSty,{color: item.is_success ? Colors.Green_00CC83 : Colors.Red}]}>{item.detail}</Text>
            </View>
        </View>
        </>
    )
}

    return (
        <ImageBackground
        source={{uri: 'background111'}}
        imageStyle={stylesApp.ImageBackGround}
        style={{flex: 1}}>
            <AppHeader
                navigation={props.navigation}
                title={"Lịch sử"}
                leftIconOnPress={() => {
                    props.navigation.pop();
                }}
            />
        {dataList && firstloadDone && dataList.length == 0 ? <View style={styles.layoutEmptySty}>
                <Image source={nangcap_tk_empty} style={styles.ImageEmptySty} resizeMode={'contain'}/>
                <Text style={styles.TextEmptyTopSty}>{"Bạn chưa có lịch sử mua hàng!"}</Text>
            </View> : <FlatList
            renderItem={renderMono}
            data={dataList}
        />}
        </ImageBackground>
    );
};

export default PayHistory;