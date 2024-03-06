// Xem lại sau ghép code
import React, {useState, useEffect, useReducer, useRef} from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    FlatList,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
} from 'react-native';
import styles from './style';
import API from '../../API/APIConstant';
import {
    ICON_GRAMMAR_HOME,
    ICON_LISTENING_HOME,
    ICON_MINI_TEST_HOME,
    ICON_PRONUNCIATION_HOME,
    ICON_PROJECT_HOME,
    ICON_READING_HOME,
    ICON_SPEAKING_HOME,
    ICON_VOCAB_HOME,
    ICON_WRITING_HOME,
    ICON_DETAILS_HOME,
    ICON_HOANTHANH,
} from '../../assets';

const {width, height} = Dimensions.get('window');
import {useSelector, useDispatch} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import SmartScreenBase from '../../base/SmartScreenBase';
import DeviceInfo from 'react-native-device-info';
import apiBase from '../../base/APIBase';
import styleApp from '../../styleApp/stylesApp';
import stringUtils from '../../utils/stringUtils';
import font from '../../base/FontBase';
import {Colors} from '../../styleApp/color';
import FontBase from '../../base/FontBase';
import NotificationBadge from '../../component/NotificationBadge'
import LessonBase from '../../base/LessonBase';
import { FullScreenLoadingIndicator } from '../../componentBase/indicator/FullScreenLoadingIndicator';
import { ComponentLoadingIndicator } from '../../componentBase/indicator/ComponentLoadingIndicator';
import UpdateVersionModal from '../../componentBase/UpdateVersionModal/UpdateVersionModal';
import device from '../../utils/device';
import LogBase from '../../base/LogBase';
import {loadSettingAtHome} from '../../ReduxStudent/actions/Student';
import MyData from '../../component/MyData';
import { TextBox } from '../../componentBase/TextBox';
import { CommonJson } from '../../stringJSON';
import { SmPopup } from '../../componentBase/SmPopup';
import { Alert } from 'react-native';
import {setVersionIgo} from '../../redux/actions/ActionLogin';
import LoseRoot from '../Student/LoseRootGroup/LoseRoot/LoseRoot';

const _checkIcon = (data) => {
    switch (data) {
    case 'exam':
        return ICON_MINI_TEST_HOME;
    case 'mini_test':
        return ICON_MINI_TEST_HOME;
    case 'grammar':
        return ICON_GRAMMAR_HOME;
    case 'pronunciation':
        return ICON_PRONUNCIATION_HOME;
    case 'listening':
        return ICON_LISTENING_HOME;
    case 'project':
        return ICON_PROJECT_HOME;
    case 'speaking':
        return ICON_SPEAKING_HOME;
    case 'reading':
        return ICON_READING_HOME;
    case 'writing':
        return ICON_WRITING_HOME;
    case 'vocabulary':
        return ICON_VOCAB_HOME;
    case 'details':
        return ICON_DETAILS_HOME;
    default:
        return ICON_DETAILS_HOME;
    }
};

const ResourceExerciseItem = ({item, active, onPress}) => {
    return (
        <TouchableOpacity
            style={[styles.rxItem, active && styles.rxActive]}
            onPress={() => onPress(item)}>
            <View style={styles.rxView}>
                <Image source={{uri: item.img}} style={styles.rxImg} />
            </View>
            <View style={styles.rxTxtView}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={{
                    fontSize: SmartScreenBase.smFontSize * 45,
                    color: 'black',
                    fontFamily:font.MyriadPro_Bold,
                }}>{item.text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const Dot = ({onPress,active})=>{
    return <TouchableOpacity
        onPress={onPress}
        style={{
            width: SmartScreenBase.smPercenWidth * 3,
            height: SmartScreenBase.smPercenWidth * 3,
            borderWidth: 1,
            borderColor: '#84d8ce',
            backgroundColor: active ? '#84d8ce' : undefined,
            borderRadius: SmartScreenBase.smPercenWidth * 4,
            marginHorizontal: SmartScreenBase.smPercenWidth * 0.5,
        }} />;
};

const TopHead = ()=>{
    return <Image
        style={{
            width: SmartScreenBase.smPercenWidth * 30,
            height: SmartScreenBase.smPercenWidth * 30,
            resizeMode: 'contain',
            position: 'absolute',
            zIndex: 30,
            ...Platform.select({
                android: {
                    top: -SmartScreenBase.smPercenHeight * 3,
                },
                ios: {
                    top: DeviceInfo.hasNotch()
                        ? SmartScreenBase.smPercenHeight * 2
                        : 0,
                },
            }),
        }}
        source={{uri: 'student_home_image12'}}
    />;
};

const Header = (props)=>{
    return <View
        style={{
            flexDirection: 'row',
            position: 'absolute',
            right: 10,
            ...Platform.select({
                android: {
                    top: SmartScreenBase.smPercenHeight * 2,
                },
                ios: {
                    top: DeviceInfo.hasNotch()
                        ? SmartScreenBase.smPercenHeight * 7
                        : SmartScreenBase.smPercenHeight * 5,
                },
            }),
        }}>
        <TouchableOpacity 
            style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: SmartScreenBase.smPercenWidth * 13,
                    height: SmartScreenBase.smPercenWidth * 13,
                    position: 'absolute',
                    left: -SmartScreenBase.smPercenWidth * 10.5,
                    top: -SmartScreenBase.smPercenWidth * 2,
                    }}
            onPress={()=> {
                props.navi.navigate('InBoxScreen',{
                    student : true
                });
            }}>
            
            <Image
                style={{
                    width: SmartScreenBase.smPercenWidth * 9,
                    height: SmartScreenBase.smPercenWidth * 9,
                }}
                source={{uri: 'chuong'}} />
            { props.isNotify ? <View style={{backgroundColor: Colors.Red, 
                            borderRadius: SmartScreenBase.smPercenWidth *5, 
                            width: SmartScreenBase.smPercenWidth*2.5, 
                            height: SmartScreenBase.smPercenWidth*2.5,
                            position: 'absolute',
                            top: SmartScreenBase.smPercenWidth*8,
                            left: SmartScreenBase.smPercenWidth*8,
                            }}
                            /> : null}
        </TouchableOpacity>
        <View
            style={{
                marginLeft: width / 15,
                paddingRight: SmartScreenBase.smPercenWidth * 3,
                paddingLeft: SmartScreenBase.smPercenWidth * 6,
                borderRadius: SmartScreenBase.smPercenWidth * 35,
                height: SmartScreenBase.smPercenWidth * 9,
                backgroundColor: '#caf1e4',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}>
            {/* <TouchableOpacity style={{padding: 5}}>
              <Image
                source={{uri: 'chat1'}}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
                {1 > 0 && <NotificationBadge />}
            </TouchableOpacity> */}
            <Text style={{fontFamily: FontBase.MyriadPro_Bold, fontSize: SmartScreenBase.smFontSize*45, color: Colors.Black}}>{props.totalDia}</Text>
            <ImageBackground
                style={{
                    width: SmartScreenBase.smPercenWidth * 9,
                    height: SmartScreenBase.smPercenWidth * 9,
                    position: 'absolute',
                    left: -SmartScreenBase.smPercenWidth * 4,
                }}
                source={{uri: 'kimcuongxanh'}} />
        </View>
    </View>;
};

const TopCard = ({item,onPress})=>{
    return <TouchableOpacity onPress={onPress} style={styles.cont2}>
        <View style={styles.contTop}>
            <Text
                style={styles.txtTop}
                numberOfLines={1}>
                {item?.unit_name}
            </Text>
        </View>
        <View style={styles.content}>
            <View style={styles.icon}>
            {item.status >= 0 ? (
                <Image
                    source={ICON_HOANTHANH}
                    style={{
                        height: SmartScreenBase.smPercenWidth * 17,
                        width: SmartScreenBase.smPercenWidth * 17,
                        resizeMode: 'contain',
                        position: 'absolute',
                        zIndex: 10,
                    }}/>) : null}
                <Image
                    source={_checkIcon(item?.lesson_type)}
                    style={styles.img}
                />
            </View>
            <View style={styles.cont3}>
                <View
                    style={{
                        height: '50%',
                        width: '100%',
                        justifyContent: 'flex-end',
                    }}>
                    <Text
                        style={styles.txt2}
                        numberOfLines={2}>
                        {item?.topic}
                    </Text>
                </View>
                <View style={{height: '50%', width: '100%'}}>
                    <Text
                        style={styles.txt3}
                        numberOfLines={2}>
                        {item?.lesson_name}
                    </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>;
};

const CarouselItem = ({item,onPress})=>{
    return <View
        style={{
            flexDirection: 'row',
            height: '100%',
            width: SmartScreenBase.smPercenWidth * 90,
        }}>
        {
            item.data.map((itm, ind) => {
                return (
                    <TouchableOpacity
                        key={ind}
                        onPress={() => {
                            onPress(itm);
                        }}
                        style={{
                            alignItems: 'center',
                            height: '100%',
                            width: (width - (SmartScreenBase.smPercenWidth * 10)) / 3,
                        }}>
                        {itm.lesson_type &&
                itm.lesson_type !== 'details' &&
                itm.status >= 0 ? (
                                <Image
                                    source={ICON_HOANTHANH}
                                    style={{
                                        height: SmartScreenBase.smPercenWidth * 17,
                                        width: SmartScreenBase.smPercenWidth * 17,
                                        resizeMode: 'contain',
                                        position: 'absolute',
                                        zIndex: 10,
                                    }}
                                />
                            ) : null}
                        {
                            !!itm.lesson_type && (
                                <Image
                                    source={_checkIcon(itm.lesson_type)}
                                    style={{
                                        height: SmartScreenBase.smPercenWidth * 17,
                                        width: SmartScreenBase.smPercenWidth * 17,
                                        resizeMode: 'contain',
                                    }}
                                />
                            )
                        }
                        <TextBox
                            style={{
                                fontSize: SmartScreenBase.smFontSize * 45,
                                fontFamily: FontBase.MyriadPro_Bold,
                                textAlign: 'center',
                                marginTop: SmartScreenBase.smPercenHeight,
                                color: '#818385',
                                width: SmartScreenBase.smPercenWidth*28,
                            }}
                                ellipsizeMode={'clip'}
                                numberOfLines={2}
                            >
                            {stringUtils.fitLongTextbyDot(itm.lesson_name, SmartScreenBase.smPercenWidth*28)}
                        </TextBox>
                    </TouchableOpacity>
                );
            })}
    </View>;
};

var curIndexHomeStu = 0

const HomeStudentNew = (props) => {

    const [dataCarousel, setDataCarousel] = useState([]);
    const [keyItem, setKeyItem] = useState(0);
    const [itemChoice, setItemChoice] = useState(null);
    const refCarow = useRef();
    const [tempData,setTempData] = React.useState([]);
    const [isReqMaster,setisReqMaster] = React.useState(false);
    const [resourceExs, setResourceExs] = React.useState([]);
    const [loadingContent,setLoadingContent] = React.useState(false);
    const [totalDiamond, setTotalDiamond] = useState(0);
    const [is_notification, setIs_notification] = useState(0);
    const [loadingFirst,setLoadingFirst] = React.useState(false);
    const [isVisibleUpdate, setVisibleUpdate] = useState(false);
    const [isMust, setMust] = useState(false);
    const [isReqMasterU, setReqMasterU] = useState(false);
    const [mesPopup, setMes] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [curItemDT, setCurItemDT] = useState();
    const [dataUpdateVer, setdataUpdateVer] = useState()
    const [showStart, setShowStart] = useState(false);
    const listener = React.useRef();

    const dataVersion = useSelector(state => state.AuthStackReducer.version_igo);
    
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            addSetting()
        }, 3000)
        const init = async () => {
            await _getData();
        };
        init();
        if (!listener.current) {
            listener.current = props.navigation.addListener('didFocus', _getData);
        }
        return () => {
            listener.current.remove();
        };
        curIndexHomeStu = 0
    }, []);

    // useEffect(() => {
    //     checkVersion()
    // }, []);

    // const checkVersion = async () => {
    //     try {
    //         const url = API.baseurl + API.current_version + `?os=${Platform.OS}&version_number=${device.getBuildNumber()}`
    //         // const url = API.baseurl + API.current_version + `?os=${Platform.OS}&version_number=${2}`
    //         const res = await apiBase.postDataJson('get', url);
    //         LogBase.log("=====checkVersion",res.data)
    //         LogBase.log("=====token",apiBase.jwt_token)
    //         if(res.data.status && res.data.data.data_version.is_update){
    //             setMust(res.data.data.data_version.is_obligatory == 0 ? false : true)
    //             setVisibleUpdate(true)
    //             LogBase.log("=====checkVersion", "done")
    //         }
    //     } catch (error) {
    //         LogBase.log('=====err_checkVersion', error);
    //     }
    // }

    const callCheckVersion = async () => {

        var url = API.baseurl + API.check_version + `?version_number=${device.getBuildNumber()}&os=${Platform.OS}&build_path=${MyData.buildPart}`

        try{
            var res = await apiBase.postDataJson('GET', url)
            if(res.data.status){
                if(res.data.data.is_update){
                    LogBase.log("=====dataVersion", dataVersion)
                    LogBase.log("=====version_number:", dataVersion.version_number+"|"+res.data.data.version_number)
                    LogBase.log("=====build_path:", dataVersion.build_path+"|"+res.data.data.build_path)
                    if(!dataVersion || dataVersion.version_number < res.data.data.version_number || dataVersion.build_path < res.data.data.build_path){
                        LogBase.log("=====go to update")
                        setVisibleUpdate(true)
                        setdataUpdateVer(res.data.data)
                    }
                }
            }else{

            }
        }catch(e){

        }
    }

    const cancelUpdate = () => {
        dispatch(setVersionIgo({version_number: dataUpdateVer.version_number, build_path: dataUpdateVer.build_path}));
        setVisibleUpdate(false)
    }

    const addSetting = async () => {
        try {
            var res = await loadSettingAtHome(device.getDeviceID())
            // console.log("=====addSetting",res.data.data_setting.user_setting)
            res.data.data_setting.user_setting.forEach(ele => {
                if(ele.key == "sound"){
                    MyData.isDisableSound = ele.value == 0 ? true : false
                }
            });
        } catch (error) {
            LogBase.log('=====err_addSetting', error);
        }
    }

    const _getData = async () => {

        if(MyData.isFirstLogin){
            setShowStart(true)
        }else{
            setShowStart(false)
        }
        
        setLoadingFirst(true)
        const url = API.baseurl + API.api_student;
        try {
            const response = await apiBase.postDataJson('get', url);
            setTotalDiamond(response.data.total_diamond)
            setIs_notification(response.data.is_notification)
            const {
                // list_home_work,
                list_teacher,
                list_exercise_by_parent,
                list_curriculum,
            } = response.data.data;
            var res = [];
            let id = 0;
            LogBase.log("=====getDataHome",response.data)
            list_teacher.forEach((e) => {
                res.push({
                    id: ++id,
                    text: e.fullname,
                    img: e.avatar ? `${API.domain}${e.avatar}` : 'def_teacher',
                    data: [],
                    type: 'te',
                    obj: e,
                });
            });
            list_curriculum.forEach((e) => {
                res.push({
                    id: ++id,
                    text: e.class_name,
                    img: e.avatar ? `${API.domain}${e.class_avatar}` : 'curriculum',
                    data: [],
                    type: 'cu',
                    obj: e,
                });
            });

            if(list_exercise_by_parent){
                list_exercise_by_parent.forEach(e=>{
                    if (!e.lesson_type){
                        e.lesson_type = e.exercise_type;
                    }
                    if (!e.lesson_name){
                        e.lesson_name = e.exercise_name;
                    }
                });
                res.push({
                    id: ++id,
                    text: 'Phụ huynh',
                    img: 'def_par',
                    data: list_exercise_by_parent,
                    type: 'par',
                    obj: null,
                });
            }
            setResourceExs(res);
            if(res.length > 0)
                setItemChoice(res[curIndexHomeStu]);
            else{
                setLoadingFirst(false)
            }
        } catch (error) {
            setLoadingFirst(false)
            console.log('error', error);
        } finally{
            callCheckVersion()
        }
    };

    React.useEffect(()=>{
        if (!itemChoice) {return;}
        setLoadingContent(true);
        if (itemChoice.type === 'par'){
            setTempData(itemChoice.data);
            LogBase.log("=====homeDataLe1",itemChoice.data)
            setLoadingContent(false);
        } else if (itemChoice.type === 'te'){
            apiBase.postDataJson('get',`${API.baseurl}api_student/homework_by_teacher_homepage?teacher_id=${itemChoice.obj.id}`).then(r=>{
                setLoadingContent(false);
                setLoadingFirst(false)
                if (r.data.status){
                    console.log("=====datahome",r.data)
                    r.data.list_home_work.forEach(e=>{
                        if (!e.lesson_type) {e.lesson_type = e.exercise_type;}
                        if (!e.lesson_name) {e.lesson_name = e.exercise_name;}
                    });
                    setTempData(r.data.list_home_work);
                    setReqMasterU(r.data.require_learn_master_unit)
                    LogBase.log("=====homeDataLe2",r.data.list_home_work)
                } else {
                    setTempData([]);
                }
            }).catch(e=>{
                setTempData([]);
            });
        } else if (itemChoice.type === 'cu'){
            apiBase.postDataJson('get',`${API.baseurl}api_student/exercise_by_curriculum?curriculum_id=${itemChoice.obj.curriculum_id}`).then(r=>{
                setLoadingContent(false);
                if (r.data.status){
                    setTempData(r.data.list_home_work);
                    setisReqMaster(r.data.require_learn_master_unit)
                    LogBase.log("=====homeDataLe3",r.data.list_home_work)
                    LogBase.log("=====homeDataLe data",r.data)
                } else {
                    setTempData([]);
                }
            }).catch(e=>{
                setTempData([]);
            });
        }
        setKeyItem(0);
        if(refCarow && refCarow.current)
            refCarow.current.snapToItem(0);
    },[itemChoice]);

    React.useEffect(()=>{
        var dataCar = [];
        if (tempData.length <= 3){
            dataCar.push({
                data: tempData.slice(1),
            });
        } else {
            dataCar.push({
                data: tempData.slice(1,4),
            });
            dataCar.push({
                data: tempData.slice(4,6),
            });
        }
        if (tempData.length > 0){
            dataCar[dataCar.length - 1].data.push({
                lesson_name: 'Xem chi tiết',
                lesson_type: 'details',
            });
        }
        setDataCarousel(dataCar);
        setLoadingContent(false);
    },[tempData]);

    const onNavigateHomeworkDetail = (item) => {
        // LogBase.log("=====onNavigateHomeworkDetail",item)
        var mData = item
        mData.userExerciseId = item.id
        mData.library = 'exercise'
        mData.exerciseType = item.exercise_type
        // LogBase.log("=====onNavigateHomeworkDetail",mData)
        if(item.exercise_type == "writing"){
            props.navigation.navigate('StudentWrittingScreen', {item: mData, isTeacher: false});
        }else{
            props.navigation.navigate('HomeworkDetail', {item: mData});
        }
    };

    const checkStatus = (item) => {
        LogBase.log("=====checkStatus", item)
        if(item.status == -1 || (!(item.lesson_type == 'writing' && item.question_type == 7) && !(item.lesson_type == 'speaking' && item.question_type == 3) && !(item.lesson_type == 'project'))) {
            onCarouseItemPress(item)
        }else if(item.status == 0){
            setCurItemDT(item)
            setMes("Bạn đã nộp bài trước đó, bạn có chắc chắn muốn nộp lại?")
            setShowPopup(true)
        }else if(item.status == 1){
            setCurItemDT(item)
            setMes("Bạn đã nộp bài và giáo viên đã chấm. Bạn có muốn xem bài chữa không?")
            setShowPopup(true)
        }
    }

    const onCarouseItemPress = (data) => {

        console.log("=====DataLesson",data)

        if (!data) {return;}
        if (data.lesson_type === 'details'){
            if (itemChoice.type === 'cu')
            {
                if(!isReqMaster){
                    props.navigation.navigate('ListSkillScreen', {
                        name_unit: tempData[0]?.unit_name,
                        id: tempData[0]?.unit_id,
                        class_id: itemChoice.obj.class_id,
                        curriculum_id: itemChoice.obj.curriculum_id,
                })
              }else{
                Alert.alert("Bạn cần hoàn thành MasterUnit trước khi tiếp tục")
              }
            }
            else
            {props.navigation.navigate('ManageListScore',{item:itemChoice});}
            return;
        }
        if (itemChoice.type === 'cu'){
            data.curriculum_id = itemChoice.obj.curriculum_id;
            data.question_type = data.question_type ? data.question_type : '2';
        } else if (itemChoice.type === 'hw'
        || itemChoice.type === 'par'
        || itemChoice.type === 'te'
        ){
            // if (data.lesson_type === 'mini_test') {
            // } else if (data.lesson_type === 'exam') {
            // } else if (data.lesson_type === 'project') {
            // } else {
                data.lesson_homework = true;
            // }
            data.lesson_id = data.id;
        }

        const dataRun = {
            lesson_type: data.lesson_homework ? data.exercise_type : data.lesson_type,
            question_type: data.question_type,
            lesson_name: data.exercise_name,
            lesson_id: data.lesson_homework ? data.id : data.lesson_id,
            resources_id: data.resources_id,
            lesson_homework: data.lesson_homework,
            user_received_id: data.id,
            class_id: data.class_id,
            unit_id: data.unit_id,
            exam_id: data.lesson_homework ? data.id : data.lesson_id,
        };

        LessonBase._moveLessonHS(dataRun, props.navigation, false)

    };

    const _renderItem = ({item, index}) => {
        return <CarouselItem item={item} onPress={checkStatus}/>;
    };
    const _pressCarou = (index) => {
        setKeyItem(index);
        refCarow.current.snapToItem(index);
    };
    const onRexPress = (item,index) => {
    // if(item.data.length ==0){
    //     return;
    // }
        setItemChoice(item);
        curIndexHomeStu = index
    };
    const rendRExs = ({item, index}) => {
        return (
            <ResourceExerciseItem
                onPress={()=>onRexPress(item,index)}
                item={item}
                active={itemChoice == item}
            />
        );
    };
    return (
        <View style={styles.container}>
            { showStart ? <LoseRoot navigation={props.navigation}/>
            :<ImageBackground source={{uri: 'bghome'}} style={{flex: 1,justifyContent:'flex-end'}}>
                <TopHead/>
                <Header isNotify={is_notification > 0} totalDia={totalDiamond} navi={props.navigation}/>
                <View style={[styles.cont1]}>
                    { !loadingContent ? tempData[0] && !isReqMasterU ? <TopCard item={tempData[0]} onPress={()=>{checkStatus(tempData[0]);}}/>
                        :
                        <View style={{width: '100%', height: SmartScreenBase.smPercenWidth * 80, alignItems: 'center', marginTop: Platform.OS == 'ios' ? 0 : SmartScreenBase.smPercenWidth * 20, justifyContent: 'center'}}>
                            <Image source={{uri: 'anhddht'}} resizeMode={'contain'}
                                style={{width: SmartScreenBase.smPercenWidth * 50, height: SmartScreenBase.smPercenWidth * 50}} />
                            <Text style={{fontFamily: font.MyriadPro_Regular, fontSize: SmartScreenBase.smFontSize * 50, color: Colors.NearBlack, marginTop: SmartScreenBase.smPercenWidth * 4, textAlign: 'center'}}>
                                {isReqMasterU ? 'Bạn hãy hoàn thành bài tập trong Master Unit để tiếp tục' : itemChoice ? itemChoice.type == 'te' ? 'Hiện tại bạn chưa được giao bài nào' : 'Giáo trình lớp đang được cập nhật' : ""}</Text>
                        </View>
                        : !loadingFirst ? <ComponentLoadingIndicator style={{marginBottom : SmartScreenBase.smPercenWidth * 30}}/> : null
                        }
                    { !loadingContent ? <View style={{
                        height: tempData[0] ? 125 : 10,
                        justifyContent:'center',
                        position:'relative',
                    }}>
                        <Carousel
                            ref={refCarow}
                            data={dataCarousel}
                            renderItem={_renderItem}
                            horizontal={true}
                            sliderWidth={width}
                            itemWidth={width}
                            onSnapToItem={(index) => setKeyItem(index)}
                        />
                    </View>
                    : null
                    }
                </View>

                <View >
                    { tempData.length > 4 ? <View style={styles.dotCon}>
                        {
                            dataCarousel.map((item, index) => {
                                return <Dot
                                    key={index}
                                    active={keyItem == index}
                                    onPress={() => _pressCarou(index)}/>;
                            })
                        }
                    </View> :
                        <View style={{
                            height: SmartScreenBase.smPercenWidth * 8.5,
                        }} />}
                    <View style={styles.lsv}>
                        <FlatList
                            keyExtractor={(item, index) => String(item.id)}
                            data={resourceExs}
                            renderItem={rendRExs}
                            horizontal={true}
                            style={styles.ls}
                            contentContainerStyle={{alignItems: 'center'}}
                        />
                    </View>
                </View>
                {!isVisibleUpdate && <FullScreenLoadingIndicator visible={loadingFirst}/>}
                {isVisibleUpdate && <UpdateVersionModal 
                    isVisible={isVisibleUpdate} 
                    dataUpdate={dataUpdateVer} 
                    onClose={() => cancelUpdate()}
                />}
            </ImageBackground>
            } 
            <SmPopup visible={showPopup}
                message={mesPopup}
                cancelText={CommonJson.Cancel}
                confirmText={CommonJson.Confirm}
                contentStyles={styles.modalBox}
                messageStyle={[styles.messageModalStyle, styles.messageDeleteStyle]}
                cancelOnpress={() => setShowPopup(false)}
                confirmOnpress={() => {
                    if(curItemDT.status == 0){
                        setShowPopup(false)
                        onCarouseItemPress(curItemDT)
                    }else{
                        setShowPopup(false)
                        onNavigateHomeworkDetail(curItemDT)
                    }
                }}
            />
        </View>
    );
};
export default HomeStudentNew;
