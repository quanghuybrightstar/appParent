import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Animated,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
} from 'react-native';
// import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../base/SmartScreenBase';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Header from './Header';
import {TabView} from 'react-native-tab-view';
import API from '../../../API/APIConstant';
import Loading from '../../../component/LoadingScreen';
import MyData from '../../../component/MyData';
import {stylesIndex, stylesHistory} from './styles';
import ViewGradeAddress from '../../../component/StydyForTest';
import font from '../../../base/FontBase';
import APIBase from '../../../base/APIBase';
import FontBase from '../../../base/FontBase';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';

const styles = stylesIndex;

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

const StudyForTest = ({navigation}) => {

    const [listMock15, setListMock15] = useState([]);
    const [listMock45, setListMock45] = useState([]);
    const [listMock60, setListMock60] = useState([]);
    const [listMock10, setListMock10] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [gradeId, setGradeId] = useState('');
    const [addressId, setAddressId] = useState('');
    const [index, setIndex] = useState(0);
    const normalTab = [
        {key: 0, title: 'TEST 15\''},
        {key: 1, title: 'TEST 45\''},
        {key: 2, title: 'HỌC KỲ'},
    ];
    const grade9Tab = [
        {key: 0, title: 'TEST 15\''},
        {key: 1, title: 'TEST 45\''},
        {key: 2, title: 'HỌC KỲ'},
        {key: 3, title: 'THI VÀO 10'},
    ];
    const [routes, setRoutes] = useState(grade9Tab);

    useEffect(() => {
        _getMockTest();
    }, [gradeId, addressId]);

    const _getMockTest = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.getMockTest(gradeId, addressId);
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        (gradeId == 6 || gradeId == '' || gradeId == 0) ? setRoutes(grade9Tab) : setRoutes(normalTab);
        try {
            const res = await APIBase.postDataJson('GET',url);
            //console.log('res',res)
            let data = res.data;
            if (data.status) {
                let listMockTest = data.list_mock_test;
                let data15 = [];
                let data45 = [];
                let data60 = [];
                let data10 = [];
                listMockTest.forEach((item) => {
                    switch (item.purpose) {
                    case 'mock_15' :
                        data15.push(item);
                        break;
                    case 'mock_45' :
                        data45.push(item);
                        break;
                    case 'mock_60' :
                        data60.push(item);
                        break;
                    default :
                        data10.push(item);
                        break;
                    }
                });
                setListMock10(data10);
                setListMock15(data15);
                setListMock45(data45);
                setListMock60(data60);
            } else {
                Alert.alert('Thông báo', data.msg, [
                    {text: 'Đồng ý', style: 'cancel'},
                ]);
            }
        } catch (error) {
            Alert.alert('Thông báo', error.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'},
            ]);
            console.log(error.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    const _renderTabBar = () => {
        return (
            <View style={styles._r_tb}>
                <FlatList
                    data={routes}
                    renderItem={_renderItem}
                    keyExtractor={(index) => index.toString()}
                    scrollEnabled={false}
                    numColumns={4}
                />
            </View>
        );
    };

    const _renderItem = ({item, i}) => {
        return (
            <View style={{...styles._itemTabBar, borderBottomWidth: index === item.key ? 3 : 0}}>
                <TouchableOpacity
                    style={styles._btnItemTb}
                    onPress={() => setIndex(item.key)}
                >
                    <Text style={{
                        ...styles._txtItemTb,
                        fontFamily: index === item.key ? FontBase.MyriadPro_Bold : FontBase.MyriadPro_Regular,
                    }}>{`${item.title}`}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _renderScene = () => {
        return (
            <View style={styles.scene}>
                <FlatList
                    data={index === 0 ? listMock15 : index === 1 ? listMock45 : index === 2 ? listMock60 : listMock10}
                    keyExtractor={(item, index) => item.id.toString()}
                    ListEmptyComponent={() => <Empty />}
                    renderItem={_renderData}
                />
            </View>
        );
    };

    const Empty = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: SmartScreenBase.smPercenHeight * 10,
            }}>
                <Image source={{uri:'anh23'}}
                    resizeMode="contain"
                    style={{
                        width:SmartScreenBase.smPercenWidth * 90,
                        height:SmartScreenBase.smPercenWidth * 60,
                    }}/>
                <Text style={{
                    fontSize: SmartScreenBase.smFontSize * 60,
                    fontFamily:font.MyriadPro_Bold
                }}
                >ĐỀ THI ĐANG ĐƯỢC CẬP NHẬT!</Text>
            </View>
        );
    };

    const _renderData = ({item}) => {
        let params = {};
        params.id = item.id;
        params.purpose = item.purpose;
        params.name = item.name;
        return (
            <TouchableOpacity
                style={styles._viewRenderData}
                onPress={() => navigation.navigate('DetailsStudyForTest', params)}
            >
                <View style={stylesHistory.row1}>
                    <Image source={{uri: 'iconmu'}}
                        resizeMode={'contain'}
                        style={[stylesHistory.img_mu, {alignSelf: 'flex-start'}]}/>
                </View>
                <View style={stylesHistory.row_2}>
                    <Text style={stylesHistory.exam_name} numberOfLines={2}>{item.name}</Text>
                    <Text style={stylesHistory.text_df}>{item.school}</Text>
                </View>
                <View style={stylesHistory.row_3}>
                    <Text style={[stylesHistory.text_df, {textAlign: 'center'}]}>{item.school_year}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground
            source={{uri: 'bg_exam'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            {/* {
                isLoading ?
                    <ImageBackground
                        source={{uri: 'bg_exam'}}
                        imageStyle={stylesApp.ImageBackGround}
                        style={stylesHistory.loading}>
                        <Loading/>
                    </ImageBackground>
                    :
                    null
            } */}
            <Header title={'Luyện thi'} icon={true} navigation={navigation}/>
            {/* { !isLoading ? <> */}
            <ViewGradeAddress
                setGradeId={(gradeId) => setGradeId(gradeId)}
                setAddressId={(addressId) => setAddressId(addressId)}
            />
            <View style={{flex: 1}}>
                <TabView
                    navigationState={{index, routes}}
                    renderScene={_renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{width: smartScreenWidth * 100}}
                    renderTabBar={_renderTabBar}
                />
            </View>
            {/* </> : <FullScreenLoadingIndicator visible={isLoading}/> } */}
        </ImageBackground>
    );
};

export default StudyForTest;
