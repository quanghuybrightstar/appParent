import React from "react";
import { View,Text,TouchableOpacity,StyleSheet,FlatList, Platform } from "react-native";
import API from '../../API/APIConstant';
import apiBase from '../../base/APIBase';
import {useSelector} from 'react-redux';
import stringUtils from '../../utils/stringUtils';
import LinearGradient from "react-native-linear-gradient";
import SmartScreenBase from '../../base/SmartScreenBase';
import FontBase from '../../base/FontBase';
import LessonBase from "../../base/LessonBase";
import lessonMath from "../../utils/lessonMath";
import LogBase from "../../base/LogBase";
import { FontWeight } from "../../styleApp/font";
import { Colors } from "../../styleApp/color";


const _converTimeNK = (value) =>{
    let data = value.slice(11,16);
    return data
}
const _getTime = (date) => {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        second = date.getSeconds();
    return year + '-' + month + '-' + day + ' 00:00:00'
}
const _convertBottom = (data) => {
    let array = [];
    data.forEach((item, index) => {
        if (item.data_log.length) {
            item.data_log.forEach((itm, idx) => {
                array.push(itm)
            })
        }
    })
    return array
}

const AItem=({item,last})=>{
    return <View style={[styles.anItem,{borderBottomWidth: last?0:1, }]}>
        <Text style={styles.anItemTime}>{_converTimeNK(item.time)}</Text>
        <View style={styles.anItemRig}>
            <Text style={[styles.anItemName,{fontFamily: FontBase.MyriadPro_Bold}]}>{item.lesson_name}</Text>
            <Text style={styles.anItemName}>{item.curriculum_name}</Text>
            <Text style={styles.anItemName}>{item.unit_name} - {lessonMath.convertSkill(item.skill)}</Text>
            <Text style={styles.anItemName}>{item.status == 0 ? "" : "Điểm số: "+item.score}</Text>
        </View>
    </View>
}
const Component =(props)=>{
    const [items,setItems]=React.useState([]);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const listener = React.useRef();  
    const childSelected = useSelector(
      state => state.ManageChildrenReducer.childSelected,
    );

    React.useEffect(()=>{
      const init = async () => {
        await _getNK();
    };
    init();
    if (!listener.current) {
      listener.current = props.navigation.addListener('didFocus', _getNK);
  }
  return () => {
      listener.current.remove();
  };
    },[])

    const checkUrlGetNK = () => {
      return dataLogin != 'parent' ? dataLogin?.id : childSelected?.id
    }

    const _getNK = () => {
        let from = new Date();
        let DateFrom = _getTime(from);
        const url = API.baseurl + API.student_log_learning + 'from_time=' + DateFrom + '&student_id=' + checkUrlGetNK()
        apiBase.postDataJson('get',url).then(r=>{
            if(r.data.status && r.data.data?.recent_activity.length>0){
                setItems(r.data.data.recent_activity[0].data_log)
            }
        }).catch(e=>{

        })
    }
    const now = new Date();
    return <View style={dataLogin.role != 'parent' && styles.container}>
        {dataLogin.role != 'parent' ? <LinearGradient style={styles.header}
                colors={['#00e1ae','#00b9b7']}
                start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
            >
            <Text style={styles.txtHeader}>NHẬT KÝ HOẠT ĐỘNG</Text>
        </LinearGradient> : props.titleHeader}
        {dataLogin.role != 'parent' ? <View style={styles.date}>
            <Text style={styles.dateText}>{`${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`}</Text>
        </View> : <Text style = {styles.dataTextParent}>{`${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`}</Text>}
        <View style={dataLogin.role != 'parent' && styles.noActCon}>
            {
                items.length>0?<>
                {
                    items.map((e,i)=>{
                        return <AItem last={items.length-1==i} item={e} key={i}/>
                    })
                }
                </>:<Text style={dataLogin.role != 'parent' ? styles.noAct : styles.noActParent} >
                    {dataLogin?.role != 'parent' ? 'Bạn chưa có hoạt động gì cho ngày hôm nay' : 'Con chưa có hoạt động gì cho ngày hôm nay'}
                </Text>
            }
        </View>
        {dataLogin.role != 'parent' ? <View style={styles.btnDetail}>
            <TouchableOpacity onPress={()=>{
              user = {
                fullname : dataLogin.fullname,
                id : dataLogin.id
              }
              props.navigation.navigate("StudyDiaryStudentScreen", { user: user })
              }}>
                <Text style={styles.details}>Chi tiết</Text>
            </TouchableOpacity>
        </View> : 
        props.btnDetail}
    </View>
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    padding: 5,
    backgroundColor: '#fff',
  },
  header: {
    borderRadius: SmartScreenBase.smPercenWidth * 5,
    paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
    paddingVertical: SmartScreenBase.smPercenWidth * 2,
  },
  txtHeader: {
    color: '#fff',
    fontSize: SmartScreenBase.smFontSize * 50,
    fontFamily: FontBase.MyriadPro_Bold,
  },
  details: {
    fontSize: SmartScreenBase.smFontSize * 50,
    textDecorationLine: 'underline',
    fontFamily: FontBase.MyriadPro_Bold,
  },
  btnDetail: {
    paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
    paddingVertical: SmartScreenBase.smPercenHeight * 2,
    alignItems: 'flex-end',
  },
  noAct: {
    paddingHorizontal: 10,
    fontSize: SmartScreenBase.smFontSize * 50,
    fontFamily: FontBase.MyriadPro_Regular,
  },
  noActParent: {
    fontSize: SmartScreenBase.smFontSize * 45,
    fontFamily: FontBase.MyriadPro_Regular,
  },
  noActCon: {
    marginTop: SmartScreenBase.smPercenHeight * 2,
  },
  anItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderBottomColor: '#eeeeee',
    width: '100%',
    paddingVertical: SmartScreenBase.smPercenHeight * 1,
  },
  anItemTime: {
    fontSize: SmartScreenBase.smFontSize * 50,
    fontFamily: FontBase.MyriadPro_Bold,
  },
  anItemRig: {marginLeft: SmartScreenBase.smPercenWidth * 2, flex: 1},
  anItemName: {
    fontSize: SmartScreenBase.smFontSize * 50,
    fontFamily: FontBase.MyriadPro_Regular,
  },
  anItemName: {
    fontSize: SmartScreenBase.smFontSize * 50,
    fontFamily: FontBase.MyriadPro_Regular,
  },
  date: {width: '100%', paddingHorizontal: '3%', marginVertical: 10},
  dateText: {
    fontFamily: FontBase.MyriadPro_Bold,
    fontSize: SmartScreenBase.smFontSize * 50,
  },
  dataTextParent: {
    fontSize: SmartScreenBase.smFontSize * 45,
    ...FontWeight.Bold,
    color: Colors.PrimaryBlue,
    paddingVertical: SmartScreenBase.smPercenWidth * 2
  }
});
export default Component