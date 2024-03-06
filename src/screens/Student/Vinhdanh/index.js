import React, { useEffect, useState } from "react";
import { ImageBackground, View, Text, SafeAreaView } from "react-native";
import HeaderScreen from "../../../component/HeaderScreen";
import StyleStudent from "../StyleStudent";
import * as Animatable from 'react-native-animatable';
import ViewImage from "../../../component/ViewImage";
import SmartScreenBase from "../../../base/SmartScreenBase";
import * as action from '../../../ReduxStudent/actions/Student';
import {connect, useSelector} from "react-redux";
import Loading from '../../../component/LoadingScreen';
import ViewImageShadow from '../../../component/ViewImageShadow';
import Header from '../../../component/Header';
import DataAPI from "../../../component/DataAPI";
import API from "../../../API/APIConstant";
import axios from "axios";
import MyData from "../../../component/MyData";
import base64 from "react-native-base64"
import LoadingScreen from "../../LoadingScreen";
import HeaderStudentClass from "../../../component/HeaderStudentClass";
import Content from "./Content";
import styles from "./styles";
import { AppHeader } from "../../../componentBase/AppHeader";
import FontBase from '../../../base/FontBase'
import {Colors} from '../../../styleApp/color'
import APIBase from "../../../base/APIBase";

const Vinhdanh = (props) => {
    const {navigation} = props;
    const {id} = navigation.state.params;
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("=====_getData")
        _getData();
    }, []);

    const _getData = async () => {
        setLoading(true);
        const url = API.baseurl + DataAPI.UrlAchievements + '?id=' + id;
        try {
            const res = await APIBase.postDataJson('get', url);
            if (res.data.status) {
                console.log("=====DataVD",res.data.data)
                setData(res.data.data);
            } else {
                console.log("=====DataVD",res.data)
                setData([]);
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setData([]);
            setLoading(false);
        }
    };

    return (
        <ImageBackground style={styles.container} source={{uri: 'bgtuvung'}}>
            <AppHeader
                title={'Vinh danh'}
                leftIconOnPress={() => {
                            props.navigation.pop()
                }}
            />
                {loading ? <LoadingScreen/> :
                        data.length >0 ? <Content data={data}/>
                        : <View style={{width: '100%' ,alignItems: 'center', paddingTop: SmartScreenBase.smPercenHeight*5}}>
                            <Text style={{fontFamily: FontBase.MyriadPro_Regular, 
                                        fontSize: SmartScreenBase.smFontSize*50, color: Colors.NearBlack}}>
                                {"Hiện tại lớp học chưa có kết quả vinh danh"}</Text>
                            </View>
                }
            </ImageBackground>
    )
};

export default Vinhdanh;
