import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, ImageBackground, Image, Dimensions, TouchableOpacity} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import API from '../../API/APIConstant';
import FontBase from '../../base/FontBase';
import { SmPopup } from '../../componentBase/SmPopup/SmPopup';
import LogBase from '../../base/LogBase';
import IapBase from '../../base/IapBase';

const {width, height} = Dimensions.get('window');
const ListLesson = (props) => {

    const [showMesPopup, setShowMesPopup] = useState(false)
    const [curUnit, setCurUnit] = useState(0)
    const [isModalCallMU ,setModalCallMU] = useState(0)

    const _cancelModalMasterUnit = () => {
        setModalCallMU(false);
    };

    const goToMasterUnit = ()=> {
        props.rootNavigation.navigate('MasterUnit', {classId: props.currID});
    };

    const _confirmModalMasterUnit = () => {
        setModalCallMU(false);
        goToMasterUnit();
    };

    const _checkTop = (index) => {
        switch (index) {
            case 0:
                return SmartScreenBase.smPercenHeight * 33;
            case 1:
                return SmartScreenBase.smPercenHeight * 5;
            case 2:
                return SmartScreenBase.smPercenHeight * 47;
        }
    };
    const _checkRigth = (index) => {
        switch (index) {
            case 0:
                return SmartScreenBase.smPercenHeight*20;
            default:
                return -SmartScreenBase.smPercenHeight*2;
        }
    };
    const _checkImage = (data) => {
        switch (data) {
            case 0:
                return 'map2';
            case 1:
                return 'map1';
            case 2:
                return 'map2';
            default:
                return 'khongco';
        }
    };
    const _checkLeft = (index) => {
        switch (index) {
            case 0:
                return '-10%';
            case 1:
                return -width / 11;
            case 2:
                return '85%';
            default:
                return 0;
        }
    };
    const _checkItem = (item) => {
        // console.log("=====map",item)
        if(item.is_lock_unit || props.isMustGoMU){
            return <Image source={{uri: 'lockunit'}}
                          style={{width: 20, height: 20, resizeMode: 'contain', tintColor: '#fff'}}/>;
        }else if (item.percentage_complete == 100) {
            return <Image source={{uri: 'tick_trang'}}
                          style={{width: 20, height: 20, resizeMode: 'contain'}}/>;
        } else {
            return <Text style={{fontSize: SmartScreenBase.smFontSize*45, fontFamily: FontBase.MyriadPro_Regular, color: '#fff'}}>{item.percentage_complete}%</Text>;
        }

    };

    const matchMap = () => {

            return (<View>
                        <View style={{width: '100%', height: '100%'}}>
                            {/* {
                                props.index != props.dataLesson.length ?
                                <Image source={{uri: _checkImage(2)}} style={{
                                    zIndex: 10,
                                    position: 'absolute',
                                    width: SmartScreenBase.smPercenHeight*5.5,
                                    height: SmartScreenBase.smPercenHeight*12.5,
                                    right: SmartScreenBase.smPercenHeight*0,
                                    top: SmartScreenBase.smPercenHeight*55,
                                    backgroundColor: '#f00'
                                    }}/>
                                : null 
                                }                                         */}
                                        {
                                             props.index != 0 ?
                                            <Image source={{uri: _checkImage(2)}} style={{
                                                zIndex: 10,
                                                position: 'absolute',
                                                elevation: 1,
                                                width: SmartScreenBase.smPercenHeight*9.5,
                                                height: SmartScreenBase.smPercenHeight*10.2,
                                                left: SmartScreenBase.smPercenHeight*0,
                                                top: SmartScreenBase.smPercenHeight*51,
                                            }}/>
                                         : null 
                                        }
                                    </View>
            </View>)

    };

    return (
        <View style={{flexDirection: 'row', width: SmartScreenBase.smPercenHeight * 50, height: SmartScreenBase.smPercenHeight * 100}}>
            {matchMap()}
            {
                props.dataLesson[props.index].map((item, index) => {
                    LogBase.log("=====data:",item)
                    return (
                        <TouchableOpacity
                        key={index}
                        style={{
                            position: 'absolute',
                            top: _checkTop(index),
                            alignItems: 'center',
                            right: _checkRigth(index),
                            width: SmartScreenBase.smPercenHeight * 25,
                            height: SmartScreenBase.smPercenHeight * 25,
                        }} onPress={() => {
                            if(!item.is_lock_unit || item.is_lock_unit == 0){
                                if(props.isMustGoMU){
                                    setModalCallMU(true)
                                }else{
                                    props.navigation(item);
                                }
                            }else{
                                setCurUnit(index)
                                setShowMesPopup(true)
                            }
                        }}>
                            <Text style={{
                                fontSize: SmartScreenBase.smFontSize * 55,
                                width: width / 2,
                                textAlign: 'center',
                                fontFamily: FontBase.UTM_AVO,
                            }}>{item.stt || ""}</Text>
                            <Text style={{
                                fontSize: SmartScreenBase.smFontSize * 40,
                                width: width / 2,
                                textAlign: 'center',
                                fontFamily: FontBase.MyriadPro_Regular,
                            }}>{item.unit_name}</Text>
                            <Image source={{uri: 
                            item.unit_avatar ? API.domain+item.unit_avatar : 
                            'hv_freelearn_05'}} resizeMode={'cover'} style={{
                                width: SmartScreenBase.smPercenHeight * 15.5,
                                height: SmartScreenBase.smPercenHeight * 15.5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: "absolute",
                                borderRadius: SmartScreenBase.smPercenHeight*20,
                                top: SmartScreenBase.smPercenHeight * 7.5,
                                left: SmartScreenBase.smPercenHeight * 4.7
                            }}/>
                            <ImageBackground source={{uri: 
                            //item.unit_avatar ? API.domain+item.unit_avatar : 
                            'khungmap'}} resizeMode={'contain'} style={{
                                width: SmartScreenBase.smPercenHeight * 25,
                                height: SmartScreenBase.smPercenHeight * 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: "absolute",
                                top: SmartScreenBase.smPercenHeight * 6,
                                left: SmartScreenBase.smPercenHeight * 0.5
                            }}>
                                {
                                    index == 1 ?
                                        <Image source={{uri: _checkImage(index)}} style={{
                                            position: 'absolute',
                                            zIndex: 10,
                                            width: '54%',
                                            height: '50%',
                                            resizeMode: 'contain',
                                            left: _checkLeft(index),
                                            top: index == 1 ? '63%' : '30%',
                                        }}/>
                                        : null
                                    //     index == 2 ?

                                    //     <View style={{width: '100%', height: '100%'}}>
                                    //         {
                                    //             props.index != props.dataLesson.length - 1 &&
                                    //             <Image source={{uri: _checkImage(index)}} style={{
                                    //                 zIndex: 10,
                                    //                 position: 'absolute',
                                    //                 elevation: 1,
                                    //                 width: SmartScreenBase.smPercenHeight*6.5,
                                    //                 height: SmartScreenBase.smPercenHeight*12.5,
                                    //                 left: SmartScreenBase.smPercenHeight*21.5,
                                    //                 top: SmartScreenBase.smPercenHeight,
                                    //             }}/>
                                    //         }
                                    //     </View>
                                    //     : 
                                    //     <View style={{width: '100%', height: '100%'}}>
                                    //     {
                                    //         props.index != 0 &&
                                    //         <Image source={{uri: _checkImage(index)}} style={{
                                    //             zIndex: 10,
                                    //             position: 'absolute',
                                    //             elevation: 1,
                                    //             width: SmartScreenBase.smPercenHeight*6.5,
                                    //             height: SmartScreenBase.smPercenHeight*12.5,
                                    //             left: -SmartScreenBase.smPercenHeight*2.5,
                                    //             top: SmartScreenBase.smPercenHeight*12.5,
                                    //         }}/>
                                    //     }
                                    // </View>
                                }
                                {
                                    index == 1 && index != props.dataLesson[props.index].length - 1 &&
                                    <Image source={{uri: 'map3'}}
                                           style={{position: 'absolute', width: '4%', height: '48%', top: '100%'}}/>
                                }
                                {
                                    Number.isFinite(item.percentage_complete) ?
                                    <ImageBackground source={{uri: 'otronmap'}} style={{
                                        width: 50,
                                        height: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'absolute',
                                        bottom: '18%',
                                        right: '22%',
                                    }}>
                                        {_checkItem(item)}
                                        {/* <Text></Text> */}
                                    </ImageBackground>
                                        :
                                        null
                                }
                            </ImageBackground>
                        </TouchableOpacity>
                    );
                })
            }
            <SmPopup visible={showMesPopup} message={"Nội dung này đang bị khóa. Hãy đăng ký khóa học để tiếp tục nhé!"}
                confirmOnpress={() => {LogBase.log("=====kkk",props.grade); props.rootNavigation.navigate('BuyPackage', {grade: props.grade}); setShowMesPopup(false)}} confirmText={"Đăng ký"} cancelOnpress={() => {setShowMesPopup(false)}} cancelText={"Không"}
                contentStyles={{height: SmartScreenBase.smPercenWidth*55}}/>
            <SmPopup visible={isModalCallMU} message={`Bạn hãy hoàn thành bài tập trong Master Unit để tiếp tục!`}
                confirmOnpress={_confirmModalMasterUnit} confirmText={"Đồng ý"} cancelOnpress={_cancelModalMasterUnit} cancelText={"Đóng"}
                contentStyles={{height: SmartScreenBase.smPercenWidth*55}}/>
        </View>
    );
};
export default ListLesson;
