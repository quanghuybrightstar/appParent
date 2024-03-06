import React, {useEffect, useRef, useState} from 'react';
import { Alert, FlatList, Image, Modal, Keyboard, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, InteractionManager } from 'react-native';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { hideAlert, showAlert } from '../../../../componentBase/BaseAlert';
import LogBase from '../../../../base/LogBase'
import styles from './ListLessonResult.style';
import { bg_nhat, logo_new } from '../../../../assets/image';
import { RadioButtonBox } from '../../../../componentBase/RadioButtonBox';
import { Colors } from '../../../../styleApp/color';
import { useDispatch, useSelector } from 'react-redux';
import MData from '../../../../component/MyData';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ComponentLoadingIndicator } from '../../../../componentBase/indicator/ComponentLoadingIndicator';
import { TextBox } from '../../../../componentBase/TextBox';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import LinearGradient from 'react-native-linear-gradient';
import { have_time, icon_add_page, left_way, light_green, pen_vs_page, right_way } from '../../../../assets/icon';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { FontSize } from '../../../../styleApp/font';
import Slider from '@react-native-community/slider';
import { IconButton } from '../../../../componentBase/IconButton/IconButton';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { ImageLesson } from '../../../../componentBase/ImageLesson';
import { CompleteAssignJson } from '../../../../stringJSON/AssignManagentJson';
import { SmPopup } from '../../../../componentBase/SmPopup/SmPopup';
import { Global } from '../../../../utils/global';
import SettingRequestAssign from '../SettingRequestAssign/SettingRequestAssign';
import { ActionAssignManagent } from '../../../../redux/actions/ActionAssignManagent';
import { ActionAssign } from '../../../../redux/actions/ActionAssign';
import cloneDeep from 'lodash/cloneDeep';
import { forEach } from 'lodash';

/**
 * SettingExercise Screen - Setting nguồn bài tập
 */

const ListLessonResult = (props) => {

    const typeAss = props.navigation.getParam('type')
    const data = props.navigation.getParam('data')
    const role = props.navigation.getParam('role')
    const editData = props.navigation.getParam('editData')
    
    const [dataList, setdataList] = useState(data)
    const [listBU, setListBU] = useState(cloneDeep(editData));
    const [settingData, setsettingData] = useState(editData)
    const [lessonList, setLessonList] = useState([])
    const [visible, setVisible] = useState(false);
    const [curIndexLesson, setcurIndexLesson] = useState();
    const [curIndexStu, setcurIndexStu] = useState();
    const [loading, setloading] = React.useState(true);
    const [visibleEdit, setvisibleEdit] = React.useState(false);

    const listAssign = useSelector(state => state.AssignReducer.listAssign);
    const listAssignManagent = useSelector(state => state.AssignManagentReducer.listAssignManagent);
    const dispatch = useDispatch();

    useEffect(() => {
        LogBase.log("=====listAssignManagent",listAssignManagent)
        if(listAssignManagent){
            var mlist = [...lessonList]
            if(mlist[curIndexStu]?.exercise_suggest)
                mlist[curIndexStu].exercise_suggest = listAssignManagent
            setLessonList(mlist)
        }
    }, [listAssignManagent]);

    useEffect(() => {
        MData.mAssignType = 'auto'
        getData(dataList)
    },[])

    const getData = async (rootDataList) => {
        LogBase.log("=====rootDataList=", rootDataList)
        var mList = []
        rootDataList.forEach((ele, index) => {
            var monoList = []
            if(ele.exercise_suggest.pronunciation){
                ele.exercise_suggest.pronunciation.forEach(mono => {
                    monoList.push(mono)
                });
            }
            if(ele.exercise_suggest.vocabulary){
                ele.exercise_suggest.vocabulary.forEach(mono => {
                    monoList.push(mono)
                });
            }
            if(ele.exercise_suggest.listening){
                ele.exercise_suggest.listening.forEach(mono => {
                    monoList.push(mono)
                });
            }
            if(ele.exercise_suggest.speaking){
                ele.exercise_suggest.speaking.forEach(mono => {
                    monoList.push(mono)
                });
            }
            if(ele.exercise_suggest.reading){
                ele.exercise_suggest.reading.forEach(mono => {
                    monoList.push(mono)
                });
            }
            if(ele.exercise_suggest.writing){
                ele.exercise_suggest.writing.forEach(mono => {
                    monoList.push(mono)
                });
            }
            if(ele.exercise_suggest.grammar){
                ele.exercise_suggest.grammar.forEach(mono => {
                    monoList.push(mono)
                });
            }
            var bigMono = {
                user_id: data[index].user_id,
                fullname: data[index].fullname,
                email: data[index].email,
                minute_finish: ele.minute_finish,
                exercise_suggest: monoList
            }
            mList.push(bigMono)
        });
        setLessonList(mList)
        LogBase.log("=====mList=", mList)
    }

    const pushLessionAss = async () => {

        console.log('----listAssignManagent', listAssignManagent);
        console.log('----listAssign', listAssign);
        let form = new URLSearchParams();
        form.append('before_start_time', String(listAssign.before_start_time));
        form.append('class_id', listAssign.class_id);
        form.append('start_time', listAssign.start_time);
        form.append('end_time', listAssign.end_time);
        form.append('note', listAssign.note);
        form.append('remind_before', listAssign.remind_before);
        form.append('students', JSON.stringify(listAssign.students));
        form.append('exercise_per_hs', JSON.stringify(lessonList.map(i => {
            LogBase.log("+++++exercise_per_hs",i)
            let body = {
                user_id: i.user_id,
                exercise_suggest: i.exercise_suggest.map(mono => {
                    var monoBody = {
                        exercise_id: mono.lesson_id,
                        list_guide_id: mono.file?.map((f) => f.id),
                        exercise_type: mono.lesson_type,
                        start_time: mono.start_time ? mono.start_time : listAssign.start_time,
                        end_time: mono.end_time ? mono.end_time : listAssign.end_time,
                        curriculum_id: mono.curriculum_id,
                        unit_id: mono.unit_id
                    }
                    return monoBody
                })
            };
            return body;
        })));
        LogBase.log('----postLessonAss req', form);
        setloading(true);
        APIBase.tokenAPI('POST', API.baseurl + API.postLessonAss, form)
            .then((r) => {
                LogBase.log('=====Nopbai', r);
                setloading(false);
                // if (role === 'assign') {
                //   Global.reloadDataAssignment()
                // }
                props.navigation.navigate('ManagingAssignmentsScreen',{reload : Math.random()});
                dispatch(ActionAssignManagent([]));
                dispatch(ActionAssign([]));
                setTimeout(() => {
                    Global.reloadDataAssignment();
                }, 100);
            }).catch((err) => {
                console.log(err);
                setloading(false);
            });
    }

    const next = () => {
        // if(curType == 1){
        //     props.navigation.navigate('ChooseCurruculum')
        // }else{
        //     props.navigation.navigate('SettingExercise')
        // }
    }

    const unitUp = () => {
        setcurUnit(curUnit+1)
    }

    const unitDown = () => {
        setcurUnit(curUnit-1)
    }

    const minuteUp = () => {
        setcurminute(curminute+10)
    }

    const onOpen = (index) => {
        var mlist = [...dataList]
        if(!mlist[index].isOpen || mlist[index].isOpen == false){
            mlist[index].isOpen = true
            setdataList(mlist)
        }else{
            mlist[index].isOpen = false
            setdataList(mlist)
        }
    }

    const CheckLevel = (value) => {
        if (value === 'easy') {
            return Colors._6EBF49;
        } else if (value === 'normal') {
            return Colors.Orange;
        } else if (value === 'hard') {
            return Colors._BE1E2D;
        }
    };

    const checkFile = (item) => {
            if (item.file && item.file.length > 0) {
                return true;
            } else {
                return false;
            }
    };

    const removeItem = () => {
        LogBase.log("=====role",role)
        var mlist = [...lessonList]
        mlist[curIndexStu].exercise_suggest.splice(curIndexLesson, 1)
        LogBase.log("=====removeItem "+curIndexStu+"|"+curIndexLesson, mlist)
        setLessonList(mlist)
        setVisible(false);
    };

    const addItem = (item, index) => {
        setcurIndexStu(index)
        dispatch(ActionAssignManagent(lessonList[index]?.exercise_suggest || []))
        props.navigation.navigate('ChooseCurruculum')
    };

    const saveListfile = (indexStu, indexLesson) => {
        var mlist = [...lessonList]
        LogBase.log("=====saveListfile "+indexStu+"|"+indexLesson,mlist)
        mlist[indexStu].exercise_suggest[indexLesson].file = MData.mAssignListFile
        mlist[indexStu].exercise_suggest[indexLesson].start_time = MData.mAssignDateData.start_time
        mlist[indexStu].exercise_suggest[indexLesson].end_time = MData.mAssignDateData.end_time
        setLessonList(mlist)
    };

    const onEdit = (item, stuIndex, index) => {
        console.log(item);
        let data = {
            ...item,
            end_time: item.end_time || listAssign.end_time,
            start_time: item.start_time || listAssign.start_time,
        };
        LogBase.log("=====onEdit ",data)
        MData.mAssignListFile = item.file ? item.file : []
        MData.mAssignDateData = {start_time: data.start_time, end_time: data.end_time}
        props.navigation.navigate('ManagingTutorial', { item: data, saveListfile: saveListfile, stuIndex: stuIndex, index: index});
    };

    const cancelModal = () => {
        setsettingData(cloneDeep(listBU))
        LogBase.log("=====listBU",listBU)
        setvisibleEdit(false)
    }

    const enterModal = (svData, editData) => {
        getData(svData)
        setListBU(cloneDeep(editData))
        setsettingData(editData)
        setvisibleEdit(false)
    }

    const checkDis = () => {
        var isEmpty = true
        lessonList.forEach(element => {
            if(element.exercise_suggest.length > 0){
                isEmpty = false
            }
        });
        return isEmpty
    }

    const renderlesson = (item, index, stuIndex) => {
        return(
            <TouchableOpacity onPress={() => onEdit(item, stuIndex, index)} style={[styles.viewItem, { borderTopWidth: index > 0 ? 1 : 0 }]}>
            <View style={styles.contentItem}>
              <Image style={styles.itemImg} source={{ uri: ImageLesson(item.lesson_type, item.sub_lesson_type) }} />
              <View style={styles.containerMono}>
                <TextBox numberOfLines={null} style={[styles.txtTopic, styles.lesson_topic]}>
                  {`${item.level === 'normal' || !item.level ? 'medium' : item.level}    ` + `${item.topic || item.lesson_topic}`}
                </TextBox>
                <View
                  style={[styles.viewLevel, { backgroundColor: CheckLevel(item.level) }]}>
                  <TextBox numberOfLines={null} style={styles.txtLevel}>{item.level === 'normal' ? 'medium' : item.level}</TextBox>
                </View>
                <TextBox numberOfLines={null} style={styles.txtTopic}>
                  {item.lesson_name}
                </TextBox>
                {item.curriculum_name &&<TextBox style={styles.txtCurriculum} numberOfLines={null}>{item.curriculum_name}</TextBox>}
                <View style={styles.footerItem}>
                  <View style={styles.row}>
                    <Image source={{ uri: 'icon_file' }} style={styles.iconFile} />
                    {checkFile(item) ?
                      <TextBox style={styles.txtfile}>{CompleteAssignJson.HaveFile}</TextBox>
                      :
                      <TextBox style={styles.txtfile}>
                        {CompleteAssignJson.HaventFile}
                      </TextBox>
                    }
                  </View>
                  <TouchableOpacity style={styles.deleteLay}
                    onPress={() => {
                      setcurIndexLesson(index)
                      setcurIndexStu(stuIndex)
                      setVisible(true)
                    }}>
                        <Image style={styles.deleteImaS} source={{uri: 'icon_delete'}}/>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
    }

    const renderMono = ({item, index}) => {
       return(
            <>
                <TouchableWithoutFeedback onPress={()=>onOpen(index)}>
                    <View style={styles.programLay}>
                        <View style={styles.leftLay}>
                            <TextBox style={styles.nameStuS}>{item.fullname+" ("+item.minute_finish+" phút)"}</TextBox>
                            <TextBox style={styles.mailS}>{item.email}</TextBox>
                        </View>
                        <View style={styles.rightLay}>
                            <Image style={[styles.iconArr,{transform: [{rotateX: dataList[index].isOpen ? '180deg' : '0deg'}]}]} source={{uri: 'arrow_down_gray'}}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    {dataList[index].isOpen && lessonList && lessonList[index] && lessonList[index].exercise_suggest.map((mono, mIndex)=>{
                        return(
                           <View key={""+mono.lesson_id+mIndex}>
                                {renderlesson(mono, mIndex, index)}
                           </View>
                        )
                    })}
                    {dataList[index].isOpen && lessonList && lessonList[index] &&
                    <TouchableOpacity onPress={()=>addItem(item, index)}>
                        <LinearGradient
                            style={styles.addBtnLay}
                            colors={[Colors.BaseGreen, Colors.LightGreen]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <Image style={styles.addIconS} source={icon_add_page}/>
                                <TextBox style={styles.addTextS}>{"Thêm bài tập"}</TextBox>
                        </LinearGradient>
                    </TouchableOpacity>}
                </View>
            </>
       )
    }

    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={typeAss == 3 ?  "Giao bài theo năng lực" : "Giao bài theo yêu cầu"}
                leftIconOnPress={() => {
                    MData.mAssignType = ''
                    var upd = props.navigation.getParam('updateDT')
                    if(upd) upd()
                    props.navigation.pop()
                }}
                styleTitle={{ fontSize: FontSize.size60Font }}
                rightComponent={()=>{
                    return(
                        <>
                            {typeAss != 3 && <TouchableOpacity onPress={()=> setvisibleEdit(true)}>
                                <Image style={styles.editImgS} source={{uri: 'edit_profile'}}/>
                            </TouchableOpacity>}
                        </>
                    )
                }}
            />
            <LinearGradient
            style={styles.flex1}
            colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                
                <View style={styles.mainLay}>
                    <View style={styles.listLay}>
                        <FlatList
                            data={lessonList}
                            renderItem={renderMono}
                            keyExtractor={(item, index) => {
                                return item.user_id.toString() + index.toString();
                            }}
                        />
                    </View>
                    <View style={styles.buttonLay}>
                        <ShortMainButton text={"Tiếp tục"} widthType={'full'} type={1} isDisabled={checkDis()}
                            onPress={()=>pushLessionAss()}/>
                    </View>
                </View>
                <SmPopup visible={visible}
                    message={CompleteAssignJson.Doyoudelete}
                    cancelText={CompleteAssignJson.Cancel}
                    confirmText={CompleteAssignJson.Delete}
                    contentStyles={styles.modalBox}
                    messageStyle={[styles.messageModalStyle, styles.messageDeleteStyle]}
                    cancelOnpress={() => setVisible(false)}
                    confirmOnpress={() => {
                        removeItem()
                    }}
                />
            </LinearGradient>
            {visibleEdit ? <View style={styles.fixModal}>
                    <SettingRequestAssign isModal={true} editData={settingData} cancel={cancelModal} enter={enterModal} navigation={props.navigation}/>
                </View> : null}
        </>
    );
}

export default ListLessonResult