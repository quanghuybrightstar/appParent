import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    StatusBar,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';
import Header from '../../component/Header';
import API from '../../API/APIConstant';
import apiBase from '../../base/APIBase';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SmartScreenBase from '../../base/SmartScreenBase';
import Carousel from 'react-native-snap-carousel';
import { AppHeader } from '../../componentBase/AppHeader';
import FontBase from '../../base/FontBase';
import LogBase from '../../base/LogBase';
import { forEach } from 'lodash';

const Item = ({ item,onPress }) => {

    // const onPress = (id) => {
    //     let d = data.list_vocab_curriculum.find((e) => e.curriculum_id == id);
    //     setUnit(d.list_unit);
    // }

    return (
        <View style={{
            backgroundColor: '#72b8bb',
            width: SmartScreenBase.smPercenWidth * 80,
            height: SmartScreenBase.smBaseHeight * 160,
            marginRight: 2,
            marginBottom:2,
            borderRadius: 8,
            paddingHorizontal: 10,
            shadowColor: '#c1c1c1',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: { width: 1, height: 2 },
            elevation: 3,
            justifyContent: 'center',

        }}>
            <TouchableOpacity style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
            disabled={true}
            onPress={() => onPress(item)}
            >
                <Image source={{ uri: item.class_avatar ? API.image_base_url + item.class_avatar : 'def_par' }}
                    style={{ width: 160, height: SmartScreenBase.smBaseHeight * 140, resizeMode: 'cover' }} />
                <Text style={styles.textItem} numberOfLines={2}>{item.class_name}</Text>
            </TouchableOpacity>
        </View>
    );
};



const getIcon = (point)=>{
    if (point >= 100) {
        return 'done';
    } else if (point < 10) {
        return 'notdone';
    } else if (point >= 10 && point < 20) {
        return 'icon10';
    } else if (point >= 20 && point < 30) {
        return 'icon20';
    } else if (point >= 30 && point < 40) {
        return 'icon30';
    } else if (point >= 40 && point < 50) {
        return 'icon40';
    } else if (point >= 50 && point < 60) {
        return 'icon50';
    } else if (point >= 60 && point < 70) {
        return 'icon60';
    } else if (point >= 70 && point < 80) {
        return 'icon70';
    } else if (point >= 80 && point < 90) {
        return 'icon80';
    } else if (point >= 90 && point < 100) {
        return 'icon90';
    }
    return 'notdone';
};
const VocabScreen = (props) => {
    const [data, setData] = useState([]);
    const [unit, setUnit] = useState([]);
    const [classList, setclassList] = useState([]);
    const [loading,setLoading] = useState(false);

    const loadAllClass = async () => {
        const url = API.baseurl + API.MyClass;
        setLoading(true)
        apiBase.postDataJson('get',url).then(r=>{
        if(r.data.status){
            setclassList(r.data.data)
            loadClassData(r.data.data[0].id)
        }
        }).catch(e=>{
            setLoading(false)
        });
    };

    const loadClassData = async (class_id) => {
        LogBase.log('=====loadClassData',class_id);
        const url = API.baseurl + API.getVocabByClass + `?class_id=${class_id}`;
        setLoading(true)
        apiBase.postDataJson('get',url).then(r=>{
        setUnit(r.data.data.list_unit);
        setLoading(false)
        }).catch(e=>{
            setLoading(false)
        });
    };

    useEffect(() => {
        loadAllClass()
    }, []);



    const onChangeList = (unit_id) => {
        let d = unit.filter((e) => e.unit_id == unit_id);
        props.navigation.navigate('ListVocabScreen', {data:d});
    };

    const Unit = ({ item, index }) => {

        const [onPressAct, setOnPress] = React.useState(-1)

        return (
            <View style={{
                backgroundColor: 'white',
                marginHorizontal: 16,
                width: SmartScreenBase.smPercenWidth * 77,
                height:90,
                borderRadius: 8,
                marginVertical: 10,
                alignSelf: 'flex-end',
                paddingVertical: 5,
            }}>
                <TouchableOpacity style={{height:'100%',justifyContent:'center'}} disabled={item.is_block}
                    onPress={()=> onChangeList(item.unit_id)}
                    onPressIn={()=>{setOnPress(1)}}
                    onPressOut={()=>{setOnPress(-1)}}>
                    <View style={[{
                        backgroundColor: 'white',
                        position: 'absolute',
                        left: -32,
                        top: 5,
                        padding: 5,
                        borderRadius: 50,
                        justifyContent: 'center',
                    }, onPressAct != 1 && {
                        shadowColor: '#000',
                        shadowOpacity: 0.25,
                        shadowRadius: 3.85,
                        shadowOffset: { width: 0, height: 2 },
                        elevation: 5,
                    }]}>
                        <View style={{
                            backgroundColor: !item.is_block ? '#ccedeb' : '',
                            borderRadius: 50,
                            padding: !item.is_block ? 5 : 2,
                        }}>
                            {!item.is_block ?
                                <ImageBackground
                                    style={{ width: 50, height: 50, resizeMode: 'contain',justifyContent:'center',alignItems:'center' }}
                                    source={{
                                        uri: getIcon(item.process),
                                    }}
                                >
                                    <Text style={{
                                        fontSize: SmartScreenBase.smFontSize * 35,
                                        fontFamily: FontBase.MyriadPro_Regular
                                    }}>{item.process < 100 ? `${item.process}%` : ''}</Text>
                                </ImageBackground>
                                :
                                <Image style={{ width: 50, height: 50, resizeMode: 'contain' }}
                                    source={{ uri: 'icon_look_home'}}/>}
                        </View>
                    </View>
                    <View style={{ paddingLeft: 50,marginBottom:10}}>
                        <Text style={{ fontSize: SmartScreenBase.smFontSize * 50,
                                        fontFamily: FontBase.MyriadPro_Bold }}>{(index+1)+". "+item.unit_name}</Text>
                    </View>
                    <Text style={{ color: '#51b3ad',position:'absolute',right:10,bottom:4, fontSize: SmartScreenBase.smFontSize * 45, fontFamily: FontBase.MyriadPro_Regular}}
                    >Số từ học được: <Text style={{ fontSize: SmartScreenBase.smFontSize * 45,fontFamily: FontBase.MyriadPro_Regular }}>{item.number_word_completed}</Text></Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ImageBackground source={{ uri: 'bgtt' }} style={{ flex: 1 }}>
            <AppHeader  title={'Từ vựng'} leftIconOnPress={() => props.navigation.goBack()} />
            <View style={{
                marginTop:SmartScreenBase.smPercenHeight * 2,
                height: SmartScreenBase.smPercenHeight*20,
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: "center"
            }}>
                <Carousel
                    data={classList}
                    renderItem={({ item, index }) => <Item onPress={()=>{}} item={item} />}
                    sliderWidth={SmartScreenBase.smPercenWidth * 100}
                    itemWidth={SmartScreenBase.smPercenWidth * 80}
                    layout={'default'}
                    onSnapToItem={(index) => {
                        loadClassData(classList[index].id)
                    }}
                />
            </View>
            <View style={{
                paddingHorizontal:SmartScreenBase.smPercenWidth * 4,
                height: SmartScreenBase.smPercenHeight*65
            }}>
                <FlatList
                    bounces={false}
                    data={unit}
                    keyExtractor={(item, index) => item.unit_id.toString()}
                    renderItem={({ item, index }) => <Unit item={item} index={index}/>}
                // ListEmptyComponent={() => unit.length ? <Text>Không có dữ liệu</Text>:null}
                />
            </View>
            {
                loading && <View style={{
                    position:'absolute',
                    left:0,
                    right:0,
                    bottom:0,
                    top:0,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'rgba(0,0,0,0.5)',
                }}>
                    <ActivityIndicator size={'large'} color="#fff" />
                </View>
            }
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    containerItem: {
        backgroundColor: '#72b8bb',
        width: 350,
        height: 130,
        marginRight: 15,
        borderRadius: 8,
        paddingHorizontal: 10,
        shadowColor: '#c1c1c1',
        shadowOpacity: 1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 6 },
        elevation: 10,
        justifyContent: 'center',
    },
    textItem: {
        width: SmartScreenBase.smPercenWidth*31,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Bold,
    },
    containerUnit: {
        backgroundColor: 'white',
        position: 'absolute',
        left: -32,
        top: 8,
        padding: 5,
        borderRadius: 50,
        shadowColor: '#c1c1c1',
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: { width: 2, height: 2 },
        elevation: 3,
        justifyContent: 'center',
    },
});

export default VocabScreen;
