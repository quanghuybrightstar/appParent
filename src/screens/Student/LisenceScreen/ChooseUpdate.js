import {Dimensions, FlatList, Image, ImageBackground, Text, TouchableOpacity, View, Modal, Alert, Platform} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import SmartScreenBase from '../../../base/SmartScreenBase';
import LoadingScreen from '../../LoadingScreen';
import Header from './Header';
import Carousel from 'react-native-snap-carousel';
import ModalBy from './ModalBy';
import BySuccess from './BySuccess';
import RNIap, {
    InAppPurchase,
    PurchaseError,
    SubscriptionPurchase,
    finishTransaction,
    finishTransactionIOS,
    purchaseErrorListener,
    purchaseUpdatedListener,
} from 'react-native-iap';
import API from '../../../API/APIConstant';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { AppHeader } from '../../../componentBase/AppHeader';
import { Colors } from '../../../styleApp/color';
import FontBase from '../../../base/FontBase';
import styleApp from '../../../styleApp/stylesApp';
import {BorderSelectBox} from '../../../componentBase/BorderSelectBox';
import IapBase from '../../../base/IapBase';
import APIBase from '../../../base/APIBase';
import {JobBox} from '../../../componentBase/JobBox';
import LogBase from '../../../base/LogBase';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ComponentLoadingIndicator } from '../../../componentBase/indicator/ComponentLoadingIndicator';
import stringUtils from '../../../utils/stringUtils';

const {width, height} = Dimensions.get('screen');
const productIds = ['book12', 'com.book.7', 'sunday.threemonth'];

// Chọn gói nâng cấp
const ChooseUpdate = (props) => {

    const [dataProps, setDataProps] = useState({});
    const [grade, setGrade] = useState(0);
    const [gradeData, setGradeData] = useState({});
    const _carousel = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);
    const [dataSelect, setDataSelect] = useState(
        [{label: "Khối 6  ", value: 6}, {label: "Khối 7  ", value: 7}, {label: "Khối 8  ", value: 8}, {label: "Khối 9  ", value: 9}]);
    const jobBoxRef = useRef();

        useEffect(() => {
            IapBase.connect();
            // IapBase.KeepIapListener();
            IapBase.KeepCheckError();
            getData();
        }, []);

        const getData = async () => {
            if(!props.navigation.getParam('grade'))
                setIsLoading(true);
            await _getLicense();
            await _getGrade();
            setIsLoading(false);
        }

        const _getGrade = async () => {
            const url = API.baseurl + API.getGrade;
            try {
                const res = await APIBase.postDataJson('get', url);
                LogBase.log('==========_getGrade',res.data)
                // setIsLoading(true);
                if (res.data.status) {
                    setGradeData(res.data.list_grade)
                    var listDataS = []
                    for(var i=0; i<res.data.list_grade.length; i++){
                        // LogBase.log('==========gradeData['+i+']',res.data.list_grade[i])
                        listDataS.push({
                            label: res.data.list_grade[i].name, 
                            value: res.data.list_grade[i].value,
                            id: res.data.list_grade[i].id
                        })
                    }
                    setDataSelect(listDataS)
                    var mGradeIndex = props.navigation.getParam('grade')
                    var curGrade = -1
                    listDataS.forEach(element => {
                        if(element.id == mGradeIndex){
                            curGrade = element.id
                        }
                    });
                    // LogBase.log('======mGradeIndex',mGradeIndex)
                    // LogBase.log('======curGrade',curGrade)
                    // LogBase.log('======listDataS',listDataS)
                    if(mGradeIndex){
                        setGrade(mGradeIndex)
                        // LogBase.log('======getValue',jobBoxRef.current?.getValue())
                        jobBoxRef.current?.setValue(curGrade)
                    }else{
                        // LogBase.log('======setGrade',res.data.list_grade[0].id)
                        setGrade(res.data.list_grade[0].id)
                    }
                }
            } catch (error) {
                // setIsLoading(false);
                console.log(error);
            }
        };

    const _getLicense = async () => {
        const url = API.baseurl_2 + API.getLicense;
        try {
            const res = await APIBase.postDataJson('get', url);
            let dataReturn = res.data;
            // setIsLoading(false);
            if (dataReturn.status) {
                dataR = dataReturn.data;
                LogBase.log("=====dataR",dataR)
                setData(dataR);
                var listPro = []
                for(var i=0;i<res.data.data.length;i++){
                    if(res.data.data[i].package_code)
                        listPro.push(res.data.data[i].package_code)
                }
                IapBase.getProductList(listPro);
            }
        } catch (error) {
            // setIsLoading(false);
            console.log(error);
        }
    };

    const getPackInCurGrade = () => {
        var listCur = []
        if(data && data.length > 0){
            for(var i=0;i<data.length;i++){
                var listCh
                try{
                    listCh = JSON.parse(data[i].grade);
                }catch(e){
                    continue
                }
                // var listCh = JSON.parse(data[i].grade);
                var k=0;
                console.log("getPackInCurGrade_"+i,listCh)
                console.log("grade_"+i,grade)
                for(var j=0;j<listCh.length;j++){
                    if(listCh[j] == grade){
                        k=1;
                    }
                }
                if(k==1){
                    listCur.push(data[i])
                }
            }
        }
        console.log("=====grade",grade)
        console.log("=====getPackInCurGrade",listCur)
        return listCur;
    }

    const onStatusChange = (value) => {
        console.log("setGrade",value.type)
        setGrade(value.type)
    }

    const _renderItemCarousel = ({item, index}) => {
        return (
            <TouchableOpacity
                style={{
                    height: SmartScreenBase.smPercenHeight * 70,backgroundColor: '#fff',borderRadius: SmartScreenBase.smPercenWidth * 10,
                    alignItems: 'center', marginTop: SmartScreenBase.smPercenWidth, marginLeft: SmartScreenBase.smPercenWidth, marginRight: SmartScreenBase.smPercenWidth*1.5, ...styleApp.shadow
                }}
                onPress={() => props.navigation.navigate('DetailItem', {id: item.package_id, index: index, data: item, reload: props.navigation.getParam('reload')})}
            >
                <View style={{
                    width: SmartScreenBase.smPercenWidth * 68,
                    height: SmartScreenBase.smPercenWidth * 11,
                    borderRadius: SmartScreenBase.smPercenWidth *20,
                    backgroundColor: index % 2 ? Colors.LightBlue : Colors.LightYellow,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: SmartScreenBase.smPercenHeight
                }}>
                    <Text style={{
                        fontSize: SmartScreenBase.convertSize(55),color: Colors.DarkBlue, fontFamily: FontBase.MyriadPro_Bold
                    }}>{item.package_name}</Text>
                </View>
                <View style={{
                    width: '100%',
                    height: SmartScreenBase.smPercenHeight * 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: SmartScreenBase.smPercenHeight
                }}>
                    <Image
                        source={{uri: index % 2 ? 'bus' : 'tuongnuthan'}}
                        resizeMode={'contain'}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 707,
                            height: SmartScreenBase.smBaseWidth * 585,
                        }}/>
                </View>
                <View style={{
                    width: '100%',alignItems: 'center',paddingHorizontal: SmartScreenBase.smPercenWidth * 5,alignContent: 'center',
                    backgroundColor: index % 2 ? Colors.LightBlue : Colors.LightYellow,
                    height:  SmartScreenBase.smPercenHeight * 70 - SmartScreenBase.smPercenHeight * 31 -SmartScreenBase.smPercenWidth * 12,
                    borderBottomRightRadius: SmartScreenBase.smPercenWidth * 10, borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 10
                }}>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width: '100%', marginTop: SmartScreenBase.smPercenHeight*5}}>
                        <Text style={{fontSize: SmartScreenBase.convertSize(45),fontFamily: FontBase.MyriadPro_Regular}}></Text>
                        {item.origin_price>item.price?
                        <Text style={{fontSize: SmartScreenBase.convertSize(45),fontFamily: FontBase.MyriadPro_Regular, textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: Colors.NearBlack}}>{stringUtils.moneyForm(item.origin_price)+'đ'}</Text>: null}
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width: '100%'}}>
                        <Text style={{fontSize: SmartScreenBase.convertSize(45),fontFamily: FontBase.MyriadPro_Regular, color: Colors.NearBlack}}>Giá</Text>
                        <Text style={{fontSize: SmartScreenBase.convertSize(45),fontFamily: FontBase.MyriadPro_Bold, color: Colors.LightRed}}>{stringUtils.moneyForm(item.price)+'đ'}</Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width: '100%'}}>
                        <Text style={{fontSize: SmartScreenBase.convertSize(45),fontFamily: FontBase.MyriadPro_Regular, color: Colors.NearBlack}}>Thời hạn</Text>
                        <Text style={{fontSize: SmartScreenBase.convertSize(45),fontFamily: FontBase.MyriadPro_Regular, color: Colors.NearBlack}}>{(item.number_day / 30) + ' tháng'}</Text>
                    </View>
                    {item.gift > 0 ?
                        <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width: '100%'}}>
                            <Text style={{fontSize: SmartScreenBase.convertSize(45),fontFamily: FontBase.MyriadPro_Regular, color: Colors.NearBlack}}>Tặng thêm</Text>
                            <Text style={{fontSize: SmartScreenBase.convertSize(45),fontFamily: FontBase.MyriadPro_Bold, color: Colors.LightRed}}>{"+"+(item.gift / 30) + ' tháng'}</Text>
                        </View>: null}


                <View style={{
                    position: 'absolute',
                    backgroundColor: Colors.White,
                    width: SmartScreenBase.smPercenWidth * 20,
                    height: SmartScreenBase.smPercenWidth * 10,
                    bottom: 0,
                    // borderRadius: SmartScreenBase.smPercenWidth * 20,
                    overflow: 'hidden',
                    borderTopLeftRadius: SmartScreenBase.smPercenWidth * 20,
                    borderTopRightRadius: SmartScreenBase.smPercenWidth * 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        source={{uri: 'muitenxong1'}}
                        resizeMode={'contain'}
                        style={{
                            width: SmartScreenBase.smPercenHeight * 3,
                            height: SmartScreenBase.smPercenHeight * 3,
                        }}/>
                </View>
            </View>
            </TouchableOpacity>
        );
    };

    // const _choose = (name) => {
    //     showOption(false);
    //     setName(name);
    // };

    // const _renderItem = ({item, index}) => {
    //     return (
    //         <View style={{
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             width: '100%',
    //         }}>
    //             <TouchableOpacity style={{
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 width: '90%',
    //                 borderTopWidth: 1,
    //                 borderTopColor: '#818284',
    //             }}
    //                               onPress={() => _choose(item.name)}
    //             >
    //                 <Text style={{
    //                     fontSize: SmartScreenBase.smFontSize * 40,
    //                     padding: SmartScreenBase.smPercenHeight * 2,
    //                 }}>{item.name}</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // };

    const _renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <ModalBy
                    dataProps={dataProps}
                    byNow={() => _bySuccess()}
                    loading={() => setIsLoading(true)}
                    hideModal={() => setModalVisible(false)}
                />
            </Modal>
        );
    };

    const _bySuccess = () => {
        setIsLoading(false);
        // setModalVisible(false);
        setModalVisibleSuccess(true);
    };

    const getDataSelect = () => {

        var mlist = []
        dataSelect.forEach(element => {
            var newEle = {
                name: element.label,
                type: element.id
            }
            mlist.push(newEle)
        });
        console.log("=====getDataSelect",mlist)
        return mlist
    };

    const _byNow = () => {
        // // const result = await Iap.getProducts(productIds);
        // // console.log('connection is => ', result);
        // // const products = await RNIap.getSubscriptions(itemSkus);
        // try {
        //     const products = await RNIap.getProducts(productIds);
        //     // const products = await RNIap.getSubscriptions(itemSkus);
        //     console.log('Products', products);
        // } catch (err) {
        //     console.warn(err.code, err.message);
        // }
        let index = _carousel.current._activeItem;
        setDataProps(data[index]);
        setModalVisible(true);
    };

    const _renderModalSuccess = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleSuccess}
            >
                <BySuccess data={dataProps} hideModal={() => setModalVisibleSuccess(false)}/>
            </Modal>
        );
    };

    return (
        <ImageBackground
            source={{uri: 'background111'}}
            imageStyle={styleApp.ImageBackGround}
            style={{flex: 1}}>

            {_renderModal()}
            {_renderModalSuccess()}

                <AppHeader title={"Chọn gói nâng cấp"} leftIconOnPress={() => {
                    props.navigation.pop()
                }}/>
            <View style={{flex: 1}}>
                <View style={{height: SmartScreenBase.smPercenWidth*11, width: SmartScreenBase.smPercenWidth*100, 
                    justifyContent: 'center', alignItems: 'center', marginTop: SmartScreenBase.smPercenWidth*1, 
                    marginBottom: SmartScreenBase.smPercenWidth*4, opacity: isLoading ? 0 : 1}}>
                {/* <BorderSelectBox dropdownStyle={[ Platform.OS === 'android' && {marginTop: -(SmartScreenBase.smBaseHeight * 100 + 1)}, {marginLeft: -1}]}
                containerStyles={{width: SmartScreenBase.smPercenWidth*73, borderWidth: 1, elevation: 4}}
                    selected={grade} onChange={(value)=>{onStatusChange(value)}} 
                    item={dataSelect} borderColor={'#454545'} backgroundColor={'#00000000'} /> */}
                <JobBox listData={getDataSelect()} onChange={(value)=>{onStatusChange(value)}} ref={jobBoxRef} dropdownStyles={styles.drop}/>
                </View>
                <View style={{flex: 90, zIndex: 9}}>
                    {!isLoading ? <Carousel
                        ref={_carousel}
                        data={getPackInCurGrade()}
                        renderItem={_renderItemCarousel}
                        sliderWidth={SmartScreenBase.smPercenWidth * 100}
                        itemWidth={SmartScreenBase.smPercenWidth * 75}
                        firstItem={0}
                        layout={'default'}
                    />
                    : <View style={{alignItems: 'center', justifyContent: 'center', height: SmartScreenBase.smPercenHeight*70}}>
                        <ComponentLoadingIndicator isBig visible={isLoading}/>
                    </View>}
            </View>
        </View>
        {/* <FullScreenLoadingIndicator visible={isLoading}/> */}
        </ImageBackground>
    );
};

export default ChooseUpdate;
