import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
    View,
    FlatList,
    Text,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import LissLesson from './listLesson';
import API from '../../API/APIConstant';
import ModalCheck from './modalCheck';
import Maplist from './mapList';
import stylesApp from '../../styleApp/stylesApp';
import {stylesHistory} from '../Student/StudyForTest/styles';
import Loading from '../../component/LoadingScreen';
import ModalMasterUnit from './ModalMasterUnit';
import apiBase from '../../base/APIBase';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import MyData from '../../component/MyData';
import { FullScreenLoadingIndicator } from '../../componentBase/indicator/FullScreenLoadingIndicator';
import { SmPopup } from '../../componentBase/SmPopup/SmPopup';
import { TextBox } from '../../componentBase/TextBox';
import { Colors } from '../../styleApp/color';
import LogBase from '../../base/LogBase';

const {width, height} = Dimensions.get('window');

const MapNewScreen = (props) => {

    const itemActive = props.navigation.getParam('active');
    const [dataLesson, setDataLesson] = useState([]);
    const [visible, setVisible] = useState(false);
    const [maplist, setMapList] = useState(false);
    const [dataMapList, setDataMapList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMustGoMU, setMustGoMU] = useState(false);
    const [currCurr,setCurrCurr] = React.useState(null);
    const [allCurr,setAllCurr] = React.useState([]);
    const [isBlank,setBlank] = React.useState(false);
    const [grade,setGrade] = React.useState(false);
    const listener = useRef()
    const MapListRef = useRef()

    useEffect(() => {

        const initMap = async () => {
            await getMyCurriculum();
        };
        initMap();
        if (!listener.current) {
            listener.current = props.navigation.addListener('didFocus', getMyCurriculum);
        }
        return () => {
            listener.current.remove();
        };

        // getMyCurriculum();
        // if (!listener.current) {
        //     listener.current = props.navigation.addListener('didFocus', getMyCurriculum)
        // }
        // return () => {
        //     listener.current.remove();
        // }
    }, []);

    const updateState = () => {
        setCurrCurr(it);
        MapListRef.current?.scrollToOffset({ offset: 0, animated: false })
    };

    React.useEffect(()=>{
        if (!currCurr)
        {return;}
        //load detail curriculum
        setIsLoading(true);
        setBlank(false)
        apiBase.postDataJson('get',API.baseurl + API.map_unit(currCurr.id)).then(r=>{
            setIsLoading(false);
            if(r.data.status){
                let convertList = _convertList(r.data.data);
                setDataMapList(r.data.data);
                setDataLesson(convertList);
                setGrade(r.data.grade_id)
                MyData.curCurriID = currCurr.id
                if(r.data.empty_unit){
                    setBlank(true)
                }
                if(r.data.require_learn_master_unit){
                    setMustGoMU(true)
                }else{
                    setMustGoMU(false)
                }
            }else{
                Alert.alert("Thông báo",r.data.msg,                    [
                    {
                      text: "Trở về",
                      onPress: () => {
                    props.navigation.navigate('Curriculums',
                      {
                          data:allCurr,
                          current:currCurr,
                          cb:(it)=>{
                              setCurrCurr(it);
                              MapListRef.current?.scrollToOffset({ offset: 0, animated: false })
                          },
                      });},
                      style: "cancel",
                    }
                  ])
            }
        }).catch(e=>{
            setIsLoading(false);
        }).finally(()=>{
        });
    },[currCurr]);

    const goToMasterUnit = useCallback(()=> {
        props.navigation.navigate('MasterUnit', {classId: currCurr?.id});

    }, [props.navigation, currCurr]);

    const getMyCurriculum = async () => {
        if(!MyData.isCurrBack){
            try {
                setIsLoading(true)
                const response = await apiBase.postDataJson('get',API.baseurl + API.my_classes);
                console.log("=====MapFull",response.data.data)
                if (response.status){
                    setAllCurr(response.data.data);
                    var curCurr = response.data.data.find(c=>c.id == MyData.curCurriID);
                    if(curCurr){
                        setCurrCurr(curCurr)
                    }else{
                        var def = response.data.data.find(c=>c.curriculum_type === 'default');
                        setCurrCurr(def || response.data.data[0]);
                    }
                    if(itemActive){
                        LogBase.log("=====itemActive",itemActive)
                        setCurrCurr(itemActive);
                    }
                } else {Alert.alert(response.data.msg);}
            } catch (error) {
                console.log('Error', error.response.data);
            } finally {
                setIsLoading(false);
            }
        }else{
            MyData.isCurrBack = false
        }
    };

    const _renderItem = ({item, index}) => {
        return (
            <LissLesson item={item} currID={currCurr.id} isMustGoMU={isMustGoMU} index={index} 
            dataLesson={dataLesson} navigation={_navigation} rootNavigation={props.navigation} grade={grade}/>
        );
    };
    
    const _navigation = (item) => {
        props.navigation.navigate('ListSkillScreen', {
            name_unit: item.unit_name,
            id: item.id,
            class_id: currCurr.id,
            curriculum_id: currCurr.curriculum_id,
        });
    };

    const _convertList = (data) => {
        try {
            let array = [];
            if (data) {
                if (data.length < 3) {
                    array.push(data);
                } else {
                    let i = 0;
                    let ar = [];
                    for (let a = 0; a < data.length; a++) {
                        if (i < 3) {
                            ar.push(data[a]);
                            i++;
                            if (a === data.length - 1) {
                                array.push(ar);
                            }
                        } else {
                            array.push(ar);
                            ar = [];
                            i = 0;
                            ar.push(data[a]);
                            i++;
                            if (a === data.length - 1) {
                                array.push(ar);
                            }
                        }
                    }
                }
            }
            // console.log(array);
            return array;
        } catch (error) {
            console.log(error);
        }
    };
    const callMaster = async () => {
        setVisible(false);
        var res = await apiBase.postDataJson('post',API.baseurl + API.saveDefaultLesion,{
            curriculum_id:currCurr.curriculum_id,
        });
        if (res.data.status){
            allCurr.forEach(e=>{
                e.curriculum_type = 'normal';
            });
            currCurr.curriculum_type = 'default';
            setAllCurr([...allCurr]);
        }
    };
    return (
        <View style={{flex: 1}}>
            {/* {
                isLoading && <ImageBackground
                    source={{uri: 'imagebackground'}}
                    imageStyle={stylesApp.ImageBackGround}
                    style={stylesHistory.loading}>
                    <Loading/>
                </ImageBackground>
            } */}
                <ImageBackground source={{uri: 'bgmap'}} style={{flex: 1, paddingTop: height / 25}}>
                    <View style={{
                        flexDirection: 'row',
                        zIndex: 2,
                        paddingHorizontal: 15,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 0,
                        width,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            width: '80%',
                            justifyContentL: 'center',
                            justifyContent: 'space-between',
                            height: height / 20,
                        }}>
                        <TouchableOpacity
                                onPress={() => {
                                    if (currCurr && currCurr.curriculum_type == 'default')
                                    {return;}
                                    setVisible(true);
                                }}
                                style={{width: '20%', height: height / 19}}>
                                <Image
                                    source={{uri: currCurr && currCurr.curriculum_type === 'default' ? 'saomap' : 'iconsao'}}
                                    style={{width: '100%', height: height / 19, resizeMode: 'contain'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    height: '100%', alignItems: 'center',
                                    backgroundColor: '#fff',
                                    width: '100%',
                                    borderTopLeftRadius: 25,
                                    borderTopRightRadius: 25,
                                    borderBottomLeftRadius: 25,
                                    borderBottomRightRadius: 25,
                                    paddingHorizontal: '7%',
                                    zIndex: 3,

                                }}
                                onPress={() => {
                                    props.navigation.navigate('Curriculums',
                                        {
                                            data:allCurr,
                                            current:currCurr,
                                            cb:(it)=>{
                                                setCurrCurr(it);
                                                MapListRef.current?.scrollToOffset({ offset: 0, animated: false })
                                            },
                                        });
                                }}
                            >
                                <Text style={{width: '90%', fontFamily: FontBase.MyriadPro_Bold, fontSize: SmartScreenBase.smFontSize * 45}}
                                    numberOfLines={1}>{currCurr && currCurr.class_name}</Text>
                                <View style={{width: '20%', justifyContent: 'center'}}>
                                    <Image source={{uri: 'imageback'}} style={{
                                        width: width / 18,
                                        height: width / 18,
                                        resizeMode: 'contain',
                                        tintColor: '#222',
                                        position: 'absolute',
                                        left: 10,
                                        transform: [{rotate: '180deg'}],
                                    }}/>
                                </View>

                            </TouchableOpacity>
                        </View>
                        {/* <View style={{
                            width: '30%',
                            height: height / 19,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                }}
                                onPress={() => {
                                    setMapList(!maplist);
                                }}>
                                <Image source={{uri: !maplist ? 'Giaotrinhgiaovien2' : 'Giaotrinhgiaovien1'}}
                                    style={{width: '50%', height: '100%', resizeMode: 'contain'}}/>
                            </TouchableOpacity>
                        </View> */}

                    </View>
                    {!isBlank ? <>
                    <View style={{flex: 1, zIndex: 0}}>

                        {!!currCurr && <View style={{flex: 1}}>
                            {
                                maplist ?
                                    <Maplist  //Giáo trình dạng list
                                        data={dataMapList}
                                        navigation={props.navigation}
                                        curriculum_id={currCurr.curriculum_id}
                                        maplist={maplist}
                                        class_id={currCurr.id}/>
                                    :
                                    <FlatList  //Giáo trình dạng map
                                        ref={MapListRef}
                                        data={dataLesson}
                                        renderItem={_renderItem}
                                        horizontal={true}
                                        keyExtractor={(item, index) => index.toString()}
                                        style={{zIndex: 0, elevation: 1, marginLeft: -5*SmartScreenBase.smPercenHeight}}
                                    />
                            }
                        </View>}

                        {
                            !maplist &&
                            <TouchableOpacity
                                onPress={goToMasterUnit}
                                style={{position: 'absolute', zIndex: 100, elevation: 1}}
                            >
                                <ImageBackground source={{uri: 'kkcau'}} style={{width: width / 2, height: width / 2}} />
                            </TouchableOpacity>
                        }
                    </View>
                    </>
                    : 
                    <View style={{marginTop: SmartScreenBase.smPercenWidth*15, alignItems: 'center', justifyContent: 'center'}}>
                        <TextBox style={{color: Colors.White, fontFamily: FontBase.MyriadPro_Bold, fontSize: SmartScreenBase.smFontSize*55}} text={"Giáo trình lớp đang được cập nhật"}/>
                    </View>}
                </ImageBackground>
            <ModalCheck
                visible={visible}
                close={() => setVisible(false)}
                yes={callMaster}
            />
        <FullScreenLoadingIndicator visible={isLoading}/>
        </View>
    );
};
export default MapNewScreen;
