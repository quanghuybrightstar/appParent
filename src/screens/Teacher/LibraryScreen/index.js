import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ImageBackground, Image, Dimensions, TouchableOpacity, ImagePropTypes, Alert } from 'react-native';
const { width, height } = Dimensions.get('window')
import SmartScreenBase from '../../../base/SmartScreenBase';
import { TabView, SceneMap } from 'react-native-tab-view';
import axios from 'axios'
import { useSelector } from 'react-redux'
import LoaddingScreen from '../../../screens/LoadingScreen'
import Header from '../../../component/Header';
import API from '../../../API/APIConstant';
const initialLayout = { width: Dimensions.get('window').width };
const LibraryScreen = (props) => {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([], [], [])
    const [lesson_type, setLesson_type] = useState(props.navigation.getParam('lesson_type'));
    const { dataClass } = useSelector(state => state.AuthStackReducer);
    const [loading, setLoadding] = useState(true)
    const _changeIndex = (index) => {
        setInDex(index)
    }
    // const [index, setIndex] = React.useState(0);
    const [routes] = useState([
        { key: 'SUNDAY', title: 'SUNDAY' },
        { key: 'SÁCH GIÁO KHOA', title: 'SÁCH GIÁO KHOA' },
        { key: 'GIÁO TRÌNH RIÊNG', title: 'GIÁO TRÌNH RIÊNG' },
    ]);


    useEffect(() => {
        _getExercises()
    }, [])
    const _getExercises = () => {
        let dataFlastList = [...data]
        const url = API.baseurl+'api_curriculum/courses_name';
        const header = {
            'Content-Type': 'application/json',
            jwt_token: dataClass.jwt_token,
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
        };
        axios({ method: 'get', url: url, headers: header })
            .then((response) => {
                //console.log("response.data111111111111111111111", response.data)
                dataFlastList[0] = response.data.courses
                dataFlastList[1] = response.data.courses
                dataFlastList[2] = response.data.courses
                setData(dataFlastList);
                setLoadding(false)
            })
            .catch((error) => {
                console.log(error.response.data);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
            });
    };
    const _checkScreen = (item) => {
        if (props.navigation.getParam('status')) {
        } else {
            props.navigation.navigate('ChooseExCourseTeacherScreen', { lesson_type, item, Type: props.navigation.getParam('Type') })
        }
    }
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'SUNDAY':
                return <FirstRoute data={data[0]} />;
            case 'SÁCH GIÁO KHOA':
                return <FirstRoute data={data[1]} />;
            case 'GIÁO TRÌNH RIÊNG':
                return <FirstRoute data={data[2]} />
        }
    };
    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                minHeight: 50,
                borderBottomColor: '#ffffff50',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                paddingHorizontal: 7
            }}
                onPress={() => { _checkScreen(item) }}
            >
                <Text style={{ fontSize: 17, color: '#fff', width: '100%', textAlign: 'center' }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    const _goBack = () => {
        props.navigation.goBack()
    }
    const FirstRoute = (props) => {
        return (
            <View style={{ width, justifyContent: 'center', paddingHorizontal: '5%', maxHeight: height / 1.45, marginTop: 20 }}>
                <FlatList
                    data={props.data}
                    renderItem={_renderItem}
                    style={{
                        backgroundColor: '#22222250',
                        borderRadius: 10
                    }}
                    extraData={index}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    };
    return (
        <ImageBackground source={{ uri: 'imagebackground' }} style={{
            flex: 1,
            resizeMode: 'stretch',
        }}>
            <Header showBack={true} title={'Thư viện'} goBack={() => props.navigation.goBack()}/>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
            {
                loading&&
                <LoaddingScreen />
            }
        </ImageBackground >
    )
}
export default LibraryScreen;
