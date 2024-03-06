import React, {useState, useEffect} from "react";
import {SafeAreaView, View, Text, FlatList, ImageBackground, Image} from "react-native";
import {useSelector} from "react-redux";
import DataAPI from "../../../component/DataAPI";
import styles from "./styles";
import HeaderStudentClass from "../../../component/HeaderStudentClass";
import API from "../../../API/APIConstant";
import axios from 'axios'
import LoadingScreen from "../../LoadingScreen";
import { AppHeader } from "../../../componentBase/AppHeader";
import LogBase from "../../../base/LogBase";

const ListStudentClass = (props) => {
    const {navigation} = props;
    const {id} = navigation.state.params;
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        _getData()
    }, []);

    const _getData = async () => {
        setLoading(true);
        const url = API.baseurl + DataAPI.UrlListStudentClass + '?class_id=' + id;
        const headers = {...API.header, 'jwt_token': '' + dataLogin.jwt_token};
        try {
            LogBase.log("=====API",url)
            const res = await axios({method: 'get', url, headers});
            //console.log(res.data);
            if (res.data.status) {
                setData(res.data.data);
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setData([]);
            setLoading(false);
        }
    };

    const _renderItem = ({item, index}) => {
    const ava = item.avatar ? API.image_base_url + item.avatar : item.gender
        return (
            <View style={styles.viewItem}>
                <Text style={styles.textIndexItem}>{index + 1}</Text>
                <Image
                    resizeMode="cover"
                    source={{uri: ava}}
                    style={styles.avatarItem}
                />
                <Text style={styles.textNameItem} numberOfLines={1}>{item.fullname || item.username}</Text>
            </View>
        )
    };

    return (
        <ImageBackground style={styles.container} source={{uri: 'bgtuvung'}}>
            <AppHeader
                title={'Thành viên'}
                leftIconOnPress={() => {
                            props.navigation.pop()
                }}
            />
                {loading ? <LoadingScreen/> :
                    <>
                        <HeaderStudentClass navigation={navigation} title={'Thành viên'}/>
                        <View style={styles.containerContent}>
                            <Text style={styles.titleContent}>DANH SÁCH LỚP</Text>
                            <FlatList
                                data={data}
                                renderItem={_renderItem}
                                keyExtractor={(item, index) => 'item' + index}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </>
                }
        </ImageBackground>
    )
};

export default ListStudentClass;
