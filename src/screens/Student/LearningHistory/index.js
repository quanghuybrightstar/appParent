import * as React from 'react';
import {
    View, StyleSheet, Dimensions, Text,Image,
    Platform, ImageBackground, TouchableOpacity, FlatList,
    ActivityIndicator,
    Modal,
    Alert
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import SmartScreenBase from '../../../base/SmartScreenBase';
import HeaderGradient from '../../../commons/HeaderGradient';
import font from '../../../base/FontBase';
import API from '../../../API/APIConstant';
import apiBase from '../../../base/APIBase';
import {ButtonMedium} from '../../../commons/Button';
import LessonBase from '../../../base/LessonBase'

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
  } from '../../../assets';
import FontBase from '../../../base/FontBase';
import MyData from '../../../component/MyData';
import { Colors } from '../../../styleApp/color';
import { SmPopup } from '../../../componentBase/SmPopup';
import { CommonJson } from '../../../stringJSON';
import { FontSize } from '../../../styleApp/font';
import LogBase from '../../../base/LogBase';
import { TextBox } from '../../../componentBase/TextBox';

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    item:{ 
        flexDirection: "row",
        marginHorizontal:SmartScreenBase.smPercenWidth*4,
        borderBottomColor:'#dcdcdc',
        borderBottomWidth:2,
        paddingVertical:SmartScreenBase.smPercenHeight
    },
    topic:{
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*50,
        color: '#0fa294',
        paddingTop: 2,
        lineHeight: SmartScreenBase.smFontSize*52,
    },
    name:{
        fontFamily: FontBase.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize*50,
        color: '#0fa294'
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
});

export default function LearinigHistory({navigation}, ref) {
    // const ModalRefs = React.useRef(null);
    const itemChoice = navigation.getParam('item')
    const [curIndex, setCurIndex] = React.useState(0)
    const [items,setItems] = React.useState([])
    const [loading,setLoading] = React.useState(true);

    React.useEffect(() => {
        console.log("=====useEffect MyData.isDoneExe = ",MyData.isDoneExe)
        if(MyData.isDoneExe){
            console.log("=====MyData.isDoneExe = ",MyData.isDoneExe)
            setCurIndex(1)
            MyData.isDoneExe = false
        }
    },[MyData.isDoneExe])

    const getData=(isDone)=>{
        console.log("=====homework_by_teacher getData")
        if(itemChoice.type==='cu') {
        }else  {

            let uid = 0;
            if(itemChoice.obj)  uid = itemChoice.obj.id
            else{
                if(itemChoice?.data.length>0){
                    uid = itemChoice.data[0].user_send_id
                }
            }
            setLoading(true);
            apiBase.postDataJson('get',`${API.baseurl}api_student/homework_by_teacher?teacher_id=${uid}`).then(r=>{
                if(r.data.status){
                 console.log("=====homework_by_teacher",r.data)
                 r.data.list_home_work_new.forEach(element => {
                     if(element.exercise_type == 'pronunciation')
                        console.log("=====logMinitest",element)
                 });
                 const d = [];
                 r.data.list_home_work_complete.forEach(e=>{
                    if(!e.lesson_type) e.lesson_type = e.exercise_type
                    if(!e.lesson_name) e.lesson_name = e.exercise_name
                    e.myStatus = 1
                    d.push(e)
                 })
                 r.data.list_home_work_new.forEach(e=>{
                    if(!e.lesson_type) e.lesson_type = e.exercise_type
                    if(!e.lesson_name) e.lesson_name = e.exercise_name
                    e.myStatus = 0
                    d.push(e)
                 })

            // chỉ để test, xong xoá đi
            // console.log("=====listD123",d)
            // var listTest = []
            // d.forEach(element => {
            //    if(element.lesson_type == 'pronunciation'){
            //     listTest.push(element)
            //     console.log("=====listD123",element.status)
            //    }

            // });
            //

                  setItems(d) // nhớ sửa lại
                }else Alert.alert(r.data.msg)
                setLoading(false);
              }).catch(e=>{
                setLoading(false);
                console.log(e)
              })
        }
    }

    React.useEffect(()=>{
        console.log("=====useEffect")
        MyData.isDoneExe = false
        getData();
    },[])

    const AdjustLabel = ({
        fontSize, text, style, numberOfLines
      }) => {
        const [currentFont, setCurrentFont] = React.useState(fontSize);
      
        return (
          <Text
            numberOfLines={ numberOfLines }
            adjustsFontSizeToFit
            style={ [style, { fontSize: currentFont }] }
            onTextLayout={ (e) => {
              const { lines } = e.nativeEvent;
              if (lines.length > numberOfLines) {
                setCurrentFont(currentFont - 1);
              }
            } }
          >
            { text }
          </Text>
        );
      };
    
    const getDealine=(s)=>{
        if(!s) return s;
        return s.split(' ')[0]?.split('-').reverse().join('/');
    }
    const getColor=(s)=>{
        switch(s){
            case 'easy':
                return '#6cc049'
            case 'hard':
                return '#ba202a'
            default:
                return '#f6b145'
        }
    }
    const checkDead=(s)=>{
        if(!s) return false;
        var now = new Date();
        var d = s.split('/');
        var dd= new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0]))
        var noww = new Date(now.getFullYear(),now.getMonth(),now.getDate())
        return noww > dd;
    }
    const convertTime=(s)=>{
        if(!s)return s;
        var dd= s.split(' ')
        return `${dd[1].substr(0,5)} ${dd[0].split('-').reverse().join('/')}`
    }
    const AnItem=({onPress,item,setRemind})=>{
    
        const dead = getDealine(item.deadline);
        const idDead = checkDead(dead)
    
        return <TouchableOpacity onPress={()=>onPress(item)} style={styles.item}>
            <View style={{ marginRight: SmartScreenBase.smPercenWidth * 2 }}>
                <Image 
                    style={{
                            width:SmartScreenBase.smPercenWidth*18,
                            height:SmartScreenBase.smPercenWidth*18,
                            resizeMode:'contain'
                        }} 
                    source={{uri:'history_'+item.exercise_type}} />
            </View>
            <View style={{flex:1,paddingTop:2}}>
                <View style={{
                    borderRadius:10,
                    flexDirection:'row',
                    flexWrap:'wrap',
                    marginBottom:SmartScreenBase.smPercenHeight,
                    alignItems:'center'
                }}>
                    <View
                        style={{
                            backgroundColor:getColor(item.level?.toLowerCase()),
                            borderRadius:6,
                            paddingHorizontal:5,
                            justifyContent:'center',
                            marginRight:SmartScreenBase.smPercenWidth
                        }}
                    >
                        <Text style={{
                            fontSize:SmartScreenBase.smFontSize*50,
                            color:'#fff',
                            fontFamily:FontBase.MyriadPro_Bold,
                        }}>
                            {item.level?.toLowerCase()==='normal'?'medium':item.level}
                        </Text>
                    </View>
                    {
                        !!item.topic&&item.topic.split(' ').map((e,i)=>{
                            return <Text style={styles.topic} key={i}>{e} </Text>
                        })
                    }
                </View>
                <Text style={styles.name}>{item.lesson_name}</Text>
                <View style={{
                    flexDirection:'row',
                    marginTop:SmartScreenBase.smPercenHeight,
                    justifyContent:'space-between'
                }}>
                    {
                        item.myStatus!=1?<>
                            <View style={{
                                flex:1,
                                borderWidth:1,
                                borderColor:idDead?'#e93435':'orange',
                                borderRadius:20,
                                paddingHorizontal:4,
                                alignItems:'center',
                                marginRight:5
                            }}>
                            <AdjustLabel 
                            numberOfLines={1}
                            text={`${idDead?'Quá hạn từ':'Hạn nộp'}: ${dead}`}
                            fontSize={SmartScreenBase.smFontSize*40}
                            style={{
                                fontFamily:FontBase.MyriadPro_Bold,
                                color:idDead?'#e93435':'orange',
                            }}/>
                        </View>
                        <TouchableOpacity
                            disabled={item.remind!=1}
                            onPress={()=>{
                                if(!!item.note && item.note.replace('"','').replace('"','').length > 0)
                                    setRemind(item.note)
                                else
                                    setRemind((item.from_gender == 'female' ? 'Cô ' : 'Thầy ') + item.from_fullname +' đã nhắc nhở bạn làm bài đúng hạn.')
                            }}
                         style={{
                            backgroundColor:'#e93435',
                            borderRadius:20,
                            paddingHorizontal:8,
                            opacity:item.remind==='1'?1:0,
                        }}>
                            <AdjustLabel
                                text={'Xem lời nhắc'}
                                numberOfLines={1}
                                fontSize={SmartScreenBase.smFontSize*40}
                                style={{
                                    fontFamily:FontBase.MyriadPro_Bold,
                                    color:'#fff',
                                }}/>
                        </TouchableOpacity>
                        </>:<>
                            <View style={{
                                // flex:1,
                                borderWidth:1,
                                borderColor:'orange',
                                borderRadius:20,
                                paddingHorizontal:8,
                                alignItems:'center',
                                // marginRight:20
                            }}>
                                <AdjustLabel
                                text={`Đã nộp: ${convertTime(item.utilize_end_time)}`}
                                numberOfLines={1}
                                fontSize={SmartScreenBase.smFontSize*40}
                                style={{
                                    fontFamily:FontBase.MyriadPro_Bold,
                                    color:'orange',
                                }}/>
                        </View>
                        <View 
                            style={{
                                backgroundColor: item.status == 1 ? '#84c041' : Colors.Orange,
                                borderRadius:20,
                                paddingHorizontal:8,
                                // minWidth:SmartScreenBase.smPercenWidth*20,
                                alignItems:'center',
                                marginLeft:4,
                            }}>
                            <AdjustLabel 
                            text={item.status == 1 ? (item.score + " điểm") : "Chờ chấm"}
                            numberOfLines={1}
                            fontSize={SmartScreenBase.smFontSize*40}
                            style={{
                                fontFamily:FontBase.MyriadPro_Bold,
                                color:'#fff',
                            }}/>
                        </View>
                        </>
                    }
                </View>
            </View>
        </TouchableOpacity>
    }
    
    const onNavigateHomeworkDetail = (item) => {
        LogBase.log("=====onNavigateHomeworkDetail",item)
        var mData = item
        mData.userExerciseId = item.id
        mData.library = 'exercise'
        mData.exerciseType = item.lesson_type
        LogBase.log("=====onNavigateHomeworkDetail",mData)
        if(item.lesson_type == "writing"){
            navigation.navigate('StudentWrittingScreen', {item: mData, isTeacher: false});
        }else{
            navigation.navigate('HomeworkDetail', {item: mData});
        }
    };
    
    const ATab=({data,onPress,setRemind,type})=>{
        return(
        <View>
            { data && data.length == 0 ? (type == 'complete' ?
            <View style={{width: SmartScreenBase.smPercenWidth*100, alignItems: 'center', justifyContent: 'center', marginTop: SmartScreenBase.smPercenHeight*8}}>
                <TextBox style={{fontSize: SmartScreenBase.smFontSize*50}} text={"Bạn chưa hoàn thiện bài tập nào"} />
            </View>
             : <View style={{width: SmartScreenBase.smPercenWidth*100, alignItems: 'center', justifyContent: 'center', marginTop: SmartScreenBase.smPercenHeight*8}}>
                        <TextBox numberOfLines={2} style={{fontSize: SmartScreenBase.smFontSize*50, textAlign: 'center'}} text={"Thật tuyệt!\nBạn đã hoàn thành hết các bài tập được giao."} />
                </View>)
            : <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => 'item' + index}
                renderItem={({item,index})=><AnItem setRemind={setRemind} onPress={onPress} item={item}/>}
            />}
        </View>)
    }
    
    const TabViewEx=({data, curIndex})=>{
        const [index, setIndex] = React.useState(curIndex);
        const [remind,setRemind] = React.useState('');
        const [mesPopup, setMes] = React.useState("");
        const [showPopup, setShowPopup] = React.useState(false);
        const [curItemDT, setCurItemDT] = React.useState();
    
        const [routes] = React.useState([
            { key: 'first', title: 'CHƯA LÀM' },
            { key: 'second', title: 'ĐÃ LÀM' },
        ]);
        const renderScene = ({route}) => {
            switch (route.key) {
                case 'first':
                    return <ATab type={'incomplete'} setRemind={setRemind} data={data.filter(c=>c.myStatus!=1)} onPress={onPress}/>;
                case 'second':
                    return <ATab type={'complete'} setRemind={setRemind} data={data.filter(c=>c.myStatus==1)} onPress={onPress}/>;
                default:
                    return null;
            }
        };
    
        const checkStatus = (item) => {
            console.log("=====checkStatus",item)
            if(item.status == -1 || (!(item.lesson_type == 'writing' && item.question_type == 7) && !(item.lesson_type == 'speaking' && item.question_type == 3) && !(item.lesson_type == 'project'))) {
                gotoLesson(item)
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
    
        const onPress=(data)=>{
            checkStatus(data)
        }
    
        const gotoLesson = (data)=>{
            LogBase.log("=====gotoLesson",data)
            const dataRun = {
                lesson_type: data.exercise_type,
                question_type: data.question_type,
                lesson_name: data.exercise_name,
                lesson_id: data.id,
                resources_id: data.resources_id,
                lesson_homework: true,
                user_received_id: data.id,
                class_id: data.class_id,
                unit_id: data.unit_id,
                exam_id: data.id,
            };
    
            LessonBase._moveLessonHS(dataRun, navigation, false, getData, "excHome")
        }

        return (
            <>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={props => <TabBar
                    {...props}
                    indicatorStyle={{
                        backgroundColor: 'orange',
                        width: SmartScreenBase.smPercenWidth * 45,
                        marginBottom:-1,
                    }}
                    indicatorContainerStyle={{
                        borderBottomWidth: 1, 
                        borderBottomColor: "lightgray",
                    }}
                    
                    style={{
                        backgroundColor: 'transparent',
                        // borderBottomWidth: 1, 
                        // borderBottomColor: "lightgray",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 0,
                        shadowRadius: 0,
                        elevation: 0,
                        width: SmartScreenBase.smPercenWidth * 90,
                        alignSelf: "center",
                    }}
                    renderLabel={props => {
                        return (
                            <Text numberOfLines={1} style={{
                                fontFamily: props.focused == true ? font.MyriadPro_Bold : font.MyriadPro_Light,
                                paddingTop:5,
                                width: SmartScreenBase.smPercenWidth * 40,
                                textAlign:'center',
                                fontSize:SmartScreenBase.smFontSize*50,
                                color: Colors.Black
                            }}>
                                {props.route.title}
                            </Text>
                        )
                    }}
                />}
            />
            <SmPopup visible={showPopup}
                message={mesPopup}
                cancelText={CommonJson.No}
                confirmText={CommonJson.Yes}
                contentStyles={styles.modalBox}
                messageStyle={[styles.messageModalStyle, styles.messageDeleteStyle]}
                cancelOnpress={() => setShowPopup(false)}
                confirmOnpress={() => {
                    if(curItemDT.status == 0){
                        setShowPopup(false)
                        gotoLesson(curItemDT)
                    }else{
                        setShowPopup(false)
                        onNavigateHomeworkDetail(curItemDT)

                    }
                }}
            />
            {
            !!remind&&<Modal 
                animationType='slide'
                transparent={true}
                visible={true}>
                    <View style={{
                        backgroundColor:'rgba(0,0,0,0.5)',
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <View style={{
                            backgroundColor:'#fff',
                            borderRadius:SmartScreenBase.smPercenWidth*4,
                            paddingHorizontal:SmartScreenBase.smPercenWidth*4,
                            paddingVertical:SmartScreenBase.smPercenHeight*4,
                            width:SmartScreenBase.smPercenWidth*90,
                            alignItems:'center'
                        }}>
                            <Text style={{
                                fontSize:SmartScreenBase.smFontSize*60,
                                fontFamily:FontBase.MyriadPro_Bold,
                                color: Colors.Black
                            }}>Nhắc nhở</Text>
                            <Text style={{
                                fontSize:SmartScreenBase.smFontSize*50,
                                fontFamily:FontBase.MyriadPro_Regular,
                                marginTop:SmartScreenBase.smPercenHeight*2,
                                marginBottom:SmartScreenBase.smPercenHeight*4,
                                color: Colors.Black
                            }}>{remind}</Text>
                            <ButtonMedium onPress={()=>setRemind('')} title={'Đóng'}/>
                        </View>
                    </View>
                </Modal>
            }
            </>
        );
    }

    return (
        <ImageBackground 
            source={{ uri: 'bg_guide_study' }} 
            style={{ flex:1,position:'relative'}}>
            <HeaderGradient 
                goBack={()=>navigation.goBack()}
                title={itemChoice.text} 
            />
            <TabViewEx data={items} navigation={navigation} curIndex={curIndex}/>
            {
                loading&&<View style={{
                    position:'absolute',
                    left:0,
                    top:0,
                    right:0,
                    bottom:0,
                    backgroundColor:'rgba(0,0,0,0.5)',
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <ActivityIndicator color='#fff'/>
                </View>
            }
        </ImageBackground>
    )
}