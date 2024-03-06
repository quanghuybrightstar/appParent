import React, { useEffect } from "react";
import { View,Text,ImageBackground,FlatList,TouchableOpacity,Image } from "react-native";
import styles from './styles';
import Header from '../../../component/Header';
import MyData from '../../../component/MyData';
import API from "../../../API/APIConstant";
import APIBase from "../../../base/APIBase";
import LogBase from "../../../base/LogBase";

const AnItem= ({item,onPress,active})=>{
    return <TouchableOpacity
    onPress={()=>onPress(item)}
     style={[styles.itemCon,{backgroundColor:item==active?'#fff59d':'#fff'}]}>
        <View style={styles.itemImgBV}>
            <Image source={{uri:'curriculum'}} style={styles.itemImgB} />
        </View>
        <Text style={styles.itemTxt}>{item.class_name}</Text>
        <Image source={{uri: item.curriculum_type==="default"?'star_gold':'star_grey'}} style={styles.itemImgS} />
    </TouchableOpacity>
}

const Screen = ({navigation,route})=>{
    
    const [data,setData] = React.useState(navigation.getParam('data'))
    const [active,setActive] = React.useState(navigation.getParam('current'));
    const [loading,setLoading] = React.useState(false);

    const _goBack=React.useCallback(()=>{
        navigation.goBack();
    },[])

    useEffect(()=>{
        LogBase.log("=====getParam('data')",data)
        getMyCurriculum()
    },[])

    const getMyCurriculum = async () => {
            try {
                setLoading(true)
                const response = await APIBase.postDataJson('get',API.baseurl + API.my_classes);
                LogBase.log("=====MapFull 1",response.data)
                setLoading(false)
                if (response.data.status){
                    LogBase.log("=====response.data.status",response.data.status)
                    setData(response.data.data)
                    // setAllCurr(response.data.data);
                    // var curCurr = response.data.data.find(c=>c.id == MyData.curCurriID);
                    // if(curCurr){
                    //     setCurrCurr(curCurr)
                    // }else{
                    //     var def = response.data.data.find(c=>c.curriculum_type === 'default');
                    //     setCurrCurr(def || response.data.data[0]);
                    // }
                } else {Alert.alert(response.data.msg);}
            } catch (error) {
                console.log('Error', error.response.data);
            } finally {
                setIsLoading(false);
            }
        }

    const onPress = (item) => {

        MyData.curCurriID = item.curriculum_id
        LogBase.log("=====onPress ", item)
        setActive(item);
        var cb = navigation.getParam('cb')
        cb&&cb(item)
        setTimeout(()=>{
            MyData.isCurrBack = !navigation.getParam('isLoseRoot')
            //navigation.goBack();
            LogBase.log("=====setTimeout")
            navigation.popToTop({immediate:true})
            navigation.navigate('MapScreenStudent', {active: item})
            MyData.isFirstLogin = false
            LogBase.log("=====setTimeout 2")
        },200)
    }

    return <ImageBackground style={styles.container} source={{uri: 'bgmap'}}>
        <Header showBack goBack={_goBack} title={'Chọn giáo trình'}/>
        <FlatList
            data={data}
            keyExtractor={(item,index)=>item.id}
            renderItem={({item})=><AnItem active={active} item={item} onPress={(item)=>onPress(item)}/>}
        />
    </ImageBackground>
}

export default Screen;