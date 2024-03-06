import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image,
    ScrollView,
    ActivityIndicator,
    Platform,
    StyleSheet
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
import Axios from 'axios';
import API from '../../../../API/APIConstant';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { TextBox } from '../../../../componentBase/TextBox';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import FontBase from '../../../../base/FontBase';
import LogBase from '../../../../base/LogBase';


/**
 * 
 * @param {object} props 
 * @property {object} data Data of Map List
 * @property {object} navigation navigation props
 * @returns {Component}
 */
const MapList = (props) => {

    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [curShow, setCurShow] = useState(-1);
    const flatlistRef = useRef();

    useEffect(() => {
        _setData();
    }, [props.data]);

    /**
     * Function Convert and set data
    */
    const _setData = async () => {
        let dataConvert = await _convertDataList(props.data);
        setDataList(dataConvert);
        setIsLoading(false)
    };

    /**
     * Function Convert data 
    */
    const _convertDataList = async (data) => {
        let array = [];
        data.forEach(async (item, index) => {
            let oj = {
                unit_name: item.unit_name, show: false, stt: item.stt,
                dataItem: item.list_skill,
            }
            await array.push(oj);
        });
        return array;
    };

    /**
     * Function toggle view by changing the Show attribute
    */
    const _togleList = (index) => {
        console.log("=====index",index)
        // let data = [...dataList];
        // if(curShow == -1 || curShow != index){
        //     for (let i = 0; i < data.length; i++) {
        //         if (i !== index) {
        //             data[i].show = false;
        //         }
        //     }
        //     data[index].show = true
        // }else{
        //     data[index].show = !data[index].show
        // }
        // LogBase.log("=====data "+index,data[index].show)
        // setDataList(data);
        if(curShow == index){
            setCurShow(-1)
        }else{
            setCurShow(index)
        }
        setTimeout(() => {
            flatlistRef?.current?.scrollToIndex({animation: true, index: index});
        }, 100);
    };

    /**
     * Function Navigate to LessonListTCScreen
    */
    const _moveLesson = (item) => {
        props.navigation.navigate('LessonListTCScreen', { data: item, curriculumName: props.curriculumName });
    };

    /**
     * Function Render Item in FlatList
    */
    const _renderItem = ({ item, index }) => {
        var isShow = (curShow == index)
        return (
            <View style={styles.viewItem}>
                <TouchableOpacity
                    onPress={() => {
                        _togleList(index);
                    }}
                    style={styles.btnItem}>
                    <View style={styles.flexRow}>
                        <TextBox
                            style={styles.txtUnit}>{item.stt ? item.stt+" : " : ""}</TextBox>
                        <TextBox style={styles.txtNum} numberOfLines={2}>{item.unit_name}</TextBox>
                    </View>
                    <View

                        style={styles.viewIcon}>
                        {
                            isShow ?
                                <Image source={{ uri: 'ic_unshow' }} style={styles.icunshow} />
                                :
                                <Image source={{ uri: 'ic_show' }} style={styles.icshow} />
                        }
                    </View>
                </TouchableOpacity>

                <View style={styles.viewOption}>
                    {/* {LogBase.log("===index",index)} */}
                    {/* {LogBase.log("===dataList[index].show",dataList[index].show)} */}
                    {
                        isShow ?
                        <ScrollView style={styles.scroll}>
                            {

                                item.dataItem.map((itm, ind) => {
                                    return (
                                        <TouchableOpacity
                                            key={(itm.skill+"_"+ind).toString()}
                                            onPress={() => _moveLesson(itm)}
                                            style={[styles.btnOption, { borderBottomWidth: ind == item.dataItem.length - 1 ? 0 : 1, }]}>
                                            <TextBox
                                                style={styles.normalText}
                                                numberOfLines={1}>{!!itm.skill ? (itm.skill[0].toUpperCase() + itm.skill.substring(1, itm.skill.length)) : ""}</TextBox>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </ScrollView>
                    : null}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.viewContent}>
                {
                    isLoading ?
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" />
                        </View>
                        :
                        null
                }
                <FlatList
                    ref={flatlistRef}
                    data={dataList}
                    renderItem={_renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => {
                        return item.unit_name+"_"+index;
                    }}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    txtNum: {
        flex: 1,
        lineHeight: FontSize.size50Font,
    },
    flexRow: { flexDirection: 'row', flex: 1, paddingRight: SmartScreenBase.smBaseWidth * 30 },
    normalText: {
        fontFamily: FontBase.MyriadPro_Regular,
    },
    loading: {
        left: '50%',
        position: 'absolute',
        zIndex: 10,
    },
    viewContent: {
        marginTop: SmartScreenBase.smBaseHeight * 25, paddingHorizontal:
            SmartScreenBase.smBaseWidth * 70, width: '100%', flex: 7
    },
    container: { flex: 1, alignItems: 'center' },
    btnOption: {
        height: SmartScreenBase.smBaseHeight * 65,
        justifyContent: 'center',
        width: '100%',
        borderBottomColor: Colors._404041,
        alignItems: 'center',
    },
    scroll: { flex: 1, width: '100%' },
    viewOption: { width: '100%', alignItems: 'center' },
    viewIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors._f0f0f0,
        width: SmartScreenBase.smPercenWidth * 100 / 12,
        height: SmartScreenBase.smPercenWidth * 100 / 12,
        borderRadius: SmartScreenBase.smPercenWidth * 100 / 2,
        // position: 'absolute',
        marginRight: SmartScreenBase.smBaseWidth * 50,
    },
    nameUnit: {
        fontSize: FontSize.size50Font,
        color: Colors._010101,
        fontFamily: FontBase.MyriadPro_Regular
    },
    txtUnit: {
        fontSize: FontSize.size50Font,
        paddingLeft: SmartScreenBase.smPercenWidth * 5,
        fontFamily: FontBase.MyriadPro_Bold,
        color: Colors._010101,
        lineHeight: FontSize.size50Font,
        // width: '85%'
    },
    btnItem: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        backgroundColor: Colors.White,
        paddingVertical: SmartScreenBase.smBaseWidth * 30,
        // height: SmartScreenBase.smBaseHeight * 70,
        alignItems: 'center',
    },
    viewItem: {
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        width: '100%', marginBottom: SmartScreenBase.smBaseHeight * 15, backgroundColor: Colors._ffffff50
    },
    icshow: {
        width: SmartScreenBase.smBaseWidth * 36,
        height: SmartScreenBase.smBaseWidth * 36,
    },
    icunshow: {
        width: SmartScreenBase.smBaseWidth * 36,
        height: SmartScreenBase.smBaseWidth * 4,
    },
})
export default MapList;
