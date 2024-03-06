import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Animated,
    TouchableOpacity,
    Image,
    FlatList,
    Alert
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
import ViewGradeAddress from '../../../component/StydyForTest';
import {stylesHistory} from './styles';
import Utils from '../../../utils/stringUtils';
import APIBase from '../../../base/APIBase';
import FontBase from '../../../base/FontBase';

const styles = stylesHistory;

const StudyForTest = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [listMockHistory, setListMockHistory] = useState([]);
    const [gradeId, setGradeId] = useState('');
    const [addressId, setAddressId] = useState('');
    const draw = navigation.getParam('draw')?navigation.getParam('draw'):0;

    useEffect(() => {
        _getHistoryMockTest();
    }, [gradeId, addressId,draw]);

    const _getHistoryMockTest = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.mockTestHistory(gradeId, addressId);
        try {
            const res = await APIBase.postDataJson('GET',url);
            console.log('=====_getHistoryMockTest',res.data)
            let data = res.data;
            if (data.status) {
                // const d = data.list_mock_history;
                // d.forEach(e=>{
                //     e.time = Utils.parseStringToDate(e.start_time)
                // })
                // const d2 = d.sort((a,b)=>b.time - a.time);
                // //console.log('fucj',d2.filter(c=>c.mock_test_id==89))


                // var his = []
                // d2.forEach(e=>{
                //     if(!his.find(c=>c.mock_test_id == e.mock_test_id)){
                //         his.push(e)
                //     }
                // })
                // //console.log('his',his)
                var listData = []
                if(data.list_mock_history){
                    listData = data.list_mock_history
                }
                setListMockHistory(listData);
            }
        } catch (error) {
            Alert.alert('Thông báo', error.response.data, [
                {text: 'Đồng ý', style: "cancel"}
            ]);
            console.log(error.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    const _renderItem = ({item}) => {
        return (
            <TouchableOpacity
            onPress={()=>{
                navigation.navigate('PracticeHistoryDetail',{item:item,draw:draw})
            }}
             style={styles._viewRenderData}>
                <View style={styles.row1}>
                    <Image
                        source={{uri: 'iconmu'}}
                        resizeMode={'contain'}
                        style={styles.img_mu}
                    />
                </View>
                <View style={styles.row_2}>
                    <Text
                        style={styles.exam_name}
                        numberOfLines={2}>{item.exam_name}
                    </Text>
                    <Text style={styles.text_df}>{item.start_time}</Text>
                </View>
                <View style={styles.row_4}>
                    <Text style={styles.text_df2}>{`${item.number_true ?? 0}/${item.total_question ?? 0} câu`}</Text>
                    <Text style={styles.text_df}>{item.duration}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground
            source={{uri: 'bg_exam'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            {
                isLoading ?
                    <ImageBackground
                        source={{uri: 'bg_exam'}}
                        imageStyle={stylesApp.ImageBackGround}
                        style={styles.loading}>
                        <Loading/>
                    </ImageBackground>
                    :
                    null
            }
            <Header
                title={'Lịch sử làm bài'}
                icon={false} showBack={true}
                goBack={() => navigation.goBack()}/>

            <ViewGradeAddress setGradeId={(gradeId) => setGradeId(gradeId)}
                              setAddressId={(addressId) => setAddressId(addressId)}/>

            <View style={styles.view_content}>
                <FlatList
                    data={listMockHistory}
                    renderItem={_renderItem}
                    keyExtractor={(item,index) => index.toString()}
                    ListEmptyComponent={()=>{
                        return <Text style={{
                            fontFamily: FontBase.MyriadPro_Regular,
                            margin:SmartScreenBase.smPercenWidth*4,
                            fontSize:SmartScreenBase.smFontSize*50,
                            color:'gray',
                            textAlign: 'center',
                            alignSelf: 'center'
                        }}>Bạn chưa có lịch sử làm bài</Text>
                    }}
                />
            </View>
        </ImageBackground>
    );
};

export default StudyForTest;
