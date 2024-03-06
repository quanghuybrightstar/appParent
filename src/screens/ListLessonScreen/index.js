// Xem lại sau ghép code
import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    Platform,
    ActivityIndicator,
} from 'react-native';
import {styles, width, height} from './style';
import API from '../../API/APIConstant';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../base/SmartScreenBase';
import moment from 'moment';
import apiBase from '../../base/APIBase';
import { CommonJson } from "../../stringJSON";
import font from '../../base/FontBase';
import LessonBase from '../../base/LessonBase';
import { AppHeader } from '../../componentBase/AppHeader';
import { SmPopup } from '../../componentBase/SmPopup/SmPopup';
import { Colors } from '../../styleApp/color';
import { FontSize } from '../../styleApp/font';
import lessonMath from '../../utils/lessonMath';
import LogBase from '../../base/LogBase';
const getScore=(n)=>{
    if(!n) return n;
    var t = String(n);
    var dot = t.indexOf('.')
    if(dot<0) return t;
    return t.substr(0,dot + 2);
  }

  
const Level=({level})=>{
    return <LinearGradient 
        colors={['#58BF94', '#06B8B6']} 
        start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{
            height: SmartScreenBase.smPercenHeight * 4,
            width: SmartScreenBase.smPercenWidth * 25,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: SmartScreenBase.smPercenWidth * 25,
        }}>
            <Text style={{
                fontSize: SmartScreenBase.smFontSize * 60,
                color: '#fff',
                textTransform: 'capitalize',
                fontFamily: font.MyriadPro_Bold,
            }}>{level?.toLocaleLowerCase()==='normal'?'Medium':level}</Text>
        </LinearGradient>
}

const ListLessonScreen = (props) => {
    const navigation = props.navigation;
    const [dataList, setDataList] = useState([]);
    const [mesPopup, setMes] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [curItemDT, setCurItemDT] = useState();
    const unitId = React.useRef(0);
    const skill = React.useRef('');
    const [loading,setLoading] = React.useState(false);

    useEffect(() => {
        var lData = navigation.getParam('data');
        console.log("=====lData",lData)
        skill.current = lData.skill;
        if(lData?.list_lesson&&lData.list_lesson.length>0){
            unitId.current = parseInt(lData.list_lesson[0].unit_id)
        }
        setDataList(lData.list_lesson);
    }, []);

    const reloadData=()=>{
        console.log('=====reloadData')
        if(unitId.current>0){
            setLoading(true)
            const url = API.baseurl + API.lessons_by_skill(unitId.current) + `&class_id=${props.navigation.getParam("class_id")}`;
            apiBase.postDataJson('get',url).then(r=>{
                LogBase.log('=====cData',r.data)
                if(r.data.status){
                    var cData = []
                    r.data.data.forEach(element => {
                        if(element.skill == skill.current){
                            cData = element
                        }
                    });
                    //var d = r.data.data.filter(c=>c.skill == skill.current);
                    if(cData.list_lesson.length>0){
                        setDataList(cData.list_lesson);
                        LogBase.log('=====cData.list_lesson',cData.list_lesson)
                        var cb = navigation.getParam('cb');
                        if(cb){
                            cb(true)
                        }
                    }
                }
                setLoading(false)
            }).catch(e=>{
                setLoading(false)
            }).finally(()=>{
            })
        }
    }

    const _renderTime = (time) => {
        return moment(time).format('DD/MM/YYYY');
    };

    const _renderColor = (time) => {
        let date = moment(time).valueOf();
        let dateNow = moment().valueOf();
        if (date < dateNow) {
            return '#BE202E';
        } else {
            return '#01A79D';
        }
    };

    const navigateHistoryExercise = (tranData) => {
        var lesson = tranData
        if(tranData.lesson_type == 'exam'){
            lesson.lesson_id = tranData.exam_id
        }
        props.navigation.navigate('HomeworkHistory', {lesson, class_id: props.navigation.getParam("class_id")});
      };

    const checkStatus = (item) => {
        console.log("=====item",item)
        if(item.status == -1 || (!(item.lesson_type == 'writing' && item.question_type == 7) && !(item.lesson_type == 'speaking' && item.question_type == 3) && !(item.lesson_type == 'project'))) {
            LessonBase._moveLessonHS(item, props.navigation, false, reloadData, "curi")
        }else if(item.status == 0){
            setCurItemDT(item)
            setMes("Bạn đã nộp bài trước đó, bạn có chắc chắn muốn nộp lại?")
            setShowPopup(true)
        }else if(item.status == 1){
            setCurItemDT(null)
            setMes("Bạn đã nộp bài và giáo viên đã chấm. Vui lòng vào lịch sử làm bài xem bài chữa")
            setShowPopup(true)
        }
    }  

    const _renderItem = ({item, index}) => {
        const isSkillGuide = item.lesson_type==="skill_guide";
        const isHideLevel = item.lesson_type==='exam'||item.lesson_type==='mini_test'||item.lesson_type==='project'||item.lesson_type==="skill_guide";
        const topic = item.topic||item.exam_name||item.lesson_name;
        const lesson = (item.lesson_type==='exam'||item.lesson_type==='mini_test')?
                    `Thời gian: ${item.lesson_type==='mini_test'?'15':item.exam_type} phút`
                    :item.lesson_name;
        return (
            <View style={StyleShadow.itemC}>
                <TouchableOpacity
                    style={[StyleShadow.item,StyleShadow.shadow,
                        isHideLevel && {height:SmartScreenBase.smBaseHeight*(Platform.OS=='android'?180:190)},
                        isHideLevel && isSkillGuide && {height:SmartScreenBase.smBaseHeight*(Platform.OS=='android'?135:145)},
                 ]}
                    onPress={() => {checkStatus(item)}}
                >
                    <View style={[StyleShadow.con, isSkillGuide && {borderBottomWidth: 0}]}>
                        {
                            !isHideLevel&&<Level level={item.level}/>
                        }
                        <View style={{paddingHorizontal: '4%', paddingTop: SmartScreenBase.smPercenHeight}}>
                            <Text style={{
                                fontSize: SmartScreenBase.smFontSize * 55,
                                fontFamily: font.MyriadPro_Bold,
                            }}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >{index + 1}. {topic}</Text>
                            <Text style={StyleShadow.text2}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >{lesson}</Text>
                        </View>
                    </View>
                    {!isSkillGuide && <View style={StyleShadow.row}>
                        <View style={{flex: 3}}>
                            {item.learned &&
                                <TouchableOpacity onPress={() => navigateHistoryExercise(item)} style={{height: "100%", width: SmartScreenBase.smPercenWidth*30, alignItems: 'flex-start', justifyContent: 'center'}}>
                                    <Text style={{
                                        fontSize: SmartScreenBase.smFontSize * 40,
                                        color: "#00B9B7",
                                        fontFamily: font.MyriadPro_Bold,
                                        textDecorationLine:'underline'
                                    }}>
                                        Lịch sử làm bài
                                    </Text>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={StyleShadow.diem}>Điểm: <Text>{item.learned ? getScore(item.number_score) : '__'}</Text></Text>
                        </View>
                    </View>}
                    {
                        !!item.is_assign_by_teacher&&
                            <Image
                                source={{uri: 'icon_thay_giao_ba'}}
                                style={StyleShadow.img}
                                resizeMode={'contain'}
                            />
                    }
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.container} source={{uri: 'bgmap'}}>
                <AppHeader title={lessonMath.convertSkill(navigation.getParam('data').skill)} leftIconOnPress={() => navigation.pop()} />
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    ...StyleShadow.shadow,
                }}>
                    <FlatList
                        contentContainerStyle={{paddingVertical:20}}
                        data={dataList}
                        renderItem={_renderItem}
                    />
                </View>
            </ImageBackground>
            {
                loading&&<View style={StyleShadow.overlay}>
                    <ActivityIndicator size={'large'} color='#fff'/>
                </View>
            }
            <SmPopup visible={showPopup}
                message={mesPopup}
                cancelText={curItemDT ? CommonJson.Cancel : ""}
                confirmText={CommonJson.Confirm}
                contentStyles={StyleShadow.modalBox}
                messageStyle={[StyleShadow.messageModalStyle, StyleShadow.messageDeleteStyle]}
                cancelOnpress={() => setShowPopup(false)}
                confirmOnpress={() => {
                    if(curItemDT){
                        setShowPopup(false)
                        LessonBase._moveLessonHS(curItemDT, props.navigation, false, reloadData, "curi")
                    }else{
                        setShowPopup(false)
                    }
                }}
            />
        </View>
    );
};


const StyleShadow = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalBox: {
        paddingBottom: SmartScreenBase.smBaseHeight * 40,
        paddingTop: SmartScreenBase.smBaseHeight * 40,
    },
    messageModalStyle: {
        marginBottom: SmartScreenBase.smBaseHeight * 20,
        color: Colors.Black,
        fontSize: FontSize.size55Font,
        lineHeight: SmartScreenBase.smBaseHeight * 40
    },
    messageDeleteStyle: {
        marginBottom: 0,
        paddingBottom: 0
    },
    overlay:{
        position:'absolute',
        left:0,
        top:0,
        right:0,
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center',
        zIndex:9999
    },
    item:{
        backgroundColor: '#fff',
        height: SmartScreenBase.smBaseHeight*230,
        marginBottom: SmartScreenBase.smPercenHeight * 2,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        padding: SmartScreenBase.smPercenHeight / 2,
        width: SmartScreenBase.smPercenWidth * 80,
    },
    img:{
        width: SmartScreenBase.smPercenWidth * 20,
        height: SmartScreenBase.smPercenWidth * 20,
        position: 'absolute',
        zIndex: 10,
        right: -SmartScreenBase.smPercenWidth * 10,
    },
    diem:{
        fontSize: SmartScreenBase.smFontSize * 40,
        color: '#BE202E',
        fontFamily: font.MyriadPro_Bold
    },
    con:{
        flex: 8,
        borderBottomWidth: 0.5,
        borderColor: '#787878',
        paddingBottom: SmartScreenBase.smPercenHeight * 2,
    },
    row:{
        flex: 3,
        paddingTop:Platform.OS==='ios'? 2:0,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '4%',
    },
    itemC:{
        width: SmartScreenBase.smPercenWidth * 100,
        alignItems: 'center',
    },
    text:{
        fontSize: SmartScreenBase.smFontSize * 55,
        fontFamily: font.MyriadPro_Bold,
    },
    text2:{
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily: font.MyriadPro_Regular,
        
    }
});

export default ListLessonScreen;
