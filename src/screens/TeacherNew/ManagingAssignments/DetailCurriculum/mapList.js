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
import { useSelector } from 'react-redux';
import FontBase from '../../../../base/FontBase';

const { width, height } = Dimensions.get('window');
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { TextBox } from '../../../../componentBase/TextBox';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';

/**
 * 
 * @param {object} props 
 * @property {object} data Data of Map List
 * @property {object} navigation navigation props
 * @returns {Component}
 */
export const MapList = (props) => {


    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const flatlistRef = useRef();


    useEffect(() => {
        _setData();
    }, [props.data]);

    /**
    * Function Convert and set data
   */
    const _setData = () => {
        let array = Array.from(dataList)
        var slMiss = 0
        props.data.map((item, index) => {
            var tittle = ""
            if(item.list_skill[0].skill != 'exam'){
                tittle = "Unit "+(index-slMiss+1)
            }else{
                slMiss = slMiss + 1
            }
            let oj = {
                unit_name: item.unit_name, show: false, dataItem: item.list_skill,
                stt: tittle
            }
            array.push(oj);
        });
        setDataList(array)
        setIsLoading(false)
    };

    /**
     * Function Convert data 
    */
    const _convertDataList = async (data) => {
        let array = [...dataList];
        data.map((item, index) => {
            let oj = {
                unit_name: item.unit_name, show: false, dataItem: item.list_skill,
            }
            array.push(oj);
        });
        console.log('arr', array)
        return array;
    };

    /**
     * Function toggle view by changing the Show attribute
    */
    const _togleList = (index) => {
        let data = [...dataList];
        for (let i = 0; i < data.length; i++) {
            if (i !== index) {
                data[i].show = false;
            }
        }
        data[index].show = !data[index].show;
        setDataList(data);
        flatlistRef?.current?.scrollToIndex({index: index, animation: false});
    };

    /**
     * Function Navigate to LessonListTCScreen
    */
    const _moveLesson = (item) => {
        props.navigation.navigate('ListLessonManagent', { data: item, curriculumName: props.curriculumName, curriculumID: props.curriculumID });
    };

    /**
     * Function Render Item in FlatList
    */
    const _renderItem = ({ item, index }) => {
        let unit_num = item.unit_name, unit_name1 = '';
        let idx = unit_num.indexOf(':');
        if (idx < 0) {
            idx = unit_num.indexOf('-');
        }
        if (idx >= 0) {
            unit_name1 = unit_num.substring(idx + 1).trim()
            unit_num = unit_num.substring(0, idx).trim()
        }

        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    onPress={() => {
                        _togleList(index);
                    }} style={styles.itemBtn}>
                    <View style={styles.flexRow}>
                        <TextBox
                            style={styles.unitNumText}>{item.stt ? item.stt+" : " : ""}</TextBox>
                        <TextBox style={styles.unitNumCountText} numberOfLines={2}>{item.unit_name}</TextBox>
                    </View>
                    <View
                        style={styles.expandBox}>
                        {
                            dataList[index].show ?
                                <Image source={{ uri: 'ic_unshow' }} style={styles.icunshow} />
                                :
                                <Image source={{ uri: 'ic_show' }} style={styles.icshow} />
                        }
                    </View>
                </TouchableOpacity>
                <View style={styles.dataBox}>
                    {
                        dataList[index].show &&
                        <ScrollView style={styles.scrollView}>
                            {
                                item.dataItem.map((itm, ind) => {
                                    return (
                                        <TouchableOpacity
                                            key={ind}
                                            onPress={() => _moveLesson(itm)}
                                            style={[styles.dataBtn, {
                                                borderBottomWidth: ind == item.dataItem.length - 1 ? 0 : 0.3,
                                            }]}>
                                            <TextBox
                                                style={styles.normalText}
                                                numberOfLines={1}>{!!itm.skill ? (itm.skill[0].toUpperCase() + itm.skill.substring(1, itm.skill.length)) : ""}</TextBox>
                                            {/* <Text
                                                style={{fontSize: 16, color: '#fff', width: '70%'}}
                                                numberOfLines={1}>{itm.lesson_name}</Text> */}
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </ScrollView>
                    }
                </View>

            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.childContainer}>
                {
                    isLoading ?
                        <View style={styles.loadingBox}>
                            <ActivityIndicator size="large" />
                        </View>
                        :
                        null
                }
                <FlatList
                    ref={flatlistRef}
                    indicatorStyle={'black'}
                    data={dataList}
                    bounces={false}
                    initialNumToRender={dataList.length}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatlist}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    flatlist: { marginHorizontal: SmartScreenBase.smBaseWidth * 60, },
    normalText: {
        fontFamily: FontBase.MyriadPro_Regular,
    },
    flexRow: { flexDirection: 'row', flex: 1, paddingRight: SmartScreenBase.smBaseWidth * 30 },
    itemContainer: {
        borderRadius: SmartScreenBase.smBaseWidth * 30, marginBottom: SmartScreenBase.smBaseHeight * 15,
        backgroundColor: Colors._C8F9E8,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        marginHorizontal: SmartScreenBase.smBaseWidth * 5
    },
    itemBtn: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        backgroundColor: Colors.White,
        paddingVertical: SmartScreenBase.smBaseWidth * 30,
        // height: SmartScreenBase.smBaseHeight * 70,
        alignItems: 'center',

    },
    unitNumText: {
        fontSize: FontSize.size50Font,
        paddingLeft: SmartScreenBase.smPercenWidth * 5,
        fontFamily: FontBase.MyriadPro_Bold,
        color: Colors._010101,
        lineHeight: FontSize.size50Font,
        // width: SmartScreenBase.smPercenWidth * 75
    },
    unitNumCountText: {
        flex: 1,
        lineHeight: FontSize.size50Font,
    },
    unitNameText: {
        fontSize: SmartScreenBase.smFontSize * 50,
        color: Colors._010101,
        paddingTop: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight : 0,
        ...FontWeight.Regular,
    },
    expandBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors._f0f0f0,
        width: SmartScreenBase.smPercenWidth * 100 / 12,
        height: SmartScreenBase.smPercenWidth * 100 / 12,
        borderRadius: SmartScreenBase.smPercenWidth * 100 / 2,
        // position: 'absolute',
        marginRight: SmartScreenBase.smBaseWidth * 50,
    },
    expandText: {
        color: Colors._69696a,
        fontSize: FontSize.size65Font,
        padding: 0,
        position: 'absolute',
    },
    dataBox: { width: '100%', alignItems: 'center' },
    dataBtn: {
        height: SmartScreenBase.smBaseHeight * 65,
        justifyContent: 'center',
        width: '100%',
        borderBottomColor: Colors._404041,
        alignItems: 'center',
    },
    dataText: { textTransform: 'capitalize', ...FontWeight.Bold, },
    scrollView: { flex: 1, width: '100%' },
    loadingBox: {
        left: '50%',
        // flex: 1,
        position: 'absolute',
        zIndex: 10,
    },
    childContainer: {
        marginTop: SmartScreenBase.smBaseHeight * 27,

        width: '100%',
        flex: 7,
    },
    container: { flex: 1, alignItems: 'center' },
    icshow: {
        width: SmartScreenBase.smBaseWidth * 36,
        height: SmartScreenBase.smBaseWidth * 36,
    },
    icunshow: {
        width: SmartScreenBase.smBaseWidth * 36,
        height: SmartScreenBase.smBaseWidth * 4,
    },
})